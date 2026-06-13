import { getPageCopy } from "@/lib/page-copy";

export function GET() {
  return new Response(
    JSON.stringify({
      name: "d . media",
      short_name: "d . media",
      description: getPageCopy("bg").seo.siteDescription,
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#ffffff",
      icons: [
        {
          src: "/dmedia-favicon-v5-32.png",
          sizes: "32x32",
          type: "image/png",
        },
        {
          src: "/dmedia-favicon-v5-48.png",
          sizes: "48x48",
          type: "image/png",
        },
        {
          src: "/dmedia-apple-touch-v4.png",
          sizes: "180x180",
          type: "image/png",
        },
      ],
    }),
    {
      headers: {
        "Content-Type": "application/manifest+json",
      },
    },
  );
}
