const markdownRoutes = new Map([
  ["/", "index.md"],
  ["/about/", "about.md"],
  ["/services/", "services.md"],
  ["/contact/", "contact.md"],
  ["/blog/", "blog.md"],
  ["/services/brand-identity/", "services--brand-identity.md"],
  ["/services/content-creation/", "services--content-creation.md"],
  ["/services/social-media-management/", "services--social-media-management.md"],
  ["/services/graphic-design/", "services--graphic-design.md"],
  ["/services/advertising/", "services--advertising.md"],
  ["/services/web-design-development/", "services--web-design-development.md"],
  ["/services/technical-seo/", "services--technical-seo.md"],
  ["/services/geo/", "services--geo.md"],
  ["/services/performance-optimization/", "services--performance-optimization.md"],
  ["/services/technical-support/", "services--technical-support.md"],
  ["/case-studies/", "case-studies.md"],
  ["/projects/d-media/", "projects--d-media.md"],
  ["/projects/yanita/", "projects--yanita.md"],
  ["/projects/support-account/", "projects--support-account.md"],
  ["/projects/aneliart/", "projects--aneliart.md"],
]);

function prefersMarkdown(accept) {
  return accept
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .some((part) => part.startsWith("text/markdown") && !/;\s*q=0(?:\.0+)?(?:;|$)/.test(part));
}

export async function onRequest(context) {
  const { request } = context;
  if (request.method !== "GET" && request.method !== "HEAD") return context.next();
  if (!prefersMarkdown(request.headers.get("Accept") ?? "")) return context.next();

  const url = new URL(request.url);
  const pathname = url.pathname === "/" ? "/" : `${url.pathname.replace(/\/+$/, "")}/`;
  const markdownFile = markdownRoutes.get(pathname);
  if (!markdownFile) return context.next();

  const assetUrl = new URL(`/markdown-pages/${markdownFile}`, request.url);
  const assetRequest = new Request(assetUrl, { method: request.method, headers: request.headers });
  const assetResponse = await context.next(assetRequest);
  if (!assetResponse.ok) return context.next();

  const headers = new Headers(assetResponse.headers);
  headers.set("Content-Type", "text/markdown; charset=utf-8");
  headers.set("Vary", "Accept");
  headers.set("Content-Signal", "search=yes, ai-input=yes, ai-train=no");
  headers.set("X-Robots-Tag", "noindex");

  return new Response(assetResponse.body, {
    status: assetResponse.status,
    statusText: assetResponse.statusText,
    headers,
  });
}
