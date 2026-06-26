import { defaultLocale, localizeHref, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/page-copy";
import { contactEmail, getSiteContent } from "@/lib/site-content";

export const baseUrl = "https://www.d-media.org";
export const brandName = "d . media";

export function normalizePagePath(path: string) {
  const [pathname, suffix = ""] = path.split(/(?=[?#])/u, 2);

  if (!pathname || pathname === "/") {
    return `/${suffix}`;
  }

  return `${pathname.replace(/\/+$/u, "")}/${suffix}`;
}

export function getAbsolutePageUrl(locale: Locale, path: string) {
  return `${baseUrl}${normalizePagePath(localizeHref(locale, path))}`;
}

export function getAbsolutePathUrl(path: string) {
  return `${baseUrl}${normalizePagePath(path)}`;
}
export const defaultSocialImage = {
  url: `${baseUrl}/social-preview-dmedia-v5.png`,
  width: 1200,
  height: 630,
  alt: brandName,
};

export function getOrganizationSchema(locale: Locale = "bg") {
  const { seo } = getPageCopy(locale);
  const siteContent = getSiteContent(locale);
  const organizationId = `${baseUrl}/#organization`;

  return {
    "@context": "https://schema.org",
    "@type": ["Organization", "ProfessionalService"],
    "@id": organizationId,
    name: brandName,
    alternateName: ["d media", "d-media"],
    url: baseUrl,
    logo: {
      "@type": "ImageObject",
      url: `${baseUrl}/dmedia-search-logo-v6.png`,
      width: 512,
      height: 512,
    },
    image: `${baseUrl}/dmedia-search-logo-v6.png`,
    email: contactEmail,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: locale === "bg" ? "Проектни запитвания" : "Project inquiries",
      email: contactEmail,
      availableLanguage: ["bg", "en"],
    },
    areaServed: {
      "@type": "Country",
      name: "Bulgaria",
    },
    knowsLanguage: ["bg", "en"],
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "bg" ? "София" : "Sofia",
      addressRegion: "Sofia City Province",
      addressCountry: "BG",
    },
    sameAs: siteContent.socials.map((social) => social.href),
    knowsAbout: seo.siteKeywords,
    hasOfferCatalog: {
      "@id": `${getAbsolutePageUrl(locale, "/services")}#catalog`,
    },
    description: seo.siteDescription,
  };
}

export function getWebsiteSchema(locale: Locale = "bg") {
  const { seo } = getPageCopy(locale);

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${baseUrl}/#website`,
    name: brandName,
    alternateName: ["d media", "d-media"],
    url: baseUrl,
    inLanguage: ["bg-BG", "en-US"],
    description: seo.siteDescription,
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
  };
}

export function getWebPageSchema({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}) {
  const url = getAbsolutePageUrl(locale, path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    name: title,
    headline: title,
    description,
    url,
    inLanguage: locale,
    isPartOf: {
      "@id": `${baseUrl}/#website`,
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
  };
}

export function getBreadcrumbSchema({
  locale,
  path,
  title,
}: {
  locale: Locale;
  path: string;
  title: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "bg" ? "Начало" : "Home",
        item: getAbsolutePageUrl(locale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: getAbsolutePageUrl(locale, path),
      },
    ],
  };
}

export function getProjectBreadcrumbSchema({
  locale,
  slug,
  title,
}: {
  locale: Locale;
  slug: string;
  title: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: locale === "bg" ? "Начало" : "Home",
        item: getAbsolutePageUrl(locale, "/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "bg" ? "Проекти" : "Projects",
        item: getAbsolutePageUrl(locale, "/projects"),
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: getAbsolutePageUrl(locale, `/projects/${slug}`),
      },
    ],
  };
}

export function getProjectCreativeWorkSchema({
  locale,
  slug,
  title,
  description,
  image,
  keywords,
}: {
  locale: Locale;
  slug: string;
  title: string;
  description: string;
  image: string;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "@id": `${getAbsolutePageUrl(locale, `/projects/${slug}`)}#creative-work`,
    name: title,
    headline: title,
    description,
    url: getAbsolutePageUrl(locale, `/projects/${slug}`),
    image: {
      "@type": "ImageObject",
      url: image.startsWith("http") ? image : `${baseUrl}${image}`,
    },
    inLanguage: locale,
    keywords,
    creator: {
      "@id": `${baseUrl}/#organization`,
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
    about: keywords,
  };
}

export function getServiceCatalogSchema(locale: Locale = "bg") {
  const siteContent = getSiteContent(locale);

  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    "@id": `${getAbsolutePageUrl(locale, "/services")}#catalog`,
    name: locale === "bg" ? "Услуги на d . media" : "d . media services",
    url: getAbsolutePageUrl(locale, "/services"),
    inLanguage: locale,
    itemListElement: siteContent.coreServices.map((service, index) => ({
      "@type": "Offer",
      position: index + 1,
      itemOffered: {
        "@type": "Service",
        name: service.title,
        description: service.result,
        provider: {
          "@id": `${baseUrl}/#organization`,
        },
        areaServed: {
          "@type": "Country",
          name: "Bulgaria",
        },
        serviceType: service.title,
      },
    })),
  };
}

export function getServicePageSchema({
  locale,
  path,
  title,
  description,
}: {
  locale: Locale;
  path: string;
  title: string;
  description: string;
}) {
  const url = getAbsolutePageUrl(locale, path);

  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${url}#service`,
    name: title,
    description,
    url,
    provider: {
      "@id": `${baseUrl}/#organization`,
    },
    areaServed: {
      "@type": "Country",
      name: "Bulgaria",
    },
    availableChannel: {
      "@type": "ServiceChannel",
      serviceUrl: url,
    },
    serviceType: title,
  };
}

export function getFAQPageSchema({
  locale,
  path,
  faqs,
}: {
  locale: Locale;
  path: string;
  faqs: { question: string; answer: string }[];
}) {
  const url = getAbsolutePageUrl(locale, path);

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}

export function getBlogPostingSchema({
  locale,
  path,
  headline,
  description,
  datePublished,
  dateModified,
  articleSection,
  keywords,
  inLanguage,
  image = defaultSocialImage.url,
}: {
  locale: Locale;
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  dateModified: string;
  articleSection: string;
  keywords: string[];
  inLanguage: string;
  image?: string;
}) {
  const url = getAbsolutePageUrl(locale, path);

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}#blog-post`,
    mainEntityOfPage: url,
    headline,
    description,
    datePublished,
    dateModified,
    articleSection,
    keywords,
    inLanguage,
    image: {
      "@type": "ImageObject",
      url: image,
      width: defaultSocialImage.width,
      height: defaultSocialImage.height,
    },
    author: {
      "@id": `${baseUrl}/#organization`,
      name: brandName,
    },
    publisher: {
      "@id": `${baseUrl}/#organization`,
      name: brandName,
      logo: {
        "@type": "ImageObject",
        url: `${baseUrl}/dmedia-search-logo-v6.png`,
        width: 512,
        height: 512,
      },
    },
  };
}

export function getAlternateLinks(locale: Locale, path: string) {
  return {
    canonical: getAbsolutePageUrl(locale, path),
    bg: getAbsolutePageUrl("bg", path),
    en: getAbsolutePageUrl("en", path),
    xDefault: getAbsolutePageUrl(defaultLocale, path),
  };
}
