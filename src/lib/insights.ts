import type { LocalizedText } from "./studio-data";

const text = (id: string, en: string): LocalizedText => ({ id, en });

export type Insight = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  publishedAt: string;
  sections: {
    id: string;
    heading: LocalizedText;
    paragraphs: LocalizedText[];
    bullets?: LocalizedText[];
  }[];
};

// Editorial content is versioned with the site; these are published articles only.
export const insights: Insight[] = [
  {
    slug: "biaya-pembuatan-website",
    title: text(
      "Apa yang Menentukan Biaya Pembuatan Website?",
      "What Determines the Cost of a Website?",
    ),
    description: text(
      "Pahami faktor biaya website, pengeluaran tahunan, dan isi penawaran. Checklist praktis untuk menyiapkan brief serta membandingkan jasa pembuatan website.",
      "Understand website cost factors, ongoing expenses, and proposal scope. A practical checklist for preparing a brief and comparing development proposals.",
    ),
    publishedAt: "2026-10-04",
    sections: [
      {
        id: "mulai-dari-kebutuhan",
        heading: text(
          "Mulai dari pekerjaan yang harus dilakukan website",
          "Start with the job your website needs to do",
        ),
        paragraphs: [
          text(
            "Dua penawaran untuk 'website bisnis' bisa memiliki harga berbeda karena hasil yang diserahkan juga berbeda. Lima halaman informasi dengan tombol WhatsApp tidak sama lingkupnya dengan katalog yang dapat diperbarui staf, dilengkapi pencarian produk dan formulir permintaan penawaran. Sebelum membandingkan harga, samakan kebutuhan yang sedang dihitung.",
            "Two proposals for a 'business website' can have different prices because they deliver different things. Five information pages with a WhatsApp link are a different scope from a staff-managed catalog with product search and an enquiry form. Before comparing prices, make sure both proposals cover the same requirements.",
          ),
          text(
            "Artikel ini membantu menyusun lingkup, bukan daftar tarif tetap Nauka Motion. Anggaran proyek ditentukan melalui penawaran setelah kebutuhan diperiksa. Pisahkan fitur yang wajib tersedia saat peluncuran dari fitur yang dapat menyusul, agar keputusan biaya berangkat dari prioritas bisnis.",
            "This guide helps define scope; it is not a fixed Nauka Motion price list. A project budget is quoted after reviewing requirements. Separate features needed at launch from those that can follow, so spending decisions reflect business priorities.",
          ),
        ],
      },
      {
        id: "halaman-dan-konten",
        heading: text(
          "Jumlah halaman, konten, dan bahasa",
          "Pages, content, and languages",
        ),
        paragraphs: [
          text(
            "Hitung jenis halaman dan variasi isinya. Halaman layanan dengan susunan yang sama dapat memakai komponen bersama. Halaman dengan struktur berbeda, formulir khusus, atau banyak kondisi tampilan membutuhkan pekerjaan tambahan. Untuk katalog, jumlah produk saja belum cukup: perlu diketahui atribut, kategori, pilihan varian, dan cara pencariannya.",
            "Count page types and content variations. Service pages with a shared structure can reuse components. Different layouts, custom forms, or conditional displays require additional work. For a catalog, product count alone is not enough: attributes, categories, variants, and search behavior also matter.",
          ),
          text(
            "Tentukan siapa yang menyiapkan tulisan, foto, logo, dan terjemahan. Materi yang sudah rapi mengurangi proses bolak-balik saat pengisian halaman. Website dua bahasa membutuhkan pemeriksaan isi dan navigasi pada kedua bahasa; menggandakan tombol pilihan bahasa saja belum menyelesaikan pekerjaan terjemahan.",
            "Decide who supplies copy, photography, logos, and translations. Prepared material reduces back-and-forth when filling pages. A bilingual website requires content and navigation checks in both languages; adding a language switch does not complete the translation work.",
          ),
        ],
      },
      {
        id: "fitur-dan-admin",
        heading: text(
          "Fitur, dashboard admin, dan integrasi",
          "Features, an admin dashboard, and integrations",
        ),
        paragraphs: [
          text(
            "Bedakan tautan WhatsApp dari formulir yang menyimpan calon pelanggan. Formulir membutuhkan validasi, penyimpanan, serta cara tim membaca dan menindaklanjuti pesan. Begitu juga dashboard admin: tentukan konten apa yang bisa diubah, siapa yang boleh mengubahnya, dan apakah diperlukan unggah gambar, status draft, atau beberapa peran pengguna.",
            "Distinguish a WhatsApp link from a form that stores leads. A form needs validation, storage, and a way for the team to review and follow up enquiries. For an admin dashboard, specify editable content, permissions, and whether image uploads, drafts, or multiple user roles are needed.",
          ),
          text(
            "Integrasi pembayaran, booking, atau sistem lain perlu diperiksa dari akses dan dokumentasinya. Tuliskan alur normal serta kondisi gagal, misalnya pembayaran belum selesai atau tanggal sudah terisi. Kebutuhan ini memengaruhi pembangunan dan pengujian, bukan hanya tampilan tombol di halaman.",
            "Payments, booking, and other integrations depend on available access and documentation. Describe normal flows and failures, such as an incomplete payment or an unavailable date. These requirements affect implementation and testing, as well as the buttons visitors see.",
          ),
        ],
      },
      {
        id: "biaya-berulang",
        heading: text(
          "Pisahkan biaya pembangunan dan biaya berulang",
          "Separate development costs from ongoing costs",
        ),
        paragraphs: [
          text(
            "Penawaran sebaiknya memisahkan pekerjaan awal dari biaya setelah website aktif. Domain dan hosting umumnya memiliki periode perpanjangan. Layanan email, penyimpanan gambar, atau integrasi berbayar dapat memiliki tagihan sendiri sesuai penyedia dan pemakaian. Minta rincian periode, pihak yang membayar, serta akun yang memegang akses pengelolaan.",
            "A proposal should separate initial work from costs after launch. Domains and hosting usually have renewal periods. Email, image storage, and paid integrations may have separate charges based on provider terms and usage. Ask for billing periods, who pays, and which account controls each service.",
          ),
          text(
            "Perjelas juga arti maintenance. Pembaruan teknis, pemantauan gangguan, perubahan isi, dan penambahan fitur adalah pekerjaan berbeda. Jangan menganggap semuanya tercakup dalam satu istilah. Jika sudah punya domain atau hosting, berikan informasinya agar kecocokan dan kebutuhan migrasi bisa diperiksa sebelum membeli layanan baru.",
            "Clarify what maintenance includes. Technical updates, incident monitoring, content changes, and new features are different tasks. Do not assume one label covers them all. If you already own a domain or hosting plan, share the details so compatibility and migration needs can be assessed before buying new services.",
          ),
        ],
      },
      {
        id: "membandingkan-penawaran",
        heading: text(
          "Checklist untuk membandingkan penawaran",
          "A checklist for comparing proposals",
        ),
        paragraphs: [
          text(
            "Gunakan daftar yang sama untuk setiap penyedia. Penawaran yang jelas membantu Anda melihat bagian yang sudah termasuk dan bagian yang perlu ditambahkan. Bandingkan hasil akhir serta tanggung jawabnya, lalu hubungkan dengan anggaran yang tersedia.",
            "Use the same checklist for each provider. A clear proposal shows what is included and what needs to be added. Compare deliverables and responsibilities, then relate them to your available budget.",
          ),
        ],
        bullets: [
          text(
            "Halaman dan fitur: apa yang dibuat, dan apa batas lingkupnya?",
            "Pages and features: what will be built, and where does the scope end?",
          ),
          text(
            "Konten: siapa menulis, menerjemahkan, dan menyiapkan gambar?",
            "Content: who writes, translates, and prepares images?",
          ),
          text(
            "Revisi dan jadwal: kapan umpan balik diberikan dan bagaimana perubahan lingkup dihitung?",
            "Revisions and timing: when is feedback due, and how are scope changes priced?",
          ),
          text(
            "Pengujian: apakah formulir, tautan, tampilan HP, dan akses admin ikut diperiksa?",
            "Testing: are forms, links, mobile layouts, and admin access checked?",
          ),
          text(
            "Serah terima: akses domain, hosting, source code, dan panduan apa yang diterima?",
            "Handover: which domain, hosting, source-code, and guidance materials are delivered?",
          ),
          text(
            "Setelah rilis: siapa menangani gangguan, berapa lama dukungannya, dan apa biaya berulangnya?",
            "After launch: who handles issues, for how long, and what recurring charges apply?",
          ),
        ],
      },
      {
        id: "seo-dalam-penawaran",
        heading: text(
          "Apa arti SEO dasar dalam penawaran?",
          "What does foundational SEO mean in a proposal?",
        ),
        paragraphs: [
          text(
            "Minta rincian pekerjaan yang bisa diperiksa: judul dan deskripsi halaman, heading, canonical, sitemap, serta pengaturan halaman yang boleh diindeks. Penulisan artikel, riset kata kunci, dan evaluasi Search Console perlu disebutkan tersendiri jika termasuk. Website selesai dibangun bukan berarti kegiatan SEO selesai.",
            "Ask for verifiable deliverables: page titles and descriptions, headings, canonicals, a sitemap, and indexing settings. Article writing, keyword research, and Search Console reviews should be listed separately if included. Finishing a website does not mean SEO work is finished.",
          ),
          text(
            "Hindari menjadikan janji peringkat pertama sebagai pembanding utama. Google menjelaskan bahwa sitemap membantu penemuan URL, tetapi tidak menjamin indexing atau meningkatkan peringkat dengan sendirinya. Nilai pekerjaan dari lingkup, kualitas isi, dan pengukuran setelah website terbit.",
            "Avoid using a first-place ranking promise as your main comparison. Google explains that sitemaps help URL discovery but do not guarantee indexing or improve rankings by themselves. Assess the scope, content quality, and measurement after launch.",
          ),
        ],
      },
      {
        id: "contoh-brief",
        heading: text(
          "Contoh brief awal yang mudah dibahas",
          "An example brief to start the discussion",
        ),
        paragraphs: [
          text(
            "Sebagai contoh, sebuah usaha dapat menulis: 'Kami membutuhkan website untuk memperkenalkan layanan dan menerima pertanyaan lewat WhatsApp. Halaman awal mencakup beranda, layanan, portofolio, tentang usaha, dan kontak. Logo serta foto sudah ada, tulisan perlu dibantu. Staf ingin memperbarui portofolio sendiri. Kami sudah memiliki domain.' Ini contoh kebutuhan, bukan paket atau harga yang ditawarkan.",
            "For example, a business could write: 'We need a website to introduce our services and receive WhatsApp enquiries. Initial pages include home, services, portfolio, about, and contact. We have a logo and photos but need help with copy. Staff should update the portfolio. We already own a domain.' This is an example requirement, not a package or quote.",
          ),
          text(
            "Tambahkan target waktu, kisaran anggaran yang nyaman, dan fitur yang paling penting. Dari brief itu, kebutuhan wajib, pilihan tambahan, serta hal yang masih perlu dipastikan dapat dipisahkan. Proses ini membuat diskusi penawaran lebih konkret sebelum desain dan pembangunan dimulai.",
            "Add your target date, a comfortable budget range, and the most important features. This allows essential requirements, optional additions, and open questions to be separated. The proposal discussion becomes more concrete before design and development begin.",
          ),
        ],
      },
    ],
  },
];
