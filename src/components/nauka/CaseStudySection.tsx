'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useReveal } from '@/hooks/useReveal';

/**
 * CaseStudySection — Karya Pilihan (Developer Theme)
 *
 * List format (not full-bleed poster). Each item is a row with:
 * index · client + category · tag · description · arrow
 * Hover: padding expands, bg highlights, thumbnail follows cursor (desktop).
 */

interface Project {
  id: string;
  slug: string;
  client: string;
  category: string;
  title: string;
  description: string;
  liveUrl: string | null;
  image: string | null;
  color: string;
  featured: boolean;
}

const fallbackProjects: Project[] = [
  {
    id: 'mitsubishi', slug: 'mitsubishi', client: 'Mitsubishi Motor Indonesia',
    category: 'Website Dealer · 2025', title: 'Mitsubishi',
    description: 'Platform dealer yang menjual mobil sebelum test drive — inventaris real-time, perbandingan model, kalkulasi kredit.',
    liveUrl: 'https://mitsubishi-test.vercel.app', image: '/portfolio/mitsubishi.png', color: '#0d9488', featured: true,
  },
  {
    id: 'geely', slug: 'geely-pluit', client: 'Geely Pluit',
    category: 'Website EV Dealer · 2025', title: 'Geely',
    description: 'Dealer listrik yang menjual masa depan, bukan sekadar mobil — branding modern, estimasi jarak tempuh, fast-charging info.',
    liveUrl: 'https://elgeelypluit.id', image: '/portfolio/geely-pluit.png', color: '#2563eb', featured: true,
  },
  {
    id: 'jasaprotect', slug: 'jasaprotect', client: 'JasaProtect',
    category: 'Landing Page · 2025', title: 'JasaProtect',
    description: 'Platform asuransi yang bikin orang ngerti apa yang mereka beli — perbandingan transparan, bahasa sehari-hari.',
    liveUrl: 'https://jasa-proteksi.vercel.app', image: '/portfolio/jasaprotect.png', color: '#6366f1', featured: false,
  },
  {
    id: 'naukagadget', slug: 'nauka-gadget', client: 'Nauka Gadget',
    category: 'E-Commerce · 2025', title: 'Nauka Gadget',
    description: 'Toko gadget yang terasa premium, bukan marketplace murahan — desain terorganisir, garansi resmi, checkout clean.',
    liveUrl: 'https://naukagadget.vercel.app', image: '/portfolio/nauka-gadget.png', color: '#8b5cf6', featured: false,
  },
  {
    id: 'nauka-kostay', slug: 'nauka-kostay', client: 'Nauka Kostay',
    category: 'Booking Platform · 2025', title: 'Nauka Kostay',
    description: 'Kos yang dipesan seperti hotel — virtual tour, fasilitas dengan pride, testimoni penghuni, booking flow seamless.',
    liveUrl: 'https://nauka-kostay.vercel.app', image: '/portfolio/nauka-kostay.png', color: '#d97706', featured: false,
  },
  {
    id: 'ghazy', slug: 'ghazy', client: 'Ghazy Computer',
    category: 'Sistem Inventory · 2025', title: 'Ghazy',
    description: 'Dari spreadsheet chaos ke sistem yang jalan sendiri — flow submit barang, evaluasi, penawaran, pickup, pembayaran.',
    liveUrl: 'https://ghazycomputer.com', image: '/portfolio/ghazy-computer.png', color: '#e11d48', featured: true,
  },
];

// Tag mapping from category → short tag
function getTag(project: Project): string {
  const cat = project.category.toLowerCase();
  if (cat.includes('dealer') || cat.includes('otomotif')) return 'Otomotif';
  if (cat.includes('ev') || cat.includes('listrik')) return 'EV';
  if (cat.includes('asuransi')) return 'Asuransi';
  if (cat.includes('e-commerce') || cat.includes('commerce')) return 'Retail';
  if (cat.includes('booking') || cat.includes('kos') || cat.includes('hospitality')) return 'Hospitality';
  if (cat.includes('inventory') || cat.includes('sistem')) return 'SaaS';
  return 'Lainnya';
}

export function CaseStudySection() {
  const containerRef = useReveal<HTMLDivElement>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetch('/api/public/projects')
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) setProjects(data);
        setDataLoaded(true);
      })
      .catch(() => setDataLoaded(true));
  }, []);

  const displayProjects = projects.length > 0 ? projects : fallbackProjects;

  if (!dataLoaded) {
    return (
      <section style={{ padding: '140px 0', background: 'var(--bg)' }}>
        <div className="container-wide">
          <div style={{ maxWidth: '600px' }}>
            <div style={{ height: '14px', width: '120px', background: 'var(--bg-soft)', borderRadius: '4px', marginBottom: '24px' }} />
            <div style={{ height: '48px', width: '60%', background: 'var(--bg-soft)', borderRadius: '4px' }} />
          </div>
        </div>
      </section>
    );
  }

  return (
    <section ref={containerRef} id="work" style={{ padding: '140px 0', background: 'var(--bg)' }}>
      <div className="container-wide">
        {/* Section header */}
        <div className="sec-head">
          <div className="sec-head-left">
            <span className="sec-head-num fade-up">// Karya Pilihan</span>
            <h2 className="t-h1 sec-head-title">
              <span className="line-mask"><span className="line-inner">Proyek yang bicara</span></span>
              <span className="line-mask delay-1"><span className="line-inner">sendiri.</span></span>
            </h2>
          </div>
          <p className="sec-head-right fade-up delay-2">
            Enam proyek terpilih yang merepresentasikan pendekatan kami — fokus pada hasil yang digunakan, bukan sekadar terlihat menarik.
          </p>
        </div>

        {/* List */}
        <ul className="work-list stagger">
          {displayProjects.map((project, idx) => (
            <li key={project.id}>
              <Link href={`/work/${project.slug}`} className="work-item">
                <span className="work-index">{String(idx + 1).padStart(2, '0')}</span>
                <div>
                  <h3 className="work-client">{project.client}</h3>
                  <p className="work-cat">{project.category}</p>
                </div>
                <span className="work-tag">{getTag(project)}</span>
                <p className="work-desc">{project.description}</p>
                <span className="work-arrow">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path d="M5 15L15 5M15 5H7M15 5V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer */}
        <div
          className="fade-up"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '56px',
            paddingTop: '32px',
            borderTop: '1px solid var(--line-soft)',
          }}
        >
          <span className="t-small">Menampilkan {displayProjects.length} proyek terpilih</span>
          <Link href="/work" className="work-footer-link" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'var(--ink)', fontSize: '0.9375rem', fontWeight: 500, transition: 'gap 300ms var(--ease-out)' }}>
            Lihat semua karya
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
