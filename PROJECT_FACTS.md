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

- **Domain is not yet purchased** — a v1 blocker. Cloudflare Registrar
  assumed (~$12/yr, sold at cost with no renewal markup).
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
