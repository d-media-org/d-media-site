import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { contactEmail, contactPhone, contactPhoneHref, socials } from "@/lib/site-content";

export default function ContactPage() {
  const inquiryPoints = [
    "Какъв тип проект подготвяш",
    "Какъв е реалният носител или канал",
    "Има ли срок, бюджет или готови материали",
  ];

  return (
    <main className="site-shell" id="top">
      <section className="section-grid">
        <SiteHeader />
        <div className="section-heading page-intro">
          <p className="eyebrow">контакт</p>
          <h1>Стартова точка за нов бранд, страница, документна система или content формат.</h1>
          <p className="page-text">
            Ако проектът изисква по-ясна визуална структура и последователно дигитално присъствие, разговорът може да започне оттук.
          </p>
        </div>
        <div className="showcase-grid contact-start-grid">
          <article className="card contact-start-card">
            <h2>Как да започне запитването</h2>
            <p>
              Най-добрият старт е кратък и ясен: какво трябва да се изработи,
              къде ще се използва и какъв резултат очакваш от проекта.
            </p>
            <ul className="detail-list">
              {inquiryPoints.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
          <article className="card contact-start-card">
            <h2>Какво следва след това</h2>
            <p>
              След първия контакт проектът преминава към работен контекст,
              оферта, потвърждение и изпълнение според избраната услуга и
              нужния формат.
            </p>
            <div className="hero-actions contact-hero-actions">
              <a href={`mailto:${contactEmail}`} className="button button-primary">
                Изпрати e-mail
              </a>
              <a href="/services" className="button button-secondary">
                Прегледай услугите
              </a>
            </div>
          </article>
        </div>
        <div className="split-content page-grid stacked-cards">
          <div className="card contact-detail-card content-card-wide">
            <h2>Основен контакт</h2>
            <div className="contact-stack">
              <a href={`mailto:${contactEmail}`}>{contactEmail}</a>
              <a href={`tel:${contactPhoneHref}`}>{contactPhone}</a>
            </div>
          </div>
          <div className="card contact-detail-card content-card-wide">
            <h2>Канали</h2>
            <div className="contact-stack contact-channel-list">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noreferrer"
                  className="contact-channel"
                >
                  <span>{social.label}</span>
                  <span>{social.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
      <SiteFooter />
    </main>
  );
}
