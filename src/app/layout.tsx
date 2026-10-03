import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import "./studio.css";
import { getLocale } from "@/lib/server-locale";
import { LocaleProvider } from "@/lib/locale-context";

// Bundled Latin fonts keep builds independent of Google Fonts availability.
const instrumentSans = localFont({
  variable: "--font-body",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/instrument-sans-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/instrument-sans-latin-500-normal.woff2",
      weight: "500",
      style: "normal",
    },
  ],
});
const fraunces = localFont({
  variable: "--font-fraunces",
  display: "swap",
  src: [
    {
      path: "../../public/fonts/fraunces-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../public/fonts/fraunces-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
  ],
});

const SITE_URL = "https://motion.nauka.id";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nauka Motion — Jasa Website & Aplikasi Android",
    template: "%s — Nauka Motion",
  },
  description:
    "Jasa pembuatan website, aplikasi Android, dan sistem bisnis oleh Nauka Motion. Desain sesuai brand, lingkup jelas, dan progres yang bisa Anda tinjau.",
  keywords: [
    "Nauka Motion",
    "jasa pembuatan website",
    "jasa pembuatan aplikasi Android",
    "developer website Jakarta",
    "sistem bisnis custom",
    "website development",
    "web application",
    "business system",
    "e-commerce",
    "UI/UX design",
    "digital product studio Indonesia",
    "Jakarta",
  ],
  authors: [{ name: "Nauka Motion", url: SITE_URL }],
  creator: "Nauka Motion",
  publisher: "Nauka Motion",
  applicationName: "Nauka Motion",
  icons: {
    icon: "/logo-favicon.webp",
    shortcut: "/logo-favicon.webp",
    apple: "/logo-favicon.webp",
  },
  openGraph: {
    title: "Nauka Motion — Jasa Website & Aplikasi Android",
    description:
      "Website, aplikasi Android, dan sistem bisnis yang dibangun sesuai kebutuhan Anda. Jelajahi karya dan diskusikan ide Anda bersama Nauka Motion.",
    url: SITE_URL,
    siteName: "Nauka Motion",
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    images: [
      {
        url: "/ogimage.webp",
        width: 1200,
        height: 630,
        alt: "Nauka Motion — Jasa Website & Aplikasi Android",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nauka Motion — Jasa Website & Aplikasi Android",
    description:
      "Kami mengubah kebutuhan bisnis menjadi produk digital yang bekerja.",
    images: ["/ogimage.webp"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#101716",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  // Inline theme bootstrap — prevents flash, respects stored preference
  const themeBootstrap = `try{var t=localStorage.getItem('nauka-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}`;
  // Inline locale bootstrap — sets <html lang> before paint based on cookie
  const localeBootstrap = `try{var c=document.cookie.split('; ').find(function(x){return x.indexOf('nauka-locale=')===0});var l=c?c.split('=')[1]:'id';document.documentElement.lang=l;}catch(e){}`;
  // Inline hero bootstrap — adds `is-skipped` class before paint if the
  // hero entrance animation has already played this session. This prevents
  // a flash of the intro state on internal navigation. The animation runs
  // only on the first visit per tab session.
  const heroBootstrap = `try{if(sessionStorage.getItem('nauka-hero-played')){document.documentElement.classList.add('is-skipped');}}catch(e){}`;

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script dangerouslySetInnerHTML={{ __html: localeBootstrap }} />
        <script dangerouslySetInnerHTML={{ __html: heroBootstrap }} />
      </head>
      <body
        className={`${instrumentSans.variable} ${fraunces.variable} antialiased bg-background text-foreground`}
      >
        <LocaleProvider initialLocale={locale}>{children}</LocaleProvider>
      </body>
    </html>
  );
}
