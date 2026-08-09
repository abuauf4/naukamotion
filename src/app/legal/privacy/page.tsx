import type { Metadata } from "next";
import { Header } from "@/components/nauka/Header";
import { Footer } from "@/components/nauka/Footer";
import { ScrollProgress } from "@/components/nauka/ScrollProgress";

export const metadata: Metadata = {
  title: "Kebijakan Privasi",
  description:
    "Kebijakan privasi Nauka Motion terkait pengumpulan, penggunaan, dan perlindungan data pribadi.",
  alternates: { canonical: "/legal/privacy" },
};

const sections = [
  {
    heading: "Pendahuluan",
    body: [
      "Nauka Motion («kami») menghormati privasi pengunjung situs motion.nauka.id («Situs»). Kebijakan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, dan melindungi data pribadi yang Anda berikan saat menggunakan Situs.",
      "Dengan mengakses Situs, Anda menyetujui praktik yang dijelaskan dalam Kebijakan Privasi ini.",
    ],
  },
  {
    heading: "Data yang Kami Kumpulkan",
    body: [
      "Kami mengumpulkan informasi yang Anda berikan secara sukarela melalui form kontak atau brief proyek, yaitu: nama, email, nomor telepon/WhatsApp, nama perusahaan, jenis proyek, budget, timeline, dan pesan/cerita singkat.",
      "Selain itu, kami dapat mengumpulkan data analitik anonim (halaman yang dikunjungi, durasi sesi, perangkat yang digunakan) melalui layanan analitik pihak ketiga untuk memahami bagaimana Situs digunakan.",
    ],
  },
  {
    heading: "Penggunaan Data",
    body: [
      "Data pribadi yang Anda berikan melalui form kontak digunakan untuk: merespons pertanyaan Anda, menindaklanjuti brief proyek, mengirim proposal atau penawaran, dan keperluan administratif terkait potensi kerja sama.",
      "Kami tidak menjual, menyewakan, atau membagikan data pribadi Anda kepada pihak ketiga untuk tujuan pemasaran.",
    ],
  },
  {
    heading: "Penyimpanan dan Keamanan",
    body: [
      "Data brief proyek disimpan dalam sistem internal kami dan hanya dapat diakses oleh anggota tim Nauka Motion yang memerlukan akses untuk menindaklanjuti permintaan Anda.",
      "Kami menerapkan langkah-langkah teknis dan organisasi yang wajar untuk melindungi data Anda dari akses tidak sah, kehilangan, atau penyalahgunaan.",
    ],
  },
  {
    heading: "Hak Anda",
    body: [
      "Anda berhak untuk meminta akses, koreksi, atau penghapusan data pribadi yang Anda berikan kepada kami. Untuk menggunakan hak ini, hubungi kami melalui email di naukamotion@gmail.com.",
      "Anda juga berhak menarik persetujuan Anda untuk pengumpulan data di masa mendatang dengan berhenti menggunakan form kontak kami.",
    ],
  },
  {
    heading: "Cookie",
    body: [
      "Situs ini menggunakan cookie untuk menyimpan preferensi pengguna (tema terang/gelap, bahasa) dan untuk analitik. Anda dapat mengatur browser untuk menolak cookie, namun beberapa fitur Situs mungkin tidak berfungsi dengan baik.",
    ],
  },
  {
    heading: "Perubahan Kebijakan",
    body: [
      "Kami dapat memperbarui Kebijakan Privasi ini dari waktu ke waktu. Perubahan akan dipublikasikan di halaman ini dengan tanggal pembaruan. Kami sarankan untuk meninjau halaman ini secara berkala.",
    ],
  },
  {
    heading: "Kontak",
    body: [
      "Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini, hubungi kami melalui email: naukamotion@gmail.com.",
    ],
  },
];

export default function PrivacyPolicyPage() {
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
              Kebijakan{" "}
              <span
                style={{
                  fontFamily: "var(--font-fraunces), serif",
                  fontStyle: "italic",
                  fontWeight: 400,
                  color: "var(--burnt)",
                }}
              >
                Privasi
              </span>
            </h1>
            <p
              className="studio-meta"
              style={{ color: "var(--ink-faint)" }}
            >
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
