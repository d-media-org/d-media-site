import type { Metadata } from "next";

import {
  contactEmail,
  contactPhone,
} from "@/lib/site-content";
import { defaultLocale, localizeHref, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/page-copy";
import { getSiteContent } from "@/lib/site-content";

export const baseUrl = "https://www.d-media.org";
export const brandName = "d . media";
export const defaultSocialImage = {
  url: `${baseUrl}/social-preview-dmedia-v2.png`,
  width: 1200,
  height: 630,
  alt: brandName,
};

type PageMetadataInput = {
  locale: Locale;
  title: string;
  description: string;
  path: string;
  images?: Array<{
    url: string;
    width?: number;
    height?: number;
    alt?: string;
  }>;
};

export function getPageMetadata({
  locale,
  title,
  description,
  path,
  images = [defaultSocialImage],
}: PageMetadataInput): Metadata {
  const localizedPath = localizeHref(locale, path);
  const { seo } = getPageCopy(locale);

  return {
    title,
    description,
    keywords: Array.from(seo.siteKeywords),
    alternates: {
      canonical: localizedPath,
      languages: {
        bg: `${baseUrl}${localizeHref("bg", path)}`,
        en: `${baseUrl}${localizeHref("en", path)}`,
        "x-default": `${baseUrl}${localizeHref(defaultLocale, path)}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "bg" ? "bg_BG" : "en_US",
      url: `${baseUrl}${localizedPath}`,
      title: `${title} | ${brandName}`,
      description,
      siteName: brandName,
      images,
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | ${brandName}`,
      description,
      images: images.map((image) => image.url),
    },
  };
}

export function getOrganizationSchema(locale: Locale = "bg") {
  const { seo } = getPageCopy(locale);
  const siteContent = getSiteContent(locale);
  const organizationId = `${baseUrl}/#organization`;

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": organizationId,
    name: brandName,
    url: baseUrl,
    logo: `${baseUrl}/dmedia-apple-touch-v4.png`,
    image: `${baseUrl}/dmedia-apple-touch-v4.png`,
    email: contactEmail,
    telephone: contactPhone,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: locale === "bg" ? "Проектни запитвания" : "Project inquiries",
      email: contactEmail,
      telephone: contactPhone,
      availableLanguage: ["bg", "en"],
    },
    areaServed: "BG",
    availableLanguage: locale,
    address: {
      "@type": "PostalAddress",
      addressLocality: "София",
      addressRegion: "Sofia City Province",
      addressCountry: "BG",
    },
    sameAs: siteContent.socials.map((social) => social.href),
    serviceType: siteContent.coreServices.map((service) => service.title),
    knowsAbout: seo.siteKeywords,
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
    url: baseUrl,
    inLanguage: locale,
    description: seo.siteDescription,
    publisher: {
      "@id": `${baseUrl}/#organization`,
    },
  };
}

export function getServiceCatalogSchema(locale: Locale = "bg") {
  const siteContent = getSiteContent(locale);

  return {
    "@context": "https://schema.org",
    "@type": "OfferCatalog",
    name: locale === "bg" ? "Услуги на d . media" : "d . media services",
    url: `${baseUrl}${localizeHref(locale, "/services")}`,
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

export function getFaqSchema(locale: Locale = "bg") {
  const isBg = locale === "bg";

  const questions = isBg
    ? [
        {
          name: "Какво прави d . media?",
          text: "d . media създава бранд идентичност, съдържание, графичен дизайн и реклама като една работеща система за реално приложение.",
        },
        {
          name: "За кого работи d . media?",
          text: "Работим с бизнеси и брандове, които имат нужда от ясен облик, подредена комуникация и материали за реална употреба.",
        },
        {
          name: "Къде е базирано студиото?",
          text: "d . media е студио, базирано в София, България, с работа по проекти за дигитални и печатни среди.",
        },
        {
          name: "Как започва един проект?",
          text: "Проектът започва с кратък контекст, нужда, срок и налични материали. След това подреждаме обхват, цена и следваща стъпка.",
        },
      ]
    : [
        {
          name: "What does d . media do?",
          text: "d . media creates brand identity, content, graphic design, and advertising as one working system for real application.",
        },
        {
          name: "Who does d . media work with?",
          text: "We work with businesses and brands that need a clear presence, ordered communication, and materials ready for real use.",
        },
        {
          name: "Where is the studio based?",
          text: "d . media is a studio based in Sofia, Bulgaria, working across digital and print environments.",
        },
        {
          name: "How does a project start?",
          text: "A project starts with short context, the need, timing, and available materials. We then align scope, pricing, and the next step.",
        },
      ];

  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    inLanguage: locale,
    mainEntity: questions.map((question) => ({
      "@type": "Question",
      name: question.name,
      acceptedAnswer: {
        "@type": "Answer",
        text: question.text,
      },
    })),
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
    "@id": `${baseUrl}${localizeHref(locale, `/projects/${slug}`)}#creative-work`,
    name: title,
    headline: title,
    description,
    url: `${baseUrl}${localizeHref(locale, `/projects/${slug}`)}`,
    image: {
      "@type": "ImageObject",
      url: image,
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
        item: `${baseUrl}${localizeHref(locale, "/")}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: locale === "bg" ? "Проекти" : "Projects",
        item: `${baseUrl}${localizeHref(locale, "/projects")}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: title,
        item: `${baseUrl}${localizeHref(locale, `/projects/${slug}`)}`,
      },
    ],
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
        item: `${baseUrl}${localizeHref(locale, "/")}`,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: title,
        item: `${baseUrl}${localizeHref(locale, path)}`,
      },
    ],
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
  const url = `${baseUrl}${localizeHref(locale, path)}`;

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
