#!/usr/bin/env node

import fs from "node:fs";

const markdownSources = ["SITE_HISTORY.md", "SITE_HISTORY_DAILY.md"];
const englishSources = [
  "astro/src/pages/en/site-history.astro",
  "astro/src/pages/en/site-history/daily.astro",
];

const forbiddenPatterns = [
  { pattern: /(?:^|[\s`"'(])(?:\.{0,2}\/|\/Users\/|src\/|public\/|scripts\/|functions\/|components\/|pages\/)/imu, label: "file path" },
  { pattern: /\b[\w.-]+\.(?:astro|tsx?|jsx?|mjs|cjs|json|toml|md|txt|css|scss|woff2?|png|jpe?g|webp|svg|mp4)\b/iu, label: "file name" },
  { pattern: /\b(?:commit|branch|repository|repo|pull request|merge)\b/iu, label: "repository detail" },
  { pattern: /\b(?:revert(?:ed)?|rollback|undepployed|not deployed|local path|локал(?:ен|ни|на|но)?\s+път|върнат[аио]?|недеплойн\w*)\b/iu, label: "non-production change" },
  { pattern: /\b(?:lint|dry-run|mock validation|build check|route check|QA-only)\b/iu, label: "internal validation detail" },
];

const failures = [];

const sources = markdownSources.map((source) => ({
  source,
  content: fs.readFileSync(source, "utf8"),
}));

for (const source of englishSources) {
  const file = fs.readFileSync(source, "utf8");
  const sectionContent = file.match(/const sections = \[([\s\S]*?)\] as const;/u)?.[1] ?? "";
  sources.push({ source, content: sectionContent });
}

for (const { source, content } of sources) {
  for (const { pattern, label } of forbiddenPatterns) {
    if (pattern.test(content)) failures.push(`${source}: ${label}`);
  }
}

if (failures.length) {
  console.error("Site history validation failed:");
  failures.forEach((failure) => console.error(`- ${failure}`));
  process.exit(1);
}

console.log("Site history validation passed.");
