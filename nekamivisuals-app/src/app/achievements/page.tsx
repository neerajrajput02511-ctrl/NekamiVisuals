import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { PageHeader } from '@/components/sections/PageHeader';
import { AchievementsGrid } from '@/components/sections/AchievementsGrid';
import { CTASection } from '@/components/sections/CTASection';
import { createClient } from '@/lib/supabase/server';
import type { Achievement } from '@/types';

export const metadata: Metadata = {
  title: 'Achievements',
  description: 'Milestones, certifications, recognitions and accomplishments by NekamiVisuals.',
};

export const revalidate = 60;

export default async function AchievementsPage() {
  const supabase = await createClient();
  const { data: achievementsData } = await supabase
    .from('achievements')
    .select('*')
    .order('order', { ascending: true });

  const achievements = (achievementsData || []) as unknown as Achievement[];

  return (
    <>
      <Navbar />
      <main>
        <PageHeader
          label="Track Record"
          heading="Achievements."
          description="Milestones, certifications, recognitions and accomplishments — a record of continuous growth and learning."
        />
        <AchievementsGrid initialAchievements={achievements} />
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
