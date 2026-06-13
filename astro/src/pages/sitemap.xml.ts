import { localizeHref } from "@/lib/i18n";
import { authorityServiceSlugs } from "@/lib/authority-services";
import { authorityPageSlugs } from "@/lib/authority-pages";
import { getPublishedBlogPosts } from "@/lib/blog";
import { legacyProjectArchive } from "@/lib/legacy-project-archive";
import { operationalPolicies } from "@/lib/operational-policies";
import { projectPngArchive } from "@/lib/project-png-archive";
import { getAbsolutePathUrl } from "@/lib/seo";

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
    `<loc>${getAbsolutePathUrl(path)}</loc>`,
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
    "/case-studies",
    "/services",
    "/services/brand-identity",
    "/services/content-social-media",
    "/services/content-creation",
    "/services/social-media-management",
    "/services/graphic-design",
    "/services/advertising",
    "/services/additional-charges-rights",
    "/services/web-design-development",
    ...authorityServiceSlugs.map((slug) => `/services/${slug}`),
    "/pricing",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
    ...authorityPageSlugs.map((slug) => `/${slug}`),
  ];
  const policyPaths = [
    "/legal/policies",
    ...operationalPolicies.map((policy) => `/legal/policies/${policy.slug}`),
  ];
  const blogEntries = (["bg", "en"] as const).flatMap((locale) =>
    getPublishedBlogPosts(locale).map((post) => ({
      path: localizeHref(locale, `/blog/${post.slug}`),
      lastModified: post.dateModified,
    })),
  );
  const projectPaths = allProjects.map((project) => `/projects/${project.slug}`);
  const localizedEntries = [
    ...basePaths.flatMap((path) => [
      { path: localizeHref("bg", path || "/") },
      { path: localizeHref("en", path || "/") },
    ]),
    ...blogEntries,
    ...projectPaths.flatMap((path) => [{ path: localizeHref("bg", path) }, { path: localizeHref("en", path) }]),
    ...policyPaths.flatMap((path) => [
      { path: localizeHref("bg", path) },
      { path: localizeHref("en", path) },
    ]),
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
