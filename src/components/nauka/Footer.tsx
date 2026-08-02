"use client";

import Link from "next/link";

/**
 * Footer — Nauka Motion Studio
 *
 * Brand: NAUKA MOTION (large wordmark)
 * Sub: Independent Digital Product & Creative Technology Studio
 *
 * Columns:
 *   - Studio (About, Process, Insights, Contact)
 *   - Work (Selected Work, All Work, Case Studies)
 *   - Connect (Email, WhatsApp, LinkedIn, Instagram)
 *
 * Bottom: © year, location, "Small movement. Real Impact."
 */

const studioLinks = [
  { label: "About", href: "/#studio" },
  { label: "Process", href: "/#process" },
  { label: "Insights", href: "/#insights" },
  { label: "Contact", href: "/#contact" },
];

const workLinks = [
  { label: "Selected Work", href: "/#work" },
  { label: "All Work", href: "/work" },
  { label: "Jasa Proteksi", href: "/work/jasaprotect" },
  { label: "Inventra ERP", href: "/work/inventra-erp" },
  { label: "Anima Companion", href: "/work/anima-companion" },
];

const connectLinks = [
  { label: "hello@naukamotion.id", href: "mailto:hello@naukamotion.id" },
  { label: "WhatsApp", href: "https://wa.me/6281234567890" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      style={{
        background: "var(--paper-warm)",
        borderTop: "1px solid var(--line)",
        marginTop: "auto",
      }}
    >
      <div className="container-wide" style={{ paddingTop: "80px", paddingBottom: "40px" }}>
        {/* Top: brand + columns */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0, 1.4fr) repeat(3, minmax(0, 1fr))",
            gap: "60px",
          }}
          className="nmp-footer-grid"
        >
          {/* Brand column */}
          <div>
            <Link
              href="/"
              aria-label="Nauka Motion — home"
              style={{
                display: "inline-flex",
                alignItems: "baseline",
                gap: "8px",
                textDecoration: "none",
                color: "var(--ink)",
                marginBottom: "20px",
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontWeight: 600,
                  fontSize: "1.5rem",
                  letterSpacing: "0.01em",
                }}
              >
                NAUKA
              </span>
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: "1.5rem",
                  color: "var(--burnt)",
                }}
              >
                motion
              </span>
            </Link>
            <p
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "0.92rem",
                color: "var(--ink-soft)",
                lineHeight: 1.55,
                maxWidth: "32ch",
                marginBottom: "24px",
              }}
            >
              Independent Digital Product &amp; Creative Technology Studio.
              We design and build digital products that move businesses forward.
            </p>
            <p
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontStyle: "italic",
                fontSize: "1.05rem",
                color: "var(--ink)",
              }}
            >
              Small movement. Real Impact.
            </p>
          </div>

          {/* Studio column */}
          <div>
            <p className="studio-meta" style={{ marginBottom: "20px" }}>
              Studio
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {studioLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontSize: "0.92rem",
                      color: "var(--ink-soft)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--burnt)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--ink-soft)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Work column */}
          <div>
            <p className="studio-meta" style={{ marginBottom: "20px" }}>
              Work
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {workLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontSize: "0.92rem",
                      color: "var(--ink-soft)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--burnt)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--ink-soft)";
                    }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect column */}
          <div>
            <p className="studio-meta" style={{ marginBottom: "20px" }}>
              Connect
            </p>
            <ul
              style={{
                listStyle: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {connectLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    target={link.href.startsWith("http") ? "_blank" : undefined}
                    rel={
                      link.href.startsWith("http")
                        ? "noopener noreferrer"
                        : undefined
                    }
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontSize: "0.92rem",
                      color: "var(--ink-soft)",
                      textDecoration: "none",
                      transition: "color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--burnt)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--ink-soft)";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            height: "1px",
            background: "var(--line)",
            margin: "60px 0 28px",
          }}
        />

        {/* Bottom: meta row */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "16px",
          }}
        >
          <p
            className="studio-meta"
            style={{ margin: 0 }}
          >
            © {year} Nauka Motion — Jakarta, ID
          </p>
          <p
            className="studio-meta"
            style={{ margin: 0, display: "flex", gap: "20px" }}
          >
            <Link
              href="/legal/privacy"
              style={{
                color: "var(--ink-soft)",
                textDecoration: "none",
              }}
            >
              Privacy
            </Link>
            <Link
              href="/legal/terms"
              style={{
                color: "var(--ink-soft)",
                textDecoration: "none",
              }}
            >
              Terms
            </Link>
          </p>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          :global(.nmp-footer-grid) {
            grid-template-columns: minmax(0, 1fr) !important;
            gap: 40px !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          :global(.nmp-footer-grid) {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) !important;
          }
        }
      `}</style>
    </footer>
  );
}
