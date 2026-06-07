'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { ArrowRight, ArrowLeft, ExternalLink } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Project {
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

// Fallback data
const fallbackProjects: Project[] = [
  {
    id: 'mitsubishi', slug: 'mitsubishi', client: 'Mitsubishi Motor Indonesia',
    category: 'Website Profesional', title: 'Website Dealer yang Menjual Mobil Sebelum Test Drive',
    description: 'Dealer Mitsubishi butuh lebih dari sekadar katalog digital. Mereka butuh platform yang memperlakukan setiap kendaraan sebagai pengalaman — dari spesifikasi teknis sampai jadwal test drive, semua dalam satu alur yang mengalir.',
    approach: 'Inventaris real-time, perbandingan model, kalkulasi kredit, dan jalur langsung ke sales consultant. Setiap halaman dirancang untuk memperkecil jarak antara minat dan keputusan.',
    liveUrl: 'https://mitsubishi-test.vercel.app', image: '/portfolio/mitsubishi.png', color: '#0d9488', featured: true,
  },
  {
    id: 'geely', slug: 'geely-pluit', client: 'Geely Pluit',
    category: 'Website Profesional', title: 'Dealer Listrik yang Menjual Masa Depan, Bukan Sekadar Mobil',
    description: 'Geely masuk Indonesia sebagai brand EV. Mereka butuh kehadiran digital yang terasa sama modern-nya dengan teknologi yang mereka jual — bukan website dealer konvensional yang terasa 2018.',
    approach: 'Custom domain dengan branding yang konsisten, perbandingan model EV, estimasi jarak tempuh, fast-charging info, dan jalur konsultasi sales yang seamless.',
    liveUrl: 'https://elgeelypluit.id', image: '/portfolio/geely-pluit.png', color: '#2563eb', featured: true,
  },
  {
    id: 'jasaprotect', slug: 'jasaprotect', client: 'JasaProtect',
    category: 'Landing Page', title: 'Platform Asuransi yang Bikin Orang Ngerti Apa yang Mereka Beli',
    description: 'Asuransi itu kompleks — terlalu banyak pilihan, terlalu banyak istilah, terlalu sedikit kejelasan. JasaProtect hadir sebagai broker yang membuat memilih asuransi terasa mudah, bukan membingungkan.',
    approach: 'Interface perbandingan transparan, penjelasan dalam bahasa sehari-hari, dan alur pemilihan terpandu. Mengurangi kelelahan keputusan sekaligus menghormati kecerdasan pengguna.',
    liveUrl: 'https://jasa-proteksi.vercel.app', image: '/portfolio/jasaprotect.png', color: '#6366f1', featured: false,
  },
  {
    id: 'naukagadget', slug: 'nauka-gadget', client: 'Nauka Gadget',
    category: 'E-Commerce', title: 'Toko Gadget yang Terasa Premium, Bukan Marketplace Murahan',
    description: 'Jual gadget di marketplace itu gampang — tapi margin tipis dan brand tidak terbangun. Nauka Gadget butuh toko online sendiri yang bikin customer merasa belanja di tempat resmi, bukan lapak abu-abu.',
    approach: 'E-commerce dengan desain premium, katalog terorganisir, garansi resmi, dan checkout yang ga bikin orang kabur.',
    liveUrl: 'https://naukagadget.vercel.app', image: '/portfolio/nauka-gadget.png', color: '#8b5cf6', featured: false,
  },
  {
    id: 'nauka-kostay', slug: 'nauka-kostay', client: 'Nauka Kostay',
    category: 'Website Profesional', title: 'Kos yang Dipesan Seperti Hotel — Karena Penghuni Layak Dapat Yang Terbaik',
    description: 'Kost itu bisnis, tapi penghuninya manusia. Kostay butuh kehadiran digital yang bikin calon penghuni merasa dihargai — bukan sekadar lihat foto kamar dan harga.',
    approach: 'Digital hospitality experience: virtual tour, fasilitas yang ditampilkan dengan pride, testimoni penghuni, dan booking flow yang bikin orang merasa sedang check-in hotel.',
    liveUrl: 'https://nauka-kostay.vercel.app', image: '/portfolio/nauka-kostay.png', color: '#d97706', featured: false,
  },
  {
    id: 'ghazy', slug: 'ghazy', client: 'Ghazy Computer',
    category: 'Sistem Inventory', title: 'Dari Spreadsheet Chaos ke Sistem yang Jalan Sendiri',
    description: 'Bisnis buyback laptop yang berkembang tenggelam dalam spreadsheet. Mereka butuh sistem yang bisa menangani penawaran, tracking barang, pickup, dan pembayaran — tanpa harus buka 10 tab Excel.',
    approach: 'Web app dengan flow submit barang → evaluasi → penawaran harga → pickup → pembayaran. Semua terlacak, terorganisir, dan bisa diakses dari mana saja.',
    liveUrl: 'https://ghazycomputer.com', image: '/portfolio/ghazy-computer.png', color: '#e11d48', featured: true,
  },
];

export function CaseStudySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useScrollReveal();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [projects, setProjects] = useState<Project[]>(fallbackProjects);

  // Fetch projects from API
  useEffect(() => {
    fetch('/api/public/projects')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setProjects(data);
        }
      })
      .catch(() => {});
  }, []);

  const totalSlides = projects.length;
  const progress = totalSlides > 0 ? ((currentIndex + 1) / totalSlides) * 100 : 0;

  const goToSlide = useCallback((index: number) => {
    const clamped = Math.max(0, Math.min(index, totalSlides - 1));
    setCurrentIndex(clamped);
  }, [totalSlides]);

  const nextSlide = useCallback(() => goToSlide(currentIndex + 1), [currentIndex, goToSlide]);
  const prevSlide = useCallback(() => goToSlide(currentIndex - 1), [currentIndex, goToSlide]);

  // Wheel navigation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    let scrollCooldown = false;

    const handleWheel = (e: WheelEvent) => {
      if (scrollCooldown) return;
      if (Math.abs(e.deltaY) > 30) {
        e.preventDefault();
        scrollCooldown = true;
        if (e.deltaY > 0) nextSlide();
        else prevSlide();
        setTimeout(() => { scrollCooldown = false; }, 800);
      }
    };

    section.addEventListener('wheel', handleWheel, { passive: false });
    return () => section.removeEventListener('wheel', handleWheel);
  }, [nextSlide, prevSlide]);

  // Drag/touch navigation
  const handleDragStart = (clientX: number) => { setIsDragging(true); setStartX(clientX); setDragOffset(0); };
  const handleDragMove = (clientX: number) => { if (!isDragging) return; setDragOffset(clientX - startX); };
  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    if (dragOffset < -60) nextSlide();
    else if (dragOffset > 60) prevSlide();
    setDragOffset(0);
  };

  const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
  const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
  const onTouchEnd = () => handleDragEnd();
  const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
  const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
  const onMouseUp = () => handleDragEnd();
  const onMouseLeave = () => { if (isDragging) handleDragEnd(); };

  // Keyboard navigation
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') nextSlide();
      if (e.key === 'ArrowLeft') prevSlide();
    };
    section.addEventListener('keydown', handleKeyDown);
    return () => section.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  if (projects.length === 0) return null;

  const currentProject = projects[currentIndex];

  return (
    <section ref={sectionRef} className="bg-texture-deep text-white" tabIndex={0}>
      {/* Section header */}
      <div className="container-wide pt-14 sm:pt-20 lg:pt-28 pb-6 sm:pb-10">
        <div ref={headerRef} className="max-w-[600px] scroll-reveal">
          <p className="text-caption text-[var(--nauka-accent-light)] uppercase tracking-[0.2em] mb-3 sm:mb-4 font-medium">Karya Pilihan</p>
          <h2 className="text-h2 font-heading text-white mb-3 sm:mb-4">
            Proyek yang bicara sendiri.
          </h2>
        </div>
      </div>

      {/* Full-bleed poster showcase */}
      <div
        className="full-bleed-project"
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
      >
        {projects.map((project, idx) => (
          <div
            key={project.id}
            className="absolute inset-0 transition-all duration-700 ease-in-out"
            style={{
              opacity: currentIndex === idx ? 1 : 0,
              transform: currentIndex === idx
                ? `translateX(${dragOffset}px)`
                : currentIndex > idx
                  ? 'translateX(-8%)'
                  : 'translateX(8%)',
              zIndex: currentIndex === idx ? 1 : 0,
            }}
          >
            {/* Full-bleed image */}
            <div className="relative w-full h-full min-h-[60vh] sm:min-h-[70vh] lg:min-h-[80vh]">
              {project.image && (
                <Image
                  src={project.image}
                  alt={`${project.client} — ${project.category} by Nauka Motion`}
                  fill
                  sizes="100vw"
                  className="object-cover object-top"
                  priority={idx < 2}
                />
              )}

              {/* Dark gradient overlay at bottom for text */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />

              {/* Text overlay at bottom */}
              <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-10 lg:p-16">
                <div className="container-wide">
                  <span
                    className="text-caption font-medium uppercase tracking-[0.15em] px-2.5 py-1 rounded-md inline-block mb-3 sm:mb-4"
                    style={{ backgroundColor: `${project.color}20`, color: project.color }}
                  >
                    {project.category}
                  </span>

                  <h3 className="text-h1 sm:text-display font-heading text-white mb-3 sm:mb-4 leading-tight max-w-[800px]">
                    {project.title}
                  </h3>

                  <p className="text-body-lg text-white/70 max-w-[600px] leading-relaxed mb-4 sm:mb-6">
                    {project.description}
                  </p>

                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-body font-medium text-[var(--nauka-accent-light)] hover:text-white transition-colors inline-flex items-center gap-2"
                    >
                      Lihat Live
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation controls */}
      <div className="container-wide py-6 sm:py-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Proyek sebelumnya"
            >
              <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex === totalSlides - 1}
              className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Proyek berikutnya"
            >
              <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
            </button>
            <span className="text-caption text-white/40 ml-1 sm:ml-2">
              {currentIndex + 1} / {totalSlides}
            </span>
          </div>

          {/* Dot navigation */}
          <div className="hidden sm:flex items-center gap-2">
            {projects.map((project, i) => (
              <button
                key={project.id}
                onClick={() => goToSlide(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === currentIndex
                    ? 'bg-[var(--nauka-accent-light)] w-6'
                    : 'bg-white/20 hover:bg-white/40'
                }`}
                aria-label={`Proyek ${i + 1}: ${project.client}`}
              />
            ))}
          </div>

          {/* Progress bar */}
          <div className="scroll-progress w-20 sm:w-32 lg:w-48">
            <div className="scroll-progress-fill" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </section>
  );
}
