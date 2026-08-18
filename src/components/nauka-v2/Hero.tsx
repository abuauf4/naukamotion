/**
 * Hero V2.1 — typographic poster composition.
 *
 * Redesign rules applied:
 *   - REMOVE information: no eyebrow, no paragraph, no stats, no dual CTA pills.
 *     Above-the-fold contains only: wordmark (in header) + ONE dominant
 *     typographic statement + one tiny editorial accent + one subtle CTA.
 *   - TYPOGRAPHIC CONTRAST: NAUKA/MOTION in bold grotesk (Instrument Sans 500,
 *     massive scale, tight tracking). Editorial serif italic (Fraunces) used
 *     sparingly for the tiny accent only.
 *   - HERO AS COMPOSITION: asymmetric layout, extreme type scale, grid tension,
 *     tiny metadata contrasted with huge display type. No cards, no pill cluster.
 *   - OPENING TRANSFORMS INTO HERO: the entrance animation IS the opening. Letters
 *     appear in sequence and settle directly into their final hero positions.
 *     No separate overlay, no fade-out-then-new-hero.
 *   - ONE CTA: "View Work ↘" / "Lihat Karya ↘" as a text link, not a pill button.
 *
 * Server-rendered. The entrance animation is pure CSS keyframes —
 * HeroMotion (client island) only sets the sessionStorage flag so
 * internal navigation skips the animation on subsequent visits.
 *
 * Reduced-motion: CSS disables all entrance animations, content
 * visible immediately.
 */
import { HeroMotion } from "./HeroMotion";

const COPY = {
  id: {
    accent: "Studio digital independen — desain, teknologi, pemecahan masalah.",
    cta: "Lihat Karya",
  },
  en: {
    accent: "Independent digital studio — design, technology, problem-solving.",
    cta: "View Work",
  },
};

export function Hero({
  locale,
}: {
  locale: "id" | "en";
}) {
  const t = COPY[locale];

  return (
    <HeroMotion>
      <section
        className="nauka-hero"
        style={{
          // Full viewport height — hero IS the first impression.
          // 100svh uses the small viewport height (mobile-safe).
          minHeight: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          // Push content down slightly below the fixed header.
          paddingTop: "120px",
          paddingBottom: "80px",
          position: "relative",
        }}
      >
        <div className="container-wide">
          {/* Massive display — NAUKA / MOTION.
              This IS the hero visual. No image, no video. */}

          {/* NAUKA — left-aligned, massive grotesk */}
          <h1
            className="nauka-hero-display"
            aria-label="Nauka Motion"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: 500,
              fontSize: "clamp(3.5rem, 17vw, 13rem)",
              lineHeight: 0.88,
              letterSpacing: "-0.045em",
              color: "var(--ink)",
              margin: 0,
            }}
          >
            <span className="nauka-hero-word nauka-hero-word-nauka">
              {"NAUKA".split("").map((ch, i) => (
                <span
                  key={i}
                  className="nauka-hero-letter"
                  style={{ ["--letter-i" as string]: i } as React.CSSProperties}
                >
                  {ch}
                </span>
              ))}
            </span>
            <br />
            <span
              className="nauka-hero-word nauka-hero-word-motion"
              // Slight horizontal offset on desktop for compositional asymmetry.
              // On mobile, zero offset — bold stacked type.
              style={{ display: "inline-block" }}
            >
              {"MOTION".split("").map((ch, i) => (
                <span
                  key={i}
                  className="nauka-hero-letter"
                  style={{ ["--letter-i" as string]: i } as React.CSSProperties}
                >
                  {ch}
                </span>
              ))}
            </span>
          </h1>

          {/* Tiny editorial serif italic accent — positioned asymmetrically.
              On desktop: pushed to the right side, creating tension with the
              left-aligned massive type. On mobile: left-aligned, small. */}
          <p
            className="nauka-hero-accent"
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(0.85rem, 1.3vw, 1rem)",
              lineHeight: 1.45,
              color: "var(--ink-soft)",
              margin: "32px 0 0 0",
              maxWidth: "34ch",
              // Desktop: right-aligned for compositional tension.
              // Mobile: left-aligned (overridden in media query below).
              marginLeft: "auto",
              textAlign: "right",
            }}
          >
            {t.accent}
          </p>

          {/* Single text CTA — no pill, no border, just typography + arrow.
              Positioned at the bottom-left of the hero. */}
          <div className="nauka-hero-bottomline">
            <a
              href="/work"
              className="nauka-hero-cta"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: "0.85rem",
                color: "var(--ink)",
                textDecoration: "none",
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                marginTop: "48px",
              }}
            >
              {t.cta}
              <span aria-hidden="true" className="nauka-hero-cta-arrow">↘</span>
            </a>
            <span className="nauka-hero-coordinate">06°12&apos;S / 106°49&apos;E</span>
            <span className="nauka-hero-scroll">Scroll to explore <span aria-hidden="true">↓</span></span>
          </div>
        </div>
        <div className="nauka-hero-side-note" aria-hidden="true">Independent digital studio · 2026</div>
      </section>
    </HeroMotion>
  );
}
