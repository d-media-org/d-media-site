# SOURCE_OF_TRUTH.md

## Purpose

Този документ е официалната карта на документационната архитектура на `d . media`.

Целта е всеки бъдещ AI модел да знае кой документ е Source of Truth за всяка област и кой документ има предимство при конфликт.

## Priority Order

При конфликт между активните root документи се следва този ред:

1. `AGENTS.md`
2. `SOURCE_OF_TRUTH.md`
3. `OWNER_REQUIREMENTS.md`
4. `DMA.md`
5. `CHECKLIST.md`
6. `SOP-001-EXECUTE_TASK.md`
7. `DECISIONS.md`
8. `PROJECT.md`
9. `KNOWLEDGE_BASE.md`
10. `OPEN_QUESTIONS.md`
11. `SITE_HISTORY.md`
12. `SYSTEM_HISTORY.md`
13. `EDITORIAL_SYSTEM/`
14. `README.md`

По-нова изрична инструкция от Project Owner има предимство пред по-стара инструкция, ако не противоречи на `AGENTS.md` или на правила за безопасност.

## Source of Truth by Area

| Област | Source of Truth | Поддържащи документи |
| --- | --- | --- |
| Език, поведение и основни инструкции към AI | `AGENTS.md` | `DMA.md`, `SOP-001-EXECUTE_TASK.md` |
| Карта на документацията | `SOURCE_OF_TRUTH.md` | `AGENTS.md`, `SYSTEM_HISTORY.md` |
| Постоянни изисквания на Project Owner | `OWNER_REQUIREMENTS.md` | `DECISIONS.md`, `EDITORIAL_SYSTEM/` |
| Инженерен модел на работа на DMA | `DMA.md` | `AGENTS.md`, `CHECKLIST.md`, `SOP-001-EXECUTE_TASK.md` |
| QA избор и минимални проверки | `CHECKLIST.md` | `PROJECT.md`, Automation scripts |
| Процедура за изпълнение на задача | `SOP-001-EXECUTE_TASK.md` | `AGENTS.md`, `DMA.md`, `CHECKLIST.md` |
| Архитектурни решения | `DECISIONS.md` | `PROJECT.md`, `KNOWLEDGE_BASE.md` |
| Project summary и текуща архитектура | `PROJECT.md` | `KNOWLEDGE_BASE.md`, `README.md` |
| Подробна база знания за проекта | `KNOWLEDGE_BASE.md` | `PROJECT.md`, `DECISIONS.md` |
| Отворени и решени въпроси | `OPEN_QUESTIONS.md` | `DECISIONS.md`, `PROJECT.md` |
| Production история на сайта | `SITE_HISTORY.md` | `PROJECT.md`, `README.md` |
| История на вътрешните системи | `SYSTEM_HISTORY.md` | `DECISIONS.md`, `SOURCE_OF_TRUTH.md` |
| Developer onboarding | `README.md` | `PROJECT.md`, `SOURCE_OF_TRUTH.md` |
| Редакционна система за блог статии | `EDITORIAL_SYSTEM/README.md` | Всички файлове в `EDITORIAL_SYSTEM/` |
| Automation команди и reports | `PROJECT.md` | `package.json`, `scripts/`, `CHECKLIST.md` |
| Legacy AIOS Archive | `.aios/README.md` | `.aios/*` |

## Автоматично синхронизиране на документацията

След одобрено решение или реално приложена промяна актуализирай само документа, който е Source of Truth за засегнатата област. Не копирай една и съща информация в няколко документа без необходимост.

| Документ | Актуализирай, когато |
| --- | --- |
| `OWNER_REQUIREMENTS.md` | Има ново постоянно изискване на Project Owner, забрана или правило за бранд, UX, съдържание, код или начин на работа. |
| `DECISIONS.md` | Е прието архитектурно, продуктово, информационно, навигационно или съдържателно решение. |
| `PROJECT.md` | Променя се реалното текущо състояние на проекта, архитектурата, навигацията, активните технологии, production workflow или реално въведената структура. |
| `KNOWLEDGE_BASE.md` | Добавени са устойчиви подробни технически факти или ограничения. |
| `OPEN_QUESTIONS.md` | Появява се нов нерешен въпрос; при решаването му премести го в `Resolved` и отрази окончателното решение в правилния Source of Truth. |
| `SITE_HISTORY.md` | Само когато промяна е действително публикувана в production. Локален commit или push към GitHub не е достатъчен. |
| `SYSTEM_HISTORY.md` | Има съществена промяна във вътрешната документационна, AI или automation система. |

Предложение, неприет вариант, бъдещ план, предположение или резултат от read-only одит не е прието решение и не се записва като такова. При конфликт между кода и документацията установи дали кодът е по-ново одобрено състояние, документацията е по-нова инструкция или има противоречие, което изисква решение. Не променяй документацията по кода, ако така би отменил изрично изискване на Project Owner.

## Document Responsibilities

### `AGENTS.md`

Предназначение: най-високото оперативно правило за AI работа в репозиторията.

Съдържа:

- език на комуникация;
- задължителен ред на четене;
- основни ограничения;
- финален отчет.

Не трябва да съдържа:

- подробна проектна архитектура;
- редакционни стандарти;
- Automation implementation;
- исторически записи.

При конфликт печели пред всички други активни документи.

### `DMA.md`

Предназначение: спецификация на инженерния агент DMA.

Съдържа:

- роля на DMA;
- вътрешни роли;
- workflow;
- scope;
- output expectations.

Не трябва да съдържа:

- проектна база знания;
- owner политики в детайл;
- архитектурни решения;
- редакционни правила в пълен вид.

При конфликт с `OWNER_REQUIREMENTS.md` печели `OWNER_REQUIREMENTS.md`. При конфликт с `AGENTS.md` печели `AGENTS.md`.

### `OWNER_REQUIREMENTS.md`

Предназначение: постоянните изисквания на Project Owner.

Съдържа:

- brand, public identity, design, code, architecture, assets, video, SEO/GEO/AI, content, QA и documentation правила;
- Definition of Done на owner ниво;
- Never Again правила.

Не трябва да съдържа:

- подробна project architecture;
- workflow-и, които принадлежат на `SOP-001-EXECUTE_TASK.md`;
- пълни editorial templates, които принадлежат на `EDITORIAL_SYSTEM/`.

При конфликт печели пред `DMA.md`, `CHECKLIST.md`, `SOP-001-EXECUTE_TASK.md`, `PROJECT.md`, `KNOWLEDGE_BASE.md` и `EDITORIAL_SYSTEM/`.

### `CHECKLIST.md`

Предназначение: работен checklist за избор на проверки.

Съдържа:

- checklist преди започване;
- checklist преди приключване;
- минимални проверки според тип задача;
- Automation command usage.

Не трябва да съдържа:

- project facts;
- owner policies;
- подробна Automation implementation.

При конфликт с `OWNER_REQUIREMENTS.md` печели `OWNER_REQUIREMENTS.md`.

### `PROJECT.md`

Предназначение: кратка, актуална project документация.

Съдържа:

- какво представлява проектът;
- структура;
- текуща архитектура;
- технологии;
- navigation;
- SEO/GEO;
- Cloudflare;
- Automation overview.

Не трябва да съдържа:

- подробна база знания за всяка област;
- owner policies;
- task protocol;
- production history.

При конфликт с `DECISIONS.md` за архитектурно решение печели `DECISIONS.md`.

### `KNOWLEDGE_BASE.md`

Предназначение: подробна база знания за проекта.

Съдържа:

- детайлни проектни факти;
- архитектура;
- SEO/GEO/AI visibility;
- API, database, performance, accessibility, responsive, known limitations.

Не трябва да съдържа:

- правила за работа на AI;
- owner policies;
- task workflow;
- decisions като първоизточник.

При конфликт с `PROJECT.md` за кратко текущо project summary печели `PROJECT.md`. При конфликт с `DECISIONS.md` печели `DECISIONS.md`.

### `OPEN_QUESTIONS.md`

Предназначение: контролирано място за open и resolved въпроси.

Съдържа:

- `Open` въпроси, които изискват човешко решение или външна проверка;
- `Resolved` история на вече затворени въпроси.

Не трябва да съдържа:

- архитектурни решения като source of truth;
- project facts, които вече са стабилни;
- owner policies.

При решен въпрос окончателното решение трябва да бъде отразено в `DECISIONS.md`, `PROJECT.md` или другия релевантен source of truth.

### `DECISIONS.md`

Предназначение: единственият активен документ за архитектурни решения.

Съдържа:

- accepted decisions;
- причина;
- алтернативи;
- последствия;
- статус.

Не трябва да съдържа:

- отворени въпроси;
- task checklists;
- production changelog;
- editorial templates.

При конфликт с `.aios/11-DECISIONS.md` винаги печели `DECISIONS.md`.

### `SITE_HISTORY.md`

Предназначение: история на production сайта.

Съдържа:

- само съществени промени, публикувани в production;
- продуктови и site-level milestones.

Не трябва да съдържа:

- AIOS milestones;
- Automation milestones;
- DMA milestones;
- Editorial System milestones;
- непубликувани локални промени.

За вътрешни системи се използва `SYSTEM_HISTORY.md`.

### `SYSTEM_HISTORY.md`

Предназначение: история на вътрешните системи.

Съдържа:

- AIOS milestones;
- Automation milestones;
- DMA milestones;
- Editorial System milestones;
- Documentation Architecture milestones.

Не трябва да съдържа:

- production site changelog;
- публични маркетингови събития;
- deploy история.

### `README.md`

Предназначение: developer onboarding.

Съдържа:

- local setup;
- основни команди;
- Cloudflare/Astro developer notes;
- кратки operational facts.

Не трябва да съдържа:

- AI Source of Truth карта;
- owner policies;
- detailed decisions;
- open questions.

При конфликт с AI/documentation documents печелят root AIOS документите според Priority Order.

### `SOP-001-EXECUTE_TASK.md`

Предназначение: процедура за изпълнение на задача.

Съдържа:

- ред за зареждане на контекст;
- анализ;
- изпълнение;
- проверка;
- финален отчет.

Не трябва да съдържа:

- project facts;
- owner policies в детайл;
- editorial templates;
- architectural decision records.

### `EDITORIAL_SYSTEM/`

Предназначение: единственият работен стандарт за блог статии.

Съдържа:

- editorial workflow;
- article structure;
- reading UX;
- article UI;
- linking strategy;
- writing guide;
- review checklist.

Не трябва да съдържа:

- owner policies извън editorial контекст;
- project architecture;
- Automation implementation;
- production history.

Входната точка е `EDITORIAL_SYSTEM/README.md`.

### Automation

Предназначение: локална система за проверки и reports.

Source of Truth:

- overview: `PROJECT.md`;
- command selection: `CHECKLIST.md`;
- implementation: `package.json` и `scripts/`;
- reports: `reports/` като локални gitignored артефакти.

Automation не трябва да прави deploy, commit или push.

### AIOS

Предназначение: активният AI operating layer в root документите.

Source of Truth:

- `AGENTS.md`;
- `SOURCE_OF_TRUTH.md`;
- `OWNER_REQUIREMENTS.md`;
- `DMA.md`;
- `CHECKLIST.md`;
- `SOP-001-EXECUTE_TASK.md`;
- `DECISIONS.md`;
- `PROJECT.md`;
- `KNOWLEDGE_BASE.md`;
- `OPEN_QUESTIONS.md`;
- `SYSTEM_HISTORY.md`.

`.aios/` е Legacy AIOS Archive и не е активен Source of Truth.

## Legacy AIOS Archive

`.aios/` остава в репозиторията само за исторически контекст.

Правила:

- не го използвай като активен Source of Truth;
- не вземай решения от него, ако root документите казват друго;
- при конфликт винаги печелят root документите;
- нови AIOS правила се добавят в root документите, не в `.aios/`, освен ако задачата изрично не е за архивна поддръжка.

## Definition of Done

Документационната архитектура е стабилна, когато:

- всяка основна област има един Source of Truth;
- `.aios/` е ясно класифициран като legacy archive;
- `DECISIONS.md` е единственият активен decisions документ;
- `OPEN_QUESTIONS.md` разделя open и resolved въпроси;
- `EDITORIAL_SYSTEM/` има README entrypoint;
- `CHECKLIST.md` описва минимални проверки според тип задача;
- `scripts/validate-docs.mjs` проверява надеждно автоматизируемите документационни правила.
