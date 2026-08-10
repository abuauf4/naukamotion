/**
 * HeaderInteractive — small client island inside the otherwise server-rendered Header.
 *
 * Responsibilities:
 *   - Mobile menu open/close (toggles a single useState + body overflow lock)
 *   - Backdrop blur + border on scroll past 24px
 *   - Locale switcher (ID ↔ EN, sets cookie + localStorage)
 *
 * Why client-only:
 *   - Mobile menu button needs onClick
 *   - Scroll state needs scroll listener
 *   - Locale switch needs client-side cookie/localStorage
 *
 * Server side renders the visible nav + wordmark + CTA. This island
 * wraps them so the interactive affordances work, but the initial
 * paint does NOT depend on hydration.
 */
"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export interface NavItem {
  label: string;
  href: string;
}

export function HeaderInteractive({
  children,
  navItems,
  locale,
}: {
  children: ReactNode;
  navItems: NavItem[];
  locale: "id" | "en";
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const [currentLocale, setCurrentLocale] = useState<"id" | "en">(locale);

  // Scroll listener — only attaches once.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Body overflow lock when mobile menu open
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

  // Locale switch handler
  function toggleLocale() {
    const next = currentLocale === "id" ? "en" : "id";
    setCurrentLocale(next);
    try {
      document.documentElement.lang = next;
      localStorage.setItem("nauka-locale", next);
      document.cookie = `nauka-locale=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    } catch {
      // ignore write failures
    }
    // Reload to re-render server-side with new locale.
    // Lighter than full client-side locale state propagation.
    window.location.reload();
  }

  return (
    <>
      <header
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          transition: "background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease",
          background: scrolled
            ? "color-mix(in srgb, var(--bg) 88%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
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
            paddingTop: "16px",
            paddingBottom: "16px",
          }}
        >
          {children}

          {/* Mobile menu trigger — visible only on mobile */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            className="nauka-header-trigger-mobile"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: 400,
              fontSize: "0.85rem",
              color: "var(--ink-soft)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "8px 0",
              letterSpacing: "-0.005em",
            }}
          >
            <span>{mobileOpen ? "Tutup" : "Menu"}</span>
            <span
              aria-hidden="true"
              style={{
                width: "14px",
                height: "1px",
                background: "var(--ink-soft)",
                display: "inline-block",
              }}
            />
          </button>
        </div>
      </header>

      {/* Mobile menu panel — inline overlay (not a SaaS drawer) */}
      {mobileOpen && (
        <div
          className="nauka-header-mobile-panel"
          style={{
            position: "fixed",
            inset: "56px 0 0 0",
            zIndex: 49,
            background: "var(--bg)",
            display: "flex",
            flexDirection: "column",
            padding: "32px clamp(20px, 5vw, 40px)",
            gap: "8px",
          }}
        >
          {navItems.map((item, i) => (
            <Link
              key={item.href}
              href={item.href}
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(2rem, 8vw, 3rem)",
                color: "var(--ink)",
                textDecoration: "none",
                letterSpacing: "-0.02em",
                lineHeight: 1.1,
                padding: "12px 0",
                borderBottom: "1px solid var(--line)",
                // Subtle staggered entrance
                opacity: 0,
                transform: "translateY(8px)",
                animation: `nauka-mobile-item 240ms cubic-bezier(0.22, 1, 0.36, 1) ${i * 50}ms forwards`,
              }}
            >
              {item.label}
            </Link>
          ))}

          <button
            type="button"
            onClick={toggleLocale}
            style={{
              fontFamily: "var(--font-body), sans-serif",
              fontWeight: 400,
              fontSize: "0.85rem",
              color: "var(--ink-soft)",
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "12px 0",
              textAlign: "left",
              letterSpacing: "0.04em",
              textTransform: "uppercase",
            }}
          >
            {currentLocale === "id" ? "EN — English" : "ID — Bahasa"}
          </button>

          <style>{`
            @keyframes nauka-mobile-item {
              0% { opacity: 0; transform: translateY(8px); }
              100% { opacity: 1; transform: translateY(0); }
            }
          `}</style>
        </div>
      )}
    </>
  );
}
