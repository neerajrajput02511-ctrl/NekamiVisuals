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
      className={cn('pt-48 pb-[120px]', className)}
      aria-label="Page header"
    >
      <div className="container">
        <div className="flex flex-col">
          <p className="section-label">{label}</p>
          <h1
            className="text-5xl md:text-7xl lg:text-[100px] font-semibold tracking-tightest leading-[0.95] mt-[80px] mb-[40px]"
            dangerouslySetInnerHTML={{ __html: heading }}
          />
          <p className="text-lg text-text-2 max-w-2xl leading-[1.7]">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
