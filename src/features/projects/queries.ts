import { getCollection, type CollectionEntry } from 'astro:content';

export type Project = CollectionEntry<'projects'>;

/**
 * The only place `getCollection('projects')` is called (CLAUDE.md layer
 * boundary: services/queries own all data access; UI components never
 * import `astro:content` directly).
 */
export async function getOrderedProjects(): Promise<Project[]> {
  const projects = await getCollection('projects');
  return projects.sort((a, b) => a.data.order - b.data.order);
}
