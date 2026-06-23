'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useReveal } from '@/hooks/useReveal';

/**
 * HeroSection — Abu Aufa Personal Portfolio
 *
 * Layout:
 *   Status badge · "Tersedia untuk proyek baru"
 *   Name (display): Abu Aufa
 *   Title (h2): Fullstack Developer & Digital Product Builder
 *   Sub: Building websites, business systems, marketplaces...
 *   Stats inline: 15+ products · 8+ industries · Multiple ventures
 *   Actions: Kontak (primary) · Lihat Karya (ghost)
 *   Tech marquee at bottom
 *
 * Clean, text-first, developer aesthetic. No wireframe.
 */

const techList = [
  'Next.js', 'React', 'TypeScript', 'Tailwind CSS',
  'PostgreSQL', 'Supabase', 'Node.js', 'Prisma',
  'SEO', 'Google Ads', 'Vercel',
];

const stats = [
  { value: '15+', label: 'Digital Products' },
  { value: '8+', label: 'Industries' },
  { value: 'Multi', label: 'Active Ventures' },
];

export function HeroSection() {
  const containerRef = useReveal<HTMLDivElement>();

  return (
    <section ref={containerRef} className="hero-section">
      <div className="hero-grid-bg" />

      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        {/* Status badge */}
        <div
          className="fade-up"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            marginBottom: '32px',
          }}
        >
          <span
            style={{
              width: '6px',
              height: '6px',
              background: 'var(--green)',
              borderRadius: '50%',
              boxShadow: '0 0 0 3px color-mix(in srgb, var(--green) 20%, transparent)',
              display: 'inline-block',
            }}
          />
          <span className="t-caption">Tersedia untuk proyek baru</span>
        </div>

        {/* Name — display */}
        <h1
          className="t-display"
          style={{
            margin: '0 0 16px',
            maxWidth: '14ch',
          }}
        >
          <span className="line-mask">
            <span className="line-inner">Abu Aufa</span>
          </span>
        </h1>

        {/* Title */}
        <h2
          className="t-h1 fade-up delay-1"
          style={{
            margin: '0 0 32px',
            maxWidth: '24ch',
            color: 'var(--ink-soft)',
            fontWeight: 500,
          }}
        >
          Fullstack Developer <span style={{ color: 'var(--accent)' }}>&amp;</span> Digital Product Builder
        </h2>

        {/* Sub */}
        <p className="t-body-lg fade-up delay-2" style={{ maxWidth: '54ch', margin: '0 0 40px' }}>
          Building websites, business systems, marketplaces, and digital products across multiple industries.
        </p>

        {/* Stats inline */}
        <div
          className="fade-up delay-3"
          style={{
            display: 'flex',
            gap: '48px',
            marginBottom: '40px',
            flexWrap: 'wrap',
          }}
        >
          {stats.map((stat) => (
            <div key={stat.label}>
              <div
                style={{
                  fontFamily: 'var(--font-clash)',
                  fontSize: 'clamp(1.5rem, 3vw, 2rem)',
                  fontWeight: 600,
                  color: 'var(--ink)',
                  letterSpacing: '-0.025em',
                  lineHeight: 1,
                  marginBottom: '6px',
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '0.6875rem',
                  color: 'var(--ink-faint)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                }}
              >
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Actions */}
        <div
          className="fade-up delay-4"
          style={{
            display: 'flex',
            gap: '14px',
            alignItems: 'center',
            flexWrap: 'wrap',
            marginBottom: '64px',
          }}
        >
          <Link href="/#contact" className="btn-primary">
            <span>Kontak</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/#projects" className="btn-ghost">
            <span className="underline">Lihat Karya</span>
          </Link>
        </div>

        {/* Tech marquee */}
        <div className="fade-up delay-5 tech-marquee" style={{ marginTop: '16px' }}>
          <div className="tech-marquee-track">
            {[...techList, ...techList].map((tech, idx) => (
              <span key={idx} className="tech-marquee-item">{tech}</span>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          padding: 110px 0 60px;
        }
        @media (min-width: 768px) {
          .hero-section { padding: 130px 0 80px; }
        }
        @media (min-width: 1024px) {
          .hero-section { padding: 140px 0 100px; }
        }
        @media (max-width: 767px) {
          :global(h1.t-display) {
            font-size: clamp(2.5rem, 11vw, 3.5rem) !important;
          }
        }
      `}</style>
    </section>
  );
}
