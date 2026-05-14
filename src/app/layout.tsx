import type { Metadata } from "next";
import { headers } from "next/headers";
import localFont from "next/font/local";
import Script from "next/script";

import { AnnouncementBar } from "@/components/announcement-bar";
import { DeferredConsentBanner } from "@/components/deferred-consent-banner";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { normalizeLocale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/page-copy";
import {
  baseUrl,
  brandName,
  defaultSocialImage,
  getOrganizationSchema,
  getWebsiteSchema,
} from "@/lib/seo";
import { getSiteRuntimeConfig } from "@/lib/site-runtime-config";

import "./globals.css";

const pantonRegular = localFont({
  src: "../../public/fonts/panton/Panton-Regular.otf",
  variable: "--font-panton-regular-file",
  display: "swap",
});

const pantonSemiBold = localFont({
  src: "../../public/fonts/panton/Panton-SemiBold.otf",
  variable: "--font-panton-semibold-file",
  display: "swap",
});

const pantonBlack = localFont({
  src: "../../public/fonts/panton/Panton-Black.otf",
  variable: "--font-panton-black-file",
  display: "swap",
  preload: false,
});

const pantonLight = localFont({
  src: "../../public/fonts/panton/Panton-Light.otf",
  variable: "--font-panton-light-file",
  display: "swap",
  preload: false,
});

const pantonBold = localFont({
  src: "../../public/fonts/panton/Panton-Bold.otf",
  variable: "--font-panton-bold-file",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  icons: {
    icon: [
      { url: "/dmedia-favicon-v4-16.png", sizes: "16x16", type: "image/png" },
      { url: "/dmedia-favicon-v4-32.png", sizes: "32x32", type: "image/png" },
      { url: "/dmedia-favicon-v4.ico", sizes: "64x64", type: "image/x-icon" },
    ],
    shortcut: ["/dmedia-favicon-v4.ico"],
    apple: [{ url: "/dmedia-apple-touch-v4.png", sizes: "180x180", type: "image/png" }],
  },
  title: {
    default: "d . media",
    template: "%s | d . media",
  },
  description: getPageCopy("bg").seo.siteDescription,
  keywords: Array.from(getPageCopy("bg").seo.siteKeywords),
  alternates: {
    canonical: "/",
    languages: {
      bg: `${baseUrl}/`,
      en: `${baseUrl}/en`,
      "x-default": `${baseUrl}/`,
    },
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: baseUrl,
    title: brandName,
    description: getPageCopy("bg").seo.siteDescription,
    siteName: brandName,
    images: [defaultSocialImage],
  },
  twitter: {
    card: "summary_large_image",
    title: brandName,
    description: getPageCopy("bg").seo.siteDescription,
    images: [defaultSocialImage.url],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || undefined,
  },
  category: "design",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = normalizeLocale(requestHeaders.get("x-d-media-locale"));
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const siteRuntimeConfig = await getSiteRuntimeConfig();
  const structuredData = [
    { id: "organization-schema", value: getOrganizationSchema(locale) },
    { id: "website-schema", value: getWebsiteSchema(locale) },
  ];

  return (
    <html lang={locale} suppressHydrationWarning>
      <head />
      <body
        className={`${pantonRegular.variable} ${pantonSemiBold.variable} ${pantonBlack.variable} ${pantonLight.variable} ${pantonBold.variable} antialiased`}
      >
        <Script id="theme-sync" strategy="beforeInteractive">
          {`(() => {
            const root = document.documentElement;
            const media = window.matchMedia("(prefers-color-scheme: dark)");
            const STORAGE_KEY = "d-media-theme-mode";
            const userAgent = window.navigator.userAgent || "";
            const isEmbeddedIos =
              /iPhone|iPad|iPod/i.test(userAgent) &&
              /(FBAN|FBAV|FB_IAB|Messenger|Instagram)/i.test(userAgent);

            const getStoredMode = () => {
              try {
                return window.localStorage.getItem(STORAGE_KEY) || "auto";
              } catch {
                return "auto";
              }
            };

            const applyTheme = () => {
              const mode = getStoredMode();
              const resolvedTheme = mode === "auto"
                ? (media.matches ? "dark" : "light")
                : mode;
              root.dataset.themeMode = mode;
              root.dataset.theme = resolvedTheme;
              root.dataset.embeddedIos = isEmbeddedIos ? "true" : "false";
              root.lang = window.location.pathname === "/en" || window.location.pathname.startsWith("/en/")
                ? "en"
                : "bg";
            };
            applyTheme();

            if (!isEmbeddedIos) {
              if (typeof media.addEventListener === "function") {
                media.addEventListener("change", applyTheme);
              } else if (typeof media.addListener === "function") {
                media.addListener(applyTheme);
              }
            }
          })();`}
        </Script>
        {googleAnalyticsId ? (
          <Script id="google-consent-default" strategy="beforeInteractive">
            {`let storedConsent = null;
try {
  storedConsent = window.localStorage.getItem('d-media-consent');
} catch {}
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
if (storedConsent === 'accepted') {
  gtag('consent', 'default', {
    analytics_storage: 'granted',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  });
} else {
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  });
}`}
          </Script>
        ) : null}
        {structuredData.map((item) => (
          <script
            key={item.id}
            id={item.id}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(item.value) }}
          />
        ))}
        {siteRuntimeConfig.announcement ? (
          <AnnouncementBar
            text={siteRuntimeConfig.announcement.text}
            href={siteRuntimeConfig.announcement.href}
          />
        ) : null}
        <SiteHeader />
        {children}
        <SiteFooter />
        <DeferredConsentBanner />
      </body>
    </html>
  );
}
