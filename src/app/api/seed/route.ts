import { NextResponse } from 'next/server';
export const dynamic = 'force-dynamic';
import { createClient } from '@supabase/supabase-js';
import { projects, achievements } from '@/data';

// Note: Using standard supabase-js client with the service role key to bypass RLS for seeding
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseKey);

export async function GET() {
  try {
    // 1. Seed Projects
    const projectsToInsert = projects.map(p => ({
      // Exclude id so Supabase generates a valid UUID, unless you need to keep the exact string IDs
      // Actually, our existing IDs are strings (e.g. 'cinematic-brand'). 
      // Our schema uses UUIDs. So we let Supabase generate new UUIDs!
      title: p.title,
      slug: p.slug,
      category: p.category,
      subcategory: p.subcategory || p.category,
      thumbnail: p.thumbnail,
      gallery: p.gallery || [],
      client: p.client || null,
      description: p.description,
      overview: p.overview || null,
      challenge: p.challenge || null,
      process: p.process || null,
      software: p.software || [],
      tags: p.tags || [],
      language: p.language || null,
      duration: p.duration || null,
      voiceType: p.voiceType || null,
      colorPalette: p.colorPalette || [],
      typography: p.typography || null,
      youtubeUrl: p.youtubeUrl || null,
      audioUrl: p.audioUrl || null,
      year: p.year,
      featured: p.featured || false,
      popular: p.popular || false,
      status: p.status || 'published',
      order: p.order || 0
    }));

    const { error: projectsError } = await supabase
      .from('projects')
      .insert(projectsToInsert);

    if (projectsError) {
      console.error('Error inserting projects:', projectsError);
      return NextResponse.json({ error: 'Failed to seed projects', details: projectsError }, { status: 500 });
    }

    // 2. Seed Achievements
    const achievementsToInsert = achievements.map(a => ({
      title: a.title,
      category: a.category,
      organization: a.organization,
      description: a.description,
      date: a.date,
      coverImage: a.coverImage || null,
      badgeUrl: a.badgeUrl || null,
      certificateUrl: a.certificateUrl || null,
      externalLink: a.externalLink || null,
      order: a.order || 0
    }));

    if (achievementsToInsert.length > 0) {
      const { error: achievementsError } = await supabase
        .from('achievements')
        .insert(achievementsToInsert);

      if (achievementsError) {
        console.error('Error inserting achievements:', achievementsError);
        return NextResponse.json({ error: 'Failed to seed achievements', details: achievementsError }, { status: 500 });
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Successfully seeded ${projectsToInsert.length} projects and ${achievementsToInsert.length} achievements.` 
    });
  } catch (error) {
    console.error('Seed error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
