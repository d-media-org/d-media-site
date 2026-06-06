import type { Metadata } from "next";

import { BrandText } from "@/components/brand-text";
import { type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/page-copy";
import { getPrivacyPolicy } from "@/lib/legal-content";
import {
  contactEmail,
  contactPhone,
  getSiteContent,
} from "@/lib/site-content";
import { getBreadcrumbSchema, getPageMetadata, getWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  locale: "bg",
  title: getPageCopy("bg").privacy.metaTitle,
  description: getPageCopy("bg").privacy.metaDescription,
  path: "/privacy",
});

export function PrivacyPageView({ locale = "bg" }: { locale?: Locale }) {
  const copy = getPageCopy(locale).privacy;
  const siteContent = getSiteContent(locale);
  const formatSectionHeading = (id: string, title: string) => {
    const heading = `${id}. ${title}`;
    return /^\d+$/.test(id) ? heading.toUpperCase() : heading;
  };

  const fullPolicySections = getPrivacyPolicy(locale);
  const pageSchema = getWebPageSchema({
    locale,
    path: "/privacy",
    title: copy.metaTitle,
    description: copy.metaDescription,
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    path: "/privacy",
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
      <section className="section-grid">
        <div className="section-heading page-intro">
          <h1>{copy.title}</h1>
          <p className="page-text">
            <BrandText text={copy.text} />
          </p>
        </div>

        <div className="card">
          <ul className="policy-list">
            {siteContent.privacySummary.map((item) => (
              <li key={item}>
                <BrandText text={item} />
              </li>
            ))}
          </ul>
        </div>

        <div className="showcase-grid definition-grid">
          {siteContent.privacySections.map((section) => (
            <article className="card package-card" key={section.title}>
              <h3>{section.title}</h3>
              <p>
                <BrandText text={section.text} />
              </p>
            </article>
          ))}
        </div>

        <details className="card privacy-details">
          <summary>{copy.full}</summary>
          <div className="privacy-details-copy">
            <p>{copy.policyTitle}</p>

            {fullPolicySections.map((section) => (
              <section className="privacy-section" key={section.id}>
                {section.title ? <h3>{formatSectionHeading(section.id, section.title)}</h3> : null}
                {section.content?.map((paragraph) => (
                  paragraph === contactPhone ? null : (
                  <p key={paragraph}>
                    {paragraph === contactEmail ? (
                      <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
                    ) : (
                      <BrandText text={paragraph} />
                    )}
                  </p>
                  )
                ))}
                {section.bullets ? (
                  <ul className="privacy-bullets">
                    {section.bullets.map((bullet) => (
                      <li key={bullet}>
                        <BrandText text={bullet} />
                      </li>
                    ))}
                  </ul>
                ) : null}
                {section.tail?.map((paragraph) => (
                  <p key={paragraph}>
                    <BrandText text={paragraph} />
                  </p>
                ))}
              </section>
            ))}
          </div>
        </details>
      </section>
    </main>
  );
}

export default function PrivacyPage() {
  return <PrivacyPageView locale="bg" />;
}
