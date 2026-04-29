import type { Metadata } from "next";
import Link from "next/link";

import { BrandText } from "@/components/brand-text";
import { ImageLightboxGallery } from "@/components/image-lightbox-gallery";
import { ProtectedImage } from "@/components/protected-image";
import { ProjectShowcase } from "@/components/project-showcase";
import { getResolvedLegacyMockupCollections, getResolvedProjectPngArchive } from "@/lib/asset-url";
import { getFeaturedProjectSlugs } from "@/lib/featured-projects";
import { localizeHref, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/page-copy";
import { getUiCopy } from "@/lib/ui-copy";
import { getPageMetadata } from "@/lib/seo";

export const metadata: Metadata = getPageMetadata({
  locale: "bg",
  title: getPageCopy("bg").projects.metaTitle,
  description: getPageCopy("bg").projects.metaDescription,
  path: "/projects",
});

export async function ProjectsPageView({ locale = "bg" }: { locale?: Locale }) {
  const copy = getPageCopy(locale).projects;
  const ui = getUiCopy(locale);
  const resolvedProjectPngArchive = getResolvedProjectPngArchive(locale);
  const legacyMockupCollections = getResolvedLegacyMockupCollections(locale);
  const featuredProjectSlugs = await getFeaturedProjectSlugs();
  const archiveProjects = resolvedProjectPngArchive.filter(
    (project) => !featuredProjectSlugs.includes(project.slug),
  );

  return (
    <main className="site-shell" id="top">
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
        <div className="archive-grid">
          {archiveProjects.map((project) => (
            <Link className="card archive-card archive-project-card showcase-link-card" href={localizeHref(locale, `/projects/${project.slug}`)} key={project.slug}>
              <article>
                <div className="archive-project-cover">
                  <div className="archive-project-cover-frame">
                    <ProtectedImage
                      src={project.cover}
                      alt={project.title}
                      fill
                      sizes="(max-width: 767px) 100vw, 720px"
                    />
                  </div>
                </div>
                <div className="archive-project-copy">
                  <div className="project-card-footer">
                    <span className="archive-category">{ui.fullArchive}</span>
                    <span className="archive-count">{ui.fileCount(project.imageCount)}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <span className="project-link-hint">{ui.projectHint}</span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {legacyMockupCollections.map((collection) => (
          <section className="legacy-mockup-section" key={collection.slug}>
            <div className="section-heading page-subheading">
              <h2>{collection.title}</h2>
              <p className="page-text">{collection.description}</p>
            </div>
            <ImageLightboxGallery
              items={collection.items}
              locale={locale}
              gridClassName="legacy-mockup-grid"
              cardClassName="card legacy-mockup-card"
              triggerClassName="gallery-trigger legacy-mockup-trigger"
              frameClassName="legacy-mockup-frame"
              imageSizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
            />
          </section>
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
