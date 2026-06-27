# Checklists Index

## Purpose
Reserve this folder for future reusable checklists.

## Scope
Future checklists may cover AIOS-only edits, Astro page changes, SEO/GEO updates, asset updates, and release readiness.

## Rules
- Checklists must be short, testable, and tied to repository commands or files.
- Include a final changed-files check.
- Separate preview checks from production approval.

## Examples
- AIOS-only checklist: confirm `git status --short` shows only `.aios/`.
- Release checklist: run `npm run astro:cf:validate` before any Cloudflare preview deploy.

## Related documents
- `../07-QA_PROTOCOL.md`
- `../08-TASK_PROTOCOL.md`
- `../09-CHANGE_GUARD.md`

## Revision History
- 2026-06-27: First index created.
