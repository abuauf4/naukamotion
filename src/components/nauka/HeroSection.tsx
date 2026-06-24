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
      {/* Background pattern: ink stains + scattered code fragments */}
      <div className="hero-pattern" aria-hidden="true">
        <div className="hero-ink-stains" />
        <div className="hero-code-snippets">
          <span style={{ top: '14%', left: '6%', fontSize: '0.78rem', transform: 'rotate(-3deg)' }}>function tellStory()</span>
          <span style={{ top: '72%', left: '10%', fontSize: '0.7rem', transform: 'rotate(2deg)' }}>return system;</span>
          <span style={{ top: '22%', right: '8%', fontSize: '0.8rem', transform: 'rotate(4deg)' }}>const architect = true</span>
          <span style={{ top: '82%', right: '12%', fontSize: '0.65rem', transform: 'rotate(-2deg)' }}>await ship()</span>
          <span style={{ top: '46%', left: '4%', fontSize: '0.62rem', transform: 'rotate(-1deg)' }}>// ink &amp; code</span>
          <span style={{ top: '56%', right: '6%', fontSize: '0.72rem', transform: 'rotate(3deg)' }}>import {`{ story }`}</span>
          <span style={{ top: '38%', right: '4%', fontSize: '0.58rem', transform: 'rotate(-4deg)' }}>type Identity = Architect</span>
          <span style={{ top: '88%', left: '42%', fontSize: '0.6rem', transform: 'rotate(1deg)' }}>export default Abu</span>
        </div>
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

        /* ━━ Background pattern: ink stains + code fragments ━━ */
        .hero-pattern {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
          z-index: 0;
        }
        .hero-ink-stains {
          position: absolute;
          inset: 0;
          background:
            /* Warm red ink stain — top left */
            radial-gradient(ellipse 600px 400px at 12% 18%, var(--accent) 0%, transparent 65%),
            /* Warm gray ink stain — bottom right */
            radial-gradient(ellipse 700px 480px at 88% 82%, var(--ink-ghost) 0%, transparent 70%),
            /* Ink color stain — center, very subtle */
            radial-gradient(ellipse 800px 600px at 50% 50%, var(--ink) 0%, transparent 75%),
            /* Accent stain — bottom left, smaller */
            radial-gradient(ellipse 400px 300px at 8% 88%, var(--accent-soft) 0%, transparent 60%),
            /* Warm gray stain — top right, smaller */
            radial-gradient(ellipse 350px 280px at 92% 12%, var(--ink-faint) 0%, transparent 65%);
          opacity: 0.08;
          filter: blur(50px);
          -webkit-filter: blur(50px);
        }
        @media (min-width: 768px) {
          .hero-ink-stains { opacity: 0.1; }
        }
        :global([data-theme="dark"]) .hero-ink-stains {
          opacity: 0.15;
        }

        .hero-code-snippets {
          position: absolute;
          inset: 0;
        }
        .hero-code-snippets span {
          position: absolute;
          font-family: var(--font-jetbrains);
          color: var(--ink);
          opacity: 0.08;
          font-weight: 400;
          letter-spacing: -0.01em;
          white-space: nowrap;
          user-select: none;
          transition: opacity 800ms ease;
        }
        :global([data-theme="dark"]) .hero-code-snippets span {
          opacity: 0.12;
          color: var(--ink);
        }
        /* Mobile: hide some fragments to reduce clutter */
        @media (max-width: 767px) {
          .hero-code-snippets span:nth-child(4),
          .hero-code-snippets span:nth-child(7),
          .hero-code-snippets span:nth-child(8) {
            display: none;
          }
          .hero-code-snippets span {
            opacity: 0.06;
            font-size: 0.6rem !important;
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
