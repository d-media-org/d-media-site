"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

import { AnalyticsEvents } from "@/components/analytics-events";
import { getLocaleFromPathname, localizeHref } from "@/lib/i18n";
import { getUiCopy } from "@/lib/ui-copy";

const CONSENT_KEY = "d-media-consent";

type ConsentState = "accepted" | "rejected" | null;

export function ConsentBanner() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname);
  const ui = getUiCopy(locale);
  const googleAnalyticsId = process.env.NEXT_PUBLIC_GA4_MEASUREMENT_ID;
  const [consent, setConsent] = useState<ConsentState | undefined>(undefined);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      let storedConsent: string | null = null;

      try {
        storedConsent = window.localStorage.getItem(CONSENT_KEY);
      } catch {
        storedConsent = null;
      }

      setConsent(storedConsent === "accepted" || storedConsent === "rejected" ? storedConsent : null);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const handleConsent = (nextConsent: Exclude<ConsentState, null>) => {
    try {
      window.localStorage.setItem(CONSENT_KEY, nextConsent);
    } catch {
      // Continue with in-memory consent when storage is unavailable.
    }

    setConsent(nextConsent);
  };

  const hasAccepted = consent === "accepted";
  const shouldShowBanner = consent === null;

  return (
    <>
      {shouldShowBanner ? (
        <div className="consent-banner" role="dialog" aria-live="polite" aria-label={ui.consent.ariaLabel}>
          <div className="consent-banner-copy">
            <p className="eyebrow">{ui.consent.eyebrow}</p>
            <p>
              {ui.consent.text}
            </p>
            <Link href={localizeHref(locale, "/privacy")}>
              {ui.consent.more}
            </Link>
          </div>
          <div className="consent-banner-actions">
            <button
              type="button"
              className="button button-secondary"
              onClick={() => handleConsent("rejected")}
            >
              {ui.consent.reject}
            </button>
            <button
              type="button"
              className="button button-primary"
              onClick={() => handleConsent("accepted")}
            >
              {ui.consent.accept}
            </button>
          </div>
        </div>
      ) : null}

      {hasAccepted ? (
        <>
          {googleAnalyticsId ? (
            <>
              <Script
                src={`https://www.googletagmanager.com/gtag/js?id=${googleAnalyticsId}`}
                strategy="afterInteractive"
              />
              <Script id="google-analytics" strategy="afterInteractive">
                {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('consent', 'update', {
  analytics_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
gtag('js', new Date());
gtag('config', '${googleAnalyticsId}', {
  page_path: window.location.pathname,
});`}
              </Script>
            </>
          ) : null}
          <AnalyticsEvents />
          <Analytics />
          <SpeedInsights />
        </>
      ) : null}
    </>
  );
}
