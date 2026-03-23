import type { Metadata } from "next";
import Link from "next/link";

import { BrandAsset } from "@/components/brand-asset";
import { BrandText } from "@/components/brand-text";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  formats,
  process,
  services,
} from "@/lib/site-content";
import { siteDescription } from "@/lib/seo";
import { getSiteRuntimeConfig } from "@/lib/site-runtime-config";

export const metadata: Metadata = {
  title: "Бранд идентичност, съдържание и дигитално присъствие",
  description: siteDescription,
  alternates: {
    canonical: "/",
  },
};

export default async function Home() {
  const siteRuntimeConfig = await getSiteRuntimeConfig();
  const homeOutcomes = [
    "По-ясна бранд идентичност и последователен визуален език",
    "Готови формати за дигитални канали, документи и клиентски материали",
    "Работна система, която може да се използва веднага и да се развива устойчиво",
  ];

  return (
    <main className="site-shell" id="top">
      <section className="hero-grid">
        <SiteHeader />

        <div className="hero-copy">
          <p className="eyebrow">Бранд. Съдържание. Дизайн. Реклама.</p>
          <h1>Бранд идентичност, съдържание и дигитално присъствие, изградени като една работеща система.</h1>
          <p className="hero-text">
            <BrandText text="d . media създава бранд идентичност, съдържание, уебсайтове и рекламни формати така, че клиентът да получи не просто визия, а ясна, подредена и използваема система за реална работа." />
          </p>
          <ul className="detail-list hero-detail-list">
            {homeOutcomes.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="hero-actions">
            <a href={siteRuntimeConfig.home.heroPrimaryCta.href} className="button button-primary">
              {siteRuntimeConfig.home.heroPrimaryCta.label}
            </a>
            <a href={siteRuntimeConfig.home.heroSecondaryCta.href} className="button button-secondary">
              {siteRuntimeConfig.home.heroSecondaryCta.label}
            </a>
          </div>
        </div>

        <aside className="hero-panel">
          <div className="hero-card hero-card-brand">
            <div className="brand-image brand-image-brandmark">
              <BrandAsset
                lightSrc="/assets/brand/ONLY-brandmark.png"
                alt="Брандмарк d . media"
                width={118}
                height={118}
              />
            </div>
          </div>
          <div className="hero-card hero-card-note">
            <p>
              Подходът свързва идентичност, съдържание, документи, дигитални формати и реклама в една последователна система.
            </p>
          </div>
        </aside>
      </section>

      <section className="section-grid section-split">
        <div className="section-heading section-heading-balanced">
          <p className="eyebrow">
            <BrandText text="какво прави d . media" />
          </p>
          <h2>Брандът работи като студио за ясна визуална структура, последователни носители и материали, готови за реална употреба.</h2>
          <p className="page-text">
            <BrandText text="d . media не предлага отделни разпилени файлове, а подреден резултат, който може да се използва веднага и да се развива устойчиво." />
          </p>
        </div>
        <div className="split-content split-content-balanced">
          <div className="card format-panel">
            <div className="format-lockup">
              <div className="brand-image brand-image-logotype">
                <BrandAsset
                  lightSrc="/assets/brand/ONLY-logotype.png"
                  alt="d . media"
                  width={246}
                  height={52}
                />
              </div>
            </div>
            <div className="format-grid">
              {formats.map((format) => (
                <span className="format-chip" key={format}>
                  {format}
                </span>
              ))}
            </div>
          </div>
          <div className="card brand-principle">
            <p>
              Всеки проект се разглежда като цялостна система: задача, визуален език, реални носители и готови файлове, които запазват един и същ характер навсякъде.
            </p>
            <p className="brand-principle-strong">
              Това е разликата между красива визия и завършено присъствие.
            </p>
          </div>
        </div>
      </section>

      {siteRuntimeConfig.home.sections.services ? (
        <section className="section-grid section-split" id="services">
          <div className="section-heading section-heading-balanced">
            <p className="eyebrow">услуги</p>
            <h2>Клиентът получава подреден процес, ясни услуги и резултат, който е готов за реална употреба.</h2>
            <p className="page-text">
              Структурата е проста: какво се изработва, как се движи проектът и какво остава след финалното предаване.
            </p>
          </div>
          <div className="split-content split-content-balanced services-overview">
            <div className="card service-overview-card content-card-wide">
              <ul className="service-list">
                {services.map((service) => (
                  <li key={service}>{service}</li>
                ))}
              </ul>
            </div>
            <div className="card process-card content-card-wide">
              <ul className="process-list">
                {process.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      ) : null}

      {siteRuntimeConfig.home.sections.about ? (
        <section className="section-grid section-split" id="about">
          <div className="section-heading section-heading-balanced">
          <p className="eyebrow">за бранда</p>
          <h2>
            <BrandText text="d . media е изграден като последователен бранд с фокус върху идентичност, дигитален дизайн и устойчиво присъствие." />
          </h2>
          <p className="page-text">
            Подходът съчетава естетика, функционалност и ясна система на работа, без да разчита на случайни решения.
          </p>
          </div>
          <div className="split-content split-content-balanced stacked-cards">
            <div className="card text-card content-card-wide">
              <p>
                <BrandText text="d . media е бранд, фокусиран върху визуална идентичност, дигитален дизайн и създаване на устойчиви брандове." />
              </p>
            </div>
            <div className="card text-card content-card-wide">
              <p>
                Работата съчетава естетика, функционалност и стратегическо
                мислене, така че клиентът да получи не просто визия, а ясна,
                използваема и устойчива система.
              </p>
            </div>
          </div>
        </section>
      ) : null}

      <section className="section-grid contact-section" id="contact">
        <div className="card contact-card content-card-wide">
          <p className="eyebrow">Бранд. Съдържание. Дизайн. Реклама.</p>
          <h2>Ако подготвяш нов бранд, уебсайт или по-ясно визуално присъствие, следващата стъпка е кратко запитване с контекст и посока.</h2>
          <p className="page-text">
            Оттам разговорът преминава към работен обхват, оферта и изпълнение според реалната нужда на проекта.
          </p>
          <div className="hero-actions contact-cta">
            <Link href={siteRuntimeConfig.home.finalPrimaryCta.href} className="button button-primary">
              {siteRuntimeConfig.home.finalPrimaryCta.label}
            </Link>
            <Link href={siteRuntimeConfig.home.finalSecondaryCta.href} className="button button-secondary">
              {siteRuntimeConfig.home.finalSecondaryCta.label}
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
