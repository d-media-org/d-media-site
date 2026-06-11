import type { Locale } from "@/lib/i18n";
import { localizeHref } from "@/lib/i18n";

const uiCopy = {
  bg: {
    localeLabel: "BG",
    alternateLocaleLabel: "EN",
    languageSwitcherAria: "Избор на език",
    openMenu: "Отвори менюто",
    closeMenu: "Затвори менюто",
    homeAria: "Начало",
    mainNavigationAria: "Основна навигация",
    mobileNavigationAria: "Мобилна навигация",
    footer: {
      contact: "Контакт",
      terms: "Условия",
      privacy: "Поверителност",
      copyright: "© 2026 d . media. Всички права запазени.",
      backToTop: "Нагоре",
      backToStart: "Към началната страница",
      themeAuto: "Авто",
      themeLight: "Светло",
      themeDark: "Тъмно",
      themeSwitcherAria: "Цветова схема",
    },
    consent: {
      ariaLabel: "Съгласие за анализ",
      eyebrow: "поверителност",
      text: "Аналитични инструменти се активират само след Вашето съгласие.",
      more: "Прочети повече",
      reject: "Откажи",
      accept: "Приеми",
    },
    notFound: {
      eyebrow: "404",
      title: "Тази страница не е налична.",
      home: "Към началната страница",
    },
    fileCount: (count: number) => `${count} ${count === 1 ? "файл" : "файла"}`,
    projectHint: "виж проекта",
    mockupHint: "отвори файла",
    closePreview: "затвори",
    featuredProject: "избран проект",
    fullArchive: "пълен архив",
    historicalArchive: "Исторически архив",
    archiveProject: "Архивен проект",
  },
  en: {
    localeLabel: "EN",
    alternateLocaleLabel: "BG",
    languageSwitcherAria: "Language switcher",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    homeAria: "Home",
    mainNavigationAria: "Main navigation",
    mobileNavigationAria: "Mobile navigation",
    footer: {
      contact: "Contact",
      terms: "Terms",
      privacy: "Privacy",
      copyright: "© 2026 d . media. All rights reserved.",
      backToTop: "Back to top",
      backToStart: "Back to home",
      themeAuto: "Auto",
      themeLight: "Light",
      themeDark: "Dark",
      themeSwitcherAria: "Color theme",
    },
    consent: {
      ariaLabel: "Analytics consent",
      eyebrow: "privacy",
      text: "Analytics tools are activated only after your consent.",
      more: "Read more",
      reject: "Decline",
      accept: "Accept",
    },
    notFound: {
      eyebrow: "404",
      title: "This page is not available.",
      home: "Back to homepage",
    },
    fileCount: (count: number) => `${count} ${count === 1 ? "file" : "files"}`,
    projectHint: "view project",
    mockupHint: "open file",
    closePreview: "close",
    featuredProject: "featured project",
    fullArchive: "full archive",
    historicalArchive: "historical archive",
    archiveProject: "archived project",
  },
} as const;

export function getUiCopy(locale: Locale) {
  return uiCopy[locale];
}

export function getLocaleSwitcherItems(locale: Locale, pathname: string) {
  return [
    {
      locale: "bg" as const,
      label: uiCopy.bg.localeLabel,
      href: localizeHref("bg", pathname),
      isActive: locale === "bg",
    },
    {
      locale: "en" as const,
      label: uiCopy.en.localeLabel,
      href: localizeHref("en", pathname),
      isActive: locale === "en",
    },
  ];
}
