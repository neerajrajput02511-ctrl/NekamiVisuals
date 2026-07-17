'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { designCategories } from '@/data';

const designProjects = [
  { id: 'noir-and-co-identity', slug: 'noir-and-co-identity', title: 'Noir & Co. Identity', category: 'brand-identity', client: 'Noir & Co.', thumbnail: '/images/project-04.jpg', h: 'tall' },
  { id: 'youtube-thumbnail-pack', slug: 'youtube-thumbnail-pack', title: 'YouTube Thumbnail Pack', category: 'thumbnail', client: 'ContentCreator Pro', thumbnail: '/images/project-06.jpg', h: 'short' },
  { id: 'social-brand-kit', slug: 'social-brand-kit', title: 'Social Brand Kit', category: 'social-media', client: 'UrbanStyle Co.', thumbnail: '/images/project-01.jpg', h: 'medium' },
  { id: 'event-poster-series', slug: 'event-poster-series', title: 'Event Poster Series', category: 'poster', client: 'Neon Nights Events', thumbnail: '/images/project-03.jpg', h: 'tall' },
  { id: 'startup-logo', slug: 'startup-logo', title: 'Startup Logo Design', category: 'logo', client: 'Lumora Labs', thumbnail: '/images/project-05.jpg', h: 'short' },
  { id: 'corporate-presentation', slug: 'corporate-presentation', title: 'Corporate Deck Design', category: 'presentation', client: 'Vertex Capital', thumbnail: '/images/project-02.jpg', h: 'medium' },
];

export function DesignGallery() {
  const [active, setActive] = useState('all');

  const filtered = designProjects.filter(p =>
    active === 'all' ? true : p.category === active
  );

  return (
    <section className="py-16 md:py-24" aria-label="Design gallery">
      <div className="container">
        {/* Filters */}
        <div className="flex flex-wrap gap-2 mb-10" role="group" aria-label="Filter designs">
          {designCategories.map(cat => (
            <button
              key={cat.value}
              onClick={() => setActive(cat.value)}
              className={cn('filter-pill', active === cat.value && 'active')}
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
              <DesignCard key={project.id} project={project} delay={i * 70} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function DesignCard({ project, delay }: {
  project: typeof designProjects[0];
  delay: number;
}) {
  const aspectMap = { short: '4/3', medium: '1/1', tall: '3/4' } as const;
  const aspect = aspectMap[project.h as keyof typeof aspectMap] ?? '1/1';

  return (
    <div className="masonry-item" style={{ animationDelay: `${delay}ms` }} data-cursor="view">
      <Link
        href={`/design/${project.slug}`}
        className="group block relative rounded-xl overflow-hidden border border-border hover:border-border-hover transition-all duration-400 ease-out-expo"
        aria-label={`View ${project.title}`}
      >
        <div className="relative overflow-hidden" style={{ aspectRatio: aspect }}>
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
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
