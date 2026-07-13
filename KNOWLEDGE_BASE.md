# KNOWLEDGE_BASE.md

## d . media Knowledge Base v1

`d . media Knowledge Base` е официалният публичен content layer на проекта според `DEC-013`.

Исторически `Knowledge Base v1` е бил вътрешен documentation layer. Това състояние е superseded от `DEC-013`, след разрешаването на `Q-010` от Project Owner.

Целта му е да публикува постоянна техническа база знания за branding, brand strategy, brand identity, graphic design, web design, UX, UI, web development, Astro, Cloudflare, performance, technical SEO, semantic SEO, GEO, AI visibility, structured data, hosting, CMS, accessibility, content architecture, information architecture и свързани дисциплини.

Вътрешната project documentation продължава да използва съществуващата root документационна архитектура:

- `SOURCE_OF_TRUTH.md` - карта на документите и conflict resolution.
- `OWNER_REQUIREMENTS.md` - постоянни owner изисквания.
- `DECISIONS.md` - приети архитектурни решения.
- `PROJECT.md` - кратка актуална project архитектура.
- `KNOWLEDGE_BASE.md` - подробна база знания за доказуеми project facts.
- `OPEN_QUESTIONS.md` - неясноти, които изискват човешко решение.
- `SYSTEM_HISTORY.md` - milestones за вътрешни системи.
- `SOP-001-EXECUTE_TASK.md` - процедура за изпълнение на задачи.

Публичната Knowledge Base използва текущия Astro/Cloudflare production path и не променя deployment модела.

## Knowledge Base Architecture

Knowledge Base v1 има следните слоеве:

- Governance layer: `AGENTS.md`, `SOURCE_OF_TRUTH.md`, `OWNER_REQUIREMENTS.md`, `DMA.md`, `SOP-001-EXECUTE_TASK.md`.
- Decision layer: `DECISIONS.md`.
- Project knowledge layer: `PROJECT.md`, `KNOWLEDGE_BASE.md`.
- Uncertainty layer: `OPEN_QUESTIONS.md`.
- History layer: `SYSTEM_HISTORY.md`, `SITE_HISTORY.md`.
- Editorial layer: `EDITORIAL_SYSTEM/`, само когато задачата засяга блог статии или editorial work.
- Legacy archive layer: `.aios/`, само за исторически контекст.

### Ownership правила

- `Project Owner` одобрява архитектурни промени.
- DMA няма право да променя архитектурата без изрично одобрение.
- Ако липсва информация за архитектурно решение, тя се записва в `OPEN_QUESTIONS.md`.
- Не се създават нови документи, ако съществуващите могат да бъдат разширени.
- Не се дублира един и същ факт в повече от един документ без ясна причина.

### Правила за съдържание

Публичната `d . media Knowledge Base` следва research-first стандарт:

- статии не се пишат по памет;
- всяка статия първо се проучва чрез надеждни първоизточници;
- фактите се проверяват и съпоставят;
- противоречията се отбелязват, вместо да се решават произволно;
- текстът е собствен аналитичен материал, не препис или механична перифраза на документация;
- всяка статия минава през саморедакция, фактологична проверка, езиков одит и терминологична проверка преди `published` статус.

В Knowledge Base v1 се записва само:

- доказуем project факт от репозиторията;
- прието решение от `DECISIONS.md`;
- owner изискване от `OWNER_REQUIREMENTS.md`;
- ясно маркирана неяснота с `Нуждае се от потвърждение.`;
- вътрешен milestone, когато задачата засяга AIOS, Automation, DMA, Editorial System или документационната архитектура.

В Knowledge Base v1 не се записва:

- нова site архитектура без approval;
- blog статия или draft статия;
- публично позициониране, което не е поискано;
- pricing, legal или SEO твърдение без source в репозиторията;
- лична идентичност на Project Owner;
- implementation detail, който принадлежи само в source code.

### Task routing

Когато бъдеща задача засяга Knowledge Base v1:

- project fact се добавя или уточнява в `KNOWLEDGE_BASE.md`;
- кратък project summary се добавя в `PROJECT.md`;
- архитектурно решение се добавя в `DECISIONS.md` само след одобрение;
- неяснота се добавя в `OPEN_QUESTIONS.md`;
- вътрешен milestone се добавя в `SYSTEM_HISTORY.md`;
- production site milestone се добавя в `SITE_HISTORY.md` само ако промяната е публикувана в production.

### Definition of Done

Knowledge Base v1 е завършен за текущия етап, когато:

- има ясно дефинирана документационна архитектура;
- има правила за ownership и approval;
- има място за нерешени въпроси;
- няма писане на blog статии;
- няма промени по production code, конфигурации, assets или site content;
- `npm run validate-docs` минава успешно за documentation-only промяната.

## Обща информация

`d . media` е официалният сайт на дигитално студио в София, България. Репозиторията описва сайт за услуги, проекти, блог, цени, оценка на проект, правни страници, контакт и публична история на сайта.

Официалното изписване на бранда е `d . media`. Основните публични домейни са:

- `https://www.d-media.org`
- `https://d-media.org`

Preview alias според `README.md`:

- `https://preview.d-media-site.pages.dev`

## История на проекта

Според `SITE_HISTORY.md` и `SITE_HISTORY_DAILY.md` първата цялостна версия на сайта е публикувана през март 2026 г.

Доказуеми етапи:

- 2026-03-01: създадена е първата версия със начална страница, проекти, услуги, представяне на студиото, контактна форма и правни страници.
- Март-юни 2026: портфолиото е разширено с подбрани проекти, архивни материали, мокъпи и motion архив.
- Май-юни 2026: услугите са развити в отделни страници, публикувани са начални ценови рамки и е добавена двуезична библиотека със статии.
- 2026-05-29: сайтът е мигриран към Astro.
- 2026-06-02: публикуването е преместено към Cloudflare Pages.
- 2026-06-18: добавени са `Content-Signal` политика и Markdown content negotiation.
- 2026-06-22: добавена е защитена контактна форма със server-side валидация, D1 съхранение, Brevo Transactional Email и Brevo CRM синхронизация.
- 2026-06-23: Project Estimator е разширен с step navigation, scoring, dependency препоръки и автоматичен проектен brief към контактната форма.

`CLOUDFLARE_MIGRATION.md` съдържа миграционни бележки от период, в който production сайтът все още е бил на Next.js до cutover. Текущият root `README.md` описва production сайта като статичен Astro сайт в Cloudflare Pages.

## Архитектура

Текущата production архитектура според root `README.md` е статичен Astro сайт, deploy-нат в Cloudflare Pages.

Официалният production път е:

```text
Astro → astro/dist → Cloudflare Pages → Wrangler deploy
```

Astro е source of truth за текущия production сайт.

Репозиторията съдържа:

- root Next.js структура в `src/`, класифицирана като `Legacy / fallback component`;
- Astro структура в `astro/`;
- shared публични assets в `public/`;
- scripts за assets, QA и Cloudflare validation в `scripts/`.

Astro build-ът използва repository-level `public/` чрез `publicDir: "../public"`. Root scripts в `package.json` извикват Astro команди чрез `npm --prefix astro`.

Next.js/Vercel legacy слоят е окончателно премахнат. Astro е единственият production и development слой на `d . media`.

## Структура на директориите

- `astro/` - текущият Astro сайт.
- `astro/src/pages/` - file-based routes.
- `astro/src/components/` - Astro компоненти.
- `astro/src/layouts/` - shared layout.
- `astro/src/lib/` - structured content, helpers, SEO, i18n, blog, archive data и integration helpers.
- `astro/src/content/legal/` - raw legal text за privacy и terms на BG/EN.
- `astro/src/styles/` - глобални CSS стилове.
- `astro/functions/` - Cloudflare Pages Functions.
- `astro/migrations/` - D1 database migrations.
- `public/` - публични assets, fonts, optimized assets, downloads, Cloudflare `_headers` и `_redirects`, `llms` файлове, favicon и manifest assets.
- `scripts/` - asset generation, markdown generation, QA и validation scripts.
- `src/` - root Next.js app структура.
- `tests/` - Playwright release gate test.
- `.aios/` - вътрешна документационна база за AI operating context.

## Използвани технологии

Доказуеми технологии от `package.json`, `astro/package.json` и конфигурации:

- `Astro`
- `Next.js`
- `React`
- `TypeScript`
- `Tailwind CSS`
- `ESLint`
- `Playwright`
- `sharp`
- `Cloudflare Pages`
- `Wrangler`
- `Cloudflare D1`
- `Cloudflare Turnstile`
- `Brevo Transactional Email`
- `Brevo CRM`

Astro package изисква `node >=22.12.0`.

## Cloudflare

Cloudflare Pages е production deployment target според root `README.md`.

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

Root `README.md` посочва, че Pages проектът е с `Git Provider: No`, тоест Cloudflare Pages не следи Git branch-ове автоматично и се обновява чрез Wrangler deploy.

Deploy scripts:

- `npm run astro:cf:deploy:preview`
- `npm run astro:cf:deploy:production`

Production deploy се изпълнява само след изрично потвърждение.

`Project Owner` е вътрешната роля, която одобрява production deploy, brand identity промени, pricing промени, legal промени и архитектурни промени. Самоличността на `Project Owner` не се публикува в сайта, schema, meta данни, footer или публични страници без изрично указание.

## Astro

Astro приложението е в `astro/`.

`astro/astro.config.mjs` задава:

- `site: "https://www.d-media.org"`
- `output: "static"`
- `trailingSlash: "always"`
- `publicDir: "../public"`

Основни root команди:

- `npm run astro:dev`
- `npm run astro:build`
- `npm run astro:preview`
- `npm run astro:cf:validate`

`npm run astro:build` изпълнява Astro build и след това `scripts/generate-markdown-pages.mjs`.

## SEO

SEO helper-ите са в `astro/src/lib/seo.ts`. Shared SEO output се подава през `astro/src/layouts/Layout.astro`.

Намерени SEO елементи:

- canonical URL;
- meta description;
- optional meta robots;
- `hreflang` за `bg`, `en` и `x-default`;
- Open Graph metadata;
- Twitter card metadata;
- favicon links;
- apple touch icon;
- `manifest.webmanifest`;
- JSON-LD structured data.

Canonical base URL е `https://www.d-media.org`.

## GEO

GEO е представено като услуга и архитектурна тема в съдържанието. В `astro/src/lib/site-content.ts` има услуга `GEO и AI видимост`, описана като съдържание и машинночетими сигнали, които помагат на системите да разбират по-точно бранда.

Репозиторията съдържа GEO/AI search тематични статии и authority съдържание в:

- `astro/src/lib/blog.ts`
- `astro/src/lib/blog-en.ts`
- `astro/src/lib/authority-pages.ts`
- `astro/src/lib/authority-services.ts`
- `astro/src/lib/authority-articles.ts`

Гарантиране на цитиране от външни системи не е заявено като възможност; съдържанието в `authority-services.ts` изрично посочва, че може да се подобри яснотата, достъпността и доказателствата, но изборът на източник остава на съответната система.

## AI Visibility

AI Visibility в този проект е реализирана чрез публична структура за машинно четимо съдържание, а не чрез отделен runtime service.

Намерени елементи:

- `public/llms.txt`
- `public/llms-bg.txt`
- `public/llms-full.txt`
- `robots.txt` с `Content-Signal: search=yes, ai-input=yes, ai-train=no`
- Markdown content negotiation според `scripts/check-ai-readiness.mjs`
- generated markdown pages чрез `scripts/generate-markdown-pages.mjs`
- sitemap, canonical URLs и structured data

Runtime механизъм за Markdown content negotiation:

- `astro/functions/_middleware.js` обработва само `GET` и `HEAD` заявки.
- Заявката трябва да съдържа `Accept: text/markdown` без `q=0`.
- Middleware allowlist-ът съдържа 20 route-а: `/`, `/about/`, `/services/`, `/contact/`, `/blog/`, service routes, `/case-studies/` и избрани project routes.
- `scripts/generate-markdown-pages.mjs` генерира Markdown файлове в `astro/dist/markdown-pages/` след Astro build.
- Middleware-ът зарежда съответния generated Markdown asset от `/markdown-pages/*.md`.
- Markdown response headers включват `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`, `Content-Signal: search=yes, ai-input=yes, ai-train=no` и `X-Robots-Tag: noindex`.
- HTML response остава default при нормален `Accept: text/html`.
- `robots.txt` забранява `/markdown-pages/` и публикува `Content-Signal`.
- `llms.txt`, `llms-bg.txt` и `llms-full.txt` са публичните AI-readable index files.
- `scripts/check-ai-readiness.mjs` валидира Markdown response, HTML fallback, `robots.txt` Content-Signal и canonical links в `llms.txt`.

## Schema

Schema helper-ите са в `astro/src/lib/seo.ts`.

Намерени structured data типове:

- `Organization`
- `ProfessionalService`
- `WebSite`
- `WebPage`
- `BreadcrumbList`
- `CreativeWork`
- `OfferCatalog`
- `Service`

`Layout.astro` винаги добавя organization, website и webpage schema и приема допълнителни `structuredData` items от страниците.

## Sitemap

Sitemap се генерира от `astro/src/pages/sitemap.xml.ts`.

Включва:

- base routes;
- услуги;
- authority service routes;
- authority pages;
- blog posts;
- project archive routes;
- operational policy routes;
- site history routes.

Sitemap entries имат `loc`, optional `lastmod`, `changefreq` и `priority`.

## robots.txt

`robots.txt` се генерира от `astro/src/pages/robots.txt.ts`.

Съдържание:

- `User-agent: *`
- `Allow: /`
- `Disallow: /markdown-pages/`
- `Content-Signal: search=yes, ai-input=yes, ai-train=no`
- `Sitemap: https://www.d-media.org/sitemap.xml`

## llms.txt

Публичните AI-readable файлове са в `public/`:

- `llms.txt`
- `llms-bg.txt`
- `llms-full.txt`

`llms.txt` съдържа английско кратко представяне с връзки към основни публични страници, услуги, knowledge base, legal links, pricing и sitemap. `llms-bg.txt` съдържа българско описание на сайта, услуги, методология, блог, аудитория, контакт и социални профили.

`scripts/check-ai-readiness.mjs` проверява:

- Markdown response за `/`;
- `Content-Type` за markdown и HTML;
- `Vary: Accept`;
- canonical URL в markdown response;
- `Content-Signal` в `robots.txt`;
- структура и canonical links в `llms.txt`.

## Компоненти

Astro компонентите в `astro/src/components/` включват:

- `AuthorityPage.astro`
- `BrandAsset.astro`
- `BrandText.astro`
- `InquiryForm.astro`
- `LegalSourceText.astro`
- `MotionArchiveSections.astro`
- `OperationalPolicyPage.astro`
- `ProjectCard.astro`
- `ProjectEstimator.astro`
- `ServiceDetailPage.astro`

`InquiryForm.astro` изпраща към `/api/contact`. `ProjectEstimator.astro` генерира проектен brief и параметри за контактната форма. `BrandAsset.astro` се използва за brand assets в layout и страници.

## Layout-и

Основният layout е `astro/src/layouts/Layout.astro`.

Той отговаря за:

- import на `astro/src/styles/globals.css`;
- HTML shell;
- head metadata;
- canonical и alternate links;
- schema scripts;
- theme initialization;
- header;
- navigation;
- locale switcher;
- mobile menu;
- consent banner;
- footer.

Други layout файлове не са открити в `astro/src/layouts/`.

## Страници

Основните Astro страници са във `astro/src/pages/`.

Доказуеми route групи:

- home: `/`, `/en/`
- services: `/services/`, `/en/services/`, detail service routes
- projects: `/projects/`, `/en/projects/`, `/projects/[slug]/`, `/en/projects/[slug]/`
- pricing: `/pricing/`, `/en/pricing/`
- estimator: `/estimator/`, `/en/estimator/`
- blog: `/blog/`, `/en/blog/`, `/blog/[slug]/`, `/en/blog/[slug]/`
- case studies: `/case-studies/`, `/en/case-studies/`
- about: `/about/`, `/en/about/`
- contact: `/contact/`, `/en/contact/`
- terms: `/terms/`, `/en/terms/`
- privacy: `/privacy/`, `/en/privacy/`
- legal policies: `/legal/policies/`, `/en/legal/policies/`, individual policy routes
- site history: `/site-history/`, `/site-history/daily/`, `/en/site-history/`, `/en/site-history/daily/`
- SEO files: `/robots.txt`, `/sitemap.xml`, `/manifest.webmanifest`
- fallback: `404.astro`
- dynamic authority routes: `[authority].astro`, `en/[authority].astro`

## Блог

Блог съдържанието е в:

- `astro/src/lib/blog.ts`
- `astro/src/lib/blog-en.ts`

Има BG и EN блог архитектура, category filters, related posts и отделени draft routes. Темите включват бранд идентичност, дизайн, съдържание, social media, web development, performance, SEO, GEO и AI search.

Draft съдържанието е отделено от публичните страници според `SITE_HISTORY_DAILY.md`.

## Услуги

Услугите са дефинирани основно в `astro/src/lib/site-content.ts`, `astro/src/lib/page-copy.ts` и отделни service routes.

Доказуеми услуги:

- Бранд идентичност / Brand Identity
- Създаване на съдържание / Content Creation
- Управление на социални медии / Social Media Management
- Уеб дизайн и разработка / Web Design and Development
- Техническо SEO / Technical SEO
- GEO и AI видимост / GEO and AI Visibility
- Оптимизация на скоростта / Performance Optimization
- Техническа поддръжка / Technical Support
- Графичен дизайн / Graphic Design
- Реклама / Advertising
- Допълнителни начисления и права / Additional Charges and Rights

Някои service routes са конкретни files, а други се генерират чрез authority service slugs.

## Проекти

Проектните данни са в:

- `astro/src/lib/project-png-archive.ts`
- `astro/src/lib/legacy-project-archive.ts`
- `astro/src/lib/featured-projects-static.ts`
- `astro/src/lib/d-media-motion-archive.ts`
- `astro/src/lib/main-project-assets.ts`
- `astro/src/lib/old-flyer-assets.ts`

`README.md` посочва orientation-aware gallery rendering за legacy sections:

- `legacy-mockup-card-portrait`
- `legacy-mockup-card-landscape`

Проверени legacy секции според `README.md`:

- `Колекция от мокъпи на флаери за клубни събития`
- `Колекция от мокъпи на част от проектите`
- `Архив флаери`

## Контактна форма

Контактната форма е реализирана чрез:

- `astro/src/components/InquiryForm.astro`
- `astro/functions/api/contact.ts`
- `astro/src/lib/contact-inquiry.ts`
- `astro/src/lib/contact-email-templates.ts`
- `astro/src/lib/brevo-contacts.ts`

Формата използва:

- server-side валидация;
- honeypot поле;
- `Cloudflare Turnstile`;
- GDPR consent;
- rate limiting по IP чрез D1;
- D1 запис на запитване;
- Brevo Transactional Email;
- Brevo CRM sync;
- BG/EN error messages.

Според `SITE_HISTORY_DAILY.md` contact flow е потвърден в production на 2026-06-22.

## База данни

D1 binding:

- `d_media_inquiries`

Дефиниран е в `astro/wrangler.toml`.

Migration:

- `astro/migrations/0001_create_inquiries.sql`

Таблица:

- `inquiries`

Колони:

- `id`
- `created_at`
- `status`
- `name`
- `email`
- `company`
- `service`
- `budget`
- `deadline`
- `website`
- `message`
- `additional_information`
- `ip_address`
- `ip_country`
- `user_agent`
- `gdpr_consent`
- `turnstile_valid`

Indexes:

- `idx_inquiries_created_at`
- `idx_inquiries_ip_created_at`

## API

Реален API inventory:

- `astro/functions/api/contact.ts`
- `src/app/api/social-preview/route.tsx`

Текущият Astro/Cloudflare production endpoint е:

- `/api/contact`

`/api/contact` е Cloudflare Pages Function.

Метод:

- `POST`

Функцията:

- приема `FormData`;
- валидира задължителни полета;
- валидира email;
- валидира service и budget;
- изисква GDPR consent;
- проверява `Cloudflare Turnstile`;
- проверява rate limit;
- записва запитването в D1;
- синхронизира контакт към Brevo CRM;
- изпраща вътрешен email и confirmation email;
- обновява D1 status след изпратени email-и.

Root Next.js endpoint:

- `/api/social-preview`

`/api/social-preview` се имплементира от `src/app/api/social-preview/route.tsx`. Той е legacy/helper route, не е част от текущия Astro/Cloudflare production path и няма доказателство да се използва от текущия Astro production сайт.

Други API routes не са открити при проверка в `astro/functions/`, `astro/src/pages/api/`, root `src/pages/api/` и root `src/app/api/`.

## Производителност

Root `README.md` посочва PageSpeed Insights резултати `100` за:

- Mobile Performance
- Desktop Performance
- Accessibility
- Best Practices
- SEO за indexable production URL-ите

Performance решения, доказуеми от документацията:

- статичен Astro build;
- Cloudflare Pages;
- локални assets от `public/`;
- WebP derivatives за browser-facing project assets;
- bounded display-size WebP brand assets;
- Panton subset `woff2` fonts;
- cache правила в `public/_headers`;
- липса на Vercel runtime и Metricool references в Astro output според validation script.

`README.md` посочва, че performance score може да флуктуира между `99` и `100` заради Lighthouse/PSI variance.

## Accessibility

Доказуеми accessibility елементи:

- `README.md` посочва Accessibility score `100` след performance pass.
- `Layout.astro` използва `aria-label`, `aria-current`, `aria-expanded`, `aria-controls` и semantic `nav`, `header`, `footer`.
- Consent banner използва `role="dialog"` и `aria-live="polite"`.
- Mobile menu има toggle button с open/close labels.
- `SITE_HISTORY_DAILY.md` посочва подобрена достъпност на footer link към историята, увеличен touch target и подобрен contrast.

Пълен accessibility audit report: Нуждае се от потвърждение.

## Видео съдържание

Доказуеми video surfaces:

- `astro/src/components/MotionArchiveSections.astro`
- `astro/src/pages/projects/[slug].astro`
- `astro/src/pages/en/projects/[slug].astro`

Thumbnail/poster policy:

- Всяко native `<video>` в текущия Astro production сайт трябва да има `poster`.
- Всяка embedded video/card употреба трябва да има thumbnail image.
- Ако липсва thumbnail asset, се документира нужда от asset; не се измисля изображение.
- AI-generated thumbnails не се използват без изрично разрешение.
- Визуалният стил на video cards не се променя само заради thumbnail поддръжка.

Текущо състояние:

- Motion archive има 155 video записа и 155 poster записа в `astro/src/lib/d-media-motion-archive.ts`.
- `MotionArchiveSections.astro` рендерира `poster={item.poster}`.
- Project detail video записите в `astro/src/lib/project-png-archive.ts` имат `poster` стойности, използващи съществуващи project cover assets.
- Project detail routes подават `poster={video.poster}` към native `<video>`.

## Design System

Design system данни от repository:

- официално име: `d . media`;
- brand font: `Panton`;
- Panton subset fonts са в `public/fonts/panton-subset/`;
- глобалният CSS е `astro/src/styles/globals.css`;
- brand assets включват logotype и brandmark;
- layout използва `BrandAsset.astro` за логотип в header;
- сайтът поддържа light/dark theme чрез `data-theme` и `data-theme-mode`;
- theme preference се пази в `localStorage` с ключ `d-media-theme-mode`.

Root `README.md` казва:

- брандът винаги се изписва като `d . media`;
- използва се само `Panton`;
- визуалната идентичност не се променя без изрична задача.

## Responsive поведение

Доказуеми responsive елементи:

- `Layout.astro` има desktop navigation и mobile panel.
- Има mobile menu toggle с `aria-expanded` и `aria-controls`.
- `SITE_HISTORY_DAILY.md` посочва подобрения за mobile spacing, Safari и iPhone.
- `README.md` посочва WebKit iPhone stress scenario като част от release checklist.
- Project galleries имат orientation-aware rendering за portrait и landscape legacy mockups.
- Project lightbox е проверен за portrait изображения според `README.md`.

Пълна responsive спецификация: Нуждае се от потвърждение.

## Известни ограничения

Доказуеми ограничения:

- Cloudflare Pages проектът е с `Git Provider: No`; deploy се прави чрез Wrangler.
- Source originals не се deploy-ват и се пазят извън deploy tree.
- Cloudflare Pages build-ът използва локални файлове от `public/` и генериран WebP manifest.
- Няма външен asset storage fallback според `README.md`.
- Featured projects, announcement и home section visibility използват кодови fallback стойности без външен runtime config service.
- Production deploy изисква изрично потвърждение.
- Root Next.js е legacy/fallback component, не текущ production път.

## Известни технически дългове

Доказуеми технически дългове:

- В репозиторията едновременно присъстват root Next.js legacy/fallback app и текущ Astro production app.
- Има миграционни документи с историческо твърдение, че production остава Next.js до cutover, докато root `README.md` вече посочва Astro/Cloudflare като production.
- Конкретният бъдещ lifecycle на root Next.js legacy/fallback app не е документиран.

Други технически дългове: Нуждае се от потвърждение.

## Решения, които не трябва да бъдат променяни

Решения, доказуеми от репозиторията и документацията:

- Брандът се изписва като `d . media`.
- Използва се `Panton`.
- Production сайтът е статичен Astro сайт в Cloudflare Pages.
- Astro е source of truth за текущия production сайт.
- Production пътят е `Astro → astro/dist → Cloudflare Pages → Wrangler deploy`.
- Root Next.js е legacy/fallback component, не production source of truth.
- `src/app/api/social-preview/route.tsx` е legacy/helper route и не е част от текущия Astro/Cloudflare production path.
- Astro config използва `output: "static"`.
- Canonical base URL е `https://www.d-media.org`.
- Routes използват trailing slash.
- BG е default locale; EN е под `/en/`.
- Astro използва root `public/` чрез `publicDir: "../public"`.
- `public/_headers` и `public/_redirects` управляват Cloudflare static headers и redirects.
- `robots.txt` съдържа `Content-Signal: search=yes, ai-input=yes, ai-train=no`.
- Всяко video съдържание в Astro production слоя трябва да има poster/thumbnail.
- Production deploy не се изпълнява без изрично потвърждение.
- `Project Owner` остава вътрешна роля и не се публикува като лично име.
- Source originals не се deploy-ват.
- Няма външен asset storage fallback за Cloudflare Pages build-а.

## Нуждаещо се от човешко потвърждение

- Пълна responsive спецификация.
- Пълен accessibility audit report.
- Други технически дългове извън доказуемите в текущите документи и код.
