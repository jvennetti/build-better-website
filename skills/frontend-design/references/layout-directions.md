# Layout Direction Menu

Pick ONE direction per page in the design brief (Phase 1) and name it.
Directions can borrow a single section from another direction, but the
page must have one governing idea. **If none of the eight fits, invent
one** — name its governing idea in the brief. The requirement is one
governing idea per page, not membership in this list.

## 1. Editorial Column
One centered ~65ch prose column; hierarchy entirely from type scale and
whitespace; selected images/quotes break out to full-bleed width
(`grid-template-columns: 1fr min(42rem, 100%) 1fr` with breakout
elements spanning all three).
**Pick when** copy carries the page: manifesto, about page, story-driven
product, personal site. **Skip when** copy is thin or content is a
scannable collection.

## 2. Argument Ladder
Sequential full-width sections, each one claim plus one proof
(screenshot, stat, quote). The page is an essay: Problem → Promise →
Proof → Pitch. Every feature ties back to the hero's claim.
**Pick for** SaaS and marketing pages where features build a case.
This is the direct replacement for the numbered-feature-cards habit.

## 3. Split Rhythm
Alternating 50/50 text-beside-visual rows, sides alternating. Maximum
~4 rows, and every visual must be informational (real screenshot,
diagram, product photo). NN/g eye-tracking: with decorative images,
users scan the first row then ignore all subsequent images.
**Pick when** each feature has a genuinely demonstrative visual.

## 4. Statement Bands
The page is punctuated by 1–2 full-bleed sections containing only one
oversized sentence, often on an inverted background, between quieter
passages. **Pick for** brand voice and positioning pages. The sentence
must earn the size — two manifestos per page equals none.

## 5. Pinned Walkthrough (scrollytelling)
A sticky visual stays in frame while short text steps scroll past and
mutate it. Native scroll only — never hijack the scroll wheel (NN/g:
scrolljacking damages control, attention, and task success).
**Pick to** explain one complex thing progressively (product tour, data
story). **Skip on** content-light pages and performance-sensitive
mobile builds.

## 6. Showcase Scroll (product-shot-led)
Huge product imagery center stage, terse captions, generous space;
scroll paces the reveal. Apple's rule: text motion often and cheap,
image/3D motion rarely and deliberate — motion controls pace, it
doesn't decorate. **Pick when** the product is visually gorgeous.
**Skip for** abstract services with nothing photogenic.

## 7. Bento Summary
Exactly one asymmetric mosaic section where cell size encodes
importance (the anti-uniform-grid: the #1 capability gets the big
cell). Used as an "at a glance" moment inside an otherwise linear page.
**Pick for** 5–8 parallel capabilities with a clear most-important one.
**Never** as the whole page, and never with equal-sized cells.

## 8. Gallery Interlude
One horizontal-scroll band for secondary visual content (work samples,
logos, screenshots) inside a vertical page. Needs visible affordances,
keyboard support, and prev/next buttons. **Pick for** portfolios.
**Never** for primary or text content.

## Cross-cutting rules (apply to every direction)

- **Rhythm is the instrument**: adjacent sections should differ in at
  least one of width (contained / full-bleed), background tone
  (light / tinted / dark), or density (single wide column / multi
  column). Repeat a section shape only deliberately, never by inertia.
- **Squint test** the finished page: blur your eyes — exactly one thing
  should dominate, a second thing should read next. If everything blurs
  into equal-weight rectangles, the hierarchy has failed.
- **Cards must be earned**: only for more than 3 genuinely parallel,
  unranked, individually clickable items (team, blog index, templates).
  If order matters, use a list. If one item matters most, use Bento or
  feature-then-grid. If items build on each other, use Argument Ladder.
  A second card grid on the same page needs a reason you can state.
  Cards are the safest choice, not the best — the default is justified,
  never assumed.
- Emphasis is created by **de-emphasizing neighbors** (Refactoring UI),
  not by adding decoration to the important thing.
