## d . media - site

Официалният сайт на `d . media`.

Текущият production сайт е статичен Astro сайт, deploy-нат в Cloudflare Pages.

Live:

```text
https://www.d-media.org
https://d-media.org
```

Preview:

```text
https://preview.d-media-site.pages.dev
```

## Local Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Cloudflare / Astro

Cloudflare build-ът е статичен и не изисква Workers или Pages Functions.

```bash
npm run astro:dev
npm run astro:cf:validate
npm run astro:cf:deploy:preview
npm run astro:cf:deploy:production
```

Cloudflare Pages настройки:

```text
Project: d-media-site
Framework preset: Astro
Root directory: astro
Build command: npm run build
Build output directory: dist
Node.js version: 22.x
```

Deployment aliases:

```text
Preview branch: preview
Production branch: main
```

`astro:cf:validate` прави build и проверява:

- задължителни routes, SEO файлове, manifest, favicon, PDFs и logo pack
- `_headers` и `_redirects`
- всички локални `href`/`src` references в HTML
- липса на `_next`, Vercel runtime и Metricool references в Astro output

## Asset Pipeline

Source originals не се deploy-ват. Те се пазят в:

```text
/Users/m.dragoev/d . media - site source archive/assets/
```

Структурата съдържа `project-covers/`, `project-pngs/`, `legacy-project-files/` и архивни документи. Browser-facing WebP derivatives се генерират в `public/optimized-assets/project-web/`:

```bash
npm run assets:web
```

Cloudflare Pages build-ът използва само локални файлове от `public/` и генерирания WebP manifest. Няма външен asset storage fallback.

Критичните brand assets използват bounded display-size WebP файлове:

```text
public/optimized-assets/brand/ONLY-logotype.display.webp
public/optimized-assets/brand/ONLY-brandmark.display.webp
```

Panton се сервира чрез subset `woff2` файлове в:

```text
public/fonts/panton-subset/
```

## Runtime Config

Текущата Cloudflare версия е статична. Featured projects, announcement и home section visibility използват кодови fallback стойности, без външен runtime config service.

## Current QA Baseline

- PageSpeed Insights е постигнал `100` навсякъде след performance pass-а:
  - Mobile Performance: `100`
  - Desktop Performance: `100`
  - Accessibility: `100`
  - Best Practices: `100`
  - SEO: `100` за indexable production URL-ите
- Performance score може да флуктуира между `99` и `100` в отделни PageSpeed lab runs заради Lighthouse/PSI variance, cache/edge timing, latency и FCP/LCP измервания. Това не се третира автоматично като regression, ако няма нов конкретен audit проблем.
- `/projects` legacy секциите имат orientation-aware gallery rendering:
  - `legacy-mockup-card-portrait`
  - `legacy-mockup-card-landscape`
- Проверените legacy секции са:
  - `Колекция от мокъпи на флаери за клубни събития`
  - `Колекция от мокъпи на част от проектите`
  - `Архив флаери`
- Lightbox е проверен за portrait изображения.

## Release Checklist

1. Изпълни `npm run assets:web`, ако source assets са променени.
2. Изпълни `npm run lint` и `npm run astro:cf:validate`.
3. Качи Cloudflare preview чрез `npm run astro:cf:deploy:preview`.
4. Провери BG/EN routes, `/projects`, detail routes, lightbox, consent, theme toggle и WebKit iPhone stress сценария.
5. Провери `robots.txt`, `sitemap.xml`, manifest, social preview, PDF downloads и logo pack.
6. Прави Cloudflare production deploy чрез `npm run astro:cf:deploy:production` само след чист preview резултат и изрично потвърждение.
7. След live deploy провери `https://www.d-media.org` и `https://d-media.org` за `200`, правилни brand assets и `/projects` gallery classes.

## Brand Rules

- Брандът винаги се изписва като `d . media`.
- Използва се само `Panton`.
- Не променяй визуалната идентичност без изрична задача.
