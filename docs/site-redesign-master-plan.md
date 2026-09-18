# d . media — master plan за валидиран редизайн

## Статус, обхват и доказателствена рамка

**Статус:** Phase 1 е разрешена само като research, evidence inventory и content/design preparation. Не е разрешена промяна по production, source код, assets, цени, URL адреси или visual implementation.

**Дата на проверката:** 13 септември 2026 г.

**Обхват на истината:** production `https://www.d-media.org/` е единственият източник на истина за публичното поведение. За кодов анализ е използван архивираният checkout `/Users/m.dragoev/d-media-site`, branch `recovery/production-5801c935`, HEAD `1df8950`.

**Ограничение:** checkout-ът има предишни неприключени промени в 11 source файла и 23 премахнати asset файла. Затова той е надежден за архитектурен анализ, но не доказва сам по себе си source parity с production. Измерванията и публичните изводи по-долу са маркирани с **FACT** само когато са проверени в production или директно в кода.

**Изключено от анализа:** локалният redesign checkout `/Users/m.dragoev/d . media - site` и неговият изтрит `astro/dist`. Той не е източник на дизайн, съдържание или технически изводи.

### Легенда

- **FACT** — директно проверено в production, код или локален валидиран output.
- **INFERENCE** — обоснован извод от фактите; не е измерен бизнес резултат.
- **RECOMMENDATION** — предложена бъдеща работа.
- **NEEDS DECISION** — собственикът трябва да избере посока, обхват или бизнес правило.

---

## Решения на собственика — фиксирани за следващите фази

Следните решения са приети. Те не са повече препоръки и не се отварят повторно в Phase 1.

| Област | Вече решено | Последица за плана |
| --- | --- | --- |
| Позициониране | d . media е едновременно творческо/дизайнерско и техническо/уеб студио. Нито една страна не доминира. | Всеки ключов екран трябва да показва едно визуално доказателство и едно конкретно доказателство за изпълнение/система, без технически жаргон да измества работата. |
| Home IA | `Hero → Selected Work → Brand / Content / Web / Visibility → останалото съдържание`. | Selected Work е задължителната втора секция; избраният формат е **1A — Editorial proof strip** с d . media като водещ case. |
| Основни направления | Brand, Content, Web, Visibility са основният навигационен и комуникационен модел. | Съществуващите service pages и URL адреси се запазват, докато intent audit не одобри друго. |
| Selected Work | Основните кандидати са d . media, Support Account, Support Account Group, Apple Community Bulgaria и DJ NEDI. | Yanita и Boris Lilov Photography не са в initial Selected Work set; могат да останат в archive или бъдеща ротация само след отделно решение. |
| Цена на home | Дребни единични цени не определят първото впечатление. | Избран е **2A**: Brand identity от 699,99 €, Corporate website от 2 490 € и Digital platform от 4 990 €. `25 €`, `50 €` и цени на секунда не се показват на home. |
| About | Страницата разказва подробно историята на бранда, не биография на основател. | Избран е **3A — Brand chronology + доказателства**. Забранени са име, портрет, работодател, военна принадлежност, други лични идентификатори и всички предишни brand форми/имена, съдържащи фамилията `Dragoev`. |
| Визуална цел | „Зрял и впечатляващ“ чрез типография, композиция, пространство, изображения и целенасочено движение. | Не се допуска неонов шаблон, изкуствен курсор, тежък WebGL, декоративен parallax или ефекти без функция. |
| Miss 18 | Реален клиентски проект. **Miss 18 е временно непубличен проект до изрично клиентско одобрение. Проектът остава допустим за вътрешен анализ и подготовка на бъдещ case study.** | Не влиза в текущия public Selected Work набор, case studies, marketing proof или production portfolio content. След одобрение се оценява повторно като кандидат, защото съчетава brand identity и web work. |
| Apple Community Bulgaria | Избран е **4A — curated recovery**. | В бъдещия case се връщат само най-силните одобрени материали; пълният архив не се публикува като галерия. |
| Client evidence | Избран е **5A**, коригиран като verification manifest, а не permission workflow. | Всички други проекти са разрешени за публично представяне. За Miss 18 се поддържа вътрешен evidence inventory до изрично клиентско одобрение; manifest-ът проверява точно кои assets, години, линкове, резултати и цитати могат да бъдат доказани. |
| Визуални решения | Големите визуални избори не се вземат еднолично. | И след Phase 1, преди visual implementation собственикът избира между максимум три ясно обяснени посоки; изборът се записва в плана/решенията. |

---

## 1. Executive summary

**FACT:** production е статичен Astro сайт, сервиран през Cloudflare, с BG/EN версии, 248 sitemap URL адреса, форма за запитване, estimator, SEO/schema/`llms.txt` повърхности и богата проектна библиотека. Началният HTML е 50 882 B; измерен TTFB на началната страница е 0,160 s, а на проекта `d-media` — 0,155 s при единична проверка от София. `npm run lint` в архивирания проект завършва успешно.

**FACT:** началната страница е достъпна семантично: има skip link, `header`, `main`, `footer`, йерархия `h1` → `h2` → `h3`, видими focusable контроли и reduced-motion правила. При 320 px няма хоризонтален overflow; mobile menu показва отделна навигация, докато desktop навигацията е скрита.

**INFERENCE:** сайтът вече доказва организираност, техническа грамотност и процес, но последователността на началната страница прави това по-силно от доказването на визуален и уеб дизайн талант. Проектите са шеста голяма секция, след услуги, ползи, ценови рамки и процес; в първия проектен екран се вижда един carousel card.

**DECIDED:** следващата версия балансира силен визуален вкус и техническа сигурност. Тя не се нуждае от смяна на марката или от ефектен „agency“ шаблон, а от по-строга редакция на информационния слой, по-ранни и по-дълбоки доказателства за работа, по-ясни роли на проектните колекции и измерима регресионна защита.

**RECOMMENDATION:** редизайнът да започне от content model и доказателствения модел на портфолиото, след това от home IA и накрая от visual refinement. Да не започва от нов CSS слой или декоративни ефекти.

---

## 2. Проверка на предишния одит

| Констатация | Статус | Доказателство | Извод |
| --- | --- | --- | --- |
| Hero посланието е описателно и обхваща прекалено много | **Частично потвърдена** | **FACT:** H1 изброява „бранд идентичност, съдържание, уеб платформи, дизайн и реклама“. | **INFERENCE:** то е ясно, но не поставя една отличима творческа теза. Не е доказано, че само текстът понижава конверсия. |
| Проектите идват твърде късно | **Потвърдена** | **FACT:** редът е Hero → услуги → ползи → pricing → процес → проекти. | **RECOMMENDATION:** избрани работи да се появят непосредствено след hero или като негово продължение. |
| Сайтът говори повече, отколкото показва | **Частично потвърдена** | **FACT:** има 28 проекта и 582 media файла, но homepage показва един carousel project; 5 са „избрани“. | Не липсват визуални материали; липсва по-ранно, концентрирано доказателство за вид работа и резултат. |
| Ценовите котви смесват premium и дребни услуги | **Потвърдена** | **FACT:** на home се показват 700 €, 690 €, 25 €, 25 € и 50 € в една равностойна grid секция. | **RECOMMENDATION:** home да показва 2–3 стратегически входни рамки; детайлният каталог да остане в Pricing. |
| Двойното евро/лев обозначение е проблем | **Непотвърдена** | **FACT:** в проверените home, pricing и service текстове цените са в евро; не е открито активно `лв.`/`BGN` ценообразуване. | Не се планира промяна без ново route-level доказателство. |
| Има прекалено много равностойни услуги | **Частично потвърдена** | **FACT:** има 15 BG service URL адреса; менюто вече ги групира в три направления. | Проблемът е по-скоро в плоското представяне на homepage и ценовия каталог, не непременно в самия брой URL адреси. |
| „Допълнителни начисления и права“ е на твърде високо ниво | **Потвърдена** | **FACT:** е самостоятелна service page, елемент в sitemap и CTA под services в home. | Това е secondary commercial/legal condition, не основна клиентска нужда. |
| Ценообразуването на реклама е прекалено счетоводно | **Потвърдена** | **FACT:** има цени на секунда и цена за всяка секунда след десетата. | В подробен каталог е допустимо; като начална позиционираща комуникация е твърде транзакционно. |
| Правата могат да останат неясни за клиента | **Частично потвърдена** | **FACT:** има отделни платени редове за неизключителен/изключителен лиценз и прехвърляне на права. | Текстът трябва да различи стандартната практическа употреба от разширени права; това е правен, не само UX въпрос. |
| Content creation и social media са неразличими | **Непотвърдена като факт; рискът е реален** | **FACT:** има отделни URL адреси и комбиниран `/services/content-social-media/`. | Нужен е matrix на deliverables/ownership/KPI преди промяна на route или copy. |
| Има припокриване при web services | **Частично потвърдена** | **FACT:** съществуват `/web-design/`, `/web-development/`, `/web-design-development/`, както и SEO/GEO/performance/support routes. | Това може да е полезна SEO клъстерна архитектура; необходим е intent map, не автоматично сливане. |
| Липсват достатъчно външни web case studies | **Потвърдена като доказателствен дефицит** | **FACT:** project data не показва клиентски live website links; намерен е само външен YouTube link за „Сянка от миналото“. | Не може да се твърди, че няма реализирани сайтове; може да се твърди, че сайтът не ги доказва системно. |
| File count е твърде видим в казусите | **Потвърдена** | **FACT:** project detail изписва „N файла/файла“ като archive metadata. | Да стане вторичен archive metadata, не основно доказателство. |
| Архивът размива selected work | **Частично потвърдена** | **FACT:** `/projects/` разделя 5 „Избрани проекти“ от 23 в „Архив“. | Разделението съществува, но критерият и различният формат на двете групи не са обяснени достатъчно. |
| Motion архивът размива казусите | **Потвърдена като риск** | **FACT:** `optimized-assets` съдържа 157 `.m4v` файла; общият media corpus е 580,2 MB. | Motion трябва да има водеща селекция и lazy full archive; не бива да се премахва без curator решение. |
| Техническите твърдения са недоказани | **Непотвърдена** | **FACT:** Astro `^6.4.4`, Cloudflare Functions/Worker конфигурация, schema, sitemap, `llms.txt`, form защити и нисък измерен TTFB са налични. | Публичните claims трябва да останат конкретни и измерими, без универсални обещания. |

---

## 3. Inventory на production и кода

### 3.1 Route и content inventory

**FACT:** production sitemap съдържа 248 URL адреса: 53 BG blog URL, 51 EN blog URL, 28 BG + 28 EN project URL, 5 knowledge-base URL, 15 BG + 15 EN service URL и 12 BG + 12 EN legal-policy URL. Един sitemap URL, `/en/knowledge-base/`, връща HTTP 404.

| Повърхност | Състояние и предназначение |
| --- | --- |
| Home BG/EN | Hero, services, benefits, pricing entry, process, featured work carousel, testimonials, CTA. |
| Services | Brand identity, content/social, graphic design, advertising, rights/charges, web design & development плюс специализирани web/visibility URL. |
| Projects | 5 selected: d . media, Yanita, Support Account, Support Account Group, Boris Lilov Photography; 23 archive project records; legacy mockup collections. |
| Case studies | Страница за петте selected works; детайлните project routes съдържат context, solution, use, gallery, service CTA. |
| Content | 53 BG + 51 EN blog routes; 4 source knowledge-base Markdown статии плюс index; authority pages и service entities. |
| Conversion | Contact form с квалификация; five-step project estimator; estimator → prefilled contact brief. |
| Trust/legal | Terms, privacy, 11 operational policies на език, site history и daily history. |
| Machine-readable | sitemap, robots, `llms.txt`, `llms-bg.txt`, `llms-full.txt`, canonical/hreflang и JSON-LD. |

### 3.2 Code inventory

**FACT:** `astro/src` съдържа 85 page файла, 11 компонента, 24 library файла, 2 layout файла, 95 `.astro` файла и 8 source content файла. Runtime dependency е само `astro`; root tooling включва ESLint, Playwright и Sharp.

| Слой | Наблюдение | Планов принцип |
| --- | --- | --- |
| Layouts | `Layout.astro` обслужва основните routes; `PreviewLayout.astro` обслужва home/preview визуалната система. | Консолидиране само след route visual-regression baseline. |
| Components | `MasterPreviewPage`, `InquiryForm`, `ProjectEstimator`, project and service components. | Не се сменя framework; повтарящите се presentation patterns се извеждат едва след IA решение. |
| Data | `page-copy.ts`, `site-content.ts`, project archives, authority/blog/knowledge base data. | Да се разделят commercial entry-copy, service taxonomy и portfolio metadata като модели, не като ad hoc JSX. |
| CSS | `globals.css` + `preview.css`; production CSS asset е 169 787 B. Има tokens, theme rules, breakpoints и reduced motion. | Първо token audit; без втори конкуриращ CSS слой. |
| JS | Home има 8 inline scripts / 12 546 B; contact 15 / 31 493 B; estimator 14 / 49 993 B. | Islands само за interactive нужди; ограничение за inline client JS по route. |
| Assets | 582 оптимизирани файла, 580,2 MB: 264 WebP, 157 M4V, 156 PNG, 1 MP4. | Media manifest и route-level budget; archive не се eager-load-ва. |

---

## 4. Problems и приоритизация

### P0 — критични преди какъвто и да е редизайн

1. **FACT — Sitemap съдържа 404:** `/en/knowledge-base/` е indexable sitemap entry и отговаря с 404.
   - **RECOMMENDATION:** избери canonical EN knowledge-base index или премахни route от sitemap; добави route test, който изисква 200 за всеки sitemap URL.
   - **Definition:** sitemap и HTTP inventory трябва да са 1:1 без неочаквани 4xx/5xx.

2. **FACT — Архивираният checkout е dirty:** има 11 modified source файла и 23 deleted assets от предходна работа.
   - **RECOMMENDATION:** преди design branch направи read-only baseline manifest: commit, `git diff --name-status`, sitemap URL list, asset manifest и production CSS hash. Не прави `reset`, `checkout` или възстановяване без отделна задача.

3. **NEEDS DECISION / юридически преглед:** public pricing описва лицензи, изключителност и пълно прехвърляне на имуществени права.
   - **RECOMMENDATION:** юрист да одобри разграничението между стандартно договорено ползване, лиценз, изключителен лиценз и прехвърляне на права; UX да показва кратко обяснение и връзка към одобрените условия.

### P1 — високи: позициониране, UX и портфолио

1. Home sequence поставя доказателствата за работа след services/pricing/process.
2. Featured carousel показва само един проект на момент и не казва ясно какъв тип работа или резултат доказва.
3. Проектният detail шаблон приоритизира archive count пред задача/индустрия/година/обхват/резултат.
4. Във всички project records липсва системно попълнено поле за live URL, device capture, technology, measurable outcome и клиентско разрешение за публикуване.
5. Три service macro-groups вече са в навигацията, но това не управлява достатъчно ясно homepage/service index/price catalog.
6. Гранулирани цени за видео и права са изложени като продуктови редове, без достатъчен контекст за стойност и минимален обхват.

### P2 — средни: съдържание и последователност

1. **FACT:** в BG source често се повтарят „система“ (326), „контекст“ (176), „обхват“ (159), „ясна/ясен“ (189), „реална употреба“ (30). Това включва content и code, не е linguistic corpus score.
   - **INFERENCE:** повтаряемостта може да изравни гласа между услуги, case studies и home.
2. Английските конструкции трябва да се редактират като original English, не като огледален превод на BG синтаксис.
3. Testimonials са реално атрибутирани, но два са много общи; не доказват специфично web/brand компетентност.
4. About page трябва да отговори на operating model и отговорност, без да превръща студиото в лична биография.

### P3 — polish: UI и motion

1. Усъвършенстване на type scale, editorial whitespace и image choreography след одобрена IA.
2. Motion да бъде задача с ясна функция: orientation, feedback или narrative transition.
3. Еднакви hover/focus transition правила и route-level dark-mode visual check.

---

## 5. Proposed information architecture

### Целева таксономия

**RECOMMENDATION:** запази URL адресите и SEO клъстерите; промени само навигационния и редакционния слой.

| Ниво | Предложение | Какво остава под него |
| --- | --- | --- |
| Brand | Brand identity, visual systems, graphic applications. | Existing brand and graphic-design routes. |
| Content | Content strategy, creation, social operations, campaign communications. | Existing content/social/advertising routes. |
| Web | Web strategy, design, development, integrations, support. | Existing web-design-development, web-design, web-development, support routes. |
| Visibility | Technical SEO, GEO, performance, content discoverability. | Existing SEO, GEO, performance routes. |
| Work | Selected work, Case studies, Archive. | Existing project URLs; no URL deletion in phase 1. |
| Start | Estimator, pricing entry points, contact. | Existing conversion flow. |

**DECIDED:** Brand, Content, Web и Visibility са public navigation и communication labels. Те не изискват изтриване, пренасочване или сливане на съществуващите service URL адреси. Route-level SEO intent map остава задължителен предпазител преди каквато и да е future content consolidation.

### URL и SEO предпазител

- Не се изтрива или преименува existing service URL заради по-чиста навигация.
- Ако две service pages се консолидират редакционно, по-специфичният URL запазва unique intent, canonical, cross-link и самостоятелен content threshold.
- Нови landing pages се добавят само при различим user intent и доказана content ownership.

---

## 6. Homepage plan

### Одобрена последователност

1. **Hero:** една централна теза за качеството на дигиталните продукти; кратък supporting proof; две CTA — `Виж избрана работа` и `Започни проект`.
2. **Selected Work:** непосредствено след Hero, като **Editorial proof strip**. d . media е водещият проект; Support Account, Support Account Group, Apple Community Bulgaria и DJ NEDI остават едновременно ясно видими около него. Всяка карта съдържа тип работа, задача и доказателство, не само име и изображение.
3. **Operating model:** четирите macro направления, не пълен списък от услуги.
4. **Proof of practice:** кратък self-case за d . media като Astro/Cloudflare/SEO/GEO доказателство, без да измества клиентската работа.
5. **Case-study teaser:** 2–3 дълбоки истории с различен тип резултат.
6. **Process:** съкратен до етапи, които намаляват риск за клиента; пълният workflow остава на dedicated route.
7. **Social proof:** само конкретни testimonials или ясно обозначен контекст на цитата.
8. **Start path:** estimator за неясен обхват, contact за ясен обхват.
9. **Pricing:** само високосмислени category entry points, линк към подробния каталог; без дребни единични услуги на home.
10. **Footer:** финален CTA + concise navigation + legal layer.

**Защо този ред:** първо показва резултат, после обяснява capability, после намалява риска, а накрая квалифицира запитването. Това запазва техническата сериозност без страницата да започва като service brochure.

### Home content rules

- Не се премахва съществуващият hero copy без copy review и business decision.
- Всеки section има едно job-to-be-done; не дублира „яснота/система/реална употреба“ от предишната.
- Не се използва carousel по подразбиране. Ако избраният от собственика вариант е carousel, той трябва да има видим index, pause control, keyboard behavior и достатъчен project context.
- No autoplay video above the fold без доказана LCP и mobile battery стойност.

### Конкретни ценови рамки за homepage

**RECOMMENDATION:** homepage да показва само три ориентировъчни рамки, след Selected Work и primary направленията:

| Категория | Рамка от текущия каталог | Защо има място на home |
| --- | --- | --- |
| Brand identity | от **699,99 €** | Показва, че visual-system work е самостоятелен стратегически обхват, не евтин единичен файл. |
| Corporate website | от **2 490 €** | Дава ясен ориентир за основния web entry point. |
| Digital platform | от **4 990 €** | Показва посока за сложна, интегрирана web работа без да обещава фиксирана крайна цена. |

**FACT:** и трите стойности вече са в подробния price catalog. **DECIDED:** избран е вариант 2A с горните три рамки. Цените `25 €`, `50 €` и rate-card цени на секунда остават само в детайлния каталог. `Digital platform` не използва `premium` като етикет; възприемането на висок клас трябва да бъде заслужено чрез работа и изпълнение.

---

## 7. Service pages plan

### Общ service template

1. Проблем и желан резултат.
2. За кого е / за кого не е.
3. Обхват и deliverables на ниво категория.
4. Relevant proof / case study.
5. Работен ред и dependencies.
6. Начална инвестиционна рамка или „индивидуален обхват“.
7. CTA към estimator/contact.
8. Свързани услуги и статии само при distinct intent.

### Страница по страница

| Cluster | План |
| --- | --- |
| Brand identity | Ясно разграничи logo, identity system и brand application; покажи 1–2 case proof-а. |
| Content creation | Опиши стратегия, formats, editorial governance и approval model; не смесвай monthly operations. |
| Social media management | Опиши роля, cadence, community/approval/reporting boundaries; cross-link към content creation. |
| Content + social | Реши дали това е bundle landing page или editorial overview. Не трябва да дублира двете специализации. |
| Graphic design | Позиционирай като application layer, не списък от дребни формати на първия екран. |
| Advertising | Направи цените резултат от brief variables; granular rate card да е secondary/downloadable/disclosure слой. |
| Rights and charges | Премести от primary service discovery към commercial conditions / pricing/legal context. Публикуването остава само след legal sign-off. |
| Web design / development / combined | Създай intent map: design, implementation, full delivery. Запази URL-ите и отличи обещание, deliverable и interlinking. |
| SEO / GEO / performance / support | Покажи dependency chain: crawlable technical base → performance → content/entity clarity → ongoing support. Не обещавай ranking или „visibility“ без qualification. |

---

## 8. Portfolio plan

### Фиксирани кандидати за Selected Work

| Проект | Какво е налично и какво доказва | Може ли да бъде пълен case study | Какво липсва за убедително публично представяне |
| --- | --- | --- | --- |
| **d . media** | **FACT:** 4 brand-application изображения, подробен source case-study narrative, Astro/Cloudflare migration, BG/EN, SEO/GEO, формa, estimator и архив от 155 motion варианта. Доказва едновременно бранд система, web architecture, production discipline и motion direction. | Да; това е основният technical-plus-creative self case. | Current performance claims трябва да бъдат преизмерени и versioned; нужни са curated desktop/mobile browser views и 3–5 подбрани motion примера, не пълен motion архив в основната история. |
| **Support Account** | **FACT:** 3 основни archive изображения, 7 оптимизирани logo/mockup assets и 1 logo-animation video. Доказва corporate identity, bilingual/logotype system и motion application за business context. | Да, като visual-identity case study. | Нужни са задача/индустрия/година, реални application contexts, яснота за обхвата и проверим резултат. Не е доказано наличие на уеб проект. Публичното представяне е разрешено; manifest-ът само валидира конкретния evidence set. |
| **Support Account Group** | **FACT:** 2 основни archive изображения и 5 оптимизирани logo/mockup assets. Доказва brand architecture: отделна марка, свързана със Support Account, без смесване на идентичностите. | Да, но като по-къс/paired brand-architecture case с Support Account. | Нужни са конкретен brief, правила на връзката между марките, приложения извън logo mockups и бизнес контекст. Публичното представяне е разрешено; manifest-ът само валидира конкретния evidence set. |
| **Apple Community Bulgaria** | **FACT:** архивираният `HEAD` source описва 22 графични материала: logo/logotype, community/sales/AirPods/podcast covers, Christmas/New Year variants; проверен архив от 93 файла/около 1,29 GB, audio, video и podcast materials. Доказва owned media ecosystem, visual system, community/content, audio, video и lifecycle thinking. | Да; това е най-широкият non-client case study кандидат. | В текущия checkout Apple assets са премахнати от предходна работа и не са налични за runtime. Преди implementation са нужни controlled asset recovery, актуален publication review, curated narrative и ясно разграничение между проверени архивни факти и непознати historical metrics. |
| **DJ NEDI** | **FACT:** официалното source title е `DJ NEDI`; има 3 source archive изображения, 6 оптимизирани assets, black/white logo versions, Dynamite cover и YouTube thumbnails. Доказва music/entertainment visual identity, cover art и video-platform application. | Да, като компактен visual campaign/digital release case. | Нужни са project year/brief, авторска роля, live/video link ако е наличен, допълнителни application views и проверим резултат. Публичното представяне е разрешено; manifest-ът само валидира конкретния evidence set. |

**FACT:** Apple Community Bulgaria в момента не е в production portfolio, защото текущият checkout има премахнати свързани assets и data от предходна recovery работа. Това не отменя решението да бъде кандидат за Selected Work; означава само, че Phase 1 трябва да създаде доказуем asset/rights manifest преди публична употреба.

**RECOMMENDATION:** Selected Work да показва пет различими аспекта на d . media: self web platform, corporate identity, brand architecture, owned media ecosystem и entertainment/digital visual application. Така наборът доказва баланса между творческа и техническа работа, вместо да повтаря пет сходни лого проекта.

### Content model за всеки проект

**RECOMMENDATION:** въведи задължителни полета преди визуална промяна:

`client`, `industry`, `year`, `engagement type`, `challenge`, `scope`, `deliverables`, `role`, `platform/technology` (ако е публично), `desktop capture`, `mobile capture`, `live URL` (ако е позволен), `result` (само проверим), `testimonial` (ако е разрешен), `archive status`, `publication permission`.

### Public layers

| Layer | Цел | Правило |
| --- | --- | --- |
| Selected work | 5–8 най-силни и актуални доказателства. | Всяка работа трябва да има ясна задача, визуална теза и доказуем обхват. |
| Case studies | Дълбоки истории за избрани проекти. | Не показва file count като водеща метрика; използва challenge → decision → delivery → result. |
| Archive | Исторически, експериментални и format-based материали. | Филтруем/secondary; не конкурира selected work в home. |

### Web case-study minimum

- desktop + mobile evidence;
- информационна архитектура/UX решение;
- технически избор само ако е публичен и релевантен;
- accessibility/performance decision, когато е измерен;
- live URL или ясно обяснение защо не се публикува;
- резултат само с първичен източник или етикет `непубличен`.

**DECIDED:** всички други проекти могат да бъдат публично представени. Miss 18 е временно непубличен до изрично клиентско одобрение, но остава в отделния вътрешен evidence inventory и future-case-study анализ. Evidence manifest не е нов процес за permission; той разделя налични факти от непроверени твърдения. Live URL, резултат, метрика или клиентски цитат се публикуват само ако са налични и доказуеми.

---

## 9. Content plan — BG и EN

### Разширена страница „За бранда“ — история на марката, не на човек

**DECIDED:** About може да бъде значително разширена, но е история на d . media като марка и система. Не съдържа лично име, портрет, лична биография, работодател, военна принадлежност, конкретни лични данни, други комбинации от данни, които идентифицират основателя, или предишни brand форми/имена, съдържащи фамилията `Dragoev`.

**RECOMMENDATION:** използвай следната public структура, само с проверими brand-level факти:

1. **Произход:** защо съществува d . media и какъв проблем е създадена да решава.
2. **Ранни форми:** само проверими предишни публични форми на марката, които не съдържат фамилията `Dragoev` и не идентифицират физическото лице зад бранда.
3. **Развитие на практиката:** от визуални приложения към бранд системи, съдържание, уеб платформи и visibility.
4. **Развитие на web presence:** кратка, проверима chronology на ключови публични версии и прехода към Astro/Cloudflare; site history е evidence layer, не substitute за narrative.
5. **Как работи студиото днес:** принципи, quality bar, process и accountability на ниво studio.
6. **Работа и доказателства:** links към Selected Work, case studies и подходящи service paths.

**RESTRICTION:** chronology не включва никое предишно име или форма с фамилията `Dragoev`, дори да е публично налично и проверимо. Останалите периоди, години и артефакти минават през fact verification, не през ново permission искане.

### Редакционна граница

| Surface | Роля |
| --- | --- |
| Blog | Позиции, анализи, актуални наблюдения, case-study narratives и opinionated studio perspective. |
| Knowledge Base | Evergreen definitions, frameworks и систематични reference guides. |
| Service pages | Commercial intent, scope, qualification и proof. |
| Authority pages | Machine-readable/overview content, без да конкурират pillar статии. |

### Audit и действия

1. Направи URL-level content inventory с topic, intent, primary keyword, language pair, cluster, last modified, internal links и CTA.
2. Изгради cannibalization matrix за `web design`, `web development`, `web design and development`, technical SEO и GEO. Решението е merge, differentiate или no-change — не механично deletion.
3. Във BG copy намали абстрактните повторения чрез конкретни глаголи, decision evidence и различни syntactic patterns. Термини като Astro, Cloudflare, SEO, GEO, CRM и structured data се запазват, когато назовават конкретна технология/стандарт; останалите се превеждат естествено.
4. EN copy се пише като native studio copy. Избягват се буквални конструкции като `working digital environment`, `ordered communication`, `next working rhythm`, `stable delivery`, освен ако не са пренаписани в естествен конкретен контекст.
5. Не се променят blog статии без `EDITORIAL_SYSTEM/` review, evidence check, internal-link plan и BG/EN решение.

---

## 10. UX plan

### Основни сценарии

| Сценарий | Текущо доказано | Бъдещ критерий |
| --- | --- | --- |
| Нужен е нов сайт | Services, pricing, estimator и contact са достъпни. | До 2 scroll depths потребителят вижда релевантен web proof, entry price range и next step. |
| Нужна е идентичност | Има service route, pricing и projects. | Вижда визуален case proof преди rate card. |
| Търси SEO/GEO | Има dedicated routes и technical trust strip. | Разбира dependencies, граници на обещанието и първата практична стъпка. |
| Не знае какво му трябва | Estimator е петстъпков и запазва изборите в `localStorage`. | Получава ориентир, без да се чувства принуден да избере неподходяща услуга. |
| Само разглежда | Има projects, blog, case studies и footer links. | Home предлага ясни evidence paths без повтарящи CTA. |

### Forms и estimator

**FACT:** form има required fields, autocomplete за име/e-mail/организация, client/server validation, `aria-live` status, honeypot, Turnstile, rate limiting, D1 persistence, Brevo sync и explicit inquiry consent. Estimator има fieldsets, step navigation, validation, result live region и state persistence.

**RECOMMENDATION:**

- Запази квалификацията; не махай полета по усещане.
- Измери real completion/drop-off по consented analytics преди премахване на стъпка.
- Дай на всяка estimator стъпка ясно обяснение „защо питаме“ и `save/continue later` policy само след privacy review.
- Добави automated keyboard regression: skip link, desktop menu, mobile menu, estimator selection, validation errors, form success/error state.

---

## 11. Visual system plan

### Визуална цел и изборен протокол

**DECIDED:** целта е „зрял и впечатляващ“ сайт, който заслужава възприемане като студио от висок клас чрез качество на изпълнението, а не чрез думата `premium` като claim.

При всяко съществено визуално решение дизайнерският пакет към собственика съдържа максимум три варианта. Всеки вариант показва на нормален език: как изглежда, какво усещане създава, какво печелим, какво губим, какво струва за производителност и кой е препоръчаният вариант. Без избран вариант не се започва implementation на съответната повърхност.

### Неприкосновени основи

- Официално лого `d . media`.
- Основна черно/бяла цветова система, светла и тъмна тема.
- Panton/Panton-BG като brand type family.
- Минимализъм, без неон, glassmorphism, декоративен WebGL, изкуствен курсор или паралакс без функция.
- Временно ограничение за Miss 18: до изрично клиентско одобрение не се използва в public visual, case-study, content, marketing proof, production portfolio или discovery повърхност. Проектът остава разрешен единствено за вътрешен evidence анализ и подготовка.

### Планирани правила

1. **Typography:** formalize 6–7 text roles, line-height/measure constraints и BG/EN responsive pair testing; не смяна на шрифт.
2. **Grid:** един container scale, ясна max text measure и 4/8 pt spacing tokens; измерване на 320, 375, 390, 430, 768, 1024, 1280, 1440, 1728 и 1920 px.
3. **Cards:** cards да носят content hierarchy, не само border/radius; различи proof card, service entry, archive item и form state.
4. **Imagery:** изображенията да показват външен контекст, browser/mobile views и system application; не gallery of files без editorial selection.
5. **Motion:** 150–240 ms feedback за controls; one purposeful editorial transition per view; `prefers-reduced-motion` остава hard requirement.
6. **Theme:** всеки нов surface се проверява в light/dark за contrast, image treatment, focus и brandmark legibility.

### Panton audit requirements

**FACT:** production използва subset WOFF2 Panton files с `font-display: swap`; root tokens дефинират Panton Light/Regular/SemiBold/Bold/Black.

**RECOMMENDATION:** преди финален типографски дизайн измери font fallback swap/CLS на slow mobile, кирилица + латиница в реални headings, weight availability и preload necessity. Не preload-вай всички weights.

---

## 12. Technical plan

1. **Baseline manifest:** commit state, production HTML/CSS fingerprints, all sitemap response codes, route screenshots and asset inventory. This is a gate, not cleanup.
2. **Astro:** запази static-first model. Interactive code остава в estimator, form, theme, nav и gallery behavior; не въвеждай framework dependency за presentation-only sections.
3. **CSS:** token audit → remove confirmed duplicate declarations only in a dedicated refactor task → componentize repeated patterns. Не създавай втори global stylesheet.
4. **JavaScript:** budget per route; home currently 12,546 B inline JS, contact 31,493 B, estimator 49,993 B. Измери compressed transfer and CPU before/after, not source length alone.
5. **Assets:** route manifest should declare hero/featured critical assets, lazy secondary assets, explicit media dimensions, poster strategy, and archive loading boundaries. Do not infer that 580 MB repository media is eager transfer.
6. **Cloudflare:** запази `_headers`, `_redirects`, Functions middleware и contact API boundaries. Production headers already include HSTS, CSP `frame-ancestors 'none'`, `nosniff`, strict referrer policy and restrictive permissions policy.
7. **Analytics/consent:** `Layout.astro` records consent in `localStorage` and emits only internal `dmedia:analytics` events after acceptance. Production HTML check did not find GA/GTM/Meta runtime scripts. Before introducing a vendor, document data flow, vendor, lawful basis, opt-out and privacy-page change.

---

## 13. SEO/GEO plan

**FACT:** home exposes canonical, BG/EN/x-default hreflang and three JSON-LD blocks. Code has Organization/ProfessionalService, WebSite, WebPage, breadcrumb, CreativeWork, Service and OfferCatalog schema helpers. Public `robots.txt` and three `llms` files return 200.

### Tasks

1. Fix sitemap 404 before launch.
2. Export pre-redesign URL/canonical/title/meta/hreflang/schema inventory; compare post-redesign with exact route diff.
3. Protect all existing service/blog/project routes unless a redirect map and intent decision are approved.
4. Validate every canonical self-reference, language alternate reciprocity, social image and breadcrumb after each route batch.
5. Map internal links by cluster; no generic `related content` blocks without semantic relation.
6. Maintain clear entity facts: brand name, contact point, languages, service scope, location and social profiles. Do not fabricate awards, team size, outcomes or client relationships.
7. Keep `llms` files only as concise, factual discovery surfaces. They are not an AI-ranking guarantee.

---

## 14. Accessibility plan

### Confirmed strengths

- semantic landmarks and headings on home;
- skip link;
- labelled theme and language controls;
- mobile menu separate from hidden desktop navigation;
- form status via `role=status` / `aria-live`;
- estimator fieldsets/legends and reduced-motion CSS.

### Required future validation

1. Automated axe/HTML semantic scan on all templates in BG/EN/light/dark.
2. Keyboard test: menu open/close, focus containment or safe focus order, escape behavior, gallery, theme and language controls.
3. Test 44 × 44 px interactive target minimum on touch viewports.
4. Test form error focus, persistent error messages, Turnstile keyboard behavior and server error recovery without submission of real data.
5. Verify all hidden desktop/mobile nav controls are not tab-reachable in their hidden state.
6. Test contrast with actual rendered images, not token values only.
7. Screen-reader pass with a representative home, service, project, estimator and contact route.

---

## 15. Performance budget

The following are release gates, not retrospective claims about the current site.

| Metric | Budget |
| --- | --- |
| Route JS, home | ≤ 20 KB compressed initial custom JS; no new framework runtime for static sections. |
| Route JS, contact | ≤ 40 KB compressed initial custom JS excluding third-party anti-spam script, justified separately. |
| Route JS, estimator | ≤ 60 KB compressed initial custom JS; interaction CPU must be measured on mid-tier mobile. |
| CSS | Existing critical CSS must not grow >15% without an approved design-system reason; remove confirmed dead/duplicate CSS first. |
| Fonts | WOFF2 only in initial path; ≤2 critical weights per route; no render-blocking all-weight preload. |
| Images | Explicit dimensions; hero/first proof route budget defined per asset; below-fold lazy; no uncompressed PNG used where WebP is suitable. |
| Video | No autoplay with audio; `preload=metadata` or `none` outside intentional lead media; poster and mobile fallback required. |
| LCP | p75 mobile ≤2.5 s and desktop ≤2.0 s on defined production synthetic profile. |
| CLS | ≤0.05 per route, with no individual layout shift above 0.025 from font/media/menu changes. |
| INP | p75 ≤200 ms; no animation tied to scroll that blocks main thread. |
| TTFB | Keep production median below 0.4 s; investigate if p75 grows materially from current single-check ~0.16 s. |

**NEEDS DECISION:** exact device/network test profile and monitoring vendor. These budgets should be finalized from real-user data, not only lab runs.

---

## 16. Migration и regression strategy

### Before implementation

- Export all 248 sitemap URL addresses with response code, canonical, title, description, hreflang, robots directive and JSON-LD type list.
- Capture desktop/mobile reference screenshots for page-template representatives, not every content instance: home, services index/detail, pricing, selected project, archive project, blog, knowledge base, about, estimator, contact, legal.
- Save route-specific Lighthouse/Playwright/axe results and test with dark/light themes.
- Freeze a content manifest with project/media ownership and permitted public evidence.

### During implementation

- One route family per PR/approval slice: design tokens → home → projects → services → content templates → conversion → SEO QA.
- Maintain redirect map before a route is removed; forbid deployment if any old sitemap URL is unmapped.
- Use visual regression at all required widths and template states.
- Do not deploy from a dirty baseline branch without explicit owner decision.

### Before release

- Crawl sitemap and all internal links; zero unexpected 4xx/5xx.
- Compare canonical/hreflang/schema/meta inventory.
- Run form endpoint in a non-production test environment with approved test mailbox and Turnstile configuration; do not send live enquiries as QA.
- Check `robots.txt`, `llms*.txt`, `manifest`, social images, redirects and Cloudflare headers.
- Approve a performance diff and accessibility defect list; P0/P1 must be closed or accepted in writing.

---

## Решения, затворени преди Phase 1

Всички решения, които блокираха Phase 1, са взети:

1. **1A — Editorial proof strip:** d . media е водещият проект; останалите четири са ясно видими около него.
2. **2A — три ценови рамки:** Brand identity от 699,99 €, Corporate website от 2 490 € и Digital platform от 4 990 €.
3. **3A — Brand chronology + доказателства:** само brand-level история; без лични идентификатори и без предишни имена/форми с `Dragoev`.
4. **4A — Apple Community curated recovery:** връщат се само най-силните материали; public case е case study, не архивна галерия.
5. **5A — evidence manifest:** всички други проекти са разрешени за public presentation. Miss 18 е временно непубличен до клиентско одобрение, но се запазва за вътрешен evidence анализ; manifest-ът проверява конкретните assets и claims, без да изисква ново разрешение за останалите проекти.

**Статус:** няма отворено owner решение, което блокира Phase 1. Всяко бъдещо голямо визуално решение продължава да минава през максимум три ясни варианта и изричен избор преди implementation.

---

## 17. Execution phases

### Phase 0 — baseline and decisions

- Fix/classify `/en/knowledge-base/` sitemap mismatch.
- Capture baseline manifest and explicitly resolve dirty archived checkout status.
- Review legal wording and the specific licenses/rights behind assets or third-party materials; this is not a request for new project-publication permission.
- Record the accepted 1A/2A/3A/4A/5A decisions and maintain the project evidence manifest.
- **Exit gate for implementation:** technical baseline is classified, Selected Work evidence boundary is approved and there are no unknown P0 blockers. This gate does not block the research-only work in Phase 1.

### Phase 1 — content and portfolio model

- Populate required project metadata for the fixed Selected Work set: d . media, Support Account, Support Account Group, Apple Community Bulgaria and DJ NEDI.
- Do not include Miss 18 in the current public inventory, Selected Work set, visual selection or content plan. Maintain it only in the internal evidence inventory and re-evaluate it as a Selected Work candidate after explicit client approval.
- Build topic/intent matrix for blog, knowledge base and web-service routes.
- Produce BG/EN voice guide with approved examples and prohibited literal constructions; prepare fact-approved brand chronology without personal identification.
- **Exit gate:** every selected project has sufficient proof; no invented metrics or claims.

### Phase 2 — IA and wireframes

- Approve macro taxonomy, homepage sequence, service page template and portfolio layers.
- Produce content-first wireframes at mobile and desktop.
- **Exit gate:** owner approves hierarchy before high-fidelity design or code.

### Phase 3 — design system

- Formalize tokens, grid, type roles, card families, controls, focus, dark mode and motion rules.
- Validate Panton and contrast on BG/EN content.
- **Exit gate:** component catalogue passes responsive/accessibility review without new heavy dependencies.

### Phase 4 — homepage and selected work

- Implement approved home hierarchy and selected-work evidence model.
- Preserve current URL, analytics consent and performance budget.
- **Exit gate:** mobile/desktop visual regression, keyboard flow and LCP budget pass.

### Phase 5 — projects and case studies

- Implement selected/case/archive templates using approved metadata.
- Separate archive file counts from primary case-study facts.
- **Exit gate:** every project route preserves SEO and media behavior; archive remains discoverable.

### Phase 6 — services, pricing and conversion

- Apply service template and intent mapping; revise entry-point pricing presentation after legal/business approval.
- Validate estimator and contact handoff end-to-end in test environment.
- **Exit gate:** no service intent conflict, no degraded qualification or form accessibility.

### Phase 7 — content, SEO/GEO and localization

- Execute editorial revisions by cluster; preserve or redirect old URLs.
- Validate BG/EN pairs, schema, sitemap, internal links and machine-readable surfaces.
- **Exit gate:** complete SEO diff with no unapproved route loss or duplicate intent.

### Phase 8 — release QA

- Execute crawl, link, schema, accessibility, mobile/desktop visual, performance and form regression gates.
- Deploy only after owner sign-off.

---

## 18. Definition of Done

The redesign is done only when all conditions are true:

1. Every production sitemap URL returns the intended response; no accidental 404 such as the current EN knowledge-base entry remains.
2. All historical public URLs are preserved or have approved, tested 301 redirects.
3. BG/EN canonical and hreflang pairs, metadata, structured data, `robots.txt` and `llms` files pass a route-level comparison.
4. The homepage shows selected work before detailed service/pricing explanation and each selected item communicates a real scope/proof.
5. Portfolio has an approved Selected work / Case studies / Archive model; no project claim lacks a source or permission.
6. Service pages have distinct user intent, scope, proof and CTA; rights/pricing language has legal approval where required.
7. Contact and estimator pass keyboard, validation, error, success, anti-spam and data-handoff tests in a safe test setup.
8. Screen-reader, keyboard, contrast, touch target and reduced-motion checks have no unresolved P0/P1 defect.
9. Performance budgets for JS, CSS, fonts, images, video, LCP, CLS and INP pass on the agreed device/network profile.
10. No visual regression is unresolved at 320, 375, 390, 430, 768, 1024, 1280, 1440, 1728 and 1920 px in light and dark mode where applicable.
11. The final diff is limited to approved design/content/technical scope; no production deployment, commit or push occurs without explicit authorization.

---

## Appendix A — evidence log

- Production route/header checks: 13 Sep 2026; home, sitemap, robots, llms files and `/en/knowledge-base/`.
- Production sitemap: 248 URLs; `/en/knowledge-base/` returns 404.
- Production home: Hero → services → benefits → pricing → process → projects; mobile width 320 px has no horizontal overflow in browser check.
- Production performance spot-check: home TTFB 0.159795 s / 50 882 B HTML; `d-media` project TTFB 0.154969 s / 123 980 B HTML. These are point-in-time, not Core Web Vitals.
- Code: Astro `^6.4.4`; 85 pages, 11 components, 24 libs, 2 layouts; `npm run lint` passed.
- Compiled production CSS: 169 787 B. Inline script source length: home 12 546 B; contact 31 493 B; estimator 49 993 B.
- Assets: 582 files / 580.2 MB repository total; sizes do not imply eager network transfer.
- Prior recovery memory was used only to locate the archived production-baseline checkout and to require parity caution; it was revalidated against current git and production responses.
