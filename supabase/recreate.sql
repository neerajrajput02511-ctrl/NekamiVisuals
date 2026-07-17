DROP TABLE IF EXISTS public.projects;

CREATE TABLE public.projects (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
  
  -- Core
  title text NOT NULL,
  slug text NOT NULL UNIQUE,
  category text NOT NULL,
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
