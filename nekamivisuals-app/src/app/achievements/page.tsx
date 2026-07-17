import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/sections/PageHeader';
import { AchievementsGrid } from '@/components/sections/AchievementsGrid';
import { CTASection } from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'Milestones, certifications, recognitions and accomplishments by NekamiVisuals.',
};

export default function AchievementsPage() {
  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Track Record"
          heading="Achievements."
          description="Milestones, certifications, recognitions and accomplishments — a record of continuous growth and learning."
        />
        <AchievementsGrid />
        <CTASection
          label="Next Step"
          heading="Ready to be next on the list?"
          cta="Start Your Project"
          href="/contact"
        />
      </main>
      <Footer />
    </>
  );
}
