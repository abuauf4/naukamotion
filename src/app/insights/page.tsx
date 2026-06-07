'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/nauka/Header';
import { Footer } from '@/components/nauka/Footer';

/**
 * InsightsPage — Nauka Motion Wawasan / Blog Listing
 *
 * Hero (dark) → Article Grid (light, 3-col desktop / 1-col mobile) → CTA (accent)
 * Each card: category badge, title, excerpt, "Baca" link
 * Scroll-reveal via IntersectionObserver
 * All text in Bahasa Indonesia
 */

const articles = [
  {
    slug: 'why-trust-comes-before-promotion',
    title: 'Mengapa Kepercayaan Harus Datang Sebelum Promosi',
    excerpt:
      'Di era digital, promosi tanpa fondasi kepercayaan seperti membangun rumah di atas pasir. Pelajari mengapa membangun trust terlebih dahulu menghasilkan konversi yang lebih berkelanjutan.',
    category: 'Strategi Digital',
    color: '#0d9488',
  },
  {
    slug: 'websites-need-systems-not-just-pages',
    title: 'Website Butuh Sistem, Bukan Sekadar Halaman',
    excerpt:
      'Website yang hanya menampilkan informasi statis sudah tertinggal. Bisnis modern membutuhkan sistem terintegrasi yang bekerja otomatis dan memberikan data real-time.',
    category: 'Pengembangan Web',
    color: '#2563eb',
  },
  {
    slug: 'automotive-websites-motion-clarity',
    title: 'Website Otomotif: Gerak dan Kejelasan yang Menjual',
    excerpt:
      'Industri otomotif butuh lebih dari katalog digital. Desain yang mengutamakan gerakan visual dan kejelasan informasi mampu mengubah pengunjung menjadi calon pembeli.',
    category: 'Industri Otomotif',
    color: '#d97706',
  },
];

export default function InsightsPage() {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // IntersectionObserver for scroll-reveal
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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

    // Hero elements
    const heroObs = revealElements(heroRef.current, '.scroll-reveal');
    if (heroObs) observers.push(heroObs);

    // Grid cards
    const gridObs = revealElements(gridRef.current, '.scroll-reveal');
    if (gridObs) observers.push(gridObs);

    // CTA
    const ctaObs = revealElements(ctaRef.current, '.scroll-reveal, .scroll-reveal-scale');
    if (ctaObs) observers.push(ctaObs);

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

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
              <p className="scroll-reveal text-caption font-medium uppercase tracking-[0.2em] text-[var(--nauka-accent-light)] mb-4 sm:mb-5">
                Wawasan
              </p>
              <h1 className="scroll-reveal scroll-reveal-delay-1 text-display font-heading text-white mb-5 sm:mb-7">
                Wawasan
              </h1>
              <p className="scroll-reveal scroll-reveal-delay-2 text-body-lg text-white/55 max-w-[520px] leading-relaxed">
                Pemikiran tentang strategi digital, desain, dan pertumbuhan bisnis.
              </p>
            </div>
          </div>
        </section>

        {/* ━━ Article Grid — Light ━━ */}
        <section className="bg-texture-primary py-14 sm:py-20 lg:py-28">
          <div ref={gridRef} className="container-wide">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {articles.map((article, index) => (
                <article
                  key={article.slug}
                  className={`scroll-reveal scroll-reveal-delay-${index + 1} group bg-white border border-[var(--nauka-border)] rounded-xl overflow-hidden hover:shadow-lg hover:shadow-black/[0.06] hover:-translate-y-1 hover:border-[var(--nauka-accent)]/20 transition-all duration-400 ease-out`}
                >
                  {/* Top accent bar */}
                  <div
                    className="h-1 w-full"
                    style={{ backgroundColor: article.color }}
                  />

                  {/* Content */}
                  <div className="p-5 sm:p-6">
                    {/* Category badge */}
                    <span
                      className="text-caption font-medium uppercase tracking-[0.12em] px-2.5 py-1 rounded-md inline-block mb-4"
                      style={{ backgroundColor: `${article.color}12`, color: article.color }}
                    >
                      {article.category}
                    </span>

                    {/* Title */}
                    <h3 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-3 leading-snug group-hover:text-[var(--nauka-accent-dark)] transition-colors duration-300">
                      <Link href={`/insights/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="text-body-sm text-[var(--nauka-text-secondary)] leading-relaxed mb-5 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* "Baca" link */}
                    <Link
                      href={`/insights/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-body-sm font-medium text-[var(--nauka-accent)] group-hover:text-[var(--nauka-accent-dark)] transition-colors duration-300"
                    >
                      Baca
                      <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ━━ CTA Section ━━ */}
        <section ref={ctaRef} className="bg-texture-primary pb-14 sm:pb-20 lg:pb-28">
          <div className="container-narrow">
            <div className="scroll-reveal-scale bg-[var(--nauka-accent)] rounded-2xl px-6 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24 text-center relative overflow-hidden">
              {/* Subtle glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl" />

              <h2 className="text-h1 font-heading text-white mb-4 sm:mb-6 relative z-10">
                Punya pertanyaan tentang proyek Anda?
              </h2>
              <p className="text-body-lg text-white/70 mb-8 sm:mb-10 max-w-[480px] mx-auto relative z-10">
                Kami siap membantu menjawab pertanyaan dan menemukan solusi digital terbaik untuk kebutuhan bisnis Anda.
              </p>
              <div className="inline-block relative z-10">
                <Button
                  asChild
                  size="lg"
                  className="nauka-cta-button bg-white text-[var(--nauka-accent-dark)] hover:bg-white/95 rounded-xl px-8 sm:px-10 py-3.5 sm:py-4 text-body font-semibold shadow-lg shadow-black/10"
                >
                  <Link href="/contact">
                    Hubungi Kami
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
