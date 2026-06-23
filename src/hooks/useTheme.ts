'use client';

import { useEffect, useState, useCallback } from 'react';

type Theme = 'light' | 'dark';

/**
 * useTheme — manages light/dark theme via data-theme attribute on <html>.
 * Persists choice to localStorage. Falls back gracefully in sandboxed envs
 * where localStorage may throw.
 */
export function useTheme() {
  const [theme, setTheme] = useState<Theme>('light');
  const [mounted, setMounted] = useState(false);

  // Initialize from localStorage / system preference on mount
  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem('nauka-theme') as Theme | null;
      if (stored === 'dark' || stored === 'light') {
        setTheme(stored);
        if (stored === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
        }
      } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
        document.documentElement.setAttribute('data-theme', 'dark');
      }
    } catch {
      // localStorage not available — stay on light
    }
  }, []);

  const toggle = useCallback(() => {
    setTheme((prev) => {
      const next: Theme = prev === 'dark' ? 'light' : 'dark';
      try {
        if (next === 'dark') {
          document.documentElement.setAttribute('data-theme', 'dark');
          localStorage.setItem('nauka-theme', 'dark');
        } else {
          document.documentElement.removeAttribute('data-theme');
          localStorage.setItem('nauka-theme', 'light');
        }
      } catch {
        // ignore localStorage errors
      }
      return next;
    });
  }, []);

  return { theme, toggle, mounted };
}
