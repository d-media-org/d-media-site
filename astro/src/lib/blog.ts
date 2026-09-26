import { type Locale } from "@/lib/i18n";
import { defaultSocialImage, getAbsolutePageUrl } from "@/lib/seo";
import { publishedEnPosts } from "@/lib/blog-en";
import { getAuthorityArticles } from "@/lib/authority-articles";

export type BlogCategoryKey =
  | "brand-identity"
  | "graphic-design"
  | "social-media"
  | "content"
  | "web-presence"
  | "ai-design"
  | "seo-geo"
  | "case-studies";

export type BlogSection = {
  title: string;
  paragraphs: string[];
  bullets?: string[];
};

export type BlogLink = {
  href: string;
  label: string;
};

export type BlogPost = {
  slug: string;
  category: BlogCategoryKey;
  datePublished: string;
  dateModified: string;
  readingTime: number;
  title: string;
  excerpt: string;
  intro: string;
  metaTitle: string;
  metaDescription: string;
  seoTitle: string;
  seoDescription: string;
  author: string;
  tags: string[];
  keywords: string[];
  language: "bg-BG" | "en-US";
  featured: boolean;
  draft: boolean;
  relatedPosts: string[];
  ogImage?: string;
  sections: BlogSection[];
  faqs?: { question: string; answer: string }[];
  relatedLinks: BlogLink[];
  ctaTitle: string;
  ctaText: string;
  ctaPrimaryLabel: string;
  ctaPrimaryHref: string;
  ctaSecondaryLabel: string;
  ctaSecondaryHref: string;
};

const BLOG_AUTHOR = "d . media";
const BLOG_LANGUAGE = "bg-BG" as const;
const BLOG_DATE = "2026-06-07";

const blogCategories = {
  bg: [
    { key: "brand-identity", label: "Бранд идентичност" },
    { key: "graphic-design", label: "Графичен дизайн" },
    { key: "social-media", label: "Социални медии" },
    { key: "content", label: "Съдържание" },
    { key: "web-presence", label: "Уеб и дигитално присъствие" },
    { key: "ai-design", label: "AI и дизайн" },
    { key: "seo-geo", label: "SEO и GEO" },
    { key: "case-studies", label: "Казуси" },
  ],
  en: [
    { key: "brand-identity", label: "Brand Identity" },
    { key: "graphic-design", label: "Graphic Design" },
    { key: "social-media", label: "Social Media" },
    { key: "content", label: "Content" },
    { key: "web-presence", label: "Web and Digital Presence" },
    { key: "ai-design", label: "AI and Design" },
    { key: "seo-geo", label: "SEO and GEO" },
    { key: "case-studies", label: "Case Studies" },
  ],
} as const satisfies Record<Locale, readonly { key: BlogCategoryKey; label: string }[]>;

const blogPageCopy = {
  bg: {
    metaTitle: "Блог и база знания",
    metaDescription:
      "Идеи, анализи и практически наблюдения за бранд идентичност, съдържание, социални медии, дизайн, реклама, уеб присъствие, SEO и GEO от d . media.",
    title: "Блог",
    intro:
      "Идеи, анализи и практически наблюдения за бранд идентичност, съдържание, социални медии, дизайн, реклама и дигитално присъствие.",
    knowledgeTitle: "Редакционна база знания с практическа стойност.",
    knowledgeText:
      "Тук събираме текстове, които обясняват по-ясно как работят идентичност, съдържание, сайт, SEO, GEO и реалното дигитално присъствие. Целта не е обем, а яснота, аргумент и практическа стойност.",
    filtersLabel: "Категории",
    allLabel: "Всички публикации",
    articleCta: "Прочети статията",
    readTimeLabel: "минути четене",
    authorLabel: "автор",
    zeroPostsLabel: "Категорията се подготвя",
    emptyTitle: "Английската редакция се подготвя отделно.",
    emptyText:
      "Структурата е готова за английски публикации. Първо публикуваме българските материали в базата знания, след което добавяме пълните английски версии.",
    relatedArticlesTitle: "Свързани статии",
    relatedLinksTitle: "Вътрешни връзки",
    articleFooterLabel: "следваща стъпка",
    caseStudyDraftNote: "казусите се подготвят като отделна редакционна линия и не са публични, докато няма финално съдържание",
  },
  en: {
    metaTitle: "Blog and knowledge center",
    metaDescription:
      "Ideas, analysis, and practical observations on brand identity, content, social media, design, advertising, web presence, SEO, and GEO from d . media.",
    title: "Blog",
    intro:
      "Ideas, analysis, and practical observations on brand identity, content, social media, design, advertising, and digital presence.",
    knowledgeTitle: "Knowledge center with editorial weight, not filler content.",
    knowledgeText:
      "This section gathers articles that explain how identity, content, websites, SEO, GEO, and real digital presence work together. The goal is clarity and usefulness, not volume.",
    filtersLabel: "Categories",
    allLabel: "All articles",
    articleCta: "Read the article",
    readTimeLabel: "min read",
    authorLabel: "author",
    zeroPostsLabel: "This category is being prepared",
    emptyTitle: "No articles are published in this category yet.",
    emptyText: "Choose another category or return to all articles.",
    relatedArticlesTitle: "Related articles",
    relatedLinksTitle: "Internal links",
    articleFooterLabel: "next step",
    caseStudyDraftNote: "case studies are being prepared as a separate editorial layer and are not public until final content exists",
  },
} as const;

function createScaffoldPost({
  slug,
  category,
  title,
  excerpt,
  intro,
  metaDescription,
  tags,
  relatedPosts = [],
  relatedLinks = [],
  ctaTitle,
  ctaText,
  ctaPrimaryLabel = "Изпрати проектен контекст",
  ctaPrimaryHref = "/contact",
  ctaSecondaryLabel = "Разгледай услугите",
  ctaSecondaryHref = "/services",
  featured = false,
  draft = false,
}: {
  slug: string;
  category: BlogCategoryKey;
  title: string;
  excerpt: string;
  intro: string;
  metaDescription: string;
  tags: string[];
  relatedPosts?: string[];
  relatedLinks?: BlogLink[];
  ctaTitle: string;
  ctaText: string;
  ctaPrimaryLabel?: string;
  ctaPrimaryHref?: string;
  ctaSecondaryLabel?: string;
  ctaSecondaryHref?: string;
  featured?: boolean;
  draft?: boolean;
}): BlogPost {
  return {
    slug,
    category,
    datePublished: BLOG_DATE,
    dateModified: BLOG_DATE,
    readingTime: 5,
    title,
    excerpt,
    intro,
    metaTitle: title,
    metaDescription,
    seoTitle: title,
    seoDescription: metaDescription,
    author: BLOG_AUTHOR,
    tags,
    keywords: tags,
    language: BLOG_LANGUAGE,
    featured,
    draft,
    relatedPosts,
    sections: [
      {
        title: "Контекст",
        paragraphs: [
          intro,
          "Темата се разглежда през практическата работа на d . media: как една идея се превежда в идентичност, съдържание, сайт, социална среда или рекламна комуникация без излишен шум.",
        ],
      },
      {
        title: "Основният проблем",
        paragraphs: [
          "Когато липсва ясна рамка, отделните решения започват да се натрупват без обща логика. Това води до фрагментирано присъствие, слаба четимост и по-трудно изграждане на доверие.",
          "Затова разглеждаме всяка тема като част от по-голяма система, а не като изолирана задача.",
        ],
      },
      {
        title: "Как подхождаме в d . media",
        paragraphs: [
          "Подхождаме към темата системно: първо подреждаме контекста, после решенията и чак след това формата на изпълнение. Така избягваме декоративни или случайни действия без реален ефект.",
          "Това мислене се превежда в идентичност, съдържание, сайт, реклама или SEO/GEO основа според конкретната задача и реалната среда на бранда.",
        ],
      },
      {
        title: "Практически извод",
        paragraphs: [
          "Практическата стойност идва от яснотата: какво трябва да се промени, защо има значение и как следващата стъпка може да бъде взета без хаотични импровизации.",
          "Целта не е обем, а смисъл: текстът трябва да бъде достатъчно конкретен, за да подкрепя тематичен авторитет, готовност за AI системи и реална употреба.",
        ],
      },
      {
        title: "Какво означава това за бизнеса",
        paragraphs: [
          "Темата има практическа стойност само ако води до по-ясно решение: по-добра идентичност, по-последователно съдържание, по-добър сайт, по-ясна реклама или по-силна видимост.",
          "Когато системата е подредена, бизнесът получава по-малко вътрешно триене и по-стабилна публична комуникация.",
        ],
      },
      {
        title: "Заключение",
        paragraphs: [
          "Добрата комуникация започва от ред. Когато редът е ясен, дизайнът, съдържанието и технологията могат да работят като една система, а не като отделни решения.",
        ],
      },
    ],
    relatedLinks,
    ctaTitle,
    ctaText,
    ctaPrimaryLabel,
    ctaPrimaryHref,
    ctaSecondaryLabel,
    ctaSecondaryHref,
  };
}

const publishedBgPosts: readonly BlogPost[] = [
  {
    slug: "zashto-sazdadohme-d-media",
    category: "brand-identity",
    datePublished: BLOG_DATE,
    dateModified: BLOG_DATE,
    readingTime: 6,
    title: "Посоката на d . media",
    excerpt:
      "Как d . media свързва идентичност, съдържание, социални медии, дизайн, реклама и уеб в последователно дигитално присъствие.",
    intro:
      "В дигиталната среда всеки бизнес оставя следа. Въпросът не е дали присъства онлайн, а как изглежда и комуникира. d . media свързва основните елементи на това присъствие в последователна система.",
    metaTitle: "Посоката на d . media",
    metaDescription:
      "Как d . media свързва идентичност, съдържание, социални медии, дизайн, реклама и уеб в последователно дигитално присъствие.",
    seoTitle: "Посоката на d . media",
    seoDescription:
      "Как идентичност, съдържание, социални медии, дизайн, реклама и уеб се свързват в последователно дигитално присъствие.",
    author: BLOG_AUTHOR,
    tags: [
      "d . media",
      "бранд идентичност",
      "дигитално присъствие",
      "социални медии",
      "съдържание",
      "графичен дизайн",
      "реклама",
      "позициониране",
    ],
    keywords: [
      "d . media",
      "бранд идентичност",
      "дигитално присъствие",
      "социални медии",
      "съдържание",
      "графичен дизайн",
      "реклама",
      "позициониране",
    ],
    language: BLOG_LANGUAGE,
    featured: true,
    draft: false,
    relatedPosts: [
      "kak-izgradihme-vizualnata-identichnost-na-d-media",
      "brand-identichnost-sreshtu-logo",
      "kak-se-izgrazhda-posledovatelno-digitalno-prisastvie",
    ],
    sections: [
      {
        title: "Какво обединява d . media",
        paragraphs: [
          "d . media свързва идентичност, последователна комуникация, съдържание и внимание към приложението им в различни канали.",
          "В последните години наблюдаваме една повтаряща се тенденция. Много компании инвестират в отделни елементи от своето присъствие, без те да работят като едно цяло.",
        ],
      },
      {
        title: "Какъв проблем решава това",
        paragraphs: [
          "Създава се лого без стратегия. Изгражда се сайт без ясна идентичност. Публикува се съдържание без последователност. Управляват се социални мрежи без ясна посока.",
          "Така се очертава нуждата от последователно присъствие, при което различните канали и материали следват обща посока.",
        ],
        bullets: [
          "Бранд идентичност",
          "Създаване на съдържание",
          "Управление на социални медии",
          "Графичен дизайн",
          "Реклама",
        ],
      },
      {
        title: "Как работим",
        paragraphs: [
          "Нашата цел не е просто да създаваме отделни визуални материали или публикации. Работим в посока изграждане на цялостно дигитално присъствие, в което всички елементи говорят на един и същ език.",
          "Вярваме, че успешният бранд не се определя единствено от това как изглежда. Той се определя от начина, по който комуникира, от последователността на посланията си и от доверието, което изгражда с времето.",
          "Затова подхождаме към всеки проект с ясна структура и дългосрочна перспектива.",
        ],
      },
      {
        title: "Принципите зад d . media",
        paragraphs: [
          "В основата на d . media стоят няколко принципа. Първо, качеството е по-важно от количеството. Предпочитаме по-малко, но по-добре изпълнени решения.",
          "Второ, дизайнът трябва да има функция. Красивата визия сама по себе си не е достатъчна, ако не решава конкретен комуникационен проблем.",
          "Трето, последователността създава доверие. Всеки елемент от едно присъствие трябва да бъде част от по-голяма система.",
          "Четвърто, технологиите са инструмент, а не цел. Използваме съвременни решения, но винаги поставяме нуждите на проекта пред самата технология.",
        ],
      },
      {
        title: "Накъде продължава тази посока",
        paragraphs: [
          "Днес d . media продължава да се развива с една основна цел – да помага на бизнеси, организации и професионалисти да изграждат по-силно, по-разпознаваемо и по-последователно дигитално присъствие.",
          "Защото в свят, в който вниманието е ограничен ресурс, ясната идентичност и добрата комуникация вече не са предимство. Те са необходимост.",
        ],
      },
    ],
    relatedLinks: [
      { href: "/services", label: "Разгледай услугите" },
      { href: "/about", label: "Виж контекста зад бранда" },
      { href: "/projects/d-media", label: "Прегледай казуса на d . media" },
    ],
    ctaTitle: "Ако присъствието трябва да работи като система, започни оттук.",
    ctaText:
      "Изпрати кратък контекст за бизнеса, нуждите и средата, в която брандът трябва да работи. Оттам подреждаме правилната следваща стъпка.",
    ctaPrimaryLabel: "Изпрати проектен контекст",
    ctaPrimaryHref: "/contact",
    ctaSecondaryLabel: "Разгледай услугите",
    ctaSecondaryHref: "/services",
  },
  createScaffoldPost({
    slug: "kak-izgradihme-vizualnata-identichnost-na-d-media",
    category: "brand-identity",
    title: "Как изградихме визуалната идентичност на d . media",
    excerpt:
      "Логиката зад знака, логотипа, типографията и минималната монохромна система на d . media.",
    intro:
      "Идентичността на d . media беше изградена така, че да работи еднакво стабилно в сайт, документи, публикации и визуализации при споделяне, без декоративен шум.",
    metaDescription:
      "Как изградихме визуалната идентичност на d . media: логика на знака, логотип, типография, монохромна система и приложение.",
    tags: ["визуална идентичност", "лого", "логотип", "типография", "d . media"],
    relatedPosts: ["zashto-sazdadohme-d-media", "brand-identichnost-sreshtu-logo"],
    relatedLinks: [
      { href: "/services", label: "Виж услугата за бранд идентичност" },
      { href: "/projects/d-media", label: "Разгледай проекта d . media" },
      { href: "/contact", label: "Изпрати запитване за идентичност" },
    ],
    ctaTitle: "Идентичността има стойност, когато издържа извън презентацията.",
    ctaText:
      "Ако проектът изисква не просто красиво лого, а работеща система за реална среда, изпрати контекст и подреждаме обхвата.",
    featured: true,
  }),
  createScaffoldPost({
    slug: "kakvo-kupuva-klientat-kogato-plashta-za-dizain",
    category: "graphic-design",
    title: "Какво всъщност купува клиентът, когато плаща за дизайн",
    excerpt:
      "Защо дизайнът не е само файл или визия, а решение, което намалява хаоса и повишава яснотата.",
    intro:
      "Когато клиентът плаща за дизайн, той рядко плаща само за картинка. Плаща за решение: по-ясно присъствие, по-добро разпознаване и по-лесно приложение.",
    metaDescription:
      "Каква е реалната стойност зад дизайн услугата: яснота, ред, работеща система и по-малко хаос в комуникацията.",
    tags: ["графичен дизайн", "стойност на дизайна", "бренд система"],
    relatedPosts: ["zashto-krasiviyat-dizain-ne-prodava-sam", "brand-identichnost-sreshtu-logo"],
    relatedLinks: [
      { href: "/services", label: "Разгледай услугите за дизайн и реклама" },
      { href: "/about", label: "Виж как работим със система" },
      { href: "/contact", label: "Изпрати проектен контекст" },
    ],
    ctaTitle: "Стойността на дизайна е в това какво прави възможно след себе си.",
    ctaText:
      "Ако проектът изисква по-малко хаос и по-ясно приложение, изпрати контекст и ще подредим точния обхват според задачата.",
  }),
  createScaffoldPost({
    slug: "brand-identichnost-sreshtu-logo",
    category: "brand-identity",
    title: "Бранд идентичност срещу лого: каква е разликата",
    excerpt:
      "Къде свършва знакът и къде започва системата, която носи характер, последователност и доверие.",
    intro:
      "Логото е важен елемент, но не е равнозначно на бранд идентичност. Идентичността включва начина, по който брандът изглежда, говори и се прилага във всяка среда.",
    metaDescription:
      "Разликата между лого и бранд идентичност и защо системата има по-голяма стойност от единичния знак.",
    tags: ["бранд идентичност", "лого", "логотип", "визуална система"],
    relatedPosts: [
      "zashto-sazdadohme-d-media",
      "kak-izgradihme-vizualnata-identichnost-na-d-media",
      "kakvo-kupuva-klientat-kogato-plashta-za-dizain",
    ],
    relatedLinks: [
      { href: "/services", label: "Виж обхвата за бранд идентичност" },
      { href: "/projects", label: "Разгледай реални проекти" },
      { href: "/contact", label: "Изпрати контекст за нов бранд" },
    ],
    ctaTitle: "Логото е начало. Идентичността е системата, която остава.",
    ctaText:
      "Ако проектът изисква повече от единичен знак, изпрати контекст и ще подредим правилния обхват за идентичност и приложение.",
  }),
  createScaffoldPost({
    slug: "zashto-krasiviyat-dizain-ne-prodava-sam",
    category: "graphic-design",
    title: "Защо красивият дизайн не продава сам по себе си",
    excerpt:
      "Кога визуалното качество помага и кога остава декоративно, ако липсват контекст, предложение и последователност.",
    intro:
      "Красивият дизайн може да привлече внимание, но не може сам да компенсира неясно предложение, слаб контекст или липса на доверие.",
    metaDescription:
      "Защо добрият визуален стил не е достатъчен без ясна оферта, последователност и работеща комуникационна логика.",
    tags: ["графичен дизайн", "реклама", "комуникация", "оферта"],
    relatedPosts: [
      "kakvo-kupuva-klientat-kogato-plashta-za-dizain",
      "10-greshki-v-socialnite-mrezhi",
    ],
    relatedLinks: [
      { href: "/services", label: "Виж услугите за дизайн и реклама" },
      { href: "/contact", label: "Изпрати проектен контекст" },
    ],
    ctaTitle: "Визията работи най-добре, когато има ясна роля в комуникацията.",
    ctaText:
      "Ако проектът има нужда не просто от красив материал, а от по-силен резултат, изпрати контекст и ще подредим правилния обхват.",
  }),
  createScaffoldPost({
    slug: "kak-postignahme-100-100-v-google-pagespeed-insights",
    category: "web-presence",
    title: "Архитектурата зад PageSpeed резултатите на d-media.org",
    excerpt:
      "Архитектурните решения зад документираните PageSpeed стойности на d-media.org и ограниченията на тези данни.",
    intro:
      "По-ранната документация записва PageSpeed стойности за d-media.org. Те не са текущо измерване; статията разглежда архитектурните решения и ограниченията на наличните данни.",
    metaDescription:
      "Архитектурните решения зад по-ранните документирани PageSpeed стойности на d-media.org и уточнение защо те не са текущо измерване.",
    tags: ["PageSpeed", "Astro", "Cloudflare Pages", "скорост", "уеб сайт"],
    relatedPosts: [
      "zashto-100-100-v-pagespeed-ne-garantira-dobar-sait",
      "vercel-ili-cloudflare-pages-realno-sravnenie",
      "kakvo-e-geo-i-zashto-shte-promeni-seo",
    ],
    relatedLinks: [
      { href: "/services/web-design-development", label: "Виж уеб обхвата" },
      { href: "/projects/d-media", label: "Прегледай уеб казуса" },
      { href: "/contact", label: "Изпрати контекст за сайт" },
    ],
    ctaTitle: "Ако сайтът трябва да бъде бърз и стабилен, архитектурата идва първа.",
    ctaText:
      "Изпрати кратък контекст за нужния тип сайт, съдържанието и средата, в която ще се използва. Оттам подреждаме правилния технически обхват.",
    featured: true,
  }),
  createScaffoldPost({
    slug: "zashto-100-100-v-pagespeed-ne-garantira-dobar-sait",
    category: "web-presence",
    title: "Защо 100/100 в PageSpeed не гарантира добър сайт",
    excerpt:
      "Къде свършва метриката и къде започват структурата, съдържанието, доверието и реалната употреба.",
    intro:
      "Перфектният резултат в PageSpeed е полезен сигнал, но не е достатъчно условие за добър сайт. Сайтът трябва да бъде ясен, използваем и да води до правилната следваща стъпка.",
    metaDescription:
      "Защо PageSpeed резултатът сам по себе си не прави сайта добър и какво още определя реалната му стойност.",
    tags: ["PageSpeed", "UX", "уеб присъствие", "сайт", "структура"],
    relatedPosts: [
      "kak-postignahme-100-100-v-google-pagespeed-insights",
      "vercel-ili-cloudflare-pages-realno-sravnenie",
    ],
    relatedLinks: [
      { href: "/services/web-design-development", label: "Уеб дизайн и разработка" },
      { href: "/contact", label: "Изпрати контекст за сайт" },
    ],
    ctaTitle: "Силният сайт не се измерва само с една метрика.",
    ctaText:
      "Ако искаш сайтът да бъде едновременно бърз, ясен и полезен, изпрати контекст и ще подредим правилната основа.",
  }),
  createScaffoldPost({
    slug: "vercel-ili-cloudflare-pages-realno-sravnenie",
    category: "web-presence",
    title: "Vercel или Cloudflare Pages – реално сравнение",
    excerpt:
      "Кога едната платформа е по-подходяща от другата и защо изборът зависи от архитектурата, а не от популярността.",
    intro:
      "Сравнението между Vercel и Cloudflare Pages има смисъл само в контекста на конкретен проект, тип сайт и нужната инфраструктурна логика.",
    metaDescription:
      "Практическо сравнение между Vercel и Cloudflare Pages според тип сайт, контрол върху инфраструктурата, скорост и дългосрочна поддръжка.",
    tags: ["Vercel", "Cloudflare Pages", "хостинг", "уеб инфраструктура", "сравнение"],
    relatedPosts: [
      "kak-postignahme-100-100-v-google-pagespeed-insights",
      "zashto-100-100-v-pagespeed-ne-garantira-dobar-sait",
    ],
    relatedLinks: [
      { href: "/services/web-design-development", label: "Уеб дизайн и разработка" },
      { href: "/projects/d-media", label: "Виж как беше приложено в d . media" },
      { href: "/contact", label: "Изпрати контекст за проект" },
    ],
    ctaTitle: "Платформата има значение само когато е правилната за конкретния обхват.",
    ctaText:
      "Ако проектът изисква правилен технологичен избор, изпрати контекст и ще подредим решение според реалната употреба, не според модата.",
  }),
  createScaffoldPost({
    slug: "kakvo-e-geo-i-zashto-shte-promeni-seo",
    category: "seo-geo",
    title: "Какво е GEO и защо ще промени SEO",
    excerpt:
      "Защо оптимизацията за генеративни системи и съдържание, подготвено за AI системи, вече е част от видимостта на бранда, а не отделна футуристична тема.",
    intro:
      "SEO вече не е само борба за синята връзка в търсачката. Системите, които генерират отговори, започват да избират, цитират и преразказват източници.",
    metaDescription:
      "Практичен поглед към GEO и защо ясната структура, съдържание на статиите и сигнали, четими от AI системи, вече влияят на видимостта отвъд класическото SEO.",
    tags: ["GEO", "SEO", "търсене с AI", "структурирани данни", "архитектура на съдържанието"],
    relatedPosts: [
      "kakvo-e-llms-txt-i-nuzhen-li-e-za-vashiya-sait",
      "kakvo-vizhda-chatgpt-kogato-analizira-vashiya-biznes",
      "nai-chestite-seo-greshki-na-malkite-firmeni-saitove",
    ],
    relatedLinks: [
      { href: "/services/web-design-development", label: "Виж уеб и SEO/GEO обхвата" },
      { href: "/services", label: "Разгледай услугите" },
      { href: "/contact", label: "Изпрати контекст за видимост и сайт" },
    ],
    ctaTitle: "Видимостта вече зависи и от това дали системите могат да те разберат и цитират.",
    ctaText:
      "Ако сайтът трябва да бъде готов както за търсене, така и за търсене с AI, изпрати кратък контекст и ще подредим правилната основа.",
    featured: true,
  }),
  createScaffoldPost({
    slug: "kakvo-e-llms-txt-i-nuzhen-li-e-za-vashiya-sait",
    category: "seo-geo",
    title: "Какво е llms.txt и нужен ли е за вашия сайт",
    excerpt:
      "Къде llms.txt може да помогне на AI системите и защо не трябва да се представя като официален фактор за класиране в търсачките.",
    intro:
      "llms.txt е предложен стандарт за по-лесна ориентация на LLM системи в един сайт. Разумно е да се внедри, но не трябва да се продава като гаранция за класиране.",
    metaDescription:
      "Какво е llms.txt, кога е полезен и защо трябва да се разглежда като средство за ориентация на LLM системи, а не като официален фактор за класиране в търсачките.",
    tags: ["llms.txt", "SEO", "GEO", "търсене с AI", "структурирано съдържание"],
    relatedPosts: [
      "kakvo-e-geo-i-zashto-shte-promeni-seo",
      "kakvo-vizhda-chatgpt-kogato-analizira-vashiya-biznes",
      "nai-chestite-seo-greshki-na-malkite-firmeni-saitove",
    ],
    relatedLinks: [
      { href: "/llms.txt", label: "Виж текущия llms.txt" },
      { href: "/services/web-design-development", label: "Уеб и дигитално присъствие" },
      { href: "/contact", label: "Изпрати контекст за сайт" },
    ],
    ctaTitle: "llms.txt е полезен помощен слой, не магическа SEO настройка.",
    ctaText:
      "Ако сайтът трябва да бъде по-ясен за AI системи и търсещи агенти, изпрати контекст и ще подредим правилната техническа основа.",
  }),
  createScaffoldPost({
    slug: "kakvo-vizhda-chatgpt-kogato-analizira-vashiya-biznes",
    category: "seo-geo",
    title: "Какво вижда ChatGPT, когато анализира вашия бизнес",
    excerpt:
      "Каква картина изграждат AI системите за бранда според сайта, структурата, съдържанието и публичните сигнали.",
    intro:
      "Когато AI система анализира един бизнес, тя не вижда само началната страница. Вижда структура, повторяеми сигнали, ясни услуги, статии, вътрешни връзки и публична последователност.",
    metaDescription:
      "Как AI системи като ChatGPT извличат картина за бизнеса от сайта, структурата, съдържанието и публичните сигнали на бранда.",
    tags: ["ChatGPT", "AI analysis", "GEO", "brand signals", "site structure"],
    relatedPosts: [
      "kakvo-e-geo-i-zashto-shte-promeni-seo",
      "kakvo-e-llms-txt-i-nuzhen-li-e-za-vashiya-sait",
      "kak-se-izgrazhda-posledovatelno-digitalno-prisastvie",
    ],
    relatedLinks: [
      { href: "/about", label: "Виж как е позициониран брандът" },
      { href: "/services", label: "Разгледай услугите" },
      { href: "/contact", label: "Изпрати контекст за анализ" },
    ],
    ctaTitle: "AI системите разчитат сигнали. Въпросът е дали сайтът подава правилните.",
    ctaText:
      "Ако искаш бизнесът да бъде по-ясен за търсене с AI и генеративни системи, изпрати контекст и ще подредим архитектурата и съдържанието.",
  }),
  createScaffoldPost({
    slug: "nai-chestite-seo-greshki-na-malkite-firmeni-saitove",
    category: "seo-geo",
    title: "Най-честите SEO грешки на малките фирмени сайтове",
    excerpt:
      "Къде най-често се губят видимост, доверие и тематичен авторитет при малките корпоративни сайтове.",
    intro:
      "Повечето малки фирмени сайтове не страдат от липса на plugin, а от липса на структура, ясни страници с услуги и последователно съдържание.",
    metaDescription:
      "Най-честите SEO грешки на малките фирмени сайтове и как ясната структура, съдържателен слой и техническа основа ги решават.",
    tags: ["SEO", "малки фирмени сайтове", "техническо SEO", "архитектура на съдържанието"],
    relatedPosts: [
      "kakvo-e-geo-i-zashto-shte-promeni-seo",
      "kakvo-e-llms-txt-i-nuzhen-li-e-za-vashiya-sait",
      "kak-postignahme-100-100-v-google-pagespeed-insights",
    ],
    relatedLinks: [
      { href: "/services/web-design-development", label: "Уеб дизайн и разработка" },
      { href: "/contact", label: "Изпрати контекст за сайт" },
    ],
    ctaTitle: "По-доброто SEO започва от по-добра структура, не от шумни обещания.",
    ctaText:
      "Ако сайтът има нужда от по-ясна основа за видимост, изпрати контекст и ще подредим правилния обхват.",
  }),
  createScaffoldPost({
    slug: "10-greshki-v-socialnite-mrezhi",
    category: "social-media",
    title: "10 грешки в социалните мрежи, които виждаме всеки ден",
    excerpt:
      "Най-честите пропуски в съдържанието и визуалната линия на брандове, които иначе имат потенциал да изглеждат далеч по-силно.",
    intro:
      "Проблемът в социалните мрежи рядко е липсата на активност. По-често е липсата на подредба, последователност и ясна роля на самото съдържание.",
    metaDescription:
      "Практичен списък с най-честите грешки в социалните медии: липса на система, случаен дизайн, неясен тон и съдържание без роля.",
    tags: ["социални медии", "стратегия за съдържание", "визуална линия", "бранд комуникация"],
    relatedPosts: [
      "zashto-publikuvaneto-vseki-den-ne-e-strategiya",
      "kak-se-izgrazhda-posledovatelno-digitalno-prisastvie",
    ],
    relatedLinks: [
      { href: "/services", label: "Виж обхвата за съдържание и социални медии" },
      { href: "/contact", label: "Изпрати запитване за съдържателен обхват" },
      { href: "/about", label: "Виж как работим със система" },
    ],
    ctaTitle: "Социалните мрежи работят по-добре, когато са част от по-голяма логика.",
    ctaText:
      "Ако съдържанието трябва да стане по-последователно, по-ясно и по-лесно за поддръжка, изпрати контекст и ще подредим работен обхват.",
    featured: true,
  }),
  createScaffoldPost({
    slug: "zashto-publikuvaneto-vseki-den-ne-e-strategiya",
    category: "social-media",
    title: "Защо публикуването всеки ден не е стратегия",
    excerpt:
      "Редовността сама по себе си не решава проблема, ако няма ясни формати, посока и роля на съдържанието.",
    intro:
      "Честото публикуване може да създаде активност, но не създава автоматично стратегия. Стратегия има тогава, когато съдържанието следва ясна логика и бизнес цел.",
    metaDescription:
      "Защо честотата на публикациите не е равна на стратегия и какво реално прави присъствието чрез съдържание последователно.",
    tags: ["социални медии", "планиране на съдържание", "стратегия", "публикуване"],
    relatedPosts: [
      "10-greshki-v-socialnite-mrezhi",
      "kak-se-izgrazhda-posledovatelno-digitalno-prisastvie",
    ],
    relatedLinks: [
      { href: "/services", label: "Съдържание и социални медии" },
      { href: "/contact", label: "Изпрати контекст за съдържание" },
    ],
    ctaTitle: "Редовността има стойност само когато следва ясна система.",
    ctaText:
      "Ако съдържателният обхват е активен, но неструктуриран, изпрати контекст и ще подредим по-устойчива посока.",
  }),
  createScaffoldPost({
    slug: "kak-se-izgrazhda-posledovatelno-digitalno-prisastvie",
    category: "content",
    title: "Как се изгражда последователно дигитално присъствие",
    excerpt:
      "Как идентичност, съдържание, сайт, социални мрежи и реклама започват да работят в една посока, вместо да се разпадат по канали.",
    intro:
      "Последователното дигитално присъствие не се появява от един канал. То се изгражда, когато сайт, съдържание, социални мрежи и рекламни формати следват обща логика.",
    metaDescription:
      "Как се изгражда последователно дигитално присъствие чрез обща логика между идентичност, съдържание, сайт, социални мрежи и реклама.",
    tags: ["дигитално присъствие", "съдържание", "социални медии", "последователност на бранда"],
    relatedPosts: [
      "zashto-sazdadohme-d-media",
      "10-greshki-v-socialnite-mrezhi",
    ],
    relatedLinks: [
      { href: "/services", label: "Разгледай услугите" },
      { href: "/about", label: "Виж позиционирането на d . media" },
      { href: "/contact", label: "Изпрати проектен контекст" },
    ],
    ctaTitle: "Силното присъствие идва от системата между каналите, не от единичен формат.",
    ctaText:
      "Ако брандът трябва да изглежда и да звучи по-последователно, изпрати контекст и ще подредим работеща основа.",
    featured: true,
  }),
  createScaffoldPost({
    slug: "kak-ai-promenya-grafichniya-dizain-prez-2026",
    category: "ai-design",
    title: "Как AI променя графичния дизайн през 2026",
    excerpt:
      "Къде AI вече е реален инструмент в дизайна и къде все още не може да замени вкуса, посоката и системното мислене.",
    intro:
      "AI промени скоростта, с която могат да се генерират идеи, груби варианти и помощни ресурси. Това не премахва нуждата от творческа посока и системно мислене.",
    metaDescription:
      "Реалният ефект на AI върху графичния дизайн през 2026: по-бързи итерации, нови рискове и по-висока стойност на системното мислене.",
    tags: ["AI дизайн", "графичен дизайн", "генеративни инструменти", "2026"],
    relatedPosts: [
      "kade-ai-pomaga-na-dizainera-i-kade-ne-mozhe-da-go-zameni",
      "avtorski-prava-ai-i-dizain",
    ],
    relatedLinks: [
      { href: "/services", label: "Виж услугите за дизайн и идентичност" },
      { href: "/projects", label: "Разгледай реални визуални системи" },
      { href: "/contact", label: "Изпрати контекст за проект" },
    ],
    ctaTitle: "AI ускорява процеса. Посоката още изисква вкус и контрол.",
    ctaText:
      "Ако проектът изисква система, а не просто генерирани варианти, изпрати контекст и ще подредим правилния творчески и производствен обхват.",
  }),
  createScaffoldPost({
    slug: "kade-ai-pomaga-na-dizainera-i-kade-ne-mozhe-da-go-zameni",
    category: "ai-design",
    title: "Къде AI помага на дизайнера и къде не може да го замени",
    excerpt:
      "Кои части от процеса се ускоряват от AI и къде човешката редакция, вкус и системно мислене остават незаменими.",
    intro:
      "AI е силен в търсенето на варианти и помощни посоки, но не замества контекста, редакцията и способността да се изгради устойчива система.",
    metaDescription:
      "Къде AI реално помага на дизайнера и къде човешкият art direction и системното мислене остават решаващи.",
    tags: ["AI", "дизайнер", "art direction", "системно мислене"],
    relatedPosts: [
      "kak-ai-promenya-grafichniya-dizain-prez-2026",
      "avtorski-prava-ai-i-dizain",
    ],
    relatedLinks: [
      { href: "/services", label: "Графичен дизайн" },
      { href: "/contact", label: "Изпрати контекст за проект" },
    ],
    ctaTitle: "Инструментът има стойност само когато е воден от ясна посока.",
    ctaText:
      "Ако проектът изисква контролирана работа с AI, дизайн и съдържание, изпрати контекст и ще подредим правилния процес.",
  }),
  createScaffoldPost({
    slug: "avtorski-prava-ai-i-dizain",
    category: "ai-design",
    title: "Авторски права, AI и дизайн: какво трябва да знаят бизнесите",
    excerpt:
      "Къде стоят реалните рискове при използване на AI генерирани визуални решения и как бизнесът да подхожда по-отговорно.",
    intro:
      "AI генерираните визуални решения създават нови възможности, но и нови въпроси за авторство, произход и допустима употреба.",
    metaDescription:
      "Какво трябва да знаят бизнесите за авторските права, AI и дизайна: произход, риск, употреба и отговорно прилагане.",
    tags: ["авторски права", "AI", "дизайн", "бизнес риск"],
    relatedPosts: [
      "kak-ai-promenya-grafichniya-dizain-prez-2026",
      "kade-ai-pomaga-na-dizainera-i-kade-ne-mozhe-da-go-zameni",
    ],
    relatedLinks: [
      { href: "/services", label: "Графичен дизайн и идентичност" },
      { href: "/contact", label: "Изпрати въпрос за проект" },
    ],
    ctaTitle: "AI е полезен инструмент, когато рискът и произходът са ясно разбрани.",
    ctaText:
      "Ако проектът включва дизайн с AI инструменти, изпрати контекст и ще подредим по-сигурен и по-ясен работен модел.",
  }),
  {
    ...createScaffoldPost({
      slug: "zashto-prekaleno-shodniyat-domain-e-problem",
      category: "web-presence",
      title: "Защо прекалено сходният домейн обърква потребителя",
      excerpt:
        "Как изборът на домейн, който прилича на няколко вече съществуващи адреса, отслабва запомнянето, доверието и директния достъп до бранда.",
      intro:
        "Свободният домейн не е непременно добър домейн. Когато името се различава минимално от няколко вече използвани адреса, потребителят трябва да помни правописна подробност вместо самия бранд.",
      metaDescription:
        "Защо прекалено сходните домейни объркват потребителите, разпиляват директния трафик и отслабват разпознаваемостта на бранда.",
      tags: ["домейн", "бранд", "уеб присъствие", "разпознаваемост", "UX"],
      relatedPosts: [
        "brand-identichnost-sreshtu-logo",
        "kak-se-izgrazhda-posledovatelno-digitalno-prisastvie",
        "nai-chestite-seo-greshki-na-malkite-firmeni-saitove",
      ],
      relatedLinks: [
        { href: "/services/web-design", label: "Виж услугата за уеб дизайн" },
        { href: "/services/brand-identity", label: "Виж услугата за бранд идентичност" },
        { href: "/contact", label: "Изпрати контекст за уеб проект" },
      ],
      ctaTitle: "Добрият домейн намалява нуждата от обяснение.",
      ctaText:
        "Ако подготвяш нов бранд или сайт, можем да проверим дали името, домейнът и дигиталната архитектура работят като една ясна система.",
      ctaPrimaryLabel: "Изпрати контекст за уеб проект",
      ctaSecondaryLabel: "Разгледай уеб услугите",
      ctaSecondaryHref: "/services/web-design",
    }),
    datePublished: "2026-06-13",
    dateModified: "2026-06-13",
  },
] as const;

const draftCaseStudies: readonly BlogPost[] = [
  createScaffoldPost({
    slug: "kak-dostignahme-100-100-100-100-na-d-media-org",
    category: "case-studies",
    title: "Документираните Lighthouse резултати на d-media.org",
    excerpt: "Казус за архитектурата и запазените по-ранни Lighthouse стойности на d-media.org, без да ги представя като текущи измервания.",
    intro: "Този казус описва архитектурата на d-media.org и по-ранните документирани Lighthouse стойности. Датиран първичен отчет не е наличен, затова числата не се представят като текущ резултат.",
    metaDescription: "Казус за скоростта, достъпността, добрите практики и SEO слоя на d-media.org без недоказани метрики.",
    tags: ["казус", "скорост", "SEO", "d-media.org"],
    draft: false,
    relatedPosts: ["kak-postignahme-100-100-v-google-pagespeed-insights"],
    ctaTitle: "Казусите за производителност трябва да стъпват върху реални измервания.",
    ctaText: "Тук разграничаваме документираните по-ранни стойности от текущо измерване и описваме решенията в архитектурата на сайта.",
  }),
  createScaffoldPost({
    slug: "patyat-do-d-media",
    category: "case-studies",
    title: "Пътят до d . media",
    excerpt: "Казус за преминаването към по-събрана студийна система за идентичност, съдържание, уеб и реклама.",
    intro: "Този казус проследява развитието на бранда през последователни редакции на посока, език и визуална система. Историята е подредена около решенията, които обясняват сегашната система, а не около всеки архивен вариант.",
    metaDescription: "Казус за развитието на d . media и преминаването към по-системно студийно позициониране.",
    tags: ["казус", "развитие на бранда", "d . media"],
    draft: false,
    relatedPosts: ["zashto-sazdadohme-d-media"],
    ctaTitle: "Историята на бранда трябва да подкрепя настоящата му яснота.",
    ctaText: "Тук са оставени решенията и контекстът, които обясняват настоящото позициониране без архивен шум.",
  }),
  createScaffoldPost({
    slug: "izgrazhdane-na-mnogoezichen-sait-s-astro",
    category: "case-studies",
    title: "Изграждане на многоезичен сайт с Astro",
    excerpt: "Казус за многоезична архитектура, локализирани URL-и, canonical логика и статично публикуване с Astro.",
    intro: "Този казус разглежда как многоезичният слой може да бъде подреден без фалшиви преводи, счупени alternate връзки или излишна сложност в съдържанието.",
    metaDescription: "Казус за многоезична Astro архитектура, локализирани route-и, canonical и hreflang логика.",
    tags: ["казус", "Astro", "multilingual"],
    draft: true,
    relatedPosts: ["vercel-ili-cloudflare-pages-realno-sravnenie"],
    ctaTitle: "Многоезичният сайт изисква съдържателна дисциплина, не само превод.",
    ctaText: "Черновата версия е готова като рамка за техническа и редакционна проверка преди публично публикуване.",
  }),
  createScaffoldPost({
    slug: "zashto-izbrahme-minimalistichna-identichnost",
    category: "case-studies",
    title: "Защо избрахме минималистична идентичност",
    excerpt: "Казус за минималистичната визуална система на d . media и защо редът има по-голяма тежест от декоративния шум.",
    intro: "Този казус разглежда минимализма като функционално решение: по-малко елементи, повече контрол върху пропорцията, типографията, ритъма и приложението.",
    metaDescription: "Казус за минималистичната визуална идентичност на d . media и ролята на типографията, въздуха и системата.",
    tags: ["казус", "минимализъм", "визуална идентичност"],
    draft: false,
    relatedPosts: ["kak-izgradihme-vizualnata-identichnost-na-d-media"],
    ctaTitle: "Минимализмът работи само когато е подкрепен от система.",
    ctaText: "Текстът свързва визуалния избор с конкретните правила за приложение и проверка.",
  }),
  createScaffoldPost({
    slug: "ot-ideya-do-zavarshen-brand-realen-proces",
    category: "case-studies",
    title: "От идея до завършен бранд: реален процес",
    excerpt: "Казус за процеса от контекст и позициониране до визуална система, съдържание и реално приложение.",
    intro: "Този казус описва как една бранд идея се превежда в система: контекст, обхват, идентичност, съдържание, уеб среда и приложения.",
    metaDescription: "Казус за процеса от идея до завършен бранд без измислени клиенти или недоказани резултати.",
    tags: ["казус", "бранд процес", "идентичност"],
    draft: true,
    relatedPosts: ["zashto-sazdadohme-d-media"],
    ctaTitle: "Процесът има стойност, когато води до приложение.",
    ctaText: "Черновата версия остава непублична, докато примерите и формулировките бъдат проверени спрямо реалния обхват.",
  }),
  createScaffoldPost({
    slug: "analiz-na-realen-redizain",
    category: "case-studies",
    title: "Анализ на реален редизайн",
    excerpt: "Казус за това как анализираме редизайн: какво се запазва, какво се пренарежда и кога промяната има реална стойност.",
    intro: "Този казус не измисля клиент или резултат. Той подрежда методологията за анализ на редизайн през структура, възприятие, употреба и дългосрочна приложимост.",
    metaDescription: "Казус за анализ на редизайн процес без измислени клиенти, резултати или данни.",
    tags: ["казус", "redesign", "analysis"],
    draft: true,
    relatedPosts: ["brand-identichnost-sreshtu-logo"],
    ctaTitle: "Редизайнът трябва да решава проблем, не само да сменя повърхността.",
    ctaText: "Черновата версия остава като методологична рамка до добавяне на реален визуален пример.",
  }),
  createScaffoldPost({
    slug: "kak-podobrihme-skorostta-na-sait-s-nad-80-procenta",
    category: "case-studies",
    title: "Как подобряваме скоростта на сайт",
    excerpt: "Казус за процес на оптимизация без недоказани проценти: диагностика, ресурси, runtime, rendering и проверка след всяка намеса.",
    intro: "Този казус е редактиран като методологична чернова, защото няма публично потвърдени данни за конкретно подобрение с над 80%. Заглавието и текстът избягват недоказани проценти.",
    metaDescription: "Казус за системен процес по подобряване на скоростта на сайт без измислени проценти.",
    tags: ["казус", "performance", "speed optimization"],
    draft: true,
    relatedPosts: ["kak-postignahme-100-100-v-google-pagespeed-insights"],
    ctaTitle: "Performance твърденията трябва да бъдат доказуеми.",
    ctaText: "Черновата версия остава непублична, докато няма проверими baseline и after данни за конкретен проект.",
  }),
  createScaffoldPost({
    slug: "izgrazhdane-na-geo-ready-website-prez-2026",
    category: "case-studies",
    title: "Изграждане на GEO-ready уебсайт през 2026",
    excerpt: "Казус за GEO-ready архитектура: ясно съдържание, structured data, sitemap, llms.txt и вътрешни връзки.",
    intro: "Този казус разглежда GEO-ready подхода като подредена система за хора, търсачки и AI инструменти, без да го представя като гаранция за цитиране или класиране.",
    metaDescription: "Казус за GEO-ready уебсайт през 2026 със съдържателна архитектура, structured data и AI ориентация.",
    tags: ["казус", "GEO", "website", "търсене с AI"],
    draft: true,
    relatedPosts: ["kakvo-e-geo-i-zashto-shte-promeni-seo"],
    ctaTitle: "GEO-ready сайтът започва от яснота, не от обещания.",
    ctaText: "Черновата версия остава непублична, докато примерите бъдат сверени с реалната архитектура и текущите стандарти.",
  }),
] as const;

const postSectionOverrides: Record<string, BlogSection[]> = {
  "zashto-sazdadohme-d-media": [
    {
      title: "Наблюдението, от което тръгнахме",
      paragraphs: [
        "d . media започна от конкретно наблюдение: бизнесите често имат отделни добри материали, но нямат връзка между тях. Логото говори едно, сайтът обяснява друго, социалните публикации тръгват в трета посока, а рекламата трябва да компенсира липсата на общ контекст.",
        "Това не е проблем на един канал. Това е проблем на решенията, които са вземани поотделно и никога не са били подредени като една система.",
      ],
    },
    {
      title: "Какво искахме да променим",
      paragraphs: [
        "Не искахме да създадем поредното място за отделни изпълнения. Искахме работа, при която идентичността определя езика, съдържанието следва позицията, сайтът обяснява услугите, а визуалните и рекламните материали имат ясна роля.",
        "Тази връзка е причината d . media да събира бранд идентичност, съдържание, социални медии, дизайн, уеб и реклама в един разговор, без да твърди, че всеки проект има нужда от всичко.",
      ],
    },
    {
      title: "Как превръщаме идеята в работа",
      paragraphs: [
        "Започваме от контекста на проекта: какво вече съществува, къде се губи яснота и какво трябва да стане по-лесно за потребителя или екипа. След това подреждаме приоритетите и избираме само слоевете, които решават реалния проблем.",
        "Това пази процеса от автоматично производство. Понякога правилното решение е идентичност, понякога е по-добра service page, понякога е съдържателен ред или корекция в сайта.",
      ],
    },
    {
      title: "Как изглежда това в собствения ни бранд",
      paragraphs: [
        "Собственият сайт на d . media е мястото, в което тази логика се проверява ежедневно. Името, типографията, услугите, проектите, статиите и контактният път трябва да водят към една и съща представа за студиото.",
        "Това не означава всички страници да звучат еднакво. Означава всяка да има различна функция, без да противоречи на останалите.",
      ],
    },
    {
      title: "Какво проверяваме преди да наречем системата готова",
      paragraphs: [
        "Проверяваме дали човек разбира какво правим, дали може да намери релевантната услуга, дали примерите подкрепят твърдението и дали следващата стъпка е ясна. Проверяваме и дали визуалната система остава стабилна в реални формати, а не само в една презентация.",
        "Това е смисълът на d . media: не обем от услуги, а подредена връзка между решенията, които стигат до публичната среда.",
      ],
    },
  ],
  "zashto-prekaleno-shodniyat-domain-e-problem": [
    {
      title: "Домейнът е част от бранд системата",
      paragraphs: [
        "Домейнът не е само технически адрес. Той се произнася, изписва, запомня, предава устно и се използва във визитки, реклами, социални профили, документи и търсачки. Затова изборът му е част от идентичността и потребителското преживяване.",
        "Когато адресът е ясен и отличим, човек може да го възстанови по памет. Когато е близък до няколко други домейна, всяко посещение се превръща в проверка на правопис, окончание или форма на думата.",
      ],
    },
    {
      title: "Проблемът не е само в сходното име",
      paragraphs: [
        "Представете си пазар, в който вече съществуват няколко домейна с почти еднакъв корен, различаващи се само по число, членуване, множествено число, тире или домейн разширение. Добавянето на още една минимална вариация не създава автоматично отличимост.",
        "Потребителят може да запомни общата дума, но не и точната версия. Така част от директния трафик отива към друг адрес, препоръките се предават неточно, а рекламата трябва постоянно да компенсира слабата разпознаваемост.",
      ],
    },
    {
      title: "Какво реално се обърква",
      paragraphs: [
        "Объркването се появява в моменти, в които няма активен линк: при устна препоръка, радио или видео реклама, разговор по телефон, запомнена публикация или повторно посещение след време.",
      ],
      bullets: [
        "Посетителят отваря конкурентен или несвързан сайт.",
        "Имейл може да бъде изпратен към грешен домейн.",
        "Брандът губи директен трафик и разчита повече на платени канали.",
        "Търсенето по име показва няколко сходни резултата без ясна визуална разлика.",
        "Препоръките между хората стават по-трудни за предаване точно.",
      ],
    },
    {
      title: "Свободен не означава стратегически подходящ",
      paragraphs: [
        "Честа грешка е изборът да започне и да приключи с въпроса дали конкретният домейн е свободен. Това е техническа проверка, но не и бранд решение.",
        "По-важният въпрос е дали адресът може да бъде разпознат без допълнително уточнение. Ако всеки път трябва да се обяснява коя буква, кое окончание или кое разширение да бъде използвано, домейнът създава постоянно комуникационно триене.",
      ],
    },
    {
      title: "Как оценяваме един домейн",
      paragraphs: [
        "Преди регистрация проверяваме не само наличността, а цялата среда около името. Търсим сходни домейни, компании, търговски марки, социални профили и резултати в търсачките. След това проверяваме как адресът звучи на глас и дали може да бъде изписан правилно след еднократно чуване.",
      ],
      bullets: [
        "Кратък ли е и лесен ли е за произнасяне?",
        "Има ли само един естествен начин за изписване?",
        "Различава ли се ясно от активните домейни в същия сектор?",
        "Работи ли без тирета, обяснения и необичайни съкращения?",
        "Подходящ ли е за професионален имейл и международна употреба?",
        "Може ли да остане валиден, ако бизнесът разшири услугите си?",
      ],
    },
    {
      title: "SEO не поправя слабата отличимост",
      paragraphs: [
        "Добрата техническа SEO основа може да помогне на сайта да бъде обхождан и разбран, но не може да премахне човешкото объркване между почти еднакви имена. Търсачката може да покаже правилния резултат, но потребителят все още трябва да разпознае кой от тях търси.",
        "Затова домейнът, името на бранда, заглавията на страниците, визуалната идентичност и публичните профили трябва да подават един и същ последователен сигнал.",
      ],
    },
    {
      title: "Кога е по-добре да се потърси друго име",
      paragraphs: [
        "Ако най-естественият домейн е зает и около него вече има няколко активни сходни адреса, понякога по-силното решение е ново, по-отличимо име. Добавянето на още една буква или наставка изглежда като малък компромис при регистрацията, но може да се превърне в постоянен разход за комуникация.",
        "По-добрият домейн не е този, който просто е наличен. Той е този, който потребителят разпознава, запомня и отваря правилно без допълнителни инструкции.",
      ],
    },
  ],
  "kak-izgradihme-vizualnata-identichnost-na-d-media": [
    {
      title: "От какво тръгнахме",
      paragraphs: [
        "Идентичността на d . media беше изградена като система за реална употреба, не като самостоятелен графичен жест. Още в началото беше ясно, че тя трябва да издържа еднакво убедително в сайт, документи, социални формати и презентационни материали.",
        "Затова тръгнахме от приложението: как се държи знакът, каква е ролята на логотипа и как типографията поема тежестта на комуникацията.",
      ],
    },
    {
      title: "Защо визуалната система е минималистична",
      paragraphs: [
        "Минимализмът не беше само естетически избор. Той беше най-точният начин да намалим визуалния шум и да оставим повече пространство за структура, смисъл и последователност.",
        "Така системата остава разпознаваема, без да изисква постоянни допълнителни декоративни опори.",
      ],
    },
    {
      title: "Какво включва идентичността",
      paragraphs: [
        "Системата включва знак, логотип, типографска логика, черно-бяла основа и правила за поведение в различни формати. Това е по-важно от самите файлове, защото именно правилата правят идентичността устойчива.",
        "Когато има ясна рамка, следващите приложения не започват от импровизация, а от вече подреден визуален език.",
      ],
    },
    {
      title: "Какво означава това в практика",
      paragraphs: [
        "Добрата идентичност намалява вътрешния хаос и повишава увереността в следващите материали. Точно това търсихме и за d . media: система, която стои спокойно и последователно във всяка точка на контакт.",
      ],
    },
  ],
  "kakvo-kupuva-klientat-kogato-plashta-za-dizain": [
    {
      title: "Къде е реалната стойност",
      paragraphs: [
        "Когато клиентът плаща за дизайн, той не плаща само за визия или за време в софтуер. Плаща за по-ясна комуникация, за по-добра подредба на вниманието и за решение, което намалява двусмислието.",
        "Стойността на дизайна е в това какво прави възможно след себе си.",
      ],
    },
    {
      title: "Какво реално се купува",
      paragraphs: [
        "Купува се процес на мислене: преценка на задачата, редакция на шума и превод на смисъл към форма. Това е и причината добрият дизайн да не се изчерпва с красив резултат на екрана.",
        "Когато решението е правилно, то може да се използва устойчиво и в следващите адаптации.",
      ],
    },
    {
      title: "Къде често идва разминаването",
      paragraphs: [
        "Разминаването идва, когато дизайнът се очаква да компенсира неясна оферта или липса на структура. Тогава от визуалния слой се иска да реши проблем, който всъщност е комуникационен.",
        "Затова първо подреждаме контекста, а после формата.",
      ],
    },
    {
      title: "Какво остава след добрия дизайн",
      paragraphs: [
        "Остава по-ясна система, по-малко хаос и по-лесна ежедневна употреба. Това е причината да говорим за стойност, а не за единичен файл.",
      ],
    },
  ],
  "brand-identichnost-sreshtu-logo": [
    {
      title: "Лого и идентичност не са едно и също",
      paragraphs: [
        "Логото е знак. Идентичността е системата, в която този знак съществува. Тя включва типография, ритъм, цвят, тон и логика на приложение.",
        "Затова един бранд може да има добър знак и въпреки това да изглежда непоследователно.",
      ],
    },
    {
      title: "Защо логото не е достатъчно",
      paragraphs: [
        "Самото лого не решава как изглежда сайтът, как стои публикация, как се усеща документ или как се държи рекламна визия. То е начало, не завършена система.",
        "Когато цялата тежест се постави върху него, останалите елементи започват да се импровизират.",
      ],
    },
    {
      title: "Как работи идентичността",
      paragraphs: [
        "Идентичността дава правила на поведение. Това позволява на различни материали да изглеждат част от една среда, без да бъдат еднакви по повърхност.",
        "Точно тази повторяемост изгражда доверие.",
      ],
    },
    {
      title: "Какво означава това за бизнеса",
      paragraphs: [
        "За бизнеса разликата е практическа: логото може да съществува само, но идентичността прави така, че брандът да стои събран и разпознаваем навсякъде.",
      ],
    },
  ],
  "zashto-krasiviyat-dizain-ne-prodava-sam": [
    {
      title: "Визията сама не е достатъчна",
      paragraphs: [
        "Красивият дизайн може да привлече внимание, но не може сам да създаде доверие, ако липсват ясна оферта, точен контекст и правилна йерархия на посланието.",
        "Той усилва смисъла, но не го заменя.",
      ],
    },
    {
      title: "Къде стои реалният проблем",
      paragraphs: [
        "Много брандове очакват визуалният слой да компенсира неясен продукт или хаотична комуникация. Това рядко работи дългосрочно, защото основният проблем остава недокоснат.",
        "Когато предложението е неясно, дори добрата визия започва да изглежда декоративна.",
      ],
    },
    {
      title: "Как подреждаме посланието",
      paragraphs: [
        "Започваме от смисъла: какво трябва да се види първо, какъв е следващият аргумент и къде е действието. После дизайнът поема тази логика и я прави по-четима.",
      ],
    },
    {
      title: "Какво продава по-добре",
      paragraphs: [
        "По-добре продава комбинацията от яснота, правилен тон, добра структура и последователна визуална система. Красотата има стойност, когато работи вътре в тази рамка.",
      ],
    },
  ],
  "kak-postignahme-100-100-v-google-pagespeed-insights": [
    {
      title: "Резултатът започна от архитектурата",
      paragraphs: [
        "По-ранната документация записва стойности в ред Performance/Accessibility/Best Practices/SEO: 100/100/100/100 за настолни устройства и 98/100/100/100 за мобилни. Няма датиран първичен отчет, затова тези стойности не се представят като текущо измерване. Архитектурният контекст включва статично генериране, контрол върху ресурсите и ограничен JavaScript слой.",
        "Когато скоростта е част от архитектурата, оптимизацията спира да бъде паническа фаза преди публикуване.",
      ],
    },
    {
      title: "Кои решения имаха най-голям ефект",
      paragraphs: [
        "Най-голям ефект имаха контролът върху изображенията, минималният client-side JavaScript, чистият CSS и вниманието към шрифтовете и rendering path-а. Това са решения, които влияят устойчиво, не моментно.",
      ],
    },
    {
      title: "Защо инфраструктурата има значение",
      paragraphs: [
        "И средата за публикуване има значение. Когато моделът за публикуване подкрепя сайта, скоростта става по-предвидима и по-лесна за поддържане.",
        "Платформата сама не решава всичко, но неправилната платформа може да създаде излишно триене.",
      ],
    },
    {
      title: "Какво е по-важно от самата оценка",
      paragraphs: [
        "По-важно от цифрата е, че сайтът зарежда бързо, остава стабилен и създава по-малко friction за реалния потребител. Метриката е полезна, когато зад нея стои истинско качество.",
      ],
    },
  ],
  "zashto-100-100-v-pagespeed-ne-garantira-dobar-sait": [
    {
      title: "Техническият резултат не е цялата картина",
      paragraphs: [
        "Високият PageSpeed резултат е добър технически сигнал, но не е достатъчен, за да направи сайта добър. Сайтът може да е бърз и въпреки това да не обяснява добре услугата, да не подрежда вниманието или да не води към действие.",
      ],
    },
    {
      title: "Какво остава извън метриката",
      paragraphs: [
        "PageSpeed не оценява в достатъчна степен силата на copy-то, яснотата на офертата, доверието, което създава страницата, и начина, по който услугите се възприемат от първо четене.",
        "А точно тези елементи често решават дали сайтът ще работи в реална бизнес среда.",
      ],
    },
    {
      title: "Как подхождаме в d . media",
      paragraphs: [
        "Гледаме на скоростта като на основа, но не и като на крайна цел. Един добър сайт трябва да бъде едновременно бърз, ясен, четим и структурно убедителен.",
      ],
    },
    {
      title: "По-добрият критерий",
      paragraphs: [
        "По-добрият критерий е дали сайтът обяснява правилно, води по естествен начин и остава лесен за ползване. Тогава високата оценка за скорост вече има реална стойност.",
      ],
    },
  ],
  "vercel-ili-cloudflare-pages-realno-sravnenie": [
    {
      title: "Сравнението има смисъл само в контекст",
      paragraphs: [
        "Vercel и Cloudflare Pages не трябва да се сравняват абстрактно. Въпросът не е коя платформа е по-шумна или по-популярна, а коя среда е по-подходяща за конкретния обхват на сайта.",
      ],
    },
    {
      title: "Кога всяка от тях има предимство",
      paragraphs: [
        "Vercel е силен избор в среда, силно обвързана с Next.js и неговия работен модел. Cloudflare Pages има ясна логика, когато търсиш по-широк контрол върху edge средата и по-директна връзка с останалата Cloudflare инфраструктура.",
      ],
    },
    {
      title: "Какво гледаме при избора",
      paragraphs: [
        "Гледаме как е структуриран сайтът, как ще се поддържа, какви интеграции има и какви дългосрочни зависимости създава платформата. Така изборът остава прагматичен и защитим.",
      ],
    },
    {
      title: "Какво има значение за клиента",
      paragraphs: [
        "За клиента най-важно е платформата да служи на продукта. Правилният избор носи по-малко компромиси, по-ясна поддръжка и по-устойчиво развитие след launch.",
      ],
    },
  ],
  "kakvo-e-geo-i-zashto-shte-promeni-seo": [
    {
      title: "Какво наричаме GEO",
      paragraphs: [
        "GEO описва работа по това един сайт да бъде по-ясен, по-структуриран и по-лесен за разбиране от системи, които не само индексират, а обобщават и цитират информация.",
        "Това не заменя SEO, а разширява полето му към AI-driven отговори.",
      ],
    },
    {
      title: "Защо това променя SEO",
      paragraphs: [
        "Ако класическото SEO мисли в позиции и кликове, GEO добавя въпроса дали съдържанието е достатъчно ясно, за да бъде използвано в генериран отговор. Това измества тежестта към по-силен editorial и structural слой.",
      ],
    },
    {
      title: "Разлика между SEO и GEO",
      paragraphs: [
        "SEO подрежда сайта така, че търсачките да го намират, разбират и показват по правилните заявки. GEO добавя втори слой: дали съдържанието може да бъде разбрано, обобщено и поставено в контекст от AI системи, които изграждат отговор, а не само списък с линкове.",
        "Затова GEO не отменя техническото SEO, canonical URL адресите, sitemap, вътрешните връзки или структурираните данни. То стъпва върху тях и изисква по-ясно съдържание, по-добра терминология и по-малко двусмислие.",
      ],
    },
    {
      title: "Какво става по-важно",
      paragraphs: [
        "По-важни стават архитектурата на услугите, съдържание на статиите, вътрешните връзки, ясната терминология и коректните структурирани данни. Без тях сайтът е по-труден за правилно резюмиране.",
      ],
    },
    {
      title: "Какво трябва да има един сайт, четим от AI системи",
      paragraphs: [
        "Един сайт трябва да има ясни страници с услуги, последователни заглавия, конкретни описания, реални вътрешни връзки и съдържание, което обяснява темите без кухи фрази. Това помага както на хората, така и на системите да разберат какво предлага брандът и в какъв контекст.",
        "Допълнителни файлове като llms.txt могат да бъдат полезен ориентир за AI инструменти, но остават предложен стандарт, а не официален ranking фактор. Те не заменят качественото съдържание, schema слоя и коректната техническа основа.",
      ],
    },
    {
      title: "Най-чести грешки",
      paragraphs: [
        "Най-често проблемът не е липса на още една SEO настройка, а липса на яснота. Услугите са описани прекалено общо, страниците си приличат, няма конкретни next steps, а важните теми са скрити в кратки секции без достатъчен контекст.",
        "Друга честа грешка е обещанието за гарантирано AI цитиране. Това не е коректно. Реалистичната цел е сайтът да бъде по-добре структуриран, по-ясен и по-лесен за разбиране, без да се обещава контрол върху начина, по който външни системи ще го използват.",
      ],
    },
    {
      title: "Кратки въпроси и отговори",
      paragraphs: [
        "GEO замества ли SEO? Не. GEO допълва SEO с по-силен фокус върху яснота, структура и съдържание, четимо от AI системи.",
        "Достатъчен ли е llms.txt? Не. Той може да помогне като ориентир, но не е заместител на страници с услуги, статии, вътрешни връзки, schema и реална съдържателна архитектура.",
        "Може ли да се гарантира цитиране от AI системи? Не. Може да се подобри качеството на сигналите, но не и да се гарантира поведението на външни AI платформи.",
      ],
    },
    {
      title: "Как подхождаме",
      paragraphs: [
        "В d . media гледаме на GEO като на естествено продължение на добрия сайт: по-малко шум, повече яснота и по-добра техническа четимост за хора и системи.",
      ],
    },
  ],
  "kakvo-e-llms-txt-i-nuzhen-li-e-za-vashiya-sait": [
    {
      title: "Какво представлява llms.txt",
      paragraphs: [
        "llms.txt е предложен формат, чрез който един сайт може да подаде по-пряк ориентир към AI системите за най-важните си страници, теми и услуги. Той е полезен като навигационен слой.",
      ],
    },
    {
      title: "Какво не е",
      paragraphs: [
        "llms.txt не е официален фактор за класиране в търсачките и не трябва да се представя като гаранция за класиране. Това е разумно допълнение, но не може да компенсира слаб сайт или хаотична вътрешна архитектура.",
      ],
    },
    {
      title: "Кога има смисъл",
      paragraphs: [
        "Има смисъл, когато сайтът вече има подредени услуги, смислен съдържателен слой, коректен sitemap и ясни структурирани данни. Тогава файлът може да подпомогне ориентацията на AI системите.",
      ],
    },
    {
      title: "Как го използваме",
      paragraphs: [
        "Използваме го прагматично: като помощен слой в GEO-ready рамката на сайта, не като заместител на по-сигурните технически основи.",
      ],
    },
  ],
  "kakvo-vizhda-chatgpt-kogato-analizira-vashiya-biznes": [
    {
      title: "AI системата чете повече от едно заглавие",
      paragraphs: [
        "Когато ChatGPT или сходна система анализира бизнес, тя събира сигнали от структурата на сайта, услугите, статиите, проектите, вътрешните връзки и публичните описания на бранда.",
        "Затова впечатлението не идва от една страница, а от последователността между всички тях.",
      ],
    },
    {
      title: "Кои сигнали са най-силни",
      paragraphs: [
        "Най-силни са ясните страници с услуги, добре написаният слой със статии, коректните метаданни и липсата на противоречиви формулировки. Ако сайтът е твърде общ, системата ще изгради обща картина.",
      ],
    },
    {
      title: "Защо това е важно",
      paragraphs: [
        "Все по-често първото резюме на един бизнес няма да бъде написано от самия бизнес, а ще бъде генерирано от система. Това прави собственият контекст на сайта още по-важен.",
      ],
    },
    {
      title: "Какво подобрява възприятието",
      paragraphs: [
        "Подобрява го ясната архитектура, конкретният език, тематичната дълбочина и липсата на generic agency фрази. С други думи: по-малко поза, повече точна информация.",
      ],
    },
  ],
  "nai-chestite-seo-greshki-na-malkite-firmeni-saitove": [
    {
      title: "Проблемът не е само в техническите настройки",
      paragraphs: [
        "Малките фирмени сайтове често губят видимост не заради една липсваща мета настройка, а защото структурата им не е достатъчно ясна и темите не са развити смислено.",
      ],
    },
    {
      title: "Кои пропуски се срещат най-често",
      paragraphs: [
        "Често липсват реални страници с услуги, блог слой, вътрешни връзки и достатъчно ясна йерархия между основните теми. Така сайтът остава прекалено тънък като източник на авторитет.",
      ],
    },
    {
      title: "Какво носи реален напредък",
      paragraphs: [
        "Най-голям напредък носи подреждането на основата: услуги с ясен обхват, съдържание със собствена функция и техническа дисциплина в метаданните, sitemap и rendering слоя.",
      ],
    },
    {
      title: "Какво означава това за бизнеса",
      paragraphs: [
        "За малкия бизнес по-доброто SEO не изисква повече шум. Изисква по-ясен сайт, по-конкретни теми и по-последователен начин на представяне.",
      ],
    },
  ],
  "10-greshki-v-socialnite-mrezhi": [
    {
      title: "Активността не е равна на присъствие",
      paragraphs: [
        "Повечето брандове публикуват, но това не значи, че присъствието им е последователно. Грешките започват там, където съдържанието няма ясна роля и визуалната линия се сменя от пост на пост.",
      ],
    },
    {
      title: "Как изглеждат тези грешки",
      paragraphs: [
        "Виждат се в несъразмерни корици, неясна йерархия на текста, случайни формати и тон, който се мести според конкретната публикация. Така профилът остава активен, но трудно става разпознаваем.",
      ],
    },
    {
      title: "Как подреждаме социален слой",
      paragraphs: [
        "Подреждаме социалните формати като система: кои са основни, кои подкрепящи и как се връзват със сайта, услугите и офертата на бранда. Това намалява хаоса и вдига качеството на изхода.",
      ],
    },
    {
      title: "Какво остава след това",
      paragraphs: [
        "Остава по-ясно, по-устойчиво и по-лесно за поддръжка присъствие. Това е далеч по-ценно от просто повече публикации без обща логика.",
      ],
    },
  ],
  "zashto-publikuvaneto-vseki-den-ne-e-strategiya": [
    {
      title: "Честотата не създава посока",
      paragraphs: [
        "Публикуването всеки ден може да създаде усещане за активност, но не създава автоматично стратегия. Ако няма ясни теми, роля на форматите и връзка с бизнес целите, честотата просто увеличава шума.",
      ],
    },
    {
      title: "Какво прави стратегията реална",
      paragraphs: [
        "Стратегия има, когато знаеш какво повтаряш, защо го повтаряш и как всяка публикация служи на по-голяма комуникационна логика. Тогава регулярността вече има функция.",
      ],
    },
    {
      title: "Къде се губи най-много енергия",
      paragraphs: [
        "Най-много енергия се губи, когато всеки пост се измисля отделно и на момента. Това изтощава екипа и почти винаги сваля качеството.",
      ],
    },
    {
      title: "По-устойчивият модел",
      paragraphs: [
        "По-устойчивият модел е система за съдържание с ясни формати, повтаряеми теми и спокоен ритъм. Така съдържанието започва да работи като актив, не като задължение.",
      ],
    },
  ],
  "kak-se-izgrazhda-posledovatelno-digitalno-prisastvie": [
    {
      title: "Последователността не идва от един канал",
      paragraphs: [
        "Дигиталното присъствие не става последователно само защото сайтът е добър или социалните профили са активни. То става такова, когато всички точки на контакт следват една и съща логика.",
      ],
    },
    {
      title: "Как се разпада присъствието",
      paragraphs: [
        "Разпада се, когато сайтът, съдържанието, рекламата и документите изглеждат като части от различни системи. Тогава брандът губи цялостност дори ако отделните елементи не са слаби сами по себе си.",
      ],
    },
    {
      title: "Как изграждаме общата линия",
      paragraphs: [
        "Започваме от ядрото на бранда: какво е, за кого е и как трябва да бъде възприеман. След това превеждаме тази логика към сайт, социален слой, съдържание и рекламни формати.",
      ],
    },
    {
      title: "Какво печели бизнесът",
      paragraphs: [
        "Печели по-голяма яснота, по-малко вътрешно триене и по-силно усещане за ред. Именно това прави присъствието по-разпознаваемо във времето.",
      ],
    },
  ],
  "kak-ai-promenya-grafichniya-dizain-prez-2026": [
    {
      title: "AI промени темпото, не критериите",
      paragraphs: [
        "AI ускори генерирането на rough варианти, помощни визуализации и ранни посоки, но не промени основния критерий за добър дизайн: дали решението е смислено, устойчиво и приложимо.",
      ],
    },
    {
      title: "Къде ефектът е най-силен",
      paragraphs: [
        "Най-силен е при проучване на алтернативи, mood exploration и по-бързи вътрешни итерации. Там AI намалява механичната работа и отваря повече посоки в рамките на същото време.",
      ],
    },
    {
      title: "Къде рискът расте",
      paragraphs: [
        "Рискът расте, когато инструментът започне да диктува посоката вместо дизайнера. Тогава проектът лесно губи характер и започва да прилича на генерично решение без вътрешна логика.",
      ],
    },
    {
      title: "Как подхождаме",
      paragraphs: [
        "Използваме AI като ускорител на процеса, но държим решението, редакцията и системната отговорност в човешкия слой. Там остава реалната стойност.",
      ],
    },
  ],
  "kade-ai-pomaga-na-dizainera-i-kade-ne-mozhe-da-go-zameni": [
    {
      title: "Къде AI реално помага",
      paragraphs: [
        "AI помага при rough exploration, търсене на посоки, бърза подготовка на варианти и помощни визуални ресурси. Там той може да ускори процеса без да го подменя.",
      ],
    },
    {
      title: "Какво не може да замени",
      paragraphs: [
        "Не може да замени разбирането за контекст, вкуса, способността да се изгради система и редакционното решение какво да остане и какво да отпадне. Именно там дизайнерът остава решаващ.",
      ],
    },
    {
      title: "Защо това има значение за бизнеса",
      paragraphs: [
        "За бизнеса разликата е важна, защото не всяка бързо генерирана визия е годна за идентичност, публично присъствие или дългосрочна употреба. Видът и качеството не са едно и също.",
      ],
    },
    {
      title: "По-устойчивият модел",
      paragraphs: [
        "По-устойчивият модел е AI да подпомага дизайнера, а не да го замества. Така скоростта остава полезна, без проектът да губи посока и авторска дисциплина.",
      ],
    },
  ],
  "avtorski-prava-ai-i-dizain": [
    {
      title: "Темата вече е практическа",
      paragraphs: [
        "Авторските права при AI вече не са далечна правна тема. Те засягат произхода на визуалните решения, сигурността на употребата и отговорността на бизнеса към собствените му материали.",
      ],
    },
    {
      title: "Къде стои рискът",
      paragraphs: [
        "Рискът стои в неясния произход и в това, че не всяко генерирано изображение е подходящо за публична, търговска или идентичностна употреба. Това е особено важно, когато материалът трябва да носи доверие дългосрочно.",
      ],
    },
    {
      title: "Как подхождаме по-отговорно",
      paragraphs: [
        "Подхождаме с ясна граница между помощен инструмент и финално авторско решение. Колкото по-важна е ролята на един материал, толкова по-голям трябва да бъде контролът върху произхода и редакцията.",
      ],
    },
    {
      title: "Какво трябва да знае бизнесът",
      paragraphs: [
        "Бизнесът трябва да знае, че удобството не отменя отговорността. Ако AI участва в процеса, това трябва да бъде осъзнат работен модел, а не случайна shortcut логика.",
      ],
    },
  ],
  "kak-dostignahme-100-100-100-100-na-d-media-org": [
    {
      title: "Контекст",
      paragraphs: [
        "d-media.org беше изграден като собствена платформа на d . media, а не като демонстрационен сайт. Затова скоростта, достъпността, добрите практики и SEO не бяха третирани като финална техническа проверка, а като част от самото позициониране.",
        "Наличната документация записва по-ранни стойности в ред Performance/Accessibility/Best Practices/SEO: 100/100/100/100 за настолни устройства и 98/100/100/100 за мобилни. Датиран първичен отчет не е наличен, затова стойностите не се представят като текущи. Не добавяме конкретни LCP, CLS, INP или други показатели без подходящ източник.",
      ],
    },
    {
      title: "Предизвикателството",
      paragraphs: [
        "Основното предизвикателство беше сайтът да остане визуално строг, типографски характерен и технически лек едновременно. Това означаваше контрол върху изображения, шрифтове, скриптове, routing, SEO слой и deployment среда.",
        "При такъв тип сайт скоростта не може да бъде постигната чрез скриване на проблеми. Ако ресурсите са тежки, ако структурата е хаотична или ако JavaScript слоят е излишно натоварен, резултатът неизбежно се вижда в реалната употреба.",
      ],
    },
    {
      title: "Подход",
      paragraphs: [
        "Подходът беше архитектурен: статично публикуване, внимателна работа с ресурси, ограничаване на излишния runtime и последователна проверка на мобилното поведение. Миграцията към Astro и Cloudflare намали зависимостите и направи сайта по-предвидим като поведение.",
        "Готовността за SEO и GEO също беше част от процеса: canonical логика, sitemap, структурирани данни, визуализация при споделяне, llms.txt и ясна вътрешна структура. Това прави сайта по-четим както за хора, така и за системи, които го анализират.",
      ],
    },
    {
      title: "Резултат",
      paragraphs: [
        "По-важният контекст е как архитектурата, четимостта и достъпността работят заедно; Lighthouse оценката е само лабораторен показател.",
        "Тези числа са документирани по-ранни стойности, а не текуща или постоянна оценка. Казусът описва архитектурни решения и не обещава същите резултати при друго измерване.",
      ],
    },
    {
      title: "Какво прави този подход устойчив",
      paragraphs: [
        "Устойчивият резултат за скорост идва от дисциплина, не от еднократна оптимизация. Ако процесът на публикуване и поддръжка не пази същата логика, дори добрият старт бързо се разпада.",
        "Затова този казус е полезен не само като резултат, а като модел за това как скоростта може да бъде част от стандарта на едно студио.",
      ],
    },
  ],
  "patyat-do-d-media": [
    {
      title: "Контекст",
      paragraphs: [
        "Пътят до d . media не е просто визуална промяна. Това е еволюция на позиционирането към по-събрана студийна система, в която идентичност, съдържание, уеб, дизайн и реклама работят заедно.",
        "Историческият контекст включва няколко етапа на развитие и последователни редакции на посоката, но в публичния разказ тежестта остава върху сегашната идентичност и причините тя да съществува в този вид.",
      ],
    },
    {
      title: "Основната ос",
      paragraphs: [
        "Основната ос е редукция към по-ясна система. Вместо да се добавят нови декоративни пластове, посоката се изчиства: по-малко шум, по-точен език, по-стабилна типография и по-добра връзка между услуги и реално приложение.",
        "Този преход е важен, защото показва как брандът може да стане по-силен чрез фокус, а не чрез визуално натрупване.",
      ],
    },
    {
      title: "Решения",
      paragraphs: [
        "Решенията включват по-ясно позициониране, минималистична визуална система, монохромна среда, редакционна дисциплина в сайта и подреждане на услугите около реални бизнес нужди.",
        "Така d . media започва да комуникира като студио с цялостна система, а не като сбор от отделни изпълнения.",
      ],
    },
    {
      title: "Какво прави казуса полезен",
      paragraphs: [
        "Полезността на този казус не е в архивната подробност, а в това да покаже как един бранд става по-силен, когато услугите, езикът и визуалната среда се подредят около една ясна логика.",
        "Историята е полезна, когато показва причината зад сегашната система, а не превръща публикацията в хронология на всеки междинен вариант. Затова тук остават само промените, които обясняват посоката и реалното приложение.",
      ],
    },
    {
      title: "Какво остава след тази промяна",
      paragraphs: [
        "Остава по-ясно студийно ядро. Вместо различни посоки да се конкурират помежду си, те започват да се подреждат в един разпознаваем глас и в една по-стабилна система на приложение.",
        "Точно това прави казуса релевантен за всеки бранд, който вече има натрупване, но още няма достатъчно ред.",
      ],
    },
  ],
  "izgrazhdane-na-mnogoezichen-sait-s-astro": [
    {
      title: "Обхват",
      paragraphs: [
        "Многоезичният сайт не е само превод на низове. Той изисква ясна архитектура за маршрути, метаданни, canonical адреси, hreflang логика и наличност на съдържанието във всеки език.",
        "При d-media.org българският и английският слой трябва да останат синхронизирани по смисъл, но не и механично еднакви като формулировка. Това е важно, защото буквалният превод често отслабва позиционирането.",
      ],
    },
    {
      title: "Къде е сложността",
      paragraphs: [
        "Сложността е в това да не се създават фалшиви езикови версии. Ако дадена статия още няма реален английски текст, тя не трябва да получава изкуствен hreflang или празна страница само заради симетрия.",
        "Тази дисциплина пази SEO основата и намалява риска AI и search системи да прочетат сайта като непълен или противоречив.",
      ],
    },
    {
      title: "Подход",
      paragraphs: [
        "Подходът включва споделен layout слой, локализирани маршрути, контролирани alternate връзки и ясно разделение между публикувано и черново съдържание.",
        "Така сайтът остава лесен за поддръжка, без да се губи editorial качеството на отделните езикови версии.",
      ],
    },
    {
      title: "Стойност",
      paragraphs: [
        "Стойността е в предвидимостта. Многоезичният сайт може да расте без хаос, когато архитектурата предварително знае какво е публикувано, какво е draft и какво още няма превод.",
        "Казусът остава чернова до финално документиране на всички route и hreflang зависимости.",
      ],
    },
    {
      title: "Практически извод",
      paragraphs: [
        "Многоезичният слой има смисъл само когато всеки език запазва еднакво ниво на яснота и доверие. Ако единият език е силен, а другият е формален или празен, системата губи вътрешна цялост.",
        "Затова този казус гледа на локализацията като на editorial и technical задача едновременно.",
      ],
    },
  ],
  "zashto-izbrahme-minimalistichna-identichnost": [
    {
      title: "Изборът не беше мода",
      paragraphs: [
        "Минималистичната идентичност не беше избрана като стилова поза. Тя беше най-точният начин да поставим тежест върху структурата, типографията, въздуха и последователността.",
        "При d . media визуалната сила не идва от декоративни ефекти, а от контролирана употреба на знак, логотип, текст, пропорция и празно пространство.",
      ],
    },
    {
      title: "Какво решава този подход",
      paragraphs: [
        "Минимализмът намалява визуалния шум и позволява системата да работи в различни формати: сайт, социални публикации, документи, презентации, PDF материали и визуализации при споделяне.",
        "Когато елементите са малко, всяко разминаване се вижда. Това прави дисциплината по-трудна, но и по-ценна.",
      ],
    },
    {
      title: "Какво остава видимо",
      paragraphs: [
        "Остават видими пропорцията, ритъмът и качеството на самото решение. Именно там минимализмът показва дали системата е силна или просто празна.",
        "За d . media това е важно, защото премиум усещането трябва да идва от ред, а не от визуален шум.",
      ],
    },
    {
      title: "Как проверяваме посоката",
      paragraphs: [
        "Проверяваме дали изборът за редукция се вижда в реалните приложения: сайта, публикациите, документите и презентационните материали. Ако системата работи само в една демонстрация, тя не е завършена.",
      ],
    },
    {
      title: "Какво доказва този избор",
      paragraphs: [
        "Той доказва, че премиум усещането не изисква визуален шум. Напротив, то често става по-видимо, когато системата работи с по-малко елементи и с по-ясни правила.",
        "Това е и причината минималистичната идентичност да бъде по-трудна за изпълнение, но по-устойчива във времето.",
      ],
    },
  ],
  "ot-ideya-do-zavarshen-brand-realen-proces": [
    { title: "Началната точка", paragraphs: ["Един завършен бранд не започва от файловете. Започва от контекст: какъв проблем решава, за кого е, в каква среда трябва да работи и как трябва да бъде възприет."] },
    { title: "Какво прави процеса реален", paragraphs: ["Реалният процес включва уточняване на обхват, филтриране на слабите решения и постоянна проверка дали системата работи извън презентацията."] },
    { title: "Какво включва", paragraphs: ["Процесът включва позициониране, визуална система, логика на съдържанието, уеб приложение и проверка на реалната употреба. Това не е линейна декорация, а подреждане на зависимостите между елементите."] },
    { title: "Защо остава draft", paragraphs: ["Казусът остава draft, защото публичната версия трябва да стъпва върху конкретен завършен пример или ясно обозначена методология, без да създава измислен клиентски контекст."] },
    { title: "Какво остава след края", paragraphs: ["След края на процеса не остава само комплект материали. Остава система, която позволява на бранда да бъде прилаган последователно в сайт, съдържание, социални формати и рекламна среда.", "Именно това отличава завършения бранд от красивото, но изолирано визуално решение."] },
  ],
  "analiz-na-realen-redizain": [
    { title: "Как разглеждаме редизайна", paragraphs: ["Редизайнът не е смяна на стил заради новост. Той е процес на преценка кои части от системата работят, кои създават шум и кои трябва да бъдат пренаредени."] },
    { title: "Къде най-често се греши", paragraphs: ["Най-често се греши, когато редизайнът се мисли като козметична подмяна, без да се анализира защо предишната система вече не работи достатъчно добре."] },
    { title: "Как подхождаме", paragraphs: ["Подхождаме с анализ на структурата, възприятието, приложението и ограниченията, а не само на визуалната повърхност."] },
    { title: "Защо остава draft", paragraphs: ["Казусът остава draft, защото реалният редизайн трябва да бъде показан с конкретен преди/след контекст или ясно обозначена методология. Без това би звучал като общо обещание."] },
    { title: "Кога редизайнът има смисъл", paragraphs: ["Редизайнът има смисъл тогава, когато намалява триенето и прави системата по-ясна за реална употреба. Ако промяната е само видима, но не и полезна, тя рядко носи дългосрочна стойност.", "Този принцип е в центъра на целия ни подход към редизайна."] },
  ],
  "kak-podobrihme-skorostta-na-sait-s-nad-80-procenta": [
    { title: "Какъв е проблемът", paragraphs: ["Бавният сайт рядко има една причина. Обикновено проблемът е комбинация от тежки изображения, излишни скриптове, недисциплиниран CSS, неясен rendering модел и липса на проверка след всяка промяна."] },
    { title: "Къде стои тежестта", paragraphs: ["Тежестта обикновено стои в ресурсите, runtime зависимостите, rendering логиката и липсата на дисциплина в front-end слоя."] },
    { title: "Как подхождаме", paragraphs: ["Подхождаме по ред: първо начална мярка, после ресурси, после JavaScript и CSS, след това шрифтове, кеширане и повторна проверка. Целта е стабилна промяна, не случайно подобрение в един тест."] },
    { title: "Защо остава draft", paragraphs: ["Казусът остава draft, защото в момента няма публично потвърден конкретен проект с доказуемо подобрение над 80%. Затова title и съдържание са редактирани като методология, без недоказано процентно твърдение."] },
    { title: "Какво прави метода надежден", paragraphs: ["Надежден е, защото не започва от визуални компромиси, а от диагностика. Така скоростта може да се подобрява, без сайтът да губи идентичност или съдържателна тежест.", "Това е по-важно от впечатляващото число само по себе си."] },
  ],
  "izgrazhdane-na-geo-ready-website-prez-2026": [
    { title: "Какво означава GEO-ready в практика", paragraphs: ["GEO-ready сайт през 2026 означава ясна архитектура, редакционен слой и технически сигнали, които правят съдържанието разбираемо и използваемо от generative системи."] },
    { title: "Кои слоеве са важни", paragraphs: ["Важни са архитектурата на услугите, слоят със статии, вътрешното свързване, структурираните данни, sitemap и llms ориентацията като обща система. Никой от тези слоеве сам по себе си не гарантира цитиране, но заедно правят сайта по-четим."] },
    { title: "Какво прави сайта по-полезен за търсене с AI", paragraphs: ["По-полезен го правят ясните теми, липсата на общи фрази и способността системата да извлече точен контекст без догадки."] },
    { title: "Защо това има стойност", paragraphs: ["GEO-ready подходът повишава и човешката четимост, защото изисква повече ред и по-малко шум. Това е причината да го разглеждаме като част от добрия сайт, а не като отделна техническа добавка."] },
    { title: "Какво следва оттук", paragraphs: ["Следващата стъпка не е просто още метаданни, а поддържане на същия стандарт във всички нови страници, статии и слоеве с услуги. GEO-ready сайтът е процес на последователност, не еднократна настройка.", "Това прави казуса полезен и като работна рамка, не само като концепция."] },
  ],
};

type BlogFaq = { question: string; answer: string };

const dMediaFaqOverrides: Record<string, Partial<Record<Locale, BlogFaq[]>>> = {
  "zashto-sazdadohme-d-media": {
    bg: [
      {
        question: "Какъв проблем стои зад създаването на d . media?",
        answer:
          "Началният проблем е фрагментираното дигитално присъствие: отделните материали могат да са добри, но да не водят към една и съща представа за бизнеса.",
      },
      {
        question: "Защо d . media не е просто списък от услуги?",
        answer:
          "Защото смисълът е във връзката между услугите. Идентичността задава посоката, съдържанието я обяснява, сайтът я подрежда, а дизайнът и рекламата я пренасят в различни ситуации.",
      },
      {
        question: "Как се определя от какво има нужда един проект?",
        answer:
          "Първо се гледат текущият контекст и мястото, където се губи яснота. Едва след това се избира дали е нужен бранд, съдържание, сайт, дизайн, социален слой или реклама.",
      },
      {
        question: "Как собственият сайт проверява тази идея?",
        answer:
          "Чрез съгласуването на име, типография, услуги, проекти, статии и контактна пътека. Те не трябва да изглеждат еднакво, но трябва да водят към последователно разбиране на студиото.",
      },
      {
        question: "Какво означава „готова система“ за d . media?",
        answer:
          "Означава посетителят да разбира какво прави студиото, да намира релевантна услуга, да вижда доказателство и да знае каква е следващата стъпка без допълнително устно обяснение.",
      },
    ],
  },
  "kak-izgradihme-vizualnata-identichnost-na-d-media": {
    bg: [
      {
        question: "От какъв практически критерий започна визуалната идентичност?",
        answer:
          "От приложението: знакът, логотипът и типографската логика трябва да работят в сайт, документи, социални формати и презентационни материали, а не само в една композиция.",
      },
      {
        question: "Защо системата е минималистична?",
        answer:
          "За да намали декоративния шум и да остави структурата, смисъла и последователността да носят разпознаваемостта.",
      },
      {
        question: "Кои са основните части на идентичността?",
        answer:
          "Знак, логотип, типографска логика, черно-бяла основа и правила за приложение. Правилата са важни, защото превръщат отделните файлове в повторяема система.",
      },
      {
        question: "Как разбираме дали идентичността работи извън презентация?",
        answer:
          "Проверяваме дали различни материали остават част от една среда, без да бъдат механично еднакви. Ако всяко ново приложение изисква импровизация, системата не е достатъчно ясна.",
      },
      {
        question: "Каква е реалната стойност за d . media?",
        answer:
          "Идентичността намалява хаоса в следващите материали и прави студиото разпознаваемо в повече от една точка на контакт.",
      },
    ],
  },
  "kak-postignahme-100-100-v-google-pagespeed-insights": {
    bg: [
      {
        question: "Какви по-ранни стойности са документирани?",
        answer:
          "В ред Performance/Accessibility/Best Practices/SEO за настолни устройства са записани 100/100/100/100, а за мобилни — 98/100/100/100. Датиран първичен отчет не е наличен; тези стойности не са текущо измерване.",
      },
      {
        question: "Кои ресурси изискваха най-много дисциплина?",
        answer:
          "Изображенията, шрифтовете, CSS и client-side JavaScript, защото всеки от тях влияе върху rendering path-а и върху това кога съдържанието става използваемо.",
      },
      {
        question: "Какво променя средата за публикуване?",
        answer:
          "Подходящата среда прави поведението по-предвидимо и намалява поддръжката, но не компенсира лоша архитектура или тежки ресурси.",
      },
      {
        question: "Защо резултатът не е достатъчен сам по себе си?",
        answer:
          "Защото лабораторната оценка не описва цялото преживяване. Истинската стойност е сайтът да остане бърз, стабилен и разбираем при реална употреба.",
      },
      {
        question: "Кога този казус би бил подвеждащ?",
        answer:
          "Ако се представи като универсална рецепта или гаранция. Той показва конкретна архитектурна дисциплина, а не обещава същата оценка за всеки сайт.",
      },
    ],
  },
  "kak-dostignahme-100-100-100-100-na-d-media-org": {
    bg: [
      {
        question: "Какви по-ранни Lighthouse стойности са документирани за d-media.org?",
        answer:
          "В ред Performance/Accessibility/Best Practices/SEO документацията записва 100/100/100/100 за настолни устройства и 98/100/100/100 за мобилни. Датиран първичен отчет не е наличен, затова това не се представя като текущ резултат.",
      },
      {
        question: "Кое беше основното предизвикателство?",
        answer:
          "Сайтът трябваше да остане визуално строг и типографски характерен, като същевременно контролира изображенията, шрифтовете, скриптовете, routing-а и SEO слоя.",
      },
      {
        question: "Какво включваше архитектурният подход?",
        answer:
          "Статично публикуване, внимателна работа с ресурсите, ограничен runtime и последователна проверка на мобилното поведение, плюс canonical логика, sitemap и структурирани данни.",
      },
      {
        question: "Какво означава резултатът за реалния потребител?",
        answer:
          "Че високата техническа оценка има смисъл само когато е свързана с бързо, четимо и стабилно преживяване, а не остане лабораторна снимка.",
      },
      {
        question: "Какво трябва да остане устойчиво след казуса?",
        answer:
          "Дисциплината при публикуване и поддръжка. Без нея първоначалната оценка може да се разпадне при следващи ресурси, страници и функции.",
      },
    ],
  },
  "patyat-do-d-media": {
    bg: [
      {
        question: "Какво проследява „Пътят до d . media“?",
        answer:
          "Развитието към по-събрана студийна система, в която идентичност, съдържание, уеб, дизайн и реклама се подреждат около една посока.",
      },
      {
        question: "Коя е най-съществената промяна в посоката?",
        answer:
          "Преминаването от визуално натрупване към редукция: по-малко шум, по-точен език, по-стабилна типография и по-добра връзка между услугите и приложението.",
      },
      {
        question: "Кои решения оформят сегашната система?",
        answer:
          "По-ясно позициониране, минималистична визуална среда, монохромна логика, редакционна дисциплина и подреждане на услугите около реални бизнес нужди.",
      },
      {
        question: "Защо историята не е просто архив?",
        answer:
          "Защото има стойност само ако обяснява защо настоящата система изглежда и работи по този начин, без да претоварва читателя с несъществени етапи.",
      },
      {
        question: "Какъв е изводът от развитието?",
        answer:
          "Че разпознаваемостта идва от последователното подреждане на език, услуги и визуална среда, а не от добавянето на още елементи.",
      },
    ],
  },
  "zashto-izbrahme-minimalistichna-identichnost": {
    bg: [
      {
        question: "Какво означава минимализмът в тази идентичност?",
        answer:
          "Означава контрол върху пропорцията, типографията, въздуха и ритъма, така че малкото елементи да имат ясна роля.",
      },
      {
        question: "Какво решава минималистичният подход?",
        answer:
          "Намалява визуалния шум и позволява една система да работи в сайт, публикации, документи, презентации и PDF материали без различен характер във всеки формат.",
      },
      {
        question: "Какъв е рискът при минимализма?",
        answer:
          "Когато правилата са слаби, всяко разминаване става видимо. Затова минималистичната среда изисква повече дисциплина, а не по-малко.",
      },
      {
        question: "Как разбираме дали решението е достатъчно силно?",
        answer:
          "Гледаме пропорцията, ритъма и качеството на приложението. Ако системата изглежда празна, тя няма достатъчно смисъл; ако изглежда шумна, е загубила причината за избора.",
      },
      {
        question: "Какво доказва изборът за d . media?",
        answer:
          "Че премиум усещането може да бъде изградено чрез ред и ясни ограничения, без декоративно натрупване.",
      },
    ],
  },
};

const dMediaSectionOverrides: Record<string, Partial<Record<Locale, BlogSection[]>>> = {
  "zashto-sazdadohme-d-media": {
    en: [
      {
        title: "The observation that started it",
        paragraphs: [
          "d . media needed to behave like a studio with a clear point of view, not like a list of disconnected services.",
          "The problem was not a missing visual layer. It was the lack of one relationship between identity, content, web work, design, and advertising.",
        ],
      },
      {
        title: "What we wanted to change",
        paragraphs: [
          "The goal was to make the offer easier to understand and easier to apply. Every public touchpoint had to support the same studio position without repeating the same sentence.",
          "That required a tighter vocabulary, a more deliberate visual environment, and a content structure that could explain decisions instead of only displaying outputs.",
        ],
      },
      {
        title: "How the idea becomes work",
        paragraphs: [
          "The idea becomes useful when it changes how a brief is framed, how a page is structured, how a visual is approved, and how a result is explained.",
          "This is why the d . media system connects positioning with production rules. The identity is not an introduction placed above the work; it is a filter used while the work is being made.",
        ],
      },
      {
        title: "How it appears in our own brand",
        paragraphs: [
          "The website, editorial material, project presentation, and service language are treated as parts of one environment. They may use different formats, but they should not suggest different kinds of studio.",
          "The test is simple: a new page or material should feel native to d . media without requiring a new visual explanation every time.",
        ],
      },
      {
        title: "When we call the system ready",
        paragraphs: [
          "We check whether the positioning is understandable, whether the visual rules survive different formats, and whether the content can explain the work without inflated claims.",
          "A system is ready when it reduces decisions for the next project while keeping enough flexibility for a real brief.",
        ],
      },
    ],
  },
  "kak-izgradihme-vizualnata-identichnost-na-d-media": {
    en: [
      {
        title: "Identity as a working system",
        paragraphs: [
          "The d . media identity was built to organise the studio's public work, not to exist as an isolated logo presentation.",
          "Its job is to keep the website, editorial material, social formats, presentations, and project explanations recognisable as parts of one studio.",
        ],
      },
      {
        title: "The decisions that carry the system",
        paragraphs: [
          "The mark, logotype, typography, spacing, and contrast each have a defined role. The system becomes recognisable through their relationship, not through a single decorative device.",
          "This makes the identity usable in small, dense, long-form, and presentation-led formats without changing its character.",
        ],
      },
      {
        title: "Why the environment stays restrained",
        paragraphs: [
          "A monochrome environment keeps attention on hierarchy, language, and the quality of the work. It also makes inconsistencies visible early.",
          "The restraint is therefore a production decision: it narrows the number of easy shortcuts and protects the studio's tone.",
        ],
      },
      {
        title: "Testing the identity outside the board",
        paragraphs: [
          "We test the identity on actual pages, service descriptions, project material, and editorial layouts. A system that works only in a brand presentation is not complete.",
          "The useful question is whether the next application can be made with confidence and without improvising a new visual language.",
        ],
      },
      {
        title: "The result",
        paragraphs: [
          "The result is a repeatable environment: quiet enough for the work to lead, but specific enough to be recognised across different contact points.",
          "That balance is more important than adding more visible elements to the identity.",
        ],
      },
    ],
  },
  "kak-postignahme-100-100-v-google-pagespeed-insights": {
    en: [
      {
        title: "What the score actually records",
        paragraphs: [
          "Earlier documentation records scores in Performance/Accessibility/Best Practices/SEO order: 100/100/100/100 on desktop and 98/100/100/100 on mobile. No dated primary report is available, so these are not presented as current measurements. The architectural context includes static generation, resource control, and a limited JavaScript layer.",
          "The scores were not a final setting added after the site was designed; the architecture and visual implementation had to support the same performance requirement.",
        ],
      },
      {
        title: "Where the discipline mattered",
        paragraphs: [
          "Images, fonts, CSS, and client-side JavaScript all affect the rendering path. Each one was treated as part of the page experience rather than as an isolated asset.",
          "The practical goal was to keep the first meaningful interaction clear without stripping the site of its visual character.",
        ],
      },
      {
        title: "What the publishing environment changes",
        paragraphs: [
          "A predictable publishing environment reduces runtime uncertainty and makes regressions easier to detect.",
          "It cannot repair a heavy layout or poor resource choices. It only makes a disciplined architecture easier to preserve.",
        ],
      },
      {
        title: "Why the score is not the whole case",
        paragraphs: [
          "A laboratory score is useful evidence, but it does not describe every real-user condition. The site still has to be readable, stable, and understandable when people use it.",
          "The case is therefore about the decisions behind the score, not about treating one number as a universal promise.",
        ],
      },
      {
        title: "The boundary of the result",
        paragraphs: [
          "This is a verified result for a specific implementation. It is not a guarantee that every site with the same label or stack will reach the same score.",
          "The transferable lesson is the discipline of measuring, reducing unnecessary work, and checking again after publishing changes.",
        ],
      },
    ],
  },
  "kak-dostignahme-100-100-100-100-na-d-media-org": {
    en: [
      {
        title: "Earlier documented scores",
        paragraphs: [
          "The available documentation records earlier scores in Performance/Accessibility/Best Practices/SEO order: 100/100/100/100 on desktop and 98/100/100/100 on mobile.",
          "No dated primary report is available, so these figures are not presented as current or permanent scores. We do not add separate LCP, CLS, or INP values without an appropriate source.",
        ],
      },
      {
        title: "The constraint behind the work",
        paragraphs: [
          "The site had to remain visually strict and typographically distinctive while controlling images, fonts, scripts, routing, and the SEO layer.",
          "The challenge was to preserve the studio's character without making the page pay for unnecessary runtime or resource weight.",
        ],
      },
      {
        title: "The architectural approach",
        paragraphs: [
          "The approach combines static publishing, resource discipline, limited runtime, and repeated mobile checks with canonical logic, a sitemap, and structured data.",
          "Each part supports the same goal: a page that can be read by people and interpreted by search and AI systems without hidden complexity.",
        ],
      },
      {
        title: "What the result means",
        paragraphs: [
          "The score matters because it accompanies a fast, readable, and stable experience. Without that connection, it would remain a laboratory snapshot.",
          "The case is valuable as evidence of a process that keeps technical quality close to the design decision.",
        ],
      },
      {
        title: "What must remain true",
        paragraphs: [
          "The result depends on the publishing discipline continuing after the case is written. New resources, pages, and features must be checked against the same standard.",
          "Performance is maintained through repeated decisions, not protected by one successful measurement.",
        ],
      },
    ],
  },
  "patyat-do-d-media": {
    en: [
      {
        title: "What the development involved",
        paragraphs: [
          "The path to d . media was a move toward a more coherent studio system for identity, content, web, design, and advertising.",
          "The useful history is not a catalogue of every past version. It is the sequence of decisions that explains why the current system is more focused.",
        ],
      },
      {
        title: "The central shift",
        paragraphs: [
          "The central shift was from visual accumulation to reduction: less noise, more precise language, steadier typography, and a clearer relationship between services and application.",
          "This made the brand stronger through focus rather than through adding another layer of decoration.",
        ],
      },
      {
        title: "The decisions that shaped the direction",
        paragraphs: [
          "The direction is carried by clearer positioning, a restrained visual environment, editorial discipline, and services organised around real business needs.",
          "Together, these decisions make d . media read as one studio rather than as a collection of separate executions.",
        ],
      },
      {
        title: "Why the history is useful",
        paragraphs: [
          "The history is useful when it explains the present system without overloading the reader with intermediate versions that no longer guide a decision.",
          "The article keeps the context that helps a reader understand the change and leaves out detail that would only create archive noise.",
        ],
      },
      {
        title: "The outcome",
        paragraphs: [
          "The outcome is a clearer studio core: one voice, one more stable application logic, and fewer competing directions.",
          "That is the practical lesson for a brand that has accumulated material but still needs a stronger organising principle.",
        ],
      },
    ],
  },
  "zashto-izbrahme-minimalistichna-identichnost": {
    en: [
      {
        title: "The choice was functional",
        paragraphs: [
          "The minimalist identity was not selected as a style pose. It was the clearest way to give structure, typography, space, and consistency more weight than decoration.",
          "The visual strength of d . media comes from the controlled relationship between mark, logotype, text, proportion, and empty space.",
        ],
      },
      {
        title: "What the approach solves",
        paragraphs: [
          "Reduction lowers visual noise and lets the system work across the website, social posts, documents, presentations, PDF material, and shared previews.",
          "With fewer elements, every mismatch becomes visible. That makes the system harder to fake and easier to evaluate.",
        ],
      },
      {
        title: "What remains visible",
        paragraphs: [
          "The visible qualities are proportion, rhythm, and the quality of the decision itself. That is where minimalism shows whether the system is strong or merely empty.",
          "For d . media, the premium impression has to come from order and control rather than visual noise.",
        ],
      },
      {
        title: "How we test the direction",
        paragraphs: [
          "We check whether the reduction is visible in actual applications: the website, publications, documents, and presentation material.",
          "If the system works only in one demonstration, it is not finished. It has to guide the next application without requiring a new explanation.",
        ],
      },
      {
        title: "What the choice demonstrates",
        paragraphs: [
          "The choice demonstrates that a premium impression does not require visual accumulation. It can become clearer when the system uses fewer elements and stronger rules.",
          "That is why a minimalist identity is demanding to produce, but durable when it is applied consistently.",
        ],
      },
    ],
  },
};

const dMediaEnglishFaqOverrides: Record<string, BlogFaq[]> = {
  "zashto-sazdadohme-d-media": [
    {
      question: "What problem was d . media created to solve?",
      answer: "It was created to connect identity, content, web, design, and advertising in one studio system instead of presenting them as disconnected services.",
    },
    {
      question: "What changed in the positioning?",
      answer: "The positioning became more focused: the language, visual environment, and service structure now support one clearer studio direction.",
    },
    {
      question: "How is the idea used in production?",
      answer: "It is used as a filter for briefs, pages, visuals, approvals, and explanations, so the identity affects the work instead of sitting above it.",
    },
    {
      question: "How can the system be recognised in practice?",
      answer: "A new page or material should feel native to d . media without needing a new visual explanation, while still serving its specific format.",
    },
    {
      question: "When is this system ready to expand?",
      answer: "When the positioning is understandable, the rules survive different formats, and the content can explain the work without inflated claims.",
    },
  ],
  "kak-izgradihme-vizualnata-identichnost-na-d-media": [
    {
      question: "What does the d . media identity organise?",
      answer: "It organises the website, editorial material, social formats, presentations, and project explanations as parts of one recognisable studio.",
    },
    {
      question: "Which elements carry the identity?",
      answer: "The mark, logotype, typography, spacing, and contrast carry it through their relationship rather than through one decorative device.",
    },
    {
      question: "Why is the visual environment restrained?",
      answer: "The monochrome and restrained environment keeps attention on hierarchy, language, and the quality of the work while making inconsistencies easier to see.",
    },
    {
      question: "What proves that the identity is usable?",
      answer: "Testing it on actual pages, service descriptions, project material, and editorial layouts proves whether it works outside a brand presentation.",
    },
    {
      question: "What is the practical result?",
      answer: "The result is a repeatable environment that remains recognisable across different contact points without adding more visible elements than the work needs.",
    },
  ],
  "kak-postignahme-100-100-v-google-pagespeed-insights": [
    {
      question: "Which earlier scores are documented?",
      answer: "In Performance/Accessibility/Best Practices/SEO order, the documentation records 100/100/100/100 on desktop and 98/100/100/100 on mobile. No dated primary report is available, so these are not current measurements.",
    },
    {
      question: "Which resources needed the most discipline?",
      answer: "Images, fonts, CSS, and client-side JavaScript needed close control because each one affects the rendering path and the first useful interaction.",
    },
    {
      question: "What does the publishing environment contribute?",
      answer: "It reduces runtime uncertainty and makes regressions easier to detect, but it cannot repair a heavy layout or poor resource decisions.",
    },
    {
      question: "Why is the score not the whole case?",
      answer: "The score is laboratory evidence. The site still has to be readable, stable, and understandable when people use it in real conditions.",
    },
    {
      question: "What is the boundary of this result?",
      answer: "It is evidence for one specific implementation, not a universal guarantee. The transferable lesson is measuring, reducing unnecessary work, and checking again.",
    },
  ],
  "kak-dostignahme-100-100-100-100-na-d-media-org": [
    {
      question: "Which earlier Lighthouse scores are documented for d-media.org?",
      answer: "In Performance/Accessibility/Best Practices/SEO order, the available documentation records 100/100/100/100 on desktop and 98/100/100/100 on mobile. No dated primary report is available, so these are not presented as current scores.",
    },
    {
      question: "What was the main constraint?",
      answer: "The site had to remain visually strict and typographically distinctive while controlling images, fonts, scripts, routing, and the SEO layer.",
    },
    {
      question: "What did the architecture include?",
      answer: "It included static publishing, resource discipline, limited runtime, mobile checks, canonical logic, a sitemap, and structured data.",
    },
    {
      question: "What does the result mean for visitors?",
      answer: "The technical score matters because it accompanies a fast, readable, and stable experience rather than remaining only a laboratory snapshot.",
    },
    {
      question: "What keeps the result sustainable?",
      answer: "The same publishing discipline must be applied to every new resource, page, and feature so later changes do not quietly undo the measured quality.",
    },
  ],
  "patyat-do-d-media": [
    {
      question: "What does the path to d . media describe?",
      answer: "It describes the move toward a coherent studio system for identity, content, web, design, and advertising.",
    },
    {
      question: "What was the central change?",
      answer: "The direction moved from visual accumulation to reduction: less noise, more precise language, steadier typography, and a clearer link between services and application.",
    },
    {
      question: "Which decisions shaped the current direction?",
      answer: "Clearer positioning, a restrained visual environment, editorial discipline, and services organised around real business needs shaped it.",
    },
    {
      question: "Why is the history more than an archive?",
      answer: "It is useful only when it explains why the present system looks and works as it does, without burdening the reader with versions that no longer guide decisions.",
    },
    {
      question: "What is the practical outcome?",
      answer: "The outcome is a clearer studio core with one voice, more stable application logic, and fewer competing directions.",
    },
  ],
  "zashto-izbrahme-minimalistichna-identichnost": [
    {
      question: "What does minimalism mean in this identity?",
      answer: "It means controlling proportion, typography, space, and rhythm so that every remaining element has a clear role.",
    },
    {
      question: "What does the minimalist approach solve?",
      answer: "It reduces visual noise and lets one system work across the website, publications, documents, presentations, and PDF material.",
    },
    {
      question: "What is the risk of minimalism?",
      answer: "Weak rules make every mismatch visible. Minimalism therefore requires more discipline, not less.",
    },
    {
      question: "How do we test whether the choice is strong?",
      answer: "We look at proportion, rhythm, and the quality of actual application. The system must guide real formats rather than look empty or noisy.",
    },
    {
      question: "What does the choice prove for d . media?",
      answer: "It proves that a premium impression can come from order and clear limits without decorative accumulation.",
    },
  ],
};

function withSectionOverrides(post: BlogPost): BlogPost {
  const sections = postSectionOverrides[post.slug] ?? post.sections;
  return {
    ...post,
    sections,
    readingTime: calculateReadingTime({
      ...post,
      sections,
    }),
  };
}

function calculateReadingTime(post: Pick<BlogPost, "title" | "excerpt" | "intro" | "sections" | "ctaTitle" | "ctaText">) {
  const text = [
    post.title,
    post.excerpt,
    post.intro,
    ...post.sections.flatMap((section) => [
      section.title,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
    post.ctaTitle,
    post.ctaText,
  ].join(" ");
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(2, Math.ceil(words / 180));
}

const categoryContext = {
  bg: {
    "brand-identity": {
      system: "брандова система",
      artifact: "идентичност, език, визуални правила и публично поведение",
      serviceHref: "/services/brand-identity",
      serviceLabel: "Бранд идентичност",
      failure: "лого, тон и сайт се развиват отделно и започват да обещават различни неща",
    },
    "graphic-design": {
      system: "дизайн система за реална употреба",
      artifact: "формати, визуални правила, файлове и процес за повторяема продукция",
      serviceHref: "/services/graphic-design",
      serviceLabel: "Графичен дизайн",
      failure: "материалите изглеждат добре поотделно, но не могат да се поддържат като единна система",
    },
    "social-media": {
      system: "редакционна и социална система",
      artifact: "канали, рубрики, ритъм на публикуване, визуален език и критерии за публикации",
      serviceHref: "/services/social-media-management",
      serviceLabel: "Управление на социални медии",
      failure: "публикациите стават активност без посока и не натрупват разпознаваемост",
    },
    content: {
      system: "архитектура на съдържанието",
      artifact: "теми, редакционни стандарти, вътрешни връзки и формати за повторна употреба",
      serviceHref: "/services/content-creation",
      serviceLabel: "Създаване на съдържание",
      failure: "съдържанието се превръща в календар, но не изгражда знание или доверие",
    },
    "web-presence": {
      system: "уеб и дигитална архитектура",
      artifact: "URL структура, съдържание, скорост, достъпност, метаданни и поведение на страниците",
      serviceHref: "/services/web-design-development",
      serviceLabel: "Уеб дизайн и разработка",
      failure: "сайтът е визуално наличен, но не помага на хора, търсачки и AI системи да разберат бизнеса",
    },
    "ai-design": {
      system: "контролирана система за работа с AI и дизайн",
      artifact: "задание, рамка за указания, човешка редакция, проверка на права и критерии за публикуване",
      serviceHref: "/services/graphic-design",
      serviceLabel: "Графичен дизайн",
      failure: "AI ускорява производството на варианти, но без контрол увеличава шума и риска",
    },
    "seo-geo": {
      system: "архитектура за SEO, GEO и видимост в AI системи",
      artifact: "структурирано съдържание, schema, sitemap, llms слой, Markdown отговори и вътрешни връзки",
      serviceHref: "/services/geo",
      serviceLabel: "GEO и AI видимост",
      failure: "страниците имат ключови думи, но не дават достатъчно ясни доказателства и връзки за машинно разбиране",
    },
    "case-studies": {
      system: "система за казуси",
      artifact: "контекст, ограничения, решения, измервания, компромиси и проверими резултати",
      serviceHref: "/projects",
      serviceLabel: "Проекти",
      failure: "казусът звучи като портфолио описание, но не показва инженерното мислене зад резултата",
    },
  },
  en: {
    "brand-identity": {
      system: "brand system",
      artifact: "identity, language, visual rules, and public behaviour",
      serviceHref: "/services/brand-identity",
      serviceLabel: "Brand Identity",
      failure: "logo, tone, and website evolve separately and start making different promises",
    },
    "graphic-design": {
      system: "design system for production use",
      artifact: "formats, visual rules, files, and a repeatable production process",
      serviceHref: "/services/graphic-design",
      serviceLabel: "Graphic Design",
      failure: "materials look acceptable in isolation but cannot be maintained as one system",
    },
    "social-media": {
      system: "editorial and social media system",
      artifact: "channels, recurring formats, cadence, visual language, and publishing criteria",
      serviceHref: "/services/social-media-management",
      serviceLabel: "Social Media Management",
      failure: "posting becomes activity without direction and does not build recognition",
    },
    content: {
      system: "content architecture",
      artifact: "topics, editorial standards, internal links, and reusable formats",
      serviceHref: "/services/content-creation",
      serviceLabel: "Content Creation",
      failure: "content becomes a calendar but does not build knowledge or trust",
    },
    "web-presence": {
      system: "web and digital architecture",
      artifact: "URL structure, content, performance, accessibility, metadata, and route behaviour",
      serviceHref: "/services/web-design-development",
      serviceLabel: "Web Design and Development",
      failure: "the website is visually present but does not help people, search engines, and AI systems understand the business",
    },
    "ai-design": {
      system: "controlled AI and design workflow",
      artifact: "brief, prompt frame, human review, rights review, and production criteria",
      serviceHref: "/services/graphic-design",
      serviceLabel: "Graphic Design",
      failure: "AI accelerates variation production but increases noise and risk without direction",
    },
    "seo-geo": {
      system: "SEO/GEO and AI visibility architecture",
      artifact: "structured content, schema, sitemap, llms layer, Markdown negotiation, and internal links",
      serviceHref: "/services/geo",
      serviceLabel: "GEO and AI Visibility",
      failure: "pages contain keywords but not enough evidence and relationships for machine understanding",
    },
    "case-studies": {
      system: "case study system",
      artifact: "context, constraints, decisions, measurements, trade-offs, and verifiable outcomes",
      serviceHref: "/projects",
      serviceLabel: "Projects",
      failure: "the case study reads like a portfolio note but does not expose the engineering reasoning behind the result",
    },
  },
} as const satisfies Record<
  Locale,
  Record<BlogCategoryKey, { system: string; artifact: string; serviceHref: string; serviceLabel: string; failure: string }>
>;

function uniqueValues<T>(items: T[]) {
  return [...new Set(items)];
}

const reusableArticleParagraphStarts = [
  "Темата се разглежда през практическата работа",
  "Когато липсва ясна рамка",
  "Затова разглеждаме всяка тема",
  "Подхождаме към темата системно",
  "Това мислене се превежда",
  "Практическата стойност идва от яснотата",
  "Целта не е обем",
  "Темата има практическа стойност само ако",
  "Когато системата е подредена",
  "Добрата комуникация започва от ред",
  "Терминът има стойност само когато",
  "Проблемът обикновено не е липса на още един инструмент",
  "Започваме от intent",
  "Работим в последователност",
  "Проверката включва реалните URLs",
  "Практическата стойност е по-малко неяснота",
  "Нито една техническа или съдържателна промяна",
  "Следващата стъпка е да се определи текущото състояние",
  "Когато темата включва външна платформа или алгоритъм",
  "The topic is considered through the practical work",
  "When a clear framework is missing",
  "That is why we treat every topic",
  "We approach the topic systematically",
  "This way of thinking translates",
  "Practical value comes from clarity",
  "The goal is not volume",
  "The topic has practical value only if",
  "When the system is organized",
  "Good communication starts with order",
  "The term is useful only when",
  "The problem is usually not the absence of another tool",
  "We begin with intent",
  "We work in sequence",
  "Validation covers real URLs",
  "The practical value is reduced ambiguity",
  "No technical or content change",
  "The next step is to determine the current state",
  "When a topic involves an external platform or algorithm",
];

function getDistinctiveArticleFacts(post: BlogPost) {
  return uniqueValues(
    [post.intro, post.excerpt, ...post.sections.flatMap((section) => section.paragraphs)]
      .map((paragraph) => paragraph.trim())
      .filter(
        (paragraph) =>
          paragraph.length > 0 &&
          !reusableArticleParagraphStarts.some((prefix) => paragraph.startsWith(prefix)),
      ),
  );
}

function getPostRelationships(locale: Locale, post: BlogPost, posts: readonly BlogPost[]) {
  const categoryPeers = posts
    .filter((item) => item.slug !== post.slug && item.category === post.category && !item.draft)
    .map((item) => item.slug);
  const fallbackPeers = posts
    .filter((item) => item.slug !== post.slug && !item.draft)
    .map((item) => item.slug);
  const relatedPosts = uniqueValues([...post.relatedPosts, ...categoryPeers, ...fallbackPeers]).slice(0, 5);
  const relatedTitles = relatedPosts
    .map((slug) => posts.find((item) => item.slug === slug))
    .filter((item): item is BlogPost => Boolean(item))
    .map((item) => `${item.title} (${locale === "bg" ? `/blog/${item.slug}/` : `/en/blog/${item.slug}/`})`);

  return { relatedPosts, relatedTitles };
}

function buildDistinctArticleSections(locale: Locale, post: BlogPost, relatedTitles: string[]): BlogSection[] {
  const isBg = locale === "bg";
  const context = categoryContext[locale][post.category];
  const serviceHref = isBg ? context.serviceHref : "/en" + context.serviceHref;
  const articlePath = isBg ? "/blog/" + post.slug + "/" : "/en/blog/" + post.slug + "/";
  const servicesIndex = isBg ? "/services/" : "/en/services/";
  const contactPath = isBg ? "/contact/" : "/en/contact/";
  const projectsPath = isBg ? "/projects/" : "/en/projects/";
  const facts = getDistinctiveArticleFacts(post);
  const lead = facts[0] || post.intro;
  const tension = facts[1] || post.excerpt;
  const outcome = facts[2] || post.excerpt;
  const detail =
    facts[3] ||
    (isBg
      ? post.title + " изисква ясна връзка между проблема, решението и проверката на резултата."
      : post.title + " requires a clear relationship between the problem, the response, and the way the result is reviewed.");
  const related = relatedTitles.length
    ? relatedTitles
    : [isBg ? "Свързани статии в блога" : "Related articles in the blog"];

  if (isBg) {
    return [
      {
        title: "Въпросът зад „" + post.title + "“",
        paragraphs: [
          lead,
          post.title + " има стойност, когато превежда началния въпрос в конкретно решение, а не остава само с определение.",
        ],
      },
      {
        title: "Къде възниква трудността при „" + post.title + "“",
        paragraphs: [
          tension,
          "При „" + post.title + "“ рискът в " + context.system + " е, че " + context.failure + ". Статията проверява точно тази зависимост, вместо да оставя темата като общо предупреждение.",
        ],
      },
      {
        title: "Как се прилага „" + post.title + "“ на практика",
        paragraphs: [
          "Работният слой тук е " + context.artifact + ". При „" + post.title + "“ това означава темата да се превърне в правило, което друг човек може да използва без догадки.",
          detail,
        ],
      },
      {
        title: "Как се проверява резултатът при „" + post.title + "“",
        paragraphs: [
          "Започни от " + articlePath + ", след което сравни видимото твърдение с релевантната услуга на " + serviceHref + ". Проверката трябва да покаже дали страницата обяснява темата ясно и води към правилната следваща стъпка.",
          "Добрата проверка на „" + post.title + "“ търси конкретен проблем, конкретен отговор и доказателство, че отговорът може да се използва и извън тази една страница.",
        ],
      },
      {
        title: "Границата на „" + post.title + "“",
        paragraphs: [
          outcome + " Този извод помага за по-добро решение по „" + post.title + "“, но не е гаранция за позиция, конверсия, цитиране или бизнес резултат.",
          "Ограничението при „" + post.title + "“ е важно, защото " + context.system + " зависи и от контекста, качеството на изпълнение, поддръжката и външните условия.",
        ],
      },
      {
        title: "Извод за „" + post.title + "“",
        paragraphs: [
          "Практическият извод е „" + post.title + "“ да се използва за намаляване на неяснотата около " + context.artifact + ".",
          "Следващите полезни пътища след „" + post.title + "“ са " + context.serviceLabel + " (" + serviceHref + "), архивът с проекти (" + projectsPath + "), всички услуги (" + servicesIndex + ") и " + related[0] + ". За конкретен обхват използвай " + contactPath + ".",
        ],
      },
    ];
  }

  return [
    {
      title: "The question behind " + post.title,
      paragraphs: [
        lead,
        post.title + " becomes useful when it turns the starting question into a concrete decision instead of stopping at a definition.",
      ],
    },
    {
      title: "Where " + post.title + " becomes difficult",
      paragraphs: [
        tension,
        "For " + post.title + ", the risk in " + context.system + " is that " + context.failure + ". This article tests that dependency instead of leaving the topic as a general warning.",
      ],
    },
    {
      title: "A practical way to apply " + post.title,
      paragraphs: [
        "The relevant working layer is " + context.artifact + ". For " + post.title.toLowerCase() + ", that means turning the subject into a rule that another person can use without guessing.",
        detail,
      ],
    },
    {
      title: "How to check the result for " + post.title,
      paragraphs: [
        "Start with " + articlePath + ", then compare the visible claim with the related service at " + serviceHref + ". The check should show whether the page explains its subject clearly and leads to the right next step.",
        "A useful review of " + post.title.toLowerCase() + " should look for a specific problem, a specific response, and evidence that the response is usable beyond this single page.",
      ],
    },
    {
      title: "The boundary of " + post.title,
      paragraphs: [
        outcome + " This supports a better decision about " + post.title + ", but it is not a guarantee of a ranking, conversion, citation, or business result.",
        "The limitation around " + post.title + " matters because " + context.system + " also depends on context, implementation quality, maintenance, and external conditions.",
      ],
    },
    {
      title: "Conclusion for " + post.title,
      paragraphs: [
        "The practical conclusion is to use " + post.title.toLowerCase() + " as a way to reduce ambiguity around " + context.artifact + ".",
        "The next useful paths after " + post.title + " are " + context.serviceLabel + " (" + serviceHref + "), the project archive (" + projectsPath + "), the services index (" + servicesIndex + "), and " + related[0] + ". For a scoped inquiry, use " + contactPath + ".",
      ],
    },
  ];
}

function buildProfessionalSections(locale: Locale, post: BlogPost, relatedTitles: string[]): BlogSection[] {
  const localizedSections = dMediaSectionOverrides[post.slug]?.[locale];
  if (localizedSections) return localizedSections;
  const explicitSections = postSectionOverrides[post.slug];
  if (explicitSections) return explicitSections;
  if (post.sections.length >= 4) return buildDistinctArticleSections(locale, post, relatedTitles);

  const isBg = locale === "bg";
  const context = categoryContext[locale][post.category];
  const serviceHref = isBg ? context.serviceHref : `/en${context.serviceHref}`;
  const articlePath = isBg ? `/blog/${post.slug}/` : `/en/blog/${post.slug}/`;
  const servicesIndex = isBg ? "/services/" : "/en/services/";
  const contactPath = isBg ? "/contact/" : "/en/contact/";
  const projectsPath = isBg ? "/projects/" : "/en/projects/";
  const related = relatedTitles.length ? relatedTitles : [isBg ? "Свързани статии в блога" : "Related articles in the blog"];

  if (!isBg) {
    return [
      {
        title: "Short answer",
        paragraphs: [
          `${post.title} is a practical problem of ${context.system}: the work has to make decisions clearer, reduce operational ambiguity, and remain usable after the first launch. The relevant question is not whether the output looks polished, but whether it can be maintained, explained, measured, and reused without losing direction.`,
          `${post.intro} In production terms, the article treats the topic as an operating layer, not as marketing copy. The goal is to show how a team can move from scattered decisions to a repeatable standard that supports people, search systems, and AI tools at the same time.`,
        ],
      },
      {
        title: "The real problem in production",
        paragraphs: [
          `The failure mode is familiar: ${context.failure}. It usually starts quietly. A page is added, a post is published, a design variant is approved, or a tool is introduced without checking whether it fits the rest of the system. Nothing looks broken on the day it ships, but the accumulated result becomes harder to operate.`,
          `For a business, this means slower decisions, inconsistent public signals, and less trust in the digital layer. For a technical or editorial team, it means every future change starts with interpretation instead of a clear standard. That is why ${post.title.toLowerCase()} should be handled as architecture, not as a one-off task.`,
        ],
      },
      {
        title: "A working model",
        paragraphs: [
          `A useful model starts by defining the role of the topic inside the wider ${context.system}. The work should state what problem it solves, which signals it depends on, how it will be reviewed, and which parts are allowed to change over time.`,
          `The operating artifact is ${context.artifact}. If that artifact is missing, the team can still produce visible output, but it cannot reliably judge whether the output is coherent. The standard has to exist before scale, not after the system has already become noisy.`,
          "The practical test is whether a second person can continue the work without asking for the original intention. If the article, page, visual system, or workflow only works when one person explains it verbally, the system is not yet documented. Engineering-grade content removes that dependency by making the reasoning visible.",
          "This does not mean turning every article into a technical manual. It means making the decision path explicit enough that a reader can understand the constraints, compare alternatives, and see why the recommended approach is more stable than the common shortcut.",
        ],
        bullets: [
          "Define the user problem before choosing the format.",
          "Document the decision criteria before production starts.",
          "Keep examples close to the rules so future changes are easier to review.",
          "Treat metadata, internal links, and structured content as part of the same surface.",
          "Measure whether the result reduces ambiguity, not only whether it is published.",
        ],
      },
      {
        title: "Three scenarios that expose the issue",
        paragraphs: [
          "The quality of a system becomes visible when it is used outside the ideal presentation. The following scenarios are useful because they reveal whether the work can survive real constraints.",
          "They are also good AI-readiness tests: if a person or model cannot extract the main entity, the purpose, the next step, and the evidence from the page, the system is still under-specified.",
        ],
        bullets: [
          `Scenario 1: a new visitor lands directly on ${articlePath} and must understand the topic without seeing the rest of the website.`,
          `Scenario 2: a team member has to produce a related page, post, or asset and needs clear rules instead of taste-based guessing.`,
          `Scenario 3: a search or AI system has to connect this article with ${serviceHref}, ${projectsPath}, and the broader d . media service structure.`,
        ],
      },
      {
        title: "Comparison: weak output versus engineered content",
        paragraphs: [
          "The difference between ordinary content and engineered content is not length. It is the density of decisions. Long text can still be weak if it repeats claims without showing relationships, constraints, and practical consequences.",
          "A stronger article behaves like a system specification written for humans: it answers the question directly, explains the trade-offs, shows what can go wrong, and gives a usable review checklist.",
        ],
        bullets: [
          "Weak: starts with a definition. Strong: starts with the operational problem.",
          "Weak: lists benefits. Strong: explains dependencies and failure modes.",
          "Weak: repeats keywords. Strong: builds topical clarity through examples.",
          "Weak: ends with a generic CTA. Strong: connects the next step to the actual scope.",
          "Weak: can be swapped with any competitor article. Strong: reflects a clear working method.",
        ],
      },
      {
        title: "Good practice checklist",
        paragraphs: [
          `For ${post.title.toLowerCase()}, the practical standard is to make the work inspectable. A reviewer should be able to tell why the decision exists, what it affects, and how it should evolve when the project grows.`,
          "This checklist is intentionally operational. It is meant for teams that need to keep quality stable across content, design, website structure, and AI-readable signals.",
        ],
        bullets: [
          "Start with a concrete user or business problem.",
          "Name the entity, service, page, or workflow being improved.",
          "Separate facts, assumptions, and recommendations.",
          "Use examples that can be tested against real pages or assets.",
          "Add internal links only when they support the reader's next question.",
          "Keep metadata aligned with the actual argument of the article.",
          "Avoid claims that cannot be verified from the project or the work.",
          "Review the article as a system: headline, intro, sections, FAQ, CTA, and related links.",
          "Check whether the article is useful without search traffic.",
          "Update the piece when the service, workflow, or technical architecture changes.",
        ],
      },
      {
        title: "Common mistakes",
        paragraphs: [
          "Most weak articles do not fail because the topic is wrong. They fail because they avoid the difficult part: explaining the decision model. The result is content that sounds correct but does not help a team make better choices.",
          "The most expensive mistakes are the ones that look harmless. A vague article can still rank, but it can also teach the wrong expectation, attract the wrong inquiry, or make the brand look less precise than the work behind it.",
        ],
        bullets: [
          "Writing a broad explanation instead of a useful operating model.",
          "Using examples that are too generic to verify.",
          "Adding length without adding decisions, evidence, or trade-offs.",
          "Ignoring internal links to service pages and related articles.",
          "Treating AI visibility as metadata instead of clarity, structure, and evidence.",
        ],
      },
      {
        title: "How d . media applies this",
        paragraphs: [
          `At d . media, this topic is connected to ${context.serviceLabel} (${serviceHref}) and to the wider service architecture (${servicesIndex}). The work starts with context: what exists now, where the friction is, what should change, and what the output must make easier.`,
          "The implementation is intentionally conservative. We prefer fewer moving parts, clearer editorial standards, and stronger relationships between pages. That protects performance, SEO/GEO, accessibility, and long-term maintainability at the same time.",
          "The same standard is applied to wording, structure, and technical output. A service page should not promise something the process cannot support. A blog article should not create expectations that the actual workflow will not satisfy. A case study should not imply a result that cannot be traced back to a concrete decision.",
          "This is why the next step is always scoped. Sometimes the right action is a full website rebuild. Sometimes it is a smaller correction: a better content model, a clearer navigation path, a stronger service page, or a more disciplined visual system. The point is to fix the cause of the friction instead of producing more surface area.",
        ],
      },
      {
        title: "Internal links for the next question",
        paragraphs: [
          "A good article should not trap the reader on one page. It should make the next useful question obvious and connect it to the right page in the system.",
          "For this topic, the most useful internal paths are the service page, the project archive, the contact route, and the closest related articles.",
        ],
        bullets: [
          `${context.serviceLabel}: ${serviceHref}`,
          `Services index: ${servicesIndex}`,
          `Selected projects: ${projectsPath}`,
          `Project inquiry: ${contactPath}`,
          ...related.slice(0, 5),
        ],
      },
      {
        title: "Conclusion",
        paragraphs: [
          `${post.title} matters because it turns a visible output into a maintainable decision. The work is stronger when it can be explained, reused, reviewed, and connected to the rest of the website without special interpretation.`,
          "If this topic is part of an active project, the next step is not to produce more material immediately. The next step is to define the scope, the constraints, and the standard the work must satisfy. That is where d . media can help: by turning scattered digital decisions into a coherent operating system for the brand.",
          "That is also the difference between content that merely fills a website and content that improves the website as a system. The article should leave the reader with a sharper model, not only with a list of terms. When that happens, SEO, GEO, and AI visibility are not separate tricks. They become natural consequences of clear structure and useful expertise.",
          "A final review should therefore ask three questions. Can a reader act on the article without a sales call? Can an internal team use it as a standard when producing the next page, campaign, asset, or service explanation? Can an AI system extract the entity, problem, recommendation, and next step without guessing? If the answer is yes, the article is doing its job.",
          "The same review should be repeated after publication. Search behaviour changes, AI systems read more context, and a business can change its offer, proof, or production process. An article that once explained the system well can become outdated if the surrounding pages evolve. Engineering-grade publishing treats maintenance as part of quality, not as an optional cleanup task.",
          "That maintenance loop is what keeps the article useful after the first publication cycle.",
        ],
      },
    ];
  }

  return [
    {
      title: "Накратко",
      paragraphs: [
        `${post.title} е практически проблем на ${context.system}: работата трябва да намали неяснотата, да улесни следващите решения и да остане използваема след първото публикуване. Въпросът не е дали резултатът изглежда добре, а дали може да бъде поддържан, обяснен, измерен и повторен без загуба на посока.`,
        `${post.intro} В реална работна среда темата не е SEO текст и не е рекламно обещание. Тя е работен слой: начин екипът да премине от отделни решения към стандарт, който помага едновременно на хора, търсачки и AI системи да разберат какво е важно.`,
      ],
    },
    {
      title: "Реалният проблем в работна среда",
      paragraphs: [
        `Най-честият начин за провал е ясен: ${context.failure}. Това рядко се случва изведнъж. Добавя се страница, публикува се текст, одобрява се визуален вариант или се въвежда инструмент, без да се провери дали решението се вписва в останалата система.`,
        `За бизнеса това означава по-бавни решения, по-разнопосочни публични сигнали и по-малко доверие в дигиталния слой. За екипа означава, че всяка следваща промяна започва с тълкуване вместо с ясен стандарт. Затова темата трябва да се третира като архитектура, а не като еднократна задача.`,
      ],
    },
    {
      title: "Работещ модел",
      paragraphs: [
        `Полезният модел започва с ролята на темата в по-широката ${context.system}. Трябва да е ясно какъв проблем решава, от кои сигнали зависи, как ще се проверява и кои части могат да се променят с времето.`,
        `Работният артефакт е ${context.artifact}. Ако той липсва, екипът може да произвежда видими резултати, но няма надежден критерий дали тези резултати са последователни. Стандартът трябва да съществува преди мащабирането, не след като системата вече е станала шумна.`,
        "Практическият тест е дали втори човек може да продължи работата без да пита каква е била първоначалната идея. Ако статията, страницата, визуалната система или работният процес действат само когато един човек ги обяснява устно, системата още не е документирана достатъчно. Инженерното съдържание премахва тази зависимост, като прави логиката видима.",
        "Това не означава всяка публикация да се превърне в технически наръчник. Означава пътят до решението да бъде достатъчно ясен: какви са ограниченията, какви са алтернативите, защо препоръчаният подход е по-устойчив и как читателят може да приложи принципа в реална среда.",
      ],
      bullets: [
        "Определи реалния потребителски или бизнес проблем преди формата.",
        "Запиши критериите за решение преди производство.",
        "Дръж примерите близо до правилата, за да може следващата редакция да бъде проверима.",
        "Третирай метаданните, вътрешните връзки и структурираното съдържание като част от същата повърхност.",
        "Измервай дали резултатът намалява неяснотата, не само дали е публикуван.",
      ],
    },
    {
      title: "Три сценария, които показват дали системата работи",
      paragraphs: [
        "Качеството на една система се вижда, когато тя се използва извън идеалната презентация. Следните сценарии са полезни, защото показват дали решението издържа на реални ограничения.",
        "Те са и добър тест за готовност към AI системи: ако човек или модел не може да извлече основната тема, ролята, следващата стъпка и доказателствата от страницата, системата още е недоописана.",
      ],
      bullets: [
        `Сценарий 1: нов посетител отваря директно ${articlePath} и трябва да разбере темата без да познава останалия сайт.`,
        `Сценарий 2: член на екипа трябва да произведе свързана страница, публикация или ресурс и има нужда от ясни правила, а не от догадки по вкус.`,
        `Сценарий 3: търсачка или AI система трябва да свърже тази статия с ${serviceHref}, ${projectsPath} и общата структура на услугите на d . media.`,
      ],
    },
    {
      title: "Сравнение: слаб текст срещу инженерна публикация",
      paragraphs: [
        "Разликата между обикновено съдържание и инженерна публикация не е само в дължината. Тя е в плътността на решенията. Дългият текст пак може да бъде слаб, ако повтаря твърдения без зависимости, ограничения и практически последствия.",
        "По-силната статия работи като спецификация, написана за хора: отговаря директно, показва компромиси, обяснява какво може да се счупи и дава контролен списък за проверка.",
      ],
      bullets: [
        "Слабо: започва с речникова дефиниция. Силно: започва с реален работен проблем.",
        "Слабо: изброява ползи. Силно: обяснява зависимости и начини, по които решението може да се провали.",
        "Слабо: повтаря ключови думи. Силно: изгражда тематична яснота чрез примери.",
        "Слабо: завършва с общ призив за действие. Силно: свързва следващата стъпка с реалния обхват.",
        "Слабо: може да бъде заменено с текст на всеки конкурент. Силно: показва конкретен работен метод.",
      ],
    },
    {
      title: "Контролен списък за добра практика",
      paragraphs: [
        `При темата "${post.title}" практическият стандарт е работата да бъде проверима. Редакторът трябва да разбере защо решението съществува, какво засяга и как трябва да се развива при растеж на проекта.`,
        "Този списък е работен, не декоративен. Той е за екипи, които трябва да пазят качество в съдържание, дизайн, структура на сайта и сигнали, четими от AI системи.",
      ],
      bullets: [
        "Започни с конкретен проблем, не с обща тема.",
        "Назови обекта, услугата, страницата или работния процес, който се подобрява.",
        "Раздели фактите, предположенията и препоръките.",
        "Използвай примери, които могат да се проверят спрямо реални страници или ресурси.",
        "Добавяй вътрешни връзки само когато отговарят на следващ логичен въпрос.",
        "Синхронизирай метаданните с реалния аргумент на статията.",
        "Избягвай твърдения, които не могат да бъдат доказани от проекта или работата.",
        "Проверявай статията като система: заглавие, въведение, секции, въпроси и отговори, призив за действие и свързани връзки.",
        "Питай дали текстът е полезен дори без трафик от търсене.",
        "Обновявай публикацията, когато услугата, работният процес или техническата архитектура се променят.",
      ],
    },
    {
      title: "Чести грешки",
      paragraphs: [
        "Повечето слаби статии не се провалят, защото темата е грешна. Провалят се, защото избягват трудната част: модела на вземане на решения. Резултатът е съдържание, което звучи вярно, но не помага на екипа да взема по-добри решения.",
        "Най-скъпите грешки изглеждат безобидно. Неясна статия може да получи трафик, но също така може да научи грешно очакване, да привлече неподходящо запитване или да направи бранда по-неточен от реалната работа зад него.",
      ],
      bullets: [
        "Писане на широко обяснение вместо работещ модел за действие.",
        "Използване на примери, които са твърде общи за проверка.",
        "Увеличаване на дължината без повече решения, доказателства или компромиси.",
        "Пропускане на връзките към страниците с услуги и близки статии.",
        "Третиране на видимостта в AI системи като метаданни, а не като яснота, структура и доказателства.",
      ],
    },
    {
      title: "Как d . media прилага това",
      paragraphs: [
        `В d . media тази тема се свързва с ${context.serviceLabel} (${serviceHref}) и с по-широката структура на услугите (${servicesIndex}). Работата започва от контекст: какво съществува сега, къде има триене, какво трябва да се промени и какво резултатът трябва да улесни.`,
        "Изпълнението е умишлено дисциплинирано. Предпочитаме по-малко движещи се части, по-ясни редакционни стандарти и по-силни връзки между страниците. Това пази скоростта, SEO/GEO, достъпността и дългосрочната поддръжка едновременно.",
        "Същият стандарт се прилага към езика, структурата и техническия резултат. Страница с услуга не трябва да обещава нещо, което процесът не може да поддържа. Блог статия не трябва да създава очакване, което реалният работен процес няма да покрие. Казус не трябва да внушава резултат, който не може да бъде проследен до конкретно решение.",
        "Затова следващата стъпка винаги се определя според обхвата. Понякога правилното действие е цялостна уеб система. Понякога е по-малка корекция: по-добър модел на съдържание, по-ясна навигационна пътека, по-силна страница с услуга или по-дисциплинирана визуална система. Целта е да се поправи причината за триенето, не просто да се произведе още повърхност.",
      ],
    },
    {
      title: "Вътрешни връзки за следващия въпрос",
      paragraphs: [
        "Добрата статия не трябва да затваря читателя в една страница. Тя трябва да направи следващия полезен въпрос очевиден и да го свърже с правилната част от системата.",
        "За тази тема най-полезните вътрешни пътища са страницата с услугата, архивът с проекти, контактната страница и най-близките свързани статии.",
      ],
      bullets: [
        `${context.serviceLabel}: ${serviceHref}`,
        `Всички услуги: ${servicesIndex}`,
        `Подбрани проекти: ${projectsPath}`,
        `Проектно запитване: ${contactPath}`,
        ...related.slice(0, 5),
      ],
    },
    {
      title: "Заключение",
      paragraphs: [
        `${post.title} има значение, защото превръща видимия резултат в поддържано решение. Работата е по-силна, когато може да бъде обяснена, повторена, проверена и свързана с останалия сайт без специално тълкуване.`,
        "Ако тази тема е част от активен проект, следващата стъпка не е веднага да се произведе още материал. Следващата стъпка е да се уточнят обхватът, ограниченията и стандартът, на който работата трябва да отговаря. Точно там d . media може да помогне: да превърне разпилените дигитални решения в последователна работна система за бранда.",
        "Това е и разликата между съдържание, което просто запълва сайт, и съдържание, което подобрява сайта като система. След добра публикация читателят трябва да има по-ясен модел, не само списък с термини. Когато това се случи, SEO, GEO и видимостта в AI системи не са отделни трикове. Те стават естествен резултат от ясна структура и реална експертност.",
        "Финалната проверка трябва да зададе три въпроса. Може ли читателят да действа по статията без търговски разговор? Може ли вътрешен екип да я използва като стандарт при следваща страница, кампания, ресурс или описание на услуга? Може ли AI система да извлече темата, проблема, препоръката и следващата стъпка без догадки? Ако отговорът е да, публикацията върши работа.",
        "Същата проверка трябва да се повтаря и след публикуване. Поведението при търсене се променя, AI системите четат повече контекст, а бизнесът може да промени оферта, доказателства или процес на работа. Статия, която веднъж е обяснявала системата добре, може да остарее, ако околните страници се развият. Инженерното публикуване третира поддръжката като част от качеството, не като незадължително почистване.",
        "Този цикъл на поддръжка пази публикацията полезна и след първия момент на публикуване.",
      ],
    },
  ];
}

function buildProfessionalFaqs(locale: Locale, post: BlogPost) {
  const override =
    dMediaFaqOverrides[post.slug]?.[locale] ??
    (locale === "en" ? dMediaEnglishFaqOverrides[post.slug] : undefined);
  if (override) return override;
  const isBg = locale === "bg";
  const context = categoryContext[locale][post.category];
  const facts = getDistinctiveArticleFacts(post);
  const focus = facts[0] || post.intro;
  const problem = facts[1] || post.excerpt;

  if (!isBg) {
    return [
      {
        question: `What is the main point of "${post.title}"?`,
        answer: focus + " The article treats this point as part of " + context.system + ", with clear criteria, examples, internal links, and review rules.",
      },
      {
        question: "Why can " + post.title.toLowerCase() + " fail in practice?",
        answer: problem + " In practice, the risk appears when " + context.failure + ".",
      },
      {
        question: "What should be checked specifically for " + post.title.toLowerCase() + "?",
        answer: focus + " The review should connect this point with the next step, the relevant service, and evidence that the recommendation is usable.",
      },
      {
        question: "How does " + post.title.toLowerCase() + " connect to " + context.serviceLabel + "?",
        answer: "The article's own focus is: " + focus + " Its relationship to " + context.serviceLabel + " is the practical application of this point.",
      },
      {
        question: "When should " + post.title.toLowerCase() + " be revisited?",
        answer: "Revisit it when the claim — " + post.excerpt + " — is affected by a change in scope, evidence, internal links, or workflow.",
      },
    ];
  }

  return [
    {
      question: `Какъв е основният извод от "${post.title}"?`,
      answer: focus + " Статията разглежда този извод като част от " + context.system + ", с ясни критерии, примери, вътрешни връзки и правила за проверка.",
    },
    {
      question: "Къде може да се обърка " + post.title.toLowerCase() + "?",
      answer: problem + " В практиката това се превръща в риск, когато " + context.failure + ".",
    },
    {
      question: "Какво трябва да се провери конкретно при " + post.title.toLowerCase() + "?",
      answer: focus + " Проверката трябва да свърже този извод със следващата стъпка, релевантната услуга и доказателство, че препоръката може да се използва.",
    },
    {
      question: "Как „" + post.title + "“ се свързва с " + context.serviceLabel + "?",
      answer: "Фокусът на статията е: " + focus + " Връзката с " + context.serviceLabel + " е практическото приложение на този извод.",
    },
    {
      question: "Кога трябва да се прегледа " + post.title.toLowerCase() + "?",
      answer: "Прегледай я, когато твърдението — " + post.excerpt + " — бъде засегнато от промяна в обхвата, доказателствата, вътрешните връзки или работния процес.",
    },
  ];
}

function enhanceBlogPost(locale: Locale, post: BlogPost, posts: readonly BlogPost[]): BlogPost {
  const { relatedPosts, relatedTitles } = getPostRelationships(locale, post, posts);
  const sections = buildProfessionalSections(locale, post, relatedTitles);
  const cta = categoryContext[locale][post.category];
  const isProjectTarget = cta.serviceHref === "/projects";
  const ctaPrimaryHref = locale === "bg" ? cta.serviceHref : `/en${cta.serviceHref}`;
  const ctaSecondaryHref = locale === "bg" ? "/contact" : "/en/contact";
  const enhancedPost = {
    ...post,
    dateModified: "2026-06-28",
    readingTime: calculateReadingTime({
      ...post,
      sections,
    }),
    relatedPosts,
    sections,
    faqs: buildProfessionalFaqs(locale, post),
    relatedLinks: uniqueValues([
      ...post.relatedLinks,
      { href: ctaPrimaryHref, label: cta.serviceLabel },
      { href: locale === "bg" ? "/services" : "/en/services", label: locale === "bg" ? "Всички услуги" : "All services" },
      { href: locale === "bg" ? "/projects" : "/en/projects", label: locale === "bg" ? "Проекти" : "Projects" },
      { href: ctaSecondaryHref, label: locale === "bg" ? "Контакт" : "Contact" },
    ] as BlogLink[]),
    ctaTitle:
      isProjectTarget
        ? locale === "bg" ? "Разгледай свързани проекти." : "Explore related projects."
        : locale === "bg" ? "Разгледай свързаната услуга." : "Explore the related service.",
    ctaText:
      isProjectTarget
        ? locale === "bg"
          ? "Виж как решенията по темата са приложени в реални проекти."
          : "See how solutions related to this topic have been applied in real projects."
        : locale === "bg"
          ? "Виж обхвата на услугата и как тя се отнася към темата на статията."
          : "See the service scope and how it relates to this article's topic.",
    ctaPrimaryLabel: cta.serviceLabel,
    ctaPrimaryHref,
    ctaSecondaryLabel: locale === "bg" ? "Изпрати проектен контекст" : "Send project context",
    ctaSecondaryHref,
  };

  return enhancedPost;
}

const duplicateOrOverlappingBlogSlugs = new Set([
  "kakvo-e-geo-i-zashto-shte-promeni-seo",
  "zashto-100-100-v-pagespeed-ne-garantira-dobar-sait",
  "kade-ai-pomaga-na-dizainera-i-kade-ne-mozhe-da-go-zameni",
]);

const excludedBlogSlugs = new Set([
  "kak-chatgpt-izbira-iztochnitsi",
  "kak-gemini-izbira-iztochnitsi",
  "kak-rabotyat-google-ai-overviews",
  "zashto-izpolzvame-astro",
  "astro-sreshtu-wordpress",
  "zashto-100-100-v-pagespeed-ne-garantira-dobar-sait",
  "vercel-ili-cloudflare-pages-realno-sravnenie",
  "kakvo-vizhda-chatgpt-kogato-analizira-vashiya-biznes",
  "izgrazhdane-na-mnogoezichen-sait-s-astro",
]);

function removeDuplicateOrOverlappingPosts(posts: readonly BlogPost[]) {
  return posts.filter((post) => !duplicateOrOverlappingBlogSlugs.has(post.slug));
}

function removeExcludedBlogPosts(posts: readonly BlogPost[]) {
  return posts.filter((post) => !excludedBlogSlugs.has(post.slug));
}

const bgBlogPosts = removeExcludedBlogPosts(removeDuplicateOrOverlappingPosts([
  ...publishedBgPosts.map(withSectionOverrides),
  ...getAuthorityArticles("bg"),
  ...draftCaseStudies.map(withSectionOverrides),
]));
const enBlogPosts = removeExcludedBlogPosts(removeDuplicateOrOverlappingPosts([...publishedEnPosts, ...getAuthorityArticles("en")]));

const localizedBlogPosts = {
  bg: bgBlogPosts.map((post) => enhanceBlogPost("bg", post, bgBlogPosts)),
  en: enBlogPosts.map((post) => enhanceBlogPost("en", post, enBlogPosts)),
} as const satisfies Record<Locale, readonly BlogPost[]>;

export function getBlogPageCopy(locale: Locale) {
  return blogPageCopy[locale];
}

export function getBlogCategories(locale: Locale) {
  return blogCategories[locale];
}

export function getBlogCategoryLabel(locale: Locale, key: BlogCategoryKey) {
  return blogCategories[locale].find((category) => category.key === key)?.label ?? key;
}

export function getBlogPosts(
  locale: Locale,
  options: {
    includeDrafts?: boolean;
  } = {},
) {
  const { includeDrafts = false } = options;
  const posts = localizedBlogPosts[locale];

  return [...posts]
    .filter((post) => includeDrafts || !post.draft)
    .sort((left, right) => new Date(right.datePublished).getTime() - new Date(left.datePublished).getTime());
}

export function getPublishedBlogPosts(locale: Locale) {
  return getBlogPosts(locale, { includeDrafts: false });
}

export function getDraftBlogPosts(locale: Locale) {
  return getBlogPosts(locale, { includeDrafts: true }).filter((post) => post.draft);
}

export function getBlogPostBySlug(locale: Locale, slug: string, includeDrafts = false) {
  return getBlogPosts(locale, { includeDrafts }).find((post) => post.slug === slug);
}

export function getRelatedBlogPosts(locale: Locale, post: BlogPost) {
  const postsBySlug = new Map(getPublishedBlogPosts(locale).map((item) => [item.slug, item]));
  return post.relatedPosts
    .map((slug) => postsBySlug.get(slug))
    .filter((item): item is BlogPost => Boolean(item));
}

export function getBlogPostUrl(locale: Locale, slug: string) {
  return getAbsolutePageUrl(locale, `/blog/${slug}`);
}

export function getBlogIndexUrl(locale: Locale) {
  return getAbsolutePageUrl(locale, "/blog");
}

export function formatBlogDate(locale: Locale, value: string) {
  return new Intl.DateTimeFormat(locale === "bg" ? "bg-BG" : "en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(value));
}

export function getBlogSocialImage(post?: BlogPost) {
  return post?.ogImage ?? defaultSocialImage.url;
}
