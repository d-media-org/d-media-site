import type { Metadata } from "next";

import {
  CaseStudyPageView,
  generateCaseStudyMetadata,
  generateStaticParams,
} from "@/app/projects/[slug]/page";

type EnglishCaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export { generateStaticParams };

export async function generateMetadata({
  params,
}: EnglishCaseStudyPageProps): Promise<Metadata> {
  return generateCaseStudyMetadata("en", { params });
}

export default async function EnglishCaseStudyPage({
  params,
}: EnglishCaseStudyPageProps) {
  return CaseStudyPageView({ params, locale: "en" });
}
