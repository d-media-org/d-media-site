import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { projectPngArchive } from "@/lib/project-png-archive";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getCaseStudy(slug: string) {
  return projectPngArchive.find((project) => project.slug === slug);
}

export async function generateStaticParams() {
  return projectPngArchive.map((project) => ({ slug: project.slug }));
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
          <p className="eyebrow">case study</p>
          <h1>{project.title}</h1>
          <p className="page-text">{project.summary}</p>
        </div>

        <article className="card case-study-hero">
          <div className="showcase-image case-study-image">
            <Image
              src={project.cover}
              alt={project.title}
              fill
              sizes="(max-width: 979px) 100vw, 70vw"
              priority
            />
          </div>
          <div className="case-study-body">
            <div className="case-study-section">
              <span className="case-study-label">Контекст</span>
              <p>{project.context}</p>
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
                <span className="tag-pill">{`${project.imageCount} PNG файла`}</span>
                <span className="tag-pill">{project.featured ? "Акцентен проект" : "Архивен проект"}</span>
              </div>
            </div>
            <div className="project-card-footer">
              <span className="project-meta">реални png exports от проектната папка</span>
              <Link className="inline-link" href="/projects">
                обратно към проектите
              </Link>
            </div>
          </div>
        </article>

        <div className="section-heading page-subheading">
          <p className="eyebrow">приложения</p>
          <h2>Всички налични PNG exports от този проект.</h2>
        </div>
        <div className="mockup-grid projects-gallery">
          {project.images.map((image) => (
            <article className="card mockup-card project-png-card" key={image.src}>
              <div className="mockup-image">
                <Image
                  src={image.src}
                  alt={`${project.title} ${image.label}`}
                  fill
                  sizes="(max-width: 767px) 100vw, 720px"
                />
              </div>
              <div className="project-png-caption">
                <p>{image.label}</p>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
