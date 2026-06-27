# DECISIONS.md

## DEC-001

### Решение

Production сайтът е мигриран към Astro.

### Причина

Репозиторията документира, че текущият production сайт е статичен Astro сайт, а Astro е source of truth за текущия production слой.

### Алтернативи

Оставане на root Next.js като production приложение.

### Последствия

Feature work за production сайта се прави в Astro слоя. QA за production трябва да валидира Astro output-а.

### Статус

Accepted

## DEC-002

### Решение

Cloudflare Pages е текущият deployment target вместо Vercel.

### Причина

Root `README.md`, `PROJECT.md`, `astro/wrangler.toml` и deploy scripts документират Cloudflare Pages project `d-media`, `astro/dist` output и Wrangler deploy flow.

### Алтернативи

Production deployment през Vercel.

### Последствия

Production validation трябва да покрива Astro build, Cloudflare Pages output, `wrangler.toml`, `_headers`, `_redirects` и Cloudflare dist validation.

### Статус

Accepted

## DEC-003

### Решение

Root Next.js остава `Legacy / fallback component`.

### Причина

Root Next.js app все още присъства и може да се build-ва, но текущият production path е `Astro → astro/dist → Cloudflare Pages → Wrangler deploy`.

### Алтернативи

Премахване на root Next.js или връщането му като production path.

### Последствия

Feature work за production сайта не се прави в root `src/app`, освен ако задачата изрично не засяга legacy/fallback слоя.

### Статус

Accepted

## DEC-004

### Решение

Не се създава публичен Founder слой.

### Причина

`OWNER_REQUIREMENTS.md` изисква публична анонимност и забранява Founder страници, Owner страници, About the Founder страници и публична идентификация на Project Owner.

### Алтернативи

Публична Founder/Owner страница или публичен founder профил.

### Последствия

Сайтът не трябва да добавя Founder страници, Founder schema, footer credits или meta данни с лична идентичност без изрично указание.

### Статус

Accepted

## DEC-005

### Решение

Не се създава публичен Owner слой.

### Причина

Project Owner е вътрешна роля според `OWNER_REQUIREMENTS.md`.

### Алтернативи

Публично Owner позициониране или публикуване на самоличност на Project Owner.

### Последствия

Project Owner не се публикува в сайта, schema, meta данни, footer, copyright или публични страници без изрично указание.

### Статус

Accepted

## DEC-006

### Решение

Използва се централен asset pipeline и централен asset resolver.

### Причина

`astro/src/lib/asset-url.ts` централизира `resolveAssetUrl()`, а `generated-web-asset-manifest.ts` мапва source asset paths към optimized public assets.

### Алтернативи

Hardcoded optimized URLs или втори asset pipeline.

### Последствия

Project covers, gallery images и video posters трябва да използват съществуващия resolver flow.

### Статус

Accepted

## DEC-007

### Решение

Markdown content negotiation се поддържа за allowlisted routes.

### Причина

`astro/functions/_middleware.js` обработва `Accept: text/markdown`, а `scripts/generate-markdown-pages.mjs` генерира Markdown pages в `astro/dist/markdown-pages/`.

### Алтернативи

Само HTML output без Markdown negotiation.

### Последствия

AI readiness и content negotiation QA трябва да проверяват `Content-Type`, `Vary: Accept`, `Content-Signal`, `X-Robots-Tag`, generated Markdown pages, `robots.txt` и `llms.txt`.

### Статус

Accepted

## DEC-008

### Решение

AI Visibility стратегията използва публични машинночетими файлове, structured data и Markdown negotiation.

### Причина

Репозиторията съдържа `llms.txt`, `llms-bg.txt`, `llms-full.txt`, `robots.txt` с `Content-Signal`, generated Markdown pages, sitemap и JSON-LD schema.

### Алтернативи

Без AI-readable entry files и без Markdown negotiation.

### Последствия

Не се премахват `llms.txt`, robots правила, sitemap, schema или Markdown negotiation без изрична задача и QA.

### Статус

Accepted

## DEC-009

### Решение

Production build-ът е статичен Astro build.

### Причина

`astro/astro.config.mjs` задава `output: "static"`, `trailingSlash: "always"` и `publicDir: "../public"`.

### Алтернативи

SSR runtime или Next.js production runtime.

### Последствия

Production QA трябва да проверява `astro/dist`, Cloudflare Pages static output и Pages Functions само когато са част от Astro/Cloudflare слоя.

### Статус

Accepted

## DEC-010

### Решение

Project Owner остава вътрешна роля.

### Причина

`OWNER_REQUIREMENTS.md` изисква Project Owner да не се публикува като лично име и да не се използва за публична идентификация.

### Алтернативи

Документиране или публикуване на лична самоличност на Project Owner.

### Последствия

Документацията използва само термина `Project Owner`. Публичният сайт не добавя лична owner/founder информация без изрично указание.

### Статус

Accepted
