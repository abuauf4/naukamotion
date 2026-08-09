import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/nauka/Header";
import { Footer } from "@/components/nauka/Footer";
import { ScrollProgress } from "@/components/nauka/ScrollProgress";

export const metadata: Metadata = {
  title: "Tentang Nauka Motion",
  description:
    "Nauka Motion adalah studio produk digital yang dibangun dan dipimpin oleh Abu Aufa, berbasis di Jakarta, bekerja lintas industri — otomotif, retail teknologi, asuransi, brand konsumen, pariwisata, dan produk internal Nauka Labs.",
  alternates: { canonical: "/about" },
  openGraph: {
    title: "Tentang Nauka Motion",
    description:
      "Studio produk digital yang dibangun dan dipimpin oleh Abu Aufa, berbasis di Jakarta.",
    type: "website",
  },
};

const coreValues = [
  {
    title: "Impact-First",
    description:
      "Setiap keputusan diukur dari dampak nyata yang dihasilkan. Bukan sekadar tampilan, tapi hasil yang bisa dirasakan bisnis Anda.",
  },
  {
    title: "Craft over Speed",
    description:
      "Kualitas tidak bisa dipercepat. Setiap baris kode, setiap interaksi, dirancang dengan teliti dan penuh pertimbangan.",
  },
  {
    title: "Partnership",
    description:
      "Kami bukan vendor — kami mitra. Keberhasilan proyek Anda adalah keberhasilan kami. Hubungan jangka panjang, bukan transaksi sekali jalan.",
  },
];

export default function AboutPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "var(--bg)",
      }}
    >
      <ScrollProgress />
      <Header />

      <main style={{ flex: 1, paddingTop: "120px" }}>
        {/* Hero */}
        <section style={{ paddingBottom: "80px" }}>
          <div className="container-wide">
            <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "24px" }}>
              <span style={{ opacity: 0.5 }}>///</span>
              Tentang Kami
            </p>
            <h1
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2.5rem, 7vw, 5rem)",
                lineHeight: 1.02,
                letterSpacing: "-0.03em",
                color: "var(--ink)",
                margin: 0,
                marginBottom: "32px",
                maxWidth: "16ch",
              }}
            >
              Tentang{" "}
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--burnt)",
                }}
              >
                Nauka Motion
              </span>
            </h1>
            <p
              style={{
                fontFamily: "var(--font-fraunces), serif",
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
                color: "var(--ink-soft)",
                lineHeight: 1.4,
                margin: 0,
                maxWidth: "44ch",
              }}
            >
              Studio produk digital yang menggabungkan desain, teknologi, dan
              pemecahan masalah untuk membangun produk yang bekerja.
            </p>
          </div>
        </section>

        {/* Story */}
        <section
          style={{
            paddingBottom: "100px",
            borderTop: "1px solid var(--line)",
            paddingTop: "80px",
          }}
        >
          <div className="container-wide">
            <div
              style={{
                maxWidth: "60ch",
              }}
            >
              <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "24px" }}>
                <span style={{ opacity: 0.5 }}>///</span>
                Cerita Kami
              </p>
              <h2
                style={{
                  fontFamily: "var(--font-body), sans-serif",
                  fontWeight: 500,
                  fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.1,
                  color: "var(--ink)",
                  margin: 0,
                  marginBottom: "32px",
                }}
              >
                Dari sebuah ide kecil di Jakarta
              </h2>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "20px",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "1.05rem",
                    color: "var(--ink-soft)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Nauka Motion dimulai dari satu keyakinan sederhana:{" "}
                  <strong style={{ color: "var(--ink)", fontWeight: 500 }}>
                    setiap proyek besar dimulai dari gerakan kecil.
                  </strong>{" "}
                  Didirikan oleh Abu Aufa — seorang web developer dan digital
                  strategist yang berbasis di Jakarta — Nauka lahir dari
                  pengalaman langsung melihat bagaimana bisnis seringkali
                  kesulitan mengubah ide menjadi produk digital yang
                  benar-benar berdampak.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "1.05rem",
                    color: "var(--ink-soft)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Filosofi{" "}
                  <em
                    style={{
                      fontFamily: "var(--font-fraunces), serif",
                      fontStyle: "italic",
                      color: "var(--ink)",
                      fontWeight: 400,
                    }}
                  >
                    &quot;Small Movement. Real Impact.&quot;
                  </em>{" "}
                  bukan sekadar tagline. Ini adalah cara kami bekerja. Setiap
                  proyek dimulai dari pemahaman mendalam tentang masalah yang
                  ingin diselesaikan — bukan langsung ke desain atau kode.
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-body), sans-serif",
                    fontSize: "1.05rem",
                    color: "var(--ink-soft)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  Dari dealer otomotif, bisnis retail teknologi, platform
                  asuransi, brand konsumen, hingga pariwisata — kami telah
                  melihat pola yang sama: bisnis tidak butuh sekadar website
                  yang cantik. Mereka butuh{" "}
                  <strong style={{ color: "var(--ink)", fontWeight: 500 }}>
                    produk digital yang mendorong pertumbuhan nyata
                  </strong>{" "}
                  — lebih banyak leads, proses lebih efisien, pengalaman
                  pelanggan yang lebih baik.
                </p>
              </div>
              <div
                style={{
                  marginTop: "40px",
                  paddingTop: "24px",
                  borderTop: "1px solid var(--line)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-mono), monospace",
                    fontSize: "0.78rem",
                    color: "var(--ink-faint)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    margin: 0,
                  }}
                >
                  — Abu Aufa, Pendiri Nauka Motion
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section
          style={{
            paddingBottom: "100px",
            background: "var(--paper-warm)",
            borderTop: "1px solid var(--line)",
            paddingTop: "80px",
          }}
        >
          <div className="container-wide">
            <p
              className="eyebrow eyebrow-burnt"
              style={{
                marginBottom: "20px",
                textAlign: "center",
                justifyContent: "center",
                display: "flex",
              }}
            >
              <span style={{ opacity: 0.5 }}>///</span>
              Nilai-Nilai Kami
            </p>
            <h2
              className="studio-h2"
              style={{
                textAlign: "center",
                marginBottom: "60px",
                maxWidth: "32ch",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            >
              Prinsip yang membimbing setiap keputusan
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "32px",
              }}
              className="nmp-values-grid"
            >
              {coreValues.map((value) => (
                <div
                  key={value.title}
                  style={{
                    padding: "32px",
                    background: "var(--bg-card)",
                    border: "1px solid var(--line)",
                    borderRadius: "8px",
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontWeight: 500,
                      fontSize: "1.4rem",
                      letterSpacing: "-0.015em",
                      color: "var(--ink)",
                      margin: 0,
                      marginBottom: "16px",
                    }}
                  >
                    {value.title}
                  </h3>
                  <p
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontSize: "0.95rem",
                      color: "var(--ink-soft)",
                      lineHeight: 1.55,
                      margin: 0,
                    }}
                  >
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 768px) {
              .nmp-values-grid {
                grid-template-columns: minmax(0, 1fr) !important;
              }
            }
          `}</style>
        </section>

        {/* CTA */}
        <section
          style={{
            paddingTop: "100px",
            paddingBottom: "100px",
            background: "var(--bg)",
            borderTop: "1px solid var(--line)",
          }}
        >
          <div
            className="container-wide"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              gap: "32px",
            }}
          >
            <p className="eyebrow eyebrow-burnt">
              <span style={{ opacity: 0.5 }}>///</span>
              Ingin bekerja sama?
            </p>
            <h2
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2rem, 5vw, 3.5rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                margin: 0,
                maxWidth: "16ch",
              }}
            >
              Mulai{" "}
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--burnt)",
                }}
              >
                proyek
              </span>{" "}
              bersama kami.
            </h2>
            <Link href="/contact" className="nmp-btn nmp-btn-primary">
              Hubungi Kami
              <svg
                width="11"
                height="11"
                viewBox="0 0 12 12"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M2 10L10 2M10 2H4M10 2V8"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
