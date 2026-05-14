"use client";

import { useEffect, useState } from "react";

import { ConsentBanner } from "@/components/consent-banner";

export function DeferredConsentBanner() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setIsMounted(true);
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return isMounted ? <ConsentBanner /> : null;
}
