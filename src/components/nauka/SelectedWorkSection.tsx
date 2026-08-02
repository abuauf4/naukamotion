"use client";

import Link from "next/link";
import Image from "next/image";
import { useReveal } from "@/hooks/useReveal";
import { studioProjects } from "@/lib/studio-data";

/**
 * SelectedWorkSection — 6 large alternating case study rows.
 *
 * Each row:
 *   [Full-width visual]  ←→  [Copy block: index / name / category / tagline / services / View Case Study]
 *
 * Alternates direction per project.
 */
export function SelectedWorkSection() {
  const headerRef = useReveal<HTMLDivElement>();
  const featured = studioProjects.filter((p) => p.featured).slice(0, 6);

  return (
    <section
      id="work"
      style={{
        paddingTop: "120px",
        paddingBottom: "120px",
        background: "var(--bg)",
      }}
    >
      <div className="container-wide">
        {/* Section header */}
        <div
          ref={headerRef}
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "40px",
            marginBottom: "80px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: "60ch" }}>
            <p
              className="eyebrow eyebrow-burnt"
              style={{ marginBottom: "20px" }}
            >
              <span style={{ opacity: 0.5 }}>///</span>
              Selected Work — 06
            </p>
            <h2 className="studio-h2">
              Products that earn their place in the user's life.
            </h2>
          </div>
          <Link
            href="/work"
            className="nmp-link-arrow"
            style={{ flexShrink: 0 }}
          >
            All Work
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 10L10 2M10 2H4M10 2V8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        {/* Project rows */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "120px",
          }}
        >
          {featured.map((project, i) => (
            <ProjectRow
              key={project.slug}
              project={project}
              reversed={i % 2 === 1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectRow({
  project,
  reversed,
}: {
  project: (typeof studioProjects)[number];
  reversed: boolean;
}) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="reveal"
      style={{
        display: "grid",
        gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)",
        gap: "60px",
        alignItems: "center",
        direction: reversed ? "rtl" : "ltr",
      }}
    >
      {/* Visual */}
      <Link
        href={`/work/${project.slug}`}
        style={{
          display: "block",
          position: "relative",
          aspectRatio: "4 / 3",
          background: "var(--bg-card)",
          border: "1px solid var(--line)",
          borderRadius: "8px",
          overflow: "hidden",
          direction: "ltr",
          transition: "transform 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = "translateY(-4px)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = "translateY(0)";
        }}
        aria-label={`${project.name} — view case study`}
      >
        <Image
          src={project.cover}
          alt={`${project.name} — ${project.category}`}
          fill
          sizes="(max-width: 1024px) 100vw, 60vw"
          style={{
            objectFit: "cover",
            transition: "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        />
        {/* Hover overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(180deg, transparent 60%, rgba(0,0,0,0.5) 100%)",
            opacity: 0,
            transition: "opacity 0.4s ease",
            display: "flex",
            alignItems: "flex-end",
            padding: "24px",
          }}
          className="nmp-project-overlay"
        >
          <span
            style={{
              color: "#ffffff",
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.72rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
            }}
          >
            View Case Study →
          </span>
        </div>
      </Link>

      {/* Copy block */}
      <div
        style={{
          direction: "ltr",
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: "16px",
          }}
        >
          <span className="nmp-index">{project.index}</span>
          <span
            className="studio-meta"
            style={{ color: "var(--ink-faint)" }}
          >
            {project.category}
          </span>
        </div>

        <h3 className="studio-h3" style={{ margin: 0 }}>
          {project.name}
        </h3>

        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontSize: "1.05rem",
            color: "var(--ink-soft)",
            lineHeight: 1.5,
            margin: 0,
            maxWidth: "42ch",
          }}
        >
          {project.tagline}
        </p>

        {/* Services */}
        <div
          style={{
            display: "flex",
            gap: "8px",
            flexWrap: "wrap",
            marginTop: "8px",
          }}
        >
          {project.services.map((service) => (
            <span key={service} className="nmp-tag">
              {service}
            </span>
          ))}
        </div>

        <div style={{ marginTop: "12px" }}>
          <Link href={`/work/${project.slug}`} className="nmp-link-arrow">
            View Case Study
            <svg
              width="12"
              height="12"
              viewBox="0 0 12 12"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 10L10 2M10 2H4M10 2V8"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        a:hover :global(.nmp-project-overlay) {
          opacity: 1 !important;
        }
        @media (max-width: 1024px) {
          div {
            grid-template-columns: minmax(0, 1fr) !important;
            direction: ltr !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}
