import type { MetadataRoute } from "next";

const baseUrl = "https://www.d-media.org";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/projects",
    "/services",
    "/about",
    "/contact",
  ].map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}

