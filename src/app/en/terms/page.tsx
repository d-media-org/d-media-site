import type { Metadata } from "next";

import { TermsPageView } from "@/app/terms/page";
import { getPageCopy } from "@/lib/page-copy";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  locale: "en",
  title: getPageCopy("en").terms.metaTitle,
  description: getPageCopy("en").terms.metaDescription,
  path: "/terms",
});

export default function EnglishTermsPage() {
  return <TermsPageView locale="en" />;
}
