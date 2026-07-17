'use client';

import { useEffect, useRef } from 'react';

export function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);
  const dotRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const ring  = ringRef.current!;
    const dot   = dotRef.current!;
    const label = labelRef.current!;

    let mx = 0, my = 0;
    let rx = 0, ry = 0;

    const lerp = (a: number, b: number, n: number) => a + (b - a) * n;

    const move = (e: MouseEvent) => {
      mx = e.clientX;
      my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    };

    const animate = () => {
      rx = lerp(rx, mx, 0.12);
      ry = lerp(ry, my, 0.12);
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(animate);
    };

    const onEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const cursorEl = target.closest('[data-cursor]') as HTMLElement | null;
      const cursorType = cursorEl?.dataset.cursor ?? '';

      if (cursorType) {
        ring.style.width  = '72px';
        ring.style.height = '72px';
        ring.style.background = 'rgba(255,255,255,0.06)';
        label.textContent = {
          view: 'View',
          play: 'Play',
          listen: 'Listen',
          open: 'Open',
          'view-project': 'View Project',
        }[cursorType] ?? '';
        label.style.opacity = '1';
      } else if (target.closest('button, a, [role="button"]')) {
        ring.style.width  = '52px';
        ring.style.height = '52px';
        ring.style.background = 'rgba(255,255,255,0.04)';
        label.style.opacity = '0';
      }
    };

    const onLeave = () => {
      ring.style.width  = '36px';
      ring.style.height = '36px';
      ring.style.background = 'transparent';
      label.style.opacity = '0';
      label.textContent = '';
    };

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', onEnter);
    document.addEventListener('mouseout', onLeave);
    animate();

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', onEnter);
      document.removeEventListener('mouseout', onLeave);
    };
  }, []);

  return (
    <div className="cursor-wrap" aria-hidden="true">
      <div ref={ringRef} className="cursor-ring" />
      <div ref={dotRef}  className="cursor-dot" />
      <span ref={labelRef} className="cursor-label" />
    </div>
  );
}
