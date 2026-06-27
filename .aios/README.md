# AI Operating System

## Purpose
`.aios/` is the internal AI knowledge base for future AI agents working on the official `d . media` repository. It exists to preserve project-specific operating rules, architecture facts, brand constraints, QA expectations, and decision memory without changing the production website.

## Scope
This knowledge base covers the current repository shape: a static Astro production site in `astro/`, shared public assets in `public/`, legacy/root Next.js files, Cloudflare Pages deployment, bilingual BG/EN routing, SEO/GEO implementation, brand rules, and release validation scripts.

## Rules
- Treat production code, config, assets, and package files as out of scope unless a human explicitly assigns a website change.
- Use the repository as the source of truth before editing `.aios/`.
- Write `Needs human validation` where repository evidence is insufficient.
- Keep brand spelling as `d . media`.
- Update the most specific document first, then update higher-level summaries when needed.
- Do not store secrets, credentials, private client data, or speculative claims here.

## Folder Structure
- Root numbered documents define the official AI operating layer.
- `components/` is for future notes about reusable UI and content components.
- `procedures/` is for future task workflows and operational runbooks.
- `standards/` is for future implementation, content, SEO, and accessibility standards.
- `checklists/` is for future release, QA, and review checklists.
- `architecture/` is for future architecture maps and dependency notes.
- `decisions/` is for future Architecture Decision Records.
- `memory/` is for durable project memory approved for AI reuse.
- `prompts/` is for future prompt templates and task starters.

## Document Priority
1. `00-CONSTITUTION.md`
2. `09-CHANGE_GUARD.md`
3. `08-TASK_PROTOCOL.md`
4. `07-QA_PROTOCOL.md`
5. Topic documents `01` through `06` and `10` through `12`
6. Subfolder index files and future detailed notes

## Update Workflow
1. Inspect current repository files relevant to the change.
2. Update only the `.aios/` document that owns the fact.
3. Cross-link related documents.
4. Add a dated entry to `Revision History`.
5. Mark uncertain claims as `Needs human validation`.

## Examples
- Correct: Document that `astro/astro.config.mjs` sets `output: "static"` and `site: "https://www.d-media.org"`.
- Correct: Document that Cloudflare validation is run with `npm run astro:cf:validate`.
- Incorrect: Claiming a CMS exists when no repository evidence supports it.
- Incorrect: Updating `astro/src/styles/globals.css` while working on AI documentation.

## Related documents
- `00-CONSTITUTION.md`
- `08-TASK_PROTOCOL.md`
- `09-CHANGE_GUARD.md`
- `10-ARCHITECTURE.md`

## Revision History
- 2026-06-27: First version created from repository inspection.
