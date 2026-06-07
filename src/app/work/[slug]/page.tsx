'use client';

import { use, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, ArrowRight, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/nauka/Header';
import { Footer } from '@/components/nauka/Footer';

/**
 * CaseStudyDetailPage — Nauka Motion
 *
 * Dynamic case study detail page for each portfolio project.
 * Structure: Hero (dark) → Project Image → Description → Features → Back link → CTA
 * All text in Bahasa Indonesia.
 */

/* ━━ Project Data ━━ */
const projectsData: Record<
  string,
  {
    name: string;
    category: string;
    image: string;
    description: string;
    features: string[];
    color: string;
  }
> = {
  mitsubishi: {
    name: 'Mitsubishi Solusi Mobil',
    category: 'Landing Page',
    image: '/portfolio/mitsubishi.png',
    description:
      'Website dealer Mitsubishi dengan katalog unit, simulasi kredit, dan lead management.',
    features: [
      'Katalog unit interaktif',
      'Simulasi kredit',
      'Integrasi WhatsApp',
      'SEO lokal',
    ],
    color: '#0d9488',
  },
  geely: {
    name: 'Geely Pluit Motor',
    category: 'Landing Page',
    image: '/portfolio/geely-pluit.png',
    description:
      'Website dealer Geely dengan desain modern dan pengalaman digital premium.',
    features: [
      'Desain premium',
      'Katalog digital',
      'Chat integration',
      'Mobile-first',
    ],
    color: '#2563eb',
  },
  jasaprotect: {
    name: 'Jasa Protect',
    category: 'Website Profesional',
    image: '/portfolio/jasaprotect.png',
    description:
      'Website perusahaan proteksi kendaraan dengan informasi layanan lengkap dan booking system.',
    features: [
      'Booking system',
      'Informasi layanan',
      'Testimonial',
      'Responsive design',
    ],
    color: '#6366f1',
  },
  naukagadget: {
    name: 'Nauka Gadget',
    category: 'E-Commerce',
    image: '/portfolio/nauka-gadget.png',
    description:
      'Platform e-commerce gadget dengan sistem inventory dan checkout terintegrasi.',
    features: [
      'Product catalog',
      'Shopping cart',
      'Payment gateway',
      'Admin dashboard',
    ],
    color: '#8b5cf6',
  },
  'nauka-kostay': {
    name: 'Nauka Kostay',
    category: 'Sistem Bisnis',
    image: '/portfolio/nauka-kostay.png',
    description:
      'Sistem manajemen kost dengan booking, pembayaran, dan pengelolaan unit.',
    features: [
      'Booking management',
      'Payment tracking',
      'Unit management',
      'Tenant portal',
    ],
    color: '#d97706',
  },
  ghazy: {
    name: 'Ghazy Computer',
    category: 'Website Profesional',
    image: '/portfolio/ghazy-computer.png',
    description:
      'Website toko komputer dengan katalog produk dan layanan service.',
    features: [
      'Product catalog',
      'Service booking',
      'WhatsApp integration',
      'SEO',
    ],
    color: '#e11d48',
  },
};

/* ━━ Page Component ━━ */
export default function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const project = projectsData[slug];

  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // IntersectionObserver for scroll-reveal
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    const revealElements = (root: Element | null, selector: string) => {
      if (!root) return undefined;
      const elements = root.querySelectorAll(selector);
      if (elements.length === 0) return undefined;

      if (prefersReducedMotion) {
        elements.forEach((el) => el.classList.add('scroll-revealed'));
        return undefined;
      }

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('scroll-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      elements.forEach((el) => observer.observe(el));
      return observer;
    };

    const observers: (IntersectionObserver | undefined)[] = [];

    const heroObs = revealElements(heroRef.current, '.scroll-reveal');
    if (heroObs) observers.push(heroObs);

    const contentObs = revealElements(
      contentRef.current,
      '.scroll-reveal, .scroll-reveal-scale'
    );
    if (contentObs) observers.push(contentObs);

    const ctaObs = revealElements(
      ctaRef.current,
      '.scroll-reveal, .scroll-reveal-scale'
    );
    if (ctaObs) observers.push(ctaObs);

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, [slug]);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ━━ Hero — Dark ━━ */}
        <section
          ref={heroRef}
          className="bg-texture-deep text-white py-20 sm:py-28 lg:py-36"
        >
          <div className="container-wide">
            <div className="max-w-[680px]">
              {/* Back link */}
              <Link
                href="/work"
                className="scroll-reveal inline-flex items-center gap-2 text-body-sm text-white/50 hover:text-white transition-colors duration-300 mb-6 sm:mb-8"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Karya
              </Link>

              {/* Category badge */}
              <span
                className="scroll-reveal scroll-reveal-delay-1 text-caption font-medium uppercase tracking-[0.12em] px-2.5 py-1 rounded-md inline-block mb-5 sm:mb-6"
                style={{
                  backgroundColor: `${project.color}20`,
                  color: project.color,
                }}
              >
                {project.category}
              </span>

              {/* Project name */}
              <h1 className="scroll-reveal scroll-reveal-delay-2 text-display font-heading text-white">
                {project.name}
              </h1>
            </div>
          </div>
        </section>

        {/* ━━ Project Image ━━ */}
        <section className="bg-texture-primary py-10 sm:py-14 lg:py-20">
          <div ref={contentRef} className="container-wide">
            <div className="scroll-reveal-fade scroll-reveal relative aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden bg-[var(--nauka-bg-secondary)] border border-[var(--nauka-border)]">
              <Image
                src={project.image}
                alt={`${project.name} — ${project.category} by Nauka Motion`}
                fill
                sizes="(max-width: 1200px) 100vw, 1200px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
        </section>

        {/* ━━ Description & Features ━━ */}
        <section className="bg-texture-primary pb-14 sm:pb-20 lg:pb-28">
          <div className="container-narrow">
            {/* Description */}
            <div className="scroll-reveal mb-10 sm:mb-14">
              <p className="text-caption font-medium uppercase tracking-[0.2em] text-[var(--nauka-accent)] mb-4 sm:mb-5">
                Tentang Proyek
              </p>
              <p className="text-body-lg text-[var(--nauka-text-secondary)] leading-relaxed">
                {project.description}
              </p>
            </div>

            {/* Features */}
            <div className="scroll-reveal scroll-reveal-delay-1">
              <p className="text-caption font-medium uppercase tracking-[0.2em] text-[var(--nauka-accent)] mb-5 sm:mb-6">
                Fitur Utama
              </p>
              <ul className="space-y-3 sm:space-y-4">
                {project.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3 sm:gap-4">
                    <CheckCircle
                      className="w-5 h-5 sm:w-[22px] sm:h-[22px] text-[var(--nauka-accent)] flex-shrink-0 mt-0.5"
                      strokeWidth={1.5}
                    />
                    <span className="text-body text-[var(--nauka-text-primary)]">
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Back to work */}
            <div className="scroll-reveal scroll-reveal-delay-2 mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-[var(--nauka-border)]">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-body font-medium text-[var(--nauka-accent)] hover:text-[var(--nauka-accent-dark)] transition-colors duration-300 group"
              >
                <ArrowLeft className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" />
                Lihat Semua Karya
              </Link>
            </div>
          </div>
        </section>

        {/* ━━ CTA Section ━━ */}
        <section
          ref={ctaRef}
          className="bg-texture-secondary py-14 sm:py-20 lg:py-28"
        >
          <div className="container-narrow">
            <div className="scroll-reveal-scale bg-[var(--nauka-bg-deep)] rounded-2xl px-6 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24 text-center relative overflow-hidden">
              {/* Subtle glow effect */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-[var(--nauka-accent)]/5 rounded-full blur-3xl" />

              <h2 className="text-h1 font-heading text-white mb-4 sm:mb-6 relative z-10">
                Punya proyek serupa?
              </h2>
              <p className="text-body-lg text-white/60 mb-8 sm:mb-10 max-w-[480px] mx-auto relative z-10">
                Ceritakan kebutuhan Anda — kami siap membantu mewujudkan proyek
                digital yang berdampak nyata.
              </p>
              <div className="relative z-10 inline-block">
                <Button
                  asChild
                  size="lg"
                  className="nauka-cta-button bg-[var(--nauka-accent)] hover:bg-[var(--nauka-accent-dark)] text-white rounded-xl px-8 sm:px-10 py-3.5 sm:py-4 text-body font-semibold shadow-lg shadow-black/10"
                >
                  <Link href="/contact">
                    Mulai Diskusi
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
