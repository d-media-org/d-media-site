#!/usr/bin/env node

import { spawn } from "node:child_process";

const checks = [
  { label: "Lint", command: "npm", args: ["run", "lint"] },
  { label: "Root build", command: "npm", args: ["run", "build"] },
  { label: "Astro build", command: "npm", args: ["run", "astro:build"] },
  {
    label: "Cloudflare dist validation",
    command: "node",
    args: ["scripts/validate-cloudflare-dist.mjs"],
  },
];

function runCheck({ label, command, args }) {
  return new Promise((resolve, reject) => {
    console.log(`\n[QA] ${label}`);
    console.log(`[QA] $ ${command} ${args.join(" ")}`);

    const child = spawn(command, args, {
      stdio: "inherit",
      shell: process.platform === "win32",
    });

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve();
        return;
      }

      reject(new Error(`${label} failed with exit code ${code}`));
    });
  });
}

try {
  for (const check of checks) {
    await runCheck(check);
  }

  console.log("\n[QA] Всички проверки минаха успешно.");
} catch (error) {
  console.error(`\n[QA] ${error.message}`);
  process.exit(1);
}
