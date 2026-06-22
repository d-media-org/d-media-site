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

const fontStack = "Arial, Helvetica, sans-serif";

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
        .email-pad { padding-left: 22px !important; padding-right: 22px !important; }
        .email-title { font-size: 26px !important; line-height: 32px !important; }
        .data-label, .data-value { display: block !important; width: 100% !important; }
        .data-label { padding-bottom: 4px !important; }
      }
    </style>
  </head>
  <body style="margin:0;padding:0;background:#f2f2f2;color:#111111;font-family:${fontStack};">
    <div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">${escapeHtml(preheader)}</div>
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;background:#f2f2f2;border-collapse:collapse;">
      <tr>
        <td align="center" style="padding:32px 12px;">
          <table role="presentation" width="600" cellspacing="0" cellpadding="0" border="0" class="email-shell" style="width:600px;max-width:600px;background:#ffffff;border:1px solid #dddddd;border-collapse:collapse;">
            <tr>
              <td class="email-pad" style="padding:28px 34px 24px;border-bottom:1px solid #dddddd;">
                <div style="font-family:${fontStack};font-size:22px;line-height:28px;font-weight:700;letter-spacing:-0.4px;color:#111111;">d . media</div>
              </td>
            </tr>
            ${content}
            <tr>
              <td class="email-pad" style="padding:22px 34px;border-top:1px solid #dddddd;color:#666666;font-family:${fontStack};font-size:12px;line-height:18px;">
                d-media.org · contact@d-media.org
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
    <td class="data-label" width="34%" valign="top" style="width:34%;padding:12px 14px 12px 0;border-bottom:1px solid #e5e5e5;color:#777777;font-family:${fontStack};font-size:12px;line-height:18px;font-weight:700;text-transform:uppercase;letter-spacing:0.6px;">${escapeHtml(label)}</td>
    <td class="data-value" width="66%" valign="top" style="width:66%;padding:12px 0;border-bottom:1px solid #e5e5e5;color:#111111;font-family:${fontStack};font-size:14px;line-height:21px;overflow-wrap:anywhere;">${escapeHtml(formatField(value))}</td>
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
      <td class="email-pad" style="padding:34px;">
        <div style="margin:0 0 10px;color:#777777;font-family:${fontStack};font-size:12px;line-height:18px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;">Проектно запитване</div>
        <h1 class="email-title" style="margin:0 0 24px;color:#111111;font-family:${fontStack};font-size:30px;line-height:36px;font-weight:700;letter-spacing:-0.6px;">Ново запитване от d-media.org</h1>
        <table role="presentation" width="100%" cellspacing="0" cellpadding="0" border="0" style="width:100%;border-collapse:collapse;">
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
      <td class="email-pad" style="padding:42px 34px 46px;">
        <div style="margin:0 0 10px;color:#777777;font-family:${fontStack};font-size:12px;line-height:18px;font-weight:700;text-transform:uppercase;letter-spacing:0.8px;">Потвърждение</div>
        <h1 class="email-title" style="margin:0 0 24px;color:#111111;font-family:${fontStack};font-size:30px;line-height:36px;font-weight:700;letter-spacing:-0.6px;">Получихме Вашето запитване.</h1>
        <p style="margin:0 0 16px;color:#222222;font-family:${fontStack};font-size:16px;line-height:25px;">Здравейте, ${safeName},</p>
        <p style="margin:0 0 16px;color:#444444;font-family:${fontStack};font-size:16px;line-height:25px;">Ще прегледаме изпратената информация и ще се свържем с Вас.</p>
        <p style="margin:0;color:#444444;font-family:${fontStack};font-size:16px;line-height:25px;">Можете да отговорите директно на този имейл, ако желаете да добавите уточнение.</p>
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
