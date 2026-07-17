import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/sections/PageHeader';
import { VoiceGallery } from '@/components/sections/VoiceGallery';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Voice Artist',
  description: 'Professional voice performances crafted for brands, creators and businesses. Commercial narration, documentaries, explainers and more.',
};

export default function VoicePage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Voice Artistry"
          heading="Voice Artist."
          description="Professional voice performances crafted for brands, creators and businesses — delivered with warmth, authority and precision."
        />
        <VoiceGallery />
        <CTASection
          label="Book a Session"
          heading="Need a professional voice for your project?"
          cta="Get in Touch"
          href="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
