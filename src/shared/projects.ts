import type { CollectionEntry } from 'astro:content';

/**
 * The Project entity (ARCHITECTURE.md "Entities") and the human-readable
 * labels for its enum fields.
 *
 * Lives in src/shared/ because two features consume it — the work ledger
 * (features/projects) and the hero brief pages (features/brief) — and
 * CLAUDE.md's "Where new code goes" rule sends anything used by 2+ features
 * here. Keeping it in one feature's folder would give the other a hidden
 * cross-feature dependency.
 */
export type Project = CollectionEntry<'projects'>;

/**
 * Honest status labels (docs/PRD.md §10): the status WORD and the actual
 * LINK are two independent decisions. These maps only name the field value
 * — each surface assembles its own links (the ledger picks one link, the
 * brief shows every link that exists).
 */
export const STATUS_LABEL: Record<Project['data']['status'], string> = {
  live: 'Live',
  'android-apk': 'Android APK',
  archived: 'Archived',
};

// "Real client (unpaid)" stays on the surface, not just in internal docs —
// the binding honesty constraint (PROJECT_FACTS.md) is that this site may say
// available for freelance but must never imply trusted by businesses.
export const CLIENT_LABEL: Record<Project['data']['client'], string> = {
  self: 'Self-directed',
  'real-client': 'Real client (unpaid)',
  practice: 'Practice build',
};

export const PLATFORM_LABEL: Record<Project['data']['type'], string> = {
  web: 'Web',
  mobile: 'Mobile',
};

// Link text, shared so the ledger row and the brief header word it the same
// way for the same project.
export const LINK_LABEL = {
  live: 'Live site',
  repo: 'View repository',
} as const;
