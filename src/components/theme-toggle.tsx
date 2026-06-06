"use client";

import { useEffect, useState, type SVGProps } from "react";

import { getUiCopy } from "@/lib/ui-copy";

type ThemeMode = "auto" | "light" | "dark";

function ThemeIcon({
  kind,
  ...props
}: { kind: ThemeMode } & SVGProps<SVGSVGElement>) {
  if (kind === "light") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.65" />
        <path
          d="M12 2.8V5.1M12 18.9v2.3M5.49 5.49l1.63 1.63M16.88 16.88l1.63 1.63M2.8 12h2.3M18.9 12h2.3M5.49 18.51l1.63-1.63M16.88 7.12l1.63-1.63"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
        />
      </svg>
    );
  }

  if (kind === "dark") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
        <path
          d="M16.9 14.9A7.3 7.3 0 0 1 9.1 7.1a7.35 7.35 0 1 0 7.8 7.8Z"
          stroke="currentColor"
          strokeWidth="1.65"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" {...props}>
      <text
        x="12"
        y="16"
        textAnchor="middle"
        fill="currentColor"
        fontSize="12"
        fontWeight="700"
        fontFamily="inherit"
      >
        A
      </text>
    </svg>
  );
}

export function ThemeToggle({
  locale,
  className,
  ui,
}: {
  locale: "bg" | "en";
  className?: string;
  ui: ReturnType<typeof getUiCopy>["footer"];
}) {
  const [mode, setMode] = useState<ThemeMode>("auto");

  useEffect(() => {
    const root = document.documentElement;
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const storageKey = "d-media-theme-mode";

    const readStoredMode = () => {
      try {
        return window.localStorage.getItem(storageKey);
      } catch {
        return null;
      }
    };

    const writeStoredMode = (nextMode: ThemeMode) => {
      try {
        window.localStorage.setItem(storageKey, nextMode);
      } catch {
        // Theme still applies for the current session when storage is unavailable.
      }
    };

    const applyTheme = (nextMode: ThemeMode) => {
      const resolvedTheme = nextMode === "auto"
        ? (media.matches ? "dark" : "light")
        : nextMode;

      root.dataset.themeMode = nextMode;
      root.dataset.theme = resolvedTheme;
      writeStoredMode(nextMode);
      setMode(nextMode);
    };

    const storedMode = readStoredMode();
    const initialMode = storedMode === "light" || storedMode === "dark" ? storedMode : "auto";
    applyTheme(initialMode);

    const syncAutoMode = () => {
      const currentMode = (readStoredMode() as ThemeMode | null) ?? "auto";
      if (currentMode === "auto") {
        root.dataset.theme = media.matches ? "dark" : "light";
      }
    };

    if (typeof media.addEventListener === "function") {
      media.addEventListener("change", syncAutoMode);
    } else if (typeof media.addListener === "function") {
      media.addListener(syncAutoMode);
    }

    return () => {
      if (typeof media.removeEventListener === "function") {
        media.removeEventListener("change", syncAutoMode);
      } else if (typeof media.removeListener === "function") {
        media.removeListener(syncAutoMode);
      }
    };
  }, []);

  const items = [
    { key: "auto" as const, label: ui.themeAuto },
    { key: "light" as const, label: ui.themeLight },
    { key: "dark" as const, label: ui.themeDark },
  ];

  return (
    <div className={className} aria-label={ui.themeSwitcherAria} role="group" data-locale={locale}>
      {items.map((item) => (
        <button
          key={item.key}
          type="button"
          className={mode === item.key ? "is-active" : undefined}
          aria-pressed={mode === item.key}
          title={item.label}
          onClick={() => {
            const root = document.documentElement;
            const media = window.matchMedia("(prefers-color-scheme: dark)");
            const resolvedTheme = item.key === "auto"
              ? (media.matches ? "dark" : "light")
              : item.key;

            root.dataset.themeMode = item.key;
            root.dataset.theme = resolvedTheme;
            try {
              window.localStorage.setItem("d-media-theme-mode", item.key);
            } catch {
              // Theme still applies for the current session when storage is unavailable.
            }
            setMode(item.key);
          }}
        >
          <ThemeIcon kind={item.key} className="theme-toggle-icon" />
          <span className="sr-only">{item.label}</span>
        </button>
      ))}
    </div>
  );
}
