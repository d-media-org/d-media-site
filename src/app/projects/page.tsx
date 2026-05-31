import type { Metadata } from "next";
import Link from "next/link";

import { BrandText } from "@/components/brand-text";
import { DeferredLegacyMockupSection } from "@/components/deferred-legacy-mockup-section";
import { DeferredProjectsArchive } from "@/components/deferred-projects-archive";
import { ProjectShowcase } from "@/components/project-showcase";
import { getResolvedLegacyMockupCollections, getResolvedProjectPngArchive } from "@/lib/asset-url";
import { getFeaturedProjectSlugs } from "@/lib/featured-projects";
import { localizeHref, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/page-copy";
import { getBreadcrumbSchema, getPageMetadata, getWebPageSchema } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  locale: "bg",
  title: getPageCopy("bg").projects.metaTitle,
  description: getPageCopy("bg").projects.metaDescription,
  path: "/projects",
});

export async function ProjectsPageView({ locale = "bg" }: { locale?: Locale }) {
  const copy = getPageCopy(locale).projects;
  const resolvedProjectPngArchive = getResolvedProjectPngArchive(locale);
  const legacyMockupCollections = getResolvedLegacyMockupCollections(locale);
  const featuredProjectSlugs = await getFeaturedProjectSlugs();
  const archiveProjects = resolvedProjectPngArchive.filter(
    (project) => !featuredProjectSlugs.includes(project.slug),
  );
  const pageSchema = getWebPageSchema({
    locale,
    path: "/projects",
    title: copy.metaTitle,
    description: copy.metaDescription,
  });
  const breadcrumbSchema = getBreadcrumbSchema({
    locale,
    path: "/projects",
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
        <div className="section-heading page-intro page-intro-balanced">
          <h1>
            <BrandText text={copy.title} />
          </h1>
          <p className="page-text">{copy.text}</p>
        </div>
        <div className="showcase-grid project-reading-grid">
          <article className="card package-card">
            <h3>{copy.readingTitle}</h3>
            <p>{copy.readingText}</p>
          </article>
          <article className="card package-card">
            <h3>{copy.resultTitle}</h3>
            <p>{copy.resultText}</p>
          </article>
        </div>

        <div className="section-heading page-subheading">
          <h2>{copy.selectedTitle}</h2>
          <p className="page-text">{copy.selectedText}</p>
        </div>
        <ProjectShowcase className="projects-grid" locale={locale} />

        <div className="section-heading page-subheading">
          <h2>{copy.archiveTitle}</h2>
          <p className="page-text">{copy.archiveText}</p>
        </div>
        <DeferredProjectsArchive projects={archiveProjects} locale={locale} />

        {legacyMockupCollections.map((collection) => (
          <DeferredLegacyMockupSection
            key={collection.slug}
            slug={collection.slug}
            title={collection.title}
            description={collection.description}
            locale={locale}
          />
        ))}

        <article className="card projects-cta-card">
          <div className="services-cta-copy">
            <h2>{copy.ctaTitle}</h2>
            <p className="page-text">
              <BrandText text={copy.ctaText} />
            </p>
          </div>
          <div className="hero-actions">
            <Link
              href={localizeHref(locale, "/contact")}
              className="button button-primary"
              data-ga-event="cta_start_project_click"
              data-ga-location="projects_cta"
            >
              {copy.primaryCta}
            </Link>
            <Link href={localizeHref(locale, "/services")} className="button button-secondary">
              {copy.secondaryCta}
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}

export default async function ProjectsPage() {
  return ProjectsPageView({ locale: "bg" });
}
