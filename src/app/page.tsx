import { BrandAsset } from "@/components/brand-asset";
import { BrandText } from "@/components/brand-text";
import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import {
  formats,
  process,
  services,
} from "@/lib/site-content";

export default function Home() {
  return (
    <main className="site-shell" id="top">
      <section className="hero-grid">
        <SiteHeader />

        <div className="hero-copy">
          <p className="eyebrow">Бранд. Съдържание. Дизайн. Реклама.</p>
          <h1>Създаване на бранд идентичност, съдържание, дизайн и реклама.</h1>
          <p className="hero-text">
            <BrandText text="d . media помага на брандове да изградят по-ясно присъствие чрез идентичност, съдържание, дигитални носители и рекламни формати, подредени в последователна система." />
          </p>
          <div className="hero-actions">
            <a href="/services" className="button button-primary">
              Услуги
            </a>
            <a href="#contact" className="button button-secondary">
              Запитване
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
              Създаване на бранд идентичност, съдържание, дигитални формати,
              документни системи и реклама в една последователна работна рамка.
            </p>
          </div>
        </aside>
      </section>

      <section className="section-grid section-split">
        <div className="section-heading">
          <p className="eyebrow">
            <BrandText text="какво прави d . media" />
          </p>
          <h2>Ясна работна рамка за бранд, съдържание, дигитални носители и клиентски материали.</h2>
        </div>
        <div className="split-content">
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
              Всеки проект се разглежда като цялостна система: задача, визуален
              език, реални носители и готови файлове, които могат да се използват
              веднага и последователно.
            </p>
          </div>
        </div>
      </section>

      <section className="section-grid section-split" id="services">
        <div className="section-heading">
          <p className="eyebrow">услуги</p>
          <h2>Подреден процес, ясни услуги и резултат, който е готов за реална употреба.</h2>
        </div>
        <div className="split-content services-overview">
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

      <section className="section-grid section-split" id="about">
        <div className="section-heading">
          <p className="eyebrow">за бранда</p>
          <h2>
            Бранд, изграден чрез практика, последователност и дългосрочна логика.
          </h2>
        </div>
        <div className="split-content stacked-cards">
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

      <section className="section-grid contact-section" id="contact">
        <div className="card contact-card content-card-wide">
          <p className="eyebrow">Бранд. Съдържание. Дизайн. Реклама.</p>
          <h2>Ако подготвяш нов бранд, сайт или визуална система, можем да започнем оттук.</h2>
          <div className="hero-actions contact-cta">
            <a href="/contact" className="button button-primary">
              Към контакт
            </a>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
