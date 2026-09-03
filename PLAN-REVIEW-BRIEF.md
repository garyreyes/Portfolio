# Portfolio Plan — Review Brief (v3)

**Purpose:** a self-contained summary of the plan for Gary Reyes' portfolio
site, for handing to a fresh reviewer. Planning is complete; **no site code
has been written yet.**

**What I want back:**

1. Is the visual direction ("shipping manifest / logistics labeling," §7)
   too risky, gimmicky, or hard to execute? Is it actually differentiated
   or just differently generic?
2. Is **3 project briefs + 1 practice card** enough for an early-career
   SWE portfolio, or does it read as thin?
3. Is dropping recorded demo videos in favour of screenshots a mistake for
   a portfolio whose stated positioning is "show, don't tell"?
4. Does the cost estimate hold up? (Still ~$12/year — see §9.)

---

## 0. Decisions locked 2026-09-04

- **Roster:** Cornerman, UFC Scouting, Saffron as **hero briefs**; Pahinga
  Coffee as a **card**. NFC Review Plates and Sports Bet Tracker are **not
  on v1** (reasons in §4).
- **Format:** short, README-shaped **project briefs** on dedicated
  `/work/[slug]` pages — **not** long case studies. Rationale in §5.
- **Media:** **screenshots, not demo videos.** An optional ~20s Cornerman
  clip may be added later but never blocks launch.
- **UFC Scouting** case study leads with the **engineering**, not the
  betting; the genuine-obsession detail (wakes up 4–5am for every card) is
  part of the story; one honest line notes units are simulated.
- **Résumé** is deferred — the download link is a "whenever" item, not a
  launch blocker.
- **Timeline:** no imminent application, so the hard 3-week deadline is
  relaxed — but a deliberate ship-bias is kept, because "portfolio 90%
  done for months" is the failure mode the PRD explicitly names and it is
  *more* likely without an application forcing it.

---

## 1. The person and the goal

Gary Reyes — third-year Industrial Engineering student at De La Salle
University, Manila. Has shipped several real software projects but no
single place presenting them. Builds primarily by orchestrating Claude
Code (custom skills, MCP servers, a personal harness) rather than
hand-writing code.

**Goal:** primarily a startup internship (voluntary/unpaid); secondarily
freelance website clients (small local businesses). IE is *positioning*,
not a target audience — "3rd-year IE student who ships production
software" is identity and credibility, handled on the site, while IE
recruiting itself goes through a résumé.

---

## 2. Audiences

| Audience | Who | Wants | Arrives via |
|---|---|---|---|
| **Primary — startup hiring people** | Founders / eng leads. Technical, time-poor, skeptical. Decide in <2 min. | Evidence the person ships real things; will open the repo. | A link in an application |
| **Secondary — small-business owners** | Non-technical. Revenue audience. | Proof of finished, attractive sites for businesses like theirs. | A link Gary sends while pitching — often the only page seen |

---

## 3. Positioning — "show, don't tell"

Homepage leads with the **work**, never the method. A dedicated **"How I
build"** page owns the AI-orchestration method for readers who seek it
out. The case studies (now briefs) carry the persuasive load.

### The "realness" claim — final, honest version

> **Three projects, three different competencies:** a mobile app with real
> offline audio DSP, a full-stack fight-analysis tool used every card, and
> a live site for a real restaurant client. Plus a deliberate practice
> landing page.

**Binding honesty constraints:**

- **No revenue claim.** (Gary *did* sell ~3 NFC review-plates — a real
  "shipped something people paid for" data point — but NFC is off v1, so
  the claim doesn't appear. It could be a one-liner in "How I build" or
  the about section if wanted.)
- **"Available for freelance," never "trusted by businesses."** Saffron is
  real client work but **unpaid** (a friend's restaurant).

---

## 4. Project roster

| Project | Tier | Notes |
|---|---|---|
| **Cornerman** (`Cornerman-2`) | **Hero brief** | The lead. Expo/React Native; bundled offline **Kokoro TTS**; **WSOLA time-stretching** for 0.25×–4× speech with no pitch distortion; background/locked-screen audio; Jest + ESLint + CI, ~68 commits. Android APK, Play Store listing in progress. A personal-use tool, honestly. Most technically distinctive project. **Not web-clickable — it's a mobile app.** Present via screenshots + repo + (later) a GitHub Release APK / Play Store link. |
| **UFC Scouting App** | **Hero brief** — engineering-first | The most sophisticated project. Solo tool (group/clan features frozen, off nav). Feature-complete on a large v2 as of 2026-09-03: an odds spine (The Odds API, **immutable** T-12h price snapshots, fuzzy fight-matching + review queue), pick-lock enforcement, **test-first unit-P&L math**, dual settlement with void/draw/NC handling, a **two-board scoreboard** (units + accuracy) each vs a **"chalk" control line**, a **Bluesky rumour engine** (Gemini Flash-Lite clustering, corroboration counts + source links, no credibility verdict), **"the intern"** (market + rumour + Elo-adjusted picks, edge-gated betting, a calibration check), fighter identity matching/enrichment, a 2022–2024 fight-history backfill. Next.js 16, Supabase + RLS (12 migrations), Google/GitHub OAuth, GitHub Actions cron (sync + snapshot + settle), CI, Vitest, a real `RETROSPECTIVE.md`, a manual RLS test suite. Live on Vercel; the twice-daily cron keeps the free-tier DB awake so the link stays clickable. **Simulated units only — a paper scoreboard for measuring predictive reads, no real money.** |
| **Saffron** (`saffron-web`) | **Hero brief** | Real, operating restaurant near UST Manila (4.6★ / 121 reviews). Live, deployed, fully clickable. **Real client work, unpaid** (a friend's business). Next.js + TS; reservations via email/Messenger; delivery routes out to foodpanda. **Repo hygiene:** the README is 13 bytes — write a real one before launch. |
| **Pahinga Coffee** | **Card** — screenshot, stack tags, 1–2 lines, link. No brief page. | Its own README: *"a single static landing page for a **fictional** Manila café, built as portfolio work."* Thinnest project (static, no backend). Keep it on `/work` as a card **and** feature it on `/services` — it is the one project built for the small-business audience's exact use case. |
| ~~**NFC Review Plates**~~ | **Not on v1** | Its own repo frames it as a project to *"practice door-to-door selling"*; the paid service is *"planned, possibly in motion"*; one pilot business (Saffron again), no owner account linked; QR only, no NFC deployed; last feature commit 2026-08-18. Gary sold ~3 plates. Real full-stack build (Next.js 16, Neon + Drizzle, role-based auth, multi-branch, scan analytics) — **add back later as a 4th card if the roster feels thin or the business side gets more real.** |
| ~~**Sports Bet Tracker**~~ | **Cut** | Its own `ARCHITECTURE.md` is titled "(Rebuild)" and reads as a rebuild plan while the app is simultaneously live — contradictory to a click-through reviewer. Overt gambling framing (now ships bet-sizing advice; earlier repo named `GAMBLING`). Heavily redundant with UFC Scouting (Supabase + RLS + stats + LLM coach + friend-groups). Cutting it removes the redundancy and halves the gambling exposure. |

**Net: 3 hero briefs + 1 card = 4 projects shown.** Lean but defensible —
the three heroes cover genuinely different ground (mobile/audio DSP,
full-stack/data/auth, client delivery). NFC is the obvious add-back if it
reads thin once built. Nothing weaker than NFC gets added.

---

## 5. Project format — briefs, not case studies

**Industry norm for an early-career SWE hiring portfolio is *not* long
case-study pages:**

| Pattern | Who uses it | Fit here |
|---|---|---|
| Single-page scroll, project = card (image + 2–4 sentences + tags + links) | most dev portfolios | strong |
| Featured + list — top few get a bigger block on the main page | mid-level SWE (brittanychiang.com) | strong |
| Full case-study pages ("the problem / my process / what I learned") | designers, senior/staff eng, career-changers | **over-built** — reads as padding; recruiters spend 1–2 min |
| Logo grid linking out | agencies, freelance designers | weak for founders (shows nothing about thinking); fine for café owners |

**What each hero project gets — one screen, README-shaped, ~150–250 words:**

- one line: what it is
- **screenshots** (see §6) — this is the "show"
- 3–5 bullets: the problem, the 1–2 genuinely interesting technical
  decisions, the outcome / current status
- tech tags
- honest links: live / repo / APK, with status labelled (Live / Android
  APK / Practice)

Delivered on a **short dedicated page** (`/work/cornerman`) — this buys
shareable links and a good link-preview when someone pastes it in Slack,
and fits the "each project is a consigned shipping unit" visual concept.
Content stays short.

---

## 6. Media — screenshots, not video

The original plan made recorded 30–60s demos Must-have. **Dropped.** Gary
won't reliably produce them, and a portfolio with screenshots that *ships*
beats one with videos that never does.

- **Saffron, Pahinga** — live and clickable; a screenshot on the card +
  a "Visit site" link is enough.
- **UFC Scouting** — live, kept awake by its own cron. A short screenshot
  sequence of the signature screens (the two-board scoreboard, the
  intern's picks, a rumour flag with its sources) + a "Try it" link. Mild
  cold-start caveat if the DB ever does sleep.
- **Cornerman** — the only genuinely un-clickable one, and it's a *mobile
  app*, so nobody expects to click it from a desktop portfolio. Screenshots
  of the timer/config screens + the repo (the WSOLA / audio-engine code is
  the real proof for a technical reader) + a Play Store / GitHub Release
  link. An optional ~20s clip of the spoken combo call-outs can be added
  later — it is the one project where audio genuinely can't be conveyed
  another way — but it never blocks launch.

**Consequence for positioning:** "show, don't tell" now leans on (a) the
live links being up and (b) the code being clean and browsable — both fine
for the startup audience, who open repos anyway.

**Schema impact:** the `Project` entity's required `demoVideo: { src,
poster, duration }` becomes a required `media` (a cover image + a gallery
of screenshots). The video-specific rules currently in `CLAUDE.md`,
`ARCHITECTURE.md`, and `docs/PRD.md` (LFS ban, `preload="none"`, poster
images, the `public/videos/` hosting section) become mostly moot and need
a cleanup pass when the build starts.

---

## 7. Visual direction — "shipping manifest / logistics labeling"

**Chosen by a seeded generator** (`/impeccable new-work`, seed `d4e5136b`,
candidate 3 of 7), deliberately **from outside the model**. The brief
pinned a category-external reference world — **industrial / technical
drawing** — because it sits outside the dev-portfolio category and is
authentically Gary's own domain as an IE student. The seed honored that
world but refused its softest rendition (blueprint-blue on white).

**Concept:** projects presented as **consigned goods** — each a placarded
shipping unit with a lot code, consignee, and rubber-stamped status. Maps
onto the data model exactly: `status` → a stamped mark, `client` → a
consignee line, `stack[]` → a contents manifest.

**Color:** kraft/manila ground, black stencil ink, one "safety" accent
(hazard-band orange/yellow) carrying meaning only. No dark/light toggle.

**Type:** condensed grotesque caps for display; monospace **reserved for
real codes only**.

**Three binding "raises":** one continuous label stock across every route;
a single vertical registration axis; **density is tone** (so a thin field
reads as *data*, not absence — this is what carries a 4-project roster).

**Signature moment:** the full-screen menu opening as a **packing-list /
manifest docket** — also the mitigation that makes a hamburger-hidden nav
acceptable.

**Guardrails (Gary's words):** must not read as gimmicky or try-hard; must
not look like every other dev portfolio; restrained motion; first viewport
leads with the intro, then the work.

**Footer element:** the original GitHub contribution graph is **cut**
(Gary's real numbers are 94% empty and a monochrome dot matrix reads
harsh). Replaced with a **static spec-sheet stat block** — projects
shipped, live in production, real client work, peak commit day — which
fits the manifest world, needs no API call, and flatters every number.

**`DESIGN.md`** is written at the end, from the built site.

---

## 8. Tech stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Astro** | content-site native; typed MDX frontmatter via Zod; per-page SEO/OG; ~zero JS |
| UI | `.astro` + **React islands only where interactive** | hover previews, contact form |
| Content | MDX Content Collections | one `.mdx` per project; a `tier: 'hero' \| 'card'` field |
| Styling | **Tailwind v4** `@theme` tokens | components read tokens, never raw hex |
| Media | screenshots in `public/` | (no video pipeline) |
| Hosting | **Cloudflare Pages** | free, unlimited bandwidth, deliberately not Vercel |
| Analytics | Cloudflare Web Analytics | cookieless, no consent banner |
| Contact form | Web3Forms | proven in Pahinga; free tier ~250/mo; key is public by design |

One entity, `Project`, validated at build by Zod — a bad entry fails the
build. **Layer boundaries (ESLint-enforced):** UI renders only; services
own data access and outbound calls; routes stay thin.

**Harness already in place:** ESLint (+ `jsx-a11y`), Prettier, `astro
check`, Husky pre-commit + pre-push (full check + design-slop detector),
GitHub Actions CI, branch protection on `main`. CI is green.

---

## 9. Cost — ~$12/year, all-in

| Item | Service | Cost |
|---|---|---|
| Domain (`.dev` / `.com`) | Cloudflare Registrar — at cost | **~$10–15/yr** |
| Hosting, HTTPS, analytics, contact form, inbound email forwarding | Cloudflare + Web3Forms free tiers | **$0** |
| **Total** | | **~$10–15/year** |

The domain is a **hard v1 blocker** and **not yet purchased**.
Non-monetary cost is now small: no video production, ~4 project briefs to
write from existing repo docs, plus the build. Claude Code usage is a sunk
cost of Gary's normal workflow.

---

## 10. Roadmap

### Track A — Gary's own inputs

| | Task | Notes |
|---|---|---|
| A1 | **Buy the domain** (~$12/yr, Cloudflare Registrar) | hard blocker |
| A2 | **Take screenshots** of Saffron, Pahinga, UFC Scouting, Cornerman | an afternoon, not a week |
| A3 | **Rough notes → a ~200-word brief** for each of the 3 heroes | mostly translation; all three have rich internal docs |
| A4 | **Write a real `saffron-web` README** + **update the UFC Scouting README** (it still describes the frozen group tool) | repo hygiene — reviewers click through |
| — | Résumé PDF | deferred; not a launch blocker |

### Track B — the build

| Phase | Contents |
|---|---|
| **3 — Foundation & shell** | 3a design tokens + label-stock primitives · 3b BaseLayout, nav, footer · 3c full-screen manifest menu (focus trap, `Esc`, scroll lock, reduced-motion, no-JS fallback) · 3d Cloudflare Pages deploy + domain + `_headers` (needs A1) · **then a hard design checkpoint against the guardrails before Phase 4** |
| **4 — Work surfaces** | 4a content schema (Zod) — `tier` field, `media` gallery · 4b work section — 3 hero placards + Pahinga card, hover-preview island · 4c `/work/[slug]` brief template — placard header, stamped status, screenshot gallery, links, prev/next |
| **5 — Remaining surfaces** | 5a homepage (intro → work → about/IE) · 5b `/services` (Pahinga featured; must stand alone) · 5c `/how-i-build` · 5d contact form (all states) + `/404` + the footer stat block |
| **6 — Project content** | 3 short hero briefs + the Pahinga card. Blocked on A2 + A3. |
| **8 — Launch** | 8a SEO/OG, sitemap, robots, favicon · 8b analytics + status-label sweep (résumé link whenever) · 8c the design/a11y floor as hard gates — keyboard nav, visible focus, reduced motion, contrast, no horizontal body scroll · 8d full-app polish, finish review, write `DESIGN.md` |

*(Phase 7 "live proof" — GitHub graph + Monte Carlo simulator + Vitest —
is removed from v1. The footer stat block is the only proof element that
ships. A client-side probabilistic-reasoning widget from UFC Scouting's
`lib/scoring` is a possible post-launch addition, needing a test-first
pass.)*

### Recommended route trim

`docs/user-flows.md` maps 11 routes with a separate `/work` index. With
only 4 projects, **drop the `/work` index route** — the homepage work
section becomes the full list, per-project brief pages stay, the manifest
menu already lists projects directly. ~8 routes instead of 11.

### Pre-committed cut list (if it ever gets tight)

1. `/how-i-build` — cut last and reluctantly; it owns the positioning. If
   it goes, its menu item goes with it.

**Never cut:** the three hero briefs, the custom domain, the design/a11y
floor (8c).

### Accessibility

The floor items (keyboard, visible focus, reduced motion, contrast, no
horizontal body scroll) are hard launch gates. A full WCAG 2.2 AA audit is
deferred post-launch — open-ended scope that doesn't fit the build.

---

## 11. Open items — for Gary or the next reviewer

1. **Is 3 briefs + 1 card thin?** Acceptable per this plan; NFC is the
   add-back if it reads sparse once built.
2. **Application timing** — not imminent. Ship-bias kept anyway.
3. **The `/work` index route** — recommended to drop (see above); needs
   a `docs/user-flows.md` revision if agreed.
4. **The optional Cornerman audio clip** — nice-to-have, never a blocker.

---

## 12. Verification log — checked against live GitHub, 2026-09-04

| Project | Result |
|---|---|
| **Cornerman** | Confirmed as described. WSOLA time-stretch, bundled Kokoro TTS, background audio, Jest + CI, ~68 commits. Keep as lead. |
| **UFC Scouting** | An earlier review said "no Bluesky/rumour feature" — **now stale; it's built**, along with the odds spine, two-board scoreboard, the "intern," Elo, and more. Vitest installed, ~28 tested scoring functions. Pivoted to solo; clans frozen + off nav but the README still tells the old story. Rewrite the brief around the current app. |
| **Saffron** | Confirmed: real operating restaurant, live, unpaid friend's business. README is 13 bytes — write one. |
| **NFC Review Plates** | Old description ("real business, real revenue, real users") substantially overstated — it's a sales-practice project with one pilot and ~3 plates sold. Real full-stack build. Off v1; possible future card. |
| **Sports Bet Tracker** | Live with active commits, but its own `ARCHITECTURE.md` still reads as a rebuild plan; overt gambling framing; redundant with UFC Scouting. Cut. |
| **Pahinga Coffee** | Confirmed by its own README as a fictional/practice build. Card only. |
| `tailor-resume` skill / "Term Ledger" | Referenced by an earlier review as "already set up" — **does not exist** in global skills or the repo. |

Cost (§9) re-verified, unchanged.
