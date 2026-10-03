# Nauka Motion — website & aplikasi

Pembaruan: 3 Oktober 2026.

Situs diposisikan sebagai studio developer independen yang menjual jasa website, aplikasi Android, dan sistem bisnis. Identitas Nauka Motion serta portofolio dari CMS tetap digunakan.

## Hasil

- Desain charcoal, off-white, dan orange, dengan tipografi Instrument Sans dan Fraunces yang dibundel lokal.
- Homepage menghubungkan layanan, karya, alasan bekerja bersama Nauka, proses pengerjaan, FAQ, dan diskusi proyek.
- Showcase hero memakai screenshot JAECOO MAM Fatmawati dan NaCash Household yang diberikan pemilik, dengan proporsi asli dan aset WebP lokal. Pemilihan showcase hero tidak bergantung pada urutan proyek unggulan CMS.
- Halaman layanan menjelaskan keluaran proyek; halaman portofolio, kategori, detail proyek, studio, dan kontak memakai sistem visual yang sama.
- NaCash mendapat halaman produk internal dengan screenshot asli aplikasi Fashion, berlabel data contoh.
- Navigasi mobile, tautan lompat ke konten, fokus keyboard, reduced motion, dan pergantian bahasa Indonesia/Inggris.
- Form brief memvalidasi input dan menyimpan ke model `Lead` yang sudah ada. Respons sukses hanya dikirim setelah database berhasil menyimpan.
- Saat penyimpanan gagal, isi form tetap tersedia dan seluruh brief dapat dilanjutkan ke WhatsApp.
- Inbox `/admin/leads` menampilkan 100 brief terbaru, rincian kebutuhan, dan tautan tindak lanjut email/WhatsApp. Akses memerlukan sesi admin.
- Metadata, canonical, sitemap NaCash, bahasa HTML dari server, dan deduplikasi pembacaan CMS per request.

## Masalah yang diperbaiki

- Pesan sukses form yang tidak membuktikan brief sudah tersimpan.
- Penolakan kiriman sah ketika hostname internal Next.js berbeda dari header Host browser.
- Ketergantungan build terhadap unduhan font Google.
- Script start yang mengacu ke output standalone tanpa konfigurasi standalone.
- Sinkronisasi awal bahasa yang bisa menimpa pilihan pengguna.
- Klaim analytics yang belum dikonfigurasi pada halaman privasi.

## Verifikasi

| Pemeriksaan | Hasil |
| --- | --- |
| `bun install --frozen-lockfile` | Lulus; `bun.lock` tidak diubah |
| `npm run build` | Lulus, termasuk pemeriksaan TypeScript |
| ESLint pada seluruh kode yang diubah | Lulus |
| `bun run test:leads` | 6 tes lulus, 18 assertion |
| 12 route × 4 ukuran layar | 48 pemeriksaan lulus |
| Ukuran layar | 1440, 768, 390, dan 320 px |
| Overflow horizontal, gambar rusak, error JavaScript | Tidak ditemukan pada pemeriksaan browser |
| Menu mobile, Escape, ID/EN, pilihan bahasa setelah reload | Lulus |
| Layanan dari query string, form gagal, data tetap tersedia, tautan WA | Lulus |
| Tampilan sukses dengan respons API 201 | Lulus melalui respons yang disimulasikan |
| Inbox tanpa sesi admin | Dialihkan ke login |

Rincian: [browser-checks.json](browser-checks.json).

## Sumber data dan batas verifikasi

Preview browser menggunakan `CMS_DATA_SOURCE=static` secara eksplisit. Produksi tetap memakai database Neon sebagai sumber portofolio, dengan perilaku error yang terlihat jika database tidak tersedia. Data, status proyek, dan cover CMS produksi tidak ditulis ulang. Cover lama pada data fallback masih perlu diganti dengan screenshot proyek yang sesuai jika mode fallback akan digunakan untuk publikasi.

Tes penyimpanan berhasil menggunakan mock Prisma. Browser menguji kegagalan penyimpanan nyata dengan database lokal yang sengaja tidak tersedia dan sukses UI dengan respons 201 yang disimulasikan. Penyimpanan pada database produksi dan inbox dengan sesi admin produksi belum diuji karena kredensial produksi tidak tersedia di workspace.

Gunakan konfigurasi produksi yang sudah ada: `DATABASE_URL`, `DIRECT_URL`, dan `JWT_SECRET`, serta konfigurasi Cloudinary untuk unggahan CMS. Tidak ada perubahan schema atau migrasi database dalam pembaruan ini. Jangan mengaktifkan mode static untuk menggantikan CMS produksi.

Kontak utama dipusatkan di `src/lib/studio-offering.ts` memakai nomor WhatsApp dan email yang sudah tercantum dalam repo. Biaya, jadwal, dukungan, dan serah terima mengikuti kesepakatan lingkup proyek; tidak ada angka hasil bisnis atau testimonial baru yang dibuat.

## Preview

Screenshot berikut berasal dari build produksi lokal dengan data CMS fallback.

- [Homepage desktop](previews/home-desktop.webp)
- [Homepage mobile](previews/home-mobile.webp)
- [Layanan mobile](previews/services-mobile.webp)
- [Kontak mobile](previews/contact-mobile.webp)

## Status deployment saat pembaruan hero

Commit relaunch `53f6e33` sudah berada di `main`, namun GitHub belum menampilkan status Vercel untuk commit itu. Penulis GitHub serta email author/committer sesuai dengan commit terdahulu yang berhasil deploy; keduanya menggunakan commit unsigned.

Konektor Vercel tidak dapat membaca proyek di scope `naukacreativedigital-1948s-projects`: API mengembalikan `403 Not authorized`. Karena itu, koneksi Git, riwayat build terbaru, serta pemicu deploy otomatis belum dapat diverifikasi melalui konektor. Ini merupakan batas akses pemeriksaan, bukan bukti penyebab kegagalan autodeploy.

Jika perlu memicu build dari akun pemilik, buka proyek `naukamotion` → Deployments → Create Deployment dan pilih branch `main` atau SHA commit terbaru. Cara ini membuat deployment dari kode terbaru; menu Redeploy pada deployment lama membangun ulang commit deployment lama. Panduan resmi: <https://vercel.com/docs/git#creating-a-deployment-from-a-git-reference>.
