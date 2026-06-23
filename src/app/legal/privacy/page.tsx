'use client';

import { useEffect, useRef } from 'react';
import Link from 'next/link';
import { Shield } from 'lucide-react';
import { Header } from '@/components/nauka/Header';
import { Footer } from '@/components/nauka/Footer';

/**
 * PrivacyPolicyPage — Nauka Motion
 *
 * Kebijakan Privasi / Privacy Policy page.
 * Clean, editorial layout using container-editorial.
 * Light background with proper heading hierarchy.
 * All text in Bahasa Indonesia.
 * Scroll reveal via IntersectionObserver.
 */

export default function PrivacyPolicyPage() {
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
                <Shield
                  className="w-5 h-5 text-[var(--nauka-accent)]"
                  strokeWidth={1.5}
                />
              </div>
              <span className="text-caption font-medium uppercase tracking-[0.2em] text-[var(--nauka-accent)]">
                Legal
              </span>
            </div>

            <h1 className="scroll-reveal scroll-reveal-delay-1 text-h1 font-heading text-[var(--nauka-text-primary)] mb-4">
              Kebijakan Privasi
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
                  Nauka Motion (&quot;kami&quot;) berkomitmen untuk melindungi privasi
                  Anda. Kebijakan Privasi ini menjelaskan bagaimana kami
                  mengumpulkan, menggunakan, dan melindungi informasi pribadi
                  Anda saat menggunakan layanan kami.
                </p>
              </div>

              {/* 1. Pengumpulan Data */}
              <div className="scroll-reveal">
                <h2 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-4">
                  1. Pengumpulan Data
                </h2>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed mb-3">
                  Kami mengumpulkan informasi yang Anda berikan secara langsung,
                  seperti:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-body text-[var(--nauka-text-secondary)]">
                  <li>Nama lengkap dan informasi kontak (email, nomor telepon)</li>
                  <li>Nama perusahaan dan jabatan</li>
                  <li>Detail proyek yang Anda sampaikan melalui formulir kontak</li>
                  <li>Informasi yang diberikan selama proses konsultasi</li>
                </ul>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed mt-3">
                  Selain itu, kami juga mengumpulkan data teknis secara otomatis
                  saat Anda mengunjungi website kami, termasuk alamat IP, jenis
                  browser, dan halaman yang dikunjungi.
                </p>
              </div>

              {/* 2. Penggunaan Data */}
              <div className="scroll-reveal">
                <h2 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-4">
                  2. Penggunaan Data
                </h2>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed mb-3">
                  Informasi yang kami kumpulkan digunakan untuk:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-body text-[var(--nauka-text-secondary)]">
                  <li>Merespons pertanyaan dan permintaan Anda</li>
                  <li>Menyediakan dan meningkatkan layanan kami</li>
                  <li>Mengirimkan informasi terkait proyek yang sedang berjalan</li>
                  <li>Mengirimkan update dan penawaran (dengan persetujuan Anda)</li>
                  <li>Menganalisis penggunaan website untuk meningkatkan pengalaman pengguna</li>
                </ul>
              </div>

              {/* 3. Cookies */}
              <div className="scroll-reveal">
                <h2 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-4">
                  3. Cookies
                </h2>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed">
                  Website kami menggunakan cookies untuk meningkatkan pengalaman
                  browsing Anda. Cookies adalah file kecil yang disimpan di
                  perangkat Anda. Kami menggunakan cookies untuk mengingat
                  preferensi Anda, menganalisis lalu lintas website, dan
                  menyediakan fitur yang dipersonalisasi. Anda dapat mengatur
                  browser Anda untuk menolak cookies, namun hal ini dapat
                  mempengaruhi fungsionalitas website.
                </p>
              </div>

              {/* 4. Pihak Ketiga */}
              <div className="scroll-reveal">
                <h2 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-4">
                  4. Pihak Ketiga
                </h2>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed">
                  Kami tidak menjual, memperdagangkan, atau mentransfer informasi
                  pribadi Anda kepada pihak ketiga tanpa persetujuan Anda, kecuali
                  jika diperlukan oleh hukum atau untuk memenuhi kewajiban
                  hukum. Kami dapat membagikan informasi dengan penyedia layanan
                  terpercaya yang membantu kami dalam menjalankan bisnis, selama
                  pihak tersebut setuju untuk menjaga kerahasiaan informasi.
                </p>
              </div>

              {/* 5. Keamanan Data */}
              <div className="scroll-reveal">
                <h2 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-4">
                  5. Keamanan Data
                </h2>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed">
                  Kami menerapkan langkah-langkah keamanan yang wajar untuk
                  melindungi informasi pribadi Anda dari akses yang tidak
                  sah, pengubahan, pengungkapan, atau penghancuran. Ini mencakup
                  enkripsi data, akses terbatas, dan audit keamanan berkala.
                  Namun, tidak ada metode transmisi melalui internet yang 100%
                  aman, dan kami tidak dapat menjamin keamanan absolut.
                </p>
              </div>

              {/* 6. Hak Pengguna */}
              <div className="scroll-reveal">
                <h2 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-4">
                  6. Hak Pengguna
                </h2>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed mb-3">
                  Anda memiliki hak untuk:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-body text-[var(--nauka-text-secondary)]">
                  <li>Mengakses informasi pribadi yang kami simpan tentang Anda</li>
                  <li>Meminta perbaikan informasi yang tidak akurat</li>
                  <li>Meminta penghapusan informasi pribadi Anda</li>
                  <li>Menolak pemrosesan informasi pribadi Anda untuk tujuan tertentu</li>
                  <li>Menarik persetujuan yang telah diberikan sebelumnya</li>
                </ul>
              </div>

              {/* 7. Kontak */}
              <div className="scroll-reveal">
                <h2 className="text-h3 font-heading text-[var(--nauka-text-primary)] mb-4">
                  7. Kontak
                </h2>
                <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed">
                  Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini
                  atau ingin menggunakan hak-hak Anda, silakan hubungi kami:
                </p>
                <div className="mt-4 p-5 sm:p-6 rounded-xl bg-[var(--nauka-bg-secondary)] border border-[var(--nauka-border)]">
                  <p className="text-body text-[var(--nauka-text-primary)] font-medium mb-1">
                    Nauka Motion
                  </p>
                  <p className="text-body-sm text-[var(--nauka-text-secondary)]">
                    Email: naukamotion@gmail.com
                  </p>
                  <p className="text-body-sm text-[var(--nauka-text-secondary)]">
                    Lokasi: Jakarta, Indonesia
                  </p>
                </div>
              </div>

              {/* Footer note */}
              <div className="scroll-reveal pt-6 border-t border-[var(--nauka-border)]">
                <p className="text-body-sm text-[var(--nauka-text-tertiary)]">
                  Kebijakan Privasi ini berlaku sejak tanggal yang tercantum di atas.
                  Kami dapat memperbarui kebijakan ini dari waktu ke waktu.
                  Perubahan signifikan akan diberitahukan melalui website kami.
                </p>
              </div>

              {/* Back links */}
              <div className="scroll-reveal flex flex-wrap gap-4">
                <Link
                  href="/legal/terms"
                  className="text-body-sm font-medium text-[var(--nauka-accent)] hover:text-[var(--nauka-accent-dark)] transition-colors duration-300"
                >
                  Syarat &amp; Ketentuan →
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
