# Code Standards

## Purpose
Record current coding conventions and technical expectations for future AI work.

## Scope
Covers Astro, TypeScript, CSS, assets, routing, validation scripts, and repository boundaries.

## Rules
- Prefer Astro production files under `astro/` for website work.
- Keep shared content in `astro/src/lib/` where existing patterns already centralize it.
- Use TypeScript modules for structured data and helpers.
- Keep routes bilingual when public-facing content requires both BG and EN versions.
- Use existing components before creating new ones.
- Do not introduce package or config changes without explicit human request.
- Preserve static output compatibility.

## Conventions Found
- Astro config uses `site: "https://www.d-media.org"`, `output: "static"`, `trailingSlash: "always"`, and `publicDir: "../public"`.
- Path aliases such as `@/lib/...` and `@/components/...` are used in Astro files.
- Layout-level SEO, schema, navigation, footer, consent banner, theme initialization, and assets are centralized in `astro/src/layouts/Layout.astro`.
- Content is mostly structured in modules such as `site-content.ts`, `page-copy.ts`, `ui-copy.ts`, `blog.ts`, and archive files.
- CSS is centralized in `astro/src/styles/globals.css`.
- Root scripts proxy Astro commands with `npm --prefix astro`.

## Examples
- Correct: add a page route under both `astro/src/pages/foo.astro` and `astro/src/pages/en/foo.astro` when the feature is public and bilingual.
- Correct: extend `getServiceCatalogSchema` if service schema needs to follow existing service content.
- Incorrect: add a runtime API dependency to the static Cloudflare Pages build without validating architecture impact.
- Incorrect: modify `package.json` for a documentation-only task.

## Related documents
- `07-QA_PROTOCOL.md`
- `08-TASK_PROTOCOL.md`
- `10-ARCHITECTURE.md`

## Revision History
- 2026-06-27: First version created from repository inspection.
