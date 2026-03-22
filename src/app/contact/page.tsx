import type { Metadata } from "next";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { contactEmail, contactPhone, contactPhoneHref, socials } from "@/lib/site-content";
import { getSiteRuntimeConfig } from "@/lib/site-runtime-config";

export const metadata: Metadata = {
  title: "Контакт",
  description:
    "Контакт с d . media за нов бранд, уебсайт, съдържание, документна система или по-ясно визуално присъствие.",
  alternates: {
    canonical: "/contact",
  },
};

export default async function ContactPage() {
  const siteRuntimeConfig = await getSiteRuntimeConfig();
  const inquiryPoints = [
    "Какъв тип проект подготвяш",
    "Какъв е реалният носител или канал",
    "Има ли срок, бюджет или готови материали",
  ];

  return (
    <main className="site-shell" id="top">
      <section className="section-grid">
        <SiteHeader />
        <div className="section-heading page-intro">
          <p className="eyebrow">контакт</p>
          <h1>Стартова точка за нов бранд, уебсайт, документна система или формат за съдържание.</h1>
          <p className="page-text">
            Ако проектът изисква по-ясна визуална структура и последователно дигитално присъствие, разговорът започва оттук.
          </p>
        </div>
        <div className="showcase-grid contact-start-grid">
          <article className="card contact-start-card">
            <h2>Как да започне запитването</h2>
            <p>
              Най-добрият старт е кратък и ясен: какво ще се изработи,
              къде ще се използва и какъв резултат очакваш от проекта.
            </p>
            <ul className="detail-list">
              {inquiryPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card contact-start-card">
            <h2>Какво следва след това</h2>
            <p>
              След първия контакт проектът преминава към работен контекст,
              оферта, потвърждение и изпълнение според нужния формат,
              срок и обхват.
            </p>
            <div className="hero-actions contact-hero-actions">
              <a href={siteRuntimeConfig.contact.primaryCta.href} className="button button-primary">
                {siteRuntimeConfig.contact.primaryCta.label}
              </a>
              <a href={siteRuntimeConfig.contact.secondaryCta.href} className="button button-secondary">
                {siteRuntimeConfig.contact.secondaryCta.label}
              </a>
            </div>
          </article>
        </div>
        <div className="split-content page-grid stacked-cards">
          <div className="card contact-detail-card content-card-wide">
            <h2>Основен контакт</h2>
            <div className="contact-stack">
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              <a href={`tel:${contactPhoneHref}`}>{contactPhone}</a>
            </div>
          </div>
          <div className="card contact-detail-card content-card-wide">
            <h2>Канали</h2>
            <div className="contact-stack contact-channel-list">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-channel"
                >
                  <span>{social.label}</span>
                  <span>{social.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
