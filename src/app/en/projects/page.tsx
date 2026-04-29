import type { Metadata } from "next";

import { ProjectsPageView } from "@/app/projects/page";
import { getPageCopy } from "@/lib/page-copy";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  locale: "en",
  title: getPageCopy("en").projects.metaTitle,
  description: getPageCopy("en").projects.metaDescription,
  path: "/projects",
});

export default async function EnglishProjectsPage() {
  return ProjectsPageView({ locale: "en" });
}
