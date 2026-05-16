# Design System — Tamar Karwan Portfolio

This document defines the visual language, content rules, and component standards for this portfolio.
Read this before making any UI, layout, copy, or styling change.

---

## 1. Brand Personality

This portfolio represents a Frontend Developer focused on React, JavaScript, HealthTech, and AI-powered web applications.

The brand feel should be:
- **Calm and confident** — not loud or flashy
- **Modern and clean** — purposeful whitespace, clear hierarchy
- **Product-focused** — projects look and feel like real products, not student exercises
- **Trustworthy** — especially important for the MedicalCare project, which lives in a clinical context
- **Approachable** — warm enough to feel human, structured enough to feel professional

Do not go for: dark/hacker aesthetic, overly corporate/stiff, heavy gradients, or cluttered layouts.

---

## 2. Color Palette

The portfolio uses a soft purple primary with light, neutral backgrounds. All values below are the intended design direction — match to the actual CSS variables defined in the stylesheets.

| Role | Description | Direction |
|---|---|---|
| Primary | Purple | Used for CTAs, active states, highlights, links |
| Primary Light | Soft lavender | Hover states, subtle backgrounds |
| Background | Off-white / very light gray | Page background — never pure white or pure gray |
| Surface | White or near-white | Cards, panels, modals |
| Text Primary | Near-black | Main body and heading text |
| Text Secondary | Medium gray | Subtitles, meta info, descriptions |
| Border | Light gray | Card borders, dividers |
| Success / Active | Soft green | "Live" badges, deployed status |
| Warning / In Dev | Soft amber or muted purple | "In Development" badges |
| Error | Soft red | Only for form validation, never decorative |

**Rules:**
- Never use pure black (`#000000`) for text. Use a near-black with slight warmth or cool.
- Never use pure white (`#ffffff`) as the page background. Use a soft off-white.
- The primary purple should feel calm, not electric or neon.
- Decorative use of color should be restrained — let layout and typography carry the hierarchy.

---

## 3. Typography

**Hierarchy:**

| Level | Use | Style direction |
|---|---|---|
| H1 | Page title / hero headline | Large, bold, tight tracking |
| H2 | Section headings | Medium-large, bold or semi-bold |
| H3 | Card titles, subsection labels | Medium, semi-bold |
| Body | Paragraph text, descriptions | Regular weight, comfortable line height (~1.6) |
| Small / Meta | Tags, dates, status badges, footnotes | Small, regular or medium weight |
| CTA / Button | Button labels | Medium or semi-bold, no all-caps unless intentional |

**Rules:**
- Use a single typeface family across the entire portfolio (system font stack or a single Google Font).
- Do not mix more than two typeface families.
- Do not use decorative or script fonts.
- Keep line length for body text under ~70 characters per line for readability.
- Heading sizes should step down clearly — there must be visible hierarchy between H1, H2, and H3.
- Do not rely on font size alone for hierarchy — use weight and spacing too.

---

## 4. Layout and Spacing

**Grid:**
- Use a centered content container with a max-width (typically `1100px–1200px`).
- Maintain consistent horizontal padding on all sides, especially on mobile.
- Sections should be visually separated — use vertical spacing generously between sections.

**Spacing scale:**
- Use a consistent spacing scale (e.g., multiples of 8px or a CSS custom property scale).
- Do not use arbitrary margin/padding values like `13px` or `27px`.
- Section padding: generous top/bottom (e.g., `80px–120px` desktop, `48px–64px` mobile).
- Card internal padding: comfortable but not excessive (e.g., `24px–32px`).

**Rules:**
- Whitespace is a design element — do not fill every space.
- Group related elements together with tighter spacing; separate unrelated sections with larger gaps.
- Never let content touch the viewport edge — always maintain horizontal padding.

---

## 5. Button Rules

**Variants:**
- **Primary button** — Filled purple background, white text. Used for main CTAs (View Project, Contact, etc.)
- **Secondary button** — Outlined/ghost style, purple border and text. Used for secondary actions (View Code, Learn More).
- **Disabled button** — Muted style, no interaction. Only for buttons that are not yet functional.

**Rules:**
- Buttons must have a minimum tap/click target of `44px` height.
- Use clear, action-oriented labels: "View Project", "See Live", "View Code", "Send Message" — not "Click Here" or "Submit".
- Do not use all-caps labels unless it's a deliberate design pattern applied consistently.
- All buttons must have a visible `:hover` and `:focus` state.
- `:focus-visible` outlines must be clearly visible for keyboard users (do not remove focus outlines globally).
- Buttons must never be styled with inline styles.
- Destructive or irreversible actions (if any) must be visually distinct.

---

## 6. Card Rules

Cards are used for projects, skills, or content groupings.

**Structure:**
- Surface color (white or near-white) with a subtle border or shadow
- Consistent internal padding
- Clear heading hierarchy inside the card
- Optional: tag/badge area, footer with links or status

**Rules:**
- Cards should feel elevated but not dramatic — use a subtle box-shadow or border, not both heavily.
- Do not use drastically different card styles in the same list — maintain visual consistency.
- Card hover states should be subtle (slight shadow lift or border color shift) — not jarring.
- Cards must be fully keyboard-navigable if they contain interactive elements.
- Do not put too much information in a single card — prioritize clarity over completeness.

---

## 7. Project Card Rules

Project cards represent real products. They must feel like product previews, not resume bullet points.

**Required elements per project card:**
- Project name (H3 or equivalent)
- Short description (1–3 sentences, product-focused)
- Tech stack tags
- Status badge (Live / In Development)
- At minimum one action link (View Project or source link if public)

**Rules:**
- The description must explain **what the product does and for whom** — not just the tech used.
- Tech tags should be concise (React, JavaScript, CSS, Node.js — not "modern JavaScript framework ecosystem").
- Do not show GitHub links for private repositories.
- Do not add "(Coming Soon)" without a status badge — use the badge system exclusively.
- Keep all four featured projects in order: MedicalCare → VIBE Music → TaskAi → TaskMan.
- MedicalCare must always be the most visually prominent project.

---

## 8. Status Badge Rules

Badges communicate project availability at a glance.

| Badge | Use | Style |
|---|---|---|
| Live | Project is publicly deployed and accessible | Soft green background, green text |
| In Development | Project is in progress, not publicly available | Soft amber or muted tone, clear label |
| Private | Repository is private | Neutral/gray, no link |

**Rules:**
- Use consistent badge styling across all pages — same size, font, padding, and color treatment.
- Do not create badge variants not listed above without a documented reason.
- "In Development" badges must always appear on: Job Interview Simulator.
- Do not link "In Development" projects to private repositories.
- Badges must be readable at small sizes — do not reduce font below `11px`.

---

## 9. Hero Section Rules

The hero is the first impression. It must be clear and immediately readable.

**Required elements:**
- Name or role headline
- Short positioning statement (what Tamar does and who she builds for)
- At least one primary CTA (e.g., View Projects, Contact)

**Rules:**
- The hero should load fast and feel clean — no heavy animations, no autoplay video.
- The positioning statement must be specific: mention Frontend Development, React, HealthTech or AI-powered products.
- Do not make the hero too tall — users should see a hint of content below the fold.
- The hero CTA must be a real button element, not a styled `<div>` or `<span>`.
- Do not use stock hero backgrounds or generic gradients — keep it clean and intentional.

---

## 10. Landing Page Section Rules

This section covers two distinct page types: the main portfolio landing page (`index.html`) and project-specific detail pages (e.g., `medicalcare.html`). Do not conflate them — they serve different audiences at different stages of interest.

---

### 10a. Main Portfolio Landing Page — `index.html`

`index.html` is for first-time visitors: recruiters, hiring managers, and technical leads scanning the portfolio for the first time. Its job is to establish who Tamar is and surface the strongest projects quickly.

**Recommended section order:**
1. Hero — who Tamar is and what she builds
2. Featured Projects — lead with MedicalCare
3. Skills / Tech Stack (optional section)
4. About / Brief Bio (optional or link to About page)
5. Contact CTA

**Rules:**
- Each section must have a clear visual start and end — use spacing and/or background variation.
- Section headings must be consistent in size and placement.
- Do not add decorative sections that have no content purpose.
- The page must flow logically — a visitor should be able to skim top-to-bottom and understand the portfolio.

---

### 10b. Project-Specific Landing / Detail Pages — e.g., `medicalcare.html`

A project detail page goes deeper on a single product. It is for visitors who are already interested and want to understand what was built, why, and how. These pages must feel like a product case study, not an extended resume bullet.

**Before creating any project detail page:** write a spec document first and wait for explicit user approval before writing any HTML or CSS.

**Recommended structure for project detail pages:**

1. **Hero** — project name, clear value proposition, target audience, primary CTA
2. **Problem** — what workflow pain or inefficiency the product addresses
3. **Solution** — how the product helps and what it enables
4. **Core Modules** — key features presented as organized, named sections
5. **Workflow** — how the target user would actually use the product, step by step
6. **Technical Highlights** — only if relevant and concise; do not pad this section
7. **CTA** — link to live demo or return to projects

**Rules:**
- Every section must serve a purpose — do not add sections for padding or to appear thorough.
- Write for someone evaluating whether to hire Tamar, not for someone learning to use the product.
- Use the same design tokens, spacing scale, and typography as the rest of the portfolio.
- Do not introduce new layout patterns or component styles not already established.

---

### 10c. MedicalCare Detail Page — Specific Direction

When building or editing a detail page for MedicalCare, apply these rules on top of the general project detail page structure above.

**Lead with:**
- Therapist workflow efficiency and reduced administrative time
- Faster, organized, button-based access to key clinical workflows

**Core Modules to cover:**
- Patient records
- Appointments
- AI-assisted summaries
- Video progress tracking (Motion Review) — present as a module inside MedicalCare, not a separate product

**Framing:**
- Frame the value as: therapists spend less time on repetitive computer tasks and have faster access to what they need.
- Do not frame it as a medical device, diagnosis tool, HIPAA-compliant platform, or clinical outcomes system.

**Do not include:**
- Medical outcome claims
- Diagnosis claims
- HIPAA compliance claims
- References to real patient data
- Guaranteed clinical results
- Any presentation of Motion Review / Video Progress Tracking as a standalone product

---

## 11. Accessibility Rules

All changes must maintain or improve accessibility. Do not introduce regressions.

- Use semantic HTML: `<nav>`, `<main>`, `<section>`, `<article>`, `<header>`, `<footer>`, `<button>`, `<a>`.
- Every `<img>` must have a descriptive `alt` attribute. Decorative images use `alt=""`.
- Color alone must never be the only way to convey information (use text + color together).
- Minimum color contrast ratio: **4.5:1** for normal text, **3:1** for large text (WCAG AA).
- All interactive elements must be reachable and operable via keyboard.
- Do not remove `:focus-visible` outlines globally — style them to match the design instead.
- Form inputs (if any) must have associated `<label>` elements.
- Do not use `<div>` or `<span>` as buttons — use `<button>`.
- Do not use `<table>` for layout purposes.

---

## 12. Responsive Rules

The portfolio must work well across all viewport sizes.

**Breakpoints (approximate guidance):**
- Mobile: up to `480px`
- Tablet: `481px–768px`
- Desktop: `769px` and above

**Rules:**
- Mobile-first is preferred — start with the smallest layout, scale up.
- Project cards should stack to a single column on mobile.
- Navigation must collapse cleanly on small screens — either a hamburger menu or simplified layout.
- Font sizes must not be fixed in `px` for body text — use `rem` or `em` for scalability.
- Touch targets (buttons, links) must be at least `44px` tall/wide on mobile.
- No horizontal scrollbar should appear on any standard viewport width.
- Images must be responsive — use `max-width: 100%` and appropriate `object-fit`.

---

## 13. Writing Tone

Write for a hiring audience: engineering managers, recruiters, and technical leads.

**Do:**
- Be specific about what each project does and who it's built for
- Use active voice: "Built a platform that..." not "A platform was built..."
- Keep descriptions concise — 1–3 sentences per project on cards, longer on detail pages
- Use product-focused language: think of each project as a product, not a homework assignment
- Show awareness of the user: "for therapists", "for teams", "for job seekers"

**Don't:**
- Use filler phrases: "passionate about", "love to code", "dynamic solutions"
- Use vague technology stacks without context: "used modern technologies"
- Over-explain obvious things: don't explain what React is
- Write in third person on the About page — use first person ("I built...", "I focus on...")
- Use jargon that only makes sense internally

---

## 14. Rules for AI and Tooling Language

AI-assisted development is a real part of this work and can be mentioned — but do so carefully in public-facing copy.

**Approved approaches:**
- "Built with AI-assisted development workflows"
- "Developed using modern tooling"
- "Leveraged AI tools to accelerate development"

**Avoid in public-facing text:**
- Overusing specific tool names: Claude Code, Cursor, Lovable, Vibe Coding
- Any phrasing that makes it sound like the tool did the work
- Any phrasing that undermines ownership of the project

The goal is to position Tamar as a developer who uses modern tools effectively — not as someone whose projects were built by AI.

---

## 15. Rules for TypeScript Wording

Tamar is actively strengthening her TypeScript skills. Do not overstate this.

**Approved phrasing:**
- "TypeScript-based codebase"
- "TypeScript project exposure"
- "Strengthening TypeScript skills"
- "Working with TypeScript across projects"

**Do not write:**
- "TypeScript expert"
- "TypeScript specialist"
- "Proficient in TypeScript" (unless explicitly approved for a specific context)
- Any phrasing that presents TypeScript as a primary or mastered skill

When listing TypeScript in a tech stack, it's fine to include it — just don't elevate it above demonstrated strengths like React and JavaScript.

---

## 16. MedicalCare — Visual and Content Direction

MedicalCare is the flagship project. It must look and feel like a real product that belongs in a professional HealthTech context.

### Visual Direction

- **Calm and trustworthy** — no loud colors, no aggressive design choices
- **Clinical but not sterile** — professional and clean, but with warmth; it's built for people
- **Product-like** — it should feel like a real SaaS dashboard, not a class project
- **Organized and spacious** — clear information hierarchy, generous whitespace, clear action affordances

For any screenshots, mockups, or preview images:
- Prefer clean dashboard-style UI with clear sections
- Avoid showing anything that looks like real patient data — use placeholder names and placeholder records
- Highlight button-based workflows, organized lists, clear navigation

### Content Direction

MedicalCare helps therapists work more efficiently. Every word of copy about MedicalCare should reinforce one of these points:

- Reduces repetitive administrative work and manual computer tasks
- Provides fast, organized access to patient records and appointments
- Supports treatment workflows and AI-assisted summaries
- Includes video progress tracking (Motion Review) as a built-in module
- Designed around clear, button-driven actions for speed and accessibility

**Frame the value as:** therapists spend less time on administrative overhead and more time on the work that matters.

**Do not frame it as:** a medical device, a diagnosis tool, a HIPAA-compliant platform, or a clinical outcomes system.

### Module: Motion Review / Video Progress Tracking

This is a **module inside MedicalCare** — not a separate product.

When referencing it:
- "MedicalCare includes a video progress tracking module"
- "Motion Review is a built-in feature of MedicalCare"
- Do not create a separate card, page, or listing for it

### Summary

| Attribute | Direction |
|---|---|
| Tone | Professional, calm, HealthTech |
| Audience | Therapists and clinical teams |
| Value prop | Workflow efficiency, reduced admin time |
| Visual feel | Clean, product-like, organized |
| Avoid | Medical claims, diagnosis, HIPAA, real data |
| Module | Motion Review is part of MedicalCare |
