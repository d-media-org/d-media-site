#!/usr/bin/env node

import fs from "node:fs";
import { runCommand } from "./automation-runner.mjs";

const { stdout } = await runCommand("git", ["status", "--short"], { stdio: "pipe" });
const docs = stdout
  .split("\n")
  .map((line) => line.trim().replace(/^\s*(?:[ MADRCU?!]{1,2})\s+/, ""))
  .filter((file) => file.endsWith(".md"));

const failures = [];
for (const file of docs) {
  if (!fs.existsSync(file)) continue;
  const content = fs.readFileSync(file, "utf8").trim();
  if (!content) failures.push(`${file}: empty markdown document`);
  if (!content.startsWith("#")) failures.push(`${file}: missing top-level heading`);
}

if (failures.length) {
  console.error(failures.join("\n"));
  process.exit(1);
}

console.log(JSON.stringify({ status: "ok", checkedMarkdownFiles: docs.length }, null, 2));
