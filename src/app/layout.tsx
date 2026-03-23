import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";

import { AnnouncementBar } from "@/components/announcement-bar";
import {
  baseUrl,
  getOrganizationSchema,
  getWebsiteSchema,
  siteDescription,
  siteKeywords,
} from "@/lib/seo";
import { getSiteRuntimeConfig } from "@/lib/site-runtime-config";

import "./globals.css";

const pantonBlack = localFont({
  src: "../../public/assets/fonts/Panton-Black.woff2",
  variable: "--font-panton-black",
  display: "swap",
});

const pantonBold = localFont({
  src: "../../public/assets/fonts/Panton-Bold.woff2",
  variable: "--font-panton-bold",
  display: "swap",
});

const pantonSemiBold = localFont({
  src: "../../public/assets/fonts/Panton-SemiBold.woff2",
  variable: "--font-panton-semibold",
  display: "swap",
});

const pantonRegular = localFont({
  src: "../../public/assets/fonts/Panton-Regular.woff2",
  variable: "--font-panton-regular",
  display: "swap",
});

const pantonLight = localFont({
  src: "../../public/assets/fonts/Panton-Light.woff2",
  variable: "--font-panton-light",
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
  description: siteDescription,
  keywords: siteKeywords,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: baseUrl,
    title: "d . media",
    description: siteDescription,
    siteName: "d . media",
    images: [
      {
        url: "/api/social-preview?v=20260323-7",
        width: 1200,
        height: 630,
        alt: "d . media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "d . media",
    description: siteDescription,
    images: ["/api/social-preview?v=20260323-7"],
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
  const siteRuntimeConfig = await getSiteRuntimeConfig();
  const structuredData = [getOrganizationSchema(), getWebsiteSchema()];

  return (
    <html lang="bg">
      <body
        className={`${pantonBlack.variable} ${pantonBold.variable} ${pantonSemiBold.variable} ${pantonRegular.variable} ${pantonLight.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        {siteRuntimeConfig.announcement ? (
          <AnnouncementBar
            text={siteRuntimeConfig.announcement.text}
            href={siteRuntimeConfig.announcement.href}
          />
        ) : null}
        {children}
        <Analytics />
      </body>
    </html>
  );
}
