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

Root Next.js слой е окончателно премахнат.

### Причина

Текущият production path е `Astro → astro/dist → Cloudflare Pages → Wrangler deploy`, а Next.js/Vercel слой не се използва.

### Алтернативи

Премахване на root Next.js или връщането му като production path.

### Последствия

Feature work за production сайта се прави в Astro слоя.

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

## DEC-011

### Решение

AIOS 1.0 Documentation Architecture Freeze е приет.

### Причина

Документационната архитектура вече има explicit Source of Truth карта в `SOURCE_OF_TRUTH.md`, отделена production история в `SITE_HISTORY.md`, отделена системна история в `SYSTEM_HISTORY.md`, активен decisions документ в `DECISIONS.md` и legacy класификация за `.aios/`.

### Алтернативи

Продължаване с паралелни source-of-truth документи, оставяне на `.aios/` като активен слой или създаване на нови документи без централен ownership модел.

### Последствия

Документационната архитектура се счита за стабилна. Нови документи се добавят само при доказана необходимост. Първо се предпочита разширяване на съществуващи документи. Всяка бъдеща промяна по документационната архитектура трябва да бъде отразена в `DECISIONS.md` и `SYSTEM_HISTORY.md`.

### Статус

Accepted

## DEC-012

### Решение

`d . media Knowledge Base v1` използва съществуващата root документационна архитектура и не създава нов production, content или editorial слой.

### Причина

`SOURCE_OF_TRUTH.md` вече дефинира активните Source of Truth документи, `.aios/` е legacy archive, а `OWNER_REQUIREMENTS.md` изисква да не се създават нови документи или паралелни механизми, когато съществуващите могат да бъдат разширени.

### Алтернативи

Създаване на отделна директория или нов паралелен knowledge-base framework.

### Последствия

Knowledge Base v1 се поддържа чрез `SOURCE_OF_TRUTH.md`, `PROJECT.md`, `KNOWLEDGE_BASE.md`, `OPEN_QUESTIONS.md`, `DECISIONS.md`, `SYSTEM_HISTORY.md` и `SOP-001-EXECUTE_TASK.md`. Архитектурни промени се записват в `DECISIONS.md` само след approval от `Project Owner`; неяснотите се записват в `OPEN_QUESTIONS.md`.

### Статус

Superseded by `DEC-013`

## DEC-013

### Решение

`d . media Knowledge Base` става официалният публичен content layer на `d . media`.

### Причина

Project Owner разреши архитектурния конфликт `Q-010` и изрично промени ролята на Knowledge Base за текущата задача. Knowledge Base вече не се разглежда като само вътрешен documentation layer. `DEC-012` остава исторически запис за предишното състояние, но вече не ограничава изграждането на публична Knowledge Base.

### Алтернативи

Запазване на Knowledge Base само като root documentation layer според `DEC-012`.

### Последствия

Knowledge Base може да има публична Astro content архитектура, Master Content Plan, категории, клъстери, pillar статии, supporting статии, вътрешни връзки, sitemap участие, schema и QA проверки. Публичното съдържание трябва да следва editorial стандартите, owner ограниченията, Astro/Cloudflare production архитектурата и правилата срещу недоказуеми твърдения.

### Статус

Accepted

## DEC-014

### Решение

Страниците „Начални рамки“ (`/pricing/` и `/en/pricing/`) представят цените в информационен ред: обяснение на началните рамки, основни и по-големи обхвати, единични позиции, права и работни условия, после въпроси и следваща стъпка.

### Причина

Одобрено е единичните позиции да не задават първото ценово впечатление и да се разграничават ясно от основните услуги, правата и допълнителните условия.

### Последствия

CTA води към контакт и не обещава конкретна цена, срок или автоматична оферта. Пренареждането променя само информационната йерархия; всички съществуващи цени, права, условия и URL адреси се запазват. Самите стойности остават в source кода на ценовите страници.

### Статус

Accepted

## DEC-015

### Решение

Каталогът „Услуги“ представя предложенията в четири основни групи: „Бранд и дизайн“, „Съдържание и комуникация“, „Уеб“ и „Видимост и поддръжка“. Основните услуги се показват на водещо ниво, а подуслугите и специализациите са подчинени на съответната група. „Допълнителни начисления и права“ се представя отделно като помощна информация за обхват, права и условия.

### Причина

Одобрено е услугите да се разбират чрез ясна информационна йерархия, без каталогът да представя всички позиции като равностойни основни услуги.

### Последствия

Съществуващите маршрути и URL адреси се запазват. Промяната е само в информационната йерархия на каталога; тя не променя услугите или цените.

### Статус

Accepted
