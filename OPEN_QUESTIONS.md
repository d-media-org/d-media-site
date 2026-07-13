# OPEN_QUESTIONS.md

Този документ пази както текущите open въпроси, така и историята на resolved въпросите.

Активните нерешени въпроси са само в секцията `Open`.

Решените въпроси са само исторически контекст и не трябва да се третират като блокиращи.

## Open

## Q-008 — Future lifecycle на Knowledge Base v1

Status: Open
Priority: Medium
Area: Documentation Architecture

### Въпрос

Трябва ли `d . media Knowledge Base v1` да остане само root documentation layer, или в бъдеще да получи отделна директория, templates или machine-readable structure?

### Защо е важно

Това е архитектурно решение за документационния слой. Без approval не трябва да се създава нова директория, паралелен framework или втори Source of Truth.

### Какво е известно

Текущата задача изисква първо да се изгради архитектурата, стандартите и документацията, без писане на статии. `DEC-012` приема Knowledge Base v1 като разширение на съществуващата root документационна архитектура.

### Какво трябва да се потвърди

Дали бъдеща версия трябва да добави отделна структура извън root документите.

### Решение

Нуждае се от потвърждение.

## Q-009 — Machine-readable Knowledge Base format

Status: Open
Priority: Low
Area: Documentation Architecture

### Въпрос

Нужен ли е machine-readable формат за Knowledge Base v1, например JSON/YAML index, или Markdown документите остават достатъчни?

### Защо е важно

Machine-readable формат би бил нов документационен artifact и може да изисква validation правила. Това не трябва да се добавя без explicit архитектурно одобрение.

### Какво е известно

Текущата документационна архитектура използва Markdown root документи и `npm run validate-docs`.

### Какво трябва да се потвърди

Дали има реална нужда от machine-readable index и какъв трябва да бъде неговият source of truth.

### Решение

Нуждае се от потвърждение.

## Q-005 — Пълна responsive спецификация

Status: Open
Priority: Medium
Area: Responsive

### Въпрос

Има ли пълна responsive спецификация за сайта?

### Защо е важно

Сайтът има mobile navigation, orientation-aware project galleries, WebKit/iPhone QA сценарии и responsive поведение на Project Estimator и contact flow. Пълна спецификация би намалила риска от визуални регресии.

### Какво е известно

`README.md` включва WebKit iPhone stress scenario в release checklist. `SITE_HISTORY_DAILY.md` документира подобрения за mobile spacing, Safari, iPhone, estimator contact flow и gallery поведение. `Layout.astro` съдържа desktop navigation и mobile panel.

### Какво трябва да се потвърди

Поддържаните breakpoints, задължителните viewport-и за QA, очакваното поведение на navigation, galleries, estimator, forms и legal/content страници.

### Решение

Нуждае се от потвърждение.

## Q-006 — Пълен accessibility audit report

Status: Open
Priority: Medium
Area: Accessibility

### Въпрос

Има ли пълен accessibility audit report за сайта?

### Защо е важно

Accessibility е част от текущия QA baseline. Пълен audit report би уточнил какво е проверено, кои routes са покрити и кои accessibility изисквания са задължителни при бъдещи промени.

### Какво е известно

Root `README.md` посочва PageSpeed Insights Accessibility score `100`. `Layout.astro` използва semantic structure и ARIA attributes. `SITE_HISTORY_DAILY.md` документира подобрена достъпност на footer link към историята, touch target и contrast.

### Какво трябва да се потвърди

Дали има пълен accessibility audit report, кои страници и компоненти покрива и какви критерии трябва да се спазват при промени.

### Решение

Нуждае се от потвърждение.

## Q-007 — Други технически дългове

Status: Open
Priority: Low
Area: Technical Debt

### Въпрос

Има ли други технически дългове извън доказуемите в текущите документи и код?

### Защо е важно

Недокументираният технически дълг може да доведе до неправилни промени, непълни QA проверки или грешни архитектурни решения.

### Какво е известно

Доказуеми технически дългове са едновременното присъствие на root Next.js app и Astro app, както и историческите миграционни документи, които трябва да се четат спрямо текущия root `README.md`. Други технически дългове не са потвърдени.

### Какво трябва да се потвърди

Дали има известни, но недокументирани технически дългове, които трябва да бъдат добавени към project knowledge base.

### Решение

Нуждае се от потвърждение.

## Resolved

## Q-010 — Public Knowledge Base content architecture

Status: Resolved
Priority: High
Area: Documentation Architecture / Content Architecture
Resolution: `DEC-013` accepts `d . media Knowledge Base` as the official public content layer. `DEC-012` is superseded for this architecture.

### Въпрос

Трябва ли официалната `d . media Knowledge Base` да стане публичен content layer с Master Content Plan, категории, клъстери, pillar страници и 100+ publication-ready статии, или `Knowledge Base v1` остава само вътрешен root documentation layer според `DEC-012`?

### Защо е важно

Това е архитектурно решение. Предишните source-of-truth документи приемаха `Knowledge Base v1` като вътрешен документационен слой, който не създава нов production, content или editorial layer. Новата задача изисква пълна публична база знания със статии, вътрешни връзки, индекси и QA.

### Какво е известно

Project Owner разреши архитектурния конфликт за текущата задача. `DEC-013` приема Knowledge Base като официален публичен content layer на `d . media`.

### Какво трябва да се потвърди

Няма оставащо потвърждение за принципното архитектурно решение. Детайлите по изпълнението трябва да следват `DEC-013`, Astro/Cloudflare production архитектурата и editorial стандартите.

### Решение

Resolved by `DEC-013`.

## Q-001 — Роля на root Next.js приложението

Status: Resolved
Priority: High
Area: Architecture
Resolution: Root Next.js is classified as a legacy/fallback component. Current production path is Astro → astro/dist → Cloudflare Pages → Wrangler deploy.

### Въпрос

Каква е текущата роля на root Next.js приложението след Astro/Cloudflare production cutover?

### Защо е важно

Репозиторията съдържа едновременно root Next.js структура и Astro структура. Ясната роля на Next.js приложението е важна за поддръжка, QA, build процеси, технически дълг и бъдещи промени.

### Какво е известно

Next.js/Vercel legacy слоят е окончателно премахнат. Текущият production път е Astro → Cloudflare Pages.

### Какво трябва да се потвърди

Няма оставащо потвърждение за текущата production роля. Бъдещият lifecycle на legacy/fallback слоя може да се реши в отделна задача.

### Решение

Root Next.js is classified as a legacy/fallback component. Current production path is Astro → astro/dist → Cloudflare Pages → Wrangler deploy.

`src/app/api/social-preview/route.tsx` is classified as a legacy/helper route, not part of the current Astro/Cloudflare production path.

## Q-002 — Собственик на approvals

Status: Resolved
Priority: High
Area: Ownership
Resolution: Approval authority is documented as the internal `Project Owner` role. Personal identity must not be published or required in AIOS documents.

### Въпрос

Коя роля одобрява production deploy, brand промени, legal промени и pricing промени?

### Защо е важно

Тези промени имат висок риск за production сайта, бранда, правните условия и публичната ценова рамка. Нужна е ясна approving роля, за да няма неоторизирани промени.

### Какво е известно

`OWNER_REQUIREMENTS.md` документира, че `Project Owner` взема окончателните решения за production deploy, brand identity, pricing, legal документи и архитектурни промени. `Project Owner` е вътрешна роля и самоличността не се публикува.

### Какво трябва да се потвърди

Няма оставащо потвърждение за approving ролята. Лично име не трябва да се документира или публикува без изрично указание.

### Решение

Approval authority е `Project Owner`. Самоличността на `Project Owner` остава вътрешна и не се публикува в сайта, schema, meta данни, footer или публични страници.

## Q-003 — Runtime механизъм за Markdown content negotiation

Status: Resolved
Priority: Medium
Area: SEO
Resolution: Markdown content negotiation is handled by `astro/functions/_middleware.js` for allowlisted routes with `Accept: text/markdown`; Markdown files are generated into `astro/dist/markdown-pages/` by `scripts/generate-markdown-pages.mjs`.

### Въпрос

Какъв е пълният runtime механизъм за Markdown content negotiation?

### Защо е важно

Markdown content negotiation е част от AI Visibility и machine-readable слоя. Трябва да е ясно къде се обработва `Accept: text/markdown`, как се генерира съдържанието и кои routes го поддържат.

### Какво е известно

`astro/functions/_middleware.js` обработва `GET` и `HEAD` заявки с `Accept: text/markdown`, проверява allowlist от 20 route-а и връща generated Markdown asset от `/markdown-pages/*.md`. `scripts/generate-markdown-pages.mjs` създава тези Markdown файлове в `astro/dist/markdown-pages/` след Astro build. Markdown response headers включват `Content-Type: text/markdown; charset=utf-8`, `Vary: Accept`, `Content-Signal: search=yes, ai-input=yes, ai-train=no` и `X-Robots-Tag: noindex`.

### Какво трябва да се потвърди

Няма оставащо потвърждение за runtime механизма, доказуем от репозиторията. Live behavior трябва да се проверява при deploy или preview QA.

### Решение

Markdown content negotiation се обработва от `astro/functions/_middleware.js` за allowlisted route-ове. Markdown страниците се генерират от `scripts/generate-markdown-pages.mjs` в `astro/dist/markdown-pages/`.

## Q-004 — API routes извън /api/contact

Status: Resolved
Priority: Medium
Area: API
Resolution: Current Astro/Cloudflare API inventory contains `/api/contact`; root Next.js also contains legacy/helper `/api/social-preview`, outside the current Astro/Cloudflare production path.

### Въпрос

Има ли други API routes извън `/api/contact`?

### Защо е важно

API routes влияят върху deployment модела, Cloudflare bindings, secrets, security review, QA и runtime dependencies.

### Какво е известно

Открита е Cloudflare Pages Function `astro/functions/api/contact.ts`, която обслужва `/api/contact`. Тя използва D1, Turnstile, Brevo Transactional Email и Brevo CRM sync.

Открит е root Next.js route `src/app/api/social-preview/route.tsx`, който обслужва `/api/social-preview`, но е класифициран като legacy/helper route и не е част от текущия Astro/Cloudflare production path.

Други API routes не са открити при проверка в `astro/functions/`, `astro/src/pages/api/`, root `src/pages/api/` и root `src/app/api/`.

### Какво трябва да се потвърди

Няма оставащо потвърждение за API routes, доказуеми от репозиторията. Външни routes извън репозиторията биха изисквали Cloudflare dashboard или production environment проверка.

### Решение

Текущият Astro/Cloudflare production API endpoint е `/api/contact`. Root Next.js `/api/social-preview` е legacy/helper route извън текущия production path. Други API routes не са открити в репозиторията.
