"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { BrandAsset } from "@/components/brand-asset";
import { BrandName } from "@/components/brand-text";
import { FloatingTopLink } from "@/components/floating-top-link";
import { ThemeToggle } from "@/components/theme-toggle";
import { getLocaleFromPathname, localizeHref } from "@/lib/i18n";
import { contactEmail, getSiteContent } from "@/lib/site-content";
import { getUiCopy } from "@/lib/ui-copy";

function SocialIcon({ label }: { label: string }) {
  if (label === "Instagram") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="footer-social-icon-svg">
        <path d="M16.98 3H7.02A4.02 4.02 0 0 0 3 7.02v9.96A4.02 4.02 0 0 0 7.02 21h9.96A4.02 4.02 0 0 0 21 16.98V7.02A4.02 4.02 0 0 0 16.98 3Zm1.47 13.98a1.47 1.47 0 0 1-1.47 1.47H7.02a1.47 1.47 0 0 1-1.47-1.47V7.02a1.47 1.47 0 0 1 1.47-1.47h9.96a1.47 1.47 0 0 1 1.47 1.47v9.96ZM12 7.06A4.94 4.94 0 1 0 16.94 12 4.95 4.95 0 0 0 12 7.06Zm0 7.33A2.39 2.39 0 1 1 14.39 12 2.39 2.39 0 0 1 12 14.39Zm5.05-7.74a1.15 1.15 0 1 1-1.15-1.15 1.15 1.15 0 0 1 1.15 1.15Z" fill="currentColor" />
      </svg>
    );
  }

  if (label === "Behance") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="footer-social-icon-svg">
        <path d="M9.35 11.4A2.73 2.73 0 0 0 10.88 8.8C10.88 6.2 8.96 5 6.48 5H2v14h4.79c2.62 0 4.86-1.26 4.86-4.03a3.52 3.52 0 0 0-2.3-3.57ZM4.64 7.22h1.73c.66 0 1.68.12 1.68 1.39 0 1.2-.8 1.43-1.57 1.43H4.64V7.22Zm1.89 9.56H4.64v-4.43h1.96c.98 0 2.34.28 2.34 2.18 0 1.58-1 2.25-2.07 2.25Zm9.86-8.35c-3.38 0-5.39 2.52-5.39 5.42 0 3.18 1.88 5.42 5.31 5.42 2.21 0 3.9-1 4.66-3.23h-2.43a2.24 2.24 0 0 1-2.14 1.1c-1.5 0-2.56-.9-2.62-2.68H21c.22-3.45-1.7-6.03-4.61-6.03Zm-2.55 4.07a2.44 2.44 0 0 1 2.42-2.14 2.14 2.14 0 0 1 2.15 2.14h-4.57ZM13 6.4h6V5h-6v1.4Z" fill="currentColor" />
      </svg>
    );
  }

  if (label === "LinkedIn") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="footer-social-icon-svg">
        <path d="M19.8 3.6H4.2C3.54 3.6 3 4.14 3 4.8V19.2C3 19.86 3.54 20.4 4.2 20.4H19.8C20.46 20.4 21 19.86 21 19.2V4.8C21 4.14 20.46 3.6 19.8 3.6ZM8.1 18H5.7V10.2H8.1V18ZM6.9 9.12C6.12 9.12 5.49 8.48 5.49 7.71C5.49 6.93 6.12 6.3 6.9 6.3C7.68 6.3 8.31 6.93 8.31 7.71C8.31 8.48 7.68 9.12 6.9 9.12ZM18.3 18H15.9V14.13C15.9 13.21 15.88 12.03 14.61 12.03C13.31 12.03 13.11 13.04 13.11 14.06V18H10.71V10.2H13.02V11.27H13.05C13.37 10.66 14.16 10.01 15.33 10.01C17.76 10.01 18.3 11.61 18.3 13.69V18Z" fill="currentColor" />
      </svg>
    );
  }

  if (label === "TikTok") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="footer-social-icon-svg">
        <path d="M14.7 3c.24 2.02 1.42 3.95 3.37 5.08a6.35 6.35 0 0 0 2.33.79v2.74a9.03 9.03 0 0 1-3.07-.58v5.05c0 3.55-2.88 6.42-6.43 6.42S4.48 19.63 4.48 16.08 7.36 9.66 10.9 9.66c.3 0 .6.02.89.07v2.84a3.66 3.66 0 0 0-.89-.12 3.63 3.63 0 1 0 3.63 3.63V3h2.17Z" fill="currentColor" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className="footer-social-icon-svg">
      <path d="M20.2 8.3C20 7.5 19.4 6.9 18.6 6.7C17.2 6.3 12 6.3 12 6.3C12 6.3 6.8 6.3 5.4 6.7C4.6 6.9 4 7.5 3.8 8.3C3.4 9.7 3.4 12.5 3.4 12.5C3.4 12.5 3.4 15.3 3.8 16.7C4 17.5 4.6 18.1 5.4 18.3C6.8 18.7 12 18.7 12 18.7C12 18.7 17.2 18.7 18.6 18.3C19.4 18.1 20 17.5 20.2 16.7C20.6 15.3 20.6 12.5 20.6 12.5C20.6 12.5 20.6 9.7 20.2 8.3ZM10.4 15.2V9.8L15 12.5L10.4 15.2Z" fill="currentColor" />
    </svg>
  );
}

export function SiteFooter() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const siteContent = getSiteContent(locale);
  const ui = getUiCopy(locale);
  const [footerCopyrightBefore, footerCopyrightAfter = ""] =
    ui.footer.copyright.split("d . media");

  return (
    <>
      <footer className="site-footer">
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
                    <SocialIcon label={social.label} />
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
            {footerCopyrightBefore} <BrandName /> {footerCopyrightAfter}
          </p>
          <ThemeToggle locale={locale} className="theme-toggle footer-theme-toggle" ui={ui.footer} />
          <Link
            href={localizeHref(locale, "/")}
            className="footer-brand-link footer-brand-link-logo footer-brand-bottom"
            aria-label={ui.footer.backToStart}
          >
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
      <FloatingTopLink label={ui.footer.backToTop} />
    </>
  );
}
