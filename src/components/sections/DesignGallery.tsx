'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { designCategories } from '@/data';

import type { Project } from '@/types';

export function DesignGallery({ initialProjects = [] }: { initialProjects?: Project[] }) {
  const [active, setActive] = useState('all');

  const filtered = initialProjects.filter(p =>
    active === 'all' ? true : p.category === active
  );

  return (
    <section className="py-[120px] md:py-[160px]" aria-label="Design gallery">
      <div className="container">
        {/* Filters */}
        <div className="flex flex-wrap gap-[20px] mb-[60px]" role="group" aria-label="Filter designs">
          {designCategories.map(cat => (
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

        {/* Masonry grid */}
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <span className="text-3xl">🎨</span>
            <p className="text-text-2 font-semibold">No designs in this category yet.</p>
          </div>
        ) : (
          <div className="masonry-grid">
            {filtered.map((project, i) => (
              <DesignCard key={project.id} project={project} index={i} delay={i * 70} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function DesignCard({ project, index, delay }: {
  project: Project;
  index: number;
  delay: number;
}) {
  const aspects = ['4/3', '1/1', '3/4', '16/9', '9/16'];
  const aspect = aspects[index % aspects.length];

  return (
    <div className="masonry-item" style={{ animationDelay: `${delay}ms` }} data-cursor="view">
      <Link
        href={`/design/${project.slug}`}
        className="group block relative rounded-[24px] overflow-hidden border border-border hover:border-border-hover hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-out-expo"
        aria-label={`View ${project.title}`}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* Dark overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />

          {/* Content on hover */}
          <div className="absolute inset-0 flex flex-col justify-end p-5 translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400 ease-out-expo">
            <span className="text-2xs font-semibold tracking-widest uppercase text-white/50 mb-1">
              {project.category.replace('-', ' ')}
            </span>
            <h3 className="text-base font-semibold tracking-tight text-white mb-0.5">
              {project.title}
            </h3>
            <p className="text-xs text-white/50">{project.client}</p>
          </div>

          {/* View icon */}
          <div className="absolute top-3 right-3 w-9 h-9 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            ↗
          </div>
        </div>
      </Link>
    </div>
  );
}
