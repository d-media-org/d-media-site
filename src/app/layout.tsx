import type { Metadata } from "next";
import localFont from "next/font/local";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const pantonBlack = localFont({
  src: "../../public/assets/fonts/Panton-Black.ttf",
  variable: "--font-panton-black",
  display: "swap",
});

const pantonBold = localFont({
  src: "../../public/assets/fonts/Panton-Bold.ttf",
  variable: "--font-panton-bold",
  display: "swap",
});

const pantonSemiBold = localFont({
  src: "../../public/assets/fonts/Panton-SemiBold.ttf",
  variable: "--font-panton-semibold",
  display: "swap",
});

const pantonRegular = localFont({
  src: "../../public/assets/fonts/Panton-Regular.ttf",
  variable: "--font-panton-regular",
  display: "swap",
});

const pantonLight = localFont({
  src: "../../public/assets/fonts/Panton-Light.ttf",
  variable: "--font-panton-light",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.d-media.org"),
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
  description:
    "d . media: създаване на бранд идентичност, създаване на съдържание, управление на социални медии, графичен дизайн и реклама.",
  keywords: [
    "d . media",
    "visual design",
    "branding",
    "brand identity",
    "editorial design",
    "digital design",
    "web design",
    "graphic design",
  ],
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: "https://www.d-media.org",
    title: "d . media",
    description:
      "Създаване на бранд идентичност, създаване на съдържание, управление на социални медии, графичен дизайн и реклама.",
    siteName: "d . media",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "d . media",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "d . media",
    description:
      "Създаване на бранд идентичност, създаване на съдържание, управление на социални медии, графичен дизайн и реклама.",
    images: ["/twitter-image.png"],
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bg">
      <body
        className={`${pantonBlack.variable} ${pantonBold.variable} ${pantonSemiBold.variable} ${pantonRegular.variable} ${pantonLight.variable} antialiased`}
      >
        {children}
        <Analytics />
      </body>
    </html>
  );
}
