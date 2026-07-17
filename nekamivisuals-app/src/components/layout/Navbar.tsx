'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { cn } from '@/lib/utils';

const navLinks = [
  { label: 'Home',         href: '/' },
  { label: 'Work',         href: '/work' },
  { label: 'Voice',        href: '/voice' },
  { label: 'Design',       href: '/design' },
  { label: 'Achievements', href: '/achievements' },
  { label: 'Contact',      href: '/contact' },
];

export function Navbar() {
  const pathname    = usePathname();
  const [scrolled,  setScrolled]  = useState(false);
  const [hidden,    setHidden]    = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    const handle = () => {
      const y = window.scrollY;
      setScrolled(y > 40);
      setHidden(y > lastY.current && y > 120);
      lastY.current = y;
    };
    window.addEventListener('scroll', handle, { passive: true });
    return () => window.removeEventListener('scroll', handle);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  // Escape key
  useEffect(() => {
    const handle = (e: KeyboardEvent) => { if (e.key === 'Escape') setMobileOpen(false); };
    document.addEventListener('keydown', handle);
    return () => document.removeEventListener('keydown', handle);
  }, []);

  // Lock body when mobile open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const isAdmin = pathname.startsWith('/admin');
  if (isAdmin) return null;

  return (
    <>
      <header
        className={cn(
          'fixed top-6 left-0 right-0 z-50 transition-all duration-400 ease-out-expo',
          scrolled
            ? 'glass border border-border/50 py-4 mx-6 rounded-2xl'
            : 'bg-transparent h-[72px] flex items-center',
          hidden && !mobileOpen && '-translate-y-[calc(100%+24px)]'
        )}
        role="banner"
      >
        <div className="container flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 font-semibold text-sm tracking-tight group" aria-label="NekamiVisuals Home">
            <span className="w-1.5 h-1.5 rounded-full bg-white group-hover:scale-150 transition-transform duration-300" />
            NekamiVisuals
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Primary navigation">
            {navLinks.map(link => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-250',
                  pathname === link.href || (link.href !== '/' && pathname.startsWith(link.href))
                    ? 'text-text'
                    : 'text-text-3 hover:text-text-2'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right */}
          <div className="flex items-center gap-8">
            <Link
              href="/contact"
              className="hidden md:inline-flex items-center justify-center gap-1.5 h-[52px] px-[28px] text-xs font-semibold tracking-wider uppercase border border-border rounded-full hover:border-border-hover hover:bg-white/5 transition-all duration-250"
            >
              Hire Me
            </Link>

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden w-8 h-8 flex flex-col items-center justify-center gap-1.5"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
            >
              <span className={cn('block w-5 h-px bg-text transition-all duration-300', mobileOpen && 'rotate-45 translate-y-[5px]')} />
              <span className={cn('block w-5 h-px bg-text transition-all duration-300', mobileOpen && 'opacity-0')} />
              <span className={cn('block w-5 h-px bg-text transition-all duration-300', mobileOpen && '-rotate-45 -translate-y-[5px]')} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      <div
        className={cn(
          'fixed inset-0 z-40 bg-bg/98 backdrop-blur-xl flex flex-col transition-all duration-400 ease-out-expo',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="container flex flex-col h-full pt-28 pb-12">
          <nav className="flex flex-col gap-2 flex-1" aria-label="Mobile navigation">
            {navLinks.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-4xl font-semibold tracking-tight py-3 border-b border-border/50 transition-colors duration-250',
                  pathname === link.href ? 'text-text' : 'text-text-3 hover:text-text'
                )}
                style={{ transitionDelay: mobileOpen ? `${i * 50}ms` : '0ms' }}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-4 mt-8">
            <Link href="/contact" className="btn-primary text-center py-3">
              Hire Me →
            </Link>
            <p className="text-2xs text-text-3 tracking-wider uppercase text-center">©2026 NekamiVisuals</p>
          </div>
        </div>
      </div>
    </>
  );
}
