# d . media Astro migration

Static-first Astro version of the d . media site, prepared for Cloudflare Pages.

## Local commands

Run from the repository root:

```bash
npm run astro:dev
npm run astro:build
npm run astro:preview
npm run astro:cf:validate
```

Run from this directory:

```bash
npm run dev
npm run build
npm run preview
```

## Cloudflare Pages settings

Use these settings when connecting the GitHub repository to Cloudflare Pages:

```text
Framework preset: Astro
Root directory: astro
Build command: npm run build
Build output directory: dist
Node.js version: 22.x
```

The site is built as static output. No Worker adapter is required for the current version.

Wrangler config:

```text
wrangler.toml
```

Preview deploy from repository root:

```bash
npm run astro:cf:deploy:preview
```

Production deploy from repository root, only after explicit cutover approval:

```bash
npm run astro:cf:deploy:production
```

## Current migration scope

Migrated routes:

```text
/
/en
/services
/en/services
/about
/en/about
/contact
/en/contact
/terms
/en/terms
/privacy
/en/privacy
/projects
/en/projects
/projects/[slug]
/en/projects/[slug]
/robots.txt
/sitemap.xml
/manifest.webmanifest
/404.html
```

The Astro app reuses the existing browser-facing assets from the repository-level `public/` directory.

## Cloudflare static files

Cloudflare Pages headers are emitted through:

```text
../public/_headers
../public/_redirects
```

These files are copied into `astro/dist/` during build.

## Static validation

Run from repository root:

```bash
npm run astro:cf:validate
```

The validation checks required routes/assets, `_headers`, `_redirects`, local `href`/`src` references and Vercel-only leftovers.

## Current constraints

- No domain or live deployment action is performed from this workspace without explicit approval.
- The Astro application is the only production and development application in this repository; the legacy Next.js/Vercel layer has been removed.
