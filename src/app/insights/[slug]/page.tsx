'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/nauka/Header';
import { Footer } from '@/components/nauka/Footer';

/**
 * ArticlePage — Nauka Motion Insight Detail
 *
 * Dynamic article page mapped by slug.
 * Dark hero with category badge, title, date →
 * Article body in container-editorial →
 * Back link → CTA to /contact
 *
 * Scroll-reveal via IntersectionObserver.
 * All text in Bahasa Indonesia.
 *
 * Available slugs:
 * - why-trust-comes-before-promotion
 * - websites-need-systems-not-just-pages
 * - automotive-websites-motion-clarity
 */

/* ━━ Article Data ━━ */

interface ArticleData {
  slug: string;
  title: string;
  category: string;
  date: string;
  color: string;
  paragraphs: string[];
}

const articlesData: Record<string, ArticleData> = {
  'why-trust-comes-before-promotion': {
    slug: 'why-trust-comes-before-promotion',
    title: 'Mengapa Kepercayaan Harus Datang Sebelum Promosi',
    category: 'Strategi Digital',
    date: '15 Mei 2025',
    color: '#0d9488',
    paragraphs: [
      'Di dunia digital yang penuh noise, setiap bisnis berlomba menarik perhatian. Iklan lebih banyak, konten lebih agresif, penawaran semakin menggiurkan. Tapi ada satu hal yang sering terlupakan: sebelum Anda mempromosikan sesuatu, orang harus percaya terlebih dahulu. Kepercayaan adalah fondasi dari setiap konversi — tanpa itu, promosi terbaik pun akan terasa hampa.',
      'Kesan pertama menentukan segalanya. Ketika seseorang mengunjungi website Anda untuk pertama kali, mereka hanya butuh beberapa detik untuk membentuk opini. Apakah website ini terlihat profesional? Apakah informasinya jelas? Apakah ada bukti bahwa bisnis ini nyata dan bisa dipercaya? Jika jawabannya tidak, mereka akan pergi — dan tidak peduli seberapa bagus penawaran Anda.',
      'Website profesional bukan sekadar estetika — ini adalah bukti keberadaan. Testimoni klien, portofolio nyata, proses yang transparan, dan konten yang menunjukkan keahlian — semua ini membangun lapisan kepercayaan yang membuat pengunjung merasa aman untuk mengambil langkah berikutnya. Di Nauka Motion, kami membangun setiap website dengan prinsip ini: bukti terlebih dahulu, promosi belakangan.',
      'Konsistensi di setiap titik sentuh juga krusial. Dari tampilan website, respons media sosial, hingga cara tim Anda menjawab telepon — setiap interaksi memperkuat atau melemahkan kepercayaan. Inkonsekuensi menciptakan keraguan, dan keraguan membunuh konversi. Pastikan brand Anda konsisten di seluruh platform.',
      'Pada akhirnya, kepercayaan mengkonversi lebih baik daripada promosi agresif. Ketika calon klien percaya, mereka tidak perlu didorong — mereka sendiri yang ingin bekerja sama. Itulah mengapa kami selalu memulai dengan membangun trust, bukan dengan memperbanyak iklan. Karena kepercayaan yang kuat adalah promosi terbaik yang tidak perlu Anda bayar.',
    ],
  },
  'websites-need-systems-not-just-pages': {
    slug: 'websites-need-systems-not-just-pages',
    title: 'Website Butuh Sistem, Bukan Sekadar Halaman',
    category: 'Pengembangan Web',
    date: '2 Juni 2025',
    color: '#2563eb',
    paragraphs: [
      'Banyak bisnis masih memperlakukan website sebagai brosur digital — sekadar kumpulan halaman yang menampilkan informasi perusahaan. Tapi di era yang semakin kompetitif, website yang hanya menampilkan teks dan gambar sudah tertinggal. Bisnis modern membutuhkan lebih dari sekadar halaman; mereka butuh sistem yang bekerja.',
      'Website sebagai sistem berarti integrasi dengan proses bisnis Anda. Formulir kontak yang langsung terhubung ke CRM, inventaris yang terupdate secara real-time, notifikasi otomatis saat ada leads baru — ini bukan fitur mewah, ini kebutuhan dasar. Ketika website terintegrasi dengan operasional bisnis, ia berubah dari biaya menjadi investasi yang menghasilkan.',
      'Otomasi adalah kunci efisiensi. Bayangkan setiap leads masuk otomatis ke database, setiap pembayaran tercatat tanpa input manual, setiap laporan tergenerate sendiri di akhir bulan. Ini bukan impian — ini bisa dibangun. Website yang didesain sebagai sistem menghilangkan pekerjaan repetitif dan membebaskan tim Anda untuk fokus pada hal yang benar-benar penting.',
      'Data real-time memberdayakan keputusan. Dengan dashboard yang menampilkan metrik bisnis secara langsung — traffic, konversi, revenue per channel — Anda tidak lagi meraba-raba. Setiap keputusan didukung oleh data, bukan asumsi. Website yang terkoneksi dengan sistem analytics dan business intelligence menjadi pusat komando digital Anda.',
      'Skalabilitas adalah investasi jangka panjang. Website yang dibangun sebagai sistem dirancang untuk tumbuh bersama bisnis Anda. Menambah fitur baru tidak berarti mengulang dari nol. Menghadapi lonjakan traffic tidak berarti website down. Ketika fondasi Anda adalah sistem, bukan sekadar halaman, setiap langkah pertumbuhan menjadi lebih mudah dan lebih terjangkau.',
    ],
  },
  'automotive-websites-motion-clarity': {
    slug: 'automotive-websites-motion-clarity',
    title: 'Website Otomotif: Gerak dan Kejelasan yang Menjual',
    category: 'Industri Otomotif',
    date: '20 Juni 2025',
    color: '#d97706',
    paragraphs: [
      'Industri otomotif adalah industri yang hidup dari gerakan dan emosi. Mobil bukan sekadar alat transportasi — ini adalah kebebasan, status, pengalaman. Tapi banyak website dealer otomotif justru terasa kaku, statis, dan membosankan. Padahal, website harus menjadi perpanjangan dari pengalaman berkendara itu sendiri — penuh gerak, kejelasan, dan antusiasme.',
      'Gerakan visual menciptakan koneksi emosional. Animasi halus saat memilih warna kendaraan, transisi yang mengalir saat berpindah model, interaksi yang responsif saat menggeser galeri — semua ini membuat pengunjung merasakan sesuatu, bukan hanya melihat. Di Nauka Motion, kami memperlakukan setiap website otomotif sebagai showroom digital yang menghidupkan produk.',
      'Kejelasan dalam call-to-action mengubah pengunjung menjadi prospek. "Lihat Spesifikasi", "Jadwalkan Test Drive", "Dapatkan Penawaran" — tombol-tombol ini harus jelas, menonjol, dan mudah diakses di setiap halaman. Pengunjung yang tertarik tidak boleh bingung tentang langkah berikutnya. Setiap friction yang dihilangkan mendekatkan mereka satu langkah ke dealer Anda.',
      'Katalog UX yang baik bukan sekadar daftar mobil. Ini adalah perjalanan penemuan. Filter yang intuitif, perbandingan yang mudah, spesifikasi yang terorganisir, dan foto berkualitas tinggi dari berbagai angle — semua ini membantu calon pembeli menemukan kendaraan yang tepat tanpa merasa kewalahan. UX katalog yang buruk membuat orang pergi ke website kompetitor.',
      'Sinyal kepercayaan sangat krusial untuk pembeli mobil. Testimoni pemilik, rating dealer, sertifikasi resmi, dan transparansi harga — ini bukan tambahan, ini keharusan. Membeli mobil adalah keputusan besar, dan calon pembeli butuh jaminan bahwa mereka membuat pilihan yang benar. Website yang menampilkan sinyal kepercayaan dengan jelas akan selalu mengungguli yang tidak.',
    ],
  },
};

const allSlugs = [
  'why-trust-comes-before-promotion',
  'websites-need-systems-not-just-pages',
  'automotive-websites-motion-clarity',
];

export default function ArticlePage() {
  const params = useParams();
  const slug = params.slug as string;
  const article = articlesData[slug];

  const heroRef = useRef<HTMLElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
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

    const heroObs = revealElements(heroRef.current, '.scroll-reveal');
    if (heroObs) observers.push(heroObs);

    const bodyObs = revealElements(bodyRef.current, '.scroll-reveal');
    if (bodyObs) observers.push(bodyObs);

    const ctaObs = revealElements(ctaRef.current, '.scroll-reveal, .scroll-reveal-scale');
    if (ctaObs) observers.push(ctaObs);

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

  // Fallback: article not found
  if (!article) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center bg-texture-primary">
          <div className="text-center px-6">
            <h1 className="text-h2 font-heading text-[var(--nauka-text-primary)] mb-4">
              Artikel Tidak Ditemukan
            </h1>
            <p className="text-body text-[var(--nauka-text-secondary)] mb-8">
              Artikel yang Anda cari tidak tersedia.
            </p>
            <Button
              asChild
              className="bg-[var(--nauka-accent)] hover:bg-[var(--nauka-accent-dark)] text-white rounded-lg px-6 py-2.5 text-body-sm font-medium"
            >
              <Link href="/insights">
                <ArrowLeft className="mr-2 w-4 h-4" />
                Kembali ke Wawasan
              </Link>
            </Button>
          </div>
        </main>
        <Footer />
      </div>
    );
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
              {/* Category badge */}
              <span
                className="scroll-reveal text-caption font-medium uppercase tracking-[0.15em] px-2.5 py-1 rounded-md inline-block mb-5 sm:mb-7"
                style={{ backgroundColor: `${article.color}25`, color: article.color }}
              >
                {article.category}
              </span>

              {/* Title */}
              <h1 className="scroll-reveal scroll-reveal-delay-1 text-display font-heading text-white mb-5 sm:mb-7">
                {article.title}
              </h1>

              {/* Date */}
              <p className="scroll-reveal scroll-reveal-delay-2 text-body-sm text-white/45">
                {article.date}
              </p>
            </div>
          </div>
        </section>

        {/* ━━ Article Body — Editorial ━━ */}
        <section className="bg-texture-primary py-14 sm:py-20 lg:py-28">
          <div ref={bodyRef} className="container-editorial">
            {/* Article content */}
            <div className="scroll-reveal space-y-6 sm:space-y-7">
              {article.paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-body-lg text-[var(--nauka-text-secondary)] leading-[1.85]"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Divider */}
            <div className="scroll-reveal mt-10 sm:mt-14 pt-8 sm:pt-10 border-t border-[var(--nauka-border)]">
              {/* Back link */}
              <Link
                href="/insights"
                className="inline-flex items-center gap-2 text-body font-medium text-[var(--nauka-accent)] hover:text-[var(--nauka-accent-dark)] transition-colors duration-300"
              >
                <ArrowLeft className="w-4 h-4" />
                Kembali ke Wawasan
              </Link>
            </div>
          </div>
        </section>

        {/* ━━ CTA Section ━━ */}
        <section ref={ctaRef} className="bg-texture-secondary py-14 sm:py-20 lg:py-28">
          <div className="container-narrow">
            <div className="scroll-reveal-scale bg-[var(--nauka-bg-deep)] rounded-2xl px-6 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24 text-center relative overflow-hidden">
              {/* Subtle glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-[var(--nauka-accent)]/5 rounded-full blur-3xl" />

              <h2 className="text-h1 font-heading text-white mb-4 sm:mb-6 relative z-10">
                Tertarik menerapkan insight ini?
              </h2>
              <p className="text-body-lg text-white/60 mb-8 sm:mb-10 max-w-[480px] mx-auto relative z-10">
                Ceritakan kebutuhan bisnis Anda — kami siap membantu mewujudkan solusi digital yang tepat.
              </p>
              <div className="inline-block relative z-10">
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
      </main>

      <Footer />
    </div>
  );
}
