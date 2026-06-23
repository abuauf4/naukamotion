'use client';

import { useReveal } from '@/hooks/useReveal';
import Link from 'next/link';

/**
 * VenturesSection — businesses & digital assets built/owned.
 * Different from projects: ventures are ongoing businesses, not client work.
 */

const ventures = [
  {
    name: 'Nauka Motion',
    description: 'Studio digital fokus pada motion design & content production untuk brand yang ingin berkembang melalui visual yang efektif.',
    url: 'https://naukamotion.id',
    badge: 'Creative Studio',
  },
  {
    name: 'Jakarta Laptops',
    description: 'Marketplace jual-beli laptop bekas & baru dengan sistem evaluasi, penawaran, pickup, dan pembayaran dalam satu platform.',
    url: '#',
    badge: 'Marketplace',
  },
  {
    name: 'Ghazy Computer',
    description: 'Sistem buyback laptop dengan flow operasional terorganisir — dari penawaran sampai pickup & pembayaran otomatis.',
    url: 'https://ghazycomputer.com',
    badge: 'Buyback System',
  },
  {
    name: 'Nauka Gadget',
    description: 'E-commerce gadget premium dengan garansi resmi, katalog terorganisir, dan checkout yang clean — bukan marketplace tipis.',
    url: 'https://naukagadget.vercel.app',
    badge: 'E-Commerce',
  },
  {
    name: 'Nauka Kostay',
    description: 'Platform booking kos dengan pengalaman setara hotel — virtual tour, fasilitas dengan pride, testimoni penghuni.',
    url: 'https://nauka-kostay.vercel.app',
    badge: 'Hospitality',
  },
  {
    name: 'Tumbuh.id',
    description: 'Platform pertumbuhan bisnis & insights untuk UMKM Indonesia — dashboard, analytics, dan rekomendasi strategi.',
    url: '#',
    badge: 'SaaS',
  },
];

export function VenturesSection() {
  const containerRef = useReveal<HTMLDivElement>();

  return (
    <section ref={containerRef} id="ventures" style={{ padding: '120px 0', background: 'var(--bg)' }}>
      <div className="container-wide">
        {/* Header */}
        <div className="sec-head">
          <div className="sec-head-left">
            <span className="sec-head-num fade-up">// Ventures</span>
            <h2 className="t-h1 sec-head-title">
              <span className="line-mask"><span className="line-inner">Bisnis &amp; aset</span></span>
              <span className="line-mask delay-1"><span className="line-inner">yang dibangun.</span></span>
            </h2>
          </div>
          <p className="sec-head-right fade-up delay-2">
            Bukan sekadar project client — ini bisnis dan aset digital yang dibangun, dikelola, dan dikembangkan sendiri.
          </p>
        </div>

        {/* Ventures grid */}
        <div
          className="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '16px',
          }}
        >
          {ventures.map((venture) => (
            <a
              key={venture.name}
              href={venture.url}
              target={venture.url.startsWith('http') ? '_blank' : undefined}
              rel={venture.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              style={{
                display: 'block',
                padding: '28px 0',
                borderBottom: '1px solid var(--line-soft)',
                transition: 'padding 400ms var(--ease-out)',
                textDecoration: 'none',
                color: 'inherit',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.paddingLeft = '16px';
                e.currentTarget.style.paddingRight = '16px';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.paddingLeft = '0';
                e.currentTarget.style.paddingRight = '0';
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '24px', marginBottom: '8px' }}>
                <h3
                  style={{
                    fontFamily: 'var(--font-clash)',
                    fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    fontWeight: 600,
                    color: 'var(--ink)',
                    letterSpacing: '-0.025em',
                    margin: 0,
                    transition: 'color 300ms var(--ease-out)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--accent)')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--ink)')}
                >
                  {venture.name}
                </h3>
                <span
                  style={{
                    fontFamily: 'var(--font-jetbrains)',
                    fontSize: '0.6875rem',
                    color: 'var(--ink-faint)',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    fontWeight: 500,
                    flexShrink: 0,
                  }}
                >
                  {venture.badge}
                </span>
              </div>
              <p style={{ fontSize: '0.9375rem', color: 'var(--ink-soft)', lineHeight: 1.6, margin: 0, maxWidth: '60ch' }}>
                {venture.description}
              </p>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          div[style*='grid-template-columns: 1fr'][class*='stagger'] {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: '0 48px' !important;
          }
        }
      `}</style>
    </section>
  );
}
