'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { voiceCategories } from '@/data';
import type { Project } from '@/types';

const styleColors: Record<string, string> = {
  'Warm Authoritative': 'border-amber-500/25 text-amber-400/80 bg-amber-500/10',
  'Confident & Clear': 'border-blue-500/25 text-blue-400/80 bg-blue-500/10',
  'Friendly & Professional': 'border-green-500/25 text-green-400/80 bg-green-500/10',
  'Energetic': 'border-purple-500/25 text-purple-400/80 bg-purple-500/10',
};

export function VoiceGallery({ initialProjects = [] }: { initialProjects?: Project[] }) {
  const [active, setActive] = useState('all');
  const [playing, setPlaying] = useState<string | null>(null);

  const filtered = initialProjects.filter(p =>
    active === 'all' ? true : p.subcategory === active
  );

  return (
    <section className="py-[120px] md:py-[160px]" aria-label="Voice portfolio">
      <div className="container">
        {/* Filters */}
        <div className="flex flex-wrap gap-[18px] mb-[60px]" role="group" aria-label="Filter voice projects">
          {voiceCategories.map(cat => (
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
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 xl:gap-10">
          {filtered.map((project, i) => (
            <VoiceCard key={project.id} project={project} delay={i * 60} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center gap-4 py-24 text-center">
            <span className="text-3xl">🎙️</span>
            <p className="text-text-2 font-semibold">No voice projects in this category yet.</p>
          </div>
        )}
      </div>
    </section>
  );
}

function VoiceCard({ project, delay }: { project: Project; delay: number }) {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const togglePlay = (e: React.MouseEvent) => {
    e.preventDefault();
    if (!audioRef.current) return;
    if (playing) { audioRef.current.pause(); }
    else { audioRef.current.play(); }
    setPlaying(!playing);
  };

  const badgeClass = styleColors[project.voiceType ?? ''] ?? 'border-border text-text-3 bg-transparent';

  return (
    <article
      className="group bg-card border border-border rounded-[24px] overflow-hidden hover:border-border-hover hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-out-expo"
      style={{ animationDelay: `${delay}ms` }}
      data-cursor="listen"
    >
      <Link href={`/voice/${project.slug}`} className="block">
        {/* Cover */}
        <div className="relative aspect-video overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover rounded-t-[24px] transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent" />

          {/* Waveform overlay */}
          <div className="absolute bottom-3 left-3 right-3 flex items-end gap-0.5 h-8">
            {Array.from({ length: 32 }).map((_, i) => {
              const h = Math.sin(i * 0.8) * 0.5 + 0.5;
              return (
                <div
                  key={i}
                  className={cn('flex-1 bg-white/30 rounded-sm origin-bottom', playing && 'animate-waveform')}
                  style={{
                    height: `${20 + h * 80}%`,
                    animationDelay: `${i * 40}ms`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Body */}
        <div className="p-6">
          {/* Voice style badge */}
          {project.voiceType && (
            <span className={cn('inline-block text-2xs font-semibold tracking-widest uppercase border rounded-full px-2.5 py-1 mb-3', badgeClass)}>
              {project.voiceType}
            </span>
          )}

          <h3 className="font-semibold tracking-tight text-xl mb-5 group-hover:-translate-y-0.5 transition-transform duration-500">
            {project.title}
          </h3>
          <p className="text-sm text-text-3 mb-4">{project.client}</p>

          {/* Meta row */}
          <div className="flex items-center justify-between text-xs text-text-3 border-t border-border/50 pt-4">
            <span>{project.language ?? 'English'}</span>
            <span>{project.subcategory}</span>
            <span>{project.duration}</span>
          </div>
        </div>
      </Link>

      {/* Play button — outside the Link to prevent double navigation */}
      <div className="px-6 pb-6 mt-2">
        <button
          onClick={togglePlay}
          className="w-full flex items-center justify-center gap-2.5 h-[52px] rounded-full border border-border/70 text-xs font-semibold tracking-wider uppercase hover:border-border-hover hover:bg-white/5 transition-all duration-250"
          aria-label={playing ? `Pause ${project.title}` : `Play ${project.title} preview`}
        >
          {playing ? (
            <>
              <div className="waveform" aria-hidden="true">
                {Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="waveform-bar" style={{ height: `${8 + Math.random() * 10}px` }} />
                ))}
              </div>
              Pause Preview
            </>
          ) : (
            <>▶ Play Preview</>
          )}
        </button>
        {project.audioUrl && (
          <audio ref={audioRef} src={project.audioUrl} onEnded={() => setPlaying(false)} />
        )}
      </div>
    </article>
  );
}
