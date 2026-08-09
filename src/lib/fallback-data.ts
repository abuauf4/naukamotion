/**
 * Fallback Data — Used by /api/public/* when database is empty or unavailable
 *
 * NOTE: This file is being phased out. The single source of truth is now
 * `studio-data.ts`. API routes that still reference this file will be
 * migrated to read from studio-data.ts directly.
 *
 * Testimonials have been REMOVED — they were fabricated and the studio
 * policy is "no testimonial is better than fake testimonial".
 * If you need testimonials, populate them via the admin panel with
 * real, verifiable quotes from real clients.
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

// Empty array — testimonials removed (were fabricated).
// Populate via admin panel with real client quotes if needed.
export const fallbackTestimonials: never[] = [];

export const fallbackProjects: FallbackProject[] = [
  {
    id: 'fp-geely-bsd', slug: 'geely-bsd', client: 'Geely BSD',
    category: 'Automotive', title: 'Geely BSD',
    description: 'Website dealer resmi Geely BSD dengan domain kustom, katalog unit, simulasi kredit, dan jalur konsultasi sales.',
    approach: 'Domain kustom, branding konsisten, katalog unit lengkap, simulasi kredit, jalur sales langsung.',
    liveUrl: 'https://geely-bsd.com', image: '/portfolio/geely-pluit.png', color: '#2563eb', featured: true, order: 1, status: 'published',
    createdAt: '2025-01-15T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fp-suzuki-jakbar', slug: 'suzuki-jakbar', client: 'Suzuki Jakarta Barat',
    category: 'Automotive', title: 'Suzuki Jakarta Barat',
    description: 'Website dealer Suzuki Jakarta Barat dengan katalog unit, simulasi kredit, dan sistem lead terintegrasi.',
    approach: 'Platform autodealer.id, katalog lengkap, simulasi kredit, lead form ke CRM.',
    liveUrl: 'https://suzukijakbar.autodealer.id', image: '/portfolio/mitsubishi.png', color: '#0d9488', featured: true, order: 2, status: 'published',
    createdAt: '2025-02-10T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fp-mitsubishi', slug: 'mitsubishi', client: 'Mitsubishi Dealer',
    category: 'Automotive', title: 'Mitsubishi',
    description: 'Website dealer Mitsubishi dengan katalog unit, simulasi kredit, dan sistem lead management.',
    approach: 'Platform autodealer.id, katalog lengkap, simulasi kredit real-time, jalur sales.',
    liveUrl: 'https://mitsubishi.autodealer.id', image: '/portfolio/mitsubishi.png', color: '#0d9488', featured: true, order: 3, status: 'published',
    createdAt: '2025-01-15T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fp-jaecoo', slug: 'jaecoo', client: 'JAECOO Dealer',
    category: 'Automotive', title: 'JAECOO',
    description: 'Website dealer JAECOO dengan katalog unit dan jalur konsultasi sales.',
    approach: 'Platform autodealer.id, katalog JAECOO, branding konsisten, jalur sales.',
    liveUrl: 'https://jaecoo.autodealer.id', image: '/portfolio/mitsubishi.png', color: '#4a4742', featured: true, order: 4, status: 'published',
    createdAt: '2025-02-15T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fp-berkah', slug: 'berkah-komputer', client: 'Berkah Komputer',
    category: 'Technology & Retail', title: 'Berkah Komputer',
    description: 'Toko komputer online dengan katalog produk, checkout, dan manajemen stok.',
    approach: 'E-commerce dengan katalog per kategori, pencarian, keranjang, checkout, dashboard admin.',
    liveUrl: 'https://berkahkomputer.id', image: '/portfolio/ghazy-computer.png', color: '#2563eb', featured: true, order: 5, status: 'published',
    createdAt: '2025-03-20T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fp-ghazy', slug: 'ghazy-computer', client: 'Ghazy Computer',
    category: 'Technology & Retail', title: 'Ghazy Computer',
    description: 'Sistem buyback laptop dengan alur submit, evaluasi, penawaran harga, dan pickup.',
    approach: 'Web app dengan flow submit, evaluasi, penawaran otomatis, pickup, pembayaran.',
    liveUrl: 'https://ghazycomputer.com', image: '/portfolio/ghazy-computer.png', color: '#e11d48', featured: true, order: 6, status: 'published',
    createdAt: '2025-05-01T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fp-jakarta-laptops', slug: 'jakarta-laptops', client: 'Jakarta Laptops',
    category: 'Technology & Retail', title: 'Jakarta Laptops',
    description: 'Toko laptop online dengan katalog produk dan checkout.',
    approach: 'E-commerce dengan katalog per brand, pencarian, detail produk, checkout.',
    liveUrl: 'https://jakartalaptops.com', image: '/portfolio/ghazy-computer.png', color: '#8b5cf6', featured: true, order: 7, status: 'published',
    createdAt: '2025-05-15T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fp-jasaproteksi', slug: 'jasa-proteksi', client: 'Jasa Proteksi',
    category: 'Insurance & Finance', title: 'Jasa Proteksi',
    description: 'Platform kalkulator premi asuransi kendaraan berbasis database 14.000+ data kendaraan.',
    approach: 'Kalkulator premi otomatis berdasarkan merek, tipe, tahun. Engine perhitungan terpisah dari UI.',
    liveUrl: 'https://jasa-proteksi.vercel.app', image: '/portfolio/jasaprotect.png', color: '#6366f1', featured: true, order: 8, status: 'published',
    createdAt: '2025-03-05T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fp-anima', slug: 'anima-companion', client: 'Anima Companion',
    category: 'Product & Consumer Brand', title: 'Anima Companion',
    description: 'Brand produk konsumen dengan pengalaman digital yang berhadapan langsung dengan konsumen.',
    approach: 'Website brand, halaman detail produk, storytelling, CTA ke kanal pembelian.',
    liveUrl: null, image: '/portfolio/jasaprotect.png', color: '#8b5cf6', featured: true, order: 9, status: 'published',
    createdAt: '2025-04-01T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fp-karimun', slug: 'lets-go-karimun', client: "Let's Go Karimun",
    category: 'Travel & Tourism', title: "Let's Go Karimun",
    description: 'Website destinasi wisata Karimun dengan informasi paket tour dan kontak.',
    approach: 'Halaman destinasi, paket tour, galeri, CTA booking via WhatsApp/form.',
    liveUrl: null, image: '/portfolio/jasaprotect.png', color: '#0d9488', featured: true, order: 10, status: 'published',
    createdAt: '2025-04-15T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
];

export const fallbackServices: FallbackService[] = [
  {
    id: 'fs-1', slug: 'website-development', title: 'Website Development',
    description: 'Website bisnis profesional yang mengkonversi pengunjung jadi pelanggan. Dari dealer otomotif sampai landing page bisnis.',
    icon: 'Globe', features: 'Website sales otomotif,Landing page bisnis,Website profesional,CMS platform', order: 1, status: 'published',
    createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fs-2', slug: 'business-system', title: 'Business System',
    description: 'Sistem operasional yang menggantikan spreadsheet chaos. Inventory, tracking, dan otomasi proses bisnis.',
    icon: 'Database', features: 'Sistem inventory,Sistem operasional,Sistem tracking,Automasi bisnis', order: 2, status: 'published',
    createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fs-3', slug: 'e-commerce', title: 'E-Commerce & Catalog',
    description: 'Toko online premium dengan katalog terorganisir, checkout, dan dashboard admin.',
    icon: 'ShoppingCart', features: 'E-commerce premium,Katalog terorganisir,Checkout seamless,Dashboard admin', order: 3, status: 'published',
    createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
  {
    id: 'fs-4', slug: 'ui-ux-design', title: 'UI/UX & Product Design',
    description: 'Desain antarmuka dan pengalaman produk yang berfokus pada kejelasan dan konversi.',
    icon: 'Sparkles', features: 'Information architecture,Wireframe & prototype,Design system,Interaction design', order: 4, status: 'published',
    createdAt: '2025-01-01T00:00:00.000Z', updatedAt: '2025-06-01T00:00:00.000Z',
  },
];
