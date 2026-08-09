import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import {
  studioCategories,
  getCategoryBySlug,
  getProjectsByCategory,
  type CategorySlug,
} from "@/lib/studio-data";
import { Header } from "@/components/nauka/Header";
import { Footer } from "@/components/nauka/Footer";
import { ScrollProgress } from "@/components/nauka/ScrollProgress";

/**
 * /work — Overview semua kategori.
 *
 * Bukan list project satu per satu. Homepage kategori mengarah ke sini
 * untuk navigasi semua kategori.
 */

export const metadata: Metadata = {
  title: "Kategori Proyek",
  description:
    "Industri dan jenis proyek yang telah dikerjakan Nauka Motion — otomotif, retail teknologi, asuransi, brand konsumen, pariwisata, dan Nauka Labs.",
  alternates: {
    canonical: "/work",
  },
};

export default function WorkOverviewPage() {
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
              Kategori Saat Ini — {String(studioCategories.length).padStart(2, "0")}
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
              Industri dan jenis proyek yang telah kami{" "}
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--burnt)",
                }}
              >
                kerjakan
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
                maxWidth: "52ch",
              }}
            >
              Beberapa industri dan jenis proyek yang telah kami kerjakan sejauh
              ini. Kategori ini akan terus berkembang seiring perjalanan Nauka
              Motion.
            </p>
          </div>
        </section>

        {/* Category list */}
        <section style={{ paddingBottom: "120px" }}>
          <div className="container-wide">
            <div
              style={{
                borderTop: "1px solid var(--line)",
              }}
            >
              {studioCategories.map((cat) => {
                const projects = getProjectsByCategory(cat.slug as CategorySlug);
                return (
                  <Link
                    key={cat.slug}
                    href={`/work/${cat.slug}`}
                    className="nmp-cat-row"
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "minmax(60px, 80px) minmax(0, 2fr) minmax(0, 3fr) minmax(0, 1fr) 80px",
                      gap: "24px",
                      alignItems: "center",
                      padding: "40px 0",
                      borderBottom: "1px solid var(--line)",
                      textDecoration: "none",
                      color: "inherit",
                      transition: "background 0.2s ease",
                    }}
                  >
                    <span className="nmp-index">{cat.index}</span>
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
                        {cat.title}
                      </h3>
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
                      className="nmp-cat-row-desc"
                    >
                      {cat.description.id}
                    </p>
                    <span
                      className="studio-meta"
                      style={{ color: "var(--burnt)" }}
                    >
                      {projects.length > 0
                        ? `${String(projects.length).padStart(2, "0")} proyek`
                        : "segera"}
                    </span>
                    <span
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "flex-end",
                        color: "var(--ink-soft)",
                      }}
                      className="nmp-cat-row-arrow"
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
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        .nmp-cat-row:hover {
          background: var(--paper-warm);
        }
        .nmp-cat-row:hover .nmp-cat-row-arrow {
          color: var(--burnt);
          transform: translateX(2px);
        }
        .nmp-cat-row-arrow {
          transition: transform 0.25s ease, color 0.25s ease;
        }
        @media (max-width: 1024px) {
          .nmp-cat-row {
            grid-template-columns: 60px minmax(0, 1fr) 40px !important;
          }
          .nmp-cat-row-desc {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}
