# Changes

A dated log of what actually shipped. Appended by `feature-planner` as
features complete — newest first.

Format: what changed, and why it mattered. Not a git log; git already
does that.

---

## Unreleased

### 2026-09-10 — ROADMAP 5a: homepage about section + "Work" → "Projects"

The last structural piece of the homepage.

- **New section order: intro → about → projects → footer** (Gary's call,
  overriding the documented intro → work → about). The reader meets who
  Gary is before scanning the projects.
- **`src/pages/index.astro`** gains `<section id="about">` — one paragraph
  of **interim factual** copy ("I'm self-taught. Cornerman was the first
  project I shipped. …"). A fuller first-person bio (the self-taught path,
  IE-as-systems, boxing → Cornerman, coffee → Pahinga) is a tracked
  follow-up; swap it in as a plain edit. The homepage still makes no claim
  about the AI-assisted build method (docs/PRD.md §4).
- **"Work" → "Projects" everywhere it's user-facing:** the nav link, the
  section `id` (`#work` → `#projects`), the `/work` redirect target, the
  `/404` link and copy, the direction contract. **The `/work/[slug]` brief
  URLs are unchanged** — those are "briefs"; the prefix is incidental.
- **`ProjectGrid`** first/last row drop their outer `py-block`
  (`[&>li:first-child]:pt-0`, `:last-child]:pb-0`) so the list sits one
  clean section below the rule above it, not a section plus a row's pad —
  and the trailing gap before the footer tightens.
- Both inter-section `<hr>` are `my-section`, so hero→about and
  about→projects read as equal breaks.
- Docs reconciled: `docs/user-flows.md` (section order, `#projects`, the
  stale nav-links list), `ARCHITECTURE.md`, `PROJECT_FACTS.md`
  ("Homepage about section").
- Gates: `check`, `build`, `check:links`, `design:check` (0 findings) all
  clean; detector on `index.astro` clean; CDP screenshots + overflow at
  320/375/1280 verified.

### 2026-09-10 — Homepage re-critique → retire the ledger, simplify

Re-ran `/impeccable critique` (dual-agent) on the homepage after the
ledger + polish. Scored **24/32** (trend: 26 → 21 → 24, all /32). Core
finding: the two-column ledger did **not** land as the authored move the
21/32 run asked for — its aligned status column read
`Android APK / Live / Live / Live`, near-constant, so the alignment
carried no information, and the rail was visually indistinct from body
captions. Mechanically the page was spotless (0 detector findings, all
contrast ≥6.46:1, focus rings everywhere, tap targets clear WCAG 2.5.8,
no overflow, clean heading outline).

Gary's call after the pros/cons: **retire the ledger, simplify.**
`/impeccable layout` + `clarify`:

- **`ledger-row` utility + `--rail` token deleted.** Each project is now a
  single-column entry: `<h3>` name → one `text-meta` facts line
  (`status · client · platform`) → the one-liner in full ink → a
  `text-meta` "Built with …" stack line → the honest link(s). Name-first,
  so a screen reader announces "Cornerman. Android APK …" rather than the
  metadata before the thing it describes (an A11y finding from the
  critique). `line-clamp-2` + the duplicate `title` attr on the stack line
  are gone — the full stack just wraps.
- **Nav is one row at every width.** The below-`sm` vertical link stack
  (a leftover from when there were four links) is removed; "Gary Reyes ·
  Work · Contact" fits past 320px. This also drops the mobile sticky
  header from ~166px to ~69px (a P3 in the critique). When 5b/5c re-add
  Services + How I build, that pass adds a mobile disclosure menu.
  `scroll-padding-top` simplified to one 5rem value (was 11rem/5rem for
  the wrapping nav).
- **Footer reads as a contact point.** "Contact form to follow" (read as
  unfinished to a skeptic) is gone; the footer now leads with
  "Get in touch — garyludelq@gmail.com" as an explicit action, GitHub /
  LinkedIn as profile links beside it. Derived from `SOCIALS` by
  splitting the `mailto:` entry from the rest.
- **Intro `<hr>`** margin `mt-section mb-gutter` → `my-section` (the first
  entry was cramped under the rule — a critique minor).
- Not done: **flagship-vs-practice emphasis** (P2). The critique wants
  Cornerman visually weightier than the practice build; that contradicts
  Gary's documented "all four peer entries" call, so it stays peers.
- The remaining P1/P2s (no primary action, jargon, screenshots) are
  content-blocked on Track A2 + A3 — recorded, not fixable by visual
  iteration.
- Gates: `check`, `build`, `check:links`, `design:check` (0 findings) all
  clean; detector `--scope layout` clean; CDP screenshots + overflow at
  320/375/1280 verified. Snapshot:
  `.impeccable/critique/2026-09-10T09-27-55Z__src-pages-index-astro.md`.

### 2026-09-10 — ROADMAP 4c: the `/work/[slug]` brief template

The container for the three hero project briefs — structure only. The
`.mdx` bodies still say "Brief pending — Track A3" and no screenshots
exist; Phase 6 (6a/6b) writes the real briefs and flips
`WORK_BRIEFS_LIVE`, which is what puts "View brief" links on the homepage.
Until then the pages build and deploy but nothing links to them.

- **`src/pages/work/[slug].astro`** — `getStaticPaths` from
  `tier: 'hero'` only, so exactly three pages build
  (`cornerman`, `ufc-scouting-app`, `saffron-web`); Pahinga (card) gets
  none. Thin: two query calls, `render()`, pass to components. `render`
  from `astro:content` is a routing-layer allowance (produces a
  component, not a query); `getCollection` stays in `queries.ts`.
- **`src/features/brief/`** — `queries.ts` (`getHeroBriefs`,
  `getAdjacentHeroes` — **bounded** prev/next by `order`, first has no
  prev, last no next) and three components: `BriefHeader` (name, one
  line, status/client/platform, stack, and **every** link that exists —
  unlike the ledger card, which picks one), `ScreenshotGallery` (renders
  **nothing** until a `media.gallery` exists — no "coming soon"
  placeholder), `BriefNav` (prev/next with visually-hidden
  "Previous project:" / "Next project:" prefixes for screen readers).
- **`src/shared/projects.ts`** — the `Project` type plus the enum labels
  (`STATUS_LABEL` / `CLIENT_LABEL` / `PLATFORM_LABEL`) and link labels
  (`LINK_LABEL`), lifted out of `ProjectCard` so the ledger and the brief
  never word the same project differently. Post-review: started under
  `features/projects/`; moved to `shared/` because two features consume
  it (CLAUDE.md "Where new code goes"). Link text unified — the ledger
  said "View repo", the brief "View repository"; both now the latter.
- **`src/content.config.ts`** — `media.gallery` changed from `string[]`
  to `{ src, alt, width, height }[]`. A bare path can't carry the
  explicit dimensions + real alt the a11y floor requires; now enforced by
  Zod at build. No `.mdx` file sets `gallery` yet, so nothing migrated.
  `ARCHITECTURE.md` reconciled (entity table + folder tree; also noted
  `BriefLayout` is deferred to 8a and there is no `StatusBadge` after the
  plain-text reset).
- **`.prose` in `global.css`** — restores vertical rhythm, list markers,
  heading sizes and link underlines to rendered MDX (preflight strips all
  of it). `overflow-wrap: break-word` so an authored URL or slash-joined
  path can't push the body wide — a real 33px overflow at 320px from the
  placeholder text, caught by the CDP `scrollWidth` check, not the
  (known-buggy) CLI screenshot. `<pre>` block styling deferred until a
  brief actually contains a code block.
- **`astro.config.mjs`** — `redirects: { '/work': '/#work' }`; the
  `/work/*` namespace now exists, so a bare `/work` resolves instead of
  404ing (ARCHITECTURE.md route list).
- Gates: `check`, `build`, `check:links`, `design:check` (0 findings) all
  clean; CDP overflow check clean 320–1280px on all three briefs;
  `dist/work/` confirmed to hold three hero pages + the redirect, no
  Pahinga. Independent `reviewer` pass — five findings, all applied or
  reconciled (the `shared/` move, the a11y prev/next labels, the link
  wording, the doc drift) except two Phase 6 content-gap notes tracked
  for later (UFC Scouting / Saffron are `status: live` with no `liveUrl`).

### 2026-09-10 — Ledger polish (/impeccable polish)

Micro-craft pass on the ledger, no structural change:

- `align-items: baseline` on `ledger-row` — the rail's first line now sits
  on the project name's baseline, so the status column reads level with
  each row's heading instead of floating slightly above it.
- `--rail` 12rem → 10rem — sized to the longest label; tightens the empty
  channel between rail and content that made the rail read airy.
- Intro→ledger gap tightened (`hr` `mb-block` → `mb-gutter`).
- Em-dashes removed from the Cornerman and Pahinga draft descriptions
  (`. ` and `: ` instead) — punctuation only.
- Nav links get `underline-offset-4` so their hover underline matches the
  offset used everywhere else.

Gates clean; no overflow 320–1280px. Small enough that it rides the prior
pass's reviewer coverage rather than its own.

### 2026-09-10 — Homepage ledger (/impeccable shape → layout)

The authored structural move the 2026-09-10 critique said was missing. The
work list is now a **ledger**, not a single-column feed or a card grid:

- **Two-column row** (`@utility ledger-row`, `global.css`): a fixed ~12rem
  metadata rail (status / client / platform) on the left, the content
  column (name, one-line description, stack, link) on the right. The rail
  width is constant, so the **status label aligns vertically down the
  whole list** — a founder's eye reads `Android APK / Live / Live / Live`
  in one movement. That alignment is the point.
- Below `sm` it collapses to one column with the rail facts as an inline
  `·`-separated row above the name.
- **Page frame widened** to `--container-page` 52rem (was one 42rem
  column); nav, main, footer all align to it. Running prose caps narrower
  at `--container-column` 42rem (the intro paragraph).
- **Project name** is a real `<h3>` at the new `--text-name` (1.375rem)
  step, not a `<p>`. Description renders in full ink at body size — the
  readable payload — tight to the name (`--spacing-tight`, new). Stack
  demoted to `text-meta`.
- **"Work" heading** → `sr-only`. It read as an orphan; the ledger is
  self-evidently the work.
- **Real one-line descriptions** drafted into the four `.mdx` `tagline`
  fields from `docs/PRD.md` positioning, each marked `# DRAFT … pending
  Track A3 review`. `year` stays unrendered (still placeholder data).
- All four projects stay peer rows (Gary's call); Pahinga is labelled
  "Practice build" in the rail, no size demotion. `featured` is set on all
  three heroes, so a featured-only emphasis would have meant a tier split
  that contradicts that — went uniform.
- Tap targets: `py-1` pad on card / nav / footer links → ~28px hit height,
  clearing WCAG 2.5.8, without changing visible type size.
- Gates: `check`, `check:links`, `design:check` (0 findings), `build` all
  clean; no horizontal overflow 320–1280px.

Hands off to `/impeccable polish` for spacing refinement (the rail reads
airy on tall rows; the intro→ledger gap).

### 2026-09-10 — Harden: no more links to routes that don't exist

`/impeccable harden` on the homepage shell, addressing the P0 from the
2026-09-10 critique (`.impeccable/critique/2026-09-10T00-46-13Z…`): the
page shipped "View brief" and nav links to routes that 404
(`/work/*`, `/services`, `/how-i-build`), with no `/404` to catch the
fall. Not the structural redesign — that's a separate `/impeccable shape`
pass.

- **`scripts/check-links.mjs`** — new build-time gate. Scans every page in
  `dist/` and fails on any in-site link to an unbuilt path or an
  `#anchor` with no matching `id`. Wired into `npm run check:links`, the
  pre-push hook (after `design:check`'s build), and CI (after build). A
  clean build and a green `design:check` both missed the dead links —
  neither follows one.
- **`NAV_LINKS` trimmed to `Work` + `Contact`** (the only routes that
  resolve today). `Services` (5b) and `How I build` (5c) are one-line
  re-adds when their pages ship.
- **`WORK_BRIEFS_LIVE = false`** in `src/lib/site.ts` — `ProjectCard`
  renders no "View brief" link while `/work/[slug]` (4c) doesn't exist,
  the same discipline it already applies to a missing `liveUrl`. Flip to
  `true` in the change that adds the route.
- **`src/pages/404.astro`** — designed 404 pulled forward from 5d. "Page
  not found" + one plain action back to the work. Astro builds it to
  `dist/404.html`; Cloudflare Pages serves it for any unmatched path.
- **Rest-state underlines** on the card action links and footer socials —
  on touch they never looked like links (`hover:underline` only). Card
  links also get `hover:decoration-2` for feedback.
- **`ProjectCard` stack line** was missing a size token, rendering at 16px
  between its 13px siblings — looked like a bug. Now `text-meta`.
- Post-review (reviewer agent): `check:links` now runs `astro build` itself
  (a manual run can't check a stale `dist/`); it also scans `src`, not just
  `href`, so a mistyped screenshot path (Track A2) can't 404 silently;
  relative internal refs are reported (constraint noted in `PROJECT_FACTS.md`
  for `.mdx` authoring); footer + card link hover treatments aligned.
- Gates: `check`, `design:check`, `check:links`, `build` all clean.

### 2026-09-10 — ROADMAP 3d: deploy config + security headers

Prep for the first Cloudflare Pages deploy on the free `*.pages.dev`
subdomain (the custom domain attaches later as ROADMAP A5).

- **`site` set** in `astro.config.mjs` to `https://garyreyes.pages.dev` —
  the Pages project is named `garyreyes`. This is the only place the URL
  lives in code; it becomes the real domain at A5 with no other change.
  Nothing consumes it yet — canonical/OG/sitemap plumbing is Phase 8a.
- **Content-Security-Policy** via Astro's `security.csp` — Astro computes a
  per-build SHA-256 hash for its own inline script (the wordmark
  scroll-to-top) and emits a `<meta http-equiv="content-security-policy">`.
  Directives are deliberately strict — `'self'` for everything, `data:` for
  images, nothing else. Phase 5d (Web3Forms) and Phase 8b (Cloudflare
  Analytics) each widen it by one line when those features land.
  Verified in a headless browser with CSP enforced: inline script executes,
  zero CSP violations, zero console errors.
- **`public/_headers`** carries the non-CSP headers as real HTTP headers:
  `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`,
  `Referrer-Policy: strict-origin-when-cross-origin`,
  `Strict-Transport-Security: max-age=31536000; includeSubDomains`,
  `Permissions-Policy` locking camera/mic/geolocation/browsing-topics.
  `frame-ancestors` is omitted from the CSP (ignored inside a `<meta>` tag);
  `X-Frame-Options: DENY` covers clickjacking.
- **`markdown.syntaxHighlight: false`** — Shiki's inline `style=` spans are
  incompatible with the strict `style-src 'self'` (build warned about it).
  Coloured code highlighting would fight the achromatic direction anyway;
  briefs get plain `<pre><code>`, styled monochrome when 4c needs one.
- Post-review fixes (reviewer agent): corrected `ARCHITECTURE.md`'s security
  table + folder tree, which still said CSP lived in `_headers` and still
  listed the deleted `public/fonts/`.
- Gates: `npm run check`, `build` (now warning-free), `design:check` all clean.

**Still Gary's to do (Cloudflare dashboard — CLAUDE.md confirmation gate):**
create the `garyreyes` Pages project, connect this repo on `main`, build
`npm run build`, output `dist`. Then confirm live:
`curl -sI https://garyreyes.pages.dev` shows all five headers + the page
serves. Re-check HSTS scope when the custom domain attaches.

### 2026-09-10 — Visual direction reset: the shipping-manifest world is retired

Gary's call, after an affaanmustafa.com reference — "copy the elements and
font of this since it looks so nonchalant and minimalist," plus two named
eyesores (the hazard-band dividers, and a giant "GARY REYES" stacked above
the tagline while the nav already carries the wordmark). This is the fourth
and terminal walk-back of the assigned direction (seed `d4e5136b`): orange
accent → full-screen menu → hazard bars → the rest. Recorded honestly as a
direction change, not folded into a polish note. Full reasoning:
`PROJECT_FACTS.md` "Visual direction — reset 2026-09-10".

Not a clone of the reference — the same *family* of choices, fitted to this
content: system UI font, near-black ink on off-white, one ~42rem reading
column, 1px `<hr>` rules and whitespace between sections, no ornament.

- **`global.css` rewritten.** Four achromatic colour tokens
  (`page`/`ink`/`ink-muted`/`rule`), a four-step type scale
  (`meta`/`body`/`lede`/`title`), three spacing tokens
  (`gutter`/`block`/`section`), one `max-w-column`. All seven label-stock
  primitives removed (`axis` `hazard-rule` `placard` `stencil` `mark` `lot`
  `stamp`). `<hr>` styled once in the base layer as the only divider.
- **Web fonts dropped entirely.** `public/fonts/` (Archivo, Archivo Narrow,
  Space Mono — 63 KB + `@font-face` + three `<head>` preloads) deleted.
  `--font-sans` is now the platform UI stack; first paint waits on no font.
  Simplifies the Phase 3d CSP (no font origin needed).
- **The direction contract in `BaseLayout.astro` rewritten** to describe the
  plain world. Still the first child of `<body>`, still verified in `dist/`.
- **Nav / Footer / SkipLink / index / ProjectGrid / ProjectCard** restyled
  to the new tokens. The work section is now a single-column list with
  hairline dividers, not a two-column placard grid; lot numbers dropped.
  The honest-status logic (status word and link decided independently, no
  dead "Live" affordance) is unchanged — it was real logic, not decoration.
- **Hero fixed (option A):** `<h1>` "Gary Reyes" at `text-title` (~1.75rem,
  no longer a 5.5rem clamp), the tagline sentence directly under it.
- **Skip link tuck fixed** — `-translate-y-16` left a ~3px sliver of the ink
  fill below the top edge (4rem doesn't clear the 1rem offset plus the
  link's height); now `-translate-y-20`. Pre-existing since 3b, newly
  visible on a clean page. `:focus` reveal verified against the built CSS.
- Gates: `npm run check` clean, `npm run build` clean, `npm run design:check`
  clean (0 findings). Overflow measured clean (`scrollWidth == clientWidth`)
  at 320/360/375/390/414/480/768/1280 via CDP — the CLI `--screenshot` flag
  misrendered mobile as overflowing, exactly the known bug `PROJECT_FACTS.md`
  documents.

Deferred to the Phase 3 close design cadence (`/impeccable critique` +
`polish`): the orphaned-looking "Work" heading spacing, and whether the
desktop column should left-align rather than centre.

### 2026-09-10 — Layout polish: margins, mobile nav, long stacks, overflow

Direct feedback against the just-shipped plain nav, checked with real
measurement rather than eyeballing a screenshot (headless Chrome's CLI
`--screenshot` flag has known compositing bugs for `position: sticky`
content — verified with CDP `getBoundingClientRect()`/`getClientRects()`
instead, at this project's own stated test-width floor of 320px and
below).

- **Symmetric container margins.** `@utility axis` (shared by Nav, `<main>`,
  and Footer) used to pad 4.5rem on the start side and a bare 1.25rem on
  the end — a real, visible imbalance, not a deliberate registration-axis
  choice. Both sides now match, on every viewport; the axis rule itself
  still draws at the same inset near the start edge.
- **Mobile nav no longer crams.** Two compounding bugs: the wordmark
  reused the homepage hero's `text-placard` clamp and wrapped to two
  lines at narrow widths, and the four links wrap-flowed unevenly across
  up to three ragged lines fighting it for space. The wordmark is now a
  fixed `text-lede` size (confirmed single-line down to 320px); below
  `sm` the link row is a deliberate one-per-line vertical list instead of
  an uncontrolled wrap.
- **Long stack lists clamp instead of sprawling.** `ProjectCard`'s
  Contents line (e.g. Cornerman's 5-item stack) could run to 4 lines and
  dwarf shorter cards. Clamped to 2 lines with a real ellipsis cutoff;
  full text stays in the DOM via a `title` attribute, so nothing is
  actually lost for a screen reader or on hover.
- **Closed a genuine horizontal-overflow bug**, found only by scripting a
  narrow-viewport scan for elements whose right edge exceeds the
  viewport (not by inspection): the Phase 3a placeholder's "Notice"
  section prints literal file paths in an inline `<code class="lot">`
  with no break point, which pushed real overflow below ~280px.
  `@utility lot` now sets `overflow-wrap: anywhere`; verified clean down
  to 220px, past any real device's floor.

### 2026-09-10 — Nav: the full-screen menu is retired

Gary's call, after seeing affaanmustafa.com's plain always-visible nav
links and preferring that structure over Phase 3c's full-screen docket.

- **`MenuPanel.astro` deleted entirely** — the full-screen dialog markup,
  its no-JS fallback link list, and its scoped styles.
- **`Nav.astro`'s ~110-line focus-trap script removed** — `open()`,
  `close()`, the manual Tab-cycling trap, `inert` wiring on
  `main`/`footer`/the wordmark, scroll lock. None of it has a job anymore
  with no overlay to manage.
- **Replaced with a plain, always-visible `<nav>`** — Work / Services /
  How I build / Contact, from a new `NAV_LINKS` array (`src/lib/site.ts`,
  replacing `WORK_ITEMS`/`MENU_LINKS`). Every destination is one click
  from every route now, with nothing hidden behind a click first.
- **The `html.js` progressive-enhancement flag is gone** — confirmed via
  a full-tree grep that nothing else read it, then removed from
  `BaseLayout.astro` rather than left as dead code. Sticky positioning
  (kept from the 2026-09-09 change) no longer needs the gating that flag
  existed for: it only existed because the menu's ~900px no-JS fallback
  content used to live inside the same header, and pinning that
  unconditionally would have hidden the page for no-JS visitors. A plain
  link row has no such height problem in either state, and
  `position: sticky` is native CSS needing no JavaScript to begin with —
  verified directly (not assumed): no-JS header height is ~88px, and
  sticky still holds (`top: 0` after scrolling) with zero scripts run.

Reviewed independently: zero functional defects found — no dangling
ARIA/focus-management attributes, no orphaned imports, anchor targets
(`#work`, `#site-footer`) confirmed resolving in the built HTML, token
discipline held. The review's one real finding was process, not code:
`PROJECT_FACTS.md`, `ROADMAP.md`, and `docs/user-flows.md` still
described the retired menu as current fact — all three corrected here,
each with the historical spec kept as a marked, dated record rather than
silently deleted.

### 2026-09-09 — Phase 4b: the work section renders real data

The homepage's project grid is no longer a mock array — it reads the real
content collection built in 4a.

- **`src/features/projects/queries.ts`** — the only place
  `getCollection('projects')` is called, per CLAUDE.md's layer boundary.
  `ProjectCard.astro`/`ProjectGrid.astro` never import `astro:content`
  directly; confirmed by the project's own ESLint rule, not just by intent.
- **Honest status labels, genuinely decoupled from the link.** The status
  stamp always shows the true status word; the actual link is computed
  separately (`liveUrl` → else `repoUrl` → else nothing rendered). This
  means a `live` project with no recorded URL yet (UFC Scouting, Saffron
  — see PROJECT_FACTS.md) correctly shows a true "Live" stamp beside an
  honest "View repo" link, never a dead "Live" affordance — the exact rule
  docs/PRD.md §10 states for Cornerman, now holding for every project.
- **Fixed a real, pre-existing dead-anchor bug while touching this
  section**: `MenuPanel.astro`'s "Work" link has pointed at `/#work` since
  Phase 3c, but the homepage section was `id="contents"` — the link never
  resolved to anything. Renamed to `id="work"` to match.
- **Hover-preview React island deliberately deferred**, not forgotten —
  it's a Should-have with no real screenshots to preview yet (Track A2
  hasn't happened), and ROADMAP.md's own pre-committed cut list already
  names "static placard cards" as this exact fallback.

Reviewed independently: all four projects' stamp/link output verified
against the compiled `dist/index.html`, not just source; the
`stampState` fresh/drained visual split confirmed to still satisfy WCAG
1.4.1 (the stamp's text differs across all three status values, so fill
state is never the only signal); token discipline held (no raw Tailwind
defaults, the recurring defect class from three prior phases).

### 2026-09-09 — Phase 4a: the content collection schema

The data layer for all four real projects — no database, MDX frontmatter
validated by Zod at build time (ARCHITECTURE.md "Entities").

- **`src/content.config.ts`** — the `Project` entity schema, matching
  ARCHITECTURE.md's table field-for-field. Enforcement proven live: removed
  a required field, confirmed the build fails with a precise error naming
  the exact file and field, restored it, confirmed the build passes again.
- **All four real project entries** (`cornerman`, `ufc-scouting-app`,
  `saffron-web`, `pahinga-coffee`) — tier/type/status/client/stack sourced
  from ARCHITECTURE.md and docs/PRD.md, nothing fabricated. `tagline` and
  `year` are visibly flagged placeholders in all four files (no real values
  exist yet); `media.cover` is a real path convention pending Track A2's
  screenshots.
- **`getCollection('projects')` confirmed working end-to-end** — not just
  schema-valid at build time, actually queryable with correct shape (real
  stack lengths, correct `featured` flags, `liveUrl`/`repoUrl` populated
  only where real) via a temporary debug route, since deleted.
- **ARCHITECTURE.md's documented config path was wrong** — corrected to
  `src/content.config.ts` (the installed Astro version requires this
  location, confirmed by an actual failing build at the old path), along
  with the same stale reference in CLAUDE.md and docs/PRD.md.

Fixed after review: the `year` placeholder was only visibly flagged in one
of the four files, leaving `year: 2026` looking like a real fact in the
other three; and two more stale `src/content/config.ts` references
survived in CLAUDE.md (a binding rules file) and docs/PRD.md beyond the
three already fixed in ARCHITECTURE.md.

### 2026-09-09 — Nav: sticky on scroll, wordmark scrolls to top

Requested against an 800k.dev reference (an always-visible sidebar);
narrowed in scope to keep the existing shell and full-screen menu intact.

- **The persistent top bar now sticks to the viewport top on scroll**
  instead of scrolling away with the page.
- **Clicking "GARY REYES" scrolls to top** (smooth, respecting
  `prefers-reduced-motion`) when already on the homepage, instead of only
  working as a plain home link.
- **Fixed after review**: the sticky/background/z-index rules were
  initially applied as plain classes directly on `<header>`, which broke
  the deliberate no-JS fallback — MenuPanel's entire link list lives
  inside that header in normal flow for no-JS visitors, and an
  unconditionally sticky header pinned that ~900px block over the
  viewport for the whole session. Moved into a scoped `<style>` block
  gated behind `html.js`, matching the pattern MenuPanel.astro already
  used for its own JS-only `position: fixed` state. Verified both states
  directly after the fix, not just re-asserted.

### 2026-09-07 — Monochrome: the accent is removed

Requested by Gary after the Phase 3 close checkpoint shipped — a genuine
recolour of the whole system, not a tweak, done after naming the tradeoff
(black-and-white is one of the most common portfolio looks; the direction
roll existed specifically to avoid that) and getting an explicit "yes,
do it" back.

- **Every ground/ink/rule token in `global.css` is now genuinely
  achromatic** (R=G=B in every value) — self-hosted verification, not
  eyeballed: computed via the real WCAG relative-luminance formula.
- **`--color-safety`/`--color-safety-text`/`--color-safety-face` are
  deleted**, not recoloured. Confirmed zero remaining references anywhere
  in `src/` or the built `dist/` output.
- **Live/shipped status reads as a solid ink-fill stamp** instead of an
  accent-coloured outline — arguably more authentic to a real ink-stamp
  impression than colour was. Archived/spent stays outline-only.
- **Hover feedback split into two patterns**, since several elements'
  resting colour was already full ink once there's no accent to shift
  toward: buttons get an ink-fill hover (reusing the stamp's language),
  inline links get an underline plus a darken-to-ink where the resting
  tone was lighter.
- **`SkipLink.astro`'s revealed state** uses the same ink-fill treatment;
  its own redundant `focus-visible` override was removed since the global
  rule already covers it (verified nothing distinguishing was lost).
- **The direction contract carries a second, honest amendment note**
  (BaseLayout.astro) distinct from the earlier scope-count one — this one
  really does change the assigned direction, and says so.

Reviewed independently: contrast re-verified on every changed pair (worst
case 5.11:1, all clear AA with margin), zero regressions to Phase 3c's
focus trap/inert/no-JS-fallback logic (confirmed the Nav.astro script
block is untouched), and every hover state confirmed to actually produce
a visible change rather than an accidental ink-to-ink no-op.

### 2026-09-07 — Phase 3 close: the hard design checkpoint

Ran before Phase 4, per ROADMAP.md's own rule — no runway left to fix
tokens or type by the Phase 8d finish review otherwise.

- **`/impeccable critique`** (dual-agent, isolated) scored the shell
  26/32 applicable Nielsen heuristics. Design-specificity verdict:
  grounded overall, but the persistent nav — the one surface every visitor
  sees before any click — was the weakest, and the menu's content alone
  (typography aside) read as a competent link list rather than the
  direction's named "signature moment."
- **`/impeccable polish` on the confirmed scope:**
  - Nav gets a `hazard-rule` under the bar — one manifest motif on every
    route, not just behind the menu click.
  - Menu's utility links (Services/How I build/Contact) visually demoted
    under an "Also" label, smaller and muted, so the four project links
    read as primary.
  - Footer tightened (`py-band`→`py-gutter`) and gained a real closing
    line (© 2026 Gary Reyes — Manila, Philippines) below a new hairline.
  - "Pending — Phase 5d" (internal roadmap language) replaced with "To
    follow" in user-facing footer copy.
  - The recurring raw-Tailwind-spacing defect (`mt-2`) fixed in
    `index.astro`, the one file none of the prior three phase reviews had
    scope to catch it in.
- **Two comment corrections in `global.css`**, both caught by the review:
  a stale claim that raise 2 (registration axis) was still "opt-in" after
  3b had already mechanized it, and an overclaim that raise 3 (density)
  was fully "mechanized" when `ROADMAP.md` still (correctly) said
  otherwise — the exact doc-drift failure mode the file's own header
  warns about. Both files now agree: partially addressed, not landed.

### 2026-09-07 — Phase 3c: the manifest docket

The direction's named "signature moment." The Menu button built inert in
Phase 3b now opens a real full-screen dialog.

- **`src/shared/components/MenuPanel.astro` (new)** — the packing-list
  docket: Work section (4 numbered lot items + "every project"),
  Services/How I build/Contact, socials. Content matches
  docs/user-flows.md's menu tree exactly (lot codes, labels, hrefs, order,
  Pahinga's external target/rel).
- **`Nav.astro`'s script wires the trigger for real** — open/close, a
  manual focus trap (Tab/Shift+Tab cycling within the panel regardless of
  what else is in the DOM), Esc-to-close, scroll lock, `inert` on the
  background (main, footer, and the wordmark) while open, focus returned to
  the trigger on close.
- **Opens instantly, no transition** — a deliberate call given the
  direction's own "must not read as gimmicky" guardrail; the signature
  moment lives in the docket's content, not its entrance.
- **Real hrefs, not placeholders.** `/work/*`, `/services`, `/how-i-build`
  and `/#work` don't exist until Phase 4/5 and will 404 until then —
  expected mid-build, same precedent as 3b's inert button.
- **No-JS fallback verified by literally stripping every `&lt;script&gt;` from the
  built HTML and rendering the result** — not asserted from reading the CSS.
  The panel renders as a plain, visible, fully navigable link list.

Fixed after the review pass:

- **The wordmark link stayed reachable by AT browse-mode navigation while
  the dialog was "open"** — `inert` only covered `main`/`footer`. Now covers
  the wordmark too.
- **Four raw Tailwind spacing values** (`mt-2`, `space-y-4` ×2, `gap-4`) in
  MenuPanel.astro, the same defect class caught and fixed in Nav/Footer one
  phase earlier. Substituted `gutter`-based tokens throughout.
- **`focus({ preventScroll: true })`** added to both focus moves, closing
  a possible scroll race on the Contact link's same-page anchor.

### 2026-09-07 — Phase 3b: the persistent shell

Every route now renders through real chrome instead of a bare `&lt;slot/&gt;`.

- **`BaseLayout.astro` now renders SkipLink → Nav → `&lt;main id="main-content"&gt;`
  → Footer.** The `&lt;main&gt;` landmark and its `axis mx-auto max-w-stock` classes
  moved here from `index.astro`, which previously owned them itself.
- **`src/shared/components/` exists for the first time** — `SkipLink.astro`,
  `Nav.astro` (wordmark + Menu trigger), `Footer.astro` (socials row + a
  stamped "Pending — Phase 5d" placeholder instead of empty space).
- **`src/lib/site.ts` centralizes the site name/description and the three
  real social URLs** — `index.astro` now reads `SITE` instead of duplicating
  its title/description as separate literals.
- **The registration axis is now site-wide, not per-page.** Nav, main, and
  Footer each apply the `axis` utility independently at the same inset, so
  the vertical line runs continuously from the nav bar through the footer on
  every route — the open item from Phase 3a's close-out.
- **The Menu trigger is a real button that does nothing yet, on purpose.**
  Phase 3c builds the panel it controls; wiring ARIA state onto a button with
  no panel would be asserting something false.

Fixed after the review pass:

- **`index.astro` had drifted from `SITE`** — its title/description were
  hardcoded literals identical to `SITE.name`/`SITE.description` rather than
  reading them, which would have silently kept the old copy if `SITE` were
  ever edited. Now imports `SITE` directly.
- **Nav, Footer, and SkipLink reached for Tailwind's default spacing/type
  scale** (`py-4`, `gap-6`, `top-2`, `text-sm`) instead of the project's own
  three declared spacing tokens and six-step type scale. Substituted
  `gutter`/`band`/`text-mark` throughout; verified every replacement utility
  actually compiles by reading the built CSS, not just by assumption.

### 2026-09-07 — Phase 3a: the design system

The visual direction assigned back in Phase 2 became real tokens. Every
component from 3b on inherits this and nothing later re-opens it.

- **`src/styles/global.css` is now the design system** — `@theme` tokens for
  the manila stock scale, warm stencil ink, one safety accent, an uneven type
  scale and the registration-axis measure, plus six `@utility` primitives
  (`axis`, `stencil`, `mark`, `lot`, `placard`, `hazard-rule`, `stamp`).
- **Three faces self-hosted**, 63 KB total, so the Phase 3d CSP needs no
  third-party origin.
- **`src/pages/index.astro` is a deliberate throwaway token proof**, not the
  homepage. `design:check` reads `dist/`, so tokens no page renders would let
  that gate pass vacuously. Phase 3b replaces it.
- **The direction contract had its stale counts amended** (six projects to
  four, 11 routes to 7) with a dated `AMENDED` line. Wording untouched.

Fixed after the review pass, all of which would have shipped silently:

- **`--color-ink-faint` failed WCAG AA on every ground** (3.1:1 on stock-300)
  while being the colour of the `mark` utility at 11px — the utility destined
  to carry the consignee and contents lines on every project placard.
  Darkened to clear 4.5:1 everywhere.
- **`--duration-mark` generated no utility at all.** Tailwind resolves
  `duration-*` from `--transition-duration-*`; the wrong name fails silently
  and leaves the transition at 0s.
- **`overflow-x: clip` on `html` was removed** — it converted a visible
  overflow bug into invisible clipped content and made the no-horizontal-
  scroll floor unfalsifiable.
- **Five primitives hardcoded values they already declared as tokens**, so
  editing the documented source of truth would have changed nothing.
- **`stamp-spent` overrode `stamp` only by luck of Tailwind's property sort**;
  it is now a nested attribute variant that cannot be reordered.

### 2026-09-07 — The domain stops blocking the build

- **Deploy targets `*.pages.dev` first.** Cloudflare Pages serves a free
  permanent subdomain, so the site can be built, deployed and reviewed on
  a real URL with no purchase. Roadmap **3d** loses its `needs A1` and
  now covers the deploy, `_headers`, and setting `site` in
  `astro.config.mjs`.
- **Attaching the custom domain becomes A5** — a Cloudflare dashboard
  action plus a one-line `site` change, done any time before launch.
  **A1 (buy the domain) is demoted** from "the one hard blocker" to a
  launch-time step; nothing in Track B waits on it.
- **Track A now starts with A2/A3** (screenshots and hero briefs), which
  gate Phase 6 and are the actual schedule risk.

### 2026-09-04 — Scope revision after re-verifying the source repos

All six candidate projects were checked against their live GitHub state.
Two had moved significantly since planning; two claims did not survive.

- **Roster cut from 6 to 3 hero briefs + 1 card.** Shown: Cornerman, UFC
  Scouting, Saffron (briefs) and Pahinga Coffee (card).
  - **Sports Bet Tracker — cut.** Overt gambling framing (now ships
    bet-sizing advice), its own `ARCHITECTURE.md` still reads as a
    from-scratch rebuild plan while the app is live, and it is heavily
    redundant with UFC Scouting (Supabase + RLS + stats + LLM coach +
    friend groups).
  - **NFC Review Plates — cut from v1.** Its "real business, real
    revenue" description did not hold: the repo frames it as a
    door-to-door *sales-practice* project, the paid service is
    "planned," there is one pilot business (Saffron again), and ~3
    plates have been sold. Real full-stack build; possible future card.
- **Long-form case studies → short README-shaped project briefs**
  (~150–250 words, screenshots, 3–5 decision bullets, honest links).
  Full case studies were over-built for an early-career SWE portfolio.
- **Recorded demo videos → screenshots.** The video-production
  dependency was the single largest schedule risk and will not reliably
  get done. `Project.demoVideo` becomes `Project.media` (a cover image +
  a screenshot gallery).
- **Footer GitHub contribution graph → static spec-sheet stat block.**
  Gary's real figures (418 contributions across 23 of 370 days) render
  ~94% empty and read as "inactive." The stat block was the alternative
  already named in `PROJECT_FACTS.md`.
- **Phase 7 (live proof: contribution graph + Monte Carlo simulator +
  Vitest) removed from v1.** No correctness-critical logic remains in
  v1 scope. A client-side probabilistic-reasoning widget from UFC
  Scouting's scoring lib is a possible post-launch addition.
- **`/work` index route dropped** — four projects do not need one; the
  homepage work section is the full list. 7 routes, down from 11.
- **Résumé download deferred** — not a launch blocker.

Propagated through `docs/PRD.md`, `ARCHITECTURE.md`,
`docs/user-flows.md`, `PROJECT_FACTS.md`, `CLAUDE.md`, `PRODUCT.md`, and
`ROADMAP.md` (re-segmented: phases 3–6 + 8, Phase 7 removed, a hard
design checkpoint added after Phase 3, Track A shrunk to domain +
screenshots + brief notes + repo hygiene).

Full context and reasoning: `PLAN-REVIEW-BRIEF.md` (v3).

### 2026-08-28 — CI green, branch protection on

- Fixed `npm ci` failing on Linux: the Windows-generated lockfile had no
  top-level entries for `@emnapi/core` / `@emnapi/runtime` (required by
  `@napi-rs/wasm-runtime` via Tailwind's native bindings). Regenerating
  the lockfile from scratch produced a complete cross-platform tree.
  **Caught by CI on its first run** — before any feature code existed.
- Branch protection on `main`: CI must pass and be up to date before
  merge, no force pushes, no deletions, linear history. Required
  approvals set to 0 (diff review happens in the editor); admin
  enforcement off so an emergency fix is still possible.

### 2026-08-28 — Project harness

- Scaffolded Astro 7 + TypeScript (strict) with Tailwind v4, MDX, and
  React integrations.
- Wired gates: ESLint (with `jsx-a11y` rules for `.astro`), Prettier,
  `astro check`, Husky pre-commit (`lint-staged`) and pre-push
  (full check + design-slop detector), and GitHub Actions CI on every PR.
- Added `scripts/design-check.mjs` — runs Impeccable's detector over
  built output, resolving the plugin version at runtime.
- Wrote `CLAUDE.md`, `CHANGES.md`, `PROJECT_FACTS.md`.

### 2026-08-28 — Planning

- `docs/PRD.md` — product truth: audiences, positioning, scope, metrics.
- `ARCHITECTURE.md` — stack, `Project` entity schema, layer boundaries.
