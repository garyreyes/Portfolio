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
 * The menu's contents, per docs/user-flows.md "Menu contents — counted
 * explicitly". Real, final hrefs — not placeholders. `/work/*`, `/services`
 * and `/how-i-build` don't exist until Phase 4/5, so those links 404 until
 * then. That is expected mid-build, the same way Phase 3b shipped a Menu
 * button that opened nothing until this phase. `/#work` and Pahinga's link
 * carry the same caveat; Contact and the socials work today.
 */
export const WORK_ITEMS = [
  { lot: '01', label: 'Cornerman', href: '/work/cornerman' },
  { lot: '02', label: 'UFC Scouting', href: '/work/ufc-scouting-app' },
  { lot: '03', label: 'Saffron', href: '/work/saffron-web' },
  { lot: '04', label: 'Pahinga Coffee', href: 'https://pahinga-coffee.vercel.app', external: true },
] as const;

export const MENU_LINKS = [
  { label: 'Services', href: '/services' },
  { label: 'How I build', href: '/how-i-build' },
  { label: 'Contact', href: '/#site-footer' },
] as const;
