import { cn } from '@/lib/utils';

interface PageHeaderProps {
  label: string;
  heading: string;
  description: string;
  className?: string;
}

export function PageHeader({ label, heading, description, className }: PageHeaderProps) {
  return (
    <section
      className={cn('pt-40 pb-16 border-b border-border/50', className)}
      aria-label="Page header"
    >
      <div className="container">
        <div className="flex items-end justify-between gap-8 flex-wrap">
          <div>
            <p className="section-label mb-6">{label}</p>
            <h1
              className="text-5xl md:text-7xl font-semibold tracking-tightest leading-none"
              dangerouslySetInnerHTML={{ __html: heading }}
            />
          </div>
          <p className="text-base text-text-2 max-w-[420px] leading-relaxed self-end pb-1">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
