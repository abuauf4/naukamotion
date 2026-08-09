"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "@/hooks/useTheme";

/**
 * Header — Nauka Motion Studio
 *
 * Brand: NAUKA MOTION (primary)
 * Nav: Work / Services / Studio / Insights / Contact
 * CTA: Start a Project
 *
 * Mobile: wordmark + hamburger
 */

const navItems = [
  { label: "Kategori", href: "/#kategori" },
  { label: "Layanan", href: "/#capabilities" },
  { label: "Proses", href: "/#process" },
  { label: "Studio", href: "/#studio" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { theme, toggle, mounted } = useTheme();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 24);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: "background 0.3s ease, border-color 0.3s ease",
        background: scrolled
          ? "color-mix(in srgb, var(--bg) 88%, transparent)"
          : "transparent",
        backdropFilter: scrolled ? "blur(12px)" : "none",
        borderBottom: scrolled
          ? "1px solid var(--line)"
          : "1px solid transparent",
      }}
    >
      <div
        className="container-wide"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: "24px",
          paddingTop: "18px",
          paddingBottom: "18px",
        }}
      >
        {/* Wordmark */}
        <Link
          href="/"
          aria-label="Nauka Motion — home"
          style={{
            display: "inline-flex",
            alignItems: "baseline",
            gap: "6px",
            textDecoration: "none",
            color: "var(--ink)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: 600,
              fontSize: "1.05rem",
              letterSpacing: "0.02em",
            }}
          >
            NAUKA
          </span>
          <span
            style={{
              fontFamily: "var(--font-fraunces), serif",
              fontStyle: "italic",
              fontWeight: 400,
              fontSize: "1.05rem",
              color: "var(--burnt)",
            }}
          >
            motion
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          aria-label="Primary Navigation"
          style={{
            display: "flex",
            alignItems: "center",
            gap: "32px",
          }}
          className="nmp-desktop-nav"
        >
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "0.88rem",
                fontWeight: 500,
                color: "var(--ink-soft)",
                textDecoration: "none",
                transition: "color 0.2s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "var(--ink)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "var(--ink-soft)";
              }}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        {/* CTA + actions */}
        <div
          style={{ display: "flex", alignItems: "center", gap: "12px" }}
          className="nmp-header-actions"
        >
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            style={{
              width: "36px",
              height: "36px",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: "999px",
              background: "transparent",
              border: "1px solid var(--line-strong)",
              cursor: "pointer",
              color: "var(--ink)",
              transition: "border-color 0.2s ease, background 0.2s ease",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--ink)";
              e.currentTarget.style.background = "var(--bg-soft)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = "var(--line-strong)";
              e.currentTarget.style.background = "transparent";
            }}
          >
            {mounted && theme === "dark" ? (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <circle cx="12" cy="12" r="4" />
                <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41" />
              </svg>
            ) : (
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            )}
          </button>

          <Link href="/#contact" className="nmp-btn nmp-btn-primary nmp-header-cta">
            Mulai Proyek
            <svg
              width="11"
              height="11"
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

          <button
            className="nmp-mobile-toggle"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            style={{
              display: "none",
              width: "36px",
              height: "36px",
              background: "transparent",
              border: "1px solid var(--line-strong)",
              borderRadius: "999px",
              cursor: "pointer",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "4px",
              padding: 0,
            }}
          >
            <span
              style={{
                width: "14px",
                height: "1.5px",
                background: "var(--ink)",
                transition: "transform 0.25s ease, opacity 0.25s ease",
                transform: mobileOpen
                  ? "translateY(5.5px) rotate(45deg)"
                  : "none",
              }}
            />
            <span
              style={{
                width: "14px",
                height: "1.5px",
                background: "var(--ink)",
                opacity: mobileOpen ? 0 : 1,
                transition: "opacity 0.25s ease",
              }}
            />
            <span
              style={{
                width: "14px",
                height: "1.5px",
                background: "var(--ink)",
                transition: "transform 0.25s ease, opacity 0.25s ease",
                transform: mobileOpen
                  ? "translateY(-5.5px) rotate(-45deg)"
                  : "none",
              }}
            />
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      {mobileOpen && (
        <nav
          aria-label="Mobile Navigation"
          style={{
            borderTop: "1px solid var(--line)",
            background: "var(--bg)",
            padding: "24px 0",
          }}
        >
          <div className="container-wide" style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
            {[...navItems, { label: "Kontak", href: "/#contact" }].map((item, i) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontSize: "1.6rem",
                  fontWeight: 500,
                  letterSpacing: "-0.01em",
                  color: "var(--ink)",
                  textDecoration: "none",
                  display: "flex",
                  alignItems: "baseline",
                  gap: "12px",
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.7rem",
                    color: "var(--burnt)",
                    letterSpacing: "0.15em",
                  }}
                >
                  0{i + 1}
                </span>
                {item.label}
              </Link>
            ))}
          </div>
        </nav>
      )}

      <style jsx>{`
        @media (max-width: 900px) {
          :global(.nmp-desktop-nav) {
            display: none !important;
          }
          :global(.nmp-header-cta) {
            display: none !important;
          }
          :global(.nmp-mobile-toggle) {
            display: inline-flex !important;
          }
        }
        @media (min-width: 901px) {
          :global(.nmp-mobile-toggle) {
            display: none !important;
          }
        }
      `}</style>
    </header>
  );
}
