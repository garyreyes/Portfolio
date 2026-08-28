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
  the case studies carry the entire persuasive load, which is why full
  case studies and demo videos are Must-have rather than polish.
- **Five of six projects are real, live, or attached to real money.**
  Only `pahinga-coffee` is a practice build. This ratio is the core
  argument of the portfolio and should not be diluted by adding filler
  projects.
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
- **Demo videos are committed as normal files, never Git LFS** —
  Cloudflare Pages does not fetch LFS objects at build time.
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
  viewer count). That reading is what put the Monte Carlo simulator in
  scope — do not re-derive it as "make it minimal."
- **The live element is a client-side Monte Carlo simulator** from
  `Sports-Bet-Tracker`'s maths. Should-have, never at the expense of the
  launch date. No backend — §6 still holds.

## Flows and navigation

- **No authentication anywhere.** No login, no accounts, no gated
  screens. The auth-gate section of the flow map is empty by design.
- **Navigation is `800k.dev`-style**: persistent bar, wordmark left
  returning to the homepage intro, hamburger right opening a full-screen
  overlay menu. **The menu lists all six projects directly**, which is
  what turns it from a hidden utility list into the site's real
  navigation surface — that mitigation is load-bearing, not decoration.
  If it is ever reduced to a plain collapsed list, the
  recognition-over-recall tradeoff stops being acceptable.
- **`/about` was removed and folded into a homepage section;
  `/services` was added** for the small-business audience. Still 11
  routes. No `/contact` (footer only), no `/thanks` (inline success).
- **`/services` must stand alone.** That audience arrives via a link Gary
  sends while pitching, so it is frequently the first and only page seen.
- **Contact is footer-only, sitewide.** One surface, both audiences.

- **The GitHub contribution graph is being built against
  recommendation.** Real data, fetched 2026-08-28: **418 contributions
  across 23 active days out of 370** (94% empty; busiest day 53). The
  inspiring reference (`800k.dev`) had 2,296. A sparse *monochrome* dot
  matrix reads harsher than GitHub's green version because there is no
  colour to soften it, and "inactive" is the one signal the footer must
  not send. Gary chose to build it anyway with the numbers in hand.
  **Revisit once it can be seen rendered rather than described.** The
  alternative on the table was a spec-sheet stat block (projects shipped,
  live in production, real clients, peak day), which fits the
  technical-drawing world better and is flattering on every number.
- **Not GitHub's green squares, and not a third-party image.** Green
  would fight both the technical-drawing world and the neutrals-plus-one-
  accent rule; image services only emit GitHub's own styling. It must be
  build-time API data rendered as custom inline SVG.

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
  stock across all 11 routes (from the orizuru crane); a single vertical
  registration axis everything aligns to (from Versailles); density as
  tone (from the ASCII render).
- **The density raise solves the sparse GitHub graph.** If information
  density is the medium everywhere, a thin field reads as data rather
  than as absence.
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

## Open

- **Domain is not yet purchased** — a v1 blocker. Cloudflare Registrar
  assumed (~$10–15/yr, sold at cost with no renewal markup).
- **Visual direction is not yet assigned.** It must come from
  `/impeccable new-work`'s `concept-seed.mjs`, not be chosen by taste —
  see `docs/PRD.md` §8's aesthetic-clustering warning. Gary shapes the
  *brief*; the seed picks the world inside it.
