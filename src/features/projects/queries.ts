import { getCollection } from 'astro:content';
import type { Project } from '../../shared/projects';

// Re-exported so existing importers (ProjectCard, ProjectGrid) keep working;
// the type itself now lives in src/shared/projects.ts (used by two features).
export type { Project };

/**
 * The only place `getCollection('projects')` is called (CLAUDE.md layer
 * boundary: services/queries own all data access; UI components never
 * import `astro:content` directly).
 */
export async function getOrderedProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}

export interface ProjectStats {
  shipped: number;
  liveInProduction: number;
  realClientWork: number;
}

/**
 * The three footer stat-block figures (ROADMAP 5d) that come from this
 * repo's own data. Derived from the real `.mdx` entries — never hand-typed
 * — so they can't drift from what the site itself actually shows. The
 * fourth figure (peak commit day) can't come from here; see lib/stats.ts.
 */
export async function getProjectStats(): Promise<ProjectStats> {
  const projects = await getCollection('projects');
  return {
    shipped: projects.length,
    liveInProduction: projects.filter((p) => p.data.status === 'live').length,
    realClientWork: projects.filter((p) => p.data.client === 'real-client').length,
  };
}
