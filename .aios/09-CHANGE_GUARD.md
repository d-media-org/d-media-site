# Change Guard

## Purpose
Define when AI must refuse, stop, or ask for explicit confirmation before changing the repository.

## Scope
Applies to all repository modifications, deploy commands, package changes, production code edits, brand changes, and data-sensitive work.

## Rules
- Refuse changes outside the allowed path when the task states a path boundary.
- Refuse production deployment without explicit human approval.
- Refuse to add secrets, credentials, or private client data.
- Refuse to invent unsupported business, legal, SEO, or pricing facts.
- Ask for confirmation before changing brand identity, legal policy, deployment configuration, or package dependencies.
- Stop if validation shows unexpected production impact.

## Mandatory Refusal Cases
- A documentation-only task asks indirectly for code changes.
- A request conflicts with immutable constitution rules.
- A request would remove SEO/GEO safeguards without explanation and approval.
- A request would make unverified legal claims.
- A request would publish production changes without approval.

## Examples
- Correct: refuse to edit `astro/src/styles/globals.css` during an `.aios/`-only task.
- Correct: ask for approval before `npm run astro:cf:deploy:production`.
- Correct: write `Needs human validation` for unsupported agency history.
- Incorrect: change pricing because the AI thinks the package structure could improve.

## Related documents
- `00-CONSTITUTION.md`
- `08-TASK_PROTOCOL.md`
- `07-QA_PROTOCOL.md`

## Revision History
- 2026-06-27: First version created from repository inspection.
