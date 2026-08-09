"use client";

import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

/**
 * LocaleContext — client-side locale state.
 *
 * Pendekatan SIMPLIFIED (bukan [locale] routing):
 * - Default: "id" (Bahasa Indonesia)
 * - Toggle: "en" (English)
 * - Disimpan di cookie `locale` + localStorage
 * - `<html lang>` diupdate dinamis
 *
 * Komponen yang consume studio-data.ts (yang punya field .id / .en)
 * membaca locale dari sini dan memilih field yang sesuai.
 *
 * Trade-off: URL tetap sama (tidak ada /en prefix). SEO hanya melihat
 * versi ID sebagai canonical. Untuk SEO per-locale URL, perlu setup
 * next-intl [locale] routing (deferred ke Stage 9+).
 */

export type Locale = "id" | "en";

interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
}

const LocaleContext = createContext<LocaleContextValue | null>(null);

const COOKIE_NAME = "nauka-locale";
const STORAGE_KEY = "nauka-locale";

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("id");

  // Initialize from cookie/localStorage on mount
  useEffect(() => {
    const fromCookie = document.cookie
      .split("; ")
      .find((c) => c.startsWith(`${COOKIE_NAME}=`))
      ?.split("=")[1] as Locale | undefined;

    const fromStorage =
      typeof window !== "undefined"
        ? (localStorage.getItem(STORAGE_KEY) as Locale | null)
        : null;

    const initial = fromCookie || fromStorage || "id";
    if (initial === "en" || initial === "id") {
      setLocaleState(initial);
    }
  }, []);

  // Update <html lang> + persist when locale changes
  useEffect(() => {
    document.documentElement.lang = locale;
    localStorage.setItem(STORAGE_KEY, locale);
    // Cookie untuk server-side reading (generateMetadata)
    document.cookie = `${COOKIE_NAME}=${locale}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
  }, [locale]);

  const setLocale = (next: Locale) => setLocaleState(next);
  const toggle = () => setLocaleState((prev) => (prev === "id" ? "en" : "id"));

  return (
    <LocaleContext.Provider value={{ locale, setLocale, toggle }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    // Fallback for components rendered outside provider
    return {
      locale: "id",
      setLocale: () => {},
      toggle: () => {},
    };
  }
  return ctx;
}

/**
 * pickLocal — helper untuk memilih field .id atau .en dari LocalizedText.
 * Untuk komponen client yang consume studio-data.
 */
export function pickLocal<T extends { id: string; en: string }>(
  text: T,
  locale: Locale
): string {
  return locale === "en" ? text.en : text.id;
}
