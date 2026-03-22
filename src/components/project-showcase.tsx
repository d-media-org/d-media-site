import Link from "next/link";
import Image from "next/image";

import { featuredProjectPngs } from "@/lib/project-png-archive";

export function ProjectShowcase({ className }: { className?: string }) {
  return (
    <div className={className ? `showcase-grid ${className}` : "showcase-grid"}>
      {featuredProjectPngs.map((project) => (
        <Link className="card showcase-card showcase-link-card" href={`/projects/${project.slug}`} key={project.slug}>
          <article>
            <div className="showcase-image">
              <Image
                src={project.cover}
                alt={project.title}
                fill
                sizes="(max-width: 979px) 100vw, 50vw"
              />
            </div>
            <div className="showcase-copy">
              <h3>{project.title}</h3>
              <p>{project.context}</p>
              <ul className="detail-list">
                {project.focus.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <p className="outcome-text">{project.summary}</p>
              <div className="project-card-footer">
                <span className="project-meta">{`${project.imageCount} png файла`}</span>
                <span className="project-link-hint">отвори case study</span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
