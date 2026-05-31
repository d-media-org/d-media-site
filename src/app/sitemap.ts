import type { MetadataRoute } from "next";

import { localizeHref } from "@/lib/i18n";
import { legacyProjectArchive } from "@/lib/legacy-project-archive";
import { projectPngArchive } from "@/lib/project-png-archive";
import { baseUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const allProjects = [...projectPngArchive, ...legacyProjectArchive];
  const basePaths = [
    "",
    "/projects",
    "/services",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
  ];
  const projectPaths = allProjects.map((project) => `/projects/${project.slug}`);
  const localizedPaths = [
    ...basePaths.flatMap((path) => [localizeHref("bg", path || "/"), localizeHref("en", path || "/")]),
    ...projectPaths.flatMap((path) => [localizeHref("bg", path), localizeHref("en", path)]),
  ];

  return localizedPaths.map((path) => ({
    url: `${baseUrl}${path}`,
    changeFrequency: path === "/" || path === "/en" ? "weekly" : path.includes("/projects/") ? "monthly" : "monthly",
    priority:
      path === "/" || path === "/en"
        ? 1
        : path === "/projects" || path === "/en/projects"
          ? 0.95
          : path.includes("/projects/")
            ? 0.8
            : 0.75,
  }));
}
