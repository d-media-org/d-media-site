import fs from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";

const sourceAssetRoot =
  process.env.D_MEDIA_SOURCE_ASSET_ROOT ??
  path.resolve("..", "d . media - site source archive", "assets");
const assetRoots = [
  { directory: path.resolve("public/assets/brand"), publicPrefix: "assets/brand" },
  { directory: path.join(sourceAssetRoot, "legacy-project-files"), publicPrefix: "assets/legacy-project-files" },
  { directory: path.join(sourceAssetRoot, "project-covers"), publicPrefix: "assets/project-covers" },
  { directory: path.join(sourceAssetRoot, "project-pngs"), publicPrefix: "assets/project-pngs" },
  { directory: path.resolve("public/assets/documents"), publicPrefix: "assets/documents" },
];

const manifestOutputPath = path.resolve("src/lib/blob-asset-manifest.ts");

const contentTypeByExtension = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".pdf": "application/pdf",
  ".webp": "image/webp",
  ".svg": "image/svg+xml",
};

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    if (entry.name === ".DS_Store") {
      return [];
    }

    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : fullPath;
  });
}

function toPublicPath(absoluteFilePath, root) {
  const relativePath = path.relative(root.directory, absoluteFilePath);
  return `/${path.join(root.publicPrefix, relativePath).split(path.sep).join("/")}`;
}

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return contentTypeByExtension[extension] ?? "application/octet-stream";
}

async function uploadFile(filePath, root) {
  const publicPath = toPublicPath(filePath, root);
  const pathname = publicPath.slice(1);
  const body = fs.readFileSync(filePath);
  const sizeInMegabytes = body.byteLength / (1024 * 1024);
  const version = Math.round(fs.statSync(filePath).mtimeMs);

  const blob = await put(pathname, body, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: getContentType(filePath),
    multipart: sizeInMegabytes >= 4.5,
  });

  return [publicPath, `${blob.url}?v=${version}`];
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Missing BLOB_READ_WRITE_TOKEN. Pull Vercel env first.");
  }

  const files = assetRoots.flatMap((root) =>
    walk(root.directory).map((filePath) => ({ filePath, root })),
  ).sort((left, right) => left.filePath.localeCompare(right.filePath));
  const manifestEntries = [];

  for (const { filePath, root } of files) {
    const [publicPath, blobUrl] = await uploadFile(filePath, root);
    manifestEntries.push([publicPath, blobUrl]);
  }

  const manifestObject = Object.fromEntries(manifestEntries);
  const fileContents = `export const blobAssetManifest: Record<string, string> = ${JSON.stringify(manifestObject, null, 2)};\n`;
  fs.writeFileSync(manifestOutputPath, fileContents);

  process.stdout.write(`Manifest updated: ${manifestEntries.length} assets -> ${manifestOutputPath}\n`);
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
