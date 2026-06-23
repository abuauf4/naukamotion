import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Fraunces } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

/* ━━ Font Pairing Strategy (v2 — Ink & Code concept) ━━
 * Fraunces (variable, opsz + SOFT axis) — display & headings
 * Inter — body text
 * JetBrains Mono — code blocks, technical labels, numerals
 */

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Abu Aufa — Product Systems Architect & Creative Director",
  description:
    "Saya membangun sistem digital yang punya struktur kuat dan makna yang jelas — dari narasi sejarah hingga platform enterprise.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FAFAF8" },
    { media: "(prefers-color-scheme: dark)", color: "#14110F" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const setJsClass = `document.documentElement.classList.add('js');`;
  const applyTheme = `try{var t=localStorage.getItem('nauka-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}`;
  const globalFallback = `setTimeout(function(){try{document.querySelectorAll('.fade-up:not(.is-visible), .stagger:not(.is-visible), .line-mask:not(.is-visible)').forEach(function(el){el.classList.add('is-visible');});document.querySelectorAll('h1:not(.is-visible), h2:not(.is-visible), h3:not(.is-visible), blockquote:not(.is-visible)').forEach(function(el){if(el.querySelector('.line-mask')){el.classList.add('is-visible');}});}catch(e){}},2500);`;

  return (
    <html lang="id" suppressHydrationWarning>
      <head />
      <body
        className={`${fraunces.variable} ${bodyFont.variable} ${monoFont.variable} antialiased bg-background text-foreground`}
      >
        <script dangerouslySetInnerHTML={{ __html: setJsClass + applyTheme + globalFallback }} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
