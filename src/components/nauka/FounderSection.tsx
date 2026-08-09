"use client";

import { useReveal } from "@/hooks/useReveal";

/**
 * FounderSection — "Tentang Nauka Motion"
 *
 * Founder: Abu Aufa. Bahasa Indonesia.
 * Hanya fakta yang dapat diverifikasi. Tanpa klaim berlebihan.
 */
export function FounderSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      id="studio"
      style={{
        paddingTop: "120px",
        paddingBottom: "120px",
        background: "var(--bg)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="container-wide">
        <div
          ref={ref}
          className="reveal"
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
            gap: "60px",
            alignItems: "center",
          }}
        >
          {/* Left: Portrait placeholder */}
          <div
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              background: "var(--bg-card)",
              border: "1px solid var(--line)",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
            className="nmp-founder-portrait"
          >
            <div
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage:
                  "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                backgroundSize: "32px 32px",
                opacity: 0.4,
              }}
            />
            <div
              style={{
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "8rem",
                  color: "var(--ink)",
                  lineHeight: 1,
                }}
              >
                A
              </span>
              <span
                className="studio-meta"
                style={{ color: "var(--ink-faint)" }}
              >
                Founder — Abu Aufa
              </span>
            </div>
          </div>

          {/* Right: Copy */}
          <div>
            <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "24px" }}>
              <span style={{ opacity: 0.5 }}>///</span>
              Tentang Nauka Motion
            </p>

            <h2
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                lineHeight: 1.1,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
                margin: 0,
                marginBottom: "8px",
              }}
            >
              Didirikan dan dipimpin oleh{" "}
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--burnt)",
                }}
              >
                Abu Aufa
              </span>
            </h2>

            <p
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "1.1rem",
                color: "var(--ink-soft)",
                lineHeight: 1.55,
                margin: "32px 0 0 0",
                maxWidth: "48ch",
              }}
            >
              Seorang web developer dan digital strategist yang berbasis di
              Jakarta, bekerja di lintas industri — otomotif, retail teknologi,
              asuransi, brand konsumen, pariwisata, serta produk internal Nauka
              Labs.
            </p>

            <p
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "1rem",
                color: "var(--ink-soft)",
                lineHeight: 1.65,
                margin: "24px 0 0 0",
                maxWidth: "48ch",
              }}
            >
              Nauka Motion bekerja dengan tim inti kecil yang dapat diperluas
              sesuai kebutuhan project — designer, engineer, dan kolaborator
              dibawa masuk berdasarkan apa yang benar-benar dibutuhkan setiap
              project.
            </p>

            {/* Tagline */}
            <div
              style={{
                marginTop: "48px",
                paddingTop: "32px",
                borderTop: "1px solid var(--line)",
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "1.4rem",
                  color: "var(--ink)",
                  margin: 0,
                  letterSpacing: "-0.01em",
                }}
              >
                Small movement. Real Impact.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.92rem",
                  color: "var(--ink-soft)",
                  margin: "12px 0 0 0",
                  maxWidth: "44ch",
                }}
              >
                Filosofi kerja Nauka Motion — pergerakan kecil yang tepat
                sasaran menciptakan perubahan yang lebih bermakna dibandingkan
                perubahan besar yang tidak terarah.
              </p>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          :global(.nmp-founder-portrait) {
            display: none !important;
          }
          :global(.container-wide > div.reveal) {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 40px !important;
          }
        }
      `}</style>
    </section>
  );
}
