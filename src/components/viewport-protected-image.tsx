"use client";

import { useEffect, useRef, useState } from "react";
import type { ImageProps } from "next/image";

import { ProtectedImage } from "@/components/protected-image";

export function ViewportProtectedImage(props: ImageProps) {
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
      { rootMargin: "560px 0px" },
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
