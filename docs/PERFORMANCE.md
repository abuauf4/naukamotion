# Audit performa — 3 Oktober 2026

Halaman publik mengirim gambar CMS dalam ukuran asli karena `unoptimized`.
Homepage juga menunggu query portfolio, mengambil seluruh proyek featured,
dan memuat Sonner walaupun tidak memakai notifikasi. Header memakai blur GPU
saat scroll. Listing portfolio mengambil cerita, teknologi, dan galeri yang
tidak dirender pada card.

Perbaikan:

- Custom image loader memakai ukuran responsif, format otomatis, dan kualitas
  otomatis dari CDN Cloudinary. Tidak memakai `/_next/image` Vercel.
- Gambar lokal memiliki varian WebP 320–1280 px, dibuat dengan
  `node scripts/build-image-variants.mjs`. File asli tetap tersedia.
- Hero dirender melalui server tanpa menunggu bagian portfolio (Suspense).
- Query featured dibatasi tiga proyek dan dicache 60 detik. Pemanggilan
  `revalidatePath` admin yang sudah ada tetap menginvalidasi cache halaman.
- Listing mengambil satu cover tanpa relasi cerita, teknologi, atau galeri.
  Halaman detail tetap mengambil cerita lengkap.
- Sonner yang tidak dipakai dikeluarkan dari layout publik; blur header dihapus.
- Cover portfolio tetap menggunakan `contain`, sehingga tidak terpotong.

## Pengukuran lokal

Production build dengan fixture static eksplisit, viewport 390×844, DPR 2,
simulasi jaringan 1,6 Mbps/latensi 150 ms dan CPU 4× lebih lambat. Satu cold run
per route; bukan Core Web Vitals produksi dan bukan hasil database Neon live.

| Metrik | Sebelum | Sesudah |
| --- | ---: | ---: |
| Gambar awal homepage | 234.630 B | 76.578 B |
| Gambar awal /work | 705.392 B | 154.616 B |
| JavaScript gzip homepage | 148.463 B | 139.320 B |
| LCP homepage simulasi | 2.920 ms | 1.452 ms |

Build dan TypeScript lulus. ESLint pada semua file yang diubah lulus.
11 tes dengan 27 assertion lulus, termasuk URL Cloudinary versioned,
transformasi berantai, signed URL, dan alur brief proyek.
48 pemeriksaan browser pada 12 route dan empat viewport lulus, tanpa
overflow, gambar rusak, atau error JavaScript; menu, ID/EN dan form tetap aman.
Rincian pengukuran dan pemeriksaan: `performance-checks.json`.

Tidak ada perubahan data CMS atau schema. Proyek Bakau tetap dikelola lewat
admin. Kecepatan database produksi dan ukuran unggahan terbaru perlu dinilai
dengan pengukuran jaringan produksi; audit lokal tidak mengklaim nilainya.
