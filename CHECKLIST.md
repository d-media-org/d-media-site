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
