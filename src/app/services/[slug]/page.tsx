'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import {
  ArrowRight,
  ArrowLeft,
  Globe,
  Database,
  LayoutDashboard,
  Car,
  Sparkles,
  Lightbulb,
  Check,
} from 'lucide-react';
import { Header } from '@/components/nauka/Header';
import { Footer } from '@/components/nauka/Footer';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * Service Detail Page — Dynamic route /services/[slug]
 *
 * Shows detailed content for each service based on slug.
 * All text in Bahasa Indonesia.
 * Dark hero, light body sections.
 * Scroll reveal via IntersectionObserver.
 *
 * Note: generateStaticParams is not compatible with 'use client'.
 * All 6 slugs are pre-defined in the servicesData object.
 */

/* ━━ Icon Map ━━ */
const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Database,
  LayoutDashboard,
  Car,
  Sparkles,
  Lightbulb,
};

/* ━━ Services Data ━━ */
const servicesData: Record<
  string,
  {
    title: string;
    subtitle: string;
    icon: string;
    features: string[];
    description: string[];
    relatedProjects: string[];
  }
> = {
  'website-development': {
    title: 'Website Development',
    subtitle: 'Website yang membangun kepercayaan dan mendorong konversi',
    icon: 'Globe',
    features: [
      'Desain responsif',
      'Optimasi SEO',
      'Integrasi analytics',
      'Kecepatan tinggi',
      'CMS friendly',
    ],
    description: [
      'Website perusahaan Anda adalah aset digital paling penting. Kami merancang website yang tidak hanya terlihat profesional, tetapi juga dirancang untuk membangun kepercayaan pengunjung dan mengkonversi mereka menjadi pelanggan.',
      'Setiap website yang kami bangun dimulai dengan pemahaman mendalam tentang audiens Anda — siapa mereka, apa yang mereka cari, dan bagaimana mereka membuat keputusan. Dari sana, kami merancang pengalaman yang memandu pengunjung melalui perjalanan yang jelas: dari menemukan Anda, memahami nilai yang Anda tawarkan, hingga mengambil tindakan.',
      'Performa adalah fondasi, bukan fitur tambahan. Website kami dioptimasi untuk kecepatan loading, aksesibilitas, dan SEO — memastikan bisnis Anda mudah ditemukan dan nyaman dijelajahi di perangkat apa pun.',
    ],
    relatedProjects: ['Mitsubishi Motor Indonesia', 'Geely Pluit', 'Nauka Kostay'],
  },
  'business-system-development': {
    title: 'Business System Development',
    subtitle: 'Otomasi proses bisnis untuk efisiensi operasional maksimal',
    icon: 'Database',
    features: [
      'Automasi proses',
      'Dashboard real-time',
      'Integrasi API',
      'Keamanan data',
      'Skalabel',
    ],
    description: [
      'Proses bisnis manual membuang waktu, menciptakan kesalahan, dan membatasi pertumbuhan. Kami membangun sistem internal yang mengotomasi alur kerja, mengurangi pekerjaan repetitif, dan memberikan visibilitas real-time ke seluruh operasional Anda.',
      'Setiap sistem dimulai dengan pemetaan proses yang ada — mengidentifikasi bottleneck, redundansi, dan peluang automasi. Kami tidak hanya membangun teknologi; kami memahami alur bisnis Anda terlebih dahulu sebelum menulis satu baris kode pun.',
      'Dari dashboard manajemen yang menampilkan KPI penting, integrasi dengan sistem yang sudah ada, hingga keamanan data berlapis — sistem kami dirancang untuk tumbuh bersama bisnis Anda, bukan menjadi penghambat.',
    ],
    relatedProjects: ['Ghazy Computer'],
  },
  'cms-platform': {
    title: 'CMS Platform',
    subtitle: 'Kelola konten tanpa bantuan teknis, kapan saja, di mana saja',
    icon: 'LayoutDashboard',
    features: [
      'Editor intuitif',
      'Multi-bahasa',
      'Media management',
      'User roles',
      'Backup otomatis',
    ],
    description: [
      'Konten yang tidak diperbarui adalah konten yang mati. Sayangnya, banyak tim pemasaran bergantung pada developer hanya untuk memperbarui halaman sederhana. Platform CMS kami mengubah itu — memberikan kendali penuh kepada tim Anda.',
      'Dengan editor visual yang intuitif, siapa pun di tim Anda bisa membuat, mengedit, dan mempublikasikan konten tanpa menyentuh kode. Sistem kami mendukung multi-bahasa, pengelolaan media terpusat, dan penjadwalan publikasi — semua dari satu dashboard.',
      'Keamanan dan keandalan bukan opsi, tapi standar. Setiap perubahan tersimpan dalam versi history, backup otomatis berjalan setiap hari, dan sistem permissions memastikan orang yang tepat memiliki akses yang tepat.',
    ],
    relatedProjects: ['Nauka Gadget', 'JasaProtect'],
  },
  'automotive-sales-website': {
    title: 'Automotive Sales Website',
    subtitle: 'Solusi digital untuk dealer mobil yang ingin menjual lebih banyak',
    icon: 'Car',
    features: [
      'Katalog unit',
      'Simulasi kredit',
      'Lead management',
      'Chat WhatsApp',
      'SEO lokal',
    ],
    description: [
      'Industri otomotif memiliki kebutuhan unik: katalog unit yang selalu terbaru, simulasi kredit yang akurat, dan sistem yang bisa menangkap leads sebelum kompetitor melakukannya. Website dealer kami dirancang khusus untuk kebutuhan ini.',
      'Katalog unit kami bukan sekadar daftar mobil. Setiap unit ditampilkan dengan foto berkualitas tinggi, spesifikasi lengkap, dan harga transparan — lengkap dengan simulasi kredit real-time yang membantu calon pembeli langsung melihat kemampuan finansial mereka.',
      'Lead management terintegrasi memastikan tidak ada calon pembeli yang terlewat. Setiap inquiry masuk langsung diteruskan ke tim sales, dengan notifikasi WhatsApp otomatis dan dashboard tracking yang menunjukkan status setiap lead.',
    ],
    relatedProjects: ['Mitsubishi Motor Indonesia', 'Geely Pluit'],
  },
  'business-premium-website': {
    title: 'Business Premium Website',
    subtitle: 'Pengalaman digital yang mengesankan dan sulit dilupakan',
    icon: 'Sparkles',
    features: [
      'Desain kustom',
      'Animasi signature',
      'Micro-interactions',
      'Performance A+',
      'Brand identity',
    ],
    description: [
      'Untuk bisnis yang ingin tampil di level yang berbeda. Website premium kami bukan template yang dimodifikasi — setiap piksel dirancang dari nol untuk merepresentasikan identitas brand Anda dengan cara yang paling mengesankan.',
      'Animasi signature dan micro-interactions yang cermat menciptakan pengalaman browsing yang terasa hidup dan berkarakter. Bukan animasi untuk pamer — tapi animasi yang melayani tujuan: memandu perhatian, memperkuat pesan, dan menciptakan kesan profesional yang melekat.',
      'Meskipun penuh detail visual, performa tetap menjadi prioritas utama. Kami mengoptimasi setiap aset, menerapkan lazy loading cerdas, dan memastikan skor Core Web Vitals tetap di level A+. Karena pengalaman yang indah tidak ada artinya jika pengunjung menunggu terlalu lama.',
    ],
    relatedProjects: ['Nauka Kostay', 'Geely Pluit'],
  },
  'digital-experience-strategy': {
    title: 'Digital Experience Strategy',
    subtitle: 'Strategi digital yang menghasilkan dampak bisnis terukur',
    icon: 'Lightbulb',
    features: [
      'Audit digital',
      'Roadmap teknologi',
      'UX research',
      'KPI tracking',
      'Rekomendasi stack',
    ],
    description: [
      'Investasi teknologi tanpa strategi yang jelas adalah pemborosan. Kami membantu bisnis memahami posisi digital mereka saat ini, mengidentifikasi peluang, dan menyusun roadmap yang memastikan setiap rupiah yang diinvestasikan menghasilkan dampak yang bisa diukur.',
      'Proses kami dimulai dengan audit digital komprehensif — mengevaluasi website, sistem, dan seluruh ekosistem digital Anda. Dari sana, kami mengidentifikasi gap, peluang optimasi, dan prioritas yang memberikan ROI tertinggi.',
      'Hasilnya bukan sekadar dokumen strategi yang berdebu di laci. Kami menyusun roadmap teknologi yang actionable, mendefinisikan KPI yang terukur, dan merekomendasikan technology stack yang tepat untuk kebutuhan unik bisnis Anda.',
    ],
    relatedProjects: ['Mitsubishi Motor Indonesia', 'Ghazy Computer', 'JasaProtect'],
  },
};

/* ━━ All slugs for static generation reference ━━ */
const allSlugs = Object.keys(servicesData);

export default function ServiceDetailPage() {
  const params = useParams();
  const slug = params.slug as string;
  const service = servicesData[slug];
  const [wordsRevealed, setWordsRevealed] = useState(false);

  // Word reveal on mount
  useEffect(() => {
    const timer = setTimeout(() => setWordsRevealed(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Fallback for invalid slug
  if (!service) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-texture-primary">
          <div className="text-center px-6">
            <h1 className="text-h1 font-heading text-[var(--nauka-text-primary)] mb-4">
              Layanan Tidak Ditemukan
            </h1>
            <p className="text-body-lg text-[var(--nauka-text-secondary)] mb-8">
              Maaf, layanan yang Anda cari tidak tersedia.
            </p>
            <Button
              asChild
              className="bg-[var(--nauka-accent)] hover:bg-[var(--nauka-accent-dark)] text-white rounded-xl px-6"
            >
              <Link href="/services">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Kembali ke Layanan
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const Icon = iconMap[service.icon] || Globe;
  const heroHeadline = service.title.split(' ');

  let wordIndex = 0;

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 1: Hero — Dark, with service icon & title
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <section className="relative min-h-[55vh] sm:min-h-[65vh] lg:min-h-[75vh] flex items-center overflow-hidden bg-texture-deep">
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
            {/* Back link */}
            <Link
              href="/services"
              className={`inline-flex items-center gap-1.5 text-body-sm text-white/40 hover:text-white/70 transition-colors duration-300 mb-8 sm:mb-10 ${
                wordsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              } transition-all duration-700`}
              style={{ transitionDelay: '100ms' }}
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              Semua Layanan
            </Link>

            {/* Service icon */}
            <div
              className={`w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-[var(--nauka-accent)]/15 flex items-center justify-center mb-6 sm:mb-8 transition-all duration-700 ${
                wordsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: '200ms' }}
            >
              <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--nauka-accent-light)]" strokeWidth={1.5} />
            </div>

            {/* Headline */}
            <h1
              className="text-display font-heading text-white mb-4 sm:mb-6"
              style={{ perspective: '600px' }}
            >
              {heroHeadline.map((word) => {
                const idx = wordIndex++;
                return (
                  <span
                    key={word}
                    className={`word-reveal ${wordsRevealed ? 'revealed' : ''}`}
                    style={{ transitionDelay: `${300 + idx * 120}ms` }}
                  >
                    {word}{' '}
                  </span>
                );
              })}
            </h1>

            {/* Subtitle */}
            <p
              className={`text-body-lg text-white/50 sm:text-white/55 max-w-[560px] leading-relaxed transition-all duration-700 ${
                wordsRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
              style={{ transitionDelay: `${300 + heroHeadline.length * 120 + 200}ms` }}
            >
              {service.subtitle}
            </p>
          </div>
        </section>

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 2: Features — Check list with icon
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <FeaturesSection features={service.features} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 3: Description — Editorial, detailed
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <DescriptionSection description={service.description} />

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 4: Related Projects — Social proof
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        {service.relatedProjects.length > 0 && (
          <RelatedProjectsSection projects={service.relatedProjects} />
        )}

        {/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
            SECTION 5: CTA — Start your project
            ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
        <ServiceCTASection title={service.title} />
      </main>

      <Footer />
    </div>
  );
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    Sub-components
    ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

function FeaturesSection({ features }: { features: string[] }) {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-primary">
      <div ref={sectionRef} className="container-narrow scroll-reveal">
        {/* Section label */}
        <p className="text-caption font-medium uppercase tracking-[0.2em] text-[var(--nauka-accent)] mb-4 sm:mb-5">
          Fitur Utama
        </p>

        <h2 className="text-h2 font-heading text-[var(--nauka-text-primary)] mb-8 sm:mb-10">
          Apa yang Anda dapatkan
        </h2>

        {/* Features list */}
        <div className="space-y-4 sm:space-y-5">
          {features.map((feature, idx) => (
            <FeatureItem key={feature} feature={feature} delay={idx + 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureItem({ feature, delay }: { feature: string; delay: number }) {
  const ref = useScrollReveal();

  return (
    <div
      ref={ref}
      className={`scroll-reveal scroll-reveal-delay-${delay} flex items-start gap-4 sm:gap-5 py-4 sm:py-5 border-b border-[var(--nauka-border)] last:border-0`}
    >
      {/* Check icon */}
      <div className="flex-shrink-0 w-8 h-8 sm:w-9 sm:h-9 rounded-lg bg-[var(--nauka-accent)]/10 flex items-center justify-center mt-0.5">
        <Check className="w-4 h-4 sm:w-[18px] sm:h-[18px] text-[var(--nauka-accent)]" strokeWidth={2} />
      </div>

      {/* Feature text */}
      <span className="text-body-lg text-[var(--nauka-text-primary)] font-medium">
        {feature}
      </span>
    </div>
  );
}

function DescriptionSection({ description }: { description: string[] }) {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-secondary">
      <div ref={sectionRef} className="container-editorial scroll-reveal">
        {/* Section label */}
        <p className="text-caption font-medium uppercase tracking-[0.2em] text-[var(--nauka-accent)] mb-6 sm:mb-8">
          Detail Layanan
        </p>

        {/* Description paragraphs */}
        <div className="space-y-5 sm:space-y-6">
          {description.map((paragraph, idx) => (
            <p key={idx} className="text-body-lg text-[var(--nauka-text-secondary)] leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  );
}

function RelatedProjectsSection({ projects }: { projects: string[] }) {
  const sectionRef = useScrollReveal();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-primary">
      <div ref={sectionRef} className="container-narrow scroll-reveal">
        {/* Section label */}
        <p className="text-caption font-medium uppercase tracking-[0.2em] text-[var(--nauka-accent)] mb-4 sm:mb-5">
          Proyek Terkait
        </p>

        <h2 className="text-h2 font-heading text-[var(--nauka-text-primary)] mb-8 sm:mb-10">
          Telah dipercaya oleh
        </h2>

        {/* Project list */}
        <div className="flex flex-wrap gap-3 sm:gap-4">
          {projects.map((project) => (
            <span
              key={project}
              className="inline-flex items-center px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl bg-white/80 border border-[var(--nauka-border)] text-body-sm text-[var(--nauka-text-primary)] font-medium nauka-service-card"
            >
              {project}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCTASection({ title }: { title: string }) {
  const cardRef = useScrollReveal();

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-secondary">
      <div className="container-narrow">
        <div ref={cardRef} className="bg-[var(--nauka-bg-deep)] rounded-2xl px-6 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24 text-center scroll-reveal-scale relative overflow-hidden">
          {/* Subtle glow effect */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-[var(--nauka-accent)]/5 rounded-full blur-3xl" />

          {/* Headline */}
          <h2 className="text-h1 font-heading text-white mb-4 sm:mb-6 relative z-10">
            Mulai Proyek
          </h2>

          {/* Subtitle */}
          <p className="text-body-lg text-white/60 mb-8 sm:mb-10 max-w-[480px] mx-auto relative z-10">
            Siap memulai proyek {title}? Ceritakan kebutuhan Anda dan kami akan merespons dalam 24 jam.
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

/**
 * Pre-generated slugs for static generation.
 * Note: generateStaticParams requires Server Component context.
 * This data is referenced here for documentation purposes.
 * To enable true static generation, move generateStaticParams to a
 * Server Component wrapper.
 */
export { allSlugs };
