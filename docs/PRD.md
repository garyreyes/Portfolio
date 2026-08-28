# PRD — Gary Reyes Portfolio

**Status:** Draft for confirmation
**Date:** 2026-08-28
**Owner:** Gary Reyes (Industrial Engineering, De La Salle University — 3rd year)

This is the single source of product truth for this project. Later
planning steps (`app-architect`, `user-flow-mapper`, `roadmap-planner`,
`/impeccable init`) read this document and do not re-interview for
anything it already answers. If another document conflicts with this
one, this one wins.

---

## 1. Problem statement

Gary has shipped six real software projects — a mobile training app with
offline speech synthesis, a platform running an actual NFC business, a
site for a friend's local business, and three data-driven web apps — but
has no single place that presents them. Right now the only way anyone can
evaluate the work is by browsing raw GitHub repositories, which no startup
founder and no café owner will ever do.

The specific pain being removed: **the work exists but is unpresentable.**
Applications currently rest on a resume that cannot show a working
product, and freelance prospects have nothing to look at.

Why now: internship applications are imminent (2–3 week window), and the
café-website side hustle needs a credible sales surface to fund ongoing
tooling costs.

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
3. Opens a case study, watches a short demo video, reads what the problem
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

1. Adds or edits a case study by writing an MDX file in the repository.
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
homepage, the case studies carry the entire persuasive load. Six shallow
project cards would show nothing. This is why full case studies and demo
videos are Must-have rather than polish.

---

## 5. Project inventory

Five of six are real, live, or attached to real money. Only Pahinga is a
practice build. This ratio is the core argument of the portfolio.

| Project                | Type                  | Backend                                | Status                              | Notable                                                                                                             |
| ---------------------- | --------------------- | -------------------------------------- | ----------------------------------- | ------------------------------------------------------------------------------------------------------------------- |
| **Cornerman**          | Expo / React Native   | None — offline, MMKV                   | Android APK; Play Store in progress | Bundled Kokoro TTS, WSOLA time-stretching, background audio. Most technically distinctive; the only mobile project. |
| **nfc-side-hustle**    | Next.js + TS          | Neon Postgres + Drizzle                | Live, real business                 | Real users, real revenue, door-to-door sales                                                                        |
| **saffron-web**        | Next.js + TS          | None — reservations via email redirect | Live on Vercel                      | **Real client, unpaid** — a friend's local business                                                                 |
| **ufc-scouting-app**   | Next.js App Router    | Supabase + RLS                         | Live                                | External API sync via GitHub Actions cron                                                                           |
| **Sports-Bet-Tracker** | React/Vite + Tailwind | Supabase + RLS                         | Live                                | Analytics, Monte Carlo simulation, private groups                                                                   |
| **Pahinga-Coffee**     | React/Vite, static    | Web3Forms                              | Live                                | Practice build; the café-site sales proof                                                                           |

**Range demonstrated:** offline audio/DSP and mobile systems, a
cron-driven external data pipeline, row-level security and permissions,
statistical modelling, and a revenue-generating business — not six
variations of the same CRUD app.

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
| 1   | **Launch guardrail**      | Live on a custom domain with all six case studies and demo videos, within 3 weeks | The only non-invented one. Guards against the real failure mode: a portfolio 90% done for months while the hero section gets re-tweaked.                                                              |
| 2   | **Startup response rate** | Apply to ~15 startups within 2 weeks of launch; count replies                     | Zero replies out of 15 means something is broken and needs changing. Three means it works and the answer is simply to send more. Without the count, you cannot tell those apart.                      |
| 3   | **Freelance conversion**  | ≥1 genuine inquiry and ≥1 _paid_ site within 3 months                             | Tests the second audience independently — the site could work on startups and do nothing for business owners. Note this would be a **first-ever paid client**, so it is more ambitious than it reads. |

Secondary signal, free via drop-in analytics: what fraction of visitors
open at least one case study. Directly tests whether "show, don't tell" is
working. An observation for v1, not a target.

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
| Demo video hosting                   | Committed to the repo and served by Pages; compress each to <10 MB                                | **$0**           |
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

**Reference sites supplied** (as _world_, not as a template to copy):
`800k.dev`, `brittanychiang.com`, `hampusdesign.com`, `duoplex.pro`,
`webportfolios.dev`.

> ⚠️ **Aesthetic-clustering warning.** "Minimal, black and white, clean"
> is very close to a known default that AI-generated interfaces converge
> on. The visual direction must be **assigned by `/impeccable new-work`'s
> `concept-seed.mjs`**, from outside the model, rather than defaulted to
> the safest common denominator of these five references. What is wanted
> is what these sites do that is _specific to them_, not what they share
> with every other minimal portfolio.

---

## 9. Case study depth and demo strategy

Each of the six projects gets its **own case study page**, reached by
navigating away from the index (the `brittanychiang.com` pattern), not an
in-page panel.

**Each case study contains:**

- The problem and who it was for
- What was built
- Key decisions and their tradeoffs
- Outcome / current status
- **A 30–60 second recorded demo video or GIF**
- Links: live site and/or repository, with status labelled honestly

**Why recorded demos are Must-have, not polish.** Three of six projects
cannot be reliably clicked and seen:

- **Cornerman** has no web demo at all — Android APK only.
- **Sports-Bet-Tracker** and **ufc-scouting-app** run on Supabase's free
  tier, which **pauses projects after roughly 7 days of inactivity.** A
  founder clicking "Live Demo" after a quiet week gets a dead link.

A dead demo in front of a hiring manager is worse than no demo link. The
recording removes the dependency entirely.

**Source material:** `Cornerman-2`, `nfc-side-hustle`, and `saffron-web`
already carry `ARCHITECTURE.md`, `PRODUCT.md`, `ROADMAP.md`, and
`PROJECT_FACTS.md`. Case studies are largely a translation job from
existing documents, not writing from blank.

---

## 10. Edge cases and failure states

| Scenario                                | Required behaviour                                                                           |
| --------------------------------------- | -------------------------------------------------------------------------------------------- |
| Contact form service is down or rejects | Visible error message with a mailto fallback. Never a silent failure or an infinite spinner. |
| Contact form spam                       | Honeypot field at minimum; the form service's own spam filtering.                            |
| A project's live demo is dead or paused | Recorded demo still plays. Link status labelled honestly (Live / Android APK / Archived).    |
| Demo video fails to load or is slow     | Poster image / screenshot fallback. Videos must be lazy-loaded, never blocking first paint.  |
| Visitor has `prefers-reduced-motion`    | All scroll and hover motion disabled or reduced. Content fully readable and navigable.       |
| Slow connection or large media          | Text and layout render first; media never blocks reading.                                    |
| Direct link to a case study             | Every case study is independently linkable and shareable, with correct OG tags for previews. |
| Unknown URL                             | Designed 404 page with a route back to the work.                                             |
| Very small or very large viewport       | Fully responsive; no horizontal scroll on the body at any width.                             |
| Empty states                            | Not applicable — all content is authored and static.                                         |

---

## 11. Feature prioritisation (MoSCoW)

### Must have — v1 does not ship without these

- Homepage: who Gary is, what he builds, one obvious primary action
- Project index with all six projects
- Six full case study pages, each with a recorded demo video
- "How I build" page (the method, owned honestly)
- About section (IE @ DLSU as positioning)
- Working contact form with visible failure handling
- Custom domain, live on Cloudflare Pages
- Fully responsive, `prefers-reduced-motion` respected
- Designed 404
- SEO/OG baseline: titles, meta, OG images, `sitemap.xml`, `robots.txt`, favicon

### Should have

- Drop-in analytics (Plausible / Umami / Cloudflare)
- Hover previews on the project index (the `webportfolios.dev` pattern)
- Restrained scroll motion (the `hampusdesign.com` reference)
- Downloadable résumé link
- Honest status labels on every project link

### Could have

- GitHub Actions cron to keep Supabase free-tier demos awake, so live
  links stay genuinely clickable (reuses the pattern already in
  `ufc-scouting-app`)
- Filter/sort on the project index
- Case study reading time
- Subtle live touch (e.g. GitHub activity) — only if cheap and reliable

### Won't have (this version)

- Admin dashboard, database, authentication
- CMS
- Blog
- Inquiry/lead pipeline tracking
- Theme toggle (unless the assigned design direction requires it)
- i18n
- IE-targeted content track

---

## 12. Open questions for `app-architect`

1. Final framework: Vite + React Router, Astro, or Next.js static export —
   all satisfy "React + TypeScript, static."
2. MDX tooling and how case study frontmatter is typed and validated.
3. Where demo video files live and how they are served within Cloudflare
   Pages' limits.
4. Domain name selection and registrar.

---

## Handoff

Next step: **`app-architect`**, reading this document as its starting
context. It owns entities, the framework fork, folder structure, and
layer boundaries — none of which are decided here.
