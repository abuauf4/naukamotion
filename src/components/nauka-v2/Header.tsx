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
import { HeaderInteractive } from "./HeaderInteractive";
import { BrandLogo } from "./BrandLogo";

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
      {/* Official lockup — transparent asset, theme-aware contrast. */}
      <BrandLogo priority />

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

