'use client';

import { useEffect, useRef } from 'react';

/**
 * useReveal — adds `is-visible` class to elements with `.fade-up`, `.stagger`,
 * or `.line-mask` classes when they enter the viewport. Also handles `.line-mask`
 * inside headings/blockquotes by triggering reveal on their parent.
 *
 * Use this hook for the new motion system (post-redesign-developer-theme).
 * The old `useScrollReveal` hook is kept for back-compat.
 *
 * Usage:
 *   const containerRef = useReveal();
 *   return <div ref={containerRef}>...content with .fade-up, .stagger, .line-mask...</div>;
 *
 * The hook observes the container and triggers reveal on any matching descendants.
 * Call once on the outermost container that wraps reveal targets.
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
    container.querySelectorAll<HTMLElement>('.fade-up, .stagger, .line-mask').forEach((el) => targets.push(el));
    // Also include headings/blockquotes that contain line-masks (trigger parent .is-visible)
    container.querySelectorAll<HTMLElement>('h1, h2, h3, blockquote').forEach((el) => {
      if (el.querySelector('.line-mask')) targets.push(el);
    });

    if (prefersReducedMotion) {
      targets.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    // Mark any already-visible targets immediately (above-the-fold content)
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

    targets.forEach((el) => observer.observe(el));

    // Fallback: force-show anything still hidden after 1.8s
    const fallbackTimer = setTimeout(() => {
      targets.forEach((el) => {
        if (!el.classList.contains('is-visible')) {
          el.classList.add('is-visible');
        }
      });
    }, 1800);

    return () => {
      observer.disconnect();
      clearTimeout(fallbackTimer);
    };
  }, []);

  return ref;
}
