import { blobAssetManifest } from "@/lib/blob-asset-manifest";
import { projectPngArchive } from "@/lib/project-png-archive";

export function resolveAssetUrl(pathname: string) {
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
