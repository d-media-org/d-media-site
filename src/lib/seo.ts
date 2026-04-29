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
  url: `${baseUrl}/api/social-preview?v=20260419-1`,
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

  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: brandName,
    url: baseUrl,
    logo: `${baseUrl}/dmedia-apple-touch-v4.png`,
    image: `${baseUrl}/dmedia-apple-touch-v4.png`,
    email: contactEmail,
    telephone: contactPhone,
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
    name: brandName,
    url: baseUrl,
    inLanguage: locale,
    description: seo.siteDescription,
    publisher: {
      "@type": "Organization",
      name: brandName,
      url: baseUrl,
    },
  };
}
