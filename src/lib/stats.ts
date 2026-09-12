import peakData from '../data/contributions-peak.json';

/**
 * The footer stat block's one figure that can't come from this repo's own
 * content collection (features/projects/queries.ts's getProjectStats owns
 * the other three). Peak commit day needs GitHub's contribution data,
 * which scripts/generate-contributions.mjs already computes for the
 * contribution graph — reading its output here means this number can't go
 * stale the way a hand-typed constant would (ROADMAP 5d).
 */
const peakDateFmt = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  day: 'numeric',
  timeZone: 'UTC',
});

export function getPeakCommitDay(): { count: number; label: string } {
  return {
    count: peakData.count,
    label: peakDateFmt.format(new Date(`${peakData.date}T00:00:00Z`)),
  };
}
