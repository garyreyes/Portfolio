#!/usr/bin/env node
/**
 * Internal-link gate.
 *
 * Scans every built HTML page in dist/ and fails if any in-site `href` or
 * `src` points at a path that was not built, or an #anchor whose id does not
 * exist on the target page. External refs (http/https/mailto/tel/data) and
 * protocol-relative refs are not checked.
 *
 * Internal refs must be ROOT-ABSOLUTE (`/work/x`, `/screenshots/y.png`) —
 * a relative ref (`../foo`, `foo.png`) is reported, not resolved. Authors
 * of `.mdx` briefs (Phase 4c) write absolute links.
 *
 * Why this exists: the 2026-09-10 critique found the homepage shipping
 * "View brief" and nav links to routes that 404 (/work/*, /services,
 * /how-i-build). A passing build and a clean design:check both missed it —
 * neither follows a link. `src` is covered too so a mistyped screenshot
 * path (Track A2) cannot 404 silently in production.
 *
 * `npm run check:links` builds first, so a manual run never checks a stale
 * dist/.
 */
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';

if (!fs.existsSync(DIST)) {
  console.error('[check-links] dist/ not found — run `npm run build` first.');
  process.exit(1);
}

/** Every file under dist/, as paths relative to dist/ (posix separators). */
function allFiles(dir, base = dir, acc = []) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) allFiles(full, base, acc);
    else acc.push(path.relative(base, full).split(path.sep).join('/'));
  }
  return acc;
}

const everything = new Set(allFiles(DIST));
const files = [...everything].filter((f) => f.endsWith('.html'));
if (files.length === 0) {
  console.error('[check-links] no HTML in dist/.');
  process.exit(1);
}

/**
 * Map a site path to the dist file it resolves to, or null.
 * A path can be a real asset ("/_astro/x.css"), a page ("/work/x" ->
 * work/x.html or work/x/index.html), or the root ("/").
 */
function resolvePath(sitePath) {
  const asAsset = sitePath.slice(1);
  if (everything.has(asAsset)) return asAsset;

  const clean = sitePath.replace(/\/+$/, '') || '/';
  const candidates =
    clean === '/' ? ['index.html'] : [`${clean.slice(1)}.html`, `${clean.slice(1)}/index.html`];
  return candidates.find((c) => everything.has(c)) ?? null;
}

/** id="..." / id='...' present in a given dist file. */
const idCache = new Map();
function idsIn(distFile) {
  if (!idCache.has(distFile)) {
    const html = fs.readFileSync(path.join(DIST, distFile), 'utf8');
    const ids = new Set();
    for (const m of html.matchAll(/\sid=["']([^"']+)["']/g)) ids.add(m[1]);
    idCache.set(distFile, ids);
  }
  return idCache.get(distFile);
}

const problems = [];

const EXTERNAL = /^(https?:)?\/\/|^(mailto|tel|data):/;

/** Check one href/src value found in `file`. */
function checkRef(file, ref) {
  const value = ref.trim();
  if (value === '' || EXTERNAL.test(value)) return;

  let targetFile;
  let fragment;

  if (value.startsWith('#')) {
    targetFile = file;
    fragment = value.slice(1);
  } else if (value.startsWith('/')) {
    const [rawPath, frag] = value.split('#');
    targetFile = resolvePath(rawPath.split('?')[0]);
    fragment = frag;
    if (!targetFile) {
      problems.push(`${file}: → ${value}  (no built file for ${rawPath})`);
      return;
    }
  } else {
    problems.push(`${file}: → ${value}  (relative ref — internal refs must be root-absolute)`);
    return;
  }

  if (fragment && !idsIn(targetFile).has(fragment)) {
    problems.push(`${file}: → ${value}  (no #${fragment} on ${targetFile})`);
  }
}

for (const file of files) {
  const html = fs.readFileSync(path.join(DIST, file), 'utf8');
  for (const m of html.matchAll(/\s(?:href|src)=["']([^"']+)["']/g)) {
    checkRef(file, m[1]);
  }
}

if (problems.length > 0) {
  console.error(`\n[check-links] ${problems.length} broken internal link(s):\n`);
  for (const p of problems) console.error(`  ${p}`);
  console.error('');
  process.exit(1);
}

console.log(
  `[check-links] clean — ${files.length} page(s), all internal links and anchors resolve.`,
);
