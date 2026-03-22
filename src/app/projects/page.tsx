import Link from "next/link";

import { ProtectedImage } from "@/components/protected-image";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ProjectShowcase } from "@/components/project-showcase";
import { getFeaturedProjectSlugs } from "@/lib/featured-projects";
import { projectPngArchive } from "@/lib/project-png-archive";
import { getSiteRuntimeConfig } from "@/lib/site-runtime-config";

function formatFileCount(count: number) {
  return `${count} ${count === 1 ? "файл" : "файла"}`;
}

export default async function ProjectsPage() {
  const featuredProjectSlugs = await getFeaturedProjectSlugs();
  const siteRuntimeConfig = await getSiteRuntimeConfig();

  return (
    <main className="site-shell" id="top">
      <section className="section-grid">
        <SiteHeader />
        <div className="section-heading page-intro page-intro-balanced">
          <p className="eyebrow">проекти</p>
          <h1>Проектите трябва да покажат не просто визуален вкус, а способност на d . media да изгражда работещи системи за реални брандове.</h1>
          <p className="page-text">
            Тази страница показва само реалното съдържание, което в момента е налично в проектните папки. Акцентите отпред водят към най-силните системи, а архивът отдолу отваря целия наличен визуален материал по проекти.
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
              да стигне от идентичност до реално приложение и готови материали.
            </p>
          </article>
        </div>

        <div className="section-heading page-subheading">
          <p className="eyebrow">акценти</p>
          <h2>Support Account, Support Account Group и Yanita задават стандарта за цялото портфолио.</h2>
          <p className="page-text">
            Това са проектите, които най-ясно показват как идентичността се превежда към реални формати, приложения и работещо клиентско присъствие.
          </p>
        </div>
        <ProjectShowcase className="projects-grid" />

        <div className="section-heading page-subheading">
          <p className="eyebrow">пълен архив</p>
          <h2>Пълният архив показва диапазона на работа, без да добавя съдържание извън реално наличните проектни файлове.</h2>
          <p className="page-text">
            Всеки проект в този архив има собствена страница с реално наличните файлове от папката си, така че посетителят да вижда реалната дълбочина на работата.
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
                      {featuredProjectSlugs.includes(project.slug) ? "акцентен проект" : "пълен архив"}
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
            <a href={siteRuntimeConfig.projects.primaryCta.href} className="button button-primary">
              {siteRuntimeConfig.projects.primaryCta.label}
            </a>
            <a href={siteRuntimeConfig.projects.secondaryCta.href} className="button button-secondary">
              {siteRuntimeConfig.projects.secondaryCta.label}
            </a>
          </div>
        </article>
      </section>
      <SiteFooter />
    </main>
  );
}
