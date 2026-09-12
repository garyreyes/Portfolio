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
  { label: 'Projects', href: '/#projects' },
  { label: 'Contact', href: '/#site-footer' },
] as const;

/**
 * Whether the homepage links to the `/work/[slug]` brief pages. The pages
 * themselves exist as of ROADMAP 4c — but their bodies still say "Brief
 * pending — Track A3" and they have no screenshots, so a "View brief" link
 * would lead a skeptical visitor to a stub. Stays `false` until Phase 6
 * (6a/6b) writes the real briefs; flip it in that change. While false,
 * ProjectCard renders no "View brief" link — the same discipline it already
 * applies to a missing `liveUrl`.
 */
export const WORK_BRIEFS_LIVE = false;
