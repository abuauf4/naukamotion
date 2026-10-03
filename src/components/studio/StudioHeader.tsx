"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/lib/locale-context";

export function StudioHeader() {
  const { locale, setLocale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const nav =
    locale === "id"
      ? [
          { label: "Karya", href: "/work" },
          { label: "Layanan", href: "/services" },
          { label: "Cara kerja", href: "/#proses" },
          { label: "Studio", href: "/about" },
        ]
      : [
          { label: "Work", href: "/work" },
          { label: "Services", href: "/services" },
          { label: "Process", href: "/#proses" },
          { label: "Studio", href: "/about" },
        ];

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  function switchLanguage() {
    setLocale(locale === "id" ? "en" : "id");
    router.refresh();
  }

  return (
    <header className="nm-header">
      <a className="nm-skip" href="#main-content">
        {locale === "id" ? "Lewati ke konten" : "Skip to content"}
      </a>
      <div className="nm-container nm-header-inner">
        <Link
          href="/"
          className="nm-logo"
          aria-label="Nauka Motion — Home"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/logo-navbar-transparent.png"
            alt="Nauka Motion"
            width={768}
            height={265}
            sizes="155px"
            priority
          />
        </Link>
        <nav
          className="nm-desktop-nav"
          aria-label={locale === "id" ? "Navigasi utama" : "Main navigation"}
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={pathname === item.href ? "page" : undefined}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="nm-header-actions">
          <button
            className="nm-locale"
            type="button"
            onClick={switchLanguage}
            aria-label={
              locale === "id"
                ? "Switch to English"
                : "Ganti ke Bahasa Indonesia"
            }
          >
            {locale.toUpperCase()}
          </button>
          <Link
            href="/contact"
            className="nm-button nm-button-small nm-header-cta"
          >
            {locale === "id" ? "Diskusi proyek" : "Let's talk"}
          </Link>
          <button
            ref={menuButton}
            className="nm-menu-trigger"
            type="button"
            aria-expanded={open}
            aria-controls="nm-mobile-nav"
            aria-label={open ? "Tutup menu" : "Buka menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="nm-mobile-nav"
          className="nm-mobile-nav nm-container"
          aria-label="Mobile navigation"
        >
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          <Link
            className="nm-button"
            href="/contact"
            onClick={() => setOpen(false)}
          >
            {locale === "id" ? "Diskusi proyek" : "Let's talk"}
          </Link>
        </nav>
      )}
    </header>
  );
}
