import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CTASection } from '@/components/sections/CTASection';
import { softwareMap } from '@/data';
import { createClient } from '@/lib/supabase/server';
import type { Project } from '@/types';
import type { Metadata } from 'next';
import { ChevronLeft } from 'lucide-react';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .eq('category', 'video')
    .single();

  if (!project) return {};
  return {
    title: `${project.title} — Work`,
    description: project.description,
  };
}

export default async function WorkDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: projectData } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .eq('category', 'video')
    .single();

  if (!projectData) notFound();
  const project = projectData as unknown as Project;

  // Find related projects (other video projects, excluding current)
  const { data: relatedData } = await supabase
    .from('projects')
    .select('*')
    .eq('category', 'video')
    .eq('status', 'published')
    .neq('id', project.id)
    .limit(2);

  const related = (relatedData || []) as unknown as Project[];

  return (
    <>
      <main>
        {/* Back Link */}
        <div className="pt-32 pb-8 border-b border-border/50">
          <div className="container">
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm text-text-3 hover:text-text transition-colors duration-250"
            >
              <ChevronLeft size={16} /> Back to Work
            </Link>
          </div>
        </div>

        {/* Hero Image */}
        <section className="border-b border-border/50 bg-card">
          <div className="container py-8 md:py-16">
            <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border">
              <Image
                src={project.thumbnail}
                alt={project.title}
                fill
                priority
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20" />
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
                  {project.subcategory && (
                    <span className="text-2xs font-semibold tracking-widest uppercase text-text-3 px-3 py-1 rounded-full border border-border">
                      {project.subcategory.replace('-', ' ')}
                    </span>
                  )}
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
                    <h2 className="text-sm font-semibold tracking-widest uppercase text-text-3 mb-4">Overview</h2>
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
                {project.platform && (
                  <div>
                    <h3 className="text-2xs font-semibold tracking-widest uppercase text-text-3 mb-2">Platform</h3>
                    <p className="text-base font-medium">{project.platform}</p>
                  </div>
                )}
                {project.duration && (
                  <div>
                    <h3 className="text-2xs font-semibold tracking-widest uppercase text-text-3 mb-2">Duration</h3>
                    <p className="text-base font-medium">{project.duration}</p>
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
                    <h3 className="text-2xs font-semibold tracking-widest uppercase text-text-3 mb-2">Software Used</h3>
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

        {/* Process Breakdown */}
        {project.process && Object.keys(project.process).length > 0 && (
          <section className="py-16 md:py-24 border-b border-border/50 bg-bg-2">
            <div className="container">
              <p className="section-label mb-8">Process & Execution</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {Object.entries(project.process).map(([key, desc], i) => (
                  <div key={key} className="glass p-6 rounded-xl border border-border">
                    <div className="text-2xs font-bold text-text-3 mb-3 uppercase tracking-wider">
                      {String(i + 1).padStart(2, '0')} — {key}
                    </div>
                    <p className="text-sm text-text-2 leading-relaxed">{String(desc)}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Gallery */}
        {project.gallery && project.gallery.length > 0 && (
          <section className="py-16 md:py-24 border-b border-border/50">
            <div className="container">
              <p className="section-label mb-8">Gallery</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {project.gallery.map((img, i) => (
                  <div key={i} className="relative aspect-video rounded-xl overflow-hidden border border-border" data-cursor="view">
                    <Image src={img} alt={`${project.title} gallery image ${i + 1}`} fill className="object-cover" />
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
              <p className="section-label mb-8">More Like This</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {related.map(p => (
                  <Link key={p.id} href={`/work/${p.slug}`} className="group block" data-cursor="view-project">
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-border mb-4">
                      <Image src={p.thumbnail} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-400" />
                    </div>
                    <h3 className="font-semibold text-lg">{p.title}</h3>
                    <p className="text-sm text-text-3">{p.client}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection
          label="Let's Work Together"
          heading="Ready to elevate your visual storytelling?"
          cta="Start Your Project"
          href="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
