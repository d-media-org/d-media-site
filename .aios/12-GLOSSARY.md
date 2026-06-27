# Glossary

## Purpose
Define repository-specific terminology for future AI agents.

## Scope
Covers brand, architecture, deployment, SEO/GEO, content, and QA terms used in this project.

## Rules
- Keep definitions short and repository-specific.
- Do not add generic terms unless they clarify project work.
- Use `Needs human validation` for unclear internal labels.

## Terms
- `d . media`: Official brand spelling.
- AIOS: The `.aios/` folder and its AI operating documentation.
- Astro production site: The static site under `astro/` documented as the current Cloudflare production site.
- BG locale: Default Bulgarian routes without `/bg/`.
- EN locale: English routes under `/en/`.
- Cloudflare Pages: Current documented deployment target.
- `astro:cf:validate`: Root script that validates site history, builds Astro, and validates Cloudflare output.
- GEO: Generative Engine Optimization / AI visibility work represented by content structure, schema, `llms` files, and AI-readable markdown behavior.
- `llms.txt`: Public AI-readable index file in `public/`.
- Content-Signal: Robots directive currently set to `search=yes, ai-input=yes, ai-train=no`.
- Authority pages: Repository pages generated from authority content modules. Specific editorial ownership needs human validation.
- Operational policies: Legal/policy pages under `/legal/policies/`.
- Source originals: Non-deployed asset originals documented as stored outside the repository.

## Examples
- Correct: refer to `/en/services/` as the EN services route.
- Correct: refer to `public/optimized-assets/` as browser-facing optimized assets.
- Incorrect: call the brand `D Media`.

## Related documents
- `01-PROJECT.md`
- `05-SEO_GEO.md`
- `10-ARCHITECTURE.md`
- `11-DECISIONS.md`

## Revision History
- 2026-06-27: First version created from repository inspection.
