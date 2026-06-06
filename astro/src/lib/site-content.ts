import type { Locale } from "@/lib/i18n";

export const contactEmail = "contact@d-media.org";
export const contactPhone = "0892 494 495";
export const contactPhoneHref = "+359892494495";

const socialLinks = [
  { key: "instagram", handle: "/d.media_bg", href: "https://www.instagram.com/d.media_bg" },
  { key: "behance", handle: "/d-media", href: "https://www.behance.net/d-media" },
  { key: "linkedin", handle: "/d-media-bg", href: "https://www.linkedin.com/company/d-media-bg" },
  { key: "tiktok", handle: "/d.media_bg", href: "https://www.tiktok.com/@d.media_bg" },
  { key: "youtube", handle: "/d.media_BG", href: "https://www.youtube.com/@d.media_BG" },
] as const;

const localizedSiteContent = {
  bg: {
    mainNavigation: [
      { href: "/", label: "Начало" },
      { href: "/projects", label: "Проекти" },
      { href: "/services", label: "Услуги" },
      { href: "/about", label: "За бранда" },
      { href: "/contact", label: "Контакт" },
    ],
    socials: {
      instagram: "Instagram",
      behance: "Behance",
      linkedin: "LinkedIn",
      tiktok: "TikTok",
      youtube: "YouTube",
    },
    coreServices: [
      {
        id: "brand-identity",
        title: "Бранд идентичност",
        text: "Лого, логотип и визуална система, подредени така, че брандът да стои ясен и разпознаваем.",
        includes: "Лого, логотип, цветова рамка, типография и основни правила за приложение.",
        audience: "За брандове, които имат нужда от ясен облик в началото или след период на размиване, не от козметична промяна без система.",
        result: "Получаваш logo система, цветова рамка и базови правила за сайт, документи и реклама.",
      },
      {
        id: "content",
        title: "Съдържание и социални медии",
        text: "Текстове, визии и социални формати, подредени в една ясна линия за сайт, кампании и канали.",
        includes: "Текстове, визии, корици, формати, адаптации, календар и публикуване за сайт, социални канали и кампании.",
        audience: "За брандове, които искат ясен изказ, постоянство и една визуална линия, не отделни несвързани публикации.",
        result: "Получаваш content пакет с работни визии, текстове и ясен ред за публикуване.",
      },
      {
        id: "graphic-design",
        title: "Графичен дизайн",
        text: "Визуални материали за дигитална и печатна среда, изградени в ясен и разпознаваем стил.",
        includes: "Дигитални и печатни материали, корици, рекламни визии и формати за ежедневна употреба.",
        audience: "За брандове, които имат нужда от чисти решения за реална комуникация, не от случайни единични визии.",
        result: "Получаваш готови визии и файлове в точния формат за публикуване, печат или ежедневна употреба.",
      },
      {
        id: "advertising",
        title: "Реклама",
        text: "Рекламни визии и формати с фокус върху ясно послание, оферта и действие.",
        includes: "Рекламни визии, послания, кампанийни формати и адаптации за различни канали.",
        audience: "За бизнеси, които искат по-ясна оферта и по-добър отклик, не шумна комуникация без посока.",
        result: "Получаваш кампанийна визия, адаптация и готовност за реално пускане.",
      },
    ],
    coreProcess: [
      { id: "01", title: "Запитване", text: "Изпращаш кратък контекст и какво трябва да се изработи." },
      { id: "02", title: "Обхват и оферта", text: "Подреждаме задачата, срока и ценовата рамка според проекта." },
      { id: "03", title: "Потвърждение", text: "След одобрение проектът влиза в работа по ясен план." },
      { id: "04", title: "Разработка", text: "Изграждаме материалите последователно и в съгласуван ред." },
      { id: "05", title: "Предаване", text: "Получаваш готовите файлове в уговорения формат, подготвени за реална употреба." },
    ],
    aboutNotes: [
      "В d . media работим между бранд идентичност, съдържание, графичен дизайн и реклама. Целта е една: брандът да стои ясен, подреден и използваем във всяка точка на контакт.",
      "Подходът е системен. Проектът не се разглежда като единична визия, а като среда, в която знак, тон, формат и приложение трябва да работят заедно.",
      "Визуалната и комуникационната система има стойност само когато издържа извън презентацията. Тя трябва да работи в сайт, социални канали, документи, реклама и реални носители без да губи посока.",
      "Това изисква точен обхват, дисциплина в решенията и вкус в изпълнението. По-малко шум. Повече ред, последователност и приложение.",
      "След проекта не остават просто файлове. Остава система, която може да се използва, поддържа и развива с увереност.",
      "Точно тук е разликата: по-малко ефект, повече точност; по-малко показност, повече стойност.",
    ],
    aboutSummary: [
      "В d . media създаваме идентичност, съдържание, дизайн и реклама като една работеща система.",
      "Всеки проект започва с ясен обхват и завършва с материал за реална употреба.",
      "Подходът е подреден, спокоен и точен, без шум и без излишни решения.",
      "Фокусът е върху последователност, приложение и стойност, която остава след проекта.",
      "Резултатът е бранд, който изглежда събран, разпознаваем и готов за работа.",
    ],
    termsSummary: [
      "Работата започва след потвърдена оферта или сключен договор.",
      "Специалните условия по конкретен проект имат предимство пред общата рамка.",
      "Срокове, цена, формати и обхват се определят предварително.",
      "Клиентът предоставя нужните материали и носи отговорност за правата върху тях.",
      "Готовите файлове се предават в уговорения формат и следват рамката на конкретната услуга.",
    ],
    termsSections: [
      { title: "Обхват", text: "Страницата Условия обобщава общите правила, по които d . media приема, изпълнява и предава услуги към клиенти." },
      { title: "Възлагане", text: "Запитването, офертата и потвърждението могат да формират работеща договорна рамка дори когато няма отделен хартиен договор." },
      { title: "Изпълнение", text: "Всеки проект се движи по предварително съгласувани срокове, спецификации, формати и точки на контакт." },
      { title: "Права и отговорности", text: "d . media изпълнява услугата с дължимото качество, а клиентът осигурява съдържание, обратна връзка и плащане в уговорения срок." },
      { title: "Интелектуална собственост", text: "Правата върху създадените материали се уреждат според конкретния проект и допълнителните уговорки за употреба." },
    ],
    privacySummary: [
      "Обработват се само данни, нужни за контакт, договорни отношения и плащания.",
      "Правните основания включват договор, преддоговорни отношения, законово задължение, легитимен интерес и съгласие.",
      "Съхранението следва определени срокове според вида на документацията.",
      "В повечето случаи данните не се споделят с трети страни извън законово изискуемите случаи.",
      "Всеки клиент има право на достъп, корекция, изтриване, ограничаване, възражение и преносимост.",
    ],
    privacySections: [
      { title: "Какви данни", text: "Имена, адрес, телефон, e-mail, платежна информация и технически идентификатори, когато това е нужно за услугата или сайта." },
      { title: "Защо", text: "За контакт, подготовка на оферти и договори, изпълнение на услуги, счетоводни нужди, защита при спорове и подобряване на съдържанието." },
      { title: "Колко дълго", text: "Сроковете следват вида на данните: кратко за кореспонденция, по-дълго за договори, фактури и счетоводни документи." },
      { title: "Как се пазят", text: "Данните се съхраняват при технически и организационни мерки за сигурност и се изтриват или анонимизират след изтичане на нужния срок." },
      { title: "Права", text: "Всеки клиент може да поиска информация, корекция, ограничаване, изтриване или възражение чрез директен контакт с d . media." },
    ],
  },
  en: {
    mainNavigation: [
      { href: "/", label: "Home" },
      { href: "/projects", label: "Projects" },
      { href: "/services", label: "Services" },
      { href: "/about", label: "About" },
      { href: "/contact", label: "Contact" },
    ],
    socials: {
      instagram: "Instagram",
      behance: "Behance",
      linkedin: "LinkedIn",
      tiktok: "TikTok",
      youtube: "YouTube",
    },
    coreServices: [
      {
        id: "brand-identity",
        title: "Brand Identity",
        text: "Logo, logotype, and a visual system structured to keep the brand clear and recognisable.",
        includes: "Logo, logotype, colour framework, typography, and core application rules.",
        audience: "For brands that need a clear visual direction from the start or after a period of drift, not a cosmetic change without a system.",
        result: "You get a logo system, colour framework, and core rules for website, documents, and advertising.",
      },
      {
        id: "content",
        title: "Content and Social Media",
        text: "Copy, visuals, and social formats arranged into one clear line for websites, campaigns, and channels.",
        includes: "Copy, visuals, covers, formats, adaptations, planning, and publishing for websites, social channels, and campaigns.",
        audience: "For brands that need one voice, steady output, and one visual line, not disconnected standalone posts.",
        result: "You get a content package with working visuals, copy, and a clear publishing rhythm.",
      },
      {
        id: "graphic-design",
        title: "Graphic Design",
        text: "Visual materials for digital and print environments, built in a clear and recognisable style.",
        includes: "Digital and print materials, covers, campaign visuals, and day-to-day communication formats.",
        audience: "For brands that need clean solutions for real communication, not random one-off visuals.",
        result: "You get ready visuals and files in the right format for publishing, print, or day-to-day use.",
      },
      {
        id: "advertising",
        title: "Advertising",
        text: "Advertising visuals and formats focused on clear messaging, offer clarity, and action.",
        includes: "Campaign visuals, messaging, advertising formats, and channel-specific adaptations.",
        audience: "For businesses that need a clearer offer and stronger response, not noisy communication without direction.",
        result: "You get a campaign visual, adaptation, and launch readiness.",
      },
    ],
    coreProcess: [
      { id: "01", title: "Inquiry", text: "You send short context and what needs to be created." },
      { id: "02", title: "Scope and quote", text: "We define the task, timeline, and pricing framework around the project." },
      { id: "03", title: "Confirmation", text: "Once approved, the project moves into work through a clear plan." },
      { id: "04", title: "Development", text: "We build the materials in a consistent and coordinated order." },
      { id: "05", title: "Delivery", text: "You receive the final files in the agreed format, ready for real use." },
    ],
    aboutNotes: [
      "At d . media, we work between brand identity, content, graphic design, and advertising. The goal is simple: the brand should feel clear, ordered, and usable at every point of contact.",
      "The approach is systematic. A project is not treated as a single visual, but as an environment in which sign, tone, format, and application need to work together.",
      "A visual and communication system has value only when it holds up beyond a presentation. It needs to work across a website, social channels, documents, advertising, and real-world formats without losing direction.",
      "That requires a precise scope, discipline in decision-making, and taste in execution. Less noise. More order, consistency, and application.",
      "What remains after the project is not just a folder of files. It is a system we build to be used, maintained, and developed with confidence.",
      "That is the difference: less effect, more precision; less display, more value.",
    ],
    aboutSummary: [
      "At d . media, we create identity, content, design, and advertising as one working system.",
      "Every project begins with a clear scope and ends with material ready for real use.",
      "The approach is ordered, calm, and precise, without noise and without unnecessary decisions.",
      "The focus is on consistency, application, and value that remains after the project.",
      "The result is a brand that feels cohesive, recognisable, and ready to work.",
    ],
    termsSummary: [
      "Work begins after a confirmed offer or a signed agreement.",
      "Specific project terms take precedence over the general framework.",
      "Timelines, price, formats, and scope are defined in advance.",
      "The client provides the required materials and remains responsible for the rights attached to them.",
      "Final files are delivered in the agreed format and follow the framework of the specific service.",
    ],
    termsSections: [
      { title: "Scope", text: "The Terms page summarises the general rules under which d . media accepts, delivers, and hands over services to clients." },
      { title: "Commissioning", text: "The inquiry, offer, and confirmation can form a valid working agreement even without a separate paper contract." },
      { title: "Execution", text: "Each project moves through previously agreed timelines, specifications, formats, and contact points." },
      { title: "Rights and responsibilities", text: "d . media delivers the service with due quality, while the client provides content, feedback, and payment within the agreed timeframe." },
      { title: "Intellectual property", text: "Rights over created materials are arranged according to the specific project and any additional agreements on usage." },
    ],
    privacySummary: [
      "Only data required for contact, contractual relations, and payment is processed.",
      "Legal grounds include contract, pre-contractual relations, legal obligation, legitimate interest, and consent.",
      "Storage follows defined periods depending on the type of documentation.",
      "In most cases, data is not shared with third parties outside legally required situations.",
      "Every client has the right to access, correct, erase, restrict, object, and request portability.",
    ],
    privacySections: [
      { title: "What data", text: "Names, address, phone number, e-mail, payment information, and technical identifiers when they are needed for the service or the site." },
      { title: "Why", text: "For contact, preparing offers and agreements, delivering services, accounting needs, protection in disputes, and improving content." },
      { title: "How long", text: "Retention periods depend on the type of data: shorter for correspondence, longer for agreements, invoices, and accounting documents." },
      { title: "How it is protected", text: "Data is stored with technical and organisational security measures and is deleted or anonymised after the necessary period expires." },
      { title: "Rights", text: "Every client can request information, correction, restriction, erasure, or objection through direct contact with d . media." },
    ],
  },
} as const;

export function getSiteContent(locale: Locale) {
  const content = localizedSiteContent[locale];

  return {
    ...content,
    socials: socialLinks.map((social) => ({
      label: content.socials[social.key],
      handle: social.handle,
      href: social.href,
    })),
  };
}
