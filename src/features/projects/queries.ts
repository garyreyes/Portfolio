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
