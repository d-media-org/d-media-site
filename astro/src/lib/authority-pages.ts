import type { Locale } from "@/lib/i18n";

type AuthorityPage = {
  slug: string;
  title: string;
  eyebrow: string;
  description: string;
  intro: string;
  sections: { title: string; text: string }[];
  faqs?: { question: string; answer: string }[];
};

const bg: AuthorityPage[] = [
  {
    slug: "our-process",
    title: "Процес на работа",
    eyebrow: "процес",
    description: "Процесът на d . media за контекст, обхват, дизайн, разработка, проверка, публикуване и поддръжка.",
    intro: "Работим в ясна последователност, която намалява неяснотата преди изпълнение и риска от регресии след публикуване.",
    sections: [
      { title: "01. Контекст", text: "Събираме целта, аудиторията, средата, наличните материали, ограниченията и критерия за успешен резултат." },
      { title: "02. Обхват", text: "Разделяме задължителното от допълнителното и описваме резултати, срокове, зависимости и начин на одобрение." },
      { title: "03. Архитектура", text: "Подреждаме съдържание, визуална система, потребителски поток, технологичен стек и технически сигнали според проекта." },
      { title: "04. Изпълнение", text: "Работим на контролирани етапи, за да може всяко решение да бъде проверено преди следващото." },
      { title: "05. Проверка", text: "Проверяваме съдържание, поведение при различни екрани, достъпност, скорост, SEO, GEO и реалните сценарии за използване." },
      { title: "06. Публикуване", text: "Използваме последователност от изграждане, прегледна версия и публикуване, както и възможност за връщане към предишна версия, вместо непроверени директни промени." },
      { title: "07. Поддръжка", text: "След публикуване системата може да продължи с наблюдение, обновявания, развитие на съдържанието и контрол върху регресии." },
    ],
  },
  {
    slug: "methodology",
    title: "Методология",
    eyebrow: "методология",
    description: "Методологията на d . media за свързване на бранд идентичност, съдържание, дизайн, уеб, SEO, GEO и скорост.",
    intro: "Не разглеждаме идентичността, съдържанието и технологията като отделни доставки. Те трябва да работят в една проверима система.",
    sections: [
      { title: "Яснота преди форма", text: "Преди визуалното решение определяме функцията, аудиторията, посланието и реалната среда на употреба." },
      { title: "Система преди единичен файл", text: "Търсим повторяема логика за типография, композиция, формати за съдържание, компоненти и точки на контакт." },
      { title: "Съдържание преди украса на интерфейса", text: "Работим с реални заглавия, текстове, езици и ограничения, за да избегнем красив, но неизползваем шаблон." },
      { title: "Технология според проекта", text: "Astro, CMS, онлайн търговията, Cloudflare, Vercel или друга среда се избират според целта, собствеността и поддръжката." },
      { title: "Доказателства преди обещания", text: "Разграничаваме потвърдени резултати, наблюдения и цели. Не използваме фиктивни показатели или гаранции за класиране." },
      { title: "Проверка след промяна", text: "Всяка съществена промяна минава през изграждане, проверка на маршрути, визуална проверка и проверка за публикуване според риска." },
    ],
  },
  {
    slug: "technologies",
    title: "Технологии и инфраструктура",
    eyebrow: "технологии",
    description: "Технологичният подход на d . media към Astro, CMS, онлайн търговията, Cloudflare, Vercel, интеграции, аналитика и поддръжка.",
    intro: "Не продаваме конкретен стек като универсален отговор. Избираме най-малката достатъчна система за съдържанието, функциите и дългосрочната поддръжка.",
    sections: [
      { title: "Astro и статично генериране", text: "Подходящи за сайтове с много съдържание и представителни сайтове, когато е приоритет да се ограничи изпълнението на код в браузъра и да се постигне висока скорост." },
      { title: "CMS", text: "Използваме WordPress, headless CMS или друга редакционна среда, когато екипът трябва да управлява съдържанието самостоятелно." },
      { title: "Търговия", text: "Shopify, WooCommerce и други търговски решения се оценяват според каталог, плащания, операции и интеграции." },
      { title: "Cloudflare и Vercel", text: "Платформата за публикуване се избира според функции, статично доставяне, процес на изграждане, собственост и реалните оперативни нужди." },
      { title: "Интеграции", text: "CRM, плащания, резервации, имейл и аналитика се добавят само когато подкрепят ясен процес." },
      { title: "Преносимост", text: "Кодът, файловете, домейнът и конфигурацията се подреждат така, че проектът да не остава неясно заключен към доставчик." },
    ],
  },
  {
    slug: "performance",
    title: "Стандарт за скорост",
    eyebrow: "скорост",
    description: "Стандартът на d . media за Core Web Vitals, PageSpeed, мобилна стабилност, достъпност и контрол върху регресии.",
    intro: "Производителността е част от архитектурата и процеса на проверка, не финална декоративна значка.",
    sections: [
      { title: "Измерване", text: "Използваме лабораторни тестове и, когато са налични, данни от реална употреба, без да представяме единично измерване като постоянна гаранция." },
      { title: "Файлове", text: "Изображенията имат размери, подходящ формат и контролирано зареждане. Шрифтовете запазват бранда с оптимизирано доставяне." },
      { title: "Среда за изпълнение", text: "Клиентският JavaScript се използва само за реална интерактивност, а не като модел за рендериране по подразбиране." },
      { title: "Мобилна стабилност", text: "Проверяваме памет, галерия, навигация и презареждане в подходящи браузърни енджини, включително WebKit при iOS риск." },
      { title: "Достъпност", text: "Добрата производителност не се постига чрез премахване на семантична структура, състояния при фокус или достатъчно съдържание." },
      { title: "Контрол върху регресии", text: "Изграждането, обхождането и бързите визуални проверки се повтарят преди публикуване на сайта." },
    ],
  },
  {
    slug: "faq",
    title: "Често задавани въпроси",
    eyebrow: "faq",
    description: "Отговори за услугите, процеса, цените, технологиите, SEO, GEO, скоростта и поддръжката на d . media.",
    intro: "Кратки отговори на въпроси, които определят правилния обхват преди начало на проект.",
    sections: [],
    faqs: [
      { question: "Какви услуги предлага d . media?", answer: "Бранд идентичност, съдържание, управление на социални медии, графичен дизайн, реклама, уеб дизайн, уеб разработка, техническо SEO, GEO, оптимизация на скоростта и техническа поддръжка." },
      { question: "Работите ли само по цялостни проекти?", answer: "Не. Услугите могат да бъдат самостоятелен обхват или част от по-голяма система, когато зависимостите го изискват." },
      { question: "Работите ли само с Astro и Cloudflare?", answer: "Не. Избираме технологията и инфраструктурата според проекта, клиента, интеграциите и поддръжката." },
      { question: "Гарантирате ли първо място в Google или AI цитиране?", answer: "Не. Подобряваме техническата основа, съдържанието, яснотата на entity и доказателствата, но търсачките и AI системите контролират класирането и избора на източници." },
      { question: "Как се определя цената?", answer: "Според резултатите, сложността, обема, срока, интеграциите, правата и нужната поддръжка. Публикуваните стойности са начални рамки, когато има потвърден стандартен обхват." },
      { question: "Може ли да поемете съществуващ сайт?", answer: "Да, след преглед на кода, платформата, слоя за съдържание, достъпите и натрупания риск." },
      { question: "Как започва работата?", answer: "С кратък контекст: цел, текущо състояние, нужни резултати, срок и налични материали или достъпи." },
    ],
  },
];

const en: AuthorityPage[] = [
  { slug: "our-process", title: "Our Process", eyebrow: "process", description: "The d . media process for context, scope, design, development, QA, publishing, and support.", intro: "We work in a clear sequence that reduces ambiguity before execution and regression risk after publishing.", sections: bg[0].sections.map((_, i) => [
    { title: "01. Context", text: "We gather the goal, audience, environment, available materials, constraints, and the criterion for a successful outcome." },
    { title: "02. Scope", text: "We separate required work from optional work and define deliverables, timing, dependencies, and approval." },
    { title: "03. Architecture", text: "Content, visual system, user flow, technology stack, and technical signals are organized around the project." },
    { title: "04. Execution", text: "Work proceeds in controlled stages so every decision can be checked before the next one." },
    { title: "05. QA", text: "We verify content, responsive behaviour, accessibility, performance, SEO, GEO, and real usage scenarios." },
    { title: "06. Publishing", text: "Build, preview, production, and rollback logic replace unverified direct changes." },
    { title: "07. Support", text: "After launch, the system can continue with monitoring, updates, content development, and regression control." },
  ][i]), },
  { slug: "methodology", title: "Methodology", eyebrow: "methodology", description: "The d . media methodology connecting brand identity, content, design, web, SEO, GEO, and performance.", intro: "We do not treat identity, content, and technology as separate deliveries. They need to operate as one verifiable system.", sections: [
    { title: "Clarity before form", text: "Before visual decisions, we define function, audience, message, and the real environment of use." },
    { title: "System before a single asset", text: "We look for repeatable logic across typography, composition, content formats, components, and touchpoints." },
    { title: "Content before interface decoration", text: "Real headings, copy, languages, and constraints prevent a visually polished but unusable template." },
    { title: "Technology according to the project", text: "Astro, CMS, commerce, Cloudflare, Vercel, or another environment is selected according to purpose, ownership, and maintenance." },
    { title: "Evidence before promises", text: "Verified outcomes, observations, and goals are kept distinct. We do not use fabricated metrics or ranking guarantees." },
    { title: "Validation after change", text: "Every material change passes build, route, visual, and production validation according to risk." },
  ] },
  { slug: "technologies", title: "Technologies and Infrastructure", eyebrow: "technologies", description: "The d . media approach to Astro, CMS, commerce, Cloudflare, Vercel, integrations, analytics, and maintenance.", intro: "We do not sell one stack as a universal answer. We select the smallest sufficient system for the content, functionality, and long-term maintenance.", sections: [
    { title: "Static-first and Astro", text: "Suitable for content-heavy and presentation websites where low runtime risk and performance are priorities." },
    { title: "CMS", text: "WordPress, headless CMS, or another editorial environment is used when a team needs direct content control." },
    { title: "Commerce", text: "Shopify, WooCommerce, and other commerce solutions are evaluated around catalogue, payments, operations, and integrations." },
    { title: "Cloudflare and Vercel", text: "The deployment platform follows functions, static delivery, build process, ownership, and operational requirements." },
    { title: "Integrations", text: "CRM, payments, booking, email, and analytics are added only when they support a defined process." },
    { title: "Portability", text: "Code, assets, domain, and configuration are organized so the project is not ambiguously locked to one provider." },
  ] },
  { slug: "performance", title: "Performance Standard", eyebrow: "performance", description: "The d . media performance standard for Core Web Vitals, PageSpeed, mobile stability, accessibility, and regression control.", intro: "Performance is part of architecture and QA, not a decorative badge added at the end.", sections: [
    { title: "Measurement", text: "We use laboratory tests and field data when available without presenting one run as a permanent guarantee." },
    { title: "Assets", text: "Images use explicit dimensions, appropriate formats, and controlled loading. Fonts preserve the brand through optimized delivery." },
    { title: "Runtime", text: "Client JavaScript is reserved for real interaction rather than used as the default rendering model." },
    { title: "Mobile stability", text: "Memory, galleries, navigation, and reload scenarios are checked in relevant browser engines, including WebKit for iOS risk." },
    { title: "Accessibility", text: "Performance is not achieved by removing semantic structure, focus states, or useful content." },
    { title: "Regression control", text: "Build, crawl, and visual smoke checks are repeated before production deployment." },
  ] },
  { slug: "faq", title: "Frequently Asked Questions", eyebrow: "faq", description: "Answers about d . media services, process, pricing, technologies, SEO, GEO, performance, and support.", intro: "Concise answers to questions that define the correct scope before a project begins.", sections: [], faqs: [
    { question: "What services does d . media provide?", answer: "Brand identity, content creation, social media management, graphic design, advertising, web design, web development, technical SEO, GEO, performance optimization, and technical support." },
    { question: "Do you work only on complete systems?", answer: "No. Services may stand alone or form part of a wider system when the dependencies require it." },
    { question: "Do you work only with Astro and Cloudflare?", answer: "No. Technology and infrastructure are selected according to the project, client, integrations, and maintenance requirements." },
    { question: "Do you guarantee first place in Google or AI citations?", answer: "No. We improve technical foundations, content, entity clarity, and evidence, while search and AI systems control ranking and source selection." },
    { question: "How is pricing determined?", answer: "Pricing follows deliverables, complexity, volume, timing, integrations, rights, and support. Published values are starting ranges where a confirmed standard scope exists." },
    { question: "Can you take over an existing website?", answer: "Yes, after reviewing the code, platform, content layer, access, and accumulated risk." },
    { question: "How does work begin?", answer: "With concise context: objective, current state, required outcome, timing, and available materials or access." },
  ] },
];

export const authorityPageSlugs = bg.map((page) => page.slug);
export function getAuthorityPages(locale: Locale) { return locale === "bg" ? bg : en; }
export function getAuthorityPage(locale: Locale, slug: string) { return getAuthorityPages(locale).find((page) => page.slug === slug); }
