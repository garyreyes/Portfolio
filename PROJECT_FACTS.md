# Project Facts

Durable, project-specific decisions that should survive across sessions
without being re-explained. Appended whenever a real decision gets made.

Not safety rules (`CLAUDE.md`), not a change log (`CHANGES.md`), not
product truth (`docs/PRD.md`).

---

## Product

- **Primary audience is startup hiring people; secondary is
  small-business owners** (the café-website side hustle). Industrial
  Engineering @ DLSU is *positioning*, not a target audience — IE
  recruiting is handled by résumé, not by this site.
- **"Show, don't tell."** The homepage never claims Gary builds via an AI
  harness; a dedicated "How I build" page owns that honestly. Consequence:
  the project briefs carry the persuasive load — which now rests on the
  live links being up and the code being browsable. *(Long-form case
  studies and recorded demo videos were cut 2026-09-04 — over-built for an
  early-career SWE portfolio, and the video dependency was the biggest
  schedule risk. See `CHANGES.md`.)*
- **Roster is 3 hero briefs + 1 practice card** (2026-09-04, after
  re-verifying every repo): Cornerman, UFC Scouting, Saffron are built for
  real use; Pahinga is a deliberate practice build. **No revenue claim
  anywhere.** The old "five of six are real/live/revenue" framing did not
  survive verification. `nfc-side-hustle` (a door-to-door sales-practice
  project, one pilot, ~3 plates sold) and `sports-bet-tracker` (gambling
  framing, redundant with UFC Scouting) are off v1. Do not add filler to
  pad the count; `nfc-side-hustle` is the only sanctioned add-back, as a
  second card.
- **`saffron-web` was real client work but unpaid** (a friend's business).
  The site may say "available for freelance"; it must **not** imply
  "trusted by businesses." Gary has had no paying client yet, and
  overclaiming is the fastest way to lose a founder's trust.
- **Success metrics in `docs/PRD.md` §7 are placeholders**, not forecasts —
  there is no baseline because no applications have been sent. Revision
  trigger: once ~15 applications are out and replies counted, replace them
  with real numbers.

## Technical

- **ESLint is pinned to v9, deliberately.** ESLint 10 is current, but
  `eslint-plugin-jsx-a11y@6.10.2` caps at v9, and `eslint-plugin-astro`
  exposes its `jsx-a11y/*` rules only when that package is installed.
  Accessibility linting was judged worth more than being on the newest
  major. Revisit when jsx-a11y ships ESLint 10 support.
- **The design-slop detector runs on `dist/`, never on `src/`.** Astro
  components are not HTML until built and Tailwind utilities are not CSS
  until compiled — running it on source would silently check nothing.
- **The detector is a local-only gate.** Vendoring ~1.2 MB of Impeccable's
  JS into this public repo was explicitly rejected: recruiters may browse
  this repository, and clutter has a real cost here. It runs in pre-push
  instead of CI. A `SKIPPED` result means unverified, not pass.
- **Markdown is excluded from Prettier.** Planning documents are authored
  prose; a code formatter rewrapping their tables creates churn with no
  benefit.
- **Media is screenshots, not video** (2026-09-04). Committed as normal
  files under `public/screenshots/`. If a short Cornerman clip is ever
  added it is a normal file too — never Git LFS (Cloudflare Pages does not
  fetch LFS objects at build time).
- **Deploy runs on `*.pages.dev` first; the custom domain attaches later**
  (2026-09-07). Cloudflare Pages serves a free permanent subdomain, so
  nothing in the build waits on a purchase. `site` in `astro.config.mjs`
  is the only place the URL appears in code — it feeds canonical tags, OG
  image URLs and the sitemap, and is a one-line change when the domain
  lands. Set it before sharing the link, or OG previews break.
- **Astro amends the PRD's "React + TypeScript" constraint** to
  "TypeScript everywhere; React where interactive." Static pages are
  `.astro` and ship zero JS; React is loaded only for genuine islands.

## Design brief

- **The anti-cluster reference is industrial / technical drawing** —
  dimension lines, tolerance callouts, blueprint annotation, spec sheets.
  Chosen because it sits outside the dev-portfolio category entirely and
  is authentically Gary's own domain as an IE student. Category-external
  references are what stop a direction converging on "minimal portfolio."
- **`duoplex.pro` was dropped from the reference set.** It is an agency
  *sales* site, a different job from a hiring portfolio; pinning it
  alongside `brittanychiang.com` pulled the brief two ways.
- **`800k.dev` was cited for minimalism, but its actual distinctive move
  is working functionality as content** (live typing test, real-time
  viewer count) — do not re-derive it as "make it minimal."
- **No live/interactive proof element ships in v1** (2026-09-04). The
  Monte Carlo simulator was cut: over-scoped for the deadline, and its
  source project `Sports-Bet-Tracker` was also cut. A client-side
  probabilistic-reasoning widget from `ufc-scouting-app`'s `lib/scoring`
  (implied probability / edge / calibration) is the sanctioned
  post-launch version — no backend, test-first when built.

## Flows and navigation

- **No authentication anywhere.** No login, no accounts, no gated
  screens. The auth-gate section of the flow map is empty by design.
- **Navigation is `800k.dev`-style**: persistent bar, wordmark left
  returning to the homepage intro, hamburger right opening a full-screen
  overlay menu. **The menu lists every project directly** (the 3 hero
  briefs + Pahinga's live site), which is what turns it from a hidden
  utility list into the site's real navigation surface — that mitigation
  is load-bearing, not decoration. If it is ever reduced to a plain
  collapsed list, the recognition-over-recall tradeoff stops being
  acceptable.
- **`/about` folded into a homepage section; `/services` added; the
  `/work` index route removed** (2026-09-04 — four projects don't need
  one; the homepage work section is the full list). **7 routes.** No
  `/contact` (footer only), no `/thanks` (inline success).
- **`/services` must stand alone.** That audience arrives via a link Gary
  sends while pitching, so it is frequently the first and only page seen.
- **Contact is footer-only, sitewide.** One surface, both audiences.

- **The GitHub contribution graph was cut 2026-09-04; the footer carries
  a static spec-sheet stat block instead** (projects shipped, live in
  production, real client work, peak commit day — hand-maintained, no API
  call). Real contribution data, fetched 2026-08-28: **418 contributions
  across 23 active days out of 370** (94% empty; busiest day 53) — a
  sparse monochrome matrix would read "inactive" to exactly the audience
  the footer exists to persuade. The stat block was the alternative
  already on the table; it fits the technical-drawing world better and is
  flattering on every number. Not revisited unless the contribution
  numbers change substantially.

## Visual direction — assigned 2026-08-28

**Shipping manifest / logistics labeling.** Seed key `d4e5136b`, candidate
3 of 7, mode `experience`. The full contract lives as an HTML comment at
the top of `<body>` in `src/layouts/BaseLayout.astro` and is verified
present in built output — **do not move or delete it.**

- **The roll honored the pinned industrial world but refused its softest
  rendition.** Not blueprint-blue with white linework — kraft ground,
  stencil caps, lot codes, consignee lines, rubber-stamped status.
  Materials handling is an IE subject and the world `nfc-side-hustle`
  literally operates in.
- **It maps onto the `Project` entity exactly:** `status` renders as a
  stamped mark, `client` as a consignee line, `stack[]` as a contents
  manifest. The data model and the visual world are the same shape,
  which is why this direction is cheap to build correctly.
- **Three raises, donated by declined challengers** — carry them or the
  direction is weaker than the one that was chosen: one continuous label
  stock across every route (from the orizuru crane); a single vertical
  registration axis everything aligns to (from Versailles); density as
  tone (from the ASCII render).
- **The density raise now carries the lean roster.** It was originally
  meant to make the sparse GitHub graph read as data rather than absence;
  with the graph cut (2026-09-04) it does the same work for a
  four-project site — if information density is the medium everywhere, a
  short manifest reads as substantial rather than thin.
- **Guardrails, binding:** must not read as gimmicky or try-hard, and
  must not look like every other dev portfolio. Both were named by Gary
  as what would make a finished result feel wrong.
- **The memorable moment is the full-screen menu opening** — built as a
  packing list / manifest docket. This is also the mitigation that makes
  hiding navigation behind a hamburger acceptable, so it is load-bearing
  twice over.
- **First viewport leads with the intro, then the work** (Gary's call,
  against Experience mode's default of leading with the artifact).
- **Code-led build.** No image generation was available this session, so
  there is no approved comp; the ambition lives in the contract's
  FIRST VIEWPORT block and the named signature interaction, which the
  finish reviewer audits in behavior.
- **`DESIGN.md` is written at finish, from the built world** — not
  before. A rulebook written ahead of the build gets defended against
  reality instead of describing it.
- Alternates not taken, still adoptable: time-and-motion study (the
  strongest grounded candidate, declined as too on-the-nose) and the
  early-80s drum machine step row (competitive; lost on the loop
  metaphor fitting six unrelated projects).

## Design system — settled 2026-09-07 (Phase 3a)

- **Typefaces: Archivo Narrow 700 (display/labels), Archivo 400–600 (body),
  Space Mono 400 (codes only).** Self-hosted, latin subset, 63 KB total, SIL
  OFL. Settles `ARCHITECTURE.md` open decision 4. Self-hosted rather than
  CDN-linked so the Phase 3d CSP needs no third-party origin. **Body is
  Archivo, not Archivo Narrow** — the contract's "condensed grotesque caps"
  governs display and labels; a 200-word brief set in condensed is punishing.
- **Use the `stencil` utility, never Tailwind's generated `font-stencil`.**
  Only one Narrow face is bundled (700) and nothing requests a weight, so
  `font-stencil` computes to 400 and merely looks bold because 700 is the only
  face available to match. It would silently un-bold the day a Narrow 400 face
  is added. `--font-stencil--font-weight` does not work: Tailwind's
  font-family theme keys take no weight descriptor.
- **The accent has two tokens, and a ground it may not sit on.**
  `--color-safety` (marks, fills, display; 3.58:1) and `--color-safety-text`
  (body-size text and links; 5.26:1). **Neither may be used on
  `--color-stock-300`** — measured 2.98:1 and 4.38:1 there, both failing.
- **No dark mode.** The direction commits to one continuous label stock; an
  inverted variant would be a second world, not a theme of this one.
  `color-scheme: light` is declared so form controls are not painted dark.
- **Never set `overflow-x: clip/hidden` on `html` or `body`.** It was tried in
  3a and removed. Overflow propagates to the viewport, so real overflow stops
  being scrollable and becomes clipped and unreachable (WCAG 1.4.10), and it
  makes the "no horizontal scroll" floor pass vacuously. Verify by measuring
  `scrollWidth == clientWidth` across widths instead.
- **A green `design:check` is not evidence the accessibility floor is met.**
  The detector caught 0 findings on a page whose 11px labels sat at 3.76:1.
  It checks mechanical AI-design tells, not contrast.
- **Primitives are `@utility` classes in `global.css`, not components.**
  Components come in the phase that gives them real props. Raw values are
  allowed inside `global.css` only, and never where they restate an existing
  token — that makes the token dead.

## Design system — Phase 3b additions (2026-09-07)

- **Real social URLs, recorded once.** `src/lib/site.ts` now holds
  `SOCIALS` (GitHub `github.com/garyreyes`, LinkedIn, and a public
  `garyludelq@gmail.com` — deliberately not the DLSU address) so no later
  phase has to ask for them again.
- **The Menu button is intentionally inert in 3b.** It is a real, focusable
  `&lt;button&gt;` with an accessible name, but has no `aria-expanded`, no
  `aria-controls`, and no click handler — it opens nothing. Adding those
  attributes before the panel they'd describe exists would assert a state
  that isn't real. Phase 3c wires both the panel and the ARIA onto this
  exact element; it does not start over.
- **Chrome components (Nav/Footer/SkipLink) read only the three declared
  spacing tokens** (`gutter`, `band`, `axis`) and the declared type scale —
  never Tailwind's un-tokenized numeric defaults (`py-4`, `gap-6`, `text-sm`,
  ...). Caught in review on the first pass; the fix was substitution, not a
  new token, since `gutter`/`band` already covered every real case.
- **`BaseLayout` now owns the `&lt;main&gt;` landmark** (id `main-content`, the
  `axis mx-auto max-w-stock` classes). Pages no longer declare their own
  `&lt;main&gt;` — `index.astro`'s token-proof content sits in a plain `&lt;div&gt;` now.
  A page adding a second `&lt;main&gt;` would be a landmark-structure bug from
  here on, not a style choice.

## Design system — Phase 3c additions (2026-09-07)

- **The menu panel's markup carries no `inert`/`hidden` state at all.** The
  no-JS fallback is this same markup, plainly visible in normal flow — not a
  separate `&lt;noscript&gt;` list. `BaseLayout`'s `&lt;script is:inline&gt;` adds an
  `html.js` class synchronously before paint; only under that class does a
  scoped `&lt;style&gt;` in MenuPanel.astro switch the panel to
  `position:fixed`/hidden. `Nav.astro`'s script adds `inert` to the panel as
  its first action on load — a closed, hidden state only ever exists once JS
  has actually run. Confirmed by stripping every `&lt;script&gt;` from the built
  HTML and rendering: the fallback is real links, real nav, single axis line.
- **`inert` covers the wordmark link too, not just `&lt;main&gt;`/`&lt;footer&gt;`** —
  caught in review. The trigger itself stays reachable while open (clicking
  it again just closes), but the wordmark navigates away, and a screen
  reader's browse-mode cursor doesn't go through the keydown-based focus
  trap. `inert` removes it from the accessibility tree entirely, which is
  the actual guarantee needed here.
- **`inert` does not block a synthetic `.click()` call** — confirmed against
  spec, and the hard way, when a test using `.click()` on the inert wordmark
  triggered a real navigation and a self-inflicted reload loop in the test
  harness, not the site. `inert`'s real guarantees are pointer hit-testing
  and accessibility-tree removal — both of which hold for actual users. A
  test simulating a click bypass isn't a real threat model.
- **`focus({ preventScroll: true })`** on both the open and close focus
  moves — matters specifically for the Contact link (`/#site-footer`, a
  same-page anchor): without it, focusing the trigger on close could race
  the browser's own hash-scroll to the footer. Verified: hash sets, footer
  scrolls into view, panel closes, all in one clean sequence.
- **`MenuPanel.astro`'s wrapper deliberately skips the `axis` utility class**
  and hand-writes the equivalent in a scoped, `html.js`-gated `&lt;style&gt;`
  block instead. Applying `axis` directly produced two parallel hairlines in
  the no-JS state (the panel is a normal nested child of the already-inset
  header there) — caught by an actual headless render, not visible from
  reading the CSS alone. The JS-active `position:fixed` state needs its own
  inset since fixed positioning escapes the header's padding entirely.

## Nav: sticky on scroll (2026-09-09)

- **Requested against an 800k.dev reference** (an always-visible left
  sidebar) — narrowed after clarifying scope: kept the existing horizontal
  bar and full-screen-menu pattern, added only (a) the bar sticks to the
  viewport top on scroll and (b) clicking the wordmark scrolls to top
  instead of only working as a home link. Matching 800k.dev's actual
  sidebar layout would have replaced Phase 3c's reviewed "signature
  moment" pattern entirely — a real redesign, not attempted here.
- **Sticky/background/z-index are gated behind `html.js`**, not plain
  Tailwind classes on `<header>` — caught in review. MenuPanel's entire
  link list renders unconditionally INSIDE that header in normal flow as
  the deliberate no-JS fallback; an unconditionally sticky header pinned
  that ~900px block over the viewport for an entire no-JS session, hiding
  real content behind it. Same `html.js`-gating pattern MenuPanel.astro
  already used for its own `position: fixed` state, for the identical
  reason. Verified both states directly: no-JS scrolls the header away
  normally (`getBoundingClientRect().top` goes negative with scroll), JS
  keeps it pinned at `top: 0`.
- **The wordmark's scroll-to-top respects `prefers-reduced-motion`
  explicitly in JS**, not via the global CSS rule — an explicit
  `behavior: 'smooth'` option passed to `scrollTo()` overrides the CSS
  `scroll-behavior` property, so the global reduced-motion override
  doesn't catch this call and has to be checked directly.
- **Headless Chrome's CLI `--screenshot` flag has a real compositing bug
  for `position: sticky`/`fixed` content** in the version used this
  session — it can show a stuck element in the wrong place even though
  the actual DOM/computed-style state (and a CDP-driven
  `Page.captureScreenshot`) confirm it's correct. Second confirmed
  instance of this class of bug (first was `position: fixed` inside an
  iframe, Phase 3c). Trust `getBoundingClientRect()`/computed styles or
  a CDP-driven screenshot over the CLI flag when verifying non-static
  positioning.
- **A synthetic `.click()` call does not reliably trigger the same
  `window.scrollTo` behavior a real click does** in this interaction
  pattern — confirmed by dispatching a genuine CDP mouse click
  (`Input.dispatchMouseEvent`), which worked correctly where `.click()`
  had not. Same category as the Phase 3c finding that `.click()` bypasses
  `inert`'s real protections — programmatic clicks are not a reliable
  stand-in for real interaction when verifying certain browser behavior.

## Design system — monochrome amendment (2026-09-07, after Phase 3 close)

- **The safety-orange accent is removed, not recoloured** — Gary's explicit
  call, made after being told the tradeoff: black-and-white is one of the
  single most common developer-portfolio looks, and this walks toward the
  thing the whole Phase 2 direction roll existed to avoid. His call stands;
  recorded here so it isn't re-litigated. Every ground/ink token is now
  genuinely achromatic (R=G=B exactly, not just "lighter") — that's the real
  technical difference between "black and white" and the previous warm
  kraft palette.
- **Meaning that used to be carried by hue now reads by weight/fill:**
  live/shipped status is a solid ink FILL on the `stamp` primitive
  (archived/spent stays outline-only); buttons (Menu trigger, menu Close)
  get an ink-fill hover, matching the stamp's own visual language; inline
  text links get an underline, plus darkening to full ink wherever the
  resting colour was lighter than that (an ink-to-ink hover rule would be
  an invisible no-op — caught while building this, not by review).
- **Contrast re-verified from scratch**, not carried over — every pair
  clears AA with more margin than the warm palette needed (worst case
  5.11:1 for `ink-muted` on the darkest ground, vs. AA's 4.5:1 floor).
- **The direction contract in BaseLayout.astro carries a second, separate
  amendment note** (AMENDED 2026-09-07 (b)) distinct from the earlier
  scope-count amendment (a) — this one genuinely alters the assigned
  direction, unlike (a), and is recorded as such rather than folded in.
- **Structure is unchanged**: the manifest metaphor, registration axis, one
  continuous stock, and density-as-tone work from the Phase 3 close
  checkpoint all carry forward untouched — only colour moved.

## Design system — Phase 3 close (2026-09-07)

- **Ran the hard design checkpoint** per ROADMAP.md: `/impeccable critique`
  (dual sub-agent — design review + detector/browser evidence, run in
  isolation from each other) scored the built shell **26/32 applicable**
  heuristics, then `/impeccable polish` on the confirmed scope. Full report:
  `.impeccable/critique/2026-09-07T07-38-23Z__src-pages-index-astro.md`.
- **Sequential lot numbers (01–04) are confirmed authentic**, not a rule
  violation — a real manifest numbers its line items the same way. Recorded
  in the `lot` utility's own comment so the question doesn't recur at the
  Phase 8d finish review.
- **Raise 3 (density as tone) is partially addressed, not fully landed.**
  What shipped: tighter footer rhythm, one hazard-rule motif on the
  always-visible Nav, a size/weight split between project and utility links
  in the menu. **Phase 5a (the real homepage) inherits the open
  obligation** — the real test of a lean 4-project roster reading as
  substantial happens there, not in the shell.
- **`@source not` did not work for excluding `.impeccable/` from Tailwind's
  content scan** in this project's `@tailwindcss/vite` setup (v4.3.3) —
  tried and reverted. One dead, unused `.mt-2` utility ships in `dist/` as a
  result (confirmed zero elements use it); not worth chasing further or
  restructuring source detection for a few harmless bytes. If revisited,
  start from Tailwind's `source(none)` + explicit allow-list pattern rather
  than `@source not`.

## Testing

- **No test runner is installed, deliberately** (decided 2026-08-28,
  reaffirmed 2026-09-04). Nothing in v1 is testable: the content schema
  is enforced by Zod failing the build (stronger than a test), and every
  other surface is judgment/presentation work with no single correct
  output to assert.
- **Phase 7 was removed from v1** (2026-09-04). It held the only
  correctness-critical logic — the contribution graph's date bucketing
  and the Monte Carlo simulator's statistical maths — and both were cut.
  No test-first work remains in v1 scope.
- **If the post-launch probabilistic-reasoning widget is built**, install
  Vitest then (it reuses Astro's Vite config — minutes) and write it
  test-first: a subtly wrong probability/edge calculation renders
  plausible-looking wrong numbers on a site whose purpose is
  demonstrating competence.

## Open

- **Domain is not yet purchased** — no longer a build blocker
  (2026-09-07), but still a launch one: a `pages.dev` URL on a résumé
  reads as unfinished. Cloudflare Registrar assumed (~$12/yr, sold at
  cost with no renewal markup).
- **Résumé PDF does not exist** — deferred, not a launch blocker. The
  footer résumé-download link waits on it.
- **Application timing** — Gary is not applying imminently (2026-09-04).
  The launch guardrail (PRD §7 metric 1) stands anyway; "portfolio 90%
  done for months" is more likely without an application forcing the date.
- **Whether `nfc-side-hustle` returns as a second card** — decide once the
  three heroes are built and the roster can be judged as it renders.
- **Two repo-hygiene tasks before launch:** `saffron-web` has no README
  (13 bytes); `ufc-scouting-app`'s README still describes the frozen
  group/clan tool, not the current solo "intern" app.
