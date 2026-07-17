import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { FeaturedWork } from '@/components/sections/FeaturedWork';
import { ServicesStrip } from '@/components/sections/ServicesStrip';
import { AboutPreview } from '@/components/sections/AboutPreview';
import { MarqueeStrip } from '@/components/sections/MarqueeStrip';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'NekamiVisuals — Creative Freelancer · Video, Voice & Design',
  description: 'Creating visual stories that leave an impression. Cinematic video editing, voice artistry and graphic design for brands worldwide.',
};

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturedWork />
        <MarqueeStrip />
        <ServicesStrip />
        <AboutPreview />
        <CTASection
          label="Let's Collaborate"
          heading="Let's create something extraordinary together."
          cta="Start Your Project"
          href="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
