'use client';

import { useReveal } from '@/hooks/useReveal';

/**
 * CapabilityPillarsSection — 5 core capability categories.
 * Not a tech stack list — these are strength pillars.
 */

const pillars = [
  {
    num: '01',
    title: 'Systems Architecture',
    desc: 'Desain database, business logic, struktur backend — ERP, kalkulator, CMS. Sistem yang scalable dan maintainable.',
  },
  {
    num: '02',
    title: 'Product & E-commerce Platforms',
    desc: 'Personalisasi user, dashboard, rekomendasi. Platform yang fokus pada konversi dan experience.',
  },
  {
    num: '03',
    title: 'Brand & Digital Storytelling',
    desc: 'Narasi, identitas visual, craft. Dari brand campaign sampai digital library format light novel.',
  },
  {
    num: '04',
    title: 'Studio & Creative Direction',
    desc: 'Nauka Motion sebagai proof of work sendiri. Studio digital milik sendiri yang showcase craft.',
  },
  {
    num: '05',
    title: 'AI-Orchestrated Development',
    desc: 'Translate kebutuhan bisnis jadi sistem lewat AI agent dengan prompting presisi — bukan syntax manual baris per baris.',
  },
];

export function CapabilityPillarsSection() {
  const containerRef = useReveal<HTMLDivElement>();

  return (
    <section ref={containerRef} id="pillars" className="pillars-section">
      <div className="container-wide">
        {/* Header */}
        <div className="sec-head">
          <div className="sec-head-left">
            <span className="sec-head-num fade-up">// Capability Pillars</span>
            <h2 className="t-h1 sec-head-title">
              <span className="line-mask"><span className="line-inner">Kekuatan inti,</span></span>
              <span className="line-mask delay-1"><span className="line-inner">bukan daftar tools.</span></span>
            </h2>
          </div>
          <p className="sec-head-right fade-up delay-2">
            Lima kategori kekuatan yang membimbing setiap keputusan teknis dan kreatif — dari arsitektur sistem sampai craft visual.
          </p>
        </div>

        {/* Pillars grid */}
        <div className="stagger pillars-grid">
          {pillars.map((p) => (
            <div key={p.num} className="pillar-item">
              <div className="pillar-num">{p.num}</div>
              <h3 className="pillar-title">{p.title}</h3>
              <p className="pillar-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        .pillars-section {
          padding: 80px 0;
          background: var(--bg-soft);
          transition: background 500ms var(--ease-soft);
        }
        @media (min-width: 768px) {
          .pillars-section { padding: 100px 0; }
        }
        @media (min-width: 1024px) {
          .pillars-section { padding: 120px 0; }
        }
        .pillars-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 0;
        }
        @media (min-width: 768px) {
          .pillars-grid { grid-template-columns: repeat(2, 1fr); gap: 0 48px; }
        }
        @media (min-width: 1024px) {
          .pillars-grid { grid-template-columns: repeat(3, 1fr); }
        }
        .pillar-item {
          padding: 24px 0;
          border-top: 1px solid var(--line);
          position: relative;
        }
        @media (min-width: 768px) {
          .pillar-item { padding: 32px 0; }
        }
        .pillar-num {
          font-family: var(--font-jetbrains);
          font-size: 0.75rem;
          color: var(--accent);
          font-weight: 500;
          margin-bottom: 16px;
          letter-spacing: 0.08em;
        }
        @media (min-width: 768px) {
          .pillar-num { margin-bottom: 24px; }
        }
        .pillar-title {
          font-family: var(--font-fraunces), serif;
          font-size: 1.25rem;
          font-weight: 500;
          color: var(--ink);
          margin: 0 0 12px;
          letter-spacing: -0.015em;
          line-height: 1.25;
          font-variation-settings: 'opsz' 40, 'wght' 500, 'SOFT' 50;
        }
        @media (min-width: 768px) {
          .pillar-title { font-size: 1.5rem; margin-bottom: 16px; }
        }
        .pillar-desc {
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--ink-soft);
          margin: 0;
          letter-spacing: -0.005em;
        }
        @media (min-width: 768px) {
          .pillar-desc { font-size: 1rem; }
        }
      `}</style>
    </section>
  );
}
