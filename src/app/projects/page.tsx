import Link from "next/link";
import Image from "next/image";

import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ProjectShowcase } from "@/components/project-showcase";
import { portfolioArchive } from "@/lib/portfolio-archive";
import { archiveProject, mockups, projectApplications } from "@/lib/site-content";

export default function ProjectsPage() {
  return (
    <main className="site-shell" id="top">
      <section className="section-grid">
        <SiteHeader />
        <div className="section-heading page-intro">
          <p className="eyebrow">проекти</p>
          <h1>Подредени case studies, в които идентичността се развива като система, а не като единична визия.</h1>
          <p className="page-text">
            Всеки проект тук е организиран като кратка case study рамка:
            контекст, системни решения, носители и резултат.
          </p>
        </div>
        <ProjectShowcase className="projects-grid" />

        <div className="section-heading page-subheading">
          <p className="eyebrow">допълнителен проект</p>
          <h2>{archiveProject.title}</h2>
          <p className="page-text">{archiveProject.text}</p>
        </div>
        <Link className="card showcase-card showcase-card-single showcase-link-card" href={`/projects/${archiveProject.slug}`}>
          <article>
            <div className="showcase-image">
              <Image
                src={archiveProject.image}
                alt={archiveProject.title}
                fill
                sizes="(max-width: 979px) 100vw, 60vw"
              />
            </div>
            <div className="showcase-copy">
              <h3>{archiveProject.title}</h3>
              <p>{archiveProject.summary}</p>
              <div className="project-card-footer">
                <span className="project-meta">{archiveProject.meta}</span>
                <span className="project-link-hint">отвори case study</span>
              </div>
            </div>
          </article>
        </Link>

        <div className="section-heading page-subheading">
          <p className="eyebrow">проектни приложения</p>
          <h2>Приложения и визуални среди от наличните проектни папки.</h2>
        </div>
        <div className="mockup-grid projects-gallery">
          {projectApplications.map((item) => (
            <article className="card mockup-card" key={item.image}>
              <div className="mockup-image">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 720px"
                />
              </div>
            </article>
          ))}
        </div>

        <div className="section-heading page-subheading">
          <p className="eyebrow">mockups</p>
          <h2>Работна и презентационна галерия от различни визуални среди.</h2>
          <p className="page-text">
            Тази секция включва цялата папка Mockups като визуален архив за
            presentation context, surfaces и brand applications.
          </p>
        </div>
        <div className="mockup-grid projects-gallery">
          {mockups.map((item) => (
            <article className="card mockup-card" key={item.id}>
              <div className="mockup-image">
                <Image
                  src={item.image}
                  alt={`Mockup ${item.id}`}
                  fill
                  sizes="(max-width: 767px) 100vw, 720px"
                />
              </div>
            </article>
          ))}
        </div>

        <div className="section-heading page-subheading">
          <p className="eyebrow">портфолио архив</p>
          <h2>Пълният архив на проектите, организиран по папки и с реалните файлове във всяка от тях.</h2>
          <p className="page-text">
            Тази секция публикува целия проектен обем като сгъваем архив, така
            че всяка папка да има собствено място със съдържанието си.
          </p>
        </div>
        <div className="archive-grid">
          {portfolioArchive.map((item) => (
            <details className="card archive-card" key={`${item.category}-${item.title}`}>
              <summary className="archive-summary">
                <span className="archive-category">{item.category}</span>
                <h3>{item.title}</h3>
                <span className="archive-count">{item.fileCount} файла</span>
              </summary>
              <ul className="archive-files">
                {item.files.map((file) => (
                  <li key={file}>{file}</li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
