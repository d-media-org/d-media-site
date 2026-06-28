#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const requiredFiles = [
  "AGENTS.md",
  "SOURCE_OF_TRUTH.md",
  "DMA.md",
  "OWNER_REQUIREMENTS.md",
  "CHECKLIST.md",
  "PROJECT.md",
  "KNOWLEDGE_BASE.md",
  "OPEN_QUESTIONS.md",
  "DECISIONS.md",
  "SITE_HISTORY.md",
  "SYSTEM_HISTORY.md",
  "SOP-001-EXECUTE_TASK.md",
  "README.md",
  "EDITORIAL_SYSTEM/README.md",
  "EDITORIAL_SYSTEM/EDITORIAL_STANDARDS.md",
  "EDITORIAL_SYSTEM/ARTICLE_STRUCTURE.md",
  "EDITORIAL_SYSTEM/ARTICLE_UX.md",
  "EDITORIAL_SYSTEM/ARTICLE_UI.md",
  "EDITORIAL_SYSTEM/LINKING_STRATEGY.md",
  "EDITORIAL_SYSTEM/WRITING_GUIDE.md",
  "EDITORIAL_SYSTEM/REVIEW_CHECKLIST.md",
  ".aios/README.md",
  ".aios/11-DECISIONS.md",
];

const requiredSections = {
  "SOURCE_OF_TRUTH.md": [
    "## Purpose",
    "## Priority Order",
    "## Source of Truth by Area",
    "## Document Responsibilities",
    "## Legacy AIOS Archive",
    "## Definition of Done",
  ],
  "EDITORIAL_SYSTEM/README.md": [
    "## Purpose",
    "## Documents",
    "## Reading Order",
    "## Required Documents by Task",
    "## Workflow",
    "## Research Output Template",
    "## Outline Template",
    "## Project Owner Approval Template",
    "## Definition of Done",
  ],
  "CHECKLIST.md": [
    "## Преди започване",
    "## Преди приключване",
    "## Типове задачи и минимални проверки",
    "## Automation commands",
  ],
  "OPEN_QUESTIONS.md": ["## Open", "## Resolved"],
  "SYSTEM_HISTORY.md": ["## Purpose", "## Scope"],
  "OWNER_REQUIREMENTS.md": ["## Content", "## Definition of Done – Blog Articles", "## Quality Standards"],
  "DECISIONS.md": ["## DEC-011"],
};

const requiredReferences = {
  "AGENTS.md": [
    "SOURCE_OF_TRUTH.md",
    "DMA.md",
    "DECISIONS.md",
    "SITE_HISTORY.md",
    "EDITORIAL_SYSTEM/",
  ],
  "SOP-001-EXECUTE_TASK.md": [
    "SOURCE_OF_TRUTH.md",
    "DMA.md",
    "DECISIONS.md",
    "SITE_HISTORY.md",
    "SYSTEM_HISTORY.md",
    "EDITORIAL_SYSTEM/README.md",
  ],
  "README.md": ["SOURCE_OF_TRUTH.md"],
  ".aios/README.md": ["Legacy AIOS Archive", "../SOURCE_OF_TRUTH.md"],
  ".aios/11-DECISIONS.md": ["historical only", "../DECISIONS.md"],
  "DMA.md": ["SOURCE_OF_TRUTH.md", "SYSTEM_HISTORY.md"],
};

const docsToScan = collectMarkdownFiles(".");
const failures = [];

for (const file of requiredFiles) {
  if (!fs.existsSync(file)) failures.push(`${file}: required documentation file is missing`);
}

for (const file of docsToScan) {
  const content = fs.readFileSync(file, "utf8").trim();
  if (!content) failures.push(`${file}: empty markdown document`);
  if (!content.startsWith("#")) failures.push(`${file}: missing top-level heading`);
}

for (const [file, sections] of Object.entries(requiredSections)) {
  const content = read(file);
  for (const section of sections) {
    if (!content.includes(section)) failures.push(`${file}: missing required section ${section}`);
  }
}

for (const [file, references] of Object.entries(requiredReferences)) {
  const content = read(file);
  for (const reference of references) {
    if (!content.includes(reference)) failures.push(`${file}: missing required reference ${reference}`);
  }
}

for (const file of docsToScan.filter((item) => !item.startsWith(".aios/"))) {
  const content = read(file);
  if (content.includes("Needs Human Validation") || content.includes("Needs human validation")) {
    failures.push(`${file}: outdated English Needs Human Validation marker in active documentation`);
  }
}

validateOpenQuestions();
validateSourceOfTruth();
validateInternalReferences();

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(
  JSON.stringify(
    {
      status: "ok",
      checkedMarkdownFiles: docsToScan.length,
      requiredFiles: requiredFiles.length,
    },
    null,
    2,
  ),
);

function read(file) {
  if (!fs.existsSync(file)) return "";
  return fs.readFileSync(file, "utf8");
}

function collectMarkdownFiles(directory) {
  const ignored = new Set(["node_modules", "astro/node_modules", ".next", ".git", "reports", "astro/dist"]);
  const result = [];

  function walk(current) {
    for (const entry of fs.readdirSync(current, { withFileTypes: true })) {
      const fullPath = path.join(current, entry.name);
      const relative = normalize(path.relative(".", fullPath));
      if (entry.isDirectory()) {
        if ([...ignored].some((item) => relative === item || relative.startsWith(`${item}/`))) continue;
        walk(fullPath);
        continue;
      }
      if (entry.isFile() && entry.name.endsWith(".md")) result.push(relative);
    }
  }

  walk(directory);
  return result.sort();
}

function validateOpenQuestions() {
  const content = read("OPEN_QUESTIONS.md");
  const openIndex = content.indexOf("## Open");
  const resolvedIndex = content.indexOf("## Resolved");
  if (openIndex === -1 || resolvedIndex === -1) return;
  if (resolvedIndex < openIndex) failures.push("OPEN_QUESTIONS.md: Resolved section must come after Open section");

  const openSection = content.slice(openIndex, resolvedIndex);
  if (openSection.includes("Status: Resolved")) {
    failures.push("OPEN_QUESTIONS.md: Open section contains resolved questions");
  }
}

function validateSourceOfTruth() {
  const content = read("SOURCE_OF_TRUTH.md");
  for (const file of [
    "AGENTS.md",
    "DMA.md",
    "OWNER_REQUIREMENTS.md",
    "CHECKLIST.md",
    "PROJECT.md",
    "KNOWLEDGE_BASE.md",
    "OPEN_QUESTIONS.md",
    "DECISIONS.md",
    "SITE_HISTORY.md",
    "SYSTEM_HISTORY.md",
    "README.md",
    "SOP-001-EXECUTE_TASK.md",
    "EDITORIAL_SYSTEM/",
    "Automation",
    "AIOS",
  ]) {
    if (!content.includes(file)) failures.push(`SOURCE_OF_TRUTH.md: missing source-of-truth entry for ${file}`);
  }
}

function validateInternalReferences() {
  for (const file of docsToScan) {
    const content = read(file);
    const references = extractReferences(content);
    for (const reference of references) {
      if (reference.startsWith("http://") || reference.startsWith("https://")) continue;
      if (reference.startsWith("#")) continue;
      if (reference.includes("*")) continue;
      const cleanReference = reference.split("#")[0];
      if (!cleanReference) continue;
      const candidates = [
        normalize(path.relative(".", path.resolve(path.dirname(file), cleanReference))),
        normalize(cleanReference.replace(/^\//, "")),
      ];
      if (!candidates.some((candidate) => fs.existsSync(candidate))) {
        failures.push(`${file}: broken internal reference ${reference}`);
      }
    }
  }
}

function extractReferences(content) {
  const references = new Set();
  for (const match of content.matchAll(/\[[^\]]+\]\(([^)]+)\)/g)) {
    const value = match[1].trim();
    if (isDocumentationReference(value)) references.add(value);
  }
  for (const match of content.matchAll(/`([^`]+)`/g)) {
    const value = match[1].trim();
    if (isDocumentationReference(value)) references.add(value);
  }
  return [...references];
}

function isDocumentationReference(value) {
  return (
    value.endsWith(".md") ||
    value.includes(".md#") ||
    value === "EDITORIAL_SYSTEM/" ||
    value === ".aios/" ||
    value.startsWith("EDITORIAL_SYSTEM/") ||
    value.startsWith(".aios/")
  );
}

function normalize(value) {
  return value.replaceAll(path.sep, "/");
}
