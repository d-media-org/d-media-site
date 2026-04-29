import type { MetadataRoute } from "next";
import { getPageCopy } from "@/lib/page-copy";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "d . media",
    short_name: "d . media",
    description: getPageCopy("bg").seo.siteDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ffffff",
    icons: [
      {
        src: "/dmedia-favicon-v4-32.png",
        sizes: "32x32",
        type: "image/png",
      },
      {
        src: "/dmedia-apple-touch-v4.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
