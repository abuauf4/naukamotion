'use client';

import { useReveal } from '@/hooks/useReveal';
import Link from 'next/link';

/**
 * CTASection — simple contact section.
 * "Mari bicara." + WhatsApp + Email
 * No form (form lives at /contact if needed).
 */

export function CTASection() {
  const containerRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={containerRef}
      id="contact"
      style={{
        padding: '160px 0',
        textAlign: 'center',
        background: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
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
          <span className="t-caption">// Kontak</span>
          <span style={{ width: '24px', height: '1px', background: 'var(--accent)' }} />
        </div>

        {/* Title */}
        <h2 className="t-display" style={{ margin: '0 auto 24px', maxWidth: '14ch' }}>
          <span className="line-mask"><span className="line-inner">Mari bicara.</span></span>
        </h2>

        <p className="t-body-lg fade-up delay-2" style={{ maxWidth: '48ch', margin: '0 auto 48px' }}>
          Punya proyek, ide, atau venture yang mau dibangun? Langsung kontak — biasanya balas dalam 24 jam.
        </p>

        {/* Contact options */}
        <div
          className="fade-up delay-3"
          style={{
            display: 'inline-flex',
            gap: '14px',
            alignItems: 'center',
            flexWrap: 'wrap',
            justifyContent: 'center',
          }}
        >
          <a
            href="https://wa.me/6289662524542"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary"
          >
            <span>WhatsApp</span>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="mailto:naukamotion@gmail.com" className="btn-ghost">
            <span className="underline">naukamotion@gmail.com</span>
          </a>
        </div>
      </div>
    </section>
  );
}
