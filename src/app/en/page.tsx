import type { Metadata } from "next";

import { HomePage } from "@/app/page";
import { getPageCopy } from "@/lib/page-copy";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  locale: "en",
  title: getPageCopy("en").home.metaTitle,
  description: getPageCopy("en").home.metaDescription,
  path: "/",
});

export const revalidate = 300;

export default async function EnglishHomePage() {
  return HomePage({ locale: "en" });
}
