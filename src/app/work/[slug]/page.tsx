'use client';

import { use, useEffect, useRef, useState } from 'react';
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
 * Fetches project data from /api/public/projects
 */

interface ProjectDetail {
  id: string;
  slug: string;
  client: string;
  category: string;
  title: string;
  description: string;
  approach: string | null;
  liveUrl: string | null;
  image: string | null;
  color: string;
  featured: boolean;
}

/* ━━ Page Component ━━ */
export default function CaseStudyDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [project, setProject] = useState<ProjectDetail | null>(null);
  const [dataLoaded, setDataLoaded] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  // Fetch project from API
  useEffect(() => {
    fetch('/api/public/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          const found = data.find((p: ProjectDetail) => p.slug === slug);
          if (found) {
            setProject(found);
          }
        }
        setDataLoaded(true);
      })
      .catch(() => {
        setDataLoaded(true);
      });
  }, [slug]);

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
  }, [dataLoaded, slug]);

  // Loading state
  if (!dataLoaded) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="bg-texture-deep text-white py-20 sm:py-28 lg:py-36">
            <div className="container-wide">
              <div className="max-w-[680px]">
                <div className="h-4 w-32 bg-white/5 rounded animate-pulse mb-6 sm:mb-8" />
                <div className="h-6 w-36 bg-white/5 rounded animate-pulse mb-5 sm:mb-6" />
                <div className="h-12 w-72 bg-white/5 rounded animate-pulse" />
              </div>
            </div>
          </section>
          <section className="bg-texture-primary py-10 sm:py-14 lg:py-20">
            <div className="container-wide">
              <div className="relative aspect-[16/9] sm:aspect-[2/1] rounded-2xl bg-[var(--nauka-bg-secondary)] animate-pulse" />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

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
                className="scroll-reveal inline-flex items gap-2 text-body-sm text-white/50 hover:text-white transition-colors duration-300 mb-6 sm:mb-8"
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
                {project.client}
              </h1>
            </div>
          </div>
        </section>

        {/* ━━ Project Image ━━ */}
        <section className="bg-texture-primary py-10 sm:py-14 lg:py-20">
          <div ref={contentRef} className="container-wide">
            <div className="scroll-reveal-fade scroll-reveal relative aspect-[16/9] sm:aspect-[2/1] rounded-2xl overflow-hidden bg-[var(--nauka-bg-secondary)] border border-[var(--nauka-border)]">
              {project.image && (
                <Image
                  src={project.image}
                  alt={`${project.client} — ${project.category} by Nauka Motion`}
                  fill
                  sizes="(max-width: 1200px) 100vw, 1200px"
                  className="object-cover object-top"
                  priority
                />
              )}
            </div>
          </div>
        </section>

        {/* ━━ Description & Approach ━━ */}
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

            {/* Approach (if available) */}
            {project.approach && (
              <div className="scroll-reveal scroll-reveal-delay-1 mb-10 sm:mb-14">
                <p className="text-caption font-medium uppercase tracking-[0.2em] text-[var(--nauka-accent)] mb-4 sm:mb-5">
                  Pendekatan Kami
                </p>
                <p className="text-body-lg text-[var(--nauka-text-secondary)] leading-relaxed">
                  {project.approach}
                </p>
              </div>
            )}

            {/* Live URL */}
            {project.liveUrl && (
              <div className="scroll-reveal scroll-reveal-delay-1 mb-10 sm:mb-14">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-body font-medium text-[var(--nauka-accent)] hover:text-[var(--nauka-accent-dark)] transition-colors duration-300"
                >
                  Lihat Website Live
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            )}

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
