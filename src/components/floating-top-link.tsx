"use client";

import { useEffect, useRef, useState } from "react";

export function FloatingTopLink({ label }: { label: string }) {
  const footerRef = useRef<HTMLElement | null>(null);
  const [showTopButton, setShowTopButton] = useState(false);

  useEffect(() => {
    footerRef.current = document.querySelector(".site-footer");

    const handleScroll = () => {
      if (window.innerWidth >= 980) {
        setShowTopButton(window.scrollY > 120);
        return;
      }

      const footerTop = footerRef.current?.getBoundingClientRect().top ?? Infinity;
      const hideClearance = 84;
      const shouldHideForFooter = footerTop < window.innerHeight - hideClearance;
      setShowTopButton(window.scrollY > 240 && !shouldHideForFooter);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  return (
    <a
      className={`floating-top${showTopButton ? "" : " is-hidden"}`}
      href="#top"
      aria-label={label}
    >
      <span className="floating-top-label">{label}</span>
      <span className="floating-top-arrow" aria-hidden="true">
        ↑
      </span>
    </a>
  );
}
