'use client';

import { useEffect, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';

/**
 * TestimonialSection — (Developer Theme)
 *
 * Single featured testimonial, large display. No carousel.
 * If multiple testimonials exist, picks the first featured one.
 */

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string | null;
  company: string;
  featured: boolean;
}

const fallbackTestimonial: Testimonial = {
  id: '1',
  quote: 'Hasilnya jauh melebihi ekspektasi kami. Website yang dibangun bukan cuma bagus dilihat, tapi benar-benar berfungsi untuk menarik dan mengkonversi pelanggan. Prosesnya juga transparan — kami tahu setiap langkah apa yang dikerjakan.',
  author: 'Rizky Pratama',
  role: 'Marketing Director',
  company: 'Geely Pluit',
  featured: true,
};

// Split quote into 4 lines for line-mask reveal
function splitQuote(quote: string): string[] {
  const words = quote.split(' ');
  const total = words.length;
  const perLine = Math.ceil(total / 4);
  const lines: string[] = [];
  for (let i = 0; i < total; i += perLine) {
    lines.push(words.slice(i, i + perLine).join(' '));
  }
  return lines.slice(0, 4);
}

export function TestimonialSection() {
  const containerRef = useReveal<HTMLDivElement>();
  const [testimonial, setTestimonial] = useState<Testimonial>(fallbackTestimonial);

  useEffect(() => {
    fetch('/api/public/testimonials')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          // Prefer featured testimonial
          const featured = data.find((t: Testimonial) => t.featured) || data[0];
          setTestimonial(featured);
        }
      })
      .catch(() => {});
  }, []);

  const lines = splitQuote(testimonial.quote);

  return (
    <section
      ref={containerRef}
      id="testimonial"
      style={{
        padding: '160px 0',
        background: 'var(--bg-soft)',
        transition: 'background 500ms var(--ease-soft)',
      }}
    >
      <div className="container-wide">
        <div style={{ maxWidth: '820px', margin: '0 auto', textAlign: 'left' }}>
          {/* Mark */}
          <span
            className="fade-up"
            style={{
              fontFamily: 'var(--font-instrument)',
              fontStyle: 'italic',
              fontSize: '3.5rem',
              lineHeight: 0.6,
              color: 'var(--accent)',
              margin: '0 0 24px',
              fontWeight: 400,
              display: 'block',
            }}
          >
            &ldquo;
          </span>

          {/* Quote with line-mask reveal */}
          <blockquote
            style={{
              fontFamily: 'var(--font-clash)',
              fontSize: 'clamp(1.5rem, 3vw, 2.25rem)',
              fontWeight: 500,
              lineHeight: 1.3,
              color: 'var(--ink)',
              margin: '0 0 48px',
              letterSpacing: '-0.025em',
              fontFeatureSettings: "var(--display-features)",
            }}
          >
            {lines.map((line, idx) => (
              <span key={idx} className={`line-mask ${idx > 0 ? `delay-${idx}` : ''}`}>
                <span className="line-inner">{line}</span>
              </span>
            ))}
          </blockquote>

          {/* Author */}
          <div className="fade-up delay-4" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--accent), var(--accent-soft))',
                flexShrink: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#fff',
                fontFamily: 'var(--font-clash)',
                fontWeight: 500,
                fontSize: '1.125rem',
                letterSpacing: '-0.02em',
              }}
            >
              {testimonial.author.charAt(0)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <span style={{ fontSize: '0.9375rem', fontWeight: 500, color: 'var(--ink)', letterSpacing: '-0.005em' }}>
                {testimonial.author}
              </span>
              <span style={{ fontFamily: 'var(--font-jetbrains)', fontSize: '0.75rem', color: 'var(--ink-faint)', letterSpacing: 0 }}>
                {testimonial.role ? `${testimonial.role} · ` : ''}{testimonial.company}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
