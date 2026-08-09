"use client";

import { useReveal } from "@/hooks/useReveal";
import { studioProcess } from "@/lib/studio-data";

/**
 * ProcessSection — "Cara Kami Bekerja"
 *
 * 5 langkah: Diskusi → Definisi → Desain → Pengembangan → Evolusi.
 * Bahasa Indonesia.
 */
export function ProcessSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="process"
      style={{
        paddingTop: "120px",
        paddingBottom: "120px",
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
            Cara Kami Bekerja — 05 Langkah
          </p>
          <h2 className="studio-h2">
            Bagaimana produk bergerak dari pertanyaan menjadi sistem yang{" "}
            <span
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--burnt)",
              }}
            >
              bekerja
            </span>
            .
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
                minHeight: "240px",
              }}
              className="nmp-process-step"
            >
              <span className="nmp-index">{step.index}</span>
              <h3
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.2rem, 1.6vw, 1.5rem)",
                  letterSpacing: "-0.015em",
                  color: "var(--ink)",
                  margin: 0,
                }}
              >
                {step.title.id}
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
                {step.description.id}
              </p>
            </div>
          ))}
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
