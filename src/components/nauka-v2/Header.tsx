/**
 * Header V2.1 — minimal, typographic, integrated.
 *
 * Redesign rule applied: REMOVE dual CTA pills from above-the-fold.
 * Header now contains only: N mark + wordmark (left) + nav links (right).
 * The single CTA ("View Work ↘") lives in the hero, not the header.
 *
 * V2 design principles (kept from V2.0):
 *   - Typography IS the navigation. No SaaS navbar look.
 *   - The N mark uses the existing favicon (RGBA, transparent + black N)
 *     with CSS filter to adapt to theme. No new logo asset created.
 *   - Desktop: thin baseline rule, wordmark left, links right (typographic).
 *   - Mobile: wordmark + a single "Menu" trigger that opens an inline panel.
 *
 * Architecture:
 *   - The outer Header element is server-rendered.
 *   - HeaderInteractive (mobile menu toggle, scrolled state, locale switch)
 *     is the only client island.
 */
import Link from "next/link";
import Image from "next/image";
import { HeaderInteractive } from "./HeaderInteractive";

const NAV = {
  id: [
    { label: "Karya", href: "/work" },
    { label: "Studio", href: "/#studio" },
    { label: "Kontak", href: "/#kontak" },
  ],
  en: [
    { label: "Work", href: "/work" },
    { label: "Studio", href: "/#studio" },
    { label: "Contact", href: "/#kontak" },
  ],
};

export function Header({
  locale,
}: {
  locale: "id" | "en";
}) {
  const navItems = NAV[locale];

  return (
    <HeaderInteractive navItems={navItems} locale={locale}>
      {/* Wordmark — server-rendered, visible before hydration */}
      <Link
        href="/"
        aria-label="Nauka Motion — home"
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "10px",
          textDecoration: "none",
          color: "var(--ink)",
        }}
      >
        {/* N mark — uses existing favicon (RGBA transparent + black N).
            CSS filter adapts to theme. NOT a new logo asset. */}
        <Image
          src="/logo-favicon.webp"
          alt=""
          width={28}
          height={28}
          priority
          className="nauka-nmark"
          style={{
            display: "block",
            width: 22,
            height: 22,
            filter: "var(--nmark-filter, brightness(0))",
          }}
        />
        <span
          style={{
            fontFamily: "var(--font-fraunces), serif",
            fontStyle: "italic",
            fontWeight: 400,
            fontSize: "1.1rem",
            letterSpacing: "-0.02em",
            lineHeight: 1,
          }}
        >
          Nauka Motion
        </span>
      </Link>

      {/* Desktop nav — server-rendered, no JS needed */}
      <nav
        className="nauka-header-nav-desktop"
        style={{
          display: "none",
          alignItems: "center",
          gap: "32px",
        }}
      >
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: 400,
              fontSize: "0.9rem",
              color: "var(--ink-soft)",
              textDecoration: "none",
              letterSpacing: "-0.005em",
              transition: "color 0.2s ease",
            }}
            className="nauka-nav-link"
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </HeaderInteractive>
  );
}

