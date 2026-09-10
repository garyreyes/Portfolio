# Architecture — Gary Reyes Portfolio

**Status:** Confirmed plan, pre-implementation
**Date:** 2026-08-28
**Amended:** 2026-09-04 — scope revision. Roster cut to 3 hero + 1 card
(`Project` table below); `demoVideo` replaced by `media`; `tier` field
added; `public/videos/` and the `/work` index route removed. See
`CHANGES.md`.
**Product truth:** [`docs/PRD.md`](docs/PRD.md) — this document never
re-decides anything the PRD settled. This file is the **single place the
technical stack is recorded**; no other document owns it.

---

## What this is

A static portfolio site presenting three shipped projects as short
README-shaped briefs (screenshots, key decisions, honest links) plus one
practice project as a card, and a page explaining how Gary builds.
Primary audience is startup hiring people; secondary is small-business
owners who might commission a website.

No backend, no database, no authentication, no user accounts. Every page
is generated at build time.

---

## Tech stack

| Layer               | Choice                                                        | Why                                                                                                                                                                                                                     |
| ------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Language**        | TypeScript                                                    | Locked by PRD §8                                                                                                                                                                                                        |
| **Framework**       | **Astro**                                                     | Purpose-built for content sites. Content Collections provide typed MDX frontmatter with Zod validation out of the box, which is exactly the `Project` entity below. Per-page SEO/OG is free. Ships ~zero JS by default. |
| **UI components**   | `.astro` components; **React islands only where interactive** | Static pages ship no JavaScript at all. React is loaded only for genuinely interactive pieces (hover previews, contact form).                                                                                           |
| **Content**         | MDX via Astro Content Collections                             | One `.mdx` file per project — frontmatter is metadata, body is the brief (hero tier)                                                                                                                                     |
| **Styling**         | **Tailwind v4** with `@theme` design tokens                   | Familiar from `Pahinga-Coffee` and `Sports-Bet-Tracker`; first-class Astro support. The assigned design direction lives in `@theme` as real tokens so components read from the design system, not Tailwind defaults.    |
| **Media**           | Screenshots (PNG/WebP) in `public/screenshots/`               | No recorded video (cut 2026-09-04). One cover image + a small gallery per hero project. An optional short Cornerman audio/video clip may be added later as a normal file, well under the 25 MiB cap.                       |
| **Hosting**         | **Cloudflare Pages**                                          | Free, unlimited bandwidth, not Vercel (PRD §8)                                                                                                                                                                          |
| **Analytics**       | Cloudflare Web Analytics                                      | Follows from the host. Cookieless — no consent banner needed.                                                                                                                                                           |
| **Contact form**    | Web3Forms                                                     | Already proven in `Pahinga-Coffee`. Free tier ~250 submissions/mo.                                                                                                                                                      |
| **Package manager** | npm                                                           | Consistent with existing repos                                                                                                                                                                                          |

### Amended PRD constraint

PRD §8 locks "React + TypeScript." Choosing Astro amends this, deliberately
and with the user's agreement, to:

> **TypeScript everywhere; React where interactive.**

`.astro` components are TypeScript with JSX-like syntax. React is a real
dependency but is imported only into islands. This is a change to the
letter of the PRD constraint, not its intent (stay in a familiar idiom,
stay typed).

### Explicitly rejected

- **Next.js static export** — known, but `output: 'export'` is a constrained
  mode, MDX + typed frontmatter is manual wiring, and it ships more JS.
- **Vite + React Router** — an SPA; MDX loading, routing and per-page OG
  tags all hand-wired, SEO needs a prerender plugin.
- **Recorded demo videos in any form** (self-hosted MP4, Cloudflare
  Stream, YouTube embeds) — cut 2026-09-04; media is screenshots. If a
  short clip is ever added it is a normal committed file, never Git LFS
  (Cloudflare Pages does not fetch LFS objects at build time).

---

## Entities

There is no database. The schema is **MDX frontmatter validated at build
time** by Zod in `src/content.config.ts`. A project entry that violates
it fails the build rather than shipping broken.

**AMENDED 2026-09-09 (Phase 4a):** the file lives at `src/content.config.ts`
(a sibling of `src/content/`), not `src/content/config.ts` as the folder
tree below still shows — the installed Astro version (7.2.9, v6+
conventions) rejects the config at the old in-folder location with a
`LegacyContentConfigError`, even though the loader-based API this project
uses (`defineCollection` + `astro/loaders`' `glob()`) is the current one.
Verified against the real installed version, not assumed from Astro's
general docs. Only the file's location moved; the folder tree's shape for
`src/content/projects/*.mdx` is unchanged.

### `Project` — the only entity

One `.mdx` file per project. Frontmatter is the metadata below; the body
is the brief (hero tier) or is unused (card tier).

```
Project  1───1  brief body   →  the .mdx file's Markdown content (hero only)
Project  1───*  screenshot    →  media.gallery, { src, alt, width, height }
                                 objects (src = root-absolute path under public/)
Project  *───*  TechTag       →  stack[]; promote to a real relation only if
                                 work-section filtering is built (PRD Could-have)
```

| Field      | Type                                    | Constraint                                                                                                 |
| ---------- | --------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `slug`     | string                                  | **Primary key.** Derived from filename, so uniqueness is enforced by the filesystem. Also the URL segment. |
| `name`     | string                                  | required                                                                                                   |
| `tagline`  | string                                  | required                                                                                                   |
| `year`     | number                                  | required                                                                                                   |
| `type`     | `'web' \| 'mobile'`                     | required                                                                                                   |
| `tier`     | `'hero' \| 'card'`                      | required — `hero` gets a `/work/[slug]` brief page; `card` renders only in the work section + `/services`  |
| `status`   | `'live' \| 'android-apk' \| 'archived'` | required — drives honest link labels (PRD §10). Pahinga is `live`.                                          |
| `client`   | `'self' \| 'real-client' \| 'practice'` | required — encodes "built for real use vs. practice" as data, not prose                                    |
| `stack`    | string[]                                | required, non-empty                                                                                       |
| `liveUrl`  | string (url)                            | optional — Cornerman has none                                                                             |
| `repoUrl`  | string (url)                            | optional                                                                                                  |
| `media`    | `{ cover: string, gallery?: { src, alt, width, height }[] }` | **required** — `cover` for the work section and OG; `gallery` (screenshots) shown on a hero brief page. Gallery entries carry their own dimensions + alt so the a11y floor (explicit width/height, real alt) is enforced at build. Amended 2026-09-10 (4c) from `string[]`. |
| `order`    | number                                  | required — controls work-section sequence                                                                 |
| `featured` | boolean                                 | default `false`                                                                                           |

**Indexes: not applicable.** Four entries resolved at build time; no
runtime queries.

**ORM / migrations: not applicable.** Astro Content Collections + Zod is
the schema layer. "Migrating" means editing `config.ts` and the four MDX
files, caught immediately by a failing build.

### The four projects

| slug               | name         | tier | type   | status      | client               |
| ------------------ | ------------ | ---- | ------ | ----------- | -------------------- |
| `cornerman`        | Cornerman    | hero | mobile | android-apk | self                 |
| `ufc-scouting-app` | UFC Scouting | hero | web    | live        | self                 |
| `saffron-web`      | Saffron      | hero | web    | live        | real-client (unpaid) |
| `pahinga-coffee`   | Pahinga Coffee | card | web  | live        | practice             |

`nfc-side-hustle` and `sports-bet-tracker` were cut 2026-09-04 (see
`docs/PRD.md` §5). `nfc-side-hustle` may return later as a second card.

---

## Security baseline

Run inline per `security-baseline`. **Most of the checklist genuinely does
not apply** — there is no auth, no database, no user data at rest, no
payments, no file uploads, no sessions. Saying so plainly is more useful
than inventing findings. What does apply:

**Hard constraints — satisfied trivially**

- No hand-rolled auth, sessions, or crypto — there is no auth at all.
- No hand-built payment or OAuth requests — neither exists.
- The one third-party integration (Web3Forms) is wrapped in exactly one
  module: `src/features/contact/service.ts`. No component calls it directly.

**Actually applicable**

| Item                     | Decision                                                                                                                                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Web3Forms access key** | This is a **public, client-side key by design** — not a secret. It is safe in the bundle. No private key of any kind belongs in frontend code.                                                                                                   |
| **Secrets in git**       | `.env` gitignored; `.env.example` committed with names only. Nothing else is secret in this project.                                                                                                                                             |
| **Form spam**            | Honeypot field + Web3Forms' own filtering. Rate limiting is the provider's responsibility.                                                                                                                                                       |
| **Security headers**     | **CSP** is an Astro `<meta>` tag (`security.csp` in `astro.config.mjs`, per-build script hashes) — widen it there, never in `_headers`. `public/_headers` carries the rest as real HTTP headers: `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, HSTS, `Permissions-Policy`. Cloudflare Pages serves `_headers` automatically. Wired 2026-09-10 (Phase 3d); see `PROJECT_FACTS.md` "Deploy and headers". |
| **External links**       | Every `target="_blank"` carries `rel="noopener noreferrer"`.                                                                                                                                                                                     |
| **Supply chain**         | Dependencies pinned; `npm audit` in CI; Dependabot enabled.                                                                                                                                                                                      |
| **MDX / XSS**            | MDX can render arbitrary HTML, but **all content is author-written and committed to git** — there is no user-submitted content anywhere. No injection vector. Recorded so a future contributor doesn't add user content without revisiting this. |
| **Privacy**              | Cloudflare Web Analytics is cookieless and stores no personal data. No consent banner required.                                                                                                                                                  |

**Fail-closed:** the contact form shows a visible error with a `mailto:`
fallback on failure — never a silent failure or an endless spinner
(PRD §10).

---

## Folder structure

Feature-based, not type-based. Three layers separated **by file, not by
discipline**.

```
portfolio/
├─ public/
│  ├─ screenshots/                # per-project cover + gallery images
│  ├─ _headers                    # HTTP security headers, minus CSP (Cloudflare Pages)
│  ├─ robots.txt                  # Phase 8a
│  └─ favicon.svg
│  # no fonts/ — the platform UI font stack is used, no web fonts (2026-09-10 reset)
├─ src/
│  ├─ content.config.ts           # Zod schema — the Project entity, enforced at build
│  ├─ content/
│  │  └─ projects/
│  │     ├─ cornerman.mdx         # hero
│  │     ├─ ufc-scouting-app.mdx  # hero
│  │     ├─ saffron-web.mdx       # hero
│  │     └─ pahinga-coffee.mdx    # card (frontmatter only, body unused)
│  ├─ features/
│  │  ├─ projects/
│  │  │  ├─ components/           # ProjectCard.astro, ProjectGrid.astro, HoverPreview.tsx
│  │  │  └─ queries.ts            # getCollection wrappers, sorting, hero/card split
│  │  ├─ brief/
│  │  │  ├─ components/           # BriefHeader.astro, ScreenshotGallery.astro, BriefNav.astro
│  │  │  └─ queries.ts            # hero-brief list + bounded prev/next (heroes only)
│  │  └─ contact/
│  │     ├─ components/           # ContactForm.tsx  (React island)
│  │     └─ service.ts            # Web3Forms submit — THE ONLY OUTBOUND CALL IN THE APP
│  ├─ shared/
│  │  ├─ components/              # Nav, Footer, StatBlock.astro, Button, SkipLink
│  │  │                           #   (MDX body copy is styled by `.prose` in global.css, not a component)
│  │  ├─ projects.ts              # Project type + enum/link labels (used by projects + brief)
│  │  └─ utils/
│  ├─ layouts/
│  │  ├─ BaseLayout.astro         # <head>, SEO/OG, skip link
│  │  └─ BriefLayout.astro        # NOT YET BUILT — /work/[slug] uses BaseLayout directly;
│  │                              #   deferred to Phase 8a when it gains per-brief OG tags
│  ├─ lib/
│  │  ├─ seo.ts                   # OG/meta builder
│  │  ├─ site.ts                  # site constants (name, url, socials)
│  │  └─ stats.ts                 # the footer stat-block figures (hand-maintained)
│  ├─ styles/
│  │  └─ global.css               # @theme design tokens — the design system
│  └─ pages/                      # routing only — thin
│     ├─ index.astro              # home; the work section is the full project list
│     ├─ work/
│     │  └─ [slug].astro          # generates 3 hero brief pages
│     ├─ services.astro           # business-owner landing page
│     ├─ how-i-build.astro
│     └─ 404.astro
├─ astro.config.mjs
├─ docs/PRD.md
└─ ARCHITECTURE.md
```

### Layer boundaries — enforced by layout

1. **UI (`features/*/components/`, `shared/components/`, `layouts/`)**
   renders and handles interaction. Never calls an external API. Never
   calls `getCollection()` directly. Contains no business rules.
2. **Services / queries (`features/*/queries.ts`, `features/*/service.ts`)**
   own all data access and all outbound calls. `getCollection()` and the
   Web3Forms `fetch` live here and nowhere else.
3. **Routing (`pages/`)** stays thin — call a query, pass data to a layout,
   return. No logic of substance.

**Where new code goes:** used by one feature → that feature's folder. Used
by 2+ features → `shared/`. Talks to the outside world or configures
infrastructure → `lib/`. New project → a new `.mdx` file, nothing else.

### Structure checks

- Feature-based, not type-based ✅
- `Project` defined in exactly one place (`content.config.ts`) ✅
- Failure handling centralised — form errors in `contact/service.ts`,
  404 in one page, build-time validation in one schema ✅
- Every piece of functionality has one obvious file ✅
- Shared vs. feature-specific separated ✅
- UI / logic / routing in separate files; the single outbound call is
  confined to a service ✅

---

## Motion and accessibility

- Astro **View Transitions** available for page-to-page navigation —
  the smooth-navigation quality of the `hampusdesign.com` reference
  without a heavy animation library.
- All scroll/hover motion must respect `prefers-reduced-motion` (PRD §8).
- Screenshots: `loading="lazy"`, explicit `width`/`height` to reserve
  layout, `alt` text on every image. Never block first paint (PRD §10).
- Every hero brief is independently linkable with correct OG tags (using
  `media.cover` as the OG image).

---

## Route list

Superseded by [`docs/user-flows.md`](docs/user-flows.md), which is
authoritative for screens. Corrections from the original plan:

- **`/about` removed** — folded into a homepage section.
- **`/services` added** — the secondary audience had no screen of their
  own; it must stand alone without homepage context.
- **`/work` index removed** (2026-09-04) — four projects do not need an
  index page; the homepage work section is the full list, and the menu
  lists projects directly. `/work` redirects to `/#work`.
- **Case-study pages down to 3** (2026-09-04) — one per hero project.
  Pahinga (card) has no `/work/[slug]` page; its card links to its live
  site.

**7 routes total:** `/`, `/work/cornerman`, `/work/ufc-scouting-app`,
`/work/saffron-web`, `/services`, `/how-i-build`, `/404`. No `/contact`
(footer only), no `/thanks` (inline success swap).

---

## Open decisions

| #   | Decision                                                                                              | Owner  |
| --- | --------------------------------------------------------------------------------------------------- | ------ |
| 1   | **Domain name and registrar** — **launch blocker, not a build blocker** (2026-09-07); deploy runs on `garyreyes.pages.dev` until it is bought (`site` + `_headers` wired 2026-09-10, Phase 3d). Cloudflare Registrar assumed (~$12/yr) | Gary   |
| 2   | ~~Visual design direction~~ — assigned 2026-08-28 (shipping manifest, seed `d4e5136b`), then **reset 2026-09-10** to a plain-text portfolio. See `PROJECT_FACTS.md` "Visual direction — reset 2026-09-10". | done |
| 3   | Whether work-section filtering ships (PRD Could-have) — if yes, `TechTag` becomes a real relation      | Later  |
| 4   | ~~Font choice~~ — settled 2026-09-07 (Archivo/Space Mono), then **reset 2026-09-10**: platform UI font stack, no web fonts. | done   |
| 5   | Whether `nfc-side-hustle` returns as a second card                                                    | Later  |

---

## Next step

`harness-setup`, `user-flow-mapper`, the design direction, and
`roadmap-planner` have all run. Next: the `feature-planner` build loop,
starting at Phase 3a (design tokens + label-stock primitives).
