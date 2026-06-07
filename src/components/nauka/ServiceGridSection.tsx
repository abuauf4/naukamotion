'use client';

import { useRef, useEffect, useCallback, useState } from 'react';
import Link from 'next/link';
import { Globe, Database, LayoutDashboard, Car, Award, Compass, type LucideIcon } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Service {
  id: string;
  slug: string;
  title: string;
  summary: string;
  icon: string;
}

// Map icon names from DB to lucide components
const iconMap: Record<string, LucideIcon> = {
  Globe, Database, LayoutDashboard, Car, Award, Compass,
};

// Fallback data
const fallbackServices: Service[] = [
  { id: '1', slug: 'website-development', title: 'Website Development', summary: 'Website custom yang dibangun untuk kejelasan, kepercayaan, dan konversi. Dari profil bisnis sampai platform kompleks.', icon: 'Globe' },
  { id: '2', slug: 'business-system-development', title: 'Business System Development', summary: 'Internal tools, sistem inventaris, dan platform operasional yang merampingkan cara kerja bisnis Anda.', icon: 'Database' },
  { id: '3', slug: 'cms-platform', title: 'CMS Platform', summary: 'Website dengan content management yang memberikan tim kendali atas konten mereka sendiri tanpa bergantung pada developer.', icon: 'LayoutDashboard' },
  { id: '4', slug: 'automotive-sales-website', title: 'Automotive Sales Website', summary: 'Platform khusus untuk dealer otomotif yang menampilkan inventaris dengan motion, kejelasan, dan tujuan.', icon: 'Car' },
  { id: '5', slug: 'business-premium-website', title: 'Business Premium Website', summary: 'Kehadiran web profesional untuk bisnis jasa yang butuh otoritas, bukan sekadar estetika.', icon: 'Award' },
  { id: '6', slug: 'digital-experience-strategy', title: 'Digital Experience Strategy', summary: 'Panduan strategis tentang bagaimana produk digital seharusnya bekerja sebelum satu baris code pun ditulis.', icon: 'Compass' },
];

function TiltCard({ children, index }: { children: React.ReactNode; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const scrollRef = useScrollReveal();

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -6;
    const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * 6;
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  }, []);

  const handleMouseLeave = useCallback(() => {
    const card = cardRef.current;
    if (!card) return;
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
  }, []);

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const hasHover = window.matchMedia('(hover: hover)').matches;
    if (prefersReducedMotion || !hasHover) return;
    card.addEventListener('mousemove', handleMouseMove);
    card.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      card.removeEventListener('mousemove', handleMouseMove);
      card.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [handleMouseMove, handleMouseLeave]);

  const setRefs = useCallback((node: HTMLDivElement | null) => {
    cardRef.current = node;
    // @ts-expect-error - callback ref type mismatch
    scrollRef(node);
  }, [scrollRef]);

  return (
    <div
      ref={setRefs}
      className={`tilt-card nauka-service-card group bg-white border border-[var(--nauka-border)] rounded-xl p-5 sm:p-7 lg:p-9 scroll-reveal scroll-reveal-delay-${index + 1}`}
    >
      <div className="tilt-card-inner">
        {children}
      </div>
    </div>
  );
}

export function ServiceGridSection() {
  const headerRef = useScrollReveal();
  const [services, setServices] = useState<Service[]>(fallbackServices);

  useEffect(() => {
    fetch('/api/public/services')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setServices(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-primary">
      <div className="container-wide">
        <div ref={headerRef} className="max-w-[600px] mb-10 sm:mb-14 lg:mb-20 scroll-reveal">
          <p className="text-caption text-[var(--nauka-accent)] uppercase tracking-[0.2em] mb-3 sm:mb-4 font-medium">Layanan</p>
          <h2 className="text-h2 font-heading text-[var(--nauka-text-primary)] mb-3 sm:mb-4">
            Apa yang Kami Lakukan
          </h2>
          <p className="text-body-lg text-[var(--nauka-text-secondary)]">
            Belum punya gambaran? Kami bantu rancang. Udah ada rancangan? Kami wujudkan. Dari website sampai sistem bisnis — semua yang kami bangun dirancang untuk jelas, dipercaya, dan benar-benar digunakan.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {services.map((service, index) => {
            const Icon = iconMap[service.icon] || Globe;
            return (
              <TiltCard key={service.slug} index={index}>
                <div className="mb-5 sm:mb-6">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[var(--nauka-bg-secondary)] group-hover:bg-[var(--nauka-accent-glow)] transition-colors duration-300 flex items-center justify-center">
                    <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--nauka-text-secondary)] group-hover:text-[var(--nauka-accent)] transition-colors duration-300" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-h4 font-heading text-[var(--nauka-text-primary)] mb-2 sm:mb-3 group-hover:text-[var(--nauka-accent)] transition-colors duration-300">
                  {service.title}
                </h3>
                <p className="text-body-sm text-[var(--nauka-text-secondary)] mb-5 sm:mb-6 leading-relaxed">
                  {service.summary}
                </p>
                <Link
                  href={`/services/${service.slug}`}
                  className="text-body-sm font-medium text-[var(--nauka-text-tertiary)] group-hover:text-[var(--nauka-accent)] transition-colors duration-300 inline-flex items-center gap-1.5"
                >
                  Pelajari Lebih Lanjut
                  <span className="group-hover:translate-x-1 transition-transform duration-300" aria-hidden="true">→</span>
                </Link>
              </TiltCard>
            );
          })}
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <Link
            href="/services"
            className="text-body font-medium text-[var(--nauka-accent)] hover:text-[var(--nauka-accent-dark)] transition-colors duration-300 inline-flex items-center gap-2"
          >
            Semua Layanan
            <span aria-hidden="true">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
