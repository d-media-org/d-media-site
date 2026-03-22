import Link from "next/link";

import { ProtectedImage } from "@/components/protected-image";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ProjectShowcase } from "@/components/project-showcase";
import { featuredProjectPngs, projectPngArchive } from "@/lib/project-png-archive";

function formatFileCount(count: number) {
  return `${count} ${count === 1 ? "файл" : "файла"}`;
}

export default function ProjectsPage() {
  return (
    <main className="site-shell" id="top">
      <section className="section-grid">
        <SiteHeader />
        <div className="section-heading page-intro page-intro-balanced">
          <p className="eyebrow">проекти</p>
          <h1>Проектите трябва да покажат не просто визуален вкус, а способност на d . media да изгражда работещи системи за реални брандове.</h1>
          <p className="page-text">
            Тази страница показва само реалното съдържание, което в момента е налично в Brand projects. Акцентите отпред водят към най-силните системи, а архивът отдолу отваря целия наличен визуален слой по проекти.
          </p>
        </div>
        <div className="showcase-grid project-reading-grid">
          <article className="card package-card">
            <h3>Какво трябва да покаже портфолиото</h3>
            <p>
              Проектите отпред трябва да доказват, че d . media може да изгради
              разпознаваем знак, да го преведе в реални носители и да поддържа
              последователен визуален характер.
            </p>
          </article>
          <article className="card package-card">
            <h3>Какво трябва да усети клиентът</h3>
            <p>
              Не просто красиви изображения, а ясна увереност, че проектът може
              да стигне от идентичност до реално приложение и готови файлове.
            </p>
          </article>
        </div>

        <div className="section-heading page-subheading">
          <p className="eyebrow">акценти</p>
          <h2>Support Account, Support Account Group и избраните брандове отпред задават стандарта за цялото портфолио.</h2>
          <p className="page-text">
            Това са проектите, които най-ясно показват как идентичността се превежда към реални формати, приложения и работещо клиентско присъствие.
          </p>
        </div>
        <ProjectShowcase className="projects-grid" />

        <div className="section-heading page-subheading">
          <p className="eyebrow">пълен png архив</p>
          <h2>Пълният архив показва диапазона на работа, без да измисля допълнително съдържание извън реално наличните проектни файлове.</h2>
          <p className="page-text">
            Всеки проект в този архив има собствена страница с реално наличните PNG exports от папката си, така че посетителят да вижда реалната дълбочина на работата.
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
                    <span className="archive-count">{formatFileCount(project.imageCount)}</span>
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
            <h2>Ако търсиш същата яснота за собствен бранд или дигитално присъствие, следващата стъпка е кратък контекст и добре формулирана задача.</h2>
            <p className="page-text">
              Архивът показва как d . media работи. Следващата стъпка е тази логика да бъде адаптирана към твоя канал, аудитория и бизнес посока.
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
