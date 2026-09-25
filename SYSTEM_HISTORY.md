# SYSTEM_HISTORY.md

## Purpose

Този документ записва историята на вътрешните системи на `d . media`.

Той не е production changelog. Production историята на сайта остава в `SITE_HISTORY.md`.

## Scope

Записват се milestones за:

- AIOS;
- Automation;
- DMA;
- Editorial System;
- Documentation Architecture.

Не се записват:

- публични site промени;
- production deploy събития;
- съдържателни промени по сайта;
- временни локални експерименти.

## 2026-06-27 — AIOS foundation

- Създадени са началните AI operating документи: `AGENTS.md`, `CLAUDE.md`, `CHECKLIST.md` и `PROJECT.md`.
- Създадена е първата knowledge base структура за проекта.
- Започнат е процесът по изваждане на проектните правила от chat context към repository documents.

## 2026-06-27 — Project knowledge base

- Създаден е `KNOWLEDGE_BASE.md` като подробна база знания за проекта.
- Създаден е `OPEN_QUESTIONS.md` за въпроси, които изискват човешко потвърждение.
- Създаден е `SOP-001-EXECUTE_TASK.md` като основна процедура за бъдещи задачи.

## 2026-06-27 — Decisions and owner requirements

- Създаден е `OWNER_REQUIREMENTS.md` като Source of Truth за постоянните изисквания на Project Owner.
- Създаден е `DECISIONS.md` за активните архитектурни решения.
- Root Next.js е класифициран като legacy/fallback component.
- Project Owner е документиран като вътрешна роля.

## 2026-06-27 — Automation 1.0 and 2.0

- Добавена е unified QA команда `npm run qa`.
- Добавени са `browser-qa`, `seo-check`, `release-check`, `smart-qa`, `regression` и `release`.
- Automation започва да генерира HTML reports и `reports/report.json`.
- Release readiness се изразява чрез `READY` или `NOT READY`, без deploy, commit или push.

## 2026-06-27 — DMA 1.0

- Създаден е `DMA.md`.
- DMA е дефиниран като инженерният агент на проекта.
- DMA използва AIOS и Automation, но не ги заменя.

## 2026-06-27 — DMA Dashboard 1.0

- Добавена е локална dashboard команда `npm run dashboard`.
- Dashboard визуализира Git, QA, release readiness, SEO, browser QA, regression, warnings, errors и последни reports.

## 2026-06-28 — Editorial System 1.0

- Създадена е `EDITORIAL_SYSTEM/` като работен стандарт за блог статии.
- Добавени са standards за структура, UX, UI, вътрешно свързване, писане и review.
- Блог статиите са отделени като редакционни проекти с Research, Outline, approval, writing и review фази.

## 2026-06-28 — Documentation Architecture Freeze

- Създаден е `SOURCE_OF_TRUTH.md`.
- `.aios/` е класифициран като Legacy AIOS Archive.
- `DECISIONS.md` е потвърден като единствения активен decisions документ.
- `SYSTEM_HISTORY.md` е отделен от `SITE_HISTORY.md`.
- `EDITORIAL_SYSTEM/README.md` е добавен като entrypoint.
- `scripts/validate-docs.mjs` е разширен с документационни архитектурни проверки.

## 2026-06-29 — Knowledge Base v1

- Дефиниран е `d . media Knowledge Base v1` като активен root documentation layer.
- Потвърдено е, че Knowledge Base v1 не създава нов production, content или editorial слой.
- Добавени са ownership правила: архитектурни промени изискват approval от `Project Owner`, а неяснотите се записват в `OPEN_QUESTIONS.md`.
- Записани са отворени въпроси за бъдещ lifecycle и machine-readable формат на Knowledge Base v1.

## 2026-06-29 — Public Knowledge Base architecture

- Project Owner разреши `Q-010`.
- `DEC-013` приема `d . media Knowledge Base` като официален публичен content layer.
- `DEC-012` остава historical/superseded решение и вече не ограничава изграждането на публична Knowledge Base.

## 2026-07-13 — Next.js/Vercel cleanup

- Премахнат е legacy Next.js/Vercel слой, включително root `src/`, Next.js middleware, конфигурация и неизползвани зависимости.
- Root automation scripts използват Astro build-а като единствен production build.
- Historical и validation references към Vercel остават само когато описват минало състояние или проверяват за забранен runtime output.

## 2026-07-13 — Next.js/Vercel cleanup validation

- `npm run validate-docs` връща идентични 20 документационни грешки и на базовия commit `a962e86`, и на cleanup commit `f587b23`; cleanup-ът не е добавил regression.
- Clean-room проверката потвърждава, че активните root зависимости не включват Next.js, React или Vercel пакети; Astro използва собствен `astro/tsconfig.json`.
- Cloudflare Pages preview deployment за `f587b23` е успешен и потвърждава публичните маршрути, sitemap, robots и липсата на `/_next/` runtime route.

## 2026-07-13 — Cloudflare preview runtime validation

- Preview deployment `6e7c2d3a.d-media-site.pages.dev` връща Cloudflare runtime и очакваните security headers; `/_next/` остава `404`, а Vercel headers не се връщат.
- Contact endpoint-ът връща очакван `400` JSON отговор при невалиден Turnstile token и не достига D1/email пътя.
- Preview Turnstile widget-ът връща `110200` (`Domain not authorized`), защото preview hostname-ът не е разрешен за site key. Production form не показва този console error. Това е Cloudflare hostname configuration follow-up, а не регресия от Next.js/Vercel cleanup-а.
- Preview и production нямат `Content-Security-Policy` или `Content-Security-Policy-Report-Only`; отсъствието е предварително съществуващо и не е променено от cleanup-а.

## 2026-07-13 — Production contact QA cleanup

- Production commit `f1f35bc` е публикуван чрез Cloudflare Pages deployment `f1311253-898c-4b96-9876-55126935a20d`. Production smoke test-ът е успешен; не се връщат Vercel headers и `/_next/` runtime route остава недостъпен.
- Production контактната QA заявка е успешна: Turnstile е преминат, `POST /api/contact` връща HTTP `200` и `{"ok":true}`, success UI е показан, а browser console и network проверките нямат грешки. Служебното известие и клиентското потвърждение са реално получени в `contact@d-media.org`.
- QA D1 записът в таблица `inquiries` с ID `6cf33816-cfe1-4238-a341-3088a9fe053e` е проверен като самостоятелен ред без foreign key зависимости и е изтрит с точно един засегнат D1 ред. След изтриването точният ID и единственото QA съвпадение не съществуват; други D1 записи не са засегнати.
- Brevo контактът `contact@d-media.org` не е изтриван и не е променян ръчно. CRM sync не е потвърден като успешен или неуспешен, защото в работната среда няма Brevo Dashboard/API read-only достъп.
- Read-only Vercel проверката за team `d-media` (`team_3lssNsQVxPuubyv2tDWJR5rx`) връща `0` проекта; в достъпния team няма ресурси за изтриване. Възможен стар проект в друг, недостъпен account или team остава непроверен.
- Не са извършвани нови deployments, DNS, Cloudflare, Turnstile или source промени по време на QA cleanup-а.

## 2026-09-25 — Автоматично синхронизиране на документацията

- Въведено е автоматично синхронизиране на проектната документация: преди приключване на задача Codex проверява дали одобрено решение или реално приложена промяна изисква актуализация на съответния Source of Truth.
- Предложения, хипотези и read-only одити не се записват като приети решения.
- `SITE_HISTORY.md` се актуализира само след реално production публикуване.
- Добавена е защита при конфликт между код и документация: проверява се кое е по-новото одобрено състояние и изричните изисквания на Project Owner не се отменят автоматично.
