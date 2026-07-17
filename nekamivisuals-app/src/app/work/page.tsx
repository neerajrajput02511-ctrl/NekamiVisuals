import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/sections/PageHeader';
import { WorkGallery } from '@/components/sections/WorkGallery';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Work',
  description: 'A curated collection of cinematic edits, voice performances and creative designs crafted to tell stories that leave an impression.',
};

export default function WorkPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Portfolio"
          heading="Selected Work."
          description="A curated collection of cinematic edits, voice performances and creative designs crafted to tell stories that leave an impression."
        />
        <WorkGallery />
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
