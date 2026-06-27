# Content

## Purpose
Document how project content is structured and how AI should handle copy changes.

## Scope
Covers bilingual content, services, blog, legal pages, project archives, voice, and content source files.

## Rules
- Keep Bulgarian and English content aligned unless a task explicitly changes only one locale.
- Preserve brand voice: clear, systematic, practical, restrained.
- Do not invent service claims, legal claims, client names, testimonials, pricing, or process details.
- Use `Needs human validation` for unsupported facts.
- Keep legal and policy copy consistent with existing legal content modules.

## Content Sources
Important content modules include:
- `astro/src/lib/site-content.ts`
- `astro/src/lib/page-copy.ts`
- `astro/src/lib/ui-copy.ts`
- `astro/src/lib/legal-content.ts`
- `astro/src/lib/operational-policies.ts`
- `astro/src/lib/blog.ts`
- `astro/src/lib/blog-en.ts`
- `astro/src/lib/featured-projects-static.ts`
- `astro/src/lib/project-png-archive.ts`
- `astro/src/lib/legacy-project-archive.ts`

## Content Model
The site presents a bilingual studio website with service pages, projects, case studies, pricing, estimator, blog, authority pages, contact, privacy, terms, and operational policies.

## Examples
- Correct: update both BG and EN navigation labels in `site-content.ts` if adding a new global nav item.
- Correct: mark a service promise as `Needs human validation` if it does not appear in repository copy.
- Incorrect: add exaggerated claims such as guaranteed rankings without repository evidence.
- Incorrect: remove policy pages from sitemap because they are not visually prominent.

## Related documents
- `01-PROJECT.md`
- `02-BRAND.md`
- `05-SEO_GEO.md`

## Revision History
- 2026-06-27: First version created from repository inspection.
