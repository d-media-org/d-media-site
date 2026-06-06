import { generatedWebAssetManifest } from "@/lib/generated-web-asset-manifest";
import { type Locale } from "@/lib/i18n";
import { getLegacyMockupCollections, legacyProjectArchive } from "@/lib/legacy-project-archive";
import { getProjectPngArchive, projectPngArchive } from "@/lib/project-png-archive";

const localOptimizedAssets: Record<string, string> = {
  "/assets/brand/ONLY-brandmark.png": "/optimized-assets/brand/ONLY-brandmark.lossless.webp",
  "/assets/brand/ONLY-logotype.png": "/optimized-assets/brand/ONLY-logotype.lossless.webp",
};

export function resolveAssetUrl(pathname: string) {
  if (localOptimizedAssets[pathname]) {
    return localOptimizedAssets[pathname];
  }

  if (generatedWebAssetManifest[pathname]) {
    return generatedWebAssetManifest[pathname];
  }

  return pathname;
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
