import type { Metadata, Viewport } from "next";
import { Instrument_Sans, Fraunces, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

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
    default: "Nauka Motion — Independent Digital Product Studio",
    template: "%s — Nauka Motion",
  },
  description:
    "We design and build digital products that move businesses forward. From business platforms and e-commerce to digital identity and storytelling — Nauka Motion unifies strategy, design, and technology into experiences that work.",
  keywords: [
    "Nauka Motion",
    "digital product studio",
    "product strategy",
    "experience design",
    "platform engineering",
    "brand experience",
    "creative technology",
    "Indonesia studio",
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
    title: "Nauka Motion — Independent Digital Product Studio",
    description:
      "We design and build digital products that move businesses forward. Strategy, design, and technology unified into experiences that work.",
    url: SITE_URL,
    siteName: "Nauka Motion",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nauka Motion — Independent Digital Product Studio",
    description:
      "We design and build digital products that move businesses forward.",
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

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body
        className={`${instrumentSans.variable} ${fraunces.variable} ${jetbrainsMono.variable} antialiased bg-background text-foreground`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
