import { blobAssetManifest } from "@/lib/blob-asset-manifest";
import { type Locale } from "@/lib/i18n";
import { getLegacyMockupCollections, legacyProjectArchive } from "@/lib/legacy-project-archive";
import { getProjectPngArchive, projectPngArchive } from "@/lib/project-png-archive";

const localOptimizedAssets = new Set([
  "/assets/brand/ONLY-logotype.png",
  "/assets/project-covers/support-account.png",
  "/assets/project-covers/support-account-group.png",
]);

export function resolveAssetUrl(pathname: string) {
  if (localOptimizedAssets.has(pathname)) {
    return pathname;
  }

  return blobAssetManifest[pathname] ?? pathname;
}

export const resolvedProjectPngArchive = projectPngArchive.map((project) => ({
  ...project,
  cover: resolveAssetUrl(project.cover),
  images: project.images.map((image) => ({
    ...image,
    src: resolveAssetUrl(image.src),
  })),
}));

export const resolvedLegacyProjectArchive = legacyProjectArchive.map((project) => ({
  ...project,
  cover: resolveAssetUrl(project.cover),
  images: project.images.map((image) => ({
    ...image,
    src: resolveAssetUrl(image.src),
  })),
}));

export const resolvedAllProjectsArchive = [
  ...resolvedProjectPngArchive,
  ...resolvedLegacyProjectArchive,
];

export function getResolvedProjectPngArchive(locale: Locale) {
  return getProjectPngArchive(locale).map((project) => ({
    ...project,
    cover: resolveAssetUrl(project.cover),
    images: project.images.map((image) => ({
      ...image,
      src: resolveAssetUrl(image.src),
    })),
  }));
}

export function getResolvedLegacyMockupCollections(locale: Locale) {
  return getLegacyMockupCollections(locale).map((collection) => ({
    ...collection,
    items: collection.items.map((item) => ({
      ...item,
      src: resolveAssetUrl(item.src),
    })),
  }));
}

export function getResolvedAllProjectsArchive(locale: Locale) {
  return getResolvedProjectPngArchive(locale);
}
