import Link from "next/link";

import { ProtectedImage } from "@/components/protected-image";
import { getFeaturedProjects } from "@/lib/featured-projects";

function formatFileCount(count: number) {
  return `${count} ${count === 1 ? "файл" : "файла"}`;
}

export async function ProjectShowcase({ className }: { className?: string }) {
  const featuredProjects = await getFeaturedProjects();

  return (
    <div className={className ? `showcase-grid ${className}` : "showcase-grid"}>
      {featuredProjects.map((project) => (
        <Link className="card showcase-card showcase-link-card" href={`/projects/${project.slug}`} key={project.slug}>
          <article>
            <div className="showcase-image">
              <div className="showcase-image-frame">
                <ProtectedImage
                  src={project.cover}
                  alt={project.title}
                  fill
                  sizes="(max-width: 979px) 100vw, 50vw"
                />
              </div>
            </div>
            <div className="showcase-copy">
              <h3>{project.title}</h3>
              <p className="project-lead">{project.summary}</p>
              <ul className="detail-list detail-list-compact">
                {project.focus.slice(0, 2).map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <div className="project-card-footer">
                <span className="project-meta">{formatFileCount(project.imageCount)}</span>
                <span className="project-link-hint">отвори проекта</span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
