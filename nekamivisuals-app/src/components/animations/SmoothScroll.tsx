'use client';

import { useEffect, useRef } from 'react';

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let lenis: any;

    async function initLenis() {
      try {
        const { default: Lenis } = await import('lenis');
        lenis = new Lenis({
          duration: 1.35,
          easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          smoothWheel: true,
          wheelMultiplier: 1,
          touchMultiplier: 1.5,
        });

        function raf(time: number) {
          lenis.raf(time);
          requestAnimationFrame(raf);
        }
        requestAnimationFrame(raf);
        (window as any).__lenis = lenis;
      } catch {
        // Lenis not available, fall back to native scroll
      }
    }

    initLenis();
    return () => lenis?.destroy();
  }, []);

  return <div ref={wrapRef}>{children}</div>;
}
