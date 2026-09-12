# CLAUDE.md — Portfolio

Rules that bind every session and every agent working in this repo,
regardless of which tool produced the change.

## Orient first

Read these before making changes. Do not re-decide what they already settle.

| File | Owns |
|---|---|
| `docs/PRD.md` | **Product truth.** Users, use cases, out-of-scope, success metrics. Wins over every other doc. |
| `ARCHITECTURE.md` | **The stack, the entity schema, layer boundaries.** The single place the stack is recorded. |
| `PROJECT_FACTS.md` | Durable project-specific decisions that would otherwise be re-explained every session. |
| `CHANGES.md` | Dated log of what actually shipped. |

## Layer boundaries — enforced, not remembered

From `ARCHITECTURE.md`. ESLint enforces the first two mechanically:

1. **UI** (`src/features/*/components/`, `src/shared/components/`,
   `src/layouts/`) renders and handles interaction only. **No `fetch`.
   No `astro:content` imports.** No business rules.
2. **Services / queries** (`src/features/*/queries.ts`,
   `src/features/*/service.ts`) own all data access and every outbound
   call. `getCollection()` and the Web3Forms `fetch` live here and
   nowhere else.
3. **Routing** (`src/pages/`) stays thin — call a query, pass data to a
   layout, return. No logic of substance.

**Where new code goes:** one feature → that feature's folder. Two or more
features → `src/shared/`. Talks to the outside world or configures
infrastructure → `src/lib/`. A new project → a new `.mdx` file in
`src/content/projects/`, nothing else.

## Security hard-halts — stop and ask, never proceed carefully

This project has no auth and no payments today. These bind anyway, so
that adding them later cannot go wrong quietly:

1. **Never hand-roll authentication, sessions, or cryptography** —
   including password hashing, JWT signing/verification, token
   generation, and password-reset flows. Use an established provider.
2. **Never hand-build raw payment or OAuth requests.** Use the official
   SDK — never a manual `fetch` with hand-assembled headers, signatures,
   or state/nonce handling.
3. **Auth and payment SDKs get exactly one wrapper module** in `src/lib/`.
   Feature code imports the wrapper, never the SDK directly.

If a task would require any of these, stop and say so rather than writing
the code.

## Project-specific safety rules

- **The Web3Forms access key is public by design** and belongs in client
  code. No other key ever does. If a future integration needs a secret
  **that would ship to the browser or the built site**, that is a hard
  stop — this is a static site with no server to hide it behind.
  **Carve-out, confirmed 2026-09-12:** a secret used ONLY inside a GitHub
  Actions workflow, to pre-generate a static asset before deploy, is not
  this — it never reaches client code or the built output, only the
  generated artifact does. `CONTRIBUTIONS_TOKEN` (a PAT belonging to
  Gary, stored as a repo secret, used by
  `.github/workflows/update-contributions.yml` to fetch contribution data
  and commit `public/contributions.svg`) is the first instance. If the
  next one is genuinely runtime/client-facing, the hard stop still
  applies in full — this carve-out is narrow, not a general exception.
- **All content is author-written.** There is no user-submitted content
  anywhere, which is the only reason MDX rendering arbitrary HTML is
  safe. **If user content is ever introduced, that assumption breaks and
  the XSS surface must be reconsidered.**
- **Media is screenshots, not video** (scope revision 2026-09-04). Commit
  them as normal files under `public/screenshots/`. If a short Cornerman
  clip is ever added, commit it as a normal file too — **never Git LFS**
  (Cloudflare Pages does not fetch LFS objects at build time; it would
  silently 404 in production).
- **Changing `src/content.config.ts` changes the schema for all four
  project `.mdx` files at once.** Treat it as a migration: update every
  file in the same change, and confirm the build passes before pushing.
- Every `target="_blank"` carries `rel="noopener noreferrer"`.

## Requires explicit human confirmation

Never do these because they seem like the obvious next step:

- **Any `git push`, PR merge, or branch deletion.** The user reviews the
  diff in their editor and says "yes, merge it" in chat, every time.
- **Anything touching the domain or DNS.**
- **Any change to Cloudflare Pages project settings or build config.**
- **Force-push to `main`, or any history rewrite.**
- **Committing any large binary** (a video clip, a raw APK) — these bloat
  history permanently and cannot be cleanly reverted. Confirm first, and
  keep it well under 25 MiB.

## Gates

Run automatically; do not bypass them.

| When | What runs |
|---|---|
| **pre-commit** | `lint-staged` — ESLint `--fix` + Prettier on staged files |
| **pre-push** | `npm run check` (typecheck → lint → format) → `npm run design:check` → `npm run check:links` |
| **CI, every PR** | `npm ci` → typecheck → lint → format:check → build → `check:links` |

`npm run check` is the fast local gate (no build). `check:links` and
`design:check` both need a built `dist/`, so they run after a build in
pre-push and CI, not inside `check`. Run all three before claiming
anything is done.

### Internal-link gate

`npm run check:links` (`scripts/check-links.mjs`) scans every built page in
`dist/` and fails on any in-site link to a path that was not built, or an
`#anchor` with no matching `id` on the target page. A clean build and a
green `design:check` both miss this — neither follows a link. Never ship a
link to a route that doesn't exist yet; gate it (see `NAV_LINKS` /
`WORK_BRIEFS_LIVE` in `src/lib/site.ts`).

### Design gate

`npm run design:check` builds, then runs Impeccable's deterministic
detector (~77 rules) over `dist/` — catching the mechanical tells of
generic AI-generated design that `docs/PRD.md` §8 explicitly warns
about.

It resolves the Impeccable version at runtime, so upgrades don't break
it. **It is a local-only gate** — CI has no plugin cache, and vendoring
~1.2 MB of third-party JS into this public repo was deliberately
rejected. If it prints `SKIPPED`, treat that as *unverified*, not as a
pass.

**Never bypass with `--no-verify`.** If a gate is wrong, fix the gate.

## Astro specifics

Dev server runs in background mode:

```
astro dev --background
```

Manage it with `astro dev stop`, `astro dev status`, `astro dev logs`.

Consult before working on related tasks:

- [Routing / dynamic routes](https://docs.astro.build/en/guides/routing/)
- [Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Framework (React) components](https://docs.astro.build/en/guides/framework-components/)
- [Content collections](https://docs.astro.build/en/guides/content-collections/)
- [Styling / Tailwind](https://docs.astro.build/en/guides/styling/)

## Design and accessibility floor

Binding regardless of the visual direction assigned by `/impeccable`:

- All scroll and hover motion respects `prefers-reduced-motion`.
- Screenshots are `loading="lazy"` with explicit `width`/`height` to
  reserve layout, and `alt` text on every image. Media never blocks first
  paint.
- One obvious primary action per screen.
- Every state designed — empty, loading, error — not just the happy path.
- No horizontal scroll on the body at any viewport width.
- Design tokens live in `src/styles/global.css` under Tailwind v4's
  `@theme`. **Components read tokens, never raw hex values or arbitrary
  one-off spacing.**
