# Portfolio Analytics Assistant — Product Specification

**Version:** 1.0 MVP
**Author:** Tamar Karwan
**Date:** 2026-06-02
**Status:** Approved for implementation

---

## 1. Product Goal

Build a lightweight, privacy-friendly analytics layer for the portfolio that gives the owner clear visibility into engagement — how many people visit, where they come from, what they click, and which projects attract attention — without collecting any personally identifiable information.

The system must be invisible to visitors, safe to deploy on a public static site, and simple enough to maintain without a dedicated backend team.

---

## 2. User Problem

As a frontend developer actively job-searching, I share my portfolio across LinkedIn, job applications, recruiter messages, and events. I have no way to know:

- Whether anyone is actually visiting my portfolio.
- Which pages they look at.
- Where they came from (LinkedIn? a recruiter email? a job post?).
- Which projects get the most interest.
- Whether the buttons and links I want them to use are actually being clicked.

Without this visibility, I cannot improve my portfolio based on real behavior, and I cannot gauge the effectiveness of my outreach campaigns.

---

## 3. MVP Scope

The MVP delivers:

- Silent, client-side event tracking across all portfolio pages.
- Privacy-safe data storage in Supabase (no PII, no IP addresses stored intentionally).
- Owner exclusion — the portfolio owner's own visits and clicks are never counted.
- A simple owner-only dashboard page showing engagement metrics.
- A daily Telegram report sent at 18:00 Israel time summarizing the day's activity.

**Out of scope for MVP:**
- WhatsApp notifications (future only).
- Password-protected dashboard login (future only).
- AI-generated insights (future only).
- Advanced charts or data visualizations (future only).
- Backend server or custom API (not needed for MVP).

---

## 4. What the System Tracks

### 4.1 Page Views

A page view is logged every time a non-owner visitor loads any portfolio page. Each event records:

- Which page was viewed (`index`, `about`, `projects`, `medicalcare`)
- UTM parameters present in the URL at time of load (see 4.3–4.5)
- Referrer URL from `document.referrer` (origin domain only, not full path)
- Timestamp (UTC)
- An anonymous session ID (random string, stored in `sessionStorage` only)

### 4.2 Unique Visitors (Once Per Day)

A unique visitor event is logged at most once per calendar day per browser. On page load, the script checks `localStorage` for a key `pv_visited_YYYY-MM-DD`. If the key is absent, a unique visitor event is sent and the key is written. If the key exists, no unique visitor event is sent.

This provides a daily unique visitor count without storing persistent user identifiers.

### 4.3 UTM Source

Captured from the URL parameter `utm_source`. Records the origin platform of a visit.

Examples: `linkedin`, `github`, `recruiter_email`, `job_board`

### 4.4 UTM Medium

Captured from the URL parameter `utm_medium`. Records the type of channel.

Examples: `social`, `email`, `direct`, `referral`

### 4.5 UTM Campaign

Captured from the URL parameter `utm_campaign`. Records the specific campaign or context.

Examples: `job_search_q2`, `dev_conference`, `outreach_june`

### 4.6 Referrer

Captured from `document.referrer`. Only the hostname is stored (e.g., `linkedin.com`, `google.com`), not the full referring URL. If `document.referrer` is empty, the value is stored as `direct`.

### 4.7 Button Clicks

The following button and link clicks are tracked by attaching passive event listeners to existing elements. No existing HTML, CSS, or button behavior is changed.

| Event Name | What It Matches |
|---|---|
| `github_click` | Any link with `href` containing `github.com` |
| `linkedin_click` | Any link with `href` containing `linkedin.com` |
| `cv_download` | Any link with `href` containing `.pdf` |
| `contact_click` | Any link with `href` starting with `mailto:` |

### 4.8 Project Card Clicks

Project card clicks are tracked when a visitor clicks a card or button linking to a live project or project detail page.

| Event Name | Target |
|---|---|
| `project_click` | MedicalCare, VIBE Music, CX Agent Assist, TaskAi, TaskMan |

The `target` field records the project name so click counts can be broken down per project.

---

## 5. What the System Must Not Track

The following data must never be collected, stored, or transmitted — under any circumstances.

- **Names** — no visitor names of any kind.
- **Email addresses** — do not capture email addresses even if visible in form fields or URL parameters.
- **IP addresses** — Supabase does not store IP addresses in analytics table rows. No IP logging is performed intentionally.
- **LinkedIn profiles** — do not capture visitor profile URLs or IDs.
- **Facebook profiles** — do not capture visitor profile URLs or IDs.
- **Phone numbers** — not collected.
- **Device fingerprints** — no canvas fingerprinting, font enumeration, or browser fingerprinting techniques.
- **Cross-session persistent user IDs** — the anonymous session ID lives in `sessionStorage` only and is destroyed when the tab is closed. No UUID is written to `localStorage` for the purpose of re-identifying a visitor across sessions.
- **Sensitive personal data** of any kind.

---

## 6. Owner Exclusion

The portfolio owner must be able to browse and test their own portfolio without polluting the analytics data.

### How It Works

1. The owner visits any portfolio page with the query parameter `?owner=true` appended to the URL (e.g., `https://yourportfolio.com?owner=true`).
2. The analytics script detects this parameter on page load and writes `portfolio_owner = 'true'` to `localStorage`.
3. On every page load thereafter, the script checks `localStorage` for `portfolio_owner`. If the value is `'true'`, all tracking stops immediately — no events are sent.
4. Owner clicks are also excluded: the click listeners are never attached when owner mode is active.

### Rules

- Owner mode must be enabled once per browser per device. A phone and a desktop are separate browsers and each must be set independently.
- Owner mode persists across sessions until the owner clears their browser's `localStorage` or explicitly disables it.
- To disable owner mode, the owner can visit `?owner=false`, which removes the `portfolio_owner` key from `localStorage`.
- Owner exclusion is enforced entirely client-side before any network request is made.

---

## 7. Metrics Definitions

| Metric | Definition |
|---|---|
| **Page view** | One load of any portfolio page by a non-owner visitor. Multiple loads of the same page in one session each count as separate page views. |
| **Unique visitor** | One browser that visits the portfolio at least once in a given calendar day. Counted at most once per day per browser using a `localStorage` date key. |
| **Total clicks** | The total number of tracked button or project card click events across all visitors, all pages, all time (or within a filtered date range). |
| **Unique clickers** | The count of distinct anonymous session IDs that generated at least one click event within a date range. Approximates how many individual visitors engaged with buttons or project cards. |
| **Traffic source** | The `utm_source` value attached to a visit, or the referrer hostname if no UTM is present, or `direct` if neither is available. |
| **Campaign** | The `utm_campaign` value attached to a visit. Used to measure the effectiveness of a specific outreach effort. |

---

## 8. Data Model

### 8.1 `page_views` Table

Stores one row per page view event.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Auto-generated primary key. |
| `page` | `text` | Page identifier: `index`, `about`, `projects`, `medicalcare`. |
| `utm_source` | `text` | Nullable. Value of `utm_source` URL parameter. |
| `utm_medium` | `text` | Nullable. Value of `utm_medium` URL parameter. |
| `utm_campaign` | `text` | Nullable. Value of `utm_campaign` URL parameter. |
| `referrer` | `text` | Nullable. Hostname of `document.referrer`, or `direct`. |
| `is_unique` | `boolean` | `true` if this view was also the first visit of the day for this browser. |
| `session_id` | `text` | Random string from `sessionStorage`. Not persistent across sessions. |
| `created_at` | `timestamptz` | UTC timestamp, set by Supabase default. |

**Indexes:** `created_at` (for date-range queries), `page` (for per-page aggregations).

**Row Level Security:** Anon role has INSERT only. No SELECT for anon. Service role has full access (used by the dashboard and Telegram report job).

### 8.2 `click_events` Table

Stores one row per tracked click event.

| Column | Type | Notes |
|---|---|---|
| `id` | `uuid` | Auto-generated primary key. |
| `event_type` | `text` | One of: `github_click`, `linkedin_click`, `cv_download`, `contact_click`, `project_click`. |
| `target` | `text` | Nullable. For `project_click`: project name (e.g., `MedicalCare`). For others: null. |
| `page` | `text` | Page where the click occurred. |
| `session_id` | `text` | Same session ID as the page view for this session. |
| `created_at` | `timestamptz` | UTC timestamp, set by Supabase default. |

**Indexes:** `created_at`, `event_type`, `target`.

**Row Level Security:** Same as `page_views` — anon INSERT only, service role full access.

---

## 9. Dashboard Requirements

The dashboard is a new standalone page (`analytics.html`) accessible only when owner mode is active. If owner mode is not active, the page redirects to `index.html`.

The dashboard reads data from Supabase using the service role key, which is stored in a config object in a separate `analytics-config.js` file (not committed to the public repository — added to `.gitignore`).

### Required Panels

| Panel | Description |
|---|---|
| **Last 24 hours** | Page views and unique visitors in the rolling 24-hour window. |
| **Today** | Page views and unique visitors since midnight (local time). |
| **Views by day** | Table or simple list showing total page views per calendar day for the last 30 days. |
| **Unique visitors** | Total unique visitor count for today, this week, and this month. |
| **Top source** | The traffic source (utm_source or referrer) with the most visits today and this week. |
| **Top campaign** | The utm_campaign with the most visits today and this week. |
| **Clicks by button** | Breakdown of total click events by `event_type` for today and this week. |
| **Most viewed project** | The project card that received the most `project_click` events today and this week. |

### Access Control

- On page load, `analytics.html` checks `localStorage` for `portfolio_owner === 'true'`.
- If not set, immediately redirect to `index.html`.
- No login form, no password prompt in MVP.

---

## 10. Telegram Daily Report

### Schedule

The report is sent every day at **18:00 Israel Standard Time (IST)**, which is **15:00 UTC** in winter and **15:00 UTC** in summer (Israel does not observe DST consistently — the GitHub Actions cron should target 15:00 UTC and be adjusted manually if needed).

### Delivery Mechanism

A GitHub Actions workflow (`.github/workflows/telegram-report.yml`) runs on a cron schedule. It:

1. Queries the Supabase `page_views` and `click_events` tables for the current calendar day (Israel timezone).
2. Formats a structured summary message.
3. Sends the message to a Telegram chat via the Telegram Bot API using a bot token stored as a GitHub Actions secret.

### Report Format

```
📊 Portfolio Report — {date}

👁 Page views today: {n}
👤 Unique visitors today: {n}

📄 Views by page:
  • Home: {n}
  • Projects: {n}
  • About: {n}
  • MedicalCare: {n}

🔗 Top traffic source: {source} ({n} visits)
📣 Top campaign: {campaign} ({n} visits)

🖱 Clicks today:
  • GitHub: {n}
  • LinkedIn: {n}
  • CV Download: {n}
  • Contact: {n}

🏆 Most clicked project: {project name} ({n} clicks)

💡 {Short automated insight — e.g., "Traffic up 40% vs. yesterday" or "No visits today."}
```

### Required GitHub Actions Secrets

| Secret Name | Description |
|---|---|
| `TELEGRAM_BOT_TOKEN` | Bot token from @BotFather. |
| `TELEGRAM_CHAT_ID` | Your personal Telegram chat ID. |
| `SUPABASE_URL` | Your Supabase project URL. |
| `SUPABASE_SERVICE_KEY` | Service role key for read access. |

---

## 11. Privacy Notes

- This analytics system is designed to measure engagement, not to identify individuals.
- No data is sold, shared, or used for advertising purposes.
- All data is stored in the owner's private Supabase project and is not accessible to third parties.
- The Supabase anon key (used for INSERT from the browser) is intentionally write-only. Row Level Security prevents any visitor from reading the analytics data.
- Session IDs are random strings generated fresh each browser session. They cannot be used to re-identify a visitor across sessions or across devices.
- No cookies are set by the analytics script.
- `localStorage` is used only for two purposes: owner exclusion flag and daily unique visitor date key. Neither key contains any personal information.
- Referrer data is trimmed to hostname only — full referring URLs (which can contain personal tokens or IDs) are never stored.
- This system does not constitute a consent-required tracking service under most privacy frameworks because it does not collect PII or set cookies. However, if the portfolio is ever updated to collect any PII, a privacy notice and consent mechanism must be added before deployment.

---

## 12. Technical Architecture

```
Visitor's browser
      │
      ▼
analytics.js  ← loaded via <script defer> on all 4 HTML pages
      │
      │  Owner check → if portfolio_owner === 'true' in localStorage → STOP
      │
      ├── Page load event
      │     └── POST to Supabase REST API → page_views table
      │
      └── Click event listeners (passive, no behavior change)
            └── POST to Supabase REST API → click_events table

Supabase (free tier)
      │
      ├── page_views table    (anon INSERT, service role SELECT)
      └── click_events table  (anon INSERT, service role SELECT)

GitHub Actions (cron: 0 15 * * *)
      │
      ├── Query Supabase for today's data (service role key)
      ├── Format Telegram message
      └── POST to Telegram Bot API → owner's Telegram chat

analytics.html  (owner dashboard, owner mode required)
      │
      └── Fetch from Supabase (service role key via analytics-config.js)
            └── Render metrics in the browser
```

**Key technical decisions:**

- **No build system required.** All new JS files are plain ES6 vanilla JavaScript loaded via `<script>` tags.
- **No third-party analytics SDK.** All Supabase communication uses the native `fetch()` API with the Supabase REST endpoint directly.
- **No cookies.** `localStorage` and `sessionStorage` only.
- **Supabase anon key is safe to expose** for this use case because RLS restricts it to INSERT-only on analytics tables. No visitor can read, update, or delete data.
- **Service role key is never in client-side code.** It is used only in GitHub Actions (secrets) and in `analytics-config.js` (gitignored, owner's machine only).

---

## 13. Implementation Phases

### Phase 1 — Tracking (Week 1)

- [ ] Create Supabase project and tables (`page_views`, `click_events`).
- [ ] Configure Row Level Security policies.
- [ ] Create `analytics.js` with page view tracking, UTM parsing, unique visitor logic, owner exclusion.
- [ ] Add passive click listeners for all tracked events.
- [ ] Add `<script src="analytics.js" defer></script>` to all 4 HTML pages (1 line each).
- [ ] Test on local browser — verify events appear in Supabase dashboard.
- [ ] Enable owner mode, verify no events are sent.

### Phase 2 — Dashboard (Week 2)

- [ ] Create `analytics-config.js` (gitignored, holds service key).
- [ ] Create `analytics.html` with owner-mode gate.
- [ ] Create `analytics.css`.
- [ ] Implement all 8 required dashboard panels (plain HTML tables, no charting library needed for MVP).
- [ ] Test dashboard with real data from Phase 1.

### Phase 3 — Telegram Report (Week 2–3)

- [ ] Create Telegram bot via @BotFather and note token.
- [ ] Find personal Telegram chat ID.
- [ ] Create `.github/workflows/telegram-report.yml`.
- [ ] Add required secrets to GitHub repository.
- [ ] Test by manually triggering the workflow.
- [ ] Confirm report arrives at 18:00 Israel time.

---

## 14. Future Improvements

The following are explicitly out of scope for MVP and should not be implemented until requested.

| Feature | Description |
|---|---|
| **WhatsApp notification** | Daily summary sent via WhatsApp Business API or a WhatsApp gateway. Not implemented until explicitly requested. |
| **Password-protected dashboard** | Replace owner-mode gate with a real login form and hashed password stored in `localStorage`. |
| **AI-generated insight** | Call the Claude API or similar to generate a natural-language sentence summarizing the day's notable activity. |
| **Advanced charts** | Replace plain text/table panels with interactive charts using a lightweight library (e.g., Chart.js). |
| **Weekly and monthly summary reports** | Additional Telegram or email reports aggregated over longer periods. |
| **Heatmap by time of day** | Show which hours of the day attract the most traffic. |
| **A/B tracking** | Track which variant of a headline or CTA gets more engagement when testing changes. |
| **Export to CSV** | Allow the owner to download raw analytics data from the dashboard. |
