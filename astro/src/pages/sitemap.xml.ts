import { localizeHref } from "@/lib/i18n";
import { legacyProjectArchive } from "@/lib/legacy-project-archive";
import { projectPngArchive } from "@/lib/project-png-archive";

const baseUrl = "https://www.d-media.org";

function sitemapEntry(path: string) {
  const priority =
    path === "/" || path === "/en"
      ? 1
      : path === "/projects" || path === "/en/projects"
        ? 0.95
        : path.includes("/projects/")
          ? 0.8
          : 0.75;
  const changeFrequency = path === "/" || path === "/en" ? "weekly" : "monthly";

  return [
    "<url>",
    `<loc>${baseUrl}${path}</loc>`,
    `<changefreq>${changeFrequency}</changefreq>`,
    `<priority>${priority}</priority>`,
    "</url>",
  ].join("");
}

export function GET() {
  const allProjects = [...projectPngArchive, ...legacyProjectArchive];
  const basePaths = ["", "/projects", "/services", "/about", "/contact", "/terms", "/privacy"];
  const projectPaths = allProjects.map((project) => `/projects/${project.slug}`);
  const localizedPaths = [
    ...basePaths.flatMap((path) => [
      localizeHref("bg", path || "/"),
      localizeHref("en", path || "/"),
    ]),
    ...projectPaths.flatMap((path) => [localizeHref("bg", path), localizeHref("en", path)]),
  ];
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...localizedPaths.map(sitemapEntry),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
