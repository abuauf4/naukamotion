"use client";

import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

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

export function LocaleProvider({
  children,
  initialLocale = "id",
}: {
  children: ReactNode;
  initialLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  useEffect(() => {
    setLocaleState(initialLocale);
    document.documentElement.lang = initialLocale;
  }, [initialLocale]);

  const setLocale = (next: Locale) => {
    setLocaleState(next);
    document.documentElement.lang = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
      document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=${60 * 60 * 24 * 365}; samesite=lax`;
    } catch {
      /* Language remains usable when storage is unavailable. */
    }
  };
  const toggle = () => setLocale(locale === "id" ? "en" : "id");

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
  locale: Locale,
): string {
  return locale === "en" ? text.en : text.id;
}
