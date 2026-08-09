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
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Geely BSD adalah salah satu sales mobil Geely yang menggunakan website sebagai media pemasaran digital. Website ini bukan website resmi dealer, melainkan landing page yang dibuat untuk membantu sales menjangkau calon customer secara online.",
              en: "Geely BSD is a car salesperson using a website as a digital marketing medium. This is not an official dealer website, but a landing page built to help sales reach prospective customers online.",
            },
            {
              id: "Website menampilkan model kendaraan Geely yang tersedia, harga, promo, dan informasi produk. Calon customer dapat menjelajahi katalog, memahami opsi yang ada, dan ketika tertarik, langsung menghubungi sales melalui jalur WhatsApp yang terintegrasi.",
              en: "The website displays available Geely vehicle models, pricing, promotions, and product information. Prospective customers can browse the catalog, understand available options, and when interested, directly contact sales through an integrated WhatsApp channel.",
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
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Suzuki Jakarta Barat adalah sales mobil Suzuki yang menggunakan website sebagai salah satu media pemasaran digital. Website dibuat untuk menampilkan model kendaraan Suzuki, harga, promo, dan informasi produk kepada calon customer.",
              en: "Suzuki Jakarta Barat is a Suzuki car salesperson using a website as one of their digital marketing channels. The website was built to display Suzuki vehicle models, pricing, promotions, and product information to prospective customers.",
            },
            {
              id: "Calon customer yang mengunjungi website dapat melihat katalog unit, memahami pilihan yang tersedia, dan ketika siap melanjutkan, langsung terhubung dengan sales melalui WhatsApp.",
              en: "Prospective customers visiting the website can view the unit catalog, understand available choices, and when ready to proceed, directly connect with sales through WhatsApp.",
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
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Sama dengan project otomotif lainnya, website ini merupakan media pemasaran digital untuk sales Mitsubishi. Website menampilkan model kendaraan Mitsubishi, harga, promo, dan informasi produk.",
              en: "Like other automotive projects, this website is a digital marketing medium for Mitsubishi sales. The website displays Mitsubishi vehicle models, pricing, promotions, and product information.",
            },
            {
              id: "Calon customer dapat menjelajahi katalog, menemukan informasi yang dibutuhkan, dan menghubungi sales melalui jalur WhatsApp yang tersedia.",
              en: "Prospective customers can browse the catalog, find the information they need, and contact sales through the available WhatsApp channel.",
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
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "JAECOO Bintaro adalah sales mobil JAECOO yang menggunakan website sebagai media pemasaran digital. Website menampilkan model kendaraan JAECOO, harga, promo, dan informasi produk.",
              en: "JAECOO Bintaro is a JAECOO car salesperson using a website as a digital marketing medium. The website displays JAECOO vehicle models, pricing, promotions, and product information.",
            },
            {
              id: "Calon customer dapat melihat katalog unit, memahami opsi yang tersedia, dan menghubungi sales melalui jalur WhatsApp.",
              en: "Prospective customers can view the unit catalog, understand available options, and contact sales through the WhatsApp channel.",
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
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Owner toko laptop ingin memiliki e-commerce sendiri karena biaya admin dan potongan marketplace cukup membebani. Namun setelah kebutuhan toko dibahas lebih dalam, ditemukan masalah lain: pencatatan stok dan pembukuan toko masih banyak dilakukan manual dan berantakan.",
              en: "The laptop store owner wanted their own e-commerce because marketplace admin fees and cuts were quite burdensome. But after discussing the store's needs in depth, another problem was discovered: stock recording and bookkeeping were still largely manual and messy.",
            },
            {
              id: "Dari sini scope berkembang. Kami tidak hanya membuat storefront untuk customer, tetapi juga admin panel yang terhubung langsung dengan inventory. Saat admin memasukkan produk, produk tampil di e-commerce sekaligus masuk stok inventory. Saat barang terjual, diproses melalui kasir/order, stok berkurang, dan transaksi meninggalkan history.",
              en: "From here the scope grew. We didn't just build a storefront for customers, but an admin panel directly connected to inventory. When admin enters a product, it appears in the e-commerce and enters inventory stock simultaneously. When an item is sold, processed through cashier/order, stock decreases, and the transaction leaves a history.",
            },
            {
              id: "Sistem kemudian berkembang menjadi e-commerce + mini ERP toko yang mencakup pengelolaan produk, customer, transaksi, inventory, pengeluaran, dan laporan keuangan.",
              en: "The system then grew into an e-commerce + mini store ERP covering product management, customers, transactions, inventory, expenses, and financial reports.",
            },
          ],
        },
      ],
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
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Problem utama Jakarta Laptops berbeda dari toko laptop pada umumnya. Permintaan laptop bekas cukup besar, tetapi toko mengalami kesulitan mendapatkan supply atau barang. Di saat yang sama, pengelolaan stok dan pembukuan juga menjadi kebutuhan.",
              en: "Jakarta Laptops' main problem differs from typical laptop stores. Demand for used laptops is quite high, but the store struggles to get supply. At the same time, stock management and bookkeeping are also needs.",
            },
            {
              id: "Karena itu platform tidak hanya dirancang untuk menjual laptop, tetapi juga menyediakan jalur agar masyarakat dapat menawarkan atau menjual laptop mereka ke Jakarta Laptops. Inventory dan pencatatan mendukung alur tersebut — baik alur jual maupun alur terima.",
              en: "Therefore the platform is designed not only to sell laptops, but also to provide a channel for the public to offer or sell their laptops to Jakarta Laptops. Inventory and recording support both flows — selling and buying.",
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
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Ghazy Computer merupakan website katalog dan e-commerce untuk membantu toko memiliki kanal digital sendiri. Fokus project ini adalah pada katalog produk, penyajian produk, informasi unit, dan jalur customer menuju pembelian atau inquiry.",
              en: "Ghazy Computer is a catalog and e-commerce website to help the store have its own digital channel. The project focuses on product catalog, product presentation, unit information, and the customer path to purchase or inquiry.",
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
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Owner ingin membuat sistem yang cukup lengkap sejak awal setelah melihat toko laptop lain mulai memiliki kanal digital sendiri. Scope yang diminta mencakup tiga sisi: e-commerce, terima laptop, dan pembukuan/operasional toko.",
              en: "The owner wanted to build a fairly complete system from the start after seeing other laptop stores begin to have their own digital channels. The requested scope covers three sides: e-commerce, laptop buyback, and store bookkeeping/operations.",
            },
            {
              id: "Sistem yang dibangun menghubungkan: frontend customer untuk katalog dan pembelian; terima laptop untuk jalur customer menawarkan laptop; dan admin untuk produk, customer, kasir, order, stok, pengeluaran, inventory, dan laporan keuangan.",
              en: "The system connects: customer frontend for catalog and purchasing; laptop buyback for customers to offer laptops; and admin for products, customers, cashier, orders, stock, expenses, inventory, and financial reports.",
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
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Client datang dengan sekitar 14.000 data premi kendaraan dan memiliki ide untuk membuat aplikasi yang dapat dengan cepat menampilkan estimasi premi kendaraan. Pengguna cukup memilih merek, tipe, dan tahun kendaraan.",
              en: "The client came with about 14,000 vehicle premium data records and an idea to build an application that can quickly display vehicle premium estimates. Users simply select the brand, type, and year of the vehicle.",
            },
            {
              id: "Tantangannya adalah membuat ribuan data tersebut tidak membebani pengguna. Dibangun engine kalkulator yang membaca pilihan pengguna dan hanya mencari atau menampilkan data yang relevan.",
              en: "The challenge was to make thousands of data records not burden the user. A calculator engine was built that reads the user's selections and only searches for or displays relevant data.",
            },
            {
              id: "Dari kebutuhan tersebut terbentuk Jasa Proteksi, sebuah platform kalkulator estimasi premi kendaraan berbasis data.",
              en: "From that need, Jasa Proteksi was formed — a data-driven vehicle insurance premium estimation calculator platform.",
            },
          ],
        },
      ],
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
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Owner merupakan pemilik toko laptop bekas dan awalnya mempunyai masalah yang sangat sederhana namun spesifik. Ia sering kesulitan mengingat: terakhir beli laptop merk/seri/spek seperti ini dari siapa dan berapa? Terakhir jual spek seperti ini ke siapa dan berapa?",
              en: "The owner is a used laptop store owner who initially had a very simple but specific problem. He often had trouble remembering: last time I bought a laptop with this brand/series/spec, from whom and for how much? Last time I sold this spec, to whom and for how much?",
            },
            {
              id: "Dari situ dibuat sistem pencarian berdasarkan merk, tipe, dan spesifikasi. Sistem dapat menampilkan history transaksi relevan — pernah dibeli dari seller siapa, kapan, berapa harga beli, pernah dijual ke buyer siapa, kapan, berapa harga jual.",
              en: "From there, a search system was built based on brand, type, and specifications. The system can display relevant transaction history — bought from which seller, when, at what purchase price, sold to which buyer, when, at what selling price.",
            },
            {
              id: "Sistem kemudian berkembang lebih jauh. Saat toko membeli barang, admin memasukkan tanggal, merk, tipe, spesifikasi, dan harga beli. Barang tersebut otomatis masuk inventory. Saat barang dijual, transaksi dilakukan melalui kasir, barang keluar dari stok, dan history transaksi tetap tersimpan.",
              en: "The system then grew further. When the store buys an item, admin enters the date, brand, type, specifications, and purchase price. The item automatically enters inventory. When an item is sold, the transaction is processed through the cashier, the item leaves stock, and the transaction history remains saved.",
            },
            {
              id: "Sistem memiliki history barang, stok barang, daftar buyer, daftar seller, transaksi/kasir, laporan keuangan, modal, omzet, dan profit. Aplikasi mengandung data bisnis asli sehingga tidak menampilkan screenshot atau data client.",
              en: "The system has item history, stock, buyer list, seller list, transactions/cashier, financial reports, capital, revenue, and profit. The application contains real business data, so no screenshots or client data are displayed.",
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
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Inventra berasal dari pengalaman pribadi menggunakan ERP setiap hari saat bekerja sebagai admin. Semakin lama ERP digunakan, semakin terlihat menarik bagaimana banyak role bekerja dalam satu sistem, setiap role hanya melihat data atau fungsi yang diperlukan, transaksi saling terhubung, data tidak berbenturan, inventory dan operasional tetap sinkron, dan angka harus tetap konsisten.",
              en: "Inventra originates from personal experience using an ERP daily while working as an admin. The longer the ERP was used, the more interesting it became how many roles work within one system, each role only sees the data or functions they need, transactions are interconnected, data doesn't conflict, inventory and operations stay in sync, and numbers must remain consistent.",
            },
            {
              id: "Selama bekerja, menu, workflow, dan business logic ERP dipelajari sedikit demi sedikit sampai benar-benar memahami alurnya. Setelah resign, pengalaman tersebut menjadi dasar untuk mulai membangun Inventra, ERP versi sendiri, sedikit demi sedikit.",
              en: "During employment, the ERP's menu, workflow, and business logic were studied bit by bit until the flow was truly understood. After resigning, that experience became the foundation to start building Inventra — a self-built ERP, piece by piece.",
            },
            {
              id: "Inventra masih dalam pengembangan.",
              en: "Inventra is still in development.",
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
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Project ini dibuat melalui kolaborasi dengan agency. Scope yang diterima mencakup pengalaman digital untuk bisnis pariwisata Karimun — website destinasi, paket tour, dan jalur pemesanan.",
              en: "This project was done through collaboration with an agency. The accepted scope covers the digital experience for a Karimun tourism business — destination website, tour packages, and booking channel.",
            },
            {
              id: "Keputusan desain dan implementasi teknis disesuaikan dengan kebutuhan destinasi wisata.",
              en: "Design decisions and technical implementation were tailored to the needs of a tourism destination.",
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
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Anima Companion adalah brand produk kesehatan hewan. Project dikerjakan melalui kolaborasi dengan agency.",
              en: "Anima Companion is a pet health product brand. The project was done through collaboration with an agency.",
            },
            {
              id: "Pengalaman digital yang dibangun mencakup website brand, penyajian produk, dan jalur customer menuju pembelian.",
              en: "The digital experience built covers the brand website, product presentation, and the customer path to purchase.",
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
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Website studio Nauka Motion sendiri. Dirancang dengan warm-paper editorial design system, menggabungkan tipografi Instrument Sans, Fraunces, dan JetBrains Mono.",
              en: "The Nauka Motion studio website itself. Designed with a warm-paper editorial design system, combining Instrument Sans, Fraunces, and JetBrains Mono typography.",
            },
            {
              id: "Visual system, motion language, dan struktur halaman dikembangkan sebagai eksperimen desain yang juga menginformasikan project client.",
              en: "The visual system, motion language, and page structure were developed as a design experiment that also informs client projects.",
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
          heading: { id: "Ikhtisar", en: "Overview" },
          body: [
            {
              id: "Jejak Cahaya menggabungkan cita-cita menjadi penulis, kemampuan sebagai developer, ketertarikan pada sejarah Islam, media pembelajaran, dan dakwah. Kisah pertama yang dikembangkan adalah perjalanan hidup Rasulullah Muhammad, dari konteks sebelum kelahiran sampai wafat.",
              en: "Jejak Cahaya combines the aspiration to be a writer, developer skills, interest in Islamic history, learning media, and dakwah. The first story developed is the life journey of Prophet Muhammad, from the context before his birth to his passing.",
            },
            {
              id: "Proses penulisannya dilakukan bab demi bab dengan mencari dan membandingkan sumber yang dianggap paling terpercaya dan paling mendekati, termasuk Al-Qur'an, hadits, dan kitab-kitab sirah tepercaya. Saat ini penulisannya masih berkembang, sekitar Bab 11.",
              en: "The writing process is done chapter by chapter, searching for and comparing sources considered most trusted and most accurate, including the Qur'an, hadith, and trusted sirah books. The writing is still developing, currently around Chapter 11.",
            },
            {
              id: "Gaya Jejak Cahaya berbeda dari tulisan sejarah biasa. Narasinya dibuat imersif, seperti sebuah kamera berada dekat dengan peristiwa dan mengajak pembaca membayangkan suasana di sana, tanpa pernah mengklaim narator sebagai saksi sejarah.",
              en: "Jejak Cahaya's style differs from typical historical writing. The narrative is immersive, as if a camera is close to the events, inviting readers to imagine the atmosphere there, without ever claiming the narrator as a historical witness.",
            },
            {
              id: "Platform juga direncanakan berkembang ke media visual/video. Jejak Cahaya bukan platform animasi, bukan project komersial. Merupakan platform terbuka — siapa pun yang memiliki tujuan serupa dapat ikut berkontribusi dalam pengembangannya.",
              en: "The platform is also planned to expand into visual/video media. Jejak Cahaya is not an animation platform, not a commercial project. It is an open platform — anyone with a similar goal can contribute to its development.",
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
