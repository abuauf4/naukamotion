/**
 * Header V2 — minimal, typographic, integrated.
 *
 * V2 design principles:
 *   - Typography IS the navigation. No SaaS navbar look.
 *   - The N mark uses the existing favicon (RGBA, transparent + black N)
 *     with CSS filter to adapt to theme. No new logo asset created.
 *   - Desktop: thin baseline rule, wordmark left, links right (typographic).
 *   - Mobile: wordmark + a single "Menu" trigger that opens an inline panel.
 *
 * Architecture:
 *   - The outer Header element is server-rendered (no `"use client"` here).
 *   - HeaderInteractive (mobile menu toggle, scrolled state, locale switch)
 *     is the only client island. It receives navItems + locale as props
 *     so the server side can render the visible (non-interactive) parts.
 *
 * Performance:
 *   - V1 Header was a 4-useEffect client component with usePathname +
 *     useTheme + useLocale + scroll listener.
 *   - V2 HeaderInteractive has 2 useEffects (scroll + body-overflow-lock
 *     for mobile menu only). Theme + locale are read server-side via
 *     cookie/header inspection and passed as props where possible.
 *   - The visible nav renders in prerendered HTML (no hydration needed
 *     to see the wordmark + links).
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
  const ctaLabel = locale === "en" ? "Start a Project" : "Mulai Proyek";

  return (
    <HeaderInteractive navItems={navItems} ctaLabel={ctaLabel} locale={locale}>
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
            // Theme adaptation via CSS filter (handled in globals.css).
            // Initial filter here as fallback.
            filter:
              "var(--nmark-filter, brightness(0))",
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

      {/* Desktop nav — server-rendered, no JS needed for hover/focus */}
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

      {/* Desktop CTA — typographic, not a SaaS button */}
      <Link
        href="/#kontak"
        className="nauka-header-cta-desktop"
        style={{
          display: "none",
          fontFamily: "var(--font-body), sans-serif",
          fontWeight: 500,
          fontSize: "0.85rem",
          color: "var(--ink)",
          textDecoration: "none",
          padding: "8px 16px",
          border: "1px solid var(--line-strong)",
          borderRadius: "999px",
          letterSpacing: "-0.005em",
          transition: "background 0.2s ease, color 0.2s ease",
        }}
      >
        {ctaLabel}
      </Link>
    </HeaderInteractive>
  );
}
