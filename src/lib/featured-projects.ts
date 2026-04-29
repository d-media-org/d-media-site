import { get } from "@vercel/edge-config";

import { getResolvedAllProjectsArchive, resolvedAllProjectsArchive } from "@/lib/asset-url";
import type { Locale } from "@/lib/i18n";

const fallbackFeaturedProjectSlugs = [
  "support-account",
  "support-account-group",
  "yanita",
  "dj-nedi",
] as const;

function isKnownProjectSlug(value: string) {
  return resolvedAllProjectsArchive.some((project) => project.slug === value);
}

export async function getFeaturedProjectSlugs() {
  if (!process.env.EDGE_CONFIG) {
    return [...fallbackFeaturedProjectSlugs];
  }

  try {
    const featuredProjectSlugs = await get("featuredProjectSlugs");

    if (!Array.isArray(featuredProjectSlugs)) {
      return [...fallbackFeaturedProjectSlugs];
    }

    const validFeaturedProjectSlugs = featuredProjectSlugs
      .filter((slug): slug is string => typeof slug === "string")
    .filter(isKnownProjectSlug);

    return validFeaturedProjectSlugs.length > 0
      ? validFeaturedProjectSlugs
      : [...fallbackFeaturedProjectSlugs];
  } catch {
    return [...fallbackFeaturedProjectSlugs];
  }
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
