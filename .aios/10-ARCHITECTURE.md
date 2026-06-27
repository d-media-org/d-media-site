# Architecture

## Purpose
Describe the current repository architecture for future AI agents.

## Scope
Covers production app structure, legacy/root app presence, deployment, assets, routing, content modules, and validation scripts.

## Rules
- Treat `astro/` as the current Cloudflare production implementation.
- Treat `public/` as shared browser-facing static assets used by Astro through `publicDir: "../public"`.
- Do not assume root Next.js is production unless a human validates it.
- Preserve static output and Cloudflare Pages compatibility.
- Keep generated and optimized assets aligned with existing scripts.

## Current Architecture
The repository contains:
- Root Next.js app files under `src/app`, `src/components`, and `src/lib`.
- Current static Astro app under `astro/`.
- Shared static assets under `public/`.
- Root scripts that operate Astro via `npm --prefix astro`.
- Validation and asset scripts under `scripts/`.

Astro config:
- `site: "https://www.d-media.org"`
- `output: "static"`
- `trailingSlash: "always"`
- `publicDir: "../public"`

Cloudflare:
- `astro/wrangler.toml` names the Pages project `d-media`.
- Output directory is `astro/dist`.
- Compatibility date is `2026-06-06`.
- A D1 binding named `d_media_inquiries` is present. Its current runtime use in Astro needs human validation.

Routes are file-based under `astro/src/pages/`, with BG default routes and EN routes under `astro/src/pages/en/`.

Shared layout:
- `astro/src/layouts/Layout.astro`

Reusable components:
- `BrandAsset.astro`
- `BrandText.astro`
- `ProjectCard.astro`
- `ServiceDetailPage.astro`
- `InquiryForm.astro`
- `ProjectEstimator.astro`
- `AuthorityPage.astro`
- `OperationalPolicyPage.astro`
- `LegalSourceText.astro`
- `MotionArchiveSections.astro`

## Examples
- Correct: place future architecture diagrams under `.aios/architecture/`.
- Correct: use `astro/src/lib/i18n.ts` helpers for localized paths.
- Incorrect: add a server runtime requirement to a static Cloudflare build without an approved architecture change.
- Incorrect: store source originals in deploy output; repository docs state source originals are outside the deploy path.

## Related documents
- `04-CODE_STANDARDS.md`
- `05-SEO_GEO.md`
- `07-QA_PROTOCOL.md`
- `11-DECISIONS.md`

## Revision History
- 2026-06-27: First version created from repository inspection.
