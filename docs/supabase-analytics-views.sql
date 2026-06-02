-- ============================================================
-- Portfolio Analytics Assistant — Supabase Analytics Views
-- ============================================================
-- Run this entire file once in the Supabase SQL Editor,
-- after supabase-analytics-setup.sql has already been run.
--
-- Purpose:
--   Creates reusable SQL views that summarize page_views and
--   click_events for the private dashboard and Telegram report.
--
-- Access:
--   These views are private. Anon SELECT is explicitly revoked
--   on every view. Only the service role (used in GitHub Actions
--   and local gitignored config) can query them.
--
-- Privacy:
--   No names, emails, IP addresses, LinkedIn profiles, Facebook
--   profiles, or personally identifiable information appear in
--   any view. All data is aggregated from anonymous event rows.
-- ============================================================


-- ============================================================
-- VIEW 1: analytics_daily_summary
-- ============================================================
-- One row per calendar day.
-- Shows total page views, unique visitors, and total clicks
-- for each day that has at least one page view.
-- Useful for the Telegram report and the "views by day" panel.
-- ============================================================

create or replace view analytics_daily_summary as
select
  pv.date,
  pv.total_page_views,
  pv.unique_visitors,
  coalesce(ce.total_clicks, 0) as total_clicks
from (
  select
    created_at::date                                    as date,
    count(*)                                            as total_page_views,
    count(*) filter (where is_unique = true)            as unique_visitors
  from page_views
  group by created_at::date
) pv
left join (
  select
    created_at::date  as date,
    count(*)          as total_clicks
  from click_events
  group by created_at::date
) ce on pv.date = ce.date
order by pv.date desc;


-- ============================================================
-- VIEW 2: analytics_page_summary
-- ============================================================
-- One row per portfolio page.
-- Shows total views and unique visitors per page across all time.
-- Useful for the "views by page" panel in the Telegram report
-- and the dashboard.
-- ============================================================

create or replace view analytics_page_summary as
select
  page,
  count(*)                                  as total_views,
  count(*) filter (where is_unique = true)  as unique_visitors
from page_views
group by page
order by total_views desc;


-- ============================================================
-- VIEW 3: analytics_source_summary
-- ============================================================
-- One row per traffic source.
-- Source is resolved in priority order:
--   1. utm_source (if visitor arrived via a UTM-tagged link)
--   2. referrer hostname (if no UTM, but referrer is known)
--   3. 'direct' (no UTM and no referrer)
-- Useful for the "top traffic source" panel and Telegram report.
-- ============================================================

create or replace view analytics_source_summary as
select
  coalesce(utm_source, referrer, 'direct')  as source,
  count(*)                                  as total_views,
  count(*) filter (where is_unique = true)  as unique_visitors
from page_views
group by coalesce(utm_source, referrer, 'direct')
order by total_views desc;


-- ============================================================
-- VIEW 4: analytics_click_summary
-- ============================================================
-- One row per click event type.
-- Shows total clicks by button category across all time.
-- Covers: github_click, linkedin_click, cv_download,
--         contact_click, project_click.
-- Useful for the "clicks by button" panel.
-- ============================================================

create or replace view analytics_click_summary as
select
  event_type,
  count(*) as total_clicks
from click_events
group by event_type
order by total_clicks desc;


-- ============================================================
-- VIEW 5: analytics_project_click_summary
-- ============================================================
-- One row per project.
-- Shows total project card clicks per project across all time.
-- Filters to project_click events with a non-null target only.
-- Useful for the "most clicked project" panel and Telegram report.
-- ============================================================

create or replace view analytics_project_click_summary as
select
  target,
  count(*) as total_clicks
from click_events
where event_type = 'project_click'
  and target is not null
group by target
order by total_clicks desc;


-- ============================================================
-- VIEW 6: analytics_last_24_hours
-- ============================================================
-- Single-row summary of the rolling 24-hour window.
-- All values are computed at query time using now().
-- Returns NULL for top_source and top_page if no data exists
-- in the window — callers should handle this gracefully.
-- Useful for the Telegram report header and dashboard summary.
-- ============================================================

create or replace view analytics_last_24_hours as
select
  -- Total page views in the last 24 hours
  (
    select count(*)
    from page_views
    where created_at >= now() - interval '24 hours'
  ) as total_page_views,

  -- Unique visitors in the last 24 hours (is_unique flag set by client)
  (
    select count(*)
    from page_views
    where created_at >= now() - interval '24 hours'
      and is_unique = true
  ) as unique_visitors,

  -- Total click events in the last 24 hours
  (
    select count(*)
    from click_events
    where created_at >= now() - interval '24 hours'
  ) as total_clicks,

  -- Traffic source with the most views in the last 24 hours
  -- Returns NULL if no page views in this window
  (
    select coalesce(utm_source, referrer, 'direct')
    from page_views
    where created_at >= now() - interval '24 hours'
    group by coalesce(utm_source, referrer, 'direct')
    order by count(*) desc
    limit 1
  ) as top_source,

  -- Page with the most views in the last 24 hours
  -- Returns NULL if no page views in this window
  (
    select page
    from page_views
    where created_at >= now() - interval '24 hours'
    group by page
    order by count(*) desc
    limit 1
  ) as top_page;


-- ============================================================
-- REVOKE ANON SELECT
-- ============================================================
-- By default, views created in the public schema may inherit
-- SELECT access for the anon role. These views are private —
-- only the service role (used in GitHub Actions secrets and
-- the local gitignored analytics-config.js) may query them.
--
-- Revoking here is belt-and-suspenders: the underlying tables
-- already block anon SELECT via RLS, but this makes the intent
-- explicit and prevents any future schema change from
-- accidentally exposing aggregated analytics data publicly.
-- ============================================================

revoke select on analytics_daily_summary          from anon;
revoke select on analytics_page_summary           from anon;
revoke select on analytics_source_summary         from anon;
revoke select on analytics_click_summary          from anon;
revoke select on analytics_project_click_summary  from anon;
revoke select on analytics_last_24_hours          from anon;


-- ============================================================
-- SETUP COMPLETE
-- ============================================================
-- After running this file, verify in Supabase:
--
-- 1. Table Editor → Views tab → confirm all six views appear:
--    analytics_daily_summary
--    analytics_page_summary
--    analytics_source_summary
--    analytics_click_summary
--    analytics_project_click_summary
--    analytics_last_24_hours
--
-- 2. Test a view with a manual query using the service role
--    (run directly in SQL Editor, which uses the service role):
--
--    select * from analytics_last_24_hours;
--    select * from analytics_daily_summary limit 7;
--    select * from analytics_source_summary;
--
-- 3. Confirm anon cannot read the views — this is enforced by
--    the RLS policies on the underlying tables and the explicit
--    REVOKE statements above.
--
-- These views are the data layer for:
--   - The Telegram daily report (Phase 3)
--   - The private owner dashboard (post-MVP)
-- ============================================================
