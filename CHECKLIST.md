# CHECKLIST.md

## Преди започване

- Разбирам ли задачата напълно?
- Ако не, зададох ли един кратък въпрос?
- Ясен ли е разрешеният обхват?
- Ясно ли е кои файлове могат да бъдат редактирани?
- Прочетени ли са задължителните инструкции: `AGENTS.md`, `SOURCE_OF_TRUTH.md`, `DMA.md`, `OWNER_REQUIREMENTS.md`, `CHECKLIST.md`, `PROJECT.md`, `KNOWLEDGE_BASE.md`, `OPEN_QUESTIONS.md`, `DECISIONS.md`, `SITE_HISTORY.md`, `SOP-001-EXECUTE_TASK.md`?
- Ако задачата засяга блог статии, прочетен ли е `EDITORIAL_SYSTEM/README.md` и релевантните editorial документи?
- Ако задачата засяга AIOS, Automation, DMA, Editorial System или документационната архитектура, прочетен ли е `SYSTEM_HISTORY.md`?
- Има ли забранени зони: source code, Astro компоненти, TypeScript, CSS, `public`, package файлове, конфигурации, CI/CD, assets?
- Може ли задачата да се реши с по-малко промени?
- Добавям ли нещо, което не е поискано?

## Преди приключване

- Променени ли са само разрешените файлове?
- Няма ли странични подобрения?
- Няма ли измислена или непотвърдена информация?
- Ако има непотвърдена информация, маркирана ли е с `Нуждае се от потвърждение.`?
- Ако задачата засяга сайта, изпълнени ли са релевантните проверки?
- Ако задачата е документационна, изпълнен ли е `npm run validate-docs` или еквивалентната налична проверка?
- Проверен ли е `git status --short`?
- Финалният отчет съдържа ли секциите, поискани от задачата?
## Automation Decision Matrix

Тази матрица е Source of Truth за избор на проверки. DMA не избира npm команди по навик. Когато промптът казва „Изпълни всички проверки, изисквани от AIOS и Automation 2.0 според типа на задачата“, това означава: класифицирай задачата и текущите промени по тази матрица.

`npm run smart-qa` трябва да следва тази матрица и да изпълнява минимално необходимите проверки. `npm run release` не е задължителен финал за всяка задача.

Матрицата определя:

- типа задача;
- необходимите проверки;
- необходимия Preview;
- необходимото ниво на QA;
- дали задачата може да достигне `Ready for Production Review`.

## Preview Validation Policy

Preview Validation Policy определя кога автоматичните проверки не са достатъчни и е нужен реален визуален преглед.

Основни правила:

- Build, lint и automation checks не доказват сами, че визуалното поведение е правилно.
- Production Deploy никога не се използва като средство за QA.
- Production Deploy се прави само след успешни проверки и изрично одобрение от Project Owner.
- Cloudflare Preview Deploy се използва само когато локалният preview не може да докаже Cloudflare runtime поведение.
- Когато матрицата изисква Preview Validation, задачата остава `Pending Review` до успешен локален визуален преглед.

Preview нива:

- `Level 0 — No Preview Required`: не се стартира preview и не се изпълнява browser QA.
- `Level 1 — Local Preview Required`: стартира се локален Astro Preview и се прави ръчен визуален преглед.
- `Level 2 — Local Preview + Browser QA`: стартира се локален preview, изпълнява се browser QA и се прави ръчен визуален преглед.
- `Level 3 — Cloudflare Preview Required`: нужен е Cloudflare Preview Deploy за runtime поведение, което не може да се докаже локално.
- `Level 4 — Ready for Production Review`: всички изисквани проверки са минали и остава Project Owner approval; това не е deploy approval.

### Documentation-only

- Разпознаване: редактирани са само Markdown документи извън публично blog content и извън site renderer/source файлове.
- Типични файлове: `AGENTS.md`, `DMA.md`, `OWNER_REQUIREMENTS.md`, `CHECKLIST.md`, `PROJECT.md`, `KNOWLEDGE_BASE.md`, `OPEN_QUESTIONS.md`, `DECISIONS.md`, `SOURCE_OF_TRUTH.md`, `SYSTEM_HISTORY.md`, `SITE_HISTORY.md`, `SOP-001-EXECUTE_TASK.md`, `.aios/**/*.md`, `README.md`.
- Задължителни проверки: преглед на diff-а, `npm run validate-docs`, `git status --short`.
- Необходимо ниво на QA: documentation validation.
- Не се изпълняват: `browser-qa`, `seo-check`, `regression`, `release`.
- Preview Validation: `Level 0 — No Preview Required`.
- Завършена е, когато: `validate-docs` минава успешно, diff-ът е само в разрешения документационен обхват и няма open manual approval извън задачата.

### Research / Outline

- Разпознаване: няма редакция на статия; изпълнява се Research, Evidence Map, Outline или Review.
- Типични файлове: без файлови промени или само вътрешна документация, ако задачата го разрешава.
- Задължителни проверки: editorial checklist review; `npm run validate-docs` само ако има документационна промяна; `git status --short`.
- Необходимо ниво на QA: editorial validation.
- Не се изпълняват: `qa`, `browser-qa`, `seo-check`, `regression`, `release`.
- Preview Validation: `Level 0 — No Preview Required`.
- Завършена е, когато: изискваните editorial фази за Research/Outline са изпълнени и Project Owner знае какво трябва да одобри.

### Editorial System

- Разпознаване: промени по editorial правила, templates, review критерии или `EDITORIAL_SYSTEM/`.
- Типични файлове: `EDITORIAL_SYSTEM/**/*.md`, `OWNER_REQUIREMENTS.md` само при owner content правило.
- Задължителни проверки: `npm run validate-docs`, проверка за недублиране спрямо `OWNER_REQUIREMENTS.md`, `git status --short`.
- Необходимо ниво на QA: documentation validation.
- Не се изпълняват: `browser-qa`, `seo-check`, `regression`, `release`.
- Preview Validation: `Level 0 — No Preview Required`.
- Завършена е, когато: `validate-docs` минава успешно и `EDITORIAL_SYSTEM/README.md` остава входна точка.

### Blog Writing

- Разпознаване: създава се или пренаписва една блог статия.
- Типични файлове: `astro/src/lib/blog.ts`, `astro/src/lib/blog-en.ts` или друга blog content структура.
- Задължителни проверки: editorial review, `npm run smart-qa`; ако статията е production content промяна, `qa` и `seo-check` са задължителни.
- Необходимо ниво на QA: content, SEO/GEO и visual reading review.
- Не се изпълняват: `release`, освен при release candidate или изрично production readiness.
- `npm run release`: изпълнява се само при publish/release candidate, commit/push request или когато задачата иска production readiness.
- Достатъчно е само `npm run validate-docs`: не.
- Preview Validation: `Level 1 — Local Preview Required` след приключване на Writing.
- Ръчен визуален преглед: desktop, tablet, mobile, CTA, FAQ, таблици, callout-и, изображения, вътрешни връзки, четимост и визуален ритъм.
- Завършена е, когато: editorial review е PASS, автоматичните проверки са успешни и локалният визуален преглед е минал.

### Blog Content Update

- Разпознаване: редакция на съществуващо публично blog content, metadata, internal links или CTA.
- Типични файлове: `astro/src/lib/blog.ts`, `astro/src/lib/blog-en.ts`, blog page data.
- Задължителни проверки: `npm run smart-qa`; минимално `qa` и `seo-check`.
- Необходимо ниво на QA: content, SEO/GEO и preview според визуалния риск.
- Не се изпълняват: `browser-qa`, освен ако промяната влияе на visual structure, media, long tables, video или route behavior.
- `npm run release`: само при release candidate или изрично readiness искане.
- `seo-check`: задължителен, ако са променени title, description, canonical, internal links, schema-visible content, GEO или AI visibility твърдения.
- Preview Validation: `Level 1 — Local Preview Required` при съществена промяна на публичния текст, визуална структура, CTA, FAQ, таблици, callout-и или media.
- Завършена е, когато: content/editorial review и нужният preview са минали.

### Blog Renderer

- Разпознаване: промени по renderer logic, blog data model, article rendering, featured article или blog index поведение.
- Типични файлове: `astro/src/lib/blog.ts`, `astro/src/lib/blog-en.ts`, `astro/src/pages/blog/**/*.astro`, `astro/src/pages/en/blog/**/*.astro`, blog components.
- Задължителни проверки: `npm run qa`, `npm run seo-check`, `npm run browser-qa`.
- Необходимо ниво на QA: build, SEO/GEO, browser QA и visual route review.
- Ръчен визуален преглед: няколко статии, featured article, blog index, BG и EN когато е приложимо.
- `npm run regression`: при page count, markdown count или output риск.
- `npm run release`: само при release candidate или production readiness.
- Preview Validation: `Level 2 — Local Preview + Browser QA`.
- Завършена е, когато: browser QA и визуалният преглед на representative blog routes са успешни.

### SEO / GEO

- Разпознаване: промени по SEO/GEO/AI-visible съдържание, metadata, schema, sitemap, robots, `llms.txt`, Markdown negotiation или Content-Signal.
- Типични файлове: `astro/src/lib/seo.ts`, `astro/src/lib/blog.ts`, `astro/src/lib/site-content.ts`, `public/robots.txt`, `public/llms*.txt`, sitemap/schema helpers, markdown scripts.
- Задължителни проверки: `npm run qa`, `npm run seo-check`.
- Необходимо ниво на QA: SEO/GEO validation.
- Не се изпълняват: `browser-qa`, освен ако има visual/route промяна.
- `npm run regression`: при промени, които могат да променят page count, markdown count, output или bundle.
- `npm run release`: при release candidate, production readiness или deploy preparation.
- Preview Validation: `Level 1 — Local Preview Required`.
- Cloudflare Preview: само ако локалният preview не доказва headers, redirects, Markdown negotiation, Content-Signal или runtime behavior.
- Завършена е, когато: `seo-check` е успешен и нужният preview/Cloudflare preview е минал.

### Service Pages

- Разпознаване: промени по service pages, service copy, service CTA, pricing-adjacent service structure или service navigation.
- Типични файлове: `astro/src/pages/services/**/*`, `astro/src/pages/en/services/**/*`, service content in `astro/src/lib/**/*`.
- Задължителни проверки: `npm run qa`, `npm run browser-qa`; `npm run seo-check` при metadata, canonical, internal links, schema или GEO промени.
- Необходимо ниво на QA: browser QA, responsive review и CTA review.
- Preview Validation: `Level 1 — Local Preview Required`; `Level 2 — Local Preview + Browser QA` при layout, component или interactive промяна.
- Завършена е, когато: desktop/tablet/mobile service review е минал.

### Project Pages

- Разпознаване: промени по project pages, project data, gallery, media, video, related projects или project CTA.
- Типични файлове: `astro/src/pages/projects/**/*`, `astro/src/pages/en/projects/**/*`, project data in `astro/src/lib/**/*`, project media.
- Задължителни проверки: `npm run qa`, `npm run browser-qa`; `npm run seo-check` при metadata/schema/social preview промени.
- Необходимо ниво на QA: browser QA, media review, gallery/video review.
- Preview Validation: `Level 1 — Local Preview Required`; `Level 2 — Local Preview + Browser QA` при media, gallery, video, layout или interaction промяна.
- Завършена е, когато: media, gallery, video, CTA и related projects са проверени.

### Navigation

- Разпознаване: промени по main navigation, mobile navigation, footer navigation, locale switcher, breadcrumbs или route links.
- Типични файлове: `astro/src/layouts/**/*`, `astro/src/components/**/*`, `astro/src/lib/site-content.ts`, navigation data.
- Задължителни проверки: `npm run qa`, `npm run browser-qa`.
- Необходимо ниво на QA: browser QA, responsive и keyboard navigation.
- Preview Validation: `Level 2 — Local Preview + Browser QA`.
- Завършена е, когато: desktop, tablet, mobile и keyboard navigation са проверени.

### Forms

- Разпознаване: промени по contact form, estimator flow, validation, success/error states или API integration.
- Типични файлове: `astro/src/components/InquiryForm.astro`, estimator/contact components, `astro/functions/**/*`, form helpers.
- Задължителни проверки: `npm run qa`, `npm run browser-qa`; Cloudflare validation при function/runtime промяна.
- Необходимо ниво на QA: form state review, validation review и runtime review при интеграции.
- Preview Validation: `Level 2 — Local Preview + Browser QA`; `Level 3 — Cloudflare Preview Required` при runtime bindings, Turnstile, D1 или Functions поведение.
- Завършена е, когато: form states, validation и успешно изпращане са проверени, ако е възможно в тестова среда.

### Assets

- Разпознаване: добавяне, промяна или resolver промяна за изображения, fonts, downloads, icons, optimized assets.
- Типични файлове: `public/**/*`, asset source директории, asset scripts.
- Задължителни проверки: `npm run qa`, `npm run browser-qa`.
- Необходимо ниво на QA: asset loading, visual review и network error review.
- `seo-check`: ако asset се използва в Open Graph, Twitter, schema, sitemap или публични critical resources.
- `regression`: при много assets или output size риск.
- Preview Validation: `Level 1 — Local Preview Required`; `Level 2 — Local Preview + Browser QA` при visual route impact.
- Завършена е, когато: няма 404/network errors и визуалната употреба е проверена.

### Video

- Разпознаване: native `<video>`, embeds, posters, thumbnails, motion/video cards.
- Типични файлове: project media data, `astro/src/lib/**/*`, `public/**/*`, asset resolver scripts.
- Задължителни проверки: `npm run qa`, `npm run browser-qa`.
- Необходимо ниво на QA: poster/thumbnail, playback, layout stability и network review.
- `seo-check`: ако video/poster участва в preview metadata или schema.
- `regression`: при asset/output size риск.
- Preview Validation: `Level 1 — Local Preview Required`; `Level 2 — Local Preview + Browser QA` при project page, layout или gallery impact.
- Завършена е, когато: video/poster няма 404, няма layout shift и playback е проверен.

### Astro Components

- Разпознаване: промени по Astro компоненти, layouts или pages.
- Типични файлове: `astro/src/components/**/*.astro`, `astro/src/layouts/**/*.astro`, `astro/src/pages/**/*.astro`.
- Задължителни проверки: `npm run qa`, `npm run browser-qa`.
- Необходимо ниво на QA: browser QA, responsive review и route review.
- `seo-check`: ако компонентът влияе на headings, metadata, schema, internal links или AI-visible content.
- `regression`: при route/page count/output риск.
- Preview Validation: `Level 2 — Local Preview + Browser QA`.
- Завършена е, когато: засегнатите routes са визуално проверени.

### Source Code

- Разпознаване: промени по TypeScript, JavaScript, helpers, routes, API, build logic или production-relevant code.
- Типични файлове: `src/**/*`, `astro/src/**/*`, `astro/functions/**/*`, `scripts/**/*`.
- Задължителни проверки: `npm run smart-qa`, минимално `npm run qa`.
- Необходимо ниво на QA: според засегнатия runtime.
- `browser-qa`: ако промяната засяга routes, UI, forms, navigation, media или runtime behavior.
- `seo-check`: ако промяната засяга metadata, schema, sitemap, robots, `llms.txt`, Markdown или Content-Signal.
- `regression`: ако промяната може да засегне build output, page count, markdown count или bundle.
- `release`: при release candidate, commit/push преди публикация или readiness claim.
- Preview Validation: `Level 1 — Local Preview Required` при production runtime или route поведение; `Level 2 — Local Preview + Browser QA` при UI, media, navigation, forms или visual behavior.
- Завършена е, когато: всички проверки за засегнатия runtime и preview level са успешни.

### Automation

- Разпознаване: промени по npm scripts, QA orchestration, report generation или validation scripts.
- Типични файлове: `package.json`, `scripts/**/*.mjs`.
- Задължителни проверки: релевантната променена команда, `npm run validate-docs` ако има documentation diff, `git status --short`.
- Необходимо ниво на QA: automation command validation.
- `npm run qa`: ако automation промяната засяга build/QA pipeline или command selection.
- `regression`: ако automation промяната засяга regression baseline или release gate.
- `release`: само ако е променена release/release-check логика или задачата изисква readiness.
- Preview Validation: `Level 0 — No Preview Required`, освен ако automation промяната има визуален ефект.
- Завършена е, когато: релевантната automation команда и required docs validation са успешни.

### Dashboard

- Разпознаване: промени по DMA Dashboard generation или dashboard command.
- Типични файлове: `scripts/generate-dashboard.mjs`, `package.json`, dashboard-local reports.
- Задължителни проверки: `npm run dashboard`, `git status --short`; `npm run validate-docs` при documentation diff.
- Необходимо ниво на QA: dashboard generation и visual dashboard review.
- Не се изпълняват: `browser-qa`, `seo-check`, `release`, освен ако задачата изрично изисква readiness.
- Preview Validation: `Level 1 — Local Preview Required`.
- Ръчен визуален преглед: генерирай dashboard, отвори го локално и провери визуално.
- Завършена е, когато: dashboard е генериран и визуално прегледан.

### Cloudflare Runtime

- Разпознаване: промени по Cloudflare Pages, Wrangler, Pages Functions, D1 binding, `_headers`, `_redirects`, deploy scripts или deployment preparation.
- Типични файлове: `astro/wrangler.toml`, `astro/functions/**/*`, `public/_headers`, `public/_redirects`, deploy scripts.
- Задължителни проверки: `npm run qa`, `npm run astro:cf:validate`, `npm run regression`.
- Необходимо ниво на QA: Cloudflare runtime validation.
- `browser-qa`: ако route, header, function или public behavior може да се промени.
- `seo-check`: ако headers, redirects, robots, sitemap, `llms.txt` или Content-Signal се засягат.
- `release`: при release candidate или readiness claim.
- Preview Validation: `Level 3 — Cloudflare Preview Required`, когато трябва да се валидират Functions, headers, redirects, middleware, D1, Turnstile, runtime bindings или Cloudflare-specific поведение, което не може да се докаже локално.
- Завършена е, когато: локалните проверки и нужният Cloudflare Preview са успешни; deploy все още изисква Project Owner approval.

### Release Candidate

- Разпознаване: задачата иска commit/push readiness, final release review, production readiness или pre-deploy validation.
- Типични файлове: всякакви production-relevant промени.
- Задължителни проверки: `npm run release`, `git status --short`.
- Необходимо ниво на QA: пълният release readiness flow.
- `npm run release` включва `smart-qa`, `regression` и `release-check`.
- Не означава deploy approval.
- Preview Validation: `Level 4 — Ready for Production Review` само ако всички preview изисквания за засегнатите категории вече са изпълнени.
- Завършена е, когато: release е `READY`, няма blocking failures и задачата може да бъде предложена за Project Owner approval.


## Типове задачи и минимални проверки

### Documentation-only задача

Използва се при промени само по Markdown документи.

Минимум:

- преглед на създадените или редактираните документи;
- `npm run validate-docs`, ако командата съществува;
- `git status --short`;
- потвърждение, че няма промени извън разрешения документационен обхват.

Не се изискват `browser-qa`, `seo-check` или `release`, освен ако потребителят не ги поиска.

### Blog задача

Използва се при планиране, писане, редакция или review на блог статия.

Минимум:

- `EDITORIAL_SYSTEM/README.md`;
- `EDITORIAL_SYSTEM/EDITORIAL_STANDARDS.md`;
- `EDITORIAL_SYSTEM/ARTICLE_STRUCTURE.md`;
- `EDITORIAL_SYSTEM/WRITING_GUIDE.md`;
- `EDITORIAL_SYSTEM/LINKING_STRATEGY.md`;
- `EDITORIAL_SYSTEM/REVIEW_CHECKLIST.md`;
- `npm run validate-docs`, ако промяната е само документационна;
- `npm run smart-qa` или `npm run release`, ако статията е реална site/content промяна.

Една задача не трябва да пренаписва повече от една статия.

### Code задача

Използва се при промени по production-relevant code, build, helpers, routes или scripts.

Минимум:

- `npm run smart-qa`, когато трябва да се избере минимален набор проверки;
- `npm run qa`, когато промяната засяга code/build;
- `npm run browser-qa`, ако промяната засяга routes, UI, responsive, navigation, forms, video или visual behavior;
- `npm run seo-check`, ако промяната засяга SEO/GEO/AI-visible поведение;
- `npm run release`, преди commit/push/deploy request или release readiness.

### Automation задача

Използва се при промени по `package.json`, `scripts/`, reports или QA orchestration.

Минимум:

- `npm run validate-docs`, ако има документационна промяна;
- релевантната променена Automation команда;
- `npm run release`, ако задачата засяга release readiness flow;
- `git status --short`.

Automation не трябва да прави deploy, commit или push.

### Editorial задача

Използва се при промени по `EDITORIAL_SYSTEM/` или editorial policy.

Минимум:

- `npm run validate-docs`;
- преглед за дублиране спрямо `OWNER_REQUIREMENTS.md`;
- преглед дали `EDITORIAL_SYSTEM/README.md` остава входна точка;
- `git status --short`.

### Website задача

Използва се при всяка промяна, която засяга публичния сайт.

Минимум:

- `npm run qa`;
- `npm run browser-qa`, ако има визуално, responsive или route поведение;
- `npm run seo-check`, ако има SEO/GEO/AI-visible промяна;
- `npm run regression`, ако има риск за output size, page count или build metrics;
- `npm run release` преди production readiness claim.

## Automation commands

### `npm run qa`

Използва се за:

- lint;
- root build;
- Astro build;
- Cloudflare dist validation.

Не включва browser QA, deploy, commit или push.

### `npm run browser-qa`

Използва се при:

- визуални промени;
- responsive промени;
- navigation промени;
- route промени;
- video poster/thumbnail промени;
- project page проверки.

Проверява desktop, tablet, mobile, console errors, network 4xx/5xx, layout shift и ключови routes.

### `npm run seo-check`

Използва се при промени по:

- title;
- meta description;
- canonical;
- hreflang;
- Open Graph;
- Twitter/meta preview;
- JSON-LD/schema;
- sitemap;
- robots;
- `llms.txt`;
- Markdown content negotiation;
- Content-Signal.

### `npm run smart-qa`

Използва се, когато текущият diff трябва да определи минималните проверки.

Ако няма промени, командата трябва да приключи без проверки.

### `npm run regression`

Използва се при:

- release readiness;
- build output промени;
- големи content промени;
- промени по Automation;
- промени, които могат да засегнат page count, markdown count или bundle size.

### `npm run release`

Използва се за локален readiness signal.

Командата трябва да върне:

- `READY`
- или `NOT READY`

`npm run release` не означава deploy approval.

## Video checks

- Ако задачата добавя или променя video съдържание, всяко native `<video>` трябва да има `poster`.
- Всяка embedded video/card употреба трябва да има thumbnail image.
- Не използвай AI-generated video thumbnails без изрично разрешение.
- Ако липсва thumbnail asset, маркирай нужда от asset вместо да измисляш изображение.

## Manual checks

Ръчно се проверява само това, което не може надеждно да бъде автоматизирано:

- Project Owner approval;
- legal review;
- pricing approval;
- brand approval;
- live production behavior след deploy;
- субективна editorial оценка под `EDITORIAL_SYSTEM/REVIEW_CHECKLIST.md`.
