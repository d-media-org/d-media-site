import type { Metadata } from "next";

import { PrivacyPageView } from "@/app/privacy/page";
import { getPageCopy } from "@/lib/page-copy";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  locale: "en",
  title: getPageCopy("en").privacy.metaTitle,
  description: getPageCopy("en").privacy.metaDescription,
  path: "/privacy",
});

export default function EnglishPrivacyPage() {
  return <PrivacyPageView locale="en" />;
}
