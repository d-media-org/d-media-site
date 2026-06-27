# CHECKLIST.md

## Преди започване

- Разбирам ли задачата напълно?
- Ако не, зададох ли един кратък въпрос?
- Ясен ли е разрешеният обхват?
- Ясно ли е кои файлове могат да бъдат редактирани?
- Прочетени ли са задължителните инструкции: `AGENTS.md`, `OWNER_REQUIREMENTS.md`, `CHECKLIST.md`, `PROJECT.md`, `KNOWLEDGE_BASE.md`, `OPEN_QUESTIONS.md`, `SOP-001-EXECUTE_TASK.md`?
- Има ли забранени зони: source code, Astro компоненти, TypeScript, CSS, `public`, package файлове, конфигурации, CI/CD, assets?
- Може ли задачата да се реши с по-малко промени?
- Добавям ли нещо, което не е поискано?

## Преди приключване

- Променени ли са само разрешените файлове?
- Няма ли странични подобрения?
- Няма ли измислена или непотвърдена информация?
- Ако има непотвърдена информация, маркирана ли е с `Нуждае се от потвърждение.`?
- Ако задачата засяга сайта, изпълнени ли са релевантните проверки?
- Ако задачата е документационна, проверен ли е `git status --short`?
- Финалният отчет съдържа ли секциите:
  - Какво е направено
  - Кои файлове са променени
  - Какво не е променено
  - Какво трябва да бъде проверено ръчно

## Проверки за website задачи

- `npm run qa`, когато задачата засяга code/build/production readiness и не изисква browser QA
- `npm run browser-qa`, когато задачата засяга routes, responsive поведение, визуално поведение, navigation или video poster поведение
- `npm run seo-check`, когато задачата засяга SEO, GEO, AI visibility, schema, sitemap, robots, `llms.txt` или Markdown negotiation
- `npm run release-check`, преди release/deploy след production-relevant промени
- `npm run smart-qa`, когато трябва автоматично да се избере минималният набор проверки според текущия diff
- `npm run regression`, когато трябва да се сравни текущият build output с локална baseline
- `npm run release`, когато трябва да се провери release readiness без deploy, commit или push
- `npm run lint`
- `npm run astro:cf:validate`
- Проверка на засегнатите BG/EN routes
- Проверка на `robots.txt`
- Проверка на `sitemap.xml`
- Проверка на `manifest.webmanifest`
- Визуална проверка на засегнатите страници
- Ако задачата добавя или променя video съдържание, всяко native `<video>` трябва да има `poster`, а всяка embedded video/card употреба трябва да има thumbnail image.
- Не използвай AI-generated video thumbnails без изрично разрешение.
- Ако липсва thumbnail asset, маркирай нужда от asset вместо да измисляш изображение.

Изпълнявай тези проверки само когато задачата засяга сайта или когато потребителят ги поиска.
