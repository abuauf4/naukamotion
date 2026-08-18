import Link from "next/link";
import Image from "next/image";
import type { FeaturedProject } from "@/lib/cms";

export function FeaturedWorkSection({
  projects,
  locale,
}: {
  projects: FeaturedProject[];
  locale: "id" | "en";
}) {
  const copy = locale === "en"
    ? { label: "01 — Selected work", heading: "A few things we helped move forward.", viewAll: "View all work" }
    : { label: "01 — Karya pilihan", heading: "Beberapa hal yang kami bantu bergerak lebih jauh.", viewAll: "Lihat semua karya" };

  return (
    <section id="karya" className="nauka-featured-section">
      <div className="container-wide">
        <div className="nauka-featured-kicker">
          <p className="nauka-section-label">{copy.label}</p>
          <Link href="/work" className="nauka-text-link">{copy.viewAll} <span aria-hidden="true">↗</span></Link>
        </div>
        <h2 className="nauka-featured-title">{copy.heading}</h2>

        {projects.length > 0 ? (
          <div className="nauka-featured-stage">
            {projects.map((project, index) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className={`nauka-project-card nauka-project-card-${index + 1}`}
                style={{ "--project-accent": project.accent } as React.CSSProperties}
              >
                <div className="nauka-project-image-wrap">
                  <Image
                    src={project.cover}
                    alt={project.name}
                    fill
                    sizes={index === 0 ? "(max-width: 768px) 100vw, 84vw" : "(max-width: 768px) 100vw, 34vw"}
                    className="nauka-project-image"
                  />
                  <span className="nauka-project-index">{project.index}</span>
                  <span className="nauka-project-arrow" aria-hidden="true">↗</span>
                  <span className="nauka-project-overlay-name">{project.name}</span>
                </div>
                <div className="nauka-project-meta">
                  <div><h3>{project.name}</h3><p>{project.tagline[locale]}</p></div>
                  <span>{project.categoryTitle} · {project.year}</span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="nauka-empty-featured"><p>{locale === "en" ? "Featured work is being curated." : "Karya pilihan sedang dikurasi."}</p></div>
        )}
      </div>
    </section>
  );
}
