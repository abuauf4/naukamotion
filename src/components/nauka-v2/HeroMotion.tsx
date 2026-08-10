/**
 * HeroMotion — small client island that animates the hero headline
 * letter-mask reveal ONCE on first paint.
 *
 * V2 design principle: motion is decoration, not gatekeeper.
 * The hero headline is rendered server-side with full text. This
 * component only triggers the CSS mask reveal animation — it does
 * NOT block or replace the text content. If JS is disabled or
 * hydration fails, the headline is still visible (CSS sets initial
 * state but `prefers-reduced-motion` + fallback CSS ensures visibility).
 *
 * Animation:
 *   - Each `.nauka-hero-line` gets a clip-path mask that animates from
 *     inset(0 100% 0 0) → inset(0 0 0 0) over 0.8s
 *   - Three lines stagger by 80ms each
 *   - Total reveal: 0.8 + 0.16 = ~1s
 *
 * Reduced-motion: the CSS in globals.css disables all `.reveal` and
 * hero animations, content appears immediately.
 */
"use client";

import { useEffect, type ReactNode } from "react";

export function HeroMotion({ children }: { children: ReactNode }) {
  useEffect(() => {
    // Trigger the CSS animation by adding a class to <html> or body.
    // The actual animation is defined in globals.css under
    // .nauka-hero-line — but it requires `is-visible` to play.
    const lines = document.querySelectorAll<HTMLElement>(".nauka-hero-line");
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      lines.forEach((line) => line.classList.add("is-visible"));
      return;
    }
    // Stagger reveal
    lines.forEach((line, i) => {
      window.setTimeout(() => {
        line.classList.add("is-visible");
      }, 100 + i * 80);
    });
  }, []);

  return <>{children}</>;
}
