'use client';

import { useReveal } from '@/hooks/useReveal';
import Link from 'next/link';

/**
 * CTASection — (Developer Theme)
 *
 * Single statement CTA. No form (form lives at /contact page).
 * "Punya ide? Mari diskusikan." + primary button + email link.
 */

export function CTASection() {
  const containerRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={containerRef}
      id="cta"
      style={{
        padding: '180px 0',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--bg)',
      }}
    >
      <div className="container-narrow">
        {/* Eyebrow */}
        <div
          className="fade-up"
          style={{
            marginBottom: '32px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          <span style={{ width: '24px', height: '1px', background: 'var(--accent)' }} />
          <span className="t-caption">// Mari Memulai</span>
          <span style={{ width: '24px', height: '1px', background: 'var(--accent)' }} />
        </div>

        {/* Title */}
        <h2 className="t-display" style={{ margin: '0 auto 48px', maxWidth: '20ch' }}>
          <span className="line-mask"><span className="line-inner">Punya ide?</span></span>
          <span className="line-mask delay-1">
            <span className="line-inner">
              <span className="accent">Mari diskusikan.</span>
            </span>
          </span>
        </h2>

        {/* Actions */}
        <div
          className="fade-up delay-2"
          style={{
            display: 'inline-flex',
            gap: '14px',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <Link href="/contact" className="btn-primary">
            <span>Mulai Proyek</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
          <a href="mailto:naukamotion@gmail.com" className="btn-ghost">
            <span className="underline">naukamotion@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
