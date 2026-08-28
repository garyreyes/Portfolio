# Architecture — Gary Reyes Portfolio

**Status:** Confirmed plan, pre-implementation
**Date:** 2026-08-28
**Product truth:** [`docs/PRD.md`](docs/PRD.md) — this document never
re-decides anything the PRD settled. This file is the **single place the
technical stack is recorded**; no other document owns it.

---

## What this is

A static portfolio site presenting six shipped projects as full case
studies, each with a recorded demo video, plus a page explaining how Gary
builds. Primary audience is startup hiring people; secondary is
small-business owners who might commission a website.

No backend, no database, no authentication, no user accounts. Every page
is generated at build time.

---

## Tech stack

| Layer               | Choice                                                        | Why                                                                                                                                                                                                                     |
| ------------------- | ------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Language**        | TypeScript                                                    | Locked by PRD §8                                                                                                                                                                                                        |
| **Framework**       | **Astro**                                                     | Purpose-built for content sites. Content Collections provide typed MDX frontmatter with Zod validation out of the box, which is exactly the `Project` entity below. Per-page SEO/OG is free. Ships ~zero JS by default. |
| **UI components**   | `.astro` components; **React islands only where interactive** | Static pages ship no JavaScript at all. React is loaded only for genuinely interactive pieces (hover previews, contact form).                                                                                           |
| **Content**         | MDX via Astro Content Collections                             | One `.mdx` file per project — frontmatter is metadata, body is the case study                                                                                                                                           |
| **Styling**         | **Tailwind v4** with `@theme` design tokens                   | Familiar from `Pahinga-Coffee` and `Sports-Bet-Tracker`; first-class Astro support. The assigned design direction lives in `@theme` as real tokens so components read from the design system, not Tailwind defaults.    |
| **Media**           | Self-hosted MP4 in `public/videos/`                           | Six 30–60s H.264 720p recordings, ~1–3 MB each. Well under Cloudflare Pages' 25 MiB per-file cap.                                                                                                                       |
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
- **Cloudflare Stream** (~$5/mo) and **YouTube embeds** (third-party chrome,
  tracking, off-brand) for video.
- **Git LFS** for videos — Cloudflare Pages does not fetch LFS objects at
  build time. Videos are committed as normal files.

---

## Entities

There is no database. The schema is **MDX frontmatter validated at build
time** by Zod in `src/content/config.ts`. A case study that violates it
fails the build rather than shipping broken.

### `Project` — the only entity

`Project` and `CaseStudy` are strictly 1:1 (PRD §9 gives all six a full case
study), so they are **one entity in one file**. Splitting them would create
two artifacts to keep in sync for no benefit.

```
Project  1───1  CaseStudy   →  merged: one .mdx file per project
Project  1───1  DemoVideo   →  embedded frontmatter fields
Project  *───*  TechTag     →  string array; promote to a real relation
                               only if index filtering is built (PRD Could-have)
```

| Field       | Type                                    | Constraint                                                                                                 |
| ----------- | --------------------------------------- | ---------------------------------------------------------------------------------------------------------- |
| `slug`      | string                                  | **Primary key.** Derived from filename, so uniqueness is enforced by the filesystem. Also the URL segment. |
| `name`      | string                                  | required                                                                                                   |
| `tagline`   | string                                  | required                                                                                                   |
| `year`      | number                                  | required                                                                                                   |
| `type`      | `'web' \| 'mobile'`                     | required                                                                                                   |
| `status`    | `'live' \| 'android-apk' \| 'archived'` | required — drives honest link labels (PRD §10)                                                             |
| `client`    | `'self' \| 'real-client' \| 'practice'` | required — encodes the "5 of 6 are real" argument as data, not prose                                       |
| `stack`     | string[]                                | required, non-empty                                                                                        |
| `liveUrl`   | string (url)                            | optional — Cornerman has none                                                                              |
| `repoUrl`   | string (url)                            | optional                                                                                                   |
| `demoVideo` | `{ src, poster, duration }`             | **required** — a case study without a demo silently defeats "show, don't tell"                             |
| `order`     | number                                  | required — controls index sequence                                                                         |
| `featured`  | boolean                                 | default `false`                                                                                            |

**Indexes: not applicable.** Six entries resolved at build time; there are
no runtime queries. Recorded explicitly so this doesn't read as an
oversight.

**ORM / migrations: not applicable.** Astro Content Collections + Zod is
the schema layer. "Migrating" means editing `config.ts` and the six MDX
files, caught immediately by a failing build.

### The six projects

| slug                 | name               | type   | status      | client               |
| -------------------- | ------------------ | ------ | ----------- | -------------------- |
| `cornerman`          | Cornerman          | mobile | android-apk | self                 |
| `nfc-side-hustle`    | NFC Review Plates  | web    | live        | self                 |
| `saffron-web`        | Saffron            | web    | live        | real-client (unpaid) |
| `ufc-scouting-app`   | UFC Scouting       | web    | live        | self                 |
| `sports-bet-tracker` | Sports Bet Tracker | web    | live        | self                 |
| `pahinga-coffee`     | Pahinga Coffee     | web    | live        | practice             |

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
| **Security headers**     | `public/_headers` sets CSP, `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`. Cloudflare Pages serves these automatically.                                                         |
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
│  ├─ videos/                     # 6 MP4 demos + poster images
│  ├─ fonts/
│  ├─ _headers                    # CSP + security headers (Cloudflare Pages)
│  ├─ robots.txt
│  └─ favicon.svg
├─ src/
│  ├─ content/
│  │  ├─ config.ts                # Zod schema — the Project entity, enforced at build
│  │  └─ projects/
│  │     ├─ cornerman.mdx
│  │     ├─ nfc-side-hustle.mdx
│  │     ├─ saffron-web.mdx
│  │     ├─ ufc-scouting-app.mdx
│  │     ├─ sports-bet-tracker.mdx
│  │     └─ pahinga-coffee.mdx
│  ├─ features/
│  │  ├─ projects/
│  │  │  ├─ components/           # ProjectCard.astro, ProjectGrid.astro, HoverPreview.tsx
│  │  │  └─ queries.ts            # getCollection wrappers, sorting, filtering
│  │  ├─ case-study/
│  │  │  ├─ components/           # DemoVideo.astro, StatusBadge.astro, CaseStudyHeader.astro
│  │  │  └─ queries.ts            # single-project lookup, prev/next
│  │  └─ contact/
│  │     ├─ components/           # ContactForm.tsx  (React island)
│  │     └─ service.ts            # Web3Forms submit — THE ONLY OUTBOUND CALL IN THE APP
│  ├─ shared/
│  │  ├─ components/              # Nav, Footer, Prose, Button, SkipLink
│  │  └─ utils/
│  ├─ layouts/
│  │  ├─ BaseLayout.astro         # <head>, SEO/OG, skip link
│  │  └─ CaseStudyLayout.astro
│  ├─ lib/
│  │  ├─ seo.ts                   # OG/meta builder
│  │  └─ site.ts                  # site constants (name, url, socials)
│  ├─ styles/
│  │  └─ global.css               # @theme design tokens — the design system
│  └─ pages/                      # routing only — thin
│     ├─ index.astro
│     ├─ work/
│     │  ├─ index.astro
│     │  └─ [slug].astro          # generates 6 case study pages
│     ├─ how-i-build.astro
│     ├─ about.astro
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
- `Project` defined in exactly one place (`content/config.ts`) ✅
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
- Videos: `preload="none"`, poster image always present, lazy-loaded.
  Never block first paint (PRD §10).
- Every case study is independently linkable with correct OG tags.

---

## Open decisions

| #   | Decision                                                                                                                                                 | Owner        |
| --- | -------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------ |
| 1   | **Domain name and registrar** — v1 blocker; Cloudflare Registrar assumed (~$10–15/yr)                                                                    | Gary         |
| 2   | **Visual design direction** — must be assigned by `/impeccable new-work`'s `concept-seed.mjs`, not defaulted. See PRD §8's aesthetic-clustering warning. | `impeccable` |
| 3   | Whether index filtering ships (PRD Could-have) — if yes, `TechTag` becomes a real relation                                                               | Later        |
| 4   | Font choice — follows from the assigned design direction                                                                                                 | `impeccable` |

---

## Next step

`harness-setup` — CI gates, `CLAUDE.md`, `CHANGES.md`, `PROJECT_FACTS.md`.
