"use client";

import { useEffect, useRef, useState } from "react";
import type { ImageProps } from "next/image";

import { ProtectedImage } from "@/components/protected-image";
import { type Locale } from "@/lib/i18n";
import { getUiCopy } from "@/lib/ui-copy";

type GalleryItem = {
  src: string;
  alt: string;
};

type ImageLightboxGalleryProps = {
  items: GalleryItem[];
  locale: Locale;
  gridClassName: string;
  cardClassName: string;
  triggerClassName: string;
  frameClassName: string;
  imageSizes: string;
};

function ViewportProtectedImage(props: ImageProps) {
  const containerRef = useRef<HTMLSpanElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const isMobile = window.matchMedia("(max-width: 767px)").matches;

    if (!isMobile || typeof window.IntersectionObserver !== "function") {
      const frame = window.requestAnimationFrame(() => setIsVisible(true));
      return () => window.cancelAnimationFrame(frame);
    }

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "720px 0px" },
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <span ref={containerRef} className="viewport-protected-image">
      {isVisible ? <ProtectedImage {...props} /> : null}
    </span>
  );
}

export function ImageLightboxGallery({
  items,
  locale,
  gridClassName,
  cardClassName,
  triggerClassName,
  frameClassName,
  imageSizes,
}: ImageLightboxGalleryProps) {
  const ui = getUiCopy(locale);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setActiveIndex(null);
      }
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex]);

  const activeItem = activeIndex === null ? null : items[activeIndex];

  return (
    <>
      <div className={gridClassName}>
        {items.map((item, index) => (
          <article className={cardClassName} key={item.src}>
            <button
              type="button"
              className={triggerClassName}
              onClick={() => setActiveIndex(index)}
              aria-label={`${ui.mockupHint}: ${item.alt}`}
            >
              <div className={frameClassName}>
                <ViewportProtectedImage
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={imageSizes}
                />
              </div>
            </button>
          </article>
        ))}
      </div>

      {activeItem ? (
        <div
          className="gallery-lightbox"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.alt}
          onClick={() => setActiveIndex(null)}
        >
          <div
            className="gallery-lightbox-panel"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="gallery-lightbox-topbar">
              <button
                type="button"
                className="gallery-lightbox-close"
                onClick={() => setActiveIndex(null)}
                aria-label={ui.closePreview}
              >
                ×
              </button>
            </div>
            <div className="gallery-lightbox-frame">
              <div className="gallery-lightbox-image">
                <ProtectedImage
                  src={activeItem.src}
                  alt={activeItem.alt}
                  fill
                  sizes="90vw"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
