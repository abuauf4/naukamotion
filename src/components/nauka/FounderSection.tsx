"use client";

import { useReveal } from "@/hooks/useReveal";
import { useLocale } from "@/lib/locale-context";

const COPY = {
  id: {
    eyebrow: "Tentang Nauka Motion",
    heading: "Didirikan dan dipimpin oleh",
    headingAccent: "Abu Aufa",
    p1: "Seorang web developer dan digital strategist yang berbasis di Jakarta, bekerja di lintas industri — otomotif, retail teknologi, asuransi, brand konsumen, pariwisata, serta produk internal Nauka Labs.",
    p2: "Nauka Motion bekerja dengan tim inti kecil yang dapat diperluas sesuai kebutuhan project — designer, engineer, dan kolaborator dibawa masuk berdasarkan apa yang benar-benar dibutuhkan setiap project.",
    tagline: "Small movement. Real Impact.",
    taglineDesc: "Filosofi kerja Nauka Motion — pergerakan kecil yang tepat sasaran menciptakan perubahan yang lebih bermakna dibandingkan perubahan besar yang tidak terarah.",
    founderLabel: "Founder — Abu Aufa",
  },
  en: {
    eyebrow: "About Nauka Motion",
    heading: "Founded and directed by",
    headingAccent: "Abu Aufa",
    p1: "A web developer and digital strategist based in Jakarta, working across industries — automotive, retail technology, insurance, consumer brands, tourism, and Nauka Labs internal products.",
    p2: "Nauka Motion works with a small core team that scales per project — designers, engineers, and collaborators brought in based on what each project actually needs.",
    tagline: "Small movement. Real Impact.",
    taglineDesc: "Nauka Motion's working philosophy — small, well-targeted movement creates more meaningful change than large but aimless change.",
    founderLabel: "Founder — Abu Aufa",
  },
};

/**
 * FounderSection — "Tentang Nauka Motion"
 *
 * Founder: Abu Aufa. Bahasa Indonesia.
 * Hanya fakta yang dapat diverifikasi. Tanpa klaim berlebihan.
 */
export function FounderSection() {
  const ref = useReveal<HTMLDivElement>();
  const { locale } = useLocale();
  const t = COPY[locale];

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
              {t.eyebrow}
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
              {t.heading}{" "}
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--burnt)",
                }}
              >
                {t.headingAccent}
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
              {t.p1}
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
              {t.p2}
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
                {t.tagline}
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
                {t.taglineDesc}
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
