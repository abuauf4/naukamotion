import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { studioProjects } from "@/lib/studio-data";
import { Header } from "@/components/nauka/Header";
import { Footer } from "@/components/nauka/Footer";
import { ScrollProgress } from "@/components/nauka/ScrollProgress";

/**
 * All Work — /work
 *
 * Index of all studio projects. Server-rendered for SEO.
 */

export const metadata: Metadata = {
  title: "All Work",
  description:
    "Complete index of Nauka Motion studio projects — business platforms, commerce, automotive, insurance, digital storytelling, and experimental systems.",
  alternates: {
    canonical: "/work",
  },
};

export default function AllWorkPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      <ScrollProgress />
      <Header />

      <main style={{ flex: 1, paddingTop: "120px" }}>
        {/* Header */}
        <section style={{ paddingBottom: "80px" }}>
          <div className="container-wide">
            <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "24px" }}>
              <span style={{ opacity: 0.5 }}>///</span>
              All Work — {String(studioProjects.length).padStart(2, "0")}
            </p>
            <h1
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                margin: 0,
                maxWidth: "16ch",
              }}
            >
              Every project we&apos;ve{" "}
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--burnt)",
                }}
              >
                shipped
              </span>
              .
            </h1>
            <p
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "1.15rem",
                color: "var(--ink-soft)",
                lineHeight: 1.55,
                margin: "32px 0 0 0",
                maxWidth: "48ch",
              }}
            >
              The studio takes on a small number of engagements per quarter.
              Here is the full index — each project links to its own case study
              with strategy, design, engineering, and outcome.
            </p>
          </div>
        </section>

        {/* Projects list */}
        <section style={{ paddingBottom: "120px" }}>
          <div className="container-wide">
            <div
              style={{
                borderTop: "1px solid var(--line)",
              }}
            >
              {studioProjects.map((project, i) => (
                <Link
                  key={project.slug}
                  href={`/work/${project.slug}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "grid",
                    gridTemplateColumns:
                      "minmax(60px, 80px) minmax(0, 2fr) minmax(0, 3fr) minmax(0, 2fr) 80px",
                    gap: "24px",
                    alignItems: "center",
                    padding: "32px 0",
                    borderBottom: "1px solid var(--line)",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--paper-warm)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                  className="nmp-work-row"
                >
                  <span className="nmp-index">{project.index}</span>
                  <div>
                    <h3
                      style={{
                        fontFamily: "var(--font-body), sans-serif",
                        fontWeight: 500,
                        fontSize: "clamp(1.4rem, 2vw, 1.85rem)",
                        letterSpacing: "-0.015em",
                        color: "var(--ink)",
                        margin: 0,
                        lineHeight: 1.1,
                      }}
                    >
                      {project.name}
                    </h3>
                    <p
                      className="studio-meta"
                      style={{ margin: "8px 0 0 0", color: "var(--ink-faint)" }}
                    >
                      {project.year}
                    </p>
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontSize: "0.95rem",
                      color: "var(--ink-soft)",
                      lineHeight: 1.5,
                      margin: 0,
                      maxWidth: "44ch",
                    }}
                    className="nmp-work-tagline"
                  >
                    {project.tagline}
                  </p>
                  <span
                    className="studio-meta"
                    style={{ color: "var(--burnt)" }}
                  >
                    {project.category}
                  </span>
                  <span
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "flex-end",
                      color: "var(--ink-soft)",
                      transition: "transform 0.25s ease, color 0.25s ease",
                    }}
                    className="nmp-work-arrow"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M2 10L10 2M10 2H4M10 2V8"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Bottom CTA */}
        <section
          style={{
            paddingTop: "100px",
            paddingBottom: "100px",
            background: "var(--paper-warm)",
            borderTop: "1px solid var(--line)",
          }}
        >
          <div
            className="container-wide"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "24px",
            }}
          >
            <p
              className="eyebrow eyebrow-burnt"
            >
              <span style={{ opacity: 0.5 }}>///</span>
              Have a product worth building?
            </p>
            <h2
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
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
            <Link href="/#contact" className="nmp-btn nmp-btn-primary">
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
          .nmp-work-row {
            grid-template-columns: 60px minmax(0, 1fr) 40px !important;
          }
          .nmp-work-tagline {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
