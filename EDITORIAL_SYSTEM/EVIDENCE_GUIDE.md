# Evidence Guide 1.0

## Purpose

Този документ описва как DMA изгражда Evidence Map преди писане на блог статия за `d . media`.

Evidence Map е задължителна стъпка между Research и Outline. Тя пази статията от недоказуеми твърдения, общи изводи, слаби примери и технически неточности.

DMA няма право да започва Writing без завършен Evidence Map.

## Scope

Evidence Map се използва за:

- всяка нова блог статия;
- всяко пълно пренаписване на съществуваща статия;
- всяка редакция, която добавя технически, SEO/GEO, AI visibility, performance, legal, pricing или architecture твърдения;
- всяка статия, която използва реални project, build, Cloudflare, Astro, schema, sitemap, robots, `llms.txt`, accessibility или automation факти.

Evidence Map не заменя Research. Research определя проблема и обхвата. Evidence Map доказва какво може да бъде казано безопасно във всяка секция.

## Evidence Map Requirement

Преди Writing за всяка бъдеща H2 секция трябва да има попълнена Evidence Map.

За всяка H2 DMA записва:

- основното твърдение;
- доказуемите факти;
- официалните източници;
- техническите спецификации;
- практически примери;
- вътрешните връзки;
- допустимите изводи;
- недопустимите твърдения;
- какво е факт;
- какво е извод;
- какво е препоръка;
- какво не може да бъде доказано.

Ако H2 няма достатъчно доказателства, тя не преминава към Writing. Секцията трябва да бъде пренаписана, свита до H3, премахната или маркирана за Project Owner решение.

## Evidence Quality

Доказателствата се подреждат по надеждност:

1. Репозиторията на `d . media`: source code, Astro content, scripts, config, public files, schema, sitemap, robots, `llms.txt`, reports.
2. Активните source of truth документи: `SOURCE_OF_TRUTH.md`, `DECISIONS.md`, `PROJECT.md`, `KNOWLEDGE_BASE.md`, `OWNER_REQUIREMENTS.md`, `EDITORIAL_SYSTEM/`.
3. Официална документация на използваните технологии: Astro, Cloudflare, Wrangler, schema.org, robots, sitemap protocol.
4. Доказуеми локални QA резултати: `npm run qa`, `npm run seo-check`, `npm run browser-qa`, `npm run release`, generated reports.
5. Практически пример от текущия сайт или от публична структура на `d . media`.
6. Обоснован извод, ясно отделен от факт.

Не използвай непроверени твърдения като доказателство.

## Fact, Inference, Recommendation

Всяко важно твърдение трябва да бъде класифицирано.

Факт:

- може да бъде проверен в репозиторията, официална спецификация или изпълнена проверка;
- не зависи от мнение;
- може да бъде цитиран в статията без условност.

Извод:

- следва логически от факти;
- трябва да бъде формулиран като интерпретация, не като абсолютна истина;
- не трябва да създава гаранции.

Препоръка:

- описва какво е разумно да се направи;
- трябва да има причина;
- не трябва да обещава резултат извън контрола на `d . media`.

Недоказуемо:

- няма източник;
- не може да бъде проверено локално;
- зависи от външна платформа или бъдещо поведение;
- изисква Project Owner, legal, pricing или live production потвърждение.

Недоказуемите твърдения не се публикуват като факти. Ако са важни, се маркират:

```text
Нуждае се от потвърждение.
```

## Official Sources

Когато статията съдържа технически твърдения, DMA трябва да провери официални източници или repository facts.

Примери:

- Astro поведение: official Astro docs или текущата Astro конфигурация в проекта.
- Cloudflare Pages/Wrangler поведение: official Cloudflare docs или `wrangler.toml` и scripts в проекта.
- schema твърдения: schema.org и текущият JSON-LD output.
- sitemap твърдения: sitemap protocol и текущият `sitemap.xml`.
- robots твърдения: robots правила и текущият `robots.txt`.
- `llms.txt` твърдения: текущите публични `llms` файлове и ясно ограничение, че това не е официален ranking фактор.
- AI visibility твърдения: само като яснота, структура и извличаемост, не като гарантирано цитиране.

## Practical Examples

Практическите примери трябва да бъдат максимално реални.

Предпочитан ред:

1. реален пример от `d . media`;
2. реален код или структура от репозиторията;
3. реален screenshot или generated report, ако задачата позволява visuals;
4. реална диаграма на текущия flow;
5. примерен код;
6. измислен пример.

Измислен пример се използва само когато няма безопасен реален пример или когато реалният пример би публикувал вътрешна, legal, pricing, owner или client-sensitive информация.

## Evidence Map Template

```text
Article:

H2:

Main claim:

Proven facts:
-

Official sources:
-

Technical specifications:
-

Practical examples:
-

Internal links:
-

Allowed conclusions:
-

Disallowed claims:
-

Fact:
-

Inference:
-

Recommendation:
-

Cannot be proven:
-

Evidence status:
PASS / FAIL

Decision:
Keep as H2 / Convert to H3 / Merge / Remove / Needs Project Owner decision
```

## Validation Rules

Evidence Map минава само ако:

- всяка H2 има main claim;
- всяко техническо твърдение има източник;
- всяка препоръка има причина;
- всеки пример е реален или ясно обозначен като realistic example;
- няма гаранции за SEO ranking, AI citation, PageSpeed, legal или pricing резултат без доказателство;
- всяка вътрешна връзка има логическа причина;
- ясно е отделено какво е факт, какво е извод и какво е препоръка.

## Examples

Добро Evidence Map твърдение:

- Факт: `astro/astro.config.mjs` задава `output: "static"`.
- Извод: Production сайтът е оптимизиран за статичен output.
- Препоръка: QA за production съдържание трябва да проверява Astro output, не само root Next.js build.

Слабо Evidence Map твърдение:

- „GEO гарантира, че AI системите ще цитират сайта.“

Причина за отказ:

- Това не може да бъде доказано.
- Външните AI системи не се контролират от проекта.
- Твърдението създава недопустимо обещание.

## Related Documents

- `EDITORIAL_SYSTEM/README.md`
- `EDITORIAL_SYSTEM/EDITORIAL_STANDARDS.md`
- `EDITORIAL_SYSTEM/ARTICLE_STRUCTURE.md`
- `EDITORIAL_SYSTEM/WRITING_GUIDE.md`
- `EDITORIAL_SYSTEM/REVIEW_CHECKLIST.md`
- `OWNER_REQUIREMENTS.md`
