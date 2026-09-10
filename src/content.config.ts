import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
// NOT `import { z } from 'astro:content'` — that re-export is deprecated as
// of this Astro version and is removed entirely in Astro 8, per its own
// JSDoc (node_modules/astro/types/content.d.ts). This is the real
// replacement it names, not a guess.
import { z } from 'astro/zod';

/**
 * The Project entity — the only entity in this project (ARCHITECTURE.md
 * "Entities"). One MDX file per project under src/content/projects/;
 * frontmatter is the metadata below, body is the brief (hero tier only —
 * card tier's body is unused).
 *
 * There is no database. This schema, enforced by Zod at build time, IS the
 * data layer: an entry that violates it fails the build rather than
 * shipping broken. `slug` is not a schema field — the glob loader derives
 * it from the filename, so uniqueness is enforced by the filesystem itself.
 */
const projects = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/projects' }),
  schema: z.object({
    name: z.string().min(1),
    // .min(1): ProjectCard renders the tagline unconditionally as the row's
    // one-line description — an empty string would ship a blank paragraph.
    tagline: z.string().min(1),
    year: z.number(),
    type: z.enum(['web', 'mobile']),
    // hero -> gets a /work/[slug] brief page; card -> renders only in the
    // work section + /services.
    tier: z.enum(['hero', 'card']),
    // Drives honest link labels (docs/PRD.md §10) — never implies "live" for
    // something that isn't.
    status: z.enum(['live', 'android-apk', 'archived']),
    // Encodes "built for real use vs. practice" as data, not prose.
    client: z.enum(['self', 'real-client', 'practice']),
    stack: z.array(z.string()).min(1),
    // z.url(), not z.string().url() — the chained form is deprecated in
    // Zod v4 in favor of this top-level validator, per its own types.
    liveUrl: z.url().optional(),
    repoUrl: z.url().optional(),
    media: z.object({
      // Work-section card + OG image.
      cover: z.string(),
      // Screenshots shown on a hero brief page (Phase 6). Absent for card
      // tier, which has no brief page to show them on.
      gallery: z.array(z.string()).optional(),
    }),
    // Controls work-section sequence.
    order: z.number(),
    featured: z.boolean().default(false),
  }),
});

export const collections = { projects };
