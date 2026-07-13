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
