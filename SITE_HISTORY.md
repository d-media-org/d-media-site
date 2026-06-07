# История на сайта `d . media`

Този файл описва развитието на сайта от самото му създаване до текущото състояние на live версията.

Източници:
- git commit history на проекта
- `README.md`
- `AUDIT.md`
- локалната Vercel project връзка в `.vercel/project.json`
- локалния Vercel build output в `.vercel/output/`
- текущото работно дърво
- последните production промени, качени live след последния commit

Последен commit в историята:
- `36dcefa` — `2026-06-08` — `Add blog and service detail sections`

Текущото live и git състояние са синхронизирани към този commit по branch `codex/d-media-site-review`.

## 0. Идентичност на repository и deployment проекта

### Git repository
- GitHub remote: `https://github.com/d-media-org/d-media-site.git`
- Основен branch: `main`
- Налични работни/codex branches в локалния clone:
  - `codex/d-media-site-review`
  - `codex/preview-workflow`
- Към момента няма git tags.

### Vercel project
- Vercel project name: `d-media-site`
- Vercel project id: `prj_kWmruHIaqac2htxQddmCUfs7DBi9`
- Vercel team id: `team_3lssNsQVxPuubyv2tDWJR5rx`
- Framework: `nextjs`
- Node version: `22.x`
- `directoryListing`: `false`
- Vercel project link timestamp в локалния config: `2026-03-17 18:24:04` `Europe/Sofia`

## 1. Начало на проекта

### 2026-03-17

#### `a499638` — `Initial commit from Create Next App`
- Създадена е базовата Next.js структура.
- Добавени са начални конфигурации:
  - `package.json`
  - `package-lock.json`
  - `next.config.ts`
  - `eslint.config.mjs`
  - `postcss.config.mjs`
  - `tsconfig.json`
- Създадени са първите версии на:
  - `src/app/layout.tsx`
  - `src/app/page.tsx`
  - `src/app/globals.css`
- Началният scaffold съдържа само стандартните demo assets на Create Next App.

## 2. Изграждане на първата реална версия

### 2026-03-22

#### `ea756ff` — `Build d . media site`
- Превръщане на стартовия Next.js scaffold в реален фирмен сайт.
- Добавени са основните публични страници:
  - Начало
  - Проекти
  - Услуги
  - За бранда
  - Контакт
  - Условия
  - Поверителност
- Изградени са:
  - global layout
  - SEO основа
  - sitemap
  - robots
  - manifest
  - social preview assets
- Добавени са:
  - бранд активи
  - мокъпи
  - case studies
  - първи архиви за проекти
  - първи Panton font файлове
- Добавени са помощни QA scripts.
- Създадени са:
  - `site-content`
  - `brand-asset`
  - `brand-text`
  - `project-showcase`
  - `site-chrome`
- Добавени са първите локални QA scripts:
  - `dark_qa.mjs`
  - `full_qa_screenshots.mjs`
  - `mobile_qa_screenshots.js`
  - `quick_home_qa.mjs`
  - `quick_verify.mjs`

#### `7becbbe` — `Expand projects with full PNG archive`
- Разширен е project archive с пълни PNG файлове за много проекти.
- Сайтът започва да работи като по-пълен портфолио архив, не само като витрина.

#### `e08ac43` — `Optimize project PNG archive for web`
- Оптимизиране на големия PNG архив за по-подходящо уеб използване.

#### `6601ded` — `Refine projects and home UX`
- Подобрения по UX на началната страница и страницата с проекти.

#### `382a251` — `Use mockups as project covers`
- Мокъпите започват да се използват като корици за проекти.

#### `795b42e` — `Sync project content to Brand projects`
- Синхронизация на project content с brand project структурата.

#### `a1493eb` — `Refine projects services and contact UX`
- Подобрения в UX логиката на:
  - Проекти
  - Услуги
  - Контакт

#### `3e14dbd` — `Refine project archive content and spacing`
- Прецизиране на spacing и съдържание в архивите с проекти.

#### `d907e75` — `Protect project images and remove project link underline`
- Добавена защита/контрол на project images.
- Премахнато е нежелано подчертаване на project линкове.

#### `ec1717f` — `Polish home and projects marketing flow`
- Подреден е marketing flow между home и projects.

#### `ff3459c` — `Limit featured projects to three highlights`
- Featured projects са ограничени до 3 основни акцента.

#### `b800d6c` — `Improve small text readability`
- Подобрена е четимостта на най-дребния текст.

#### `755ab2c` — `Tighten contact page desktop QA`
- Desktop QA pass върху Contact page.

#### `60022c2` — `Balance home and projects desktop layout`
- Балансиране на desktop layout-а на home и projects.

#### `23d1a79` — `Adjust project file count labels`
- Коригирани са етикетите за брой файлове в project cards/detail views.

#### `8e6fea6` — `Reduce English terminology in user-facing copy`
- Намалено е смесването на английска терминология в публичния текст.

#### `a961f35` — `Wire featured projects to Edge Config`
- Featured projects вече се управляват през Vercel Edge Config.

#### `668164e` — `Add Edge Config site runtime controls`
- Добавени runtime контролни ключове през Edge Config.
- Добавен е `AnnouncementBar`.
- Добавени са runtime toggles за видимост на homepage секции.

#### `304a5e9` — `Polish pre-launch marketing copy`
- Copy polish преди първото по-сериозно публично излизане.

#### `d11408f` — `Refine visual hierarchy and CTA polish`
- Подобрена визуална йерархия.
- Прецизирани CTA елементи.

#### `94c3448` — `Tighten mobile layout rhythm`
- Подобрена mobile ритмика на spacing и vertical flow.

#### `5480086` — `Move project assets to Vercel Blob`
- Project assets са изнесени от repository/public към Vercel Blob.
- Добавени:
  - `sync-blob-assets` pipeline
  - `asset-url`
  - `blob-asset-manifest`

#### `c354a0b` — `Move brand assets to Vercel Blob`
- Brand assets също са изнесени към Vercel Blob.

#### `42c00a5` — `Polish SEO and launch messaging`
- Сериозен polish на SEO структурата.
- Добавен/разширен `seo.ts`.
- Подобрени:
  - metadata
  - sitemap логика
  - launch messaging

#### `4db7ad0` — `Adjust brandbook copy line break`
- Микро корекция на line break в brandbook copy.

#### `af9b585` — `Fix brandbook copy line break`
- Допълнителна корекция на същата тема.

## 3. Cover логика, image presentation и по-лека типография

### 2026-03-23

#### `632ecaf` — `Fix mobile bullets and brand wrapping`
- Поправени mobile bullets.
- Подобрено wrap поведение на brand text.

#### `02961ac` — `Use woff2 Panton fonts`
- Първо преминаване към `woff2` за Panton.

#### `d46fdcd` — `Prefer transparent project covers when mockups are missing`
- Когато няма адекватен mockup, transparent project cover става предпочитан fallback.

#### `7825f37` — `Bust Blob cache for updated project covers`
- Cache bust за обновени project covers в Blob.

#### `bc399a2` — `Prefer transparent covers across all project cards`
- Transparent cover логиката е приложена по-широко във всички project cards.

#### `bd36dd7` — `Refine project covers and dark card presentation`
- Подобрена е презентацията на project covers.
- Подобрена е dark card визуализацията.

#### `4509474` — `Refine project image spacing and restore AneliArt PNG cover`
- Коригиран е spacing-ът на project imagery.
- Върната е PNG cover версията за AneliArt.

#### `ea6a45c` — `Add visible image frames to project cards`
- Добавени са видими image frames към project cards.

#### `c966b09` — `Improve social preview image`
- Подобрена социалната preview визия.

#### `50538e3` — `Bust social preview cache`
- Cache bust за social preview.

#### `bd30f7b` — `Fix social preview image metadata`
- Поправени social preview metadata.

#### `242f6b2` — `Use logotype-only social preview`
- Social preview е опростен към logotype-only вариант.

#### `7e33a6b` — `Fix Vercel type error in project page`
- Поправен е Vercel/TypeScript проблем в project detail страниците.

## 4. Архив, мобилно поведение и asset дисциплина

### 2026-03-24

#### `e538b16` — `Limit flyer mockups to selected files`
- Flyer mockups са ограничени до подбрани файлове.

### 2026-04-29

#### `18229ae` — `Stabilize site and sync project archive`
- Обща стабилизация на сайта.
- Повторна синхронизация на project archive.

## 5. GEO, SEO, performance и production hardening

### 2026-05-14

#### `3281c18` — `Complete GEO SEO and performance polish`
- Силен общ polish по GEO, SEO и performance.

#### `b7892e1` — `Serve optimized local priority assets`
- Priority assets започват да се сервират в оптимизиран локален вариант.

#### `ef15404` — `Use deployed optimized priority assets`
- Преминаване към deployed optimized priority assets.

#### `8afd606` — `Remove Metricool and polish Lighthouse issues`
- Премахнат е Metricool.
- Адресирани са Lighthouse проблеми.

#### `92632a9` — `Polish social preview and analytics loading`
- Подобрени са:
  - social preview presentation
  - analytics loading behavior

#### `b921fbf` — `Use logotype only social preview`
- Допълнителна консолидация към logotype-only social preview логика.

#### `0dbb1c2` — `Tune critical font loading and defer consent banner`
- Първи batch по critical font loading.
- Consent banner е отложен, за да не товари първото рендериране.

#### `2f55891` — `Restore original Panton typography`
- Възстановена е оригиналната Panton typography.

#### `560fe0e` — `Tune mobile rendering without changing brand typography`
- Mobile rendering tuning без компромис с бранд шрифта.

## 6. Safari/iPhone стабилизация и asset hardening

### 2026-05-31

#### `2ca701d` — `Stabilize iPhone mobile rendering paths`
- Опит за стабилизация на iPhone mobile rendering paths.

#### `e912ecb` — `Revert "Stabilize iPhone mobile rendering paths"`
- Връщане на проблемен batch.

#### `61f1a8a` — `Virtualize long project galleries on mobile`
- Дългите project galleries са виртуализирани на mobile.

#### `7f057c8` — `Limit initial mobile project image decoding`
- Ограничено е началното image decoding натоварване на mobile.

#### `ba11665` — `Defer heavy project archives on mobile`
- Отлагане на тежките project archives на mobile.

#### `5436e90` — `Revert "Defer heavy project archives on mobile"`
- Върнат е проблемен defer batch.

#### `bb1889d` — `Serve bounded web derivatives for project galleries`
- Въведени са bounded web derivatives за project galleries.

#### `b046052` — `Ignore macOS metadata during blob sync`
- Игнориране на macOS metadata файлове при blob sync.

#### `7b4dfe1` — `Harden asset pipeline and update dependencies`
- Подсилен asset pipeline.
- Обновени зависимости.

#### `bb6f5a2` — `Add standard favicon endpoint`
- Добавен е стандартен favicon endpoint.

## 7. Live промени след последния commit

След `bb6f5a2` по сайта са правени допълнителни промени, които са качени live, но към момента не са описани в commit историята.

### 7.1. Performance и rendering архитектура
- Homepage (`/`) и English homepage (`/en`) са прехвърлени към static prerender с `revalidate: 300`.
- `/projects` и `/en/projects` също са static prerendered.
- Edge Config достъпът за:
  - `siteRuntimeConfig`
  - `featuredProjectSlugs`
  е поставен зад `unstable_cache`, за да не държи route-овете в dynamic режим.
- Root layout вече не зависи от `headers()` за locale в server render path.

### 7.2. Site chrome разделяне
- Старият голям `site-chrome.tsx` е разбит на по-малки части:
  - `site-header.tsx`
  - `site-footer.tsx`
  - `theme-toggle.tsx`
  - `floating-top-link.tsx`
- Целта е по-малък global client runtime и по-добър control върху hydration.

### 7.3. Font pipeline
- Добавени са нови `woff2` варианти на Panton в:
  - `public/fonts/panton/Panton-Light.woff2`
  - `public/fonts/panton/Panton-Regular.woff2`
  - `public/fonts/panton/Panton-SemiBold.woff2`
  - `public/fonts/panton/Panton-Bold.woff2`
  - `public/fonts/panton/Panton-Black.woff2`
- Layout-ът е прехвърлен към `woff2` font assets.
- Preload е оставен само за критичните font тежести за first viewport.
- Това намалява font transfer размера и подобрява mobile Lighthouse поведението.

### 7.4. Homepage runtime simplification
- Runtime gating за homepage services/about секциите е махнато от server render path.
- Homepage е стабилизиран като по-лесен за кеширане и предвидим route.

### 7.5. Телефонът е премахнат от публичния сайт
- Телефонът е махнат от:
  - Contact page
  - Privacy page render output
  - organization/contact schema
  - `llms.txt`
  - `llms-bg.txt`
- Самата phone константа е оставена в кода за бъдещо лесно връщане.

### 7.6. Holiday preview batch
- Имаше временна holiday preview разработка.
- Тя беше изцяло премахната от production кода и от live версията.
- Holiday preview route-овете не са част от текущия live сайт.

### 7.7. Operational pipeline
- В `package.json` са налични operational scripts:
  - `assets:web`
  - `blob:audit`
  - `sync:blob`
  - `check`
  - `ship`
- `ship` е дефиниран като: build + lint cache + `vercel --prod --yes`.
- `blob:audit` и `sync:blob` са изпълнявани без `VERCEL_OIDC_TOKEN`, за да се избегне credential конфликт с `BLOB_READ_WRITE_TOKEN`.

## 8. Обобщение на най-важните архитектурни етапи

### Съдържание и структура
- Сайтът започва като стандартен Next.js app.
- Бързо е развит в многостраничен studio site с:
  - homepage
  - services
  - projects
  - about
  - contact
  - legal pages

### Проектен архив
- Портфолиото минава през няколко етапа:
  - basic showcase
  - full PNG archive
  - web optimization
  - mockup-first covers
  - transparent covers
  - bounded web derivatives
  - mobile stabilization

### SEO и metadata
- Изградени и полирани:
  - metadata
  - Open Graph
  - Twitter cards
  - sitemap
  - robots
  - manifest
  - JSON-LD schema
  - llms text files

### Asset hosting
- Brand и project assets са преместени към Vercel Blob.
- Добавени са manifest-и и sync scripts за контрол върху asset pipeline-а.
- Source originals вече не се deploy-ват.
- Те се пазят локално в:
  - `/Users/m.dragoev/d . media - site source archive/assets/`
- Публичните browser-facing derivatives се генерират в:
  - `public/optimized-assets/project-web/`

### Performance
- Правени са няколко performance passes:
  - consent loading tuning
  - image/gallery tuning
  - static prerendering
  - Edge Config caching
  - font pipeline tuning

### Mobile / Safari hardening
- Има специални итерации за:
  - mobile spacing
  - mobile rendering rhythm
  - iPhone rendering stability
  - heavy gallery/image behavior

### Edge Config runtime слой
- Поддържаните ключове са:
  - `featuredProjectSlugs`
  - `siteRuntimeConfig.announcement`
  - `siteRuntimeConfig.home.sections.services`
  - `siteRuntimeConfig.home.sections.about`
- При липсващ или невалиден Edge Config сайтът използва safe fallback стойности.

### Current technical baseline
- Next.js: `16.2.6`
- React: `19.2.6`
- React DOM: `19.2.6`
- Tailwind CSS: `4.3.0`
- `@tailwindcss/postcss`: `4.3.0`
- Playwright: `1.60.0`
- `@vercel/analytics`: `2.0.1`
- `@vercel/speed-insights`: `2.0.0`
- Images `remotePatterns` са ограничени до:
  - `doncv5yem7gbmqbm.public.blob.vercel-storage.com`

### Current sitemap footprint
- Локалният build output показва sitemap с общо `27` URL адреса.
- От тях `20` са project detail routes.
- Основните indexable routes са:
  - `/`
  - `/projects`
  - `/services`
  - `/about`
  - `/contact`
  - `/terms`
  - `/privacy`

## 9. Production deployment IDs и дати

Този раздел описва production deployment-ите, които са потвърдени през Vercel и са били alias-нати към `https://www.d-media.org`.

### 2026-05-14

#### `dpl_Ep3ssXaBNxD64Ab5GtaYRUbtWCYo`
- Създаден: `2026-05-14 19:46:46` `Europe/Sofia`
- Production URL: `https://d-media-site-dryta6qhz-d-media.vercel.app`
- Alias: `https://www.d-media.org`

### 2026-05-31

#### `dpl_52TtuDa1Tb8NTFz2cru7BgRL8QoG`
- Създаден: `2026-05-31 19:03:45` `Europe/Sofia`
- Production URL: `https://d-media-site-gx97890qp-d-media.vercel.app`
- Alias: `https://www.d-media.org`

#### `dpl_EFuwZGfAbUyBFuJCZqngHqUmyvpk`
- Създаден: `2026-05-31 19:45:11` `Europe/Sofia`
- Production URL: `https://d-media-site-l3lzs4eoc-d-media.vercel.app`
- Alias: `https://www.d-media.org`

#### `dpl_65MPJPPsBK6z1uCayjew9dPzzkM6`
- Създаден: `2026-05-31 19:56:46` `Europe/Sofia`
- Production URL: `https://d-media-site-dur4uqx38-d-media.vercel.app`
- Alias: `https://www.d-media.org`

### 2026-06-03

#### `dpl_DntZMn1fUeyeYYvhRkWFJAjAshEv`
- Създаден: `2026-06-03 15:09:07` `Europe/Sofia`
- Production URL: `https://d-media-site-2izwfhhmc-d-media.vercel.app`
- Alias: `https://www.d-media.org`
- Контекст: live deploy с performance batch за static prerender, Edge Config cache и Panton `woff2` pipeline.

#### `dpl_6JrNJwyTDdS72oXKhzLdK735QpAG`
- Създаден: `2026-06-03 15:12:45` `Europe/Sofia`
- Production URL: `https://d-media-site-7nq5adexm-d-media.vercel.app`
- Alias: `https://www.d-media.org`
- Контекст: follow-up production deploy след премахване на holiday preview файловете от live.

### 2026-06-04

#### `dpl_AgtrBM53XtboXAQzaSX8NqjR1J7S`
- Създаден: `2026-06-04 17:47:23` `Europe/Sofia`
- Production URL: `https://d-media-site-7ekhi0k9e-d-media.vercel.app`
- Alias: `https://www.d-media.org`
- Контекст: production deploy след премахване на телефона от публичната версия на сайта.

## 10. Документирани operational бележки

- Release checklist, описан в `README.md`:
  1. `npm run assets:web`, ако са променяни source assets
  2. `npm run lint`
  3. `npm run build`
  4. `npm audit`
  5. Vercel preview
  6. BG/EN route проверка, `/projects`, detail routes, lightbox и WebKit iPhone stress pass
  7. `robots.txt`, `sitemap.xml`, manifest и social preview check
  8. Live deploy само след чист preview резултат
- `AUDIT.md` фиксира production audit snapshot към `2026-05-31`.
- `AUDIT.md` отбелязва известна audit бележка за transitive `postcss` advisory през текущия Next.js пакет и изрично забранява `npm audit fix --force`, ако това води до breaking downgrade.

## 11. Cloudflare Pages migration и 2026-06-06 live състояние

### Cloudflare Pages migration
- GitHub repo-то на сайта е вързано с Cloudflare Pages.
- Проектът е преместен от Vercel към Cloudflare Pages с основен Pages project:
  - `d-media`
- Активните публични домейни са:
  - `https://www.d-media.org`
  - `https://d-media.org`
- И двата домейна сочат към Cloudflare Pages и връщат `200` през Cloudflare.
- DNS за `d-media.org` и `www.d-media.org` е оставен като CNAME към `d-media-site.pages.dev`.
- На `2026-06-06` Cloudflare Pages project name беше преименуван от `d-media-site` на `d-media`.
- Cloudflare API прие project rename, но запази `.pages.dev` subdomain като `d-media-site.pages.dev`; опитите за `subdomain: "d-media.pages.dev"` и `subdomain: "d-media"` бяха игнорирани от API.
- Vercel DNS verification остатъкът `_vercel.d-media.org` е премахнат, защото вече не е нужен след миграцията.
- Vercel/Blob dependency е премахната от активната runtime логика, доколкото browser-facing assets вече се сервират от `public/` и Cloudflare Pages.

### Cloudflare deploy workflow
- Preview deploy script:
  - `npm run astro:cf:deploy:preview`
- Production deploy script:
  - `npm run astro:cf:deploy:production`
- Preview alias беше преименуван от:
  - `astro-migration.d-media-site.pages.dev`
  - към `preview.d-media-site.pages.dev`
- Актуалният preview URL е:
  - `https://preview.d-media-site.pages.dev`

### 2026-06-06 commits

#### `a180d81 Prepare Cloudflare Astro migration`
- Подготвя Astro/Cloudflare Pages миграцията.
- Запазва съществуващата структура, маршрути, езикови версии и assets pipeline.

#### `e5f4812 Rename Cloudflare Pages project target`
- Преименува Cloudflare Pages project target към `d-media-site`.
- Подготвя по-адекватно име за реалното преместване.

#### `aa124ee Optimize critical brand assets and fonts`
- Добавени са subset Panton `woff2` файлове:
  - `public/fonts/panton-subset/Panton-Light.latin-cyrillic.woff2`
  - `public/fonts/panton-subset/Panton-Regular.latin-cyrillic.woff2`
  - `public/fonts/panton-subset/Panton-SemiBold.latin-cyrillic.woff2`
  - `public/fonts/panton-subset/Panton-Bold.latin-cyrillic.woff2`
  - `public/fonts/panton-subset/Panton-Black.latin-cyrillic.woff2`
- `@font-face` в Astro глобалния CSS е пренасочен към subset fonts.
- Font preload-ите са пренасочени към subset `Regular` и `Black`.
- Добавени са lossless WebP brand assets:
  - `public/optimized-assets/brand/ONLY-brandmark.lossless.webp`
  - `public/optimized-assets/brand/ONLY-logotype.lossless.webp`

#### `364ab30 Tighten brand asset delivery for preview`
- Preview alias default е сменен към `preview`.
- Brand asset mapping е пренасочен към display-size WebP файлове:
  - `ONLY-brandmark.display.webp`
  - `ONLY-logotype.display.webp`
- Целта е по-малък critical image payload без промяна на layout или визуална идентичност.

#### `89e73e3 Match logotype asset to display size`
- Header logotype display asset е свит до реалния показван размер:
  - `224x58`
  - приблизително `5.3KB`
- SVG вариантът не е използван, защото наличният SVG съдържа допълнителен `@` слой и font-dependent текст, което носи риск за бранд визуализацията.
- След тази промяна PageSpeed mobile performance на preview достигна `100`.

#### `a47c8f6 Fix legacy project gallery display`
- Поправя неправилното показване на изображенията в `/projects` legacy секциите:
  - `Колекция от мокъпи на флаери за клубни събития`
  - `Колекция от мокъпи на част от проектите`
  - `Архив флаери`
- Основният дефект беше, че `.legacy-mockup-frame img` имаше `object-fit: contain`, но нямаше `display: block`, `width: 100%` и `height: 100%`.
- Добавени са ориентационни класове:
  - `legacy-mockup-card-portrait`
  - `legacy-mockup-card-landscape`
- Вертикалните флаери вече се показват в portrait рамка `3 / 4`.
- Landscape mockup-ите остават в `16 / 11`.
- Lightbox за portrait изображение е проверен с реален browser pass и запазва правилна пропорция.

#### `b4f9e39 Keep proven font preload set`
- Върнат е стабилният font preload set:
  - `Panton-Regular.latin-cyrillic.woff2`
  - `Panton-Black.latin-cyrillic.woff2`
- Експерименталният preload на `SemiBold` и `Bold` не е оставен, защото локален Lighthouse run показа риск от по-лош Speed Index.
- Това запазва доказаното performance състояние вместо рискова оптимизация само по audit suggestion.

### 2026-06-06 Cloudflare Pages deploy-и

#### Preview performance deploy
- Preview URL:
  - `https://preview.d-media-site.pages.dev`
- Deployment URL:
  - `https://34ae3042.d-media-site.pages.dev`
- Контекст:
  - първи preview с subset Panton fonts и lossless WebP brand assets.

#### Preview alias rename + display assets
- Preview URL:
  - `https://preview.d-media-site.pages.dev`
- Deployment URL:
  - `https://aee6dd66.d-media-site.pages.dev`
- Контекст:
  - preview alias default сменен от `astro-migration` към `preview`
  - добавени display-size WebP brand assets.

#### Preview logotype display-size deploy
- Preview URL:
  - `https://preview.d-media-site.pages.dev`
- Deployment URL:
  - `https://22063191.d-media-site.pages.dev`
- Контекст:
  - header logotype asset намален до `224x58`.

#### Production performance deploy
- Production deployment URL:
  - `https://785722f7.d-media-site.pages.dev`
- Live domains:
  - `https://www.d-media.org`
  - `https://d-media.org`
- Контекст:
  - performance state с PageSpeed mobile `100` е качен live.
  - Live проверка потвърди `200`, Cloudflare server и `ONLY-logotype.display.webp`.

#### Preview gallery fix deploy
- Preview URL:
  - `https://preview.d-media-site.pages.dev`
- Deployment URL:
  - `https://b74fc8f2.d-media-site.pages.dev`
- Контекст:
  - първи preview на legacy gallery display fix и portrait/landscape класове.

#### Preview stabilized gallery deploy
- Preview URL:
  - `https://preview.d-media-site.pages.dev`
- Deployment URL:
  - `https://b53bd22d.d-media-site.pages.dev`
- Контекст:
  - gallery fix запазен
  - рисковият font preload експеримент премахнат
  - върнат стабилният preload set.

#### Production gallery fix deploy
- Production deployment URL:
  - `https://aed79d63.d-media-site.pages.dev`
- Live domains:
  - `https://www.d-media.org`
  - `https://d-media.org`
- Контекст:
  - legacy project gallery display fix е качен live.
  - Live проверка потвърди:
    - `/projects/` връща `200`
    - `/en/projects/` връща `200`
    - HTML съдържа `legacy-mockup-card-portrait`
    - HTML съдържа `legacy-mockup-card-landscape`
    - homepage продължава да използва `ONLY-logotype.display.webp`

### 2026-06-06 validation notes
- Използвани проверки:
  - `npm run lint`
  - `npm run astro:cf:validate`
  - Cloudflare preview deploy
  - Cloudflare production deploy
  - live route smoke checks през `https://www.d-media.org` и `https://d-media.org`
  - browser/Playwright проверка на `/projects`
  - lightbox проверка за portrait image
  - локален Lighthouse mobile/desktop pass за performance диагностика
- След performance оптимизациите PageSpeed Insights е постигнал `100` навсякъде:
  - Mobile Performance: `100`
  - Desktop Performance: `100`
  - Accessibility: `100`
  - Best Practices: `100`
  - SEO: `100` за indexable production URL-ите
- Performance score може да флуктуира между `99` и `100` в отделни PageSpeed lab runs. Това е документирано като нормална Lighthouse/PSI variance, свързана с cache/edge timing, latency и FCP/LCP измервания, а не автоматично като code regression.
- PageSpeed mobile `98` на live беше анализиран като по-широка Lighthouse lab variance/FCP-LCP timing ситуация, а не като image regression.
- Desktop Lighthouse остава `100` при локална проверка.
- Рискова performance промяна не е оставена, когато показа потенциално влошаване.

## 12. Как да се поддържа този файл

При следващи значими промени е добре:
- всеки нов commit да се добавя тук
- production-only промени без commit също да се описват отделно
- да се отбелязват важни deploy-и, когато live състоянието се разминава с последния git commit

## 13. Blog, service detail pages и навигационни изходи

### 2026-06-07 to 2026-06-08

#### `36dcefa` — `Add blog and service detail sections`
- Добавена е цялостна blog / knowledge center архитектура в Astro:
  - `/blog`
  - `/blog/[slug]`
  - `/blog/drafts`
  - `/blog/drafts/[slug]`
  - `/en/blog`
- Добавен е локален blog data layer в:
  - `astro/src/lib/blog.ts`
- Публикувана е реална първа статия:
  - `Защо създадохме d . media`
- Добавени са останалите начални статии като реални route-ове и metadata-ready записи.
- Добавени са draft case study route-ове за локален preview.
- Един публичен казус е изваден от draft:
  - `Как достигнахме 100/100/100/100 на d-media.org`

#### Blog UX / navigation
- Добавена е логика за връщане назад от article страниците:
  - `Назад към статиите`
  - `Назад към казусите`
- Връщането пази предишната scroll позиция в blog списъка.
- `Свързани статии` и `Следваща стъпка` са подредени според финалната поисканa логика.
- Blog category controls са преработени в работещ client-side филтър, валидиран с реален browser test.
- Потвърдено поведение:
  - `Казуси` филтрира до публичния case study
  - `SEO и GEO` показва само SEO/GEO материалите

#### Services expansion
- Създаден е общ reusable шаблон:
  - `astro/src/components/ServiceDetailPage.astro`
- С него е уеднаквена detail логиката за service pages.
- Освен `Уеб дизайн и разработка` са добавени още отделни service detail страници:
  - `/services/brand-identity`
  - `/services/content-social-media`
  - `/services/graphic-design`
  - `/services/advertising`
  - `/services/additional-charges-rights`
- Добавени са и английските им версии под `/en/services/...`
- Картите в `/services` и `/en/services` вече имат detail links за всички основни услуги.
- `Допълнителни начисления и права` е отделено като самостоятелен service type със собствена страница.

#### Pricing scope additions
- В data слоя са добавени начални рамки за:
  - визуална идентичност
  - социални визуални формати
  - графични материали за принт
  - рекламни видео/анимационни услуги
  - допълнителни начисления, priority и usage rights
- Не са добавяни непотвърдени цени за области, за които не е имало потвърден източник.

#### Navigation exits audit
- Направен е отделен pass за локални навигационни изходи вътре в съдържателните страници.
- Добавени са локални връзки:
  - `обратно към услугите` във всички service detail страници
  - `обратно към контактите` в:
    - `/terms`
    - `/privacy`
    - `/en/terms`
    - `/en/privacy`
- Проектните detail страници вече са имали:
  - `обратно към проектите`
- Blog article страниците вече имат:
  - `Назад към статиите`
- Draft case study страниците вече имат:
  - `Назад към казусите`

#### llms / GEO support
- `public/llms.txt` и `public/llms-bg.txt` са обновени спрямо разширения site structure.
- Това е документирано като LLM-orientation helper, а не като официален ranking фактор.

### 2026-06-08 Cloudflare Pages production deploy

#### Production deploy for blog + services expansion
- Production deployment URL:
  - `https://47659d1a.d-media-site.pages.dev`
- Live domains:
  - `https://www.d-media.org`
  - `https://d-media.org`
- Потвърдено е, че custom domain routing вече сервира новите route-ове, включително:
  - `/services/additional-charges-rights/`
- Live HTML проверка потвърждава:
  - новата service page title
  - `обратно към услугите`
  - новия `serviceType` масив в schema с `Допълнителни начисления и права`

### 2026-06-08 Git sync state

#### Clean sync after production deploy
- Временните `.tmp-*` audit screenshot файлове са изтрити.
- Всички реални промени са commit-нати и push-нати.
- Branch:
  - `codex/d-media-site-review`
- Remote:
  - `origin https://github.com/d-media-org/d-media-site.git`
- Потвърдено синхронно състояние:
  - local `HEAD` = `36dcefa50d2bdbafa300042fffaf96bfbdbdabd9`
  - `origin/codex/d-media-site-review` = `36dcefa50d2bdbafa300042fffaf96bfbdbdabd9`
- Към този момент worktree е чист и без untracked временни файлове.
