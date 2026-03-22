import Link from "next/link";
import Image from "next/image";

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
          <h1>Подредени case studies и пълен PNG архив от реалните проектни папки на d . media.</h1>
          <p className="page-text">
            Тази страница показва само PNG exports от проектите. Акцентите отпред
            подреждат най-силните системи, а архивът отдолу отваря целия наличен
            визуален слой по проекти.
          </p>
        </div>

        <div className="section-heading page-subheading">
          <p className="eyebrow">акценти</p>
          <h2>Support Account, Support Account Group и избраните системи с най-силен архивен потенциал.</h2>
          <p className="page-text">
            Тук са подредени проектите, които показват най-ясно как един бранд
            се развива през logo exports, logotype варианти, covers, profile assets
            и реални приложения.
          </p>
        </div>
        <ProjectShowcase className="projects-grid" />

        <div className="section-heading page-subheading">
          <p className="eyebrow">пълен png архив</p>
          <h2>Всички проекти с налични PNG файлове, подредени като отворим архив за разглеждане.</h2>
          <p className="page-text">
            Акцентните проекти имат по-силна текстова рамка, но всеки проект в
            този архив има собствена страница с всички налични PNG exports от
            папката му.
          </p>
        </div>
        <div className="archive-grid">
          {projectPngArchive.map((project) => (
            <Link className="card archive-card archive-project-card showcase-link-card" href={`/projects/${project.slug}`} key={project.slug}>
              <article>
                <div className="archive-project-cover">
                  <Image
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

        <div className="section-heading page-subheading">
          <p className="eyebrow">логика на съдържанието</p>
          <h2>Какво вижда посетителят и защо.</h2>
          <p className="page-text">
            Отпред стоят проектите с най-ясна identity логика и най-богат PNG слой.
            След тях идва целият архив, защото той показва реалния обем на работа:
            logo варианти, social exports, covers, profile assets и готови файлове
            за употреба.
          </p>
        </div>
        <div className="archive-grid">
          {featuredProjectPngs.map((project) => (
            <article className="card archive-card" key={`${project.slug}-logic`}>
              <div className="archive-summary archive-summary-static">
                <span className="archive-category">{project.title}</span>
                <h3>{project.context}</h3>
                <span className="archive-count">{project.focus.join(" • ")}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
