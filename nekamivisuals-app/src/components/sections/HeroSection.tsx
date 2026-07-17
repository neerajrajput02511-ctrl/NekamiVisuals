'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useEffect, useRef } from 'react';

export function HeroSection() {
  const headRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    if (!headRef.current) return;
    // Simple stagger reveal
    const words = headRef.current.querySelectorAll('.hero-word');
    words.forEach((word, i) => {
      (word as HTMLElement).style.transitionDelay = `${i * 80}ms`;
      setTimeout(() => {
        (word as HTMLElement).classList.add('revealed');
      }, 100 + i * 80);
    });
  }, []);

  const headingWords = 'Creating Visual Stories That Leave an Impression.'.split(' ');

  return (
    <section
      className="min-h-screen flex flex-col justify-end relative overflow-hidden pt-24"
      aria-label="Hero"
    >
      {/* Background subtle grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.03]"
        aria-hidden="true"
        style={{
          backgroundImage: 'linear-gradient(rgba(255,255,255,.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.4) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle, rgba(255,255,255,0.02) 0%, transparent 70%)' }}
      />

      {/* Main content */}
      <div className="container relative z-10 pb-24">
        <div className="max-w-[900px]">
          <p className="section-label mb-8 animate-fadeIn">
            Neeraj Singh · NekamiVisuals
          </p>

          <h1
            ref={headRef}
            className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tightest leading-none mb-10"
            style={{ fontFamily: 'var(--font-sans)' }}
          >
            {headingWords.map((word, i) => (
              <span
                key={i}
                className="hero-word inline-block mr-[0.2em] last:mr-0 opacity-0 translate-y-6 transition-all duration-700 ease-out-expo"
                style={{ display: 'inline-block' }}
              >
                {word}
              </span>
            ))}
          </h1>

          <p className="text-base md:text-lg text-text-2 max-w-xl leading-relaxed mb-10 animate-fadeIn" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
            NekamiVisuals helps creators, brands and businesses elevate their content through
            cinematic video editing, professional voice artistry and impactful graphic design.
          </p>

          <div className="flex items-center gap-4 flex-wrap animate-fadeIn" style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-white text-bg text-sm font-semibold rounded-full hover:bg-white/90 active:scale-[0.98] transition-all duration-250"
            >
              Explore Work →
            </Link>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border border-border text-sm font-medium hover:border-border-hover hover:bg-white/5 transition-all duration-250"
            >
              Hire Me
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute right-0 bottom-0 flex flex-col items-center gap-3" aria-hidden="true">
          <div className="h-12 w-px bg-border overflow-hidden">
            <div className="h-full w-full animate-scrollLine bg-white/30" />
          </div>
          <span className="text-2xs text-text-3 tracking-widest uppercase rotate-90 origin-center translate-x-4">Scroll</span>
        </div>
      </div>

      {/* Services labels at bottom */}
      <div className="border-t border-border/50">
        <div className="container">
          <div className="grid grid-cols-3 divide-x divide-border/50">
            {['Video Editing', 'Voice Artist', 'Graphic Design'].map(s => (
              <div key={s} className="py-4 text-center text-2xs font-semibold tracking-widest uppercase text-text-3">
                {s}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedWorkCard({ thumbnail, title, category, href }: {
  thumbnail: string; title: string; category: string; href: string;
}) {
  return (
    <Link href={href} className="group block" data-cursor="view-project">
      <div className="relative rounded-xl overflow-hidden aspect-video mb-3 border border-border">
        <Image src={thumbnail} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
      </div>
      <p className="text-2xs text-text-3 tracking-widest uppercase mb-1">{category}</p>
      <h3 className="text-sm font-semibold tracking-tight">{title}</h3>
    </Link>
  );
}
