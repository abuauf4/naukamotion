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
    <section ref={containerRef} id="ventures" className="ventures-section">
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
        <div className="stagger ventures-grid">
          {ventures.map((venture) => (
            <a
              key={venture.name}
              href={venture.url}
              target={venture.url.startsWith('http') ? '_blank' : undefined}
              rel={venture.url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="venture-item"
            >
              <div className="venture-header">
                <h3 className="venture-name">{venture.name}</h3>
                <span className="venture-badge">{venture.badge}</span>
              </div>
              <p className="venture-desc">{venture.description}</p>
            </a>
          ))}
        </div>
      </div>

      <style jsx>{`
        .ventures-section {
          padding: 80px 0;
          background: var(--bg);
        }
        @media (min-width: 768px) {
          .ventures-section { padding: 100px 0; }
        }
        @media (min-width: 1024px) {
          .ventures-section { padding: 120px 0; }
        }
        .ventures-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 768px) {
          .ventures-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 0 48px;
          }
        }
        .venture-item {
          display: block;
          padding: 20px 0;
          border-bottom: 1px solid var(--line-soft);
          transition: padding 400ms var(--ease-out);
          text-decoration: none;
          color: inherit;
        }
        @media (min-width: 768px) {
          .venture-item { padding: 24px 0; }
        }
        .venture-item:hover {
          padding-left: 16px;
          padding-right: 16px;
        }
        .venture-header {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
          gap: 16px;
          margin-bottom: 8px;
        }
        @media (max-width: 480px) {
          .venture-header {
            flex-direction: column;
            gap: 4px;
          }
        }
        .venture-name {
          font-family: var(--font-clash);
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--ink);
          letter-spacing: -0.025em;
          margin: 0;
          transition: color 300ms var(--ease-out);
        }
        @media (min-width: 768px) {
          .venture-name { font-size: 1.5rem; }
        }
        .venture-item:hover .venture-name { color: var(--accent); }
        .venture-badge {
          font-family: var(--font-jetbrains);
          font-size: 0.625rem;
          color: var(--ink-faint);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
          flex-shrink: 0;
        }
        @media (min-width: 768px) {
          .venture-badge { font-size: 0.6875rem; }
        }
        .venture-desc {
          font-size: 0.875rem;
          color: var(--ink-soft);
          line-height: 1.55;
          margin: 0;
          max-width: 60ch;
        }
        @media (min-width: 768px) {
          .venture-desc { font-size: 0.9375rem; line-height: 1.6; }
        }
      `}</style>
    </section>
  );
}
