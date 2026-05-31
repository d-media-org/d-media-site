"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { SVGProps } from "react";
import {
  siBehance,
  siInstagram,
  siTiktok,
  siYoutube,
} from "simple-icons";

import { BrandAsset } from "@/components/brand-asset";
import { BrandName } from "@/components/brand-text";
import { getLocaleFromPathname, localizeHref } from "@/lib/i18n";
import { getSiteContent, contactEmail } from "@/lib/site-content";
import { getLocaleSwitcherItems, getUiCopy } from "@/lib/ui-copy";

const socialIconMap = {
  Instagram: siInstagram.path,
  Behance: siBehance.path,
  YouTube: siYoutube.path,
  TikTok: siTiktok.path,
} as const;

function SocialIcon({
  label,
  ...props
}: { label: string } & SVGProps<SVGSVGElement>) {
  if (label in socialIconMap) {
    const path = socialIconMap[label as keyof typeof socialIconMap];
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path d={path} fill="currentColor" />
      </svg>
    );
  }

  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path
          d="M19.8 3.6H4.2C3.54 3.6 3 4.14 3 4.8V19.2C3 19.86 3.54 20.4 4.2 20.4H19.8C20.46 20.4 21 19.86 21 19.2V4.8C21 4.14 20.46 3.6 19.8 3.6ZM8.1 18H5.7V10.2H8.1V18ZM6.9 9.12C6.12 9.12 5.49 8.48 5.49 7.71C5.49 6.93 6.12 6.3 6.9 6.3C7.68 6.3 8.31 6.93 8.31 7.71C8.31 8.48 7.68 9.12 6.9 9.12ZM18.3 18H15.9V14.13C15.9 13.21 15.88 12.03 14.61 12.03C13.31 12.03 13.11 13.04 13.11 14.06V18H10.71V10.2H13.02V11.27H13.05C13.37 10.66 14.16 10.01 15.33 10.01C17.76 10.01 18.3 11.61 18.3 13.69V18Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <path
        d="M20.2 8.3C20 7.5 19.4 6.9 18.6 6.7C17.2 6.3 12 6.3 12 6.3C12 6.3 6.8 6.3 5.4 6.7C4.6 6.9 4 7.5 3.8 8.3C3.4 9.7 3.4 12.5 3.4 12.5C3.4 12.5 3.4 15.3 3.8 16.7C4 17.5 4.6 18.1 5.4 18.3C6.8 18.7 12 18.7 12 18.7C12 18.7 17.2 18.7 18.6 18.3C19.4 18.1 20 17.5 20.2 16.7C20.6 15.3 20.6 12.5 20.6 12.5C20.6 12.5 20.6 9.7 20.2 8.3ZM10.4 15.2V9.8L15 12.5L10.4 15.2Z"
        fill="currentColor"
      />
    </svg>
  );
}

function ThemeIcon({
  kind,
  ...props
}: { kind: "auto" | "light" | "dark" } & SVGProps<SVGSVGElement>) {
  if (kind === "light") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.65" />
        <path
          d="M12 2.8V5.1M12 18.9v2.3M5.49 5.49l1.63 1.63M16.88 16.88l1.63 1.63M2.8 12h2.3M18.9 12h2.3M5.49 18.51l1.63-1.63M16.88 7.12l1.63-1.63"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (kind === "dark") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path
          d="M16.9 14.9A7.3 7.3 0 0 1 9.1 7.1a7.35 7.35 0 1 0 7.8 7.8Z"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="currentColor"
        fontSize="12"
        fontWeight="700"
        fontFamily="inherit"
      >
        A
      </text>
    </svg>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const siteContent = getSiteContent(locale);
  const ui = getUiCopy(locale);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <header className="site-header">
      <div className="site-header-inner">
        <div className="site-header-main">
          <div className="site-brand brand-image brand-image-logotype">
            <Link href={localizeHref(locale, "/")} aria-label={ui.homeAria}>
              <BrandAsset
                lightSrc="/assets/brand/ONLY-logotype.png"
                alt="d . media"
                width={206}
                height={44}
                priority
              />
            </Link>
          </div>
          <button
            type="button"
            className={`site-menu-toggle${isMenuOpen ? " is-active" : ""}`}
            aria-expanded={isMenuOpen}
            aria-controls="site-mobile-nav"
            aria-label={isMenuOpen ? ui.closeMenu : ui.openMenu}
            onClick={() => setIsMenuOpen((current) => !current)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
        <div className="site-header-nav">
          <nav className="site-nav site-nav-desktop" aria-label={ui.mainNavigationAria}>
            {siteContent.mainNavigation.map((item) => {
              const href = localizeHref(locale, item.href);
              const isActive =
                href === localizeHref(locale, "/") ? pathname === href : pathname.startsWith(href);

              return (
                <Link
                  key={item.href}
                  href={href}
                  className={isActive ? "is-active" : undefined}
                  aria-current={isActive ? "page" : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
            <div className="locale-switcher" aria-label={ui.languageSwitcherAria}>
              {getLocaleSwitcherItems(locale, pathname).map((item) => (
                <Link
                  key={item.locale}
                  href={item.href}
                  className={item.isActive ? "is-active" : undefined}
                  hrefLang={item.locale}
                  lang={item.locale}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </nav>
        </div>
        <nav
          id="site-mobile-nav"
          className={`site-mobile-panel${isMenuOpen ? " is-open" : ""}`}
          aria-label={ui.mobileNavigationAria}
        >
          {siteContent.mainNavigation.map((item) => {
            const href = localizeHref(locale, item.href);
            const isActive =
              href === localizeHref(locale, "/") ? pathname === href : pathname.startsWith(href);

            return (
              <Link
                key={item.href}
                href={href}
                className={isActive ? "is-active" : undefined}
                aria-current={isActive ? "page" : undefined}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="locale-switcher locale-switcher-mobile" aria-label={ui.languageSwitcherAria}>
            {getLocaleSwitcherItems(locale, pathname).map((item) => (
              <Link
                key={item.locale}
                href={item.href}
                className={item.isActive ? "is-active" : undefined}
                hrefLang={item.locale}
                lang={item.locale}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const siteContent = getSiteContent(locale);
  const ui = getUiCopy(locale);
  const [footerCopyrightBefore, footerCopyrightAfter = ""] =
    ui.footer.copyright.split("d . media");
  const footerRef = useRef<HTMLElement | null>(null);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const isIosMobile = document.documentElement.dataset.iosMobile === "true";

    if (isIosMobile) {
      return;
    }

    let frame = 0;

    const handleScroll = () => {
      if (window.innerWidth >= 980) {
        setShowTopButton(window.scrollY > 120);
        return;
      }

      const footerTop = footerRef.current?.getBoundingClientRect().top ?? Infinity;
      const hideClearance = 84;
      const shouldHideForFooter = footerTop < window.innerHeight - hideClearance;
      setShowTopButton(window.scrollY > 240 && !shouldHideForFooter);
    };

    const scheduleHandleScroll = () => {
      if (frame !== 0) {
        return;
      }

      frame = window.requestAnimationFrame(() => {
        frame = 0;
        handleScroll();
      });
    };

    handleScroll();
    window.addEventListener("scroll", scheduleHandleScroll, { passive: true });
    window.addEventListener("resize", scheduleHandleScroll, { passive: true });

    return () => {
      if (frame !== 0) {
        window.cancelAnimationFrame(frame);
      }
      window.removeEventListener("scroll", scheduleHandleScroll);
      window.removeEventListener("resize", scheduleHandleScroll);
    };
  }, []);

  return (
    <>
      <footer className="site-footer" ref={footerRef}>
        <div className="site-footer-inner">
          <div className="footer-column footer-column-contact">
            <h2>{ui.footer.contact}</h2>
            <div className="footer-contact-list">
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
            </div>
          </div>
          <div className="footer-column footer-column-socials">
            <div className="footer-links footer-socials">
              {siteContent.socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={social.label}
                  title={social.label}
                >
                  <span className="footer-social-icon" aria-hidden="true">
                    <SocialIcon label={social.label} className="footer-social-icon-svg" />
                  </span>
                  <span className="sr-only">{social.label}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="footer-column footer-column-legal">
            <div className="footer-links footer-legal">
              <Link href={localizeHref(locale, "/terms")}>{ui.footer.terms}</Link>
              <Link href={localizeHref(locale, "/privacy")}>{ui.footer.privacy}</Link>
            </div>
          </div>
        </div>
        <div className="site-footer-bottom">
          <p>
            {footerCopyrightBefore}
            {" "}
            <BrandName />
            {" "}
            {footerCopyrightAfter}
          </p>
          <ThemeToggle
            locale={locale}
            className="theme-toggle footer-theme-toggle"
            ui={ui.footer}
          />
          <Link href={localizeHref(locale, "/")} className="footer-brand-link footer-brand-link-logo footer-brand-bottom" aria-label={ui.footer.backToStart}>
            <div className="brand-image brand-image-brandmark footer-brandmark footer-brandmark-only">
              <BrandAsset
                lightSrc="/assets/brand/ONLY-brandmark.png"
                alt="d . media"
                width={48}
                height={48}
              />
            </div>
          </Link>
        </div>
      </footer>
      <a
        className={`floating-top${showTopButton ? "" : " is-hidden"}`}
        href="#top"
        aria-label={ui.footer.backToTop}
      >
        <span className="floating-top-label">{ui.footer.backToTop}</span>
        <span className="floating-top-arrow" aria-hidden="true">
          ↑
        </span>
      </a>
    </>
  );
}

type ThemeMode = "auto" | "light" | "dark";

function ThemeToggle({
  locale,
  className,
  ui,
}: {
  locale: "bg" | "en";
  className?: string;
  ui: ReturnType<typeof getUiCopy>["footer"];
}) {
  const [mode, setMode] = useState<ThemeMode>("auto");

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const isIosMobile = root.dataset.iosMobile === "true";
    const STORAGE_KEY = "d-media-theme-mode";
    const readStoredMode = () => {
      try {
        return window.localStorage.getItem(STORAGE_KEY);
      } catch {
        return null;
      }
    };

    const writeStoredMode = (nextMode: ThemeMode) => {
      try {
        window.localStorage.setItem(STORAGE_KEY, nextMode);
      } catch {
        // Theme still applies for the current session when storage is unavailable.
      }
    };

    const applyTheme = (nextMode: ThemeMode) => {
      const resolvedTheme = nextMode === "auto"
        ? (media.matches ? "dark" : "light")
        : nextMode;

      root.dataset.themeMode = nextMode;
      root.dataset.theme = resolvedTheme;
      writeStoredMode(nextMode);
      setMode(nextMode);
    };

    const storedMode = readStoredMode();
    const initialMode = storedMode === "light" || storedMode === "dark" ? storedMode : "auto";
    applyTheme(initialMode);

    const syncAutoMode = () => {
      const currentMode = (readStoredMode() as ThemeMode | null) ?? "auto";
      if (currentMode === "auto") {
        root.dataset.theme = media.matches ? "dark" : "light";
      }
    };

    if (!isIosMobile) {
      if (typeof media.addEventListener === "function") {
        media.addEventListener("change", syncAutoMode);
      } else if (typeof media.addListener === "function") {
        media.addListener(syncAutoMode);
      }
    }

    return () => {
      if (!isIosMobile) {
        if (typeof media.removeEventListener === "function") {
          media.removeEventListener("change", syncAutoMode);
        } else if (typeof media.removeListener === "function") {
          media.removeListener(syncAutoMode);
        }
      }
    };
  }, []);

  const items = [
    { key: "auto" as const, label: ui.themeAuto },
    { key: "light" as const, label: ui.themeLight },
    { key: "dark" as const, label: ui.themeDark },
  ];

  return (
    <div className={className} aria-label={ui.themeSwitcherAria} role="group" data-locale={locale}>
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={mode === item.key ? "is-active" : undefined}
          aria-pressed={mode === item.key}
          title={item.label}
          onClick={() => {
            const root = document.documentElement;
            const media = window.matchMedia("(prefers-color-scheme: dark)");
            const resolvedTheme = item.key === "auto"
              ? (media.matches ? "dark" : "light")
              : item.key;

            root.dataset.themeMode = item.key;
            root.dataset.theme = resolvedTheme;
            try {
              window.localStorage.setItem("d-media-theme-mode", item.key);
            } catch {
              // Theme still applies for the current session when storage is unavailable.
            }
            setMode(item.key);
          }}
        >
          <ThemeIcon kind={item.key} className="theme-toggle-icon" />
          <span className="sr-only">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
