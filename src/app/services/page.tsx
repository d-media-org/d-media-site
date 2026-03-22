import type { Metadata } from "next";

import { BrandText } from "@/components/brand-text";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  documentFlow,
  operationalNotes,
  process,
  processDetails,
  serviceCategories,
  serviceDefinitions,
  servicePackages,
  services,
} from "@/lib/site-content";

export const metadata: Metadata = {
  title: "Услуги",
  description:
    "Категории услуги, процес на работа, документи и operational рамка на d . media.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  const serviceOutcomes = [
    {
      title: "Какво получава клиентът",
      text: "Ясна визуална система, готови файлове и последователна логика на приложение вместо разпилени отделни материали.",
    },
    {
      title: "Как работи процесът",
      text: "Запитване, работен обхват, оферта, изпълнение и предаване в подредена последователност без неясни етапи.",
    },
    {
      title: "Какво остава след проекта",
      text: "Файлове и формати, които могат да бъдат използвани веднага за публикуване, принтиране или следващо развитие.",
    },
  ];

  return (
    <main className="site-shell" id="top">
      <section className="section-grid">
        <SiteHeader />
        <div className="section-heading page-intro">
          <p className="eyebrow">услуги</p>
          <h1>Услуги, процес и документи, подредени като реална работна рамка.</h1>
          <p className="page-text">
            <BrandText text="d . media работи с реални категории услуги, конкретна логика на възлагане и ясно предаване на файловете. Тук е подредена практичната рамка: какво се изработва, как започва проектът и с кои документи се движи." />
          </p>
        </div>
        <div className="showcase-grid service-outcomes-grid">
          {serviceOutcomes.map((item) => (
            <article className="card package-card service-outcome-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>
                <BrandText text={item.text} />
              </p>
            </article>
          ))}
        </div>
        <div className="section-heading page-subheading">
          <p className="eyebrow">основни направления</p>
          <h2>От идентичност и съдържание до документи и дигитални носители в една последователна структура.</h2>
          <p className="page-text">
            Страницата е подредена така, че първо да показва обхвата, после реалните категории услуги, а след това начина, по който един проект се уговаря и завършва.
          </p>
        </div>
        <div className="split-content page-grid services-overview">
          <div className="card service-overview-card content-card-wide">
            <ul className="service-list">
              {services.map((service) => (
                <li key={service}>
                  <BrandText text={service} />
                </li>
              ))}
            </ul>
          </div>
          <div className="card process-card content-card-wide">
            <ul className="process-list">
              {process.map((step) => (
                <li key={step}>
                  <BrandText text={step} />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="showcase-grid service-category-grid">
          {serviceCategories.map((category) => (
            <article className="card service-category-card" key={category.id}>
              <h3>{category.title}</h3>
              <p>
                <BrandText text={category.text} />
              </p>
              <ul className="detail-list">
                {category.items.map((item) => (
                  <li key={item}>
                    <BrandText text={item} />
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
        <div className="section-heading page-subheading">
          <p className="eyebrow">какво може да включва проектът</p>
          <h2>Различни комбинации според нуждата на бранда, канала и крайния формат.</h2>
        </div>
        <div className="showcase-grid package-grid">
          {servicePackages.map((item) => (
            <article className="card package-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>
                <BrandText text={item.text} />
              </p>
            </article>
          ))}
        </div>
        <div className="section-heading page-subheading">
          <p className="eyebrow">дефиниции</p>
          <h2>
            <BrandText text="Как d . media структурира услугата, преди тя да стане файл, страница или готов материал." />
          </h2>
        </div>
        <div className="showcase-grid definition-grid">
          {serviceDefinitions.map((item) => (
            <article className="card package-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>
                <BrandText text={item.text} />
              </p>
            </article>
          ))}
        </div>
        <div className="section-heading page-subheading">
          <p className="eyebrow">процес</p>
          <h2>Запитване, оферта, потвърждение, работа и предаване в ясна последователност.</h2>
          <p className="page-text">
            Това е практичният ред, в който проектът преминава от първоначален контекст към финални файлове и готови материали.
          </p>
        </div>
        <div className="showcase-grid definition-grid">
          {processDetails.map((item) => (
            <article className="card package-card" key={item.id}>
              <h3>{item.title}</h3>
              <p>
                <BrandText text={item.text} />
              </p>
            </article>
          ))}
        </div>
        <div className="section-heading page-subheading">
          <p className="eyebrow">документи</p>
          <h2>Работната документация, с която проектите се уточняват, потвърждават и предават.</h2>
        </div>
        <div className="showcase-grid definition-grid">
          {documentFlow.map((item) => (
            <article className="card package-card" key={item.title}>
              <h3>{item.title}</h3>
              <p>
                <BrandText text={item.text} />
              </p>
            </article>
          ))}
        </div>
        <div className="section-heading page-subheading">
          <p className="eyebrow">operational рамка</p>
          <h2>Практичните условия, които определят как работи проектът след началото му.</h2>
        </div>
        <div className="card">
          <ul className="policy-list">
            {operationalNotes.map((item) => (
              <li key={item}>
                <BrandText text={item} />
              </li>
            ))}
          </ul>
        </div>
        <article className="card services-cta-card">
          <div className="services-cta-copy">
            <p className="eyebrow">следваща стъпка</p>
            <h2>Ако имаш нужда от нов бранд, по-ясно съдържание или подредена визуална система, проектът може да започне с кратко запитване.</h2>
            <p className="page-text">
              Изпрати тема, контекст и какъв тип резултат ти е нужен. Оттам процесът минава към работен обхват, оферта и реално изпълнение.
            </p>
          </div>
          <div className="hero-actions">
            <a href="/contact" className="button button-primary">
              Към контакт
            </a>
            <a href="/terms" className="button button-secondary">
              Условия
            </a>
          </div>
        </article>
      </section>
      <SiteFooter />
    </main>
  );
}
