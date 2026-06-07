'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  Globe,
  Database,
  LayoutDashboard,
  Car,
  Sparkles,
  Lightbulb,
} from 'lucide-react';
import { Header } from '@/components/nauka/Header';
import { Footer } from '@/components/nauka/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * Services Overview Page — "Layanan Kami"
 *
 * Sections: Hero → Service Grid → CTA
 * All text in Bahasa Indonesia.
 * Dark hero, light body sections.
 * Scroll reveal via IntersectionObserver.
 */

/* ━━ Services Data ━━ */
const services = [
  {
    icon: Globe,
    title: 'Website Development',
    slug: 'website-development',
    description:
      'Website perusahaan yang dirancang untuk membangun kepercayaan dan mengkonversi pengunjung menjadi pelanggan',
  },
  {
    icon: Database,
    title: 'Business System Development',
    slug: 'business-system-development',
    description:
      'Sistem internal yang mengotomasi proses bisnis, mengurangi pekerjaan manual, dan meningkatkan efisiensi operasional',
  },
  {
    icon: LayoutDashboard,
    title: 'CMS Platform',
    slug: 'cms-platform',
    description:
      'Platform manajemen konten yang memungkinkan tim Anda mengelola dan memperbarui konten tanpa bantuan teknis',
  },
  {
    icon: Car,
    title: 'Automotive Sales Website',
    slug: 'automotive-sales-website',
    description:
      'Website dealer mobil dengan katalog unit, simulasi kredit, dan sistem lead management terintegrasi',
  },
  {
    icon: Sparkles,
    title: 'Business Premium Website',
    slug: 'business-premium-website',
    description:
      'Website premium dengan desain kustom, animasi signature, dan pengalaman digital yang mengesankan',
  },
  {
    icon: Lightbulb,
    title: 'Digital Experience Strategy',
    slug: 'digital-experience-strategy',
    description:
      'Konsultasi strategi digital untuk memastikan investasi teknologi Anda menghasilkan dampak bisnis yang terukur',
  },
];

export default function ServicesPage() {
  const [wordsRevealed, setWordsRevealed] = useState(false);

  // Word reveal on mount
  useEffect(() => {
    const timer = setTimeout(() => setWordsRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const heroHeadline = ['Layanan', 'Kami'];

  let wordIndex = 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 1: Hero — Dark, confident
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="relative min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh] flex items-center overflow-hidden bg-texture-deep">
          {/* Subtle grid overlay */}
          <div
            className="absolute inset-0 z-0 opacity-30"
            style={{
              backgroundImage: `
                linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
                linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />

          <div className="relative z-10 container-wide w-full py-16 sm:py-24 lg:py-32">
            {/* Accent tag */}
            <p
              className={`text-caption font-medium uppercase tracking-[0.3em] text-[var(--nauka-accent-light)] mb-5 sm:mb-7 transition-all duration-700 ${
                wordsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '100ms' }}
            >
              Solusi Digital untuk Bisnis
            </p>

            {/* Headline */}
            <h1
              className="text-display font-heading text-white mb-6 sm:mb-8"
              style={{ perspective: '600px' }}
            >
              {heroHeadline.map((word) => {
                const idx = wordIndex++;
                return (
                  <span
                    key={word}
                    className={`word-reveal ${wordsRevealed ? 'revealed' : ''}`}
                    style={{ transitionDelay: `${300 + idx * 140}ms` }}
                  >
                    {word}{' '}
                  </span>
                );
              })}
            </h1>

            {/* Tagline */}
            <p
              className={`text-body-lg text-white/50 sm:text-white/55 max-w-[560px] leading-relaxed transition-all duration-700 ${
                wordsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '800ms' }}
            >
              Transformasi bisnis melalui solusi digital yang dirancang untuk menghasilkan dampak nyata — bukan sekadar tampilan.
            </p>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 2: Service Grid — 3 cols desktop, 1 mobile
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <ServiceGridSection services={services} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 3: CTA — Not sure which service?
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <ServicesCTASection />
      </main>

      <Footer />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Sub-components
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

interface ServiceItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  slug: string;
  description: string;
}

function ServiceGridSection({ services }: { services: ServiceItem[] }) {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-primary">
      <div ref={sectionRef} className="container-wide scroll-reveal">
        {/* Section label */}
        <p className="text-caption font-medium uppercase tracking-[0.2em] text-[var(--nauka-accent)] mb-4 sm:mb-5 text-center">
          Apa yang Kami Tawarkan
        </p>

        <h2 className="text-h2 font-heading text-[var(--nauka-text-primary)] mb-10 sm:mb-14 lg:mb-16 text-center max-w-[560px] mx-auto">
          Solusi digital yang dirancang untuk setiap kebutuhan bisnis
        </h2>

        {/* Service grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {services.map((service, idx) => (
            <ServiceCard key={service.slug} service={service} delay={idx + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, delay }: { service: ServiceItem; delay: number }) {
  const ref = useScrollReveal();
  const Icon = service.icon;

  return (
    <Link href={`/services/${service.slug}`}>
      <div
        ref={ref}
        className={`scroll-reveal scroll-reveal-delay-${delay} nauka-service-card bg-white/80 border border-[var(--nauka-border)] rounded-xl p-6 sm:p-8 h-full flex flex-col group cursor-pointer`}
      >
        {/* Icon */}
        <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[var(--nauka-accent)]/10 flex items-center justify-center mb-5 sm:mb-6 transition-colors duration-300 group-hover:bg-[var(--nauka-accent)]/20">
          <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--nauka-accent)]" strokeWidth={1.5} />
        </div>

        {/* Title */}
        <h3 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-3 sm:mb-4">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed flex-1 mb-5 sm:mb-6">
          {service.description}
        </p>

        {/* Learn more link */}
        <div className="flex items-center gap-1.5 text-[var(--nauka-accent)] text-body-sm font-medium group-hover:gap-2.5 transition-all duration-300">
          <span>Pelajari</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </div>
    </Link>
  );
}

function ServicesCTASection() {
  const cardRef = useScrollReveal();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-secondary">
      <div className="container-narrow">
        <div ref={cardRef} className="bg-[var(--nauka-bg-deep)] rounded-2xl px-6 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24 text-center scroll-reveal-scale relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-[var(--nauka-accent)]/5 rounded-full blur-3xl" />

          {/* Headline */}
          <h2 className="text-h1 font-heading text-white mb-4 sm:mb-6 relative z-10">
            Tidak yakin layanan mana yang tepat?
          </h2>

          {/* Subtitle */}
          <p className="text-body-lg text-white/60 mb-8 sm:mb-10 max-w-[480px] mx-auto relative z-10">
            Ceritakan kebutuhan bisnis Anda — kami akan membantu menemukan solusi digital yang paling sesuai.
          </p>

          {/* CTA button */}
          <div className="relative z-10 inline-block">
            <Button
              asChild
              size="lg"
              className="nauka-cta-button bg-[var(--nauka-accent)] hover:bg-[var(--nauka-accent-dark)] text-white rounded-xl px-8 sm:px-10 py-3.5 sm:py-4 text-body font-semibold shadow-lg shadow-black/10"
            >
              <Link href="/contact">
                Konsultasi Gratis
                <ArrowRight className="ml-2 w-4 h-4" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
