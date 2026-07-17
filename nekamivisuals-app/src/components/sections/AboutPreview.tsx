import Link from 'next/link';

const stats = [
  { num: '50+',  label: 'Projects delivered' },
  { num: '3',    label: 'Creative disciplines' },
  { num: '5★',   label: 'Client satisfaction' },
  { num: '∞',    label: 'Stories to tell' },
];

export function AboutPreview() {
  return (
    <section className="py-24 md:py-36 border-b border-border/50" aria-labelledby="about-h">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 md:gap-24 items-start">
          {/* Left */}
          <div>
            <p className="section-label mb-6">Who We Are</p>
            <h2 id="about-h" className="text-4xl md:text-5xl font-semibold tracking-tighter leading-none mb-8">
              Who is behind<br />NekamiVisuals?
            </h2>
            <p className="text-base text-text-2 leading-relaxed mb-10 max-w-md">
              I help brands, creators and businesses transform ideas into engaging visual experiences
              through storytelling, editing, voice and design. Every project is personal — precision meets passion.
            </p>
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-medium border border-border rounded-full px-5 py-2.5 hover:border-border-hover hover:bg-white/5 transition-all duration-250"
            >
              View My Work →
            </Link>
          </div>

          {/* Right — stats */}
          <div className="grid grid-cols-2 gap-px border border-border/50 rounded-2xl overflow-hidden">
            {stats.map(stat => (
              <div
                key={stat.label}
                className="bg-card p-8 flex flex-col gap-2 hover:bg-white/[0.025] transition-colors duration-300"
              >
                <span className="text-4xl font-semibold tracking-tight">{stat.num}</span>
                <span className="text-xs text-text-3 tracking-wider uppercase">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
