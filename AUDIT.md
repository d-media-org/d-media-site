# Global Audit

Дата: 2026-03-24

## Наблюдавани проблеми преди рефактора

- `SiteHeader` и `SiteFooter` се рендерират page-by-page в `src/app/page.tsx`, `src/app/services/page.tsx`, `src/app/about/page.tsx`, `src/app/contact/page.tsx`, `src/app/projects/page.tsx`, `src/app/projects/[slug]/page.tsx`, `src/app/privacy/page.tsx`, `src/app/terms/page.tsx` вместо да се управляват от един глобален shell.
- Началната страница смесва `Услуги` и `Процес` в една секция в `src/app/page.tsx`, което противоречи на изискваната информационна архитектура.
- Редът на секциите на началната страница не покрива изцяло зададения ред: липсва отделен `Процес`, а `Проекти (preview)` не е ясно изведен на началната страница.
- Hero блокът в `src/app/page.tsx` е прекалено дълъг: има H1, дълъг подзаглавен абзац, списък с outcomes и допълнителен note card, което размива първичното позициониране.
- `За бранда` на началната страница и в `src/app/about/page.tsx` повтаря една и съща теза с различни формулировки.
- Footer в `src/components/site-chrome.tsx` е твърде компресиран и не следва исканата ясна структура `навигация / услуги / контакт / социални / copyright`.
- Мобилната навигация в `src/app/globals.css` е 5-колонна лента, не hamburger меню. Това не покрива изискването за чист sticky header с отделяем mobile menu.
- `SiteHeader` няма sticky поведение.
- `src/lib/site-content.ts` съдържа съдържание, което смесва продуктови услуги, процес, документен поток и философски текст в един източник, което насърчава повторения между страниците.
- `services` включва `"Документни и редакционни формати"`, но зададеният списък за началната секция е друг и по-кратък.
- `process` е формулиран с по-дълги етапи от зададените кратки стъпки.
- `src/app/services/page.tsx` смесва услуги, процес, документи и оперативни бележки в една дълга страница, вместо да държи услугите по-ясни и процеса отделен.
- `src/app/projects/page.tsx` вече има реална архивна структура, но началната страница не я използва като чист preview блок.
- `src/app/layout.tsx` зарежда 20 локални Panton font файла. Това е излишно тежко за минималистичен production сайт.
- Има активен lint warning в `src/app/api/social-preview/route.tsx` за използване на `<img>`.
- `@vercel/edge-config` и `@vercel/blob` са реално използвани и не трябва да се махат механично. `Edge Config` захранва runtime CTA/config, а Blob manifest се използва за asset URL resolution.
- Проектът има локални незавършени промени в git working tree. Те не трябва да се връщат без изрична заявка.

## Базова проверка

- `npm run build` минава успешно.
- `npm run lint -- --max-warnings=0` се чупи заради warning в `src/app/api/social-preview/route.tsx`.
