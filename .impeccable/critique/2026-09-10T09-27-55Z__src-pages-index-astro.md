---
target: the homepage
total_score: 24
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
timestamp: 2026-09-10T09-27-55Z
slug: src-pages-index-astro
---
# Critique — homepage (post-ledger)

**Method:** dual-agent (A: design review · B: detector + browser evidence), both isolated, both drove headless Chrome against the live build.

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|-----------|-------|-----------|
| 1 | Visibility of System Status | 3 | Focus rings solid, honest status words, sticky nav orients. No `aria-current` (minor at 2 links). |
| 2 | Match System / Real World | 3 | Taglines now plain language. Stack strings still raw jargon in flat grey. |
| 3 | User Control & Freedom | 3 | Dead routes gone, /404 ships, external links safe. Conversion exit is a mailto in a socials list. |
| 4 | Consistency & Standards | 3 | Token discipline genuine. Docked for the generic nav-bar + left-rail portfolio silhouette and wordmark/h1 duplication. |
| 5 | Error Prevention | 3 | check-links gate + WORK_BRIEFS_LIVE + honest-link logic kill the P0 class from last run. |
| 6 | Recognition Rather Than Recall | 3 | Single screen, nothing to remember. Stack acronyms lean on reader knowledge. |
| 7 | Flexibility & Efficiency | n/a | Experience mode — one linear read. |
| 8 | Aesthetic & Minimalist | 3 | Uncluttered and fast. Minimal tips under-informative: no screenshots, flagship == practice build, authored move faint. |
| 9 | Error Recovery | 3 | /404 exists, no dead links. Contact still "to follow" + buried mailto. |
| 10 | Help & Documentation | n/a | Portfolio homepage needs none. |
| **Total** | | **24/32** | **Good (75%) — low end, one point above Acceptable** |

## Design Specificity Verdict

The 21/32 finding ("landed in the minimal dev portfolio cluster with no authored design move") is only partially addressed. The +3 came almost entirely from fixing the dead-link P0 and adding taglines — not from the ledger.

- **A's verdict:** "still in the cluster, now with a neat table in it." A two-column index with a fixed ~10rem left meta rail is itself a widely-circulated portfolio pattern. Nothing in the visual system signals the "three genuinely different competencies" that PRODUCT.md says is the mechanism — that is all in the prose.
- **The move undercuts itself:** the aligned status column reads `Android APK / Live / Live / Live` — near-constant, so vertical alignment buys nothing. The rail is set in the same 13px grey as body captions, floating above ~140px of empty row.
- **B (detector):** 0 findings, every scan clean, confirmed with a control file that the detector fires. Mechanically spotless: all contrast passes (lowest 6.46:1), focus rings on all 11 interactive elements, tap targets clear WCAG 2.5.8 (last run's sub-24px finding fixed), no overflow 320–1280, clean heading outline, zero console/CSP errors.

## What's Working

1. Honest status labelling, rendered plainly — Cornerman shows "Android APK" next to "View repository", never a fake "Live". Saffron keeps "Real client (unpaid)". A skeptic notices restraint that costs the author something.
2. The first viewport respects the time-poor founder — name, one real sentence, straight into the work. No gradient, no font blocking paint.
3. Taglines now carry concrete plain-language specifics — "show, don't tell" finally partly on the page.

## Priority Issues

- **[P1] The ledger rail does not earn its column.** Invisible in a 2-second glance; its aligned column is `Live` three of four. Fix: give the rail real varying content, OR collapse it to one line under the name. `/impeccable layout`.
- **[P1] No primary action on the page.** The contract names "open the first project" — there is no brief to open. Four equal 13px repo links dump the reader into uncurated GitHub (two repos have wrong/empty READMEs). Content-blocked on A2 + A3.
- **[P2] Flagship and practice build are visually identical.** Cornerman gets the same frame as "a deliberate practice build". `/impeccable layout`.
- **[P2] Stack strings are raw jargon in flat grey.** `/impeccable clarify`.
- **[P2] Contact is deferred at the conversion moment.** "Contact form to follow" reads unfinished; only path is recognising Email as a mailto. `/impeccable clarify`.
- **[P3] Mobile sticky header is ~166px** — 20% of a 375-wide viewport for a wordmark + two links that stack. `/impeccable adapt`.

## Persona Red Flags

- **Skeptical founder (decides the outcome):** learns what each project is, then hits a wall of zero evidence — no screenshots, every row ends at "View repository", rail reads `Live/Live/Live`. "Seems real, but I'd have to dig" — the exact work the site exists to eliminate.
- **Screen-reader user:** the rail is an unlabeled `<div>` of `<span>`s — mobile reading order announces metadata before the project name. The stack `<p>`'s `title` attr duplicates its visible text.
- **Distracted mobile user:** 166px header eats the top fifth of every scroll; full-width grey text wall, no images; line-clamp clips the most distinctive stack token on narrow devices.

## The through-line

The design's thesis is "get out of the way so the work carries the weight" — and the work isn't on the page yet. No screenshots, no briefs, dead-end repo links. Every "make it more convincing" path routes through A2 (screenshots) + A3 (brief copy). Those are the mechanism, not polish, and outrank another visual iteration.

## Resolution (same session)

Gary's call after seeing the pros/cons: **retire the two-column ledger** (Option 1). The rail's headline feature carried no information and would not with real data. Ran `/impeccable layout` + `clarify`: single-column entries (name → facts line → one-liner → stack → link), nav collapsed to one row at every width (fixes the P3 166px header and the below-`sm` link stacking), footer contact made explicit ("Get in touch — <email>"), stack line framed with "Built with". P2 flagship-emphasis deferred — contradicts Gary's documented "all four peer rows" call. The remaining P1/P2s are content-blocked on A2/A3.
