/**
 * Nauka Motion — Studio Data (v2)
 * --------------------------------
 * Single source of truth untuk categories, projects, dan case study content.
 *
 * PRINSIP:
 * - Hanya project yang sudah LIVE atau internal yang sah ditampilkan.
 * - Status: "published" (live client work) | "internal" (Nauka Labs / eksperimen) | "draft" (belum siap)
 * - Public portfolio hanya menampilkan status "published" dan "internal" (dengan badge).
 * - TIDAK ADA claim fabricated: tidak ada close rate, conversion rate, revenue impact,
 *   performance number, dll yang tidak diberikan client.
 * - Case study format: Masalah → Solusi → Hasil → Technology → Live Website.
 *
 * Bahasa: Bilingual. Field `id` = Bahasa Indonesia, `en` = English.
 * Untuk nama kategori, istilah teknis, dan nama brand, tetap pakai English
 * sesuai instruksi branding (Automotive, Technology & Retail, dll).
 */

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export type CategorySlug =
  | "automotive"
  | "technology-retail"
  | "insurance-finance"
  | "product-brand"
  | "travel-tourism"
  | "nauka-labs";

export type ProjectStatus = "published" | "internal" | "draft";

export interface LocalizedText {
  id: string;
  en: string;
}

export interface StudioCategory {
  slug: CategorySlug;
  index: string; // "01", "02", ...
  /** Title tetap English untuk konsistensi branding */
  title: string;
  description: LocalizedText;
  /** Warna accent opsional untuk kategori */
  accent: string;
}

export interface CaseStudySection {
  /** id / en — bahasa per section */
  heading: LocalizedText;
  /** Paragraf utama */
  body: LocalizedText;
  /** Bullet points opsional */
  bullets?: LocalizedText[];
}

export interface StudioProject {
  slug: string;
  index: string;
  name: string;
  categorySlug: CategorySlug;
  /** Tagline pendek untuk card/list */
  tagline: LocalizedText;
  /** Summary 1-2 kalimat untuk meta description & card */
  summary: LocalizedText;
  /** Tahun pengerjaan */
  year: string;
  /** Nama client — boleh "Internal" untuk project Nauka Labs */
  client: string;
  /** Industri, misal "Automotive Retail", "Consumer Product" */
  industry: string;
  /** Path gambar cover di /public/portfolio/* */
  cover: string;
  /** Hex color untuk accent */
  accent: string;
  /** URL website live — WAJIB untuk status "published", opsional untuk "internal" */
  liveUrl?: string;
  /** Status: published (client live) | internal (Nauka Labs) | draft (sembunyikan dari public) */
  status: ProjectStatus;
  /** Urutan tampil dalam kategori */
  order: number;
  /** Tech stack yang BENAR-BENAR dipakai */
  techStack: string[];
  /** Role, misal "Design · Engineering" */
  role: LocalizedText;
  /** Case study dalam format baru */
  caseStudy: {
    /** Konteks masalah awal client */
    problem: CaseStudySection;
    /** Apa yang dibuat Nauka Motion */
    solution: CaseStudySection;
    /** Hasil sistem/produk yang dapat diverifikasi (TANPA angka yang tidak ada sumbernya) */
    result: CaseStudySection;
    /** Slug project berikutnya dalam kategori yang sama (opsional) */
    nextProjectSlug?: string;
  };
}

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CATEGORIES — 6 kategori saat ini
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const studioCategories: StudioCategory[] = [
  {
    slug: "automotive",
    index: "01",
    title: "Automotive",
    description: {
      id: "Website dan pengalaman digital untuk penjualan dan bisnis otomotif.",
      en: "Websites and digital experiences for automotive sales and business.",
    },
    accent: "#D85A2A",
  },
  {
    slug: "technology-retail",
    index: "02",
    title: "Technology & Retail",
    description: {
      id: "Platform, katalog, sistem, dan website untuk bisnis teknologi serta retail.",
      en: "Platforms, catalogs, systems, and websites for technology and retail businesses.",
    },
    accent: "#2563EB",
  },
  {
    slug: "insurance-finance",
    index: "03",
    title: "Insurance & Finance",
    description: {
      id: "Platform dan sistem digital untuk kebutuhan asuransi dan layanan finansial.",
      en: "Digital platforms and systems for insurance and financial services.",
    },
    accent: "#6366F1",
  },
  {
    slug: "product-brand",
    index: "04",
    title: "Product & Consumer Brand",
    description: {
      id: "Pengalaman digital untuk produk dan brand yang berhadapan langsung dengan konsumen.",
      en: "Digital experiences for products and brands facing consumers directly.",
    },
    accent: "#8B5CF6",
  },
  {
    slug: "travel-tourism",
    index: "05",
    title: "Travel & Tourism",
    description: {
      id: "Website dan pengalaman digital untuk bisnis perjalanan, destinasi, dan pariwisata.",
      en: "Websites and digital experiences for travel, destinations, and tourism businesses.",
    },
    accent: "#0D9488",
  },
  {
    slug: "nauka-labs",
    index: "06",
    title: "Nauka Labs",
    description: {
      id: "Produk independen, eksperimen, dan ide digital yang dikembangkan oleh Nauka.",
      en: "Independent products, experiments, and digital ideas developed by Nauka.",
    },
    accent: "#B8B3AA",
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   PROJECTS — daftar project real yang sudah live / internal
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const studioProjects: StudioProject[] = [
  /* ── AUTOMOTIVE ────────────────────────────── */
  {
    slug: "geely-bsd",
    index: "01",
    name: "Geely BSD",
    categorySlug: "automotive",
    tagline: {
      id: "Website dealer resmi Geely di BSD City dengan katalog unit, simulasi kredit, dan jalur konsultasi sales.",
      en: "Official Geely dealer website in BSD City with unit catalog, credit simulation, and sales consultation flow.",
    },
    summary: {
      id: "Website dealer resmi Geely BSD dengan domain kustom, branding konsisten, dan alur penjualan yang menghubungkan calon pembeli langsung ke sales consultant.",
      en: "Official Geely BSD dealer website with custom domain, consistent branding, and a sales flow that connects prospective buyers directly to sales consultants.",
    },
    year: "2025",
    client: "Geely BSD",
    industry: "Automotive Retail",
    cover: "/portfolio/geely-pluit.png",
    accent: "#2563EB",
    liveUrl: "https://geely-bsd.com",
    status: "published",
    order: 1,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    role: {
      id: "Desain · Pengembangan",
      en: "Design · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "Dealer Geely BSD membutuhkan kehadiran digital yang setara dengan teknologi mobil yang mereka jual. Website dealer konvensional tidak cukup untuk brand yang memposisikan diri di segmen kendaraan listrik dan teknologi terkini. Calon pembeli perlu bisa melihat katalog unit, membandingkan model, memahami opsi pembiayaan, dan menghubungi sales — semua dalam satu alur yang mulus.",
          en: "Geely BSD needed a digital presence on par with the technology of the cars they sell. A conventional dealer website was not enough for a brand positioning itself in the EV and modern vehicle segment. Prospective buyers needed to view the unit catalog, compare models, understand financing options, and reach sales — all in a single smooth flow.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun website dealer dengan domain kustom (geely-bsd.com), branding yang konsisten dengan identitas Geely global, katalog unit dengan spesifikasi lengkap, simulasi kredit, dan jalur konsultasi sales yang seamless. Setiap halaman unit dirancang untuk memperkecil jarak antara minat awal dan keputusan kontak sales.",
          en: "Built a dealer website with a custom domain (geely-bsd.com), branding consistent with global Geely identity, a unit catalog with full specifications, credit simulation, and a seamless sales consultation flow. Each unit page was designed to shorten the distance between initial interest and the decision to contact sales.",
        },
        bullets: [
          { id: "Domain kustom dengan branding konsisten", en: "Custom domain with consistent branding" },
          { id: "Katalog unit dengan spesifikasi lengkap", en: "Unit catalog with full specifications" },
          { id: "Simulasi kredit kendaraan", en: "Vehicle credit simulation" },
          { id: "Jalur konsultasi sales langsung", en: "Direct sales consultation flow" },
        ],
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Website live di geely-bsd.com dan menjadi titik kontak digital utama untuk calon pembeli Geely di BSD City. Sales consultant dapat mengarahkan prospek ke halaman unit spesifik untuk informasi lengkap sebelum konsultasi, sehingga percakapan penjualan lebih fokus.",
          en: "The site is live at geely-bsd.com and serves as the primary digital contact point for prospective Geely buyers in BSD City. Sales consultants can direct prospects to specific unit pages for detailed information prior to consultation, making sales conversations more focused.",
        },
      },
      nextProjectSlug: "suzuki-jakbar",
    },
  },

  {
    slug: "suzuki-jakbar",
    index: "02",
    name: "Suzuki Jakarta Barat",
    categorySlug: "automotive",
    tagline: {
      id: "Website dealer Suzuki Jakarta Barat dengan katalog unit, simulasi kredit, dan sistem lead terintegrasi.",
      en: "Suzuki Jakarta Barat dealer website with unit catalog, credit simulation, and integrated lead system.",
    },
    summary: {
      id: "Platform dealer Suzuki Jakarta Barat di subdomain autodealer.id, menampilkan katalog lengkap, simulasi pembiayaan, dan jalur konversi ke sales consultant.",
      en: "Suzuki Jakarta Barat dealer platform on the autodealer.id subdomain, displaying a complete catalog, financing simulation, and conversion flow to sales consultants.",
    },
    year: "2025",
    client: "Suzuki Jakarta Barat",
    industry: "Automotive Retail",
    cover: "/portfolio/mitsubishi.png",
    accent: "#0D9488",
    liveUrl: "https://suzukijakbar.autodealer.id",
    status: "published",
    order: 2,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    role: {
      id: "Desain · Pengembangan",
      en: "Design · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "Suzuki Jakarta Barat membutuhkan platform digital yang dapat menampilkan seluruh line-up mobil Suzuki, membantu calon pembeli memahami opsi pembiayaan, dan secara otomatis mengarahkan minat ke tim sales yang sesuai. Website dealer lama tidak memiliki alur konversi yang jelas.",
          en: "Suzuki Jakarta Barat needed a digital platform that could display the full Suzuki line-up, help prospective buyers understand financing options, and automatically direct interest to the appropriate sales team. The old dealer website lacked a clear conversion flow.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun di platform autodealer.id dengan katalog unit Suzuki lengkap, simulasi kredit kendaraan berdasarkan tenor dan down payment, form lead yang langsung terhubung ke CRM sales, dan halaman detail per model dengan spesifikasi teknis lengkap.",
          en: "Built on the autodealer.id platform with the complete Suzuki unit catalog, vehicle credit simulation based on tenor and down payment, a lead form connected directly to the sales CRM, and detailed per-model pages with full technical specifications.",
        },
        bullets: [
          { id: "Katalog lengkap semua model Suzuki", en: "Complete catalog of all Suzuki models" },
          { id: "Simulasi kredit berdasarkan tenor & DP", en: "Credit simulation based on tenor & down payment" },
          { id: "Form lead terhubung ke CRM sales", en: "Lead form connected to sales CRM" },
          { id: "Halaman detail per model dengan spesifikasi", en: "Per-model detail pages with specifications" },
        ],
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Website live di suzikijakbar.autodealer.id dan menjadi kanal utama untuk pembelian lead sales. Setiap form submission langsung masuk ke CRM dealer, sehingga follow-up sales dapat dilakukan dalam waktu singkat.",
          en: "The site is live at suzikijakbar.autodealer.id and serves as the main channel for generating sales leads. Every form submission goes directly into the dealer CRM, allowing sales follow-up within a short window.",
        },
      },
      nextProjectSlug: "mitsubishi-autodealer",
    },
  },

  {
    slug: "mitsubishi-autodealer",
    index: "03",
    name: "Mitsubishi",
    categorySlug: "automotive",
    tagline: {
      id: "Website dealer Mitsubishi dengan katalog unit, simulasi kredit, dan sistem lead management.",
      en: "Mitsubishi dealer website with unit catalog, credit simulation, and lead management system.",
    },
    summary: {
      id: "Platform dealer Mitsubishi di autodealer.id dengan katalog lengkap, simulasi pembiayaan, dan integrasi sales.",
      en: "Mitsubishi dealer platform on autodealer.id with complete catalog, financing simulation, and sales integration.",
    },
    year: "2025",
    client: "Mitsubishi Dealer",
    industry: "Automotive Retail",
    cover: "/portfolio/mitsubishi.png",
    accent: "#D85A2A",
    liveUrl: "https://mitsubishi.autodealer.id",
    status: "published",
    order: 3,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    role: {
      id: "Desain · Pengembangan",
      en: "Design · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "Dealer Mitsubishi membutuhkan platform digital yang dapat memperlakukan setiap kendaraan sebagai pengalaman tersendiri — dari spesifikasi teknis hingga opsi pembiayaan dan jadwal test drive — dalam satu alur yang konsisten.",
          en: "The Mitsubishi dealer needed a digital platform that could treat each vehicle as its own experience — from technical specifications to financing options and test drive scheduling — within a single consistent flow.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun di platform autodealer.id dengan katalog unit Mitsubishi lengkap, simulasi kredit real-time, halaman detail per model dengan spesifikasi teknis dan galeri, serta jalur langsung ke sales consultant untuk test drive dan penawaran.",
          en: "Built on the autodealer.id platform with the complete Mitsubishi unit catalog, real-time credit simulation, per-model detail pages with specifications and gallery, and a direct path to sales consultants for test drives and offers.",
        },
        bullets: [
          { id: "Katalog lengkap model Mitsubishi", en: "Complete catalog of Mitsubishi models" },
          { id: "Simulasi kredit real-time", en: "Real-time credit simulation" },
          { id: "Halaman detail per model dengan galeri", en: "Per-model detail pages with gallery" },
          { id: "Jalur langsung ke sales consultant", en: "Direct path to sales consultant" },
        ],
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Website live di mitsubishi.autodealer.id. Sales consultant dapat mengarahkan calon pembeli ke halaman unit spesifik untuk informasi lengkap sebelum konsultasi, dan setiap form submission langsung tercatat di sistem lead dealer.",
          en: "The site is live at mitsubishi.autodealer.id. Sales consultants can direct prospective buyers to specific unit pages for detailed information prior to consultation, and every form submission is recorded directly in the dealer lead system.",
        },
      },
      nextProjectSlug: "jaecoo",
    },
  },

  {
    slug: "jaecoo",
    index: "04",
    name: "JAECOO",
    categorySlug: "automotive",
    tagline: {
      id: "Website dealer JAECOO dengan katalog unit dan jalur konsultasi sales.",
      en: "JAECOO dealer website with unit catalog and sales consultation flow.",
    },
    summary: {
      id: "Platform dealer JAECOO di autodealer.id dengan katalog lengkap dan alur konversi ke sales.",
      en: "JAECOO dealer platform on autodealer.id with complete catalog and sales conversion flow.",
    },
    year: "2025",
    client: "JAECOO Dealer",
    industry: "Automotive Retail",
    cover: "/portfolio/mitsubishi.png",
    accent: "#4A4742",
    liveUrl: "https://jaecoo.autodealer.id",
    status: "published",
    order: 4,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    role: {
      id: "Desain · Pengembangan",
      en: "Design · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "JAECOO sebagai brand baru di pasar Indonesia membutuhkan kehadiran digital yang dapat memperkenalkan line-up model mereka kepada calon pembeli, sekaligus mengarahkan minat ke dealer sales consultant.",
          en: "JAECOO as a new brand in the Indonesian market needed a digital presence that could introduce their model line-up to prospective buyers, while directing interest to dealer sales consultants.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun di platform autodealer.id dengan katalog unit JAECOO, halaman detail per model, simulasi pembiayaan, dan jalur konsultasi sales. Branding disesuaikan dengan identitas global JAECOO.",
          en: "Built on the autodealer.id platform with the JAECOO unit catalog, per-model detail pages, financing simulation, and sales consultation flow. Branding was aligned with JAECOO's global identity.",
        },
        bullets: [
          { id: "Katalog unit JAECOO", en: "JAECOO unit catalog" },
          { id: "Halaman detail per model", en: "Per-model detail pages" },
          { id: "Simulasi pembiayaan", en: "Financing simulation" },
          { id: "Branding konsisten global", en: "Consistent global branding" },
        ],
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Website live di jaecoo.autodealer.id dan menjadi titik kontak digital untuk calon pembeli JAECOO. Setiap form submission masuk langsung ke sistem lead dealer.",
          en: "The site is live at jaecoo.autodealer.id and serves as the digital contact point for prospective JAECOO buyers. Every form submission enters the dealer lead system directly.",
        },
      },
      nextProjectSlug: "berkah-komputer",
    },
  },

  /* ── TECHNOLOGY & RETAIL ───────────────────── */
  {
    slug: "berkah-komputer",
    index: "05",
    name: "Berkah Komputer",
    categorySlug: "technology-retail",
    tagline: {
      id: "Toko komputer online dengan katalog produk, checkout, dan manajemen stok.",
      en: "Online computer store with product catalog, checkout, and inventory management.",
    },
    summary: {
      id: "Website e-commerce untuk toko komputer Berkah Komputer dengan katalog produk terorganisir, checkout, dan integrasi stok.",
      en: "E-commerce website for Berkah Komputer store with organized product catalog, checkout, and inventory integration.",
    },
    year: "2025",
    client: "Berkah Komputer",
    industry: "Retail / Technology",
    cover: "/portfolio/ghazy-computer.png",
    accent: "#2563EB",
    liveUrl: "https://berkahkomputer.id",
    status: "published",
    order: 1,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Prisma"],
    role: {
      id: "Desain · Pengembangan",
      en: "Design · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "Berkah Komputer menjual produk teknologi melalui kanal marketplace dan membutuhkan toko online sendiri untuk membangun brand, mengontrol margin, dan mengelola data pelanggan secara langsung.",
          en: "Berkah Komputer sold technology products through marketplace channels and needed their own online store to build brand, control margins, and manage customer data directly.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun e-commerce dengan katalog produk terorganisir per kategori, pencarian produk, halaman detail dengan spesifikasi, keranjang belanja, checkout, dan dashboard admin untuk mengelola produk serta stok.",
          en: "Built an e-commerce site with a product catalog organized by category, product search, detail pages with specifications, shopping cart, checkout, and an admin dashboard to manage products and inventory.",
        },
        bullets: [
          { id: "Katalog produk per kategori", en: "Product catalog by category" },
          { id: "Pencarian produk", en: "Product search" },
          { id: "Keranjang belanja & checkout", en: "Shopping cart & checkout" },
          { id: "Dashboard admin produk & stok", en: "Admin dashboard for products & inventory" },
        ],
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Toko online live di berkahkomputer.id. Pelanggan dapat membeli produk langsung dari website, dan tim Berkah Komputer dapat mengelola katalog serta stok melalui dashboard admin tanpa ketergantungan pada marketplace.",
          en: "The online store is live at berkahkomputer.id. Customers can purchase products directly from the website, and the Berkah Komputer team can manage the catalog and inventory through the admin dashboard without marketplace dependency.",
        },
      },
      nextProjectSlug: "ghazy-computer",
    },
  },

  {
    slug: "ghazy-computer",
    index: "06",
    name: "Ghazy Computer",
    categorySlug: "technology-retail",
    tagline: {
      id: "Sistem buyback laptop dengan alur submit, evaluasi, penawaran harga, dan pickup.",
      en: "Laptop buyback system with submit, evaluation, price offer, and pickup flow.",
    },
    summary: {
      id: "Web app untuk bisnis buyback laptop Ghazy Computer dengan alur penawaran, tracking, dan pembayaran terorganisir.",
      en: "Web app for Ghazy Computer's laptop buyback business with offer flow, tracking, and organized payment.",
    },
    year: "2025",
    client: "Ghazy Computer",
    industry: "Retail / Technology",
    cover: "/portfolio/ghazy-computer.png",
    accent: "#E11D48",
    liveUrl: "https://ghazycomputer.com",
    status: "published",
    order: 2,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Prisma"],
    role: {
      id: "Desain · Pengembangan",
      en: "Design · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "Bisnis buyback laptop yang berkembang tenggelam dalam spreadsheet dan WhatsApp. Tim butuh sistem yang dapat menangani alur submit barang, evaluasi kondisi, penawaran harga, pickup, dan pembayaran secara terlacak.",
          en: "A growing laptop buyback business was drowning in spreadsheets and WhatsApp. The team needed a system that could handle the flow of item submission, condition evaluation, price offers, pickup, and payment in a trackable way.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun web app dengan alur lengkap: pelanggan submit detail laptop → sistem membantu evaluasi kondisi → penawaran harga otomatis berdasarkan parameter → penjadwalan pickup → konfirmasi pembayaran. Semua transaksi tercatat dan dapat di-track oleh tim admin.",
          en: "Built a web app with the full flow: customer submits laptop details → system assists condition evaluation → automated price offer based on parameters → pickup scheduling → payment confirmation. All transactions are recorded and trackable by the admin team.",
        },
        bullets: [
          { id: "Form submit detail laptop", en: "Laptop detail submission form" },
          { id: "Evaluasi kondisi terpandu", en: "Guided condition evaluation" },
          { id: "Penawaran harga otomatis", en: "Automated price offer" },
          { id: "Penjadwalan pickup & pembayaran", en: "Pickup scheduling & payment" },
        ],
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Website live di ghazycomputer.com. Pelanggan dapat mengajukan laptop untuk dijual melalui website, dan tim Ghazy Computer dapat mengelola seluruh alur transaksi dari satu dashboard.",
          en: "The site is live at ghazycomputer.com. Customers can submit laptops for sale through the website, and the Ghazy Computer team can manage the entire transaction flow from a single dashboard.",
        },
      },
      nextProjectSlug: "jakarta-laptops",
    },
  },

  {
    slug: "jakarta-laptops",
    index: "07",
    name: "Jakarta Laptops",
    categorySlug: "technology-retail",
    tagline: {
      id: "Toko laptop online dengan katalog produk dan checkout.",
      en: "Online laptop store with product catalog and checkout.",
    },
    summary: {
      id: "Website e-commerce untuk toko laptop Jakarta Laptops dengan katalog terorganisir dan alur pembelian.",
      en: "E-commerce website for Jakarta Laptops store with organized catalog and purchase flow.",
    },
    year: "2025",
    client: "Jakarta Laptops",
    industry: "Retail / Technology",
    cover: "/portfolio/ghazy-computer.png",
    accent: "#8B5CF6",
    liveUrl: "https://jakartalaptops.com",
    status: "published",
    order: 3,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL"],
    role: {
      id: "Desain · Pengembangan",
      en: "Design · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "Jakarta Laptops membutuhkan toko online sendiri untuk membangun brand di luar marketplace, dengan katalog laptop yang terorganisir per kategori dan brand.",
          en: "Jakarta Laptops needed their own online store to build brand outside marketplaces, with a laptop catalog organized by category and brand.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun e-commerce dengan katalog laptop terorganisir (brand, kategori, harga), pencarian, halaman detail produk dengan spesifikasi lengkap, dan checkout.",
          en: "Built an e-commerce site with a laptop catalog organized by brand, category, and price, product search, detail pages with full specifications, and checkout.",
        },
        bullets: [
          { id: "Katalog laptop per brand & kategori", en: "Laptop catalog by brand & category" },
          { id: "Pencarian & filter produk", en: "Product search & filtering" },
          { id: "Halaman detail dengan spesifikasi", en: "Detail pages with specifications" },
          { id: "Checkout", en: "Checkout" },
        ],
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Website live di jakartalaptops.com. Pelanggan dapat menjelajahi katalog laptop dan melakukan pembelian langsung dari website.",
          en: "The site is live at jakartalaptops.com. Customers can browse the laptop catalog and make purchases directly from the website.",
        },
      },
      nextProjectSlug: "jasa-proteksi",
    },
  },

  /* ── INSURANCE & FINANCE ───────────────────── */
  {
    slug: "jasa-proteksi",
    index: "08",
    name: "Jasa Proteksi",
    categorySlug: "insurance-finance",
    tagline: {
      id: "Platform kalkulator premi asuransi kendaraan berbasis database 14.000+ data kendaraan.",
      en: "Vehicle insurance premium calculator platform based on a database of 14,000+ vehicle records.",
    },
    summary: {
      id: "Bukan sekadar company profile — Jasa Proteksi adalah platform kalkulator asuransi kendaraan berbasis data, dengan database lebih dari 14.000 data kendaraan.",
      en: "Not just a company profile — Jasa Proteksi is a data-driven vehicle insurance calculator platform, with a database of more than 14,000 vehicle records.",
    },
    year: "2025",
    client: "Jasa Proteksi",
    industry: "Insurance Brokerage",
    cover: "/portfolio/jasaprotect.png",
    accent: "#6366F1",
    liveUrl: "https://jasa-proteksi.vercel.app",
    status: "published",
    order: 1,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "PostgreSQL", "Prisma"],
    role: {
      id: "Strategi · Desain · Pengembangan",
      en: "Strategy · Design · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "Jasa Proteksi memiliki database lebih dari 14.000 data kendaraan dan membutuhkan sistem yang dapat secara otomatis menghasilkan estimasi premi asuransi kendaraan. Sebelumnya, perhitungan premi dilakukan manual oleh tim sales, yang memakan waktu dan rentan kesalahan. Calon nasabah harus menghubungi sales terlebih dahulu untuk mendapatkan estimasi harga.",
          en: "Jasa Proteksi had a database of more than 14,000 vehicle records and needed a system that could automatically generate vehicle insurance premium estimates. Previously, premium calculations were done manually by the sales team, which was time-consuming and error-prone. Prospective customers had to contact sales first to get a price estimate.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun platform kalkulator asuransi kendaraan berbasis data. Pengguna cukup memilih merek, tipe, dan tahun kendaraan — kemudian sistem mencari kendaraan yang sesuai dalam database 14.000+ entri dan menghasilkan estimasi premi berdasarkan parameter perlindungan yang dipilih. Sistem terpisah dari UI layer, sehingga perhitungan yang sama dapat dipakai ulang di beberapa permukaan (kalkulator, perbandingan, email).",
          en: "Built a data-driven vehicle insurance calculator platform. Users simply select the brand, type, and year of the vehicle — the system then searches the matching vehicle in the 14,000+ entry database and generates a premium estimate based on the chosen protection parameters. The calculation engine is separated from the UI layer, so the same calculation can be reused across surfaces (calculator, comparison, email).",
        },
        bullets: [
          { id: "Database 14.000+ data kendaraan", en: "Database of 14,000+ vehicle records" },
          { id: "Pencarian kendaraan: merek, tipe, tahun", en: "Vehicle search: brand, type, year" },
          { id: "Estimasi premi otomatis berdasarkan parameter", en: "Automated premium estimate based on parameters" },
          { id: "Engine perhitungan terpisah dari UI", en: "Calculation engine separated from UI" },
        ],
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Platform live di jasa-proteksi.vercel.app. Calon nasabah dapat langsung mendapatkan estimasi premi setelah memilih kendaraan, tanpa harus menunggu respons sales. Tim Jasa Proteksi dapat memperbarui data kendaraan dan parameter premi melalui dashboard admin tanpa deployment ulang.",
          en: "The platform is live at jasa-proteksi.vercel.app. Prospective customers can immediately get a premium estimate after selecting a vehicle, without waiting for a sales response. The Jasa Proteksi team can update vehicle data and premium parameters through an admin dashboard without redeployment.",
        },
      },
      nextProjectSlug: "anima-companion",
    },
  },

  /* ── PRODUCT & CONSUMER BRAND ──────────────── */
  {
    slug: "anima-companion",
    index: "09",
    name: "Anima Companion",
    categorySlug: "product-brand",
    tagline: {
      id: "Brand produk konsumen dengan pengalaman digital yang berhadapan langsung dengan konsumen.",
      en: "Consumer product brand with a digital experience that engages consumers directly.",
    },
    summary: {
      id: "Anima Companion adalah brand produk konsumen. Website dibangun untuk memperkenalkan produk, membangun brand, dan mengarahkan konsumen ke kanal pembelian.",
      en: "Anima Companion is a consumer product brand. The website was built to introduce the product, build the brand, and direct consumers to purchase channels.",
    },
    year: "2025",
    client: "Anima Companion",
    industry: "Consumer Product",
    cover: "/portfolio/jasaprotect.png",
    accent: "#8B5CF6",
    status: "published",
    order: 1,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    role: {
      id: "Desain · Pengembangan",
      en: "Design · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "Anima Companion sebagai brand produk konsumen membutuhkan kehadiran digital yang dapat memperkenalkan produk kepada target audiens, membangun brand identity, dan mengarahkan konsumen ke kanal pembelian yang tepat. Tidak adanya website sendiri membuat brand kesulitan membangun positioning di luar marketplace.",
          en: "Anima Companion as a consumer product brand needed a digital presence that could introduce the product to its target audience, build brand identity, and direct consumers to the right purchase channel. Without its own website, the brand struggled to build positioning outside marketplaces.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun website brand dengan halaman utama yang memperkenalkan produk, halaman detail produk, storytelling brand, dan call-to-action yang mengarah ke kanal pembelian. Branding dikembangkan konsisten di semua halaman, dengan motion halus untuk memperkuat karakter brand.",
          en: "Built a brand website with a homepage that introduces the product, product detail pages, brand storytelling, and call-to-actions leading to the purchase channel. Branding was developed consistently across all pages, with subtle motion to reinforce the brand character.",
        },
        bullets: [
          { id: "Halaman utama perkenalan produk", en: "Homepage introducing the product" },
          { id: "Halaman detail produk", en: "Product detail pages" },
          { id: "Brand storytelling konsisten", en: "Consistent brand storytelling" },
          { id: "CTA ke kanal pembelian", en: "CTA to purchase channel" },
        ],
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Website brand Anima Companion live, menjadi titik kontak digital utama untuk konsumen. Brand memiliki kehadiran digital sendiri di luar marketplace, dengan branding dan storytelling yang dapat diperbarui oleh tim internal.",
          en: "The Anima Companion brand website is live, serving as the main digital contact point for consumers. The brand has its own digital presence outside marketplaces, with branding and storytelling that the internal team can update.",
        },
      },
      nextProjectSlug: "lets-go-karimun",
    },
  },

  /* ── TRAVEL & TOURISM ──────────────────────── */
  {
    slug: "lets-go-karimun",
    index: "10",
    name: "Let's Go Karimun",
    categorySlug: "travel-tourism",
    tagline: {
      id: "Website destinasi wisata Karimun dengan informasi paket tour dan kontak.",
      en: "Karimun tourism destination website with tour package information and contact.",
    },
    summary: {
      id: "Website untuk bisnis pariwisata Karimun dengan informasi destinasi, paket tour, dan jalur pemesanan.",
      en: "Website for a Karimun tourism business with destination info, tour packages, and booking flow.",
    },
    year: "2025",
    client: "Let's Go Karimun",
    industry: "Travel & Tourism",
    cover: "/portfolio/jasaprotect.png",
    accent: "#0D9488",
    status: "published",
    order: 1,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: {
      id: "Desain · Pengembangan",
      en: "Design · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "Bisnis pariwisata Karimun membutuhkan website yang dapat memperkenalkan destinasi, menampilkan paket tour yang tersedia, dan memudahkan calon wisatawan menghubungi pengelola untuk pemesanan.",
          en: "A Karimun tourism business needed a website that could introduce the destination, display available tour packages, and make it easy for prospective tourists to contact the operator for booking.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun website dengan halaman utama yang memperkenalkan destinasi Karimun, halaman paket tour dengan detail itinerary dan harga, galeri foto, dan call-to-action untuk pemesanan via WhatsApp atau form kontak.",
          en: "Built a website with a homepage introducing Karimun as a destination, tour package pages with detailed itineraries and pricing, a photo gallery, and call-to-actions for booking via WhatsApp or contact form.",
        },
        bullets: [
          { id: "Halaman perkenalan destinasi", en: "Destination introduction page" },
          { id: "Paket tour dengan itinerary & harga", en: "Tour packages with itinerary & pricing" },
          { id: "Galeri foto destinasi", en: "Destination photo gallery" },
          { id: "CTA pemesanan via WhatsApp / form", en: "Booking CTA via WhatsApp / form" },
        ],
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Website Let's Go Karimun live dan menjadi titik kontak digital utama untuk wisatawan yang tertarik berkunjung ke Karimun.",
          en: "The Let's Go Karimun website is live and serves as the main digital contact point for tourists interested in visiting Karimun.",
        },
      },
      nextProjectSlug: "jejak-cahaya",
    },
  },

  /* ── NAUKA LABS ────────────────────────────── */
  {
    slug: "jejak-cahaya",
    index: "11",
    name: "Jejak Cahaya",
    categorySlug: "nauka-labs",
    tagline: {
      id: "Pengalaman digital storytelling dengan animasi scroll-driven dan tipografi editorial.",
      en: "Digital storytelling experience with scroll-driven animation and editorial typography.",
    },
    summary: {
      id: "Proyek independen Nauka Labs yang mengeksplorasi bagaimana animasi berbasis scroll dan tipografi editorial dapat menciptakan pengalaman naratif yang imersif.",
      en: "An independent Nauka Labs project exploring how scroll-driven animation and editorial typography can create an immersive narrative experience.",
    },
    year: "2025",
    client: "Nauka Labs",
    industry: "Internal R&D",
    cover: "/portfolio/jasaprotect.png",
    accent: "#B8B3AA",
    liveUrl: "https://jejakcahaya.my.id",
    status: "internal",
    order: 1,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Web Animations API", "IntersectionObserver"],
    role: {
      id: "Desain · Pengembangan",
      en: "Design · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "Nauka Labs ingin mengeksplorasi bagaimana animasi berbasis scroll dapat digunakan untuk bercerita secara digital, tanpa bergantung pada library animasi berat yang membebani performa.",
          en: "Nauka Labs wanted to explore how scroll-based animation can be used for digital storytelling, without relying on heavy animation libraries that burden performance.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun pengalaman web dengan animasi scroll-driven menggunakan Web Animations API dan IntersectionObserver, tipografi editorial dengan font variabel, dan struktur halaman yang mengikuti alur naratif. Audio dikendalikan oleh interaksi pengguna untuk menghormati kebijakan autoplay browser.",
          en: "Built a web experience with scroll-driven animation using the Web Animations API and IntersectionObserver, editorial typography with variable fonts, and a page structure following the narrative flow. Audio is gated behind user interaction to respect browser autoplay policies.",
        },
        bullets: [
          { id: "Web Animations API + IntersectionObserver", en: "Web Animations API + IntersectionObserver" },
          { id: "Tipografi editorial variabel", en: "Variable editorial typography" },
          { id: "Tanpa library animasi berat", en: "No heavy animation library" },
          { id: "Audio gated oleh user interaction", en: "Audio gated by user interaction" },
        ],
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Project live di jejakcahaya.my.id sebagai eksperimen Nauka Labs. Pola animasi dan pendekatan tipografi dari project ini menginformasikan gaya visual homepage Nauka Motion sendiri.",
          en: "The project is live at jejakcahaya.my.id as a Nauka Labs experiment. The animation patterns and typography approach from this project informed the visual style of the Nauka Motion homepage itself.",
        },
      },
      nextProjectSlug: "nauka-tech",
    },
  },

  {
    slug: "nauka-tech",
    index: "12",
    name: "Nauka Tech",
    categorySlug: "nauka-labs",
    tagline: {
      id: "Halaman landing Nauka Tech dengan informasi layanan dan identitas brand.",
      en: "Nauka Tech landing page with service information and brand identity.",
    },
    summary: {
      id: "Website Nauka Tech di subdomain tech.nauka.id sebagai pengenalan layanan teknologi di bawah naungan Nauka.",
      en: "Nauka Tech website at the tech.nauka.id subdomain introducing technology services under the Nauka umbrella.",
    },
    year: "2025",
    client: "Nauka",
    industry: "Internal R&D",
    cover: "/portfolio/jasaprotect.png",
    accent: "#4A4742",
    liveUrl: "https://tech.nauka.id",
    status: "internal",
    order: 2,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: {
      id: "Desain · Pengembangan",
      en: "Design · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "Nauka membutuhkan halaman terpisah untuk lini layanan teknologi di bawah subdomain tech.nauka.id, untuk memisahkan positioning dari studio motion.nauka.id.",
          en: "Nauka needed a separate page for its technology service line under the tech.nauka.id subdomain, to separate positioning from the motion.nauka.id studio.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun halaman landing dengan identitas brand sendiri, perkenalan layanan, dan call-to-action kontak. Sharing design tokens dengan motion.nauka.id untuk konsistensi brand Nauka.",
          en: "Built a landing page with its own brand identity, service introduction, and contact CTA. Sharing design tokens with motion.nauka.id for Nauka brand consistency.",
        },
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Website live di tech.nauka.id sebagai pintu masuk untuk lini layanan teknologi Nauka.",
          en: "The site is live at tech.nauka.id as the entry point for Nauka's technology service line.",
        },
      },
      nextProjectSlug: "inventra",
    },
  },

  {
    slug: "inventra",
    index: "13",
    name: "Inventra",
    categorySlug: "nauka-labs",
    tagline: {
      id: "Eksperimen sistem operasional bisnis dengan inventory dan transaksi multi-cabang.",
      en: "Experiment of a business operating system with multi-branch inventory and transactions.",
    },
    summary: {
      id: "Produk internal Nauka Labs yang mengeksplorasi arsitektur sistem operasional bisnis dengan model data unit-centric dan alur multi-cabang.",
      en: "Internal Nauka Labs product exploring the architecture of a business operating system with a unit-centric data model and multi-branch flow.",
    },
    year: "2025",
    client: "Nauka Labs",
    industry: "Internal R&D",
    cover: "/portfolio/ghazy-computer.png",
    accent: "#B8B3AA",
    status: "internal",
    order: 3,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma"],
    role: {
      id: "Arsitektur · Pengembangan",
      en: "Architecture · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "Nauka Labs ingin mengeksplorasi bagaimana sistem operasional bisnis dirancang ketika setiap unit barang (bukan transaksi) menjadi pusat model data — terutama untuk kategori dengan SKU unik seperti elektronik bekas.",
          en: "Nauka Labs wanted to explore how a business operating system is designed when each unit of goods (not the transaction) becomes the center of the data model — especially for categories with unique SKUs like used electronics.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun prototipe sistem dengan model data unit-centric, alur inventory, transaksi, pelaporan, dan transfer antar-cabang. Setiap perubahan status unit tercatat dalam audit trail.",
          en: "Built a system prototype with a unit-centric data model, inventory flow, transactions, reporting, and inter-branch transfers. Every unit state change is recorded in an audit trail.",
        },
        bullets: [
          { id: "Model data unit-centric", en: "Unit-centric data model" },
          { id: "Audit trail setiap state change", en: "Audit trail on every state change" },
          { id: "Alur transfer antar-cabang", en: "Inter-branch transfer flow" },
          { id: "Pelaporan real-time per cabang", en: "Real-time per-branch reporting" },
        ],
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Inventra adalah eksperimen internal Nauka Labs yang menginformasikan pendekatan arsitektur untuk sistem operasional bisnis pada project client. Belum dirilis sebagai produk publik.",
          en: "Inventra is an internal Nauka Labs experiment that informs the architectural approach for business operating systems in client projects. It has not been released as a public product.",
        },
      },
      nextProjectSlug: "nauka-kostay",
    },
  },

  {
    slug: "nauka-kostay",
    index: "14",
    name: "Nauka Kostay",
    categorySlug: "nauka-labs",
    tagline: {
      id: "Eksperimen pengalaman digital hospitality untuk bisnis kos.",
      en: "Digital hospitality experience experiment for a boarding house business.",
    },
    summary: {
      id: "Prototipe internal Nauka Labs yang mengeksplorasi bagaimana pengalaman digital hospitality dapat diterapkan pada bisnis kos.",
      en: "Internal Nauka Labs prototype exploring how digital hospitality experiences can be applied to a boarding house business.",
    },
    year: "2025",
    client: "Nauka Labs",
    industry: "Internal R&D",
    cover: "/portfolio/nauka-kostay.png",
    accent: "#D97706",
    status: "internal",
    order: 4,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: {
      id: "Desain · Pengembangan",
      en: "Design · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "Nauka Labs ingin mengeksplorasi bagaimana pengalaman digital yang biasa diterapkan pada hotel dapat diadaptasi untuk bisnis kos — di mana penghuni layak mendapat pengalaman yang lebih baik dari sekadar melihat foto kamar dan harga.",
          en: "Nauka Labs wanted to explore how digital experiences usually applied to hotels can be adapted for boarding house businesses — where residents deserve a better experience than just viewing room photos and pricing.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun prototipe dengan virtual tour kamar, tampilan fasilitas, testimoni penghuni, dan alur booking yang seamless. Eksperimen ini menguji sejauh mana pengalaman hotel-like dapat diterapkan pada kategori kos.",
          en: "Built a prototype with virtual room tours, facility display, resident testimonials, and a seamless booking flow. This experiment tested how far hotel-like experiences can be applied to the boarding house category.",
        },
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Prototipe internal Nauka Labs. Pola UX dari eksperimen ini menginformasikan pendekatan hospitality pada project client sejenis.",
          en: "Internal Nauka Labs prototype. The UX patterns from this experiment inform the hospitality approach for similar client projects.",
        },
      },
      nextProjectSlug: "nauka-gadget",
    },
  },

  {
    slug: "nauka-gadget",
    index: "15",
    name: "Nauka Gadget",
    categorySlug: "nauka-labs",
    tagline: {
      id: "Eksperimen toko gadget premium di luar marketplace.",
      en: "Premium gadget store experiment outside marketplaces.",
    },
    summary: {
      id: "Prototipe internal Nauka Labs yang mengeksplorasi bagaimana toko gadget premium dapat dibangun di luar marketplace, dengan branding dan UX yang lebih terkontrol.",
      en: "Internal Nauka Labs prototype exploring how a premium gadget store can be built outside marketplaces, with more controlled branding and UX.",
    },
    year: "2025",
    client: "Nauka Labs",
    industry: "Internal R&D",
    cover: "/portfolio/nauka-gadget.png",
    accent: "#8B5CF6",
    status: "internal",
    order: 5,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: {
      id: "Desain · Pengembangan",
      en: "Design · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "Nauka Labs ingin mengeksplorasi bagaimana toko gadget premium dapat dibangun di luar marketplace, di mana margin dan brand dapat dikontrol sendiri, dengan UX yang lebih premium daripada tampilan marketplace generik.",
          en: "Nauka Labs wanted to explore how a premium gadget store can be built outside marketplaces, where margins and brand can be controlled, with a more premium UX than generic marketplace layouts.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun prototipe e-commerce dengan desain premium, katalog terorganisir, halaman detail produk, dan checkout yang dirancang untuk meminimalkan friksi.",
          en: "Built an e-commerce prototype with premium design, organized catalog, product detail pages, and a checkout designed to minimize friction.",
        },
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Prototipe internal Nauka Labs. Pendekatan UX dan branding dari eksperimen ini menginformasikan project e-commerce client sejenis.",
          en: "Internal Nauka Labs prototype. The UX and branding approach from this experiment informs similar client e-commerce projects.",
        },
      },
      nextProjectSlug: "booking-club",
    },
  },

  {
    slug: "booking-club",
    index: "16",
    name: "Booking Club",
    categorySlug: "nauka-labs",
    tagline: {
      id: "Eksperimen sistem booking untuk klub / layanan berbasis jadwal.",
      en: "Booking system experiment for club / schedule-based services.",
    },
    summary: {
      id: "Prototipe internal Nauka Labs yang mengeksplorasi arsitektur sistem booking berbasis jadwal untuk klub atau layanan serupa.",
      en: "Internal Nauka Labs prototype exploring the architecture of a schedule-based booking system for clubs or similar services.",
    },
    year: "2025",
    client: "Nauka Labs",
    industry: "Internal R&D",
    cover: "/portfolio/jasaprotect.png",
    accent: "#B8B3AA",
    status: "internal",
    order: 6,
    techStack: ["Next.js", "TypeScript", "Tailwind CSS"],
    role: {
      id: "Desain · Pengembangan",
      en: "Design · Engineering",
    },
    caseStudy: {
      problem: {
        heading: { id: "Masalah", en: "Problem" },
        body: {
          id: "Nauka Labs ingin mengeksplorasi bagaimana sistem booking berbasis jadwal dirancang untuk klub atau layanan yang memerlukan reservasi slot waktu, dengan konflik jadwal dan konfirmasi otomatis.",
          en: "Nauka Labs wanted to explore how a schedule-based booking system is designed for clubs or services requiring time-slot reservations, with schedule conflict handling and automated confirmation.",
        },
      },
      solution: {
        heading: { id: "Solusi", en: "Solution" },
        body: {
          id: "Dibangun prototipe dengan kalender ketersediaan, sistem reservasi slot, deteksi konflik jadwal, dan konfirmasi otomatis via email/WhatsApp.",
          en: "Built a prototype with availability calendar, slot reservation system, schedule conflict detection, and automated confirmation via email/WhatsApp.",
        },
      },
      result: {
        heading: { id: "Hasil", en: "Result" },
        body: {
          id: "Prototipe internal Nauka Labs. Pola arsitektur dari eksperimen ini menginformasikan sistem booking pada project client sejenis.",
          en: "Internal Nauka Labs prototype. The architectural patterns from this experiment inform booking systems in similar client projects.",
        },
      },
    },
  },
];

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   STATS — angka jujur untuk homepage
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */

export const studioStats = {
  projectTotal: { value: "50+", label: { id: "Project & eksperimen dikembangkan", en: "Projects & experiments developed" } },
  projectLive: { value: "10+", label: { id: "Project telah live", en: "Projects live" } },
  categoryCount: { value: "6", label: { id: "Kategori saat ini", en: "Current categories" } },
};

/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   CAPABILITIES / SERVICES — apa yang Nauka bangun
   (Bukan kategori industri. Kategori = industri.
    Capabilities = jenis deliverable.)
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
