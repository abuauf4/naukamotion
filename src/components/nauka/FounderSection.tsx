"use client";

import { useReveal } from "@/hooks/useReveal";

/**
 * FounderSection — Abu Aufa as founder, not brand
 *
 * Per brief: Baru di sini nama lu tampil.
 *   Founded and directed by Abu Aufa
 *   Product strategist, systems architect, and creative director working across
 *   technology, commerce, automotive, insurance, and storytelling.
 *
 * Collaborator line:
 *   Independent by structure. Collaborative by nature.
 */

export function FounderSection() {
  const ref = useReveal<HTMLDivElement>();

  return (
    <section
      style={{
        paddingTop: "140px",
        paddingBottom: "140px",
        background: "var(--paper-warm)",
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
          >
            {/* Portrait placeholder — typographic, not photographic */}
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
                Portrait — to be commissioned
              </span>
            </div>
          </div>

          {/* Right: Founder copy */}
          <div>
            <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "24px" }}>
              <span style={{ opacity: 0.5 }}>///</span>
              Founder & Director
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
              Founded and directed by
              <br />
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
              Product strategist, systems architect, and creative director
              working across technology, commerce, automotive, insurance, and
              storytelling.
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
              The studio operates with a small core team that scales per
              engagement — designers, engineers, and collaborators brought in
              based on what each project actually needs. Not a 30-person agency
              billing overhead, not a single freelancer wearing every hat.
            </p>

            {/* Collaborator line */}
            <div
              style={{
                marginTop: "48px",
                paddingTop: "32px",
                borderTop: "1px solid var(--line)",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
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
                Independent by structure.
                <br />
                Collaborative by nature.
              </p>
              <p
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.92rem",
                  color: "var(--ink-soft)",
                  margin: 0,
                  maxWidth: "44ch",
                }}
              >
                The studio takes on a small number of engagements per quarter.
                Each engagement gets the founder's direct involvement from
                discovery to delivery — not a project manager reading a brief.
              </p>
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
