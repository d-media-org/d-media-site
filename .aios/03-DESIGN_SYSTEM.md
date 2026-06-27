# Design System

## Purpose
Describe the current visual identity and interface conventions found in the repository.

## Scope
Covers typography, colors, layout behavior, components, theme handling, image treatment, and interaction patterns visible in Astro files.

## Rules
- Preserve the Panton-based typography system.
- Preserve light/dark theme support.
- Use existing CSS variables and component patterns before adding new styles.
- Keep layouts precise, readable, and restrained.
- Do not redesign brand identity without explicit human approval.

## Visual Identity
The Astro site uses custom Panton font faces from `public/fonts/panton-subset/` and maps them to CSS variables in `astro/src/styles/globals.css`.

Core light variables include:
- `--background: #ffffff`
- `--foreground: #0a0a0a`
- `--text: #0f0f0f`
- `--line: #e5e5e5`
- `--surface: #ffffff`
- `--surface-soft: #f3f3f3`

Core dark variables include:
- `--background: #181818`
- `--foreground: #f4f4f4`
- `--surface: #222222`
- `--surface-soft: #2c2c2c`

## Interface Patterns
- Header uses logotype asset, desktop navigation, mobile menu, locale switcher, and active link state.
- Footer exposes contact and social links.
- Buttons use `.button`, `.button-primary`, and `.button-secondary`.
- Cards and option controls generally use small radii such as `8px`.
- Theme is resolved through `data-theme` and `data-theme-mode` on the root element.
- Consent banner is present in the shared layout.

## Examples
- Correct: add a new service page using `ServiceDetailPage.astro` if it fits the existing pattern.
- Correct: use existing variables such as `--foreground`, `--surface`, and `--line`.
- Incorrect: introduce a new font family for page copy.
- Incorrect: replace the logotype with text-only branding without explicit approval.

## Related documents
- `02-BRAND.md`
- `04-CODE_STANDARDS.md`
- `10-ARCHITECTURE.md`

## Revision History
- 2026-06-27: First version created from repository inspection.
