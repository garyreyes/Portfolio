#!/usr/bin/env node
/**
 * Fetches @garyreyes's real GitHub contribution calendar via the GraphQL API
 * and renders it as a static, monochrome SVG matching this site's own
 * colour tokens — no GitHub green. The achromatic, no-accent direction
 * (PROJECT_FACTS.md "Visual direction — reset 2026-09-10") applies here too.
 *
 * Run on a schedule by .github/workflows/update-contributions.yml; writes
 * public/contributions.svg, which Astro serves as a normal static asset —
 * no client-side fetch, no CSP change, no third-party runtime dependency.
 * src/lib/contributions.ts reads this file's own <title>/width/height back
 * at Astro build time for the <img alt> and layout dimensions in
 * Footer.astro, so those never drift from what this script actually wrote.
 *
 * Requires CONTRIBUTIONS_TOKEN — a GitHub personal access token belonging
 * to @garyreyes. The default Actions GITHUB_TOKEN cannot query another
 * account's `contributionsCollection` (a documented GraphQL API limit, not
 * a design choice here — verified live 2026-09-12, see PROJECT_FACTS.md
 * "Contribution graph").
 */
import fs from 'node:fs';

const LOGIN = 'garyreyes';
const TOKEN = process.env.CONTRIBUTIONS_TOKEN;

if (!TOKEN) {
  console.error('[contributions] CONTRIBUTIONS_TOKEN is not set.');
  process.exit(1);
}

const query = `
  query($login: String!) {
    user(login: $login) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              date
              contributionCount
            }
          }
        }
      }
    }
  }
`;

const res = await fetch('https://api.github.com/graphql', {
  method: 'POST',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({ query, variables: { login: LOGIN } }),
});

if (!res.ok) {
  console.error(`[contributions] GitHub API returned HTTP ${res.status}`);
  process.exit(1);
}

const json = await res.json();
if (json.errors) {
  console.error('[contributions] GraphQL errors:', JSON.stringify(json.errors));
  process.exit(1);
}

const calendar = json.data.user.contributionsCollection.contributionCalendar;
const weeks = calendar.weeks;
const total = calendar.totalContributions;

/**
 * Five-step achromatic scale. THREE of the five values are this site's own
 * real tokens (global.css: --color-rule #e2e2e2, --color-ink-muted #5c5c5c,
 * --color-ink #171717) — the other two are computed midpoints between
 * adjacent tokens, not additional tokens themselves (caught in review: an
 * earlier version of this comment overclaimed "all five match tokens",
 * which wasn't true and would have drifted silently if global.css's
 * palette ever changed without anyone checking this file). Fixed
 * thresholds, not GitHub's per-user quantiles — simple and stable is worth
 * more here than a perfectly calibrated scale.
 */
function levelColor(count) {
  if (count === 0) return '#e2e2e2'; // --color-rule
  if (count <= 2) return '#9f9f9f'; // midpoint: --color-rule / --color-ink-muted
  if (count <= 5) return '#5c5c5c'; // --color-ink-muted
  if (count <= 9) return '#3a3a3a'; // midpoint: --color-ink-muted / --color-ink
  return '#171717'; // --color-ink
}

const CELL = 10;
const GAP = 2;
const PITCH = CELL + GAP;
const MONTH_LABEL_HEIGHT = 14;
const FONT_STACK = "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif";

const width = weeks.length * PITCH - GAP;
const height = MONTH_LABEL_HEIGHT + 7 * PITCH - GAP;

const monthFmt = new Intl.DateTimeFormat('en-US', { month: 'short', timeZone: 'UTC' });

let cells = '';
let labels = '';
let lastMonth = -1;

for (const [wi, week] of weeks.entries()) {
  const x = wi * PITCH;
  const firstDate = new Date(`${week.contributionDays[0].date}T00:00:00Z`);
  const month = firstDate.getUTCMonth();
  if (month !== lastMonth) {
    labels += `<text x="${x}" y="${MONTH_LABEL_HEIGHT - 4}" font-family="${FONT_STACK}" font-size="9" fill="#5c5c5c">${monthFmt.format(firstDate)}</text>`;
    lastMonth = month;
  }
  for (const [di, day] of week.contributionDays.entries()) {
    const y = MONTH_LABEL_HEIGHT + di * PITCH;
    // No per-cell <title> here (an earlier version had one per day): a
    // <title> inside an SVG loaded via <img src> is never exposed to
    // anything — not a screen reader, not a mouse tooltip — only inline
    // <svg> markup in the HTML gets that behavior. 371 inert elements were
    // pure dead weight (caught in review). The real accessible text lives
    // in the <img alt>, read at Astro build time from this file's own
    // top-level <title> — see src/lib/contributions.ts.
    cells += `<rect x="${x}" y="${y}" width="${CELL}" height="${CELL}" fill="${levelColor(day.contributionCount)}"/>`;
  }
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" role="img">
<title>${total} GitHub contributions in the last year</title>
${labels}
${cells}
</svg>
`;

fs.writeFileSync('public/contributions.svg', svg);
console.log(
  `[contributions] wrote public/contributions.svg — ${total} contributions across ${weeks.length} weeks`,
);
