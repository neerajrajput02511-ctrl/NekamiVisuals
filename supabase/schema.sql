-- NekamiVisuals Database Schema

-- 1. Projects Table
CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Core
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL, -- 'video', 'voice', 'design'
  subcategory text NOT NULL,
  thumbnail text NOT NULL,
  gallery text[] DEFAULT '{}'::text[],
  
  -- Details
  client text,
  description text NOT NULL,
  overview text,
  challenge text,
  process jsonb DEFAULT '{}'::jsonb,
  software text[] DEFAULT '{}'::text[],
  tags text[] DEFAULT '{}'::text[],
  
  -- Specifics (Video / Voice / Design)
  platform text,
  duration text,
  language text,
  "voiceType" text,
  microphone text,
  "colorPalette" text[] DEFAULT '{}'::text[],
  typography jsonb DEFAULT '{}'::jsonb,
  "youtubeUrl" text,
  "audioUrl" text,
  
  -- Meta
  year integer,
  featured boolean DEFAULT false,
  popular boolean DEFAULT false,
  status text DEFAULT 'draft' NOT NULL,
  "order" integer DEFAULT 0
);

-- 2. Achievements Table
CREATE TABLE public.achievements (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  title text NOT NULL,
  category text NOT NULL,
  organization text NOT NULL,
  date text NOT NULL,
  description text NOT NULL,
  
  "coverImage" text,
  "badgeUrl" text,
  "certificateUrl" text,
  "externalLink" text,
  
  "order" integer DEFAULT 0
);

-- 3. Messages Table (Contact Form)
CREATE TABLE public.messages (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  name text NOT NULL,
  email text NOT NULL,
  country text,
  company text,
  service text NOT NULL,
  budget text,
  deadline text,
  message text NOT NULL,
  
  status text DEFAULT 'unread' NOT NULL -- 'unread', 'read', 'replied'
);

-- 4. Settings Table
CREATE TABLE public.settings (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  "heroHeading" text,
  "heroDescription" text,
  email text,
  whatsapp text,
  instagram text,
  linkedin text,
  behance text,
  youtube text,
  
  "seoTitle" text,
  "seoDescription" text
);

-- Insert Default Settings
INSERT INTO public.settings ("heroHeading", "heroDescription", email, whatsapp, instagram, linkedin, behance, youtube, "seoTitle", "seoDescription")
VALUES (
  'Creating Visual Stories That Leave an Impression.',
  'NekamiVisuals helps creators, brands and businesses elevate their content through cinematic video editing, professional voice artistry and impactful graphic design.',
  'neeraj@nekamivisuals.com',
  '+919999999999',
  'https://instagram.com/nekamivisuals',
  'https://linkedin.com/in/neerajsingh',
  'https://behance.net/nekamivisuals',
  'https://youtube.com/@nekamivisuals',
  'NekamiVisuals — Creative Freelancer · Video, Voice & Design',
  'Cinematic video editing, professional voice artistry and impactful graphic design for brands, creators and businesses worldwide.'
);

-- 5. Storage Buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);

-- Enable RLS
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- Setup Policies

-- Projects: Anyone can read published, only authenticated can read/write all
CREATE POLICY "Public profiles are viewable by everyone." ON public.projects FOR SELECT USING ( status = 'published' );
CREATE POLICY "Authenticated users can do everything on projects." ON public.projects TO authenticated USING (true) WITH CHECK (true);

-- Achievements: Anyone can read, only authenticated can write
CREATE POLICY "Public achievements are viewable by everyone." ON public.achievements FOR SELECT USING (true);
CREATE POLICY "Authenticated users can do everything on achievements." ON public.achievements TO authenticated USING (true) WITH CHECK (true);

-- Settings: Anyone can read, only authenticated can write
CREATE POLICY "Public settings are viewable by everyone." ON public.settings FOR SELECT USING (true);
CREATE POLICY "Authenticated users can do everything on settings." ON public.settings TO authenticated USING (true) WITH CHECK (true);

-- Messages: Anyone can insert, only authenticated can read/update
CREATE POLICY "Anyone can insert messages." ON public.messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Authenticated users can read messages." ON public.messages FOR SELECT TO authenticated USING (true);
CREATE POLICY "Authenticated users can update messages." ON public.messages FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
CREATE POLICY "Authenticated users can delete messages." ON public.messages FOR DELETE TO authenticated USING (true);

-- Storage bucket policies (media)
CREATE POLICY "Public Access" ON storage.objects FOR SELECT USING ( bucket_id = 'media' );
CREATE POLICY "Authenticated Access" ON storage.objects FOR ALL TO authenticated USING ( bucket_id = 'media' );
