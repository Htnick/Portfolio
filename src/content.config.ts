import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.string(),
    status: z.enum(['completed', 'in-progress']),
    tags: z.array(z.string()),
    role: z.string().optional(),
    // Filename only, e.g. "taipan-hero.jpg" — drop the actual file in
    // public/images/. The pages build the full URL (with the site's base
    // path) for you, so don't include a leading slash or "/Portfolio/" here.
    image: z.string().optional(),
    draft: z.boolean().optional().default(false),
  }),
});

export const collections = { projects };
