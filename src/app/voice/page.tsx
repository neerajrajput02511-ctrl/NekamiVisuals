import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/sections/PageHeader';
import { VoiceGallery } from '@/components/sections/VoiceGallery';
import { CTASection } from '@/components/sections/CTASection';
import { createClient } from '@/lib/supabase/server';
import type { Project } from '@/types';

export const metadata: Metadata = {
  title: 'Voice Artist',
  description: 'Professional voice performances crafted for brands, creators and businesses.',
};

export const revalidate = 60;

export default async function VoicePage() {
  const supabase = await createClient();
  const { data: projectsData } = await supabase
    .from('projects')
    .select('*')
    .eq('category', 'voice')
    .eq('status', 'published')
    .order('order', { ascending: true });

  const projects = (projectsData || []) as unknown as Project[];

  return (
    <>
      <main>
        <PageHeader
          label="Voice Over"
          heading="Voice Artist."
          description="Professional voice performances crafted for brands, creators and businesses."
        />
        <VoiceGallery initialProjects={projects} />
        <CTASection
          label="Let's Talk"
          heading="Need a voice for your project?"
          cta="Contact Me"
          href="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
