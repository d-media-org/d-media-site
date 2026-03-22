import type { MetadataRoute } from "next";

import { projectPngArchive } from "@/lib/project-png-archive";
import { baseUrl } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/projects",
    "/services",
    "/about",
    "/contact",
    "/terms",
    "/privacy",
    ...projectPngArchive.map((project) => `/projects/${project.slug}`),
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : path.startsWith("/projects/") ? "monthly" : "monthly",
    priority: path === "" ? 1 : path === "/projects" ? 0.95 : path.startsWith("/projects/") ? 0.8 : 0.75,
  }));
}
