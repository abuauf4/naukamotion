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
    <section ref={containerRef} id="archive" className="archive-section">
      <div className="container-wide">
        {/* Header — compact */}
        <div style={{ marginBottom: '40px' }}>
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
              className="archive-item"
            >
              <span className="archive-name">{project.name}</span>
              <span className="archive-meta">{project.industry}</span>
              <span className="archive-year">{project.year}</span>
            </li>
          ))}
        </ul>
      </div>

      <style jsx>{`
        .archive-section {
          padding: 70px 0;
          background: var(--bg);
        }
        @media (min-width: 768px) {
          .archive-section { padding: 90px 0; }
        }
        @media (min-width: 1024px) {
          .archive-section { padding: 100px 0; }
        }
        .archive-item {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px;
          align-items: baseline;
          padding: 16px 0;
          border-bottom: 1px solid var(--line-soft);
          transition: padding 300ms var(--ease-out);
        }
        @media (min-width: 640px) {
          .archive-item {
            grid-template-columns: 1fr auto auto;
            gap: 24px;
            padding: 20px 0;
          }
        }
        .archive-item:hover {
          padding-left: 12px;
        }
        .archive-name {
          font-family: var(--font-clash);
          font-size: 1rem;
          font-weight: 500;
          color: var(--ink);
          letter-spacing: -0.015em;
        }
        @media (min-width: 640px) {
          .archive-name { font-size: 1.0625rem; }
        }
        .archive-meta {
          font-family: var(--font-jetbrains);
          font-size: 0.6875rem;
          color: var(--ink-faint);
          letter-spacing: 0;
          grid-column: 2;
        }
        @media (min-width: 640px) {
          .archive-meta { font-size: 0.75rem; grid-column: auto; }
        }
        .archive-year {
          font-family: var(--font-jetbrains);
          font-size: 0.6875rem;
          color: var(--ink-faint);
          font-variant-numeric: tabular-nums;
          grid-column: 2;
          grid-row: 1;
          display: none;
        }
        @media (min-width: 640px) {
          .archive-year {
            display: block;
            grid-column: auto;
            grid-row: auto;
            font-size: 0.75rem;
          }
        }
      `}</style>
    </section>
  );
}
