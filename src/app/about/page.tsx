import type { Metadata } from "next";

import { BrandName, BrandText } from "@/components/brand-text";
import { resolveAssetUrl } from "@/lib/asset-url";
import { type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/page-copy";
import { getSiteContent } from "@/lib/site-content";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  locale: "bg",
  title: getPageCopy("bg").about.metaTitle,
  description: getPageCopy("bg").about.metaDescription,
  path: "/about",
});

export function AboutPageView({ locale = "bg" }: { locale?: Locale }) {
  const copy = getPageCopy(locale).about;
  const siteContent = getSiteContent(locale);
  const brandbookWebHref =
    locale === "en" ? "/brandbook_web_exact_en/index.html" : "/brandbook_web_exact/index.html";
  const brandbookPdfHref = resolveAssetUrl(
    locale === "en"
      ? "/assets/documents/d_media_professional_brandbook_new_en.pdf"
      : "/assets/documents/d_media_professional_brandbook_new.pdf"
  );
  const brandbookOpenLabel = locale === "en" ? "Open brand book" : "Отвори брандбук";
  const brandbookDownloadLabel =
    locale === "en" ? "Download brand book (PDF)" : "Свали брандбук (PDF)";
  const logoPackDownloadLabel =
    locale === "en"
      ? "Download brand logo and logotype"
      : "Свали лого и логотип на марката";

  return (
    <main className="site-shell" id="top">
      <section className="section-grid">
        <div className="section-heading page-intro">
          <h1><BrandName /></h1>
          <p className="page-text">{copy.text}</p>
        </div>
        <div className="split-content page-grid stacked-cards">
          <div className="card about-copy content-card-wide">
            {siteContent.aboutNotes.map((item) => (
              <p key={item}>
                <BrandText text={item} />
              </p>
            ))}
          </div>
          <div className="card package-card content-card-wide brandbook-card">
            <h2>{copy.brandbookTitle}</h2>
            <p>{copy.brandbookText}</p>
            <div className="hero-actions brandbook-actions">
              <a
                href={brandbookWebHref}
                target="_blank"
                rel="noreferrer"
                className="button button-secondary desktop-only"
              >
                {brandbookOpenLabel}
              </a>
              <a
                href={brandbookPdfHref}
                className="button button-secondary"
                download
              >
                {brandbookDownloadLabel}
              </a>
              <a
                href="/downloads/d-media-logo-pack.zip"
                className="button button-secondary"
                download
              >
                {logoPackDownloadLabel}
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default function AboutPage() {
  return <AboutPageView locale="bg" />;
}
