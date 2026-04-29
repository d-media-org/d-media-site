"use client";

import { useEffect } from "react";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
  }
}

export function AnalyticsEvents() {
  useEffect(() => {
    const handleClick = (event: MouseEvent) => {
      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const mailtoLink = target.closest<HTMLAnchorElement>('a[href^="mailto:"]');
      if (mailtoLink) {
        window.gtag?.("event", "mailto_click", {
          link_url: mailtoLink.href,
          link_text: mailtoLink.textContent?.trim() || "",
        });
        return;
      }

      const trackedElement = target.closest<HTMLElement>("[data-ga-event]");
      if (!trackedElement) {
        return;
      }

      const eventName = trackedElement.dataset.gaEvent;
      if (!eventName) {
        return;
      }

      window.gtag?.("event", eventName, {
        cta_label: trackedElement.textContent?.trim() || "",
        cta_location: trackedElement.dataset.gaLocation || "",
        cta_href:
          trackedElement instanceof HTMLAnchorElement ? trackedElement.href : trackedElement.dataset.gaHref || "",
      });
    };

    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);

  return null;
}
