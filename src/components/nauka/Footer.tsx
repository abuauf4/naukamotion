"use client";

import Link from "next/link";
import Image from "next/image";
import { useLocale } from "@/lib/locale-context";

/**
 * Footer — Nauka Motion Studio
 *
 * Brand: NAUKA MOTION (large wordmark)
 * Sub: Studio Produk Digital
 *
 * Columns:
 *   - Studio (Tentang, Proses, Insights, Kontak)
 *   - Kategori (link ke /work overview + kategori populer)
 *   - Connect (Email, WhatsApp, Instagram, Facebook, LinkedIn)
 *
 * Bottom: © year, location, "Small movement. Real Impact."
 *
 * Kontak asli (dari instruksi):
 *   WhatsApp: 089662524542 / @naukamotion
 *   Instagram: @naukamotion
 *   Facebook: @naukamotion
 *   LinkedIn: linkedin.com/in/abu-aufa-734b85418
 *   Email: info@nauka.id
 */

const COPY = {
  id: {
    studio: "Studio",
    categories: "Kategori",
    connect: "Connect",
    about: "Tentang",
    process: "Proses",
    insights: "Insights",
    contact: "Kontak",
    allWork: "Semua Kategori",
    privacy: "Privasi",
    terms: "Syarat",
    tagline: "Studio Produk Digital. Kami mengubah kebutuhan bisnis menjadi produk digital yang bekerja.",
  },
  en: {
    studio: "Studio",
    categories: "Categories",
    connect: "Connect",
    about: "About",
    process: "Process",
    insights: "Insights",
    contact: "Contact",
    allWork: "All Categories",
    privacy: "Privacy",
    terms: "Terms",
    tagline: "Digital Product Studio. We turn business needs into digital products that work.",
  },
};

export function Footer() {
  const year = new Date().getFullYear();
  const { locale } = useLocale();
  const t = COPY[locale];

  const studioLinks = [
    { label: t.about, href: "/about" },
    { label: t.process, href: "/#process" },
    { label: t.insights, href: "/insights" },
    { label: t.contact, href: "/contact" },
  ];

  const categoryLinks = [
    { label: t.allWork, href: "/work" },
    { label: "Automotive", href: "/work/automotive" },
    { label: "Technology & Retail", href: "/work/technology-retail" },
    { label: "Insurance", href: "/work/insurance" },
    { label: "Personal Projects", href: "/work/personal-projects" },
  ];

  const connectLinks = [
    { label: "info@nauka.id", href: "mailto:info@nauka.id" },
    { label: "WhatsApp", href: "https://wa.me/6289662524542" },
    { label: "Instagram", href: "https://instagram.com/naukamotion" },
    { label: "Facebook", href: "https://facebook.com/naukamotion" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/abu-aufa-734b85418" },
  ];

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
                alignItems: "center",
                textDecoration: "none",
                color: "var(--ink)",
                marginBottom: "20px",
              }}
            >
              <Image
                src="/logo-navbar.webp"
                alt="Nauka Motion"
                width={140}
                height={48}
                style={{
                  height: "auto",
                  width: "auto",
                  maxHeight: "48px",
                }}
              />
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
              {t.tagline}
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
              {t.studio}
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

          {/* Categories column */}
          <div>
            <p className="studio-meta" style={{ marginBottom: "20px" }}>
              {t.categories}
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
              {categoryLinks.map((link) => (
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
              {t.connect}
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
              {t.privacy}
            </Link>
            <Link
              href="/legal/terms"
              style={{
                color: "var(--ink-soft)",
                textDecoration: "none",
              }}
            >
              {t.terms}
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
