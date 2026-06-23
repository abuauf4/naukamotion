'use client';

import { useReveal } from '@/hooks/useReveal';

/**
 * PhilosophySection — Cara Berpikir (Developer Theme)
 *
 * Three principles in a 3-column grid. Minimal — no cards, just top border,
 * italic numbering, title, description. Generous whitespace.
 */

const principles = [
  {
    num: '01 — Small Movement',
    title: 'Perubahan kecil yang tepat.',
    desc: 'Lebih berharga daripada perubahan besar yang tidak terarah. Kami memulai dari hal yang paling penting, lalu memperhalus sedikit demi sedikit.',
  },
  {
    num: '02 — Real Impact',
    title: 'Hasil yang benar-benar digunakan.',
    desc: 'Bukan sekadar terlihat menarik. Setiap keputusan desain dan teknologi diuji dengan satu pertanyaan: apakah ini membantu pengguna?',
  },
  {
    num: '03 — Build With Purpose',
    title: 'Setiap detail memiliki alasan.',
    desc: 'Tidak ada elemen yang ada kebetulan. Setiap halaman, fitur, dan interaksi memiliki tujuan yang jelas — atau kami hapus.',
  },
];

export function PhilosophySection() {
  const containerRef = useReveal<HTMLDivElement>();

  return (
    <section
      ref={containerRef}
      id="philosophy"
      style={{
        padding: '160px 0',
        background: 'var(--bg-soft)',
        position: 'relative',
        transition: 'background 500ms var(--ease-soft)',
      }}
    >
      <div className="container-wide">
        {/* Intro */}
        <div style={{ maxWidth: '560px', marginBottom: '96px' }}>
          <span className="sec-head-num fade-up">// Cara Berpikir</span>
          <h2 className="t-h1" style={{ margin: '24px 0 0' }}>
            <span className="line-mask"><span className="line-inner">Tiga prinsip yang</span></span>
            <span className="line-mask delay-1"><span className="line-inner">membimbing keputusan.</span></span>
          </h2>
          <p className="t-body-lg fade-up delay-2" style={{ margin: '24px 0 0' }}>
            Kami percaya bahwa produk digital yang baik lahir dari keputusan-keputusan kecil yang tepat — bukan dari fitur yang banyak atau visual yang ramai.
          </p>
        </div>

        {/* List */}
        <div
          className="stagger"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 0,
          }}
        >
          {principles.map((p) => (
            <div
              key={p.num}
              style={{
                padding: '32px 0 0',
                borderTop: '1px solid var(--line)',
                position: 'relative',
              }}
            >
              <span
                style={{
                  fontFamily: 'var(--font-jetbrains)',
                  fontSize: '0.6875rem',
                  color: 'var(--accent)',
                  fontWeight: 500,
                  marginBottom: '28px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  letterSpacing: '0.08em',
                  textTransform: 'uppercase',
                }}
              >
                <span style={{ width: '20px', height: '1px', background: 'var(--accent)' }} />
                {p.num}
              </span>
              <h3 className="philosophy-title" style={{ margin: '0 0 20px', fontFamily: 'var(--font-clash)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--ink)', lineHeight: 1.15, letterSpacing: '-0.025em' }}>
                {p.title}
              </h3>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.7, color: 'var(--ink-soft)', margin: 0, letterSpacing: '-0.005em' }}>
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 900px) {
          div[style*='grid-template-columns: 1fr'][class*='stagger'] {
            grid-template-columns: repeat(3, 1fr) !important;
            gap: 56px !important;
          }
        }
      `}</style>
    </section>
  );
}
