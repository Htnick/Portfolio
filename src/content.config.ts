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
    // Optional per-project accent color (hex), e.g. "#3b82c4". When set,
    // it overrides --redline for just this project's detail page, so
    // eyebrows, links, FIG. labels, and section rules pick up the accent
    // automatically via CSS custom-property inheritance.
    accent: z.string().optional(),
  }),
});

export const collections = { projects };
