import fs from "node:fs";
import path from "node:path";
import { put } from "@vercel/blob";

const assetRoots = [
  path.resolve("public/assets/brand"),
  path.resolve("public/assets/legacy-project-covers"),
  path.resolve("public/assets/legacy-project-files"),
  path.resolve("public/assets/project-covers"),
  path.resolve("public/assets/project-pngs"),
  path.resolve("public/assets/documents"),
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
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(fullPath) : fullPath;
  });
}

function toPublicPath(absoluteFilePath) {
  const relativeToPublic = path.relative(path.resolve("public"), absoluteFilePath);
  return `/${relativeToPublic.split(path.sep).join("/")}`;
}

function getContentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return contentTypeByExtension[extension] ?? "application/octet-stream";
}

async function uploadFile(filePath) {
  const pathname = toPublicPath(filePath).slice(1);
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

  return [toPublicPath(filePath), `${blob.url}?v=${version}`];
}

async function main() {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    throw new Error("Missing BLOB_READ_WRITE_TOKEN. Pull Vercel env first.");
  }

  const files = assetRoots.flatMap((root) => walk(root)).sort();
  const manifestEntries = [];

  for (const filePath of files) {
    const [publicPath, blobUrl] = await uploadFile(filePath);
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
