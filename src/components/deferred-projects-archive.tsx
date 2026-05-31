"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { ViewportProtectedImage } from "@/components/viewport-protected-image";
import { localizeHref, type Locale } from "@/lib/i18n";
import { getUiCopy } from "@/lib/ui-copy";

type ArchiveProject = {
  slug: string;
  title: string;
  summary: string;
  imageCount: number;
  cover: string;
};

type DisplayMode = "pending" | "mobile" | "desktop";

function ArchiveGrid({ projects, locale }: { projects: ArchiveProject[]; locale: Locale }) {
  const ui = getUiCopy(locale);

  return (
    <div className="archive-grid">
      {projects.map((project) => (
        <Link
          className="card archive-card archive-project-card showcase-link-card"
          href={localizeHref(locale, `/projects/${project.slug}`)}
          key={project.slug}
          prefetch={false}
        >
          <article>
            <div className="archive-project-cover">
              <div className="archive-project-cover-frame">
                <ViewportProtectedImage
                  src={project.cover}
                  alt={project.title}
                  fill
                  sizes="(max-width: 767px) 100vw, 720px"
                />
              </div>
            </div>
            <div className="archive-project-copy">
              <div className="project-card-footer">
                <span className="archive-category">{ui.fullArchive}</span>
                <span className="archive-count">{ui.fileCount(project.imageCount)}</span>
              </div>
              <h3>{project.title}</h3>
              <p>{project.summary}</p>
              <span className="project-link-hint">{ui.projectHint}</span>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}

export function DeferredProjectsArchive({
  projects,
  locale,
}: {
  projects: ArchiveProject[];
  locale: Locale;
}) {
  const ui = getUiCopy(locale);
  const [mode, setMode] = useState<DisplayMode>("pending");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setMode(window.matchMedia("(max-width: 767px)").matches ? "mobile" : "desktop");
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (mode === "pending") {
    return null;
  }

  if (mode === "desktop") {
    return <ArchiveGrid projects={projects} locale={locale} />;
  }

  return (
    <details
      className="card mobile-deferred-details"
      onToggle={(event) => setIsOpen(event.currentTarget.open)}
    >
      <summary className="archive-summary">
        <h3>{ui.fullArchive}</h3>
        <span className="project-link-hint">{ui.openArchive}</span>
      </summary>
      {isOpen ? <ArchiveGrid projects={projects} locale={locale} /> : null}
    </details>
  );
}
