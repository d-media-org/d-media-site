## d . media - site

Официалният Next.js сайт на `d . media`. Визуалната система използва само локалните Panton файлове и следва текущия brand book.

## Local Development

```bash
npm install
npm run dev
npm run lint
npm run build
```

## Asset Pipeline

Source originals не се deploy-ват. Те се пазят в:

```text
/Users/m.dragoev/d . media - site source archive/assets/
```

Структурата съдържа `project-covers/`, `project-pngs/`, `legacy-project-files/` и архивни документи. Browser-facing WebP derivatives се генерират в `public/optimized-assets/project-web/`:

```bash
npm run assets:web
```

Blob manifest се синхронизира от source архива, публичните brand assets и активните PDF downloads:

```bash
npm run sync:blob
npm run blob:audit
```

Ако shell средата съдържа `VERCEL_OIDC_TOKEN`, Blob audit командата го изключва и използва `BLOB_READ_WRITE_TOKEN`, за да избегне CLI credential conflict.

## Edge Config

Поддържани ключове:

- `featuredProjectSlugs`: масив от валидни project slug стойности.
- `siteRuntimeConfig.announcement`: `{ text, href? }` или `null`.
- `siteRuntimeConfig.home.sections.services`: boolean.
- `siteRuntimeConfig.home.sections.about`: boolean.

При липсващ или невалиден Edge Config сайтът използва безопасни fallback стойности.

## Release Checklist

1. Изпълни `npm run assets:web`, ако source assets са променени.
2. Изпълни `npm run lint`, `npm run build` и `npm audit`.
3. Качи Vercel preview.
4. Провери BG/EN routes, `/projects`, detail routes, lightbox и WebKit iPhone stress сценария.
5. Провери `robots.txt`, `sitemap.xml`, manifest и social preview.
6. Качи live само при чист preview резултат.

## Brand Rules

- Брандът винаги се изписва като `d . media`.
- Използва се само `Panton`.
- Не променяй визуалната идентичност без изрична задача.
