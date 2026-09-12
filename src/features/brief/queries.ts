import { getCollection } from 'astro:content';
import type { Project } from '../../shared/projects';

/**
 * Data access for the hero brief pages (`/work/[slug]`). Same layer boundary
 * as features/projects/queries.ts — `getCollection` lives here, never in a
 * component or a page (CLAUDE.md). The page calls Astro's `render()` on the
 * entry this returns; that produces a UI component, not a data fetch, so it
 * stays in the page per Astro convention.
 *
 * Only `tier: 'hero'` projects get a brief page. Pahinga (card) renders in
 * the project list and links to its live site — it has no brief (ARCHITECTURE.md
 * "Project" table, docs/PRD.md §9).
 */
async function orderedHeroes(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.filter((p) => p.data.tier === 'hero').sort((a, b) => a.data.order - b.data.order);
}

/** Every hero brief, ordered — feeds `getStaticPaths`. */
export async function getHeroBriefs(): Promise<Project[]> {
  return orderedHeroes();
}

/**
 * The heroes immediately before and after `slug` in `order`. Bounded, not
 * cyclic: the first hero has no `prev`, the last has no `next` — the brief
 * set is a short ordered list, not a carousel.
 */
export async function getAdjacentHeroes(
  slug: string,
): Promise<{ prev: Project | null; next: Project | null }> {
  const heroes = await orderedHeroes();
  const i = heroes.findIndex((p) => p.id === slug);
  if (i === -1) return { prev: null, next: null };
  return {
    prev: heroes[i - 1] ?? null,
    next: heroes[i + 1] ?? null,
  };
}
