import Link from "next/link";

import { ViewportProtectedImage } from "@/components/viewport-protected-image";
import { getFeaturedProjects } from "@/lib/featured-projects";
import type { Locale } from "@/lib/i18n";
import { localizeHref } from "@/lib/i18n";
import { getUiCopy } from "@/lib/ui-copy";

export async function ProjectShowcase({
  className,
  locale = "bg",
}: {
  className?: string;
  locale?: Locale;
}) {
  const ui = getUiCopy(locale);
  const featuredProjects = await getFeaturedProjects(locale);

  return (
    <div className={className ? `showcase-grid ${className}` : "showcase-grid"}>
      {featuredProjects.map((project) => (
        <Link className="card showcase-card showcase-link-card" href={localizeHref(locale, `/projects/${project.slug}`)} key={project.slug}>
          <article>
            <div className="showcase-image">
              <div className="showcase-image-frame">
                <ViewportProtectedImage
                  src={project.cover}
                  alt={project.title}
                  fill
                  sizes="(max-width: 767px) calc(100vw - 32px), (max-width: 1199px) 48vw, 500px"
                />
              </div>
            </div>
            <div className="showcase-copy">
              <h3>{project.title}</h3>
              <p className="project-lead">{project.summary}</p>
              <div className="project-card-footer">
                <span className="project-meta">{ui.fileCount(project.imageCount)}</span>
                <span className="project-link-hint">{ui.projectHint}</span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
