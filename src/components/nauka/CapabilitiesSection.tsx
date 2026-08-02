"use client";

import { useReveal } from "@/hooks/useReveal";
import { studioCapabilities } from "@/lib/studio-data";

/**
 * CapabilitiesSection — Proof strip
 *
 * Per brief: kalau belum punya deretan klien besar, jangan membuat logo wall palsu.
 * Buat proof dalam bentuk domain capability atau statistik yang benar-benar dapat dibuktikan.
 *
 * Stats:
 *   40+        Products Explored
 *   6          Business Domains
 *   End-to-End Delivery
 *   Mobile-First by Default
 */

export function CapabilitiesSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      style={{
        paddingTop: "120px",
        paddingBottom: "120px",
        background: "var(--bg)",
        borderTop: "1px solid var(--line)",
        borderBottom: "1px solid var(--line)",
      }}
    >
      <div className="container-wide">
        <div
          ref={ref}
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
            gap: "0",
          }}
        >
          {studioCapabilities.map((cap, i) => (
            <div
              key={cap.label}
              style={{
                padding: "32px 24px",
                borderLeft: i === 0 ? "none" : "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
              className="nmp-cap-card"
            >
              <span
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  letterSpacing: "-0.025em",
                  color: "var(--ink)",
                  lineHeight: 1,
                }}
              >
                {cap.metric}
              </span>
              <span
                className="studio-meta"
                style={{ color: "var(--burnt)" }}
              >
                {cap.label}
              </span>
              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.88rem",
                  color: "var(--ink-soft)",
                  lineHeight: 1.5,
                  margin: 0,
                }}
              >
                {cap.note}
              </p>
            </div>
          ))}
        </div>

        {/* Domain capability marquee */}
        <div
          style={{
            marginTop: "80px",
            paddingTop: "40px",
            borderTop: "1px solid var(--line)",
          }}
        >
          <p
            className="eyebrow"
            style={{
              marginBottom: "32px",
              justifyContent: "center",
              display: "flex",
            }}
          >
            <span style={{ opacity: 0.5 }}>///</span>
            Domains We Work Across
          </p>

          <div className="nmp-marquee">
            <div className="nmp-marquee-track">
              {[
                "Platforms",
                "Commerce",
                "Business Systems",
                "Automotive",
                "Insurance",
                "Digital Storytelling",
                "Hospitality",
                "Consumer AI",
                "Platforms",
                "Commerce",
                "Business Systems",
                "Automotive",
                "Insurance",
                "Digital Storytelling",
                "Hospitality",
                "Consumer AI",
              ].map((domain, idx) => (
                <span
                  key={`${domain}-${idx}`}
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "clamp(2rem, 4vw, 3.5rem)",
                    color: idx % 4 === 1 ? "var(--burnt)" : "var(--ink)",
                    letterSpacing: "-0.02em",
                    whiteSpace: "nowrap",
                  }}
                >
                  {domain}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          :global(.nmp-cap-card) {
            border-left: none !important;
            border-top: 1px solid var(--line) !important;
          }
          :global(.nmp-cap-card:first-child) {
            border-top: none !important;
          }
        }
        @media (max-width: 768px) {
          :global(.container-wide > div.reveal) {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
          }
          :global(.nmp-cap-card:nth-child(3)) {
            border-top: 1px solid var(--line) !important;
          }
          :global(.nmp-cap-card:nth-child(4)) {
            border-top: 1px solid var(--line) !important;
          }
        }
      `}</style>
    </section>
  );
}
