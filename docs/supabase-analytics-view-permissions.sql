-- ============================================================
-- Portfolio Analytics Assistant — Harden Analytics View Permissions
-- ============================================================
-- Run this file in the Supabase SQL Editor AFTER
-- supabase-analytics-views.sql has already been run.
--
-- Problem this file solves:
--   Supabase configures default privileges so that any new view
--   created in the public schema automatically receives SELECT
--   access for the anon and authenticated roles. This is why
--   Supabase marks the analytics views as "UNRESTRICTED".
--
--   An "UNRESTRICTED / Security Definer" view means:
--     1. Any role with SELECT on the view can query it.
--     2. The view runs as the view owner (postgres), bypassing
--        RLS on the underlying tables.
--   Combined, this means the anon role — the same role used by
--   every public portfolio visitor — could query aggregated
--   analytics data if they discovered the view names.
--
-- What this file does:
--   Step 1 — Revoke SELECT from public, anon, and authenticated
--             on all six analytics views (essential fix).
--   Step 2 — Recreate all six views with security_invoker = true
--             (defense in depth: forces RLS to be evaluated even
--             if a GRANT is accidentally added in future).
--
-- After applying, only the service role can read these views.
-- The service role is used only in GitHub Actions secrets and
-- local gitignored files — never in public-facing code.
-- ============================================================


-- ============================================================
-- STEP 1: REVOKE SELECT FROM ALL NON-SERVICE ROLES
-- ============================================================
-- public     — the pseudo-role every PostgreSQL role inherits.
--              Revoking here is the broadest block.
-- anon       — the role used by every unauthenticated request,
--              including all public portfolio visitors.
-- authenticated — the role used by logged-in Supabase users.
--                 Not used in this project, but revoked for
--                 completeness.
--
-- The service_role bypasses all privilege checks and RLS in
-- Supabase by design. It does not appear here because it does
-- not need a GRANT — it always has access regardless.
-- ============================================================

revoke select on analytics_daily_summary         from public;
revoke select on analytics_page_summary          from public;
revoke select on analytics_source_summary        from public;
revoke select on analytics_click_summary         from public;
revoke select on analytics_project_click_summary from public;
revoke select on analytics_last_24_hours         from public;

revoke select on analytics_daily_summary         from anon;
revoke select on analytics_page_summary          from anon;
revoke select on analytics_source_summary        from anon;
revoke select on analytics_click_summary         from anon;
revoke select on analytics_project_click_summary from anon;
revoke select on analytics_last_24_hours         from anon;

revoke select on analytics_daily_summary         from authenticated;
revoke select on analytics_page_summary          from authenticated;
revoke select on analytics_source_summary        from authenticated;
revoke select on analytics_click_summary         from authenticated;
revoke select on analytics_project_click_summary from authenticated;
revoke select on analytics_last_24_hours         from authenticated;


-- ============================================================
-- STEP 2: RECREATE VIEWS WITH security_invoker = true
-- ============================================================
-- Why this matters even after REVOKE:
--   A Security Definer view (the default) runs as the view
--   owner and bypasses RLS. If SELECT is ever accidentally
--   re-granted (e.g. by a future Supabase migration, a schema
--   reset, or a misconfigured default privilege), a Security
--   Definer view would still expose the data.
--
--   security_invoker = true makes the view run as the calling
--   role instead of the owner. The calling role is then subject
--   to normal RLS evaluation. Since anon has no SELECT policy
--   on page_views or click_events, it cannot read through these
--   views — even if SELECT were mistakenly granted again.
--
-- Two layers of protection:
--   Layer 1 — REVOKE (above): no SELECT privilege for anon.
--   Layer 2 — security_invoker: RLS blocks reads even if a
--             privilege slips through.
--
-- Supported since PostgreSQL 15 (Supabase uses PG 15+).
-- CREATE OR REPLACE preserves the view name and any existing
-- dependencies.
-- ============================================================

create or replace view analytics_daily_summary
  with (security_invoker = true)
as
select
  pv.date,
  pv.total_page_views,
  pv.unique_visitors,
  coalesce(ce.total_clicks, 0) as total_clicks
from (
  select
    created_at::date                              as date,
    count(*)                                      as total_page_views,
    count(*) filter (where is_unique = true)      as unique_visitors
  from page_views
  group by created_at::date
) pv
left join (
  select
    created_at::date as date,
    count(*)         as total_clicks
  from click_events
  group by created_at::date
) ce on pv.date = ce.date
order by pv.date desc;


create or replace view analytics_page_summary
  with (security_invoker = true)
as
select
  page,
  count(*)                                 as total_views,
  count(*) filter (where is_unique = true) as unique_visitors
from page_views
group by page
order by total_views desc;


create or replace view analytics_source_summary
  with (security_invoker = true)
as
select
  coalesce(utm_source, referrer, 'direct') as source,
  count(*)                                 as total_views,
  count(*) filter (where is_unique = true) as unique_visitors
from page_views
group by coalesce(utm_source, referrer, 'direct')
order by total_views desc;


create or replace view analytics_click_summary
  with (security_invoker = true)
as
select
  event_type,
  count(*) as total_clicks
from click_events
group by event_type
order by total_clicks desc;


create or replace view analytics_project_click_summary
  with (security_invoker = true)
as
select
  target,
  count(*) as total_clicks
from click_events
where event_type = 'project_click'
  and target is not null
group by target
order by total_clicks desc;


create or replace view analytics_last_24_hours
  with (security_invoker = true)
as
select
  (
    select count(*)
    from page_views
    where created_at >= now() - interval '24 hours'
  ) as total_page_views,

  (
    select count(*)
    from page_views
    where created_at >= now() - interval '24 hours'
      and is_unique = true
  ) as unique_visitors,

  (
    select count(*)
    from click_events
    where created_at >= now() - interval '24 hours'
  ) as total_clicks,

  (
    select coalesce(utm_source, referrer, 'direct')
    from page_views
    where created_at >= now() - interval '24 hours'
    group by coalesce(utm_source, referrer, 'direct')
    order by count(*) desc
    limit 1
  ) as top_source,

  (
    select page
    from page_views
    where created_at >= now() - interval '24 hours'
    group by page
    order by count(*) desc
    limit 1
  ) as top_page;


-- ============================================================
-- REVOKE AGAIN AFTER RECREATE
-- ============================================================
-- CREATE OR REPLACE may re-trigger Supabase's default privilege
-- rules, which automatically grant SELECT to anon and
-- authenticated on new objects in the public schema.
-- Revoking a second time here ensures the privileges are clean
-- regardless of the order the two steps execute.
-- ============================================================

revoke select on analytics_daily_summary         from public;
revoke select on analytics_page_summary          from public;
revoke select on analytics_source_summary        from public;
revoke select on analytics_click_summary         from public;
revoke select on analytics_project_click_summary from public;
revoke select on analytics_last_24_hours         from public;

revoke select on analytics_daily_summary         from anon;
revoke select on analytics_page_summary          from anon;
revoke select on analytics_source_summary        from anon;
revoke select on analytics_click_summary         from anon;
revoke select on analytics_project_click_summary from anon;
revoke select on analytics_last_24_hours         from anon;

revoke select on analytics_daily_summary         from authenticated;
revoke select on analytics_page_summary          from authenticated;
revoke select on analytics_source_summary        from authenticated;
revoke select on analytics_click_summary         from authenticated;
revoke select on analytics_project_click_summary from authenticated;
revoke select on analytics_last_24_hours         from authenticated;


-- ============================================================
-- NOTE: PRIVATE SCHEMA (ALTERNATIVE APPROACH — NOT APPLIED)
-- ============================================================
-- An alternative to REVOKE + security_invoker is to move the
-- views into a schema that the anon role cannot access at all.
--
-- How it would work:
--   create schema analytics_private;
--   revoke usage on schema analytics_private from public;
--   revoke usage on schema analytics_private from anon;
--   -- then create views as: analytics_private.analytics_daily_summary
--
-- Why it was not applied here:
--   Moving to a private schema would change the view names that
--   the Telegram report and dashboard need to query. It also
--   requires updating the schema reference in every future SQL
--   query. The REVOKE + security_invoker approach achieves the
--   same security guarantee with no naming changes.
--
--   If you later want the private schema approach, create a new
--   migration file and update all query references accordingly.
-- ============================================================


-- ============================================================
-- VERIFICATION QUERIES
-- ============================================================
-- Run these manually in the SQL Editor after applying this file.
-- The SQL Editor runs as the service role, so it can read the
-- views. The verification confirms:
--   (a) views exist and return data for the service role
--   (b) security_invoker is set (visible in pg_views metadata)
--   (c) anon and authenticated have no SELECT privilege
-- ============================================================

-- 1. Confirm the views return data (service role can read them)
--    Uncomment and run each line individually:
--
-- select * from analytics_last_24_hours;
-- select * from analytics_daily_summary   limit 5;
-- select * from analytics_page_summary;
-- select * from analytics_source_summary;
-- select * from analytics_click_summary;
-- select * from analytics_project_click_summary;


-- 2. Confirm security_invoker is enabled on all six views
--    Expected: one row per view, security_invoker = true
--
-- select viewname, definition
-- from pg_views
-- where schemaname = 'public'
--   and viewname like 'analytics_%';
--
-- Note: pg_views does not expose security_invoker directly.
-- To confirm it, run this against the system catalog:
--
-- select relname, reloptions
-- from pg_class
-- where relname like 'analytics_%'
--   and relkind = 'v';
--
-- Expected: reloptions should include 'security_invoker=true'
-- for each analytics view.


-- 3. Confirm anon has no SELECT privilege on the views
--    Expected: zero rows returned (no privileges for anon)
--
-- select grantee, table_name, privilege_type
-- from information_schema.role_table_grants
-- where table_schema = 'public'
--   and table_name like 'analytics_%'
--   and grantee in ('anon', 'authenticated', 'public');


-- ============================================================
-- SUMMARY
-- ============================================================
-- After running this file, the analytics views are protected by
-- two independent layers:
--
--   Layer 1 — No SELECT privilege:
--     anon, authenticated, and public have no SELECT on any
--     analytics view. The only role that can query them is
--     service_role (GitHub Actions secrets, local config).
--
--   Layer 2 — security_invoker = true:
--     Even if SELECT were accidentally re-granted, the views
--     enforce RLS. anon has no SELECT policy on page_views or
--     click_events, so it cannot read any data through the views.
--
-- Public portfolio visitors can never read analytics data.
-- ============================================================
