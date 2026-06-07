import { localizeHref } from "@/lib/i18n";
import { getPublishedBlogPosts } from "@/lib/blog";
import { legacyProjectArchive } from "@/lib/legacy-project-archive";
import { projectPngArchive } from "@/lib/project-png-archive";

const baseUrl = "https://www.d-media.org";

function sitemapEntry(path: string, lastModified?: string) {
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
    lastModified ? `<lastmod>${lastModified}</lastmod>` : "",
    `<changefreq>${changeFrequency}</changefreq>`,
    `<priority>${priority}</priority>`,
    "</url>",
  ].join("");
}

export function GET() {
  const allProjects = [...projectPngArchive, ...legacyProjectArchive];
  const basePaths = [
    "",
    "/blog",
    "/projects",
    "/services",
    "/services/brand-identity",
    "/services/content-social-media",
    "/services/graphic-design",
    "/services/advertising",
    "/services/additional-charges-rights",
    "/services/web-design-development",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
  ];
  const blogEntries = getPublishedBlogPosts("bg").map((post) => ({
    path: `/blog/${post.slug}`,
    lastModified: post.dateModified,
  }));
  const projectPaths = allProjects.map((project) => `/projects/${project.slug}`);
  const localizedEntries = [
    ...basePaths.flatMap((path) => [
      { path: localizeHref("bg", path || "/") },
      { path: localizeHref("en", path || "/") },
    ]),
    ...blogEntries.map((entry) => ({ path: localizeHref("bg", entry.path), lastModified: entry.lastModified })),
    ...projectPaths.flatMap((path) => [{ path: localizeHref("bg", path) }, { path: localizeHref("en", path) }]),
  ];
  const body = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...localizedEntries.map((entry) => sitemapEntry(entry.path, entry.lastModified)),
    "</urlset>",
    "",
  ].join("\n");

  return new Response(body, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
    },
  });
}
