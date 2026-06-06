import { unstable_cache } from "next/cache";

import { getResolvedAllProjectsArchive } from "@/lib/asset-url";
import type { Locale } from "@/lib/i18n";

const fallbackFeaturedProjectSlugs = [
  "support-account",
  "support-account-group",
  "yanita",
  "dj-nedi",
] as const;

const readFeaturedProjectSlugs = unstable_cache(
  async () => {
    return [...fallbackFeaturedProjectSlugs];
  },
  ["featured-project-slugs"],
  { revalidate: 300 }
);

export async function getFeaturedProjectSlugs() {
  return readFeaturedProjectSlugs();
}

export async function getFeaturedProjects(locale: Locale = "bg") {
  const featuredProjectSlugs = await getFeaturedProjectSlugs();
  const archive = getResolvedAllProjectsArchive(locale);
  const featuredProjects = featuredProjectSlugs
    .map((slug) => archive.find((project) => project.slug === slug))
    .filter(
      (project): project is (typeof archive)[number] => project !== undefined,
    );

  return featuredProjects;
}
