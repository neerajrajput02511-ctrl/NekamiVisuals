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
import { VoicePlayer } from '@/components/players/VoicePlayer';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const resolvedParams = await params;
  const supabase = await createClient();
  const { data: project } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .eq('category', 'voice')
    .single();

  if (!project) return {};
  return {
    title: `${project.title} — Voice Artist`,
    description: project.description,
  };
}

export default async function VoiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const supabase = await createClient();
  
  const { data: projectData } = await supabase
    .from('projects')
    .select('*')
    .eq('slug', resolvedParams.slug)
    .eq('category', 'voice')
    .single();

  if (!projectData) notFound();
  const project = projectData as unknown as Project;

  // Find related voice projects
  const { data: relatedData } = await supabase
    .from('projects')
    .select('*')
    .eq('category', 'voice')
    .eq('status', 'published')
    .neq('id', project.id)
    .limit(3);

  const related = (relatedData || []) as unknown as Project[];

  return (
    <>
      <Navbar />
      <main>
        {/* Back Link */}
        <div className="pt-32 pb-8 border-b border-border/50">
          <div className="container">
            <Link
              href="/voice"
              className="inline-flex items-center gap-2 text-sm text-text-3 hover:text-text transition-colors duration-250"
            >
              <ChevronLeft size={16} /> Back to Voice Portfolio
            </Link>
          </div>
        </div>

        {/* Hero & Player Section */}
        <section className="border-b border-border/50 bg-card">
          <div className="container py-8 md:py-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              {/* Cover Image */}
              <div className="relative aspect-square md:aspect-[4/3] rounded-2xl overflow-hidden border border-border">
                <Image
                  src={project.thumbnail}
                  alt={project.title}
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-bg/80 via-transparent" />
              </div>

              {/* Player and Title */}
              <div className="flex flex-col justify-center">
                <div className="mb-6 flex items-center gap-3 flex-wrap">
                  {project.voiceType && (
                    <span className="text-2xs font-semibold tracking-widest uppercase text-text-3 px-3 py-1 rounded-full border border-border bg-white/5">
                      {project.voiceType}
                    </span>
                  )}
                  <span className="text-sm text-text-3">{project.language ?? 'English'}</span>
                  <span className="text-sm text-text-3">{project.duration}</span>
                </div>
                
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tighter leading-none mb-6">
                  {project.title}
                </h1>
                <p className="text-lg text-text-2 leading-relaxed mb-10 max-w-lg">
                  {project.description}
                </p>

                <VoicePlayer 
                  audioUrl={project.audioUrl || ''} 
                  title={project.title} 
                />
              </div>
            </div>
          </div>
        </section>

        {/* Details & Overview */}
        <section className="py-16 md:py-24 border-b border-border/50">
          <div className="container">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8">
              {/* Left: Overview */}
              <div className="lg:col-span-8">
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
                {project.microphone && (
                  <div>
                    <h3 className="text-2xs font-semibold tracking-widest uppercase text-text-3 mb-2">Microphone</h3>
                    <p className="text-base font-medium">{project.microphone}</p>
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

        {/* Related Projects */}
        {related.length > 0 && (
          <section className="py-16 md:py-24 border-b border-border/50">
            <div className="container">
              <p className="section-label mb-8">More Voice Projects</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {related.map(p => (
                  <Link key={p.id} href={`/voice/${p.slug}`} className="group block" data-cursor="listen">
                    <div className="relative aspect-video rounded-xl overflow-hidden border border-border mb-4">
                      <Image src={p.thumbnail} alt={p.title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-400" />
                    </div>
                    <h3 className="font-semibold text-base mb-1">{p.title}</h3>
                    <p className="text-xs text-text-3">{p.voiceType}</p>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}

        <CTASection
          label="Book a Session"
          heading="Ready to give your brand a voice?"
          cta="Get in Touch"
          href="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
