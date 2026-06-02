(function () {
  'use strict';

  // ── Configuration ──────────────────────────────────────────────────────────
  // Replace both values with your Supabase project URL and anon public key.
  // The anon key is safe to commit — RLS restricts it to INSERT only.
  // Never place the service role key here or in any public file.
  var SUPABASE_URL  = 'REPLACE_WITH_YOUR_SUPABASE_PROJECT_URL';
  var SUPABASE_ANON = 'REPLACE_WITH_YOUR_SUPABASE_ANON_PUBLIC_KEY';

  // ── Debug mode ─────────────────────────────────────────────────────────────
  // Visit any page with ?debugAnalytics=true to enable console output.
  // Use this when testing — never leave it on for production monitoring.
  // Visitors who do not set this parameter see nothing in the console.
  var params = new URLSearchParams(window.location.search);
  var DEBUG  = params.get('debugAnalytics') === 'true';

  function log(msg, data) {
    if (!DEBUG) return;
    if (data !== undefined) {
      console.warn('[analytics]', msg, data);
    } else {
      console.warn('[analytics]', msg);
    }
  }

  // ── Owner exclusion ────────────────────────────────────────────────────────
  // ?owner=true  → mark this browser as owner and stop all tracking.
  //                Set this once per browser / device you use.
  // ?owner=false → remove the owner mark and resume normal visitor tracking.
  //                Use this if you want to test the tracking flow from this browser.
  // localStorage portfolio_owner = 'true' → block all tracking silently.
  //
  // This check runs before any network request is made.
  // If owner mode is active, the function returns and nothing else executes.
  if (params.get('owner') === 'true') {
    localStorage.setItem('portfolio_owner', 'true');
    log('Owner mode enabled. Tracking stopped.');
    return;
  }

  if (params.get('owner') === 'false') {
    localStorage.removeItem('portfolio_owner');
    log('Owner mode cleared. Continuing as normal visitor.');
  }

  if (localStorage.getItem('portfolio_owner') === 'true') {
    log('Owner mode active. Tracking stopped.');
    return;
  }

  // ── Session ID ─────────────────────────────────────────────────────────────
  // A random string stored in sessionStorage only.
  // sessionStorage is cleared when the tab closes — this ID cannot be used
  // to re-identify a visitor across sessions or devices.
  // No name, email, IP address, or personal data is stored here.
  function getSessionId() {
    var key = 'pv_session_id';
    var id  = sessionStorage.getItem(key);
    if (!id) {
      id = (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function')
        ? crypto.randomUUID()
        : Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2) + Date.now().toString(36);
      sessionStorage.setItem(key, id);
    }
    return id;
  }

  // ── UTM parameters ─────────────────────────────────────────────────────────
  // Captured once from the URL at page load time.
  // All three values are shared by both the page view and any click events
  // that happen during this session, so clicks can be attributed to the
  // same source that drove the visit.
  var utmSource   = params.get('utm_source')   || null;
  var utmMedium   = params.get('utm_medium')   || null;
  var utmCampaign = params.get('utm_campaign') || null;

  // ── Referrer ───────────────────────────────────────────────────────────────
  // Store the referring hostname only — never the full URL.
  // Full URLs from referrers can contain tokens, session IDs, or other data
  // that may identify an individual.
  function getReferrer() {
    try {
      var ref = document.referrer;
      if (!ref) return 'direct';
      var hostname = new URL(ref).hostname;
      return hostname || 'direct';
    } catch (_) {
      return 'direct';
    }
  }

  // ── Page name ──────────────────────────────────────────────────────────────
  // Maps the current URL path to a short identifier stored in Supabase.
  // Works for both root-domain and subdirectory deployments (e.g. GitHub Pages).
  function getPageName() {
    var path = window.location.pathname;
    if (path === '/' || path === '' || /\/index\.html$/.test(path)) return 'index';
    if (/\/about\.html$/.test(path))       return 'about';
    if (/\/projects\.html$/.test(path))    return 'projects';
    if (/\/medicalcare\.html$/.test(path)) return 'medicalcare';
    return 'unknown';
  }

  // ── Unique visitor — once per calendar day ─────────────────────────────────
  // Uses a date-keyed localStorage entry to record whether this browser has
  // already been counted as a unique visitor today.
  // The key contains only a date string — no user identity, no personal data.
  // Returns true on the first visit of the day; false on subsequent visits.
  function checkIsUnique() {
    var today = new Date().toISOString().slice(0, 10); // 'YYYY-MM-DD'
    var key   = 'pv_visited_' + today;
    if (localStorage.getItem(key)) return false;
    localStorage.setItem(key, '1');
    return true;
  }

  // ── Supabase POST — page views ─────────────────────────────────────────────
  // Page views fire on page load, not on navigation away, so a standard fetch
  // is sufficient. The request is wrapped in try/catch so any failure is
  // completely silent — the portfolio continues to work normally.
  function insertPageView(payload) {
    fetch(SUPABASE_URL + '/rest/v1/page_views', {
      method:  'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SUPABASE_ANON,
        'Authorization': 'Bearer ' + SUPABASE_ANON,
        'Prefer':        'return=minimal'
      },
      body: JSON.stringify(payload)
    }).then(function (res) {
      log('page_view sent', { status: res.status, payload: payload });
    }).catch(function (err) {
      log('page_view failed', err);
    });
  }

  // ── Supabase POST — click events ───────────────────────────────────────────
  // Click events often fire on external links that navigate the page away
  // immediately. A standard fetch may be cancelled before it completes.
  //
  // keepalive: true tells the browser to keep the request alive even after
  // the page navigates away, making it the reliable choice here.
  //
  // navigator.sendBeacon is not used because Supabase REST requires the
  // apikey and Authorization headers, which sendBeacon cannot send.
  //
  // This function never calls event.preventDefault() or delays navigation.
  function insertClickEvent(payload) {
    fetch(SUPABASE_URL + '/rest/v1/click_events', {
      method:    'POST',
      headers: {
        'Content-Type':  'application/json',
        'apikey':        SUPABASE_ANON,
        'Authorization': 'Bearer ' + SUPABASE_ANON,
        'Prefer':        'return=minimal'
      },
      body:      JSON.stringify(payload),
      keepalive: true
    }).then(function (res) {
      log('click_event sent', { status: res.status, payload: payload });
    }).catch(function (err) {
      log('click_event failed', err);
    });
  }

  // ── Project name resolver ──────────────────────────────────────────────────
  // Returns the project display name for a given href, or null if the href
  // does not match any tracked project.
  function resolveProjectTarget(href) {
    if (!href) return null;
    if (href.includes('demo-medical-care') ||
        href.includes('medicalcare.html')  ||
        href.includes('MaddCare'))          return 'MedicalCare';
    if (href.includes('vibe-music'))        return 'VIBE Music';
    if (href.includes('cx-agent-assist'))   return 'CX Agent Assist';
    if (href.includes('task-1mezh0h1x') ||
        href.includes('TaskAi')         ||
        href.toLowerCase().includes('taskai')) return 'TaskAi';
    if (href.toLowerCase().includes('taskman')) return 'TaskMan';
    return null;
  }

  // ── Click type resolver ────────────────────────────────────────────────────
  // Returns the event_type string for a given href, or null if this href
  // should not be tracked. Order matters — more specific checks come first.
  function resolveClickType(href) {
    if (!href) return null;
    if (href.startsWith('mailto:'))    return 'contact_click';
    if (/\.pdf(\?|#|$)/i.test(href))  return 'cv_download';
    if (href.includes('github.com'))  return 'github_click';
    if (href.includes('linkedin.com')) return 'linkedin_click';
    if (resolveProjectTarget(href))   return 'project_click';
    return null;
  }

  // ── Click listener ─────────────────────────────────────────────────────────
  // A single delegated listener attached to document. Reads href passively.
  //
  // Rules this listener follows:
  //   - Never calls event.preventDefault()
  //   - Never calls event.stopPropagation()
  //   - Never delays or modifies navigation
  //   - Does not change any link behavior
  //   - Does not modify the DOM
  //   - Wrapped in try/catch — any error is silent
  function setupClickTracking(sessionId, page, referrer) {
    document.addEventListener('click', function (e) {
      try {
        if (!e.target || typeof e.target.closest !== 'function') return;
        var anchor = e.target.closest('a');
        if (!anchor) return;

        var href      = anchor.getAttribute('href') || '';
        var eventType = resolveClickType(href);
        if (!eventType) return;

        var payload = {
          event_type:   eventType,
          target:       eventType === 'project_click' ? resolveProjectTarget(href) : null,
          page:         page,
          session_id:   sessionId,
          utm_source:   utmSource,
          utm_medium:   utmMedium,
          utm_campaign: utmCampaign,
          referrer:     referrer
        };

        log('click tracked', payload);
        insertClickEvent(payload);
      } catch (err) {
        log('click handler error', err);
      }
    });
  }

  // ── Initialise ─────────────────────────────────────────────────────────────
  // All setup runs synchronously; network calls are async and non-blocking.
  // The script is loaded with `defer` so the DOM is fully parsed before
  // this code executes.
  var sessionId = getSessionId();
  var page      = getPageName();
  var isUnique  = checkIsUnique();
  var referrer  = getReferrer();

  var pageViewPayload = {
    page:         page,
    utm_source:   utmSource,
    utm_medium:   utmMedium,
    utm_campaign: utmCampaign,
    referrer:     referrer,
    is_unique:    isUnique,
    session_id:   sessionId
  };

  log('initialised', {
    page:      page,
    isUnique:  isUnique,
    sessionId: sessionId,
    referrer:  referrer,
    utm:       { source: utmSource, medium: utmMedium, campaign: utmCampaign }
  });

  insertPageView(pageViewPayload);
  setupClickTracking(sessionId, page, referrer);

}());
