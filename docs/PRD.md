# PRD — Gary Reyes Portfolio

**Status:** Confirmed
**Date:** 2026-08-28
**Amended:** 2026-09-04 — scope revision after re-verifying the source
repos: roster cut to 3 hero briefs + 1 card; long-form case studies
replaced by short briefs; recorded demo videos replaced by screenshots;
the Monte Carlo simulator and GitHub contribution graph cut. See
`CHANGES.md` and `PLAN-REVIEW-BRIEF.md`. Sections 5, 9, 10, 11 updated.
**Owner:** Gary Reyes (Industrial Engineering, De La Salle University — 3rd year)

This is the single source of product truth for this project. Later
planning steps (`app-architect`, `user-flow-mapper`, `roadmap-planner`,
`/impeccable init`) read this document and do not re-interview for
anything it already answers. If another document conflicts with this
one, this one wins.

---

## 1. Problem statement

Gary has shipped several real software projects — a mobile training app
with offline speech synthesis and real-time audio DSP, a full-stack
fight-analysis tool with an LLM assistant, a live site for a friend's
restaurant, and more — but has no single place that presents them. Right
now the only way anyone can evaluate the work is by browsing raw GitHub
repositories, which no startup founder and no café owner will ever do.

The specific pain being removed: **the work exists but is unpresentable.**
Applications currently rest on a resume that cannot show a working
product, and freelance prospects have nothing to look at.

Why now: the café-website side hustle needs a credible sales surface, and
a portfolio is the prerequisite for startup applications whenever they
start going out. (As of 2026-09-04 no application is imminent — the
launch guardrail in §7 stands regardless.)

---

## 2. User types

### Primary — Startup hiring people

Founders or engineering leads at startups, evaluating Gary for a
voluntary/unpaid internship. They decide the outcome the site exists for.
They are technically literate, time-poor, and skeptical by default. They
will skim, click one or two projects, and form a judgment in under two
minutes.

### Secondary — Small-business owners

Local business owners who might commission a website (the Pahinga/Saffron
category). This is a **revenue** audience, not a hiring one. Non-technical.
They care about whether the finished sites look good and whether Gary is
easy to work with. They do not care about stack, architecture, or process.

### Positioning, not an audience — Industrial Engineering @ DLSU

IE recruiting is handled separately by resume; the site does **not**
target IE/manufacturing/operations roles. On the site, IE is identity and
credibility: "3rd-year IE student who ships production software" is a more
interesting and more memorable sentence than either half alone. It appears
as context in the hero and about section, not as a targeting decision.

### Explicitly not user types

Other developers, the open-source community, and Gary himself (this is not
a personal project tracker).

---

## 3. Core use cases

**Startup founder evaluating a candidate**

1. Lands on the homepage, understands within seconds who Gary is and what
   he builds.
2. Scans the project list and picks whichever is most relevant.
3. Opens a project brief, views the screenshots, reads what the problem
   was and what decisions were made.
4. Optionally follows through to the live site or the GitHub repository.
5. Optionally visits "How I build" to understand the working method.
6. Makes contact.

**Small-business owner evaluating a web designer**

1. Arrives (likely via a link Gary sent directly, not via search).
2. Looks for evidence of finished, attractive sites for businesses like
   theirs — Pahinga and Saffron are the relevant proof.
3. Submits an inquiry through the contact form.

**Gary maintaining the site**

1. Adds or edits a project by writing an MDX file in the repository.
2. Commits and pushes; the site redeploys automatically.
3. There is no admin interface and no login. Editing content _is_ the
   normal development workflow.

---

## 4. Positioning decision — "show, don't tell," with an owned method page

Gary builds primarily by orchestrating Claude Code — custom skills, MCP
servers, and a personal harness — rather than by hand-writing code. This
is the most unusual fact about him and it cuts both ways with a startup
audience.

**Decision:** the homepage leads with the _work_, never with the method. A
dedicated **"How I build"** page owns the method honestly — the harness,
the skills, the MCP setup, the CI gates and planning documents that appear
across his repositories. Curious readers self-select into it; skeptics
never reach it.

**Consequence, accepted deliberately:** because nothing is _claimed_ on the
homepage, the project briefs and the honest live links carry the
persuasive load. Bare project cards would show nothing. This is why each
hero project gets a real brief (problem, key decisions, status,
screenshots) — see §9 — rather than a one-line card.

---

## 5. Project inventory

**Four projects shown: three hero briefs plus one practice card.** Three
are built for real use; one is a deliberate practice build. This is the
honest version of the old "five of six are real" claim, which did not
survive re-verification (2026-09-04).

| Project              | Tier | Type                | Backend                          | Status                             | Notable                                                                                                          |
| -------------------- | ---- | ------------------- | -------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------- |
| **Cornerman**        | hero | Expo / React Native | None — offline, MMKV             | Android APK; Play Store in progress | Bundled Kokoro TTS, WSOLA time-stretching, background audio. Most technically distinctive; the only mobile project. |
| **ufc-scouting-app** | hero | Next.js App Router   | Supabase + RLS                   | Live                               | Multi-source data reconciliation, immutable odds snapshots, an LLM "intern" scored on two boards against a control line, GitHub Actions cron, test-first money math |
| **saffron-web**      | hero | Next.js + TS         | None — reservations via email    | Live on Vercel                     | **Real client, unpaid** — a friend's operating restaurant                                                        |
| **pahinga-coffee**   | card | React/Vite, static   | Web3Forms                        | Live                               | Practice build; the café-site proof for `/services`                                                              |

**Range demonstrated:** offline audio/DSP and mobile systems, row-level
security and permissions, external-API data pipelines with statistical
modelling, and real client delivery — three genuinely different
competencies, not variations of one CRUD app.

**Considered and cut (2026-09-04):**

- **nfc-side-hustle** (QR review-plate platform) — real full-stack build
  (Next.js, Neon + Drizzle, role-based auth, multi-branch, scan
  analytics), but its "running business" framing did not hold: it is a
  door-to-door *sales-practice* project with one pilot restaurant and ~3
  plates sold. Possible future card.
- **Sports-Bet-Tracker** — live, but overt gambling framing, a
  contradictory rebuild-vs-live story in its own docs, and heavily
  redundant with ufc-scouting-app.

---

## 6. Explicitly out of scope for v1

These were considered and deliberately cut. They do not creep back in
without an explicit decision to reopen them.

- **No admin dashboard.** Considered and rejected — it serves one user,
  is invisible to every visitor, and is permanent maintenance debt.
- **No database.** Case studies live as MDX files in the repository.
- **No authentication or login of any kind.**
- **No headless CMS** (Sanity, Contentful, Decap).
- **No custom analytics backend** — a drop-in service only.
- **No inquiry/lead pipeline tracking.** The contact form emails Gary; a
  CRM is not v1.
- **No blog.**
- **No IE-targeted content track** — resume handles IE recruiting.
- **No dark/light theme toggle** unless the assigned design direction
  calls for it.
- **No i18n.**

Deferred to a possible Phase 2 (explicitly _after_ launch and after
applications are sent): inquiries persisted to Postgres, an admin
interface, and self-hosted analytics — as a deliberate learning project
on top of a site that is already live.

---

## 7. Success metrics

> ### ⚠️ These are PLACEHOLDER numbers, not forecasts
>
> **No baseline exists for any of them.** Gary has never applied to a
> startup and has never had a paying client (`saffron-web` was real client
> work, but unpaid — a friend's business). Any target here is invented.
>
> They are kept because a made-up number you can act on beats no number at
> all. The first real application batch **measures** what normal looks
> like; only then does a genuine target get set.
>
> **Revision trigger:** once ~15 applications have been sent and replies
> counted, delete this warning, replace the invented targets with real
> ones derived from the observed rate, and record the change.

| #   | Metric                    | Placeholder target                                                                | What it actually tells you                                                                                                                                                                            |
| --- | ------------------------- | --------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **Launch guardrail**      | Live on a custom domain with all three hero briefs and the Pahinga card, within ~3 weeks of build start | The only non-invented one. Guards against the real failure mode: a portfolio 90% done for months while the hero section gets re-tweaked. More important now that no imminent application is forcing the date. |
| 2   | **Startup response rate** | Apply to ~15 startups within 2 weeks of launch; count replies                     | Zero replies out of 15 means something is broken and needs changing. Three means it works and the answer is simply to send more. Without the count, you cannot tell those apart.                      |
| 3   | **Freelance conversion**  | ≥1 genuine inquiry and ≥1 _paid_ site within 3 months                             | Tests the second audience independently — the site could work on startups and do nothing for business owners. Note this would be a **first-ever paid client**, so it is more ambitious than it reads. |

Secondary signal, free via drop-in analytics: what fraction of visitors
open at least one project brief. Directly tests whether "show, don't
tell" is working. An observation for v1, not a target.

---

## 8. Constraints

**Locked and non-negotiable:**

- **React + TypeScript.** Gary's established stack; not reopened by
  `app-architect`.
- **Static site. No backend, no database, no auth.** (See §6.)
- **Content as MDX files** in the repository.
- **Free or near-free hosting.** Only recurring cost is the domain.
- **Not Vercel.** Cloudflare Pages is the presumed target — free,
  unmetered bandwidth, and deliberate variety from the four existing
  projects already hosted on Vercel. Final call belongs to
  `app-architect`.
- **Timeline: 2–3 weeks** to a live, shareable site.
- **Custom domain required.** Gary does not own one yet — this is a **v1
  blocker**, not a nice-to-have. Shipping on a `*.pages.dev` subdomain
  defeats the professional purpose. Budget ≈ $12/yr.

**Full cost of ownership — the domain is the only real cost:**

| Item                                 | Service                                                                                           | Cost             |
| ------------------------------------ | ------------------------------------------------------------------------------------------------- | ---------------- |
| Domain (`.dev` or `.com`)            | Cloudflare Registrar (sold at cost, no markup, no first-year bait pricing)                        | **~$10–15/yr**   |
| Hosting                              | Cloudflare Pages free tier — unlimited bandwidth and requests, 500 builds/mo, 25 MiB max per file | **$0**           |
| HTTPS certificate                    | Cloudflare, automatic                                                                             | **$0**           |
| Analytics                            | Cloudflare Web Analytics (no cookie banner needed) or Umami free tier                             | **$0**           |
| Contact form                         | Web3Forms free tier (~250 submissions/mo) — already proven in `Pahinga-Coffee`                    | **$0**           |
| Screenshot hosting                   | Committed to the repo and served by Pages                                                        | **$0**           |
| Email forwarding to a custom address | Cloudflare Email Routing (receive/forward only)                                                   | **$0**           |
| **Total**                            |                                                                                                   | **~$10–15/year** |

Optional, not required for v1: _sending_ mail from `you@yourdomain` needs a
mail provider — Zoho Mail has a free single-user tier, Google Workspace is
~$6/mo. Cloudflare's free routing only forwards inbound mail.

**Design constraints:**

- Restrained motion. Scroll and hover effects only where they earn their
  place; explicitly _not_ an effects showcase.
- Must respect `prefers-reduced-motion`.
- Mobile-first and fully responsive.
- Casual but semi-professional in tone; playful is welcome, corporate is
  not.

### Reference brief

Supplied as _world_, not as a template to copy. What matters is what each
does that is **specific to it**, not what they share.

| Reference | What is specific to it (the part to take) |
| --- | --- |
| `800k.dev` | **Working functionality as content** — an interactive typing test with live WPM, a real-time viewer count, App Store ranking badges. The site *does things* rather than describing them. Its minimalism is the least distinctive thing about it. |
| `hampusdesign.com` | Rust-red accent on off-white; grayscale imagery with selective colour; explicitly **no parallax**. Subtle scroll-driven reveal — restraint over spectacle. |
| `brittanychiang.com` | Inter throughout; dark navy; projects as cards; experience as a dated timeline with skill tags; a playful footer easter egg. The **navigate-away-into-detail** pattern for case studies. |
| `webportfolios.dev` | The hover-to-preview project grid pattern only. |

**Dropped:** `duoplex.pro` — it is an agency *sales* site (conversion
narrative, stat callouts, "Digitalize, Automate & Grow Your Business"),
which is a different job from a hiring portfolio. Pinning both pulled the
brief in two directions.

**Non-portfolio world — industrial / technical drawing.** Engineering
drawings, tolerance callouts, dimension lines, blueprint annotation, spec
sheets. This is the deliberate anti-cluster reference: it comes from
outside the dev-portfolio category entirely, it is authentically Gary's
own domain as an IE student, and its visual language is measured and
annotated rather than decorative. No other portfolio in this category is
pulling from it.

> ⚠️ **Aesthetic-clustering warning.** "Minimal, black and white, clean"
> is very close to a known default that AI-generated interfaces converge
> on — and it is precisely the common denominator of the references
> above. The visual direction must be **assigned by
> `/impeccable new-work`'s `concept-seed.mjs`**, from outside the model,
> not chosen by taste and not defaulted to the safest rendition of these
> references. A pinned reference pins the **world**, not its safest
> version.

---

## 9. Project briefs and media strategy

Each of the **three hero projects** gets a short, README-shaped **brief**
on its own page (`/work/[slug]`), reached by navigating away from the
homepage work section (the `brittanychiang.com` pattern). **Not** a
long-form case study — long case studies read as padding for an
early-career SWE portfolio and recruiters do not read them. Pahinga is a
**card** only: a screenshot, a line, and a link to its live site — no
brief page.

**Each hero brief contains (~150–250 words, one screen):**

- One line: what it is
- **Screenshots** — this is the "show"
- 3–5 bullets: the problem, the 1–2 genuinely interesting technical
  decisions, the outcome / current status
- Tech tags
- Links: live site and/or repository and/or APK, with status labelled
  honestly (`Live` / `Android APK` / `Practice`)

**Media is screenshots, not recorded video.** The video-production
dependency was the largest schedule risk and would not reliably get done.
An optional ~20-second Cornerman clip (spoken combo call-outs — the one
thing a screenshot cannot convey) may be added later but never blocks
launch.

**What this leans on:** "show, don't tell" now rests on (a) the live
links being up and (b) the code being clean and browsable. Two of three
heroes are clickable — Saffron is a live marketing site, and UFC
Scouting's twice-daily GitHub Actions cron keeps its free-tier Supabase
project awake. Cornerman is a mobile app; nobody expects to click it from
a desktop portfolio.

**Source material:** `Cornerman-2`, `ufc-scouting-app`, and `saffron-web`
all carry rich internal docs (`ARCHITECTURE.md`, `PRODUCT.md`,
`RETROSPECTIVE.md`). Each brief is largely a translation job, not writing
from blank.

---

## 10. Edge cases and failure states

| Scenario                                | Required behaviour                                                                           |
| --------------------------------------- | -------------------------------------------------------------------------------------------- |
| Contact form service is down or rejects | Visible error message with a mailto fallback. Never a silent failure or an infinite spinner. |
| Contact form spam                       | Honeypot field at minimum; the form service's own spam filtering.                            |
| A project's live demo is dead or paused | Screenshots still tell the story. Link status labelled honestly (Live / Android APK / Practice). Cornerman has no live URL and must not render a dead "Live demo" affordance. |
| A screenshot fails to load or is slow   | Layout holds with alt text; the brief still reads completely. Images lazy-loaded, never blocking first paint. |
| Visitor has `prefers-reduced-motion`    | All scroll and hover motion disabled or reduced. Content fully readable and navigable.       |
| Slow connection or large media          | Text and layout render first; media never blocks reading.                                    |
| Direct link to a project brief          | Every hero brief is independently linkable and shareable, with correct OG tags for previews. |
| Unknown URL                             | Designed 404 page with a route back to the homepage work section.                            |
| Very small or very large viewport       | Fully responsive; no horizontal scroll on the body at any width.                             |
| Empty states                            | Not applicable — all content is authored and static.                                         |

---

## 11. Feature prioritisation (MoSCoW)

### Must have — v1 does not ship without these

- Homepage: who Gary is, what he builds, one obvious primary action; the
  work section doubles as the full project list
- Three hero project briefs, each with screenshots and honest links
- Pahinga as a card (screenshot + line + link to its live site)
- "How I build" page (the method, owned honestly)
- About section (IE @ DLSU as positioning)
- Working contact form with visible failure handling
- Custom domain, live on Cloudflare Pages
- Fully responsive, `prefers-reduced-motion` respected
- Designed 404
- SEO/OG baseline: titles, meta, OG images, `sitemap.xml`, `robots.txt`, favicon
- Footer spec-sheet stat block (projects shipped, live in production, real
  client work, peak commit day) — static, no API call

### Should have

- Drop-in analytics (Cloudflare Web Analytics)
- Hover previews on the work section (the `webportfolios.dev` pattern)
- Restrained scroll motion (the `hampusdesign.com` reference)
- Honest status labels on every project link

### Could have

- Downloadable résumé link (deferred — résumé does not exist yet)
- An optional ~20s Cornerman audio clip
- Filter/sort on the work section
- A client-side probabilistic-reasoning widget derived from
  `ufc-scouting-app`'s scoring lib (implied probability / edge /
  calibration) — post-launch only, needs a test-first pass

### Won't have (this version)

- Admin dashboard, database, authentication
- CMS
- Blog
- Inquiry/lead pipeline tracking
- Theme toggle (unless the assigned design direction requires it)
- i18n
- IE-targeted content track
- Recorded demo videos
- GitHub contribution graph (94% empty — replaced by the stat block)
- Monte Carlo simulator (over-scoped for v1; its source project was cut)

---

## 12. Open questions for `app-architect` — all resolved

1. Framework → **Astro** (see `ARCHITECTURE.md`).
2. MDX frontmatter typing → **Astro Content Collections + Zod** in
   `src/content/config.ts`.
3. ~~Where demo video files live~~ → moot; media is screenshots in
   `public/`, no video pipeline (2026-09-04).
4. Domain name and registrar → still open; Cloudflare Registrar assumed,
   not yet purchased (a v1 blocker).

---

## Handoff

`app-architect`, `harness-setup`, `user-flow-mapper`, the design
direction, and `roadmap-planner` have all run. The 2026-09-04 scope
revision has been propagated through `ARCHITECTURE.md`,
`docs/user-flows.md`, `PROJECT_FACTS.md`, `PRODUCT.md`, and `ROADMAP.md`.
Next: the `feature-planner` build loop, starting at Phase 3a.
