'use client';

import Link from 'next/link';

/**
 * Footer — Abu Aufa Personal Portfolio
 * Always dark. 4-column: brand + 3 nav.
 */

const footerNavSections = [
  {
    title: '// Navigasi',
    links: [
      { label: 'Karya', href: '/#projects' },
      { label: 'Ventures', href: '/#ventures' },
      { label: 'Tech Stack', href: '/#stack' },
      { label: 'Arsip', href: '/#archive' },
    ],
  },
  {
    title: '// Ventures',
    links: [
      { label: 'Nauka Motion', href: 'https://naukamotion.id' },
      { label: 'Jakarta Laptops', href: '#' },
      { label: 'Ghazy Computer', href: 'https://ghazycomputer.com' },
      { label: 'Tumbuh.id', href: '#' },
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
    <footer style={{ background: '#0D1117', color: '#B0B8C1', padding: '80px 0 40px' }}>
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
                fontSize: '1.5rem',
                color: '#fff',
                margin: '0 0 16px',
                letterSpacing: '-0.025em',
              }}
            >
              Abu Aufa<span style={{ color: 'var(--accent-soft)' }}>.</span>
            </h3>
            <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, color: '#7D8590', margin: '0 0 24px', letterSpacing: '-0.005em' }}>
              Fullstack Developer &amp; Digital Product Builder. Membangun produk digital lintas industri dari Jakarta.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.875rem', letterSpacing: '-0.005em' }}>
              <a
                href="https://wa.me/6289662524542"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#B0B8C1', transition: 'color 250ms var(--ease-out)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-soft)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#B0B8C1')}
              >
                WhatsApp · 0896 6252 4542
              </a>
              <a
                href="mailto:naukamotion@gmail.com"
                style={{ color: '#B0B8C1', transition: 'color 250ms var(--ease-out)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent-soft)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#B0B8C1')}
              >
                naukamotion@gmail.com
              </a>
            </div>
          </div>

          {/* Nav columns */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '32px' }}>
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
          <span>© 2026 Abu Aufa. Dibangun dengan Next.js dari Jakarta.</span>
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
