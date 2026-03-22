import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { featuredCaseStudies } from "@/lib/site-content";

type CaseStudyPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

function getCaseStudy(slug: string) {
  return featuredCaseStudies.find((project) => project.slug === slug);
}

export async function generateStaticParams() {
  return featuredCaseStudies.map((project) => ({ slug: project.slug }));
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
          url: project.image,
          width: 1600,
          height: 1000,
          alt: project.title,
        },
      ],
    },
    twitter: {
      title: `${project.title} | d . media`,
      description: project.summary,
      images: [project.image],
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
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 979px) 100vw, 70vw"
              priority
            />
          </div>
          <div className="case-study-body">
            <div className="case-study-section">
              <span className="case-study-label">Контекст</span>
              <p>{project.intro}</p>
            </div>
            <div className="case-study-section">
              <span className="case-study-label">Обхват</span>
              <ul className="detail-list">
                {project.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </div>
            <div className="case-study-section">
              <span className="case-study-label">Услуги</span>
              <div className="tag-list">
                {project.services.map((item) => (
                  <span className="tag-pill" key={item}>
                    {item}
                  </span>
                ))}
              </div>
            </div>
            <div className="case-study-section">
              <span className="case-study-label">Резултат</span>
              <p>{project.outcome}</p>
            </div>
            <div className="project-card-footer">
              <span className="project-meta">{project.meta}</span>
              <Link className="inline-link" href="/projects">
                обратно към проектите
              </Link>
            </div>
          </div>
        </article>

        <div className="section-heading page-subheading">
          <p className="eyebrow">приложения</p>
          <h2>Реални носители и визуални среди, в които проектът работи.</h2>
        </div>
        <div className="mockup-grid projects-gallery">
          {project.applications.map((image) => (
            <article className="card mockup-card" key={image}>
              <div className="mockup-image">
                <Image
                  src={image}
                  alt={`${project.title} application`}
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
