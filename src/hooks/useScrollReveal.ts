'use client';

import { useRef, useEffect, useCallback } from 'react';

/**
 * useScrollReveal — Phase 7 Motion
 *
 * Uses Intersection Observer to add a `scroll-revealed` CSS class
 * when an element enters the viewport. Only triggers once (unobserves
 * after reveal) to satisfy the "no infinite animations" rule.
 *
 * Respects `prefers-reduced-motion: reduce` by skipping observation
 * entirely — elements start in their revealed state (handled via CSS).
 *
 * Usage:
 *   const ref = useScrollReveal();
 *   return <div ref={ref} className="scroll-reveal">...</div>;
 *
 * With options:
 *   const ref = useScrollReveal({ threshold: 0.2, rootMargin: '0px' });
 */

interface ScrollRevealOptions {
  /** Intersection Observer threshold (0-1). Default: 0.15 */
  threshold?: number;
  /** Intersection Observer rootMargin. Default: '0px 0px -50px 0px' */
  rootMargin?: string;
}

export function useScrollReveal(options: ScrollRevealOptions = {}) {
  const { threshold = 0.15, rootMargin = '0px 0px -50px 0px' } = options;
  const elementRef = useRef<HTMLElement | null>(null);

  const callbackRef = useCallback(
    (node: HTMLElement | null) => {
      // Cleanup previous observer if element changes
      if (elementRef.current && elementRef.current._scrollRevealObserver) {
        elementRef.current._scrollRevealObserver.disconnect();
      }

      elementRef.current = node;

      if (!node) return;

      // Respect prefers-reduced-motion: skip observation, leave element
      // in its default state (CSS will force opacity: 1)
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)'
      ).matches;

      if (prefersReducedMotion) {
        node.classList.add('scroll-revealed');
        return;
      }

      // If already revealed (e.g. SSR hydration), don't re-observe
      if (node.classList.contains('scroll-revealed')) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('scroll-revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold, rootMargin }
      );

      observer.observe(node);

      // Store observer for cleanup
      (node as HTMLElement & { _scrollRevealObserver?: IntersectionObserver })._scrollRevealObserver = observer;
    },
    [threshold, rootMargin]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (
        elementRef.current &&
        (elementRef.current as HTMLElement & { _scrollRevealObserver?: IntersectionObserver })._scrollRevealObserver
      ) {
        (elementRef.current as HTMLElement & { _scrollRevealObserver?: IntersectionObserver })._scrollRevealObserver!.disconnect();
      }
    };
  }, []);

  return callbackRef;
}
