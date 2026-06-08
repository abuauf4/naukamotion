'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { ArrowRight, ArrowUpRight } from 'lucide-react';

/**
 * HeroSection — Nauka Motion Redesign
 *
 * Desktop: Text left + single crossfade image right (only 2 images rendered at a time)
 * Mobile: Horizontal scroll carousel below text
 * Word-reveal animation for headline
 * Fetches projects from /api/public/projects
 */

interface HeroProject {
  id: string;
  slug: string;
  client: string;
  image: string | null;
  color: string;
}

const defaultHeroProjects: HeroProject[] = [
  { id: 'mitsubishi', slug: 'mitsubishi', client: 'Mitsubishi', image: '/portfolio/mitsubishi.png', color: '#0d9488' },
  { id: 'geely', slug: 'geely-pluit', client: 'Geely', image: '/portfolio/geely-pluit.png', color: '#2563eb' },
  { id: 'jasaprotect', slug: 'jasaprotect', client: 'JasaProtect', image: '/portfolio/jasaprotect.png', color: '#6366f1' },
  { id: 'naukagadget', slug: 'nauka-gadget', client: 'Nauka Gadget', image: '/portfolio/nauka-gadget.png', color: '#8b5cf6' },
  { id: 'naukakostay', slug: 'nauka-kostay', client: 'Nauka Kostay', image: '/portfolio/nauka-kostay.png', color: '#d97706' },
  { id: 'ghazy', slug: 'ghazy', client: 'Ghazy Computer', image: '/portfolio/ghazy-computer.png', color: '#e11d48' },
];

interface SiteSettings {
  tagline?: string;
  headline?: string;
  subtitle?: string;
}

export function HeroSection() {
  const heroRef = useRef<HTMLElement>(null);
  const [wordsRevealed, setWordsRevealed] = useState(false);
  const [activeProject, setActiveProject] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [carouselScroll, setCarouselScroll] = useState(0);
  const [heroProjects, setHeroProjects] = useState<HeroProject[]>(defaultHeroProjects);
  const [settings, setSettings] = useState<SiteSettings>({});

  // Fetch projects and settings from API
  useEffect(() => {
    Promise.all([
      fetch('/api/public/projects').then(r => r.json()).catch(() => []),
      fetch('/api/public/settings').then(r => r.json()).catch(() => ({})),
    ]).then(([projectsData, settingsData]) => {
      if (Array.isArray(projectsData) && projectsData.length > 0) {
        setHeroProjects(projectsData.map((p: Record<string, unknown>) => ({
          id: p.id as string,
          slug: p.slug as string,
          client: p.client as string,
          image: p.image as string | null,
          color: p.color as string,
        })));
      }
      if (settingsData && typeof settingsData === 'object') {
        setSettings(settingsData);
      }
    });
  }, []);

  // Word reveal on mount
  useEffect(() => {
    const timer = setTimeout(() => setWordsRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Auto-rotate — slow and calm, 6 seconds
  useEffect(() => {
    if (isHovered) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const interval = setInterval(() => {
      setActiveProject((prev) => (prev + 1) % heroProjects.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isHovered, heroProjects.length]);

  const headlineText = settings.headline || 'Membangun Produk Digital Dengan Arah Yang Jelas';
  const headlineWords = headlineText.split(' ');
  const midPoint = Math.ceil(headlineWords.length / 2);
  let wordIndex = 0;

  // Mobile carousel drag
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!isDragging || !carouselRef.current) return;
    const delta = e.touches[0].clientX - dragStartX;
    carouselRef.current.scrollLeft = carouselScroll - delta;
  }, [isDragging, dragStartX, carouselScroll]);

  const handleTouchEnd = useCallback(() => {
    if (!carouselRef.current) return;
    setCarouselScroll(carouselRef.current.scrollLeft);
    setIsDragging(false);
  }, []);

  // Only render current + previous for smooth crossfade (no jarring stack)
  const visibleIndices = [activeProject, (activeProject - 1 + heroProjects.length) % heroProjects.length];

  return (
    <section ref={heroRef} className="relative min-h-[100dvh] sm:min-h-[90vh] lg:min-h-[100vh] flex items-center bg-black pt-14 sm:pt-16 lg:pt-20">
      {/* Background — solid black + cinematic layers */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255, 255, 255, 0.015) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255, 255, 255, 0.015) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        <div
          className="absolute inset-0 hidden lg:block"
          style={{
            background: 'radial-gradient(ellipse 35% 50% at 72% 50%, rgba(217, 164, 65, 0.04) 0%, rgba(217, 164, 65, 0.01) 50%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0 lg:hidden"
          style={{
            background: 'radial-gradient(ellipse 40% 35% at 50% 65%, rgba(217, 164, 65, 0.03) 0%, rgba(217, 164, 65, 0.008) 50%, transparent 100%)',
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 65% at 50% 50%, transparent 0%, rgba(0,0,0,0.35) 100%)',
          }}
        />
      </div>

      <div className="relative z-10 container-wide w-full py-8 sm:py-24 lg:py-0">
        {/* Desktop layout */}
        <div className="hidden lg:grid lg:grid-cols-12 gap-6 items-center">
          {/* Text side — 7 columns */}
          <div className="lg:col-span-7 max-w-[700px]">
            <p
              className={`text-caption font-medium uppercase tracking-[0.3em] text-[var(--nauka-accent-light)] mb-5 sm:mb-7 transition-all duration-700 ${wordsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '100ms' }}
            >
              {settings.tagline || 'Small Movement. Real Impact.'}
            </p>

            <h1 className="text-display font-heading text-white mb-6 sm:mb-8" style={{ perspective: '600px' }}>
              <span className="block">
                {headlineWords.slice(0, midPoint).map((word) => {
                  const idx = wordIndex++;
                  return (
                    <span
                      key={word + idx}
                      className={`word-reveal ${wordsRevealed ? 'revealed' : ''}`}
                      style={{ transitionDelay: `${300 + idx * 120}ms` }}
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </span>
              <span className="block">
                {headlineWords.slice(midPoint).map((word) => {
                  const idx = wordIndex++;
                  return (
                    <span
                      key={word + idx}
                      className={`word-reveal ${wordsRevealed ? 'revealed' : ''}`}
                      style={{ transitionDelay: `${300 + idx * 120}ms` }}
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </span>
            </h1>

            <p
              className={`text-body-lg text-white/70 sm:text-white/75 mb-8 sm:mb-10 max-w-[520px] leading-relaxed transition-all duration-700 ${wordsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '1100ms' }}
            >
              {settings.subtitle || 'Dari website bisnis, sistem operasional, hingga pengalaman digital yang membantu bisnis bertumbuh.'}
            </p>

            <div
              className={`flex flex-row gap-4 transition-all duration-700 ${wordsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '1300ms' }}
            >
              <Button
                asChild
                size="lg"
                className="magnetic-button bg-[var(--nauka-accent)] hover:bg-[var(--nauka-accent-dark)] text-white rounded-lg px-7 sm:px-8 py-3.5 sm:py-4 text-body font-medium h-auto"
              >
                <Link href="/contact">
                  Mulai Proyek
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/15 text-white/80 hover:bg-white/6 hover:text-white rounded-lg px-7 sm:px-8 py-3.5 sm:py-4 text-body font-medium backdrop-blur-sm h-auto"
              >
                <Link href="/work">
                  Lihat Karya
                  <ArrowUpRight className="ml-2 w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Project preview — 5 columns, desktop */}
          <div
            className="lg:col-span-5 flex items-center justify-center relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="project-preview-card relative w-full max-w-[420px] aspect-[16/9] overflow-hidden">
              {/* Only render current + previous slide for smooth crossfade */}
              {visibleIndices.map((idx) => (
                <div
                  key={heroProjects[idx]?.id || idx}
                  className="absolute inset-0"
                  style={{
                    opacity: activeProject === idx ? 1 : 0,
                    transition: 'opacity 2s ease-in-out',
                    zIndex: activeProject === idx ? 1 : 0,
                  }}
                >
                  {heroProjects[idx]?.image && (
                    <Image
                      src={heroProjects[idx].image}
                      alt={`${heroProjects[idx].client} — by Nauka Motion`}
                      fill
                      sizes="(max-width: 1024px) 100vw, 42vw"
                      className="object-cover object-top rounded-xl"
                      priority={idx < 2}
                    />
                  )}
                </div>
              ))}

              {/* Project name overlay on hover */}
              <div
                className={`absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 via-black/30 to-transparent rounded-b-xl transition-opacity duration-500 ${isHovered ? 'opacity-100' : 'opacity-0'}`}
              >
                <span
                  className="text-caption font-medium uppercase tracking-[0.15em] px-2.5 py-1 rounded-md"
                  style={{
                    backgroundColor: `${heroProjects[activeProject]?.color}30`,
                    color: heroProjects[activeProject]?.color,
                  }}
                >
                  {heroProjects[activeProject]?.client}
                </span>
              </div>

              {/* Subtle border glow */}
              <div className="absolute inset-0 rounded-xl border border-white/[0.06] pointer-events-none" />
            </div>

            {/* Navigation dots */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2">
              {heroProjects.map((project, i) => (
                <button
                  key={project.id}
                  onClick={() => setActiveProject(i)}
                  className={`w-2 h-2 rounded-full transition-all duration-500 ${
                    i === activeProject
                      ? 'w-6 bg-[var(--nauka-accent-light)]'
                      : 'bg-white/20 hover:bg-white/40'
                  }`}
                  aria-label={`Preview ${project.client}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Mobile layout: stacked, carousel below text */}
        <div className="lg:hidden">
          {/* Text */}
          <div className="max-w-[700px] mb-6">
            <p
              className={`text-caption font-medium uppercase tracking-[0.3em] text-[var(--nauka-accent-light)] mb-2 transition-all duration-700 ${wordsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '100ms' }}
            >
              {settings.tagline || 'Small Movement. Real Impact.'}
            </p>

            <h1 className="text-display font-heading text-white mb-3" style={{ perspective: '600px' }}>
              <span className="block">
                {headlineWords.slice(0, midPoint).map((word) => {
                  const idx = wordIndex++;
                  return (
                    <span
                      key={word + idx}
                      className={`word-reveal ${wordsRevealed ? 'revealed' : ''}`}
                      style={{ transitionDelay: `${300 + idx * 120}ms` }}
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </span>
              <span className="block">
                {headlineWords.slice(midPoint).map((word) => {
                  const idx = wordIndex++;
                  return (
                    <span
                      key={word + idx}
                      className={`word-reveal ${wordsRevealed ? 'revealed' : ''}`}
                      style={{ transitionDelay: `${300 + idx * 120}ms` }}
                    >
                      {word}{' '}
                    </span>
                  );
                })}
              </span>
            </h1>

            <p
              className={`text-body-lg text-white/70 mb-4 leading-relaxed transition-all duration-700 ${wordsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '1100ms' }}
            >
              {settings.subtitle || 'Dari website bisnis, sistem operasional, hingga pengalaman digital yang membantu bisnis bertumbuh.'}
            </p>

            <div
              className={`flex flex-row gap-3 transition-all duration-700 ${wordsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
              style={{ transitionDelay: '1300ms' }}
            >
              <Button
                asChild
                size="lg"
                className="magnetic-button bg-[var(--nauka-accent)] hover:bg-[var(--nauka-accent-dark)] text-white rounded-lg px-5 py-3 text-body-sm font-medium h-auto"
              >
                <Link href="/contact">
                  Mulai Proyek
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                size="lg"
                className="border-white/15 text-white/80 hover:bg-white/6 hover:text-white rounded-lg px-5 py-3 text-body-sm font-medium backdrop-blur-sm h-auto"
              >
                <Link href="/work">
                  Lihat Karya
                  <ArrowUpRight className="ml-2 w-3.5 h-3.5" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Horizontal scroll carousel — mobile */}
          <div
            ref={carouselRef}
            className="flex gap-3 overflow-x-auto pb-4 -mx-5 px-5 snap-x snap-mandatory scrollbar-hide"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {heroProjects.map((project) => (
              <div
                key={project.id}
                className="flex-shrink-0 w-[260px] aspect-[16/9] rounded-xl overflow-hidden relative snap-start"
              >
                {project.image && (
                  <Image
                    src={project.image}
                    alt={`${project.client} — by Nauka Motion`}
                    fill
                    sizes="260px"
                    className="object-cover object-top"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span
                    className="text-caption font-medium uppercase tracking-[0.15em] px-2 py-0.5 rounded-md backdrop-blur-sm"
                    style={{
                      backgroundColor: `${project.color}30`,
                      color: project.color,
                    }}
                  >
                    {project.client}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
