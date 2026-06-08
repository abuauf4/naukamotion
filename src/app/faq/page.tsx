'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ArrowRight, ChevronDown, HelpCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Header } from '@/components/nauka/Header';
import { Footer } from '@/components/nauka/Footer';

/**
 * FAQPage — Nauka Motion
 *
 * Frequently Asked Questions page with expandable accordion-style Q&A.
 * Structure: Dark Hero → FAQ List → CTA
 * All text in Bahasa Indonesia.
 * FAQ data fetched from /api/public/faqs (Supabase).
 * Scroll reveal via IntersectionObserver.
 */

/* ━━ Fallback FAQ Data ━━ */
const defaultFaqItems = [
  {
    question: 'Berapa lama waktu pengerjaan website?',
    answer:
      'Waktu pengerjaan tergantung kompleksitas proyek. Website landing page biasanya 2-3 minggu, website dengan fitur custom 4-8 minggu, dan sistem bisnis 6-12 minggu.',
  },
  {
    question: 'Berapa biaya pembuatan website?',
    answer:
      'Biaya bervariasi sesuai kebutuhan. Kami menawarkan paket yang dapat disesuaikan dengan budget Anda. Hubungi kami untuk konsultasi gratis dan penawaran detail.',
  },
  {
    question: 'Apakah website akan responsif di mobile?',
    answer:
      'Tentu saja. Semua website yang kami buat responsif dan dioptimasi untuk semua perangkat — desktop, tablet, dan mobile.',
  },
  {
    question: 'Apakah ada layanan maintenance?',
    answer:
      'Ya, kami menyediakan paket maintenance bulanan yang mencakup update keamanan, backup rutin, dan dukungan teknis.',
  },
  {
    question: 'Apakah saya bisa mengelola konten sendiri?',
    answer:
      'Ya, kami bisa mengintegrasikan CMS yang memungkinkan Anda mengelola konten tanpa pengetahuan teknis.',
  },
  {
    question: 'Bagaimana proses kerja Nauka Motion?',
    answer:
      'Proses kami: Konsultasi → Proposal & Desain → Pengembangan → Testing → Launch. Anda terlibat di setiap tahap.',
  },
];

/* ━━ Single FAQ Item ━━ */
function FAQItem({
  item,
  isOpen,
  onToggle,
  delay,
}: {
  item: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
}) {
  const itemRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;
    if (!itemRef.current) return;

    if (prefersReducedMotion) {
      itemRef.current.classList.add('scroll-revealed');
      return;
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
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );

    observer.observe(itemRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={itemRef}
      className={`scroll-reveal scroll-reveal-delay-${delay} border-b border-[var(--nauka-border)] last:border-b-0`}
    >
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-5 sm:py-6 text-left group cursor-pointer"
        aria-expanded={isOpen}
      >
        <span className="text-h4 font-heading text-[var(--nauka-text-primary)] pr-4 group-hover:text-[var(--nauka-accent-dark)] transition-colors duration-300">
          {item.question}
        </span>
        <ChevronDown
          className={`w-5 h-5 text-[var(--nauka-text-tertiary)] flex-shrink-0 transition-transform duration-300 ${
            isOpen ? 'rotate-180 text-[var(--nauka-accent)]' : ''
          }`}
          strokeWidth={1.5}
        />
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          isOpen ? 'max-h-96 opacity-100 pb-5 sm:pb-6' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-body text-[var(--nauka-text-secondary)] leading-relaxed max-w-[600px]">
          {item.answer}
        </p>
      </div>
    </div>
  );
}

/* ━━ Page Component ━━ */
export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [faqItems, setFaqItems] = useState(defaultFaqItems);

  useEffect(() => {
    fetch('/api/public/faqs')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFaqItems(data.map((d: { question: string; answer: string }) => ({ question: d.question, answer: d.answer })));
        }
      })
      .catch(() => {});
  }, []);
  const heroRef = useRef<HTMLElement>(null);
  const ctaRef = useRef<HTMLElement>(null);

  const handleToggle = useCallback((index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  }, []);

  // IntersectionObserver for hero and CTA
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

    const ctaObs = revealElements(
      ctaRef.current,
      '.scroll-reveal, .scroll-reveal-scale'
    );
    if (ctaObs) observers.push(ctaObs);

    return () => {
      observers.forEach((obs) => obs?.disconnect());
    };
  }, []);

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
                FAQ
              </p>
              <h1 className="scroll-reveal scroll-reveal-delay-1 text-display font-heading text-white mb-5 sm:mb-7">
                Pertanyaan Umum
              </h1>
              <p className="scroll-reveal scroll-reveal-delay-2 text-body-lg text-white/55 max-w-[520px] leading-relaxed">
                Temukan jawaban atas pertanyaan yang sering ditanyakan tentang layanan dan proses kerja kami.
              </p>
            </div>
          </div>
        </section>

        {/* ━━ FAQ List ━━ */}
        <section className="bg-texture-primary py-14 sm:py-20 lg:py-28">
          <div className="container-narrow">
            {/* Decorative icon */}
            <div className="flex justify-center mb-8 sm:mb-10">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[var(--nauka-accent)]/8 flex items-center justify-center">
                <HelpCircle
                  className="w-6 h-6 sm:w-7 sm:h-7 text-[var(--nauka-accent)]"
                  strokeWidth={1.5}
                />
              </div>
            </div>

            {/* FAQ accordion */}
            <div className="bg-white/70 border border-[var(--nauka-border)] rounded-2xl px-5 sm:px-8 lg:px-10">
              {faqItems.map((item, index) => (
                <FAQItem
                  key={index}
                  item={item}
                  isOpen={openIndex === index}
                  onToggle={() => handleToggle(index)}
                  delay={Math.min(index + 1, 6)}
                />
              ))}
            </div>
          </div>
        </section>

        {/* ━━ CTA Section ━━ */}
        <section
          ref={ctaRef}
          className="bg-texture-secondary py-14 sm:py-20 lg:py-28"
        >
          <div className="container-narrow">
            <div className="scroll-reveal-scale bg-[var(--nauka-accent)] rounded-2xl px-6 py-14 sm:px-8 sm:py-20 lg:px-16 lg:py-24 text-center relative overflow-hidden">
              {/* Subtle glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 sm:w-64 h-48 sm:h-64 bg-white/5 rounded-full blur-3xl" />

              <h2 className="text-h1 font-heading text-white mb-4 sm:mb-6 relative z-10">
                Masih punya pertanyaan?
              </h2>
              <p className="text-body-lg text-white/70 mb-8 sm:mb-10 max-w-[480px] mx-auto relative z-10">
                Jangan ragu untuk menghubungi kami. Kami senang mendengarkan dan menjawab setiap pertanyaan Anda.
              </p>
              <div className="relative z-10 inline-block">
                <Button
                  asChild
                  size="lg"
                  className="nauka-cta-button bg-white text-[var(--nauka-accent-dark)] hover:bg-white/95 rounded-xl px-8 sm:px-10 py-3.5 sm:py-4 text-body font-semibold shadow-lg shadow-black/10"
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
