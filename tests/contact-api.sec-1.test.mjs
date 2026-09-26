import assert from "node:assert/strict";
import test from "node:test";
import { onRequestPost } from "../astro/functions/api/contact.ts";
import { buildInternalInquiryEmail } from "../astro/src/lib/contact-email-templates.ts";

function createDatabase({ recentCount = 0 } = {}) {
  const state = { inquiryInserted: false, inquiryStatus: null };
  return {
    state,
    prepare(sql) {
      return {
        bind(...values) {
          return {
            async first() {
              if (sql.includes("SELECT COUNT(*) as count FROM inquiries")) return { count: recentCount };
              return null;
            },
            async run() {
              if (sql.includes("INSERT INTO inquiries")) state.inquiryInserted = true;
              if (sql.includes("UPDATE inquiries SET status")) state.inquiryStatus = values[0];
              return { meta: { changes: 1 } };
            },
          };
        },
      };
    },
  };
}

function formRequest(overrides = {}) {
  const form = new FormData();
  const fields = {
    locale: "en",
    name: "Taylor Client",
    email: "taylor@example.com",
    company: "Example Co",
    service: "Other",
    message: "Please contact me.",
    gdprConsent: "yes",
    "cf-turnstile-response": "valid-token",
    ...overrides,
  };
  for (const [name, value] of Object.entries(fields)) form.set(name, value);
  return new Request("https://example.test/api/contact", {
    method: "POST",
    headers: { Accept: "application/json", "cf-connecting-ip": "192.0.2.10" },
    body: form,
  });
}

async function streamedRequest(bytes, headers = {}) {
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(bytes);
      controller.close();
    },
  });
  return new Request("https://example.test/api/contact", {
    method: "POST",
    headers: { Accept: "application/json", "cf-connecting-ip": "192.0.2.10", ...headers },
    body,
    duplex: "half",
  });
}

async function invoke(request, { recentCount = 0, turnstileSuccess = true, crmStatus = 201 } = {}) {
  const database = createDatabase({ recentCount });
  const calls = { crm: [], emails: 0, turnstile: 0 };
  const originalFetch = globalThis.fetch;
  globalThis.fetch = async (input, init = {}) => {
    const url = String(input);
    if (url.includes("siteverify")) {
      calls.turnstile += 1;
      return Response.json({ success: turnstileSuccess }, { status: 200 });
    }
    if (url.endsWith("/contacts")) {
      calls.crm.push(JSON.parse(init.body));
      if (crmStatus >= 400) return new Response("mock CRM error", { status: crmStatus });
      return Response.json({ id: 42 }, { status: crmStatus });
    }
    if (url.endsWith("/smtp/email")) {
      calls.emails += 1;
      return Response.json({ messageId: `mail-${calls.emails}` }, { status: 201 });
    }
    throw new Error(`Unexpected request: ${url}`);
  };

  try {
    const response = await onRequestPost({
      request,
      env: {
        d_media_inquiries: database,
        TURNSTILE_SECRET_KEY: "test-secret",
        BREVO_API_KEY: "test-api-key",
        BREVO_WEBSITE_LEADS_LIST_ID: "7",
      },
    });
    return { response, database, calls };
  } finally {
    globalThis.fetch = originalFetch;
  }
}

test("new email creates a CRM lead without enabling updates to existing contacts", async () => {
  const result = await invoke(formRequest());
  assert.equal(result.response.status, 200);
  assert.equal(result.database.state.inquiryInserted, true);
  assert.equal(result.calls.crm.length, 1);
  assert.equal(result.calls.crm[0].updateEnabled, false);
  assert.deepEqual(result.calls.crm[0].listIds, [7]);
  assert.equal(result.calls.emails, 2);
});

test("existing email conflict does not block D1 storage or inquiry emails", async () => {
  const result = await invoke(formRequest(), { crmStatus: 400 });
  assert.equal(result.response.status, 200);
  assert.equal(result.database.state.inquiryInserted, true);
  assert.equal(result.calls.crm.length, 1);
  assert.equal(result.calls.crm[0].updateEnabled, false);
  assert.equal(result.calls.emails, 2);
});

test("CRM failure leaves the inquiry stored in D1", async () => {
  const result = await invoke(formRequest(), { crmStatus: 500 });
  assert.equal(result.response.status, 200);
  assert.equal(result.database.state.inquiryInserted, true);
  assert.equal(result.calls.emails, 2);
});

test("invalid email is rejected with HTTP 400", async () => {
  const result = await invoke(formRequest({ email: "not-an-email" }));
  assert.equal(result.response.status, 400);
  assert.equal(result.calls.turnstile, 0);
  assert.equal(result.database.state.inquiryInserted, false);
});

test("invalid Turnstile response is rejected before D1 insertion", async () => {
  const result = await invoke(formRequest(), { turnstileSuccess: false });
  assert.equal(result.response.status, 400);
  assert.equal(result.calls.turnstile, 1);
  assert.equal(result.database.state.inquiryInserted, false);
});

test("more than five inquiries in ten minutes is rejected with HTTP 429", async () => {
  const result = await invoke(formRequest(), { recentCount: 5 });
  assert.equal(result.response.status, 429);
  assert.equal(result.calls.turnstile, 0);
  assert.equal(result.database.state.inquiryInserted, false);
});

test("a body over the application limit is rejected with HTTP 413 without Content-Length", async () => {
  const body = new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array(64 * 1024));
      controller.enqueue(new Uint8Array(1));
      controller.close();
    },
  });
  const request = new Request("https://example.test/api/contact", {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/octet-stream" },
    body,
    duplex: "half",
  });
  assert.equal(request.headers.has("content-length"), false);
  const result = await invoke(request);
  assert.equal(result.response.status, 413);
  assert.equal(result.database.state.inquiryInserted, false);
  assert.equal(result.calls.turnstile, 0);
});

test("a body over the application limit is rejected from an oversized Content-Length", async () => {
  const request = await streamedRequest(new Uint8Array(), {
    "Content-Type": "application/octet-stream",
    "Content-Length": String(64 * 1024 + 1),
  });
  const result = await invoke(request);
  assert.equal(result.response.status, 413);
  assert.equal(result.database.state.inquiryInserted, false);
  assert.equal(result.calls.turnstile, 0);
});

test("an underreported Content-Length cannot bypass the streamed body limit", async () => {
  const request = await streamedRequest(new Uint8Array(64 * 1024 + 1), {
    "Content-Type": "application/octet-stream",
    "Content-Length": "1",
  });
  assert.equal(request.headers.get("content-length"), "1");
  const result = await invoke(request);
  assert.equal(result.response.status, 413);
  assert.equal(result.database.state.inquiryInserted, false);
  assert.equal(result.calls.turnstile, 0);
});

test("a malformed Content-Length cannot bypass the streamed body limit", async () => {
  const request = await streamedRequest(new Uint8Array(64 * 1024 + 1), {
    "Content-Type": "application/octet-stream",
    "Content-Length": "not-a-number",
  });
  assert.equal(request.headers.get("content-length"), "not-a-number");
  const result = await invoke(request);
  assert.equal(result.response.status, 413);
  assert.equal(result.database.state.inquiryInserted, false);
  assert.equal(result.calls.turnstile, 0);
});

test("a valid Content-Length below the application limit allows normal form processing", async () => {
  const form = formRequest();
  const contentType = form.headers.get("content-type");
  const bytes = new Uint8Array(await form.arrayBuffer());
  const request = await streamedRequest(bytes, {
    "Content-Type": contentType,
    "Content-Length": String(bytes.byteLength),
  });
  assert.ok(Number(request.headers.get("content-length")) < 64 * 1024);
  const result = await invoke(request);
  assert.equal(result.response.status, 200);
  assert.equal(result.database.state.inquiryInserted, true);
  assert.equal(result.calls.emails, 2);
});

test("a normal form without Content-Length is processed successfully", async () => {
  const form = formRequest();
  const contentType = form.headers.get("content-type");
  const bytes = new Uint8Array(await form.arrayBuffer());
  const request = await streamedRequest(bytes, { "Content-Type": contentType });
  assert.equal(request.headers.has("content-length"), false);
  const result = await invoke(request);
  assert.equal(result.response.status, 200);
  assert.equal(result.database.state.inquiryInserted, true);
  assert.equal(result.calls.emails, 2);
});

test("user-controlled values are HTML-escaped in the internal email", () => {
  const email = buildInternalInquiryEmail({
    id: "test-id",
    created_at: "2026-09-26T00:00:00.000Z",
    name: "<img src=x onerror=alert(1)>",
    email: "user@example.com",
    company: "<script>alert(1)</script>",
    service: "Other",
    budget: "",
    deadline: "",
    website: "https://example.com/?q=<script>",
    message: "<script>alert('x')</script>",
    additional_information: "<b>extra</b>",
    source_page: "https://example.com/contact/",
    ip_country: "US",
    turnstile_valid: "1",
  });
  assert.doesNotMatch(email.htmlContent, /<script>|<img src=x|<b>extra<\/b>/);
  assert.match(email.htmlContent, /&lt;script&gt;/);
  assert.match(email.htmlContent, /&lt;img src=x/);
  assert.match(email.htmlContent, /&lt;b&gt;extra&lt;\/b&gt;/);
});
