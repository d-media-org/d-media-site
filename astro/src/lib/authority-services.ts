import type { Locale } from "@/lib/i18n";

type Section = { title: string; text: string };
type AuthorityService = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  sections: Section[];
  integrationsTitle: string;
  integrationsText: string;
  integrationGroups: Section[];
  pricingTitle: string;
  pricingText: string;
  pricingGroups: { title: string; items: { title: string; price: string }[] }[];
  pricingNote: string;
  processTitle: string;
  processSteps: Section[];
  faqs: { question: string; answer: string }[];
  ctaTitle: string;
  ctaText: string;
  primaryCta: string;
  secondaryCta: string;
};

const commonBg = {
  pricingTitle: "Рамка за работа",
  pricingText: "Обхватът се определя според текущото състояние, броя страници, системите, риска и нужната дълбочина. Не използваме фиктивна пакетна цена за работа, която изисква реална диагностика.",
  pricingGroups: [{ title: "Начален обхват", items: [{ title: "Диагностика, план и изпълнение", price: "по индивидуален обхват" }] }],
  pricingNote: "Финалната рамка се потвърждава след преглед на проекта и измеримите цели.",
  processTitle: "Процес",
  secondaryCta: "Разгледай проектите",
};

const commonEn = {
  pricingTitle: "Working scope",
  pricingText: "Scope depends on the current state, number of pages, connected systems, risk, and required depth. We do not use a fictional package price for work that requires proper diagnosis.",
  pricingGroups: [{ title: "Starting scope", items: [{ title: "Diagnosis, plan, and implementation", price: "scoped individually" }] }],
  pricingNote: "The final framework is confirmed after reviewing the project and its measurable goals.",
  processTitle: "Process",
  secondaryCta: "Explore projects",
};

const bg: AuthorityService[] = [
  {
    slug: "web-design",
    metaTitle: "Уеб дизайн за ясни и приложими сайтове",
    metaDescription: "Уеб дизайн от d . media за корпоративни сайтове, портфолиа и страници за кампания или услуга с ясна структура, UX логика и бранд последователност.",
    title: "Уеб дизайн",
    intro: "Проектираме сайтове като част от бранд системата: с ясна информационна архитектура, последователен интерфейс и конкретна следваща стъпка за потребителя.",
    sections: [
      { title: "Информационна архитектура", text: "Подреждаме услугите, доказателствата, съдържанието и контактните точки така, че сайтът да бъде разбираем още при първото посещение." },
      { title: "Потребителски поток", text: "Определяме логичен път от първото обещание до конкретно действие, без конкуриращи се сигнали и декоративни препятствия." },
      { title: "Визуална система", text: "Пренасяме идентичността в типография, композиция, карти, навигация и адаптивно поведение, без сайтът да изглежда като шаблон." },
      { title: "Адаптивен дизайн", text: "Проектираме мобилния, таблет и desktop изглед като една система, а не като свит desktop вариант." },
      { title: "Съдържание преди форма", text: "Дизайнът следва реалното съдържание, дължината на заглавията, езиковите версии и нужната четимост." },
      { title: "Достъпност", text: "Планираме контраст, йерархия на заглавията, състояния при фокус и удобни зони за докосване още в дизайна, а не след разработката." },
      { title: "Готовност за разработка", text: "Предаваме ясна компонентна логика, състояния и правила, които могат да бъдат разработени без догадки." },
    ],
    integrationsTitle: "Свързани системи",
    integrationsText: "Уеб дизайнът е свързан с идентичността, съдържанието, разработката, SEO и реалния процес за запитване.",
    integrationGroups: [
      { title: "Бранд идентичност", text: "Използваме съществуващата визуална система или определяме какво липсва, преди да започне интерфейсът." },
      { title: "Съдържание", text: "Подреждаме copy йерархията така, че всяка страница да има функция, контекст и следваща стъпка." },
      { title: "Разработка", text: "Дизайн решенията се проверяват спрямо производителност, поддръжка и реална техническа реализация." },
    ],
    ...commonBg,
    processSteps: [
      { title: "Контекст", text: "Уточняваме аудитория, цели, съдържание, езици, функционалности и ограничения." },
      { title: "Архитектура", text: "Подреждаме страниците, навигацията, взаимоотношенията и ключовите потребителски потоци." },
      { title: "Система", text: "Разработваме визуалната и компонентната логика върху реално съдържание." },
      { title: "Проверка", text: "Проверяваме адаптивно поведение, четимост, достъпност и готовност за разработка." },
    ],
    faqs: [
      { question: "Уеб дизайнът включва ли разработка?", answer: "Може да бъде самостоятелен обхват или част от общ проект. Когато включва разработка, дизайн решенията се проверяват директно в работещата среда." },
      { question: "Работите ли само с Astro?", answer: "Не. Технологията се избира според проекта, нужната поддръжка, интеграциите и средата на клиента." },
      { question: "Може ли да се работи със съществуваща идентичност?", answer: "Да. Първо проверяваме дали системата има достатъчно ясни правила за последователно уеб приложение." },
      { question: "Как се избягва шаблонното усещане?", answer: "Чрез работа с реалното съдържание, бранд логиката и специфичния потребителски поток, а не чрез декоративна смяна на готов шаблон." },
    ],
    ctaTitle: "Ако сайтът има нужда от ясна визуална и UX система, започни с контекст.",
    ctaText: "Изпрати целта, наличното съдържание, нужните страници и текущата бранд основа.",
    primaryCta: "Изпрати контекст за уеб дизайн",
  },
  {
    slug: "web-development",
    metaTitle: "Уеб разработка и стабилна техническа архитектура",
    metaDescription: "Уеб разработка от d . media за бързи, достъпни и поддържаеми сайтове с подходяща технология, интеграции и архитектура с фокус върху скоростта.",
    title: "Уеб разработка",
    intro: "Разработваме сайтове и дигитални платформи с технология, избрана според реалния проект, а не според предварително ограничение към един технологичен стек или доставчик.",
    sections: [
      { title: "Техническа архитектура", text: "Избираме модел на зареждане, слой за съдържание, хостинг и процес за публикуване според съдържанието, динамиката и поддръжката." },
      { title: "Разработка на интерфейса", text: "Изграждаме семантични, адаптивни и достъпни интерфейси с минимален излишен JavaScript." },
      { title: "CMS и съдържание", text: "Когато проектът изисква редакционна работа, свързваме подходящ CMS или поддържаема локална система за съдържание." },
      { title: "Интеграции", text: "Свързваме плащания, CRM, аналитика, резервации, email и други системи само когато имат ясна бизнес функция." },
      { title: "Многоезична архитектура", text: "Изграждаме отделни езикови URL адреси, canonical и hreflang логика без фалшиви преводи или orphan версии." },
      { title: "Сигурност и устойчивост", text: "Ограничаваме ненужните зависимости, проверяваме HTTP headers, външни ресурси и поведението при публикуване." },
      { title: "Поддръжка и преносимост", text: "Документираме структурата така, че проектът да може да се обновява и премества без зависимост от една платформа." },
    ],
    integrationsTitle: "Технологичен избор",
    integrationsText: "Работим с подходящата технология за конкретната задача, включително статични сайтове, CMS, онлайн магазини и персонализирани решения.",
    integrationGroups: [
      { title: "Astro и static-first", text: "Подходящо за бързи съдържателни и представителни сайтове с нисък риск, свързан със средата за изпълнение." },
      { title: "CMS и онлайн търговия", text: "Използваме WordPress, headless CMS, Shopify, WooCommerce или друга среда, когато редакционният и търговският процес го изисква." },
      { title: "Cloud и хостинг", text: "Cloudflare, Vercel или друга инфраструктура се избират според публикуване, функции, бюджет и собственост върху системата." },
    ],
    ...commonBg,
    processSteps: [
      { title: "Технически контекст", text: "Уточняваме съдържание, интеграции, редакционен процес, трафик и собственост." },
      { title: "Архитектура", text: "Избираме технология, поток на данните, публикуване и компонентен модел." },
      { title: "Разработка", text: "Изграждаме, интегрираме и проверяваме функционалността по малки контролирани стъпки." },
      { title: "QA и публикуване", text: "Проверяваме браузъри, устройства, достъпност, SEO, скорост и готовност за връщане към предишна версия." },
    ],
    faqs: [
      { question: "Работите ли с технология, избрана от клиента?", answer: "Да, когато тя е съвместима с целите и поддръжката. Ако създава доказуем риск, обясняваме компромиса преди старта." },
      { question: "Разработвате ли WordPress и онлайн магазини?", answer: "Да, когато CMS или commerce моделът е правилният избор за проекта. Не ограничаваме услугата само до Astro и Cloudflare." },
      { question: "Кой притежава проекта?", answer: "Собствеността, достъпите и правата се уточняват в обхвата. Целта е клиентът да не остава заключен в неясна техническа зависимост." },
      { question: "Включена ли е поддръжка?", answer: "Поддръжката може да бъде включена като отделен текущ обхват след публикуването." },
    ],
    ctaTitle: "Ако проектът изисква стабилна разработка, започни с техническия контекст.",
    ctaText: "Изпрати нужните функции, съдържание, текуща среда, интеграции и срок.",
    primaryCta: "Изпрати контекст за разработка",
  },
  {
    slug: "technical-seo",
    metaTitle: "Техническо SEO за обхождане, индексиране и ясна структура",
    metaDescription: "Техническо SEO от d . media: обхождане, индексиране, canonical, hreflang, sitemap, структурирани данни, вътрешни връзки и проверки на скоростта.",
    title: "Техническо SEO",
    intro: "Подреждаме техническите сигнали, които позволяват на търсачките да откриват, разбират и индексират правилните страници без излишни дубликати.",
    sections: [
      { title: "Достъпност за обхождане", text: "Проверяваме robots правила, response status, redirect chains, вътрешни линкове и достъпността на основното съдържание." },
      { title: "Индексиране", text: "Сравняваме страниците, подходящи за индексиране, sitemap, canonical и noindex логиката, за да няма важни липси или помощни страници в индекса." },
      { title: "Канонични адреси и дубликати", text: "Консолидираме www, HTTPS, trailing slash, езикови версии и параметризирани URL адреси към ясни canonical варианти." },
      { title: "Международно SEO", text: "Проверяваме реципрочните hreflang връзки, езиковите URL адреси и липсата на невалидни езикови алтернативи към несъществуващо съдържание." },
      { title: "Структурирани данни", text: "Валидираме Organization, Service, Article, BreadcrumbList, FAQPage и CreativeWork спрямо видимото съдържание." },
      { title: "Вътрешни връзки", text: "Свързваме услуги, статии и казуси по тема и потребителско намерение, без осиротели страници." },
      { title: "Сигнали за производителност", text: "Проверяваме техническите фактори, които влияят на crawling, rendering и потребителското преживяване." },
    ],
    integrationsTitle: "Техническа SEO система",
    integrationsText: "Техническото SEO работи само когато архитектура, съдържание, скорост и наблюдение се разглеждат заедно.",
    integrationGroups: [
      { title: "Google Search Console", text: "Използваме отчетите за индексиране, sitemap и URL inspection като диагностичен сигнал, не като заместител на проверката в сайта." },
      { title: "Schema и публични сигнали", text: "Свързваме страниците с ясни типове, идентификатори и реални отношения между организация, услуги и съдържание." },
      { title: "Архитектура на съдържанието", text: "Технически правилната страница трябва да има ясна тема, уникална функция и достатъчно полезно съдържание." },
    ],
    ...commonBg,
    processSteps: [
      { title: "Обхождане", text: "Събираме адреси, статуси, метаданни, canonical, езикови версии, schema и вътрешни връзки." },
      { title: "Приоритет", text: "Разделяме блокиращите проблеми при индексиране от подобренията без пряк риск." },
      { title: "Поправка", text: "Коригираме причината в шаблоните, маршрутизацията или слоя за данни, а не URL по URL." },
      { title: "Валидация", text: "Повтаряме crawl, build и live проверка и следим Search Console след публикуването." },
    ],
    faqs: [
      { question: "Техническото SEO гарантира ли класиране?", answer: "Не. То премахва техническите пречки и прави съдържанието по-разбираемо, но класирането зависи и от качество, конкуренция, репутация и външни сигнали." },
      { question: "Нужен ли е sitemap?", answer: "Да за повечето структурирани сайтове, но sitemap не заменя crawlable вътрешните линкове и правилния canonical модел." },
      { question: "Структурираните данни автоматично ли дават разширени резултати?", answer: "Не. Структурираните данни помагат за разбиране и допустимост за показване, но Google избира дали и как да покаже разширен резултат." },
      { question: "Работите ли със съществуващи сайтове?", answer: "Да. Одитът може да бъде извършен върху текуща система без редизайн." },
    ],
    ctaTitle: "Ако важни страници не се индексират правилно, започни с технически crawl.",
    ctaText: "Изпрати домейна, платформата и наличните Search Console сигнали.",
    primaryCta: "Изпрати SEO контекст",
  },
  {
    slug: "geo",
    metaTitle: "GEO и видимост в AI търсене",
    metaDescription: "GEO от d . media за по-ясно разбиране на бранда в AI търсене, съдържание за цитиране, структурирани данни и последователни публични сигнали.",
    title: "GEO и видимост в AI търсене",
    intro: "Подреждаме съдържанието и публичните сигнали така, че AI системите да разбират по-точно кой е брандът, какво предлага и кои източници подкрепят това описание.",
    sections: [
      { title: "Яснота на публичните сигнали", text: "Определяме основната организация, услугите, темите, локацията и устойчивите отношения между тях." },
      { title: "Съдържание, готово за цитиране", text: "Създаваме ясни дефиниции, конкретни методологии, доказуеми казуси и отговори, които могат да бъдат извлечени без догадки." },
      { title: "Тематични групи", text: "Свързваме страниците за услуги, знание и казуси в тематични групи с ясна вътрешна логика." },
      { title: "Машинночетими сигнали", text: "Използваме семантичен HTML, метаданни, schema, llms ориентация и стабилни URL отношения като допълващи сигнали." },
      { title: "Последователност", text: "Проверяваме дали сайтът, социалните профили и външните споменавания описват бранда без противоречия." },
      { title: "Качество на източниците", text: "Разграничаваме собствените твърдения от потвърдените резултати и избягваме фиктивни авторитетни сигнали." },
      { title: "Наблюдение", text: "Следим как различни системи описват бранда и коригираме източника на неяснотата, а не само конкретен AI отговор." },
    ],
    integrationsTitle: "GEO не е отделен трик",
    integrationsText: "GEO стъпва върху полезно съдържание, техническо SEO, последователно публично описание и външно доверие. llms.txt е помощен предложен формат, не гаранция за класиране.",
    integrationGroups: [
      { title: "SEO основа", text: "AI системите използват много от същите достъпни и индексируеми източници, които поддържат традиционното търсене." },
      { title: "Архитектура на знанието", text: "Страниците трябва да разграничават услуги, методология, доказателства и редакционно съдържание." },
      { title: "Външно потвърждение", text: "Разпознаваемостта се укрепва чрез реални независими споменавания, клиентски препратки и последователни профили." },
    ],
    ...commonBg,
    processSteps: [
      { title: "Проверка на публичното описание", text: "Проверяваме как сайтът и външните източници описват d . media и услугите." },
      { title: "Карта на знанието", text: "Определяме липсващите връзки между услуги, теми, доказателства и вътрешни линкове." },
      { title: "Изпълнение", text: "Подсилваме съдържание, schema, тематични hubs, llms ориентация и последователност." },
      { title: "Проверка", text: "Проверяваме обхождане, индексиране и реалното описание в различни AI системи във времето." },
    ],
    faqs: [
      { question: "GEO заменя ли SEO?", answer: "Не. GEO разширява работата към AI търсене и по-ясно разбиране на бранда, но зависи от стабилна SEO и съдържателна основа." },
      { question: "llms.txt ranking фактор ли е?", answer: "Не. Това е предложен формат за ориентация на AI инструменти, а не официален Google фактор за класиране." },
      { question: "Може ли да се гарантира AI цитиране?", answer: "Не. Можем да подобрим яснотата, достъпността и доказателствата, но изборът на източник остава на съответната система." },
      { question: "Как се измерва напредъкът?", answer: "Чрез покритие при обхождане и индексиране, последователност на публичното описание, брандови търсения, независими споменавания и периодични контролирани AI проверки." },
    ],
    ctaTitle: "Ако AI системите описват бранда твърде тясно, започни с проверка на публичното описание.",
    ctaText: "Изпрати домейна, желаното позициониране и примери за текущи AI отговори.",
    primaryCta: "Изпрати GEO контекст",
  },
  {
    slug: "performance-optimization",
    metaTitle: "Оптимизация на производителността и Core Web Vitals",
    metaDescription: "Оптимизация на скоростта от d . media за LCP, CLS, INP, изображения, шрифтове, JavaScript, кеширане и стабилно мобилно поведение.",
    title: "Оптимизация на скоростта",
    intro: "Оптимизираме сайтове чрез измерване, дисциплина при файловете и архитектурни решения, без да премахваме съдържание или идентичност само заради лабораторен резултат.",
    sections: [
      { title: "Начално измерване", text: "Измерваме Lighthouse, PageSpeed, Core Web Vitals и реалното поведение по ключови страници и устройства." },
      { title: "Изображения", text: "Контролираме размери, формати, адаптивни варианти, lazy loading и декодиране според мястото в страницата." },
      { title: "Шрифтове", text: "Запазваме официалната типография, като оптимизираме формати, subsets, preload и fallback поведение." },
      { title: "JavaScript", text: "Премахваме ненужното изпълнение на код в браузъра и изолираме интерактивността само там, където има реална функция." },
      { title: "CSS и оформление", text: "Ограничаваме конфликтните правила, разместванията на оформлението и разхода за визуализиране без визуален компромис." },
      { title: "Кеширане и доставка", text: "Настройваме headers, CDN и версии на файловете според хостинг средата и процеса за обновяване." },
      { title: "Контрол върху регресиите", text: "След всяка промяна повтаряме build, проверка на ключови страници и device проверки, защото единичен резултат не доказва стабилност." },
    ],
    integrationsTitle: "Производителност без орязване",
    integrationsText: "Целта е устойчив сайт, не празна страница с висок лабораторен резултат.",
    integrationGroups: [
      { title: "Core Web Vitals", text: "Работим по причините за LCP, CLS и INP, а не по визуално прикриване на симптомите." },
      { title: "Мобилна стабилност", text: "Проверяваме памет, галерии, lightbox изгледи и embedded browsers, където ресурсните ограничения са по-строги." },
      { title: "SEO и достъпност", text: "Решенията за скорост не трябва да премахват семантично съдържание, навигация или достъпност." },
    ],
    ...commonBg,
    processSteps: [
      { title: "Измерване", text: "Създаваме baseline за ключови страници, assets и устройства." },
      { title: "Профилиране", text: "Намираме реалното тясно място в мрежата, rendering, паметта или main thread." },
      { title: "Оптимизация", text: "Прилагаме малки измерими промени по приоритет." },
      { title: "Стрес проверка", text: "Повтаряме навигация, скрол, презареждане и gallery сценарии в подходящите browser engines." },
    ],
    faqs: [
      { question: "Гарантирате ли постоянен резултат 100?", answer: "Не. PageSpeed варира според тестова среда, network и външни фактори. Целта е стабилно силна реална производителност и контролирани регресии." },
      { question: "Нужно ли е да се премахнат изображения?", answer: "Не по подразбиране. Правилният подход е адаптивна доставка, коректни размери, подходящи формати и контролирано зареждане." },
      { question: "Може ли оригиналният шрифт да остане?", answer: "Да. Брандовата типография може да се запази чрез оптимизирани локални файлове и внимателно loading поведение." },
      { question: "Проверявате ли Safari?", answer: "Да, когато проблемът е в WebKit или iOS, тестът трябва да включва същия browser engine, а не само Chromium." },
    ],
    ctaTitle: "Ако сайтът е бавен или нестабилен, започни с измерим baseline.",
    ctaText: "Изпрати URL адрес, проблемни устройства и налични PageSpeed или crash данни.",
    primaryCta: "Изпрати контекст за скорост",
  },
  {
    slug: "technical-support",
    metaTitle: "Техническа поддръжка за сайтове и дигитални платформи",
    metaDescription: "Техническа поддръжка от d . media за обновявания, наблюдение, съдържателни промени, интеграции, реакция при проблем и контролирани публикувания.",
    title: "Техническа поддръжка",
    intro: "Поддържаме сайтове като работещи системи: с контролирани промени, проверка преди публикуване и ясна реакция при реален проблем.",
    sections: [
      { title: "Текущи обновявания", text: "Прилагаме обновявания на зависимости и платформи, както и актуализации за сигурността, след проверка за съвместимост и риск от регресии." },
      { title: "Съдържателни промени", text: "Добавяме и редактираме страници, услуги, статии и assets без разпадане на SEO и визуалната система." },
      { title: "Наблюдение", text: "Следим наличност, резултати от изграждането и публикуването, сигнали за индексиране и ключови отклонения в скоростта според обхвата." },
      { title: "Реакция при проблем", text: "Диагностицираме счупени адреси, проблеми при публикуване, browser crashes и външни integration failures по приоритет." },
      { title: "Резервни копия и връщане към предишна версия", text: "Поддържаме ясна версия на кода и история на публикуванията, за да може проблемна промяна да бъде изолирана." },
      { title: "SEO поддръжка", text: "Проверяваме sitemap, redirects, canonical, hreflang и schema след структурни промени." },
      { title: "Документация", text: "Поддържаме release история, конфигурация и процедури така, че системата да не зависи от паметта на един човек." },
    ],
    integrationsTitle: "Поддръжка според реалната среда",
    integrationsText: "Обхватът може да включва Cloudflare, Vercel, CMS, онлайн търговия, аналитика и други системи според конкретния проект.",
    integrationGroups: [
      { title: "Процес за публикуване", text: "Използваме последователност от изграждане, преглед, QA и публикуване вместо директни непроверени промени." },
      { title: "Отговорности и достъпи", text: "Достъпите, домейнът, хостингът и хранилищата на кода остават подредени и проследими." },
      { title: "Приоритет", text: "Разделяме критичните инциденти от планираните подобрения, за да няма хаотична работа." },
    ],
    ...commonBg,
    processSteps: [
      { title: "Приемане", text: "Описваме системата, достъпите, критичните маршрути и текущите рискове." },
      { title: "Начално състояние", text: "Проверяваме build, зависимости, публикуване, наблюдение и готовност за резервно копие." },
      { title: "Работен ритъм", text: "Определяме канала, приоритета, цикъла на публикуване и критериите за приемане." },
      { title: "Отчетност", text: "Всяка промяна остава проследима чрез commit, публикуване и кратка проверка." },
    ],
    faqs: [
      { question: "Поддържате ли сайт, който не е разработен от d . media?", answer: "Да, след технически преглед на кода, платформата, достъпите и натрупания риск." },
      { question: "Поддръжката включва ли нови функции?", answer: "Малки промени могат да бъдат включени, а по-големите функции се оценяват като отделен проектен обхват." },
      { question: "Как се обработват критични проблеми?", answer: "Според договорения приоритет, наличните достъпи и възможността за безопасно връщане към предишна версия." },
      { question: "Работите ли само с Cloudflare?", answer: "Не. Поддръжката следва реалната инфраструктура и може да включва различни доставчици на хостинг и платформи." },
    ],
    ctaTitle: "Ако сайтът има нужда от контролирана поддръжка, започни с технически преглед.",
    ctaText: "Изпрати платформата, хостинг средата, текущите проблеми и очаквания работен ритъм.",
    primaryCta: "Изпрати контекст за поддръжка",
  },
];

const englishDetails: Record<string, { sections: Section[]; groups: Section[] }> = {
  "web-design": {
    sections: [
      { title: "Information architecture", text: "We organise services, evidence, content, and contact points so the website is understandable from the first visit." },
      { title: "UX and user flow", text: "We define a logical path from the primary promise to a concrete action without competing signals or decorative obstacles." },
      { title: "Visual system", text: "We translate the identity into typography, composition, cards, navigation, and responsive behaviour without producing a generic template." },
      { title: "Responsive design", text: "Mobile, tablet, and desktop are designed as one coherent system rather than a compressed desktop layout." },
      { title: "Content-first approach", text: "The interface follows real content, heading length, language versions, and readability requirements." },
      { title: "Accessibility", text: "Contrast, heading hierarchy, focus states, and touch targets are considered during design rather than added after development." },
      { title: "Development readiness", text: "We deliver clear component logic, states, and rules that can be implemented without guesswork." },
    ],
    groups: [
      { title: "Brand identity", text: "We use the existing identity or identify the missing rules before interface work starts." },
      { title: "Content", text: "We organise copy hierarchy so every page has a purpose, context, and next step." },
      { title: "Development", text: "Design decisions are checked against performance, maintenance, and practical implementation." },
    ],
  },
  "web-development": {
    sections: [
      { title: "Technical architecture", text: "We select the rendering model, content layer, hosting, and deployment process around content, dynamics, and maintenance." },
      { title: "Front-end development", text: "We build semantic, responsive, accessible interfaces with minimal unnecessary JavaScript." },
      { title: "CMS and content", text: "When editorial work is required, we connect an appropriate CMS or a maintainable local content system." },
      { title: "Integrations", text: "Payments, CRM, analytics, booking, and email systems are connected only when they serve a defined business function." },
      { title: "Multilingual architecture", text: "We implement language-specific URLs, canonical, and hreflang logic without fake translations or orphan versions." },
      { title: "Security and resilience", text: "We limit unnecessary dependencies and verify headers, external resources, and deployment behaviour." },
      { title: "Maintenance and portability", text: "The structure is documented so the project can be updated and moved without dependency on one platform." },
    ],
    groups: [
      { title: "Astro and static-first", text: "A strong option for fast content and presentation websites with low runtime risk." },
      { title: "CMS and commerce", text: "WordPress, headless CMS, Shopify, WooCommerce, or another environment is used when the editorial or commercial process requires it." },
      { title: "Cloud and hosting", text: "Cloudflare, Vercel, or another provider is selected according to deployment, functions, budget, and system ownership." },
    ],
  },
  "technical-seo": {
    sections: [
      { title: "Crawlability", text: "We inspect robots rules, response statuses, redirect chains, internal links, and access to primary content." },
      { title: "Indexing", text: "Indexable routes, sitemap, canonical, and noindex logic are compared to prevent missing important pages or indexing helper documents." },
      { title: "Canonical and duplicates", text: "WWW, HTTPS, trailing slash, language versions, and parameterized URLs are consolidated into clear canonical variants." },
      { title: "International SEO", text: "We verify reciprocal hreflang relationships and prevent alternates that point to content that does not exist." },
      { title: "Structured data", text: "Organization, Service, Article, BreadcrumbList, FAQPage, and CreativeWork markup is validated against visible content." },
      { title: "Internal linking", text: "Services, articles, and case studies are connected by topic and intent without orphan pages." },
      { title: "Performance signals", text: "We inspect technical factors that affect crawling, rendering, and user experience." },
    ],
    groups: [
      { title: "Google Search Console", text: "Indexing, sitemap, and URL inspection reports are diagnostic signals, not substitutes for inspecting the website itself." },
      { title: "Schema and entities", text: "Pages use clear types, identifiers, and real relationships between the organization, services, and content." },
      { title: "Content architecture", text: "A technically valid page still needs a clear topic, unique purpose, and useful content." },
    ],
  },
  geo: {
    sections: [
      { title: "Entity clarity", text: "We define the primary organization, services, topics, location, and stable relationships between them." },
      { title: "Citation-ready content", text: "Clear definitions, specific methodologies, verifiable case studies, and direct answers reduce ambiguity during retrieval." },
      { title: "Topic clusters", text: "Service pages, knowledge articles, and case studies are connected into coherent thematic clusters." },
      { title: "Machine-readable signals", text: "Semantic HTML, metadata, schema, llms guidance, and stable URL relationships support human-readable content." },
      { title: "Consistency", text: "The website, social profiles, and external references should describe the brand without contradiction." },
      { title: "Source quality", text: "Owned claims are separated from verified outcomes, and fabricated authority signals are avoided." },
      { title: "Monitoring", text: "We observe how systems describe the brand and correct the source of ambiguity rather than chasing one generated answer." },
    ],
    groups: [
      { title: "SEO foundation", text: "Generative systems rely on many of the same crawlable and indexable sources that support traditional search." },
      { title: "Knowledge architecture", text: "Services, methodology, evidence, and editorial content need distinct and connected roles." },
      { title: "External corroboration", text: "Independent mentions, client references, and consistent profiles strengthen recognition beyond owned content." },
    ],
  },
  "performance-optimization": {
    sections: [
      { title: "Baseline", text: "We measure Lighthouse, PageSpeed, Core Web Vitals, and real behaviour across key routes and devices." },
      { title: "Images", text: "Dimensions, formats, responsive variants, lazy loading, and decoding are controlled according to placement." },
      { title: "Fonts", text: "Official typography is preserved while formats, subsets, preload, and fallback behaviour are optimized." },
      { title: "JavaScript", text: "Unnecessary client runtime is removed and interaction is isolated to places with a real function." },
      { title: "CSS and layout", text: "Conflicting rules, layout shifts, and rendering cost are reduced without visual compromise." },
      { title: "Caching and delivery", text: "Headers, CDN behaviour, and asset versioning are aligned with the hosting and update process." },
      { title: "Regression control", text: "Build, route, and device checks are repeated because a single score does not demonstrate stability." },
    ],
    groups: [
      { title: "Core Web Vitals", text: "We address the causes of LCP, CLS, and INP rather than hiding their symptoms." },
      { title: "Mobile stability", text: "Memory, galleries, lightboxes, and embedded browsers are tested where resource limits are stricter." },
      { title: "SEO and accessibility", text: "Performance work must not remove semantic content, navigation, or accessibility." },
    ],
  },
  "technical-support": {
    sections: [
      { title: "Ongoing updates", text: "Dependency, platform, and security updates are applied after compatibility and regression checks." },
      { title: "Content changes", text: "Pages, services, articles, and assets are updated without breaking SEO or the visual system." },
      { title: "Monitoring", text: "Availability, builds, deployments, indexing signals, and key performance deviations are monitored according to scope." },
      { title: "Incident response", text: "Broken routes, deployment failures, browser crashes, and integration incidents are diagnosed by priority." },
      { title: "Backup and rollback", text: "Code and deployment history remain clear enough to isolate or reverse a problematic release." },
      { title: "SEO maintenance", text: "Sitemaps, redirects, canonical, hreflang, and schema are rechecked after structural changes." },
      { title: "Documentation", text: "Release history, configuration, and procedures are maintained so the system does not depend on one person's memory." },
    ],
    groups: [
      { title: "Release process", text: "Build, preview, QA, and production stages replace direct unverified changes." },
      { title: "Ownership", text: "Access, domain, hosting, and repositories remain organized and traceable." },
      { title: "Priority", text: "Critical incidents are separated from planned improvements to prevent chaotic work." },
    ],
  },
};

const en: AuthorityService[] = bg.map((service) => {
  const translations: Record<string, Pick<AuthorityService, "metaTitle" | "metaDescription" | "title" | "intro" | "ctaTitle" | "ctaText" | "primaryCta">> = {
    "web-design": { metaTitle: "Web Design for Clear, Usable Websites", metaDescription: "Web design by d . media for corporate websites, portfolios, and landing pages with clear architecture, UX logic, and brand consistency.", title: "Web Design", intro: "We design websites as part of the brand system, with clear information architecture, consistent interface logic, and a specific next step for the user.", ctaTitle: "If the website needs a clear visual and UX system, start with context.", ctaText: "Send the goal, available content, required pages, and current brand foundation.", primaryCta: "Send web design context" },
    "web-development": { metaTitle: "Web Development and Stable Technical Architecture", metaDescription: "Web development by d . media for fast, accessible, maintainable websites with the appropriate stack, integrations, and performance-first architecture.", title: "Web Development", intro: "We develop websites and digital platforms with technology selected for the actual project, rather than restricting every client to one stack or provider.", ctaTitle: "If the project requires stable development, start with technical context.", ctaText: "Send the required functionality, content, current environment, integrations, and timing.", primaryCta: "Send development context" },
    "technical-seo": { metaTitle: "Technical SEO for Crawling, Indexing, and Clear Structure", metaDescription: "Technical SEO by d . media covering crawlability, indexing, canonical, hreflang, sitemaps, structured data, internal links, and performance checks.", title: "Technical SEO", intro: "We organise the technical signals that allow search engines to discover, understand, and index the correct pages without unnecessary duplicates.", ctaTitle: "If important pages are not indexed correctly, start with a technical crawl.", ctaText: "Send the domain, platform, and available Search Console signals.", primaryCta: "Send SEO context" },
    geo: { metaTitle: "GEO and Visibility in AI Search", metaDescription: "GEO by d . media for clearer entity understanding, AI citation readiness, content architecture, structured data, and consistent public signals.", title: "GEO and AI Visibility", intro: "We organise content and entity signals so AI systems can understand more accurately who the brand is, what it offers, and which sources support that description.", ctaTitle: "If AI systems describe the brand too narrowly, start with an entity audit.", ctaText: "Send the domain, intended positioning, and examples of current AI answers.", primaryCta: "Send GEO context" },
    "performance-optimization": { metaTitle: "Performance Optimization and Core Web Vitals", metaDescription: "Performance optimization by d . media for LCP, CLS, INP, images, fonts, JavaScript, caching, and stable mobile behaviour.", title: "Performance Optimization", intro: "We optimize websites through measurement, asset discipline, and architectural decisions without removing content or identity merely to improve a laboratory score.", ctaTitle: "If the website is slow or unstable, start with a measurable baseline.", ctaText: "Send the URL, affected devices, and available PageSpeed or crash data.", primaryCta: "Send performance context" },
    "technical-support": { metaTitle: "Technical Support for Websites and Digital Platforms", metaDescription: "Technical support by d . media for updates, monitoring, content changes, integrations, incident response, and controlled releases.", title: "Technical Support", intro: "We maintain websites as working systems through controlled changes, pre-release checks, and a clear response to real incidents.", ctaTitle: "If the website needs controlled support, start with a technical review.", ctaText: "Send the platform, hosting environment, current issues, and expected working rhythm.", primaryCta: "Send support context" },
  };
  const t = translations[service.slug];
  return {
    ...service,
    ...t,
    sections: englishDetails[service.slug].sections,
    integrationsTitle: "Connected systems and methodology",
    integrationsText: "The service is delivered as part of a wider system connecting brand, content, technology, search visibility, and maintainability.",
    integrationGroups: englishDetails[service.slug].groups,
    ...commonEn,
    processSteps: [
      { title: "Context", text: "We establish the current state, goals, constraints, ownership, and measurable outcome." },
      { title: "Architecture", text: "We define the information, technical, and operational relationships required by the scope." },
      { title: "Implementation", text: "We apply controlled changes in the appropriate content, code, platform, and delivery layers." },
      { title: "Validation", text: "We repeat build, crawl, device, and production checks before considering the work complete." },
    ],
    faqs: [
      { question: `How does a ${t.title.toLowerCase()} engagement begin?`, answer: "We start with the current state, intended outcome, available access, constraints, and the evidence needed to define a responsible scope." },
      { question: "Is the work limited to Astro or Cloudflare?", answer: "No. Technology and infrastructure are selected according to the project, existing environment, maintenance model, and client requirements." },
      { question: "Can this be applied to an existing website?", answer: "Yes. The work can begin with an existing platform and does not require a redesign unless the evidence shows that structural change is necessary." },
      { question: "Does this guarantee rankings or AI citations?", answer: "No. We improve technical access, clarity, consistency, and evidence. Search engines and generative systems retain control over rankings, presentation, and source selection." },
    ],
  };
});

export const authorityServiceSlugs = bg.map((service) => service.slug);

export function getAuthorityServices(locale: Locale) {
  return locale === "bg" ? bg : en;
}

export function getAuthorityService(locale: Locale, slug: string) {
  return getAuthorityServices(locale).find((service) => service.slug === slug);
}
