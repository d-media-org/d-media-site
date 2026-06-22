import { escapeHtml, formatField } from "./contact-inquiry.ts";

export type InquiryEmailRecord = {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  deadline: string;
  website: string;
  message: string;
  additional_information: string;
  source_page: string;
  ip_country: string;
  turnstile_valid: string;
};

type EmailTemplate = {
  subject: string;
  textContent: string;
  htmlContent: string;
};

const fontStack = "'Panton', 'Helvetica Neue', Helvetica, Arial, sans-serif";
const logoUrl = "https://www.d-media.org/assets/brand/ONLY-logotype.png";

function emailShell(content: string, preheader: string) {
  return `<!doctype html>
<html lang="bg">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>d . media</title>
    <style>
      @media only screen and (max-width: 620px) {
        .email-shell { width: 100% !important; }
        .email-edge { padding-left: 24px !important; padding-right: 24px !important; }
        .email-title { font-size: 29px !important; line-height: 35px !important; }
        .data-label, .data-value { display: block !important; width: 100% !important; }
        .data-label { padding: 18px 0 5px !important; border-bottom:0 !important; }
        .data-value { padding: 0 0 18px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;color:#0a0a0a;font-family:${fontStack};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#ffffff;border-collapse:collapse;table-layout:fixed;">
      <tr>
        <td align="center" style="padding:0 12px;">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" class="email-shell" style="width:100%;max-width:640px;background:#ffffff;border-collapse:collapse;table-layout:fixed;">
            <tr>
              <td class="email-edge" style="padding:40px 40px 30px;border-bottom:1px solid #e5e5e5;">
                <a href="https://www.d-media.org/" style="display:inline-block;color:#0a0a0a;text-decoration:none;">
                  <img src="${logoUrl}" width="154" height="40" alt="d . media" style="display:block;width:154px;height:auto;max-width:100%;border:0;outline:none;text-decoration:none;">
                </a>
              </td>
            </tr>
            ${content}
            <tr>
              <td class="email-edge" style="padding:30px 40px 42px;border-top:1px solid #e5e5e5;color:#7b7b7b;font-family:${fontStack};font-size:12px;line-height:19px;">
                <a href="https://www.d-media.org/" style="color:#4f4f4f;text-decoration:underline;text-decoration-color:#cfcfcf;text-underline-offset:3px;">d-media.org</a>
                <span style="color:#cfcfcf;">&nbsp;&nbsp;·&nbsp;&nbsp;</span>
                <a href="mailto:contact@d-media.org" style="color:#4f4f4f;text-decoration:underline;text-decoration-color:#cfcfcf;text-underline-offset:3px;">contact@d-media.org</a>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

function dataRow(label: string, value: string) {
  return `<tr>
    <td class="data-label" width="31%" valign="top" style="width:31%;padding:17px 20px 17px 0;border-bottom:1px solid #e5e5e5;color:#7b7b7b;font-family:${fontStack};font-size:11px;line-height:17px;font-weight:700;text-transform:uppercase;letter-spacing:0.75px;">${escapeHtml(label)}</td>
    <td class="data-value" width="69%" valign="top" style="width:69%;padding:17px 0;border-bottom:1px solid #e5e5e5;color:#0f0f0f;font-family:${fontStack};font-size:15px;line-height:23px;overflow-wrap:anywhere;">${escapeHtml(formatField(value))}</td>
  </tr>`;
}

export function buildInternalInquiryEmail(record: InquiryEmailRecord): EmailTemplate {
  const rows = [
    ["Дата и час", record.created_at],
    ["Име", record.name],
    ["E-mail", record.email],
    ["Компания", record.company],
    ["Услуга", record.service],
    ["Бюджет", record.budget],
    ["Желан срок", record.deadline],
    ["Съществуващ уебсайт", record.website],
    ["Съобщение", record.message],
    ["Допълнителна информация", record.additional_information],
    ["Източник", record.source_page],
    ["Държава по IP", record.ip_country],
    ["Turnstile", record.turnstile_valid === "1" ? "Успешна проверка" : "Неуспешна проверка"],
    ["D1 ID", record.id],
  ];

  const textContent = [
    "Ново запитване от d-media.org",
    "",
    ...rows.map(([label, value]) => `${label}: ${formatField(value)}`),
  ].join("\n");

  const htmlContent = emailShell(
    `<tr>
      <td class="email-edge" style="padding:46px 40px 48px;">
        <div style="margin:0 0 14px;color:#7b7b7b;font-family:${fontStack};font-size:11px;line-height:17px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Проектно запитване</div>
        <h1 class="email-title" style="margin:0 0 36px;color:#0a0a0a;font-family:${fontStack};font-size:36px;line-height:42px;font-weight:700;letter-spacing:-0.8px;">Ново запитване от<br>d-media.org</h1>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;border-top:1px solid #e5e5e5;">
          ${rows.map(([label, value]) => dataRow(label, value)).join("")}
        </table>
      </td>
    </tr>`,
    `Ново запитване от ${record.name}`,
  );

  return {
    subject: "Ново запитване от d-media.org",
    textContent,
    htmlContent,
  };
}

export function buildClientConfirmationEmail(name: string): EmailTemplate {
  const safeName = escapeHtml(name);
  const textContent = [
    `Здравейте, ${name},`,
    "",
    "Получихме Вашето запитване и ще прегледаме изпратената информация.",
    "Можете да отговорите директно на този имейл, ако желаете да добавите уточнение.",
    "",
    "d . media",
    "contact@d-media.org",
  ].join("\n");

  const htmlContent = emailShell(
    `<tr>
      <td class="email-edge" style="padding:56px 40px 64px;">
        <div style="margin:0 0 14px;color:#7b7b7b;font-family:${fontStack};font-size:11px;line-height:17px;font-weight:700;text-transform:uppercase;letter-spacing:1px;">Потвърждение</div>
        <h1 class="email-title" style="margin:0 0 38px;max-width:500px;color:#0a0a0a;font-family:${fontStack};font-size:36px;line-height:42px;font-weight:700;letter-spacing:-0.8px;">Получихме Вашето<br>запитване.</h1>
        <p style="margin:0 0 22px;color:#0f0f0f;font-family:${fontStack};font-size:17px;line-height:27px;">Здравейте, ${safeName},</p>
        <p style="margin:0 0 18px;max-width:500px;color:#4f4f4f;font-family:${fontStack};font-size:17px;line-height:28px;">Ще прегледаме изпратената информация и ще се свържем с Вас.</p>
        <p style="margin:0;max-width:500px;color:#4f4f4f;font-family:${fontStack};font-size:17px;line-height:28px;">Можете да отговорите директно на този имейл, ако желаете да добавите уточнение.</p>
      </td>
    </tr>`,
    "Получихме Вашето запитване.",
  );

  return {
    subject: "Получихме Вашето запитване | d . media",
    textContent,
    htmlContent,
  };
}
