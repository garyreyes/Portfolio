# Changes

A dated log of what actually shipped. Appended by `feature-planner` as
features complete — newest first.

Format: what changed, and why it mattered. Not a git log; git already
does that.

---

## Unreleased

### 2026-09-04 — Scope revision after re-verifying the source repos

All six candidate projects were checked against their live GitHub state.
Two had moved significantly since planning; two claims did not survive.

- **Roster cut from 6 to 3 hero briefs + 1 card.** Shown: Cornerman, UFC
  Scouting, Saffron (briefs) and Pahinga Coffee (card).
  - **Sports Bet Tracker — cut.** Overt gambling framing (now ships
    bet-sizing advice), its own `ARCHITECTURE.md` still reads as a
    from-scratch rebuild plan while the app is live, and it is heavily
    redundant with UFC Scouting (Supabase + RLS + stats + LLM coach +
    friend groups).
  - **NFC Review Plates — cut from v1.** Its "real business, real
    revenue" description did not hold: the repo frames it as a
    door-to-door *sales-practice* project, the paid service is
    "planned," there is one pilot business (Saffron again), and ~3
    plates have been sold. Real full-stack build; possible future card.
- **Long-form case studies → short README-shaped project briefs**
  (~150–250 words, screenshots, 3–5 decision bullets, honest links).
  Full case studies were over-built for an early-career SWE portfolio.
- **Recorded demo videos → screenshots.** The video-production
  dependency was the single largest schedule risk and will not reliably
  get done. `Project.demoVideo` becomes `Project.media` (a cover image +
  a screenshot gallery).
- **Footer GitHub contribution graph → static spec-sheet stat block.**
  Gary's real figures (418 contributions across 23 of 370 days) render
  ~94% empty and read as "inactive." The stat block was the alternative
  already named in `PROJECT_FACTS.md`.
- **Phase 7 (live proof: contribution graph + Monte Carlo simulator +
  Vitest) removed from v1.** No correctness-critical logic remains in
  v1 scope. A client-side probabilistic-reasoning widget from UFC
  Scouting's scoring lib is a possible post-launch addition.
- **`/work` index route dropped** — four projects do not need one; the
  homepage work section is the full list. ~7 routes, down from 11.
- **Résumé download deferred** — not a launch blocker.

Full context and reasoning: `PLAN-REVIEW-BRIEF.md` (v3).

### 2026-08-28 — CI green, branch protection on

- Fixed `npm ci` failing on Linux: the Windows-generated lockfile had no
  top-level entries for `@emnapi/core` / `@emnapi/runtime` (required by
  `@napi-rs/wasm-runtime` via Tailwind's native bindings). Regenerating
  the lockfile from scratch produced a complete cross-platform tree.
  **Caught by CI on its first run** — before any feature code existed.
- Branch protection on `main`: CI must pass and be up to date before
  merge, no force pushes, no deletions, linear history. Required
  approvals set to 0 (diff review happens in the editor); admin
  enforcement off so an emergency fix is still possible.

### 2026-08-28 — Project harness

- Scaffolded Astro 7 + TypeScript (strict) with Tailwind v4, MDX, and
  React integrations.
- Wired gates: ESLint (with `jsx-a11y` rules for `.astro`), Prettier,
  `astro check`, Husky pre-commit (`lint-staged`) and pre-push
  (full check + design-slop detector), and GitHub Actions CI on every PR.
- Added `scripts/design-check.mjs` — runs Impeccable's detector over
  built output, resolving the plugin version at runtime.
- Wrote `CLAUDE.md`, `CHANGES.md`, `PROJECT_FACTS.md`.

### 2026-08-28 — Planning

- `docs/PRD.md` — product truth: audiences, positioning, scope, metrics.
- `ARCHITECTURE.md` — stack, `Project` entity schema, layer boundaries.
