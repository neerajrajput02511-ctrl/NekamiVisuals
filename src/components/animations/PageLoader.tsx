'use client';

import { useEffect, useState } from 'react';

export function PageLoader() {
  const [hidden, setHidden] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Hide after 2s or when page is ready
    const timer = setTimeout(() => setHidden(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!mounted) return null;

  return (
    <div className={`page-loader ${hidden ? 'hidden' : ''}`} aria-hidden="true">
      <div className="loader-logo">
        <span className="loader-logo-dot" />
        NekamiVisuals
      </div>
      <div className="loader-bar-track">
        <div className="loader-bar" />
      </div>
      <p className="loader-text">Loading</p>
    </div>
  );
}
