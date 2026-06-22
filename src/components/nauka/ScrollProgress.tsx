'use client';

import { useEffect, useState } from 'react';

/**
 * ScrollProgress — thin top progress bar showing scroll position.
 * Uses transform: scaleX() for GPU-accelerated performance.
 */
export function ScrollProgress() {
  const [ratio, setRatio] = useState(0);

  useEffect(() => {
    const update = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const r = max > 0 ? window.scrollY / max : 0;
      setRatio(r);
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        className="scroll-progress-fill"
        style={{ transform: `scaleX(${ratio})` }}
      />
    </div>
  );
}
