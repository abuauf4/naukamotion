'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { FileText } from 'lucide-react';
import { Header } from '@/components/nauka/Header';
import { Footer } from '@/components/nauka/Footer';

/**
 * TermsAndConditionsPage — Nauka Motion
 *
 * Syarat & Ketentuan / Terms & Conditions page.
 * Same editorial style as Privacy Policy.
 * Clean, editorial layout using container-editorial.
 * Light background with proper heading hierarchy.
 * All text in Bahasa Indonesia.
 * Scroll reveal via IntersectionObserver.
 */

export default function TermsAndConditionsPage() {
  const contentRef = useRef<HTMLDivElement>(null);

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

    const observer = revealElements(contentRef.current, '.scroll-reveal');
    return () => observer?.disconnect();
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 bg-texture-primary">
        {/* ━━ Page Header ━━ */}
        <section className="pt-16 sm:pt-20 lg:pt-24 pb-6 sm:pb-8">
          <div className="container-editorial">
            {/* Decorative icon */}
            <div className="scroll-reveal flex items-center gap-3 mb-6 sm:mb-8">
              <div className="w-10 h-10 rounded-xl bg-[var(--nauka-accent)]/8 flex items-center justify-center">
                <FileText
                  className="w-5 h-5 text-[var(--nauka-accent)]"
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-caption font-medium uppercase tracking-[0.2em] text-[var(--nauka-accent)]">
                Legal
              </span>
            </div>

            <h1 className="scroll-reveal scroll-reveal-delay-1 text-h1 font-heading text-[var(--nauka-text-primary)] mb-4">
              Syarat &amp; Ketentuan
            </h1>
            <p className="scroll-reveal scroll-reveal-delay-2 text-body text-[var(--nauka-text-secondary)]">
              Terakhir diperbarui: 1 Januari 2026
            </p>
          </div>
        </section>

        {/* ━━ Content ━━ */}
        <section className="pb-16 sm:pb-20 lg:pb-28" ref={contentRef}>
          <div className="container-editorial">
            <div className="space-y-10 sm:space-y-12">
              {/* Intro */}
              <div className="scroll-reveal">
                <p className="text-body-lg text-[var(--nauka-text-secondary)] leading-relaxed">
                  Selamat datang di Nauka Motion. Dengan menggunakan layanan kami,
                  Anda menyetujui syarat dan ketentuan berikut. Harap baca dengan
                  seksama sebelum menggunakan layanan kami.
                </p>
              </div>

              {/* 1. Layanan */}
              <div className="scroll-reveal">
                <h2 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-4">
                  1. Layanan
                </h2>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed mb-3">
                  Nauka Motion menyediakan layanan pengembangan website, sistem
                  bisnis, dan solusi digital lainnya. Ruang lingkup layanan akan
                  ditentukan dalam proposal atau kontrak yang disepakati bersama
                  antara Nauka Motion dan klien. Setiap layanan yang tidak
                  termasuk dalam ruang lingkup yang disepakati akan dikenakan
                  biaya tambahan sesuai kesepakatan.
                </p>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed">
                  Kami berhak menolak proyek yang tidak sesuai dengan nilai atau
                  kapabilitas kami. Setiap proyek dimulai setelah kedua belah
                  pihak menyetujui proposal dan ketentuan pembayaran.
                </p>
              </div>

              {/* 2. Hak & Kewajiban */}
              <div className="scroll-reveal">
                <h2 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-4">
                  2. Hak &amp; Kewajiban
                </h2>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed mb-3">
                  <strong className="text-[var(--nauka-text-primary)] font-medium">Kewajiban Nauka Motion:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-2 text-body text-[var(--nauka-text-secondary)] mb-4">
                  <li>Menyediakan layanan sesuai ruang lingkup yang disepakati</li>
                  <li>Memberikan update progres secara berkala</li>
                  <li>Menjaga kerahasiaan informasi klien</li>
                  <li>Memberikan hasil kerja yang memenuhi standar profesional</li>
                </ul>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed mb-3">
                  <strong className="text-[var(--nauka-text-primary)] font-medium">Kewajiban Klien:</strong>
                </p>
                <ul className="list-disc pl-5 space-y-2 text-body text-[var(--nauka-text-secondary)]">
                  <li>Memberikan informasi dan materi yang diperlukan secara tepat waktu</li>
                  <li>Memberikan feedback dalam jangka waktu yang disepakati</li>
                  <li>Melakukan pembayaran sesuai jadwal yang ditentukan</li>
                  <li>Tidak menggunakan hasil kerja untuk tujuan yang melanggar hukum</li>
                </ul>
              </div>

              {/* 3. Pembayaran */}
              <div className="scroll-reveal">
                <h2 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-4">
                  3. Pembayaran
                </h2>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed mb-3">
                  Ketentuan pembayaran akan diatur dalam proposal atau kontrak
                  yang disepakati. Secara umum, struktur pembayaran kami adalah:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-body text-[var(--nauka-text-secondary)]">
                  <li>Down payment sebesar 50% sebelum proyek dimulai</li>
                  <li>Pelunasan 50% setelah proyek selesai dan disetujui</li>
                  <li>Untuk proyek besar, pembayaran dapat dilakukan secara bertahap sesuai milestone</li>
                </ul>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed mt-3">
                  Keterlambatan pembayaran dapat mengakibatkan penundaan pengerjaan
                  proyek. Pembayaran yang tertunda lebih dari 14 hari dapat
                  mengakibatkan penghentian sementara layanan.
                </p>
              </div>

              {/* 4. Garansi */}
              <div className="scroll-reveal">
                <h2 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-4">
                  4. Garansi
                </h2>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed">
                  Kami memberikan garansi atas hasil kerja selama 30 hari setelah
                  peluncuran proyek. Garansi mencakup perbaikan bug dan masalah
                  teknis yang terkait dengan ruang lingkup awal proyek. Perubahan
                  fitur, penambahan fitur baru, atau modifikasi di luar ruang
                  lingkup awal tidak termasuk dalam garansi dan akan dikenakan
                  biaya terpisah.
                </p>
              </div>

              {/* 5. Hak Kekayaan Intelektual */}
              <div className="scroll-reveal">
                <h2 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-4">
                  5. Hak Kekayaan Intelektual
                </h2>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed mb-3">
                  Setelah pembayaran penuh diterima, hak penggunaan atas hasil
                  kerja akan dialihkan kepada klien. Namun:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-body text-[var(--nauka-text-secondary)]">
                  <li>Nauka Motion berhak menampilkan proyek dalam portofolio kami</li>
                  <li>Kode, desain, atau komponen generik yang dikembangkan oleh Nauka Motion tetap menjadi milik Nauka Motion</li>
                  <li>Pihak ketiga (library, plugin, font) tunduk pada lisensi masing-masing</li>
                  <li>Klien tidak berhak mengklaim kerja Nauka Motion sebagai karya orisinal mereka</li>
                </ul>
              </div>

              {/* 6. Batasan Tanggung Jawab */}
              <div className="scroll-reveal">
                <h2 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-4">
                  6. Batasan Tanggung Jawab
                </h2>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed">
                  Nauka Motion tidak bertanggung jawab atas kerugian tidak
                  langsung, insidental, atau konsekuensial yang timbul dari
                  penggunaan layanan kami. Tanggung jawab maksimal kami terbatas
                  pada jumlah yang dibayarkan untuk layanan terkait. Kami tidak
                  bertanggung jawab atas kerusakan atau kehilangan data yang
                  disebabkan oleh faktor di luar kendali kami, termasuk namun
                  tidak terbatas pada kegagalan server pihak ketiga, serangan
                  siber, atau bencana alam.
                </p>
              </div>

              {/* 7. Perubahan Ketentuan */}
              <div className="scroll-reveal">
                <h2 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-4">
                  7. Perubahan Ketentuan
                </h2>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed">
                  Kami berhak mengubah syarat dan ketentuan ini dari waktu ke
                  waktu. Perubahan akan berlaku sejak dipublikasikan di website
                  kami. Untuk proyek yang sedang berjalan, ketentuan yang berlaku
                  adalah ketentuan yang disepakati pada saat kontrak ditandatangani.
                  Kami menyarankan Anda untuk meninjau halaman ini secara berkala
                  untuk mengetahui perubahan terbaru.
                </p>
              </div>

              {/* Footer note */}
              <div className="scroll-reveal pt-6 border-t border-[var(--nauka-border)]">
                <p className="text-body-sm text-[var(--nauka-text-tertiary)]">
                  Syarat &amp; Ketentuan ini berlaku sejak tanggal yang tercantum
                  di atas dan tunduk pada hukum Republik Indonesia. Jika Anda
                  memiliki pertanyaan, silakan hubungi kami melalui
                  naukamotion@gmail.com.
                </p>
              </div>

              {/* Back links */}
              <div className="scroll-reveal flex flex-wrap gap-4">
                <Link
                  href="/legal/privacy"
                  className="text-body-sm font-medium text-[var(--nauka-accent)] hover:text-[var(--nauka-accent-dark)] transition-colors duration-300"
                >
                  ← Kebijakan Privasi
                </Link>
                <Link
                  href="/contact"
                  className="text-body-sm font-medium text-[var(--nauka-accent)] hover:text-[var(--nauka-accent-dark)] transition-colors duration-300"
                >
                  Hubungi Kami →
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
