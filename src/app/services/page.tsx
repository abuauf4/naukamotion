import { pageMetadata } from "@/lib/seo";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioFooter } from "@/components/studio/StudioFooter";
import {
  ServiceSection,
  ProcessSection,
  FaqSection,
  ProjectCTA,
} from "@/components/studio/MarketingSections";
import { getLocale } from "@/lib/server-locale";
import {
  FileCheck2,
  MonitorSmartphone,
  BookOpen,
  Handshake,
} from "lucide-react";

export const metadata = pageMetadata({
  title: "Jasa Website, Aplikasi Android & Sistem Bisnis",
  description:
    "Layanan pembuatan website, aplikasi Android, dan sistem bisnis custom. Bahas kebutuhan, lingkup, pengujian, serta serah terima bersama Nauka Motion.",
  path: "/services",
});

export default async function ServicesPage() {
  const locale = await getLocale();
  const id = locale === "id";
  const deliveries = [
    {
      Icon: FileCheck2,
      title: id ? "Lingkup tertulis" : "Written scope",
      body: id
        ? "Fitur, hasil akhir, biaya, dan jadwal yang disepakati sebelum mulai."
        : "Features, deliverables, costs, and schedule agreed before we start.",
    },
    {
      Icon: MonitorSmartphone,
      title: id ? "Versi yang bisa dicoba" : "A version to try",
      body: id
        ? "Anda dapat meninjau desain dan menguji alur utama selama pengembangan."
        : "Review the design and test core workflows during development.",
    },
    {
      Icon: BookOpen,
      title: id ? "Panduan penggunaan" : "Usage guidance",
      body: id
        ? "Cara mengelola atau menggunakan produk dijelaskan saat serah terima."
        : "Product management and usage are explained during handover.",
    },
    {
      Icon: Handshake,
      title: id ? "Dukungan yang disepakati" : "Agreed support",
      body: id
        ? "Perbaikan, akses, berkas, dan maintenance diperjelas dalam lingkup kerja."
        : "Corrections, access, files, and maintenance are defined in the scope.",
    },
  ];
  return (
    <div className="nm-page">
      <StudioHeader />
      <main id="main-content" className="nm-subpage">
        <div className="nm-container nm-page-intro">
          <p className="nm-eyebrow">
            NAUKA MOTION / {id ? "LAYANAN" : "SERVICES"}
          </p>
          <h1>
            {id ? (
              <>
                Produk digital untuk
                <br />
                <span>langkah bisnis berikutnya.</span>
              </>
            ) : (
              <>
                Digital products for
                <br />
                <span>your next business step.</span>
              </>
            )}
          </h1>
          <p>
            {id
              ? "Jasa pembuatan website, aplikasi Android, dan sistem bisnis custom. Pilih sesuai kebutuhan, lalu pelajari lingkup dan contoh tiap layanan."
              : "Choose what fits your needs. A website to introduce your business, an app for your users, or a system to simplify daily work."}
          </p>
        </div>
        <ServiceSection locale={locale} full />
        <section className="nm-section">
          <div className="nm-container nm-delivery-grid">
            <div>
              <p className="nm-eyebrow">
                {id ? "HASIL KERJA YANG JELAS" : "CLEAR DELIVERABLES"}
              </p>
              <h2>
                {id ? (
                  <>
                    Anda tahu
                    <br />
                    <span>apa yang diterima.</span>
                  </>
                ) : (
                  <>
                    Know what
                    <br />
                    <span>you receive.</span>
                  </>
                )}
              </h2>
              <p className="nm-section-intro">
                {id
                  ? "Setiap proyek memiliki kebutuhan berbeda. Rincian serah terima dan layanan disesuaikan dalam penawaran Anda."
                  : "Every project has different needs. Handover and service details are defined in your proposal."}
              </p>
            </div>
            <div className="nm-delivery-list">
              {deliveries.map(({ Icon, title, body }) => (
                <article key={title}>
                  <Icon size={25} strokeWidth={1.5} />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <ProcessSection locale={locale} />
        <FaqSection locale={locale} />
        <ProjectCTA locale={locale} />
      </main>
      <StudioFooter locale={locale} />
    </div>
  );
}
