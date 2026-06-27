import { execFile } from "node:child_process";
import { mkdir, readdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { promisify } from "node:util";

import sharp from "sharp";

const execFileAsync = promisify(execFile);

const sourceRoot =
  "/Users/m.dragoev/Library/Mobile Documents/com~apple~CloudDocs/d . media/Projects/Main";
const outputRoot = "public/optimized-assets/project-web/main";
const dataPath = "astro/src/lib/main-project-assets.ts";
const pdfPreviewRoot = path.join(outputRoot, ".pdf-preview");

const folderMeta = {
  "AneliArt": { slug: "aneliart", title: "Aneli Art" },
  "Boris Lilov photography": { slug: "boris-lilov-photography", title: "Boris Lilov Photography" },
  "DJ Just MP": { slug: "dj-just-mp", title: "DJ Just MP" },
  "DJ NEDI": { slug: "dj-nedi", title: "DJ NEDI" },
  "Diana": { slug: "diana", title: "Diana" },
  "Elena Skevov MUA": { slug: "elena-skevov-mua", title: "Elena Skevov MUA", isNew: true },
  "Galka nails": { slug: "galka-nails", title: "Galka Nails" },
  "GoSmile": { slug: "gosmile", title: "GO SMILE" },
  "J & V": { slug: "j-v", title: "J & V" },
  "KDJ": { slug: "kdj", title: "KDJ" },
  "MIS 18": { slug: "mis-18", title: "MIS 18" },
  "Monika Hristova": { slug: "monika-hristova", title: "Monika Hristova", isNew: true },
  "PP hairstyle": { slug: "pp-hairstyle", title: "PP Hairstyle" },
  "Photo workshop": { slug: "photo-workshop", title: "Фото работилничка" },
  "Plamena nails": { slug: "plamena-nails", title: "Plamena Nails" },
  "Sport fishing Stoletovo": { slug: "sport-fishing-stoletovo", title: "Спортен риболов Столетово" },
  "Stanulovi's house": { slug: "stanulovi-s-house", title: "Stanulovi's House" },
  "Support Account": { slug: "support-account", title: "Support Account" },
  "Support Account Group": { slug: "support-account-group", title: "Support Account Group" },
  "TANEV car detailng": { slug: "tanev-car-detailing", title: "TANEV Car Detailing" },
  "TS makeup": { slug: "ts-makeup", title: "TS makeup" },
  "Yanita": { slug: "yanita", title: "Yanita" },
  "enduro team STOLETOVO": { slug: "enduro-team-stoletovo", title: "Enduro Team Stoletovo" },
  "makeup by Tsvetomira": { slug: "makeup-by-tsvetomira", title: "Makeup by Tsvetomira" },
  "Сянка от миналото": { slug: "syanka-ot-minaloto", title: "Сянка от миналото" },
  "Тети": { slug: "teti", title: "Тети", isNew: true },
};

const imagePattern = /\.(png|jpe?g)$/i;
const pdfPattern = /\.pdf$/i;

function slugify(input) {
  return input
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 54) || "asset";
}

async function listFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => path.join(directory, entry.name))
    .sort((left, right) => left.localeCompare(right, "bg"));
}

async function makePdfPreview(sourcePath, previewPath) {
  const previewDir = path.dirname(previewPath);
  await rm(previewDir, { force: true, recursive: true });
  await mkdir(previewDir, { recursive: true });
  await execFileAsync("qlmanage", ["-t", "-s", "1800", "-o", previewDir, sourcePath]);
  const generated = path.join(previewDir, `${path.basename(sourcePath)}.png`);
  return generated;
}

async function optimizeImage(sourcePath, outputPath) {
  await sharp(sourcePath, { limitInputPixels: false })
    .rotate()
    .resize({ width: 1800, height: 1800, fit: "inside", withoutEnlargement: true })
    .webp({ quality: 82, alphaQuality: 94, effort: 5 })
    .toFile(outputPath);
}

const additions = {};
const newEntries = [];

await rm(outputRoot, { force: true, recursive: true });
await mkdir(outputRoot, { recursive: true });

for (const [folder, meta] of Object.entries(folderMeta)) {
  const folderPath = path.join(sourceRoot, folder);
  const files = await listFiles(folderPath);
  const webFiles = files.filter((file) => imagePattern.test(file) || pdfPattern.test(file));
  const images = [];

  await mkdir(path.join(outputRoot, meta.slug), { recursive: true });

  for (const [index, sourcePath] of webFiles.entries()) {
    const extension = path.extname(sourcePath);
    const label = path.basename(sourcePath);
    const outputName = `${String(index + 1).padStart(2, "0")}-${slugify(path.basename(sourcePath, extension))}.webp`;
    const outputPath = path.join(outputRoot, meta.slug, outputName);
    let imageSourcePath = sourcePath;

    if (pdfPattern.test(sourcePath)) {
      imageSourcePath = await makePdfPreview(sourcePath, path.join(pdfPreviewRoot, meta.slug, outputName));
    }

    await optimizeImage(imageSourcePath, outputPath);
    images.push({
      src: `/optimized-assets/project-web/main/${meta.slug}/${outputName}`,
      label,
    });
  }

  additions[meta.slug] = images;

  if (meta.isNew) {
    newEntries.push({
      slug: meta.slug,
      title: meta.title,
      imageCount: images.length,
      cover: images[0]?.src ?? "/optimized-assets/brand/ONLY-logotype.lossless.webp",
      images,
      featured: false,
      priority: 999,
      summary: `Проект от основния архив на d . media, добавен с наличните оригинални файлове и приложни материали.`,
      context: `Архивът показва наличните файлове за ${meta.title}, подготвени като леки web изображения за бързо разглеждане в сайта.`,
      focus: [
        "Оригинални файлове от проектната папка",
        "Оптимизирани web версии за сайта",
        "Преглед на наличните приложения и работни материали",
      ],
    });
  }
}

const source = `// Generated by scripts/import-main-project-assets.mjs. Do not edit manually.
export const mainProjectAssetAdditions = ${JSON.stringify(additions, null, 2)} as const;

export const mainProjectArchiveEntries = ${JSON.stringify(newEntries, null, 2)} as const;
`;

await writeFile(dataPath, source);
await rm(pdfPreviewRoot, { force: true, recursive: true });
console.log(`Imported ${Object.values(additions).flat().length} main project assets.`);
