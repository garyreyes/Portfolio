// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import mdx from '@astrojs/mdx';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // Interim deploy URL — the Cloudflare Pages project is `garyreyes`, so the
  // free subdomain is garyreyes.pages.dev. This is the ONLY place the site
  // URL appears in code (PROJECT_FACTS.md). Nothing consumes it yet; it will
  // feed canonical tags, OG image URLs and the sitemap once those ship
  // (Phase 8a). When the custom domain attaches (ROADMAP A5) this becomes the
  // real domain and nothing else changes.
  site: 'https://garyreyes.pages.dev',

  // The /work/* namespace exists as of ROADMAP 4c (the hero brief pages).
  // There is no /work index route — four projects don't need one — so a bare
  // /work redirects to the homepage project list (#projects, renamed from
  // #work in 5a). Astro emits a dist/work/index.html with a
  // <meta http-equiv="refresh"> and a canonical link.
  redirects: {
    '/work': '/#projects',
  },

  // Content-Security-Policy. Astro computes a per-build SHA-256 hash for its
  // own inline script (the wordmark scroll-to-top in Nav.astro) and for the
  // stylesheet, and emits a <meta http-equiv="content-security-policy">.
  // The directives below are everything ELSE — script-src/style-src are added
  // automatically with 'self' + the hashes.
  //
  // Deliberately strict: only what the site uses today. Phase 5d (Web3Forms
  // contact form) adds `connect-src https://api.web3forms.com`; Phase 8b
  // (Cloudflare Web Analytics) adds its script/connect origins. Each is a
  // one-line edit here, in that phase's plan.
  //
  // frame-ancestors is intentionally absent — it is ignored inside a <meta>
  // CSP; `X-Frame-Options: DENY` in public/_headers carries clickjacking
  // protection instead.
  security: {
    csp: {
      directives: [
        "default-src 'self'",
        "img-src 'self' data:",
        "font-src 'self'",
        "connect-src 'self'",
        "base-uri 'self'",
        "form-action 'self'",
        "object-src 'none'",
        'upgrade-insecure-requests',
      ],
    },
  },

  markdown: {
    // Shiki emits per-token inline `style="color:…"` spans, which the strict
    // `style-src 'self'` CSP above blocks — a fenced code block in a project
    // brief (Phase 4c) would render unstyled. Turned off rather than switched
    // to Prism: coloured syntax highlighting would also fight the achromatic,
    // no-accent visual direction (PROJECT_FACTS.md "Visual direction — reset").
    // Code blocks render as plain <pre><code>; global.css styles them
    // monochrome in the phase that first needs one.
    syntaxHighlight: false,
  },

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [mdx(), react()],
});
