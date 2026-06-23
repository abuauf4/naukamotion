'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

/**
 * Footer — (Developer Theme)
 *
 * Always dark (GitHub deep bg). 4-column grid: brand + 3 nav columns.
 */

interface SiteSettings {
  site_name?: string;
  whatsapp?: string;
  email?: string;
  founder?: string;
}

const footerNavSections = [
  {
    title: '// Layanan',
    links: [
      { label: 'Website Development', href: '/services/website-development' },
      { label: 'Business System', href: '/services/business-system-development' },
      { label: 'CMS Platform', href: '/services/cms-platform' },
      { label: 'Semua Layanan', href: '/services' },
    ],
  },
  {
    title: '// Perusahaan',
    links: [
      { label: 'Cara Berpikir', href: '/about' },
      { label: 'Karya', href: '/work' },
      { label: 'Wawasan', href: '/insights' },
      { label: 'Kontak', href: '/contact' },
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
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    fetch('/api/public/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === 'object') setSettings(data);
      })
      .catch(() => {});
  }, []);

  const siteName = settings.site_name || 'Nauka Motion';
  const whatsappNumber = settings.whatsapp || '6289662524542';
  const emailAddress = settings.email || 'naukamotion@gmail.com';
  const founder = settings.founder || 'Abu Aufa';

  return (
    <footer
      style={{
        background: '#0D1117',
        color: '#B0B8C1',
        padding: '80px 0 40px',
      }}
    >
      <div className="container-wide">
        {/* Top */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '48px',
            paddingBottom: '64px',
            borderBottom: '1px solid #21262D',
            marginBottom: '32px',
          }}
        >
          {/* Brand */}
          <div style={{ maxWidth: '320px' }}>
            <h3
              style={{
                fontFamily: 'var(--font-clash)',
                fontWeight: 600,
                fontSize: '1.375rem',
                color: '#fff',
                margin: '0 0 16px',
                letterSpacing: '-0.025em',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '22px',
                  height: '22px',
                  background: 'var(--accent)',
                  color: '#fff',
                  borderRadius: '5px',
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '0.75rem',
                  fontWeight: 500,
                }}
              >
                N
              </span>
              {siteName}
            </h3>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: '#7D8590', margin: '0 0 24px', letterSpacing: '-0.005em' }}>
              Produk digital yang menciptakan dampak nyata, bukan sekadar tampilan indah.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', letterSpacing: '-0.005em' }}>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#B0B8C1', transition: 'color 250ms var(--ease-out)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-soft)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#B0B8C1')}
              >
                WhatsApp · 0896 6252 4542
              </a>
              <a
                href={`mailto:${emailAddress}`}
                style={{ color: '#B0B8C1', transition: 'color 250ms var(--ease-out)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-soft)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#B0B8C1')}
              >
                {emailAddress}
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '32px',
            }}
          >
            {footerNavSections.map((section) => (
              <div key={section.title}>
                <h4
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '0.6875rem',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    color: '#6E7681',
                    margin: '0 0 20px',
                  }}
                >
                  {section.title}
                </h4>
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {section.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        style={{
                          fontSize: '0.875rem',
                          color: '#B0B8C1',
                          transition: 'color 250ms var(--ease-out)',
                          letterSpacing: '-0.005em',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#B0B8C1')}
                      >
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
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '16px',
            flexWrap: 'wrap',
            fontSize: '0.75rem',
            color: '#6E7681',
            letterSpacing: '-0.005em',
          }}
        >
          <span>© 2026 {siteName}. Didirikan oleh {founder}.</span>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Link
              href="/legal/privacy"
              style={{ color: '#6E7681', transition: 'color 250ms var(--ease-out)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B0B8C1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6E7681')}
            >
              Privasi
            </Link>
            <Link
              href="/legal/terms"
              style={{ color: '#6E7681', transition: 'color 250ms var(--ease-out)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#B0B8C1')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#6E7681')}
            >
              Syarat
            </Link>
          </div>
        </div>
      </div>

      {/* Mobile responsive grid fix */}
      <style jsx>{`
        @media (min-width: 900px) {
          footer > div > div:first-child {
            grid-template-columns: 2fr 3fr !important;
            gap: 56px !important;
          }
          footer > div > div:first-child > div:last-child {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 32px !important;
          }
        }
      `}</style>
    </footer>
  );
}
