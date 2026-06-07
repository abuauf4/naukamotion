'use client';

import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * PhilosophySection — Cara Berpikir
 *
 * Replaces "About" concept with three guiding principles.
 * Clean, minimalist layout on light background.
 * Each principle gets a number in accent color.
 * Scroll-reveal animation.
 */

const principles = [
  {
    number: '01',
    title: 'Small Movement',
    description: 'Perubahan kecil yang tepat lebih berharga daripada perubahan besar yang tidak terarah.',
  },
  {
    number: '02',
    title: 'Real Impact',
    description: 'Kami fokus pada hasil yang benar-benar digunakan, bukan sekadar terlihat menarik.',
  },
  {
    number: '03',
    title: 'Build With Purpose',
    description: 'Setiap halaman, fitur, dan interaksi memiliki alasan untuk ada.',
  },
];

export function PhilosophySection() {
  const headerRef = useScrollReveal();
  const card1Ref = useScrollReveal();
  const card2Ref = useScrollReveal();
  const card3Ref = useScrollReveal();
  const cardRefs = [card1Ref, card2Ref, card3Ref];

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-primary">
      <div className="container-wide">
        {/* Section header */}
        <div ref={headerRef} className="max-w-[600px] mb-10 sm:mb-14 lg:mb-20 scroll-reveal">
          <p className="text-caption text-[var(--nauka-accent)] uppercase tracking-[0.2em] mb-3 sm:mb-4 font-medium">
            CARA BERPIKIR
          </p>
          <h2 className="text-h2 font-heading text-[var(--nauka-text-primary)]">
            Prinsip yang membimbing setiap keputusan kami.
          </h2>
        </div>

        {/* Principles grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12">
          {principles.map((principle, idx) => (
            <div
              key={principle.number}
              ref={cardRefs[idx]}
              className={`philosophy-card scroll-reveal scroll-reveal-delay-${idx + 1}`}
            >
              {/* Number */}
              <div className="text-signature text-[var(--nauka-accent)] mb-4 sm:mb-6">
                {principle.number}
              </div>

              {/* Title */}
              <h3 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-3 sm:mb-4">
                {principle.title}
              </h3>

              {/* Description */}
              <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed">
                {principle.description}
              </p>

              {/* Subtle bottom accent line */}
              <div
                className="mt-6 sm:mt-8 w-12 h-px transition-all duration-500 group-hover:w-20"
                style={{ backgroundColor: 'var(--nauka-accent)', opacity: 0.3 }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
