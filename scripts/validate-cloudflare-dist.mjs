import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("astro/dist");
const requiredFiles = [
  "_headers",
  "_redirects",
  "404.html",
  "index.html",
  "robots.txt",
  "sitemap.xml",
  "manifest.webmanifest",
  "dmedia-favicon-v4.ico",
  "dmedia-favicon-v4-16.png",
  "dmedia-favicon-v4-32.png",
  "dmedia-apple-touch-v4.png",
  "social-preview-dmedia-v3.png",
  "downloads/d-media-logo-pack.zip",
  "assets/documents/d_media_professional_brandbook_new.pdf",
  "assets/documents/d_media_professional_brandbook_new_en.pdf",
  "fonts/panton/Panton-Regular.woff2",
  "fonts/panton/Panton-Black.woff2",
  "optimized-assets/brand/ONLY-logotype.png",
  "assets/brand/ONLY-brandmark.png",
];

const requiredRoutes = [
  "index.html",
  "en/index.html",
  "projects/index.html",
  "en/projects/index.html",
  "services/index.html",
  "en/services/index.html",
  "about/index.html",
  "en/about/index.html",
  "contact/index.html",
  "en/contact/index.html",
  "privacy/index.html",
  "en/privacy/index.html",
  "terms/index.html",
  "en/terms/index.html",
];

const ignoredSchemes = /^(https?:|mailto:|tel:|data:|blob:|#|javascript:)/i;
const htmlFiles = [];
const textFiles = [];
const forbiddenExternalReferences =
  /blob\.vercel-storage|public\.blob\.vercel-storage|tracker\.metricool|metricool\.com/i;
const textFileExtensions = new Set([
  ".css",
  ".html",
  ".js",
  ".json",
  ".map",
  ".svg",
  ".txt",
  ".webmanifest",
  ".xml",
]);

function exists(relativePath) {
  return fs.existsSync(path.join(dist, relativePath));
}

function walk(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    const fullPath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }
    if (textFileExtensions.has(path.extname(entry.name))) {
      textFiles.push(fullPath);
    }
    if (entry.name.endsWith(".html")) {
      htmlFiles.push(fullPath);
    }
  }
}

function normalizeReference(reference) {
  const clean = reference.split("#")[0].split("?")[0];
  if (!clean || ignoredSchemes.test(clean)) return null;
  if (!clean.startsWith("/")) return null;
  return decodeURIComponent(clean.slice(1));
}

function resolveStaticReference(reference) {
  if (exists(reference)) return true;
  if (exists(`${reference}.html`)) return true;
  if (exists(path.join(reference, "index.html"))) return true;
  if (reference.endsWith("/") && exists(path.join(reference, "index.html"))) return true;
  return false;
}

const failures = [];

for (const file of requiredFiles) {
  if (!exists(file)) failures.push(`Missing required file: ${file}`);
}

for (const route of requiredRoutes) {
  if (!exists(route)) failures.push(`Missing required route: ${route}`);
}

walk(dist);

const localReferences = new Set();
for (const filePath of htmlFiles) {
  const html = fs.readFileSync(filePath, "utf8");
  if (html.includes("/_next/")) failures.push(`Vercel _next reference found in ${path.relative(dist, filePath)}`);
  if (forbiddenExternalReferences.test(html)) {
    failures.push(`Forbidden third-party runtime/storage reference found in ${path.relative(dist, filePath)}`);
  }
  for (const match of html.matchAll(/\b(?:href|src)=["']([^"']+)["']/g)) {
    const reference = normalizeReference(match[1]);
    if (reference) localReferences.add(reference);
  }
}

for (const filePath of textFiles) {
  const contents = fs.readFileSync(filePath, "utf8");
  if (forbiddenExternalReferences.test(contents)) {
    failures.push(`Forbidden third-party runtime/storage reference found in ${path.relative(dist, filePath)}`);
  }
}

for (const reference of localReferences) {
  if (!resolveStaticReference(reference)) {
    failures.push(`Missing local reference: /${reference}`);
  }
}

const headers = fs.readFileSync(path.join(dist, "_headers"), "utf8");
for (const expectedHeader of ["X-Content-Type-Options", "Referrer-Policy", "Permissions-Policy"]) {
  if (!headers.includes(expectedHeader)) failures.push(`Missing Cloudflare header: ${expectedHeader}`);
}

const redirects = fs.readFileSync(path.join(dist, "_redirects"), "utf8");
for (const expectedRedirect of ["/index.html / 301", "/bg / 301"]) {
  if (!redirects.includes(expectedRedirect)) failures.push(`Missing Cloudflare redirect: ${expectedRedirect}`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      status: "ok",
      dist,
      htmlFiles: htmlFiles.length,
      localReferences: localReferences.size,
      requiredFiles: requiredFiles.length,
      requiredRoutes: requiredRoutes.length,
    },
    null,
    2,
  ),
);
