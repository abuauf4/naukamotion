'use client';

import { useEffect, useState } from 'react';
import { Globe, Layout, ShoppingCart, Database, Mail, Package } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

/**
 * TrustBarSection — Yang Kami Bangun
 *
 * Clean bar of project type badges with descriptions.
 * Stats fetched from /api/public/settings (stats_projects, stats_services, stats_industries).
 * Light background (bg-texture-secondary).
 */

const projectTypes = [
  { label: 'Website sales otomotif', icon: Globe, description: 'Platform dealer yang mengkonversi pengunjung jadi pembeli' },
  { label: 'Sistem katalog & operasional', icon: Database, description: 'Kelola inventaris dan proses bisnis dalam satu sistem' },
  { label: 'Landing page bisnis', icon: Layout, description: 'Halaman fokus yang mendorong aksi spesifik dari pengunjung' },
  { label: 'Undangan digital cinematic', icon: Mail, description: 'Pengalaman digital personal untuk momen spesial' },
  { label: 'E-commerce premium', icon: ShoppingCart, description: 'Toko online yang terasa premium dan terpercaya' },
  { label: 'Sistem inventory', icon: Package, description: 'Tracking barang, penawaran, dan pembayaran terorganisir' },
];

const defaultStats = [
  { value: '30+', label: 'Proyek Selesai' },
  { value: '7', label: 'Tipe Layanan' },
  { value: '5', label: 'Industri' },
];

interface SiteSettings {
  stats_projects?: string;
  stats_services?: string;
  stats_industries?: string;
}

export function TrustBarSection() {
  const headerRef = useScrollReveal();
  const statsRef = useScrollReveal();
  const [settings, setSettings] = useState<SiteSettings>({});

  useEffect(() => {
    fetch('/api/public/settings')
      .then((res) => res.json())
      .then((data) => {
        if (data && typeof data === 'object') {
          setSettings(data);
        }
      })
      .catch(() => {});
  }, []);

  const stats = [
    { value: settings.stats_projects || defaultStats[0].value, label: 'Proyek Selesai' },
    { value: settings.stats_services || defaultStats[1].value, label: 'Tipe Layanan' },
    { value: settings.stats_industries || defaultStats[2].value, label: 'Industri' },
  ];

  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-texture-secondary">
      <div className="container-wide">
        {/* Section header */}
        <div ref={headerRef} className="text-center mb-8 sm:mb-12 lg:mb-16 scroll-reveal">
          <p className="text-caption text-[var(--nauka-accent)] uppercase tracking-[0.2em] mb-3 sm:mb-4 font-medium">
            Yang Kami Bangun
          </p>
          <h2 className="text-h2 font-heading text-[var(--nauka-text-primary)] max-w-[500px] mx-auto">
            Tipe proyek yang kami kerjakan.
          </h2>
        </div>

        {/* Project type badges */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 mb-10 sm:mb-14 lg:mb-20">
          {projectTypes.map((type) => {
            const Icon = type.icon;
            return (
              <div
                key={type.label}
                className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 rounded-xl bg-white/60 border border-[var(--nauka-border)] hover:border-[var(--nauka-accent)]/20 transition-colors duration-300"
              >
                <div className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 rounded-lg bg-[var(--nauka-accent)]/8 flex items-center justify-center">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--nauka-accent)]" strokeWidth={1.5} />
                </div>
                <div>
                  <div className="text-body font-medium text-[var(--nauka-text-primary)] mb-1">
                    {type.label}
                  </div>
                  <div className="text-body-sm text-[var(--nauka-text-tertiary)] leading-relaxed">
                    {type.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Simple stats */}
        <div ref={statsRef} className="scroll-reveal">
          <div className="flex justify-center">
            <div className="grid grid-cols-3 gap-6 sm:gap-12 lg:gap-20 max-w-[600px] w-full">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center nauka-stat-item group">
                  <div className="text-signature text-[var(--nauka-text-primary)] mb-1.5 sm:mb-2 transition-colors duration-400 group-hover:text-[var(--nauka-accent)]">
                    {stat.value}
                  </div>
                  <div className="text-caption text-[var(--nauka-text-tertiary)] uppercase tracking-wider">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
