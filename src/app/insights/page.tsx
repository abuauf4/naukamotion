import type { Metadata } from "next";
import { Header } from "@/components/nauka/Header";
import { Footer } from "@/components/nauka/Footer";
import { ScrollProgress } from "@/components/nauka/ScrollProgress";

export const metadata: Metadata = {
  title: "Insights",
  description:
    "Tulisan dan wawasan dari Nauka Motion tentang desain, teknologi, dan produk digital.",
  alternates: { canonical: "/insights" },
};

export default function InsightsPage() {
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
        <section style={{ paddingBottom: "60px" }}>
          <div className="container-wide">
            <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "24px" }}>
              <span style={{ opacity: 0.5 }}>///</span>
              Insights
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
              Wawasan dari{" "}
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
                fontSize: "clamp(1.1rem, 1.6vw, 1.4rem)",
                color: "var(--ink-soft)",
                lineHeight: 1.4,
                margin: 0,
                maxWidth: "44ch",
              }}
            >
              Tulisan tentang desain, teknologi, dan pemecahan masalah digital.
              Belum ada artikel yang dipublikasikan — akan datang segera.
            </p>
          </div>
        </section>

        {/* Empty state */}
        <section style={{ paddingBottom: "120px" }}>
          <div
            style={{
              maxWidth: "860px",
              margin: "0 auto",
              paddingLeft: "clamp(20px, 5vw, 80px)",
              paddingRight: "clamp(20px, 5vw, 80px)",
              borderTop: "1px solid var(--line)",
              paddingTop: "80px",
              textAlign: "center",
            }}
          >
            <p
              className="studio-meta"
              style={{ color: "var(--ink-faint)", marginBottom: "16px" }}
            >
              Belum ada artikel
            </p>
            <p
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontSize: "1.05rem",
                color: "var(--ink-soft)",
                maxWidth: "44ch",
                margin: "0 auto",
                lineHeight: 1.55,
              }}
            >
              Insights akan diisi seiring perjalanan Nauka Motion. Sementara
              itu, lihat project kami di halaman Work.
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
