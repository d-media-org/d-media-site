# Cloudflare Pages Migration

This document tracks the practical migration path from the current Next.js production site to the static Astro/Cloudflare Pages version.

## Current State

- The production website remains on the current Next.js deployment until an explicit cutover.
- The Astro version lives in `astro/` and builds as static output.
- Repository-level `public/` assets are reused by Astro through `publicDir: "../public"`.
- No external runtime or asset storage service is required by the Astro build.
- Current site functionality is static/client-side: navigation, language switching, consent, theme mode, project lightbox, SEO files, downloads and social preview.
- No Cloudflare Worker, Pages Function, KV, D1, R2 or Durable Object binding is required for the current production scope.

## Cloudflare Pages Setup

Use these settings in Cloudflare Pages:

```text
Framework preset: Astro
Root directory: astro
Build command: npm run build
Build output directory: dist
Node.js version: 22.x
```

The local Wrangler config is:

```text
astro/wrangler.toml
```

It defines:

```text
name = "d-media-site-astro"
pages_build_output_dir = "dist"
```

## Local Validation

Run from the repository root:

```bash
npm run astro:build
npm run astro:cf:validate
npm --prefix astro audit
npm run lint
```

Run preview from the Astro root:

```bash
cd astro
npm run preview
```

## Cloudflare CLI

Wrangler needs an authenticated Cloudflare session or an API token:

```bash
export CLOUDFLARE_API_TOKEN="..."
npm run astro:cf:projects
```

Preview deployment uses an explicit project name to avoid deploying to the wrong Pages project:

```bash
export CF_PAGES_PROJECT="d-media-site-astro"
npm run astro:cf:deploy:preview
```

Production deployment command is prepared but must not be run before an explicit cutover approval:

```bash
npm run astro:cf:deploy:production
```

Do not run a production Pages deployment or custom-domain cutover until the preview has passed WebKit/mobile QA.

Current Pages project:

```text
Project: d-media-site-astro
Preview branch: astro-migration
Preview URL: https://astro-migration.d-media-site-astro.pages.dev
Latest deployment URL: use the output from `npm run astro:cf:deploy:preview`
```

## Release Sequence

1. Build the Astro app locally.
2. Run `npm run astro:cf:validate`.
3. Test WebKit mobile routes, project gallery, reload cycles, theme toggle, and mobile navigation.
4. Deploy to Cloudflare Pages preview.
5. Verify preview on desktop, mobile Safari, and Facebook/Messenger WebView where possible.
6. Only after clean preview QA, switch the custom domain from Vercel to Cloudflare Pages.

## Cutover Notes

- Domain DNS is already managed in Cloudflare, so the final switch should be done through Cloudflare Pages custom domain setup.
- Keep the old deployment available only during the first post-cutover validation window as rollback.
- After the Cloudflare version is verified live, remove old external hosting/storage resources.

## Static Output

Cloudflare Pages headers are emitted from:

```text
public/_headers
public/_redirects
```

The generated build should include:

```text
astro/dist/_headers
astro/dist/_redirects
astro/dist/robots.txt
astro/dist/sitemap.xml
astro/dist/manifest.webmanifest
astro/dist/404.html
```

## Functional Coverage

Prepared Cloudflare output covers:

- BG/EN routes and language switching.
- Project index, project detail routes and fullscreen lightbox.
- Contact flow through `mailto:` and social links.
- Privacy consent banner through `localStorage`.
- Theme mode through `localStorage` and system preference.
- Legal pages, privacy page, terms page.
- Brandbook web/PDF routes.
- Logo pack download.
- Favicon, manifest, social preview image.
- Canonical, hreflang, robots, sitemap and JSON-LD schema.
- Security/cache headers and basic redirects.

## Cutover Checklist

1. Run `npm run lint`.
2. Run `npm run astro:cf:validate`.
3. Run `npm run astro:cf:deploy:preview`.
4. Verify preview URL on desktop and mobile Safari.
5. Verify `/projects` and several project details with lightbox open/close/reload cycles.
6. Verify `/downloads/d-media-logo-pack.zip`, BG/EN PDF downloads and brandbook web pages.
7. Verify `robots.txt`, `sitemap.xml`, `manifest.webmanifest` and social preview.
8. Add `www.d-media.org` and `d-media.org` as Cloudflare Pages custom domains.
9. Keep the old deployment available only during the rollback window.
10. Switch production only after explicit approval.
