'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useReveal } from '@/hooks/useReveal';

/**
 * HeroSection — Nauka Motion (Developer Theme)
 *
 * Editorial layout: eyebrow + display headline (line-mask reveal) + sub + actions
 * No rotating image carousel. Calm, confident, single-screen.
 *
 * Fetches tagline/headline/subtitle from /api/public/settings.
 */

interface SiteSettings {
  tagline?: string;
  headline?: string;
  subtitle?: string;
}

export function HeroSection() {
  const containerRef = useReveal<HTMLDivElement>();
  const [settings, setSettings] = useState<SiteSettings>({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/public/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === 'object') setSettings(data);
        setDataLoaded(true);
      })
      .catch(() => setDataLoaded(true));
  }, []);

  const headline = settings.headline || 'Membangun produk digital dengan arah yang jelas.';
  // Split headline into 2 lines for line-mask reveal
  const words = headline.split(' ');
  const midPoint = Math.ceil(words.length / 2);
  const line1 = words.slice(0, midPoint).join(' ');
  const line2Words = words.slice(midPoint);
  // Last 2-3 words of line 2 become accent (italic Instrument Serif)
  const accentCount = Math.min(3, Math.max(2, Math.ceil(line2Words.length / 2)));
  const line2Plain = line2Words.slice(0, line2Words.length - accentCount).join(' ');
  const line2Accent = line2Words.slice(line2Words.length - accentCount).join(' ');

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '120px 0 80px',
        position: 'relative',
      }}
    >
      <div className="hero-grid-bg" />

      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <div
          className="fade-up"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '14px',
            marginBottom: '36px',
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
          <span
            style={{
              width: '32px',
              height: '1px',
              background: 'var(--accent)',
              display: 'inline-block',
            }}
          />
          <span className="t-caption">Available for projects · Jakarta, ID</span>
        </div>

        {/* Headline */}
        <h1 className="t-display" style={{ maxWidth: '16ch', margin: '0 0 40px' }}>
          <span className="line-mask">
            <span className="line-inner">{line1}</span>
          </span>
          <span className="line-mask delay-1">
            <span className="line-inner">
              {line2Plain}{' '}
              <span className="accent">{line2Accent}</span>
            </span>
          </span>
        </h1>

        {/* Sub */}
        <p className="t-body-lg fade-up delay-3" style={{ maxWidth: '50ch', margin: '0 0 48px' }}>
          {settings.subtitle ||
            'Dari website bisnis, sistem operasional, hingga pengalaman digital yang membantu bisnis bertumbuh — dikerjakan dengan tenang, tepat, dan terarah.'}
        </p>

        {/* Actions */}
        <div className="fade-up delay-4" style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
          <Link href="/contact" className="btn-primary">
            <span>Mulai Proyek</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <Link href="/work" className="btn-ghost">
            <span className="underline">Lihat Karya</span>
          </Link>
        </div>
      </div>

      {/* Hero meta — bottom */}
      <div
        style={{
          position: 'absolute',
          bottom: '32px',
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'end',
          padding: '0 24px',
        }}
      >
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            color: 'var(--ink-faint)',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.6875rem',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          Scroll
          <span
            style={{
              width: '40px',
              height: '1px',
              background: 'var(--ink-faint)',
              position: 'relative',
              overflow: 'hidden',
              display: 'inline-block',
            }}
          >
            <span
              style={{
                position: 'absolute',
                inset: 0,
                background: 'var(--accent)',
                transform: 'translateX(-100%)',
                animation: 'scrollHint 2.8s cubic-bezier(0.4,0,0.2,1) infinite',
              }}
            />
          </span>
        </span>
        <div style={{ textAlign: 'right', color: 'var(--ink-faint)', fontSize: '0.75rem', lineHeight: 1.5 }}>
          <strong style={{ color: 'var(--ink-soft)', fontWeight: 500 }}>Abu Aufa</strong> — Founder<br />
          <span style={{ fontFamily: 'var(--font-jetbrains)', color: 'var(--accent)', fontSize: '0.6875rem' }}>
            halo@naukamotion.id
          </span>
        </div>
      </div>

      <style jsx>{`
        @keyframes scrollHint {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }
        @media (max-width: 640px) {
          section > div:last-child > div:last-child { display: none; }
        }
      `}</style>
    </section>
  );
}
