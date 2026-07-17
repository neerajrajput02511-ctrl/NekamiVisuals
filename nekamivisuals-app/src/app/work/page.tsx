import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/sections/PageHeader';
import { WorkGallery } from '@/components/sections/WorkGallery';
import { CTASection } from '@/components/sections/CTASection';
import { createClient } from '@/lib/supabase/server';
import type { Project } from '@/types';

export const metadata: Metadata = {
  title: 'Work',
  description: 'A curated collection of cinematic edits, voice performances and creative designs crafted to tell stories that leave an impression.',
};

// Revalidate every 60 seconds or on demand
export const revalidate = 60;

export default async function WorkPage() {
  const supabase = await createClient();
  const { data: projectsData, error } = await supabase
    .from('projects')
    .select('*')
    .eq('status', 'published')
    .order('order', { ascending: true });

  if (error) {
    console.error('Error fetching projects:', error);
  }

  const projects = (projectsData || []) as unknown as Project[];

  return (
    <>
      <main>
        <PageHeader
          label="Portfolio"
          heading="Selected Work."
          description="A curated collection of cinematic edits, voice performances and creative designs crafted to tell stories that leave an impression."
        />
        <WorkGallery initialProjects={projects} />
        <CTASection
          label="Collaborate"
          heading="Have a project in mind?"
          cta="Get in Touch"
          href="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
