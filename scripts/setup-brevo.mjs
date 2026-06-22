#!/usr/bin/env node

const apiKey = process.env.BREVO_API_KEY?.trim();
const dryRun = process.argv.includes("--dry-run");
const apiBase = "https://api.brevo.com/v3";

const requiredLists = [
  "Website Leads",
  "Newsletter Subscribers",
  "Clients",
];
const folderName = "d . media Website";

const requiredAttributes = [
  ["COMPANY", "text"],
  ["SERVICE", "text"],
  ["SOURCE", "text"],
  ["WEBSITE", "text"],
  ["BUDGET", "text"],
  ["DEADLINE", "text"],
  ["LANGUAGE", "text"],
  ["CONSENT_SOURCE", "text"],
  ["CONSENT_TIMESTAMP", "text"],
  ["PROJECT_SCOPE", "text"],
  ["COMPLEXITY", "text"],
  ["TIMELINE", "text"],
  ["ESTIMATED_RANGE", "text"],
];

async function request(path, init = {}) {
  const response = await fetch(`${apiBase}${path}`, {
    ...init,
    headers: {
      accept: "application/json",
      "api-key": apiKey,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Brevo API ${response.status} за ${path}: ${detail}`);
  }

  if (response.status === 204) return undefined;
  return response.json();
}

async function getAllLists() {
  const lists = [];
  for (let offset = 0; ; offset += 50) {
    const page = await request(`/contacts/lists?limit=50&offset=${offset}&sort=desc`);
    const current = page.lists ?? [];
    lists.push(...current);
    if (current.length < 50) return lists;
  }
}

async function ensureFolder() {
  const response = await request("/contacts/folders?limit=50&offset=0&sort=desc");
  const existing = (response.folders ?? []).find(
    (candidate) => candidate.name === folderName,
  );
  if (existing) {
    console.log(`Намерена папка: ${folderName} (ID ${existing.id})`);
    return existing.id;
  }
  if (dryRun) {
    console.log(`[dry-run] Липсва папка: ${folderName}`);
    return undefined;
  }
  const created = await request("/contacts/folders", {
    method: "POST",
    body: JSON.stringify({ name: folderName }),
  });
  console.log(`Създадена папка: ${folderName} (ID ${created.id})`);
  return created.id;
}

async function ensureLists(folderId) {
  const existing = await getAllLists();
  const resolved = {};

  for (const name of requiredLists) {
    let list = existing.find((candidate) => candidate.name === name);
    if (!list) {
      if (dryRun) {
        console.log(`[dry-run] Липсва списък: ${name}`);
        continue;
      }
      list = await request("/contacts/lists", {
        method: "POST",
        body: JSON.stringify({ name, folderId }),
      });
      console.log(`Създаден списък: ${name} (ID ${list.id})`);
    } else {
      console.log(`Намерен списък: ${name} (ID ${list.id})`);
    }
    resolved[name] = list.id;
  }

  return resolved;
}

async function ensureAttributes() {
  const response = await request("/contacts/attributes");
  const existing = response.attributes ?? [];

  for (const [name, type] of requiredAttributes) {
    const attribute = existing.find(
      (candidate) => candidate.name === name && candidate.category === "normal",
    );
    if (attribute) {
      console.log(`Намерен атрибут: ${name} (${attribute.type})`);
      continue;
    }
    if (dryRun) {
      console.log(`[dry-run] Липсва атрибут: ${name} (${type})`);
      continue;
    }
    await request(`/contacts/attributes/normal/${encodeURIComponent(name)}`, {
      method: "POST",
      body: JSON.stringify({ type }),
    });
    console.log(`Създаден атрибут: ${name} (${type})`);
  }
}

async function inspectSenders() {
  const response = await request("/senders");
  const senders = response.senders ?? [];
  for (const email of [
    "contact@d-media.org",
    "newsletter@d-media.org",
    "noreply@d-media.org",
  ]) {
    const sender = senders.find((candidate) => candidate.email === email);
    console.log(
      sender
        ? `Sender ${email}: ${sender.active === false ? "неактивен" : "активен"}`
        : `Sender ${email}: не е намерен`,
    );
  }
}

async function main() {
  if (!apiKey) {
    if (dryRun) {
      console.log("Dry-run без API заявка.");
      console.log(`[dry-run] Изисквана папка: ${folderName}`);
      for (const name of requiredLists) console.log(`[dry-run] Изискван списък: ${name}`);
      for (const [name, type] of requiredAttributes) {
        console.log(`[dry-run] Изискван атрибут: ${name} (${type})`);
      }
      return;
    }
    throw new Error(
      "BREVO_API_KEY липсва. Подай го само за процеса: BREVO_API_KEY='…' node scripts/setup-brevo.mjs",
    );
  }

  const folderId = await ensureFolder();
  const lists = await ensureLists(folderId);
  await ensureAttributes();
  await inspectSenders();

  if (!dryRun) {
    console.log("Cloudflare non-secret variables:");
    console.log(`BREVO_WEBSITE_LEADS_LIST_ID=${lists["Website Leads"]}`);
    console.log(`BREVO_NEWSLETTER_LIST_ID=${lists["Newsletter Subscribers"]}`);
    console.log(`BREVO_CLIENTS_LIST_ID=${lists.Clients}`);
  }
}

main().catch((error) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
