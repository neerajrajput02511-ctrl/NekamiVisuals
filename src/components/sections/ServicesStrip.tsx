import Link from 'next/link';

const services = [
  {
    num: '01',
    title: 'Video Editing',
    desc: 'Cinematic cuts, colour grading, motion graphics and storytelling that transform raw footage into compelling content.',
    href: '/work',
  },
  {
    num: '02',
    title: 'Voice Artistry',
    desc: 'Professional narration, character voices and commercial reads delivered with clarity, warmth and intention.',
    href: '/voice',
  },
  {
    num: '03',
    title: 'Graphic Design',
    desc: 'Brand identities, social visuals, thumbnails and layouts crafted to capture attention and communicate with precision.',
    href: '/design',
  },
];

export function ServicesStrip() {
  return (
    <section className="border-b border-border/50" aria-label="Services">
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border/50">
          {services.map(svc => (
            <div key={svc.num} className="py-12 md:px-10 first:pl-0 last:pr-0 group">
              <span className="block text-2xs font-semibold tracking-widest uppercase text-text-3 mb-6">
                {svc.num}
              </span>
              <h3 className="text-2xl font-semibold tracking-tight mb-4">{svc.title}</h3>
              <p className="text-sm text-text-3 leading-relaxed mb-6">{svc.desc}</p>
              <Link
                href={svc.href}
                className="text-xs font-semibold tracking-wider uppercase text-text-3 hover:text-text transition-colors duration-250 inline-flex items-center gap-2"
              >
                Explore →
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
