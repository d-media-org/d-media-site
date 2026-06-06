import { getResolvedAllProjectsArchive, resolvedAllProjectsArchive } from "@/lib/asset-url";
import type { Locale } from "@/lib/i18n";

export const featuredProjectSlugs = [
  "d-media",
  "yanita",
  "support-account",
  "support-account-group",
  "dj-nedi",
] as const;

export function getFeaturedProjectSlugs() {
  return [...featuredProjectSlugs];
}

export function getFeaturedProjects(locale: Locale = "bg") {
  const archive = getResolvedAllProjectsArchive(locale);
  return featuredProjectSlugs
    .map((slug) => archive.find((project) => project.slug === slug))
    .filter((project): project is (typeof archive)[number] => project !== undefined);
}

export function isKnownProjectSlug(value: string) {
  return resolvedAllProjectsArchive.some((project) => project.slug === value);
}
