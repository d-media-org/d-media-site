"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { SVGProps } from "react";
import {
  siBehance,
  siFacebook,
  siInstagram,
  siThreads,
  siTiktok,
  siX,
  siYoutube,
} from "simple-icons";

import { BrandAsset } from "@/components/brand-asset";
import { BrandName } from "@/components/brand-text";
import { socials } from "@/lib/site-content";

const socialIconMap = {
  Facebook: siFacebook.path,
  Instagram: siInstagram.path,
  Threads: siThreads.path,
  X: siX.path,
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

export function SiteHeader() {
  const pathname = usePathname();
  const navItems = [
    { href: "/", label: "Начало" },
    { href: "/projects", label: "Проекти" },
    { href: "/services", label: "Услуги" },
    { href: "/about", label: "За бранда" },
    { href: "/contact", label: "Контакт" },
  ];

  return (
    <header className="site-header">
      <div className="site-brand brand-image brand-image-logotype">
        <Link href="/" aria-label="Начало">
          <BrandAsset
            lightSrc="/assets/brand/ONLY-logotype.png"
            alt="d . media"
            width={206}
            height={44}
            priority
          />
        </Link>
      </div>
      <div className="site-header-nav">
        <nav className="site-nav site-nav-desktop" aria-label="Основна навигация">
          {navItems.map((item) => {
            const isActive =
              item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                className={isActive ? "is-active" : undefined}
                aria-current={isActive ? "page" : undefined}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </div>
      <nav className="site-nav-mobile" aria-label="Мобилна навигация">
        {navItems.map((item) => {
          const isActive =
            item.href === "/" ? pathname === "/" : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={isActive ? "is-active" : undefined}
              aria-current={isActive ? "page" : undefined}
            >
              {item.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  const footerRef = useRef<HTMLElement | null>(null);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const footerTop = footerRef.current?.getBoundingClientRect().top ?? Infinity;
      const hideClearance = window.innerWidth <= 767 ? 84 : 96;
      const shouldHideForFooter = footerTop < window.innerHeight - hideClearance;
      setShowTopButton(window.scrollY > 240 && !shouldHideForFooter);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  const footerServices = [
    "създаване на бранд идентичност",
    "създаване на съдържание",
    "управление на социални медии",
    "графичен дизайн и реклама",
  ];

  return (
    <footer className="site-footer" ref={footerRef}>
      <div className="site-footer-inner">
        <div className="footer-brand">
          <Link href="/" className="footer-brand-link" aria-label="Към началната страница">
            <div className="footer-brand-row">
              <div className="brand-image brand-image-brandmark footer-brandmark">
                <BrandAsset
                  lightSrc="/assets/brand/ONLY-brandmark.png"
                  alt="d . media"
                  width={46}
                  height={46}
                  priority
                />
              </div>
              <div className="footer-brand-copy">
                {footerServices.map((item) => (
                  <p key={item}>{item}</p>
                ))}
              </div>
            </div>
          </Link>
        </div>
        <div className="footer-center">
          <div className="footer-links footer-socials">
            {socials.map((social) => (
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
          <div className="footer-copyright">
            <p>
              © 2026 <BrandName />
            </p>
            <p>
              Дизайн и сайт: <BrandName />
            </p>
          </div>
        </div>
        <div className="footer-side">
          <div className="footer-links footer-legal">
            <Link href="/terms">Условия</Link>
            <Link href="/privacy">Поверителност</Link>
          </div>
        </div>
      </div>
      <a
        className={`floating-top${showTopButton ? "" : " is-hidden"}`}
        href="#top"
        aria-label="Към началото"
      >
        <span className="floating-top-label">Нагоре</span>
        <span className="floating-top-arrow" aria-hidden="true">
          ↑
        </span>
      </a>
    </footer>
  );
}
