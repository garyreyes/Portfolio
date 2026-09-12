import fs from 'node:fs';

/**
 * Reads public/contributions.svg's own <title>/width/height at Astro build
 * time — a static file read, not a live API call (the scheduled GitHub
 * Action is what keeps the file itself current; see
 * scripts/generate-contributions.mjs and PROJECT_FACTS.md "Contribution
 * graph").
 *
 * This exists because an `<img src="*.svg">` never exposes the SVG's own
 * internal <title> to anything — not a screen reader, not a mouse tooltip
 * — only an inlined <svg> in the HTML gets that (caught in review: an
 * earlier version assumed the opposite). The accessible name has to live
 * in the <img alt> instead, and the width/height have to come from
 * whatever the file actually is right now — GitHub's calendar can return
 * 52 or 53 weeks depending on the date, so a hardcoded size would drift.
 */
const FALLBACK = {
  alt: 'GitHub contribution activity over the last year',
  width: 634,
  height: 96,
};

export function getContributionsMeta(): { alt: string; width: number; height: number } {
  let svg: string;
  try {
    svg = fs.readFileSync('public/contributions.svg', 'utf8');
  } catch {
    return FALLBACK;
  }

  const title = svg.match(/<title>(.*?)<\/title>/)?.[1];
  const width = svg.match(/\swidth="(\d+)"/)?.[1];
  const height = svg.match(/\sheight="(\d+)"/)?.[1];

  return {
    alt: title ?? FALLBACK.alt,
    width: width ? Number(width) : FALLBACK.width,
    height: height ? Number(height) : FALLBACK.height,
  };
}
