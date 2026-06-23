'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useReveal } from '@/hooks/useReveal';

/**
 * HeroSection — Nauka Motion (Developer Theme)
 *
 * Layouts:
 *   Mobile  (<768px):  single column — text → small wireframe (280px)
 *   Tablet  (768-1023): single column — text → medium wireframe (380px)
 *   Desktop (≥1024px): 2-column 7fr/5fr — text left, wireframe right (480px)
 *
 * Wireframe: 16 SVG paths drawn sequentially via stroke-dashoffset.
 * Headline: per-word 3D entrance (translateY + rotateX + blur).
 */

interface SiteSettings {
  tagline?: string;
  headline?: string;
  subtitle?: string;
}

// Each path has its length precomputed for stroke-dashoffset animation.
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
    <section ref={containerRef} className="hero-section">
      <div className="hero-grid-bg" />

      <div className="container-wide hero-grid">
        {/* ━━━ Left: Text content ━━━ */}
        <div className="hero-text">
          {/* Eyebrow */}
          <div
            className="fade-up"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '14px',
              marginBottom: '28px',
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
          <h1 className="t-display hero-headline">
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
                  {isAccent ? <span className="accent">{word}</span> : word}
                </span>
              );
            })}
          </h1>

          {/* Sub */}
          <p className="t-body-lg fade-up delay-3 hero-sub">
            {settings.subtitle ||
              'Dari website bisnis, sistem operasional, hingga pengalaman digital yang membantu bisnis bertumbuh — dikerjakan dengan tenang, tepat, dan terarah.'}
          </p>

          {/* Actions */}
          <div
            className="fade-up delay-4"
            style={{
              display: 'flex',
              gap: '14px',
              alignItems: 'center',
              flexWrap: 'wrap',
              marginTop: '36px',
            }}
          >
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

        {/* ━━━ Right: Wireframe SVG ━━━ */}
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
            {/* Accent dot at top-right corner of hero block */}
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
      <div className="hero-meta">
        <span className="hero-scroll">
          Scroll
          <span className="hero-scroll-line">
            <span className="hero-scroll-fill" />
          </span>
        </span>
        <div className="hero-credit">
          <strong>Abu Aufa</strong> — Founder<br />
          <span className="hero-credit-email">halo@naukamotion.id</span>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          perspective: 600px;
          /* Mobile: smaller padding so content fits */
          padding: 110px 0 60px;
        }

        /* Tablet */
        @media (min-width: 768px) {
          .hero-section {
            padding: 130px 0 70px;
          }
        }
        /* Desktop */
        @media (min-width: 1024px) {
          .hero-section {
            padding: 140px 0 80px;
          }
        }

        .hero-grid {
          position: relative;
          z-index: 1;
          display: grid;
          grid-template-columns: 1fr;
          gap: 40px;
          align-items: center;
        }
        /* Tablet: still single column but more space */
        @media (min-width: 768px) {
          .hero-grid {
            gap: 48px;
            max-width: 640px;
            margin: 0 auto;
          }
        }
        /* Desktop: 2-column 7fr/5fr */
        @media (min-width: 1024px) {
          .hero-grid {
            grid-template-columns: 7fr 5fr;
            gap: 64px;
            max-width: none;
          }
        }
        @media (min-width: 1280px) {
          .hero-grid { gap: 80px; }
        }

        .hero-headline {
          margin: 0 0 28px;
          max-width: 16ch;
        }
        /* Mobile: tighten headline size */
        @media (max-width: 767px) {
          .hero-headline {
            font-size: clamp(2rem, 9vw, 2.75rem);
            line-height: 1.05;
            margin-bottom: 24px;
          }
        }

        .hero-sub {
          margin: 0;
          max-width: 50ch;
        }
        @media (max-width: 767px) {
          .hero-sub {
            font-size: 1rem;
            line-height: 1.6;
          }
        }
        @media (min-width: 1024px) {
          .hero-sub { margin-bottom: 0; }
        }

        /* Wireframe — visible on all sizes, sizing adapts */
        .hero-wireframe-wrap {
          position: relative;
          width: 100%;
          aspect-ratio: 4 / 3;
          max-width: 280px;
          margin: 0 auto;
        }
        @media (min-width: 768px) {
          .hero-wireframe-wrap {
            max-width: 380px;
          }
        }
        @media (min-width: 1024px) {
          .hero-wireframe-wrap {
            max-width: 480px;
            margin: 0 0 0 auto;
          }
        }

        /* Hero meta */
        .hero-meta {
          position: absolute;
          bottom: 24px;
          left: 0;
          right: 0;
          display: flex;
          justify-content: space-between;
          align-items: end;
          padding: 0 24px;
        }
        @media (min-width: 768px) {
          .hero-meta { bottom: 32px; padding: 0 40px; }
        }
        @media (min-width: 1024px) {
          .hero-meta { padding: 0 56px; }
        }
        .hero-scroll {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          color: var(--ink-faint);
          font-family: var(--font-jetbrains);
          font-size: 0.6875rem;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
        }
        .hero-scroll-line {
          width: 40px;
          height: 1px;
          background: var(--ink-faint);
          position: relative;
          overflow: hidden;
          display: inline-block;
        }
        .hero-scroll-fill {
          position: absolute;
          inset: 0;
          background: var(--accent);
          transform: translateX(-100%);
          animation: scrollHint 2.8s cubic-bezier(0.4,0,0.2,1) infinite;
        }
        .hero-credit {
          text-align: right;
          color: var(--ink-faint);
          font-size: 0.75rem;
          line-height: 1.5;
        }
        .hero-credit strong {
          color: var(--ink-soft);
          font-weight: 500;
        }
        .hero-credit-email {
          font-family: var(--font-jetbrains);
          color: var(--accent);
          font-size: 0.6875rem;
        }
        @media (max-width: 640px) {
          .hero-credit { display: none; }
        }

        @keyframes scrollHint {
          0% { transform: translateX(-100%); }
          50% { transform: translateX(0%); }
          100% { transform: translateX(100%); }
        }

        @media (prefers-reduced-motion: reduce) {
          .word-reveal {
            opacity: 1 !important;
            transform: none !important;
            filter: none !important;
            transition: none !important;
          }
          .hero-scroll-fill { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
