import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { ProtectedImage } from "@/components/protected-image";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { resolvedProjectPngArchive } from "@/lib/asset-url";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getCaseStudy(slug: string) {
  return resolvedProjectPngArchive.find((project) => project.slug === slug);
}

function formatFileCount(count: number) {
  return `${count} ${count === 1 ? "файл" : "файла"}`;
}

export async function generateStaticParams() {
  return resolvedProjectPngArchive.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: CaseStudyPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) {
    return {
      title: "Проект",
    };
  }

  return {
    title: project.title,
    description: project.summary,
    alternates: {
      canonical: `/projects/${project.slug}`,
    },
    openGraph: {
      title: `${project.title} | d . media`,
      description: project.summary,
      images: [
        {
          url: project.cover,
          width: 1600,
          height: 1000,
          alt: project.title,
        },
      ],
    },
    twitter: {
      title: `${project.title} | d . media`,
      description: project.summary,
      images: [project.cover],
    },
  };
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const { slug } = await params;
  const project = getCaseStudy(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="site-shell" id="top">
      <section className="section-grid">
        <SiteHeader />

        <div className="section-heading page-intro">
          <p className="eyebrow">проект</p>
          <h1>{project.title}</h1>
          <p className="page-text">{project.context}</p>
        </div>

        <article className="card case-study-hero">
          <div className="showcase-image case-study-image">
            <ProtectedImage
              src={project.cover}
              alt={project.title}
              fill
              sizes="(max-width: 979px) 100vw, 70vw"
              priority
            />
          </div>
          <div className="case-study-body">
            <div className="case-study-section">
              <span className="case-study-label">Позициониране</span>
              <p>{project.summary}</p>
            </div>
            <div className="case-study-section">
              <span className="case-study-label">Обхват</span>
              <ul className="detail-list">
                {project.focus.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
            <div className="case-study-section">
              <span className="case-study-label">Архив</span>
              <div className="tag-list">
                <span className="tag-pill">{formatFileCount(project.imageCount)}</span>
                <span className="tag-pill">{project.featured ? "Акцентен проект" : "Архивен проект"}</span>
              </div>
            </div>
            <div className="project-card-footer">
              <span className="project-meta">реални файлове от проектната папка</span>
              <Link className="inline-link" href="/projects">
                обратно към проектите
              </Link>
            </div>
          </div>
        </article>

        <div className="section-heading page-subheading">
          <p className="eyebrow">приложения</p>
          <h2>Всички налични файлове от този проект.</h2>
        </div>
        <div className="mockup-grid projects-gallery">
          {project.images.map((image) => (
            <article className="card mockup-card project-png-card" key={image.src}>
              <div className="mockup-image">
                <ProtectedImage
                  src={image.src}
                  alt={project.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 720px"
                />
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
