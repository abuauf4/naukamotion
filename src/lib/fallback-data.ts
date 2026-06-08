/**
 * Fallback Data — Used when database is empty or unavailable
 *
 * This data is also hardcoded in frontend components (HeroSection, CaseStudySection, etc.)
 * Centralized here so API routes can return the same data when DB fails.
 */

export interface FallbackProject {
  id: string;
  slug: string;
  client: string;
  category: string;
  title: string;
  description: string;
  approach: string | null;
  liveUrl: string | null;
  image: string | null;
  color: string;
  featured: boolean;
  order: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface FallbackTestimonial {
  id: string;
  quote: string;
  author: string;
  role: string | null;
  company: string;
  featured: boolean;
  order: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export interface FallbackService {
  id: string;
  slug: string;
  title: string;
  description: string;
  icon: string;
  features: string;
  order: number;
  status: string;
  createdAt: string;
  updatedAt: string;
}

export const fallbackProjects: FallbackProject[] = [
  {
    id: 'fp-mitsubishi', slug: 'mitsubishi', client: 'Mitsubishi Motor Indonesia',
    category: 'Website Profesional', title: 'Website Dealer yang Menjual Mobil Sebelum Test Drive',
    description: 'Dealer Mitsubishi butuh lebih dari sekadar katalog digital. Mereka butuh platform yang memperlakukan setiap kendaraan sebagai pengalaman — dari spesifikasi teknis sampai jadwal test drive, semua dalam satu alur yang mengalir.',
    approach: 'Inventaris real-time, perbandingan model, kalkulasi kredit, dan jalur langsung ke sales consultant. Setiap halaman dirancang untuk memperkecil jarak antara minat dan keputusan.',
    liveUrl: 'https://mitsubishi-test.vercel.app', image: '/portfolio/mitsubishi.png', color: '#0d9488', featured: true, order: 1, status: 'published',
    createdAt: '2025-01-15T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fp-geely', slug: 'geely-pluit', client: 'Geely Pluit',
    category: 'Website Profesional', title: 'Dealer Listrik yang Menjual Masa Depan, Bukan Sekadar Mobil',
    description: 'Geely masuk Indonesia sebagai brand EV. Mereka butuh kehadiran digital yang terasa sama modern-nya dengan teknologi yang mereka jual — bukan website dealer konvensional yang terasa 2018.',
    approach: 'Custom domain dengan branding yang konsisten, perbandingan model EV, estimasi jarak tempuh, fast-charging info, dan jalur konsultasi sales yang seamless.',
    liveUrl: 'https://elgeelypluit.id', image: '/portfolio/geely-pluit.png', color: '#2563eb', featured: true, order: 2, status: 'published',
    createdAt: '2025-02-10T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fp-jasaprotect', slug: 'jasaprotect', client: 'JasaProtect',
    category: 'Landing Page', title: 'Platform Asuransi yang Bikin Orang Ngerti Apa yang Mereka Beli',
    description: 'Asuransi itu kompleks — terlalu banyak pilihan, terlalu banyak istilah, terlalu sedikit kejelasan. JasaProtect hadir sebagai broker yang membuat memilih asuransi terasa mudah, bukan membingungkan.',
    approach: 'Interface perbandingan transparan, penjelasan dalam bahasa sehari-hari, dan alur pemilihan terpandu.',
    liveUrl: 'https://jasa-proteksi.vercel.app', image: '/portfolio/jasaprotect.png', color: '#6366f1', featured: false, order: 3, status: 'published',
    createdAt: '2025-03-05T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fp-naukagadget', slug: 'nauka-gadget', client: 'Nauka Gadget',
    category: 'E-Commerce', title: 'Toko Gadget yang Terasa Premium, Bukan Marketplace Murahan',
    description: 'Jual gadget di marketplace itu gampang — tapi margin tipis dan brand tidak terbangun. Nauka Gadget butuh toko online sendiri yang bikin customer merasa belanja di tempat resmi.',
    approach: 'E-commerce dengan desain premium, katalog terorganisir, garansi resmi, dan checkout yang ga bikin orang kabur.',
    liveUrl: 'https://naukagadget.vercel.app', image: '/portfolio/nauka-gadget.png', color: '#8b5cf6', featured: false, order: 4, status: 'published',
    createdAt: '2025-03-20T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fp-naukakostay', slug: 'nauka-kostay', client: 'Nauka Kostay',
    category: 'Website Profesional', title: 'Kos yang Dipesan Seperti Hotel — Karena Penghuni Layak Dapat Yang Terbaik',
    description: 'Kost itu bisnis, tapi penghuninya manusia. Kostay butuh kehadiran digital yang bikin calon penghuni merasa dihargai — bukan sekadar lihat foto kamar dan harga.',
    approach: 'Digital hospitality experience: virtual tour, fasilitas yang ditampilkan dengan pride, testimoni penghuni, dan booking flow yang seamless.',
    liveUrl: 'https://nauka-kostay.vercel.app', image: '/portfolio/nauka-kostay.png', color: '#d97706', featured: false, order: 5, status: 'published',
    createdAt: '2025-04-10T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fp-ghazy', slug: 'ghazy', client: 'Ghazy Computer',
    category: 'Sistem Inventory', title: 'Dari Spreadsheet Chaos ke Sistem yang Jalan Sendiri',
    description: 'Bisnis buyback laptop yang berkembang tenggelam dalam spreadsheet. Mereka butuh sistem yang bisa menangani penawaran, tracking barang, pickup, dan pembayaran.',
    approach: 'Web app dengan flow submit barang → evaluasi → penawaran harga → pickup → pembayaran. Semua terlacak dan terorganisir.',
    liveUrl: 'https://ghazycomputer.com', image: '/portfolio/ghazy-computer.png', color: '#e11d48', featured: true, order: 6, status: 'published',
    createdAt: '2025-05-01T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
];

export const fallbackTestimonials: FallbackTestimonial[] = [
  {
    id: 'ft-1', quote: 'Hasilnya jauh melebihi ekspektasi kami. Website yang dibangun bukan cuma bagus dilihat, tapi benar-benar berfungsi untuk menarik dan mengkonversi pelanggan. Prosesnya juga transparan — kami tahu setiap langkah apa yang dikerjakan.',
    author: 'Rizky Pratama', role: 'Marketing Director', company: 'Geely Pluit', featured: true, order: 1, status: 'published',
    createdAt: '2025-03-01T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'ft-2', quote: 'Sistem inventaris yang dibangun Nauka Motion menghemat waktu operasional kami hingga 40%. Akhirnya kami punya data real-time tanpa harus input manual berkali-kali.',
    author: 'Ahmad Fauzi', role: null, company: 'Ghazy Computer', featured: false, order: 2, status: 'published',
    createdAt: '2025-04-01T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'ft-3', quote: 'Dari briefing sampai launch, komunikasinya jelas dan responsif. Kami butuh partner yang ngerti bisnis otomotif — dan mereka memahami kebutuhan dealer seperti kami.',
    author: 'Dewi Santika', role: null, company: 'Mitsubishi Serpong', featured: false, order: 3, status: 'published',
    createdAt: '2025-04-15T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'ft-4', quote: 'Kami udah coba beberapa vendor, tapi cuma Nauka Motion yang bener-bener ngerjain sampai tuntas. Website-nya clean, cepat, dan klien kami langsung percaya sejak pertama kali buka.',
    author: 'Irfan Hakim', role: null, company: 'JasaProtect', featured: false, order: 4, status: 'published',
    createdAt: '2025-05-01T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
];

export const fallbackServices: FallbackService[] = [
  {
    id: 'fs-1', slug: 'website-development', title: 'Website Development', description: 'Website bisnis profesional yang mengkonversi pengunjung jadi pelanggan. Dari dealer otomotif sampai landing page bisnis.',
    icon: 'Globe', features: 'Website sales otomotif,Landing page bisnis,Website profesional,CMS platform', order: 1, status: 'published',
    createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fs-2', slug: 'business-system-development', title: 'Business System', description: 'Sistem operasional yang menggantikan spreadsheet chaos. Inventory, tracking, dan otomasi proses bisnis.',
    icon: 'Database', features: 'Sistem inventory,Sistem operasional,Sistem tracking,Automasi bisnis', order: 2, status: 'published',
    createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fs-3', slug: 'e-commerce', title: 'E-Commerce', description: 'Toko online premium yang bikin customer merasa belanja di tempat resmi, bukan marketplace murahan.',
    icon: 'ShoppingCart', features: 'E-commerce premium,Katalog terorganisir,Garansi resmi,Checkout seamless', order: 3, status: 'published',
    createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fs-4', slug: 'digital-experience', title: 'Digital Experience', description: 'Undangan digital cinematic dan pengalaman digital personal untuk momen spesial.',
    icon: 'Sparkles', features: 'Undangan digital,Pengalaman cinematic,Virtual tour,Digital hospitality', order: 4, status: 'published',
    createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
];
