import { get } from "@vercel/edge-config";

import { resolvedProjectPngArchive } from "@/lib/asset-url";

const fallbackFeaturedProjectSlugs = [
  "support-account",
  "support-account-group",
  "yanita",
] as const;

function isKnownProjectSlug(value: string) {
  return resolvedProjectPngArchive.some((project) => project.slug === value);
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

export async function getFeaturedProjects() {
  const featuredProjectSlugs = await getFeaturedProjectSlugs();
  const featuredProjects = featuredProjectSlugs
    .map((slug) => resolvedProjectPngArchive.find((project) => project.slug === slug))
    .filter(
      (project): project is (typeof resolvedProjectPngArchive)[number] => project !== undefined,
    );

  return featuredProjects;
}
