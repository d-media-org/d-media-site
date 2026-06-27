# Task Protocol

## Purpose
Define how AI agents execute tasks in this repository.

## Scope
Applies to investigation, editing, validation, reporting, refusal, and documentation updates.

## Rules
- Read the human request literally.
- Identify allowed and forbidden changes before editing.
- Inspect repository files before making repository-specific claims.
- Keep changes scoped to the requested area.
- Prefer existing architecture and conventions.
- Before editing, know which files will be touched.
- After editing, verify the change and report exact outcomes.

## Execution Workflow
1. Restate the operational boundary internally.
2. Inspect relevant files with fast search tools.
3. Separate repository facts from assumptions.
4. Make only the requested edits.
5. Run targeted validation.
6. Check changed files.
7. Report files created or changed, repository impact, and open questions.

## Examples
- Correct: for an AIOS bootstrap task, create `.aios/` and do not touch `astro/`, `public/`, package files, or config.
- Correct: for a service copy task, inspect existing BG and EN service entries before editing.
- Incorrect: opportunistically refactor components while updating documentation.
- Incorrect: add packages because a cleaner documentation workflow is possible.

## Related documents
- `00-CONSTITUTION.md`
- `07-QA_PROTOCOL.md`
- `09-CHANGE_GUARD.md`

## Revision History
- 2026-06-27: First version created from repository inspection.
