'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { workCategories } from '@/data';
import type { Project } from '@/types';

export function WorkGallery({ initialProjects = [] }: { initialProjects?: Project[] }) {
  const [active, setActive] = useState('all');
  const [query,  setQuery]  = useState('');
  const [sort,   setSort]   = useState('featured');

  const filtered = initialProjects
    .filter(p => {
      if (active === 'all') return true;
      if (active === 'video') return p.category === 'video';
      if (active === 'voice') return p.category === 'voice';
      if (active === 'design') return p.category === 'design';
      return p.subcategory === active;
    })
    .filter(p => {
      if (!query.trim()) return true;
      const q = query.toLowerCase();
      return p.title.toLowerCase().includes(q) ||
             p.client.toLowerCase().includes(q) ||
             p.tags.some(t => t.toLowerCase().includes(q));
    })
    .sort((a, b) => {
      if (sort === 'featured') return (b.featured ? 1 : 0) - (a.featured ? 1 : 0);
      if (sort === 'popular')  return (b.popular  ? 1 : 0) - (a.popular  ? 1 : 0);
      if (sort === 'newest')   return b.year - a.year;
      if (sort === 'oldest')   return a.year - b.year;
      return a.order - b.order;
    });

  // Grid span pattern: [8,4, 4,4,4, 12, 6,6]
  const spanPattern = [8, 4, 4, 4, 4, 12, 6, 6];
  const getSpan = (i: number) => spanPattern[i % spanPattern.length] ?? 6;

  return (
    <section className="py-[clamp(4rem,8vw,7rem)] pb-[clamp(5rem,10vw,10rem)]" aria-label="Project gallery">
      <div className="container">
        {/* Controls block (Search & Filters) */}
        <div className="flex flex-col mb-[48px]">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-[320px] mb-[3rem]">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-text-3 pointer-events-none opacity-35" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="Search projects…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search projects"
              className="w-full py-[0.65rem] pr-[1rem] pl-[2.75rem] rounded-[100px] text-[0.8125rem] bg-card border border-border placeholder:text-text-3 focus:border-white/20 transition-colors duration-250 appearance-none"
            />
          </div>

          {/* Filters & Sort */}
          <div className="flex flex-wrap items-center justify-between gap-[20px] w-full">
            <div className="flex flex-wrap gap-[20px]" role="group" aria-label="Filter by category">
              {workCategories.map(cat => (
                <button
                  key={cat.value}
                  onClick={() => setActive(cat.value)}
                  className={cn(
                    'px-[1.25rem] py-[0.5rem] rounded-[100px] font-medium text-[0.8rem] tracking-[0.03em] border transition-all duration-250 cursor-none',
                    active === cat.value 
                      ? 'bg-white/10 border-white/20 text-text shadow-inner backdrop-blur-[12px]' 
                      : 'bg-transparent border-border text-text-3 hover:text-text-2 hover:border-border-hover'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-4">
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  aria-label="Sort projects"
                  className="py-[0.65rem] pr-[2.25rem] pl-[1.125rem] rounded-[100px] bg-card border border-border text-text-2 text-[0.8rem] appearance-none cursor-none focus:border-white/20 transition-colors"
                >
                  <option value="featured" className="bg-bg-2">Featured</option>
                  <option value="popular" className="bg-bg-2">Popular</option>
                  <option value="newest" className="bg-bg-2">Newest</option>
                  <option value="oldest" className="bg-bg-2">Oldest</option>
                </select>
                <span className="absolute right-[0.875rem] top-1/2 -translate-y-1/2 text-[0.75rem] text-text-3 pointer-events-none">↓</span>
              </div>
              <span className="text-[0.75rem] text-text-3 tracking-[0.06em] whitespace-nowrap hidden md:block" aria-live="polite">
                {filtered.length} Project{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <EmptyState onReset={() => { setActive('all'); setQuery(''); }} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-[1.125rem] items-start">
            {filtered.map((project, i) => (
              <WorkCard
                key={project.id}
                project={project}
                delay={i * 60}
                span={getSpan(i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function WorkCard({ project, delay, span }: { project: Project; delay: number; span?: number }) {
  return (
    <article
      className="group relative bg-card border border-border rounded-[24px] overflow-hidden hover:border-border-hover hover:-translate-y-[5px] transition-all duration-500 ease-out shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.5)] cursor-none"
      style={{
        animationDelay: `${delay}ms`,
        gridColumn: span ? `span ${span}` : 'span 6',
      }}
      data-cursor="view-project"
      role="listitem"
    >
      <Link href={`/work/${project.slug}`} className="block" tabIndex={0}>
        {/* Image */}
        <div className="relative w-full aspect-[16/10] overflow-hidden bg-bg-2">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
            loading="lazy"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-[-1.5rem] right-[1.25rem] px-[0.625rem] py-[0.2rem] text-[0.625rem] font-semibold tracking-[0.14em] uppercase border border-yellow-500/20 bg-yellow-500/10 text-[#ffdc64]/85 rounded-full z-20">
              Featured
            </div>
          )}
        </div>

        {/* Body */}
        <div className="p-[1.25rem_1.375rem_1.375rem] border-t border-border relative">
          <div className="flex items-center justify-between mb-[0.5rem]">
            <span className="text-[0.625rem] font-semibold tracking-[0.16em] uppercase text-text-3">
              {project.category}
            </span>
            <span className="text-[0.625rem] font-normal text-text-3">{project.year}</span>
          </div>
          <h3 className="text-[clamp(0.9rem,1.5vw,1.0625rem)] font-semibold tracking-[-0.02em] text-text leading-[1.2] mb-[0.3rem] group-hover:-translate-y-[2px] transition-transform duration-300">
            {project.title}
          </h3>
          <div>
            {project.client && (
              <p className="text-[0.75rem] text-text-3 mb-[0.375rem]">{project.client}</p>
            )}
            {project.duration && (
              <p className="text-[0.6875rem] text-text-3 font-medium tracking-[0.06em]">{project.duration}</p>
            )}
          </div>
        </div>
      </Link>
    </article>
  );
}

function EmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center py-32 gap-4 text-center col-span-full">
      <span className="text-3xl animate-spin" aria-hidden="true">✦</span>
      <h3 className="text-xl font-semibold tracking-tight text-text-2">No projects found</h3>
      <p className="text-sm text-text-3 max-w-xs">Try adjusting your search or filters.</p>
      <button
        onClick={onReset}
        className="mt-2 px-5 py-2 rounded-full border border-border hover:border-border-hover text-sm transition-all duration-250"
      >
        Clear filters
      </button>
    </div>
  );
}
