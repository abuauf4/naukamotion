# Nauka Motion — Audit Repo & Implementation Plan

Tanggal audit: 2026-08-09
Branch: `main` (commit `61e2a92`)

## 1. Struktur Repo yang Ditemukan

```
naukamotion/
├── next.config.ts          # ignoreBuildErrors: true, reactStrictMode: false
├── middleware.ts           # JWT-only admin guard (no i18n routing)
├── prisma/schema.prisma    # 9 models (Admin, Lead, Project, Service, Insight, Testimonial, Client, Faq, Setting)
├── db/custom.db            # SQLite, 9 tabel, 0 baris (kosong)
├── .env                    # DATABASE_URL=file:./dev.db  (file TIDAK ADA — mismatch dengan db/custom.db)
│                           # JWT_SECRET hardcoded = "nauka-motion-admin-secret-2026"
│                           # Supabase env semua kosong
├── supabase/schema.sql     # Skema Supabase (tidak dipakai krn env kosong)
├── supabase/seed.sql       # Seed data Supabase
├── Caddyfile               # Port 81 → 3000 reverse proxy
├── examples/websocket/     # Sampel kode WebSocket (tidak terintegrasi, bisa dihapus)
├── download/               # Screenshot lama + JSON analisis (bukan kode, bisa dihapus dari repo)
└── src/
    ├── app/
    │   ├── layout.tsx              # html lang="en" (SALAH — default harus ID)
    │   ├── page.tsx                # Homepage — pakai design system baru (warm-paper)
    │   ├── globals.css             # HANYA define warm-paper system (--ink/--paper/--burnt)
    │   ├── work/page.tsx           # /work — pakai design baru, baca studio-data.ts
    │   ├── work/[slug]/page.tsx    # Case study — pakai design baru
    │   ├── about/page.tsx          # PAKAI DESIGN LAMA (--nauka-* vars, TIDAK DIDEFINISIKAN → BROKEN)
    │   ├── contact/page.tsx        # PAKAI DESIGN LAMA — BROKEN
    │   ├── services/page.tsx       # PAKAI DESIGN LAMA — BROKEN
    │   ├── services/[slug]/page.tsx# PAKAI DESIGN LAMA — BROKEN
    │   ├── insights/page.tsx       # PAKAI DESIGN LAMA — BROKEN + 3 artikel hardcoded
    │   ├── insights/[slug]/page.tsx# PAKAI DESIGN LAMA — BROKEN
    │   ├── faq/page.tsx            # PAKAI DESIGN LAMA — BROKEN + fetch /api/public/faqs
    │   ├── legal/privacy/page.tsx  # PAKAI DESIGN LAMA — BROKEN
    │   ├── legal/terms/page.tsx    # PAKAI DESIGN LAMA — BROKEN
    │   ├── admin/*                 # Admin panel (login, projects, insights, testimonials, leads, settings, services, clients, faq) — TIDAK DIROMBAK (bukan prioritas public)
    │   └── api/
    │       ├── public/*            # 6 route: projects, insights, testimonials, services, faqs, settings — semua fallback ke fallback-data.ts
    │       ├── admin/*             # CRUD untuk admin panel
    │       ├── leads/route.ts      # Form submission endpoint
    │       └── route.ts            # Health check
    ├── components/
    │   ├── nauka/*.tsx (11 file)   # HeroSection, SelectedWorkSection, StudioManifestSection, CapabilitiesSection, ServicesSection, ProcessSection, InsightsSection, FounderSection, ContactCTASection, Footer, Header, ScrollProgress — semua pakai warm-paper design
    │   └── ui/*.tsx (50+ file)     # shadcn components
    ├── lib/
    │   ├── studio-data.ts          # 1071 baris, 6 StudioProject + 5 StudioService (NEW design source)
    │   ├── fallback-data.ts        # 147 baris, 6 FallbackProject + 4 FallbackTestimonial + 4 FallbackService (OLD shape, dipakai /api/public/*)
    │   ├── db.ts                   # Prisma client
    │   ├── supabase.ts             # Supabase clients (env kosong → semua query gagal)
    │   ├── auth.ts                 # JWT auth helper
    │   └── utils.ts                # cn() helper
    └── hooks/use-toast.ts, use-mobile.ts, useReveal.ts, useScrollReveal.ts, useTheme.ts
```

## 2. Yang Akan Dipertahankan

✅ **Visual homepage terbaru (warm-paper design)**:
- Palette: ink #111, paper #F3F0E9, burnt #D85A2A, stone #B8B3AA, lime #C8E641
- Typography: Instrument Sans (body) + Fraunces italic (display) + JetBrains Mono (label)
- Layout utilities: `.container-wide`, `.eyebrow`, `.studio-h2/h3`, `.nmp-btn`, `.nmp-tag`, `.nmp-index`, `.nmp-link-arrow`
- Motion: `.reveal` classes, `nmp-*` keyframes, `useReveal` hook
- Light + dark theme via `.dark` class

✅ **Struktur App Router Next.js 16 + React 19 + Tailwind v4**

✅ **Komponen `src/components/nauka/*.tsx`** (11 file) — sudah pakai design baru

✅ **Halaman yang sudah pakai design baru**: `/`, `/work`, `/work/[slug]`

✅ **Prisma schema** — model Project, Service, Insight, Testimonial, Client, Faq, Lead, Setting, Admin cukup lengkap

✅ **Admin panel** — tidak dirombak (bukan prioritas public)

✅ **API leads** — endpoint form submission, biarkan apa adanya

## 3. Yang Akan Dihapus/Diubah

### ❌ Dihapus total
1. `examples/websocket/` — sampel tidak terpakai
2. `download/` folder di root repo — screenshot lama + JSON analisis, bukan kode
3. `src/lib/fallback-data.ts` — 4 testimonial FABRIKASI (Rizky Pratama, Ahmad Fauzi, Dewi Santika, Irfan Hakim) + claim "40% improvement" → dihapus
4. Testimonial hardcoded di mana pun → hapus semua (lebih baik tidak ada testimonial daripada palsu)
5. `studio-data.ts` baris yang berisi claim fabricated:
   - Line 164: "shortened the sales cycle and improved lead quality"
   - Line 226: "Webhook → CRM + internal queue"
   - Line 269: "LCP < 2.5s on mid-tier Android / 4G"
   - Line 276: "Lead quality, measured by close rate, improved materially within the first two months"
   - Line 703: "Test-drive bookings replaced phone-call bookings"
   - Line 708: "Sales conversation length reduced for EV buyers"
6. **Seluruh case study Anima Companion** (line 444-560) — hapus narasi AI/memory/conversation

### 🔄 Dirombak besar
1. **Data model portfolio** — single source of truth di `src/lib/studio-data.ts`:
   - Tambah field `status: "draft" | "internal" | "published"`
   - Tambah field `categorySlug` (automotive, technology-retail, insurance-finance, product-brand, travel-tourism, nauka-labs)
   - Tambah field `liveUrl` untuk SEMUA project
   - Tambah field `techStack: string[]`
   - Tambah field `caseStudy: { problem, solution, result, techStack, liveUrl }` (format BARU, bukan 10 blocks lama)
   - Hapus field `services: string[]` yang ambigu (ganti `techStack`)
   - Hapus field `featured` (tidak diperlukan — kategori sudah cukup)
2. **Daftar project** — ganti dengan project REAL yang sudah live:
   - **Automotive**: Geely BSD, Suzuki Jakarta Barat, Mitsubishi, JAECOO
   - **Technology & Retail**: Berkah Komputer, Ghazy Computer, Jakarta Laptops
   - **Insurance & Finance**: Jasa Proteksi
   - **Product & Consumer Brand**: Anima Companion
   - **Travel & Tourism**: Let's Go Karimun
   - **Nauka Labs**: Jejak Cahaya, Nauka Tech, Inventra, Nauka Kostay, Nauka Gadget, Booking Club (status: internal)
3. **Homepage** — rombak hierarchy:
   - Hapus `SelectedWorkSection` (konsep "Selected Work — 06")
   - Tambah `StatsSection` (50+ / 10+ / 6)
   - Tambah `CategorySection` (6 big editorial cards)
   - Hero copy: "Kami mengubah kebutuhan bisnis menjadi produk digital yang bekerja"
   - Urutan: Hero → Stats → Kategori → Capabilities → Process → About → Insights (opsional) → CTA → Footer
4. **Halaman kategori baru**: `/work/[category]` (contoh `/work/automotive`) — menampilkan semua project dalam kategori
5. **Case study page** — ganti 10 blocks lama dengan 5 section: Masalah, Solusi, Hasil, Technology, Live Website
6. **Header** — tambah language switch ID | EN
7. **Layout root** — `html lang` dinamis berdasarkan locale, OG locale dinamis
8. **9 halaman lama** (about, contact, services, services/[slug], insights, insights/[slug], faq, legal/*) — rewrite pakai warm-paper design system
9. **next.config.ts** — `ignoreBuildErrors: false`, `reactStrictMode: true`
10. **middleware.ts** — hapus JWT hardcoded fallback; tambahkan matcher untuk next-intl
11. **next-intl setup**:
    - Buat `src/i18n/routing.ts` (defineLocale, locales, defaultLocale)
    - Buat `src/i18n/request.ts` (getRequestConfig)
    - Buat `messages/id.json` + `messages/en.json`
    - Refactor `src/app/*` → `src/app/[locale]/*`
    - Update `middleware.ts` dengan `createMiddleware` dari next-intl
12. **Sitemap**: tambah `src/app/sitemap.ts`
13. **robots.txt**: tambah `Sitemap: https://motion.nauka.id/sitemap.xml`
14. **`.env`**: fix `DATABASE_URL=file:./db/custom.db` (atau hapus custom.db dan biar prisma bikin dev.db)

### 🧹 Dibersihkan (low risk)
- `tailwind.config.ts` — Tailwind v4 pakai `@theme inline` di globals.css, config ini tidak terpakai; biarkan saja (tidak merusak)
- `src/lib/supabase.ts` — biarkan, mungkin dipakai admin
- `src/app/api/public/*` — biarkan, mungkin masih dipakai oleh halaman lama sebelum dirombak

## 4. Implementation Plan (bertahap, commit per stage)

### Stage 1: Data layer cleanup ✅ PRIORITAS
- Tulis ulang `src/lib/studio-data.ts` dengan model baru:
  - `categories`: 6 kategori dengan slug, title (EN), deskripsi (ID+EN)
  - `projects`: 12+ project real dengan `status`, `categorySlug`, `liveUrl`, `techStack`, `caseStudy { problem, solution, result, techStack, liveUrl }`
- Hapus `src/lib/fallback-data.ts` (atau kosongkan testimonials section)
- Commit + push

### Stage 2: Homepage restructure
- Tulis ulang `src/app/page.tsx` urutan baru
- Buat `StatsSection.tsx` baru (50+/10+/6)
- Buat `CategorySection.tsx` baru (6 big editorial cards, link ke `/work/[category]`)
- Update `HeroSection.tsx` copy ID + CTA "Lihat Kategori" + "Mulai Proyek"
- Hapus `SelectedWorkSection` dari homepage
- Update `Header.tsx` nav: Kategori / Layanan / Studio / Insights / Kontak
- Commit + push

### Stage 3: Category pages
- Buat `src/app/work/[category]/page.tsx` — list project dalam kategori
- Update `src/app/work/page.tsx` — redirect atau landing untuk semua kategori
- Commit + push

### Stage 4: Project case study (format baru)
- Rewrite `src/app/work/[slug]/page.tsx`:
  - 5 section: Masalah, Solusi, Hasil, Technology, Live Website
  - Hapus 10 blocks lama
  - Breadcrumb: Home → Category → Project
- Commit + push

### Stage 5: Perbaiki case study spesifik
- **Jasa Proteksi**: rewrite dengan fakta "14.000+ data kendaraan, kalkulator premi otomatis berdasarkan merek/tipe/tahun"
- **Anima Companion**: rewrite sebagai consumer/pet product brand (HAPUS semua narasi AI)
- Commit + push

### Stage 6: Bilingual ID/EN
- Setup next-intl:
  - `src/i18n/routing.ts`, `src/i18n/request.ts`
  - `messages/id.json`, `messages/en.json`
- Refactor `src/app/*` → `src/app/[locale]/*`
- Update `middleware.ts` dengan next-intl matcher
- Update `layout.tsx` — `html lang` dinamis
- Tambah ID | EN switch di Header
- Commit + push

### Stage 7: Design system unification
- Rewrite 9 halaman lama pakai warm-paper:
  - `/about`, `/contact`, `/services`, `/services/[slug]`
  - `/insights`, `/insights/[slug]`
  - `/faq`, `/legal/privacy`, `/legal/terms`
- Commit + push

### Stage 8: Technical cleanup
- `next.config.ts`: `ignoreBuildErrors: false`, `reactStrictMode: true`
- `middleware.ts`: hapus JWT hardcoded fallback (ganti dengan env-required)
- `.env`: fix DATABASE_URL path
- Tambah `src/app/sitemap.ts`
- Update `public/robots.txt` dengan Sitemap directive
- Pastikan metadata, canonical, OG locale per locale
- Build test → fix TS errors
- Commit + push

### Stage 9 (opsional): Mobile + final QA
- Audit mobile layout di semua halaman
- Hapus dead code (examples/, download/, duplikat data)
- Final build + commit + push

## 5. Catatan Penting

- **JANGAN hapus** project internal (Inventra, Nauka Kostay, Nauka Gadget, Booking Club) dari source — cukup set `status: "internal"` agar tidak tampil di public portfolio
- **JANGAN mengarang** angka performa, close rate, conversion rate, revenue impact
- **Stats homepage**: 50+ project & eksperimen / 10+ live / 6 kategori (transparent wording)
- **Bahasa default**: Bahasa Indonesia di `/`, English di `/en`
- **Setelah setiap stage**: `bun run build` → commit → push ke `main`
