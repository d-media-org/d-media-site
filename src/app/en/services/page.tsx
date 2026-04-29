import type { Metadata } from "next";

import { ServicesPageView } from "@/app/services/page";
import { getPageCopy } from "@/lib/page-copy";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  locale: "en",
  title: getPageCopy("en").services.metaTitle,
  description: getPageCopy("en").services.metaDescription,
  path: "/services",
});

export default function EnglishServicesPage() {
  return <ServicesPageView locale="en" />;
}
