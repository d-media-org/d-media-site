export const contactServices = [
  "Brand Identity",
  "Graphic Design",
  "Content Creation",
  "Social Media Management",
  "Web Design & Development",
  "SEO / GEO / AI Visibility",
  "Technical Support",
  "Other",
] as const;

export const contactBudgets = [
  "Under €1,000",
  "€1,000–€3,000",
  "€3,000–€5,000",
  "€5,000–€10,000",
  "Over €10,000",
  "Not Sure Yet",
] as const;

export const contactServiceLabelsBg: Record<(typeof contactServices)[number], string> = {
  "Brand Identity": "Бранд идентичност",
  "Graphic Design": "Графичен дизайн",
  "Content Creation": "Създаване на съдържание",
  "Social Media Management": "Управление на социални мрежи",
  "Web Design & Development": "Уеб дизайн и разработка",
  "SEO / GEO / AI Visibility": "SEO / GEO / видимост в AI",
  "Technical Support": "Техническа поддръжка",
  Other: "Друго",
};

export const contactBudgetLabelsBg: Record<(typeof contactBudgets)[number], string> = {
  "Under €1,000": "Под 1 000 €",
  "€1,000–€3,000": "1 000–3 000 €",
  "€3,000–€5,000": "3 000–5 000 €",
  "€5,000–€10,000": "5 000–10 000 €",
  "Over €10,000": "Над 10 000 €",
  "Not Sure Yet": "Все още не съм сигурен/сигурна",
};

export const contactFieldLimits = {
  name: 120,
  email: 180,
  company: 140,
  message: 4000,
  website: 300,
  deadline: 120,
  additionalInformation: 2000,
} as const;

export function cleanText(value: string) {
  return value
    .replace(/\u0000/g, "")
    .replace(/[\u0001-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function clampText(value: string, maxLength: number) {
  return cleanText(value).slice(0, maxLength);
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/u.test(email);
}

export function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

export function formatField(value: string | undefined) {
  return value && value.length ? value : "—";
}
