'use client';

import { useEffect, useState, useRef } from 'react';
import { useReveal } from '@/hooks/useReveal';

/**
 * HeroSection — Ink & Code concept
 *
 * Phase 1 (0-1.5s): "Saya menulis cerita" appears typed letter-by-letter
 *   in Fraunces italic (ink mode), with red blinking cursor.
 * Phase 2 (1.5-2.2s): Pause, then fade out ink phrase.
 * Phase 3 (2.2s+): Swap to JetBrains Mono code syntax:
 *   function tellStory() {
 *     return system;
 *   }
 *   Cursor continues to blink briefly after morph, then fades.
 *
 * Identity bar: serif name + monospace role (two identities, one gesture).
 */

const INK_PHRASE = 'Saya menulis cerita';
const CODE_HTML = `<span class="code-text">function </span><span class="code-text code-name">tellStory</span><span class="code-text">() {<br>&nbsp;&nbsp;return </span><span class="code-text code-name">system</span><span class="code-text">;<br>}</span>`;

export function HeroSection() {
  const containerRef = useReveal<HTMLDivElement>();
  const [inkChars, setInkChars] = useState(0);
  const [phase, setPhase] = useState<'typing' | 'pause' | 'fadeout' | 'code'>('typing');
  const [cursorVisible, setCursorVisible] = useState(true);
  const morphRef = useRef<HTMLDivElement | null>(null);

  // Phase 1: type ink phrase letter by letter (55ms per char)
  useEffect(() => {
    if (phase !== 'typing') return;
    if (inkChars >= INK_PHRASE.length) {
      const t = setTimeout(() => setPhase('pause'), 700);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setInkChars((c) => c + 1), 55);
    return () => clearTimeout(t);
  }, [phase, inkChars]);

  // Phase 2: pause → fadeout → code
  useEffect(() => {
    if (phase !== 'pause') return;
    const t1 = setTimeout(() => setPhase('fadeout'), 700);
    return () => clearTimeout(t1);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'fadeout') return;
    const t = setTimeout(() => setPhase('code'), 500);
    return () => clearTimeout(t);
  }, [phase]);

  // Cursor blink stop 1.5s after morph to code
  useEffect(() => {
    if (phase !== 'code') return;
    const t = setTimeout(() => setCursorVisible(false), 1500);
    return () => clearTimeout(t);
  }, [phase]);

  return (
    <section ref={containerRef} className="hero-section">
      {/* Background pattern: scattered code words, no glow/lighting */}
      <div className="hero-code-words" aria-hidden="true">
        <span style={{ top: '12%', left: '5%', fontSize: '0.78rem', transform: 'rotate(-3deg)' }}>function</span>
        <span style={{ top: '20%', left: '15%', fontSize: '0.7rem', transform: 'rotate(2deg)' }}>tellStory</span>
        <span style={{ top: '28%', left: '7%', fontSize: '0.65rem', transform: 'rotate(-1deg)' }}>return</span>
        <span style={{ top: '68%', left: '8%', fontSize: '0.72rem', transform: 'rotate(1deg)' }}>system</span>
        <span style={{ top: '76%', left: '18%', fontSize: '0.6rem', transform: 'rotate(-2deg)' }}>const</span>
        <span style={{ top: '84%', left: '6%', fontSize: '0.68rem', transform: 'rotate(3deg)' }}>architect</span>
        <span style={{ top: '40%', left: '4%', fontSize: '0.58rem', transform: 'rotate(-4deg)' }}>import</span>
        <span style={{ top: '48%', left: '12%', fontSize: '0.62rem', transform: 'rotate(2deg)' }}>export</span>
        <span style={{ top: '56%', left: '5%', fontSize: '0.55rem', transform: 'rotate(-2deg)' }}>await</span>
        <span style={{ top: '88%', left: '32%', fontSize: '0.6rem', transform: 'rotate(1deg)' }}>default</span>

        <span style={{ top: '14%', right: '6%', fontSize: '0.8rem', transform: 'rotate(4deg)' }}>system</span>
        <span style={{ top: '22%', right: '14%', fontSize: '0.66rem', transform: 'rotate(-2deg)' }}>function</span>
        <span style={{ top: '30%', right: '8%', fontSize: '0.72rem', transform: 'rotate(3deg)' }}>story</span>
        <span style={{ top: '70%', right: '7%', fontSize: '0.6rem', transform: 'rotate(-3deg)' }}>return</span>
        <span style={{ top: '78%', right: '16%', fontSize: '0.68rem', transform: 'rotate(1deg)' }}>const</span>
        <span style={{ top: '86%', right: '8%', fontSize: '0.62rem', transform: 'rotate(-1deg)' }}>architect</span>
        <span style={{ top: '42%', right: '4%', fontSize: '0.58rem', transform: 'rotate(4deg)' }}>import</span>
        <span style={{ top: '50%', right: '10%', fontSize: '0.55rem', transform: 'rotate(-3deg)' }}>export</span>
        <span style={{ top: '58%', right: '5%', fontSize: '0.65rem', transform: 'rotate(2deg)' }}>await</span>
        <span style={{ top: '90%', right: '32%', fontSize: '0.6rem', transform: 'rotate(-1deg)' }}>default</span>
      </div>

      <div className="container-wide" style={{ position: 'relative', zIndex: 1 }}>
        {/* Eyebrow */}
        <div
          className="fade-up"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '2rem',
            fontFamily: 'var(--font-jetbrains)',
            fontSize: '0.75rem',
            letterSpacing: '0.12em',
            color: 'var(--accent)',
            textTransform: 'uppercase',
            fontWeight: 500,
          }}
        >
          <span style={{ opacity: 0.6 }}>//</span>
          <span>abuaufa.com — nauka motion</span>
        </div>

        {/* Morph line — the core gesture */}
        <div
          ref={morphRef}
          className={`morph-line ${phase === 'fadeout' ? 'fading' : ''} ${phase === 'code' ? 'is-code' : ''}`}
          style={{
            fontSize: 'clamp(2rem, 5.5vw, 4.2rem)',
            lineHeight: 1.25,
            maxWidth: '18ch',
            transition: 'opacity 0.5s ease',
            opacity: phase === 'fadeout' ? 0 : 1,
          }}
        >
          {phase === 'code' ? (
            <span dangerouslySetInnerHTML={{ __html: CODE_HTML }} />
          ) : (
            <>
              <span
                style={{
                  fontFamily: 'var(--font-fraunces), serif',
                  fontStyle: 'italic',
                  fontWeight: 400,
                  color: 'var(--ink)',
                }}
              >
                {INK_PHRASE.slice(0, inkChars)}
              </span>
            </>
          )}
          {cursorVisible && <span className="hero-cursor" />}
        </div>

        {/* Sub */}
        <p
          className="fade-up delay-4"
          style={{
            marginTop: '2.5rem',
            fontSize: '1.05rem',
            color: 'var(--ink-soft)',
            maxWidth: '34ch',
            lineHeight: 1.6,
            fontFamily: 'var(--font-body)',
          }}
        >
          Saya membangun sistem digital yang punya struktur kuat dan makna yang jelas — dari narasi sejarah hingga platform enterprise.
        </p>

        {/* Identity bar */}
        <div
          className="fade-up delay-5"
          style={{
            marginTop: '3rem',
            display: 'flex',
            alignItems: 'baseline',
            gap: '1rem',
            flexWrap: 'wrap',
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-fraunces), serif',
              fontSize: '1.15rem',
              fontWeight: 500,
              color: 'var(--ink)',
            }}
          >
            Abu Aufa
          </span>
          <span
            style={{
              width: '48px',
              height: '1px',
              background: 'var(--line)',
              display: 'inline-block',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-jetbrains)',
              fontSize: '0.78rem',
              color: 'var(--ink-faint)',
              letterSpacing: '0.02em',
            }}
          >
            Product Systems Architect &amp; Creative Director
          </span>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="fade-up delay-6"
        style={{
          position: 'absolute',
          bottom: '6vh',
          left: '8vw',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          fontFamily: 'var(--font-jetbrains)',
          fontSize: '0.7rem',
          color: 'var(--ink-faint)',
        }}
      >
        <span style={{ width: '24px', height: '1px', background: 'var(--ink-faint)' }} />
        <span>scroll</span>
      </div>

      <style jsx>{`
        .hero-section {
          min-height: 100svh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          position: relative;
          padding: 110px 8vw 60px;
        }
        @media (min-width: 768px) {
          .hero-section { padding: 130px 8vw 80px; }
        }

        /* ━━ Background: scattered code words (no glow, no blobs) ━━ */
        .hero-code-words {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .hero-code-words span {
          position: absolute;
          font-family: var(--font-jetbrains);
          color: var(--ink);
          opacity: 0.14;
          font-weight: 400;
          letter-spacing: -0.01em;
          white-space: nowrap;
          user-select: none;
        }
        :global([data-theme="dark"]) .hero-code-words span {
          opacity: 0.1;
        }
        /* Mobile: reduce count + opacity to keep clean */
        @media (max-width: 767px) {
          .hero-code-words span {
            opacity: 0.1;
            font-size: 0.55rem !important;
          }
          .hero-code-words span:nth-child(n+9) {
            display: none;
          }
        }

        .hero-cursor {
          display: inline-block;
          width: 2px;
          height: 1em;
          background: var(--accent);
          margin-left: 4px;
          vertical-align: text-bottom;
          animation: blink 1s step-end infinite;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
        .morph-line :global(.code-text) {
          font-family: var(--font-jetbrains);
          font-weight: 400;
          color: var(--code-gray);
          font-size: 0.62em;
          letter-spacing: -0.01em;
        }
        @media (max-width: 640px) {
          .morph-line :global(.code-text) {
            font-size: 0.72em;
          }
        }
        .morph-line :global(.code-name) {
          color: var(--accent);
        }
        @media (max-width: 640px) {
          :global(.hero-section) {
            padding-left: 24px !important;
            padding-right: 24px !important;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-cursor { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
