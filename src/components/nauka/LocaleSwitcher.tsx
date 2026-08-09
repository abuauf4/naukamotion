"use client";

import { useLocale } from "@/lib/locale-context";

/**
 * LocaleSwitcher — toggle ID | EN.
 *
 * Tampil di Header. Klik untuk switch antara Bahasa Indonesia dan English.
 * Locale disimpan di cookie + localStorage (lihat locale-context.tsx).
 */
export function LocaleSwitcher() {
  const { locale, setLocale } = useLocale();

  return (
    <div
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: "0",
        border: "1px solid var(--line-strong)",
        borderRadius: "999px",
        padding: "2px",
        background: "transparent",
      }}
    >
      <button
        onClick={() => setLocale("id")}
        aria-label="Bahasa Indonesia"
        aria-pressed={locale === "id"}
        style={{
          padding: "4px 10px",
          border: "none",
          background: locale === "id" ? "var(--ink)" : "transparent",
          color: locale === "id" ? "var(--paper)" : "var(--ink-soft)",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.66rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderRadius: "999px",
          cursor: "pointer",
          transition: "background 0.2s ease, color 0.2s ease",
          lineHeight: 1.4,
        }}
      >
        ID
      </button>
      <button
        onClick={() => setLocale("en")}
        aria-label="English"
        aria-pressed={locale === "en"}
        style={{
          padding: "4px 10px",
          border: "none",
          background: locale === "en" ? "var(--ink)" : "transparent",
          color: locale === "en" ? "var(--paper)" : "var(--ink-soft)",
          fontFamily: "var(--font-mono), monospace",
          fontSize: "0.66rem",
          letterSpacing: "0.1em",
          textTransform: "uppercase",
          borderRadius: "999px",
          cursor: "pointer",
          transition: "background 0.2s ease, color 0.2s ease",
          lineHeight: 1.4,
        }}
      >
        EN
      </button>
    </div>
  );
}
