import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { LocaleProvider } from "@/lib/locale-context";

/* ━━ Nauka Motion — Studio Typography ━━
 * Instrument Sans  — body & interface
 * Fraunces         — editorial display (variable: opsz + SOFT)
 * JetBrains Mono   — technical labels, code, indices
 */

const instrumentSans = Instrument_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

const SITE_URL = "https://motion.nauka.id";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Nauka Motion — Studio Produk Digital",
    template: "%s — Nauka Motion",
  },
  description:
    "Nauka Motion menggabungkan desain, teknologi, dan pemecahan masalah untuk membangun website, platform, dan sistem digital di berbagai industri.",
  keywords: [
    "Nauka Motion",
    "studio produk digital",
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
    icon: "/logo.svg",
  },
  openGraph: {
    title: "Nauka Motion — Studio Produk Digital",
    description:
      "Kami mengubah kebutuhan bisnis menjadi produk digital yang bekerja. Website, platform, dan sistem digital di berbagai industri.",
    url: SITE_URL,
    siteName: "Nauka Motion",
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nauka Motion — Studio Produk Digital",
    description:
      "Kami mengubah kebutuhan bisnis menjadi produk digital yang bekerja.",
  },
  alternates: {
    canonical: SITE_URL,
    languages: {
      "id-ID": SITE_URL,
      "en-US": `${SITE_URL}/en`,
    },
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
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F3F0E9" },
    { media: "(prefers-color-scheme: dark)", color: "#0E0D0C" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inline theme bootstrap — prevents flash, respects stored preference
  const themeBootstrap = `try{var t=localStorage.getItem('nauka-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.classList.add('dark');}}catch(e){}`;
  // Inline locale bootstrap — sets <html lang> before paint based on cookie
  const localeBootstrap = `try{var c=document.cookie.split('; ').find(function(x){return x.indexOf('nauka-locale=')===0});var l=c?c.split('=')[1]:'id';document.documentElement.lang=l;}catch(e){}`;

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
        <script dangerouslySetInnerHTML={{ __html: localeBootstrap }} />
      </head>
      <body
        className={`${instrumentSans.variable} ${fraunces.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        <LocaleProvider>
          {children}
        </LocaleProvider>
        <Toaster />
      </body>
    </html>
  );
}
