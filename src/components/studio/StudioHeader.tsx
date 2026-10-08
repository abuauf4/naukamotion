"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useLocale } from "@/lib/locale-context";
import { AnimatePresence, m, useReducedMotion } from "framer-motion";

export function StudioHeader() {
  const { locale, setLocale } = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
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
            aria-label={
              locale === "id"
                ? open
                  ? "Tutup menu"
                  : "Buka menu"
                : open
                  ? "Close menu"
                  : "Open menu"
            }
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      <AnimatePresence initial={false}>
        {open && (
          <m.nav
            key="mobile-navigation"
            id="nm-mobile-nav"
            className="nm-mobile-nav nm-container"
            aria-label={
              locale === "id" ? "Navigasi mobile" : "Mobile navigation"
            }
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{
              height: 0,
              opacity: 0,
              transition: { duration: reduce ? 0 : 0.2 },
            }}
            transition={{ duration: reduce ? 0 : 0.3 }}
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
          </m.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
