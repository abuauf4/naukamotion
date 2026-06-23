'use client';

import Link from 'next/link';

/**
 * Footer — Abu Aufa Personal Portfolio v2 (Ink & Code concept)
 * Dark canvas, warm-toned. 4-column: brand + 3 nav.
 */

const footerNavSections = [
  {
    title: '// Site',
    links: [
      { label: 'Pillars', href: '/#pillars' },
      { label: 'Karya', href: '/#projects' },
      { label: 'Proses', href: '/#process' },
      { label: 'Kontak', href: '/#contact' },
    ],
  },
  {
    title: '// Studios',
    links: [
      { label: 'Nauka Motion', href: 'https://naukamotion.id' },
      { label: 'Jejak Cahaya', href: 'https://jejakcahaya.vercel.app' },
    ],
  },
  {
    title: '// Lainnya',
    links: [
      { label: 'FAQ', href: '/faq' },
      { label: 'Kebijakan Privasi', href: '/legal/privacy' },
      { label: 'Syarat & Ketentuan', href: '/legal/terms' },
    ],
  },
];

export function Footer() {
  return (
    <footer className="footer-root">
      <div className="container-wide">
        {/* Top */}
        <div className="footer-top">
          {/* Brand */}
          <div className="footer-brand">
            <h3 className="footer-logo">
              Abu Aufa
              <span style={{ color: 'var(--accent-soft)' }}>.</span>
            </h3>
            <p className="footer-tagline">
              Product Systems Architect &amp; Creative Director. Membangun sistem digital yang punya struktur kuat dan makna yang jelas.
            </p>
            <div className="footer-contact">
              <a
                href="https://wa.me/6289662524542"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp · 0896 6252 4542
              </a>
              <a href="mailto:naukamotion@gmail.com">
                naukamotion@gmail.com
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div className="footer-nav-grid">
            {footerNavSections.map((section) => (
              <div key={section.title} className="footer-col">
                <h4 className="footer-col-title">{section.title}</h4>
                <ul className="footer-col-list">
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="footer-col-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom */}
        <div className="footer-bottom">
          <span>© 2026 Abu Aufa. Dibangun dengan Next.js dari Jakarta.</span>
          <div className="footer-bottom-links">
            <Link href="/legal/privacy" className="footer-bottom-link">Privasi</Link>
            <Link href="/legal/terms" className="footer-bottom-link">Syarat</Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-root {
          background: #1A1A1A;
          color: #B5B0A8;
          padding: 80px 0 40px;
        }
        .footer-top {
          display: grid;
          grid-template-columns: 1fr;
          gap: 48px;
          padding-bottom: 64px;
          border-bottom: 1px solid #2D2925;
          margin-bottom: 32px;
        }
        .footer-brand { max-width: 360px; }
        .footer-logo {
          font-family: var(--font-fraunces), serif;
          font-weight: 500;
          font-size: 1.625rem;
          color: #F0EDE7;
          margin: 0 0 16px;
          letter-spacing: -0.025em;
          font-variation-settings: 'opsz' 40, 'wght' 500, 'SOFT' 60;
        }
        .footer-tagline {
          font-size: 0.9375rem;
          line-height: 1.6;
          color: #8A857B;
          margin: 0 0 24px;
          letter-spacing: -0.005em;
        }
        .footer-contact {
          display: flex;
          flex-direction: column;
          gap: 8px;
          font-size: 0.875rem;
        }
        .footer-contact a {
          color: #B5B0A8;
          transition: color 250ms var(--ease-out);
          letter-spacing: -0.005em;
        }
        .footer-contact a:hover { color: #C75050; }
        .footer-nav-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 32px;
        }
        .footer-col-title {
          font-family: var(--font-jetbrains);
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
          color: #6B6660;
          margin: 0 0 20px;
        }
        .footer-col-list {
          list-style: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .footer-col-link {
          font-size: 0.875rem;
          color: #B5B0A8;
          transition: color 250ms var(--ease-out);
          letter-spacing: -0.005em;
        }
        .footer-col-link:hover { color: #F0EDE7; }
        .footer-bottom {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 16px;
          flex-wrap: wrap;
          font-size: 0.75rem;
          color: #6B6660;
          letter-spacing: -0.005em;
        }
        .footer-bottom-links {
          display: flex;
          gap: 20px;
        }
        .footer-bottom-link {
          color: #6B6660;
          transition: color 250ms var(--ease-out);
        }
        .footer-bottom-link:hover { color: #B5B0A8; }

        @media (min-width: 900px) {
          .footer-top {
            grid-template-columns: 2fr 3fr;
            gap: 56px;
          }
          .footer-nav-grid {
            grid-template-columns: repeat(3, 1fr);
            gap: 32px;
          }
        }
        @media (max-width: 480px) {
          .footer-nav-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </footer>
  );
}
