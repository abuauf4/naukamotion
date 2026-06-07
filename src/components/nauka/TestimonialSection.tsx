'use client';

import { useEffect, useState } from 'react';
import { Quote } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * TestimonialSection — Simplified
 *
 * One featured testimonial (large quote).
 * Clean design on light background.
 * Uses existing fallback testimonial data.
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

  const mainTestimonial = testimonials.find((t) => t.featured) || testimonials[0];

  if (!mainTestimonial) return null;

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-primary">
      <div className="container-narrow">
        <div ref={mainQuoteRef} className="text-center scroll-reveal">
          <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-[var(--nauka-accent)] mx-auto mb-6 sm:mb-8 opacity-30" strokeWidth={1.5} />

          <blockquote
            className="text-body-lg sm:text-[1.3125rem] text-[var(--nauka-text-primary)] leading-relaxed mb-8 sm:mb-10 max-w-[620px] mx-auto"
            style={{ lineHeight: '1.8' }}
          >
            &ldquo;{mainTestimonial.quote}&rdquo;
          </blockquote>

          <div>
            <div className="text-h4 font-heading text-[var(--nauka-text-primary)] mb-1">
              {mainTestimonial.author}
            </div>
            <div className="text-caption text-[var(--nauka-text-tertiary)]">
              {mainTestimonial.role ? `${mainTestimonial.role}, ` : ''}{mainTestimonial.company}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
