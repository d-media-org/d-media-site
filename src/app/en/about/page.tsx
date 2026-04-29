import type { Metadata } from "next";

import { AboutPageView } from "@/app/about/page";
import { getPageCopy } from "@/lib/page-copy";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  locale: "en",
  title: getPageCopy("en").about.metaTitle,
  description: getPageCopy("en").about.metaDescription,
  path: "/about",
});

export default function EnglishAboutPage() {
  return <AboutPageView locale="en" />;
}
