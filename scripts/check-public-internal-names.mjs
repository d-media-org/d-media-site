import { readdir, readFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../astro/dist");
const forbiddenNames = [
  "OWNER_REQUIREMENTS.md",
  "PROJECT.md",
  "DECISIONS.md",
  "SOURCE_OF_TRUTH.md",
  "Layout.astro",
];
const matches = [];

async function scan(directory) {
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const filePath = path.join(directory, entry.name);
    if (entry.isDirectory()) {
      await scan(filePath);
    } else if (entry.isFile()) {
      const content = await readFile(filePath, "utf8");
      for (const name of forbiddenNames) {
        if (content.includes(name)) matches.push(`${path.relative(root, filePath)}: ${name}`);
      }
    }
  }
}

try {
  await scan(root);
} catch (error) {
  if (error.code === "ENOENT") {
    console.error(`Public build output not found: ${root}. Run the build first.`);
    process.exit(2);
  }
  throw error;
}

if (matches.length > 0) {
  console.error("Internal names found in public build output:");
  for (const match of matches) console.error(`- ${match}`);
  process.exit(1);
}

console.log(`No internal names found in public build output (${root}).`);
