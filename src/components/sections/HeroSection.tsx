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
      className="relative w-full h-[100svh] min-h-[640px] flex items-center justify-center overflow-hidden bg-bg"
      aria-label="Hero"
    >
      {/* Cinematic overlay */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          background: `
            linear-gradient(to bottom, rgba(5,5,5,0.55) 0%, rgba(5,5,5,0.05) 45%, rgba(5,5,5,0.75) 100%),
            radial-gradient(ellipse 80% 60% at 50% 40%, transparent 20%, rgba(5,5,5,0.65) 100%)
          `
        }}
      />

      {/* Corner labels */}
      <span className="absolute z-20 text-[0.625rem] font-medium tracking-[0.18em] uppercase text-text-3 opacity-100 top-[5rem] left-[clamp(1.25rem,4.5vw,5rem)] animate-fadeIn">Neeraj Singh</span>
      <span className="absolute z-20 text-[0.625rem] font-medium tracking-[0.18em] uppercase text-text-3 opacity-100 top-[5rem] right-[clamp(1.25rem,4.5vw,5rem)] text-right animate-fadeIn">©&thinsp;2026</span>

      {/* Main content */}
      <div className="relative z-20 text-center w-full max-w-[1200px] px-[clamp(1.25rem,5vw,6rem)]">
        <p className="inline-flex items-center gap-4 text-[0.6875rem] font-medium tracking-[0.28em] uppercase text-text-3 mb-[2.25rem] animate-fadeIn before:block before:w-[36px] before:h-px before:bg-current before:opacity-50 after:block after:w-[36px] after:h-px after:bg-current after:opacity-50">
          NekamiVisuals&ensp;·&ensp;Creative Studio
        </p>

        <h1
          ref={headRef}
          className="text-[clamp(3rem,9vw,8.5rem)] font-bold tracking-[-0.045em] leading-[0.94] text-text mb-[2.25rem]"
        >
          {headingWords.map((word, i) => (
            <span
              key={i}
              className="hero-word inline-block mr-[0.2em] last:mr-0 opacity-0 translate-y-[24px] transition-all duration-700 ease-out-expo"
            >
              {word === 'Leave' ? <em className="font-light italic text-text-2">{word}</em> : word}
            </span>
          ))}
        </h1>

        <p className="text-[clamp(0.9375rem,1.5vw,1.0625rem)] text-text-2 max-w-[520px] mx-auto mb-[3rem] leading-[1.75] animate-fadeIn" style={{ animationDelay: '0.5s', opacity: 0, animationFillMode: 'forwards' }}>
          NekamiVisuals helps creators, brands and businesses elevate their content through
          cinematic video editing, professional voice artistry and impactful graphic design.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap animate-fadeIn" style={{ animationDelay: '0.7s', opacity: 0, animationFillMode: 'forwards' }}>
          <Link
            href="/work"
            className="inline-flex items-center justify-center gap-[0.625rem] px-[2rem] py-[0.9rem] bg-text text-bg text-[0.8125rem] font-semibold rounded-full hover:bg-accent hover:scale-[1.03] transition-all duration-150 whitespace-nowrap"
          >
            Explore Work ↗
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-[0.625rem] px-[2rem] py-[0.9rem] border border-border text-text text-[0.8125rem] font-medium rounded-full hover:border-border-hover hover:bg-white/5 hover:scale-[1.02] transition-all duration-150 whitespace-nowrap"
          >
            Hire Me
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-[2.75rem] left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-[0.875rem] pointer-events-none animate-fadeIn" style={{ animationDelay: '1s' }}>
        <span className="text-[0.625rem] font-medium tracking-[0.22em] uppercase text-text-3 [writing-mode:vertical-rl]">Scroll</span>
        <div className="w-px h-[64px] bg-gradient-to-b from-white/20 to-transparent relative overflow-hidden rounded-[1px]">
          <div className="absolute top-[-100%] left-0 w-full h-[60%] bg-gradient-to-b from-transparent via-white/50 to-transparent animate-scrollLine" />
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
