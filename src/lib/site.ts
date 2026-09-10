/**
 * Site-wide constants. Anything two or more features need — never data
 * access, never a call (that belongs in a feature's service.ts).
 */

export const SITE = {
  name: 'Gary Reyes',
  description:
    'Third-year Industrial Engineering student at De La Salle University who ships production software.',
} as const;

export const SOCIALS = [
  { label: 'GitHub', href: 'https://github.com/garyreyes' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/gary-ludel-reyes-6428b3405/' },
  { label: 'Email', href: 'mailto:garyludelq@gmail.com' },
] as const;

/**
 * Persistent nav links. Only routes that actually resolve today —
 * `scripts/check-links.mjs` fails the build on any internal link that
 * 404s, and the 2026-09-10 critique flagged shipping dead nav items to a
 * skeptical audience as a P0.
 *
 * Add back as each route ships: `{ label: 'Services', href: '/services' }`
 * (ROADMAP 5b) and `{ label: 'How I build', href: '/how-i-build' }`
 * (ROADMAP 5c). Both are one-line re-adds here once the page exists.
 */
export const NAV_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Contact', href: '/#site-footer' },
] as const;

/**
 * Whether the `/work/[slug]` brief pages exist (ROADMAP 4c). While false,
 * ProjectCard renders no "View brief" link — the same discipline it
 * already applies to a missing `liveUrl`. Flip to `true` in the same
 * change that adds `src/pages/work/[slug].astro`.
 */
export const WORK_BRIEFS_LIVE = false;
