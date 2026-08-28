# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

**Primary — startup hiring people.** Founders or engineering leads at
startups, evaluating Gary Reyes for a voluntary/unpaid internship. They
are technically literate, time-poor, and skeptical by default. They
arrive from a link in an application, skim, open one or two projects, and
form a judgment in under two minutes. They decide the outcome the site
exists for.

**Secondary — small-business owners.** Local business owners who might
commission a website. This is a revenue audience, not a hiring one. They
are non-technical, almost always arrive via a link Gary sends directly
while pitching rather than via search, and frequently see only one page.
They care whether the finished sites look good and whether Gary is easy
to work with; stack and architecture are irrelevant to them.

**Not a user type:** other developers, the open-source community, or Gary
himself. This is not a personal project tracker.

**Industrial Engineering @ De La Salle University is positioning, not an
audience.** IE recruiting is handled separately by résumé. The site does
not target IE/manufacturing/operations roles.

## Product Purpose

Gary has shipped six real software projects but has no single place that
presents them; the only way to evaluate the work today is browsing raw
GitHub repositories, which neither a founder nor a café owner will do.
The work exists but is unpresentable.

Success is a startup internship conversation, and secondarily a paid
freelance client. Applications are imminent, on a 2–3 week window.

## Positioning

A third-year Industrial Engineering student who ships production
software — including a mobile app with bundled offline speech synthesis,
a platform running a real revenue-generating business, and a live site
for a real client.

The mechanism a neighboring portfolio could not truthfully copy: **five
of six projects are real, live, or attached to real money**, spanning
offline audio/DSP and mobile systems, a cron-driven external data
pipeline, row-level security, and statistical modelling — rather than six
variations of one CRUD app.

Gary builds primarily by orchestrating AI tooling (custom skills, MCP
servers, a personal harness) rather than by hand-writing code. **This is
never claimed on the homepage.** A dedicated "How I build" page owns it
honestly for readers who seek it out. The consequence is deliberate: the
case studies carry the entire persuasive load.

## Operating Context

Eleven static routes: home, a project index, six case studies, a
business-owner services page, a "How I build" page, and a 404. No
authentication, no accounts, no gated screens.

The founder's path is land → scan → open a case study → play a demo video
→ read decisions → contact, at most four screens deep. The business
owner's path is a direct link to `/services` → proof → inquiry.

Gary maintains the site by editing a content file in the repository and
pushing; there is no admin interface, and editing content *is* the normal
development workflow.

## Capabilities and Constraints

- Static site. **No backend, no database, no authentication, no CMS.**
- Content is authored and committed; there is no user-submitted content
  anywhere.
- Contact is a single form in the sitewide footer, with an inline success
  swap. No dedicated contact or thank-you route.
- Each case study carries a recorded demo video, click-to-play with a
  poster image.
- A client-side Monte Carlo simulator lives inside the
  Sports-Bet-Tracker case study as working proof. Should-have; first to
  be cut if the deadline tightens.
- A GitHub contribution graph in the footer, rendered from build-time
  data.
- Free or near-free hosting. A custom domain is required and **not yet
  purchased** — an open blocker.

**Terminology:** projects are referred to as *work*; individual pages as
*case studies*.

## Brand Commitments

- **Name and wordmark: "Gary Reyes"**, used as the persistent nav mark.
- **Voice: casual but semi-professional.** Playful is welcome; corporate
  is not.
- **Honesty constraint, binding:** the site may say *available for
  freelance*. It must **not** imply *trusted by businesses*. Client work
  exists but has never been paid.
- **Motion is restrained by commitment**, not by taste — effects only
  where they earn their place. This is explicitly not an effects
  showcase.
- Binding visual constraint volunteered by the user, recorded without
  expansion: the reference world is **industrial / technical drawing**,
  chosen deliberately as a category-external anti-default. The visual
  direction itself is not decided here.

## Evidence on Hand

**Real and available:**

- Six shipped projects, five of them real, live, or revenue-attached:
  Cornerman (Expo/React Native, offline Kokoro TTS, Android APK),
  NFC Review Plates (Next.js + Neon/Drizzle, real business with
  revenue), Saffron (Next.js, real client — a friend's business, unpaid),
  UFC Scouting (Next.js + Supabase, cron-driven API sync),
  Sports Bet Tracker (React/Vite + Supabase, analytics and Monte Carlo),
  Pahinga Coffee (static, practice build).
- Public GitHub profile with those exact six repositories pinned.
- Verified GitHub figures (fetched 2026-08-28): 418 contributions across
  23 active days of 370; busiest day 53.
- **A photo of Gary.**

**Absent — must never be fabricated:**

- **No résumé or CV file yet.** The planned résumé download therefore has
  an unmet prerequisite.
- **No client testimonial or quote of any kind**, including from the
  Saffron client.
- **No project screenshots yet.** These must be produced alongside the
  six demo videos.
- **No paying clients, no press, no metrics, no awards.**
- **No baseline for outcomes** — no applications have been sent, so any
  success figures are placeholders rather than forecasts.

## Product Principles

1. **Show, never claim.** Nothing is asserted that a visitor cannot watch,
   play, or click. This is why recorded demos and working proof are
   requirements rather than polish.
2. **Serve two audiences without blurring either.** A founder and a café
   owner want different things; each gets a destination that reads
   correctly when it is the only page they see.
3. **Never overclaim.** Real-but-unpaid stays real-but-unpaid. Credibility
   with a skeptical reader is the scarce resource.
4. **Shipping beats polishing.** A live site with six honest case studies
   beats an unfinished perfect one; the deadline outranks every
   Should-have.
5. **Specificity over category defaults.** The work is unusual — audio
   DSP, stochastic modelling, a real business — and the presentation
   should not flatten it into a generic developer portfolio.

## Accessibility & Inclusion

**Target: WCAG 2.2 AA.** Contrast, full keyboard navigation, visible
focus, and honored `prefers-reduced-motion` across all scroll and hover
motion.

Interactive elements are progressively enhanced: the menu, hover
previews, and the Monte Carlo simulator are client-side islands, and the
site must remain fully navigable and readable without them.

`jsx-a11y` linting is already wired into the project's CI gates.
