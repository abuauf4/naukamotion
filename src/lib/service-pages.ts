import type { LocalizedText } from "./studio-data";

const text = (id: string, en: string): LocalizedText => ({ id, en });

export const servicePages = [
  {
    slug: "website",
    serviceId: "website",
    title: text("Jasa Pembuatan Website", "Website Development"),
    description:
      "Jasa pembuatan website bisnis, company profile, landing page, dan katalog produk. Desain responsif, pengelolaan konten, serta SEO dasar oleh Nauka Motion.",
    intro: text(
      "Website yang membantu orang mengenal bisnis Anda dan mengambil langkah berikutnya. Nauka Motion merancang struktur, tampilan, serta alur kontak sesuai kebutuhan bisnis, dengan versi yang nyaman digunakan di HP, tablet, dan desktop.",
      "A website that helps people understand your business and take the next step. Nauka Motion designs the structure, interface, and contact flow around your needs, with layouts that work on phones, tablets, and desktops.",
    ),
    sections: [
      {
        heading: text(
          "Website seperti apa yang Anda butuhkan?",
          "What kind of website do you need?",
        ),
        body: text(
          "Company profile cocok untuk memperkenalkan perusahaan atau organisasi, layanan, dan informasi kontak. Landing page berfokus pada satu produk atau penawaran. Katalog membantu pengunjung membandingkan pilihan sebelum menghubungi sales. Kebutuhan seperti website otomotif, toko, atau NGO dibahas dari tujuan dan kontennya, bukan sekadar memilih template.",
          "A company profile introduces an organization, its services, and contact information. A landing page focuses on one product or offer. A catalog helps visitors compare options before contacting sales. Automotive, retail, and NGO websites start with their goals and content, rather than a template alone.",
        ),
      },
      {
        heading: text(
          "Konten dan fitur yang disiapkan",
          "Content and features to prepare",
        ),
        body: text(
          "Lingkup dapat mencakup profil bisnis, halaman layanan, galeri, katalog, form kontak, dan koneksi WhatsApp. Jika konten perlu diperbarui sendiri, dashboard admin dibahas sejak awal. Struktur heading, metadata, sitemap, dan gambar yang sesuai perangkat menjadi bagian dari SEO dasar; publikasi konten dan pemantauan pencarian tetap perlu dilakukan setelah peluncuran.",
          "The scope can include business profiles, service pages, galleries, catalogs, contact forms, and WhatsApp links. If you need to update content yourself, an admin dashboard is discussed early. Heading structure, metadata, a sitemap, and responsive images support foundational SEO; publishing content and monitoring search continue after launch.",
        ),
      },
      {
        heading: text(
          "Cara menentukan biaya dan jadwal",
          "How cost and timing are decided",
        ),
        body: text(
          "Jumlah halaman, kesiapan tulisan dan foto, kebutuhan admin, bahasa, serta integrasi menentukan lingkup. Sebelum pembangunan dimulai, kita sepakati hasil akhir, biaya, jadwal, dan batas revisi. Domain, hosting, akses pengelolaan, serta maintenance diperjelas dalam penawaran agar Anda tahu apa yang diterima dan apa yang memerlukan biaya berkelanjutan.",
          "Page count, copy and photo readiness, admin needs, languages, and integrations define the scope. Deliverables, costs, timing, and revision limits are agreed before development. Domain, hosting, management access, and maintenance are clarified in the proposal so you understand what is included and what has ongoing costs.",
        ),
      },
    ],
    examplePath: "/work",
    exampleLabel: text(
      "Lihat portofolio website",
      "Explore our website portfolio",
    ),
  },
  {
    slug: "android",
    serviceId: "android",
    title: text("Jasa Pembuatan Aplikasi Android", "Android App Development"),
    description:
      "Pengembangan aplikasi Android custom untuk kasir, pencatatan keuangan, dan operasional. Alur pengguna, mode offline, pengujian, serta serah terima yang jelas.",
    intro: text(
      "Ubah pekerjaan sehari-hari menjadi alur yang lebih mudah di perangkat Android. Nauka Motion membantu merancang fitur, tampilan, dan penyimpanan data aplikasi berdasarkan cara pengguna bekerja, bukan hanya daftar tombol yang ingin dibuat.",
      "Turn everyday work into a simpler Android workflow. Nauka Motion helps design features, interfaces, and data storage around the way users work, rather than a list of buttons to build.",
    ),
    sections: [
      {
        heading: text(
          "Dari kebutuhan menjadi alur aplikasi",
          "From a need to an app workflow",
        ),
        body: text(
          "Aplikasi kasir membutuhkan alur produk, transaksi, dan laporan yang saling terhubung. Pencatatan keuangan memiliki kebutuhan input, ringkasan, dan keamanan data yang berbeda. Kita petakan pengguna, pekerjaan utama, serta kondisi perangkat lebih dulu supaya fitur yang dibangun membantu aktivitas nyata. Ekosistem NaCash menjadi contoh produk Android internal yang dapat Anda tinjau.",
          "Point-of-sale apps need connected product, transaction, and reporting flows. Finance apps have different input, summary, and data-security needs. We first map the users, core tasks, and device conditions so features support actual work. The NaCash ecosystem is an in-house Android product example you can explore.",
        ),
      },
      {
        heading: text(
          "Offline, online, atau keduanya?",
          "Offline, online, or both?",
        ),
        body: text(
          "Mode offline dapat dipilih untuk fungsi utama yang tidak membutuhkan server. Jika data harus dipakai bersama antarperangkat, dibutuhkan pengaturan akun, sinkronisasi, dan penanganan konflik. Backup, pemulihan data, izin perangkat, dan fitur keamanan dibahas sesuai lingkup. Pilihan ini memengaruhi arsitektur, pengujian, dan biaya, sehingga perlu disepakati sebelum aplikasi dibuat.",
          "Offline operation can suit core functions that do not need a server. Sharing data across devices requires accounts, synchronization, and conflict handling. Backups, data recovery, device permissions, and security features are scoped explicitly. These choices affect architecture, testing, and costs, so they are agreed before development.",
        ),
      },
      {
        heading: text("Pengujian dan serah terima", "Testing and handover"),
        body: text(
          "Alur utama ditinjau melalui versi yang bisa dicoba sebelum serah terima. Target versi Android, ukuran perangkat, fitur cetak atau ekspor, serta kebutuhan distribusi APK diperjelas dalam penawaran. Jika ingin publikasi ke Google Play, kebutuhan akun, kebijakan, dan proses peninjauannya dibahas terpisah. Ketersediaan source code, panduan, dan dukungan pembaruan mengikuti kesepakatan proyek.",
          "Core flows are reviewed in a version you can try before handover. Target Android versions, device sizes, printing or export features, and APK distribution are defined in the proposal. Google Play publication involves separate account, policy, and review requirements. Source-code access, guidance, and update support follow the project agreement.",
        ),
      },
    ],
    examplePath: "/work/nacash",
    exampleLabel: text(
      "Kenali produk Android NaCash",
      "Explore the NaCash Android products",
    ),
  },
  {
    slug: "sistem-bisnis",
    serviceId: "system",
    title: text(
      "Jasa Pembuatan Sistem Bisnis & Web App",
      "Business Systems & Web Apps",
    ),
    description:
      "Sistem bisnis custom dan web app untuk inventory, booking, dashboard, serta administrasi. Alur kerja, hak akses, integrasi, dan laporan sesuai kebutuhan.",
    intro: text(
      "Satukan pekerjaan yang masih tersebar di chat, formulir, dan spreadsheet menjadi alur yang mudah ditinjau. Nauka Motion membangun sistem bisnis custom dari proses yang Anda jalankan, dengan data dan akses yang disesuaikan dengan pekerjaan tim.",
      "Bring work scattered across chats, forms, and spreadsheets into a workflow you can review. Nauka Motion builds custom business systems around your process, with data and access suited to your team's tasks.",
    ),
    sections: [
      {
        heading: text(
          "Mulai dari proses yang perlu dirapikan",
          "Start with the process to improve",
        ),
        body: text(
          "Inventory membutuhkan catatan perubahan stok dan hubungan dengan transaksi. Booking memerlukan aturan ketersediaan serta status pemesanan. Administrasi membutuhkan formulir, pencarian, dan alur persetujuan yang jelas. Sebelum menentukan fitur dashboard, kita petakan siapa yang memasukkan data, siapa yang memeriksa, dan keputusan apa yang perlu dibantu oleh sistem.",
          "Inventory needs stock-change records linked to transactions. Booking needs availability rules and reservation states. Administration needs clear forms, search, and approval flows. Before deciding dashboard features, we map who enters data, who reviews it, and which decisions the system needs to support.",
        ),
      },
      {
        heading: text(
          "Data, hak akses, dan integrasi",
          "Data, access, and integrations",
        ),
        body: text(
          "Hak akses membantu membedakan pekerjaan admin, operator, dan pemilik sesuai kebutuhan. Integrasi dengan layanan pembayaran, aplikasi lain, atau impor spreadsheet dinilai berdasarkan akses dan dokumentasi yang tersedia. Backup, ekspor data, dan kebutuhan pencatatan aktivitas disepakati di awal. Sistem yang menangani data operasional perlu dirancang untuk penggunaan sehari-hari dan pemeliharaan setelah peluncuran.",
          "Access controls distinguish administrator, operator, and owner tasks as needed. Payment services, other applications, and spreadsheet imports are assessed against available access and documentation. Backups, data exports, and activity records are agreed early. Operational systems need to support daily use and maintenance after launch.",
        ),
      },
      {
        heading: text(
          "Bangun bertahap dengan lingkup yang jelas",
          "Build in stages with a clear scope",
        ),
        body: text(
          "Kita tentukan alur paling penting sebagai versi awal, lalu tinjau melalui data dan skenario yang mewakili pekerjaan bisnis. Modul tambahan dapat direncanakan setelah fondasinya berjalan. Biaya mengikuti jumlah modul, aturan bisnis, integrasi, dan kebutuhan migrasi data. Akses server, kepemilikan berkas, panduan pengguna, serta dukungan operasional dijelaskan dalam penawaran proyek.",
          "We select the most important workflow for the first version, then review it with representative data and business scenarios. Additional modules can follow once the foundation works. Costs depend on modules, business rules, integrations, and migration needs. Server access, file ownership, usage guidance, and operational support are defined in the proposal.",
        ),
      },
    ],
    examplePath: "/work/inventory-systems",
    exampleLabel: text(
      "Lihat karya sistem inventory",
      "Explore inventory system projects",
    ),
  },
];
