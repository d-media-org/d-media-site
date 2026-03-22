import Link from "next/link";

import { ProtectedImage } from "@/components/protected-image";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ProjectShowcase } from "@/components/project-showcase";
import { featuredProjectPngs, projectPngArchive } from "@/lib/project-png-archive";

export default function ProjectsPage() {
  return (
    <main className="site-shell" id="top">
      <section className="section-grid">
        <SiteHeader />
        <div className="section-heading page-intro">
          <p className="eyebrow">проекти</p>
          <h1>Подбраните case studies отпред и пълният PNG архив отдолу показват реалния обем на работа на d . media.</h1>
          <p className="page-text">
            Тази страница показва само реалното съдържание, което в момента е налично в `Brand projects`. Акцентите отпред водят към най-силните системи, а архивът отдолу отваря целия наличен визуален слой по проекти.
          </p>
        </div>
        <div className="showcase-grid project-reading-grid">
          <article className="card package-card">
            <h3>Как да се чете тази страница</h3>
            <p>
              Отгоре стоят проектите, които най-ясно показват logo, logotype,
              mockup и client-facing application логика. Под тях е пълният
              архив, за да се вижда реалният диапазон на работата.
            </p>
          </article>
          <article className="card package-card">
            <h3>Какво вижда клиентът тук</h3>
            <p>
              Не просто изображения, а доказателство как една идентичност или
              визуална система работи в реални формати, версии и готови
              файлове за употреба.
            </p>
          </article>
        </div>

        <div className="section-heading page-subheading">
          <p className="eyebrow">акценти</p>
          <h2>Support Account, Support Account Group и избраните системи с най-силен архивен потенциал.</h2>
          <p className="page-text">
            Тук са подредени проектите, които показват най-ясно как един бранд се развива през logo exports, logotype варианти, covers, profile assets и реални приложения.
          </p>
        </div>
        <ProjectShowcase className="projects-grid" />

        <div className="section-heading page-subheading">
          <p className="eyebrow">пълен png архив</p>
          <h2>Всички проекти с налични PNG файлове, подредени като отворим архив за разглеждане.</h2>
          <p className="page-text">
            Акцентните проекти имат по-силна текстова рамка, но всеки проект в този архив има собствена страница с всички налични PNG exports от папката му.
          </p>
        </div>
        <div className="archive-grid">
          {projectPngArchive.map((project) => (
            <Link className="card archive-card archive-project-card showcase-link-card" href={`/projects/${project.slug}`} key={project.slug}>
              <article>
                <div className="archive-project-cover">
                  <ProtectedImage
                    src={project.cover}
                    alt={project.title}
                    fill
                    sizes="(max-width: 767px) 100vw, 720px"
                  />
                </div>
                <div className="archive-project-copy">
                  <div className="project-card-footer">
                    <span className="archive-category">
                      {featuredProjectPngs.some((item) => item.slug === project.slug) ? "акцентен проект" : "png архив"}
                    </span>
                    <span className="archive-count">{`${project.imageCount} png файла`}</span>
                  </div>
                  <h3>{project.title}</h3>
                  <p>{project.summary}</p>
                  <span className="project-link-hint">отвори проекта</span>
                </div>
              </article>
            </Link>
          ))}
        </div>

        <article className="card projects-cta-card">
          <div className="services-cta-copy">
            <p className="eyebrow">следваща стъпка</p>
            <h2>Ако търсиш подобна логика за собствен бранд или дигитално присъствие, проектът може да започне с кратък контекст и ясна посока.</h2>
            <p className="page-text">
              Архивът показва как работи визуалната система. Следващата стъпка е тя да бъде адаптирана към конкретната задача, канал и аудитория.
            </p>
          </div>
          <div className="hero-actions">
            <a href="/contact" className="button button-primary">
              Започни проект
            </a>
            <a href="/services" className="button button-secondary">
              Услуги
            </a>
          </div>
        </article>
      </section>
      <SiteFooter />
    </main>
  );
}
