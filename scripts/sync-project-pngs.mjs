import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";

const sourceRoot =
  "/Users/m.dragoev/Library/Mobile Documents/com~apple~CloudDocs/d . media/Projects/Brand projects";
const projectOutputRoot = path.resolve("public/assets/project-pngs");
const projectCoverRoot = path.resolve("public/assets/project-covers");
const dataOutputPath = path.resolve("src/lib/project-png-archive.ts");
const excludedDirectories = new Set(["салон за красота Нюанси - файлове"]);
const fixedSlugByDirectory = {
  "Сянка от миналото": "syanka-ot-minaloto",
};
const excludedFileNames = new Set(["yanita gift card copy.png"]);

const featuredConfig = {
  "support-account": {
    priority: 1,
    title: "Support Account",
    summary:
      "Отделна identity система за счетоводна и payroll дейност, развита през знак, логотип и приложения за различни работни среди.",
    context:
      "Самостоятелен бранд, изграден като ясна визуална система за бизнес комуникация.",
    focus: [
      "Лого и логотип в оригинални и български версии",
      "Варианти за светъл, тъмен и прозрачен фон",
      "Мокъпи и приложни визии за реален business контекст",
    ],
  },
  "support-account-group": {
    priority: 2,
    title: "Support Account Group",
    summary:
      "Отделен бранд към същото юридическо лице, с по-корпоративен характер и по-структурирано logo / logotype присъствие.",
    context:
      "Самостоятелна марка с близка бизнес логика, развита в по-строга корпоративна посока.",
    focus: [
      "Чисти logo и logotype решения за корпоративна употреба",
      "Визуална връзка с Support Account без смесване на марките",
      "Мокъп ориентиран cover за по-силен business-first прочит",
    ],
  },
  "aneliart": {
    title: "Aneli Art",
    summary:
      "Компактен авторски знак с минималистично присъствие и директна разпознаваемост.",
    context:
      "Лек авторски identity проект, концентриран около един самостоятелен знак.",
    focus: [
      "Изчистен самостоятелен знак",
      "Минимален визуален шум",
      "Подходящ за артистично и авторско позициониране",
    ],
  },
  "yanita": {
    priority: 3,
    title: "Yanita",
    summary:
      "Салонен бранд с богат приложен архив: covers, profile assets и gift card формати, подготвени за ежедневна употреба.",
    context:
      "Identity проект за салон за красота, развит в реални клиентски и social формати.",
    focus: [
      "Facebook covers и profile assets",
      "Gift card и service-oriented материали",
      "Превод на идентичността към ежедневно client-facing приложение",
    ],
  },
  "diana": {
    title: "Diana",
    summary:
      "Елегантен identity проект за хендмейд украса за празненства, изграден чрез чист силует и гъвкави logo варианти.",
    context:
      "Бранд с по-тих и декоративен визуален език, фокусиран върху формата на логото.",
    focus: [
      "Варианти с и без цвят",
      "Версии за различни фонове",
      "По-деликатно logo-driven присъствие",
    ],
  },
  "mis-18": {
    title: "MIS 18",
    summary:
      "Бранд за митническа агенция с logo пакет, mockup приложение и по-широко дигитално присъствие, включително сайт на d . media.",
    context:
      "Identity проект за административна и логистична среда, където знакът трябва да стои директно и уверено.",
    focus: [
      "Основен logo export",
      "Прозрачен вариант за дигитална употреба",
      "Mockup контекст и връзка със site implementation",
    ],
  },
  "boris-lilov-photography": {
    title: "Boris Lilov Photography",
    summary:
      "Фотографски бранд с пълен набор logo, logotype и комбинирани варианти за различни фонове и промоционална употреба.",
    context:
      "Проект за фотографско позициониране, изграден върху чиста типографска тежест и ясни identity lockups.",
    focus: [
      "Logo, logotype и комбинирани варианти",
      "Черни, бели и прозрачни версии",
      "Mockup контекст за по-реален прочит на идентичността",
    ],
  },
  "gosmile": {
    title: "GO SMILE",
    summary:
      "Компактен brand пакет за избелващ продукт за зъби, развит в чисти monochrome logo варианти.",
    context:
      "Продуктов бранд, при който директното име и ясната четимост са водещи.",
    focus: [
      "Черна и бяла logo версия",
      "Чисто продуктово позициониране",
      "Минимална и лесно приложима визуална система",
    ],
  },
  "j-v": {
    title: "J & V",
    summary:
      "Бранд за дрехи с ясно fashion-oriented присъствие, комбиниращ logo варианти и mockup ориентиран архив.",
    context:
      "Идентичност за clothing label, развита през по-стилен и редакционен визуален тон.",
    focus: [
      "Основни logo варианти",
      "Mockup контекст за по-реална маркова среда",
      "По-моден и чист brand характер",
    ],
  },
  "makeup-by-tsvetomira": {
    title: "Makeup by Tsvetomira",
    summary:
      "По-ранният етап на бранд на гримьорка, който по-късно се развива към TS makeup.",
    context:
      "Ранна identity посока, в която се вижда преходът към по-ясна и по-завършена beauty марка.",
    focus: [
      "Първоначален logo asset",
      "Връзка с по-късната еволюция към TS makeup",
      "Beauty-oriented начална визуална рамка",
    ],
  },
  "ts-makeup": {
    title: "TS makeup",
    summary:
      "По-завършената еволюция на Makeup by Tsvetomira, развита в по-изчистена beauty identity система.",
    context:
      "Продължение на вече съществуващ бранд, преработен в по-събран и по-разпознаваем знак.",
    focus: [
      "Няколко logo варианта",
      "Версии за фон и специални приложения",
      "По-зрял beauty-oriented визуален език",
    ],
  },
  "syanka-ot-minaloto": {
    title: "Сянка от миналото",
    summary:
      "Визуална идентичност за YouTube канал, развит в ко-продукционен контекст с d . media.",
    context:
      "Проект за видео съдържание, при който знакът трябва да работи уверено в канална и дигитална среда.",
    focus: [
      "Logo и вариант без текст",
      "Файлове за светъл фон и mockup приложение",
      "Присъствие, ориентирано към YouTube среда",
    ],
  },
  "sport-fishing-stoletovo": {
    title: "Sport Fishing Stoletovo",
    summary:
      "Спортно-ориентиран знак с по-директен характер и пълен набор варианти за фон и приложение.",
    context:
      "Identity проект, изграден за по-ясно присъствие в клубна и спортна среда.",
    focus: [
      "Черни, бели и прозрачни версии",
      "Mockup контекст за реална употреба",
      "По-силен emblematic характер",
    ],
  },
  "enduro-team-stoletovo": {
    title: "Enduro Team Stoletovo",
    summary:
      "Компактен знак за off-road / team среда с ясни monochrome варианти и директна четимост.",
    context:
      "Проект, ориентиран към клубно и спортно присъствие, където знакът трябва да стои твърдо и бързо разпознаваемо.",
    focus: [
      "Черна, бяла и прозрачна версия",
      "Силен клубен характер",
      "Директна употреба върху различни носители",
    ],
  },
  "photo-workshop": {
    title: "Photo Workshop",
    summary:
      "Идентичност за photo-oriented формат с няколко logo версии за различен фон и контекст.",
    context:
      "Проект с образователен и фотографски тон, при който типографията и четимостта са водещи.",
    focus: [
      "Няколко logo версии",
      "Работа за тъмен, светъл и прозрачен фон",
      "Спокоен фотографски визуален език",
    ],
  },
  "pp-hairstyle": {
    title: "PP Hairstyle",
    summary:
      "Beauty бранд с няколко logo варианта и ясно име, подготвен за различни фонове и ежедневна употреба.",
    context:
      "Идентичност за hair-oriented услуга, изградена около директна четимост и познаваемо име.",
    focus: [
      "Logo за светъл, тъмен и прозрачен фон",
      "По-лек beauty service характер",
      "Ясна практическа употреба",
    ],
  },
  "plamena-nails": {
    title: "Plamena Nails",
    summary:
      "Компактен beauty знак с цветови варианти и по-декоративно присъствие.",
    context:
      "Nail-oriented identity проект, развит чрез няколко цветови версии на един и същ знак.",
    focus: [
      "Няколко цветови варианта",
      "Прозрачни файлове за лесно приложение",
      "По-лек и декоративен beauty тон",
    ],
  },
  "galka-nails": {
    title: "Galka Nails",
    summary:
      "Минимален beauty export с директно име и ясен знак за бърза употреба.",
    context:
      "Компактен проект с фокус върху най-кратката възможна визуална форма.",
    focus: [
      "Един основен brand asset",
      "Прозрачна версия за приложение",
      "Чист beauty-oriented знак",
    ],
  },
  "stanulovi-s-house": {
    title: "Stanulovi's House",
    summary:
      "Компактен identity знак за място или обект, представен като чист единичен brand asset.",
    context:
      "Проект с фокус върху директна разпознаваемост и ясно изписване на името.",
    focus: [
      "Един основен visual export",
      "Чисто име и знак в едно решение",
      "Лесно приложение в базови контексти",
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
  if (fixedSlugByDirectory[name]) {
    return fixedSlugByDirectory[name];
  }

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

      if (excludedFileNames.has(lowerName)) {
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
    const aIsTransparent =
      aName.includes("transparent") ||
      aName.includes("transperent") ||
      aName.includes("trasperent");
    const bIsTransparent =
      bName.includes("transparent") ||
      bName.includes("transperent") ||
      bName.includes("trasperent");

    if (aIsTransparent !== bIsTransparent) {
      return aIsTransparent ? -1 : 1;
    }

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
  .filter((entry) => !excludedDirectories.has(entry.name))
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
    featured: typeof feature?.priority === "number",
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
