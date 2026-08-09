"use client";

import { useReveal } from "@/hooks/useReveal";
import { studioCapabilities } from "@/lib/studio-data";
import { useLocale, pickLocal } from "@/lib/locale-context";

const COPY = {
  id: {
    eyebrow: "Yang Kami Bangun",
    heading: "Layanan yang dapat kami",
    headingAccent: "kerjakan",
    sub: "Kategori di atas adalah industri yang pernah kami kerjakan. Di bawah ini adalah jenis deliverable yang dapat kami bangun untuk bisnis Anda.",
  },
  en: {
    eyebrow: "What We Build",
    heading: "Services we can",
    headingAccent: "deliver",
    sub: "The categories above are industries we've worked in. Below are the types of deliverables we can build for your business.",
  },
};

/**
 * CapabilitiesSection — "Yang Kami Bangun"
 *
 * Bukan kategori industri (itu di Section Kategori).
 * Capabilities = jenis deliverable yang Nauka Motion bangun:
 *   Website Development, Web Application, Business System,
 *   E-Commerce & Catalog, UI/UX & Product Design, SEO & Digital Growth.
 */
export function CapabilitiesSection() {
  const headerRef = useReveal<HTMLDivElement>();
  const { locale } = useLocale();
  const t = COPY[locale];

  return (
    <section
      id="capabilities"
      style={{
        paddingTop: "120px",
        paddingBottom: "120px",
        background: "var(--bg)",
        borderTop: "1px solid var(--line)",
      }}
    >
      <div className="container-wide">
        {/* Header */}
        <div
          ref={headerRef}
          className="reveal"
          style={{
            marginBottom: "80px",
            maxWidth: "60ch",
          }}
        >
          <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "20px" }}>
            <span style={{ opacity: 0.5 }}>///</span>
            {t.eyebrow}
          </p>
          <h2 className="studio-h2" style={{ marginBottom: "24px" }}>
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
            .
          </h2>
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontSize: "1.1rem",
              color: "var(--ink-soft)",
              lineHeight: 1.55,
              maxWidth: "48ch",
            }}
          >
            {t.sub}
          </p>
        </div>

        {/* Capabilities grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "0",
            borderTop: "1px solid var(--line)",
            borderLeft: "1px solid var(--line)",
          }}
          className="nmp-cap-grid"
        >
          {studioCapabilities.map((cap) => (
            <CapabilityCard
              key={cap.index}
              index={cap.index}
              title={cap.title}
              description={pickLocal(cap.description, locale)}
              deliverables={cap.deliverables.map((d) => pickLocal(d, locale))}
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          :global(.nmp-cap-grid) {
            grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
          }
        }
        @media (max-width: 640px) {
          :global(.nmp-cap-grid) {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}

function CapabilityCard({
  index,
  title,
  description,
  deliverables,
}: {
  index: string;
  title: string;
  description: string;
  deliverables: string[];
}) {
  const ref = useReveal<HTMLDivElement>();

  return (
    <div
      ref={ref}
      className="reveal nmp-cap-card"
      style={{
        padding: "32px clamp(24px, 3vw, 36px)",
        borderBottom: "1px solid var(--line)",
        borderRight: "1px solid var(--line)",
        display: "flex",
        flexDirection: "column",
        gap: "16px",
        transition: "background 0.25s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
        <span className="nmp-index">{index}</span>
      </div>

      <h3
        style={{
          fontFamily: "var(--font-body), sans-serif",
          fontWeight: 500,
          fontSize: "1.4rem",
          letterSpacing: "-0.015em",
          lineHeight: 1.15,
          color: "var(--ink)",
          margin: 0,
        }}
      >
        {title}
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
        {description}
      </p>

      <ul
        style={{
          listStyle: "none",
          padding: 0,
          margin: "8px 0 0 0",
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        {deliverables.map((d) => (
          <li
            key={d}
            style={{
              fontFamily: "var(--font-mono), monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.06em",
              color: "var(--ink-faint)",
              display: "flex",
              gap: "8px",
              alignItems: "baseline",
            }}
          >
            <span style={{ color: "var(--burnt)", flexShrink: 0 }}>·</span>
            {d}
          </li>
        ))}
      </ul>
    </div>
  );
}
