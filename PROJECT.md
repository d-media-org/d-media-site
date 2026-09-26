# PROJECT.md

## Какво представлява d . media

`d . media` е официалният сайт на дигитално студио в София, България. Според съдържанието в репозитория проекта представя услуги за бранд идентичност, съдържание, социални медии, уеб дизайн и разработка, техническо SEO, GEO и AI видимост, оптимизация на скоростта, техническа поддръжка, графичен дизайн, реклама, проекти, цени, блог, правни страници и контакт.

Официалното изписване на бранда е `d . media`.

## Структура на проекта

Репозиторията съдържа Astro структура в `astro/`.

Според `DEC-013` официалната `d . media Knowledge Base` е публичен content layer на production Astro сайта. Тя се изгражда като evergreen техническа база знания с Master Content Plan, категории, клъстери, pillar статии, supporting статии, вътрешни връзки и QA.

Според root `README.md` текущият production сайт е статичен Astro сайт, deploy-нат в Cloudflare Pages.

Официалният production път е:

```text
Astro → astro/dist → Cloudflare Pages → Wrangler deploy
```

Astro е единственият production и development слой. QA валидира Astro output-а и Cloudflare Pages пътя.

Основни root файлове и директории:

- `README.md` - обща документация за сайта, Cloudflare, Astro, assets и release checklist.
- `package.json` - root scripts, включително proxy команди към Astro.
- `astro/` - Astro сайтът.
- `public/` - browser-facing assets, favicon, fonts, optimized assets, downloads, SEO/GEO файлове и Cloudflare static files.
- `scripts/` - build, asset и validation scripts.
- `tests/` - Playwright release gate test.
- `.aios/` - AI knowledge base, създадена за бъдещи AI модели.

## Използвани технологии

От `package.json`, `astro/package.json` и конфигурационните файлове:

- `Astro`
- `ESLint`
- `Playwright`
- `sharp`
- `Cloudflare Pages`
- `Wrangler`

Astro package изисква `node >=22.12.0`.

## Архитектура

Production архитектурата, описана в `README.md`, е статичен Astro сайт за Cloudflare Pages.

Текущият production път е:

```text
Astro → astro/dist → Cloudflare Pages → Wrangler deploy
```

Root Next.js приложението е legacy/fallback слой. То може да се build-ва, но не е source of truth за текущия production сайт.

Astro конфигурацията в `astro/astro.config.mjs` задава:

- `site: "https://www.d-media.org"`
- `output: "static"`
- `trailingSlash: "always"`
- `publicDir: "../public"`

Общият layout е `astro/src/layouts/Layout.astro`. Той централизира:

- глобалния CSS import;
- SEO metadata;
- canonical и alternate links;
- Open Graph и Twitter metadata;
- JSON-LD structured data;
- header navigation;
- mobile navigation;
- locale switcher;
- consent banner;
- footer;
- theme initialization.

Съдържанието е централизирано основно в `astro/src/lib/`, включително:

- `site-content.ts`
- `page-copy.ts`
- `ui-copy.ts`
- `seo.ts`
- `i18n.ts`
- `legal-content.ts`
- `operational-policies.ts`
- `authority-pages.ts`
- `authority-services.ts`
- `blog.ts`
- `blog-en.ts`
- `project-png-archive.ts`
- `legacy-project-archive.ts`

Публичната страница „За бранда“ отделя текущото позициониране от етапите в историята на бранда. Историята на платформата е самостоятелен, етапен разказ в `/site-history/` и `/site-history/daily/`; тя не извежда директно вътрешните файлове `SITE_HISTORY.md` и `SITE_HISTORY_DAILY.md`.

## Основни директории

- `astro/src/pages/` - file-based Astro routes.
- `astro/src/components/` - Astro компоненти като `BrandAsset.astro`, `ProjectCard.astro`, `ServiceDetailPage.astro`, `InquiryForm.astro`, `ProjectEstimator.astro`.
- `astro/src/layouts/` - shared layout.
- `astro/src/lib/` - structured content, SEO helpers, i18n helpers и archive data.
- `astro/src/styles/` - глобални стилове.
- `public/` - публични assets, fonts, optimized assets, downloads, `_headers`, `_redirects`, `llms.txt`, `llms-bg.txt`, `llms-full.txt`.
- `scripts/` - asset generation, Cloudflare output validation, AI readiness checks и QA помощни scripts.

## Навигация

Навигацията е дефинирана в `astro/src/lib/site-content.ts`.

BG навигация:

- Начало
- Услуги
- Работа
- Цени
- Оценка на проект
- Блог
- За бранда
- Контакти

EN навигация:

- Home
- Services
- Work
- Pricing
- Estimator
- Blog
- About
- Contacts

Езиците са `bg` и `en`. `bg` е default locale. Английските routes са под `/en/`.

## SEO/GEO особености

SEO helper-ите са в `astro/src/lib/seo.ts`.

Намерени SEO елементи:

- canonical URL към `https://www.d-media.org`;
- `hreflang` за `bg`, `en` и `x-default`;
- Open Graph metadata;
- Twitter card metadata;
- favicon и app icon links;
- `manifest.webmanifest`;
- JSON-LD structured data;
- sitemap generation;
- robots generation.

Structured data типове, извлечени от `seo.ts`:

- `Organization`
- `ProfessionalService`
- `WebSite`
- `WebPage`
- `BreadcrumbList`
- `CreativeWork`
- `OfferCatalog`
- `Service`

GEO и AI-readable особености:

- `public/llms.txt`
- `public/llms-bg.txt`
- `public/llms-full.txt`
- `robots.txt` съдържа `Content-Signal: search=yes, ai-input=yes, ai-train=no`
- `robots.txt` забранява `/markdown-pages/`
- `scripts/check-ai-readiness.mjs` проверява markdown response, `Content-Signal` и canonical links в `llms.txt`.

## Cloudflare

Cloudflare deployment е описан в `README.md` и `astro/README.md`.

Cloudflare Pages настройки:

- Project: `d-media`
- Framework preset: `Astro`
- Root directory: `astro`
- Build command: `npm run build`
- Build output directory: `dist`
- Node.js version: `22.x`

`astro/wrangler.toml` съдържа:

- `name = "d-media"`
- `pages_build_output_dir = "dist"`
- `compatibility_date = "2026-06-06"`
- D1 binding `d_media_inquiries`

D1 binding `d_media_inquiries` се използва от `astro/functions/api/contact.ts`. Функцията `onRequestPost` за `/api/contact`:

- проверява rate limit чрез `SELECT COUNT(*)` от таблица `inquiries`;
- записва ново запитване с `INSERT INTO inquiries`;
- обновява статуса с `UPDATE inquiries`;
- очаква `env.d_media_inquiries: D1Database`.

Схемата за таблицата е в `astro/migrations/0001_create_inquiries.sql`.

Реален API inventory:

- `astro/functions/api/contact.ts` обслужва текущия Astro/Cloudflare endpoint `/api/contact`.
- `src/app/api/social-preview/route.tsx` обслужва root Next.js endpoint `/api/social-preview`, но е legacy/helper route и не е част от текущия Astro/Cloudflare production path.
- Други API routes не са открити при проверка в `astro/functions/`, `astro/src/pages/api/`, root `src/pages/api/` и root `src/app/api/`.

Markdown content negotiation:

- `astro/functions/_middleware.js` обработва `GET` и `HEAD` заявки с `Accept: text/markdown`.
- Middleware allowlist-ът съдържа 20 route-а: `/`, `/about/`, `/services/`, `/contact/`, `/blog/`, service routes, `/case-studies/` и избрани project routes.
- `scripts/generate-markdown-pages.mjs` генерира Markdown файловете в `astro/dist/markdown-pages/` след Astro build.
- Middleware-ът пренасочва allowlisted route към съответния generated Markdown asset.
- Markdown response headers включват `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`, `Content-Signal: search=yes, ai-input=yes, ai-train=no` и `X-Robots-Tag: noindex`.
- `robots.txt` се генерира от `astro/src/pages/robots.txt.ts`, съдържа `Content-Signal: search=yes, ai-input=yes, ai-train=no` и забранява `/markdown-pages/`.
- `public/llms.txt`, `public/llms-bg.txt` и `public/llms-full.txt` са публичните AI-readable entry files.
- `scripts/check-ai-readiness.mjs` проверява Markdown response, HTML fallback, `robots.txt` Content-Signal и canonical links в `llms.txt`.

Video thumbnail policy:

- Всяко native `<video>` в текущия Astro production сайт трябва да има `poster`.
- Всяка embedded video/card употреба трябва да има thumbnail image.
- Ако липсва thumbnail asset, не се измисля изображение и не се използва AI-generated thumbnail без изрично разрешение.
- Съществуващият motion archive в `astro/src/components/MotionArchiveSections.astro` използва `poster={item.poster}` и `astro/src/lib/d-media-motion-archive.ts` съдържа poster за 155 от 155 video записа.
- Project detail video записите в `astro/src/lib/project-png-archive.ts` използват съществуващи project cover assets като poster.

Deploy scripts в root `package.json`:

- `npm run astro:cf:deploy:preview`
- `npm run astro:cf:deploy:production`

Production deploy се прави само след изрично потвърждение.

## Automation 2.0

Automation 2.0 централизира повторяемите QA проверки в npm команди и постепенно трябва да добави машинно четими отчети за release readiness, без да променя production съдържание, design, pricing, legal текстове, assets или deploy flow.

Source of Truth за Automation:

- overview: `PROJECT.md`;
- избор на проверки: `CHECKLIST.md`;
- implementation: `package.json` и `scripts/`;
- reports: `reports/`.

Текущ инвентар на стабилните проверки:

- `npm run lint` изпълнява ESLint.
- `npm run build` изпълнява root Next.js build за legacy/fallback слоя.
- `npm run astro:build` изпълнява Astro build и генерира Markdown pages.
- `node scripts/validate-cloudflare-dist.mjs` проверява `astro/dist` за задължителни Cloudflare files, routes, headers, redirects и липсващи local references.
- `npm run astro:cf:validate` комбинира site history validation, Astro build и Cloudflare dist validation.
- `node scripts/check-ai-readiness.mjs` проверява markdown negotiation, `robots.txt` Content-Signal и canonical links в `llms.txt` срещу preview server.
- В `scripts/` има browser/screenshot QA помощни scripts и unified Automation 2.0 scripts. Browser/SEO проверките стартират локален Cloudflare Pages preview върху `astro/dist`.

Първата unified команда е `npm run qa`. Тя изпълнява последователно:

- `npm run lint`
- `npm run build`
- `npm run astro:build`
- `node scripts/validate-cloudflare-dist.mjs`

`npm run qa` не прави deploy, не прави commit, не изисква secrets, не проверява Cloudflare dashboard и не включва browser QA.

Unified Automation 2.0 команди:

- `npm run qa` - lint, root build, Astro build и Cloudflare dist validation.
- `npm run browser-qa` - локален Cloudflare Pages preview, desktop/tablet/mobile smoke QA, key routes, console errors, 4xx/5xx network responses, horizontal overflow, basic layout shift, navigation targets и video poster checks за project video routes.
- `npm run seo-check` - локален Cloudflare Pages preview, title, meta description, canonical, hreflang, Open Graph, Twitter card, JSON-LD parse validity, sitemap, `robots.txt`, `llms.txt`, Markdown content negotiation и `Content-Signal`.
- `npm run release-check` - изпълнява последователно `npm run qa`, `npm run browser-qa` и `npm run seo-check`; спира при грешка.
- `npm run smart-qa` - анализира текущите git промени и избира минимално необходимите проверки според засегнатите области.
- `npm run regression` - сравнява build/validation metrics срещу локална baseline структура в `reports/baseline/`.
- `npm run release` - изпълнява `smart-qa`, `regression` и `release-check` и връща само release readiness статус без deploy, commit или push.

Automation 2.0 командите генерират HTML отчети в `reports/`. Директорията е gitignored, защото отчетите са локални QA артефакти. Всеки отчет съдържа дата/час, команда, статус, изпълнени проверки, passed, failed, warnings и препоръчани следващи действия. Отчетите не трябва да съдържат secrets, sensitive данни или лична информация за Project Owner.

Automation 2.0 включва Decision Engine върху същия reports и preview слой. Освен HTML отчетите всяка automation команда обновява `reports/report.json` със стабилна машинно четима структура: timestamp, executed command, overall status, passed, failed, warnings, skipped, executed checks, duration и recommended next action.

Automation 2.0 командите не правят deploy, commit, push, live Cloudflare dashboard проверки, destructive tests или реално изпращане на контактна форма. Browser-only преценка, Project Owner approval, legal/pricing/brand решения, live smoke test след deploy и production deploy остават извън автоматичните local gates.

Approval правила:

- Production deploy се одобрява от `Project Owner`.
- Brand промени се одобряват от `Project Owner`.
- Legal промени се одобряват от `Project Owner` след правна проверка при нужда.
- Pricing промени се одобряват от `Project Owner`.
- Архитектурни промени се одобряват от `Project Owner`.

`Project Owner` е вътрешна роля. Самоличността не се публикува в сайта, schema, meta данни, footer, публични страници или публична документация без изрично указание.

## Astro

Astro приложението е в `astro/`.

Основни команди от root:

- `npm run astro:dev`
- `npm run astro:build`
- `npm run astro:preview`
- `npm run astro:cf:validate`

Основни Astro routes включват:

- `/`
- `/en/`
- `/services/`
- `/en/services/`
- `/projects/`
- `/en/projects/`
- `/case-studies/`
- `/en/case-studies/`
- `/pricing/`
- `/en/pricing/`
- `/estimator/`
- `/en/estimator/`
- `/blog/`
- `/en/blog/`
- `/about/`
- `/en/about/`
- `/contact/`
- `/en/contact/`
- `/terms/`
- `/en/terms/`
- `/privacy/`
- `/en/privacy/`
- `/legal/policies/`
- `/en/legal/policies/`
- `/robots.txt`
- `/sitemap.xml`
- `/manifest.webmanifest`
- `/404.html`

## Важни архитектурни решения

- Текущият production сайт е статичен Astro сайт.
- „Работа“ е общият концептуален слой; `/projects/` е главният индекс, а `/case-studies/` е вторичен индекс за задълбочени проекти. И двата типа използват каноничния адрес `/projects/<slug>/`, а статусът „казус“ се съхранява в проектните данни.
- Cloudflare Pages build-ът не изисква Workers или Pages Functions според `README.md`.
- Astro използва root `public/` чрез `publicDir: "../public"`.
- Canonical base URL е `https://www.d-media.org`.
- Routes използват trailing slash.
- Bulgarian е default locale; English е под `/en/`.
- SEO, structured data и canonical URL логиката са централизирани в `astro/src/lib/seo.ts` и `astro/src/layouts/Layout.astro`.
- Sitemap се генерира от `astro/src/pages/sitemap.xml.ts`.
- Robots се генерира от `astro/src/pages/robots.txt.ts`.
- Cloudflare static headers и redirects се управляват чрез `public/_headers` и `public/_redirects`.
- Source originals не се deploy-ват според `README.md`; browser-facing derivatives се генерират в `public/optimized-assets/project-web/`.
- Panton е brand font според `README.md` и CSS font-face definitions.
- Brand spelling трябва да остане `d . media`.

## Нуждае се от потвърждение

- Пълна responsive спецификация.
- Пълен accessibility audit report.
- Други технически дългове извън доказуемите в текущите документи и код.
