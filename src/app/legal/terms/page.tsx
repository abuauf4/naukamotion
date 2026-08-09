import type { Metadata } from "next";
import { Header } from "@/components/nauka/Header";
import { Footer } from "@/components/nauka/Footer";
import { ScrollProgress } from "@/components/nauka/ScrollProgress";

export const metadata: Metadata = {
  title: "Syarat & Ketentuan",
  description:
    "Syarat dan ketentuan penggunaan situs Nauka Motion (motion.nauka.id).",
  alternates: { canonical: "/legal/terms" },
};

const sections = [
  {
    heading: "Penerimaan Syarat",
    body: [
      "Dengan mengakses dan menggunakan situs motion.nauka.id («Situs»), Anda menyetujui untuk terikat oleh Syarat dan Ketentuan ini. Jika Anda tidak menyetujui salah satu bagian dari ketentuan ini, mohon untuk tidak menggunakan Situs.",
    ],
  },
  {
    heading: "Lisensi Penggunaan",
    body: [
      "Konten di Situs ini (teks, gambar, grafik, logo, desain) adalah milik Nauka Motion dan dilindungi oleh hukum hak cipta. Anda diperbolehkan melihat, mengunduh, dan mencetak konten untuk penggunaan pribadi non-komersial.",
      "Anda tidak diperbolehkan memodifikasi, mendistribusikan, mempublikasikan ulang, atau menggunakan konten untuk tujuan komersial tanpa izin tertulis dari Nauka Motion.",
    ],
  },
  {
    heading: "Layanan",
    body: [
      "Situs ini menyediakan informasi tentang layanan Nauka Motion serta form kontak untuk pengajuan brief proyek. Pengiriman brief tidak menjamin adanya kerja sama — Nauka Motion berhak menerima atau menolak brief berdasarkan kapasitas dan kecocokan.",
      "Detail proyek, termasuk scope, timeline, dan biaya, akan dituangkan dalam kesepakatan terpisah setelah diskusi awal.",
    ],
  },
  {
    heading: "Portofolio dan Referensi",
    body: [
      "Project yang ditampilkan di halaman Work adalah project yang telah dikerjakan atau sedang dikerjakan oleh Nauka Motion. Nama klien dan detail tertentu dapat dirahasiakan sesuai kesepakatan.",
      "Nauka Motion tidak mengklaim angka performa (close rate, conversion rate, revenue impact) yang tidak dapat diverifikasi. Setiap klaim yang ditampilkan adalah berdasarkan fakta yang dapat dibuktikan.",
    ],
  },
  {
    heading: "Tautan Pihak Ketiga",
    body: [
      "Situs ini dapat berisi tautan ke website eksternal (termasuk website klien yang live). Nauka Motion tidak bertanggung jawab atas konten atau praktik privasi situs pihak ketiga tersebut.",
    ],
  },
  {
    heading: "Batasan Tanggung Jawab",
    body: [
      "Informasi di Situs ini disediakan «apa adanya» tanpa jaminan apa pun. Nauka Motion tidak bertanggung jawab atas kerugian yang timbul dari penggunaan atau ketidakmampuan menggunakan Situs.",
    ],
  },
  {
    heading: "Perubahan Syarat",
    body: [
      "Nauka Motion berhak mengubah Syarat dan Ketentuan ini sewaktu-waktu. Perubahan berlaku sejak dipublikasikan di halaman ini. Kami sarankan untuk meninjau halaman ini secara berkala.",
    ],
  },
  {
    heading: "Hukum yang Berlaku",
    body: [
      "Syarat dan Ketentuan ini diatur oleh hukum Republik Indonesia. Setiap sengketa yang timbul akan diselesaikan melalui musyawarah, atau jika tidak tercapai, melalui jalur hukum yang berlaku di Indonesia.",
    ],
  },
  {
    heading: "Kontak",
    body: [
      "Untuk pertanyaan tentang Syarat dan Ketentuan ini, hubungi: naukamotion@gmail.com.",
    ],
  },
];

export default function TermsPage() {
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
        <section style={{ paddingBottom: "60px" }}>
          <div className="container-wide">
            <p className="eyebrow eyebrow-burnt" style={{ marginBottom: "24px" }}>
              <span style={{ opacity: 0.5 }}>///</span>
              Legal
            </p>
            <h1
              style={{
                fontFamily: "var(--font-body), sans-serif",
                fontWeight: 500,
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                lineHeight: 1.05,
                letterSpacing: "-0.025em",
                color: "var(--ink)",
                margin: 0,
                marginBottom: "16px",
              }}
            >
              Syarat &{" "}
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--burnt)",
                }}
              >
                Ketentuan
              </span>
            </h1>
            <p className="studio-meta" style={{ color: "var(--ink-faint)" }}>
              Terakhir diperbarui: 2026
            </p>
          </div>
        </section>

        <section style={{ paddingBottom: "120px" }}>
          <div
            style={{
              maxWidth: "760px",
              margin: "0 auto",
              paddingLeft: "clamp(20px, 5vw, 80px)",
              paddingRight: "clamp(20px, 5vw, 80px)",
              borderTop: "1px solid var(--line)",
              paddingTop: "60px",
            }}
          >
            {sections.map((section, i) => (
              <article
                key={i}
                style={{
                  marginBottom: "48px",
                }}
              >
                <h2
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
                  {section.heading}
                </h2>
                {section.body.map((para, j) => (
                  <p
                    key={j}
                    style={{
                      fontFamily: "var(--font-body), sans-serif",
                      fontSize: "1rem",
                      color: "var(--ink-soft)",
                      lineHeight: 1.7,
                      margin: 0,
                      marginBottom: "12px",
                    }}
                  >
                    {para}
                  </p>
                ))}
              </article>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
