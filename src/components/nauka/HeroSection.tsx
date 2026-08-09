"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useReveal } from "@/hooks/useReveal";
import { useLocale, pickLocal } from "@/lib/locale-context";

const COPY = {
  id: {
    eyebrow: "Nauka Motion — Digital Product Studio",
    headline: "Kami mengubah kebutuhan bisnis menjadi produk digital yang",
    headlineAccent: "bekerja",
    sub: "Nauka Motion menggabungkan desain, teknologi, dan pemecahan masalah untuk membangun website, platform, dan sistem digital di berbagai industri.",
    ctaPrimary: "Lihat Kategori",
    ctaSecondary: "Mulai Proyek",
  },
  en: {
    eyebrow: "Nauka Motion — Digital Product Studio",
    headline: "We turn business needs into digital products that",
    headlineAccent: "work",
    sub: "Nauka Motion combines design, technology, and problem-solving to build websites, platforms, and digital systems across industries.",
    ctaPrimary: "View Categories",
    ctaSecondary: "Start a Project",
  },
};

/**
 * HeroSection — Nauka Motion Studio (v2)
 *
 * Default language: Bahasa Indonesia.
 * Positioning: "Kami mengubah keebutuhan bisnis menjadi produk digital yang bekerja."
 *
 * Layout:
 *   Eyebrow: // NAUKA MOTION — STUDIO
 *   Headline: positioning Indonesia
 *   Sub: paragraph studio
 *   CTAs: [Lihat Kategori] [Mulai Proyek]
 *   Tagline: "Small movement. Real Impact."
 */

export function HeroSection() {
  const containerRef = useReveal<HTMLDivElement>();
  const [shiftActive, setShiftActive] = useState(false);
  const { locale } = useLocale();
  const t = COPY[locale];

  useEffect(() => {
    const id = setInterval(() => {
      setShiftActive((s) => !s);
    }, 4200);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      ref={containerRef}
      style={{
        position: "relative",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "120px",
        paddingBottom: "80px",
        overflow: "hidden",
      }}
    >
      {/* Ambient background grid */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          pointerEvents: "none",
          opacity: 0.5,
          backgroundImage:
            "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse at 50% 50%, #000 0%, transparent 75%)",
          WebkitMaskImage:
            "radial-gradient(ellipse at 50% 50%, #000 0%, transparent 75%)",
        }}
      />

      {/* Floating accent dot — small movement → big change */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "32%",
          left: shiftActive ? "calc(50% + 8px)" : "50%",
          width: "8px",
          height: "8px",
          background: "var(--burnt)",
          borderRadius: "999px",
          transition: "left 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
          opacity: 0.8,
        }}
      />

      <div className="container-wide" style={{ position: "relative", zIndex: 1 }}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.3fr) minmax(0, 1fr)",
            gap: "60px",
            alignItems: "center",
          }}
          className="nmp-hero-grid"
        >
          {/* Left: copy block */}
          <div>
            {/* Eyebrow */}
            <div
              className="reveal"
              style={{
                marginBottom: "32px",
                display: "inline-flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.72rem",
                  letterSpacing: "0.18em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  color: "var(--burnt)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                <span style={{ opacity: 0.5 }}>//</span>
                {t.eyebrow}
              </span>
            </div>

            {/* Headline — ID positioning */}
            <h1
              className="reveal reveal-delay-1"
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2.4rem, 6vw, 5rem)",
                lineHeight: 1.04,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                margin: 0,
                maxWidth: "18ch",
              }}
            >
              {t.headline}{" "}
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--burnt)",
                }}
              >
                {t.headlineAccent}
              </span>
              .
            </h1>

            {/* Sub */}
            <p
              className="reveal reveal-delay-2"
              style={{
                marginTop: "32px",
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "clamp(1.02rem, 1.25vw, 1.18rem)",
                color: "var(--ink-soft)",
                lineHeight: 1.55,
                maxWidth: "52ch",
              }}
            >
              {t.sub}
            </p>

            {/* CTAs */}
            <div
              className="reveal reveal-delay-3"
              style={{
                marginTop: "44px",
                display: "flex",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <Link href="/#kategori" className="nmp-btn nmp-btn-primary">
                {t.ctaPrimary}
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M2 10L10 2M10 2H4M10 2V8"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <Link href="/#contact" className="nmp-btn nmp-btn-ghost">
                {t.ctaSecondary}
              </Link>
            </div>

            {/* Tagline */}
            <div
              className="reveal reveal-delay-4"
              style={{
                marginTop: "64px",
                display: "flex",
                alignItems: "center",
                gap: "16px",
              }}
            >
              <span style={{ width: "40px", height: "1px", background: "var(--ink-soft)" }} />
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "1.15rem",
                  color: "var(--ink)",
                  letterSpacing: "-0.005em",
                }}
              >
                Small movement. Real Impact.
              </span>
            </div>
          </div>

          {/* Right: Studio reel */}
          <div
            className="reveal reveal-delay-2 nmp-hero-reel"
            style={{
              position: "relative",
              aspectRatio: "4 / 5",
              background: "var(--bg-card)",
              border: "1px solid var(--line)",
              borderRadius: "8px",
              overflow: "hidden",
              display: "flex",
              flexDirection: "column",
            }}
          >
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
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.66rem",
                  letterSpacing: "0.15em",
                  textTransform: "uppercase",
                  color: "var(--ink-soft)",
                }}
              >
                Studio Reel
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.66rem",
                  color: "var(--burnt)",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "6px",
                }}
              >
                <span
                  style={{
                    width: "6px",
                    height: "6px",
                    background: "var(--burnt)",
                    borderRadius: "999px",
                    animation: "nmp-blink 1.4s step-end infinite",
                  }}
                />
                PLAYING
              </span>
            </div>

            <div
              style={{
                position: "relative",
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                background:
                  "linear-gradient(135deg, var(--bg-soft) 0%, var(--bg-card) 100%)",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage:
                    "linear-gradient(var(--line) 1px, transparent 1px), linear-gradient(90deg, var(--line) 1px, transparent 1px)",
                  backgroundSize: "32px 32px",
                  transform: shiftActive ? "translate(8px, 8px)" : "translate(0, 0)",
                  transition: "transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
                  opacity: 0.6,
                }}
              />
              <div
                style={{
                  position: "relative",
                  width: "120px",
                  height: "120px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-fraunces), serif",
                    fontStyle: "italic",
                    fontWeight: 400,
                    fontSize: "8rem",
                    color: "var(--ink)",
                    opacity: shiftActive ? 1 : 0.85,
                    transform: shiftActive
                      ? "translateX(4px) scale(1.02)"
                      : "translateX(0) scale(1)",
                    transition:
                      "opacity 1.2s ease, transform 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
                    lineHeight: 1,
                  }}
                >
                  N
                </span>
                <span
                  style={{
                    position: "absolute",
                    bottom: "-12px",
                    right: "-32px",
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.66rem",
                    color: "var(--burnt)",
                    letterSpacing: "0.12em",
                  }}
                >
                  motion
                </span>
              </div>
            </div>

            <div
              style={{
                padding: "12px 20px",
                borderTop: "1px solid var(--line)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.66rem",
                  color: "var(--ink-soft)",
                }}
              >
                00:08 / 00:12
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono), monospace",
                  fontSize: "0.66rem",
                  color: "var(--ink-faint)",
                }}
              >
                Showreel 2025
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="reveal reveal-delay-5"
        style={{
          position: "absolute",
          bottom: "32px",
          left: "clamp(20px, 5vw, 80px)",
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.7rem",
          color: "var(--ink-faint)",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
        }}
      >
        <span
          style={{
            width: "32px",
            height: "1px",
            background: "var(--ink-faint)",
            animation: "nmp-shift 2.5s ease-in-out infinite",
            transformOrigin: "left center",
          }}
        />
        Scroll to explore
      </div>

      <style jsx>{`
        @media (max-width: 1024px) {
          :global(.nmp-hero-reel) {
            display: none !important;
          }
          :global(.nmp-hero-grid) {
            grid-template-columns: minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
