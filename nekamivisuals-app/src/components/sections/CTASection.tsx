import Link from 'next/link';
import { cn } from '@/lib/utils';

interface CTASectionProps {
  label: string;
  heading: string;
  cta: string;
  href: string;
  className?: string;
}

export function CTASection({ label, heading, cta, href, className }: CTASectionProps) {
  return (
    <section
      className={cn(
        'py-[120px] md:py-[160px] border-t border-border/50 relative overflow-hidden',
        className
      )}
      aria-label="Call to action"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 100%, rgba(255,255,255,0.03), transparent)',
        }}
      />
      <div className="container relative z-10 flex flex-col items-center text-center gap-8">
        <p className="section-label">{label}</p>
        <h2
          className="text-4xl md:text-6xl font-semibold tracking-tighter leading-none max-w-2xl"
          dangerouslySetInnerHTML={{ __html: heading }}
        />
        <Link
          href={href}
          className="mt-2 inline-flex items-center justify-center gap-2 h-[52px] px-[28px] bg-white text-bg text-sm font-semibold rounded-full hover:bg-white/90 active:scale-[0.98] transition-all duration-250"
        >
          {cta} →
        </Link>
      </div>
    </section>
  );
}
