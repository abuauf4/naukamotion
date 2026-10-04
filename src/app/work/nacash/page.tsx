import {
  absoluteUrl,
  breadcrumbSchema,
  pageMetadata,
} from "@/lib/seo";
import { studioOrganization } from "@/lib/studio-schema";
import { StructuredData } from "@/components/studio/StructuredData";
import { NaCashEditorial } from "@/components/studio/ProjectEditorial";
import Image from "next/image";
import Link from "next/link";
import {
  Check,
  Smartphone,
  ShoppingBag,
  Package,
  ChartNoAxesCombined,
} from "lucide-react";
import { StudioHeader } from "@/components/studio/StudioHeader";
import { StudioFooter } from "@/components/studio/StudioFooter";
import { ProjectCTA } from "@/components/studio/MarketingSections";
import { getLocale } from "@/lib/server-locale";
export const metadata = pageMetadata({
  title: "NaCash — Aplikasi Kasir & Keuangan Android",
  description:
    "NaCash, ekosistem aplikasi kasir dan pencatatan keuangan buatan Nauka. Contoh pengembangan produk Android dengan alur transaksi, stok, serta laporan.",
  path: "/work/nacash",
});
export default async function NaCashPage() {
  const locale = await getLocale();
  const id = locale === "id";
  const features = [
    {
      Icon: ShoppingBag,
      title: id ? "Transaksi kasir" : "Point-of-sale transactions",
      body: id
        ? "Alur penjualan yang disesuaikan dengan jenis usaha, termasuk produk dan varian."
        : "Sales workflows tailored to the business type, including products and variants.",
    },
    {
      Icon: Package,
      title: id ? "Stok & pencatatan" : "Inventory & records",
      body: id
        ? "Pengelolaan barang dan stok yang terhubung dengan aktivitas transaksi."
        : "Product and inventory management connected to transaction activity.",
    },
    {
      Icon: ChartNoAxesCombined,
      title: id ? "Laporan bisnis" : "Business reports",
      body: id
        ? "Ringkasan penjualan dan pencatatan untuk membantu membaca aktivitas usaha."
        : "Sales summaries and records to help understand business activity.",
    },
    {
      Icon: Smartphone,
      title: id ? "Android & offline" : "Android & offline",
      body: id
        ? "Fungsi utama tersedia tanpa koneksi internet, dengan tampilan yang dirancang untuk perangkat Android."
        : "Core functions work without an internet connection, with an interface designed for Android devices.",
    },
  ];
  return (
    <div className="nm-page">
      <StudioHeader />
      <main id="main-content" className="nm-subpage">
        <StructuredData
          data={[
            breadcrumbSchema([
              { name: id ? "Beranda" : "Home", path: "/" },
              { name: id ? "Portofolio" : "Portfolio", path: "/work" },
              { name: "NaCash", path: "/work/nacash" },
            ]),
            {
              "@context": "https://schema.org",
              "@type": "CreativeWork",
              "@id": absoluteUrl("/work/nacash#case-study"),
              url: absoluteUrl("/work/nacash"),
              name: id
                ? "NaCash — studi kasus pengembangan aplikasi Android"
                : "NaCash — Android application development case study",
              description: id
                ? "Produk internal Nauka untuk kasir dan pencatatan keuangan: perbedaan kebutuhan pengguna, alur data, dan penggunaan offline."
                : "Nauka's in-house point-of-sale and finance products: different user needs, data flows, and offline use.",
              creator: studioOrganization(),
              image: absoluteUrl("/showcase/nacash-dashboard.webp"),
              inLanguage: id ? "id-ID" : "en",
            },
          ]}
        />
        <div className="nm-container">
          <div className="nm-breadcrumb">
            <Link href="/work">{id ? "Portofolio" : "Portfolio"}</Link>
            <span>/</span>
            <span>NaCash</span>
          </div>
          <div className="nm-product-hero">
            <div>
              <p className="nm-eyebrow">
                {id ? "PRODUK INTERNAL NAUKA" : "A NAUKA IN-HOUSE PRODUCT"} /
                ANDROID
              </p>
              <h1>
                NaCash<span className="nm-orange">.</span>
                <br />
                <span>
                  {id
                    ? "Dibuat untuk kerja sehari-hari."
                    : "Built for everyday work."}
                </span>
              </h1>
              <p>
                {id
                  ? "Ekosistem aplikasi kasir dan pencatatan keuangan yang dikembangkan Nauka. Fashion, FnB, Retail, dan Household membawa kebutuhan yang berbeda ke dalam produk yang bisa dipakai sehari-hari."
                  : "An ecosystem of point-of-sale and finance-tracking apps developed by Nauka. Fashion, FnB, Retail, and Household bring different needs into products made for everyday use."}
              </p>
              <a
                className="nm-button"
                href="https://app.nauka.id"
                target="_blank"
                rel="noopener noreferrer"
              >
                {id ? "Jelajahi produk NaCash" : "Explore NaCash products"}
              </a>
            </div>
            <figure className="nm-product-screen">
              <Image
                src="/showcase/nacash-dashboard.webp"
                alt="Tampilan aplikasi NaCash Fashion"
                width={390}
                height={844}
                priority
                unoptimized
              />
              <figcaption>
                {id
                  ? "Tampilan NaCash Fashion · data contoh"
                  : "NaCash Fashion interface · example data"}
              </figcaption>
            </figure>
          </div>
        </div>
        <section className="nm-section nm-light">
          <div className="nm-container nm-delivery-grid">
            <div>
              <p className="nm-eyebrow">
                {id
                  ? "DARI ALUR KERJA MENJADI PRODUK"
                  : "FROM WORKFLOW TO PRODUCT"}
              </p>
              <h2>
                {id ? (
                  <>
                    Desain dan fitur,
                    <br />
                    <span>dipikirkan bersama.</span>
                  </>
                ) : (
                  <>
                    Design and functionality,
                    <br />
                    <span>considered together.</span>
                  </>
                )}
              </h2>
              <p className="nm-section-intro">
                {id
                  ? "NaCash menjadi contoh bagaimana kebutuhan transaksi, pencatatan, dan pengelolaan data diterjemahkan menjadi aplikasi. Fitur setiap varian mengikuti kebutuhan penggunanya."
                  : "NaCash shows how transaction, record-keeping, and data-management needs become an application. Each variant's features reflect its users' needs."}
              </p>
            </div>
            <div className="nm-delivery-list">
              {features.map(({ Icon, title, body }) => (
                <article key={title}>
                  <Icon size={26} />
                  <h3>{title}</h3>
                  <p>{body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <NaCashEditorial locale={locale} />
        <section className="nm-section">
          <div className="nm-container nm-delivery-grid">
            <div>
              <p className="nm-eyebrow">
                {id ? "ADA KEBUTUHAN SERUPA?" : "BUILDING SOMETHING SIMILAR?"}
              </p>
              <h2>
                {id ? (
                  <>
                    Kita mulai dari
                    <br />
                    <span>cara Anda bekerja.</span>
                  </>
                ) : (
                  <>
                    Start with the way
                    <br />
                    <span>you work.</span>
                  </>
                )}
              </h2>
            </div>
            <div>
              <ul className="nm-check-list">
                {(id
                  ? [
                      "Petakan aktivitas utama pengguna",
                      "Tentukan data dan fitur yang dibutuhkan",
                      "Pilih kebutuhan online, offline, atau antarperangkat",
                      "Bahas alur, lingkup, dan bentuk serah terima",
                    ]
                  : [
                      "Map the user's essential activities",
                      "Define the necessary data and features",
                      "Choose online, offline, or multi-device requirements",
                      "Discuss the flow, scope, and handover",
                    ]
                ).map((t) => (
                  <li key={t}>
                    <Check size={17} />
                    {t}
                  </li>
                ))}
              </ul>
              <Link
                href="/contact?service=android"
                className="nm-button nm-button-ghost"
              >
                {id ? "Diskusikan aplikasi Anda" : "Discuss your application"}
              </Link>
            </div>
          </div>
        </section>
        <ProjectCTA locale={locale} />
      </main>
      <StudioFooter locale={locale} />
    </div>
  );
}
