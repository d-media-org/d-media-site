import { SiteFooter, SiteHeader } from "@/components/site-chrome";
import { contactEmail, contactPhone, contactPhoneHref, socials } from "@/lib/site-content";

export default function ContactPage() {
  return (
    <main className="site-shell" id="top">
      <section className="section-grid">
        <SiteHeader />
        <div className="section-heading page-intro">
          <p className="eyebrow">контакт</p>
          <h1>За нов бранд, страница, документна система или content формат.</h1>
          <p className="page-text">
            Ако проектът изисква по-ясна визуална структура и последователно
            дигитално присъствие, разговорът може да започне оттук.
          </p>
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
