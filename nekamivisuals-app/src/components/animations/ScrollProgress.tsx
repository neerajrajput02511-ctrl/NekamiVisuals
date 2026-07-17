'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function ScrollProgress() {
  const pathname = usePathname();

  useEffect(() => {
    const bar = document.querySelector<HTMLDivElement>('.scroll-progress');
    if (!bar) return;

    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? scrollTop / docHeight : 0;
      bar.style.transform = `scaleX(${progress})`;
    };

    window.addEventListener('scroll', update, { passive: true });
    update();
    return () => window.removeEventListener('scroll', update);
  }, [pathname]);

  return <div className="scroll-progress" aria-hidden="true" />;
}
