export function GET() {
  return new Response(
    [
      "User-agent: *",
      "Allow: /",
      "Disallow: /markdown-pages/",
      "Content-Signal: search=yes, ai-input=yes, ai-train=no",
      "Sitemap: https://www.d-media.org/sitemap.xml",
      "",
    ].join("\n"),
    {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
      },
    },
  );
}
