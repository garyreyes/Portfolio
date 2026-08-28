#!/usr/bin/env node
/**
 * Design-slop gate.
 *
 * Runs Impeccable's deterministic detector (~77 rules) over the BUILT output
 * in dist/, flagging the mechanical tells of generic AI-generated design:
 * ai-color-palette, gradient-text, italic-serif-display, hero-eyebrow-chip,
 * dark-glow, bounce-easing, monotonous-spacing, em-dash-overuse, and so on.
 *
 * Why dist/ and not src/: the detector reads real HTML/CSS. Astro components
 * are not HTML until they are built, and Tailwind utilities are not CSS until
 * they are compiled. Running it on source would silently check almost nothing.
 *
 * Why the version is resolved at runtime: Impeccable lives in a versioned
 * plugin cache (.../impeccable/<version>/...). Hardcoding a version means the
 * gate breaks — silently — on the next upgrade.
 *
 * This is a LOCAL gate only. CI has no plugin cache, so it is deliberately
 * not part of the CI workflow (see ARCHITECTURE.md / CLAUDE.md).
 */
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';

const CACHE = path.join(os.homedir(), '.claude', 'plugins', 'cache', 'impeccable', 'impeccable');

/** Newest installed Impeccable, by semver-ish numeric sort. */
function resolveDetector() {
  if (!fs.existsSync(CACHE)) return null;
  const versions = fs
    .readdirSync(CACHE)
    .filter((v) => /^\d+\.\d+\.\d+/.test(v))
    .sort((a, b) => {
      const pa = a.split('.').map(Number);
      const pb = b.split('.').map(Number);
      for (let i = 0; i < 3; i++) if (pa[i] !== pb[i]) return pa[i] - pb[i];
      return 0;
    });
  for (const v of versions.reverse()) {
    const p = path.join(CACHE, v, 'skills', 'impeccable', 'scripts', 'detect.mjs');
    if (fs.existsSync(p)) return { path: p, version: v };
  }
  return null;
}

function collect(dir, exts, acc = []) {
  if (!fs.existsSync(dir)) return acc;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, e.name);
    if (e.isDirectory()) collect(full, exts, acc);
    else if (exts.includes(path.extname(e.name))) acc.push(full);
  }
  return acc;
}

const detector = resolveDetector();
if (!detector) {
  console.warn(
    '\n[design-check] SKIPPED — Impeccable not found in the plugin cache.\n' +
      '  This is a local-only gate. Treat a skip as UNVERIFIED, not as a pass.\n',
  );
  process.exit(0);
}

const files = collect('dist', ['.html', '.css']);
if (files.length === 0) {
  console.error('[design-check] No built files in dist/. Run `npm run build` first.');
  process.exit(1);
}

let raw;
try {
  raw = execFileSync('node', [detector.path, '--json', ...files], {
    encoding: 'utf8',
    maxBuffer: 32 * 1024 * 1024,
  });
} catch (err) {
  // Non-zero exit still carries JSON on stdout when findings exist.
  raw = err.stdout || '';
  if (!raw.trim()) {
    console.error('[design-check] Detector failed to run:', err.stderr || err.message);
    process.exit(1);
  }
}

let findings;
try {
  findings = JSON.parse(raw);
} catch {
  console.error('[design-check] Could not parse detector output:\n', raw.slice(0, 500));
  process.exit(1);
}

if (!Array.isArray(findings) || findings.length === 0) {
  console.log(
    `[design-check] Clean — ${files.length} built file(s), 0 findings (Impeccable ${detector.version}).`,
  );
  process.exit(0);
}

console.error(`\n[design-check] ${findings.length} finding(s) — Impeccable ${detector.version}:\n`);
for (const f of findings) {
  const where = [f.file, f.line].filter(Boolean).join(':');
  console.error(`  ${f.rule ?? 'rule'} — ${f.message ?? ''}${where ? `  (${where})` : ''}`);
}
console.error('\nThese are mechanical pattern matches, not opinions. Fix them or');
console.error('justify the exception in PROJECT_FACTS.md.\n');
process.exit(1);
