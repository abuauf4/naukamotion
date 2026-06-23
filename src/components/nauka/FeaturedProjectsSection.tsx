'use client';

import { useReveal } from '@/hooks/useReveal';
import Link from 'next/link';

/**
 * FeaturedProjectsSection — projects grouped by industry category.
 * 11 concrete projects from 41 total, picked per category.
 */

interface Project {
  name: string;
  description: string;
  tech: string[];
  url?: string;
  slug?: string;
}

interface Category {
  title: string;
  projects: Project[];
}

const categories: Category[] = [
  {
    title: 'Enterprise & Business Systems',
    projects: [
      {
        name: 'Inventra ERP',
        description: 'Sistem inventory & dashboard untuk UMKM, manajemen stok multi-cabang dengan workflow otomatis.',
        tech: ['Next.js', 'TypeScript', 'PostgreSQL'],
        slug: 'inventra',
      },
      {
        name: 'CMS Core + Module',
        description: 'Infrastruktur reusable dengan arsitektur modular untuk membangun multiple product platforms.',
        tech: ['Next.js', 'Prisma', 'Supabase'],
        slug: 'cms-core',
      },
      {
        name: 'JasaProtect',
        description: 'Kalkulator premi asuransi dengan dataset besar & logika kalkulasi otomatis yang akurat.',
        tech: ['Next.js', 'Supabase', 'Tailwind'],
        url: 'https://jasa-proteksi.vercel.app',
        slug: 'jasaprotect',
      },
    ],
  },
  {
    title: 'Automotive Dealer Platforms',
    projects: [
      {
        name: 'Mitsubishi Motor Indonesia',
        description: 'Dealer platform dengan 92 backend endpoints, inventaris real-time, dan integrasi sales workflow.',
        tech: ['Next.js', 'Supabase', 'Vercel'],
        slug: 'mitsubishi',
      },
      {
        name: 'Geely Pluit EV',
        description: 'Dealer site EV dengan branding modern, perbandingan model, dan fast-charging info.',
        tech: ['Next.js', 'Supabase', 'Tailwind'],
        url: 'https://elgeelypluit.id',
        slug: 'geely-pluit',
      },
    ],
  },
  {
    title: 'E-commerce & Personalized Platforms',
    projects: [
      {
        name: 'Tumbuhku.id',
        description: 'E-commerce perlengkapan bayi dengan profil bayi & rekomendasi kebutuhan personal.',
        tech: ['Next.js', 'PostgreSQL', 'Prisma'],
        slug: 'tumbuhku',
      },
      {
        name: 'Anima Companion',
        description: 'Company profile + e-commerce hybrid dengan profil hewan peliharaan dan rekomendasi produk.',
        tech: ['Next.js', 'Supabase', 'Tailwind'],
        slug: 'anima-companion',
      },
      {
        name: 'Nauka Gadget',
        description: 'E-commerce penjualan gadget premium dengan garansi resmi dan checkout yang clean.',
        tech: ['Next.js', 'Supabase', 'Vercel'],
        url: 'https://naukagadget.vercel.app',
        slug: 'nauka-gadget',
      },
    ],
  },
  {
    title: 'Booking & Service Platforms',
    projects: [
      {
        name: 'Padel Club Booking',
        description: 'Sistem booking & scheduling lapangan padel dengan jadwal real-time dan membership.',
        tech: ['Next.js', 'Supabase', 'React Query'],
        slug: 'padel-club',
      },
      {
        name: 'Nauka Kostay',
        description: 'Platform layanan akomodasi/kos dengan virtual tour dan booking flow seamless.',
        tech: ['Next.js', 'Supabase', 'Tailwind'],
        url: 'https://nauka-kostay.vercel.app',
        slug: 'nauka-kostay',
      },
    ],
  },
  {
    title: 'Studio & Digital Craft',
    projects: [
      {
        name: 'Nauka Motion',
        description: 'Studio digital milik sendiri — portfolio dalam portfolio, dark theme, Fraunces serif, burnt orange accent.',
        tech: ['Next.js', 'Tailwind', 'Framer Motion'],
        url: 'https://naukamotion.id',
        slug: 'nauka-motion',
      },
      {
        name: 'Jejak Cahaya',
        description: 'Digital library/storytelling project — Sirah Nabawiyah, 8 fase, 47 chapter, light novel format.',
        tech: ['Next.js', 'Tailwind', 'MDX'],
        url: 'https://jejakcahaya.vercel.app',
        slug: 'jejak-cahaya',
      },
    ],
  },
  {
    title: 'Wedding & Event',
    projects: [
      {
        name: 'Irwan & Anira',
        description: 'Undangan digital sinematik dengan handwriting animation, falling leaf effect, integrasi ayat Al-Qur\'an.',
        tech: ['Next.js', 'Framer Motion', 'Canvas'],
        slug: 'irwan-anira',
      },
    ],
  },
];

export function FeaturedProjectsSection() {
  const containerRef = useReveal<HTMLDivElement>();

  return (
    <section ref={containerRef} id="projects" className="projects-section">
      <div className="container-wide">
        {/* Header */}
        <div className="sec-head">
          <div className="sec-head-left">
            <span className="sec-head-num fade-up">// Featured Work</span>
            <h2 className="t-h1 sec-head-title">
              <span className="line-mask"><span className="line-inner">Proyek terpilih</span></span>
              <span className="line-mask delay-1"><span className="line-inner">per kategori.</span></span>
            </h2>
          </div>
          <p className="sec-head-right fade-up delay-2">
            11 proyek konkret dari 41 total, dikelompokkan per industri. Dipilih yang paling representatif per kategori.
          </p>
        </div>

        {/* Categories */}
        <div className="categories-wrap">
          {categories.map((category, catIdx) => (
            <div key={category.title} className="category-block stagger">
              <h3 className="category-title">
                <span className="category-num">{String(catIdx + 1).padStart(2, '0')}</span>
                <span>{category.title}</span>
              </h3>
              <ul className="category-projects">
                {category.projects.map((project) => (
                  <li key={project.name}>
                    <Link
                      href={project.slug ? `/work/${project.slug}` : '#'}
                      className="project-item"
                    >
                      <div className="project-header">
                        <span className="project-name">{project.name}</span>
                        {project.url && (
                          <span className="project-external">
                            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                              <path d="M3 9L9 3M9 3H4M9 3V8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                        )}
                      </div>
                      <p className="project-desc">{project.description}</p>
                      <div className="project-tags">
                        {project.tech.map((t) => (
                          <span key={t} className="project-tag">{t}</span>
                        ))}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .projects-section {
          padding: 80px 0;
          background: var(--bg);
        }
        @media (min-width: 768px) {
          .projects-section { padding: 100px 0; }
        }
        @media (min-width: 1024px) {
          .projects-section { padding: 120px 0; }
        }
        .categories-wrap {
          display: flex;
          flex-direction: column;
          gap: 56px;
        }
        @media (min-width: 768px) {
          .categories-wrap { gap: 72px; }
        }
        .category-block {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .category-title {
          font-family: var(--font-jetbrains);
          font-size: 0.75rem;
          font-weight: 500;
          color: var(--ink-faint);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin: 0;
          display: flex;
          align-items: center;
          gap: 12px;
          padding-bottom: 16px;
          border-bottom: 1px solid var(--line-soft);
        }
        .category-num {
          font-family: var(--font-jetbrains);
          color: var(--accent);
          font-variant-numeric: tabular-nums;
        }
        .category-projects {
          list-style: none;
          padding: 0;
          margin: 0;
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 768px) {
          .category-projects { grid-template-columns: repeat(2, 1fr); gap: 0 32px; }
        }
        @media (min-width: 1024px) {
          .category-projects { grid-template-columns: repeat(3, 1fr); }
        }
        .project-item {
          display: block;
          padding: 20px 0;
          border-top: 1px solid var(--line-soft);
          text-decoration: none;
          color: inherit;
          transition: padding 300ms var(--ease-out);
        }
        .project-item:hover {
          padding-left: 12px;
          padding-right: 12px;
        }
        .project-header {
          display: flex;
          align-items: baseline;
          justify-content: space-between;
          gap: 8px;
          margin-bottom: 8px;
        }
        .project-name {
          font-family: var(--font-fraunces), serif;
          font-size: 1.125rem;
          font-weight: 500;
          color: var(--ink);
          letter-spacing: -0.015em;
          transition: color 300ms var(--ease-out);
          font-variation-settings: 'opsz' 40, 'wght' 500;
        }
        @media (min-width: 768px) {
          .project-name { font-size: 1.25rem; }
        }
        .project-item:hover .project-name { color: var(--accent); }
        .project-external {
          color: var(--ink-faint);
          flex-shrink: 0;
          transition: color 300ms var(--ease-out);
        }
        .project-item:hover .project-external { color: var(--accent); }
        .project-desc {
          font-size: 0.875rem;
          color: var(--ink-soft);
          line-height: 1.55;
          margin: 0 0 12px;
          letter-spacing: -0.005em;
        }
        @media (min-width: 768px) {
          .project-desc { font-size: 0.9375rem; }
        }
        .project-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }
        .project-tag {
          font-family: var(--font-jetbrains);
          font-size: 0.6875rem;
          color: var(--ink-soft);
          background: var(--bg-soft);
          border: 1px solid var(--line);
          padding: 3px 8px;
          border-radius: 4px;
          letter-spacing: 0;
          font-weight: 500;
        }
      `}</style>
    </section>
  );
}
