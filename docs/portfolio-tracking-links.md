# Portfolio Tracking Links

Use these links when sharing the portfolio so that each visit is attributed to the correct source in the analytics report.

**Base URL:** `https://tamtam888.github.io/MyPortfolio/`

---

## How UTM tracking works

- Links **without** UTM parameters will appear as **Direct** in the report, even if they came from LinkedIn or WhatsApp.
- Links **with** UTM parameters are correctly attributed to the channel they came from.
- WhatsApp strips referrer headers by design — always use the WhatsApp UTM link below to track those visits.
- Do not include personal names, recruiter names, or company names in UTM values. Use role or channel labels instead (e.g. `utm_campaign=backend_role`, not `utm_campaign=google_application`).

---

## Ready-to-use links

### 1. LinkedIn post (public feed)

```
https://tamtam888.github.io/MyPortfolio/?utm_source=linkedin&utm_medium=social&utm_campaign=linkedin_post
```

Use when posting your portfolio link on your LinkedIn feed.

---

### 2. LinkedIn private message (DM)

```
https://tamtam888.github.io/MyPortfolio/?utm_source=linkedin_dm&utm_medium=direct_message&utm_campaign=linkedin_dm
```

Use when sending the portfolio link in a LinkedIn direct message to a recruiter or contact.

---

### 3. Facebook post

```
https://tamtam888.github.io/MyPortfolio/?utm_source=facebook&utm_medium=social&utm_campaign=facebook_post
```

Use when sharing on Facebook (personal profile, group, or page).

---

### 4. WhatsApp

```
https://tamtam888.github.io/MyPortfolio/?utm_source=whatsapp&utm_medium=social&utm_campaign=whatsapp
```

Use when sharing the portfolio link in any WhatsApp chat or group. WhatsApp does not pass referrer headers, so without this UTM link the visit will appear as Direct.

---

### 5. CV / Resume

```
https://tamtam888.github.io/MyPortfolio/?utm_source=cv&utm_medium=document&utm_campaign=cv_link
```

Use this as the portfolio link printed or hyperlinked inside your CV/resume. Visitors who open the link from a PDF or document viewer will be attributed to CV.

---

### 6. GitHub profile

```
https://tamtam888.github.io/MyPortfolio/?utm_source=github&utm_medium=profile&utm_campaign=github_profile
```

Use in your GitHub profile README or bio so that visitors coming from your GitHub profile are tracked separately from other sources.

---

### 7. Company application (template)

Replace `COMPANY` with a short label for the company or role. Do not use the company's full legal name — use a short identifier (e.g. `healthtech_co`, `backend_role`, `startup_jun`).

```
https://tamtam888.github.io/MyPortfolio/?utm_source=company&utm_medium=application&utm_campaign=COMPANY
```

**Examples:**

```
https://tamtam888.github.io/MyPortfolio/?utm_source=company&utm_medium=application&utm_campaign=healthtech_role

https://tamtam888.github.io/MyPortfolio/?utm_source=company&utm_medium=application&utm_campaign=frontend_jun
```

Use a different `utm_campaign` value for each job application so you can compare which applications drove traffic.

---

### 8. Recruiter outreach (template)

Replace `CHANNEL` with a short label describing how you reached the recruiter (e.g. `email`, `linkedin`, `event`). Do not use the recruiter's name.

```
https://tamtam888.github.io/MyPortfolio/?utm_source=recruiter&utm_medium=CHANNEL&utm_campaign=recruiter_outreach
```

**Examples:**

```
https://tamtam888.github.io/MyPortfolio/?utm_source=recruiter&utm_medium=email&utm_campaign=recruiter_outreach

https://tamtam888.github.io/MyPortfolio/?utm_source=recruiter&utm_medium=linkedin&utm_campaign=recruiter_outreach

https://tamtam888.github.io/MyPortfolio/?utm_source=recruiter&utm_medium=event&utm_campaign=recruiter_outreach
```

---

## UTM parameter reference

| Parameter | Purpose | Example values |
|---|---|---|
| `utm_source` | Where the visitor came from | `linkedin`, `facebook`, `whatsapp`, `cv`, `github`, `company`, `recruiter` |
| `utm_medium` | Type of channel | `social`, `direct_message`, `document`, `profile`, `application`, `email`, `event` |
| `utm_campaign` | Specific campaign or context | `linkedin_post`, `cv_link`, `healthtech_role`, `recruiter_outreach` |

---

## Owner mode reminder

When testing tracking links yourself, make sure owner mode is active in your browser so your own visits are not counted.

To enable owner mode, visit:

```
https://tamtam888.github.io/MyPortfolio/?owner=true
```

To disable owner mode (e.g. to test tracking as a visitor):

```
https://tamtam888.github.io/MyPortfolio/?owner=false
```
