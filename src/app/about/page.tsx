import type { Metadata } from "next";

import { BrandName, BrandText } from "@/components/brand-text";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { resolveAssetUrl } from "@/lib/asset-url";
import { aboutNotes, principles } from "@/lib/site-content";

export const metadata: Metadata = {
  title: "За бранда",
  description:
    "История, подход и официален брандбук на d . media с фокус върху визуална идентичност, дигитален дизайн и устойчиво присъствие.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <main className="site-shell" id="top">
      <section className="section-grid">
        <SiteHeader />
        <div className="section-heading page-intro">
          <p className="eyebrow">за бранда</p>
          <h1><BrandName /></h1>
          <p className="page-text">
            Визуална идентичност, дигитален дизайн и устойчиви брандове.
          </p>
        </div>
        <div className="split-content page-grid stacked-cards">
          <div className="card about-copy content-card-wide">
            {aboutNotes.map((note) => (
              <p key={note}>
                <BrandText text={note} />
              </p>
            ))}
            <div className="principles-list">
              {principles.map((principle) => (
                <div className="principle-row" key={principle}>
                  <span className="principle-bullet" aria-hidden="true">
                    •
                  </span>
                  <p>{principle}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="card package-card content-card-wide brandbook-card">
            <h2>Официален брандбук</h2>
            <p>
              <BrandText text={"Пълният PDF с идентичността, приложенията и визуалните правила на\n d . media е достъпен директно през сайта."} />
            </p>
            <div className="hero-actions brandbook-actions">
              <a
                href={resolveAssetUrl("/assets/documents/d-media-brandbook.pdf")}
                target="_blank"
                rel="noreferrer"
                className="button button-secondary"
              >
                Отвори брандбука
              </a>
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
