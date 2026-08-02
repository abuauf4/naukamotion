"use client";

import { useReveal } from "@/hooks/useReveal";
import { studioProcess } from "@/lib/studio-data";

/**
 * ProcessSection — 5-step workflow
 *
 * Per brief: copy-nya sebaiknya dipadatkan menjadi:
 *   Discover — Understand the business, users, and real constraints.
 *   Define  — Shape the product direction, architecture, and priorities.
 *   Design  — Build the visual system and interaction model.
 *   Develop — Turn the system into a reliable working product.
 *   Evolve  — Launch, learn, measure, and improve.
 *
 * Jangan menjelaskan bahwa lu "bukan coding manual baris per baris".
 */

export function ProcessSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="process"
      style={{
        paddingTop: "140px",
        paddingBottom: "140px",
        background: "var(--paper-warm)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="container-wide">
        {/* Header */}
        <div
          ref={ref}
          className="reveal"
          style={{
            marginBottom: "80px",
            maxWidth: "60ch",
          }}
        >
          <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "20px" }}>
            <span style={{ opacity: 0.5 }}>///</span>
            Process — 05 Steps
          </p>
          <h2 className="studio-h2">
            How a product moves from question to working system.
          </h2>
        </div>

        {/* Steps */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(5, minmax(0, 1fr))",
            gap: "0",
            borderTop: "1px solid var(--line)",
          }}
          className="nmp-process-grid"
        >
          {studioProcess.map((step, i) => (
            <div
              key={step.index}
              style={{
                padding: "32px 24px 32px 0",
                borderLeft: i === 0 ? "none" : "1px solid var(--line)",
                paddingLeft: i === 0 ? 0 : "24px",
                display: "flex",
                flexDirection: "column",
                gap: "16px",
                minHeight: "280px",
              }}
              className="nmp-process-step"
            >
              <span className="nmp-index">{step.index}</span>
              <h3
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.3rem, 1.8vw, 1.6rem)",
                  letterSpacing: "-0.015em",
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.92rem",
                  color: "var(--ink-soft)",
                  lineHeight: 1.55,
                  margin: 0,
                }}
              >
                {step.body}
              </p>
            </div>
          ))}
        </div>

        {/* Footer note */}
        <div
          style={{
            marginTop: "48px",
            paddingTop: "32px",
            borderTop: "1px solid var(--line)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: "16px",
            flexWrap: "wrap",
          }}
        >
          <p
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontStyle: "italic",
              fontSize: "1.05rem",
              color: "var(--ink-soft)",
              margin: 0,
            }}
          >
            AI-accelerated, human-directed.
          </p>
          <p
            className="studio-meta"
            style={{ margin: 0 }}
          >
            ~ 12-week average engagement
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          :global(.nmp-process-grid) {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
          :global(.nmp-process-step) {
            border-top: 1px solid var(--line) !important;
            border-left: none !important;
            padding-left: 0 !important;
            padding-top: 24px !important;
            min-height: auto !important;
          }
          :global(.nmp-process-step:nth-child(-n + 2)) {
            border-top: none !important;
            padding-top: 32px !important;
          }
        }
        @media (max-width: 640px) {
          :global(.nmp-process-grid) {
            grid-template-columns: minmax(0, 1fr) !important;
          }
          :global(.nmp-process-step) {
            border-top: 1px solid var(--line) !important;
            padding-top: 24px !important;
          }
          :global(.nmp-process-step:first-child) {
            border-top: none !important;
            padding-top: 0 !important;
          }
        }
      `}</style>
    </section>
  );
}
