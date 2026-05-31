"use client";

import { useEffect, useState } from "react";

import { ImageLightboxGallery } from "@/components/image-lightbox-gallery";
import { type Locale } from "@/lib/i18n";
import { getUiCopy } from "@/lib/ui-copy";

type GalleryItem = {
  src: string;
  alt: string;
};

type DisplayMode = "pending" | "mobile" | "desktop";

export function DeferredLegacyMockupSection({
  slug,
  title,
  description,
  locale,
}: {
  slug: string;
  title: string;
  description: string;
  locale: Locale;
}) {
  const ui = getUiCopy(locale);
  const [mode, setMode] = useState<DisplayMode>("pending");
  const [isOpen, setIsOpen] = useState(false);
  const [items, setItems] = useState<GalleryItem[] | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMode(window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (mode !== "desktop" && !isOpen) {
      return;
    }

    const controller = new AbortController();

    fetch(`/api/legacy-project-collection/${slug}?locale=${locale}`, {
      signal: controller.signal,
    })
      .then((response) => (response.ok ? response.json() : { items: [] }))
      .then((payload: { items: GalleryItem[] }) => setItems(payload.items))
      .catch((error: unknown) => {
        if (!(error instanceof DOMException && error.name === "AbortError")) {
          setItems([]);
        }
      });

    return () => controller.abort();
  }, [isOpen, locale, mode, slug]);

  const gallery = items ? (
    <ImageLightboxGallery
      items={items}
      locale={locale}
      gridClassName="legacy-mockup-grid"
      cardClassName="card legacy-mockup-card"
      triggerClassName="gallery-trigger legacy-mockup-trigger"
      frameClassName="legacy-mockup-frame"
      imageSizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 33vw"
    />
  ) : null;

  if (mode === "mobile") {
    return (
      <details
        className="card mobile-deferred-details legacy-mockup-details"
        onToggle={(event) => setIsOpen(event.currentTarget.open)}
      >
        <summary className="archive-summary">
          <h3>{title}</h3>
          <p className="page-text">{description}</p>
          <span className="project-link-hint">{ui.openArchive}</span>
        </summary>
        {isOpen ? gallery : null}
      </details>
    );
  }

  return (
    <section className="legacy-mockup-section">
      <div className="section-heading page-subheading">
        <h2>{title}</h2>
        <p className="page-text">{description}</p>
      </div>
      {mode === "desktop" ? gallery : null}
    </section>
  );
}
