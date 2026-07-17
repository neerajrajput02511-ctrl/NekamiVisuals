import Link from 'next/link';
import Image from 'next/image';
import { projects } from '@/data';

export function FeaturedWork() {
  const featured = projects.filter(p => p.featured).slice(0, 4);

  return (
    <section className="py-24 md:py-36 border-b border-border/50" aria-labelledby="featured-h">
      <div className="container">
        {/* Header */}
        <div className="flex items-end justify-between gap-6 mb-16 flex-wrap">
          <div>
            <p className="section-label mb-5">Featured</p>
            <h2 id="featured-h" className="text-4xl md:text-5xl font-semibold tracking-tighter leading-none">
              Selected Work
            </h2>
          </div>
          <Link
            href="/work"
            className="text-sm font-medium text-text-3 hover:text-text-2 transition-colors duration-250 flex items-center gap-1.5"
          >
            View All →
          </Link>
        </div>

        {/* Grid - editorial layout */}
        {featured.length > 0 ? (
          <div className="editorial-grid">
            {featured.map((project, i) => {
              const spans = [8, 4, 4, 8];
              const span = spans[i % spans.length];
              return (
                <article
                  key={project.id}
                  className="group bg-card border border-border rounded-xl overflow-hidden hover:border-border-hover hover:-translate-y-1.5 hover:shadow-2xl transition-all duration-400 ease-out-expo"
                  style={{ gridColumn: `span ${span}` }}
                  data-cursor="view-project"
                >
                  <Link href={`/work/${project.slug}`} className="block">
                    <div className="relative overflow-hidden" style={{ aspectRatio: span === 8 ? '16/10' : '4/3' }}>
                      <Image
                        src={project.thumbnail}
                        alt={project.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority={i === 0}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-bg/60 via-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
                    </div>
                    <div className="p-5 border-t border-border/50">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-2xs font-semibold tracking-widest uppercase text-text-3">{project.category}</span>
                        <span className="text-2xs text-text-3">{project.year}</span>
                      </div>
                      <h3 className="font-semibold tracking-tight group-hover:-translate-y-0.5 transition-transform duration-300">{project.title}</h3>
                      <p className="text-xs text-text-3 mt-1">{project.client}</p>
                    </div>
                  </Link>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 text-text-3 text-sm">Work coming soon…</div>
        )}
      </div>
    </section>
  );
}
