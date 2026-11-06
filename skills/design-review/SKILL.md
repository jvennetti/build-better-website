---
name: design-review
description: >
  Browser-based visual and interaction QA for web UI. ALWAYS invoke after
  building or changing any web page, component, stylesheet, or animation —
  run it before reporting the work as done, without being asked. Also invoke
  on "/design-review", "check the design", "review the UI", or "fix the
  design bugs". You cannot judge CSS you have not seen rendered; this skill
  is how you see it.
---

# Design Review

A build is not done when the code compiles — it is done when the rendered
page has been looked at, scrolled, clicked, and found sound at every
viewport. Run this after every UI build or change. Two passes maximum:
capture → fix → re-capture → report.

## 0. Get it rendering

- A published artifact: use its URL.
- A single HTML file: open it directly in the browser (`file:///` path).
- A project with a dev server: start it and note the URL.

If the page won't load, that is the first finding — fix it before
anything else.

## 1. Capture

**First choice: the built-in browser.** If you have browser tools (in the
Claude desktop app these are the `Claude_Browser` tools: open/navigate,
resize the window, screenshot, read console messages), use them. For each
viewport (390x844, 768x1024, 1440x900): resize, reload, take screenshots
while scrolling top to bottom, and read the console for errors. Check for
horizontal overflow by comparing `document.documentElement.scrollWidth`
with `window.innerWidth`. Reset the window size when done. This needs
nothing installed.

**Fallback: the bundled Playwright script**, only when no browser tools are
available. It needs Node.js. If `node --version` fails, follow
`SETUP.md` in the build-better-website repo to install it, then run
`npm install && npx playwright install chromium` inside this skill's
folder:

```
node ${CLAUDE_SKILL_DIR}/scripts/capture.mjs <url> <output-dir>
```

It produces, for mobile (390px), tablet (768px), and desktop (1440px):

- `<viewport>-full.png` — full-page screenshot
- `report.json` — console errors, failed requests, horizontal-overflow
  check, every link href with its HTTP status, and images with missing
  alt text or natural-size distortion

If the page has multiple routes, run the script per route.

## 2. Actually look

Read every screenshot with the Read tool and study it like a design
reviewer, not a compiler. You are looking for what a user would notice in
the first five seconds: misalignment, cramped or uneven spacing, text
overflowing or colliding, sections that don't visually connect, anything
that looks default or unfinished.

## 3. Interaction pass

Write and run a short Playwright script (or extend the capture script) to
exercise the page like a user:

- **Scroll** the full page slowly — do sticky elements behave, do
  scroll-triggered animations fire once and correctly, does anything jump?
- **Click every internal link and nav item** — no 404s, no dead anchors.
- **Hover and focus** every button, link, and nav item — a visible state
  must exist for both.
- **Forms**: submit empty, submit invalid — errors must be visible and
  polite, never a silent failure or console-only error.
- **Reduced motion**: emulate `prefers-reduced-motion: reduce` and confirm
  the page is still fully usable and readable.
- **Keyboard**: Tab through the page — focus order sane, nothing
  unreachable, no focus traps.

## 3½. False signals — verify the harness before you fix the page

Test tooling lies in specific, recurring ways. Before filing any finding,
rule these out:

- **Hidden tabs freeze rendering.** If the page's `document.visibilityState`
  is `"hidden"` (backgrounded tab, occluded pane), Chromium stops
  `requestAnimationFrame`, IntersectionObserver callbacks (even the initial
  one), and programmatic scrolling. Scroll-reveal animations look
  permanently broken when they're fine. Diagnostic: observe any element
  with a fresh IntersectionObserver and count rAF ticks — zero of both
  over ~1.5s means the harness is frozen, not the page. DOM-only checks
  (classes, listeners, form state) stay reliable.
- **`loading="lazy"` images never load in hidden iframes.** Verify by
  fetching the URL for an HTTP status, not by `img.complete`.
- **Scrollbar-bearing iframes report phantom overflow.** A 320px iframe has
  ~302px of client width; a 1–3px "overflow" is the scrollbar. Confirm real
  overflow in a real, visible viewport before fixing.
- **Two unrelated failures at once points at the harness.** When scrolling
  AND animations both "break" simultaneously, suspect the test environment
  before the page.

## 4. Judge

Grade what you saw against this checklist, plus the project's DESIGN.md if
one exists (DESIGN.md wins on any conflict):

**Layout & spacing**
- Consistent spacing rhythm; aligned edges; no accidental near-alignment.
- No horizontal overflow at any viewport (report.json checks this).
- Images undistorted, properly cropped, correct aspect ratio.

**Typography**
- Clear hierarchy — heading levels visually distinct, one h1.
- Body line length 45–75 characters; line-height comfortable.
- No widows/orphans in headings: `text-wrap: balance` on headings,
  `text-wrap: pretty` on body text.
- Contrast meets WCAG AA (4.5:1 body, 3:1 large text).

**States**
- Hover, focus, active states visible on all interactive elements.
- Empty, loading, and error states exist for dynamic content.
- Tap targets ≥ 44px at mobile viewport.

**Motion**
- Animations fire once, are smooth, and never block reading.
- `prefers-reduced-motion` respected.

**Console**
- Zero console errors, zero failed network requests.

## 5. Fix and re-verify

- Rank findings: `[BLOCKER]` (broken, unusable, illegible),
  `[HIGH]` (a user would notice and judge), `[NIT]` (polish).
- Fix all BLOCKER and HIGH findings now. Re-run the capture and confirm
  each fix in the new screenshots — a fix you haven't seen rendered is
  not fixed.
- Maximum two fix passes. If findings remain after the second pass, stop
  and report them honestly instead of thrashing.

## 6. Report

State what was checked (viewports, routes, interactions), what was found
and fixed (reference before/after screenshots), and any remaining NITs.
Never report the build as done without having run this review.
