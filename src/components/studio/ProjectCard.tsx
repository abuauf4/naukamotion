import Image from "next/image";
import Link from "next/link";
import type { StudioProject } from "@/lib/cms";
import type { Locale } from "@/lib/server-locale";

export function ProjectCard({
  project,
  locale,
}: {
  project: StudioProject;
  locale: Locale;
}) {
  const status =
    project.status === "internal"
      ? locale === "id"
        ? "Produk internal"
        : "In-house product"
      : project.status === "development"
        ? locale === "id"
          ? "Dalam pengembangan"
          : "In development"
        : project.industry;
  return (
    <Link href={`/work/${project.slug}`} className="nm-work-card">
      <div className="nm-work-visual">
        <Image
          src={project.cover}
          alt={`Preview ${project.name}`}
          fill
          sizes="(max-width: 640px) 92vw, 44vw"
        />
      </div>
      <div className="nm-work-caption">
        <div>
          <span>{status}</span>
          <h3>{project.name}</h3>
          <p>{project.tagline[locale]}</p>
        </div>
        <span className="nm-project-number">{project.index}</span>
      </div>
    </Link>
  );
}
