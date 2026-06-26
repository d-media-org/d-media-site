import fs from "node:fs";
import path from "node:path";

const dist = path.resolve("astro/dist");
const outputDirectory = path.join(dist, "markdown-pages");
const routes = [
  "/",
  "/about/",
  "/services/",
  "/contact/",
  "/blog/",
  "/services/brand-identity/",
  "/services/content-creation/",
  "/services/social-media-management/",
  "/services/graphic-design/",
  "/services/advertising/",
  "/services/web-design-development/",
  "/services/technical-seo/",
  "/services/geo/",
  "/services/performance-optimization/",
  "/services/technical-support/",
  "/case-studies/",
  "/projects/d-media/",
  "/projects/yanita/",
  "/projects/support-account/",
  "/projects/aneliart/",
];

function decodeHtml(value) {
  return value
    .replace(/&#(\d+);/g, (_, number) => String.fromCodePoint(Number(number)))
    .replace(/&#x([0-9a-f]+);/gi, (_, number) => String.fromCodePoint(Number.parseInt(number, 16)))
    .replaceAll("&nbsp;", " ")
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#39;", "'")
    .replaceAll("&lt;", "<")
    .replaceAll("&gt;", ">");
}

function absoluteUrl(href, canonical) {
  if (/^(mailto:|tel:|#|javascript:)/i.test(href)) return null;
  return new URL(href, canonical).href;
}

function routeFile(route) {
  return route === "/" ? "index.md" : `${route.slice(1, -1).replaceAll("/", "--")}.md`;
}

function htmlToMarkdown(html, canonical) {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] ?? "";
  let content = main
    .replace(/<(script|style|svg|picture|video|form|button)\b[\s\S]*?<\/\1>/gi, "")
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<a\b[^>]*href=["']([^"']+)["'][^>]*>([\s\S]*?)<\/a>/gi, (_, href, label) => {
      const url = absoluteUrl(decodeHtml(href), canonical);
      const text = decodeHtml(label.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim());
      return url && text ? `[${text}](${url})` : text;
    })
    .replace(/<h1\b[^>]*>([\s\S]*?)<\/h1>/gi, "\n# $1\n")
    .replace(/<h2\b[^>]*>([\s\S]*?)<\/h2>/gi, "\n## $1\n")
    .replace(/<h3\b[^>]*>([\s\S]*?)<\/h3>/gi, "\n### $1\n")
    .replace(/<h4\b[^>]*>([\s\S]*?)<\/h4>/gi, "\n#### $1\n")
    .replace(/<li\b[^>]*>([\s\S]*?)<\/li>/gi, "\n- $1")
    .replace(/<(p|blockquote|figcaption|dt|dd)\b[^>]*>([\s\S]*?)<\/\1>/gi, "\n$2\n")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/?(section|article|div|ul|ol|dl|figure|header)\b[^>]*>/gi, "\n")
    .replace(/<[^>]+>/g, " ");

  content = decodeHtml(content)
    .split("\n")
    .map((line) => line.replace(/\s+/g, " ").trim())
    .filter(Boolean)
    .filter((line, index, lines) => line !== lines[index - 1])
    .join("\n\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  return content;
}

fs.rmSync(outputDirectory, { recursive: true, force: true });
fs.mkdirSync(outputDirectory, { recursive: true });

for (const route of routes) {
  const htmlPath =
    route === "/" ? path.join(dist, "index.html") : path.join(dist, route.slice(1), "index.html");
  if (!fs.existsSync(htmlPath)) throw new Error(`Missing HTML route for Markdown generation: ${route}`);

  const html = fs.readFileSync(htmlPath, "utf8");
  const title = decodeHtml(html.match(/<title>([\s\S]*?)<\/title>/i)?.[1]?.trim() ?? "d . media");
  const description = decodeHtml(
    html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i)?.[1]?.trim() ?? "",
  );
  const canonical = html.match(/<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']/i)?.[1];
  const robots = html.match(/<meta\s+name=["']robots["']\s+content=["']([^"']*)["']/i)?.[1] ?? "";

  if (!canonical || /noindex/i.test(robots)) {
    throw new Error(`Route is not eligible for Markdown generation: ${route}`);
  }

  const body = htmlToMarkdown(html, canonical);
  const markdown = [
    `# ${title}`,
    "",
    description ? `> ${description}` : "",
    "",
    `Canonical: ${canonical}`,
    "",
    body,
    "",
  ]
    .filter((line, index, lines) => line || lines[index - 1])
    .join("\n");

  fs.writeFileSync(path.join(outputDirectory, routeFile(route)), markdown);
}

console.log(`Generated ${routes.length} Markdown pages in ${outputDirectory}`);
