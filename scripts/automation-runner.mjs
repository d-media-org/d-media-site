#!/usr/bin/env node

import { spawn } from "node:child_process";
import { fail, pass, warn } from "./automation-report.mjs";

export function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: options.stdio ?? "inherit",
      shell: process.platform === "win32",
      cwd: options.cwd,
      env: { ...process.env, ...options.env },
    });

    let stdout = "";
    let stderr = "";

    if (child.stdout) child.stdout.on("data", (chunk) => (stdout += chunk));
    if (child.stderr) child.stderr.on("data", (chunk) => (stderr += chunk));

    child.on("error", reject);
    child.on("close", (code) => {
      if (code === 0) {
        resolve({ code, stdout, stderr });
        return;
      }

      const error = new Error(`${command} ${args.join(" ")} failed with exit code ${code}`);
      error.code = code;
      error.stdout = stdout;
      error.stderr = stderr;
      reject(error);
    });
  });
}

export async function runStep(report, label, command, args) {
  console.log(`\n[Automation] ${label}`);
  console.log(`[Automation] $ ${command} ${args.join(" ")}`);
  await runCommand(command, args);
  if (report) pass(report, `${label} completed`);
}

export async function hasCommand(command) {
  try {
    await runCommand("which", [command], { stdio: "pipe" });
    return true;
  } catch {
    return false;
  }
}

export async function checkRequiredTools(report, commands) {
  const missing = [];
  for (const command of commands) {
    if (await hasCommand(command)) {
      pass(report, `Tool available: ${command}`);
    } else {
      missing.push(command);
      fail(report, `Missing required tool: ${command}`);
    }
  }

  if (missing.length) {
    throw new Error(`Missing required tools: ${missing.join(", ")}`);
  }
}

export async function checkOptionalTools(report, commands) {
  for (const command of commands) {
    if (await hasCommand(command)) pass(report, `Optional tool available: ${command}`);
    else warn(report, `Optional tool missing: ${command}`);
  }
}

function wait(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

export async function startCloudflarePreview({ port = 8788 } = {}) {
  const child = spawn(
    "npx",
    [
      "wrangler",
      "pages",
      "dev",
      "dist",
      "--port",
      String(port),
      "--compatibility-date",
      "2026-06-06",
    ],
    {
      stdio: ["ignore", "pipe", "pipe"],
      shell: process.platform === "win32",
      cwd: "astro",
      env: { ...process.env, NO_COLOR: "1" },
    },
  );

  let output = "";
  child.stdout.on("data", (chunk) => {
    output += chunk;
  });
  child.stderr.on("data", (chunk) => {
    output += chunk;
  });

  const baseUrl = `http://127.0.0.1:${port}`;
  const deadline = Date.now() + 30000;

  while (Date.now() < deadline) {
    if (child.exitCode !== null) break;
    try {
      const response = await fetch(baseUrl);
      if (response.status < 500) {
        return {
          baseUrl,
          stop: async () => {
            child.kill("SIGTERM");
            await wait(500);
            if (child.exitCode === null) child.kill("SIGKILL");
          },
        };
      }
    } catch {
      await wait(500);
    }
  }

  child.kill("SIGTERM");
  throw new Error(`Cloudflare preview did not start on ${baseUrl}. ${output.trim()}`);
}
