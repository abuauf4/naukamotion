"use client";

import { useEffect, useRef, useState } from "react";

/**
 * useReveal — IntersectionObserver-based scroll reveal.
 * Returns a ref to attach + a boolean for visibility.
 *
 * Usage:
 *   const ref = useReveal<HTMLDivElement>();
 *   <div ref={ref} className="reveal">...</div>
 *
 * The element starts with class `reveal` (opacity 0, translateY 20px)
 * and gains `is-visible` when it enters the viewport.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string; once?: boolean }
) {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          el.classList.add("is-visible");
          if (options?.once !== false) {
            observer.unobserve(el);
          }
        } else if (options?.once === false) {
          setVisible(false);
          el.classList.remove("is-visible");
        }
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? "0px 0px -10% 0px",
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin, options?.once]);

  return ref;
}

/**
 * useRevealMany — same as useReveal but for a list of elements.
 * Returns a callback ref to attach to each element.
 */
export function useRevealMany<T extends HTMLElement = HTMLDivElement>(
  options?: { threshold?: number; rootMargin?: string }
) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: options?.threshold ?? 0.15,
        rootMargin: options?.rootMargin ?? "0px 0px -10% 0px",
      }
    );
    observerRef.current = observer;
    return () => observer.disconnect();
  }, [options?.threshold, options?.rootMargin]);

  const setRef = (el: T | null) => {
    if (el && observerRef.current) {
      observerRef.current.observe(el);
    }
  };

  return setRef;
}
