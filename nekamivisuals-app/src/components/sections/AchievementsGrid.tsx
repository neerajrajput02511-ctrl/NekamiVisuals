'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { achievements } from '@/data';
import type { Achievement } from '@/types';
import { X, Download, ExternalLink } from 'lucide-react';

export function AchievementsGrid() {
  const [selected, setSelected] = useState<Achievement | null>(null);

  if (achievements.length === 0) {
    return <AchievementsEmptyState />;
  }

  return (
    <section className="py-[120px] md:py-[160px]" aria-label="Achievements">
      <div className="container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {achievements.map((achievement, i) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
              delay={i * 70}
              onClick={() => setSelected(achievement)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <AchievementModal achievement={selected} onClose={() => setSelected(null)} />
      )}
    </section>
  );
}

function AchievementCard({
  achievement, delay, onClick
}: { achievement: Achievement; delay: number; onClick: () => void }) {
  return (
    <article
      onClick={onClick}
      className="group glass rounded-[24px] overflow-hidden border border-border hover:border-border-hover hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 ease-out-expo"
      style={{ animationDelay: `${delay}ms` }}
      data-cursor="view"
      role="button"
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onClick()}
      aria-label={`View ${achievement.title}`}
    >
      {achievement.coverImage && (
        <div className="relative aspect-video overflow-hidden">
          <Image src={achievement.coverImage} alt={achievement.title} fill className="object-cover rounded-t-[24px] transition-transform duration-500 group-hover:scale-105" />
        </div>
      )}
      <div className="p-6">
        {achievement.badgeUrl && (
          <div className="w-12 h-12 rounded-xl bg-white/5 border border-border flex items-center justify-center mb-4 text-xl">
            🏆
          </div>
        )}
        <p className="text-2xs font-semibold tracking-widest uppercase text-text-3 mb-2">
          {achievement.category}
        </p>
        <h3 className="font-semibold tracking-tight text-base mb-1">{achievement.title}</h3>
        <p className="text-xs text-text-3 mb-3">{achievement.organization}</p>
        <p className="text-sm text-text-2 leading-relaxed line-clamp-3">{achievement.description}</p>
        <p className="text-xs text-text-3 mt-4">{achievement.date}</p>
      </div>
    </article>
  );
}

function AchievementModal({ achievement, onClose }: { achievement: Achievement; onClose: () => void }) {
  return (
    <div
      className="achievement-modal open"
      role="dialog"
      aria-modal="true"
      aria-label={achievement.title}
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      <div className="achievement-modal-inner p-8 md:p-12">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-3 hover:border-border-hover hover:text-text transition-all duration-250"
          aria-label="Close modal"
        >
          <X size={16} />
        </button>

        {achievement.coverImage && (
          <div className="relative aspect-video rounded-lg overflow-hidden mb-8 border border-border">
            <Image src={achievement.coverImage} alt={achievement.title} fill className="object-cover" />
          </div>
        )}

        <p className="section-label mb-4">{achievement.category}</p>
        <h2 className="text-3xl font-semibold tracking-tight mb-2">{achievement.title}</h2>
        <p className="text-text-3 text-sm mb-6">{achievement.organization} · {achievement.date}</p>
        <p className="text-base text-text-2 leading-relaxed mb-8">{achievement.description}</p>

        <div className="flex gap-3 flex-wrap">
          {achievement.certificateUrl && (
            <a
              href={achievement.certificateUrl}
              download
              className="inline-flex items-center justify-center gap-2 h-[52px] px-[28px] rounded-full border border-border text-sm hover:border-border-hover hover:bg-white/5 transition-all duration-250"
              data-cursor="open"
            >
              <Download size={14} /> Download Certificate
            </a>
          )}
          {achievement.externalLink && (
            <a
              href={achievement.externalLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 h-[52px] px-[28px] rounded-full border border-border text-sm hover:border-border-hover hover:bg-white/5 transition-all duration-250"
              data-cursor="open"
            >
              <ExternalLink size={14} /> Learn More
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

function AchievementsEmptyState() {
  return (
    <section className="py-[160px] min-h-[60vh] flex flex-col items-center justify-center" aria-label="No achievements yet">
      <div className="container flex flex-col items-center text-center">
        {/* Minimal illustration */}
        <div className="relative w-28 h-28 mb-4" aria-hidden="true">
          <div className="absolute inset-0 rounded-full border border-border animate-pulse" />
          <div className="absolute inset-4 rounded-full border border-border/50 animate-pulse" style={{ animationDelay: '0.5s' }} />
          <div className="absolute inset-0 flex items-center justify-center text-3xl">
            ✦
          </div>
        </div>
        <h2 className="text-3xl md:text-4xl font-semibold tracking-tight mb-[60px]">
          Achievements Coming Soon
        </h2>
        <p className="text-base text-text-2 max-w-md leading-relaxed">
          I am continuously learning and building. Future milestones, certifications and recognitions will appear here.
        </p>
        <p className="text-xs text-text-3 tracking-wider uppercase mt-2">
          Stay tuned
        </p>
      </div>
    </section>
  );
}
