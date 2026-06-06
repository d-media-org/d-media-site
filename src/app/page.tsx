import type { Metadata } from "next";
import Link from "next/link";

import { BrandAsset } from "@/components/brand-asset";
import { BrandText } from "@/components/brand-text";
import { ProjectShowcase } from "@/components/project-showcase";
import {
  contactEmail,
  getSiteContent,
} from "@/lib/site-content";
import { localizeHref, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/page-copy";
import { getPageMetadata, getWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  locale: "bg",
  title: getPageCopy("bg").home.metaTitle,
  description: getPageCopy("bg").home.metaDescription,
  path: "/",
});

export const revalidate = 300;

export async function HomePage({ locale = "bg" }: { locale?: Locale }) {
  const copy = getPageCopy(locale).home;
  const localizedContent = getSiteContent(locale);
  const homepageServices = localizedContent.coreServices.map((service) => ({
    id: service.id,
    title: service.title,
    text: service.text,
  }));
  const processSteps = localizedContent.coreProcess;
  const aboutSummary = localizedContent.aboutSummary;
  const pageSchema = getWebPageSchema({
    locale,
    path: "/",
    title: copy.metaTitle,
    description: copy.metaDescription,
  });

  return (
    <main className="site-shell" id="top">
      <script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <section className="hero-grid home-hero">
        <div className="hero-copy">
          <p className="eyebrow">{copy.eyebrow}</p>
          <h1>{copy.title}</h1>
          <p className="hero-text">
            <BrandText text={copy.text} />
          </p>
          <div className="hero-actions">
            <Link
              href={localizeHref(locale, "/contact")}
              className="button button-primary"
              data-ga-event="cta_start_project_click"
              data-ga-location="home_hero"
            >
              {copy.primaryCta}
            </Link>
            <Link href={localizeHref(locale, "/services")} className="button button-secondary">
              {copy.secondaryCta}
            </Link>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="hero-card hero-card-brand">
            <div className="brand-image brand-image-brandmark">
              <BrandAsset
                lightSrc="/assets/brand/ONLY-brandmark.png"
                alt={copy.brandmarkAlt}
                width={118}
                height={118}
              />
            </div>
          </div>
          <div className="hero-card hero-card-note">
            <p>{copy.note}</p>
          </div>
        </aside>
      </section>

      <section className="section-grid home-section" id="services">
        <div className="section-heading page-intro-balanced">
          <p className="eyebrow">{copy.servicesEyebrow}</p>
          <h2>{copy.servicesTitle}</h2>
        </div>
        <div className="showcase-grid service-card-grid">
          {homepageServices.map((service) => (
            <article className="card service-category-card" key={service.title}>
              <h3>{service.title}</h3>
              <p>{service.text}</p>
            </article>
          ))}
        </div>
        <div className="section-actions">
          <Link
            href={localizeHref(locale, "/contact")}
            className="button button-primary"
            data-ga-event="cta_start_project_click"
            data-ga-location="home_services"
          >
            {copy.servicesCta}
          </Link>
        </div>
      </section>

      <section className="section-grid home-section" id="pricing">
        <div className="section-heading page-intro-balanced">
          <p className="eyebrow">{copy.pricingEyebrow}</p>
          <h2>{copy.pricingTitle}</h2>
          <p className="page-text">{copy.pricingText}</p>
          <p className="project-meta">{copy.pricingRangeCue}</p>
        </div>
        <div className="showcase-grid project-reading-grid">
          {copy.pricingItems.map((item, index) => (
            <article
              className={`card package-card${index === 0 ? " is-featured" : ""}`}
              key={item.title}
            >
              <h3>{item.title}</h3>
              <p className="package-price">{item.price}</p>
              <p className="project-meta package-value">→ {item.value}</p>
            </article>
          ))}
        </div>
        <div className="section-heading page-subheading">
          <p className="project-meta">{copy.pricingNote}</p>
          <p className="project-meta">{copy.pricingSecondaryNote}</p>
        </div>
        <div className="section-actions">
          <Link
            href={localizeHref(locale, "/contact")}
            className="button button-primary"
            data-ga-event="cta_send_inquiry_click"
            data-ga-location="home_pricing"
          >
            {copy.pricingCta}
          </Link>
        </div>
      </section>

      <section className="section-grid home-section" id="process">
        <div className="section-heading page-intro-balanced">
          <p className="eyebrow">{copy.processEyebrow}</p>
          <h2>{copy.processTitle}</h2>
        </div>
        <div className="process-timeline">
          {processSteps.map((step) => (
            <article className="card process-step-card" key={step.id}>
              <span className="process-step-index">{step.id}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </article>
          ))}
        </div>
        <div className="section-actions">
          <Link
            href={localizeHref(locale, "/contact")}
            className="button button-primary"
            data-ga-event="cta_send_inquiry_click"
            data-ga-location="home_process"
          >
            {copy.processCta}
          </Link>
        </div>
      </section>

      <section className="section-grid home-section" id="projects">
        <div className="section-heading page-intro-balanced">
          <p className="eyebrow">{copy.projectsEyebrow}</p>
          <h2>{copy.projectsTitle}</h2>
          <p className="page-text">{copy.projectsText}</p>
        </div>
        <ProjectShowcase className="projects-grid" locale={locale} />
        <div className="section-actions">
          <Link href={localizeHref(locale, "/projects")} className="button button-secondary">
            {copy.projectsCta}
          </Link>
        </div>
      </section>

      <section className="section-grid home-section" id="about">
        <div className="section-heading page-intro-balanced">
          <p className="eyebrow">{copy.aboutEyebrow}</p>
          <h2>
            <BrandText text={copy.aboutTitle} />
          </h2>
        </div>
        <div className="showcase-grid about-summary-grid">
          {aboutSummary.map((item) => (
            <article className="card text-card about-summary-card" key={item}>
              <p>
                <BrandText text={item} />
              </p>
            </article>
          ))}
        </div>
        <div className="section-actions">
          <Link href={localizeHref(locale, "/contact")} className="button button-primary">
            {copy.aboutCta}
          </Link>
        </div>
      </section>

      <section className="section-grid contact-section home-section" id="contact">
        <div className="card contact-card content-card-wide">
          <p className="eyebrow">{copy.contactEyebrow}</p>
          <h2>{copy.contactTitle}</h2>
          <p className="page-text">
            {copy.contactText}
          </p>
          <a href={`mailto:${contactEmail}`} className="contact-email-inline">
            {contactEmail}
          </a>
          <div className="hero-actions contact-cta">
            <Link
              href="mailto:contact@d-media.org"
              className="button button-primary"
              data-ga-event="cta_send_inquiry_click"
              data-ga-location="home_contact"
            >
              {copy.contactPrimaryCta}
            </Link>
            <Link href={localizeHref(locale, "/services")} className="button button-secondary">
              {copy.contactSecondaryCta}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default async function Home() {
  return HomePage({ locale: "bg" });
}
