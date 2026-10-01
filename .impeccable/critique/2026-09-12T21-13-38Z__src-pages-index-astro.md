---
target: portfolio
total_score: 29
max_score: 32
na_heuristics: 7,10
p0_count: 1
p1_count: 1
timestamp: 2026-09-12T21-13-38Z
slug: src-pages-index-astro
---
## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3/4 | Contact form's idle→submitting→success/error sequence is well-built; external links give no visual cue they leave the site before click |
| 2 | Match Between System and Real World | 4/4 | Plain, honest, jargon-appropriate for a technical hiring audience |
| 3 | User Control and Freedom | 4/4 | No modals/traps; externals open in new tabs; form success is an inline swap |
| 4 | Consistency and Standards | 3/4 | Every real link on the site is underlined — except the wordmark, which breaks the site's own convention |
| 5 | Error Prevention | 4/4 | `ProjectCard.astro` never renders a dead "Live" link without a real `liveUrl`; `WORK_BRIEFS_LIVE` gates "View brief" off entirely |
| 6 | Recognition Rather Than Recall | 4/4 | Every project card repeats its own facts line — nothing to hold in memory card-to-card |
| 7 | Flexibility and Efficiency of Use | n/a | Single-visit persuade page; no repeat-use workflow to accelerate |
| 8 | Aesthetic and Minimalist Design | 3/4 | Whitespace/hairline discipline is strong, but the two-gray-only palette plus four visually identical empty media boxes flattens scannability |
| 9 | Help Recognize/Diagnose/Recover from Errors | 4/4 | `ContactForm.tsx`'s error branch shows real copy plus a `mailto:` fallback |
| 10 | Help and Documentation | n/a | No complex functionality on this page that needs explaining |
| **Total** | | **29/32** | **Good (91%)** |

## Design Specificity Verdict

**LLM assessment:** Judged before other opinions formed, per protocol. Verdict: mostly no — an unrelated developer's portfolio could use this unchanged, and that's the real finding. Not because "plain-text minimalist" is the wrong call (it's a documented, deliberate reset, not being re-litigated here) but because within that constraint almost nothing on the page does specificity work except the *words*. "I ship production software" is close to the single most common sentence in this exact genre. The visual system — system font, two grays, hairline dividers, underlined text links, no imagery — is the current default aesthetic for "engineer who read a minimalism blog post," to the point it risks reading as its own category default rather than an escape from one. What actually differentiates Gary is buried in small print: the real stack line (MMKV, Kokoro TTS, WSOLA time-stretching), honestly-scoped one-liners, and a real auto-updating GitHub graph. Those are genuinely specific — but the thing a 2-minute skimmer sees first (layout, type, four identical empty boxes) is not distinguishable from a template.

**Deterministic scan:** `detect.mjs` returned exit code 2, one finding: `broken-image` at `ProjectMedia.astro:16`. **False positive, confirmed by reading source** — line 16 is inside a JSDoc comment (the literal text `` `<img>` `` inside a docstring), not real markup; the file renders a `<video>` or a placeholder `<div role="img">`, never a bare `<img>`. Browser-injected overlay evidence (separate detector pass, in-page) additionally found: `line-length` (~100–123 chars/line, target <80) flagged twice over Cornerman's description and tech-stack line, and `overused-font` (Roboto, 100% of text). The line-length finding is real and actionable — the homepage's work-list entries (`ProjectCard.astro`) render at the page frame width (`--container-page`, 52rem) rather than the narrower prose cap (`--container-column`, 42rem) the design tokens reserve for readable running text, so description lines run measurably longer than comfortable reading measure. This is a genuine finding Assessment A did not independently name. The `overused-font` flag is a **partial false positive**: `--font-sans` is a deliberate native/system font stack (Segoe UI on Windows, SF on macOS, Roboto here because the render environment is Chrome/Windows resolving to Roboto), not an accidental single-font choice — the mechanism the detector assumes (unintentional font monotony) doesn't apply. But the underlying observation it's reacting to — zero typographic differentiation anywhere on the page, no accent face for labels/code/stack lines — is worth weighing against Assessment A's own "aesthetic and minimalist" note about category-sameness risk, even though the detector's stated reason is wrong.

**Visual overlays:** Injection was verified programmatically (DOM query confirmed 4 overlay highlight boxes, 4 labels, and 1 summary banner rendered in the automated browser instance) and captured in a screenshot, but this ran in a sub-agent's own headless browser automation, not a tab presented in the user's own visible browser window — no `chromium-cli`-style "present to the user" path was available in this environment. So: the detector genuinely ran in a real page and its findings are real, but there is no live overlay currently visible in Gary's own browser to look at.

## Overall Impression

The craft is real and the discipline is real — dead-link prevention, an honest error-recovery path on the contact form, real derived stats instead of hand-typed numbers. But the page's single highest-stakes visual moment — four project media slots, the entire "see the actual work" mechanism for a skeptical, time-poor founder — is empty across all four cards. Everything else is being asked to compensate for that gap, and nothing quite does. The biggest opportunity isn't a redesign; it's landing even one real screenshot.

## What's Working

1. **The GitHub contribution graph** (`Footer.astro`, `public/contributions.svg`) — a real, auto-generated, auto-updating asset linking to the actual profile, not a static image or an unverifiable claim. The single most specific, hardest-to-fake piece of evidence on the page.
2. **Structural honesty in `ProjectCard.astro`'s link logic** — a "Live" link only renders when `data.liveUrl` exists; "View brief" only renders when `WORK_BRIEFS_LIVE` is true. "Show never claim" implemented in code, not just stated as a principle.
3. **`ContactForm.tsx`'s state machine** — disabled-while-submitting (no double-submit), inline success with no forced navigation, and a real `mailto:` fallback on error. The most fully-realized piece of craft on the page.

## Priority Issues

**[P0] Every project card's visual evidence slot is empty**
- **Why it matters**: `ProjectMedia.astro` renders the "coming soon" placeholder for all four projects. For an audience explicitly described as judging "in under two minutes," the page's entire proof mechanism is absent for 4/4 projects, at the exact moment a skeptical founder decides whether the work is real. The empty state itself is well-designed (per the project's own "every state designed" rule) — but a well-designed absence is still an absence.
- **Fix**: Land at minimum one static screenshot per hero project. Even one non-interactive image per card would do more persuasive work than the rest of the page combined.
- **Suggested command**: `/impeccable harden` (or straight asset work — this is a content gap, not a design-system gap)

**[P1] The actual ask is buried and unstyled**
- **Why it matters**: "I'm open to startup internships" is the last clause of the About paragraph, in the same default body-text weight as the rest of the sentence, with zero visual emphasis. This is the one sentence a hiring reader most needs to register, and the page gives it no more weight than "Cornerman was the first project I shipped."
- **Fix**: Pull it out as its own short line, or end the sentence there instead of continuing mid-paragraph into it.
- **Suggested command**: `/impeccable clarify`

**[P2] Project description/stack lines exceed comfortable reading measure**
- **Why it matters**: Detector-confirmed (`line-length`, ~100–123 chars/line vs. an ~80-char target) over Cornerman's description and stack line. `ProjectCard.astro` entries render at the page frame width (52rem) rather than the narrower prose-cap token (42rem) the design system already reserves for running text — this is a token-application gap, not a missing token.
- **Fix**: Cap project description/stack-line text at `--container-column` width, or a deliberate intermediate measure, instead of the full page frame.
- **Suggested command**: `/impeccable typeset`

**[P2] Contribution graph is illegible on mobile**
- **Why it matters**: Confirmed in a 390px-width screenshot — month labels ("Sep Oct Nov...") shrink below comfortable reading size. The one asset whose entire value is "verify this is real" becomes unreadable exactly where a large share of first-touch traffic (a link opened from an application) will view it.
- **Fix**: Scale label font-size with a mobile-specific floor, or switch to a sparser label set (first month only, or every-other-month) below a width breakpoint.
- **Suggested command**: `/impeccable adapt`

**[P3] Wordmark doesn't look clickable**
- **Why it matters**: `Nav.astro`'s wordmark link carries no underline, unlike every other link on the site, which is otherwise underlined without exception — a real, checkable break in the page's own established convention (Heuristic 4, Consistency and Standards).
- **Fix**: Add the same underline-on-hover (or persistent underline) treatment used everywhere else, or document the exception deliberately if it's meant to read as a logo rather than a link.
- **Suggested command**: `/impeccable polish`

## Persona Red Flags

**Jordan (first-timer, skeptical founder, cold arrival via an application link)**: Fails at the exact moment named above — four identical "coming soon" boxes give Jordan nothing to look at. Compounding it, nothing on the page is styled as a button; every actionable element (View repository, Live site, nav links, wordmark) is plain underlined text at body-text color, so Jordan has to consciously scan for underlines rather than have the page visually surface "click here."

**Casey (mobile)**: The contribution-graph month/day labels shrink below legible size at 390px width — the one piece of "prove this is real" evidence becomes decorative noise on the device most application-link clicks will actually arrive on.

**Riley (stress-tester, edge cases)**: `/work/[slug]` brief pages exist as real, deployed routes (correctly hidden from discovery via `WORK_BRIEFS_LIVE = false`) but remain reachable by a technical visitor who guesses or constructs the URL directly — exactly the audience this page targets (developers who might `view-source` or poke at routes). An unfinished-looking stub reachable outside the gated nav is a real, if low-probability, stress-test failure.

## Minor Observations

- `text-ink-muted` (#5c5c5c on #fbfbfb) contrast clears WCAG AA with margin, visually confirmed comfortable at both tested widths.
- Focus-visible outline (2px solid ink) is clean and clearly visible — a good keyboard-accessibility baseline.
- The stat block's pluralization logic (`realClientWork === 1 ? '' : 's'`) is a small correctness detail most portfolios skip and then get visibly wrong the moment a count changes.
- Nav stays a clean single row with no wrap at both tested widths.
- Cornerman's stack line joins 5 items in one run (vs. 1–3 for the other three projects) — a mild cognitive-load chunking violation (>4 items/group); consider a wrap or truncation convention.
- The Astro Dev Toolbar (a `position:fixed` widget injected only in `astro dev` mode) appeared in screenshots taken during this review — confirmed via DOM inspection to be dev-server-only tooling, not a site defect; it will not appear in the production build.

## Questions to Consider

1. If "show never claim" is the guiding product principle, why is the page's largest single block of visual real estate — four stacked media boxes — currently showing nothing at all? Isn't an all-placeholder project list the literal inverse of that principle, however well the placeholder state itself is designed?
2. The entire commercial point of this page is one sentence — "I'm open to startup internships" — sitting in unstyled body text at the bottom of a paragraph a skimmer may never finish. If a founder reads only the hero and bounces, would they even learn Gary is available?
3. Given the honesty constraint explicitly forbids implying "trusted by businesses," is a bare contribution heatmap doing quiet trust-signaling work anyway — commit *frequency* standing in for commit *quality* — that a technically literate, skeptical-by-default founder might discount rather than credit?
