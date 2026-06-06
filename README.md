## d . media - site

Официалният сайт на `d . media`.

Текущият production сайт все още е Next.js/Vercel до изричен cutover. Подготвената Cloudflare версия е статичен Astro сайт в `astro/`, предназначен за Cloudflare Pages.

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
```

Cloudflare Pages настройки:

```text
Project: d-media-site-astro
Framework preset: Astro
Root directory: astro
Build command: npm run build
Build output directory: dist
Node.js version: 22.x
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

## Runtime Config

Текущата Cloudflare версия е статична. Featured projects, announcement и home section visibility използват кодови fallback стойности, без външен runtime config service.

## Release Checklist

1. Изпълни `npm run assets:web`, ако source assets са променени.
2. Изпълни `npm run lint` и `npm run astro:cf:validate`.
3. Качи Cloudflare preview чрез `npm run astro:cf:deploy:preview`.
4. Провери BG/EN routes, `/projects`, detail routes, lightbox, consent, theme toggle и WebKit iPhone stress сценария.
5. Провери `robots.txt`, `sitemap.xml`, manifest, social preview, PDF downloads и logo pack.
6. Прави Cloudflare production/custom-domain cutover само след чист preview резултат и изрично потвърждение.

## Brand Rules

- Брандът винаги се изписва като `d . media`.
- Използва се само `Panton`.
- Не променяй визуалната идентичност без изрична задача.
