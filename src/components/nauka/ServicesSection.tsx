"use client";

import { useState } from "react";
import Link from "next/link";
import { useReveal } from "@/hooks/useReveal";
import { studioServices } from "@/lib/studio-data";

/**
 * ServicesSection — 5 horizontal service modules
 *
 * Per brief:
 *   Jangan lima card kecil identik. Gunakan modul horizontal atau accordion besar.
 *
 *   01 — Product Strategy
 *   02 — Experience Design
 *   03 — Platform Engineering
 *   04 — Brand Experience
 *   05 — Growth & Content
 *
 * Setiap layanan bisa membuka: deliverables, contoh proyek, proses, hasil.
 *
 * Tagline: "AI-accelerated, human-directed."
 */

export function ServicesSection() {
  const ref = useReveal<HTMLDivElement>();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section
      id="services"
      style={{
        paddingTop: "140px",
        paddingBottom: "140px",
        background: "var(--bg)",
      }}
    >
      <div className="container-wide">
        {/* Section header */}
        <div
          ref={ref}
          className="reveal"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "40px",
            marginBottom: "80px",
            flexWrap: "wrap",
          }}
        >
          <div style={{ maxWidth: "60ch" }}>
            <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "20px" }}>
              <span style={{ opacity: 0.5 }}>///</span>
              Services — 05
            </p>
            <h2 className="studio-h2">
              What we build, and how we build it.
            </h2>
          </div>
          <p
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontStyle: "italic",
              fontSize: "1.15rem",
              color: "var(--ink-soft)",
              margin: 0,
              maxWidth: "32ch",
            }}
          >
            AI-accelerated, human-directed.
          </p>
        </div>

        {/* Service modules */}
        <div
          style={{
            borderTop: "1px solid var(--line)",
          }}
        >
          {studioServices.map((service, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={service.slug}
                style={{
                  borderBottom: "1px solid var(--line)",
                }}
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  aria-expanded={isOpen}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    cursor: "pointer",
                    padding: "32px 0",
                    display: "grid",
                    gridTemplateColumns:
                      "minmax(60px, 80px) minmax(0, 1fr) minmax(0, 1fr) 40px",
                    gap: "24px",
                    alignItems: "center",
                    textAlign: "left",
                    transition: "background 0.2s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = "var(--paper-warm)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = "transparent";
                  }}
                  className="nmp-service-row"
                >
                  <span className="nmp-index">{service.index}</span>
                  <h3
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontWeight: 500,
                      fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)",
                      letterSpacing: "-0.02em",
                      color: "var(--ink)",
                      margin: 0,
                      lineHeight: 1.1,
                    }}
                  >
                    {service.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontSize: "0.95rem",
                      color: "var(--ink-soft)",
                      margin: 0,
                      lineHeight: 1.5,
                    }}
                    className="nmp-service-tagline"
                  >
                    {service.tagline}
                  </p>
                  <span
                    style={{
                      width: "32px",
                      height: "32px",
                      display: "inline-flex",
                      alignItems: "center",
                      justifyContent: "center",
                      borderRadius: "999px",
                      border: "1px solid var(--line-strong)",
                      color: "var(--ink)",
                      transition: "transform 0.3s ease",
                      transform: isOpen ? "rotate(45deg)" : "rotate(0deg)",
                    }}
                  >
                    <svg
                      width="12"
                      height="12"
                      viewBox="0 0 12 12"
                      fill="none"
                      aria-hidden="true"
                    >
                      <path
                        d="M6 1V11M1 6H11"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </span>
                </button>

                {/* Expandable detail */}
                <div
                  style={{
                    maxHeight: isOpen ? "800px" : "0",
                    overflow: "hidden",
                    transition:
                      "max-height 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns:
                        "minmax(60px, 80px) minmax(0, 1.2fr) minmax(0, 1fr)",
                      gap: "24px",
                      padding: "8px 0 48px",
                    }}
                    className="nmp-service-detail"
                  >
                    <span />
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-body), sans-serif",
                          fontSize: "1.05rem",
                          color: "var(--ink-soft)",
                          lineHeight: 1.65,
                          margin: "0 0 32px 0",
                          maxWidth: "52ch",
                        }}
                      >
                        {service.description}
                      </p>

                      {service.sampleProjectSlug && (
                        <Link
                          href={`/work/${service.sampleProjectSlug}`}
                          className="nmp-link-arrow"
                        >
                          View sample project
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
                      )}
                    </div>

                    {/* Deliverables */}
                    <div>
                      <p
                        className="studio-meta"
                        style={{ marginBottom: "20px" }}
                      >
                        Deliverables
                      </p>
                      <ul
                        style={{
                          listStyle: "none",
                          padding: 0,
                          margin: 0,
                          display: "flex",
                          flexDirection: "column",
                          gap: "10px",
                        }}
                      >
                        {service.deliverables.map((d) => (
                          <li
                            key={d}
                            style={{
                              fontFamily: "var(--font-body), sans-serif",
                              fontSize: "0.92rem",
                              color: "var(--ink-soft)",
                              display: "flex",
                              gap: "12px",
                              alignItems: "baseline",
                            }}
                          >
                            <span
                              style={{
                                width: "6px",
                                height: "6px",
                                background: "var(--burnt)",
                                borderRadius: "999px",
                                flexShrink: 0,
                                marginTop: "6px",
                              }}
                            />
                            {d}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          :global(.nmp-service-row) {
            grid-template-columns: 60px minmax(0, 1fr) 32px !important;
          }
          :global(.nmp-service-tagline) {
            display: none !important;
          }
          :global(.nmp-service-detail) {
            grid-template-columns: 0 minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
