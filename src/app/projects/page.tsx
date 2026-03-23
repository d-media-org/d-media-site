import type { Metadata } from "next";
import Link from "next/link";

import { BrandText } from "@/components/brand-text";
import { ProtectedImage } from "@/components/protected-image";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { ProjectShowcase } from "@/components/project-showcase";
import { resolvedProjectPngArchive } from "@/lib/asset-url";
import { getFeaturedProjectSlugs } from "@/lib/featured-projects";
import { getSiteRuntimeConfig } from "@/lib/site-runtime-config";

export const metadata: Metadata = {
  title: "Проекти",
  description:
    "Подбрани акцентни проекти и пълен архив с реални файлове, които показват как d . media превежда идентичността в работещо приложение.",
  alternates: {
    canonical: "/projects",
  },
};

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
          <h1>
            <BrandText text="Проекти, които показват как d . media превежда една идея в работещо визуално присъствие." />
          </h1>
          <p className="page-text">
            Тук е събрано реалното съдържание от проектните папки. Акцентите отпред показват най-силните системи, а архивът отдолу отваря реалния диапазон на работа по отделните брандове.
          </p>
        </div>
        <div className="showcase-grid project-reading-grid">
          <article className="card package-card">
            <h3>Какво показва портфолиото</h3>
            <p>
              Акцентните проекти показват как един бранд може да премине от знак и логотип към реални носители, дигитални формати и последователно присъствие.
            </p>
          </article>
          <article className="card package-card">
            <h3>Какво вижда клиентът</h3>
            <p>
              Не просто красиви изображения, а увереност, че проектът може да стигне от идентичност до готови материали, които работят в реална среда.
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
          <h2>Пълният архив показва обхвата на работа чрез реално наличните файлове по проектите.</h2>
          <p className="page-text">
            Всеки проект има собствена страница с наличните файлове от папката си, така че посетителят да вижда не обещание, а реално извършена работа.
          </p>
        </div>
        <div className="archive-grid">
          {resolvedProjectPngArchive.map((project) => (
            <Link className="card archive-card archive-project-card showcase-link-card" href={`/projects/${project.slug}`} key={project.slug}>
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
            <h2>Ако търсиш същата яснота за собствен бранд или дигитално присъствие, следващата стъпка е кратко запитване с реален контекст.</h2>
            <p className="page-text">
              <BrandText text="Проектите показват как d . media работи. Следващата стъпка е този подход да бъде адаптиран към твоя бранд, канал и бизнес посока." />
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
