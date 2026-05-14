import type { Metadata } from "next";

import { BrandText } from "@/components/brand-text";
import { TermsContent } from "@/components/terms-content";
import { type Locale } from "@/lib/i18n";
import { getTermsPolicy } from "@/lib/legal-content";
import { getPageCopy } from "@/lib/page-copy";
import { getSiteContent } from "@/lib/site-content";
import { getBreadcrumbSchema, getPageMetadata, getWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  locale: "bg",
  title: getPageCopy("bg").terms.metaTitle,
  description: getPageCopy("bg").terms.metaDescription,
  path: "/terms",
});

export function TermsPageView({ locale = "bg" }: { locale?: Locale }) {
  const copy = getPageCopy(locale).terms;
  const siteContent = getSiteContent(locale);
  const fullTermsSections = getTermsPolicy(locale);
  const pageSchema = getWebPageSchema({
    locale,
    path: "/terms",
    title: copy.metaTitle,
    description: copy.metaDescription,
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    path: "/terms",
    title: copy.metaTitle,
  });

  return (
    <main className="site-shell terms-page" id="top">
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
          <h1>
            <BrandText text={copy.title} />
          </h1>
          <p className="page-text">
            <BrandText text={copy.text} />
          </p>
        </div>

        <TermsContent
          copy={{
            shortLabel: copy.shortLabel,
            fullLabel: copy.fullLabel,
            fullTitle: copy.policyTitle,
          }}
          summaryItems={siteContent.termsSummary}
          summarySections={siteContent.termsSections}
          fullSections={fullTermsSections}
        />
      </section>
    </main>
  );
}

export default function TermsPage() {
  return <TermsPageView locale="bg" />;
}
