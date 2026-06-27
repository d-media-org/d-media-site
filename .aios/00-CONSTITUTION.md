# Constitution

## Purpose
Define immutable principles for AI work in the official `d . media` repository.

## Scope
Applies to every AI agent, task, documentation update, review, and proposed repository change.

## Rules
- Do only what the human requested.
- Do not modify production code unless the task explicitly asks for a website change.
- Preserve the production website as a static Astro site deployed through Cloudflare Pages until a human changes that direction.
- Keep `d . media` spelling exact.
- Prefer repository evidence over assumptions.
- Use `Needs human validation` instead of inventing unsupported facts.
- Protect brand consistency, bilingual routing, SEO/GEO signals, accessibility, performance, and legal pages.
- Never deploy to production without explicit human approval.
- Never introduce secrets or private data into the repository.
- Treat `.aios/` as project memory, not as source code.

## Examples
- If asked to document AI operating rules, create files only under `.aios/`.
- If asked to change a hero headline, inspect the content source first and change only the relevant production file.
- If a request conflicts with existing brand spelling, refuse or ask for confirmation.
- If a fact about business ownership is not in the repo, write `Needs human validation`.

## Related documents
- `08-TASK_PROTOCOL.md`
- `09-CHANGE_GUARD.md`
- `11-DECISIONS.md`

## Revision History
- 2026-06-27: First version created from repository inspection.
