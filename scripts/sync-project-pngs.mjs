import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const sourceRoot =
  "/Users/m.dragoev/Library/Mobile Documents/com~apple~CloudDocs/d . media/Projects/Brand projects";
const projectOutputRoot = path.resolve("public/assets/project-pngs");
const projectCoverRoot = path.resolve("public/assets/project-covers");
const dataOutputPath = path.resolve("src/lib/project-png-archive.ts");

const featuredConfig = {
  "support-account": {
    priority: 1,
    title: "Support Account",
    summary:
      "Най-завършената identity система в архива: знак, логотип, версии за фон, business card previews и мокъпи, които показват бранда в пълна бизнес среда.",
    context:
      "Проект, в който идентичността работи като цялостна система, а не като единичен знак.",
    focus: [
      "Лого и логотип в оригинални и български варианти",
      "Пълни PNG exports за светъл, тъмен и прозрачен фон",
      "Business card previews и мокъпи като реална употреба",
    ],
  },
  "support-account-group": {
    priority: 2,
    title: "Support Account Group",
    summary:
      "Разширение на основната Support Account логика към групов бранд с ясно logo/logotype приложение и по-корпоративен характер.",
    context:
      "Проектът развива вече съществуваща система в по-структурирана групова марка.",
    focus: [
      "Logo и logotype за чист фон",
      "Връзка със системата на Support Account",
      "Стъпка към по-широка корпоративна архитектура",
    ],
  },
  "aneliart": {
    priority: 3,
    title: "Aneli Art",
    summary:
      "Компактен авторски знак, представен в чист PNG export като директен brand asset.",
    context:
      "Минимален identity проект, в който фокусът е върху разпознаваемия знак.",
    focus: [
      "Изчистен самостоятелен знак",
      "Лек, авторски характер",
      "Подходящ за art-facing присъствие",
    ],
  },
  "yanita": {
    priority: 4,
    title: "Yanita",
    summary:
      "Един от най-богатите клиентски архиви: лого, social covers, profile assets, gift card варианти и service-oriented материали.",
    context:
      "Бранд, преведен от logo решение към реални клиентски и social формати.",
    focus: [
      "Facebook cover и profile PNG assets",
      "Gift card и service visuals",
      "Широк диапазон от ежедневни brand applications",
    ],
  },
  "diana": {
    priority: 5,
    title: "Diana",
    summary:
      "Елегантен identity проект с няколко logo варианта за фон и чист силует на знака.",
    context:
      "Проект с по-тих и по-изчистен визуален език, фокусиран върху формата на логото.",
    focus: [
      "Варианти с и без цвят",
      "Работа за светъл, тъмен и прозрачен фон",
      "Чисто logo-driven присъствие",
    ],
  },
  "mis-18": {
    priority: 6,
    title: "MIS 18",
    summary:
      "Кратък, но ясен logo пакет с mockup приложение и базови PNG exports за употреба.",
    context:
      "Компактен logo проект, фокусиран върху ясна употреба и директна видимост на знака.",
    focus: [
      "Основен logo export",
      "Прозрачен вариант",
      "Mockup приложение за контекст",
    ],
  },
};

function slugify(value) {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-zA-Z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .replace(/-{2,}/g, "-")
    .toLowerCase();
}

function titleizeDirectoryName(name) {
  return name === "AneliArt" ? "Aneli Art" : name;
}

function makeProjectSlug(name, index) {
  const base = slugify(name);
  return base || `project-${String(index + 1).padStart(2, "0")}`;
}

function removeDir(target) {
  fs.rmSync(target, { recursive: true, force: true });
  fs.mkdirSync(target, { recursive: true });
}

function collectPngFiles(dir) {
  return collectImageFiles(dir).filter((file) => file.toLowerCase().endsWith(".png"));
}

function collectImageFiles(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      files.push(...collectPngFiles(fullPath));
      continue;
    }

    if (entry.isFile()) {
      const lowerName = entry.name.toLowerCase();

      if (!lowerName.endsWith(".png") && !lowerName.endsWith(".jpg") && !lowerName.endsWith(".jpeg")) {
        continue;
      }

      if (lowerName.includes("preview")) {
        continue;
      }

      files.push(fullPath);
    }
  }

  return files.sort((a, b) => a.localeCompare(b));
}

function prioritizeImages(files) {
  return [...files].sort((a, b) => {
    const aName = path.basename(a).toLowerCase();
    const bName = path.basename(b).toLowerCase();
    const aIsMockup = aName.includes("mockup");
    const bIsMockup = bName.includes("mockup");

    if (aIsMockup !== bIsMockup) {
      return aIsMockup ? -1 : 1;
    }

    return a.localeCompare(b);
  });
}

function copyOptimizedImage(source, output) {
  fs.mkdirSync(path.dirname(output), { recursive: true });

  const result = spawnSync("sips", ["-Z", "1800", source, "--out", output], {
    stdio: "pipe",
  });

  if (result.status !== 0) {
    fs.copyFileSync(source, output);
  }
}

removeDir(projectOutputRoot);
removeDir(projectCoverRoot);

const projectDirs = fs
  .readdirSync(sourceRoot, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .map((entry) => entry.name)
  .sort((a, b) => a.localeCompare(b));

const archive = [];

for (const [index, dirName] of projectDirs.entries()) {
  const sourceDir = path.join(sourceRoot, dirName);
  const imageFiles = prioritizeImages(collectImageFiles(sourceDir));
  const pngFiles = prioritizeImages(collectPngFiles(sourceDir));

  if (pngFiles.length === 0) {
    continue;
  }

  const slug = makeProjectSlug(dirName, index);
  const title = titleizeDirectoryName(dirName);
  const outputDir = path.join(projectOutputRoot, slug);
  fs.mkdirSync(outputDir, { recursive: true });

  const coverFile = imageFiles[0];
  const coverExtension = path.extname(coverFile).toLowerCase();
  const coverOutputPath = path.join(projectCoverRoot, `${slug}${coverExtension}`);
  copyOptimizedImage(coverFile, coverOutputPath);
  const cover = `/assets/project-covers/${slug}${coverExtension}`;

  const images = pngFiles.map((file, index) => {
    const ext = path.extname(file).toLowerCase();
    const destFileName = `${String(index + 1).padStart(2, "0")}${ext}`;
    const destPath = path.join(outputDir, destFileName);
    copyOptimizedImage(file, destPath);

    const relativeLabel = path.relative(sourceDir, file).replaceAll("\\", "/");

    return {
      src: `/assets/project-pngs/${slug}/${destFileName}`,
      label: relativeLabel,
    };
  });

  const feature = featuredConfig[slug];

  archive.push({
    slug,
    title: feature?.title ?? title,
    imageCount: images.length,
    cover,
    images,
    featured: Boolean(feature),
    priority: feature?.priority ?? 999,
    summary:
      feature?.summary ??
      `${title} е част от архивния PNG слой на d . media с готови logo, application и visual export варианти.`,
    context:
      feature?.context ??
      `Архивен бранд проект с налични PNG exports, подредени като визуална следа за реалната работа по проекта.`,
    focus:
      feature?.focus ??
      [
        "Реални PNG exports от проектната папка",
        "Видими logo и application варианти",
        "Архивна следа за начина на работа и развитие",
      ],
  });
}

archive.sort((a, b) => {
  if (a.priority !== b.priority) {
    return a.priority - b.priority;
  }

  return a.title.localeCompare(b.title);
});

const fileContents = `export const projectPngArchive = ${JSON.stringify(archive, null, 2)} as const;\n\nexport const featuredProjectPngs = projectPngArchive.filter((project) => project.featured);\n`;
fs.writeFileSync(dataOutputPath, fileContents);

console.log(`Synced ${archive.length} projects with PNG files.`);
