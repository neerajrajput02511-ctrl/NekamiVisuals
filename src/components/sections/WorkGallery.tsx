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
    <section className="pb-[140px]" aria-label="Project gallery">
      <div className="container">
        {/* Controls block (Search & Filters) */}
        <div className="flex flex-col mb-[48px]">
          {/* Search */}
          <div className="relative w-full max-w-[420px] mb-[48px]">
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-text-3 pointer-events-none" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="Search projects…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search projects"
              className="w-full h-[56px] pl-12 pr-4 rounded-[18px] text-base bg-card border border-border/70 placeholder:text-text-3 focus:border-border-hover transition-colors duration-250"
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
                    'px-[28px] h-[52px] rounded-full font-semibold text-[14px] tracking-wider uppercase border transition-all duration-250',
                    active === cat.value 
                      ? 'bg-white/10 border-white/20 text-white shadow-inner' 
                      : 'bg-transparent border-border text-text-3 hover:text-text-2 hover:border-border-hover'
                  )}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-6">
              <div className="relative">
                <select
                  value={sort}
                  onChange={e => setSort(e.target.value)}
                  aria-label="Sort projects"
                  className="pl-4 pr-8 h-[52px] rounded-full bg-card border border-border/70 text-[14px] appearance-none"
                >
                  <option value="featured">Featured</option>
                  <option value="popular">Popular</option>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                </select>
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-text-3 pointer-events-none text-xs">↓</span>
              </div>
              <span className="text-[14px] text-text-3 tracking-wider hidden md:block" aria-live="polite">
                {filtered.length} Project{filtered.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <EmptyState onReset={() => { setActive('all'); setQuery(''); }} />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[32px] xl:gap-[40px]">
            {filtered.map((project, i) => (
              <WorkCard
                key={project.id}
                project={project}
                delay={i * 60}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function WorkCard({ project, delay }: { project: Project; delay: number }) {
  return (
    <article
      className="group relative bg-card border border-border rounded-[24px] overflow-hidden hover:border-border-hover hover:-translate-y-2 transition-all duration-500 ease-out-expo shadow-sm hover:shadow-2xl"
      style={{
        animationDelay: `${delay}ms`,
      }}
      data-cursor="view-project"
      role="listitem"
    >
      <Link href={`/work/${project.slug}`} className="block p-[24px]" tabIndex={0}>
        {/* Image */}
        <div className="relative overflow-hidden rounded-[16px] aspect-video">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-transform duration-500 ease-out-expo group-hover:scale-[1.03]"
            loading="lazy"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-bg/60 opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Play / View icon */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-400">
            <div className="w-14 h-14 rounded-full border border-white/30 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-xl scale-75 group-hover:scale-100 transition-transform duration-400 ease-out-expo">
              {project.category === 'voice' ? '♪' : '▶'}
            </div>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 right-3 px-2.5 py-1 text-2xs font-semibold tracking-widest uppercase border border-yellow-500/20 bg-yellow-500/10 text-yellow-400/80 rounded-full backdrop-blur-sm">
              Featured
            </div>
          )}
        </div>

        {/* Body */}
        <div className="pt-[24px]">
          <div className="flex items-center justify-between mb-[16px]">
            <span className="text-[14px] font-semibold tracking-widest uppercase text-text-3">
              {project.category}
            </span>
            <span className="text-[14px] text-text-3">{project.year}</span>
          </div>
          <h3 className="font-semibold tracking-tight text-[24px] mb-[20px] leading-snug group-hover:-translate-y-0.5 transition-transform duration-500">
            {project.title}
          </h3>
          <div className="mt-[20px]">
            {project.client && (
              <p className="text-[16px] text-text-3">{project.client}</p>
            )}
            {project.duration && (
              <p className="text-[16px] text-text-3 mt-1 font-medium">{project.duration}</p>
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
