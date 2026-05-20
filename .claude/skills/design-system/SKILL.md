---
name: design-system
description: >
  Enforces project UI design rules before making any interface changes.
  Use this skill whenever the user asks to build, edit, update, or review any UI component,
  page layout, styling, colors, typography, spacing, buttons, forms, icons, or visual elements.
  Also trigger when the user says things like "make this look consistent", "update the styles",
  "change the theme", "redesign this screen", or "add a new component". This skill must be
  consulted BEFORE writing any UI code or modifying any frontend files — even small tweaks.
---

# Design System Enforcer

Your job is to make sure every UI change respects the project's design rules. This skill acts as
a guardrail: before touching any interface code, you review and apply the established design
system so the result feels cohesive, not cobbled together.

## Step 1 — Discover the design system

Before writing any code, look for the project's design rules. Check these locations in order:

1. `design-system.md`, `DESIGN.md`, or `design/` folder at the project root
2. A `tokens.json`, `theme.js`, `theme.ts`, or `tailwind.config.*` file
3. CSS custom properties (`:root` variables) in global stylesheets
4. A `styles/` or `src/styles/` folder for base tokens or variables
5. Component library config (e.g., `shadcn`, `MUI theme`, `Chakra theme provider`)

If you find design rules, load them into context and follow them strictly in Step 3.

If you find **nothing**, do not invent a system — ask the user:
> "I didn't find a design system file. Should I follow any existing styles I can see in the
> codebase, or would you like me to establish some base rules first?"

## Step 2 — Understand the change requested

Before touching anything, make sure you know:

- **What** component or screen is being changed
- **Why** — is this a new feature, a fix, a visual refresh?
- **Scope** — a single element, a whole page, or a shared component used everywhere?

For shared components (buttons, inputs, cards, nav), changes ripple everywhere — flag this to
the user before proceeding.

## Step 3 — Apply design rules (the core of this skill)

When making UI changes, enforce these categories from the discovered design system:

### Colors
- Use only the defined color tokens or palette. Never hardcode raw hex values like `#3b82f6`
  unless they come directly from the token file.
- Respect semantic roles: primary, secondary, destructive, muted, background, foreground, border.
- Check color contrast for accessibility (aim for WCAG AA: 4.5:1 for text, 3:1 for UI elements).

### Typography
- Use the defined font families, sizes, weights, and line heights — don't introduce new ones.
- Headings, body, captions, and labels should follow the type scale.

### Spacing & Layout
- Use the spacing scale (e.g., 4px base grid, Tailwind spacing tokens, or custom scale).
- Avoid arbitrary margin/padding values that fall outside the scale.
- Respect container widths, max-widths, and responsive breakpoints.

### Components
- Reuse existing components before creating new ones. Check `components/`, `src/components/`,
  or the UI library for an existing match.
- If creating a new component, follow the naming and file structure of existing ones.
- Don't re-implement something the design system already provides (e.g., don't write a custom
  button if `<Button>` exists).

### Interactivity & States
- Every interactive element needs hover, focus, active, and disabled states.
- Focus styles must be visible (don't just remove outlines without a replacement).
- Use consistent transition durations from the design system if defined.

### Icons
- Use the project's established icon library (e.g., Lucide, Heroicons, FontAwesome).
- Don't mix icon libraries.
- Keep icon sizes consistent with the surrounding text or component scale.

## Step 4 — Flag conflicts before writing code

If the requested change **conflicts** with the design system, say so before writing anything:

> "This change would use a color outside the defined palette. The closest token is `--color-primary-500`.
> Should I use that instead, or do you want to add a new token first?"

This prevents silent violations that are hard to find later.

## Step 5 — Deliver the change

Write the UI code. In your response:

- **Reference the tokens/variables** you used and why (one-line callout is enough).
- **Note any deviations** from the design system you had to make, and why.
- **Suggest follow-up** if the change revealed a gap in the design system (e.g., a missing token,
  an undocumented pattern).

## What this skill does NOT do

- It does not change business logic, backend code, or data models.
- It does not create a design system from scratch unless explicitly asked.
- It does not override the user's explicit instruction — if the user says "I know this breaks
  the system, do it anyway," comply and note the deviation.

## Quick reference checklist

Before submitting any UI change, confirm:

- [ ] Colors come from the token/theme file
- [ ] Typography follows the defined type scale
- [ ] Spacing uses the defined scale
- [ ] No new component introduced if an existing one fits
- [ ] Interactive states (hover, focus, disabled) are handled
- [ ] Icons are from the established library
- [ ] No raw hardcoded values that should be tokens
