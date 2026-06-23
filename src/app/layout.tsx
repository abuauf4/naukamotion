import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Instrument_Serif } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

/* ━━ Font Pairing Strategy ━━
 * Clash Display (display/headings) — loaded via Fontshare <link> in <head>
 * Instrument Serif (italic accents) — loaded via next/font
 * Inter (body) — loaded via next/font
 * JetBrains Mono (numbers, code accents) — loaded via next/font
 */

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

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
  weight: ["400"],
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Nauka Motion — Produk Digital Dengan Arah Yang Jelas",
  description:
    "Dari website bisnis, sistem operasional, hingga pengalaman digital yang membantu bisnis bertumbuh.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Inline scripts run BEFORE React hydration, so the .js class is set
  // before any CSS hides content via .js .fade-up { opacity: 0 }
  const setJsClass = `document.documentElement.classList.add('js');`;
  const applyTheme = `try{var t=localStorage.getItem('nauka-theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme:dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}`;
  // Global safety net: force-reveal anything still hidden after 2.5s
  // (covers edge cases where useReveal hook doesn't run for some sections)
  const globalFallback = `setTimeout(function(){try{document.querySelectorAll('.fade-up:not(.is-visible), .stagger:not(.is-visible), .line-mask:not(.is-visible)').forEach(function(el){el.classList.add('is-visible');});document.querySelectorAll('h1:not(.is-visible), h2:not(.is-visible), h3:not(.is-visible), blockquote:not(.is-visible)').forEach(function(el){if(el.querySelector('.line-mask')){el.classList.add('is-visible');}});}catch(e){}},2500);`;

  return (
    <html lang="id" suppressHydrationWarning>
      <head>
        {/* Clash Display from Fontshare (free, not on Google Fonts) */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${bodyFont.variable} ${monoFont.variable} ${instrumentSerif.variable} antialiased bg-background text-foreground`}
      >
        {/* Inline scripts at body start — runs before paint, after CSS loads */}
        <script dangerouslySetInnerHTML={{ __html: setJsClass + applyTheme + globalFallback }} />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
