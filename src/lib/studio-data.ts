/**
 * Nauka Motion — Studio Data (v3 — Factual Portfolio)
 * ----------------------------------------------------
 * Single source of truth untuk categories, projects, dan case study content.
 *
 * PRINSIP:
 * - Setiap project memiliki asal-usul berbeda. Case study TIDAK dipaksakan
 *   ke template Problem→Solution→Result→Technology.
 * - Case study menggunakan alur natural: konteks awal → kebutuhan yang
 *   ditemukan → proses berpikir → sistem yang dibangun → keputusan teknologi →
 *   hasil produk.
 * - TIDAK ADA claim fabricated: tidak ada conversion rate, revenue impact,
 *   testimonial, business metric, traffic result, atau klaim "official".
 * - Status: "published" (live/collab) | "internal" (personal project) |
 *   "development" (dalam pengembangan) | "draft" (sembunyikan dari public).
 * - Technology Stack hanya menyebut teknologi yang digunakan dalam kode,
 *   BUKAN provider/infrastructure (Vercel, Supabase tidak dimasukkan).
 * - Bahasa: Bilingual. Field .id = Bahasa Indonesia, .en = English.
 *   Versi English membawa cerita dan fakta yang sama, bukan terjemahan generic.
 */

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export type CategorySlug =
  | "automotive"
  | "technology-retail"
  | "insurance"
  | "inventory-systems"
  | "travel-tourism"
  | "pet-health"
  | "personal-projects";

export type ProjectStatus = "published" | "internal" | "development" | "draft";

export interface LocalizedText {
  id: string;
  en: string;
}

export interface StudioCategory {
  slug: CategorySlug;
  index: string;
  title: string;
  description: LocalizedText;
  accent: string;
}

export interface CaseStudySection {
  heading: LocalizedText;
  body: LocalizedText[];
  bullets?: LocalizedText[];
}

export interface TechStory {
  intro: LocalizedText;
  details: LocalizedText[];
  stack: string[];
}

export interface StudioProject {
  slug: string;
  index: string;
  name: string;
  categorySlug: CategorySlug;
  tagline: LocalizedText;
  summary: LocalizedText;
  year: string;
  client: string;
  industry: string;
  cover: string;
  accent: string;
  liveUrl?: string;
  status: ProjectStatus;
  order: number;
  techStack: string[];
  role: LocalizedText;
  caseStudy: {
    sections: CaseStudySection[];
    techStory?: TechStory;
    nextProjectSlug?: string;
  };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CATEGORIES — 7 kategori
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const studioCategories: StudioCategory[] = [
  {
    slug: "automotive",
    index: "01",
    title: "Automotive",
    description: {
      id: "Website pemasaran digital untuk sales otomotif.",
      en: "Digital marketing websites for automotive sales.",
    },
    accent: "#D85A2A",
  },
  {
    slug: "technology-retail",
    index: "02",
    title: "Technology & Retail",
    description: {
      id: "E-commerce, katalog, dan sistem operasional untuk bisnis teknologi dan retail.",
      en: "E-commerce, catalogs, and operational systems for technology and retail businesses.",
    },
    accent: "#2563EB",
  },
  {
    slug: "insurance",
    index: "03",
    title: "Insurance",
    description: {
      id: "Platform dan sistem digital untuk kebutuhan asuransi.",
      en: "Digital platforms and systems for insurance needs.",
    },
    accent: "#6366F1",
  },
  {
    slug: "inventory-systems",
    index: "04",
    title: "Inventory & Business Systems",
    description: {
      id: "Sistem inventory, operasional, dan pencatatan bisnis.",
      en: "Inventory, operational, and business recording systems.",
    },
    accent: "#0D9488",
  },
  {
    slug: "travel-tourism",
    index: "05",
    title: "Travel & Tourism",
    description: {
      id: "Website dan pengalaman digital untuk bisnis pariwisata.",
      en: "Websites and digital experiences for tourism businesses.",
    },
    accent: "#0891B2",
  },
  {
    slug: "pet-health",
    index: "06",
    title: "Pet Health",
    description: {
      id: "Pengalaman digital untuk brand produk kesehatan hewan.",
      en: "Digital experiences for pet health product brands.",
    },
    accent: "#8B5CF6",
  },
  {
    slug: "personal-projects",
    index: "07",
    title: "Personal Projects",
    description: {
      id: "Produk, eksperimen, dan karya pribadi yang dikembangkan di luar project client.",
      en: "Personal products, experiments, and works developed outside client projects.",
    },
    accent: "#B8B3AA",
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROJECTS — 19 project
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const studioProjects: StudioProject[] = [

  /* ═══════════════════════════════════════════════
     AUTOMOTIVE — Website pemasaran digital untuk sales otomotif.
     Bukan website resmi dealer. Landing page untuk sales mobil sebagai
     media pemasaran digital.
     ═══════════════════════════════════════════════ */

  {
    slug: "geely-bsd",
    index: "01",
    name: "Geely BSD",
    categorySlug: "automotive",
    tagline: {
      id: "Website pemasaran digital untuk sales Geely BSD.",
      en: "Digital marketing website for Geely BSD sales.",
    },
    summary: {
      id: "Website pemasaran yang menampilkan model kendaraan Geely, harga, promo, dan informasi produk, serta mengarahkan inquiry ke tim sales via WhatsApp.",
      en: "Marketing website displaying Geely vehicle models, pricing, promotions, and product information, directing inquiries to the sales team via WhatsApp.",
    },
    year: "2025",
    client: "Geely BSD",
    industry: "Automotive Sales",
    cover: "/portfolio/geely-pluit.png",
    accent: "#2563EB",
    liveUrl: "https://geely-bsd.com",
    status: "published",
    order: 1,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Awal Kebutuhan", en: "How It Started" },
          body: [
            {
              id: "Seorang sales Geely di area BSD membutuhkan media digital sendiri untuk mendukung aktivitas pemasarannya. Informasi mengenai model kendaraan, harga, promo, dan penawaran sebelumnya banyak bergantung pada komunikasi langsung melalui chat atau media sosial. Cara tersebut tetap menjadi bagian penting dari proses penjualan, tetapi membuat informasi yang sama harus disampaikan berulang kali kepada calon customer.",
              en: "A Geely salesperson in the BSD area needed their own digital medium to support their marketing activities. Information about vehicle models, pricing, promotions, and offers previously relied heavily on direct communication through chat or social media. That approach remains an important part of the sales process, but it required the same information to be repeated to prospective customers over and over.",
            },
            {
              id: "Dari kebutuhan tersebut, kami mulai membangun Geely BSD sebagai pusat informasi sekaligus media pemasaran digital milik sales.",
              en: "From that need, we began building Geely BSD as an information hub and a digital marketing medium owned by the salesperson.",
            },
          ],
        },
        {
          heading: { id: "Masalah yang Ingin Diselesaikan", en: "The Problem to Solve" },
          body: [
            {
              id: "Website ini tidak dibuat untuk menggantikan komunikasi antara sales dan calon customer. Justru tujuannya adalah membuat komunikasi tersebut lebih efisien.",
              en: "This website was not built to replace communication between the salesperson and prospective customers. The goal was to make that communication more efficient.",
            },
            {
              id: "Sebelum menghubungi sales, calon customer sudah dapat melihat kendaraan yang tersedia, mengetahui kisaran harga, membaca informasi produk, melihat promo, dan memahami pilihan yang ditawarkan. Dengan begitu, ketika percakapan melalui WhatsApp dimulai, calon customer sudah memiliki konteks mengenai kendaraan yang diminati.",
              en: "Before contacting the salesperson, a prospective customer can already see available vehicles, understand the price range, read product information, view promotions, and understand the options offered. That way, when the WhatsApp conversation begins, the prospective customer already has context about the vehicle they're interested in.",
            },
          ],
        },
        {
          heading: { id: "Tantangan", en: "The Challenge" },
          body: [
            {
              id: "Tantangannya adalah membuat website yang cukup lengkap untuk memberikan informasi, tetapi tetap sederhana karena tujuan akhirnya bukan membuat portal otomotif yang kompleks. Website harus tetap berfokus pada satu hal: membantu sales memasarkan kendaraan dan membawa calon customer menuju percakapan langsung.",
              en: "The challenge was to build a website complete enough to provide information, yet simple enough because the end goal was not to build a complex automotive portal. The website had to stay focused on one thing: helping the salesperson market vehicles and bring prospective customers into direct conversation.",
            },
            {
              id: "Karena itu struktur informasi, navigasi, detail kendaraan, hingga CTA harus dibuat sesingkat mungkin tanpa menghilangkan informasi yang dibutuhkan calon pembeli.",
              en: "Therefore the information structure, navigation, vehicle details, and CTAs had to be kept as concise as possible without removing information that prospective buyers need.",
            },
          ],
        },
        {
          heading: { id: "Pendekatan yang Kami Ambil", en: "The Approach We Took" },
          body: [
            {
              id: "Kami menyusun pengalaman website mengikuti perjalanan sederhana calon pembeli: menemukan kendaraan → melihat pilihan model → memahami harga dan informasi unit → melihat promo → menghubungi sales.",
              en: "We structured the website experience following a simple buyer journey: find a vehicle → view model options → understand pricing and unit information → view promotions → contact the salesperson.",
            },
            {
              id: "Informasi penting ditempatkan sebelum CTA sehingga WhatsApp bukan sekadar tombol yang muncul di mana-mana, tetapi menjadi langkah berikutnya setelah pengguna memahami produk yang ditawarkan.",
              en: "Important information was placed before the CTA so that WhatsApp is not just a button appearing everywhere, but the next step after the user understands the product being offered.",
            },
          ],
        },
        {
          heading: { id: "Yang Dibangun", en: "What Was Built" },
          body: [
            {
              id: "Dari alur tersebut kami membangun website pemasaran Geely BSD yang terdiri dari katalog kendaraan, halaman detail setiap model, informasi harga dan promo, serta jalur inquiry langsung menuju sales. Penekanan utama ada pada katalog model dan kelengkapan informasi produk — calon customer dapat mempelajari setiap model Geely secara mendalam sebelum memutuskan untuk menghubungi sales.",
              en: "From that flow we built the Geely BSD marketing website, consisting of a vehicle catalog, detail pages for each model, pricing and promotion information, and a direct inquiry path to the salesperson. The main emphasis is on the model catalog and the completeness of product information — prospective customers can study each Geely model in depth before deciding to contact the salesperson.",
            },
            {
              id: "Setiap halaman kendaraan dibuat agar dapat berdiri sebagai sumber informasi tersendiri. Calon customer yang menemukan satu model tertentu dari pencarian atau link yang dibagikan tidak harus kembali ke homepage untuk memahami produk tersebut.",
              en: "Each vehicle page was built to stand as its own information source. A prospective customer who finds a specific model from search or a shared link doesn't need to return to the homepage to understand that product.",
            },
            {
              id: "Ketika tertarik melanjutkan, pengguna dapat langsung menghubungi sales melalui WhatsApp dari halaman kendaraan yang sedang mereka lihat.",
              en: "When interested in proceeding, the user can directly contact the salesperson via WhatsApp from the vehicle page they're currently viewing.",
            },
          ],
        },
        {
          heading: { id: "Dari Landing Page Menjadi Aset Pemasaran", en: "From Landing Page to Marketing Asset" },
          body: [
            {
              id: "Hasil akhirnya bukan website resmi dealer dan bukan pula marketplace kendaraan. Geely BSD dibuat sebagai aset pemasaran digital milik sales — sebuah tempat yang dapat terus menampilkan produk, harga, promo, dan informasi kendaraan ketika sales sedang tidak berada di showroom atau belum sempat membalas pesan.",
              en: "The end result is not an official dealer website and not a vehicle marketplace. Geely BSD was built as a digital marketing asset owned by the salesperson — a place that can continuously display products, pricing, promotions, and vehicle information when the salesperson is not at the showroom or hasn't yet replied to a message.",
            },
            {
              id: "Website menjadi penghubung antara aktivitas pemasaran seperti pencarian Google, iklan, media sosial, atau link yang dibagikan dengan percakapan langsung bersama sales.",
              en: "The website becomes a bridge between marketing activities like Google search, ads, social media, or shared links and the direct conversation with the salesperson.",
            },
          ],
        },
      ],
      nextProjectSlug: "suzuki-jakbar",
    },
  },

  {
    slug: "suzuki-jakbar",
    index: "02",
    name: "Suzuki Jakarta Barat",
    categorySlug: "automotive",
    tagline: {
      id: "Website pemasaran digital untuk sales Suzuki Jakarta Barat.",
      en: "Digital marketing website for Suzuki Jakarta Barat sales.",
    },
    summary: {
      id: "Landing page pemasaran untuk sales Suzuki Jakarta Barat, menampilkan katalog unit, harga, promo, dan jalur inquiry ke sales.",
      en: "Marketing landing page for Suzuki Jakarta Barat sales, displaying unit catalog, pricing, promotions, and inquiry path to sales.",
    },
    year: "2025",
    client: "Suzuki Jakarta Barat",
    industry: "Automotive Sales",
    cover: "/portfolio/mitsubishi.png",
    accent: "#0D9488",
    liveUrl: "https://suzukijakbar.autodealer.id",
    status: "published",
    order: 2,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Awal Kebutuhan", en: "How It Started" },
          body: [
            {
              id: "Seorang sales Suzuki di area Jakarta Barat membutuhkan media digital sendiri untuk mendukung aktivitas pemasarannya. Informasi mengenai model kendaraan, harga, promo, dan penawaran sebelumnya banyak bergantung pada komunikasi langsung melalui chat atau media sosial. Cara tersebut tetap menjadi bagian penting dari proses penjualan, tetapi membuat informasi yang sama harus disampaikan berulang kali kepada calon customer.",
              en: "A Suzuki salesperson in the West Jakarta area needed their own digital medium to support their marketing activities. Information about vehicle models, pricing, promotions, and offers previously relied heavily on direct communication through chat or social media. That approach remains an important part of the sales process, but it required the same information to be repeated to prospective customers over and over.",
            },
            {
              id: "Dari kebutuhan tersebut, kami mulai membangun Suzuki Jakarta Barat sebagai pusat informasi sekaligus media pemasaran digital milik sales.",
              en: "From that need, we began building Suzuki Jakarta Barat as an information hub and a digital marketing medium owned by the salesperson.",
            },
          ],
        },
        {
          heading: { id: "Masalah yang Ingin Diselesaikan", en: "The Problem to Solve" },
          body: [
            {
              id: "Website ini tidak dibuat untuk menggantikan komunikasi antara sales dan calon customer. Justru tujuannya adalah membuat komunikasi tersebut lebih efisien.",
              en: "This website was not built to replace communication between the salesperson and prospective customers. The goal was to make that communication more efficient.",
            },
            {
              id: "Sebelum menghubungi sales, calon customer sudah dapat melihat kendaraan yang tersedia, mengetahui kisaran harga, membaca informasi produk, melihat promo, dan memahami pilihan yang ditawarkan. Dengan begitu, ketika percakapan melalui WhatsApp dimulai, calon customer sudah memiliki konteks mengenai kendaraan yang diminati.",
              en: "Before contacting the salesperson, a prospective customer can already see available vehicles, understand the price range, read product information, view promotions, and understand the options offered. That way, when the WhatsApp conversation begins, the prospective customer already has context about the vehicle they're interested in.",
            },
          ],
        },
        {
          heading: { id: "Tantangan", en: "The Challenge" },
          body: [
            {
              id: "Tantangannya adalah membuat website yang cukup lengkap untuk memberikan informasi, tetapi tetap sederhana karena tujuan akhirnya bukan membuat portal otomotif yang kompleks. Website harus tetap berfokus pada satu hal: membantu sales memasarkan kendaraan dan membawa calon customer menuju percakapan langsung.",
              en: "The challenge was to build a website complete enough to provide information, yet simple enough because the end goal was not to build a complex automotive portal. The website had to stay focused on one thing: helping the salesperson market vehicles and bring prospective customers into direct conversation.",
            },
            {
              id: "Karena itu struktur informasi, navigasi, detail kendaraan, hingga CTA harus dibuat sesingkat mungkin tanpa menghilangkan informasi yang dibutuhkan calon pembeli.",
              en: "Therefore the information structure, navigation, vehicle details, and CTAs had to be kept as concise as possible without removing information that prospective buyers need.",
            },
          ],
        },
        {
          heading: { id: "Pendekatan yang Kami Ambil", en: "The Approach We Took" },
          body: [
            {
              id: "Kami menyusun pengalaman website mengikuti perjalanan sederhana calon pembeli: menemukan kendaraan → melihat pilihan model → memahami harga dan informasi unit → melihat promo → menghubungi sales. Informasi penting ditempatkan sebelum CTA sehingga WhatsApp bukan sekadar tombol yang muncul di mana-mana, tetapi menjadi langkah berikutnya setelah pengguna memahami produk yang ditawarkan.",
              en: "We structured the website experience following a simple buyer journey: find a vehicle → view model options → understand pricing and unit information → view promotions → contact the salesperson. Important information was placed before the CTA so that WhatsApp is not just a button appearing everywhere, but the next step after the user understands the product being offered.",
            },
          ],
        },
        {
          heading: { id: "Yang Dibangun", en: "What Was Built" },
          body: [
            {
              id: "Dari alur tersebut kami membangun website pemasaran Suzuki Jakarta Barat yang terdiri dari katalog kendaraan, halaman detail setiap model, informasi harga dan promo, serta jalur inquiry langsung menuju sales. Penekanan utama ada pada alur produk → promo → WhatsApp yang jelas dan mudah diikuti — calon customer dapat berpindah dari melihat model, memahami promo yang berlaku, hingga menghubungi sales dalam alur yang langsung.",
              en: "From that flow we built the Suzuki Jakarta Barat marketing website, consisting of a vehicle catalog, detail pages for each model, pricing and promotion information, and a direct inquiry path to the salesperson. The main emphasis is on a clear product → promotion → WhatsApp flow that's easy to follow — prospective customers can move from viewing a model, understanding the active promotion, to contacting the salesperson in a direct flow.",
            },
            {
              id: "Setiap halaman kendaraan dibuat agar dapat berdiri sebagai sumber informasi tersendiri. Calon customer yang menemukan satu model tertentu dari pencarian atau link yang dibagikan tidak harus kembali ke homepage untuk memahami produk tersebut. Ketika tertarik melanjutkan, pengguna dapat langsung menghubungi sales melalui WhatsApp dari halaman kendaraan yang sedang mereka lihat.",
              en: "Each vehicle page was built to stand as its own information source. A prospective customer who finds a specific model from search or a shared link doesn't need to return to the homepage to understand that product. When interested in proceeding, the user can directly contact the salesperson via WhatsApp from the vehicle page they're currently viewing.",
            },
          ],
        },
        {
          heading: { id: "Dari Landing Page Menjadi Aset Pemasaran", en: "From Landing Page to Marketing Asset" },
          body: [
            {
              id: "Hasil akhirnya bukan website resmi dealer dan bukan pula marketplace kendaraan. Suzuki Jakarta Barat dibuat sebagai aset pemasaran digital milik sales — sebuah tempat yang dapat terus menampilkan produk, harga, promo, dan informasi kendaraan ketika sales sedang tidak berada di showroom atau belum sempat membalas pesan.",
              en: "The end result is not an official dealer website and not a vehicle marketplace. Suzuki Jakarta Barat was built as a digital marketing asset owned by the salesperson — a place that can continuously display products, pricing, promotions, and vehicle information when the salesperson is not at the showroom or hasn't yet replied to a message.",
            },
            {
              id: "Website menjadi penghubung antara aktivitas pemasaran seperti pencarian Google, iklan, media sosial, atau link yang dibagikan dengan percakapan langsung bersama sales.",
              en: "The website becomes a bridge between marketing activities like Google search, ads, social media, or shared links and the direct conversation with the salesperson.",
            },
          ],
        },
      ],
      nextProjectSlug: "mitsubishi",
    },
  },

  {
    slug: "mitsubishi",
    index: "03",
    name: "Mitsubishi",
    categorySlug: "automotive",
    tagline: {
      id: "Website pemasaran digital untuk sales Mitsubishi.",
      en: "Digital marketing website for Mitsubishi sales.",
    },
    summary: {
      id: "Landing page pemasaran untuk sales Mitsubishi, menampilkan katalog unit, harga, promo, dan jalur inquiry ke sales.",
      en: "Marketing landing page for Mitsubishi sales, displaying unit catalog, pricing, promotions, and inquiry path to sales.",
    },
    year: "2025",
    client: "Mitsubishi Sales",
    industry: "Automotive Sales",
    cover: "/portfolio/mitsubishi.png",
    accent: "#D85A2A",
    liveUrl: "https://mitsubishi.autodealer.id",
    status: "published",
    order: 3,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Awal Kebutuhan", en: "How It Started" },
          body: [
            {
              id: "Seorang sales Mitsubishi membutuhkan media digital sendiri untuk mendukung aktivitas pemasarannya. Informasi mengenai model kendaraan, harga, promo, dan penawaran sebelumnya banyak bergantung pada komunikasi langsung melalui chat atau media sosial. Cara tersebut tetap menjadi bagian penting dari proses penjualan, tetapi membuat informasi yang sama harus disampaikan berulang kali kepada calon customer.",
              en: "A Mitsubishi salesperson needed their own digital medium to support their marketing activities. Information about vehicle models, pricing, promotions, and offers previously relied heavily on direct communication through chat or social media. That approach remains an important part of the sales process, but it required the same information to be repeated to prospective customers over and over.",
            },
            {
              id: "Dari kebutuhan tersebut, kami mulai membangun website Mitsubishi sebagai pusat informasi sekaligus media pemasaran digital milik sales.",
              en: "From that need, we began building the Mitsubishi website as an information hub and a digital marketing medium owned by the salesperson.",
            },
          ],
        },
        {
          heading: { id: "Masalah yang Ingin Diselesaikan", en: "The Problem to Solve" },
          body: [
            {
              id: "Website ini tidak dibuat untuk menggantikan komunikasi antara sales dan calon customer. Justru tujuannya adalah membuat komunikasi tersebut lebih efisien.",
              en: "This website was not built to replace communication between the salesperson and prospective customers. The goal was to make that communication more efficient.",
            },
            {
              id: "Sebelum menghubungi sales, calon customer sudah dapat melihat kendaraan yang tersedia, mengetahui kisaran harga, membaca informasi produk, melihat promo, dan memahami pilihan yang ditawarkan. Dengan begitu, ketika percakapan melalui WhatsApp dimulai, calon customer sudah memiliki konteks mengenai kendaraan yang diminati.",
              en: "Before contacting the salesperson, a prospective customer can already see available vehicles, understand the price range, read product information, view promotions, and understand the options offered. That way, when the WhatsApp conversation begins, the prospective customer already has context about the vehicle they're interested in.",
            },
          ],
        },
        {
          heading: { id: "Tantangan", en: "The Challenge" },
          body: [
            {
              id: "Tantangannya adalah membuat website yang cukup lengkap untuk memberikan informasi, tetapi tetap sederhana karena tujuan akhirnya bukan membuat portal otomotif yang kompleks. Website harus tetap berfokus pada satu hal: membantu sales memasarkan kendaraan dan membawa calon customer menuju percakapan langsung.",
              en: "The challenge was to build a website complete enough to provide information, yet simple enough because the end goal was not to build a complex automotive portal. The website had to stay focused on one thing: helping the salesperson market vehicles and bring prospective customers into direct conversation.",
            },
            {
              id: "Karena itu struktur informasi, navigasi, detail kendaraan, hingga CTA harus dibuat sesingkat mungkin tanpa menghilangkan informasi yang dibutuhkan calon pembeli.",
              en: "Therefore the information structure, navigation, vehicle details, and CTAs had to be kept as concise as possible without removing information that prospective buyers need.",
            },
          ],
        },
        {
          heading: { id: "Pendekatan yang Kami Ambil", en: "The Approach We Took" },
          body: [
            {
              id: "Kami menyusun pengalaman website mengikuti perjalanan sederhana calon pembeli: menemukan kendaraan → melihat pilihan model → memahami harga dan informasi unit → melihat promo → menghubungi sales. Informasi penting ditempatkan sebelum CTA sehingga WhatsApp bukan sekadar tombol yang muncul di mana-mana, tetapi menjadi langkah berikutnya setelah pengguna memahami produk yang ditawarkan.",
              en: "We structured the website experience following a simple buyer journey: find a vehicle → view model options → understand pricing and unit information → view promotions → contact the salesperson. Important information was placed before the CTA so that WhatsApp is not just a button appearing everywhere, but the next step after the user understands the product being offered.",
            },
          ],
        },
        {
          heading: { id: "Yang Dibangun", en: "What Was Built" },
          body: [
            {
              id: "Dari alur tersebut kami membangun website pemasaran Mitsubishi yang terdiri dari katalog kendaraan, halaman detail setiap model, informasi harga dan promo, serta jalur inquiry langsung menuju sales. Penekanan utama ada pada cara model dan varian kendaraan disusun — setiap model Mitsubishi dipisahkan dengan jelas, dan varian yang tersedia di dalam model tersebut disusun agar calon customer dapat memahami pilihan tanpa kebingungan.",
              en: "From that flow we built the Mitsubishi marketing website, consisting of a vehicle catalog, detail pages for each model, pricing and promotion information, and a direct inquiry path to the salesperson. The main emphasis is on how vehicle models and variants are organized — each Mitsubishi model is clearly separated, and the variants available within each model are arranged so prospective customers can understand the options without confusion.",
            },
            {
              id: "Setiap halaman kendaraan dibuat agar dapat berdiri sebagai sumber informasi tersendiri. Calon customer yang menemukan satu model tertentu dari pencarian atau link yang dibagikan tidak harus kembali ke homepage untuk memahami produk tersebut. Ketika tertarik melanjutkan, pengguna dapat langsung menghubungi sales melalui WhatsApp dari halaman kendaraan yang sedang mereka lihat.",
              en: "Each vehicle page was built to stand as its own information source. A prospective customer who finds a specific model from search or a shared link doesn't need to return to the homepage to understand that product. When interested in proceeding, the user can directly contact the salesperson via WhatsApp from the vehicle page they're currently viewing.",
            },
          ],
        },
        {
          heading: { id: "Dari Landing Page Menjadi Aset Pemasaran", en: "From Landing Page to Marketing Asset" },
          body: [
            {
              id: "Hasil akhirnya bukan website resmi dealer dan bukan pula marketplace kendaraan. Website Mitsubishi dibuat sebagai aset pemasaran digital milik sales — sebuah tempat yang dapat terus menampilkan produk, harga, promo, dan informasi kendaraan ketika sales sedang tidak berada di showroom atau belum sempat membalas pesan.",
              en: "The end result is not an official dealer website and not a vehicle marketplace. The Mitsubishi website was built as a digital marketing asset owned by the salesperson — a place that can continuously display products, pricing, promotions, and vehicle information when the salesperson is not at the showroom or hasn't yet replied to a message.",
            },
            {
              id: "Website menjadi penghubung antara aktivitas pemasaran seperti pencarian Google, iklan, media sosial, atau link yang dibagikan dengan percakapan langsung bersama sales.",
              en: "The website becomes a bridge between marketing activities like Google search, ads, social media, or shared links and the direct conversation with the salesperson.",
            },
          ],
        },
      ],
      nextProjectSlug: "jaecoo-bintaro",
    },
  },

  {
    slug: "jaecoo-bintaro",
    index: "04",
    name: "JAECOO Bintaro",
    categorySlug: "automotive",
    tagline: {
      id: "Website pemasaran digital untuk sales JAECOO Bintaro.",
      en: "Digital marketing website for JAECOO Bintaro sales.",
    },
    summary: {
      id: "Landing page pemasaran untuk sales JAECOO Bintaro, menampilkan katalog unit, harga, promo, dan jalur inquiry ke sales.",
      en: "Marketing landing page for JAECOO Bintaro sales, displaying unit catalog, pricing, promotions, and inquiry path to sales.",
    },
    year: "2025",
    client: "JAECOO Bintaro",
    industry: "Automotive Sales",
    cover: "/portfolio/mitsubishi.png",
    accent: "#4A4742",
    liveUrl: "https://jaecoobintaro.com",
    status: "published",
    order: 4,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Awal Kebutuhan", en: "How It Started" },
          body: [
            {
              id: "Seorang sales JAECOO di area Bintaro membutuhkan media digital sendiri untuk mendukung aktivitas pemasarannya. Informasi mengenai model kendaraan, harga, promo, dan penawaran sebelumnya banyak bergantung pada komunikasi langsung melalui chat atau media sosial. Cara tersebut tetap menjadi bagian penting dari proses penjualan, tetapi membuat informasi yang sama harus disampaikan berulang kali kepada calon customer.",
              en: "A JAECOO salesperson in the Bintaro area needed their own digital medium to support their marketing activities. Information about vehicle models, pricing, promotions, and offers previously relied heavily on direct communication through chat or social media. That approach remains an important part of the sales process, but it required the same information to be repeated to prospective customers over and over.",
            },
            {
              id: "Dari kebutuhan tersebut, kami mulai membangun JAECOO Bintaro sebagai pusat informasi sekaligus media pemasaran digital milik sales.",
              en: "From that need, we began building JAECOO Bintaro as an information hub and a digital marketing medium owned by the salesperson.",
            },
          ],
        },
        {
          heading: { id: "Masalah yang Ingin Diselesaikan", en: "The Problem to Solve" },
          body: [
            {
              id: "Website ini tidak dibuat untuk menggantikan komunikasi antara sales dan calon customer. Justru tujuannya adalah membuat komunikasi tersebut lebih efisien.",
              en: "This website was not built to replace communication between the salesperson and prospective customers. The goal was to make that communication more efficient.",
            },
            {
              id: "Sebelum menghubungi sales, calon customer sudah dapat melihat kendaraan yang tersedia, mengetahui kisaran harga, membaca informasi produk, melihat promo, dan memahami pilihan yang ditawarkan. Dengan begitu, ketika percakapan melalui WhatsApp dimulai, calon customer sudah memiliki konteks mengenai kendaraan yang diminati.",
              en: "Before contacting the salesperson, a prospective customer can already see available vehicles, understand the price range, read product information, view promotions, and understand the options offered. That way, when the WhatsApp conversation begins, the prospective customer already has context about the vehicle they're interested in.",
            },
          ],
        },
        {
          heading: { id: "Tantangan", en: "The Challenge" },
          body: [
            {
              id: "Tantangannya adalah membuat website yang cukup lengkap untuk memberikan informasi, tetapi tetap sederhana karena tujuan akhirnya bukan membuat portal otomotif yang kompleks. Website harus tetap berfokus pada satu hal: membantu sales memasarkan kendaraan dan membawa calon customer menuju percakapan langsung.",
              en: "The challenge was to build a website complete enough to provide information, yet simple enough because the end goal was not to build a complex automotive portal. The website had to stay focused on one thing: helping the salesperson market vehicles and bring prospective customers into direct conversation.",
            },
            {
              id: "Karena itu struktur informasi, navigasi, detail kendaraan, hingga CTA harus dibuat sesingkat mungkin tanpa menghilangkan informasi yang dibutuhkan calon pembeli.",
              en: "Therefore the information structure, navigation, vehicle details, and CTAs had to be kept as concise as possible without removing information that prospective buyers need.",
            },
          ],
        },
        {
          heading: { id: "Pendekatan yang Kami Ambil", en: "The Approach We Took" },
          body: [
            {
              id: "Kami menyusun pengalaman website mengikuti perjalanan sederhana calon pembeli: menemukan kendaraan → melihat pilihan model → memahami harga dan informasi unit → melihat promo → menghubungi sales. Informasi penting ditempatkan sebelum CTA sehingga WhatsApp bukan sekadar tombol yang muncul di mana-mana, tetapi menjadi langkah berikutnya setelah pengguna memahami produk yang ditawarkan.",
              en: "We structured the website experience following a simple buyer journey: find a vehicle → view model options → understand pricing and unit information → view promotions → contact the salesperson. Important information was placed before the CTA so that WhatsApp is not just a button appearing everywhere, but the next step after the user understands the product being offered.",
            },
          ],
        },
        {
          heading: { id: "Yang Dibangun", en: "What Was Built" },
          body: [
            {
              id: "Dari alur tersebut kami membangun website pemasaran JAECOO Bintaro yang terdiri dari katalog kendaraan, halaman detail setiap model, informasi harga dan promo, serta jalur inquiry langsung menuju sales. Penekanan utama ada pada karakter brand dan presentation — JAECOO sebagai brand yang relatif baru di pasar Indonesia membutuhkan penyajian yang dapat memperkenalkan identitas produknya, bukan sekadar daftar harga.",
              en: "From that flow we built the JAECOO Bintaro marketing website, consisting of a vehicle catalog, detail pages for each model, pricing and promotion information, and a direct inquiry path to the salesperson. The main emphasis is on brand character and presentation — JAECOO as a relatively new brand in the Indonesian market requires a presentation that can introduce its product identity, not just a price list.",
            },
            {
              id: "Setiap halaman kendaraan dibuat agar dapat berdiri sebagai sumber informasi tersendiri. Calon customer yang menemukan satu model tertentu dari pencarian atau link yang dibagikan tidak harus kembali ke homepage untuk memahami produk tersebut. Ketika tertarik melanjutkan, pengguna dapat langsung menghubungi sales melalui WhatsApp dari halaman kendaraan yang sedang mereka lihat.",
              en: "Each vehicle page was built to stand as its own information source. A prospective customer who finds a specific model from search or a shared link doesn't need to return to the homepage to understand that product. When interested in proceeding, the user can directly contact the salesperson via WhatsApp from the vehicle page they're currently viewing.",
            },
          ],
        },
        {
          heading: { id: "Dari Landing Page Menjadi Aset Pemasaran", en: "From Landing Page to Marketing Asset" },
          body: [
            {
              id: "Hasil akhirnya bukan website resmi dealer dan bukan pula marketplace kendaraan. JAECOO Bintaro dibuat sebagai aset pemasaran digital milik sales — sebuah tempat yang dapat terus menampilkan produk, harga, promo, dan informasi kendaraan ketika sales sedang tidak berada di showroom atau belum sempat membalas pesan.",
              en: "The end result is not an official dealer website and not a vehicle marketplace. JAECOO Bintaro was built as a digital marketing asset owned by the salesperson — a place that can continuously display products, pricing, promotions, and vehicle information when the salesperson is not at the showroom or hasn't yet replied to a message.",
            },
            {
              id: "Website menjadi penghubung antara aktivitas pemasaran seperti pencarian Google, iklan, media sosial, atau link yang dibagikan dengan percakapan langsung bersama sales.",
              en: "The website becomes a bridge between marketing activities like Google search, ads, social media, or shared links and the direct conversation with the salesperson.",
            },
          ],
        },
      ],
      nextProjectSlug: "berkah-komputer",
    },
  },

  /* ═══════════════════════════════════════════════
     TECHNOLOGY & RETAIL
     ═══════════════════════════════════════════════ */

  {
    slug: "berkah-komputer",
    index: "05",
    name: "Berkah Komputer",
    categorySlug: "technology-retail",
    tagline: {
      id: "E-commerce dan mini ERP toko laptop.",
      en: "E-commerce and mini ERP for a laptop store.",
    },
    summary: {
      id: "Bermula dari kebutuhan e-commerce sendiri untuk menghindari biaya admin marketplace, scope berkembang menjadi sistem operasional toko dengan inventory, transaksi, dan laporan keuangan.",
      en: "Starting from the need for an independent e-commerce to avoid marketplace admin fees, the scope grew into a store operational system with inventory, transactions, and financial reports.",
    },
    year: "2025",
    client: "Berkah Komputer",
    industry: "Retail / Technology",
    cover: "/portfolio/ghazy-computer.png",
    accent: "#2563EB",
    liveUrl: "https://berkahkomputer.id",
    status: "published",
    order: 1,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Awal Mula", en: "How It Started" },
          body: [
            {
              id: "Owner toko laptop ingin memiliki e-commerce sendiri karena biaya admin dan potongan marketplace cukup membebani. Itu adalah kebutuhan awal yang jelas — toko perlu kanal digital sendiri untuk mengontrol margin dan tidak terlalu bergantung pada marketplace.",
              en: "The laptop store owner wanted their own e-commerce because marketplace admin fees and cuts were quite burdensome. That was the clear initial need — the store needed its own digital channel to control margins and not rely too much on marketplaces.",
            },
            {
              id: "Namun setelah kebutuhan toko dibahas lebih dalam, ditemukan masalah lain: pencatatan stok dan pembukuan toko masih banyak dilakukan manual dan berantakan. Ternyata toko tidak hanya butuh storefront — mereka juga butuh sistem yang menangani operasional di baliknya.",
              en: "But after discussing the store's needs in depth, another problem was discovered: stock recording and bookkeeping were still largely manual and messy. It turned out the store didn't just need a storefront — they also needed a system to handle the operations behind it.",
            },
          ],
        },
        {
          heading: { id: "Scope yang Berkembang", en: "Scope That Grew" },
          body: [
            {
              id: "Dari sini scope berkembang. Kami tidak hanya membuat storefront untuk customer, tetapi juga admin panel yang terhubung langsung dengan inventory. Saat admin memasukkan produk, produk tampil di e-commerce sekaligus masuk stok inventory. Saat barang terjual, diproses melalui kasir atau order, stok berkurang, dan transaksi meninggalkan history.",
              en: "From here the scope grew. We didn't just build a storefront for customers, but an admin panel directly connected to inventory. When admin enters a product, it appears in the e-commerce and enters inventory stock simultaneously. When an item is sold, processed through cashier or order, stock decreases, and the transaction leaves a history.",
            },
            {
              id: "Sistem kemudian berkembang menjadi e-commerce + mini ERP toko yang mencakup pengelolaan produk, customer, transaksi, inventory, pengeluaran, dan laporan keuangan. Bukan satu problem tunggal yang dipecahkan, melainkan kebutuhan toko yang terungkap lapisan demi lapisan.",
              en: "The system then grew into an e-commerce + mini store ERP covering product management, customers, transactions, inventory, expenses, and financial reports. Not a single problem solved, but the store's needs revealed layer by layer.",
            },
          ],
        },
      ],
      techStory: {
        intro: {
          id: "Karena sistem menghubungkan e-commerce, admin panel, dan inventory dalam satu aplikasi, pemilihan teknologi difokuskan pada konsistensi data dan kecepatan pengembangan.",
          en: "Because the system connects e-commerce, admin panel, and inventory in one application, technology selection focused on data consistency and development speed.",
        },
        details: [
          {
            id: "Next.js dipilih karena e-commerce dan admin panel bisa berbagi komponen, logika, dan data dalam satu codebase. Server components menangani query produk dan transaksi, client components menangani interaksi kasir dan keranjang.",
            en: "Next.js was chosen because e-commerce and admin panel can share components, logic, and data in one codebase. Server components handle product and transaction queries, client components handle cashier and cart interactions.",
          },
          {
            id: "TypeScript digunakan karena sistem ini punya banyak entitas yang saling berhubungan — produk, stok, transaksi, customer, pengeluaran. Type safety memastikan ketika admin memasukkan produk, field yang masuk ke inventory dan e-commerce konsisten.",
            en: "TypeScript was used because this system has many interconnected entities — products, stock, transactions, customers, expenses. Type safety ensures when admin enters a product, the fields entering inventory and e-commerce are consistent.",
          },
          {
            id: "Prisma membantu mendefinisikan schema untuk produk, inventory, transaksi, dan laporan keuangan secara eksplisit. Relasi antara produk dan stok, transaksi dan customer, pengeluaran dan laporan — semua didefinisikan dengan jelas dan dapat diaudit.",
            en: "Prisma helps define the schema for products, inventory, transactions, and financial reports explicitly. Relationships between product and stock, transaction and customer, expense and report — all defined clearly and auditable.",
          },
          {
            id: "PostgreSQL dipilih karena sistem ini butuh database relasional. Transaksi yang mengurangi stok, menambah history, dan memperbarui laporan keuangan harus atomik — PostgreSQL menangani ini dengan transaction support yang andal.",
            en: "PostgreSQL was chosen because this system needs a relational database. Transactions that reduce stock, add history, and update financial reports must be atomic — PostgreSQL handles this with reliable transaction support.",
          },
        ],
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      },
      nextProjectSlug: "jakarta-laptops",
    },
  },

  {
    slug: "jakarta-laptops",
    index: "06",
    name: "Jakarta Laptops",
    categorySlug: "technology-retail",
    tagline: {
      id: "Kanal jual dan terima laptop bekas dengan sistem inventory.",
      en: "Sell and buyback channel for used laptops with inventory system.",
    },
    summary: {
      id: "Permintaan laptop bekas tinggi tapi supply sulit didapat. Platform dirancang tidak hanya untuk menjual, tetapi juga menerima penawaran laptop dari masyarakat.",
      en: "High demand for used laptops but supply is hard to get. The platform is designed not only to sell, but also to receive laptop offers from the public.",
    },
    year: "2025",
    client: "Jakarta Laptops",
    industry: "Retail / Technology",
    cover: "/portfolio/ghazy-computer.png",
    accent: "#8B5CF6",
    liveUrl: "https://jakartalaptops.com",
    status: "published",
    order: 2,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Problem yang Berbeda", en: "A Different Problem" },
          body: [
            {
              id: "Problem utama Jakarta Laptops berbeda dari toko laptop pada umumnya. Permintaan laptop bekas cukup besar, tetapi toko mengalami kesulitan mendapatkan supply atau barang. Intinya: pembeli ada, tapi stok susah didapat.",
              en: "Jakarta Laptops' main problem differs from typical laptop stores. Demand for used laptops is quite high, but the store struggles to get supply. In short: buyers exist, but stock is hard to get.",
            },
            {
              id: "Di saat yang sama, pengelolaan stok dan pembukuan juga menjadi kebutuhan. Toko tidak hanya butuh kanal jual — mereka juga butuh cara untuk mendapatkan barang.",
              en: "At the same time, stock management and bookkeeping are also needs. The store doesn't just need a selling channel — they also need a way to get inventory.",
            },
          ],
        },
        {
          heading: { id: "Dua Jalur, Satu Sistem", en: "Two Channels, One System" },
          body: [
            {
              id: "Karena itu platform tidak hanya dirancang untuk menjual laptop, tetapi juga menyediakan jalur agar masyarakat dapat menawarkan atau menjual laptop mereka ke Jakarta Laptops. Dua alur berjalan dalam satu sistem — alur jual dan alur terima.",
              en: "Therefore the platform is designed not only to sell laptops, but also to provide a channel for the public to offer or sell their laptops to Jakarta Laptops. Two flows run in one system — selling and buying.",
            },
            {
              id: "Inventory dan pencatatan mendukung kedua alur tersebut. Saat toko membeli laptop dari seseorang, barang masuk inventory. Saat laptop tersebut dijual ke customer lain, stok berkurang dan history tersimpan. Semua terhubung.",
              en: "Inventory and recording support both flows. When the store buys a laptop from someone, the item enters inventory. When that laptop is sold to another customer, stock decreases and history is saved. Everything is connected.",
            },
          ],
        },
      ],
      nextProjectSlug: "ghazy-computer",
    },
  },

  {
    slug: "ghazy-computer",
    index: "07",
    name: "Ghazy Computer",
    categorySlug: "technology-retail",
    tagline: {
      id: "Website katalog dan e-commerce untuk toko komputer.",
      en: "Catalog and e-commerce website for a computer store.",
    },
    summary: {
      id: "Kanal digital sendiri untuk Ghazy Computer dengan katalog produk, penyajian unit, dan jalur customer menuju pembelian atau inquiry.",
      en: "An independent digital channel for Ghazy Computer with product catalog, unit presentation, and customer path to purchase or inquiry.",
    },
    year: "2025",
    client: "Ghazy Computer",
    industry: "Retail / Technology",
    cover: "/portfolio/ghazy-computer.png",
    accent: "#E11D48",
    liveUrl: "https://ghazycomputer.com",
    status: "published",
    order: 3,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Konteks", en: "Context" },
          body: [
            {
              id: "Ghazy Computer berbeda dari Berkah atau Jakarta Laptops. Project ini merupakan website katalog dan e-commerce untuk membantu toko memiliki kanal digital sendiri. Fokusnya lebih sederhana — tidak ada ERP, tidak ada sistem pembukuan, tidak ada inventory accounting.",
              en: "Ghazy Computer differs from Berkah or Jakarta Laptops. This project is a catalog and e-commerce website to help the store have its own digital channel. The focus is simpler — no ERP, no bookkeeping system, no inventory accounting.",
            },
            {
              id: "Yang dibutuhkan adalah katalog produk yang dapat dijelajahi customer, penyajian produk yang jelas, informasi unit yang lengkap, dan jalur menuju pembelian atau inquiry. Cukup itu.",
              en: "What was needed is a product catalog that customers can browse, clear product presentation, complete unit information, and a path to purchase or inquiry. Just that.",
            },
          ],
        },
      ],
      nextProjectSlug: "blessing-tech",
    },
  },

  {
    slug: "blessing-tech",
    index: "08",
    name: "Blessing Tech Computindo",
    categorySlug: "technology-retail",
    tagline: {
      id: "E-commerce, terima laptop, dan sistem operasional toko dalam satu platform.",
      en: "E-commerce, laptop buyback, and store operational system in one platform.",
    },
    summary: {
      id: "Owner meminta paket lengkap sejak awal — e-commerce, jalur terima laptop, dan pembukuan operasional toko.",
      en: "The owner requested a complete package from the start — e-commerce, laptop buyback channel, and store operational bookkeeping.",
    },
    year: "2025",
    client: "Blessing Tech Computindo",
    industry: "Retail / Technology",
    cover: "/portfolio/ghazy-computer.png",
    accent: "#0891B2",
    liveUrl: "https://blessing-tech.vercel.app",
    status: "published",
    order: 4,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Paket Lengkap Sejak Awal", en: "Complete Package From the Start" },
          body: [
            {
              id: "Blessing Tech berbeda dari Berkah. Owner ingin membuat sistem yang cukup lengkap sejak awal setelah melihat toko laptop lain mulai memiliki kanal digital sendiri. Bukan satu problem yang ditemukan belakangan — owner sudah tahu dari awal apa yang dibutuhkan.",
              en: "Blessing Tech differs from Berkah. The owner wanted to build a fairly complete system from the start after seeing other laptop stores begin to have their own digital channels. Not a single problem discovered later — the owner knew from the start what was needed.",
            },
            {
              id: "Scope yang diminta mencakup tiga sisi: e-commerce, terima laptop, dan pembukuan atau operasional toko. Tiga sisi yang saling terhubung dalam satu sistem.",
              en: "The requested scope covers three sides: e-commerce, laptop buyback, and store bookkeeping or operations. Three sides connected within one system.",
            },
          ],
        },
        {
          heading: { id: "Tiga Sisi yang Terhubung", en: "Three Connected Sides" },
          body: [
            {
              id: "Sistem yang dibangun menghubungkan: frontend customer untuk katalog dan pembelian; jalur terima laptop untuk customer menawarkan laptop; dan admin untuk produk, customer, kasir, order, stok, pengeluaran, inventory, dan laporan keuangan.",
              en: "The system connects: customer frontend for catalog and purchasing; laptop buyback channel for customers to offer laptops; and admin for products, customers, cashier, orders, stock, expenses, inventory, and financial reports.",
            },
            {
              id: "Ketiga sisi ini tidak berdiri sendiri. Produk yang dimasukkan admin muncul di e-commerce. Laptop yang ditawarkan customer melalui jalur terima laptop menjadi calon inventory setelah evaluasi. Transaksi di kasir mengurangi stok dan meninggalkan history di laporan keuangan. Semua terhubung.",
              en: "These three sides don't stand alone. Products entered by admin appear in the e-commerce. Laptops offered by customers through the buyback channel become candidate inventory after evaluation. Cashier transactions reduce stock and leave history in financial reports. Everything is connected.",
            },
            {
              id: "URL Vercel digunakan sementara sampai domain client tersedia.",
              en: "The Vercel URL is used temporarily until the client's domain is available.",
            },
          ],
        },
      ],
      nextProjectSlug: "jasa-proteksi",
    },
  },

  /* ═══════════════════════════════════════════════
     INSURANCE
     ═══════════════════════════════════════════════ */

  {
    slug: "jasa-proteksi",
    index: "09",
    name: "Jasa Proteksi",
    categorySlug: "insurance",
    tagline: {
      id: "Platform kalkulator estimasi premi asuransi kendaraan berbasis data.",
      en: "Data-driven vehicle insurance premium estimation calculator platform.",
    },
    summary: {
      id: "Client datang dengan sekitar 14.000 data premi kendaraan dan ide untuk membuat aplikasi yang dapat cepat menampilkan estimasi premi kendaraan.",
      en: "The client came with about 14,000 vehicle premium data records and an idea to build an application that can quickly display vehicle premium estimates.",
    },
    year: "2025",
    client: "Jasa Proteksi",
    industry: "Insurance",
    cover: "/portfolio/jasaprotect.png",
    accent: "#6366F1",
    liveUrl: "https://jasaproteksi.com",
    status: "published",
    order: 1,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    role: { id: "Strategi · Desain · Pengembangan", en: "Strategy · Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Client Datang dengan Data dan Ide", en: "Client Came with Data and an Idea" },
          body: [
            {
              id: "Client datang dengan sekitar 14.000 data premi kendaraan dan memiliki ide untuk membuat aplikasi yang dapat dengan cepat menampilkan estimasi premi kendaraan. Pengguna cukup memilih merek, tipe, dan tahun kendaraan — dan sistem menampilkan estimasi premi.",
              en: "The client came with about 14,000 vehicle premium data records and an idea to build an application that can quickly display vehicle premium estimates. Users simply select the brand, type, and year of the vehicle — and the system displays the premium estimate.",
            },
            {
              id: "Konteksnya berbeda dari project e-commerce atau website pemasaran. Di sini, inti produknya adalah data — ribuan baris data premi yang harus dapat diakses dengan cepat dan sederhana oleh pengguna akhir.",
              en: "The context differs from e-commerce or marketing website projects. Here, the core of the product is data — thousands of rows of premium data that must be accessible quickly and simply by end users.",
            },
          ],
        },
        {
          heading: { id: "Ribuan Data Menjadi Pengalaman Sederhana", en: "Thousands of Records Become a Simple Experience" },
          body: [
            {
              id: "Tantangannya adalah membuat ribuan data tersebut tidak membebani pengguna. Tidak ada yang ingin melihat tabel dengan 14.000 baris. Yang pengguna butuh adalah tiga pilihan — merek, tipe, tahun — dan satu angka estimasi premi.",
              en: "The challenge was to make thousands of data records not burden the user. No one wants to see a table with 14,000 rows. What users need is three selections — brand, type, year — and one premium estimate number.",
            },
            {
              id: "Dibangun engine kalkulator yang membaca pilihan pengguna dan hanya mencari atau menampilkan data yang relevan. Engine ini terpisah dari UI — perhitungan yang sama dapat dipakai ulang di permukaan yang berbeda.",
              en: "A calculator engine was built that reads the user's selections and only searches for or displays relevant data. This engine is separate from the UI — the same calculation can be reused across different surfaces.",
            },
            {
              id: "Dari kebutuhan tersebut terbentuk Jasa Proteksi — sebuah platform kalkulator estimasi premi kendaraan berbasis data. Bukan company profile, bukan brochure website. Sebuah platform yang produknya adalah kemampuan menghitung estimasi premi dengan cepat dari ribuan data.",
              en: "From that need, Jasa Proteksi was formed — a data-driven vehicle insurance premium estimation calculator platform. Not a company profile, not a brochure website. A platform whose product is the ability to quickly calculate premium estimates from thousands of records.",
            },
          ],
        },
      ],
      techStory: {
        intro: {
          id: "Setelah alur sistem terbentuk, kami memilih teknologi yang dapat menjaga proses kalkulasi, data kendaraan, dan antarmuka tetap berada dalam satu aplikasi yang terstruktur.",
          en: "After the system flow was formed, we chose technologies that could keep the calculation process, vehicle data, and interface within one structured application.",
        },
        details: [
          {
            id: "Next.js dipilih sebagai fondasi aplikasi karena kemampuannya menangani server-side rendering dan client-side interactivity dalam satu framework. Kalkulator premi perlu cepat dimuat di browser, dan Next.js memungkinkan halaman utama dirender di server sambil tetap menjaga interaktivitas di sisi client.",
            en: "Next.js was chosen as the application foundation because of its ability to handle server-side rendering and client-side interactivity within one framework. The premium calculator needs to load fast in the browser, and Next.js allows the main page to be rendered on the server while maintaining interactivity on the client side.",
          },
          {
            id: "TypeScript digunakan karena project ini melibatkan banyak struktur data — merek, tipe, tahun, parameter perlindungan, hasil perhitungan. Type safety membantu memastikan bahwa data yang mengalir dari database ke engine kalkulator ke UI konsisten dan tidak ada field yang tertukar.",
            en: "TypeScript was used because this project involves many data structures — brand, type, year, protection parameters, calculation results. Type safety helps ensure that data flowing from database to calculator engine to UI is consistent and no fields are swapped.",
          },
          {
            id: "Tailwind CSS digunakan untuk antarmuka yang membutuhkan kecepatan iterasi. Kalkulator premi punya banyak state — pilihan merek, tipe, tahun, parameter — dan setiap state perlu menampilkan UI yang berbeda. Tailwind memungkinkan perubahan tampilan tanpa konteks CSS file yang terpisah.",
            en: "Tailwind CSS was used for an interface that needs iteration speed. The premium calculator has many states — brand, type, year, parameter selections — and each state needs to display different UI. Tailwind allows appearance changes without a separate CSS file context.",
          },
          {
            id: "Prisma membantu mendefinisikan schema dan hubungan data kendaraan secara eksplisit. Dengan 14.000 data premi, struktur tabel yang jelas penting — Prisma memastikan query ke database dapat ditulis dengan type safety dan dapat diaudit.",
            en: "Prisma helps define the vehicle data schema and relationships explicitly. With 14,000 premium records, clear table structure is important — Prisma ensures database queries can be written with type safety and audited.",
          },
          {
            id: "PostgreSQL dipilih karena project ini membutuhkan database relasional untuk menangani ribuan data kendaraan dengan struktur yang jelas. Relasi antara merek, tipe, tahun, dan premi perlu konsisten — dan PostgreSQL menangani ini dengan baik.",
            en: "PostgreSQL was chosen because this project needs a relational database to handle thousands of vehicle records with clear structure. Relationships between brand, type, year, and premium need to be consistent — and PostgreSQL handles this well.",
          },
        ],
        stack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
      },
      nextProjectSlug: "betawi-laptop",
    },
  },

  /* ═══════════════════════════════════════════════
     INVENTORY & BUSINESS SYSTEMS
     ═══════════════════════════════════════════════ */

  {
    slug: "betawi-laptop",
    index: "10",
    name: "Betawi Laptop Kemayoran",
    categorySlug: "inventory-systems",
    tagline: {
      id: "Sistem inventory dan operasional untuk toko laptop bekas.",
      en: "Inventory and operational system for a used laptop store.",
    },
    summary: {
      id: "Berawal dari kebutuhan sederhana untuk mengingat histori harga, sistem berkembang menjadi operational & inventory system untuk toko laptop bekas.",
      en: "Starting from a simple need to remember price history, the system grew into an operational & inventory system for a used laptop store.",
    },
    year: "2025",
    client: "Betawi Laptop Kemayoran",
    industry: "Retail / Inventory",
    cover: "/portfolio/ghazy-computer.png",
    accent: "#0D9488",
    status: "published",
    order: 1,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Masalah yang Sederhana", en: "A Simple Problem" },
          body: [
            {
              id: "Owner merupakan pemilik toko laptop bekas dan awalnya mempunyai masalah yang sangat sederhana namun spesifik. Ia sering kesulitan mengingat: terakhir beli laptop merk atau seri atau spek seperti ini dari siapa dan berapa? Terakhir jual spek seperti ini ke siapa dan berapa?",
              en: "The owner is a used laptop store owner who initially had a very simple but specific problem. He often had trouble remembering: last time I bought a laptop with this brand or series or spec, from whom and for how much? Last time I sold a spec like this, to whom and for how much?",
            },
            {
              id: "Bukan masalah besar yang terdengar seperti kebutuhan ERP. Hanya masalah mengingat — tapi cukup mengganggu operasional toko sehari-hari.",
              en: "Not a big problem that sounds like an ERP need. Just a remembering problem — but disruptive enough to daily store operations.",
            },
          ],
        },
        {
          heading: { id: "Pencarian Histori", en: "History Search" },
          body: [
            {
              id: "Dari situ dibuat sistem pencarian berdasarkan merk, tipe, dan spesifikasi. Contoh: Asus, Core i5 Gen 7. Sistem dapat menampilkan history transaksi relevan — pernah dibeli dari Seller A, kapan, berapa harga beli; pernah dibeli dari Seller B, kapan, berapa harga beli; pernah dijual ke Buyer A, kapan, berapa harga jual.",
              en: "From there, a search system was built based on brand, type, and specifications. Example: Asus, Core i5 Gen 7. The system can display relevant transaction history — bought from Seller A, when, at what purchase price; bought from Seller B, when, at what purchase price; sold to Buyer A, when, at what selling price.",
            },
          ],
        },
        {
          heading: { id: "Berkembang Lebih Jauh", en: "Growing Further" },
          body: [
            {
              id: "Sistem kemudian berkembang lebih jauh. Saat toko membeli barang, admin memasukkan tanggal, merk, tipe, spesifikasi, dan harga beli. Barang tersebut otomatis masuk inventory. Saat barang dijual, transaksi dilakukan melalui kasir, barang keluar dari stok, dan history transaksi tetap tersimpan.",
              en: "The system then grew further. When the store buys an item, admin enters the date, brand, type, specifications, and purchase price. The item automatically enters inventory. When an item is sold, the transaction is processed through the cashier, the item leaves stock, and the transaction history remains saved.",
            },
            {
              id: "Sistem memiliki history barang, stok barang, daftar buyer, daftar seller, transaksi atau kasir, laporan keuangan, modal, omzet, dan profit. Berawal dari kebutuhan sederhana untuk mengingat histori harga, sistem berkembang menjadi operational & inventory system untuk toko laptop bekas.",
              en: "The system has item history, stock, buyer list, seller list, transactions or cashier, financial reports, capital, revenue, and profit. Starting from a simple need to remember price history, the system grew into an operational & inventory system for a used laptop store.",
            },
            {
              id: "Aplikasi mengandung data bisnis asli sehingga tidak menampilkan screenshot atau data client.",
              en: "The application contains real business data, so no screenshots or client data are displayed.",
            },
          ],
        },
      ],
      nextProjectSlug: "inventra",
    },
  },

  {
    slug: "inventra",
    index: "11",
    name: "Inventra",
    categorySlug: "inventory-systems",
    tagline: {
      id: "ERP versi sendiri, dalam pengembangan.",
      en: "A self-built ERP, in development.",
    },
    summary: {
      id: "Berasal dari pengalaman pribadi menggunakan ERP setiap hari sebagai admin. Setelah resign, pengalaman tersebut menjadi dasar untuk membangun Inventra.",
      en: "Originated from personal experience using an ERP daily as an admin. After resigning, that experience became the foundation for building Inventra.",
    },
    year: "2025",
    client: "Personal R&D",
    industry: "Internal R&D",
    cover: "/portfolio/ghazy-computer.png",
    accent: "#B8B3AA",
    status: "development",
    order: 2,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    role: { id: "Arsitektur · Pengembangan", en: "Architecture · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Dari Pengalaman Menggunakan ERP", en: "From Experience Using an ERP" },
          body: [
            {
              id: "Inventra berasal dari pengalaman pribadi menggunakan ERP setiap hari saat bekerja sebagai admin. Bukan belajar dari buku atau course — belajar dari pemakaian nyata, hari demi hari, selama bertahun-tahun.",
              en: "Inventra originates from personal experience using an ERP daily while working as an admin. Not learning from books or courses — learning from real usage, day by day, for years.",
            },
            {
              id: "Semakin lama ERP digunakan, semakin terlihat menarik bagaimana banyak role bekerja dalam satu sistem, setiap role hanya melihat data atau fungsi yang diperlukan, transaksi saling terhubung, data tidak berbenturan, inventory dan operasional tetap sinkron, dan angka harus tetap konsisten.",
              en: "The longer the ERP was used, the more interesting it became how many roles work within one system, each role only sees the data or functions they need, transactions are interconnected, data doesn't conflict, inventory and operations stay in sync, and numbers must remain consistent.",
            },
          ],
        },
        {
          heading: { id: "Dipahami, Lalu Dibangun Ulang", en: "Understood, Then Rebuilt" },
          body: [
            {
              id: "Selama bekerja, menu, workflow, dan business logic ERP dipelajari sedikit demi sedikit sampai benar-benar memahami alurnya. Bukan sekadar tahu tombolnya — memahami mengapa alur seperti itu, mengapa role A hanya boleh melihat data ini, mengapa transaksi ini harus terhubung dengan transaksi itu.",
              en: "During employment, the ERP's menu, workflow, and business logic were studied bit by bit until the flow was truly understood. Not just knowing the buttons — understanding why the flow is like that, why role A can only see this data, why this transaction must be connected to that transaction.",
            },
            {
              id: "Setelah resign, pengalaman tersebut menjadi dasar untuk mulai membangun Inventra, ERP versi sendiri, sedikit demi sedikit. Bukan project client, bukan ERP yang sudah production-ready. Personal R&D yang masih dalam pengembangan.",
              en: "After resigning, that experience became the foundation to start building Inventra — a self-built ERP, piece by piece. Not a client project, not a production-ready ERP. Personal R&D still in development.",
            },
          ],
        },
      ],
      nextProjectSlug: "lets-go-karimun",
    },
  },

  /* ═══════════════════════════════════════════════
     TRAVEL & TOURISM
     ═══════════════════════════════════════════════ */

  {
    slug: "lets-go-karimun",
    index: "12",
    name: "Let's Go Karimun",
    categorySlug: "travel-tourism",
    tagline: {
      id: "Website pariwisata Karimun, dikerjakan melalui kolaborasi dengan agency.",
      en: "Karimun tourism website, done through collaboration with an agency.",
    },
    summary: {
      id: "Project kolaborasi dengan agency. Pengalaman digital yang dibangun untuk bisnis pariwisata Karimun.",
      en: "A collaboration project with an agency. Digital experience built for a Karimun tourism business.",
    },
    year: "2025",
    client: "Kolaborasi Agency",
    industry: "Travel & Tourism",
    cover: "/portfolio/jasaprotect.png",
    accent: "#0891B2",
    status: "published",
    order: 1,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Konteks Kolaborasi", en: "Collaboration Context" },
          body: [
            {
              id: "Project ini dibuat melalui kolaborasi dengan agency. Bukan konteks di mana client datang dengan problem — melainkan project delivery di mana scope diterima dari agency dan dikerjakan sesuai kebutuhan.",
              en: "This project was done through collaboration with an agency. Not a context where the client came with a problem — rather a project delivery where scope was received from the agency and executed according to needs.",
            },
            {
              id: "Scope yang diterima mencakup pengalaman digital untuk bisnis pariwisata Karimun — website destinasi, paket tour, dan jalur pemesanan.",
              en: "The accepted scope covers the digital experience for a Karimun tourism business — destination website, tour packages, and booking channel.",
            },
          ],
        },
        {
          heading: { id: "Yang Dibangun", en: "What Was Built" },
          body: [
            {
              id: "Keputusan desain dan implementasi teknis disesuaikan dengan kebutuhan destinasi wisata. Website menampilkan informasi destinasi, paket tour yang tersedia, dan jalur untuk calon wisatawan menghubungi pengelola.",
              en: "Design decisions and technical implementation were tailored to the needs of a tourism destination. The website displays destination information, available tour packages, and a channel for prospective tourists to contact the operator.",
            },
          ],
        },
      ],
      nextProjectSlug: "anima-companion",
    },
  },

  /* ═══════════════════════════════════════════════
     PET HEALTH
     ═══════════════════════════════════════════════ */

  {
    slug: "anima-companion",
    index: "13",
    name: "Anima Companion",
    categorySlug: "pet-health",
    tagline: {
      id: "Brand produk kesehatan hewan, dikerjakan melalui kolaborasi dengan agency.",
      en: "Pet health product brand, done through collaboration with an agency.",
    },
    summary: {
      id: "Project kolaborasi dengan agency untuk brand produk pet health.",
      en: "A collaboration project with an agency for a pet health product brand.",
    },
    year: "2025",
    client: "Kolaborasi Agency",
    industry: "Pet Health",
    cover: "/portfolio/jasaprotect.png",
    accent: "#8B5CF6",
    status: "published",
    order: 1,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Konteks Kolaborasi", en: "Collaboration Context" },
          body: [
            {
              id: "Anima Companion adalah brand produk kesehatan hewan. Project dikerjakan melalui kolaborasi dengan agency — bukan konteks di mana client datang dengan problem yang harus dipecahkan, melainkan project delivery dengan scope yang diterima dari agency.",
              en: "Anima Companion is a pet health product brand. The project was done through collaboration with an agency — not a context where the client came with a problem to solve, but a project delivery with scope received from the agency.",
            },
          ],
        },
        {
          heading: { id: "Yang Dibangun", en: "What Was Built" },
          body: [
            {
              id: "Pengalaman digital yang dibangun mencakup website brand, penyajian produk, dan jalur customer menuju pembelian. Desain dan implementasi disesuaikan dengan karakter brand produk kesehatan hewan.",
              en: "The digital experience built covers the brand website, product presentation, and the customer path to purchase. Design and implementation were tailored to the character of a pet health product brand.",
            },
          ],
        },
      ],
      nextProjectSlug: "nauka-motion",
    },
  },

  /* ═══════════════════════════════════════════════
     PERSONAL PROJECTS
     ═══════════════════════════════════════════════ */

  {
    slug: "nauka-motion",
    index: "14",
    name: "Nauka Motion",
    categorySlug: "personal-projects",
    tagline: {
      id: "Studio produk digital Nauka Motion — website ini sendiri.",
      en: "Nauka Motion digital product studio — this website itself.",
    },
    summary: {
      id: "Website studio Nauka Motion, dirancang dan dikembangkan sebagai representasi digital studio.",
      en: "The Nauka Motion studio website, designed and developed as the studio's digital representation.",
    },
    year: "2025",
    client: "Nauka Motion",
    industry: "Personal Project",
    cover: "/portfolio/jasaprotect.png",
    accent: "#D85A2A",
    liveUrl: "https://motion.nauka.id",
    status: "internal",
    order: 1,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Studio Sendiri", en: "The Studio Itself" },
          body: [
            {
              id: "Website studio Nauka Motion sendiri. Dirancang dengan warm-paper editorial design system — palet ink black, warm paper, burnt orange — menggabungkan tipografi Instrument Sans untuk body, Fraunces untuk display editorial, dan JetBrains Mono untuk label teknis.",
              en: "The Nauka Motion studio website itself. Designed with a warm-paper editorial design system — ink black, warm paper, burnt orange palette — combining Instrument Sans for body, Fraunces for editorial display, and JetBrains Mono for technical labels.",
            },
            {
              id: "Visual system, motion language, dan struktur halaman dikembangkan sebagai eksperimen desain yang juga menginformasikan project client. Filosofi 'Small movement. Real Impact.' — pergerakan kecil yang tepat sasaran menciptakan perubahan yang lebih bermakna.",
              en: "The visual system, motion language, and page structure were developed as a design experiment that also informs client projects. The philosophy 'Small movement. Real Impact.' — small, well-targeted movement creates more meaningful change.",
            },
          ],
        },
      ],
      nextProjectSlug: "jejak-cahaya",
    },
  },

  {
    slug: "jejak-cahaya",
    index: "15",
    name: "Jejak Cahaya",
    categorySlug: "personal-projects",
    tagline: {
      id: "Platform pembelajaran sejarah Islam, bercerita imersif tentang perjalanan Rasulullah.",
      en: "Islamic history learning platform, immersive storytelling about the Prophet's journey.",
    },
    summary: {
      id: "Project pribadi yang menggabungkan cita-cita menjadi penulis, kemampuan developer, dan ketertarikan pada sejarah Islam.",
      en: "A personal project combining the aspiration to be a writer, developer skills, and interest in Islamic history.",
    },
    year: "2025",
    client: "Personal Project",
    industry: "Personal Project",
    cover: "/portfolio/jasaprotect.png",
    accent: "#B8B3AA",
    liveUrl: "https://jejakcahaya.nauka.id",
    status: "internal",
    order: 2,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: { id: "Penulisan · Desain · Pengembangan", en: "Writing · Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Pertemuan Beberapa Cita-cita", en: "Where Several Aspirations Meet" },
          body: [
            {
              id: "Jejak Cahaya bukan satu cita-cita. Project ini menggabungkan beberapa hal sekaligus: cita-cita menjadi penulis, kemampuan sebagai developer, ketertarikan pada sejarah Islam, media pembelajaran, dan dakwah. Semuanya bertemu di satu tempat.",
              en: "Jejak Cahaya is not a single aspiration. This project combines several things at once: the aspiration to be a writer, developer skills, interest in Islamic history, learning media, and dakwah. All meeting in one place.",
            },
            {
              id: "Kisah pertama yang dikembangkan adalah perjalanan hidup Rasulullah Muhammad, dari konteks sebelum kelahiran sampai wafat. Bukan ringkasan biografi — sebuah perjalanan yang dibaca bab demi bab.",
              en: "The first story developed is the life journey of Prophet Muhammad, from the context before his birth to his passing. Not a biographical summary — a journey read chapter by chapter.",
            },
          ],
        },
        {
          heading: { id: "Proses Menulis", en: "The Writing Process" },
          body: [
            {
              id: "Proses penulisannya dilakukan bab demi bab dengan mencari dan membandingkan sumber yang dianggap paling terpercaya dan paling mendekati, termasuk Al-Qur'an, hadits, dan kitab-kitab sirah tepercaya. Bukan mengarang — mencari, membandingkan, lalu menulis dengan sumber yang dapat ditelusuri.",
              en: "The writing process is done chapter by chapter, searching for and comparing sources considered most trusted and most accurate, including the Qur'an, hadith, and trusted sirah books. Not fabricating — searching, comparing, then writing with traceable sources.",
            },
            {
              id: "Saat ini penulisannya masih berkembang, sekitar Bab 11. Bukan project yang selesai — project yang terus tumbuh seiring waktu.",
              en: "The writing is still developing, currently around Chapter 11. Not a finished project — a project that continues to grow over time.",
            },
          ],
        },
        {
          heading: { id: "Gaya Bercerita", en: "The Storytelling Style" },
          body: [
            {
              id: "Gaya Jejak Cahaya berbeda dari tulisan sejarah biasa. Narasinya dibuat imersif — seperti sebuah kamera berada dekat dengan peristiwa dan mengajak pembaca membayangkan suasana di sana. Tanpa pernah mengklaim narator sebagai saksi sejarah. Narator ada di sana, tapi jujur tentang posisinya: menceritakan ulang, bukan menyaksikan.",
              en: "Jejak Cahaya's style differs from typical historical writing. The narrative is immersive — as if a camera is close to the events, inviting readers to imagine the atmosphere there. Without ever claiming the narrator as a historical witness. The narrator is there, but honest about their position: retelling, not witnessing.",
            },
          ],
        },
        {
          heading: { id: "Bukan Komersial, Terbuka", en: "Not Commercial, Open" },
          body: [
            {
              id: "Jejak Cahaya bukan platform animasi. Bukan project komersial. Platform juga direncanakan berkembang ke media visual atau video di masa depan, tapi tulisan adalah intinya.",
              en: "Jejak Cahaya is not an animation platform. Not a commercial project. The platform is also planned to expand into visual or video media in the future, but writing is its core.",
            },
            {
              id: "Merupakan platform terbuka — siapa pun yang memiliki tujuan serupa dapat ikut berkontribusi dalam pengembangannya. Bukan milik satu orang, milik siapa saja yang ingin ikut.",
              en: "It is an open platform — anyone with a similar goal can contribute to its development. Not owned by one person, owned by anyone who wants to join.",
            },
          ],
        },
      ],
      nextProjectSlug: "nauka-tech",
    },
  },

  {
    slug: "nauka-tech",
    index: "16",
    name: "Nauka Tech",
    categorySlug: "personal-projects",
    tagline: {
      id: "Halaman landing untuk lini layanan teknologi Nauka.",
      en: "Landing page for Nauka's technology service line.",
    },
    summary: {
      id: "Subdomain tech.nauka.id sebagai pengenalan layanan teknologi di bawah naungan Nauka.",
      en: "The tech.nauka.id subdomain introducing technology services under Nauka.",
    },
    year: "2025",
    client: "Nauka",
    industry: "Personal Project",
    cover: "/portfolio/jasaprotect.png",
    accent: "#4A4742",
    liveUrl: "https://tech.nauka.id",
    status: "internal",
    order: 3,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Halaman landing Nauka Tech di subdomain tech.nauka.id sebagai pengenalan layanan teknologi di bawah naungan Nauka. Memisahkan positioning dari studio motion.nauka.id.",
              en: "The Nauka Tech landing page on the tech.nauka.id subdomain introducing technology services under Nauka. Separating positioning from the motion.nauka.id studio.",
            },
          ],
        },
      ],
      nextProjectSlug: "nauka-gadget",
    },
  },

  {
    slug: "nauka-gadget",
    index: "17",
    name: "Nauka Gadget",
    categorySlug: "personal-projects",
    tagline: {
      id: "Eksperimen toko gadget premium di luar marketplace.",
      en: "Premium gadget store experiment outside marketplaces.",
    },
    summary: {
      id: "Prototipe e-commerce gadget dengan branding dan UX yang lebih terkontrol.",
      en: "Gadget e-commerce prototype with more controlled branding and UX.",
    },
    year: "2025",
    client: "Personal Project",
    industry: "Personal Project",
    cover: "/portfolio/nauka-gadget.png",
    accent: "#8B5CF6",
    liveUrl: "https://gadget.nauka.id",
    status: "internal",
    order: 4,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Eksperimen toko gadget premium di luar marketplace. Prototipe e-commerce dengan desain premium, katalog terorganisir, dan checkout yang dirancang untuk meminimalkan friksi.",
              en: "A premium gadget store experiment outside marketplaces. E-commerce prototype with premium design, organized catalog, and checkout designed to minimize friction.",
            },
          ],
        },
      ],
      nextProjectSlug: "nauka-kostay",
    },
  },

  {
    slug: "nauka-kostay",
    index: "18",
    name: "Nauka Kostay",
    categorySlug: "personal-projects",
    tagline: {
      id: "Eksperimen pengalaman digital hospitality untuk bisnis kos.",
      en: "Digital hospitality experience experiment for a boarding house business.",
    },
    summary: {
      id: "Prototipe yang mengeksplorasi bagaimana pengalaman digital hospitality dapat diterapkan pada bisnis kos.",
      en: "A prototype exploring how digital hospitality experiences can be applied to a boarding house business.",
    },
    year: "2025",
    client: "Personal Project",
    industry: "Personal Project",
    cover: "/portfolio/nauka-kostay.png",
    accent: "#D97706",
    status: "internal",
    order: 5,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Eksperimen pengalaman digital hospitality untuk bisnis kos. Mengeksplorasi bagaimana pengalaman yang biasa diterapkan pada hotel dapat diadaptasi untuk kos — di mana penghuni layak mendapat pengalaman lebih baik dari sekadar melihat foto kamar dan harga.",
              en: "A digital hospitality experience experiment for a boarding house business. Exploring how experiences usually applied to hotels can be adapted for boarding houses — where residents deserve a better experience than just viewing room photos and pricing.",
            },
          ],
        },
      ],
      nextProjectSlug: "padel-club",
    },
  },

  {
    slug: "padel-club",
    index: "19",
    name: "Padel Club",
    categorySlug: "personal-projects",
    tagline: {
      id: "Eksperimen sistem booking untuk klub padel.",
      en: "Booking system experiment for a padel club.",
    },
    summary: {
      id: "Prototipe sistem booking berbasis jadwal untuk klub padel.",
      en: "A schedule-based booking system prototype for a padel club.",
    },
    year: "2025",
    client: "Personal Project",
    industry: "Personal Project",
    cover: "/portfolio/jasaprotect.png",
    accent: "#B8B3AA",
    status: "internal",
    order: 6,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Eksperimen sistem booking untuk klub padel. Mengeksplorasi arsitektur sistem reservasi berbasis slot waktu dengan deteksi konflik jadwal dan konfirmasi otomatis.",
              en: "A booking system experiment for a padel club. Exploring the architecture of a time-slot-based reservation system with schedule conflict detection and automated confirmation.",
            },
          ],
        },
      ],
    },
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STATS — angka jujur untuk homepage
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const studioStats = {
  projectTotal: {
    value: "50+",
    label: {
      id: "Project, prototype & eksperimen dikembangkan",
      en: "Projects, prototypes & experiments developed",
    },
  },
  projectLive: {
    value: "10+",
    label: {
      id: "Project telah dipublikasikan",
      en: "Projects published",
    },
  },
  categoryCount: {
    value: "7",
    label: {
      id: "Kategori project saat ini",
      en: "Current project categories",
    },
  },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CAPABILITIES — apa yang Nauka bangun
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface StudioCapability {
  index: string;
  title: string;
  description: LocalizedText;
  deliverables: LocalizedText[];
}

export const studioCapabilities: StudioCapability[] = [
  {
    index: "01",
    title: "Website Development",
    description: {
      id: "Website bisnis profesional yang mengkonversi pengunjung menjadi pelanggan. Dari landing page hingga website korporat.",
      en: "Professional business websites that convert visitors into customers. From landing pages to corporate sites.",
    },
    deliverables: [
      { id: "Website sales otomotif", en: "Automotive sales websites" },
      { id: "Landing page bisnis", en: "Business landing pages" },
      { id: "Website korporat", en: "Corporate websites" },
      { id: "Website profil brand", en: "Brand profile websites" },
    ],
  },
  {
    index: "02",
    title: "Web Application",
    description: {
      id: "Aplikasi web custom dengan alur bisnis spesifik — kalkulator, dashboard, platform multi-pengguna.",
      en: "Custom web applications with specific business flows — calculators, dashboards, multi-user platforms.",
    },
    deliverables: [
      { id: "Kalkulator & platform interaktif", en: "Calculators & interactive platforms" },
      { id: "Dashboard admin", en: "Admin dashboards" },
      { id: "Platform multi-pengguna", en: "Multi-user platforms" },
      { id: "Sistem berbasis data", en: "Data-driven systems" },
    ],
  },
  {
    index: "03",
    title: "Business System",
    description: {
      id: "Sistem operasional yang menggantikan spreadsheet chaos — inventory, tracking, otomasi proses bisnis.",
      en: "Operational systems that replace spreadsheet chaos — inventory, tracking, business process automation.",
    },
    deliverables: [
      { id: "Sistem inventory", en: "Inventory systems" },
      { id: "Sistem operasional", en: "Operational systems" },
      { id: "Sistem tracking", en: "Tracking systems" },
      { id: "Otomasi proses bisnis", en: "Business process automation" },
    ],
  },
  {
    index: "04",
    title: "E-Commerce & Catalog",
    description: {
      id: "Toko online premium dengan katalog terorganisir, checkout, dan dashboard admin.",
      en: "Premium online stores with organized catalogs, checkout, and admin dashboard.",
    },
    deliverables: [
      { id: "E-commerce premium", en: "Premium e-commerce" },
      { id: "Katalog produk", en: "Product catalogs" },
      { id: "Sistem checkout", en: "Checkout systems" },
      { id: "Dashboard admin produk", en: "Product admin dashboard" },
    ],
  },
  {
    index: "05",
    title: "UI/UX & Product Design",
    description: {
      id: "Desain antarmuka dan pengalaman produk yang berfokus pada kejelasan dan konversi.",
      en: "Interface and product experience design focused on clarity and conversion.",
    },
    deliverables: [
      { id: "Information architecture", en: "Information architecture" },
      { id: "Wireframe & prototype", en: "Wireframes & prototypes" },
      { id: "Design system", en: "Design systems" },
      { id: "Interaction design", en: "Interaction design" },
    ],
  },
  {
    index: "06",
    title: "SEO & Digital Growth",
    description: {
      id: "Fondasi SEO teknis, arsitektur konten, dan strategi pertumbuhan digital.",
      en: "Technical SEO foundations, content architecture, and digital growth strategy.",
    },
    deliverables: [
      { id: "Technical SEO", en: "Technical SEO" },
      { id: "Arsitektur konten", en: "Content architecture" },
      { id: "Structured data", en: "Structured data" },
      { id: "Strategi pertumbuhan", en: "Growth strategy" },
    ],
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROCESS — cara Nauka Motion bekerja
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export interface StudioProcessStep {
  index: string;
  title: LocalizedText;
  description: LocalizedText;
}

export const studioProcess: StudioProcessStep[] = [
  {
    index: "01",
    title: { id: "Diskusi", en: "Discover" },
    description: {
      id: "Memahami bisnis, kebutuhan, dan tujuan sebelum menyentuh desain atau kode.",
      en: "Understanding the business, needs, and goals before touching design or code.",
    },
  },
  {
    index: "02",
    title: { id: "Definisi", en: "Define" },
    description: {
      id: "Menyusun arah produk, scope, dan roadmap yang dapat dieksekusi tim.",
      en: "Defining the product direction, scope, and a roadmap the team can execute.",
    },
  },
  {
    index: "03",
    title: { id: "Desain", en: "Design" },
    description: {
      id: "Membangun desain sistem, alur, dan antarmuka yang berfokus pada kejelasan.",
      en: "Building the design system, flows, and interfaces focused on clarity.",
    },
  },
  {
    index: "04",
    title: { id: "Pengembangan", en: "Develop" },
    description: {
      id: "Implementasi type-safe, performance-aware, dengan deployment ke produksi.",
      en: "Type-safe, performance-aware implementation, with deployment to production.",
    },
  },
  {
    index: "05",
    title: { id: "Evolusi", en: "Evolve" },
    description: {
      id: "Iterasi setelah launch berdasarkan data nyata dan feedback pengguna.",
      en: "Iterating after launch based on real data and user feedback.",
    },
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   HELPER FUNCTIONS
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export function getCategoryBySlug(slug: string): StudioCategory | undefined {
  return studioCategories.find((c) => c.slug === slug);
}

export function getProjectBySlug(slug: string): StudioProject | undefined {
  return studioProjects.find((p) => p.slug === slug);
}

export function getAllProjectSlugs(): string[] {
  return studioProjects
    .filter((p) => p.status !== "draft")
    .map((p) => p.slug);
}

export function getProjectsByCategory(categorySlug: CategorySlug): StudioProject[] {
  return studioProjects
    .filter((p) => p.categorySlug === categorySlug && p.status !== "draft")
    .sort((a, b) => a.order - b.order);
}

export function getPublicProjects(): StudioProject[] {
  return studioProjects
    .filter((p) => p.status !== "draft")
    .sort((a, b) => a.order - b.order);
}
