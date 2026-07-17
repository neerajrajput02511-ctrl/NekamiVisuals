import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/sections/PageHeader';
import { DesignGallery } from '@/components/sections/DesignGallery';
import { CTASection } from '@/components/sections/CTASection';
import { createClient } from '@/lib/supabase/server';
import type { Project } from '@/types';

export const metadata: Metadata = {
  title: 'Graphic Design',
  description: 'Impactful visual identities, striking thumbnails, and cohesive brand designs.',
};

export const revalidate = 60;

export default async function DesignPage() {
  const supabase = await createClient();
  const { data: projectsData } = await supabase
    .from('projects')
    .select('*')
    .eq('category', 'design')
    .eq('status', 'published')
    .order('order', { ascending: true });

  const projects = (projectsData || []) as unknown as Project[];

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Graphic Design"
          heading="Visual Design."
          description="Impactful visual identities, striking thumbnails, and cohesive brand designs."
        />
        <DesignGallery initialProjects={projects} />
        <CTASection
          label="Start Creating"
          heading="Ready to define your visual identity?"
          cta="Start Your Project"
          href="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
