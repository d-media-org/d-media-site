import fs from "node:fs";

import { list } from "@vercel/blob";

const manifestSource = fs.readFileSync("src/lib/blob-asset-manifest.ts", "utf8");
const manifestPaths = new Set(
  [...manifestSource.matchAll(/^  "\/([^"]+)":/gm)].map((match) => match[1]),
);
const blobs = [];
let cursor;

do {
  const page = await list({
    cursor,
    limit: 1000,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });
  blobs.push(...page.blobs);
  cursor = page.cursor;
} while (cursor);

const outsideManifest = blobs.filter((blob) => !manifestPaths.has(blob.pathname));
const blobPaths = new Set(blobs.map((blob) => blob.pathname));
const missingBlobs = [...manifestPaths].filter((pathname) => !blobPaths.has(pathname));
const formatMegabytes = (bytes) => `${(bytes / 1024 / 1024).toFixed(2)} MB`;

console.log(JSON.stringify({
  blobCount: blobs.length,
  blobBytes: formatMegabytes(blobs.reduce((sum, blob) => sum + blob.size, 0)),
  manifestCount: manifestPaths.size,
  outsideManifest: outsideManifest.map((blob) => ({
    pathname: blob.pathname,
    size: formatMegabytes(blob.size),
  })),
  missingBlobs,
}, null, 2));
