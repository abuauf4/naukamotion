'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowRight, Target, Hammer, Handshake, MapPin, TrendingUp, Briefcase } from 'lucide-react';
import { Header } from '@/components/nauka/Header';
import { Footer } from '@/components/nauka/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * About Page — "Tentang Kami"
 *
 * Sections: Hero → Story → Values → By the Numbers → CTA
 * All text in Bahasa Indonesia.
 * Dark hero, light body sections.
 * Scroll reveal via IntersectionObserver.
 */

/* ━━ Values Data ━━ */
const coreValues = [
  {
    icon: Target,
    title: 'Impact-First',
    body: 'Setiap keputusan diukur dari dampak nyata yang dihasilkan. Bukan sekadar tampilan, tapi hasil yang bisa dirasakan bisnis Anda.',
  },
  {
    icon: Hammer,
    title: 'Craft over Speed',
    body: 'Kami percaya kualitas tidak bisa dipercepat. Setiap baris kode, setiap interaksi, dirancang dengan teliti dan penuh pertimbangan.',
  },
  {
    icon: Handshake,
    title: 'Partnership',
    body: 'Kami bukan vendor — kami mitra. Keberhasilan proyek Anda adalah keberhasilan kami. Hubungan jangka panjang, bukan transaksi sekali jalan.',
  },
];

/* ━━ Stats Data ━━ */
const stats = [
  { value: '6', label: 'Proyek Selesai', icon: Briefcase },
  { value: '4', label: 'Industri', icon: TrendingUp },
  { value: 'Jakarta', label: 'Berbasis', icon: MapPin },
];

export default function AboutPage() {
  const [wordsRevealed, setWordsRevealed] = useState(false);

  // Word reveal on mount — same pattern as HeroSection
  useEffect(() => {
    const timer = setTimeout(() => setWordsRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const heroHeadline = ['Tentang', 'Nauka', 'Motion'];

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
              Small Movement. Real Impact.
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
              style={{ transitionDelay: '900ms' }}
            >
              Kami bukan sekadar studio web. Kami membangun produk digital yang mendorong pertumbuhan bisnis nyata — dari ide kecil, dampak besar.
            </p>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 2: Story — Editorial, personal
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <StorySection />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 3: Values — 3 core values
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <ValuesSection values={coreValues} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 4: By the Numbers — Stats
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <NumbersSection stats={stats} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 5: CTA — Ingin bekerja sama?
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <AboutCTASection />
      </main>

      <Footer />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Sub-components — each handles its own scroll reveal
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function StorySection() {
  const ref = useScrollReveal();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-primary">
      <div ref={ref} className="container-editorial scroll-reveal">
        {/* Section label */}
        <p className="text-caption font-medium uppercase tracking-[0.2em] text-[var(--nauka-accent)] mb-6 sm:mb-8">
          Cerita Kami
        </p>

        {/* Headline */}
        <h2 className="text-h1 font-heading text-[var(--nauka-text-primary)] mb-6 sm:mb-8">
          Dari sebuah ide kecil di Jakarta
        </h2>

        {/* Body — multi-paragraph editorial style */}
        <div className="space-y-5 sm:space-y-6">
          <p className="text-body-lg text-[var(--nauka-text-secondary)] leading-relaxed">
            Nauka Motion dimulai dari satu keyakinan sederhana: <strong className="text-[var(--nauka-text-primary)] font-medium">setiap proyek besar dimulai dari gerakan kecil.</strong> Didirikan oleh Abu Aufa — seorang web developer dan digital strategist yang berbasis di Jakarta — Nauka lahir dari pengalaman langsung melihat bagaimana bisnis seringkali kesulitan mengubah ide menjadi produk digital yang benar-benar berdampak.
          </p>

          <p className="text-body-lg text-[var(--nauka-text-secondary)] leading-relaxed">
            Filosofi <em className="text-[var(--nauka-text-primary)] not-italic font-medium">&quot;Small Movement. Real Impact.&quot;</em> bukan sekadar tagline. Ini adalah cara kami bekerja. Setiap proyek dimulai dari pemahaman mendalam tentang masalah yang ingin diselesaikan — bukan langsung ke desain atau kode. Kami percaya bahwa pergerakan kecil yang tepat sasaran menciptakan perubahan yang jauh lebih bermakna dibandingkan perubahan besar yang tidak terarah.
          </p>

          <p className="text-body-lg text-[var(--nauka-text-secondary)] leading-relaxed">
            Dari dealer otomotif, bisnis retail, hingga perusahaan jasa — kami telah melihat pola yang sama: bisnis tidak butuh sekadar website yang cantik. Mereka butuh <strong className="text-[var(--nauka-text-primary)] font-medium">produk digital yang mendorong pertumbuhan nyata</strong> — lebih banyak leads, proses lebih efisien, pengalaman pelanggan yang lebih baik.
          </p>

          <p className="text-body-lg text-[var(--nauka-text-secondary)] leading-relaxed">
            Itulah mengapa kami ada. Bukan untuk membangun website — tapi untuk membangun solusi digital yang membuat bisnis Anda bergerak maju.
          </p>
        </div>

        {/* Founder attribution */}
        <div className="mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[var(--nauka-border)]">
          <p className="text-body-sm text-[var(--nauka-text-tertiary)]">
            — Abu Aufa, Pendiri Nauka Motion
          </p>
        </div>
      </div>
    </section>
  );
}

interface ValueItem {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  body: string;
}

function ValuesSection({ values }: { values: ValueItem[] }) {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-secondary">
      <div ref={sectionRef} className="container-wide scroll-reveal">
        {/* Section label */}
        <p className="text-caption font-medium uppercase tracking-[0.2em] text-[var(--nauka-accent)] mb-4 sm:mb-5 text-center">
          Nilai-Nilai Kami
        </p>

        <h2 className="text-h2 font-heading text-[var(--nauka-text-primary)] mb-10 sm:mb-14 lg:mb-16 text-center max-w-[560px] mx-auto">
          Prinsip yang membimbing setiap keputusan
        </h2>

        {/* Values grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {values.map((value, idx) => (
            <ValueCard key={value.title} value={value} delay={idx + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ValueCard({ value, delay }: { value: ValueItem; delay: number }) {
  const ref = useScrollReveal();
  const Icon = value.icon;

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal-delay-${delay} nauka-service-card bg-white/80 border border-[var(--nauka-border)] rounded-xl p-6 sm:p-8`}
    >
      {/* Icon */}
      <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-[var(--nauka-accent)]/10 flex items-center justify-center mb-5 sm:mb-6">
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-[var(--nauka-accent)]" strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-3 sm:mb-4">
        {value.title}
      </h3>

      {/* Body */}
      <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed">
        {value.body}
      </p>
    </div>
  );
}

interface StatItem {
  value: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

function NumbersSection({ stats }: { stats: StatItem[] }) {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-primary">
      <div ref={sectionRef} className="container-wide scroll-reveal">
        {/* Section label */}
        <p className="text-caption font-medium uppercase tracking-[0.2em] text-[var(--nauka-accent)] mb-4 sm:mb-5 text-center">
          Dalam Angka
        </p>

        <h2 className="text-h2 font-heading text-[var(--nauka-text-primary)] mb-10 sm:mb-14 lg:mb-16 text-center max-w-[480px] mx-auto">
          Dampak yang bisa diukur
        </h2>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-[900px] mx-auto">
          {stats.map((stat, idx) => (
            <StatCard key={stat.label} stat={stat} delay={idx + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatCard({ stat, delay }: { stat: StatItem; delay: number }) {
  const ref = useScrollReveal();
  const Icon = stat.icon;

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal-delay-${delay} text-center py-8 sm:py-10 px-4 rounded-xl bg-white/60 border border-[var(--nauka-border)] nauka-service-card`}
    >
      <div className="flex justify-center mb-4 sm:mb-5">
        <div className="w-10 h-10 rounded-full bg-[var(--nauka-accent)]/10 flex items-center justify-center nauka-stat-icon">
          <Icon className="w-5 h-5 text-[var(--nauka-accent)]" strokeWidth={1.5} />
        </div>
      </div>
      <div className="text-signature text-[var(--nauka-text-primary)] mb-2 nauka-stat-item group">
        {stat.value}
      </div>
      <div className="text-caption text-[var(--nauka-text-tertiary)] uppercase tracking-wider">
        {stat.label}
      </div>
    </div>
  );
}

function AboutCTASection() {
  const cardRef = useScrollReveal();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-secondary">
      <div className="container-narrow">
        <div ref={cardRef} className="bg-[var(--nauka-bg-deep)] rounded-2xl px-6 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24 text-center scroll-reveal-scale relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-[var(--nauka-accent)]/5 rounded-full blur-3xl" />

          {/* Headline */}
          <h2 className="text-h1 font-heading text-white mb-4 sm:mb-6 relative z-10">
            Ingin bekerja sama?
          </h2>

          {/* Subtitle */}
          <p className="text-body-lg text-white/60 mb-8 sm:mb-10 max-w-[480px] mx-auto relative z-10">
            Ceritakan proyek atau ide Anda — kami siap mendengarkan dan membantu mewujudkannya.
          </p>

          {/* CTA button */}
          <div className="relative z-10 inline-block">
            <Button
              asChild
              size="lg"
              className="nauka-cta-button bg-[var(--nauka-accent)] hover:bg-[var(--nauka-accent-dark)] text-white rounded-xl px-8 sm:px-10 py-3.5 sm:py-4 text-body font-semibold shadow-lg shadow-black/10"
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
  );
}
