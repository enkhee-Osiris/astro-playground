import { glob } from "astro/loaders";
import { defineCollection, reference, z } from "astro:content";

import { BLOG_CATEGORIES } from "@/consts";

const blog = defineCollection({
  loader: glob({ base: "./src/content/blog", pattern: "**/*.{md,mdx}" }),

  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      // TODO: Update to published date
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      isDraft: z.boolean().default(false),
      heroImage: image().optional(),

      category: reference("category"),
      tags: z.array(z.string()).optional(),
    }),
});

const category = defineCollection({
  loader: () => [...BLOG_CATEGORIES],

  schema: z.object({
    slug: z.string(),
    name: z.string(),
  }),
});

export const collections = { blog, category };
