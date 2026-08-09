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
     AUTOMOTIVE
     ═══════════════════════════════════════════════ */

  {
    slug: "geely-bsd",
    index: "01",
    name: "Geely BSD",
    categorySlug: "automotive",
    tagline: {
      id: "Website pemasaran digital untuk sales Geely di area BSD, dirancang sebagai pusat informasi kendaraan, harga, promo, dan jalur inquiry langsung ke sales.",
      en: "Digital marketing website for a Geely salesperson in the BSD area, designed as a hub for vehicle information, pricing, promotions, and a direct inquiry path to sales.",
    },
    summary: {
      id: "Website pemasaran digital untuk sales Geely di area BSD, dirancang sebagai pusat informasi kendaraan, harga, promo, dan jalur inquiry langsung ke sales.",
      en: "Digital marketing website for a Geely salesperson in the BSD area, designed as a hub for vehicle information, pricing, promotions, and a direct inquiry path to sales.",
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
              id: "Seorang sales Geely di area BSD membutuhkan media digital sendiri untuk mendukung aktivitas pemasarannya.",
              en: "A Geely salesperson in the BSD area needed their own digital medium to support their marketing activities.",
            },
            {
              id: "Informasi mengenai model kendaraan, harga, promo, dan penawaran biasanya disampaikan melalui chat, media sosial, atau komunikasi langsung. Cara tersebut tetap menjadi bagian penting dari proses penjualan, tetapi membuat sales harus berulang kali menjelaskan informasi dasar yang sama kepada calon customer yang berbeda.",
              en: "Information about vehicle models, pricing, promotions, and offers was usually delivered through chat, social media, or direct communication. That approach remains an important part of the sales process, but it required the salesperson to repeatedly explain the same basic information to different prospective customers.",
            },
            {
              id: "Dari kebutuhan tersebut, Geely BSD mulai dibangun sebagai pusat informasi sekaligus media pemasaran digital milik sales.",
              en: "From that need, Geely BSD began to be built as an information hub and a digital marketing medium owned by the salesperson.",
            },
          ],
        },
        {
          heading: { id: "Masalah yang Ingin Diselesaikan", en: "The Problem to Solve" },
          body: [
            {
              id: "Website ini tidak dibuat untuk menggantikan komunikasi antara sales dan calon customer.",
              en: "This website was not built to replace communication between the salesperson and prospective customers.",
            },
            {
              id: "Tujuannya justru membuat komunikasi tersebut lebih efisien. Sebelum menghubungi sales, calon customer dapat melihat kendaraan yang tersedia, memahami harga, membaca informasi produk, dan melihat promo yang sedang ditawarkan.",
              en: "The goal was to make that communication more efficient. Before contacting the salesperson, a prospective customer can see available vehicles, understand pricing, read product information, and view current promotions.",
            },
            {
              id: "Dengan begitu, ketika percakapan dimulai, calon customer sudah memiliki konteks mengenai kendaraan yang diminati.",
              en: "That way, when the conversation begins, the prospective customer already has context about the vehicle they're interested in.",
            },
          ],
        },
        {
          heading: { id: "Tantangan", en: "The Challenge" },
          body: [
            {
              id: "Tantangannya adalah membuat website yang cukup lengkap untuk memberikan informasi, tetapi tidak berubah menjadi portal otomotif yang terlalu kompleks.",
              en: "The challenge was to build a website complete enough to provide information, but not turn into an overly complex automotive portal.",
            },
            {
              id: "Fungsi utamanya tetap sederhana: membantu sales memasarkan kendaraan dan membawa calon customer menuju percakapan langsung.",
              en: "Its main function remains simple: help the salesperson market vehicles and bring prospective customers into direct conversation.",
            },
          ],
        },
        {
          heading: { id: "Pendekatan yang Kami Ambil", en: "The Approach We Took" },
          body: [
            {
              id: "Pengalaman pengguna disusun mengikuti perjalanan sederhana calon pembeli: menemukan kendaraan → melihat model → memahami informasi dan harga → melihat promo → menghubungi sales.",
              en: "The user experience was structured following a simple buyer journey: find a vehicle → view models → understand information and pricing → view promotions → contact the salesperson.",
            },
            {
              id: "WhatsApp ditempatkan sebagai langkah lanjutan setelah calon customer mendapatkan informasi yang dibutuhkan.",
              en: "WhatsApp was placed as a follow-up step after the prospective customer gets the information they need.",
            },
          ],
        },
        {
          heading: { id: "Yang Dibangun", en: "What Was Built" },
          body: [
            {
              id: "Geely BSD dibangun sebagai katalog kendaraan yang menampilkan model Geely, informasi produk, harga, promo, dan halaman detail untuk masing-masing unit.",
              en: "Geely BSD was built as a vehicle catalog displaying Geely models, product information, pricing, promotions, and detail pages for each unit.",
            },
            {
              id: "Setiap halaman kendaraan dapat menjadi titik masuk tersendiri bagi calon customer yang datang dari pencarian, iklan, media sosial, maupun link yang dibagikan langsung oleh sales.",
              en: "Each vehicle page can be its own entry point for prospective customers coming from search, ads, social media, or links shared directly by the salesperson.",
            },
            {
              id: "Ketika tertarik melanjutkan, pengguna dapat langsung terhubung dengan sales melalui WhatsApp.",
              en: "When interested in proceeding, the user can directly connect with the salesperson via WhatsApp.",
            },
          ],
        },
        {
          heading: { id: "Dari Landing Page Menjadi Aset Pemasaran", en: "From Landing Page to Marketing Asset" },
          body: [
            {
              id: "Geely BSD bukan website resmi dealer.",
              en: "Geely BSD is not an official dealer website.",
            },
            {
              id: "Website ini dibangun sebagai aset pemasaran digital untuk sales Geely, yang dapat terus menjelaskan produk dan memberikan informasi bahkan ketika sales sedang tidak berada di showroom atau belum sempat membalas pesan.",
              en: "This website was built as a digital marketing asset for the Geely salesperson, which can keep explaining products and providing information even when the salesperson is not at the showroom or hasn't yet replied to a message.",
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
      id: "Landing page pemasaran untuk sales Suzuki Jakarta Barat yang menghubungkan informasi kendaraan, promo, dan inquiry langsung melalui WhatsApp.",
      en: "Marketing landing page for a Suzuki Jakarta Barat salesperson that connects vehicle information, promotions, and direct inquiry through WhatsApp.",
    },
    summary: {
      id: "Landing page pemasaran untuk sales Suzuki Jakarta Barat yang menghubungkan informasi kendaraan, promo, dan inquiry langsung melalui WhatsApp.",
      en: "Marketing landing page for a Suzuki Jakarta Barat salesperson that connects vehicle information, promotions, and direct inquiry through WhatsApp.",
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
              id: "Seorang sales Suzuki di area Jakarta Barat membutuhkan media digital sendiri untuk mendukung aktivitas pemasarannya.",
              en: "A Suzuki salesperson in the West Jakarta area needed their own digital medium to support their marketing activities.",
            },
            {
              id: "Informasi mengenai model kendaraan, harga, promo, dan penawaran biasanya disampaikan melalui chat, media sosial, atau komunikasi langsung. Cara tersebut tetap menjadi bagian penting dari proses penjualan, tetapi membuat sales harus berulang kali menjelaskan informasi dasar yang sama kepada calon customer yang berbeda.",
              en: "Information about vehicle models, pricing, promotions, and offers was usually delivered through chat, social media, or direct communication. That approach remains an important part of the sales process, but it required the salesperson to repeatedly explain the same basic information to different prospective customers.",
            },
            {
              id: "Dari kebutuhan tersebut, Suzuki Jakarta Barat mulai dibangun sebagai pusat informasi sekaligus media pemasaran digital milik sales.",
              en: "From that need, Suzuki Jakarta Barat began to be built as an information hub and a digital marketing medium owned by the salesperson.",
            },
          ],
        },
        {
          heading: { id: "Masalah yang Ingin Diselesaikan", en: "The Problem to Solve" },
          body: [
            {
              id: "Website ini tidak dibuat untuk menggantikan komunikasi antara sales dan calon customer.",
              en: "This website was not built to replace communication between the salesperson and prospective customers.",
            },
            {
              id: "Tujuannya justru membuat komunikasi tersebut lebih efisien. Sebelum menghubungi sales, calon customer dapat melihat kendaraan yang tersedia, memahami harga, membaca informasi produk, dan melihat promo yang sedang ditawarkan.",
              en: "The goal was to make that communication more efficient. Before contacting the salesperson, a prospective customer can see available vehicles, understand pricing, read product information, and view current promotions.",
            },
            {
              id: "Dengan begitu, ketika percakapan dimulai, calon customer sudah memiliki konteks mengenai kendaraan yang diminati.",
              en: "That way, when the conversation begins, the prospective customer already has context about the vehicle they're interested in.",
            },
          ],
        },
        {
          heading: { id: "Tantangan", en: "The Challenge" },
          body: [
            {
              id: "Tantangannya adalah membuat website yang cukup lengkap untuk memberikan informasi, tetapi tidak berubah menjadi portal otomotif yang terlalu kompleks.",
              en: "The challenge was to build a website complete enough to provide information, but not turn into an overly complex automotive portal.",
            },
            {
              id: "Fungsi utamanya tetap sederhana: membantu sales memasarkan kendaraan dan membawa calon customer menuju percakapan langsung.",
              en: "Its main function remains simple: help the salesperson market vehicles and bring prospective customers into direct conversation.",
            },
          ],
        },
        {
          heading: { id: "Pendekatan yang Kami Ambil", en: "The Approach We Took" },
          body: [
            {
              id: "Pengalaman pengguna disusun mengikuti perjalanan sederhana calon pembeli: menemukan kendaraan → melihat model → memahami informasi dan harga → melihat promo → menghubungi sales.",
              en: "The user experience was structured following a simple buyer journey: find a vehicle → view models → understand information and pricing → view promotions → contact the salesperson.",
            },
            {
              id: "WhatsApp ditempatkan sebagai langkah lanjutan setelah calon customer mendapatkan informasi yang dibutuhkan.",
              en: "WhatsApp was placed as a follow-up step after the prospective customer gets the information they need.",
            },
          ],
        },
        {
          heading: { id: "Yang Dibangun", en: "What Was Built" },
          body: [
            {
              id: "Suzuki Jakarta Barat dirancang dengan alur yang membawa calon customer dari informasi kendaraan menuju tindakan yang paling penting bagi sales.",
              en: "Suzuki Jakarta Barat was designed with a flow that brings prospective customers from vehicle information to the action most important to the salesperson.",
            },
            {
              id: "Pengguna dapat melihat pilihan mobil Suzuki, membuka informasi unit, memahami harga dan promo yang tersedia, lalu melanjutkan komunikasi langsung melalui WhatsApp.",
              en: "Users can view Suzuki car options, open unit information, understand available pricing and promotions, then continue direct communication through WhatsApp.",
            },
            {
              id: "Fokusnya bukan membuat proses pembelian online yang panjang, tetapi membantu calon customer mendapatkan informasi yang cukup sebelum berbicara dengan sales.",
              en: "The focus is not on building a long online purchase process, but on helping prospective customers get enough information before speaking with the salesperson.",
            },
          ],
        },
        {
          heading: { id: "Dari Landing Page Menjadi Aset Pemasaran", en: "From Landing Page to Marketing Asset" },
          body: [
            {
              id: "Suzuki Jakarta Barat menjadi salah satu kanal digital yang dapat digunakan sales untuk mengarahkan traffic dari iklan, pencarian, media sosial, ataupun link yang dibagikan kepada calon customer.",
              en: "Suzuki Jakarta Barat becomes one of the digital channels the salesperson can use to direct traffic from ads, search, social media, or links shared with prospective customers.",
            },
            {
              id: "Website ini bukan website resmi dealer, tetapi media pemasaran yang dibangun untuk mendukung aktivitas seorang sales Suzuki.",
              en: "This website is not an official dealer website, but a marketing medium built to support the activities of a Suzuki salesperson.",
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
      id: "Website pemasaran untuk sales Mitsubishi yang membantu calon customer memahami model, pilihan kendaraan, harga, dan informasi produk sebelum menghubungi sales.",
      en: "Marketing website for a Mitsubishi salesperson that helps prospective customers understand models, vehicle options, pricing, and product information before contacting the salesperson.",
    },
    summary: {
      id: "Website pemasaran untuk sales Mitsubishi yang membantu calon customer memahami model, pilihan kendaraan, harga, dan informasi produk sebelum menghubungi sales.",
      en: "Marketing website for a Mitsubishi salesperson that helps prospective customers understand models, vehicle options, pricing, and product information before contacting the salesperson.",
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
              id: "Seorang sales Mitsubishi membutuhkan media digital sendiri untuk mendukung aktivitas pemasarannya.",
              en: "A Mitsubishi salesperson needed their own digital medium to support their marketing activities.",
            },
            {
              id: "Informasi mengenai model kendaraan, harga, promo, dan penawaran biasanya disampaikan melalui chat, media sosial, atau komunikasi langsung. Cara tersebut tetap menjadi bagian penting dari proses penjualan, tetapi membuat sales harus berulang kali menjelaskan informasi dasar yang sama kepada calon customer yang berbeda.",
              en: "Information about vehicle models, pricing, promotions, and offers was usually delivered through chat, social media, or direct communication. That approach remains an important part of the sales process, but it required the salesperson to repeatedly explain the same basic information to different prospective customers.",
            },
            {
              id: "Dari kebutuhan tersebut, website Mitsubishi mulai dibangun sebagai pusat informasi sekaligus media pemasaran digital milik sales.",
              en: "From that need, the Mitsubishi website began to be built as an information hub and a digital marketing medium owned by the salesperson.",
            },
          ],
        },
        {
          heading: { id: "Masalah yang Ingin Diselesaikan", en: "The Problem to Solve" },
          body: [
            {
              id: "Website ini tidak dibuat untuk menggantikan komunikasi antara sales dan calon customer.",
              en: "This website was not built to replace communication between the salesperson and prospective customers.",
            },
            {
              id: "Tujuannya justru membuat komunikasi tersebut lebih efisien. Sebelum menghubungi sales, calon customer dapat melihat kendaraan yang tersedia, memahami harga, membaca informasi produk, dan melihat promo yang sedang ditawarkan.",
              en: "The goal was to make that communication more efficient. Before contacting the salesperson, a prospective customer can see available vehicles, understand pricing, read product information, and view current promotions.",
            },
            {
              id: "Dengan begitu, ketika percakapan dimulai, calon customer sudah memiliki konteks mengenai kendaraan yang diminati.",
              en: "That way, when the conversation begins, the prospective customer already has context about the vehicle they're interested in.",
            },
          ],
        },
        {
          heading: { id: "Tantangan", en: "The Challenge" },
          body: [
            {
              id: "Tantangannya adalah membuat website yang cukup lengkap untuk memberikan informasi, tetapi tidak berubah menjadi portal otomotif yang terlalu kompleks.",
              en: "The challenge was to build a website complete enough to provide information, but not turn into an overly complex automotive portal.",
            },
            {
              id: "Fungsi utamanya tetap sederhana: membantu sales memasarkan kendaraan dan membawa calon customer menuju percakapan langsung.",
              en: "Its main function remains simple: help the salesperson market vehicles and bring prospective customers into direct conversation.",
            },
          ],
        },
        {
          heading: { id: "Pendekatan yang Kami Ambil", en: "The Approach We Took" },
          body: [
            {
              id: "Pengalaman pengguna disusun mengikuti perjalanan sederhana calon pembeli: menemukan kendaraan → melihat model → memahami informasi dan harga → melihat promo → menghubungi sales.",
              en: "The user experience was structured following a simple buyer journey: find a vehicle → view models → understand information and pricing → view promotions → contact the salesperson.",
            },
            {
              id: "WhatsApp ditempatkan sebagai langkah lanjutan setelah calon customer mendapatkan informasi yang dibutuhkan.",
              en: "WhatsApp was placed as a follow-up step after the prospective customer gets the information they need.",
            },
          ],
        },
        {
          heading: { id: "Yang Dibangun", en: "What Was Built" },
          body: [
            {
              id: "Pada project Mitsubishi, perhatian diberikan pada bagaimana berbagai model dan pilihan kendaraan dapat disajikan tanpa membuat calon customer kesulitan memahami katalog.",
              en: "On the Mitsubishi project, attention was given to how various models and vehicle options can be presented without making it difficult for prospective customers to understand the catalog.",
            },
            {
              id: "Setiap kendaraan memiliki ruang informasi sendiri sehingga pengguna dapat mempelajari unit yang diminati terlebih dahulu, melihat informasi yang tersedia, lalu melanjutkan percakapan langsung dengan sales.",
              en: "Each vehicle has its own information space so users can study the unit they're interested in first, view available information, then continue with direct conversation with the salesperson.",
            },
          ],
        },
        {
          heading: { id: "Dari Landing Page Menjadi Aset Pemasaran", en: "From Landing Page to Marketing Asset" },
          body: [
            {
              id: "Website Mitsubishi berfungsi sebagai perpanjangan aktivitas pemasaran sales.",
              en: "The Mitsubishi website functions as an extension of the salesperson's marketing activities.",
            },
            {
              id: "Informasi yang sebelumnya harus terus dijelaskan melalui chat dapat tersedia setiap saat dan menjadi titik temu antara calon customer dari kanal digital dengan sales yang akan menangani proses selanjutnya.",
              en: "Information that previously had to be repeatedly explained through chat can now be available at all times and become a meeting point between prospective customers from digital channels and the salesperson who will handle the next steps.",
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
      id: "Website pemasaran digital untuk sales JAECOO Bintaro yang menggabungkan presentasi brand, informasi kendaraan, dan jalur inquiry langsung.",
      en: "Digital marketing website for a JAECOO Bintaro salesperson that combines brand presentation, vehicle information, and a direct inquiry path.",
    },
    summary: {
      id: "Website pemasaran digital untuk sales JAECOO Bintaro yang menggabungkan presentasi brand, informasi kendaraan, dan jalur inquiry langsung.",
      en: "Digital marketing website for a JAECOO Bintaro salesperson that combines brand presentation, vehicle information, and a direct inquiry path.",
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
              id: "Seorang sales JAECOO di area Bintaro membutuhkan media digital sendiri untuk mendukung aktivitas pemasarannya.",
              en: "A JAECOO salesperson in the Bintaro area needed their own digital medium to support their marketing activities.",
            },
            {
              id: "Informasi mengenai model kendaraan, harga, promo, dan penawaran biasanya disampaikan melalui chat, media sosial, atau komunikasi langsung. Cara tersebut tetap menjadi bagian penting dari proses penjualan, tetapi membuat sales harus berulang kali menjelaskan informasi dasar yang sama kepada calon customer yang berbeda.",
              en: "Information about vehicle models, pricing, promotions, and offers was usually delivered through chat, social media, or direct communication. That approach remains an important part of the sales process, but it required the salesperson to repeatedly explain the same basic information to different prospective customers.",
            },
            {
              id: "Dari kebutuhan tersebut, JAECOO Bintaro mulai dibangun sebagai pusat informasi sekaligus media pemasaran digital milik sales.",
              en: "From that need, JAECOO Bintaro began to be built as an information hub and a digital marketing medium owned by the salesperson.",
            },
          ],
        },
        {
          heading: { id: "Masalah yang Ingin Diselesaikan", en: "The Problem to Solve" },
          body: [
            {
              id: "Website ini tidak dibuat untuk menggantikan komunikasi antara sales dan calon customer.",
              en: "This website was not built to replace communication between the salesperson and prospective customers.",
            },
            {
              id: "Tujuannya justru membuat komunikasi tersebut lebih efisien. Sebelum menghubungi sales, calon customer dapat melihat kendaraan yang tersedia, memahami harga, membaca informasi produk, dan melihat promo yang sedang ditawarkan.",
              en: "The goal was to make that communication more efficient. Before contacting the salesperson, a prospective customer can see available vehicles, understand pricing, read product information, and view current promotions.",
            },
            {
              id: "Dengan begitu, ketika percakapan dimulai, calon customer sudah memiliki konteks mengenai kendaraan yang diminati.",
              en: "That way, when the conversation begins, the prospective customer already has context about the vehicle they're interested in.",
            },
          ],
        },
        {
          heading: { id: "Tantangan", en: "The Challenge" },
          body: [
            {
              id: "Tantangannya adalah membuat website yang cukup lengkap untuk memberikan informasi, tetapi tidak berubah menjadi portal otomotif yang terlalu kompleks.",
              en: "The challenge was to build a website complete enough to provide information, but not turn into an overly complex automotive portal.",
            },
            {
              id: "Fungsi utamanya tetap sederhana: membantu sales memasarkan kendaraan dan membawa calon customer menuju percakapan langsung.",
              en: "Its main function remains simple: help the salesperson market vehicles and bring prospective customers into direct conversation.",
            },
          ],
        },
        {
          heading: { id: "Pendekatan yang Kami Ambil", en: "The Approach We Took" },
          body: [
            {
              id: "Pengalaman pengguna disusun mengikuti perjalanan sederhana calon pembeli: menemukan kendaraan → melihat model → memahami informasi dan harga → melihat promo → menghubungi sales.",
              en: "The user experience was structured following a simple buyer journey: find a vehicle → view models → understand information and pricing → view promotions → contact the salesperson.",
            },
            {
              id: "WhatsApp ditempatkan sebagai langkah lanjutan setelah calon customer mendapatkan informasi yang dibutuhkan.",
              en: "WhatsApp was placed as a follow-up step after the prospective customer gets the information they need.",
            },
          ],
        },
        {
          heading: { id: "Yang Dibangun", en: "What Was Built" },
          body: [
            {
              id: "Pada JAECOO Bintaro, website tidak hanya perlu menampilkan kendaraan tetapi juga membantu memperkenalkan karakter brand kepada calon customer.",
              en: "On JAECOO Bintaro, the website not only needs to display vehicles but also help introduce the brand character to prospective customers.",
            },
            {
              id: "Presentasi visual, informasi model, harga, serta konten produk disusun agar pengguna bisa mengenal kendaraan terlebih dahulu sebelum memutuskan untuk menghubungi sales.",
              en: "Visual presentation, model information, pricing, and product content were arranged so users can get to know the vehicle first before deciding to contact the salesperson.",
            },
          ],
        },
        {
          heading: { id: "Dari Landing Page Menjadi Aset Pemasaran", en: "From Landing Page to Marketing Asset" },
          body: [
            {
              id: "JAECOO Bintaro dibangun sebagai media pemasaran milik sales, bukan website resmi dealer.",
              en: "JAECOO Bintaro was built as a marketing medium owned by the salesperson, not an official dealer website.",
            },
            {
              id: "Website menjadi tempat di mana pengenalan brand, informasi produk, dan jalur komunikasi dengan sales bertemu dalam satu pengalaman digital.",
              en: "The website becomes a place where brand introduction, product information, and the communication path with the salesperson meet in one digital experience.",
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
      id: "E-commerce toko laptop yang berkembang menjadi sistem operasional terintegrasi dengan inventory, kasir, pembukuan, dan mini ERP.",
      en: "Laptop store e-commerce that grew into an integrated operational system with inventory, cashier, bookkeeping, and mini ERP.",
    },
    summary: {
      id: "E-commerce toko laptop yang berkembang menjadi sistem operasional terintegrasi dengan inventory, kasir, pembukuan, dan mini ERP.",
      en: "Laptop store e-commerce that grew into an integrated operational system with inventory, cashier, bookkeeping, and mini ERP.",
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
          heading: { id: "Awalnya Hanya Ingin Punya E-Commerce Sendiri", en: "Initially Just Wanted Their Own E-Commerce" },
          body: [
            {
              id: "Di tengah besarnya biaya admin dan potongan transaksi dari marketplace besar, owner Berkah Komputer ingin memiliki kanal penjualan sendiri.",
              en: "Amid the high admin fees and transaction cuts from major marketplaces, the Berkah Komputer owner wanted their own sales channel.",
            },
            {
              id: "Ide awalnya cukup sederhana: membuat sebuah e-commerce tempat customer dapat melihat dan membeli produk tanpa seluruh aktivitas penjualan harus bergantung pada marketplace.",
              en: "The initial idea was simple: build an e-commerce where customers can view and buy products without all sales activity having to depend on a marketplace.",
            },
          ],
        },
        {
          heading: { id: "Masalah yang Ternyata Lebih Dalam", en: "The Problem Turned Out Deeper" },
          body: [
            {
              id: "Ketika kebutuhan toko mulai dibahas lebih jauh, masalahnya ternyata tidak berhenti pada penjualan online.",
              en: "When the store's needs were discussed further, the problem turned out not to stop at online sales.",
            },
            {
              id: "Pencatatan stok, barang masuk dan keluar, transaksi, serta pembukuan masih banyak dilakukan secara manual dan tersebar.",
              en: "Stock recording, goods in and out, transactions, and bookkeeping were still largely done manually and scattered.",
            },
            {
              id: "Dari sini scope project mulai berubah. Kami tidak hanya membutuhkan storefront untuk customer, tetapi juga sistem di belakangnya yang dapat membaca operasional toko dari sumber data yang sama.",
              en: "From here the project scope began to change. We didn't just need a storefront for customers, but also a system behind it that can read store operations from the same data source.",
            },
          ],
        },
        {
          heading: { id: "Menghubungkan Penjualan dengan Inventory", en: "Connecting Sales with Inventory" },
          body: [
            {
              id: "Produk yang dimasukkan melalui admin panel tidak boleh hanya menjadi gambar dan harga di website.",
              en: "Products entered through the admin panel cannot just be images and prices on the website.",
            },
            {
              id: "Ketika admin menambahkan sebuah laptop, unit tersebut juga harus tercatat sebagai stok barang. Ketika barang terjual, transaksi dilakukan melalui sistem kasir atau order sehingga stok ikut berkurang dan pergerakan barang meninggalkan history.",
              en: "When admin adds a laptop, that unit must also be recorded as stock. When an item is sold, the transaction is processed through the cashier or order system so stock decreases and goods movement leaves a history.",
            },
            {
              id: "Dengan cara tersebut, katalog customer dan inventory toko tidak hidup sebagai dua sistem yang terpisah.",
              en: "This way, the customer catalog and store inventory don't live as two separate systems.",
            },
          ],
        },
        {
          heading: { id: "Yang Akhirnya Dibangun", en: "What Was Finally Built" },
          body: [
            {
              id: "Berkah Komputer berkembang menjadi dua sisi yang saling terhubung. Di depan terdapat e-commerce untuk customer. Di belakang terdapat admin panel untuk mengelola produk, customer, transaksi, stok, kasir, pengeluaran, inventory, dan laporan.",
              en: "Berkah Komputer grew into two connected sides. In front is the e-commerce for customers. In back is the admin panel to manage products, customers, transactions, stock, cashier, expenses, inventory, and reports.",
            },
            {
              id: "Dari kebutuhan awal membuat toko online, project ini akhirnya berkembang menjadi sebuah e-commerce yang terintegrasi dengan mini ERP untuk operasional toko.",
              en: "From the initial need to build an online store, this project finally grew into an e-commerce integrated with a mini ERP for store operations.",
            },
          ],
        },
        {
          heading: { id: "Hasil Akhir", en: "The Final Result" },
          body: [
            {
              id: "Website bukan lagi sekadar tempat menampilkan laptop. Satu produk yang masuk ke sistem dapat mengikuti alurnya dari inventory, tampil ke customer, diproses ketika terjual, keluar dari stok, dan tetap meninggalkan riwayat transaksi.",
              en: "The website is no longer just a place to display laptops. One product entering the system can follow its flow from inventory, appear to customers, be processed when sold, leave stock, and still leave a transaction history.",
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
      id: "Platform jual-beli laptop bekas yang dirancang untuk membantu toko mendapatkan supply dari masyarakat sekaligus mengelola penjualan dan operasional.",
      en: "Used laptop buy-sell platform designed to help the store get supply from the public while managing sales and operations.",
    },
    summary: {
      id: "Platform jual-beli laptop bekas yang dirancang untuk membantu toko mendapatkan supply dari masyarakat sekaligus mengelola penjualan dan operasional.",
      en: "Used laptop buy-sell platform designed to help the store get supply from the public while managing sales and operations.",
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
          heading: { id: "Permintaan Ada, Barangnya yang Sulit Dicari", en: "Demand Exists, Stock Is Hard to Find" },
          body: [
            {
              id: "Jakarta Laptops menghadapi kondisi yang berbeda. Permintaan terhadap laptop bekas cukup besar, tetapi mendapatkan stok yang sesuai justru menjadi salah satu tantangan utama.",
              en: "Jakarta Laptops faces a different situation. Demand for used laptops is quite high, but getting suitable stock is actually one of the main challenges.",
            },
            {
              id: "Dalam bisnis laptop bekas, penjualan tidak dapat terus berjalan jika toko hanya memikirkan bagaimana menjual. Toko juga harus terus mendapatkan unit baru untuk dijadikan stok.",
              en: "In the used laptop business, sales cannot keep running if the store only thinks about how to sell. The store must also keep getting new units to become stock.",
            },
          ],
        },
        {
          heading: { id: "Masalahnya Ada di Dua Arah", en: "The Problem Is Two-Way" },
          body: [
            {
              id: "Karena itu platform tidak cukup hanya menjadi katalog penjualan.",
              en: "Therefore the platform cannot just be a sales catalog.",
            },
            {
              id: "Customer yang ingin membeli membutuhkan tempat untuk melihat laptop yang tersedia. Di sisi lain, masyarakat yang memiliki laptop dan ingin menjualnya juga perlu memiliki jalur untuk menawarkan perangkat mereka kepada Jakarta Laptops.",
              en: "Customers who want to buy need a place to view available laptops. On the other side, people who have laptops and want to sell them also need a path to offer their devices to Jakarta Laptops.",
            },
            {
              id: "Ditambah dengan kebutuhan pengelolaan stok dan pembukuan, sistem akhirnya harus menangani arus barang masuk dan barang keluar.",
              en: "Added to the need for stock management and bookkeeping, the system ultimately had to handle the flow of goods in and goods out.",
            },
          ],
        },
        {
          heading: { id: "Pendekatan yang Dibangun", en: "The Approach Built" },
          body: [
            {
              id: "Kami membuat dua jalur utama dalam satu platform. Satu sisi membantu Jakarta Laptops menjual laptop. Sisi lainnya membantu toko mendapatkan laptop dari masyarakat.",
              en: "We built two main paths in one platform. One side helps Jakarta Laptops sell laptops. The other side helps the store get laptops from the public.",
            },
            {
              id: "Dengan demikian website tidak hanya menjadi titik akhir proses penjualan, tetapi juga dapat menjadi salah satu sumber supply barang.",
              en: "Thus the website is not only the end point of the sales process, but can also be one source of goods supply.",
            },
          ],
        },
        {
          heading: { id: "Yang Dibangun", en: "What Was Built" },
          body: [
            {
              id: "Platform menggabungkan katalog laptop, halaman penjualan produk, dan alur Terima/Jual Laptop bagi masyarakat yang ingin menawarkan perangkatnya.",
              en: "The platform combines a laptop catalog, product sales pages, and a Terima/Jual Laptop (Receive/Sell Laptop) flow for people who want to offer their devices.",
            },
            {
              id: "Di belakangnya, proses tersebut didukung oleh pengelolaan inventory dan pencatatan operasional agar barang yang masuk maupun keluar dapat tetap dilacak.",
              en: "Behind it, that process is supported by inventory management and operational recording so goods coming in and going out can remain tracked.",
            },
          ],
        },
        {
          heading: { id: "Hasil Akhir", en: "The Final Result" },
          body: [
            {
              id: "Jakarta Laptops berkembang menjadi platform yang mendukung dua kebutuhan utama bisnis laptop bekas: mendapatkan barang dan menjual barang.",
              en: "Jakarta Laptops grew into a platform that supports two main needs of the used laptop business: getting goods and selling goods.",
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
      id: "Katalog dan e-commerce digital untuk membantu Ghazy Computer menampilkan produk laptop secara lebih terstruktur dan mudah ditemukan customer.",
      en: "Digital catalog and e-commerce to help Ghazy Computer display laptop products in a more structured way and easy for customers to find.",
    },
    summary: {
      id: "Katalog dan e-commerce digital untuk membantu Ghazy Computer menampilkan produk laptop secara lebih terstruktur dan mudah ditemukan customer.",
      en: "Digital catalog and e-commerce to help Ghazy Computer display laptop products in a more structured way and easy for customers to find.",
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
          heading: { id: "Kebutuhan", en: "The Need" },
          body: [
            {
              id: "Ghazy Computer membutuhkan kanal digital sendiri untuk menampilkan produk di luar marketplace dan media sosial.",
              en: "Ghazy Computer needed its own digital channel to display products outside marketplaces and social media.",
            },
            {
              id: "Laptop bekas memiliki karakter yang berbeda dengan produk massal. Setiap unit dapat memiliki spesifikasi, kondisi, dan harga yang berbeda sehingga informasi produk perlu ditampilkan dengan jelas.",
              en: "Used laptops have a different character from mass products. Each unit can have different specifications, condition, and pricing so product information needs to be displayed clearly.",
            },
          ],
        },
        {
          heading: { id: "Pendekatan", en: "The Approach" },
          body: [
            {
              id: "Website dibuat sebagai katalog yang membantu customer melihat unit yang tersedia, membaca informasi produk, membandingkan pilihan, dan menentukan laptop yang menarik sebelum melanjutkan komunikasi.",
              en: "The website was built as a catalog that helps customers view available units, read product information, compare options, and determine which laptop is interesting before continuing communication.",
            },
          ],
        },
        {
          heading: { id: "Yang Dibangun", en: "What Was Built" },
          body: [
            {
              id: "Ghazy Computer dibangun sebagai website katalog/e-commerce yang berfokus pada penyajian produk dan jalur pembelian atau inquiry.",
              en: "Ghazy Computer was built as a catalog/e-commerce website focused on product presentation and a purchase or inquiry path.",
            },
            {
              id: "Berbeda dengan beberapa project retail lainnya, Ghazy Computer tidak dibangun sebagai ERP atau sistem pembukuan toko. Fokus project tetap pada kebutuhan penjualan dan digital presence.",
              en: "Unlike some other retail projects, Ghazy Computer was not built as an ERP or store bookkeeping system. The project focus remains on sales and digital presence needs.",
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
      id: "E-commerce toko laptop dengan alur Terima Laptop dan sistem operasional yang menghubungkan penjualan, inventory, kasir, dan pembukuan.",
      en: "Laptop store e-commerce with a Terima Laptop (Receive Laptop) flow and operational system connecting sales, inventory, cashier, and bookkeeping.",
    },
    summary: {
      id: "E-commerce toko laptop dengan alur Terima Laptop dan sistem operasional yang menghubungkan penjualan, inventory, kasir, dan pembukuan.",
      en: "Laptop store e-commerce with a Terima Laptop (Receive Laptop) flow and operational system connecting sales, inventory, cashier, and bookkeeping.",
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
          heading: { id: "Ingin Langsung Lengkap", en: "Wanted It Complete From the Start" },
          body: [
            {
              id: "Blessing Tech Computindo datang dengan kebutuhan yang cukup ambisius. Setelah melihat toko laptop lain mulai memiliki kanal digital sendiri, owner ingin membangun sistem yang tidak berhenti pada katalog atau e-commerce saja.",
              en: "Blessing Tech Computindo came with a fairly ambitious need. After seeing other laptop stores start to have their own digital channels, the owner wanted to build a system that doesn't stop at just a catalog or e-commerce.",
            },
            {
              id: "Sejak awal kebutuhannya sudah mencakup beberapa sisi bisnis sekaligus.",
              en: "From the start the need already covered several sides of the business at once.",
            },
          ],
        },
        {
          heading: { id: "Tiga Kebutuhan Utama", en: "Three Main Needs" },
          body: [
            {
              id: "Platform perlu dapat: menjual laptop, menerima penawaran laptop dari masyarakat, dan membantu pengelolaan operasional toko.",
              en: "The platform needs to be able to: sell laptops, receive laptop offers from the public, and help manage store operations.",
            },
            {
              id: "Artinya website customer dan sistem internal tidak boleh berjalan sendiri-sendiri.",
              en: "This means the customer website and internal system cannot run separately.",
            },
          ],
        },
        {
          heading: { id: "Menghubungkan Semuanya", en: "Connecting Everything" },
          body: [
            {
              id: "Produk yang dikelola dari admin harus dapat muncul ke customer sekaligus menjadi bagian dari stok.",
              en: "Products managed from admin must be able to appear to customers while also becoming part of stock.",
            },
            {
              id: "Barang yang terjual harus dapat diproses melalui kasir atau order. Customer yang ingin menjual laptop juga membutuhkan jalur tersendiri untuk menawarkan unit mereka kepada toko.",
              en: "Sold items must be able to be processed through cashier or order. Customers who want to sell laptops also need their own path to offer their units to the store.",
            },
            {
              id: "Di belakangnya, transaksi dan pergerakan barang tetap perlu meninggalkan pencatatan yang dapat digunakan untuk operasional dan pembukuan.",
              en: "Behind it, transactions and goods movement still need to leave records that can be used for operations and bookkeeping.",
            },
          ],
        },
        {
          heading: { id: "Yang Dibangun", en: "What Was Built" },
          body: [
            {
              id: "Blessing Tech Computindo dibangun sebagai paket yang cukup lengkap: e-commerce + Terima Laptop + inventory + kasir + pengelolaan operasional dan pembukuan.",
              en: "Blessing Tech Computindo was built as a fairly complete package: e-commerce + Terima Laptop + inventory + cashier + operational and bookkeeping management.",
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
      id: "Platform kalkulator estimasi premi kendaraan yang dibangun dari lebih dari 14.000 data premi dan kendaraan.",
      en: "Vehicle insurance premium estimation calculator platform built from more than 14,000 premium and vehicle data records.",
    },
    summary: {
      id: "Platform kalkulator estimasi premi kendaraan yang dibangun dari lebih dari 14.000 data premi dan kendaraan.",
      en: "Vehicle insurance premium estimation calculator platform built from more than 14,000 premium and vehicle data records.",
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
          heading: { id: "Berawal dari 14.000 Data", en: "Starting from 14,000 Records" },
          body: [
            {
              id: "Client datang dengan sekitar 14.000 data premi kendaraan dan sebuah ide. Bagaimana jika seluruh data tersebut dapat digunakan untuk menampilkan estimasi premi dengan cepat, tanpa pengguna harus mencari dan mencocokkan data secara manual?",
              en: "The client came with about 14,000 vehicle premium data records and an idea. What if all that data could be used to display premium estimates quickly, without users having to search and match data manually?",
            },
            {
              id: "Targetnya sederhana dari sisi pengguna: cukup pilih merek, tipe, dan tahun kendaraan.",
              en: "The target is simple from the user's side: just select the brand, type, and year of the vehicle.",
            },
          ],
        },
        {
          heading: { id: "Tantangan Sebenarnya", en: "The Real Challenge" },
          body: [
            {
              id: "Tantangannya bukan hanya memasukkan 14.000 data ke database. Sistem harus mampu menerima pilihan kendaraan, menemukan data yang sesuai, lalu hanya menampilkan informasi yang relevan.",
              en: "The challenge was not just entering 14,000 records into the database. The system must be able to accept vehicle selections, find matching data, then only display relevant information.",
            },
            {
              id: "Kompleksitas ribuan data harus tetap berada di belakang sistem. Dari sisi pengguna, prosesnya harus terasa sederhana.",
              en: "The complexity of thousands of records must remain behind the system. From the user's side, the process must feel simple.",
            },
          ],
        },
        {
          heading: { id: "Membangun Engine Kalkulator", en: "Building the Calculator Engine" },
          body: [
            {
              id: "Dari kebutuhan tersebut kami mulai membangun engine kalkulator yang menghubungkan pilihan kendaraan dengan database premi. Ketika pengguna memilih kendaraan, sistem melakukan pencocokan terhadap data yang tersedia dan menghasilkan estimasi berdasarkan parameter yang relevan.",
              en: "From that need we began building a calculator engine that connects vehicle selections with the premium database. When the user selects a vehicle, the system matches against available data and generates an estimate based on relevant parameters.",
            },
          ],
        },
        {
          heading: { id: "Dari Engine Menjadi Platform", en: "From Engine to Platform" },
          body: [
            {
              id: "Engine tersebut kemudian menjadi fondasi dari Jasa Proteksi. Bukan sekadar company profile, tetapi platform digital yang memiliki fungsi utama: membantu pengguna mendapatkan gambaran estimasi premi kendaraan melalui proses yang jauh lebih sederhana dibanding membaca data secara manual.",
              en: "That engine then became the foundation of Jasa Proteksi. Not just a company profile, but a digital platform whose main function is: helping users get a picture of vehicle premium estimates through a much simpler process compared to reading data manually.",
            },
          ],
        },
        {
          heading: { id: "Hasil Akhir", en: "The Final Result" },
          body: [
            {
              id: "Lebih dari 14.000 data yang awalnya hanya berupa kumpulan informasi dapat digunakan melalui sebuah interface sederhana: pilih kendaraan → sistem mencocokkan data → estimasi premi ditampilkan.",
              en: "More than 14,000 records that were initially just a collection of information can be used through a simple interface: select vehicle → system matches data → premium estimate displayed.",
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
      id: "Sistem inventory dan operasional toko laptop bekas yang berawal dari kebutuhan sederhana: mencari kembali histori harga beli dan jual sebuah barang.",
      en: "Used laptop store inventory and operational system that started from a simple need: searching back the purchase and sale price history of an item.",
    },
    summary: {
      id: "Sistem inventory dan operasional toko laptop bekas yang berawal dari kebutuhan sederhana: mencari kembali histori harga beli dan jual sebuah barang.",
      en: "Used laptop store inventory and operational system that started from a simple need: searching back the purchase and sale price history of an item.",
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
          heading: { id: "Pertanyaannya Sederhana", en: "The Question Was Simple" },
          body: [
            {
              id: "Owner Betawi Laptop Kemayoran adalah seorang pemilik toko laptop bekas yang menghadapi masalah yang sangat manusiawi. Semakin banyak transaksi, semakin sulit mengingat:",
              en: "The owner of Betawi Laptop Kemayoran is a used laptop store owner facing a very human problem. The more transactions, the harder it is to remember:",
            },
            {
              id: "\u201CTerakhir saya beli laptop dengan spek seperti ini berapa?\u201D \u201CBeli dari siapa?\u201D \u201CTerakhir spek seperti ini dijual berapa?\u201D",
              en: "\u201CLast time I bought a laptop with specs like this, how much was it?\u201D \u201CBought from whom?\u201D \u201CLast time specs like this were sold, how much?\u201D",
            },
            {
              id: "Mengandalkan ingatan tidak lagi cukup.",
              en: "Relying on memory was no longer enough.",
            },
          ],
        },
        {
          heading: { id: "Membuat Memori Digital untuk Toko", en: "Making a Digital Memory for the Store" },
          body: [
            {
              id: "Dari masalah tersebut muncul ide membuat sistem yang dapat mencari histori transaksi berdasarkan karakteristik barang. Owner cukup memilih merk, tipe, dan spesifikasi, kemudian sistem menampilkan transaksi yang pernah memiliki karakteristik serupa.",
              en: "From that problem came the idea of making a system that can search transaction history based on item characteristics. The owner just selects brand, type, and specifications, then the system displays transactions that previously had similar characteristics.",
            },
            {
              id: "Misalnya pencarian: ASUS — Core i5 Gen 7 — dapat menampilkan histori pembelian dari seller berbeda beserta tanggal dan harga, serta histori penjualan kepada buyer beserta nilai transaksinya.",
              en: "For example, searching: ASUS — Core i5 Gen 7 — can display purchase history from different sellers along with dates and prices, as well as sales history to buyers along with transaction values.",
            },
          ],
        },
        {
          heading: { id: "Sistemnya Kemudian Berkembang", en: "The System Then Grew" },
          body: [
            {
              id: "Karena data tersebut berasal dari transaksi nyata, akhirnya aplikasi tidak cukup hanya menjadi mesin pencarian history.",
              en: "Because that data comes from real transactions, the application ultimately couldn't just be a history search engine.",
            },
            {
              id: "Ketika toko membeli barang, admin memasukkan tanggal, merk, tipe, spesifikasi, dan harga beli. Barang tersebut kemudian menjadi bagian dari inventory. Ketika barang dijual, transaksi diproses melalui menu kasir dan unit keluar dari stok tanpa menghilangkan histori sebelumnya.",
              en: "When the store buys an item, admin enters the date, brand, type, specifications, and purchase price. That item then becomes part of inventory. When an item is sold, the transaction is processed through the cashier menu and the unit leaves stock without removing the previous history.",
            },
          ],
        },
        {
          heading: { id: "Yang Dibangun", en: "What Was Built" },
          body: [
            {
              id: "Sistem kemudian berkembang mencakup: history barang, stok aktif, pembelian, penjualan melalui kasir, daftar buyer, daftar seller, laporan keuangan, modal, omzet, dan profit.",
              en: "The system then grew to cover: item history, active stock, purchases, sales through cashier, buyer list, seller list, financial reports, capital, revenue, and profit.",
            },
          ],
        },
        {
          heading: { id: "Dari History Harga Menjadi Sistem Operasional", en: "From Price History to Operational System" },
          body: [
            {
              id: "Project yang awalnya dibuat untuk menjawab pertanyaan \u201Cterakhir beli barang ini berapa?\u201D akhirnya berkembang menjadi sistem yang membantu owner melihat perjalanan barang dan kondisi operasional tokonya.",
              en: "The project that was initially made to answer the question \u201Clast time I bought this item, how much was it?\u201D finally grew into a system that helps the owner see the journey of items and the operational condition of the store.",
            },
          ],
        },
        {
          heading: { id: "Catatan Privasi", en: "Privacy Note" },
          body: [
            {
              id: "Aplikasi asli menggunakan data transaksi bisnis yang bersifat privat. Karena itu portfolio tidak menampilkan data atau screenshot asli. Visual case study menggunakan data dummy atau representasi sistem yang telah dianonimkan.",
              en: "The original application uses private business transaction data. Therefore the portfolio does not display real data or screenshots. The case study visual uses dummy data or anonymized system representations.",
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
      id: "Eksplorasi ERP yang dibangun dari pengalaman bertahun-tahun menggunakan dan memahami alur sistem operasional bisnis secara langsung.",
      en: "An ERP exploration built from years of experience using and understanding business operational system flows directly.",
    },
    summary: {
      id: "Eksplorasi ERP yang dibangun dari pengalaman bertahun-tahun menggunakan dan memahami alur sistem operasional bisnis secara langsung.",
      en: "An ERP exploration built from years of experience using and understanding business operational system flows directly.",
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
          heading: { id: "Berawal dari Meja Admin", en: "Starting from the Admin Desk" },
          body: [
            {
              id: "Inventra tidak berawal dari brief client. Ide ini tumbuh dari pengalaman bekerja sebagai admin dan menggunakan ERP dalam aktivitas operasional sehari-hari.",
              en: "Inventra did not start from a client brief. This idea grew from experience working as an admin and using an ERP in daily operational activities.",
            },
            {
              id: "Semakin lama sistem tersebut digunakan, semakin menarik melihat bagaimana begitu banyak bagian bisnis dapat berjalan di dalam satu sistem.",
              en: "The longer the system was used, the more interesting it became to see how so many parts of a business can run within one system.",
            },
          ],
        },
        {
          heading: { id: "Hal yang Membuat ERP Menarik", en: "What Makes ERP Interesting" },
          body: [
            {
              id: "Banyak role dapat menggunakan aplikasi yang sama tanpa harus melihat semuanya. Setiap role hanya mendapatkan data dan fungsi yang memang dibutuhkan.",
              en: "Many roles can use the same application without having to see everything. Each role only gets the data and functions they actually need.",
            },
            {
              id: "Barang masuk, barang keluar, transaksi, inventory, laporan, dan berbagai proses lain tetap saling berhubungan tanpa membuat data berjalan sendiri-sendiri.",
              en: "Goods in, goods out, transactions, inventory, reports, and various other processes remain interconnected without making data run separately.",
            },
            {
              id: "Angka dari satu bagian harus tetap bertemu dengan angka dari bagian lain.",
              en: "Numbers from one part must still meet numbers from another part.",
            },
          ],
        },
        {
          heading: { id: "Belajar dari Sistem yang Digunakan Setiap Hari", en: "Learning from a System Used Every Day" },
          body: [
            {
              id: "Karena digunakan setiap hari, perhatian kemudian tidak hanya tertuju pada menu yang terlihat di layar. Sedikit demi sedikit workflow, hubungan antarproses, role, pencatatan, serta business logic di balik ERP tersebut dipelajari sampai alurnya benar-benar dipahami.",
              en: "Because it was used every day, attention then was not only on the menus visible on screen. Bit by bit the workflow, inter-process relationships, roles, recording, and business logic behind that ERP were studied until the flow was truly understood.",
            },
            {
              id: "Dari sana muncul keinginan: bagaimana jika sistem seperti ini dibangun sendiri?",
              en: "From there came the desire: what if a system like this was built by oneself?",
            },
          ],
        },
        {
          heading: { id: "Membangun Inventra", en: "Building Inventra" },
          body: [
            {
              id: "Setelah tidak lagi bekerja di sana, pemahaman tersebut mulai diterjemahkan menjadi Inventra. Sebuah eksplorasi untuk membangun ERP berdasarkan pengalaman menghadapi proses bisnis nyata, bukan hanya berdasarkan daftar fitur dari sebuah template.",
              en: "After no longer working there, that understanding began to be translated into Inventra. An exploration to build an ERP based on experience facing real business processes, not just based on a feature list from a template.",
            },
            {
              id: "Inventra masih dalam pengembangan dan belum diposisikan sebagai produk production-ready.",
              en: "Inventra is still in development and is not positioned as a production-ready product.",
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
      id: "Project website travel & tourism yang dikerjakan melalui kolaborasi dengan agency untuk membangun pengalaman digital bagi Let's Go Karimun.",
      en: "A travel & tourism website project done through collaboration with an agency to build a digital experience for Let's Go Karimun.",
    },
    summary: {
      id: "Project website travel & tourism yang dikerjakan melalui kolaborasi dengan agency untuk membangun pengalaman digital bagi Let's Go Karimun.",
      en: "A travel & tourism website project done through collaboration with an agency to build a digital experience for Let's Go Karimun.",
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
          heading: { id: "Sebuah Project Kolaborasi", en: "A Collaboration Project" },
          body: [
            {
              id: "Let's Go Karimun berbeda dengan beberapa project Nauka Motion lainnya. Project ini tidak datang langsung dalam bentuk client yang membawa sebuah problem bisnis kepada kami, melainkan dikerjakan melalui kolaborasi dengan agency.",
              en: "Let's Go Karimun is different from some other Nauka Motion projects. This project did not come directly in the form of a client bringing a business problem to us, but was done through collaboration with an agency.",
            },
            {
              id: "Karena itu prosesnya lebih berfokus pada bagaimana menerjemahkan scope dan kebutuhan project menjadi pengalaman website yang utuh.",
              en: "Therefore the process focused more on how to translate the project scope and needs into a complete website experience.",
            },
          ],
        },
        {
          heading: { id: "Yang Kami Kerjakan", en: "What We Did" },
          body: [
            {
              id: "Nauka Motion menangani bagian pengembangan pengalaman digital untuk membantu Let's Go Karimun memiliki presence online yang sesuai dengan kebutuhan bisnis travel dan tourism.",
              en: "Nauka Motion handled the digital experience development part to help Let's Go Karimun have an online presence suited to travel and tourism business needs.",
            },
            {
              id: "Fokus pekerjaan berada pada bagaimana informasi dan identitas project dapat diterjemahkan menjadi website yang mudah digunakan dan siap menjadi bagian dari komunikasi brand secara digital.",
              en: "The work focus was on how project information and identity can be translated into a website that is easy to use and ready to become part of brand communication digitally.",
            },
          ],
        },
        {
          heading: { id: "Hasil Kolaborasi", en: "The Collaboration Result" },
          body: [
            {
              id: "Project ini menjadi salah satu pengalaman Nauka Motion bekerja sebagai bagian dari proses delivery yang melibatkan pihak lain, bukan hanya menangani project secara langsung dari awal.",
              en: "This project became one of Nauka Motion's experiences working as part of a delivery process involving other parties, not just handling a project directly from the start.",
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
      id: "Website untuk consumer pet health brand yang dikerjakan melalui kolaborasi dengan agency.",
      en: "Website for a consumer pet health brand done through collaboration with an agency.",
    },
    summary: {
      id: "Website untuk consumer pet health brand yang dikerjakan melalui kolaborasi dengan agency.",
      en: "Website for a consumer pet health brand done through collaboration with an agency.",
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
          heading: { id: "Kolaborasi untuk Sebuah Consumer Brand", en: "Collaboration for a Consumer Brand" },
          body: [
            {
              id: "Anima Companion merupakan project di kategori Pet Health / Consumer Brand yang dikerjakan melalui kerja sama dengan agency. Project ini bukan AI companion, chatbot, atau conversational product.",
              en: "Anima Companion is a project in the Pet Health / Consumer Brand category done through collaboration with an agency. This project is not an AI companion, chatbot, or conversational product.",
            },
            {
              id: "Anima Companion adalah brand produk yang berhubungan dengan kebutuhan hewan peliharaan.",
              en: "Anima Companion is a product brand related to pet needs.",
            },
          ],
        },
        {
          heading: { id: "Peran Nauka Motion", en: "Nauka Motion's Role" },
          body: [
            {
              id: "Dalam kolaborasi tersebut, Nauka Motion membantu menerjemahkan kebutuhan project menjadi pengalaman digital yang dapat menjadi bagian dari presence brand.",
              en: "In that collaboration, Nauka Motion helped translate project needs into a digital experience that can become part of the brand presence.",
            },
            {
              id: "Pendekatannya berbeda dari project business system seperti Jasa Proteksi atau Berkah Komputer. Fokusnya lebih banyak berada pada presentasi brand, produk, dan pengalaman pengguna.",
              en: "The approach differs from business system projects like Jasa Proteksi or Berkah Komputer. The focus is more on brand presentation, products, and user experience.",
            },
          ],
        },
        {
          heading: { id: "Hasil Kolaborasi", en: "The Collaboration Result" },
          body: [
            {
              id: "Project Anima Companion memperluas pengalaman Nauka Motion dari pembangunan sistem operasional ke kebutuhan digital consumer brand.",
              en: "The Anima Companion project expanded Nauka Motion's experience from building operational systems to consumer brand digital needs.",
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
      id: "Portfolio dan rumah digital Nauka Motion untuk mendokumentasikan project, eksperimen, proses berpikir, dan produk yang kami bangun.",
      en: "Nauka Motion's portfolio and digital home to document projects, experiments, thinking processes, and products we build.",
    },
    summary: {
      id: "Portfolio dan rumah digital Nauka Motion untuk mendokumentasikan project, eksperimen, proses berpikir, dan produk yang kami bangun.",
      en: "Nauka Motion's portfolio and digital home to document projects, experiments, thinking processes, and products we build.",
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
          heading: { id: "Membangun Rumah untuk Semua Project", en: "Building a Home for All Projects" },
          body: [
            {
              id: "Semakin banyak project yang dikerjakan, semakin sulit menjelaskan kemampuan Nauka hanya melalui daftar repository atau screenshot.",
              en: "The more projects done, the harder it is to explain Nauka's capabilities only through a list of repositories or screenshots.",
            },
            {
              id: "Nauka Motion dibangun sebagai tempat untuk mendokumentasikan bukan hanya hasil akhirnya, tetapi juga bagaimana sebuah project lahir, masalah apa yang ditemukan, dan bagaimana solusi dibangun.",
              en: "Nauka Motion was built as a place to document not only the final result, but also how a project was born, what problems were found, and how the solution was built.",
            },
          ],
        },
        {
          heading: { id: "Bukan Sekadar Galeri", en: "Not Just a Gallery" },
          body: [
            {
              id: "Portfolio ini sengaja tidak dibuat sebagai grid screenshot tanpa konteks. Project dikelompokkan berdasarkan kategori dan setiap case study digunakan untuk menjelaskan proses yang terjadi di balik produk.",
              en: "This portfolio was intentionally not made as a grid of screenshots without context. Projects are grouped by category and each case study is used to explain the process behind the product.",
            },
            {
              id: "Nauka Motion sendiri pada akhirnya menjadi salah satu eksperimen tentang bagaimana sebuah portfolio dapat berfungsi sebagai dokumentasi perjalanan membangun produk digital.",
              en: "Nauka Motion itself ultimately became one experiment about how a portfolio can function as documentation of a journey building digital products.",
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
      id: "Platform terbuka untuk belajar sejarah Islam melalui narasi digital yang imersif, lahir dari pertemuan antara menulis, teknologi, dan keinginan berbagi pengetahuan.",
      en: "An open platform for learning Islamic history through immersive digital narrative, born from the meeting of writing, technology, and the desire to share knowledge.",
    },
    summary: {
      id: "Platform terbuka untuk belajar sejarah Islam melalui narasi digital yang imersif, lahir dari pertemuan antara menulis, teknologi, dan keinginan berbagi pengetahuan.",
      en: "An open platform for learning Islamic history through immersive digital narrative, born from the meeting of writing, technology, and the desire to share knowledge.",
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
          heading: { id: "Tiga Hal yang Bertemu di Satu Tempat", en: "Three Things Meeting in One Place" },
          body: [
            {
              id: "Jejak Cahaya adalah salah satu project yang paling personal. Project ini lahir dari tiga hal yang selama ini berjalan berdampingan: cita-cita untuk menulis, kemampuan membangun aplikasi, dan ketertarikan yang kuat terhadap kisah-kisah sejarah Islam.",
              en: "Jejak Cahaya is one of the most personal projects. This project was born from three things that have been running side by side: the aspiration to write, the ability to build applications, and a strong interest in stories of Islamic history.",
            },
            {
              id: "Daripada ketiganya berjalan sendiri-sendiri, muncul keinginan untuk mempertemukannya dalam satu karya.",
              en: "Rather than the three running separately, the desire emerged to bring them together in one work.",
            },
          ],
        },
        {
          heading: { id: "Kisah Pertama", en: "The First Story" },
          body: [
            {
              id: "Kisah pertama yang dipilih adalah perjalanan hidup Rasulullah Muhammad, dimulai dari konteks sebelum beliau lahir hingga perjalanan hidup beliau sampai wafat. Penulisannya dilakukan bab demi bab.",
              en: "The first story chosen was the life journey of Prophet Muhammad, starting from the context before his birth through the journey of his life until his passing. The writing was done chapter by chapter.",
            },
            {
              id: "Setiap bagian berusaha dibangun melalui pencarian dan perbandingan sumber yang dianggap paling dapat dipercaya dan paling mendekati, termasuk Al-Qur'an, hadits, dan kitab-kitab sirah tepercaya. Project ini masih terus berkembang dan penulisannya saat ini belum selesai.",
              en: "Each part was built through searching and comparing sources considered most trustworthy and closest, including the Qur'an, hadith, and trusted sirah books. This project continues to grow and the writing is currently not yet finished.",
            },
          ],
        },
        {
          heading: { id: "Seperti Meletakkan Kamera di Bahu Pembaca", en: "Like Placing a Camera on the Reader's Shoulder" },
          body: [
            {
              id: "Jejak Cahaya tidak ingin hanya menjadi kumpulan tanggal dan peristiwa. Narasinya dibuat dengan pendekatan yang lebih imersif. Seolah sebuah kamera diletakkan dekat dengan pembaca dan mengajaknya melihat suasana di sekitar sebuah peristiwa.",
              en: "Jejak Cahaya does not want to just be a collection of dates and events. The narrative was made with a more immersive approach. As if a camera is placed close to the reader and invites them to see the atmosphere around an event.",
            },
            {
              id: "Bukan untuk mengklaim bahwa narator adalah saksi sejarah, tetapi untuk membantu pembaca membayangkan: seperti apa rasanya berada dekat dengan zaman dan suasana yang sedang diceritakan.",
              en: "Not to claim that the narrator is a historical witness, but to help the reader imagine: what it feels like to be close to the era and atmosphere being told.",
            },
          ],
        },
        {
          heading: { id: "Tulisan yang Berkembang Menjadi Platform", en: "Writing That Grew Into a Platform" },
          body: [
            {
              id: "Karena dibangun dengan kemampuan development sendiri, tulisan tersebut tidak harus berhenti menjadi teks. Jejak Cahaya dapat berkembang menjadi pengalaman digital, visual, dan nantinya konten video yang membantu kisah sejarah dipelajari melalui lebih dari satu media.",
              en: "Because it was built with one's own development skills, the writing does not have to stop at being text. Jejak Cahaya can grow into a digital, visual experience, and eventually video content that helps historical stories be learned through more than one medium.",
            },
          ],
        },
        {
          heading: { id: "Tidak Dibangun untuk Dijual", en: "Not Built to Be Sold" },
          body: [
            {
              id: "Jejak Cahaya tidak memiliki tujuan komersial. Ia adalah karya menulis, project development, media pembelajaran, sekaligus bagian dari dakwah. Karena itu sejak awal Jejak Cahaya ditempatkan sebagai platform terbuka.",
              en: "Jejak Cahaya has no commercial purpose. It is a writing work, a development project, learning media, and at the same time part of dakwah. Therefore from the start Jejak Cahaya was positioned as an open platform.",
            },
            {
              id: "Jika ada orang lain yang memiliki tujuan serupa dan ingin ikut mengembangkan atau memberikan kontribusi, ruang tersebut memang sengaja dibuka.",
              en: "If there are others who have a similar goal and want to join in developing or contributing, that space was intentionally opened.",
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
      id: "Project retail teknologi milik Nauka yang berfokus pada katalog dan pengembangan pengalaman digital untuk produk teknologi, dimulai dari laptop bekas.",
      en: "Nauka's technology retail project focused on catalog and digital experience development for technology products, starting from used laptops.",
    },
    summary: {
      id: "Project retail teknologi milik Nauka yang berfokus pada katalog dan pengembangan pengalaman digital untuk produk teknologi, dimulai dari laptop bekas.",
      en: "Nauka's technology retail project focused on catalog and digital experience development for technology products, starting from used laptops.",
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
          heading: { id: "Dari Pengalaman di Dunia Laptop", en: "From Experience in the Laptop World" },
          body: [
            {
              id: "Nauka Tech berkembang dari kedekatan dengan dunia perangkat komputer dan laptop. Fokus awalnya adalah laptop bekas, dengan pendekatan katalog yang membantu produk ditampilkan secara lebih terstruktur dibanding sekadar daftar barang.",
              en: "Nauka Tech grew from familiarity with the world of computer and laptop devices. The initial focus was used laptops, with a catalog approach that helps products be displayed in a more structured way compared to just a list of items.",
            },
          ],
        },
        {
          heading: { id: "Sebuah Project yang Terus Berkembang", en: "A Project That Continues to Grow" },
          body: [
            {
              id: "Nauka Tech juga menjadi tempat untuk mengeksplorasi bagaimana sistem retail, katalog, inventory, dan pengalaman pembelian dapat dikembangkan menjadi produk digital yang lebih besar.",
              en: "Nauka Tech also became a place to explore how retail systems, catalogs, inventory, and the purchase experience can be developed into a larger digital product.",
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
      id: "Eksperimen Nauka dalam membangun pengalaman digital untuk kategori gadget dan consumer technology.",
      en: "Nauka's experiment in building a digital experience for the gadget and consumer technology category.",
    },
    summary: {
      id: "Eksperimen Nauka dalam membangun pengalaman digital untuk kategori gadget dan consumer technology.",
      en: "Nauka's experiment in building a digital experience for the gadget and consumer technology category.",
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
              id: "Eksperimen Nauka dalam membangun pengalaman digital untuk kategori gadget dan consumer technology. Project ini masih dalam tahap eksplorasi — fakta dan arah produknya akan ditentukan lebih jauh sebelum case study yang lebih panjang ditulis.",
              en: "Nauka's experiment in building a digital experience for the gadget and consumer technology category. This project is still in the exploration stage — facts and product direction will be determined further before a longer case study is written.",
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
      id: "Project internal Nauka yang masih dalam tahap eksplorasi dan pengembangan.",
      en: "Nauka's internal project that is still in the exploration and development stage.",
    },
    summary: {
      id: "Project internal Nauka yang masih dalam tahap eksplorasi dan pengembangan.",
      en: "Nauka's internal project that is still in the exploration and development stage.",
    },
    year: "2025",
    client: "Personal Project",
    industry: "Personal Project",
    cover: "/portfolio/nauka-kostay.png",
    accent: "#D97706",
    status: "development",
    order: 5,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Project internal Nauka yang masih dalam tahap eksplorasi dan pengembangan. Scope project belum dikunci — case study yang lebih panjang akan ditulis setelah arah project ditentukan.",
              en: "Nauka's internal project that is still in the exploration and development stage. The project scope is not yet locked — a longer case study will be written after the project direction is determined.",
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
      id: "Eksperimen produk digital Nauka untuk kebutuhan bisnis dan aktivitas di sekitar padel.",
      en: "Nauka's digital product experiment for business needs and activities around padel.",
    },
    summary: {
      id: "Eksperimen produk digital Nauka untuk kebutuhan bisnis dan aktivitas di sekitar padel.",
      en: "Nauka's digital product experiment for business needs and activities around padel.",
    },
    year: "2025",
    client: "Personal Project",
    industry: "Personal Project",
    cover: "/portfolio/jasaprotect.png",
    accent: "#B8B3AA",
    status: "development",
    order: 6,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: { id: "Desain · Pengembangan", en: "Design · Engineering" },
    caseStudy: {
      sections: [
        {
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Eksperimen produk digital Nauka untuk kebutuhan bisnis dan aktivitas di sekitar padel. Scope project belum ditentukan — case study yang lebih panjang akan ditulis setelah fungsi dan arah project dikunci.",
              en: "Nauka's digital product experiment for business needs and activities around padel. The project scope is not yet determined — a longer case study will be written after the function and direction of the project are locked.",
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
