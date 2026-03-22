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
  return (
    <main className="site-shell" id="top">
      <section className="section-grid">
        <SiteHeader />
        <div className="section-heading page-intro">
          <p className="eyebrow">услуги</p>
          <h1>Услуги, процес и документи в ясна работна система.</h1>
          <p className="page-text">
            <BrandText text="d . media работи с реални категории услуги, конкретна логика на възлагане и ясно предаване на файловете. Тук е подредена практичната рамка: какво се изработва, как започва проектът и с кои документи се движи." />
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
      </section>
      <SiteFooter />
    </main>
  );
}
