import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const knowledgeBase = defineCollection({
  loader: glob({ pattern: "**/*.md", base: "./src/content/knowledge-base" }),
  schema: z.object({
    title: z.string(),
    slug: z.string(),
    description: z.string(),
    category: z.string(),
    cluster: z.string(),
    type: z.enum(["pillar", "supporting"]),
    status: z.enum(["published", "draft"]),
    datePublished: z.string(),
    dateModified: z.string(),
    readingTime: z.number(),
    tags: z.array(z.string()),
    dependencies: z.array(z.string()).default([]),
    internalLinks: z.array(z.string()).default([]),
    externalReferences: z.array(z.string()).default([]),
  }),
});

export const collections = {
  "knowledge-base": knowledgeBase,
};
