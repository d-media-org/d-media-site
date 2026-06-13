export const locales = ["bg", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "bg";

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function normalizeLocale(value?: string | null): Locale {
  return value && isLocale(value) ? value : defaultLocale;
}

export function getLocaleFromPathname(pathname: string): Locale {
  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return "en";
  }

  return defaultLocale;
}

export function stripLocalePrefix(pathname: string) {
  if (pathname === "/en") {
    return "/";
  }

  if (pathname.startsWith("/en/")) {
    return pathname.replace(/^\/en/, "") || "/";
  }

  return pathname || "/";
}

export function localizeHref(locale: Locale, pathname: string) {
  const withTrailingSlash = (value: string) => {
    if (value === "/" || value.endsWith("/") || /[?#]/u.test(value)) {
      return value;
    }

    return `${value}/`;
  };

  if (locale === defaultLocale) {
    return withTrailingSlash(pathname === "/en" ? "/" : stripLocalePrefix(pathname));
  }

  const normalized = pathname === "/" ? "" : stripLocalePrefix(pathname);
  return withTrailingSlash(`/en${normalized}`);
}

export function getAlternateLocale(locale: Locale): Locale {
  return locale === "bg" ? "en" : "bg";
}
