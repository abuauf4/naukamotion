"use client";

import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { studioInsights } from "@/lib/studio-data";

/**
 * InsightsSection — Journal-style preview
 *
 * Per brief: Tambahkan section jurnal, bukan blog SEO generik.
 *   - Designing a Premium Calculator That Users Trust
 *   - From Landing Page to Digital Product
 *   - Building Reusable CMS Architecture
 *   - Why Mobile-First Is Not Mobile-Stacked
 *   - How AI Changes the Role of a Product Builder
 *
 * Ini menaikkan posisi dari "orang yang bisa bikin website"
 * menjadi studio yang punya cara berpikir.
 */

export function InsightsSection() {
  const ref = useReveal<HTMLDivElement>();
  const featured = studioInsights.slice(0, 4);

  return (
    <section
      id="insights"
      style={{
        paddingTop: "140px",
        paddingBottom: "140px",
        background: "var(--bg)",
      }}
    >
      <div className="container-wide">
        {/* Header */}
        <div
          ref={ref}
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "40px",
            marginBottom: "64px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: "60ch" }}>
            <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "20px" }}>
              <span style={{ opacity: 0.5 }}>///</span>
              Insights — Journal
            </p>
            <h2 className="studio-h2">
              How we think about building.
            </h2>
          </div>
          <Link href="/insights" className="nmp-link-arrow" style={{ flexShrink: 0 }}>
            All Writing
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

        {/* Articles grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
            gap: "0",
            borderTop: "1px solid var(--line)",
          }}
          className="nmp-insights-grid"
        >
          {featured.map((insight, i) => (
            <Link
              key={insight.slug}
              href={`/insights/${insight.slug}`}
              style={{
                textDecoration: "none",
                color: "inherit",
                padding: "40px 0",
                borderBottom: "1px solid var(--line)",
                borderRight:
                  i % 2 === 0 ? "1px solid var(--line)" : "none",
                paddingRight: i % 2 === 0 ? "32px" : "0",
                paddingLeft: i % 2 === 1 ? "32px" : "0",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                transition: "background 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "var(--paper-warm)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
              }}
              className="nmp-insight-row"
            >
              <div
                style={{
                  display: "flex",
                  gap: "16px",
                  alignItems: "center",
                }}
              >
                <span
                  className="studio-meta"
                  style={{ color: "var(--burnt)" }}
                >
                  {insight.category}
                </span>
                <span
                  className="studio-meta"
                  style={{ color: "var(--ink-faint)" }}
                >
                  {insight.readTime}
                </span>
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(1.4rem, 2.2vw, 1.9rem)",
                  letterSpacing: "-0.015em",
                  color: "var(--ink)",
                  margin: 0,
                  lineHeight: 1.15,
                }}
              >
                {insight.title}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.95rem",
                  color: "var(--ink-soft)",
                  lineHeight: 1.55,
                  margin: 0,
                  maxWidth: "44ch",
                }}
              >
                {insight.excerpt}
              </p>

              <div
                style={{
                  marginTop: "auto",
                  paddingTop: "16px",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.7rem",
                    color: "var(--ink-faint)",
                    letterSpacing: "0.1em",
                  }}
                >
                  {new Date(insight.date).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.nmp-insights-grid) {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          :global(.nmp-insight-row) {
            border-right: none !important;
            padding-left: 0 !important;
            padding-right: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
