---
target: Phase 3 shell (Nav, MenuPanel, Footer, BaseLayout, token-proof homepage)
total_score: 26
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 2
timestamp: 2026-09-07T07-38-23Z
slug: src-pages-index-astro
---
Method: dual-agent (A: aa34a337efdddd67c · B: ab0da696465d0505f)

## Design Health Score

| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3/4 | aria-expanded, hover feedback, stamp states present |
| 2 | Match System / Real World | 4/4 | Manifest metaphor maps to real Project data (status/client/stack) |
| 3 | User Control and Freedom | 4/4 | Esc, close button, wordmark inert-but-reachable, focus returned |
| 4 | Consistency and Standards | 3/4 | Tokens applied consistently; docked for nav-bar genericness |
| 5 | Error Prevention | 3/4 | Focus trap solid; little else to evaluate at this stage |
| 6 | Recognition Rather Than Recall | 4/4 | Menu lists every project directly, by design |
| 7 | Flexibility and Efficiency | n/a | No power-user path in a portfolio shell |
| 8 | Aesthetic and Minimalist Design | 3/4 | Strong primitives, undercut by footer/homepage airiness |
| 9 | Error Recovery | 2/4 | No 404 yet; /services, /how-i-build, /work/* dead-end (expected mid-build) |
| 10 | Help and Documentation | n/a | Genuinely inapplicable to this surface |

**Total: 26/32 applicable** — Good (81%)

## Design Specificity Verdict

**Grounded, with one real gap.** The token vocabulary (stock-100/200/300/400, the two-token safety accent, hazard-rule, placard, stamp, lot, mark, the axis line) is bespoke and structurally maps onto the Project entity — hard for an unrelated product to reuse unchanged.

The gap: the persistent nav bar alone is nearly generic — wordmark + text button is the same shape as any other portfolio; specificity is currently front-loaded into the menu and homepage placards, surfaces a visitor only reaches after a click or a scroll.

**Deterministic scan (Assessment B):** `npm run build` + Impeccable's detector → **0 findings, exit 0**. Clean. But an independent token-discipline grep against the compiled CSS found a real, missed defect the detector's fixed rule set doesn't cover: `src/pages/index.astro` (lines 31, 50) still uses raw Tailwind `mt-2` instead of the project's own `gutter` token — the same defect class caught and fixed in Nav/Footer (3b) and MenuPanel (3c), missed here because those reviews scoped to each phase's new files, not the pre-existing homepage file.

## Overall Impression

The metaphor is real, not a skin — it survives contact with the actual data model. But the shell currently proves the tokens work more than it proves the direction is memorable: the one surface named "the signature moment" (the menu) is, on its own content, a well-organized but flat link list once the typography is set aside.

## What's Working

1. **Accessibility engineering is unusually rigorous for this stage** — measured contrast ratios in comments, a real manual focus trap, `inert` applied precisely (including the wordmark, not just main/footer), `preventScroll` specifically to avoid a hash-scroll race.
2. **The metaphor is structural** — status→stamp, client→consignee, stack→contents is a real entity mapping, which is why Phase 4 will be cheap to build correctly.
3. **The no-JS fallback is provably real** — verified by stripping every script from built output, not asserted.

## Priority Issues

**[P1] Density-as-tone still fails where it's needed most: the footer.** `Footer.astro` wraps generous `py-band` padding around three links and a placeholder stamp — the airiest ratio in the shell, on exactly the surface PROJECT_FACTS.md flags as needing density to make a 4-project roster read as substantial. *Fix:* tighten footer rhythm and add one more real manifest motif (a registration stamp mirroring the nav's) rather than leaving it this sparse. *Command:* /impeccable layout

**[P1] The menu's content doesn't yet deliver the signature moment.** Strip the typography and it's a flat 11-item noun list — nothing surprises, nothing has voice, and `global.css`'s own `lot` utility rule ("real codes only... if it is prose, it does not go here") is in tension with the 01–04 values being sequential positions rather than a real code. *Fix:* differentiate the four project links from the three utility links visually (they don't currently compete for attention correctly), and settle whether sequential lot numbers are authentic-manifest-numbering or a rule violation. *Command:* /impeccable delight, /impeccable layout

**[P2] No visual-weight distinction between hero-project links and utility links in the menu.** All 7 render at identical size/weight — for a founder scanning in under two minutes, the four things that prove competence should visually outrank Services/How I build/Contact. *Fix:* differentiate via size, weight, or an inline status stamp exclusive to the project tier. *Command:* /impeccable layout

**[P2] The persistent nav — the one surface every visitor sees first — is the weakest specificity surface.** Wordmark + text button reads as generic; the manifest identity only shows up once the visitor opens the menu. *Fix:* pull one more motif (a lot/date stamp, a hazard-rule under the bar) into the always-visible chrome. *Command:* /impeccable layout

**[P3] "Pending — Phase 5d" is internal roadmap language leaking into user-facing footer copy.** Reads as unfinished to exactly the audience (a business-owner visitor, per the Casey persona) the footer's future contact form exists to reassure. *Fix:* plain visitor-facing copy. *Command:* /impeccable clarify

## Persona Red Flags

**Jordan (time-poor, skeptical founder — the actual primary user):** opening the menu drops 11 equally-weighted links at once with no hierarchy cue beyond order; before ever clicking Menu, the nav gives Jordan nothing distinctive to judge the site by.

**Casey (non-technical small-business owner, often sees only one page):** logistics vocabulary ("Consignee," "Contents," "Lot") isn't guaranteed to parse on a first unguided read; "Pending — Phase 5d" in the footer reads as an internal note left in production.

**Riley (detail-oriented technical evaluator):** catches the lot-code inconsistency (real code on the homepage header, plain sequential numbers in the menu) immediately, in a system whose own stylesheet comment says lot codes are for real data only.

## Minor Observations

- `prefers-reduced-motion` correctly wired globally, not per-component.
- Space Mono correctly restricted to real codes only, never prose.
- The registration axis is confirmed consistently applied across Nav/main/Footer — raise 2 holds.
- Reusing `stamp[data-state=spent]` for the footer placeholder is a clever honest reuse of an existing primitive; only the copy inside it needs to change.

## Questions to Consider

1. If the menu's distinctiveness is carried entirely by typography rather than interaction, copy voice, or content, does it still feel distinctive on a second visit?
2. Is sequential 01–04 numbering authentic manifest-line-item numbering, or does it violate the `lot` utility's own "real codes only" rule?
3. Density-as-tone was donated specifically to make a lean roster read as substantial — if it only shows up in the menu (a surface many visitors may never open), has the raise actually landed in the shell?
