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
    <section ref={containerRef} id="stack" style={{ padding: '120px 0', background: 'var(--bg-soft)', transition: 'background 500ms var(--ease-soft)' }}>
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
          className="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '0',
            borderTop: '1px solid var(--line)',
            borderLeft: '1px solid var(--line)',
          }}
        >
          {stack.map((tech) => (
            <div
              key={tech.name}
              style={{
                padding: '24px',
                borderBottom: '1px solid var(--line)',
                borderRight: '1px solid var(--line)',
                transition: 'background 300ms var(--ease-out)',
                cursor: 'default',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'var(--bg)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
            >
              <div
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '0.6875rem',
                  color: 'var(--ink-faint)',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                  fontWeight: 500,
                  marginBottom: '8px',
                }}
              >
                {tech.category}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-clash)',
                  fontSize: '1.25rem',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  letterSpacing: '-0.02em',
                }}
              >
                {tech.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          div[style*='grid-template-columns: repeat(2, 1fr)'] {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
        @media (min-width: 1024px) {
          div[style*='grid-template-columns: repeat(2, 1fr)'] {
            grid-template-columns: repeat(4, 1fr) !important;
          }
        }
      `}</style>
    </section>
  );
}
