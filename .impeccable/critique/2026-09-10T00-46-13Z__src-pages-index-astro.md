---
target: the plain-text portfolio homepage after the 2026-09-10 visual direction reset
total_score: 21
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 1
timestamp: 2026-09-10T00-46-13Z
slug: src-pages-index-astro
---
Method: dual-agent (A: design review · B: detector + browser evidence). Browser automation was unavailable to both sub-agents; live-render notes are computed from built HTML/CSS and cross-checked against production screenshots captured earlier this session.

# /impeccable critique — plain-text portfolio homepage (post-2026-09-10 reset)

Target: `src/pages/index.astro` through `BaseLayout`, `Nav`, `Footer`, `ProjectGrid`, `ProjectCard`, `global.css`. Mode: **Experience**.

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Good `:focus-visible`; sticky nav aids orientation. But no `aria-current` / active state — you can't tell which page you're on. |
| 2 | Match System / Real World | 3 | Honest plain labels ("Android APK", "Real client (unpaid)"). But "Kokoro TTS (offline) · WSOLA time-stretching" is untranslated insider jargon — the time-poor founder won't parse it; the business-owner audience has no chance. |
| 3 | User Control and Freedom | 2 | "View brief" ×3 → 404; nav `/services` + `/how-i-build` → 404; no designed `/404` to catch the fall. |
| 4 | Consistency and Standards | 3 | Disciplined token system, single divider vocabulary. But the stack line renders at 16px (no size class — inherits by omission) while its 13px `meta` siblings sit right below it; links carry no rest-state underline. |
| 5 | Error Prevention | 2 | Dead internal routes shipped in the nav and in every card. No link-existence gate. |
| 6 | Recognition Rather Than Recall | 3 | Single screen, persistent nav, no cross-screen memory. Minor: stack acronyms lean on reader recall. |
| 7 | Flexibility and Efficiency | n/a | Experience mode — one linear read, no repeat/power users. |
| 8 | Aesthetic and Minimalist Design | 3 | Genuinely uncluttered and fast. But minimal has tipped to under-informative: the flagship (Cornerman) gets pixel-identical treatment to the practice build (Pahinga). |
| 9 | Error Recovery | 2 | No `/404` built; contact path is "Contact form to follow" with only a buried `mailto:` in the socials list. |
| 10 | Help and Documentation | n/a | A portfolio homepage needs no help system. |
| **Total** | | **21/32** | **Acceptable (66%)** — significant improvements needed before this is in front of anyone. |

Two heuristics `n/a` (7, 10) per Experience-mode applicability. Prior run on this slug (2026-09-07, **26/32**) judged the retired shipping-manifest design — **not a like-for-like comparison**; a different visual world was under review.

## Design Specificity Verdict

**LLM assessment (unanchored): it has landed in the cluster.** Right now this is category-interchangeable "minimal dev portfolio," and the things that would pull it out are not on the page yet.

Strip the four stack strings and ask what on this homepage is specific to *this* person: one sentence — "Third-year Industrial Engineering student at De La Salle University. I ship production software." That IE-plus-ships-production-software juxtaposition is a genuine hook (PRD §2 names it as the memorable half). Everything else — system font, `#171717` on `#fbfbfb`, one centered ~42rem column, hairline `<hr>` between sections, 13px grey metadata, no accent — is the precise common denominator the Phase 2 seed roll existed to avoid and PRD §8's clustering warning calls out by name.

The reset was a defensible *decision* — the honest industry norm for an early-career portfolio, and the projects are real. But the execution removed the old direction's specificity (gimmicky as it was) and has so far replaced it with nothing: no authored typographic move, no structural asymmetry, no interaction, no single detail a founder carries away. The deliberately-uneven type scale and the `::selection` redaction-mark swap are the only authored touches, and both are imperceptible in a skim.

The raw specificity *exists* in the content — "Kokoro TTS (offline) · WSOLA time-stretching," "immutable odds snapshots," "Row-level security" — but it's dumped into one undifferentiated 16px grey run-on string per card, line-clamped to two lines, looking like every other tech-tag list on every other portfolio. The design does nothing to surface the one thing that makes Gary not-generic.

**Can it survive?** Only if Phase 6 lands real briefs + screenshots + the IE/about section **and** one deliberate structural or typographic decision gets made that is unmistakably Gary's. As it stands at this checkpoint: in the cluster, no compensating specificity, a founder who blinked would not remember it.

**Deterministic scan:** `detect.mjs --json dist/index.html` → **`[]`, exit 0, zero findings.** Cross-checked against the compiled CSS: clean. Every utility class in the build maps to a real element — no Tailwind ghost-class noise despite the `global.css` warning about `.impeccable`-docs scanning (one dead `.mt-2`/`.py-4` compiles into `dist` CSS, zero elements use it, already documented as accepted). The detector and the design review **agree on the mechanics** — the build is clean; the problem is entirely compositional and content-completeness, which a mechanical scan cannot see.

**Visual overlays:** not available — no browser automation with mutable injection in the sub-agent environment. No user-visible overlay tab exists. Findings below are from source + built output + production screenshots taken earlier this session (which corroborate the "grey text list, big empty margins, tiny Work label" picture).

## Overall Impression

The bones are careful and the restraint is real infrastructure, not a lazy default. But at this checkpoint the homepage is serving a **weak first impression to a skeptical audience with a broken primary path and nothing concrete to be convinced by** — no screenshots, no briefs, dead "View brief" links, uncurated repos behind "View repo," contact deferred. It reads as the exact PRD §7 failure mode it's trying to avoid ("portfolio 90% done for months"). The single biggest opportunity: the reset created a blank canvas, and it needs **one authored design decision** (the flagship breaking the grid; an asymmetric column; the stack tokens treated as content, not a caption) plus the Phase 6 content, or it stays generic.

## What's Working

1. **The first viewport respects the time-poor founder.** Name plus one sentence, no hero theatrics, no gradient, no "passionate developer," no web font blocking paint. The IE-student-who-ships-production-software line is a real differentiator and it's the literal first thing read.
2. **Honest status labelling is disciplined, and a skeptic will notice.** `ProjectCard` computes the status *word* and the link *target* as two independent decisions — a `live` project with no recorded URL shows a true "Live" beside an honest "View repo," never a dead "Live site." "Android APK" not "Live"; "Real client (unpaid)" with the unpaid part kept. Directly answers the "must not imply trusted by businesses" constraint.
3. **The restraint is real infrastructure.** No `@font-face`, no preloads, one divider styled once in the base layer, `prefers-reduced-motion` handled including the JS edge case where `behavior: 'smooth'` would override the CSS rule. Detector 100% clean. Contrast passes AA (`#5c5c5c` on `#fbfbfb` = 6.46:1; ink = 17.3:1).

## Priority Issues

### [P0] The primary path dead-ends
Every "View brief" link 404s (no `/work/[slug]` in the build), and the hero contract names "open the first project" as *the* primary action. Nav additionally links to `/services` and `/how-i-build`, both 404. No `/404` page exists to catch the fall.
**Why it matters:** the one behavior the whole page is built to produce is broken, and a skeptical founder hits it on their first click.
**Fix:** until 4c/5b/5c ship, don't surface links to routes that don't exist — hide "View brief" when the target isn't built (the same discipline `ProjectCard` already applies to `liveUrl`), and drop `/services` + `/how-i-build` from `NAV_LINKS` until they resolve. Ship `/404` (5d) early. Add a build-time internal-link check to the gate.
**Suggested command:** `/impeccable harden`

### [P1] Flat hierarchy — nothing is primary, nothing anchors the eye
The whole page collapses into two type sizes and one grey. Project name (19px semibold), stack (16px grey), status/client/"Work"/links (all 13px grey). The flagship (Cornerman — mobile-only, offline DSP) is visually identical to the practice build (Pahinga).
**Why it matters:** the UX floor requires "one obvious primary action" and "one clear hierarchy per screen." A founder skimming has no entry point and no cue about what deserves attention.
**Fix:** give the project name real size/weight; make the brief link an actual affordance, not a 13px word lost in a link row; let the flagship break the grid (more vertical space, or the first row rendered larger). Decide what earns 16px+ (a plain-language one-liner, not the stack).
**Suggested command:** `/impeccable shape` (then `/impeccable layout`)

### [P2] The cards don't say what the projects *are*
No one-liner, no screenshot, no outcome. "Cornerman / Android APK / [stack] / Self-directed" is unparseable to the target audience. The `tagline` field exists in the schema but is never rendered (and is placeholder text anyway).
**Why it matters:** this is the "show, don't tell" failure at its core — the page tells you a stack and shows you nothing. PRD §9 explicitly moved the persuasive load onto briefs + screenshots + live links, and none of that is here yet.
**Fix:** render a real one-line plain-language description per project ("An offline combo-callout trainer for boxers — bundled speech synthesis, works with no network"). Prioritise Track A2 (screenshots) and A3 (brief copy) — they are the mechanism, not polish.
**Suggested command:** `/impeccable clarify` (blocked on A2/A3 content)

### [P2] The "Work" heading is orphaned *and* typographically invisible
13px `#5c5c5c`, 48px of `<hr>` margin above, 32px below — identical treatment to "Self-directed" inside the cards. On a single-section page it reads as a stray label, not a section marker.
**Why it matters:** fails as a landmark, adds visual noise without adding structure. (Worse than the known "orphaned in whitespace" item — it's also invisible *as a heading*.)
**Fix:** either drop it entirely and let the list begin after the hairline, or give it a genuine section-marker treatment (larger, or a small-caps/tracked kicker, or set into the margin). Don't leave it as body-metadata-sized grey.
**Suggested command:** `/impeccable typeset`

### [P2] Mobile tap targets below WCAG 2.5.8
Every secondary link is `text-meta` (13px) with no padding → inline hit box ≈ 19.5px tall, below the 24×24px AA minimum. They pass 2.5.8 only via its spacing exception (16px vertical gap in the stacked mobile nav, 32px horizontal between card links). Well below the 44×44 platform guidance.
**Why it matters:** PRODUCT.md's a11y floor is a hard launch gate; the stacked mobile nav is the tightest case and the most-used control.
**Fix:** add vertical padding to the nav links and card action links so the touch target reaches ≥24px (ideally closer to 44px) without changing the visible type size.
**Suggested command:** `/impeccable adapt`

### [P3] Centered 42rem column with dead side margins on desktop
At ~1280px, 640px of content floats between ~320px of empty space each side — the template silhouette.
**Why it matters:** a sparse page in a narrow centered column is the shape that says "not authored."
**Fix:** *use* the space rather than just left-anchoring (a lone left column reads lopsided) — an asymmetric layout, or a two-column split (project meta in a narrow left rail, name + description in the main column). This is also the opportunity to introduce the one authored structural decision the direction is currently missing.
**Suggested command:** `/impeccable layout`

## Persona Red Flags

**Jordan (first-timer):** lands on four rows of near-identical grey text, no images, clicks the first "View brief" → 404, leaves in under 30 seconds having learned only that Gary is a student with four repos. The page never told them what a single project *is*.

**Skeptical founder (project-specific):** "show, don't tell" currently shows nothing — no screenshots, no outcomes, dead briefs, uncurated repos behind "View repo" (and per Gary's own open items, `saffron-web` has a 13-byte README, `ufc-scouting-app`'s README describes the wrong app). The honesty labels are good but there's nothing concrete to be honest *about* on the page yet. Reads as an unfinished portfolio — precisely the credibility failure the site exists to fix.

**Casey (mobile):** the header is unconditionally `sticky top-0` and opaque; below 640px the wordmark + four links stack vertically, so a tall nav block pins to the top and eats a slice of every scrolled viewport. Still no images — mobile is a full-width grey text wall. `line-clamp-2` on Cornerman's five-item stack likely clips "WSOLA time-stretching" — the single most distinctive token — and the `title` tooltip fallback is unreachable on touch.

## Minor Observations

- **Stack line has no size token** — `class="text-ink-muted ..."` with no `text-*`, inherits 16px body while its 13px `meta` siblings sit right below it. Reads as a bug, not a decision — should be `text-meta`.
- **Links have no rest-state underline** (`hover:underline` only) — on touch, "View brief" / "View repo" / footer socials never look like links.
- **`line-clamp-2`** silently truncates the most interesting stack tokens on narrow viewports; the `title` attribute is desktop-hover-only.
- **Nav has no `aria-current` or active-state styling.**
- **Contact is deferred at the exact conversion moment** — a founder ready to reach out must open the socials `<ul>` and recognise "Email" as a `mailto:`.
- **Good:** `ProjectCard` correctly does not render the placeholder `tagline`/`year` — unfinished data stays invisible rather than shipping "Placeholder tagline — Track A3" to production.
- **Skip link** is now fully hidden (`-translate-y-20` fix confirmed by static box math), appears on first Tab, focus outline compliant.

## Questions to Consider

1. If the four stack strings were deleted, what on this page is specific to Gary? Is one sentence enough to beat a cluster this well-worn?
2. The reset walked toward the cluster "because the four real projects carry it" — but the projects aren't visible yet (no briefs, no shots, dead links). Should this homepage be in front of *any* audience before Phase 6 lands?
3. Does "Work" need to be a heading at all on a one-section page?
4. Cornerman is the most distinctive thing Gary has built, sits first, and gets the exact visual weight of a practice build. Should the flagship break the grid?
5. "I ship production software" is a claim, on a site whose thesis is "show, don't tell." Is that one claim earning its place, or should the work be made to say it?
6. Is a centered 42rem column the *honest* choice or the *safe* one? The contract says "left-aligned" about the text — it never said the column sits dead-center in an ocean of white.
