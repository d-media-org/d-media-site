const baseUrl = process.argv[2] ?? "http://127.0.0.1:8788";

function assert(condition, message) {
  if (!condition) throw new Error(message);
}

const markdownResponse = await fetch(`${baseUrl}/`, {
  headers: { Accept: "text/markdown" },
});
const markdown = await markdownResponse.text();
assert(markdownResponse.status === 200, "Markdown request did not return 200");
assert(
  markdownResponse.headers.get("content-type")?.startsWith("text/markdown"),
  "Markdown response has the wrong Content-Type",
);
assert(
  markdownResponse.headers.get("vary")?.toLowerCase().split(",").map((value) => value.trim()).includes("accept"),
  "Markdown response is missing Vary: Accept",
);
assert(markdown.startsWith("# "), "Markdown response does not start with an H1");
assert(markdown.includes("Canonical: https://www.d-media.org/"), "Markdown response is missing its canonical URL");

const htmlResponse = await fetch(`${baseUrl}/`, { headers: { Accept: "text/html" } });
assert(htmlResponse.status === 200, "HTML request did not return 200");
assert(htmlResponse.headers.get("content-type")?.startsWith("text/html"), "Normal request does not return HTML");

const robotsResponse = await fetch(`${baseUrl}/robots.txt`);
const robots = await robotsResponse.text();
assert(robotsResponse.status === 200, "robots.txt did not return 200");
assert(
  robots.includes("Content-Signal: search=yes, ai-input=yes, ai-train=no"),
  "robots.txt is missing Content-Signal",
);

const llmsResponse = await fetch(`${baseUrl}/llms.txt`);
const llms = await llmsResponse.text();
assert(llmsResponse.status === 200, "llms.txt did not return 200");
assert(llms.startsWith("# d . media\n\n> "), "llms.txt does not start with the expected H1 and blockquote");
assert(/^## Website$/m.test(llms), "llms.txt is missing H2 sections");
assert(
  [...llms.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)].every((match) =>
    match[1].startsWith("https://www.d-media.org/"),
  ),
  "llms.txt contains a non-canonical or relative URL",
);

console.log(
  JSON.stringify(
    {
      status: "ok",
      baseUrl,
      markdownContentType: markdownResponse.headers.get("content-type"),
      vary: markdownResponse.headers.get("vary"),
      htmlContentType: htmlResponse.headers.get("content-type"),
      robotsContentSignal: true,
      llmsValid: true,
    },
    null,
    2,
  ),
);
