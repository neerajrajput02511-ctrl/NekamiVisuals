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
      className={cn('pt-[140px] pb-[70px]', className)}
      aria-label="Page header"
    >
      <div className="container">
        <div className="flex flex-col">
          <p className="section-label">{label}</p>
          <h1
            className="text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-semibold tracking-tightest leading-none mt-[80px] mb-[40px]"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          <p className="text-xl text-text-2 max-w-2xl leading-[1.7]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
