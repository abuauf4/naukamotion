'use client';

import { useReveal } from '@/hooks/useReveal';
import Link from 'next/link';

/**
 * FeaturedProjectsSection — 6 representative projects across industries.
 * Each project: index · client + industry · tech tags · description · external link
 */

interface Project {
  index: string;
  client: string;
  industry: string;
  description: string;
  tech: string[];
  url?: string;
  slug?: string;
}

const projects: Project[] = [
  {
    index: '01',
    client: 'Geely Jakarta',
    industry: 'Automotive',
    description: 'Website dealer resmi Geely di Jakarta — inventaris real-time, perbandingan model EV, estimasi jarak tempuh, dan jalur konsultasi sales yang seamless.',
    tech: ['Next.js', 'Supabase', 'Tailwind', 'Vercel'],
    url: 'https://elgeelypluit.id',
    slug: 'geely-pluit',
  },
  {
    index: '02',
    client: 'Jakarta Laptops',
    industry: 'Commerce',
    description: 'Marketplace jual-beli laptop bekas & baru dengan sistem evaluasi, penawaran harga, pickup, dan pembayaran terorganisir dalam satu platform.',
    tech: ['Next.js', 'PostgreSQL', 'Prisma', 'Stripe'],
    slug: 'jakarta-laptops',
  },
  {
    index: '03',
    client: 'Jasa Proteksi',
    industry: 'Insurance',
    description: 'Platform broker asuransi dengan interface perbandingan transparan, penjelasan dalam bahasa sehari-hari, dan alur pemilihan terpandu.',
    tech: ['Next.js', 'Supabase', 'Tailwind', 'Vercel'],
    url: 'https://jasa-proteksi.vercel.app',
    slug: 'jasaprotect',
  },
  {
    index: '04',
    client: 'Padel Club',
    industry: 'Sports',
    description: 'Platform booking lapangan padel dengan jadwal real-time, sistem membership, dan manajemen turnamen untuk komunitas padel Jakarta.',
    tech: ['Next.js', 'Supabase', 'React Query', 'Tailwind'],
    slug: 'padel-club',
  },
  {
    index: '05',
    client: 'Inventra',
    industry: 'Business System · SaaS',
    description: 'Sistem inventory & operasional untuk bisnis dengan flow unik — tracking barang, penawaran, pembayaran, laporan, dan workflow otomatis.',
    tech: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL'],
    slug: 'inventra',
  },
  {
    index: '06',
    client: 'Nauka Motion',
    industry: 'Creative Industry',
    description: 'Studio digital yang fokus pada motion design dan content production untuk brand — website, sistem, dan pengalaman digital yang berdampak.',
    tech: ['Next.js', 'Tailwind', 'Framer Motion', 'Vercel'],
    url: 'https://naukamotion.id',
    slug: 'nauka-motion',
  },
];

export function FeaturedProjectsSection() {
  const containerRef = useReveal<HTMLDivElement>();

  return (
    <section ref={containerRef} id="projects" style={{ padding: '120px 0', background: 'var(--bg)' }}>
      <div className="container-wide">
        {/* Section header */}
        <div className="sec-head">
          <div className="sec-head-left">
            <span className="sec-head-num fade-up">// Featured Projects</span>
            <h2 className="t-h1 sec-head-title">
              <span className="line-mask"><span className="line-inner">Proyek terpilih</span></span>
              <span className="line-mask delay-1"><span className="line-inner">lintas industri.</span></span>
            </h2>
          </div>
          <p className="sec-head-right fade-up delay-2">
            Enam proyek yang merepresentasikan pengalaman membangun produk digital di berbagai industri — dari otomotif sampai SaaS.
          </p>
        </div>

        {/* Project list */}
        <ul className="work-list stagger">
          {projects.map((project) => (
            <li key={project.index}>
              <Link
                href={project.slug ? `/work/${project.slug}` : '#'}
                className="work-item"
              >
                <span className="work-index">{project.index}</span>
                <div>
                  <h3 className="work-client">{project.client}</h3>
                  <p className="work-cat">{project.industry}</p>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', alignContent: 'flex-start' }}>
                  {project.tech.map((t) => (
                    <span key={t} className="work-tag">{t}</span>
                  ))}
                </div>
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

        {/* Footer link to archive */}
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
          <span className="t-small">Menampilkan 6 dari 12+ proyek</span>
          <Link
            href="/#archive"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--ink)',
              fontSize: '0.9375rem',
              fontWeight: 500,
              transition: 'gap 300ms var(--ease-out), color 250ms var(--ease-out)',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.gap = '14px'; e.currentTarget.style.color = 'var(--accent)'; }}
            onMouseLeave={(e) => { e.currentTarget.style.gap = '8px'; e.currentTarget.style.color = 'var(--ink)'; }}
          >
            Lihat arsip lengkap
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 11L11 3M11 3H5M11 3V9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
