# Roadmap — Gary Reyes Portfolio

**Created:** 2026-08-28
**Re-segmented:** 2026-09-04 for the scope revision (see [`CHANGES.md`](CHANGES.md)
and `PLAN-REVIEW-BRIEF.md`): roster is 3 hero briefs + 1 card, media is
screenshots not video, the footer carries a stat block not a contribution
graph, and Phase 7 (live proof) is removed.
**Deadline:** ~3 weeks from build start. No imminent application is
forcing it, but the launch guardrail (PRD §7 metric 1) stands regardless —
"portfolio 90% done for months" is more likely without a deadline, not
less.
**Reads from:** [`ARCHITECTURE.md`](ARCHITECTURE.md),
[`docs/PRD.md`](docs/PRD.md), [`docs/user-flows.md`](docs/user-flows.md),
[`PROJECT_FACTS.md`](PROJECT_FACTS.md)

Status per sub-phase: `not started` · `in progress` · `done`.
Progress is read from this file, never from memory. When `feature-planner`
logs a completed feature to `CHANGES.md`, the matching sub-phase here gets
marked `done` — the two files track the same progress from opposite ends
and must not drift.

One sub-phase is one `feature-planner` pass. Kick one off by naming it.

---

## Done before this roadmap

| | | Status |
| --- | --- | --- |
| 0 | `harness-setup` — CI, gates, branch protection, `CLAUDE.md` | **done** |
| 1 | `user-flow-mapper` — 7 routes (revised 2026-09-04), three flows, failure states | **done** |
| 2 | Design direction — seed `d4e5136b`, shipping manifest / logistics labeling | **done** |

---

## Track A — Gary's own inputs, runs in parallel

Not blocked by anything in Track B; blocks parts of it. Much smaller than
the original plan (no video production).

| | Task | Blocks | Status |
| --- | --- | --- | --- |
| A1 | **Buy the domain.** Cloudflare Registrar, ~$12/yr, sold at cost. The one hard blocker. | 3d | not started |
| A2 | **Take screenshots** — Cornerman, UFC Scouting, Saffron, Pahinga. One cover each + a few gallery shots for the heroes. An afternoon. | 6a, 6b | not started |
| A3 | **Rough notes → a ~200-word brief** for each of the three heroes: the problem, the 1–2 interesting decisions, the outcome/status. | 6a, 6b | not started |
| A4 | **Repo hygiene.** Write a real `saffron-web` README (currently 13 bytes); update the `ufc-scouting-app` README (still describes the frozen group/clan tool, not the current solo "intern" app). | 8 (reviewers click through) | not started |

A3 is mostly a translation job — `Cornerman-2`, `ufc-scouting-app`, and
`saffron-web` all carry `ARCHITECTURE.md` / `PRODUCT.md` / `RETROSPECTIVE.md`.

**Deferred, blocks nothing:** the résumé PDF. The footer résumé-download
link (8b) is optional and waits on it.

---

## Phase 3 — Foundation and shell

Everything downstream inherits this phase. It lands first for that reason.

| | Sub-phase | Status |
| --- | --- | --- |
| 3a | **Design tokens and label-stock primitives.** Tailwind v4 `@theme`: kraft/manila ground, stencil ink, one safety accent, condensed grotesque scale, monospace reserved for real codes, the vertical registration axis, hazard-band rule, placard and stamp primitives. This *is* the "one continuous label stock" raise. | not started |
| 3b | **`BaseLayout`, persistent nav bar, footer shell.** Wordmark left → homepage intro; hamburger trigger right. The direction contract already lives in `BaseLayout` and must not move. | not started |
| 3c | **Full-screen menu as a packing-list docket** — the signature moment. Lists the three hero briefs directly, plus Pahinga (→ its live site), Services, How I build, Contact, socials. Focus trap, `Esc` to close, scroll lock, `prefers-reduced-motion`, and a no-JS fallback to plain links. | not started |
| 3d | **Cloudflare Pages deploy + custom domain + `_headers`** (CSP, `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`) — **needs A1**. | not started |

**Phase 3 close — the hard design checkpoint.** Full `/impeccable
critique` + `polish` of the built shell against the named guardrails
("must not read as gimmicky or try-hard," "must not look like every other
dev portfolio," restrained motion). **Do not proceed to Phase 4 until the
direction has landed** — by the 8d finish review there is no runway left
to fix tokens or type.

---

## Phase 4 — Work surfaces

| | Sub-phase | Status |
| --- | --- | --- |
| 4a | **Content collection schema.** `src/content/config.ts` Zod schema for the `Project` entity (`tier`, `media: { cover, gallery? }`, `status`, `client`, `stack[]`, …), plus one real `.mdx` proving the build fails correctly when a required field (`tier` or `media.cover`) is missing. | not started |
| 4b | **Work section** (renders on the homepage at `/#work` — there is no `/work` index route). Three hero projects as placarded units + the Pahinga card; hover-preview React island; honest status labels; `/work` redirects here. | not started |
| 4c | **`/work/[slug]` brief template** (3 hero pages) — placard header, stamped `status`, consignee line from `client`, contents manifest from `stack[]`, screenshot gallery (`loading="lazy"`, reserved dimensions, alt text), prev/next. | not started |

**Phase 4 close:** `/impeccable critique` + `polish` across the work surfaces.

---

## Phase 5 — Remaining surfaces

| | Sub-phase | Status |
| --- | --- | --- |
| 5a | **Homepage.** Intro placard leads ("Hello, I'm Gary Reyes, a 3rd-year Industrial Engineering student"), then the work section, then the about/IE section. One obvious primary action: open the work. | not started |
| 5b | **`/services`** — standalone business-owner page. Must read correctly as the only page seen. Pahinga and Saffron as the proof. May say *available for freelance*; must **not** imply *trusted by businesses*. | not started |
| 5c | **`/how-i-build`** — the harness, skills, MCP setup, CI gates, planning docs. Honest, not a sales pitch. | not started |
| 5d | **Contact form + `/404` + footer stat block.** Web3Forms in the sitewide footer: idle, submitting, inline success swap, visible failure with `mailto:` fallback, honeypot. Designed 404 with a route back to the homepage work section. Static spec-sheet stat block (projects shipped, live in production, real client work, peak commit day) from a hand-maintained `src/lib/stats.ts` — no API call. | not started |

**Phase 5 close:** `/impeccable critique` + `polish` across all surfaces.

---

## Phase 6 — Project content

The long pole. Blocked on A2 (screenshots) and A3 (brief notes).

| | Sub-phase | Status |
| --- | --- | --- |
| 6a | **Cornerman + UFC Scouting briefs** — the two flagships. Cornerman: offline Kokoro TTS, WSOLA time-stretch, background audio, the APK/Play-Store status. UFC Scouting: **engineering-first** — multi-source data reconciliation, immutable odds snapshots, RLS, the LLM "intern" scored on two boards against a chalk control, test-first money math; one honest line that units are simulated. | not started |
| 6b | **Saffron brief + Pahinga card.** Saffron: real client (a friend's operating restaurant), unpaid, live. Pahinga: a deliberate practice build — card only, screenshot + a line + a link to its live site. | not started |

Each hero brief: ~150–250 words on one screen — problem, 1–2 interesting
decisions, outcome/status, screenshots, honest links (`Live` / `Android
APK` / `Practice`).

---

## Phase 7 — removed 2026-09-04

Was "Live proof" — a GitHub contribution graph and a Monte Carlo
simulator, both correctness-critical, requiring Vitest. All cut:

- The contribution graph would render ~94% empty (see `PROJECT_FACTS.md`)
  and is replaced by the static stat block in 5d.
- The Monte Carlo simulator was lifted from Sports Bet Tracker, which is
  no longer on the site, and was over-scoped for the deadline.
- With both gone, **no correctness-critical logic remains in v1**, so no
  test runner is installed (the Zod schema failing the build is stronger
  than a test for the one thing that has a right answer).

**Post-launch, only if wanted:** a client-side probabilistic-reasoning
widget derived from `ufc-scouting-app`'s `lib/scoring` (implied
probability / edge / calibration). If built: install Vitest first, write
it test-first.

---

## Phase 8 — Launch

| | Sub-phase | Status |
| --- | --- | --- |
| 8a | **SEO/OG baseline** — titles, meta, per-page OG images (`media.cover`), `sitemap.xml`, `robots.txt`, favicon. | not started |
| 8b | **Analytics + status-label sweep** (+ résumé link if A3's résumé exists by now). Cloudflare Web Analytics — cookieless, no consent banner. Verify every project link's status label is honest and no dead "Live demo" affordance renders for Cornerman. | not started |
| 8c | **Accessibility and performance floor — hard gates.** Sufficient contrast, full keyboard nav, visible focus, `prefers-reduced-motion` honored across all scroll/hover motion, no horizontal body scroll at any width. (A full WCAG 2.2 AA audit is deferred post-launch — see `PROJECT_FACTS.md`.) | not started |
| 8d | **Finish.** Full-app `/impeccable polish`, then the finish review, the verdict, and **`DESIGN.md`** written from the built world. | not started |

**8d is the exit condition**, per the direction contract: *unreviewed and
undocumented is unfinished.*

---

## Pre-committed cut list

Decided in advance, on purpose. Cutting under pressure at 1am produces
worse decisions than cutting now, and "cut nothing and miss the date" is
the most common failure of all. The scope is already lean, so this is
short.

**If it gets tight, cut in this order:**

1. **The hover-preview island (4b)** → static placard cards. It is a
   Should-have and the section reads fine without it.
2. **`/how-i-build` (5c)** → cut last, and reluctantly — it is the page
   that owns the positioning. If it goes, its menu item goes with it.

**Never cut:** the three hero briefs, the custom domain, the Phase 8c
floor. Those *are* the product.

**A thin screenshot set is not a reason to slip** — ship a brief with one
cover image and add gallery shots later.

---

## Design cadence

- **Per sub-phase:** lightweight `/impeccable audit` — accessibility,
  responsiveness, broken states. Same tier as the correctness gates.
- **After Phase 3:** the hard design checkpoint (above) — a full critique
  of the shell before any project surface is built on it.
- **Per completed phase:** `/impeccable critique` + `polish`, judging
  related screens together rather than one sub-phase in isolation.
- **Phase 8d:** full-app polish, finish review, `DESIGN.md`.

**Token-risk check — clear.** Phase 3a defines the visual tokens and no
later phase redefines them, so nothing is polished against a provisional
look and no re-polish item is required. This holds only because the
direction was assigned *before* Phase 3; it would not if the look had
been left to emerge.

---

## Next action

**Track A:** begin **A1 — buy the domain**. Nothing else is a hard
blocker, but A2/A3 gate Phase 6, so start them early.
**Track B:** `feature-planner` on **3a — design tokens and label-stock
primitives**.
