"use client";

import { useReveal } from "@/hooks/useReveal";

/**
 * StudioManifestSection — Studio manifesto + motion principle visual
 *
 * "Small movement. Real Impact."
 *
 * Manifesto:
 *   "Kami percaya produk besar tidak selalu dimulai dari langkah besar.
 *    Ia dimulai dari keputusan kecil yang tepat — struktur yang lebih jelas,
 *    alur yang lebih sederhana, dan pengalaman yang lebih manusiawi."
 *
 * Motion principle visual:
 *   - One dot moves → grid forms
 *   - One line shifts 8px → whole composition changes
 *   - Monogram N forms from two simple movements
 */

export function StudioManifestSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="studio"
      style={{
        paddingTop: "140px",
        paddingBottom: "140px",
        background: "var(--paper-warm)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div className="container-wide">
        <div
          ref={ref}
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
            gap: "80px",
            alignItems: "center",
          }}
        >
          {/* Left: Manifesto copy */}
          <div>
            <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "32px" }}>
              <span style={{ opacity: 0.5 }}>///</span>
              Studio Manifesto
            </p>

            <h2
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2rem, 4.5vw, 3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                margin: 0,
                marginBottom: "40px",
              }}
            >
              Small movement.
              <br />
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--burnt)",
                }}
              >
                Real Impact.
              </span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontSize: "clamp(1.15rem, 1.6vw, 1.5rem)",
                lineHeight: 1.5,
                color: "var(--ink)",
                margin: 0,
                marginBottom: "24px",
                maxWidth: "42ch",
                fontStyle: "italic",
                fontWeight: 400,
              }}
            >
              Kami percaya produk besar tidak selalu dimulai dari langkah besar.
            </p>

            <p
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.65,
                color: "var(--ink-soft)",
                margin: 0,
                maxWidth: "44ch",
              }}
            >
              Ia dimulai dari keputusan kecil yang tepat — struktur yang lebih
              jelas, alur yang lebih sederhana, dan pengalaman yang lebih
              manusiawi. Setiap proyek yang kami ambil dimulai dari pertanyaan
              kecil yang biasa orang lewati: apa sebenarnya yang sedang
              dibangun, dan untuk siapa.
            </p>

            <p
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "1.05rem",
                lineHeight: 1.65,
                color: "var(--ink-soft)",
                margin: "24px 0 0 0",
                maxWidth: "44ch",
              }}
            >
              Kami bukan studio yang mengejar proyek besar. Kami studio yang
              membuat proyek kecil terasa tepat — dan biarkan ke tepatannya
              yang membawa dampak.
            </p>
          </div>

          {/* Right: Motion principle visual */}
          <div
            style={{
              position: "relative",
              aspectRatio: "1 / 1",
              background: "var(--bg-card)",
              border: "1px solid var(--line)",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: "16px 20px",
                borderBottom: "1px solid var(--line)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                className="studio-meta"
                style={{ margin: 0 }}
              >
                Motion Principle
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.66rem",
                  color: "var(--burnt)",
                }}
              >
                NMP-01
              </span>
            </div>

            {/* Visual area — animated grid + N monogram forming */}
            <div
              style={{
                position: "relative",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, var(--bg-soft) 0%, var(--bg-card) 100%)",
                overflow: "hidden",
              }}
            >
              {/* Background grid */}
              <div
                aria-hidden="true"
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                  backgroundSize: "40px 40px",
                  opacity: 0.5,
                  animation: "nmp-grid-pulse 4s ease-in-out infinite",
                }}
              />

              {/* Animated lines forming N */}
              <svg
                width="60%"
                height="60%"
                viewBox="0 0 200 200"
                fill="none"
                style={{ position: "relative", zIndex: 1 }}
                aria-hidden="true"
              >
                {/* Vertical left line */}
                <line
                  x1="40"
                  y1="40"
                  x2="40"
                  y2="160"
                  stroke="var(--ink)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 120,
                    strokeDashoffset: 0,
                    animation: "nmp-line-grow 1.4s ease-out 0.2s both",
                    transformOrigin: "top",
                  }}
                />
                {/* Vertical right line */}
                <line
                  x1="160"
                  y1="40"
                  x2="160"
                  y2="160"
                  stroke="var(--ink)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 120,
                    strokeDashoffset: 0,
                    animation: "nmp-line-grow 1.4s ease-out 0.5s both",
                    transformOrigin: "top",
                  }}
                />
                {/* Diagonal line */}
                <line
                  x1="40"
                  y1="160"
                  x2="160"
                  y2="40"
                  stroke="var(--burnt)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  style={{
                    strokeDasharray: 170,
                    strokeDashoffset: 0,
                    animation: "nmp-line-grow 1.4s ease-out 0.9s both",
                    transformOrigin: "top left",
                  }}
                />
                {/* Endpoint dot */}
                <circle
                  cx="40"
                  cy="160"
                  r="6"
                  fill="var(--burnt)"
                  style={{
                    opacity: 0,
                    animation: "nmp-fade-in 0.6s ease-out 2.3s both",
                  }}
                />
              </svg>

              {/* Caption */}
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  right: "20px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-end",
                  gap: "16px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "0.85rem",
                    color: "var(--ink-soft)",
                    margin: 0,
                    maxWidth: "32ch",
                    lineHeight: 1.4,
                  }}
                >
                  One line shifts 8 pixels — the whole composition changes.
                </p>
                <span
                  className="studio-meta"
                  style={{ margin: 0, color: "var(--ink-faint)" }}
                >
                  2025
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          :global(.container-wide > div.reveal) {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
