-- ============================================
-- Nauka Motion — Supabase Seed Data
-- Run this AFTER schema.sql in Supabase SQL Editor
-- ============================================

-- ══════════════════════════════════════
-- ADMIN USER
-- ══════════════════════════════════════

INSERT INTO admins (id, username, email, password, name) VALUES
  ('admin-1', 'Bagas', 'mochamadbagussuhada@gmail.com', '122333', 'Abu Aufa')
ON CONFLICT (username) DO NOTHING;

-- ══════════════════════════════════════
-- CLIENTS
-- ══════════════════════════════════════

INSERT INTO clients (id, name, industry, website) VALUES
  ('client-mitsubishi', 'Mitsubishi Motor Indonesia', 'Otomotif', 'https://mitsubishi-test.vercel.app'),
  ('client-geely', 'Geely Pluit', 'Otomotif', 'https://elgeelypluit.id'),
  ('client-jasaprotect', 'JasaProtect', 'Asuransi', 'https://jasa-proteksi.vercel.app'),
  ('client-naukagadget', 'Nauka Gadget', 'E-Commerce', 'https://naukagadget.vercel.app'),
  ('client-naukakostay', 'Nauka Kostay', 'Properti', 'https://nauka-kostay.vercel.app'),
  ('client-ghazy', 'Ghazy Computer', 'Teknologi', 'https://ghazycomputer.com')
ON CONFLICT DO NOTHING;

-- ══════════════════════════════════════
-- PROJECTS
-- ══════════════════════════════════════

INSERT INTO projects (id, slug, title, client, category, description, approach, "liveUrl", image, color, featured, "order", status, "clientId", "createdAt", "updatedAt") VALUES
  ('fp-mitsubishi', 'mitsubishi', 'Website Dealer yang Menjual Mobil Sebelum Test Drive', 'Mitsubishi Motor Indonesia', 'Website Profesional',
   'Dealer Mitsubishi butuh lebih dari sekadar katalog digital. Mereka butuh platform yang memperlakukan setiap kendaraan sebagai pengalaman — dari spesifikasi teknis sampai jadwal test drive, semua dalam satu alur yang mengalir.',
   'Inventaris real-time, perbandingan model, kalkulasi kredit, dan jalur langsung ke sales consultant. Setiap halaman dirancang untuk memperkecil jarak antara minat dan keputusan.',
   'https://mitsubishi-test.vercel.app', '/portfolio/mitsubishi.png', '#0d9488', true, 1, 'published', 'client-mitsubishi', '2025-01-15T00:00:00.000Z', '2025-06-01T00:00:00.000Z'),

  ('fp-geely', 'geely-pluit', 'Dealer Listrik yang Menjual Masa Depan, Bukan Sekadar Mobil', 'Geely Pluit', 'Website Profesional',
   'Geely masuk Indonesia sebagai brand EV. Mereka butuh kehadiran digital yang terasa sama modern-nya dengan teknologi yang mereka jual — bukan website dealer konvensional yang terasa 2018.',
   'Custom domain dengan branding yang konsisten, perbandingan model EV, estimasi jarak tempuh, fast-charging info, dan jalur konsultasi sales yang seamless.',
   'https://elgeelypluit.id', '/portfolio/geely-pluit.png', '#2563eb', true, 2, 'published', 'client-geely', '2025-02-10T00:00:00.000Z', '2025-06-01T00:00:00.000Z'),

  ('fp-jasaprotect', 'jasaprotect', 'Platform Asuransi yang Bikin Orang Ngerti Apa yang Mereka Beli', 'JasaProtect', 'Landing Page',
   'Asuransi itu kompleks — terlalu banyak pilihan, terlalu banyak istilah, terlalu sedikit kejelasan. JasaProtect hadir sebagai broker yang membuat memilih asuransi terasa mudah, bukan membingungkan.',
   'Interface perbandingan transparan, penjelasan dalam bahasa sehari-hari, dan alur pemilihan terpandu.',
   'https://jasa-proteksi.vercel.app', '/portfolio/jasaprotect.png', '#6366f1', false, 3, 'published', 'client-jasaprotect', '2025-03-05T00:00:00.000Z', '2025-06-01T00:00:00.000Z'),

  ('fp-naukagadget', 'nauka-gadget', 'Toko Gadget yang Terasa Premium, Bukan Marketplace Murahan', 'Nauka Gadget', 'E-Commerce',
   'Jual gadget di marketplace itu gampang — tapi margin tipis dan brand tidak terbangun. Nauka Gadget butuh toko online sendiri yang bikin customer merasa belanja di tempat resmi.',
   'E-commerce dengan desain premium, katalog terorganisir, garansi resmi, dan checkout yang ga bikin orang kabur.',
   'https://naukagadget.vercel.app', '/portfolio/nauka-gadget.png', '#8b5cf6', false, 4, 'published', 'client-naukagadget', '2025-03-20T00:00:00.000Z', '2025-06-01T00:00:00.000Z'),

  ('fp-naukakostay', 'nauka-kostay', 'Kos yang Dipesan Seperti Hotel — Karena Penghuni Layak Dapat Yang Terbaik', 'Nauka Kostay', 'Website Profesional',
   'Kost itu bisnis, tapi penghuninya manusia. Kostay butuh kehadiran digital yang bikin calon penghuni merasa dihargai — bukan sekadar lihat foto kamar dan harga.',
   'Digital hospitality experience: virtual tour, fasilitas yang ditampilkan dengan pride, testimoni penghuni, dan booking flow yang seamless.',
   'https://nauka-kostay.vercel.app', '/portfolio/nauka-kostay.png', '#d97706', false, 5, 'published', 'client-naukakostay', '2025-04-10T00:00:00.000Z', '2025-06-01T00:00:00.000Z'),

  ('fp-ghazy', 'ghazy', 'Dari Spreadsheet Chaos ke Sistem yang Jalan Sendiri', 'Ghazy Computer', 'Sistem Inventory',
   'Bisnis buyback laptop yang berkembang tenggelam dalam spreadsheet. Mereka butuh sistem yang bisa menangani penawaran, tracking barang, pickup, dan pembayaran.',
   'Web app dengan flow submit barang → evaluasi → penawaran harga → pickup → pembayaran. Semua terlacak dan terorganisir.',
   'https://ghazycomputer.com', '/portfolio/ghazy-computer.png', '#e11d48', true, 6, 'published', 'client-ghazy', '2025-05-01T00:00:00.000Z', '2025-06-01T00:00:00.000Z')
ON CONFLICT (slug) DO NOTHING;

-- ══════════════════════════════════════
-- SERVICES
-- ══════════════════════════════════════

INSERT INTO services (id, slug, title, summary, icon, features, "order", status) VALUES
  ('fs-1', 'website-development', 'Website Development', 'Website bisnis profesional yang mengkonversi pengunjung jadi pelanggan. Dari dealer otomotif sampai landing page bisnis.', 'Globe', 'Website sales otomotif,Landing page bisnis,Website profesional,CMS platform', 1, 'published'),
  ('fs-2', 'business-system-development', 'Business System', 'Sistem operasional yang menggantikan spreadsheet chaos. Inventory, tracking, dan otomasi proses bisnis.', 'Database', 'Sistem inventory,Sistem operasional,Sistem tracking,Automasi bisnis', 2, 'published'),
  ('fs-3', 'e-commerce', 'E-Commerce', 'Toko online premium yang bikin customer merasa belanja di tempat resmi, bukan marketplace murahan.', 'ShoppingCart', 'E-commerce premium,Katalog terorganisir,Garansi resmi,Checkout seamless', 3, 'published'),
  ('fs-4', 'digital-experience', 'Digital Experience', 'Undangan digital cinematic dan pengalaman digital personal untuk momen spesial.', 'Sparkles', 'Undangan digital,Pengalaman cinematic,Virtual tour,Digital hospitality', 4, 'published')
ON CONFLICT (slug) DO NOTHING;

-- ══════════════════════════════════════
-- TESTIMONIALS
-- ══════════════════════════════════════

INSERT INTO testimonials (id, quote, author, role, company, featured, "order", status, "projectId") VALUES
  ('ft-1', 'Hasilnya jauh melebihi ekspektasi kami. Website yang dibangun bukan cuma bagus dilihat, tapi benar-benar berfungsi untuk menarik dan mengkonversi pelanggan. Prosesnya juga transparan — kami tahu setiap langkah apa yang dikerjakan.', 'Rizky Pratama', 'Marketing Director', 'Geely Pluit', true, 1, 'published', 'fp-geely'),
  ('ft-2', 'Sistem inventaris yang dibangun Nauka Motion menghemat waktu operasional kami hingga 40%. Akhirnya kami punya data real-time tanpa harus input manual berkali-kali.', 'Ahmad Fauzi', NULL, 'Ghazy Computer', false, 2, 'published', 'fp-ghazy'),
  ('ft-3', 'Dari briefing sampai launch, komunikasinya jelas dan responsif. Kami butuh partner yang ngerti bisnis otomotif — dan mereka memahami kebutuhan dealer seperti kami.', 'Dewi Santika', NULL, 'Mitsubishi Serpong', false, 3, 'published', 'fp-mitsubishi'),
  ('ft-4', 'Kami udah coba beberapa vendor, tapi cuma Nauka Motion yang bener-bener ngerjain sampai tuntas. Website-nya clean, cepat, dan klien kami langsung percaya sejak pertama kali buka.', 'Irfan Hakim', NULL, 'JasaProtect', false, 4, 'published', 'fp-jasaprotect')
ON CONFLICT DO NOTHING;

-- ══════════════════════════════════════
-- SETTINGS
-- ══════════════════════════════════════

INSERT INTO settings (key, value) VALUES
  ('site_name', 'Nauka Motion'),
  ('tagline', 'Small Movement. Real Impact.'),
  ('headline', 'Membangun Produk Digital Dengan Arah Yang Jelas'),
  ('subtitle', 'Dari website bisnis, sistem operasional, hingga pengalaman digital yang membantu bisnis bertumbuh.'),
  ('whatsapp', '6281234567890'),
  ('email', 'hello@naukamotion.id'),
  ('founder', 'Abu Aufa'),
  ('stats_projects', '30+'),
  ('stats_services', '7'),
  ('stats_industries', '5'),
  ('seo_title', 'Nauka Motion — Small Movement. Real Impact.'),
  ('seo_description', 'Studio digital yang membangun produk dengan arah jelas. Website, sistem, dan pengalaman digital yang menciptakan dampak nyata.')
ON CONFLICT (key) DO NOTHING;
