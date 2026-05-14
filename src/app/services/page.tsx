import type { Metadata } from "next";
import Link from "next/link";

import { BrandText } from "@/components/brand-text";
import {
  getSiteContent,
} from "@/lib/site-content";
import { localizeHref, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/page-copy";
import {
  getBreadcrumbSchema,
  getPageMetadata,
  getServiceCatalogSchema,
  getWebPageSchema,
} from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  locale: "bg",
  title: getPageCopy("bg").services.metaTitle,
  description: getPageCopy("bg").services.metaDescription,
  path: "/services",
});

export function ServicesPageView({ locale = "bg" }: { locale?: Locale }) {
  const copy = getPageCopy(locale).services;
  const siteContent = getSiteContent(locale);
  const pageSchema = getWebPageSchema({
    locale,
    path: "/services",
    title: copy.metaTitle,
    description: copy.metaDescription,
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    path: "/services",
    title: copy.metaTitle,
  });

  return (
    <main className="site-shell services-page" id="top">
      <script
        id="webpage-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        id="service-catalog-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getServiceCatalogSchema(locale)) }}
      />
      <section className="section-grid">
        <div className="section-heading page-intro">
          <h1>{copy.title}</h1>
          <p className="page-text">
            <BrandText text={copy.text} />
          </p>
        </div>
        <div className="showcase-grid service-card-grid">
          {siteContent.coreServices.map((service) => (
            <article className="card service-category-card" key={service.title}>
              <h2>{service.title}</h2>
              <p>{service.text}</p>
              <p>
                <strong>{copy.includes}:</strong> {service.includes}
              </p>
              <p>
                <strong>{copy.audience}:</strong> {service.audience}
              </p>
              <p>
                <strong>{copy.result}:</strong> {service.result}
              </p>
            </article>
          ))}
        </div>
        <article className="card services-cta-card">
          <div className="services-cta-copy">
            <h2>{copy.ctaTitle}</h2>
            <p className="page-text">
              {copy.ctaText}
            </p>
          </div>
          <div className="hero-actions">
            <Link
              href={localizeHref(locale, "/contact")}
              className="button button-primary"
              data-ga-event="cta_start_project_click"
              data-ga-location="services_cta"
            >
              {copy.primaryCta}
            </Link>
            <Link href={localizeHref(locale, "/projects")} className="button button-secondary">
              {copy.secondaryCta}
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}

export default function ServicesPage() {
  return <ServicesPageView locale="bg" />;
}
