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
 * AMENDED 2026-09-10: replaces WORK_ITEMS/MENU_LINKS, which fed the
 * full-screen menu docket (Phase 3c) — retired in favor of plain,
 * always-visible nav links (Gary's call, after an affaanmustafa.com
 * reference). Real, final hrefs — not placeholders. `/services` and
 * `/how-i-build` don't exist yet, so those two 404 until they're built;
 * expected mid-build, same precedent as every other forward-referencing
 * link in this project. `/#work` and Contact work today.
 */
export const NAV_LINKS = [
  { label: 'Work', href: '/#work' },
  { label: 'Services', href: '/services' },
  { label: 'How I build', href: '/how-i-build' },
  { label: 'Contact', href: '/#site-footer' },
] as const;
