import {
  clampText,
  contactFieldLimits,
  contactServices,
  escapeHtml,
  formatField,
  isValidEmail,
} from "../../src/lib/contact-inquiry.ts";
import { contactEmail } from "../../src/lib/site-content.ts";

const budgetOptions = new Set([
  "Under €1,000",
  "€1,000–€3,000",
  "€3,000–€5,000",
  "€5,000–€10,000",
  "Over €10,000",
  "Not Sure Yet",
]);

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

function buildMessageText(record: Record<string, string>) {
  return [
    `Дата и час: ${record.created_at}`,
    `Име: ${record.name}`,
    `E-mail: ${record.email}`,
    `Фирма: ${record.company}`,
    `Услуга: ${record.service}`,
    `Бюджет: ${record.budget}`,
    `Срок: ${record.deadline}`,
    `Сайт: ${record.website}`,
    `Съобщение: ${record.message}`,
    `Допълнителна информация: ${record.additional_information}`,
    `Държава по IP: ${record.ip_country}`,
    `IP адрес: ${record.ip_address}`,
  ].join("\n");
}

function buildMessageHtml(record: Record<string, string>) {
  const rows = [
    ["Дата и час", record.created_at],
    ["Име", record.name],
    ["E-mail", record.email],
    ["Фирма", record.company],
    ["Услуга", record.service],
    ["Бюджет", record.budget],
    ["Срок", record.deadline],
    ["Сайт", record.website],
    ["Съобщение", record.message],
    ["Допълнителна информация", record.additional_information],
    ["Държава по IP", record.ip_country],
    ["IP адрес", record.ip_address],
  ];
  return `<!doctype html><html lang="bg"><body style="font-family:Arial,sans-serif;color:#111;line-height:1.5"><h1>Проектно запитване</h1><table cellspacing="0" cellpadding="8" style="border-collapse:collapse">${rows.map(([label, value]) => `<tr><th align="left" valign="top" style="border-bottom:1px solid #ddd">${escapeHtml(label)}</th><td style="border-bottom:1px solid #ddd">${escapeHtml(formatField(value))}</td></tr>`).join("")}</table></body></html>`;
}

async function verifyTurnstile(env: Env, token: string, ip?: string) {
  const body = new URLSearchParams({ secret: env.TURNSTILE_SECRET_KEY, response: token });
  if (ip) body.set("remoteip", ip);
  const response = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", { method: "POST", body });
  if (!response.ok) return false;
  const result = (await response.json()) as { success?: boolean };
  return result.success === true;
}

async function sendEmail(env: Env, payload: { to: string | string[]; subject: string; text: string; html: string }) {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${env.CF_ACCOUNT_ID}/email/sending/send`, {
    method: "POST",
    headers: { Authorization: `Bearer ${env.CF_EMAIL_API_TOKEN}`, "Content-Type": "application/json" },
    body: JSON.stringify({ from: { address: env.EMAIL_FROM, name: "d . media" }, ...payload }),
  });
  if (!response.ok) throw new Error(await response.text());
}

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  const formData = await request.formData().catch(() => null);
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

  const record = {
    id: crypto.randomUUID(),
    created_at: new Date().toISOString(),
    status: "received",
    name,
    email,
    company,
    service,
    budget,
    deadline,
    website,
    message,
    additional_information: additionalInformation,
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
    await sendEmail(env, {
      to: contactEmail,
      subject: `Ново проектно запитване: ${service} — ${name}`,
      text: buildMessageText(record),
      html: buildMessageHtml(record),
    });
    await sendEmail(env, {
      to: email,
      subject: locale === "bg" ? "Получихме твоето запитване" : "We received your inquiry",
      text:
        locale === "bg"
          ? "Благодарим за запитването.\n\nПолучихме съобщението ти и ще го прегледаме възможно най-скоро.\n\nТова е автоматично потвърждение."
          : "Thank you for your inquiry.\n\nWe have received your message and will review it as soon as possible.\n\nThis is an automated confirmation.",
      html:
        locale === "bg"
          ? "<p>Благодарим за запитването.</p><p>Получихме съобщението ти и ще го прегледаме възможно най-скоро.</p><p>Това е автоматично потвърждение.</p>"
          : "<p>Thank you for your inquiry.</p><p>We have received your message and will review it as soon as possible.</p><p>This is an automated confirmation.</p>",
    });
    await env.d_media_inquiries.prepare("UPDATE inquiries SET status = ?1 WHERE id = ?2").bind("received_email_sent", record.id).run();
  } catch (error) {
    console.error("Contact inquiry email delivery pending", error);
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
  CF_ACCOUNT_ID: string;
  CF_EMAIL_API_TOKEN: string;
  EMAIL_FROM: string;
}
