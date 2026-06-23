'use client';

import { useEffect, useRef } from 'react';

/**
 * useReveal — adds `is-visible` class to elements with `.fade-up`, `.stagger`,
 * or `.line-mask` classes when they enter the viewport. Also handles `.line-mask`
 * inside headings/blockquotes by triggering reveal on their parent.
 *
 * Bulletproof approach:
 *   1. On mount, force-reveal any target already in viewport (no waiting for IO)
 *   2. Observe remaining targets with IntersectionObserver (threshold: 0)
 *   3. Global fallback after 1.5s — force-reveal anything still hidden
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    let prefersReducedMotion = false;
    try {
      prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    } catch {
      // matchMedia not available — assume motion allowed
    }

    // Collect all reveal targets inside the container
    const targets: HTMLElement[] = [];
    container.querySelectorAll<HTMLElement>('.fade-up, .stagger, .line-mask').forEach((el) => {
      if (!targets.includes(el)) targets.push(el);
    });
    // Also include headings/blockquotes that contain line-masks (trigger parent .is-visible)
    container.querySelectorAll<HTMLElement>('h1, h2, h3, blockquote').forEach((el) => {
      if (el.querySelector('.line-mask') && !targets.includes(el)) targets.push(el);
    });

    if (targets.length === 0) return;

    // Reduced motion: reveal everything immediately
    if (prefersReducedMotion) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    // STEP 1: Force-reveal any target already in viewport on mount
    // (IntersectionObserver initial callback can be delayed or missed)
    const viewportH = window.innerHeight;
    targets.forEach((el) => {
      const rect = el.getBoundingClientRect();
      if (rect.top < viewportH && rect.bottom > 0) {
        el.classList.add('is-visible');
      }
    });

    // STEP 2: Observe remaining hidden targets
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0, rootMargin: '0px 0px -8% 0px' }
    );

    targets.forEach((el) => {
      if (!el.classList.contains('is-visible')) {
        observer.observe(el);
      }
    });

    // STEP 3: Fallback — force-reveal anything still hidden after 1.5s
    // (covers edge cases: IO misbehaving, hydration timing, browser quirks)
    const fallbackTimer = setTimeout(() => {
      targets.forEach((el) => {
        if (!el.classList.contains('is-visible')) {
          el.classList.add('is-visible');
        }
      });
    }, 1500);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return ref;
}
