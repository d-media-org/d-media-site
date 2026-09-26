import {
  clampText,
  contactFieldLimits,
  contactServices,
  isValidEmail,
} from "../../src/lib/contact-inquiry.ts";
import {
  buildClientConfirmationEmail,
  buildInternalInquiryEmail,
  type InquiryEmailRecord,
} from "../../src/lib/contact-email-templates.ts";
import { upsertWebsiteLead } from "../../src/lib/brevo-contacts.ts";
import { contactEmail } from "../../src/lib/site-content.ts";

const budgetOptions = new Set([
  "Under €1,000",
  "€1,000–€3,000",
  "€3,000–€5,000",
  "€5,000–€10,000",
  "Over €10,000",
  "Not Sure Yet",
]);

const maxContactRequestBytes = 64 * 1024;

const messages = {
  bg: {
    invalidForm: "Формулярът не може да бъде обработен.",
    invalidSubmission: "Невалидно изпращане.",
    missingFields: "Моля, попълни всички задължителни полета.",
    invalidEmail: "Моля, въведи валиден e-mail адрес.",
    invalidService: "Моля, избери валидна услуга.",
    invalidBudget: "Моля, избери валиден бюджет.",
    consentRequired: "Необходимо е съгласие, за да изпратиш запитването.",
    rateLimited: "Изпратени са твърде много запитвания. Опитай отново по-късно.",
    turnstileFailed: "Потвърждението против спам е неуспешно. Опитай отново.",
    serverError: "Запитването не можа да бъде записано. Опитай отново.",
    emailError: "Запитването е записано, но потвърждението не можа да бъде изпратено. Опитай отново по-късно.",
  },
  en: {
    invalidForm: "The form could not be processed.",
    invalidSubmission: "Invalid submission.",
    missingFields: "Please complete all required fields.",
    invalidEmail: "Please enter a valid email address.",
    invalidService: "Please select a valid service.",
    invalidBudget: "Please select a valid budget.",
    consentRequired: "Consent is required to send the inquiry.",
    rateLimited: "Too many inquiries were submitted. Please try again later.",
    turnstileFailed: "The anti-spam verification failed. Please try again.",
    serverError: "The inquiry could not be saved. Please try again.",
    emailError: "The inquiry was saved, but the confirmation email could not be sent. Please try again later.",
  },
} as const;

function json(body: unknown, init: ResponseInit = {}) {
  return new Response(JSON.stringify(body), {
    ...init,
    headers: { "Content-Type": "application/json; charset=utf-8", ...(init.headers || {}) },
  });
}

function prefersHtml(request: Request) {
  const accept = request.headers.get("Accept") ?? "";
  return accept.includes("text/html") || accept.includes("application/xhtml+xml") || !accept.includes("application/json");
}

function clean(value: FormDataEntryValue | null, maxLength: number) {
  return clampText(typeof value === "string" ? value : "", maxLength);
}

async function readBoundedRequestBody(request: Request, maxBytes: number) {
  const contentLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(contentLength) && contentLength > maxBytes) return null;

  if (!request.body) return new Uint8Array();

  const reader = request.body.getReader();
  const chunks: Uint8Array[] = [];
  let totalBytes = 0;

  while (true) {
    const { done, value } = await reader.read();
    if (done) break;

    totalBytes += value.byteLength;
    if (totalBytes > maxBytes) {
      await reader.cancel().catch(() => undefined);
      return null;
    }

    chunks.push(value);
  }

  const body = new Uint8Array(totalBytes);
  let offset = 0;
  for (const chunk of chunks) {
    body.set(chunk, offset);
    offset += chunk.byteLength;
  }
  return body;
}

async function verifyTurnstile(env: Env, token: string, ip?: string) {
  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
  if (ip) body.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

async function claimRateLimitSlot(database: D1Database, ipAddress: string) {
  const windowStart = Math.floor(Date.now() / 600_000) * 600_000;

  for (let slot = 0; slot < 5; slot += 1) {
    const result = await database
      .prepare(
        "INSERT OR IGNORE INTO inquiry_rate_limit_slots (ip_address, window_start, slot) VALUES (?1, ?2, ?3)",
      )
      .bind(ipAddress, windowStart, slot)
      .run();

    if ((result.meta.changes ?? 0) > 0) return true;
  }

  return false;
}

async function sendEmail(
  env: Env,
  payload: {
    to: { email: string; name?: string }[];
    subject: string;
    textContent: string;
    htmlContent: string;
    replyTo?: { email: string; name?: string };
  },
) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": env.BREVO_API_KEY,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      sender: { email: contactEmail, name: "d . media" },
      ...payload,
    }),
  });
  if (!response.ok) {
    const detail = await response.text();
    throw new Error(`Brevo API returned ${response.status}: ${detail}`);
  }
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  let requestBody: Uint8Array | null;
  try {
    requestBody = await readBoundedRequestBody(request, maxContactRequestBytes);
  } catch {
    return json({ ok: false, error: messages.bg.invalidForm }, { status: 400 });
  }
  if (requestBody === null) return json({ ok: false }, { status: 413 });

  const formHeaders = new Headers(request.headers);
  formHeaders.delete("content-length");
  const formRequest = new Request(request.url, { method: "POST", headers: formHeaders, body: requestBody });
  const formData = await formRequest.formData().catch(() => null);
  if (!formData) return json({ ok: false, error: messages.bg.invalidForm }, { status: 400 });

  const locale = clean(formData.get("locale"), 2) === "en" ? "en" : "bg";
  const copy = messages[locale];

  const honeypot = clean(formData.get("honeypot"), 100);
  if (honeypot) return json({ ok: false, error: copy.invalidSubmission }, { status: 400 });

  const name = clean(formData.get("name"), contactFieldLimits.name);
  const email = clean(formData.get("email"), contactFieldLimits.email).toLowerCase();
  const company = clean(formData.get("company"), contactFieldLimits.company);
  const service = clean(formData.get("service"), 100);
  const message = clean(formData.get("message"), contactFieldLimits.message);
  const budget = clean(formData.get("budget"), 100);
  const deadline = clean(formData.get("deadline"), contactFieldLimits.deadline);
  const website = clean(formData.get("website"), contactFieldLimits.website);
  const additionalInformation = clean(formData.get("additionalInformation"), contactFieldLimits.additionalInformation);
  const gdprConsent = clean(formData.get("gdprConsent"), 5);
  const turnstileToken = clean(formData.get("cf-turnstile-response"), 4096);
  const projectScope = clean(formData.get("projectScope"), 1000);
  const complexity = clean(formData.get("complexity"), 100);
  const projectTimeline = clean(formData.get("projectTimeline"), 100);
  const estimatedRange = clean(formData.get("estimatedRange"), 100);
  const services = clean(formData.get("services"), 1000);
  const goal = clean(formData.get("goal"), 200);
  const readinessScore = clean(formData.get("readinessScore"), 10);
  const leadScore = clean(formData.get("leadScore"), 10);
  const confidence = clean(formData.get("confidence"), 20);
  const recommendations = clean(formData.get("recommendations"), 1000);
  const projectBrief = clean(formData.get("projectBrief"), contactFieldLimits.projectBrief);

  if (!name || !email || !service || !message || !gdprConsent || !turnstileToken) {
    return json({ ok: false, error: copy.missingFields }, { status: 400 });
  }
  if (!isValidEmail(email)) return json({ ok: false, error: copy.invalidEmail }, { status: 400 });
  if (!contactServices.includes(service as (typeof contactServices)[number])) {
    return json({ ok: false, error: copy.invalidService }, { status: 400 });
  }
  if (budget && !budgetOptions.has(budget)) return json({ ok: false, error: copy.invalidBudget }, { status: 400 });
  if (gdprConsent !== "yes") return json({ ok: false, error: copy.consentRequired }, { status: 400 });

  const ipAddress = request.headers.get("cf-connecting-ip") ?? "";
  const ipCountry = request.cf?.country ?? "";
  const userAgent = clean(request.headers.get("user-agent"), 300);

  const recent = await env.d_media_inquiries
    .prepare("SELECT COUNT(*) as count FROM inquiries WHERE ip_address = ?1 AND created_at >= datetime('now', '-10 minutes')")
    .bind(ipAddress)
    .first<{ count: number }>();
  if ((recent?.count ?? 0) >= 5) return json({ ok: false, error: copy.rateLimited }, { status: 429 });

  const turnstileValid = await verifyTurnstile(env, turnstileToken, ipAddress || undefined);
  if (!turnstileValid) return json({ ok: false, error: copy.turnstileFailed }, { status: 400 });

  const rateLimitSlotClaimed = await claimRateLimitSlot(env.d_media_inquiries, ipAddress);
  if (!rateLimitSlotClaimed) return json({ ok: false, error: copy.rateLimited }, { status: 429 });

  const record = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    status: "received",
    name,
    email,
    company,
    service: services ? services.replace(/\|/g, ", ") : service,
    budget,
    deadline,
    website,
    message,
    additional_information: additionalInformation,
    source_page: request.headers.get("referer") ?? new URL(request.url).origin + (locale === "en" ? "/en/contact/" : "/contact/"),
    ip_address: ipAddress,
    ip_country: ipCountry,
    user_agent: userAgent,
    gdpr_consent: "1",
    turnstile_valid: "1",
  } as Record<string, string>;

  try {
    await env.d_media_inquiries
      .prepare(`INSERT INTO inquiries (id, created_at, status, name, email, company, service, budget, deadline, website, message, additional_information, ip_address, ip_country, user_agent, gdpr_consent, turnstile_valid) VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10, ?11, ?12, ?13, ?14, ?15, ?16, ?17)`)
      .bind(
        record.id,
        record.created_at,
        "received_email_pending",
        record.name,
        record.email,
        record.company,
        record.service,
        record.budget,
        record.deadline,
        record.website,
        record.message,
        record.additional_information,
        record.ip_address,
        record.ip_country,
        record.user_agent,
        1,
        1,
      )
      .run();
  } catch (error) {
    console.error("Contact inquiry database write failed", error);
    return json({ ok: false, error: copy.serverError }, { status: 500 });
  }

  try {
    await upsertWebsiteLead(
      {
        apiKey: env.BREVO_API_KEY,
        websiteLeadsListId: env.BREVO_WEBSITE_LEADS_LIST_ID,
      },
      {
        email,
        attributes: {
          COMPANY: company || undefined,
          SERVICE: services ? services.replace(/\|/g, ", ") : service,
          SERVICES: services || service,
          SOURCE: "d-media.org contact form",
          WEBSITE: website || undefined,
          BUDGET: budget || undefined,
          DEADLINE: deadline || undefined,
          LANGUAGE: locale,
          CONSENT_SOURCE: "d-media.org contact form GDPR consent",
          CONSENT_TIMESTAMP: record.created_at,
          PROJECT_SCOPE: projectScope || undefined,
          COMPLEXITY: complexity || undefined,
          TIMELINE: projectTimeline || undefined,
          ESTIMATED_RANGE: estimatedRange || undefined,
          GOAL: goal || undefined,
          READINESS_SCORE: readinessScore || undefined,
          LEAD_SCORE: leadScore || undefined,
          CONFIDENCE: confidence || undefined,
          RECOMMENDATIONS: recommendations || undefined,
          PROJECT_BRIEF: projectBrief || undefined,
        },
      },
    );
  } catch (error) {
    console.error("Contact inquiry Brevo CRM synchronization failed", error);
  }

  try {
    const internalEmail = buildInternalInquiryEmail(record as InquiryEmailRecord);
    const clientEmail = buildClientConfirmationEmail(name);
    await sendEmail(env, {
      to: [{ email: contactEmail, name: "d . media" }],
      replyTo: { email, name },
      ...internalEmail,
    });
    await sendEmail(env, {
      to: [{ email, name }],
      replyTo: { email: contactEmail, name: "d . media" },
      ...clientEmail,
    });
    await env.d_media_inquiries.prepare("UPDATE inquiries SET status = ?1 WHERE id = ?2").bind("received_email_sent", record.id).run();
  } catch (error) {
    console.error("Contact inquiry Brevo delivery failed", error);
    return json({ ok: false, error: copy.emailError }, { status: 502 });
  }

  if (prefersHtml(request)) {
    const url = new URL(request.url);
    return Response.redirect(new URL(url.pathname.startsWith("/en/") ? "/en/contact/?sent=1" : "/contact/?sent=1", url).toString(), 303);
  }

  return json({ ok: true });
};

interface Env {
  d_media_inquiries: D1Database;
  TURNSTILE_SECRET_KEY: string;
  BREVO_API_KEY: string;
  BREVO_WEBSITE_LEADS_LIST_ID?: string;
}
