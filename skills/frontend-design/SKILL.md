---
name: frontend-design
description: >
  Design direction for building websites, pages, and UI so output looks
  deliberately designed. ALWAYS invoke before writing HTML/CSS/JSX for any
  page or component a person will look at — new sites, landing pages,
  dashboards, redesigns, or "make this look better" requests. Enforces a
  design-approval checkpoint before full builds, a brand-vs-product mode
  split, narrative layout flow over card grids, and the owner's typography
  rules.
---

# Frontend Design

Two failure modes to avoid in every build: the generic AI look (safe
defaults everywhere) and the over-corrected AI look (quirky fonts,
gratuitous gradients). The owner's taste is **clean, quiet, and
confident** — distinctiveness comes from layout, spacing, and one strong
element, not from loud type. Code you have not seen rendered is a draft,
not a deliverable.

**Everything below is a default, not a law.** An explicit user request
beats any rule here, including the bans — say what you'd do differently,
then do what they asked. Mid-build adjustments from the user always win.

## Phase 1 — Design brief and approval gate

For any full page or site (skip for tweaks to existing UI):

1. **If the project has a `DESIGN.md`, read it and obey it.** It wins over
   everything in this skill.
2. Write a short design brief: mode (brand or product — see below), font
   pairing, 4–6 color tokens as CSS variables, the layout direction and
   its governing idea, and the **one signature element** where the design
   takes its risk.
3. Build **one representative section only** (usually the hero) with real
   styling.
4. Present the brief + that section and pause for approval before building
   the rest — **unless** the user already specified the direction, asked
   you to build straight through, or can't respond; then state the brief
   in one paragraph and proceed.
5. If the project has no `DESIGN.md`, offer to save the approved brief as
   one so future sessions stay consistent.

## Phase 2 — Mode: brand vs product

Marketing pages and app screens obey opposite rules. Detect the mode
automatically and **state your choice in one line** ("Product mode —
dashboard screen") so the user can override.

- **Brand mode** — landing, home, about, pricing, portfolio, marketing
  anything: expressive scale, generous whitespace, narrative flow section
  to section, one subtle orchestrated entrance.
- **Product mode** — dashboards, admin, settings, tables, tools, anything
  used daily: dense and scannable, quiet colors, near-zero motion,
  information hierarchy over expression. A dashboard styled like a
  landing page is a failure.

## Typography — the owner's rules

- **Default pairing: Poppins-led.** Poppins for headings only, at limited
  weights (e.g. 300 and 600/700) — full-page Poppins goes monotonous.
  Body in a quiet partner: Source Sans 3 or Instrument Sans, or for
  editorial pages a quiet serif (Source Serif 4, Charter, Newsreader).
  If the subject clearly calls for a different pairing, propose it in the
  brief with the reason. System stacks are fine in product mode.
- Character and novelty display fonts only when the user asks for a
  special, expressive site — and then for headings only.
- Banned fonts: none currently. (Owner adds specific fonts here when one
  keeps appearing unwanted.)
- Never pair two geometric sans faces; two fonts maximum. Hierarchy comes
  from weight and size contrast: extreme weights (300 vs 700+, not 400 vs
  600) and heading-to-body jumps of roughly 2.5× or more.
- `text-wrap: balance` on headings, `text-wrap: pretty` on body — no
  widows or orphans. Body line length 45–75 characters.

## Color

- **No standing palette — propose per project**, drawn from the subject
  matter (the product's world, its materials, its industry), as CSS
  variables in the Phase 1 brief.
- One dominant color plus sharp accents beats an evenly distributed
  palette. Neutrals do most of the work.
- Avoid the AI-default palettes: purple-gradient-on-white, teal accent
  with glowing status dots, reflexive warm-cream "tasteful" beige.

## Layout — flow over cards

The owner's most-hated pattern: pages that dump everything into card
grids and numbered feature lists, so every section has identical weight
and the page has no story.

- When designing any full page, **read
  `references/layout-directions.md`** and pick one layout direction (or
  invent one — the requirement is one governing idea per page, not
  membership in the menu). Name it in the brief.
- **A page reads as one continuous narrative**: each section answers the
  question the previous one raised — hook, then proof, then detail, then
  action. Features are arguments in sequence, not parallel tiles.
- Whitespace is structure. When in doubt, remove a box and add space.

## Motion

- Default: **subtle**. One quiet staggered entrance on page load, gentle
  scroll reveals that fire once — nothing that draws attention to itself,
  nothing that loops forever.
- Product mode: almost none — instant state changes, at most a 150ms ease
  on hover.

## Quality floor (silent — never mention, always do)

- No horizontal overflow at 390 / 768 / 1440 px.
- Empty, loading, and error states for anything dynamic.

Run the **design-review** skill after building, before reporting done.
