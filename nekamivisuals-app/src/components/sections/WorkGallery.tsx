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
    <section className="py-[120px] md:py-[160px]" aria-label="Project gallery">
      <div className="container">
        {/* Controls */}
        <div className="flex flex-wrap items-center gap-4 mb-8 pb-6 border-b border-border/50">
          {/* Search */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 text-text-3 pointer-events-none" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="Search projects…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              aria-label="Search projects"
              className="w-full h-[52px] pl-10 pr-4 rounded-[16px] text-base bg-card border border-border/70 placeholder:text-text-3 focus:border-border-hover transition-colors duration-250 mb-8"
            />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              value={sort}
              onChange={e => setSort(e.target.value)}
              aria-label="Sort projects"
              className="pl-4 pr-8 py-2.5 rounded-full text-sm appearance-none"
            >
              <option value="featured">Featured</option>
              <option value="popular">Popular</option>
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
            </select>
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-text-3 pointer-events-none text-xs">↓</span>
          </div>

          <span className="ml-auto text-xs text-text-3 tracking-wider" aria-live="polite">
            {filtered.length} Project{filtered.length !== 1 ? 's' : ''}
          </span>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-[18px] mt-10 mb-[60px]" role="group" aria-label="Filter by category">
          {workCategories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={cn('filter-pill', active === cat.value && 'active')}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <EmptyState onReset={() => { setActive('all'); setQuery(''); }} />
        ) : (
          <div className="editorial-grid">
            {filtered.map((project, i) => (
              <WorkCard
                key={project.id}
                project={project}
                span={getSpan(i)}
                delay={i * 60}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function WorkCard({ project, span, delay }: { project: Project; span: number; delay: number }) {
  const aspectMap: Record<number, string> = { 8: '16/10', 4: '4/3', 12: '21/9', 6: '16/10' };
  const aspect = aspectMap[span] ?? '16/10';

  return (
    <article
      className="group relative bg-card border border-border rounded-3xl overflow-hidden hover:border-border-hover hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-out-expo"
      style={{
        gridColumn: `span ${span}`,
        animationDelay: `${delay}ms`,
        ['--aspect' as any]: aspect,
      }}
      data-cursor="view-project"
      role="listitem"
    >
      <Link href={`/work/${project.slug}`} className="block" tabIndex={0}>
        {/* Image */}
        <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
            className="object-cover rounded-t-3xl transition-transform duration-500 ease-out-expo group-hover:scale-105"
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
        <div className="p-6 border-t border-border/50">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-semibold tracking-widest uppercase text-text-3">
              {project.category}
            </span>
            <span className="text-xs text-text-3">{project.year}</span>
          </div>
          <h3 className="font-semibold tracking-tight text-xl mb-5 leading-snug group-hover:-translate-y-0.5 transition-transform duration-500">
            {project.title}
          </h3>
          <div className="mt-4">
            {project.client && (
              <p className="text-sm text-text-3">{project.client}</p>
            )}
            {project.duration && (
              <p className="text-sm text-text-3 mt-1 font-medium">{project.duration}</p>
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
