import type { Metadata } from "next";

import { ContactPageView } from "@/app/contact/page";
import { getPageCopy } from "@/lib/page-copy";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  locale: "en",
  title: getPageCopy("en").contact.metaTitle,
  description: getPageCopy("en").contact.metaDescription,
  path: "/contact",
});

export default function EnglishContactPage() {
  return <ContactPageView locale="en" />;
}
