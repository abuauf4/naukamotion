/**
 * Footer V2 — server component, typography-led.
 *
 * V2 design principle: footer as a quiet closing statement, not a SaaS
 * link-farm. Three things only:
 *   - Wordmark (typographic, no bitmap)
 *   - One sentence of studio positioning
 *   - Essential links (Work / Studio / Contact / Email)
 *
 * No social icons, no newsletter form, no logo grid.
 * Existing approved Nauka positioning is reused.
 */
import Link from "next/link";
import { BrandLogo } from "./BrandLogo";

export function Footer({
  locale,
}: {
  locale: "id" | "en";
}) {
  const t = {
    id: {
      positioning: "Studio produk digital independen. Desain, teknologi, dan pemecahan masalah untuk website, platform, dan sistem.",
      email: "halo@nauka.id",
      nav: [
        { label: "Karya", href: "/work" },
        { label: "Studio", href: "/#studio" },
        { label: "Kontak", href: "/#kontak" },
      ],
      copyright: `© ${new Date().getFullYear()} Nauka Motion`,
    },
    en: {
      positioning: "Independent digital product studio. Design, technology, and problem-solving for websites, platforms, and systems.",
      email: "hello@nauka.id",
      nav: [
        { label: "Work", href: "/work" },
        { label: "Studio", href: "/#studio" },
        { label: "Contact", href: "/#kontak" },
      ],
      copyright: `© ${new Date().getFullYear()} Nauka Motion`,
    },
  }[locale];

  return (
    <footer
      style={{
        borderTop: "1px solid var(--line)",
        paddingTop: "80px",
        paddingBottom: "48px",
      }}
    >
      <div className="container-wide">
        {/* Top — wordmark + positioning */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "32px",
            marginBottom: "64px",
          }}
        >
          <BrandLogo className="nauka-footer-logo" />
          <p
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: 400,
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              lineHeight: 1.55,
              color: "var(--ink-soft)",
              margin: 0,
              maxWidth: "48ch",
            }}
          >
            {t.positioning}
          </p>
        </div>

        {/* Bottom — links + email */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            gap: "32px",
            flexWrap: "wrap",
            paddingTop: "32px",
            borderTop: "1px solid var(--line)",
          }}
        >
          <nav
            style={{
              display: "flex",
              gap: "24px",
              flexWrap: "wrap",
            }}
          >
            {t.nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontWeight: 400,
                  fontSize: "0.85rem",
                  color: "var(--ink-soft)",
                  textDecoration: "none",
                  letterSpacing: "-0.005em",
                }}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <a
            href={`mailto:${t.email}`}
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "clamp(1.1rem, 2vw, 1.4rem)",
              color: "var(--ink)",
              textDecoration: "none",
              letterSpacing: "-0.01em",
            }}
          >
            {t.email}
          </a>
        </div>

        <p
          style={{
            fontFamily: "var(--font-body), sans-serif",
            fontWeight: 400,
            fontSize: "0.72rem",
            color: "var(--ink-faint)",
            margin: "32px 0 0 0",
            letterSpacing: "0.04em",
            textTransform: "uppercase",
          }}
        >
          {t.copyright}
        </p>
      </div>
    </footer>
  );
}
