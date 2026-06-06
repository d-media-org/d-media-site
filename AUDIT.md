# Production / Cloudflare Audit

Дата: 2026-06-06

## Current State

- Next.js security update: `16.2.6`.
- Project galleries използват bounded hashed WebP derivatives.
- Source originals са архивирани извън deploy tree.
- External blob/storage fallback е премахнат от Cloudflare build-а.
- BG/EN routes, metadata, canonical, hreflang, robots, sitemap и social preview са активни.
- Astro static build е подготвен за Cloudflare Pages в `astro/`.
- Cloudflare Pages config е в `astro/wrangler.toml`.
- Cloudflare headers/redirects се копират от `public/_headers` и `public/_redirects`.
- Няма нужни Cloudflare Workers/Pages Functions за текущата функционалност.

## Required Release Gates

- `npm run lint`
- `npm run astro:cf:validate`
- `npm audit`
- WebKit iPhone stress pass за `/projects`, detail routes, consent и lightbox
- Facebook/Messenger WebView stress pass
- Cloudflare preview CDN sweep за routes, static assets, PDFs, logo pack, social preview и redirects

## Known Audit Note

`npm audit` може да отчете transitive `postcss` advisory през текущия Next.js пакет. Не използвай `npm audit fix --force`, ако предлага breaking downgrade на Next.js. Провери за официален patched Next.js release при следващ maintenance pass.
