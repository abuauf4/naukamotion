import type { Locale } from "./server-locale";

export const studioContact = {
  phone: "6289662524542",
  email: "info@nauka.id",
  instagram: "https://www.instagram.com/naukamotion/",
};

export function whatsappUrl(
  message = "Halo Nauka Motion, saya ingin diskusi tentang pembuatan website atau aplikasi.",
) {
  return `https://wa.me/${studioContact.phone}?text=${encodeURIComponent(message)}`;
}

export const offerings = [
  {
    id: "website",
    number: "01",
    icon: "web",
    title: { id: "Website yang menjual.", en: "A website that sells." },
    short: { id: "Website & landing page", en: "Websites & landing pages" },
    description: {
      id: "Bantu calon pelanggan memahami bisnis Anda, melihat produk, dan menghubungi Anda dengan mudah.",
      en: "Help customers understand your business, explore your products, and get in touch with ease.",
    },
    examples: {
      id: "Company profile · Website sales · Katalog produk",
      en: "Company profiles · Sales websites · Product catalogs",
    },
    includes: {
      id: [
        "Desain sesuai identitas bisnis",
        "Tampilan mobile, tablet, dan desktop",
        "Struktur konten & SEO dasar",
        "Form atau koneksi WhatsApp",
      ],
      en: [
        "Design tailored to your brand",
        "Mobile, tablet, and desktop layouts",
        "Content structure & foundational SEO",
        "Contact forms or WhatsApp integration",
      ],
    },
  },
  {
    id: "android",
    number: "02",
    icon: "app",
    title: { id: "Aplikasi yang berguna.", en: "An app people use." },
    short: { id: "Aplikasi Android", en: "Android apps" },
    description: {
      id: "Wujudkan ide menjadi aplikasi yang nyaman dipakai, dengan fitur yang mengikuti cara pengguna bekerja.",
      en: "Turn your idea into a usable application with features that fit the way people work.",
    },
    examples: {
      id: "Kasir · Pencatatan keuangan · Aplikasi operasional",
      en: "Point of sale · Finance tracking · Operational apps",
    },
    includes: {
      id: [
        "Alur & antarmuka aplikasi",
        "Fitur sesuai kebutuhan",
        "Mode online atau offline sesuai lingkup",
        "Pengujian & berkas instalasi Android",
      ],
      en: [
        "Application flow & interface",
        "Features tailored to your needs",
        "Online or offline operation as scoped",
        "Testing & Android installation files",
      ],
    },
  },
  {
    id: "system",
    number: "03",
    icon: "system",
    title: { id: "Sistem yang bekerja.", en: "A system that works." },
    short: { id: "Sistem bisnis & web app", en: "Business systems & web apps" },
    description: {
      id: "Rapikan pekerjaan yang masih tersebar di chat dan spreadsheet menjadi satu alur yang mudah dikelola.",
      en: "Bring work scattered across chats and spreadsheets into one manageable workflow.",
    },
    examples: {
      id: "Inventory · Dashboard · Booking · Administrasi",
      en: "Inventory · Dashboards · Booking · Administration",
    },
    includes: {
      id: [
        "Pemetaan alur kerja bisnis",
        "Dashboard & pengelolaan data",
        "Role pengguna sesuai lingkup",
        "Integrasi & laporan sesuai kebutuhan",
      ],
      en: [
        "Business workflow mapping",
        "Dashboards & data management",
        "User roles as scoped",
        "Integrations & reports as needed",
      ],
    },
  },
] as const;

export const deliverySteps = [
  {
    number: "01",
    title: { id: "Ceritakan kebutuhan.", en: "Tell us what you need." },
    description: {
      id: "Kita bahas tujuan, pengguna, fitur utama, dan anggaran yang tersedia.",
      en: "We discuss your goals, users, essential features, and available budget.",
    },
    result: { id: "Brief & arah proyek", en: "Project brief & direction" },
  },
  {
    number: "02",
    title: { id: "Sepakati rencana.", en: "Agree on the plan." },
    description: {
      id: "Lingkup, biaya, jadwal, dan hasil akhir dirinci sebelum pengerjaan dimulai.",
      en: "Scope, costs, schedule, and deliverables are defined before development begins.",
    },
    result: { id: "Penawaran & lingkup kerja", en: "Proposal & scope of work" },
  },
  {
    number: "03",
    title: { id: "Lihat progresnya.", en: "Follow the progress." },
    description: {
      id: "Tinjau desain dan coba versi pengembangan. Masukan dibahas di setiap tahap.",
      en: "Review the design and try the development version. Feedback is discussed at each stage.",
    },
    result: { id: "Desain & versi uji", en: "Design & test version" },
  },
  {
    number: "04",
    title: { id: "Siap digunakan.", en: "Ready to use." },
    description: {
      id: "Pengujian, publikasi atau instalasi, lalu panduan penggunaan dan serah terima.",
      en: "Testing, publication or installation, followed by a usage guide and handover.",
    },
    result: { id: "Produk & serah terima", en: "Product & handover" },
  },
] as const;

export const salesFaqs = [
  {
    question: {
      id: "Belum punya gambaran teknis, bisa mulai?",
      en: "Can I start without a technical brief?",
    },
    answer: {
      id: "Bisa. Ceritakan bisnis Anda, kendala yang ingin diselesaikan, dan contoh yang Anda sukai. Dari sana kita susun fitur serta lingkup yang masuk akal.",
      en: "Yes. Tell us about your business, the problem you want to solve, and examples you like. We will work together to define a sensible scope and feature set.",
    },
  },
  {
    question: {
      id: "Berapa biaya pembuatan website atau aplikasi?",
      en: "How much does a website or application cost?",
    },
    answer: {
      id: "Biaya mengikuti jumlah halaman, fitur, integrasi, dan kebutuhan pengelolaan. Setelah kebutuhan jelas, Anda mendapat penawaran dengan rincian lingkup. Domain, hosting, dan layanan pihak ketiga dibahas terpisah bila diperlukan.",
      en: "Costs depend on pages, features, integrations, and management requirements. Once your needs are clear, you receive a scoped proposal. Domains, hosting, and third-party services are discussed separately when needed.",
    },
  },
  {
    question: {
      id: "Berapa lama pengerjaannya?",
      en: "How long will the project take?",
    },
    answer: {
      id: "Jadwal ditentukan setelah lingkup, materi, dan fitur disepakati. Website sederhana dan aplikasi dengan sistem khusus memiliki kebutuhan waktu yang berbeda. Target serta tahapan pengerjaan ditulis dalam penawaran.",
      en: "The schedule is set after scope, content, and features are agreed. A simple website and a custom application require different timelines. Milestones and the target delivery date are documented in the proposal.",
    },
  },
  {
    question: {
      id: "Bisa mengelola konten sendiri?",
      en: "Can I manage the content myself?",
    },
    answer: {
      id: "Bisa jika dashboard atau CMS masuk dalam lingkup proyek. Kita tentukan bagian yang perlu Anda kelola, misalnya produk, artikel, galeri, atau data operasional, lalu siapkan panduan penggunaannya.",
      en: "Yes, when a dashboard or CMS is included in the scope. We define what you need to manage, such as products, articles, galleries, or operational data, and provide a usage guide.",
    },
  },
  {
    question: {
      id: "Aplikasi bisa dipakai tanpa internet?",
      en: "Can an application work without internet?",
    },
    answer: {
      id: "Bisa untuk kebutuhan tertentu. Jika data perlu terhubung antar pengguna atau perangkat, arsitekturnya kita bahas sejak awal. NaCash adalah contoh produk Nauka dengan fungsi utama yang berjalan offline.",
      en: "Yes, for suitable use cases. If data needs to be shared across users or devices, we discuss the architecture from the start. NaCash is a Nauka product with core functions that work offline.",
    },
  },
  {
    question: {
      id: "Setelah selesai, bagaimana dukungannya?",
      en: "What happens after the project is delivered?",
    },
    answer: {
      id: "Panduan, akses, berkas yang diserahkan, periode perbaikan, serta opsi maintenance disepakati dalam lingkup kerja. Kebutuhan fitur baru dapat dibahas sebagai pengembangan lanjutan.",
      en: "Guides, access, handover files, the correction period, and maintenance options are agreed in the scope of work. New features can be discussed as further development.",
    },
  },
] as const;

export function projectBriefUrl(type: string, locale: Locale = "id") {
  return whatsappUrl(
    locale === "id"
      ? `Halo Nauka Motion, saya ingin konsultasi untuk ${type}.`
      : `Hello Nauka Motion, I would like to discuss ${type}.`,
  );
}
