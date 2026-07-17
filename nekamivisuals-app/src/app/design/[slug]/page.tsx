import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CTASection } from '@/components/sections/CTASection';
import { projects, softwareMap } from '@/data';
import type { Metadata } from 'next';
import { ChevronLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const project = projects.find(p => p.slug === resolvedParams.slug && p.category === 'design');
  if (!project) return {};
  return {
    title: `${project.title} — Graphic Design`,
    description: project.description,
  };
}

export default async function DesignDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find(p => p.slug === resolvedParams.slug && p.category === 'design');
  if (!project) notFound();

  // Find related design projects
  const related = projects
    .filter(p => p.category === 'design' && p.id !== project.id)
    .slice(0, 3);

  return (
    <>
      <Navbar />
      <main>
        {/* Back Link */}
        <div className="pt-32 pb-8 border-b border-border/50">
          <div className="container">
            <Link
              href="/design"
              className="inline-flex items-center gap-2 text-sm text-text-3 hover:text-text transition-colors duration-250"
            >
              <ChevronLeft size={16} /> Back to Design Gallery
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <section className="bg-card border-b border-border/50">
          <div className="container pt-8 pb-0">
            <div className="relative aspect-video w-full rounded-t-2xl overflow-hidden border border-border border-b-0">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                priority
                className="object-cover"
              />
            </div>
          </div>
        </section>

        {/* Title & Meta Info */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
              {/* Left: Title & Overview */}
              <div className="lg:col-span-8">
                <div className="mb-6 flex items-center gap-3">
                  <span className="text-2xs font-semibold tracking-widest uppercase text-text-3 px-3 py-1 rounded-full border border-border">
                    {project.subcategory.replace('-', ' ')}
                  </span>
                  <span className="text-sm text-text-3">{project.year}</span>
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-none mb-8">
                  {project.title}
                </h1>
                <p className="text-lg md:text-xl text-text-2 leading-relaxed mb-12">
                  {project.description}
                </p>

                {project.overview && (
                  <div className="mb-12">
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-text-3 mb-4">Project Overview</h2>
                    <p className="text-base text-text-2 leading-relaxed">{project.overview}</p>
                  </div>
                )}
                {project.challenge && (
                  <div>
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-text-3 mb-4">The Challenge</h2>
                    <p className="text-base text-text-2 leading-relaxed">{project.challenge}</p>
                  </div>
                )}
              </div>

              {/* Right: Meta Details */}
              <div className="lg:col-span-3 lg:col-start-10 space-y-8">
                {project.client && (
                  <div>
                    <h3 className="text-2xs font-semibold tracking-widest uppercase text-text-3 mb-2">Client</h3>
                    <p className="text-base font-medium">{project.client}</p>
                  </div>
                )}
                
                {project.colorPalette && project.colorPalette.length > 0 && (
                  <div>
                    <h3 className="text-2xs font-semibold tracking-widest uppercase text-text-3 mb-2">Color Palette</h3>
                    <div className="flex gap-2">
                      {project.colorPalette.map(color => (
                        <div 
                          key={color} 
                          className="w-8 h-8 rounded-full border border-border shadow-inner" 
                          style={{ backgroundColor: color }}
                          title={color}
                        />
                      ))}
                    </div>
                  </div>
                )}

                {project.typography && (
                  <div>
                    <h3 className="text-2xs font-semibold tracking-widest uppercase text-text-3 mb-2">Typography</h3>
                    <div className="space-y-1">
                      {project.typography.heading && <p className="text-sm"><span className="text-text-3 mr-2">Heading:</span> {project.typography.heading}</p>}
                      {project.typography.body && <p className="text-sm"><span className="text-text-3 mr-2">Body:</span> {project.typography.body}</p>}
                      {project.typography.accent && <p className="text-sm"><span className="text-text-3 mr-2">Accent:</span> {project.typography.accent}</p>}
                    </div>
                  </div>
                )}

                {project.tags && project.tags.length > 0 && (
                  <div>
                    <h3 className="text-2xs font-semibold tracking-widest uppercase text-text-3 mb-2">Tags</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="text-xs text-text-2 bg-white/5 border border-border px-2.5 py-1 rounded-md">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {project.software && project.software.length > 0 && (
                  <div>
                    <h3 className="text-2xs font-semibold tracking-widest uppercase text-text-3 mb-2">Tools</h3>
                    <div className="flex flex-wrap gap-3">
                      {project.software.map(key => {
                        const s = softwareMap[key];
                        return s ? (
                          <div key={key} className="flex items-center gap-2" title={s.name}>
                            <div
                              className="w-8 h-8 rounded-md flex items-center justify-center text-xs font-bold shadow-inner border border-white/10"
                              style={{ backgroundColor: s.color + '20', color: s.color }}
                            >
                              {s.icon}
                            </div>
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="py-16 md:py-24 border-b border-border/50 bg-bg-2">
            <div className="container">
              <div className="flex flex-col gap-12">
                {project.gallery.map((img, i) => (
                  <div key={i} className="relative w-full overflow-hidden rounded-xl border border-border" data-cursor="view">
                    <Image 
                      src={img} 
                      alt={`${project.title} preview ${i + 1}`} 
                      width={1200}
                      height={800}
                      className="w-full h-auto object-cover" 
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Related Projects */}
        {related.length > 0 && (
          <section className="py-16 md:py-24 border-b border-border/50">
            <div className="container">
              <p className="section-label mb-8">More Graphic Design</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map(p => (
                  <Link key={p.id} href={`/design/${p.slug}`} className="group block" data-cursor="view">
                    <div className="relative aspect-square rounded-xl overflow-hidden border border-border mb-4">
                      <Image src={p.thumbnail} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-400" />
                    </div>
                    <h3 className="font-semibold text-base mb-1">{p.title}</h3>
                    <p className="text-xs text-text-3">{p.client}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection
          label="Start a Project"
          heading="Need a design that captures attention?"
          cta="Contact Me"
          href="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
