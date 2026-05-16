# MedicalCare — Landing Page Specification

**File this spec covers:** `medicalcare.html` (not yet created)
**Status:** Spec only. Do not create HTML or CSS until this document is reviewed and approved.
**Last updated:** 2026-05-16

---

## 1. Page Goal

This page is a project detail page for MedicalCare — Tamar Karwan's strongest portfolio project.

Its purpose is to give a hiring audience (engineering managers, recruiters, technical leads) a clear, product-focused picture of what MedicalCare is, what problem it solves, how it works, and what technical decisions went into building it.

The page should feel like a product case study, not a feature list. It must communicate:
- What MedicalCare does and who it's for
- Why it was needed
- How it works in practice
- What was built and how

The page is not a product marketing page. It is a portfolio piece demonstrating frontend development skill, product thinking, and UX judgment.

---

## 2. Target Audience

**Primary reader:** Engineering managers, technical leads, and recruiters evaluating Tamar as a frontend developer.

**Secondary reader:** Therapists or HealthTech stakeholders who may land on the page from a demo link.

**What the primary reader wants to know:**
- Is this a real, thoughtfully built product or a class project?
- What decisions were made and why?
- What is the complexity and scope of what was built?
- Does the developer understand the domain they built for?

---

## 3. Main Message

> MedicalCare helps therapists spend less time on repetitive administrative computer work and more time on the work that matters — by centralizing patient records, appointments, treatment workflows, AI-assisted summaries, and video progress tracking in one organized, button-driven platform.

This message should be implicit throughout the page. It does not need to appear word-for-word, but every section should reinforce one part of it.

**What this page must never say:**
- That MedicalCare improves patient health outcomes
- That it diagnoses or assists in diagnosing
- That it is HIPAA compliant
- That it guarantees clinical results
- Anything that references real patient data

---

## 4. Recommended Page Structure

| # | Section | Purpose |
|---|---|---|
| 1 | Hero | First impression — name, value prop, audience, CTAs |
| 2 | Problem | Why this product needed to exist |
| 3 | Solution | What MedicalCare does about it |
| 4 | Core Modules | What was built — feature by feature |
| 5 | Workflow | How a therapist actually uses it |
| 6 | Technical Highlights | What was built and how — kept concise |
| 7 | Closing CTA | Where to go next |

Each section should have a clear visual boundary (spacing and/or background variation). No section should exist just to fill space.

---

## 5. Section-by-Section Content Plan

### Section 1 — Hero

**Purpose:** Establish what MedicalCare is and who it's for in under 5 seconds of reading.

**Elements:**
- Project name: MedicalCare
- Status badge: Live
- Value proposition: one sentence, therapist-focused
- Audience label: Built for therapists and small clinical teams
- Primary CTA: View Live Demo (links to deployed project)
- Secondary CTA: Back to Projects (links to projects.html)

**Tone:** Direct, product-focused, no hype.

---

### Section 2 — Problem

**Purpose:** Show domain understanding. Explain why this product needed to exist.

**Elements:**
- Short intro sentence framing the context
- 3–4 problem statements (in plain prose or a tight visual list)
- No dramatic framing — grounded, factual

**Key problems to cover:**
- Therapists spend significant time on repetitive administrative computer tasks between and during sessions
- Clinical information is often spread across separate tools: notes, appointment systems, records, and progress tracking
- Switching between these tools adds friction to daily workflows
- Manual data entry and retrieval slow down what should be fast, routine actions

---

### Section 3 — Solution

**Purpose:** Describe how MedicalCare addresses the problem.

**Elements:**
- Short paragraph or 3-point summary
- Emphasize: centralization, speed, organized button-based access
- Do not make it sound like a pitch — keep it product-description level

**Key points to cover:**
- MedicalCare brings patient records, appointments, treatment workflows, AI-assisted summaries, and video progress tracking into a single dashboard
- Navigation between features is designed around clear, button-driven actions — reducing the number of steps to reach common tasks
- The goal is a more organized and efficient daily workflow for therapists, not a replacement for clinical judgment

---

### Section 4 — Core Modules

**Purpose:** Walk through what was built. Each module gets a short description.

**Elements:**
- Section heading: Core Modules (or "What's Inside")
- 5 module cards or subsections, each with a name and 1–2 sentence description
- Do not show real patient data in any screenshots or mockups

**Modules:**

**Patient Records**
Therapists can view and manage structured patient profiles, including session history and relevant clinical notes. Records are organized for quick access, not buried in nested menus.

**Appointments**
A clear view of upcoming and past appointments helps therapists prepare and follow up without switching between tools. Appointment context is surfaced alongside the relevant patient record.

**AI-Assisted Treatment Summaries**
Therapists can generate and refine session summaries using built-in AI assistance. The feature is designed to reduce the time spent on documentation after sessions, not to replace clinical writing.

**Video Progress Tracking — Motion Review**
Motion Review is a module inside MedicalCare that allows therapists to record, review, and annotate video for tracking physical or movement-based progress over time. It is part of the platform, not a separate product.

**Therapist Workflow Dashboard**
The dashboard gives therapists a starting point for their session workflows. From here they can navigate to any module, see their current patient list, and move between tasks with minimal friction.

---

### Section 5 — Workflow

**Purpose:** Make the product feel real by showing a concrete use scenario. This is the most human section on the page.

**Format:** A numbered step-by-step flow. Short and clear — one line or sentence per step. Optionally supported by a screenshot or UI mockup.

**Steps:**

1. Open the dashboard and select a patient from the current session list
2. Review the patient record — previous notes, appointment history, and relevant context
3. Begin the intake or treatment workflow using the button-based action panel
4. During or after the session, use the AI summary tool to draft or refine session notes
5. If tracking movement or physical progress, open the Motion Review module to log or review video
6. Return to the dashboard with an organized record of the session

**Tone note:** Do not write this as a tutorial. Write it as a quick illustration of how the product flows — as a hiring reader would read a case study.

---

### Section 6 — Technical Highlights

**Purpose:** Show what was built, at a level that a technical hiring reader will appreciate. Keep it short — this section should not dominate the page.

**Format:** Short paragraph or a tight 2-column list (technology / what it was used for). Do not pad this section with technologies that were not meaningfully used.

**Suggested highlights (confirm against actual project before implementing):**

| Technology / Decision | Role in the project |
|---|---|
| React | Component-based UI, modular feature structure |
| JavaScript | Core application logic and state management |
| Supabase (if used) | Backend data layer for patient records and appointments |
| AI integration | Powering the treatment summary generation feature |
| Responsive UI | Full usability across desktop and tablet viewports |
| RTL / Hebrew support | If applicable — support for right-to-left interface language |
| Modular architecture | Each workflow module (records, appointments, summaries, Motion Review) is structured as an independent feature |

**Important:** Only include rows that are accurate to the actual build. Remove any that are not applicable.

---

### Section 7 — Closing CTA

**Purpose:** Give the reader a clear next step. Do not end the page without direction.

**Elements:**
- Short closing sentence (optional — 1 line max)
- Primary CTA: View Live Demo
- Secondary CTA: Back to Projects
- Tertiary link: Contact Tamar (links to contact section on index.html or mailto)

---

## 6. Suggested English Copy

The copy below is draft-level. Review and adjust before implementing. All copy follows the tone and content rules in `CLAUDE.md` and `docs/DESIGN_SYSTEM.md`.

---

### Hero Copy

**Headline:**
`MedicalCare`

**Subheadline / Value Proposition:**
`A HealthTech platform that helps therapists spend less time on repetitive administrative work and more time focused on the work that matters — built around fast, organized, button-driven workflows.`

**Audience label (small text below subheadline):**
`Built for therapists and small clinical teams`

**Status badge:**
`● Live`

---

### Problem Copy

**Section heading:** `The Problem`

**Body:**
Therapists work with a lot of information — patient histories, appointment schedules, session notes, treatment plans, and progress records. In many workflows, this information is spread across multiple tools, and moving between them is slow and repetitive.

Time spent navigating systems creates friction in the therapist's daily workflow. And for therapists running independent or small-group practices, that time has a real cost.

MedicalCare was built to address that friction directly.

---

### Solution Copy

**Section heading:** `The Solution`

**Body:**
MedicalCare centralizes the key parts of a therapist's administrative workflow into one organized platform. Patient records, appointment context, treatment workflows, AI-assisted session summaries, and video progress tracking are all accessible from a single dashboard.

Navigation is designed around clear button-based actions — common tasks are reachable in fewer steps, and the structure of the interface reflects how therapists actually work through a session.

---

### Core Modules Copy

**Section heading:** `Core Modules`

See Section 5 above for individual module descriptions. Use those descriptions as the copy for each module card.

---

### Workflow Copy

**Section heading:** `How It Works`

**Intro line (optional):**
`A typical session workflow in MedicalCare looks like this:`

Then use the numbered steps from Section 5 above.

---

### Technical Highlights Copy

**Section heading:** `Technical Highlights`

**Intro line (optional):**
`MedicalCare is a React-based web application built with a modular HealthTech workflow structure.`

Then use the technology table from Section 6 above, trimmed to what's accurate.

---

### Closing CTA Copy

**Closing line (optional):**
`MedicalCare is live and available to explore.`

**Button labels:**
- Primary: `View Live Demo`
- Secondary: `Back to Projects`
- Tertiary: `Contact Tamar`

---

## 7. CTA Buttons and Link Targets

| Button | Label | Link target | Style |
|---|---|---|---|
| Hero primary | View Live Demo | Deployed project URL | Primary (filled purple) |
| Hero secondary | Back to Projects | `projects.html` | Secondary (ghost/outlined) |
| Closing primary | View Live Demo | Deployed project URL | Primary (filled purple) |
| Closing secondary | Back to Projects | `projects.html` | Secondary (ghost/outlined) |
| Closing tertiary | Contact Tamar | `index.html#contact` or `mailto:` | Text link |

**Rules:**
- All CTA buttons must be `<a>` elements styled as buttons, or `<button>` elements with proper `href` handling.
- Do not use `<div>` or `<span>` as buttons.
- All external links (live demo) must open in a new tab (`target="_blank" rel="noopener noreferrer"`).
- Internal navigation links (Back to Projects, Contact) must open in the same tab.

---

## 8. Visual Direction

Refer to `docs/DESIGN_SYSTEM.md` sections 1, 2, 3, 4, and 16 for full visual rules. The following is a summary specific to this page.

**Overall feel:** Calm, organized, product-like. This is a HealthTech platform — it should feel trustworthy and professional without being cold or clinical.

**Color:**
- Use the established portfolio color palette (soft purple primary, off-white background, white cards).
- Do not introduce new colors on this page.
- Section background variation (alternating white / very light gray) is acceptable and recommended to visually separate sections.

**Typography:**
- Match the typeface and scale used across the rest of the portfolio.
- Hero headline: H1. Section headings: H2. Module names: H3. Body text: regular weight, ~1.6 line height.

**Module cards:**
- Each Core Module should be presented as a card or structured block with name (H3), short description, and optional icon or visual accent.
- Cards must follow the card rules in `docs/DESIGN_SYSTEM.md` section 6.

**Screenshots / mockups:**
- If screenshots are included, they must show placeholder data only — no real patient names or records.
- Images must be responsive and have descriptive `alt` text.
- Prefer clean, cropped dashboard views that highlight the UI structure rather than specific data.

**Workflow section:**
- Can be presented as a numbered vertical list, a horizontal step flow (desktop only), or a simple ordered list with visual separators.
- Must collapse to a single vertical list on mobile.

**No new layout patterns:** All layout on this page must use the same grid, spacing scale, and component styles already established in the portfolio. Do not introduce new CSS patterns not already in use.

---

## 9. Accessibility Requirements

This page must meet the same accessibility standards as the rest of the portfolio. See `docs/DESIGN_SYSTEM.md` section 11 for full rules. Key requirements for this page:

- Page must have a single `<h1>` (the project name in the hero).
- Section headings must use `<h2>`. Module names within sections must use `<h3>`.
- All images must have descriptive `alt` text. Decorative images or icons use `alt=""`.
- CTA buttons must be keyboard-focusable with a visible `:focus-visible` state.
- Color contrast must meet WCAG AA minimums: 4.5:1 for normal text, 3:1 for large text.
- The workflow steps must be marked up as an `<ol>` (ordered list).
- The module cards must not use `<table>` for layout.
- If any interactive elements exist (expandable sections, tabs), they must be fully keyboard-accessible.
- The page must have a `<nav>` for internal navigation (back to portfolio) and a `<main>` landmark wrapping all primary content.

---

## 10. Responsive Behavior

See `docs/DESIGN_SYSTEM.md` section 12 for full responsive rules. Page-specific behavior:

**Desktop (769px and above):**
- Full-width hero with centered content container (max-width ~1100–1200px).
- Core Modules presented as a 2-column or 3-column card grid.
- Workflow steps can be shown as a horizontal flow if the design supports it cleanly; otherwise use a vertical list.
- Technical Highlights presented as a 2-column table or side-by-side list.

**Tablet (481px–768px):**
- Module cards: 2-column grid or single column depending on card width.
- Workflow: vertical list.
- Hero: single column, centered.

**Mobile (up to 480px):**
- All content: single column.
- Module cards: stacked, full width.
- Workflow: vertical ordered list.
- CTA buttons: full width or close to it, stacked vertically.
- Hero subheadline font size may reduce slightly — do not go below readable size.
- Touch targets: all buttons and links must be at least 44px tall.

---

## 11. Content Restrictions

These restrictions are absolute. No exceptions without explicit instruction.

**Do not write or imply:**
- That MedicalCare improves patient health outcomes
- That it assists in or replaces clinical diagnosis
- That it is HIPAA compliant or meets any regulatory standard
- That it guarantees results of any kind — clinical, operational, or otherwise
- Anything referencing real patient names, records, or data

**Do not show:**
- Screenshots or mockups containing real patient data
- Any data that could be mistaken for real clinical records

**Motion Review / Video Progress Tracking:**
- Must always be presented as a module inside MedicalCare
- Must never be presented as a standalone product, separate application, or independent feature
- Must always be referred to in context: "MedicalCare includes a video progress tracking module called Motion Review"

**Tone restrictions:**
- Do not use: "revolutionary", "game-changing", "cutting-edge", "disrupting healthcare"
- Do not use: "passionate", "love to build", "dynamic"
- Do not overpromise: the product helps therapists work more efficiently — it does not transform healthcare

---

## 12. Technical Implementation Notes

These notes are for the future HTML/CSS implementation step. Do not begin implementation until this spec is approved.

**File to create:** `medicalcare.html`
**Stylesheet:** Add MedicalCare-specific styles to an appropriate existing CSS file, or create `medicalcare.css` — confirm with user before creating a new CSS file.
**No inline styles:** All styling must be in CSS files only. No `style=""` attributes. No `<style>` blocks in HTML.

**HTML structure (recommended skeleton):**

```
<header> — site navigation (shared with rest of portfolio)
<main>
  <section id="hero"> — Hero
  <section id="problem"> — Problem
  <section id="solution"> — Solution
  <section id="modules"> — Core Modules
  <section id="workflow"> — Workflow
  <section id="technical"> — Technical Highlights
  <section id="cta"> — Closing CTA
</main>
<footer> — shared footer
```

**Navigation:**
- The page should share the same `<header>` / `<nav>` as `index.html` and `projects.html` for visual consistency.
- Confirm whether navigation is copy-pasted or will be refactored into a shared include.

**Images:**
- All screenshots and mockups must be placed in the existing `images/` or `assets/` directory (confirm folder name before implementation).
- Use descriptive file names: `medicalcare-dashboard.png`, `medicalcare-motion-review.png`, etc.
- All `<img>` elements must include `alt`, `width`, and `height` attributes.

**External links:**
- Live demo link: must use `target="_blank" rel="noopener noreferrer"`.
- Confirm the live demo URL before implementation.

**CSS class naming:**
- Follow the existing class naming conventions already in use across the portfolio.
- Do not introduce a new naming convention (e.g., BEM) unless explicitly requested.

**Performance:**
- Optimize all images before adding them to the project.
- Do not add any third-party scripts, tracking pixels, fonts, or analytics without explicit instruction.

**Before starting HTML/CSS implementation:**
1. Confirm this spec is approved
2. Confirm the live demo URL
3. Confirm whether a new `medicalcare.css` file is needed or if styles go into an existing file
4. Confirm the correct images folder path
5. Confirm whether navigation HTML is shared or duplicated
