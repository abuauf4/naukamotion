'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, User } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

interface Insight {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  topic: string;
  author: string;
  publishedAt: string | null;
}

// Fallback data
const fallbackInsights: Insight[] = [
  {
    id: '1', slug: 'why-trust-comes-before-promotion',
    title: 'Mengapa Kepercayaan Harus Didahulukan Sebelum Promosi',
    excerpt: 'Prinsip inti NAUKA dijelaskan melalui contoh nyata. Bagaimana desain evidence-first mengkonversi lebih baik daripada pendekatan sales-first.',
    author: 'Nauka Motion', publishedAt: '2026-05-28T00:00:00Z', topic: 'Strategi',
  },
  {
    id: '2', slug: 'websites-need-systems-not-just-pages',
    title: 'Mengapa Website Bisnis Butuh Sistem, Bukan Sekadar Halaman',
    excerpt: 'Argumen untuk memperlakukan website sebagai alat operasional, bukan brosur. Bagaimana CMS dan backend logic menciptakan nilai bisnis yang nyata.',
    author: 'Nauka Motion', publishedAt: '2026-05-15T00:00:00Z', topic: 'Sistem',
  },
  {
    id: '3', slug: 'automotive-websites-motion-clarity',
    title: 'Bagaimana Website Otomotif Harus Menjual Motion dan Kejelasan',
    excerpt: 'Pemikiran spesifik per domain. Mengapa platform otomotif perlu menampilkan inventaris dengan tujuan, bukan sekadar mengkatalogkan.',
    author: 'Nauka Motion', publishedAt: '2026-05-03T00:00:00Z', topic: 'Otomotif',
  },
];

function formatDate(dateStr: string | null): string {
  if (!dateStr) return '';
  const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
  const d = new Date(dateStr);
  return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
}

export function InsightSection() {
  const headerRef = useScrollReveal();
  const card1Ref = useScrollReveal();
  const card2Ref = useScrollReveal();
  const card3Ref = useScrollReveal();
  const cardRefs = [card1Ref, card2Ref, card3Ref];

  const [insights, setInsights] = useState<Insight[]>(fallbackInsights);

  useEffect(() => {
    fetch('/api/public/insights')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setInsights(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="py-14 sm:py-20 lg:py-28 bg-texture-secondary">
      <div className="container-wide">
        <div ref={headerRef} className="max-w-[600px] mb-10 sm:mb-14 lg:mb-20 scroll-reveal">
          <p className="text-caption text-[var(--nauka-accent)] uppercase tracking-[0.2em] mb-3 sm:mb-4 font-medium">Wawasan</p>
          <h2 className="text-h2 font-heading text-[var(--nauka-text-primary)] mb-3 sm:mb-4">
            Cara Kami Berpikir
          </h2>
          <p className="text-body-lg text-[var(--nauka-text-secondary)]">
            Bagaimana kami berpikir tentang membangun produk digital — dan mengapa itu penting.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {insights.map((article, index) => (
            <article
              key={article.slug}
              ref={cardRefs[index]}
              className={`group bg-white border border-[var(--nauka-border)] rounded-xl overflow-hidden hover:shadow-lg hover:border-[var(--nauka-accent-light)] transition-all duration-400 scroll-reveal scroll-reveal-delay-${index + 1}`}
            >
              <div className="px-5 sm:px-7 pt-5 sm:pt-7">
                <span className="text-caption font-medium text-[var(--nauka-accent)] uppercase tracking-[0.15em]">
                  {article.topic}
                </span>
              </div>

              <div className="p-5 sm:p-7 pt-2 sm:pt-3">
                <h3 className="text-h4 font-heading text-[var(--nauka-text-primary)] mb-2 sm:mb-3 leading-snug group-hover:text-[var(--nauka-accent)] transition-colors duration-300">
                  <Link href={`/insights/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-body-sm text-[var(--nauka-text-secondary)] mb-4 sm:mb-5 leading-relaxed line-clamp-3">
                  {article.excerpt}
                </p>

                <div className="flex items-center gap-3 pt-4 sm:pt-5 border-t border-[var(--nauka-border)]">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--nauka-bg-secondary)] flex items-center justify-center">
                    <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[var(--nauka-text-tertiary)]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <div className="text-caption font-medium text-[var(--nauka-text-primary)]">
                      {article.author}
                    </div>
                    <div className="text-caption text-[var(--nauka-text-tertiary)]">
                      {formatDate(article.publishedAt)}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 sm:mt-12 lg:mt-16 text-center">
          <Link
            href="/insights"
            className="text-body font-medium text-[var(--nauka-accent)] hover:text-[var(--nauka-accent-dark)] transition-colors duration-300 inline-flex items-center gap-2"
          >
            Semua Wawasan
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
