"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { BrandAsset } from "@/components/brand-asset";
import { getLocaleFromPathname, localizeHref } from "@/lib/i18n";
import { getSiteContent } from "@/lib/site-content";
import { getLocaleSwitcherItems, getUiCopy } from "@/lib/ui-copy";

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
