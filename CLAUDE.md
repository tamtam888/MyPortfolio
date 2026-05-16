# CLAUDE.md — MyPortfolio Project Instructions

This file contains instructions for Claude Code when working inside the `MyPortfolio` repository.
Read this file before making any changes to the project.

---

## Repository Scope

- Work **only** inside the `MyPortfolio` repository.
- Do not touch, reference, or link to any other repository.
- Do not expose private repositories or private project details.
- Do not link to private GitHub repositories anywhere in public-facing content.

---

## Design System

**Always read `docs/DESIGN_SYSTEM.md` before making any UI, layout, content, landing page, or visual change.**

This applies to:
- HTML structure and layout changes
- CSS modifications or new styles
- Copy edits on any public-facing page
- Section rewrites, hero changes, or project card updates
- Any new components or interactive elements

---

## Styling Rules

- Keep all styling in `.css` files only.
- **No inline styles.** Do not add `style=""` attributes to any HTML element.
- Do not add `<style>` blocks inside HTML files.
- Do not introduce new CSS frameworks or utility libraries unless explicitly requested.
- Preserve existing CSS class naming conventions.

---

## Portfolio Structure

- Preserve the current portfolio structure (pages, sections, file layout) unless the user explicitly asks to change it.
- Do not add, remove, or rename pages without explicit instruction.
- Do not reorganize the file/folder structure without explicit instruction.
- Do not create new pages unless explicitly asked.
- Before creating any new landing page or project detail page, first create a spec document and wait for user review before implementing any HTML or CSS.

---

## Featured Project Order

Always maintain this project order — do not change it unless explicitly instructed:

1. **MedicalCare** — HealthTech platform for therapists (strongest project, always first)
2. **VIBE Music**
3. **TaskAi**
4. **TaskMan**

MedicalCare must remain the strongest and most prominently featured project on every page where projects are listed.

---

## MedicalCare — Positioning and Content Rules

MedicalCare is a HealthTech platform built for therapists. When writing or editing any content related to MedicalCare, follow these rules precisely.

**Approved positioning:**
- Helps therapists reduce administrative workload and save time on repetitive computer tasks
- Provides organized, fast access to patient records, appointments, treatment workflows, and AI-assisted summaries
- Includes a video progress tracking module (Motion Review) as part of the platform
- Presents workflows through clear, button-based actions for speed and ease of use
- Focused on workflow efficiency and accessibility of clinical information

**Do not write:**
- Medical outcome claims (e.g., "improves patient health", "better treatment results")
- Diagnosis claims (e.g., "helps diagnose", "AI diagnosis")
- HIPAA compliance claims
- References to real patient data
- Claims about guaranteed clinical results
- Any framing that presents Motion Review / Video Progress Tracking as a separate product

**Motion Review / Video Progress Tracking** is a module inside MedicalCare. Always present it that way.

---

## Job Interview Simulator

- Keep **Job Interview Simulator** marked as "In Development" in all project listings.
- Do not link to its repository (it is private).
- Do not describe it as complete or publicly available.

---

## TypeScript Wording

Tamar is strengthening her TypeScript skills. Do not describe her as a TypeScript expert.

**Approved phrasing:**
- "TypeScript-based codebase"
- "TypeScript project exposure"
- "strengthening TypeScript skills"
- "working with TypeScript"

**Do not write:**
- "TypeScript expert"
- "TypeScript specialist"
- "proficient in TypeScript" (unless explicitly approved)
- Any phrasing that overstates her TypeScript experience

---

## AI and Tooling Language

- Avoid overusing tool names like **Claude Code**, **Cursor**, **Lovable**, or **Vibe Coding** in public-facing text.
- Referencing AI-assisted development is fine when relevant, but keep it professional and product-focused.
- Do not make the portfolio feel like a tool advertisement.

---

## Writing Tone

- Use professional, clear, product-focused writing throughout.
- Write for a hiring audience: engineering managers, recruiters, and technical leads.
- Be specific about what projects do and who they're for.
- Avoid buzzword-heavy or vague language.
- Keep descriptions grounded in real functionality.

See `docs/DESIGN_SYSTEM.md` for full tone and writing guidelines.

---

## What Not to Do

- Do not modify `index.html`, `projects.html`, `about.html`, CSS files, images, or any existing asset without explicit instruction.
- Do not create new HTML or CSS files for a new page without first writing a spec document and receiving explicit user approval.
- Do not commit changes unless the user explicitly asks.
- Do not push to any remote branch without explicit instruction.
- Do not rename or delete files without explicit instruction.
- Do not add third-party scripts, tracking pixels, or analytics without explicit instruction.
