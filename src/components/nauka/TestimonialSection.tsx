'use client';

import { useEffect, useState, useCallback } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * TestimonialSection — Carousel
 *
 * Shows all testimonials in a carousel with navigation.
 * Featured testimonial shown first.
 * Clean design on light background.
 */

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string | null;
  company: string;
  featured: boolean;
}

const fallbackTestimonials: Testimonial[] = [
  {
    id: '1', quote: 'Hasilnya jauh melebihi ekspektasi kami. Website yang dibangun bukan cuma bagus dilihat, tapi benar-benar berfungsi untuk menarik dan mengkonversi pelanggan. Prosesnya juga transparan — kami tahu setiap langkah apa yang dikerjakan.',
    author: 'Rizky Pratama', role: 'Marketing Director', company: 'Geely Pluit', featured: true,
  },
  {
    id: '2', quote: 'Sistem inventaris yang dibangun Nauka Motion menghemat waktu operasional kami hingga 40%. Akhirnya kami punya data real-time tanpa harus input manual berkali-kali.',
    author: 'Ahmad Fauzi', role: null, company: 'Ghazy Computer', featured: false,
  },
  {
    id: '3', quote: 'Dari briefing sampai launch, komunikasinya jelas dan responsif. Kami butuh partner yang ngerti bisnis otomotif — dan mereka memahami kebutuhan dealer seperti kami.',
    author: 'Dewi Santika', role: null, company: 'Mitsubishi Serpong', featured: false,
  },
  {
    id: '4', quote: 'Kami udah coba beberapa vendor, tapi cuma Nauka Motion yang bener-bener ngerjain sampai tuntas. Website-nya clean, cepat, dan klien kami langsung percaya sejak pertama kali buka.',
    author: 'Irfan Hakim', role: null, company: 'JasaProtect', featured: false,
  },
];

export function TestimonialSection() {
  const mainQuoteRef = useScrollReveal();
  const [testimonials, setTestimonials] = useState<Testimonial[]>(fallbackTestimonials);

  useEffect(() => {
    fetch('/api/public/testimonials')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setTestimonials(data);
      })
      .catch(() => {});
  }, []);

  const [currentIndex, setCurrentIndex] = useState(0);

  // Reorder: featured first, then others
  const sortedTestimonials = testimonials.length > 0
    ? [
        ...testimonials.filter((t) => t.featured),
        ...testimonials.filter((t) => !t.featured),
      ]
    : [];

  const total = sortedTestimonials.length;
  const currentTestimonial = sortedTestimonials[currentIndex] || null;

  const goTo = useCallback((index: number) => {
    setCurrentIndex(((index % total) + total) % total);
  }, [total]);

  const goNext = useCallback(() => goTo(currentIndex + 1), [currentIndex, goTo]);
  const goPrev = useCallback(() => goTo(currentIndex - 1), [currentIndex, goTo]);

  // Auto-rotate every 6 seconds
  useEffect(() => {
    if (total <= 1) return;
    const timer = setInterval(goNext, 6000);
    return () => clearInterval(timer);
  }, [total, goNext]);

  if (!currentTestimonial) return null;

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-primary">
      <div className="container-narrow">
        <div ref={mainQuoteRef} className="text-center scroll-reveal">
          <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--nauka-accent)] mx-auto mb-6 sm:mb-8 opacity-30" strokeWidth={1.5} />

          <blockquote
            key={currentTestimonial.id}
            className="text-body-lg sm:text-[1.3125rem] text-[var(--nauka-text-primary)] leading-relaxed mb-8 sm:mb-10 max-w-[620px] mx-auto animate-[fadeIn_0.5s_ease-out]"
            style={{ lineHeight: '1.8' }}
          >
            &ldquo;{currentTestimonial.quote}&rdquo;
          </blockquote>

          <div key={`author-${currentTestimonial.id}`} className="animate-[fadeIn_0.5s_ease-out]">
            <div className="text-h4 font-heading text-[var(--nauka-text-primary)] mb-1">
              {currentTestimonial.author}
            </div>
            <div className="text-caption text-[var(--nauka-text-tertiary)]">
              {currentTestimonial.role ? `${currentTestimonial.role}, ` : ''}{currentTestimonial.company}
            </div>
          </div>

          {total > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6 sm:mt-8">
              <button
                onClick={goPrev}
                className="w-8 h-8 rounded-full border border-[var(--nauka-border)] flex items-center justify-center text-[var(--nauka-text-tertiary)] hover:text-[var(--nauka-accent)] hover:border-[var(--nauka-accent)] transition-colors"
                aria-label="Testimoni sebelumnya"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="flex gap-1.5">
                {sortedTestimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex
                        ? 'bg-[var(--nauka-accent)] w-5'
                        : 'bg-[var(--nauka-border)] hover:bg-[var(--nauka-text-tertiary)]'
                    }`
                    }
                    aria-label={`Testimoni ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={goNext}
                className="w-8 h-8 rounded-full border border-[var(--nauka-border)] flex items-center justify-center text-[var(--nauka-text-tertiary)] hover:text-[var(--nauka-accent)] hover:border-[var(--nauka-accent)] transition-colors"
                aria-label="Testimoni berikutnya"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
