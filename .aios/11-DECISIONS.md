# Decisions

## Legacy Status

This document is historical only.

It is not the active Source of Truth for architectural decisions.

Use `../DECISIONS.md` for current accepted decisions. If this file conflicts with `../DECISIONS.md`, the root `DECISIONS.md` always wins.

## Purpose
Record durable project decisions that future AI agents must respect.

## Scope
Covers architecture, deployment, brand, SEO/GEO, assets, validation, and AI operating decisions found in the repository.

## Rules
- Record only decisions supported by repository evidence or explicit human instruction.
- Mark unclear decisions as `Needs human validation`.
- Do not overwrite past decisions; append revisions or superseding notes.
- Put detailed future ADRs in `.aios/decisions/`.

## Current Decisions
- Production site is documented as a static Astro site deployed to Cloudflare Pages.
- Cloudflare Pages project name is `d-media`.
- The Astro app uses repository-level `public/` assets.
- The site uses BG as default locale and EN under `/en/`.
- Canonical site URL is `https://www.d-media.org`.
- Brand spelling is `d . media`.
- Panton is the brand typeface.
- Production deploy requires explicit approval.
- Source originals are not deployed and are documented as stored outside the repository path.
- AIOS documentation must not modify production code.

## Needs Human Validation
- Whether the root Next.js app is still maintained for any live or fallback workflow.
- Whether the D1 binding in `astro/wrangler.toml` is active, reserved, or historical.
- Who owns final approval for brand, legal, pricing, and production deployment changes.

## Examples
- Correct: add a new ADR when changing deployment from static Pages to a Worker-backed architecture.
- Correct: mark unknown ownership as `Needs human validation`.
- Incorrect: delete the Astro decision because root Next.js files exist.

## Related documents
- `00-CONSTITUTION.md`
- `10-ARCHITECTURE.md`
- `12-GLOSSARY.md`

## Revision History
- 2026-06-27: First version created from repository inspection.
