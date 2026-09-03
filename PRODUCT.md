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

Gary has shipped several real software projects but has no single place
that presents them; the only way to evaluate the work today is browsing
raw GitHub repositories, which neither a founder nor a café owner will do.
The work exists but is unpresentable.

Success is a startup internship conversation, and secondarily a paid
freelance client. No application is imminent as of 2026-09-04; the launch
guardrail (ship within ~3 weeks of build start) stands regardless.

## Positioning

A third-year Industrial Engineering student who ships production
software — including a mobile app with bundled offline speech synthesis
and real-time audio DSP, a full-stack fight-analysis tool with an LLM
"intern" scored against a control line, and a live site for a real
restaurant client.

The mechanism a neighboring portfolio could not truthfully copy: **three
projects built for real use, covering three genuinely different
competencies** — offline audio/DSP and mobile systems, row-level security
with external-API data pipelines and statistical modelling, and real
client delivery — rather than variations of one CRUD app. (No revenue
claim: none of the work has been paid.)

Gary builds primarily by orchestrating AI tooling (custom skills, MCP
servers, a personal harness) rather than by hand-writing code. **This is
never claimed on the homepage.** A dedicated "How I build" page owns it
honestly for readers who seek it out. The consequence is deliberate: the
project briefs and the honest live links carry the persuasive load.

## Operating Context

Seven static routes: home (its work section is the full project list),
three hero project briefs, a business-owner services page, a "How I
build" page, and a 404. No authentication, no accounts, no gated screens.

The founder's path is land → scan the work → open a brief → view
screenshots → follow the live link or repo → contact, at most three
screens deep. The business owner's path is a direct link to `/services` →
proof → inquiry.

Gary maintains the site by editing a content file in the repository and
pushing; there is no admin interface, and editing content *is* the normal
development workflow.

## Capabilities and Constraints

- Static site. **No backend, no database, no authentication, no CMS.**
- Content is authored and committed; there is no user-submitted content
  anywhere.
- Contact is a single form in the sitewide footer, with an inline success
  swap. No dedicated contact or thank-you route.
- Each hero project has a short brief (~150–250 words) with screenshots
  and honest live/repo links. No recorded video (cut 2026-09-04).
- The footer carries a static spec-sheet stat block (projects shipped,
  live in production, real client work, peak commit day) — not a
  contribution graph, and no build-time API call.
- No live/interactive proof element in v1. A probabilistic-reasoning
  widget from `ufc-scouting-app`'s scoring lib is a possible post-launch
  addition.
- Free or near-free hosting. A custom domain is required and **not yet
  purchased** — an open blocker.

**Terminology:** projects are referred to as *work*; a hero project's
page is a *brief*.

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

- Three hero projects, all built for real use: Cornerman (Expo/React
  Native, offline Kokoro TTS, WSOLA time-stretch, Android APK), UFC
  Scouting (Next.js + Supabase + RLS, immutable odds snapshots, an LLM
  "intern" scored on two boards against a chalk control, GitHub Actions
  cron, test-first money math, live on Vercel), Saffron (Next.js, real
  client — a friend's operating restaurant, unpaid, live). Plus Pahinga
  Coffee (static, deliberate practice build) as a card.
- Cut from the roster (2026-09-04): NFC Review Plates (real full-stack
  build but a sales-practice project, one pilot, ~3 plates sold — not a
  running business) and Sports Bet Tracker (gambling framing, redundant
  with UFC Scouting).
- Public GitHub profile with the repositories pinned.
- Verified GitHub figures (fetched 2026-08-28): 418 contributions across
  23 active days of 370; busiest day 53. (The footer stat block uses
  project figures, not this graph.)
- **A photo of Gary.**

**Absent — must never be fabricated:**

- **No résumé or CV file yet.** The résumé download is deferred until one
  exists.
- **No client testimonial or quote of any kind**, including from the
  Saffron client.
- **No project screenshots yet.** These must be produced (four projects).
- **No paying clients, no press, no metrics, no awards, no revenue.**
- **No baseline for outcomes** — no applications have been sent, so any
  success figures are placeholders rather than forecasts.

## Product Principles

1. **Show, never claim.** Nothing is asserted that a visitor cannot see,
   click, or read in the code. This is why honest live links, screenshots,
   and browsable repos carry the proof rather than prose.
2. **Serve two audiences without blurring either.** A founder and a café
   owner want different things; each gets a destination that reads
   correctly when it is the only page they see.
3. **Never overclaim.** Real-but-unpaid stays real-but-unpaid. Credibility
   with a skeptical reader is the scarce resource.
4. **Shipping beats polishing.** A live site with three honest briefs
   beats an unfinished perfect one; the launch guardrail outranks every
   Should-have.
5. **Specificity over category defaults.** The work is unusual — audio
   DSP, stochastic modelling, a real business — and the presentation
   should not flatten it into a generic developer portfolio.

## Accessibility & Inclusion

**v1 floor, as hard launch gates:** sufficient contrast, full keyboard
navigation, visible focus, honored `prefers-reduced-motion` across all
scroll and hover motion, and no horizontal body scroll at any width. A
full WCAG 2.2 AA audit is deferred post-launch (2026-09-04) — open-ended
scope that does not fit the build.

Interactive elements are progressively enhanced: the menu and hover
previews are client-side islands, and the site must remain fully
navigable and readable without them.

`jsx-a11y` linting is already wired into the project's CI gates.
