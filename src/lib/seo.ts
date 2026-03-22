import {
  contactEmail,
  contactPhone,
  services,
  socials,
} from "@/lib/site-content";

export const baseUrl = "https://www.d-media.org";

export const siteDescription =
  "d . media създава бранд идентичност, съдържание, уебсайтове, социални формати, графичен дизайн и реклама с ясна система, готова за реална употреба.";

export const siteKeywords = [
  "d . media",
  "бранд идентичност",
  "визуална идентичност",
  "графичен дизайн",
  "уебсайт",
  "уеб дизайн",
  "социални мрежи",
  "създаване на съдържание",
  "реклама",
  "дигитален дизайн",
  "брандбук",
  "София",
];

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: "d . media",
    url: baseUrl,
    email: contactEmail,
    telephone: contactPhone,
    areaServed: "BG",
    address: {
      "@type": "PostalAddress",
      addressLocality: "София",
      addressCountry: "BG",
    },
    sameAs: socials.map((social) => social.href),
    serviceType: services,
    description: siteDescription,
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "d . media",
    url: baseUrl,
    inLanguage: "bg",
    description: siteDescription,
  };
}
