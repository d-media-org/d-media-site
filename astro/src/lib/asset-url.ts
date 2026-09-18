import { generatedWebAssetManifest } from "@/lib/generated-web-asset-manifest";
import { type Locale } from "@/lib/i18n";
import { getLegacyMockupCollections, legacyProjectArchive } from "@/lib/legacy-project-archive";
import { getProjectPngArchive, projectPngArchive } from "@/lib/project-png-archive";

const localOptimizedAssets: Record<string, string> = {
  "/assets/brand/ONLY-brandmark.png": "/optimized-assets/brand/ONLY-brandmark.lossless.webp",
  "/assets/brand/ONLY-logotype.png": "/optimized-assets/brand/ONLY-logotype.lossless.webp",
  "/assets/project-pngs/j-v/03.png": "/optimized-assets/project-web/j-v-03.webp",
  "/assets/project-pngs/j-v/04.png": "/optimized-assets/project-web/j-v-04.webp",
  "/assets/project-pngs/j-v/05.png": "/optimized-assets/project-web/j-v-05.webp",
};

export const preferredProjectPrimaryImages: Record<string, string> = {
  "apple-community-bulgaria": "/assets/projects/apple-community-bulgaria/community-logotype-transparent.png",
  "d-media": "/optimized-assets/brand/ONLY-logotype.lossless.webp",
  yanita: "/optimized-assets/project-web/main/yanita/04-yanita-logo-original-transparent.webp",
  "support-account": "/optimized-assets/project-web/main/support-account/03-support-account-logo-transparent.webp",
  "support-account-group": "/optimized-assets/project-web/main/support-account-group/05-support-account-group-transparent.webp",
  aneliart: "/optimized-assets/project-web/main/aneliart/03-aneliart-logo-transparent.webp",
  "boris-lilov-photography": "/optimized-assets/project-web/main/boris-lilov-photography/03-boris-lilov-photography-logo-logotype-transperent.webp",
  diana: "/optimized-assets/project-web/main/diana/02-diana-logo-original-transparent.webp",
  "dj-nedi": "/optimized-assets/project-web/main/dj-nedi/01-dj-nedi-logo-black-transparent.webp",
  "dj-just-mp": "/optimized-assets/project-web/main/dj-just-mp/02-dj-just-mp-logo-original-transparent.webp",
  "enduro-team-stoletovo": "/optimized-assets/project-web/main/enduro-team-stoletovo/01-enduro-team-stoletovo-transperent.webp",
  "galka-nails": "/optimized-assets/project-web/main/galka-nails/01-galka-s-nails-transperent.webp",
  gosmile: "/optimized-assets/project-web/main/gosmile/01-go-smile-black.webp",
  "j-v": "/optimized-assets/project-web/main/j-v/02-j-v.webp",
  "makeup-by-tsvetomira": "/optimized-assets/project-web/main/makeup-by-tsvetomira/01-make-up-by-tsvetomira-work-logo-transperent.webp",
  "mis-18": "/optimized-assets/project-web/main/mis-18/02-mis-18-logo-transperent.webp",
  "photo-workshop": "/optimized-assets/project-web/main/photo-workshop/01-photo-workshop-color-transparent-logo.webp",
  "plamena-nails": "/optimized-assets/project-web/main/plamena-nails/01-plamena-nails-logo-grey-transperent.webp",
  "pp-hairstyle": "/optimized-assets/project-web/main/pp-hairstyle/01-pp-hairstyle-logo-transperent.webp",
  "sport-fishing-stoletovo": "/optimized-assets/project-web/main/sport-fishing-stoletovo/04-sfs-orignal-transperent.webp",
  "stanulovi-s-house": "/optimized-assets/project-web/main/stanulovi-s-house/01-stanulovi-01-01.webp",
  "ts-makeup": "/optimized-assets/project-web/main/ts-makeup/01-ts-makeup-logo-lasercut-trasperent.webp",
  kdj: "/optimized-assets/project-web/main/kdj/02-kdj-logo-electric-green-transperent.webp",
  "tanev-car-detailing": "/optimized-assets/project-web/main/tanev-car-detailing/03-tanev-cds-logo-transparent.webp",
  "syanka-ot-minaloto": "/optimized-assets/project-web/main/syanka-ot-minaloto/09-logo-no-txt-white-background.webp",
};

const visualDuplicateGalleryImagesByProject: Record<string, Set<string>> = {
  aneliart: new Set(["/optimized-assets/project-web/main/aneliart/03-aneliart-logo-transparent.webp"]),
  "boris-lilov-photography": new Set([
    "/optimized-assets/project-web/main/boris-lilov-photography/03-boris-lilov-photography-logo-logotype-transperent.webp",
  ]),
  diana: new Set(["/optimized-assets/project-web/main/diana/02-diana-logo-original-transparent.webp"]),
  "dj-just-mp": new Set(["/optimized-assets/project-web/main/dj-just-mp/02-dj-just-mp-logo-original-transparent.webp"]),
  "dj-nedi": new Set(["/optimized-assets/project-web/main/dj-nedi/01-dj-nedi-logo-black-transparent.webp"]),
  "enduro-team-stoletovo": new Set([
    "/optimized-assets/project-web/main/enduro-team-stoletovo/01-enduro-team-stoletovo-transperent.webp",
  ]),
  "galka-nails": new Set(["/optimized-assets/project-web/main/galka-nails/01-galka-s-nails-transperent.webp"]),
  gosmile: new Set(["/optimized-assets/project-web/main/gosmile/01-go-smile-black.webp"]),
  "j-v": new Set(["/optimized-assets/project-web/main/j-v/02-j-v.webp"]),
  kdj: new Set(["/optimized-assets/project-web/main/kdj/02-kdj-logo-electric-green-transperent.webp"]),
  "makeup-by-tsvetomira": new Set([
    "/optimized-assets/project-web/main/makeup-by-tsvetomira/01-make-up-by-tsvetomira-work-logo-transperent.webp",
  ]),
  "mis-18": new Set(["/optimized-assets/project-web/main/mis-18/02-mis-18-logo-transperent.webp"]),
  "photo-workshop": new Set([
    "/optimized-assets/project-web/main/photo-workshop/01-photo-workshop-color-transparent-logo.webp",
  ]),
  "plamena-nails": new Set(["/optimized-assets/project-web/main/plamena-nails/01-plamena-nails-logo-grey-transperent.webp"]),
  "pp-hairstyle": new Set(["/optimized-assets/project-web/main/pp-hairstyle/01-pp-hairstyle-logo-transperent.webp"]),
  "sport-fishing-stoletovo": new Set([
    "/optimized-assets/project-web/main/sport-fishing-stoletovo/04-sfs-orignal-transperent.webp",
  ]),
  "stanulovi-s-house": new Set(["/optimized-assets/project-web/main/stanulovi-s-house/01-stanulovi-01-01.webp"]),
  "support-account": new Set([
    "/optimized-assets/project-web/main/support-account/02-support-account-logo-mockup.webp",
    "/optimized-assets/project-web/main/support-account/05-support-account-logotype-mockup.webp",
    "/optimized-assets/project-web/main/support-account/07-support-account-logotype-transparent-original.webp",
  ]),
  "support-account-group": new Set([
    "/optimized-assets/project-web/main/support-account-group/04-support-account-group-logotype-transparent.webp",
  ]),
  "syanka-ot-minaloto": new Set([
    "/optimized-assets/project-web/main/syanka-ot-minaloto/09-logo-no-txt-white-background.webp",
  ]),
  "tanev-car-detailing": new Set([
    "/optimized-assets/project-web/main/tanev-car-detailing/03-tanev-cds-logo-transparent.webp",
  ]),
  "ts-makeup": new Set(["/optimized-assets/project-web/main/ts-makeup/01-ts-makeup-logo-lasercut-trasperent.webp"]),
  yanita: new Set(["/optimized-assets/project-web/main/yanita/04-yanita-logo-original-transparent.webp"]),
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

export function resolveProjectPrimaryImage(slug: string, fallback: string) {
  return resolveAssetUrl(preferredProjectPrimaryImages[slug] ?? fallback);
}

function resolveProjectImages(project: { slug: string; cover: string; images: { src: string }[] }) {
  const cover = resolveProjectPrimaryImage(project.slug, project.cover);
  const visualDuplicates = visualDuplicateGalleryImagesByProject[project.slug] ?? new Set<string>();
  const seen = new Set<string>();

  return project.images
    .map((image) => ({
      ...image,
      src: resolveAssetUrl(image.src),
    }))
    .filter((image) => {
      if (image.src === cover || visualDuplicates.has(image.src) || seen.has(image.src)) {
        return false;
      }

      seen.add(image.src);
      return true;
    });
}

export const resolvedProjectPngArchive = projectPngArchive.map((project) => ({
  ...project,
  cover: resolveProjectPrimaryImage(project.slug, project.cover),
  images: resolveProjectImages(project),
  imageCount: resolveProjectImages(project).length,
  ...("videos" in project
    ? {
        videos: project.videos.map((video) => ({
          ...video,
          poster: resolveAssetUrl(video.poster),
        })),
      }
    : {}),
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
    cover: resolveProjectPrimaryImage(project.slug, project.cover),
    images: resolveProjectImages(project),
    imageCount: resolveProjectImages(project).length,
    ...("videos" in project
      ? {
          videos: project.videos.map((video) => ({
            ...video,
            poster: resolveAssetUrl(video.poster),
          })),
        }
      : {}),
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
