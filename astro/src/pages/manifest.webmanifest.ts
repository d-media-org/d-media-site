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
          src: "/dmedia-pwa-v6-192.png",
          sizes: "192x192",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/dmedia-pwa-v6-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "any",
        },
        {
          src: "/dmedia-pwa-maskable-v6-512.png",
          sizes: "512x512",
          type: "image/png",
          purpose: "maskable",
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
