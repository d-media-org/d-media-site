import { defaultLocale, localizeHref, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/page-copy";
import { contactEmail, getSiteContent } from "@/lib/site-content";

export const baseUrl = "https://www.d-media.org";
export const brandName = "d . media";
export const defaultSocialImage = {
  url: `${baseUrl}/social-preview-dmedia-v3.png`,
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
    "@type": "ProfessionalService",
    "@id": organizationId,
    name: brandName,
    url: baseUrl,
    logo: `${baseUrl}/dmedia-apple-touch-v4.png`,
    image: `${baseUrl}/dmedia-apple-touch-v4.png`,
    email: contactEmail,
    contactPoint: {
      "@type": "ContactPoint",
      contactType: locale === "bg" ? "Проектни запитвания" : "Project inquiries",
      email: contactEmail,
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

export function getAlternateLinks(locale: Locale, path: string) {
  return {
    canonical: `${baseUrl}${localizeHref(locale, path)}`,
    bg: `${baseUrl}${localizeHref("bg", path)}`,
    en: `${baseUrl}${localizeHref("en", path)}`,
    xDefault: `${baseUrl}${localizeHref(defaultLocale, path)}`,
  };
}
