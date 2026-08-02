"use client";

import { useState, useEffect, useCallback } from "react";

type Theme = "light" | "dark";

/**
 * useTheme — class-based theme toggle.
 * Stores preference in localStorage under `nauka-theme`.
 * Falls back to system preference on first visit.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("nauka-theme") as Theme | null;
      const prefersDark =
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial: Theme = stored ?? (prefersDark ? "dark" : "light");
      setTheme(initial);
      document.documentElement.classList.toggle("dark", initial === "dark");
    } catch (e) {
      // localStorage unavailable — default to light
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme((current) => {
      const next: Theme = current === "dark" ? "light" : "dark";
      try {
        localStorage.setItem("nauka-theme", next);
        document.documentElement.classList.toggle("dark", next === "dark");
      } catch (e) {
        /* ignore */
      }
      return next;
    });
  }, []);

  return { theme, toggle, mounted };
}
