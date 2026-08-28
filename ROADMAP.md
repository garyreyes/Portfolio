# Roadmap — Gary Reyes Portfolio

**Created:** 2026-08-28
**Deadline:** 2–3 weeks to a live, shareable site on a custom domain
**Reads from:** [`ARCHITECTURE.md`](ARCHITECTURE.md),
[`docs/PRD.md`](docs/PRD.md), [`docs/user-flows.md`](docs/user-flows.md),
[`PROJECT_FACTS.md`](PROJECT_FACTS.md)

Status per sub-phase: `not started` · `in progress` · `done`.
Progress is read from this file, never from memory. When
`feature-planner` logs a completed feature to `CHANGES.md`, the matching
sub-phase here gets marked `done` — the two files track the same progress
from opposite ends and must not drift.

---

## Done before this roadmap

| | | Status |
| --- | --- | --- |
| 0 | `harness-setup` — CI, gates, branch protection, `CLAUDE.md` | **done** |
| 1 | `user-flow-mapper` — 11 routes, three flows, failure states | **done** |
| 2 | Design direction — seed `d4e5136b`, shipping manifest / logistics labeling | **done** |

---

## Track A — Gary's own work, starts today, runs in parallel

**This is the deadline risk, not the code.** None of it is blocked by
anything in Track B, and all of it blocks Track B eventually. Start now.

| | Task | Blocks | Status |
| --- | --- | --- | --- |
| A1 | **Buy the domain.** Cloudflare Registrar, ~$10–15/yr, sold at cost | 3d | not started |
| A2 | **Record six demo videos** (30–60s, 720p H.264, <10 MB each) **and capture screenshots** | 6a, 6b | not started |
| A3 | **Produce a résumé PDF** — does not exist yet | 8b | not started |
| A4 | **Rough notes per project** — the problem, what you built, what you decided, what you'd change | 6a, 6b | not started |

A4 is cheaper than it sounds: `Cornerman-2`, `nfc-side-hustle`, and
`saffron-web` already carry `ARCHITECTURE.md`, `PRODUCT.md`, `ROADMAP.md`
and `PROJECT_FACTS.md`. Most of a case study is a translation job.

---

## Phase 3 — Foundation and shell

Everything downstream inherits this phase. It lands first for that reason.

| | Sub-phase | Status |
| --- | --- | --- |
| 3a | **Design tokens and label-stock primitives.** Tailwind v4 `@theme`: kraft/manila ground, stencil ink, one safety accent, condensed grotesque scale, monospace reserved for real codes, the vertical registration axis, hazard-band rule, placard and stamp primitives. This *is* the "one continuous label stock" raise | not started |
| 3b | **`BaseLayout`, persistent nav bar, footer shell.** Wordmark left → homepage intro; hamburger trigger right. The direction contract already lives here and must not move | not started |
| 3c | **Full-screen menu as a packing-list docket** — the signature moment. All six projects listed, Services, How I build, Contact, socials. Focus trap, `Esc` to close, scroll lock, `prefers-reduced-motion`, and a no-JS fallback to plain links | not started |
| 3d | **Cloudflare Pages deploy + custom domain + `_headers`** (CSP, `X-Frame-Options`, `Referrer-Policy`) — **needs A1** | not started |

**Phase 3 close:** `/impeccable critique` + `polish` across the shell.

---

## Phase 4 — Work surfaces

| | Sub-phase | Status |
| --- | --- | --- |
| 4a | **Content collection schema.** `src/content/config.ts` Zod schema for the `Project` entity, plus one real `.mdx` proving the build fails correctly when `demoVideo` or `status` is missing | not started |
| 4b | **`/work` index** — projects as placarded units; hover-preview React island; honest status labels | not started |
| 4c | **`/work/[slug]` case study template** — placard header, stamped `status`, consignee line from `client`, contents manifest from `stack[]`, demo video player (poster, `preload="none"`, click to play), prev/next | not started |

**Phase 4 close:** `/impeccable critique` + `polish` across the work surfaces.

---

## Phase 5 — Remaining surfaces

| | Sub-phase | Status |
| --- | --- | --- |
| 5a | **Homepage.** Intro placard leads ("Hello, I'm Gary Reyes, a 3rd-year Industrial Engineering student"), then work preview, then the about/IE section. One obvious primary action: open the work | not started |
| 5b | **`/services`** — standalone business-owner page. Must read correctly as the only page seen. May say *available for freelance*; must **not** imply *trusted by businesses* | not started |
| 5c | **`/how-i-build`** — the harness, skills, MCP setup, CI gates, planning docs. Honest, not a sales pitch | not started |
| 5d | **Contact form + `/404`.** Web3Forms in the sitewide footer: idle, submitting, inline success swap, visible failure with `mailto:` fallback, honeypot. Designed 404 with a route back to `/work` | not started |

**Phase 5 close:** `/impeccable critique` + `polish` across all surfaces.

---

## Phase 6 — Case study content

The long pole. Blocked on A2 and A4, which is why those start today.

| | Sub-phase | Status |
| --- | --- | --- |
| 6a | **Cornerman, nfc-side-hustle, Saffron.** The three strongest: the only mobile project (offline TTS, WSOLA), the one with real revenue, and the real client | not started |
| 6b | **UFC Scouting, Sports Bet Tracker, Pahinga.** Cron-driven sync, RLS + statistical modelling, and the café-site proof for `/services` | not started |

Each case study: problem, what was built, decisions and tradeoffs,
outcome, demo video, honest link status.

---

## Phase 7 — Live proof

| | Sub-phase | Status |
| --- | --- | --- |
| 7a | **GitHub contribution graph** — build-time API fetch rendered as custom monochrome inline SVG. Not GitHub's green squares, not a third-party image. Build must not fail if the API does | not started |
| 7b | **Monte Carlo simulator** inside `/work/sports-bet-tracker`. Client-side only. Sensible defaults producing a result immediately — never a blank chart. Static fallback with no JS | not started |

---

## Phase 8 — Launch

| | Sub-phase | Status |
| --- | --- | --- |
| 8a | **SEO/OG baseline** — titles, meta, per-page OG images, `sitemap.xml`, `robots.txt`, favicon | not started |
| 8b | **Analytics + résumé link + status-label sweep.** Cloudflare Web Analytics (cookieless, no consent banner) — **needs A3** | not started |
| 8c | **Accessibility and performance.** WCAG 2.2 AA: contrast, keyboard nav, visible focus, reduced motion. No horizontal body scroll at any width | not started |
| 8d | **Finish.** Full-app `/impeccable polish`, then the finish review, the verdict, and **`DESIGN.md`** written from the built world | not started |

**8d is the exit condition**, per the direction contract: *unreviewed and
undocumented is unfinished.*

---

## Pre-committed cut list

Decided in advance, on purpose. Cutting under pressure at 1am produces
worse decisions than cutting now, and "cut nothing and miss the date" is
the most common failure of all.

**If week 3 gets tight, cut in this order:**

1. **7b — Monte Carlo simulator.** The most interesting thing on the
   site and therefore the most dangerous to the deadline. Already marked
   Should-have in PRD §11.
2. **7a — GitHub contribution graph.** Footer falls back to a plain
   profile link. Also the element most likely to underdeliver anyway:
   418 contributions across 23 of 370 days renders ~94% empty.
3. **5c — `/how-i-build`.** Cut last of the three, and reluctantly — it
   is the page that owns your positioning. If it goes, the menu item goes
   with it.

**Never cut:** the six case studies, the six demo videos, the custom
domain, or 8c. Those *are* the product.

---

## Design cadence

- **Per sub-phase:** lightweight `/impeccable audit` — accessibility,
  responsiveness, broken states. Same tier as the correctness gates.
- **Per completed phase:** `/impeccable critique` + `polish`, judging
  related screens together rather than one sub-phase in isolation.
- **Phase 8d:** full-app polish, finish review, `DESIGN.md`.

**Token-risk check — clear.** Phase 3a defines the visual tokens and no
later phase redefines them, so nothing is polished against a provisional
look and no re-polish item is required. This is only true because the
direction was assigned *before* Phase 3; it would not hold if the look
had been left to emerge.

---

## Next action

**Track A starts now — begin A1 and A2 today.**
Track B starts with `feature-planner` on **3a: design tokens and
label-stock primitives**.
