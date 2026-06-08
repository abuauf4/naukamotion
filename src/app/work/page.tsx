'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/nauka/Header';
import { Footer } from '@/components/nauka/Footer';

/**
 * WorkPage — Nauka Motion Portfolio / Karya Listing
 *
 * Hero (dark) → Portfolio Grid (light, 2-col desktop / 1-col mobile) → CTA (accent)
 * Each card: image, project name, category badge, brief description, "Lihat Detail" link
 * Scroll-reveal via IntersectionObserver
 * Fetches projects from /api/public/projects
 */

interface WorkProject {
  id: string;
  slug: string;
  client: string;
  category: string;
  title: string;
  description: string;
  image: string | null;
  color: string;
}

export default function WorkPage() {
  const heroRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);
  const [projects, setProjects] = useState<WorkProject[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  // Fetch projects from API
  useEffect(() => {
    fetch('/api/public/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
        setDataLoaded(true);
      })
      .catch(() => {
        setDataLoaded(true);
      });
  }, []);

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

    const heroObs = revealElements(heroRef.current, '.scroll-reveal');
    if (heroObs) observers.push(heroObs);

    const gridObs = revealElements(gridRef.current, '.scroll-reveal');
    if (gridObs) observers.push(gridObs);

    const ctaObs = revealElements(ctaRef.current, '.scroll-reveal, .scroll-reveal-scale');
    if (ctaObs) observers.push(ctaObs);

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, [dataLoaded]);

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
                Portfolio
              </p>
              <h1 className="scroll-reveal scroll-reveal-delay-1 text-display font-heading text-white mb-5 sm:mb-7">
                Karya Kami
              </h1>
              <p className="scroll-reveal scroll-reveal-delay-2 text-body-lg text-white/55 max-w-[520px] leading-relaxed">
                Setiap proyek adalah cerita transformasi digital — dari ide yang belum terbentuk menjadi produk yang hidup dan memberikan dampak nyata.
              </p>
            </div>
          </div>
        </section>

        {/* ━━ Portfolio Grid — Light ━━ */}
        <section className="bg-texture-primary py-14 sm:py-20 lg:py-28">
          <div ref={gridRef} className="container-wide">
            {!dataLoaded ? (
              /* Loading skeleton */
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {[1,2,3,4].map((i) => (
                  <div key={i} className="rounded-xl bg-white border border-[var(--nauka-border)] overflow-hidden">
                    <div className="aspect-[16/9] bg-[var(--nauka-bg-secondary)] animate-pulse" />
                    <div className="p-5 sm:p-6">
                      <div className="h-4 w-28 bg-gray-100 rounded animate-pulse mb-3" />
                      <div className="h-6 w-48 bg-gray-100 rounded animate-pulse mb-2" />
                      <div className="h-4 w-full bg-gray-100 rounded animate-pulse mb-4" />
                      <div className="h-4 w-24 bg-gray-100 rounded animate-pulse" />
                    </div>
                  </div>
                ))}
              </div>
            ) : projects.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-body-lg text-[var(--nauka-text-secondary)]">Belum ada proyek yang dipublikasikan.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                {projects.map((project, index) => (
                  <Link
                    key={project.id}
                    href={`/work/${project.slug}`}
                    className={`scroll-reveal ${index % 2 === 1 ? 'scroll-reveal-delay-2' : 'scroll-reveal-delay-1'} group block rounded-xl bg-white border border-[var(--nauka-border)] overflow-hidden transition-all duration-400 ease-out hover:shadow-lg hover:shadow-black/[0.06] hover:-translate-y-1 hover:border-[var(--nauka-accent)]/20`}
                  >
                    {/* Image */}
                    <div className="relative aspect-[16/9] overflow-hidden bg-[var(--nauka-bg-secondary)]">
                      {project.image && (
                        <Image
                          src={project.image}
                          alt={`${project.client} — ${project.category} by Nauka Motion`}
                          fill
                          sizes="(max-width: 768px) 100vw, 50vw"
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        />
                      )}
                      {/* Gradient overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6">
                      {/* Category badge */}
                      <span
                        className="text-caption font-medium uppercase tracking-[0.12em] px-2.5 py-1 rounded-md inline-block mb-3"
                        style={{ backgroundColor: `${project.color}12`, color: project.color }}
                      >
                        {project.category}
                      </span>

                      {/* Project name */}
                      <h3 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-2 group-hover:text-[var(--nauka-accent-dark)] transition-colors duration-300">
                        {project.client}
                      </h3>

                      {/* Description */}
                      <p className="text-body-sm text-[var(--nauka-text-secondary)] leading-relaxed mb-4 line-clamp-3">
                        {project.description}
                      </p>

                      {/* Lihat Detail link */}
                      <span className="inline-flex items-center gap-1.5 text-body-sm font-medium text-[var(--nauka-accent)] group-hover:text-[var(--nauka-accent-dark)] transition-colors duration-300">
                        Lihat Detail
                        <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ━━ CTA Section ━━ */}
        <section ref={ctaRef} className="bg-texture-primary pb-14 sm:pb-20 lg:pb-28">
          <div className="container-narrow">
            <div className="scroll-reveal-scale bg-[var(--nauka-accent)] rounded-2xl px-6 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24 text-center relative overflow-hidden">
              {/* Subtle glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl" />

              <h2 className="text-h1 font-heading text-white mb-4 sm:mb-6 relative z-10">
                Punya proyek serupa?
              </h2>
              <p className="text-body-lg text-white/70 mb-8 sm:mb-10 max-w-[480px] mx-auto relative z-10">
                Kami siap membantu mewujudkan visi digital Anda. Mari diskusikan proyek berikutnya bersama.
              </p>
              <div className="inline-block relative z-10">
                <Button
                  asChild
                  size="lg"
                  className="nauka-cta-button bg-white text-[var(--nauka-accent-dark)] hover:bg-white/95 rounded-xl px-8 sm:px-10 py-3.5 sm:py-4 text-body font-semibold shadow-lg shadow-black/10"
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
