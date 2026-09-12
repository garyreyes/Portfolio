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
- **AMENDED 2026-09-10: the hamburger/full-screen-overlay menu described
  below is retired.** Gary's call, after an affaanmustafa.com reference —
  plain, always-visible nav links (Work/Services/How I build/Contact) in
  the persistent bar instead. The recognition-over-recall concern this
  section used to flag no longer applies in the direction it was written
  for: nothing is collapsed behind a click anymore, so there's no "plain
  collapsed list" state to worry about becoming the fallback. Kept below
  as history, not current fact.
- ~~Navigation is `800k.dev`-style~~: persistent bar, wordmark left
  returning to the homepage intro, hamburger right opening a full-screen
  overlay menu. The menu listed every project directly (the 3 hero
  briefs + Pahinga's live site), which is what turned it from a hidden
  utility list into the site's real navigation surface.
- **`/about` folded into a homepage section; `/services` added; the
  `/work` index route removed** (2026-09-04 — four projects don't need
  one; the homepage work section is the full list). **7 routes.** No
  `/contact` (footer only), no `/thanks` (inline success).
- **`/services` must stand alone.** That audience arrives via a link Gary
  sends while pitching, so it is frequently the first and only page seen.
- **Contact is footer-only, sitewide.** One surface, both audiences.

- **The GitHub contribution graph was cut 2026-09-04** as the sole
  proof-of-activity element — the footer got a static spec-sheet stat
  block instead (projects shipped, live in production, real client work,
  peak commit day — hand-maintained, no API call). Real contribution
  data, fetched 2026-08-28: **418 contributions across 23 active days out
  of 370** (94% empty; busiest day 53) — a sparse monochrome matrix would
  read "inactive" to exactly the audience the footer exists to persuade.
  **Re-decided 2026-09-12 (see "Contribution graph" below): the graph
  ships alongside the eventual stat block, not instead of it** — Gary's
  call, after seeing the pattern was unchanged (still mostly grey, a
  recent burst from this exact build sprint) and deciding it was still
  worth showing next to something flattering rather than alone.

## Visual direction — reset 2026-09-10

**The shipping-manifest direction is retired. The site is now a plain-text
portfolio.** Gary's call, after an affaanmustafa.com reference — "copy the
elements and font of this since it looks so nonchalant and minimalist."

- **This is the fourth and terminal walk-back of the assigned direction**
  (seed `d4e5136b`): the safety-orange accent (2026-09-07), the full-screen
  manifest menu (2026-09-10), the hazard bars, and now the rest. Four
  successive rejections of pieces of a direction is the direction not
  landing; the call is to reset it cleanly rather than keep chipping. The
  sections below ("assigned 2026-08-28", the Phase 3a/3b/3c design-system
  notes, the monochrome amendment) are kept as history — **they no longer
  describe the site.**
- **Not a clone of the reference.** affaanmustafa.com is Affaan's personal
  brand; what was adopted is the *family* of choices — system UI font, near
  black on off-white, one narrow reading column, hairline `<hr>` rules,
  metrics/status stated plainly in text, zero ornament — fitted to this
  content. The persuasive load still rests where "show, don't tell" (above)
  already put it: real live links and browsable code, not visual style.
- **The known risk, eyes open:** "nonchalant minimalist black-on-white dev
  portfolio" is a well-worn cluster — the exact thing the Phase 2 seed roll
  existed to avoid. Accepted because (a) it is the honest industry norm for
  an early-career portfolio and (b) the four projects are real and carry it.
  If the finished result reads as forgettable, that is the lever to revisit.
- **The system, mechanically** (`src/styles/global.css`, rewritten):
  - Colour: four achromatic tokens — `--color-page` `#fbfbfb` (the ground),
    `--color-ink` `#171717`, `--color-ink-muted` `#5c5c5c` (AA on the
    ground with margin), `--color-rule` `#e2e2e2`. No accent. One light mode.
  - Type: `--font-sans` is the platform UI stack (`-apple-system`, Segoe UI,
    Roboto…). **No web fonts** — `public/fonts/` deleted, no `@font-face`, no
    preloads. Sizes: `meta` 0.8125 / `body` 1 / `lede` 1.1875 / `name` 1.375
    / `title` 1.75rem (`name` added in the ledger pass — see "Homepage
    ledger" below).
  - Measure: spacing tokens `tight` 0.5rem / `gutter` 1rem / `block` 2rem /
    `section` 3rem; container tokens `--container-page` 52rem (the frame) and
    `--container-column` 42rem (the prose cap). *(Originally three spacing
    tokens + one 42rem column; `tight`, `--container-page` and `--rail` were
    added in the 2026-09-10 ledger pass.)*
  - **All seven label-stock primitives are gone**: `axis` `hazard-rule`
    `placard` `stencil` `mark` `lot` `stamp`. The only divider is `<hr>`,
    styled once in the base layer.
- **The direction contract** at the top of `<body>` in
  `src/layouts/BaseLayout.astro` was rewritten to describe this world. It is
  still the mandatory first child and still verified present in `dist/`.
- **What did NOT change:** the honest-status logic in `ProjectCard`
  (status word and link decided independently; never a dead "Live"
  affordance — docs/PRD.md §10), the `Project` content schema, the "show,
  don't tell" positioning, the route list, every safety rule.
- **`DESIGN.md` is still written at finish (Phase 8d), from the built
  world** — that principle survives the reset.
- **Carried to the Phase 3 close design cadence** (`/impeccable critique` +
  `polish`, still owed): the "Work" section heading looks orphaned in its
  whitespace; the desktop reading column is centred with wide side margins
  and may read better left-aligned.

## Visual direction — assigned 2026-08-28

> **SUPERSEDED 2026-09-10 — see "Visual direction — reset 2026-09-10" above.**
> Kept as history. The manifest metaphor, the three donated raises, the
> registration axis and density-as-tone no longer apply to the site.

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
- ~~The memorable moment is the full-screen menu opening~~ — built as a
  packing list / manifest docket. **Retired 2026-09-10** along with the
  hamburger pattern itself (see "Flows and navigation" above) — there is
  no hidden navigation left for it to have been mitigating. The rest of
  the direction (placards, stamps, the registration axis, one continuous
  stock) is unaffected; only this specific signature-moment mechanism
  is gone.
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

> **SUPERSEDED 2026-09-10 — see "Visual direction — reset 2026-09-10".**
> The typefaces, the accent tokens, the primitives and the monochrome
> amendment below are all history now. The two rules that still hold: no
> dark mode, and never set `overflow-x: clip/hidden` on `html`/`body`
> (verify overflow by measuring `scrollWidth == clientWidth`).

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

## Brief pages (2026-09-10, Phase 4c)

- **The `/work/[slug]` pages exist but the homepage does not link to
  them.** `WORK_BRIEFS_LIVE` in `src/lib/site.ts` stays `false` until
  Phase 6 writes the real brief bodies and adds screenshots — a "View
  brief" link to a "Brief pending — Track A3" stub is worse than no link
  for the skeptical hiring audience. Flip the flag in the 6a/6b change,
  not before. Nothing links to the pages while it is false, but they
  still build and deploy.
- **`src/shared/projects.ts` is the home for the `Project` type and all
  label maps** (status/client/platform + `LINK_LABEL`). Both
  `features/projects` and `features/brief` import from here — do not
  re-add a per-feature `labels.ts`. `features/*/queries.ts` re-export the
  `Project` type for their existing importers.
- **Prev/next between briefs is bounded, not cyclic** — ordered by
  `Project.order`, the first hero has no prev and the last no next.
  Deliberate: three briefs are a short ordered list, not a carousel.
- **`media.gallery` is `{ src, alt, width, height }[]`, not `string[]`**
  (schema change this phase). The a11y floor requires explicit
  dimensions + real alt on every screenshot; a bare path can't carry
  them, so it is enforced by Zod at build. `ScreenshotGallery` renders
  nothing at all while `gallery` is absent (all three heroes today) —
  Phase 6 adds the arrays.
- **No `BriefLayout.astro`** — `[slug].astro` uses `BaseLayout` directly.
  `ARCHITECTURE.md` names one; it is deferred to Phase 8a, when per-brief
  OG tags give it a real job. An empty pass-through now would be the
  premature structure the project otherwise avoids.
- **`.prose` (in `global.css`) styles all rendered MDX bodies** — briefs
  now, `/services` and `/how-i-build` later. `overflow-wrap: break-word`
  is load-bearing: authored prose carries URLs and slash-joined paths
  with no break point (a real 320px overflow was caught here). `<pre>`
  block styling is still deferred — no brief body has a code block yet.

## Work section (2026-09-09, Phase 4b)

- **UFC Scouting and Saffron are missing real `liveUrl` values** — both
  are genuinely `status: live` (a real, sourced fact), but no confirmed
  URL was available when the content was written, so their cards
  correctly show a true "Live" label alongside a "View repository" link
  instead of a dead "Live site" link. **Give me the real URLs and I'll add them**
  — a one-line change per file, nothing structural.
- **Static grid only — no hover-preview island.** Confirmed decision, not
  an oversight: it's a Should-have per docs/PRD.md, there are no real
  screenshots to preview yet (Track A2), and ROADMAP.md's cut list already
  named this exact fallback. Revisit once Track A2 lands.
- **`#work` is now the real anchor id** for the homepage's work section
  (was `#contents`, which `MenuPanel.astro`'s "Work" link never actually
  matched — a dead link since Phase 3c, fixed as part of this pass, not a
  new decision).

## Content schema (2026-09-09, Phase 4a)

- **Config file lives at `src/content.config.ts`, not `src/content/config.ts`**
  — ARCHITECTURE.md's original folder tree had the wrong location. The
  installed Astro version (7.2.9, v6+ conventions) rejects the in-folder
  location with a real `LegacyContentConfigError` even when using the
  current loader-based API (`defineCollection` + `glob()`). Confirmed
  empirically. Corrected in ARCHITECTURE.md, CLAUDE.md, and docs/PRD.md —
  all three previously named the wrong path.
- **Two Zod/Astro deprecations fixed by reading the actual type
  declarations**, not guessed: `z` imports from `astro/zod`, not
  `astro:content` (that re-export is removed entirely in Astro 8, per its
  own JSDoc); `liveUrl`/`repoUrl` use `z.url()`, not the deprecated
  `z.string().url()` chain. Verified no behavioral difference between the
  two — same accept/reject set tested directly against the installed Zod
  version.
- **`tagline` and `year` are real, unresolved data gaps**, not filled in —
  no per-project year or real marketing copy exists anywhere in this
  repo's docs. Every one of the four `.mdx` files carries the same visible
  `# PLACEHOLDER` comment on both fields (caught in review: the first pass
  only flagged it in one of the four files, leaving `year: 2026` looking
  like a real fact in the other three). Track A3's translation job is
  where these get resolved.
- **`media.cover` paths (`/screenshots/<slug>/cover.png`) are a real
  naming convention, not a placeholder** — the files don't exist yet
  (Track A2), but the path itself is final; landing a real file at that
  exact location is all Track A2 needs to do, no code change required.
- **`stack[]`/`repoUrl` facts are sourced, not invented** — every entry
  traces to ARCHITECTURE.md's or docs/PRD.md's own project tables. All
  four `repoUrl`/`liveUrl` values were confirmed live (HTTP 200) in
  review, not just plausible-looking.

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

## Homepage work list (2026-09-10 — ledger built, then retired same day)

- **The two-column ledger is retired.** It was built as the "authored
  structural move" the post-reset critique asked for (a fixed `--rail`
  metadata column + `1fr` content column, status label aligned vertically
  down the list). The re-critique found the move didn't land: the aligned
  status column read `Android APK / Live / Live / Live` — near-constant, so
  the vertical alignment carried no information, and the rail was
  visually indistinct from body captions. Gary's call, after weighing the
  options: collapse it. `@utility ledger-row` and `--rail` are gone from
  `global.css`.
- **Each project is now a single-column entry** (`ProjectCard.astro`):
  `<h3>` name → one `text-meta` facts line (`status · client · platform`)
  → the one-liner in full ink → a `text-meta` "Built with …" stack line →
  the honest link(s). Hairline (`divide-y`) between entries. Name-first so
  AT announces "Cornerman. Android APK …", not the metadata before it.
- **Two container roles stay.** `--container-page` (52rem) is the frame
  nav / `<main>` / footer align to; `--container-column` (42rem) caps
  running prose (the intro paragraph, the 404 body, `.prose`).
- **Spacing scale is four tokens** — `tight` 0.5 / `gutter` 1 / `block` 2
  / `section` 3 (rem). `--text-name` (1.375rem) is the project-name size
  (work list) and the brief-page `<h1>`.
- **`year` is still not rendered** — placeholder `2026` in all four
  `.mdx`. The facts line shows status / client / platform, all real.
- **The four `tagline` values are drafts**, adapted from `docs/PRD.md`
  positioning, marked `# DRAFT (2026-09-10) … pending Track A3 review` in
  each `.mdx`. A3 refines them against each repo's own docs.
- **All four projects are peer entries.** Gary's call — no size or tier
  split. Pahinga is distinguished only by its honest "Practice build"
  facts label. (The re-critique flagged that the flagship and the practice
  build read identically; keeping peers is a deliberate override of that.)
- **The nav is one row at every width** — wordmark + two links, no wrap,
  fits past 320px. The earlier below-`sm` vertical stack was a leftover
  from four links; it's gone. When 5b/5c re-add Services + How I build
  (four links, one long), that pass adds a mobile disclosure menu — not a
  full-screen docket (retired 2026-09-10), a simple button + panel.
- **Footer reads as a contact point** — "Get in touch — <email address>"
  as an explicit action, GitHub/LinkedIn as profile links beside it. No
  "contact form to follow" placeholder (read as unfinished). The real form
  is still Phase 5d.

## Homepage about section (2026-09-10, 5a)

- **Section order is intro → about → projects → footer.** Gary's call,
  overriding `docs/user-flows.md`'s original intro → work → about. The
  reader meets who Gary is before scanning the projects; the trade-off
  (projects sit one screen lower on mobile) was accepted.
- **The section is `#projects`, not `#work`.** Renamed in 5a — the nav
  link reads "Projects", the anchor is `#projects`, the `/work` redirect
  points at `/#projects`, the 404 link too. **The `/work/[slug]` brief
  routes are unchanged** — those are *briefs*; the `/work/` prefix is
  incidental and renaming live routes right after 4c wasn't worth it.
  `PRODUCT.md`'s "projects are referred to as *work*" terminology note is
  superseded for the visible label; "work" persists only in the brief
  route path.
- **The about copy shipped is INTERIM and factual** — "I'm self-taught.
  Cornerman was the first project I shipped. Three of the four projects
  here are built for real use; the fourth I built to learn. I'm open to
  startup internships." Gary rejected a fuller first-person draft; a real
  bio is a tracked follow-up (self-taught path, IE-as-systems angle,
  boxing → Cornerman, coffee → Pahinga, "casual but precise" voice). Swap
  it into `index.astro`'s about `<p>` as a plain edit — no structural
  change. It must **not** repeat the hero's "third-year IE student at
  DLSU" line verbatim (the first draft did; caught in review).
- **No photo** — text-only for now (Gary's call). A photo would be the
  site's first image and change the character; addable later as a normal
  committed file with explicit dimensions + alt.
- **Section headings stay `sr-only`** ("About", "Projects") — the `<hr>`
  rules and the content type (prose vs. the project list) self-identify.
  Consistent with the rest of the austere direction.

## Contribution graph (2026-09-12)

- **Ships alongside the eventual stat block, not instead of it** —
  overturns half of the 2026-09-04 cut (see "Flows and navigation"
  above). The pattern that led to the original cut hasn't changed: a live
  pull the same day showed **564 contributions, 34 of 371 days active**
  (~9%), concentrated almost entirely in the last two weeks — literally
  this build sprint. Gary's call, with that pattern shown to him plainly
  first: show it anyway, next to something flattering, rather than not
  at all.
- **`public/contributions.svg` is generated, never hand-maintained or
  fetched client-side.** `scripts/generate-contributions.mjs` queries
  GitHub's GraphQL `contributionsCollection` and renders a plain SVG,
  **not GitHub's green.** No CSP change, no client-side network call, no
  third-party runtime dependency: Astro serves it as a normal static
  asset, same as any screenshot.
- **The 5-step palette is 3 real tokens + 2 computed midpoints, not 5
  tokens** (`--color-rule` #e2e2e2, midpoint #9f9f9f, `--color-ink-muted`
  #5c5c5c, midpoint #3a3a3a, `--color-ink` #171717) — caught in review: an
  earlier version of this file and the script's own comment both
  overclaimed "all five match tokens." If `global.css`'s palette ever
  changes, only 3 of the 5 script values move with it automatically;
  the 2 midpoints need a manual re-check (there's no build step that
  derives them from `global.css`, since the script runs outside Astro's
  build entirely).
- **Verified live, not assumed, before building:**
  - The GraphQL query needs `weeks { contributionDays { date
    contributionCount } }` under `contributionCalendar` for real
    per-day data — confirmed returning 53 weeks × 7 days = 371 cells.
  - **The default Actions `GITHUB_TOKEN` cannot run this query** for an
    arbitrary user's `contributionsCollection` — a documented GraphQL
    API limitation (the same reason every "contribution graph" README
    tool asks for a personal token). A real PAT belonging to
    `@garyreyes`, stored as the repo secret `CONTRIBUTIONS_TOKEN`, is
    required. See `CLAUDE.md` "Project-specific safety rules" for the
    carve-out this needed (a CI-only secret, never shipped to the
    client, is not the hard-stop that rule guards against).
  - **`main`'s branch protection blocks a direct push** from the
    workflow (`required_pull_request_reviews` is configured, 0 approvals
    required but PRs are mandatory) and requires the "Type-check, lint,
    format, build" check to pass, `strict: true` (branch must be
    up to date). A PR opened using the default `GITHUB_TOKEN` would
    **never** get that check to run at all — GitHub's own anti-loop rule
    is that events from the default token don't trigger further
    workflows — which would leave `gh pr merge --auto` stalled forever.
    Fixed by using `CONTRIBUTIONS_TOKEN` (a real PAT) for checkout *and*
    the git/PR steps, not just the GraphQL call.
  - **Repo setting `allow_auto_merge` was `false`; flipped to `true`**
    (2026-09-12, Gary's explicit call) so the scheduled PR merges itself
    once the required check passes. Doesn't weaken branch protection —
    only lets a PR that already satisfies every requirement skip the
    manual click.
- **An `<img src="*.svg">` never exposes the SVG's internal `<title>`
  to anything** — not a screen reader, not a mouse tooltip; only inline
  `<svg>` markup in the HTML gets that. An earlier version of this
  feature assumed otherwise (the "accessible name lives in the SVG's own
  title" claim was wrong — caught in review) and shipped 371 per-cell
  `<title>` tooltips that were pure inert dead weight (they roughly
  doubled the file size for zero benefit). Fixed: `src/lib/contributions.ts`
  reads the generated file's top-level `<title>` and real `width`/`height`
  at Astro **build** time (a static file read, not a live call) and
  `Footer.astro` uses those for the `<img alt>` and dimensions — real,
  accurate, and never drifts from what the script actually wrote,
  including if GitHub's calendar ever returns 52 weeks instead of 53.
- **Cadence: twice-daily cron** (`0 */12 * * *`), matching the pattern
  `ufc-scouting-app` already uses to keep its own free-tier Supabase
  project awake (docs/PRD.md §9). `workflow_dispatch` is also enabled for
  an on-demand run. The workflow closes and deletes any previous
  `chore/update-contributions-*` PR/branch still open before creating a
  new one — otherwise a required-check failure on one run would leave
  abandoned PRs accumulating every 12 hours forever (caught in review).
- **Placement:** footer, after the "Get in touch" / socials row, before
  the copyright line (Gary's call).
- **Setup still owed (Gary, manual — cannot be scripted):** create a
  GitHub personal access token for `@garyreyes` and add it as the repo
  secret `CONTRIBUTIONS_TOKEN`. **Try a fine-grained token scoped to just
  this repository first** (Contents: Read and write, Pull requests: Read
  and write) — least privilege, and it should cover both the git/PR steps
  and the `contributionsCollection` query since that's public profile
  data, not a repo resource. **Fall back to a classic PAT with `repo`
  scope only if the "Generate contribution graph" step errors on
  permissions** — a classic token is what was actually proven live
  2026-09-12, but it grants access to every repo the account can touch,
  broader than this needs (caught in review). The workflow's git commits
  use `garyreyes@users.noreply.github.com`, not the real address, so the
  personal email doesn't sit in a public workflow file. Until the secret
  exists, the scheduled workflow fails loud at the generation step (no
  PR opens, nothing merges) — the SVG already committed in this change is
  a real, live-fetched snapshot (generated 2026-09-12 using a local
  authenticated session), so the site isn't broken in the meantime; it
  just won't auto-update until the secret is added.

## Links and routes (2026-09-10, harden pass)

- **Never ship an internal link to a route that isn't built.**
  `scripts/check-links.mjs` (`npm run check:links`, in pre-push + CI) fails
  the build on any in-site `href`/`src` to an unbuilt path or a dead
  `#anchor`. It caught the homepage shipping "View brief" → `/work/*` and
  nav → `/services` / `/how-i-build`, all 404 — a P0 in the post-reset
  critique that a green build and `design:check` both missed. `check:links`
  runs `astro build` itself, so a manual run never checks a stale `dist/`.
- **Internal `href`/`src` must be root-absolute** (`/work/x`,
  `/screenshots/y.png`) — `check-links.mjs` reports a relative ref
  (`../foo`) rather than resolving it. This is a constraint on `.mdx` brief
  authoring (Phase 4c): write `[repo](/work/...)`, not `[repo](../...)`.
- **Two gates in `src/lib/site.ts`:** `NAV_LINKS` holds only routes that
  resolve today (trimmed to Work + Contact — re-add Services at 5b, How I
  build at 5c); `WORK_BRIEFS_LIVE` (bool) gates every "View brief" link and
  flips to `true` in the same change that adds `src/pages/work/[slug].astro`
  (4c). This mirrors `ProjectCard`'s existing "no dead `liveUrl` affordance"
  rule.
- **`/404` shipped early** (`src/pages/404.astro`, pulled from 5d). Astro
  builds it to `dist/404.html`; Cloudflare Pages serves it for any
  unmatched path with no config.

## Deploy and headers (2026-09-10, Phase 3d)

- **The Cloudflare Pages project is named `garyreyes`** → the free
  subdomain is `garyreyes.pages.dev`. `site` in `astro.config.mjs` is set
  to `https://garyreyes.pages.dev`; it becomes the custom domain at
  ROADMAP A5 with no other code change.
- **CSP is delivered by Astro's `security.csp`, not by `_headers`.** Astro
  computes a per-build SHA-256 hash for its own inline script (the wordmark
  scroll-to-top) and emits a `<meta http-equiv="content-security-policy">`.
  The build currently emits ~8 script hashes and 2 style hashes — that is
  Astro hashing its whole known script/style surface (React integration
  bootstrap, an empty style block), not a sign of stray inline code. Only
  one real inline `<script>` exists (`Nav.astro`). Verified in a headless
  browser with CSP enforced: the script runs, zero violations.
- **Widen the CSP per-feature, in `astro.config.mjs`:** Phase 5d adds
  `connect-src https://api.web3forms.com`; Phase 8b adds
  `script-src https://static.cloudflareinsights.com` and
  `connect-src https://cloudflareinsights.com`. Do not pre-add them.
- **`markdown.syntaxHighlight: false`** — Shiki emits inline `style=` spans
  that the strict `style-src 'self'` blocks (Astro can't hash per-element
  styles). Prism was the alternative but class-based colour highlighting
  fights the achromatic direction anyway. Code blocks in project briefs
  render as plain `<pre><code>`; style them monochrome in `global.css` when
  4c first ships one. Re-decide only if a brief genuinely needs coloured
  code.
- **`frame-ancestors` is deliberately absent from the CSP** — it is ignored
  inside a `<meta>` CSP. `X-Frame-Options: DENY` in `public/_headers`
  carries clickjacking protection instead.
- **`public/_headers` carries the non-CSP headers only:** `X-Frame-Options`,
  `X-Content-Type-Options`, `Referrer-Policy`, `Strict-Transport-Security`
  (`max-age=31536000; includeSubDomains`, no `preload`), `Permissions-Policy`.
  **Re-check the HSTS `includeSubDomains`/`preload` decision when the custom
  domain attaches (A5)** — the calculus is different on an apex domain.
- **Post-deploy verification is owed once the project exists:**
  `curl -sI https://garyreyes.pages.dev` must show all five `_headers`
  entries, and a browser must show the `<meta>` CSP with no console
  violations on the live site. Cloudflare Pages serving `_headers` correctly
  is a documented contract but has not been verified live for this project.

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
