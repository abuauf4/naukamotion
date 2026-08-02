import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import {
  getProjectBySlug,
  getAllProjectSlugs,
  studioProjects,
  type CaseStudyBlock,
} from "@/lib/studio-data";
import { Header } from "@/components/nauka/Header";
import { Footer } from "@/components/nauka/Footer";
import { ScrollProgress } from "@/components/nauka/ScrollProgress";

/**
 * Case Study Detail Page — /work/[slug]
 *
 * This page is FULLY SERVER-RENDERED so crawlers, OG scrapers, and search
 * engines can read every section. Previously this route only rendered the
 * navbar and footer — content was client-rendered and invisible to bots.
 *
 * Sections (per brief):
 *   01 Hero visual
 *   02 Project overview
 *   03 Client / industry / year / role
 *   04 The challenge
 *   05 Strategic direction
 *   06 User journey
 *   07 System architecture
 *   08 UI design system
 *   09 Key screens
 *   10 Mobile experience
 *   11 Engineering approach
 *   12 Outcome / impact
 *   13 What we learned
 *   14 Next project
 */

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = getProjectBySlug(slug);
  if (!project) {
    return {
      title: "Project Not Found",
    };
  }

  const title = `${project.name} — ${project.category}`;
  const description = project.tagline;

  return {
    title,
    description,
    openGraph: {
      title: `${project.name} — Nauka Motion`,
      description,
      type: "article",
      images: [
        {
          url: project.cover,
          width: 1200,
          height: 630,
          alt: `${project.name} — ${project.category}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.name} — Nauka Motion`,
      description,
      images: [project.cover],
    },
    alternates: {
      canonical: `/work/${project.slug}`,
    },
  };
}

export default async function CaseStudyPage({ params }: Params) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const nextProject = project.caseStudy.nextProjectSlug
    ? getProjectBySlug(project.caseStudy.nextProjectSlug)
    : studioProjects[0];

  // JSON-LD structured data — makes Google understand this is a case study
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.name,
    description: project.tagline,
    creator: {
      "@type": "Organization",
      name: "Nauka Motion",
      url: "https://motion.nauka.id",
    },
    about: project.caseStudy.overview,
    keywords: project.services.join(", "),
    datePublished: project.year,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollProgress />
      <Header />

      <main style={{ flex: 1, paddingTop: "80px" }}>
        {/* 01 — Hero visual */}
        <section
          style={{
            paddingTop: "60px",
            paddingBottom: "80px",
          }}
        >
          <div className="container-wide">
            {/* Breadcrumb */}
            <div
              style={{
                marginBottom: "48px",
                display: "flex",
                gap: "12px",
                alignItems: "center",
              }}
            >
              <Link
                href="/#work"
                className="studio-meta"
                style={{
                  color: "var(--ink-soft)",
                  textDecoration: "none",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 12 12"
                  fill="none"
                  aria-hidden="true"
                >
                  <path
                    d="M10 10L2 2M2 2H8M2 2V8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    transform="rotate(180 6 6)"
                  />
                </svg>
                All Work
              </Link>
              <span
                className="studio-meta"
                style={{ color: "var(--ink-faint)" }}
              >
                /
              </span>
              <span
                className="studio-meta"
                style={{ color: "var(--ink)" }}
              >
                {project.name}
              </span>
            </div>

            {/* Eyebrow + index */}
            <div
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: "16px",
                marginBottom: "24px",
              }}
            >
              <span className="nmp-index">{project.index}</span>
              <span className="studio-meta" style={{ color: "var(--ink-faint)" }}>
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h1
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2.5rem, 7vw, 6rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                margin: 0,
                marginBottom: "32px",
                maxWidth: "16ch",
              }}
            >
              {project.name}
            </h1>

            {/* Tagline */}
            <p
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.3rem, 2.2vw, 1.85rem)",
                color: "var(--ink-soft)",
                lineHeight: 1.4,
                margin: 0,
                maxWidth: "44ch",
              }}
            >
              {project.tagline}
            </p>
          </div>
        </section>

        {/* Hero image */}
        <section style={{ paddingBottom: "80px" }}>
          <div className="container-wide">
            <div
              style={{
                position: "relative",
                aspectRatio: "16 / 9",
                background: "var(--bg-card)",
                border: "1px solid var(--line)",
                borderRadius: "8px",
                overflow: "hidden",
              }}
            >
              <Image
                src={project.cover}
                alt={`${project.name} — ${project.category} cover`}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 80vw"
                style={{ objectFit: "cover" }}
              />
            </div>
          </div>
        </section>

        {/* 02 + 03 — Overview + meta sidebar */}
        <section
          style={{
            paddingBottom: "120px",
            borderTop: "1px solid var(--line)",
            paddingTop: "80px",
          }}
        >
          <div className="container-wide">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "minmax(0, 1.6fr) minmax(0, 1fr)",
                gap: "80px",
                alignItems: "start",
              }}
              className="nmp-cs-overview-grid"
            >
              <div>
                <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "24px" }}>
                  <span style={{ opacity: 0.5 }}>///</span>
                  Project Overview
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontStyle: "italic",
                    fontSize: "clamp(1.4rem, 2vw, 1.85rem)",
                    color: "var(--ink)",
                    lineHeight: 1.5,
                    margin: 0,
                    maxWidth: "52ch",
                  }}
                >
                  {project.caseStudy.overview}
                </p>
              </div>

              {/* Meta sidebar */}
              <aside
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "32px",
                  padding: "32px",
                  background: "var(--paper-warm)",
                  border: "1px solid var(--line)",
                  borderRadius: "8px",
                }}
              >
                <MetaItem label="Client" value={project.client} />
                <MetaItem label="Industry" value={project.industry} />
                <MetaItem label="Year" value={project.year} />
                <MetaItem label="Role" value={project.role} />
                <div>
                  <p
                    className="studio-meta"
                    style={{
                      marginBottom: "12px",
                      color: "var(--ink-faint)",
                    }}
                  >
                    Services
                  </p>
                  <div
                    style={{
                      display: "flex",
                      gap: "6px",
                      flexWrap: "wrap",
                    }}
                  >
                    {project.services.map((s) => (
                      <span
                        key={s}
                        className="nmp-tag"
                        style={{ fontSize: "0.6rem" }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="nmp-link-arrow"
                    style={{ marginTop: "8px" }}
                  >
                    Visit live site
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
                  </a>
                )}
              </aside>
            </div>
          </div>
        </section>

        {/* 04-13 — Case study blocks */}
        <section style={{ paddingBottom: "80px" }}>
          <div
            style={{
              maxWidth: "860px",
              margin: "0 auto",
              paddingLeft: "clamp(20px, 5vw, 80px)",
              paddingRight: "clamp(20px, 5vw, 80px)",
            }}
          >
            {project.caseStudy.blocks.map((block, i) => (
              <CaseStudyBlockRender
                key={block.kind + i}
                block={block}
                index={i + 4}
              />
            ))}
          </div>
        </section>

        {/* 14 — Next project */}
        {nextProject && nextProject.slug !== project.slug && (
          <section
            style={{
              borderTop: "1px solid var(--line)",
              paddingTop: "80px",
              paddingBottom: "80px",
              background: "var(--paper-warm)",
            }}
          >
            <div className="container-wide">
              <Link
                href={`/work/${nextProject.slug}`}
                style={{
                  textDecoration: "none",
                  color: "inherit",
                  display: "grid",
                  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.5fr)",
                  gap: "60px",
                  alignItems: "center",
                }}
                className="nmp-next-project"
              >
                <div>
                  <p
                    className="eyebrow eyebrow-burnt"
                    style={{ marginBottom: "20px" }}
                  >
                    <span style={{ opacity: 0.5 }}>///</span>
                    Next Project
                  </p>
                  <span className="nmp-index">{nextProject.index}</span>
                  <h3
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(2rem, 4vw, 3rem)",
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                      margin: "16px 0",
                      lineHeight: 1.05,
                    }}
                  >
                    {nextProject.name}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontSize: "1rem",
                      color: "var(--ink-soft)",
                      lineHeight: 1.5,
                      margin: 0,
                      maxWidth: "40ch",
                    }}
                  >
                    {nextProject.tagline}
                  </p>
                  <span
                    className="nmp-link-arrow"
                    style={{ marginTop: "24px", display: "inline-flex" }}
                  >
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
                  </span>
                </div>
                <div
                  style={{
                    position: "relative",
                    aspectRatio: "4 / 3",
                    background: "var(--bg-card)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                    overflow: "hidden",
                  }}
                >
                  <Image
                    src={nextProject.cover}
                    alt={`${nextProject.name} cover`}
                    fill
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Link>
            </div>
          </section>
        )}

        {/* Bottom CTA */}
        <section
          style={{
            paddingTop: "100px",
            paddingBottom: "100px",
            background: "var(--ink)",
            color: "var(--paper)",
          }}
        >
          <div
            className="container-wide"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "32px",
            }}
          >
            <p
              className="eyebrow"
              style={{ color: "var(--burnt)" }}
            >
              <span style={{ opacity: 0.5 }}>///</span>
              Have a product worth building?
            </p>
            <h2
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2rem, 5vw, 4rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--paper)",
                margin: 0,
                maxWidth: "16ch",
              }}
            >
              Start a{" "}
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--burnt)",
                }}
              >
                project
              </span>{" "}
              with us.
            </h2>
            <Link
              href="/#contact"
              className="nmp-btn nmp-btn-primary"
              style={{
                background: "var(--burnt)",
                borderColor: "var(--burnt)",
                color: "#ffffff",
              }}
            >
              Start a Project
              <svg
                width="11"
                height="11"
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
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 1024px) {
          .nmp-cs-overview-grid {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 40px !important;
          }
          .nmp-next-project {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </div>
  );
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p
        className="studio-meta"
        style={{
          marginBottom: "8px",
          color: "var(--ink-faint)",
        }}
      >
        {label}
      </p>
      <p
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontSize: "1rem",
          color: "var(--ink)",
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        {value}
      </p>
    </div>
  );
}

function CaseStudyBlockRender({
  block,
  index,
}: {
  block: CaseStudyBlock;
  index: number;
}) {
  const formattedIndex = String(index).padStart(2, "0");

  return (
    <article
      style={{
        paddingBottom: "80px",
        marginBottom: "80px",
        borderBottom: "1px solid var(--line)",
      }}
    >
      {/* Block header */}
      <div
        style={{
          display: "flex",
          alignItems: "baseline",
          gap: "16px",
          marginBottom: "24px",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono), monospace",
            fontSize: "0.7rem",
            color: "var(--burnt)",
            letterSpacing: "0.15em",
          }}
        >
          {formattedIndex}
        </span>
        <span
          className="studio-meta"
          style={{ color: "var(--ink-faint)" }}
        >
          {block.kind.replace(/-/g, " ")}
        </span>
      </div>

      <h2
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontWeight: 500,
          fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
          letterSpacing: "-0.02em",
          color: "var(--ink)",
          margin: 0,
          marginBottom: "32px",
          lineHeight: 1.1,
        }}
      >
        {block.title}
      </h2>

      {/* Body paragraphs */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        {block.body.map((para, i) => (
          <p
            key={i}
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "1.05rem",
              color: "var(--ink-soft)",
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {para}
          </p>
        ))}
      </div>

      {/* Bullets */}
      {block.bullets && block.bullets.length > 0 && (
        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: "32px 0 0 0",
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "12px 32px",
          }}
          className="nmp-cs-bullets"
        >
          {block.bullets.map((b, i) => (
            <li
              key={i}
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "0.92rem",
                color: "var(--ink-soft)",
                display: "flex",
                gap: "12px",
                alignItems: "baseline",
                lineHeight: 1.5,
              }}
            >
              <span
                style={{
                  width: "6px",
                  height: "6px",
                  background: "var(--burnt)",
                  borderRadius: "999px",
                  flexShrink: 0,
                  marginTop: "7px",
                }}
              />
              {b}
            </li>
          ))}
        </ul>
      )}

      <style>{`
        @media (max-width: 640px) {
          .nmp-cs-bullets {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </article>
  );
}
