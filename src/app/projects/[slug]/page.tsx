import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ImageLightboxGallery } from "@/components/image-lightbox-gallery";
import { ProtectedImage } from "@/components/protected-image";
import { getResolvedAllProjectsArchive } from "@/lib/asset-url";
import { localizeHref, type Locale } from "@/lib/i18n";
import { getPageCopy } from "@/lib/page-copy";
import { getUiCopy } from "@/lib/ui-copy";
import { baseUrl, brandName } from "@/lib/seo";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getCaseStudy(slug: string, locale: Locale) {
  return getResolvedAllProjectsArchive(locale).find((project) => project.slug === slug);
}

function formatFileCount(count: number, locale: Locale) {
  return locale === "en"
    ? `${count} ${count === 1 ? "file" : "files"}`
    : `${count} ${count === 1 ? "файл" : "файла"}`;
}

function toAbsoluteAssetUrl(url: string) {
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }

  return `${baseUrl}${url.startsWith("/") ? url : `/${url}`}`;
}

export async function generateStaticParams() {
  return getResolvedAllProjectsArchive("bg").map((project) => ({ slug: project.slug }));
}

export async function generateCaseStudyMetadata(
  locale: Locale,
  { params }: CaseStudyPageProps,
): Promise<Metadata> {
  const { slug } = await params;
  const copy = getPageCopy(locale).projectDetail;
  const { seo } = getPageCopy(locale);
  const project = getCaseStudy(slug, locale);

  if (!project) {
    return {
      title: copy.fallbackTitle,
    };
  }

  const localizedPath = localizeHref(locale, `/projects/${project.slug}`);
  const ogImage = toAbsoluteAssetUrl(project.cover);
  const metaDescription =
    locale === "bg"
      ? `${project.title} — ${project.summary} ${project.focus[0] ?? ""}`.trim()
      : `${project.title} — ${project.summary} ${project.focus[0] ?? ""}`.trim();

  return {
    title: project.title,
    description: metaDescription,
    keywords: Array.from(seo.siteKeywords),
    alternates: {
      canonical: localizedPath,
      languages: {
        bg: `${baseUrl}${localizeHref("bg", `/projects/${project.slug}`)}`,
        en: `${baseUrl}${localizeHref("en", `/projects/${project.slug}`)}`,
        "x-default": `${baseUrl}${localizeHref("bg", `/projects/${project.slug}`)}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "bg" ? "bg_BG" : "en_US",
      url: `${baseUrl}${localizedPath}`,
      siteName: brandName,
      title: `${project.title} | d . media`,
      description: metaDescription,
      images: [
        {
          url: ogImage,
          width: 1600,
          height: 1000,
          alt: project.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | d . media`,
      description: metaDescription,
      images: [ogImage],
    },
  };
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  return generateCaseStudyMetadata("bg", { params });
}

export async function CaseStudyPageView({
  params,
  locale = "bg",
}: CaseStudyPageProps & { locale?: Locale }) {
  const { slug } = await params;
  const copy = getPageCopy(locale).projectDetail;
  const ui = getUiCopy(locale);
  const project = getCaseStudy(slug, locale);

  if (!project) {
    notFound();
  }

  return (
    <main className="site-shell" id="top">
      <section className="section-grid">
        <div className="section-heading page-intro">
          <h1>{project.title}</h1>
          <p className="page-text">{project.context}</p>
        </div>

        <article className="card case-study-hero">
          <div className="showcase-image case-study-image">
            <div className="case-study-image-frame">
              <ProtectedImage
                src={project.cover}
                alt={project.title}
                fill
                sizes="(max-width: 979px) 100vw, 70vw"
                priority
              />
            </div>
          </div>
          <div className="case-study-body">
            <div className="case-study-section">
              <span className="case-study-label">{copy.context}</span>
              <p>{project.context}</p>
            </div>
            <div className="case-study-section">
              <span className="case-study-label">{copy.solution}</span>
              <p>{project.summary}</p>
            </div>
            <div className="case-study-section">
              <span className="case-study-label">{copy.usage}</span>
              <ul className="detail-list">
                {project.focus.map((detail: string) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
            <div className="case-study-section">
              <span className="case-study-label">{copy.archive}</span>
              <div className="tag-list">
                <span className="tag-pill">{formatFileCount(project.imageCount, locale)}</span>
                <span className="tag-pill">
                  {project.featured
                    ? ui.featuredProject
                    : "archiveType" in project && project.archiveType === "historical"
                      ? ui.historicalArchive
                      : ui.archiveProject}
                </span>
              </div>
            </div>
            <div className="project-card-footer">
              <span className="project-meta">{copy.meta}</span>
              <Link className="inline-link" href={localizeHref(locale, "/projects")}>
                {copy.back}
              </Link>
            </div>
          </div>
        </article>

        <div className="section-heading page-subheading">
          <h2>{copy.applicationsTitle}</h2>
        </div>
        <ImageLightboxGallery
          items={project.images.map((image: { src: string; label?: string }) => ({
            src: image.src,
            alt: image.label ?? project.title,
          }))}
          locale={locale}
          gridClassName="mockup-grid projects-gallery"
          cardClassName="card mockup-card project-png-card"
          triggerClassName="gallery-trigger project-file-trigger"
          frameClassName="mockup-image"
          imageSizes="(max-width: 767px) 100vw, 720px"
        />
      </section>
    </main>
  );
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  return CaseStudyPageView({ params, locale: "bg" });
}
