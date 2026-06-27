# QA Protocol

## Purpose
Define the validation workflow future AI agents should use before reporting work as complete.

## Scope
Covers documentation-only tasks, Astro website tasks, Cloudflare validation, SEO/GEO checks, visual checks, and deployment boundaries.

## Rules
- For `.aios/`-only tasks, verify that no files outside `.aios/` changed.
- For website tasks, run the most relevant validation commands available.
- Do not deploy preview or production unless the human asks for it.
- Production deploy requires explicit human approval.
- Report any validation that could not be run.

## Validation Workflow
For documentation-only AIOS changes:
1. Run `find .aios -type f | sort` or equivalent.
2. Run `git status --short`.
3. Confirm changes are limited to `.aios/`.

For Astro production changes:
1. Run `npm run lint` when relevant.
2. Run `npm run astro:cf:validate`.
3. If asset sources changed, run `npm run assets:web` first.
4. Check BG/EN routes touched by the task.
5. Check `robots.txt`, `sitemap.xml`, manifest, social preview, PDF downloads, and logo pack when release scope touches SEO/assets.

Repository validation script `scripts/validate-cloudflare-dist.mjs` checks required files, required routes, headers, redirects, local references, and forbidden Vercel/Metricool runtime references.

## Examples
- Correct: after this AIOS bootstrap, report that only `.aios/` files were created.
- Correct: after adding a service page, validate sitemap, route output, structured data, and EN equivalent.
- Incorrect: claim production readiness after only reading files.
- Incorrect: run Cloudflare production deploy without explicit approval.

## Related documents
- `04-CODE_STANDARDS.md`
- `05-SEO_GEO.md`
- `08-TASK_PROTOCOL.md`

## Revision History
- 2026-06-27: First version created from repository inspection.
