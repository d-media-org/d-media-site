import Link from "next/link";
import Image from "next/image";

import { projects } from "@/lib/site-content";

export function ProjectShowcase({ className }: { className?: string }) {
  return (
    <div className={className ? `showcase-grid ${className}` : "showcase-grid"}>
      {projects.map((project) => (
        <Link className="card showcase-card showcase-link-card" href={`/projects/${project.slug}`} key={project.id}>
          <article>
            <div className="showcase-image">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 979px) 100vw, 50vw"
              />
            </div>
            <div className="showcase-copy">
              <h3>{project.title}</h3>
              <p>{project.intro}</p>
              <ul className="detail-list">
                {project.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
              <p className="outcome-text">{project.outcome}</p>
              <div className="project-card-footer">
                <span className="project-meta">{project.meta}</span>
                <span className="project-link-hint">отвори case study</span>
              </div>
            </div>
          </article>
        </Link>
      ))}
    </div>
  );
}
