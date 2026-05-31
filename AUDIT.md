# Production Audit

Дата: 2026-05-31

## Current State

- Next.js security update: `16.2.6`.
- Project galleries използват bounded hashed WebP derivatives.
- Source originals са архивирани извън deploy tree.
- Vercel Blob orphan cleanup е изпълнен.
- BG/EN routes, metadata, canonical, hreflang, robots, sitemap и social preview са активни.

## Required Release Gates

- `npm run lint`
- `npm run build`
- `npm audit`
- WebKit iPhone stress pass за `/projects`, detail routes и lightbox
- Facebook/Messenger WebView stress pass
- Preview CDN sweep за routes и image transforms

## Known Audit Note

`npm audit` може да отчете transitive `postcss` advisory през текущия Next.js пакет. Не използвай `npm audit fix --force`, ако предлага breaking downgrade на Next.js. Провери за официален patched Next.js release при следващ maintenance pass.
