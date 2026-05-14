import type { Metadata } from "next";

import { type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/page-copy";
import { contactEmail, contactPhone, contactPhoneHref, getSiteContent } from "@/lib/site-content";
import { getBreadcrumbSchema, getFaqSchema, getPageMetadata, getWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  locale: "bg",
  title: getPageCopy("bg").contact.metaTitle,
  description: getPageCopy("bg").contact.metaDescription,
  path: "/contact",
});

export function ContactPageView({ locale = "bg" }: { locale?: Locale }) {
  const copy = getPageCopy(locale).contact;
  const siteContent = getSiteContent(locale);
  const pageSchema = getWebPageSchema({
    locale,
    path: "/contact",
    title: copy.metaTitle,
    description: copy.metaDescription,
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    path: "/contact",
    title: copy.metaTitle,
  });

  return (
    <main className="site-shell" id="top">
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
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getFaqSchema(locale)) }}
      />
      <section className="section-grid">
        <div className="section-heading page-intro">
          <h1>{copy.title}</h1>
          <p className="page-text">{copy.text}</p>
        </div>
        <div className="showcase-grid contact-start-grid">
          <article className="card contact-start-card">
            <h2>{copy.needsTitle}</h2>
            <p>{copy.needsText}</p>
          </article>
          <article className="card contact-start-card">
            <h2>{copy.responseTitle}</h2>
            <p>{copy.responseText}</p>
          </article>
        </div>
        <div className="split-content page-grid stacked-cards">
          <div className="card contact-detail-card content-card-wide">
            <h2>{copy.mainContact}</h2>
            <div className="contact-stack">
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              <a href={`tel:${contactPhoneHref}`}>{contactPhone}</a>
            </div>
            <div className="contact-stack contact-channel-list">
              {siteContent.socials.map((social) => (
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
    </main>
  );
}

export default function ContactPage() {
  return <ContactPageView locale="bg" />;
}
