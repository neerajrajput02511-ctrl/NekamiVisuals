import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/sections/PageHeader';
import { DesignGallery } from '@/components/sections/DesignGallery';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Graphic Design',
  description: 'Brand identities, social visuals, thumbnails and layouts crafted to capture attention and communicate with precision.',
};

export default function DesignPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Graphic Design"
          heading="Design Gallery."
          description="Brand identities, social visuals, thumbnails and layouts — each crafted to capture attention and communicate with precision."
        />
        <DesignGallery />
        <CTASection
          label="Commission a Design"
          heading="Need impactful design for your brand?"
          cta="Start a Project"
          href="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
