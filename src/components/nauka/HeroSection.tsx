'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useReveal } from '@/hooks/useReveal';

/**
 * HeroSection — Nauka Motion (Developer Theme)
 *
 * Two-column hero (desktop):
 *   Left:  eyebrow + headline (word-reveal 3D) + sub + actions
 *   Right: SVG wireframe browser mockup — paths drawn one by one
 *          (stroke-dashoffset animation, staggered)
 *
 * Mobile: single column, wireframe hidden (would be too cramped).
 */

interface SiteSettings {
  tagline?: string;
  headline?: string;
  subtitle?: string;
}

// Wireframe paths — each path has its length precomputed.
// Path order = draw order. Stagger ~150ms between paths.
const wireframePaths = [
  // Outer browser frame
  { d: 'M4 4 H396 V276 H4 Z', len: 1344, cls: '', delay: 0 },
  // Top bar separator
  { d: 'M4 36 H396', len: 392, cls: '', delay: 200 },
  // 3 traffic-light dots
  { d: 'M18 20 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0', len: 25, cls: '', delay: 350 },
  { d: 'M32 20 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0', len: 25, cls: '', delay: 400 },
  { d: 'M46 20 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0', len: 25, cls: '', delay: 450 },
  // URL bar
  { d: 'M70 12 H310 V28 H70 Z', len: 488, cls: '', delay: 550 },
  // Hero block (accent color — main visual element)
  { d: 'M24 60 H232 V160 H24 Z', len: 616, cls: 'wf-accent', delay: 750 },
  // Content lines under hero block
  { d: 'M24 180 H200', len: 176, cls: 'wf-soft', delay: 1000 },
  { d: 'M24 196 H180', len: 156, cls: 'wf-soft', delay: 1100 },
  { d: 'M24 212 H160', len: 136, cls: 'wf-soft', delay: 1200 },
  // Sidebar
  { d: 'M256 60 H376 V220 H256 Z', len: 568, cls: '', delay: 1400 },
  // Sidebar lines
  { d: 'M272 80 H360', len: 88, cls: 'wf-soft', delay: 1600 },
  { d: 'M272 100 H336', len: 64, cls: 'wf-soft', delay: 1680 },
  { d: 'M272 120 H352', len: 80, cls: 'wf-soft', delay: 1760 },
  { d: 'M272 140 H344', len: 72, cls: 'wf-soft', delay: 1840 },
  { d: 'M272 160 H360', len: 88, cls: 'wf-soft', delay: 1920 },
];

export function HeroSection() {
  const containerRef = useReveal<HTMLDivElement>();
  const [settings, setSettings] = useState<SiteSettings>({});
  const [dataLoaded, setDataLoaded] = useState(false);
  const [wordsRevealed, setWordsRevealed] = useState(false);
  const [wireframeDrawing, setWireframeDrawing] = useState(false);

  useEffect(() => {
    fetch('/api/public/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === 'object') setSettings(data);
        setDataLoaded(true);
      })
      .catch(() => setDataLoaded(true));
  }, []);

  // Trigger word-reveal after a short delay so initial state renders first
  useEffect(() => {
    const t1 = setTimeout(() => setWordsRevealed(true), 200);
    // Wireframe starts drawing slightly after headline begins
    const t2 = setTimeout(() => setWireframeDrawing(true), 600);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  const headline = settings.headline || 'Membangun produk digital dengan arah yang jelas.';
  const headlineWords = headline.split(' ');

  // Last 2-3 words become accent (Instrument Serif italic)
  const accentCount = Math.min(3, Math.max(2, Math.ceil(headlineWords.length / 4)));
  const plainCount = headlineWords.length - accentCount;

  return (
    <section
      ref={containerRef}
      style={{
        minHeight: '100svh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '140px 0 80px',
        position: 'relative',
        perspective: '600px',
      }}
    >
      <div className="hero-grid-bg" />

      <div
        className="container-wide"
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: '1fr',
          gap: '48px',
          alignItems: 'center',
        }}
      >
        {/* Left: Text content */}
        <div>
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

          {/* Headline — word-reveal animation */}
          <h1
            className="t-display"
            style={{ maxWidth: '16ch', margin: '0 0 40px' }}
          >
            {headlineWords.map((word, idx) => {
              const isAccent = idx >= plainCount;
              const startAccentLine = idx === plainCount;
              return (
                <span
                  key={word + idx}
                  className={`word-reveal ${wordsRevealed ? 'revealed' : ''}`}
                  style={{ transitionDelay: `${300 + idx * 90}ms` }}
                >
                  {startAccentLine && <span style={{ display: 'block' }} />}
                  {isAccent ? (
                    <span className="accent">{word}</span>
                  ) : (
                    word
                  )}
                </span>
              );
            })}
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

        {/* Right: Wireframe SVG (desktop only) */}
        <div className="hero-wireframe-wrap" aria-hidden="true">
          <svg
            className="hero-wireframe"
            viewBox="0 0 400 280"
            xmlns="http://www.w3.org/2000/svg"
          >
            {wireframePaths.map((p, idx) => (
              <path
                key={idx}
                d={p.d}
                className={`wf-path ${p.cls} ${wireframeDrawing ? 'revealed' : ''}`}
                style={{
                  // @ts-expect-error custom property
                  '--wf-length': p.len,
                  transitionDelay: `${p.delay}ms`,
                }}
              />
            ))}
            {/* Accent dot at top-right corner of hero block — appears after block is drawn */}
            <circle
              cx="232"
              cy="60"
              r="3"
              className={`wf-glow-dot ${wireframeDrawing ? 'revealed' : ''}`}
              style={{ transitionDelay: '1800ms' }}
            />
          </svg>
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
        /* Desktop: 2-column layout (text + wireframe) */
        @media (min-width: 1024px) {
          section > div:first-child {
            grid-template-columns: 7fr 5fr !important;
            gap: 64px !important;
          }
        }
        /* Mobile: hide wireframe (too cramped) */
        @media (max-width: 1023px) {
          .hero-wireframe-wrap { display: none; }
        }
        @media (prefers-reduced-motion: reduce) {
          .word-reveal {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
