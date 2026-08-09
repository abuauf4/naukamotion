import type { Metadata } from "next";
import { Header } from "@/components/nauka/Header";
import { Footer } from "@/components/nauka/Footer";
import { ScrollProgress } from "@/components/nauka/ScrollProgress";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Pertanyaan yang sering diajukan tentang layanan dan cara bekerja Nauka Motion.",
  alternates: { canonical: "/faq" },
};

const faqItems = [
  {
    question: "Berapa lama waktu pengerjaan website?",
    answer:
      "Waktu pengerjaan tergantung kompleksitas proyek. Landing page biasanya 2-3 minggu, website dengan fitur custom 4-8 minggu, dan sistem bisnis 6-12 minggu.",
  },
  {
    question: "Berapa biaya pembuatan website?",
    answer:
      "Biaya bervariasi sesuai kebutuhan. Kami menawarkan paket yang dapat disesuaikan dengan budget Anda. Hubungi kami untuk konsultasi dan penawaran detail.",
  },
  {
    question: "Apakah website akan responsif di mobile?",
    answer:
      "Ya. Semua website yang kami buat responsif dan dioptimasi untuk semua perangkat — desktop, tablet, dan mobile.",
  },
  {
    question: "Apakah ada layanan maintenance?",
    answer:
      "Ya, kami menyediakan paket maintenance bulanan yang mencakup update keamanan, backup rutin, dan dukungan teknis.",
  },
  {
    question: "Apakah saya bisa mengelola konten sendiri?",
    answer:
      "Ya, kami bisa mengintegrasikan CMS yang memungkinkan Anda mengelola konten tanpa pengetahuan teknis.",
  },
  {
    question: "Bagaimana proses kerja Nauka Motion?",
    answer:
      "Proses kami: Diskusi → Definisi → Desain → Pengembangan → Evolusi. Anda terlibat di setiap tahap.",
  },
];

export default function FAQPage() {
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
              FAQ
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
              Pertanyaan yang sering{" "}
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--burnt)",
                }}
              >
                diajukan
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
              Beberapa hal yang sering ditanyakan calon klien sebelum mulai
              bekerja dengan kami.
            </p>
          </div>
        </section>

        {/* FAQ list */}
        <section style={{ paddingBottom: "120px" }}>
          <div
            style={{
              maxWidth: "860px",
              margin: "0 auto",
              paddingLeft: "clamp(20px, 5vw, 80px)",
              paddingRight: "clamp(20px, 5vw, 80px)",
            }}
          >
            <div
              style={{
                borderTop: "1px solid var(--line)",
              }}
            >
              {faqItems.map((item, i) => (
                <details
                  key={i}
                  style={{
                    borderBottom: "1px solid var(--line)",
                    padding: "28px 0",
                  }}
                >
                  <summary
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontWeight: 500,
                      fontSize: "1.1rem",
                      color: "var(--ink)",
                      cursor: "pointer",
                      listStyle: "none",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "baseline",
                      gap: "16px",
                    }}
                  >
                    <span style={{ flex: 1 }}>{item.question}</span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono), monospace",
                        fontSize: "0.78rem",
                        color: "var(--burnt)",
                        letterSpacing: "0.12em",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </summary>
                  <p
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontSize: "1rem",
                      color: "var(--ink-soft)",
                      lineHeight: 1.65,
                      margin: "16px 0 0 0",
                    }}
                  >
                    {item.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
