# Changes

A dated log of what actually shipped. Appended by `feature-planner` as
features complete — newest first.

Format: what changed, and why it mattered. Not a git log; git already
does that.

---

## Unreleased

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
