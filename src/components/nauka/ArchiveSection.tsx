'use client';

import { useReveal } from '@/hooks/useReveal';

/**
 * ArchiveSection — compact list of other projects.
 * No tech tags, no descriptions, just client + industry + year.
 */

interface ArchiveProject {
  name: string;
  industry: string;
  year: string;
}

const archiveProjects: ArchiveProject[] = [
  { name: 'Mitsubishi Sales', industry: 'Automotive', year: '2025' },
  { name: 'Jejak Cahaya Media', industry: 'Media', year: '2025' },
  { name: 'Anima Companion', industry: 'App', year: '2025' },
  { name: 'Internal Dashboard', industry: 'Internal Tool', year: '2024' },
  { name: 'Landing Pages', industry: 'Various', year: '2024' },
  { name: 'Experimental Products', industry: 'R&D', year: '2024' },
];

export function ArchiveSection() {
  const containerRef = useReveal<HTMLDivElement>();

  return (
    <section ref={containerRef} id="archive" style={{ padding: '100px 0', background: 'var(--bg)' }}>
      <div className="container-wide">
        {/* Header — compact */}
        <div style={{ marginBottom: '48px' }}>
          <span className="sec-head-num fade-up">// Archive</span>
          <h2 className="t-h2 fade-up delay-1" style={{ margin: '16px 0 0', maxWidth: '20ch' }}>
            Project lain yang pernah dikerjakan.
          </h2>
        </div>

        {/* Compact list */}
        <ul
          className="stagger"
          style={{ listStyle: 'none', padding: 0, margin: 0, borderTop: '1px solid var(--line-soft)' }}
        >
          {archiveProjects.map((project) => (
            <li
              key={project.name}
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr auto auto',
                gap: '24px',
                alignItems: 'baseline',
                padding: '20px 0',
                borderBottom: '1px solid var(--line-soft)',
                transition: 'padding 300ms var(--ease-out)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.paddingLeft = '12px')}
              onMouseLeave={(e) => (e.currentTarget.style.paddingLeft = '0')}
            >
              <span
                style={{
                  fontFamily: 'var(--font-clash)',
                  fontSize: '1.0625rem',
                  fontWeight: 500,
                  color: 'var(--ink)',
                  letterSpacing: '-0.015em',
                }}
              >
                {project.name}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '0.75rem',
                  color: 'var(--ink-faint)',
                  letterSpacing: '0',
                }}
              >
                {project.industry}
              </span>
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '0.75rem',
                  color: 'var(--ink-faint)',
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {project.year}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
