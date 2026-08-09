"use client";

import { useReveal } from "@/hooks/useReveal";
import { studioStats } from "@/lib/studio-data";

/**
 * StatsSection — angka jujur untuk homepage.
 *
 * 50+ Project & eksperimen dikembangkan
 * 10+ Project telah live
 * 6  Kategori saat ini
 *
 * Catatan wording (per instruksi):
 * 50+ mencakup prototype, eksperimen, internal product, client project,
 * dan source code/development — bukan "50 completed client projects".
 */
export function StatsSection() {
  const ref = useReveal<HTMLDivElement>();

  const stats = [
    {
      value: studioStats.projectTotal.value,
      label: studioStats.projectTotal.label.id,
    },
    {
      value: studioStats.projectLive.value,
      label: studioStats.projectLive.label.id,
    },
    {
      value: studioStats.categoryCount.value,
      label: studioStats.categoryCount.label.id,
    },
  ];

  return (
    <section
      id="stats"
      style={{
        paddingTop: "60px",
        paddingBottom: "100px",
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
            gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
            gap: "32px",
            alignItems: "start",
          }}
        >
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                borderLeft: i === 0 ? "none" : "1px solid var(--line)",
                paddingLeft: i === 0 ? 0 : "32px",
              }}
              className="nmp-stat-cell"
            >
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "clamp(3rem, 6vw, 5.5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.03em",
                  color: "var(--ink)",
                }}
              >
                {stat.value}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "0.95rem",
                  color: "var(--ink-soft)",
                  lineHeight: 1.4,
                  maxWidth: "22ch",
                }}
              >
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.nmp-stat-cell) {
            border-left: none !important;
            padding-left: 0 !important;
            border-top: 1px solid var(--line) !important;
            padding-top: 24px !important;
          }
          :global(.nmp-stat-cell:first-child) {
            border-top: none !important;
            padding-top: 0 !important;
          }
          div {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 24px !important;
          }
        }
      `}</style>
    </section>
  );
}
