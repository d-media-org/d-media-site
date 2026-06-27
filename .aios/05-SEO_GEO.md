# SEO and GEO

## Purpose
Document all SEO and GEO implementation found in the repository.

## Scope
Covers metadata, canonical URLs, hreflang, sitemap, robots, structured data, AI-readable files, markdown generation, headers, and validation.

## Rules
- Keep canonical URLs on `https://www.d-media.org`.
- Preserve BG default routes and EN `/en/` routes.
- Preserve `trailingSlash: "always"`.
- Keep generated SEO files validated before deployment.
- Treat AI-readable files as support for discoverability, not a replacement for HTML content and schema.

## Implementation
SEO helpers live in `astro/src/lib/seo.ts`.

Layout-level SEO in `astro/src/layouts/Layout.astro` includes:
- `<title>`
- meta description
- optional meta robots
- canonical link
- alternate `hreflang` for `bg`, `en`, and `x-default`
- Open Graph metadata
- Twitter card metadata
- favicon, apple touch icon, and manifest links
- JSON-LD structured data

Structured data includes:
- `Organization`
- `ProfessionalService`
- `WebSite`
- `WebPage`
- `BreadcrumbList`
- `CreativeWork`
- `OfferCatalog`
- `Service`

Sitemap implementation lives in `astro/src/pages/sitemap.xml.ts` and includes base pages, services, authority pages, blog posts, project archives, legal policies, and site history pages.

Robots implementation lives in `astro/src/pages/robots.txt.ts` and includes:
- `Allow: /`
- `Disallow: /markdown-pages/`
- `Content-Signal: search=yes, ai-input=yes, ai-train=no`
- canonical sitemap URL

AI/GEO files in `public/` include:
- `llms.txt`
- `llms-bg.txt`
- `llms-full.txt`

Validation includes `scripts/check-ai-readiness.mjs`, which checks markdown content negotiation, robots Content-Signal, and canonical `llms.txt` links.

## Examples
- Correct: add schema through `seo.ts` helpers and pass structured data into `Layout.astro`.
- Correct: update sitemap entries when adding public routes.
- Incorrect: create unlinked public pages that are absent from sitemap and alternate link logic.
- Incorrect: remove `Content-Signal` without explicit SEO/GEO approval.

## Related documents
- `01-PROJECT.md`
- `04-CODE_STANDARDS.md`
- `07-QA_PROTOCOL.md`
- `10-ARCHITECTURE.md`

## Revision History
- 2026-06-27: First version created from repository inspection.
