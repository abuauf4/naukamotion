/**
 * Hero V2 — typography-led, no video, no fake reel.
 *
 * V2 design principle: typography IS the hero visual.
 *
 * Composition:
 *   ┌─ Eyebrow (Fraunces italic, small) — Nauka Motion — Studio
 *   ├─ Headline (Fraunces italic, huge) — short positioning statement
 *   ├─ Sub (Instrument Sans, readable) — supporting paragraph
 *   └─ Two CTAs (typographic, not SaaS buttons)
 *
 * Server-rendered. Above-the-fold content is fully visible in the
 * prerendered HTML — no hydration required to read the headline.
 *
 * The motion is a tiny client island (HeroMotion) that:
 *   - Animates the headline letter-mask reveal ONCE on first paint
 *   - Does NOT block rendering (CSS animations with `forwards`)
 *   - Respects prefers-reduced-motion (no animation, content visible)
 *
 * Copy uses existing approved Nauka positioning from V1 (HeroSection)
 * — no new copy invented.
 */
import { HeroMotion } from "./HeroMotion";

const COPY = {
  id: {
    eyebrow: "Nauka Motion — Studio Produk Digital",
    headlineLine1: "Kami mengubah kebutuhan bisnis",
    headlineLine2: "menjadi produk digital",
    headlineAccent: "yang bekerja.",
    sub: "Studio independen yang menggabungkan desain, teknologi, dan pemecahan masalah untuk membangun website, platform, dan sistem digital di berbagai industri.",
    ctaPrimary: "Lihat Karya",
    ctaSecondary: "Mulai Proyek",
    meta: "50+ proyek · 7 kategori · sejak 2019",
  },
  en: {
    eyebrow: "Nauka Motion — Digital Product Studio",
    headlineLine1: "We turn business needs",
    headlineLine2: "into digital products",
    headlineAccent: "that work.",
    sub: "An independent studio combining design, technology, and problem-solving to build websites, platforms, and digital systems across industries.",
    ctaPrimary: "View Work",
    ctaSecondary: "Start a Project",
    meta: "50+ projects · 7 categories · since 2019",
  },
};

export function Hero({
  locale,
  projectCount,
  categoryCount,
}: {
  locale: "id" | "en";
  projectCount: number;
  categoryCount: number;
}) {
  const t = COPY[locale];
  const metaStr = locale === "en"
    ? `${projectCount}+ projects · ${categoryCount} categories`
    : `${projectCount}+ proyek · ${categoryCount} kategori`;

  return (
    <section
      className="nauka-hero"
      style={{
        // Hero is full viewport on desktop, less on mobile (avoids
        // covering content with browser chrome).
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        paddingTop: "120px",
        paddingBottom: "80px",
        position: "relative",
      }}
    >
      <div className="container-wide">
        {/* Eyebrow — Fraunces italic, small, with leading rule */}
        <p
          className="reveal"
          style={{
            fontFamily: "var(--font-fraunces), serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "clamp(0.85rem, 1.4vw, 1rem)",
            color: "var(--ink-soft)",
            margin: "0 0 32px 0",
            letterSpacing: "-0.005em",
            display: "flex",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <span
            aria-hidden="true"
            style={{
              display: "inline-block",
              width: "32px",
              height: "1px",
              background: "var(--ink-faint)",
            }}
          />
          {t.eyebrow}
        </p>

        {/* Headline — Fraunces italic, huge, mask-revealed by HeroMotion */}
        <HeroMotion>
          <h1
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(2.4rem, 9vw, 6rem)",
              lineHeight: 1.02,
              letterSpacing: "-0.035em",
              color: "var(--ink)",
              margin: "0 0 32px 0",
              maxWidth: "16ch",
            }}
          >
            <span className="nauka-hero-line">{t.headlineLine1}</span>
            <br />
            <span className="nauka-hero-line">{t.headlineLine2}</span>
            <br />
            <span
              className="nauka-hero-line"
              style={{ color: "var(--burnt)" }}
            >
              {t.headlineAccent}
            </span>
          </h1>
        </HeroMotion>

        {/* Sub paragraph */}
        <p
          className="reveal reveal-delay-1"
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontWeight: 400,
            fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
            lineHeight: 1.55,
            color: "var(--ink-soft)",
            margin: "0 0 40px 0",
            maxWidth: "44ch",
          }}
        >
          {t.sub}
        </p>

        {/* CTAs — typographic, not SaaS buttons */}
        <div
          className="reveal reveal-delay-2"
          style={{
            display: "flex",
            gap: "16px",
            flexWrap: "wrap",
            alignItems: "center",
            marginBottom: "48px",
          }}
        >
          <a
            href="/work"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: 500,
              fontSize: "0.95rem",
              color: "var(--paper)",
              background: "var(--ink)",
              textDecoration: "none",
              padding: "14px 24px",
              borderRadius: "999px",
              letterSpacing: "-0.005em",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "transform 0.2s ease",
            }}
            className="nauka-cta-primary"
          >
            {t.ctaPrimary}
            <span aria-hidden="true">→</span>
          </a>
          <a
            href="/#kontak"
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: 400,
              fontSize: "0.95rem",
              color: "var(--ink)",
              textDecoration: "none",
              padding: "14px 24px",
              border: "1px solid var(--line-strong)",
              borderRadius: "999px",
              letterSpacing: "-0.005em",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              transition: "background 0.2s ease, color 0.2s ease",
            }}
            className="nauka-cta-secondary"
          >
            {t.ctaSecondary}
          </a>
        </div>

        {/* Meta line — bottom of hero */}
        <p
          className="reveal reveal-delay-3"
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontWeight: 400,
            fontSize: "0.78rem",
            color: "var(--ink-faint)",
            margin: 0,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {metaStr}
        </p>
      </div>
    </section>
  );
}
