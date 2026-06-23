'use client';

import { useReveal } from '@/hooks/useReveal';

/**
 * ProcessSection — 5-step workflow.
 * How client requirements become shipped systems.
 */

const steps = [
  {
    num: '01',
    title: 'Discovery',
    desc: 'Pahami kebutuhan bisnis & user flow. Sesi mendalam untuk translate requirements ke struktur konseptual.',
  },
  {
    num: '02',
    title: 'Architecture',
    desc: 'Rancang struktur data, logic, dan sistem. Skema database, API design, modul breakdown — semua di-map sebelum eksekusi.',
  },
  {
    num: '03',
    title: 'AI-Orchestrated Build',
    desc: 'Eksekusi lewat AI agent dengan prompting presisi. Bukan koding manual baris per baris — tapi orchestrasi sistem yang scalable.',
  },
  {
    num: '04',
    title: 'Design Direction',
    desc: 'Visual & UX disesuaikan dengan brand dan domain. Setiap detail punya alasan — typography, motion, color palette.',
  },
  {
    num: '05',
    title: 'Delivery & Iterasi',
    desc: 'Deploy, review, refine. Iterasi cepat berdasarkan feedback real-world, bukan asumsi.',
  },
];

export function ProcessSection() {
  const containerRef = useReveal<HTMLDivElement>();

  return (
    <section ref={containerRef} id="process" className="process-section">
      <div className="container-wide">
        {/* Header */}
        <div className="sec-head">
          <div className="sec-head-left">
            <span className="sec-head-num fade-up">// Proses Kerja</span>
            <h2 className="t-h1 sec-head-title">
              <span className="line-mask"><span className="line-inner">Dari kebutuhan</span></span>
              <span className="line-mask delay-1"><span className="line-inner">jadi sistem.</span></span>
            </h2>
          </div>
          <p className="sec-head-right fade-up delay-2">
            Cara saya translate kebutuhan klien jadi sistem yang jalan. Bukan workflow linear — tapi loop iteratif yang adaptif.
          </p>
        </div>

        {/* Steps */}
        <ol className="stagger process-list">
          {steps.map((step) => (
            <li key={step.num} className="process-item">
              <div className="process-num">{step.num}</div>
              <div className="process-content">
                <h3 className="process-title">{step.title}</h3>
                <p className="process-desc">{step.desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>

      <style jsx>{`
        .process-section {
          padding: 80px 0;
          background: var(--bg);
        }
        @media (min-width: 768px) {
          .process-section { padding: 100px 0; }
        }
        @media (min-width: 1024px) {
          .process-section { padding: 120px 0; }
        }
        .process-list {
          list-style: none;
          padding: 0;
          margin: 0;
          border-top: 1px solid var(--line);
        }
        .process-item {
          display: grid;
          grid-template-columns: 60px 1fr;
          gap: 24px;
          padding: 28px 0;
          border-bottom: 1px solid var(--line-soft);
          align-items: start;
          transition: padding 400ms var(--ease-out);
        }
        @media (min-width: 768px) {
          .process-item {
            grid-template-columns: 100px 1fr;
            gap: 48px;
            padding: 36px 0;
          }
        }
        .process-item:hover {
          padding-left: 16px;
        }
        .process-num {
          font-family: var(--font-jetbrains);
          font-size: 0.875rem;
          color: var(--accent);
          font-weight: 500;
          font-variant-numeric: tabular-nums;
          letter-spacing: 0.08em;
          padding-top: 4px;
        }
        .process-content {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }
        .process-title {
          font-family: var(--font-fraunces), serif;
          font-size: 1.375rem;
          font-weight: 500;
          color: var(--ink);
          margin: 0;
          letter-spacing: -0.015em;
          line-height: 1.2;
          font-variation-settings: 'opsz' 40, 'wght' 500, 'SOFT' 50;
        }
        @media (min-width: 768px) {
          .process-title { font-size: 1.625rem; }
        }
        .process-desc {
          font-size: 0.9375rem;
          line-height: 1.65;
          color: var(--ink-soft);
          margin: 0;
          max-width: 56ch;
          letter-spacing: -0.005em;
        }
      `}</style>
    </section>
  );
}
