'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { useReveal } from '@/hooks/useReveal';

/**
 * HeroSection — Nauka Motion (Developer Theme)
 *
 * Editorial layout with **word-reveal animation** on the headline:
 * Each word enters with 3D rotateX + blur, staggered ~90ms.
 * Plus line-mask reveal on subtitle and fade-up on actions.
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
  const [wordsRevealed, setWordsRevealed] = useState(false);

  useEffect(() => {
    fetch('/api/public/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === 'object') setSettings(data);
        setDataLoaded(true);
      })
      .catch(() => setDataLoaded(true));
  }, []);

  // Trigger word-reveal after a short delay so the initial state renders first
  useEffect(() => {
    const timer = setTimeout(() => setWordsRevealed(true), 200);
    return () => clearTimeout(timer);
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

        {/* Headline — word-reveal animation */}
        <h1
          className="t-display"
          style={{ maxWidth: '16ch', margin: '0 0 40px' }}
        >
          {headlineWords.map((word, idx) => {
            const isAccent = idx >= plainCount;
            // First word of accent group gets margin-left to break onto new line
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
