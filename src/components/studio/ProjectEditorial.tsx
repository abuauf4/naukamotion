import Link from "next/link";
import type { Locale } from "@/lib/server-locale";

/** Studio commentary complements the client's CMS-managed project story. */
export function BakauEditorial({ locale }: { locale: Locale }) {
  const id = locale === "id";
  return (
    <>
      <section>
        <h2>
          {id
            ? "Membedakan program, proyek, dan kabar organisasi"
            : "Separating programs, projects, and organization news"}
        </h2>
        <p>
          {id
            ? "Website Bakau Institute memisahkan profil organisasi, bidang kerja, proyek, serta berita dan publikasi. Susunan ini memberi beberapa pintu masuk: pengunjung baru bisa mulai dari profil, sedangkan calon mitra dapat langsung meninjau kegiatan yang relevan. Halaman program menjelaskan bidang kerja; halaman proyek memberi contoh pelaksanaannya."
            : "Bakau Institute's website separates its profile, work areas, projects, news, and publications. This creates several entry points: new visitors can start with the profile, while potential partners can explore relevant activities. Program pages explain work areas; project pages show examples of that work."}
        </p>
      </section>
      <section>
        <h2>
          {id
            ? "Dua bahasa dan jalur untuk terlibat"
            : "Two languages and ways to get involved"}
        </h2>
        <p>
          {id
            ? "Pilihan Indonesia dan Inggris tersedia untuk membaca website. Jalur kemitraan, talenta, dan kontak umum dipisahkan sehingga pengunjung dapat memilih tujuan komunikasinya. Ajakan bermitra ditempatkan bersama informasi kegiatan; alurnya menghubungkan penjelasan organisasi dengan langkah berikut yang bisa diambil pengunjung."
            : "Indonesian and English options are available. Partnership, talent, and general contact routes are separated so visitors can choose the purpose of their enquiry. Partnership links sit alongside activity information, connecting the organization's explanation with a visitor's next step."}
        </p>
      </section>
      <section>
        <h2>
          {id
            ? "Pelajaran untuk website organisasi"
            : "A takeaway for organization websites"}
        </h2>
        <p>
          {id
            ? "Untuk kebutuhan serupa, mulailah dengan daftar pembaca dan pertanyaan mereka. Pisahkan informasi yang menjelaskan organisasi dari konten yang rutin diperbarui, lalu tentukan siapa yang mengelolanya. Studi kasus ini membahas struktur website yang dapat ditinjau langsung; belum menyajikan pengukuran kenaikan traffic atau jumlah kemitraan."
            : "For similar projects, start with your audiences and their questions. Separate stable organization information from regularly updated content, then decide who manages it. This case study discusses the website's observable structure; it does not report measured traffic growth or partnership numbers."}
        </p>
        <ul>
          <li>
            <Link href="/services/website" className="nm-text-link">
              {id
                ? "Layanan pembuatan website organisasi dan bisnis"
                : "Organization and business website development"}
            </Link>
          </li>
          <li>
            <Link
              href="/insights/biaya-pembuatan-website"
              className="nm-text-link"
            >
              {id
                ? "Menyiapkan lingkup dan biaya website"
                : "Planning website scope and cost"}
            </Link>
          </li>
        </ul>
      </section>
    </>
  );
}

export function NaCashEditorial({ locale }: { locale: Locale }) {
  const id = locale === "id";
  return (
    <section className="nm-section">
      <div className="nm-container nm-case-layout">
        <aside className="nm-case-aside">
          <p>
            {id ? "CATATAN PENGEMBANGAN PRODUK" : "PRODUCT DEVELOPMENT NOTES"}
          </p>
          <nav
            className="nm-service-nav"
            aria-label={
              id ? "Layanan terkait NaCash" : "NaCash related services"
            }
          >
            <Link href="/services/android">
              {id ? "Pengembangan aplikasi Android" : "Android app development"}
            </Link>
            <Link href="/services/sistem-bisnis">
              {id
                ? "Pengembangan sistem bisnis"
                : "Business system development"}
            </Link>
          </nav>
        </aside>
        <div className="nm-case-content">
          <section>
            <h2>
              {id
                ? "Satu ekosistem, kebutuhan pengguna yang berbeda"
                : "One ecosystem, different user needs"}
            </h2>
            <p>
              {id
                ? "NaCash dikembangkan sebagai produk internal Nauka. Fashion, FnB, dan Retail berhubungan dengan aktivitas penjualan, sedangkan Household berfokus pada pencatatan keuangan rumah tangga. Karena pekerjaan penggunanya berbeda, fitur kasir dan stok tidak disamakan untuk seluruh varian. Halaman ini memperlihatkan pendekatan pengembangan produk; rincian fitur setiap aplikasi dapat ditinjau di portal NaCash."
                : "NaCash is developed as an in-house Nauka product. Fashion, FnB, and Retail support sales activity, while Household focuses on household finance records. Their users do different work, so checkout and stock features are not identical across variants. This page explains the development approach; individual application features are available on the NaCash portal."}
            </p>
          </section>
          <section>
            <h2>
              {id
                ? "Menghubungkan input, transaksi, dan ringkasan"
                : "Connecting input, transactions, and summaries"}
            </h2>
            <p>
              {id
                ? "Pada aplikasi kasir, daftar produk menjadi masukan untuk transaksi, lalu aktivitasnya dibaca kembali melalui laporan. Pada pencatatan rumah tangga, pengguna perlu mencatat nominal dan membaca ringkasan keuangan. Perbedaan ini memengaruhi urutan layar, nama tindakan, serta informasi yang harus terlihat saat bekerja. Contoh tampilan Fashion di atas membantu memperlihatkan produk yang dikembangkan, dengan data contoh untuk demonstrasi."
                : "In a point-of-sale application, products feed into transactions, which are then reviewed through reports. Household finance users need to record amounts and review financial summaries. This difference affects screen order, action labels, and the information visible while working. The Fashion interface above illustrates the product using demonstration data."}
            </p>
          </section>
          <section>
            <h2>
              {id
                ? "Offline dan tanggung jawab atas data"
                : "Offline use and responsibility for data"}
            </h2>
            <p>
              {id
                ? "Fungsi utama yang berjalan offline membantu aplikasi digunakan saat koneksi tidak tersedia. Dalam perencanaan aplikasi custom, penyimpanan lokal perlu dibahas bersama backup, pemulihan, dan kebutuhan berbagi data. Offline di satu perangkat tidak otomatis berarti data tersinkron ke perangkat lain. Jika kerja antarperangkat dibutuhkan, alur dan biaya pengembangannya harus dimasukkan ke lingkup tersendiri."
                : "Core offline functions allow use when a connection is unavailable. When planning a custom application, local storage should be discussed alongside backups, recovery, and data sharing. Offline use on one device does not automatically synchronize data to another. Multi-device workflows require their own scope and development estimate."}
            </p>
          </section>
          <section>
            <h2>
              {id
                ? "Apa yang bisa dibawa ke proyek Anda?"
                : "What can inform your own project?"}
            </h2>
            <p>
              {id
                ? "Mulailah dari skenario kerja: siapa memasukkan data, kapan data boleh diubah, serta ringkasan apa yang dibutuhkan. Gunakan produk yang bisa dicoba sebagai referensi saat menyusun kebutuhan, lalu sepakati alur yang akan diuji. NaCash menjadi contoh karya internal untuk diskusi tersebut, bukan janji bahwa semua aplikasi custom memiliki fitur, biaya, atau jadwal yang sama."
                : "Start with work scenarios: who enters data, when it can be changed, and which summaries are needed. Use a product you can explore as a requirements reference, then agree which workflows will be tested. NaCash provides an in-house example for that discussion; it does not imply identical features, costs, or timelines for custom applications."}
            </p>
            <Link href="/contact?service=android" className="nm-text-link">
              {id
                ? "Bahas kebutuhan aplikasi Android Anda"
                : "Discuss your Android application needs"}
            </Link>
          </section>
        </div>
      </div>
    </section>
  );
}
