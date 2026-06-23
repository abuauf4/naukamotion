'use client';

import { useEffect, useState } from 'react';
import { useReveal } from '@/hooks/useReveal';

/**
 * TrustBarSection — Yang Kami Bangun (Developer Theme)
 *
 * Now a capabilities list (not a card grid). Single column with:
 * index · title · description · tech tags pill
 */

interface SiteSettings {
  stats_projects?: string;
  stats_services?: string;
  stats_industries?: string;
}

const capabilities = [
  {
    title: 'Website Sales Otomotif',
    desc: 'Platform dealer yang mengkonversi pengunjung jadi pembeli — inventaris, kalkulasi kredit, test drive booking.',
    tags: 'Next.js · Realtime',
  },
  {
    title: 'Sistem Katalog & Operasional',
    desc: 'Kelola inventaris dan proses bisnis dalam satu sistem — tracking barang, penawaran, pembayaran, laporan.',
    tags: 'Dashboard · CRUD',
  },
  {
    title: 'Landing Page Bisnis',
    desc: 'Halaman fokus yang mendorong aksi spesifik dari pengunjung — marketing campaign, produk launch, lead gen.',
    tags: 'SEO · CRO',
  },
  {
    title: 'Undangan Digital Cinematic',
    desc: 'Pengalaman digital personal untuk momen spesial — wedding, corporate event, anniversary.',
    tags: 'Motion · Personal',
  },
  {
    title: 'E-Commerce Premium',
    desc: 'Toko online yang terasa premium dan terpercaya — katalog terorganisir, checkout clean, garansi resmi.',
    tags: 'Payment · Shipping',
  },
  {
    title: 'Sistem Inventory Khusus',
    desc: 'Tracking barang, penawaran, dan pembayaran terorganisir — untuk bisnis dengan flow operasional unik.',
    tags: 'Custom · Workflow',
  },
];

export function TrustBarSection() {
  const containerRef = useReveal<HTMLDivElement>();
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    fetch('/api/public/settings')
      .then((r) => r.json())
      .then((data) => {
        if (data && typeof data === 'object') setSettings(data);
      })
      .catch(() => {});
  }, []);

  return (
    <section ref={containerRef} id="capabilities" style={{ padding: '140px 0', background: 'var(--bg)' }}>
      <div className="container-wide">
        {/* Header */}
        <div className="sec-head">
          <div className="sec-head-left">
            <span className="sec-head-num fade-up">// Yang Kami Bangun</span>
            <h2 className="t-h1 sec-head-title">
              <span className="line-mask"><span className="line-inner">Tipe proyek yang</span></span>
              <span className="line-mask delay-1"><span className="line-inner">kami kerjakan.</span></span>
            </h2>
          </div>
          <p className="sec-head-right fade-up delay-2">
            Spesialisasi yang kami pegang — masing-masing dengan pendekatan dan pertimbangan teknis yang berbeda.
          </p>
        </div>

        {/* List */}
        <ul className="cap-list stagger">
          {capabilities.map((cap, idx) => (
            <li key={cap.title} className="cap-item">
              <span className="cap-num">{String(idx + 1).padStart(2, '0')}</span>
              <h3 className="cap-title">{cap.title}</h3>
              <p className="cap-desc">{cap.desc}</p>
              <span className="cap-tags">{cap.tags}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
