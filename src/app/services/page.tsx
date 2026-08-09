import type { Metadata } from "next";
import Link from "next/link";
import { Header } from "@/components/nauka/Header";
import { Footer } from "@/components/nauka/Footer";
import { ScrollProgress } from "@/components/nauka/ScrollProgress";
import { studioCapabilities } from "@/lib/studio-data";

export const metadata: Metadata = {
  title: "Layanan",
  description:
    "Layanan yang dapat Nauka Motion bangun: Website Development, Web Application, Business System, E-Commerce & Catalog, UI/UX & Product Design, SEO & Digital Growth.",
  alternates: { canonical: "/services" },
  openGraph: {
    title: "Layanan — Nauka Motion",
    description:
      "Jenis deliverable yang dapat Nauka Motion bangun untuk bisnis Anda.",
    type: "website",
  },
};

export default function ServicesPage() {
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
              Yang Kami Bangun
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
              Layanan yang dapat kami{" "}
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--burnt)",
                }}
              >
                kerjakan
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
              Kategori industri yang pernah kami kerjakan ada di halaman Work.
              Di sini adalah jenis deliverable yang dapat kami bangun.
            </p>
          </div>
        </section>

        {/* Capabilities grid */}
        <section style={{ paddingBottom: "120px" }}>
          <div className="container-wide">
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "0",
                borderTop: "1px solid var(--line)",
                borderLeft: "1px solid var(--line)",
              }}
              className="nmp-svc-grid"
            >
              {studioCapabilities.map((cap) => (
                <div
                  key={cap.index}
                  style={{
                    padding: "40px clamp(24px, 3vw, 36px)",
                    borderBottom: "1px solid var(--line)",
                    borderRight: "1px solid var(--line)",
                    display: "flex",
                    flexDirection: "column",
                    gap: "20px",
                  }}
                >
                  <span className="nmp-index">{cap.index}</span>
                  <h3
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontWeight: 500,
                      fontSize: "1.5rem",
                      letterSpacing: "-0.015em",
                      color: "var(--ink)",
                      margin: 0,
                      lineHeight: 1.15,
                    }}
                  >
                    {cap.title}
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
                    {cap.description.id}
                  </p>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: "8px 0 0 0",
                      display: "flex",
                      flexDirection: "column",
                      gap: "6px",
                    }}
                  >
                    {cap.deliverables.map((d) => (
                      <li
                        key={d.id}
                        style={{
                          fontFamily: "var(--font-mono), monospace",
                          fontSize: "0.72rem",
                          letterSpacing: "0.06em",
                          color: "var(--ink-faint)",
                          display: "flex",
                          gap: "8px",
                          alignItems: "baseline",
                        }}
                      >
                        <span style={{ color: "var(--burnt)", flexShrink: 0 }}>
                          ·
                        </span>
                        {d.id}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          <style>{`
            @media (max-width: 1024px) {
              .nmp-svc-grid {
                grid-template-columns: repeat(2, minmax(0, 1fr)) !important;
              }
            }
            @media (max-width: 640px) {
              .nmp-svc-grid {
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
            background: "var(--paper-warm)",
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
              Punya proyek yang layak dibangun?
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
