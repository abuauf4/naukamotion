'use client';

import { useReveal } from '@/hooks/useReveal';

/**
 * TechStackSection — full tech stack grid.
 * Categorized: Frontend, Backend, Database, DevOps, Marketing
 */

const stack = [
  { name: 'Next.js', category: 'Frontend' },
  { name: 'React', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'Node.js', category: 'Backend' },
  { name: 'Prisma', category: 'Backend' },
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'Supabase', category: 'Database' },
  { name: 'Vercel', category: 'DevOps' },
  { name: 'SEO', category: 'Marketing' },
  { name: 'Google Ads', category: 'Marketing' },
];

export function TechStackSection() {
  const containerRef = useReveal<HTMLDivElement>();

  return (
    <section ref={containerRef} id="stack" className="tech-stack-section">
      <div className="container-wide">
        {/* Header */}
        <div className="sec-head">
          <div className="sec-head-left">
            <span className="sec-head-num fade-up">// Tech Stack</span>
            <h2 className="t-h1 sec-head-title">
              <span className="line-mask"><span className="line-inner">Tools yang</span></span>
              <span className="line-mask delay-1"><span className="line-inner">dipakai harian.</span></span>
            </h2>
          </div>
          <p className="sec-head-right fade-up delay-2">
            Stack yang sudah dipakai untuk membangun &amp; mengirim 15+ produk ke production. Bukan "pernah coba", tapi benar-benar dikerjakan.
          </p>
        </div>

        {/* Stack grid */}
        <div
          className="stagger tech-stack-grid"
        >
          {stack.map((tech) => (
            <div
              key={tech.name}
              className="tech-stack-cell"
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div className="tech-stack-category">{tech.category}</div>
              <div className="tech-stack-name">{tech.name}</div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .tech-stack-section {
          padding: 80px 0;
          background: var(--bg-soft);
          transition: background 500ms var(--ease-soft);
        }
        @media (min-width: 768px) {
          .tech-stack-section { padding: 100px 0; }
        }
        @media (min-width: 1024px) {
          .tech-stack-section { padding: 120px 0; }
        }
        .tech-stack-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 0;
          border-top: 1px solid var(--line);
          border-left: 1px solid var(--line);
        }
        @media (min-width: 768px) {
          .tech-stack-grid { grid-template-columns: repeat(3, 1fr); }
        }
        @media (min-width: 1024px) {
          .tech-stack-grid { grid-template-columns: repeat(4, 1fr); }
        }
        .tech-stack-cell {
          padding: 16px;
          border-bottom: 1px solid var(--line);
          border-right: 1px solid var(--line);
          transition: background 300ms var(--ease-out);
          cursor: default;
        }
        @media (min-width: 768px) {
          .tech-stack-cell { padding: 20px; }
        }
        @media (min-width: 1024px) {
          .tech-stack-cell { padding: 24px; }
        }
        .tech-stack-category {
          font-family: var(--font-jetbrains);
          font-size: 0.625rem;
          color: var(--ink-faint);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 6px;
        }
        @media (min-width: 768px) {
          .tech-stack-category { font-size: 0.6875rem; margin-bottom: 8px; }
        }
        .tech-stack-name {
          font-family: var(--font-clash);
          font-size: 1.0625rem;
          font-weight: 500;
          color: var(--ink);
          letter-spacing: -0.02em;
        }
        @media (min-width: 768px) {
          .tech-stack-name { font-size: 1.25rem; }
        }
      `}</style>
    </section>
  );
}
