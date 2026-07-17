// NekamiVisuals — TypeScript Type Definitions

export type ProjectCategory = 'video' | 'voice' | 'design';
export type VideoSubcategory = 'short-form' | 'long-form';
export type VoiceCategory =
  | 'commercial' | 'narration' | 'explainer' | 'audiobook'
  | 'podcast' | 'character' | 'youtube' | 'radio' | 'brand' | 'other';
export type DesignCategory =
  | 'logo' | 'brand-identity' | 'social-media' | 'thumbnail'
  | 'poster' | 'flyer' | 'business-card' | 'presentation' | 'banner' | 'ui';
export type PublishStatus = 'published' | 'draft' | 'archived';
export type SortOption = 'featured' | 'popular' | 'newest' | 'oldest';

export interface Software {
  key: string;
  name: string;
  icon: string;
  color: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: ProjectCategory;
  subcategory?: VideoSubcategory | VoiceCategory | DesignCategory;
  thumbnail: string;
  coverImage?: string;
  videoUrl?: string;
  youtubeUrl?: string;
  audioUrl?: string;
  gallery: string[];
  client: string;
  description: string;
  overview: string;
  challenge: string;
  process: ProcessSteps;
  software: string[];
  tags: string[];
  platform?: string;
  language?: string;
  duration?: string;
  voiceType?: string;
  microphone?: string;
  year: number;
  featured: boolean;
  popular: boolean;
  status: PublishStatus;
  order: number;
  seoTitle?: string;
  seoDescription?: string;
  externalLink?: string;
  colorPalette?: string[];
  typography?: TypographyInfo;
  moodboard?: string[];
  beforeImage?: string;
  afterImage?: string;
  downloadUrl?: string;
}

export interface ProcessSteps {
  planning?: string;
  editing?: string;
  sound?: string;
  motion?: string;
  color?: string;
  optimization?: string;
  [key: string]: string | undefined;
}

export interface TypographyInfo {
  heading: string;
  body: string;
  accent?: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  organization: string;
  category: string;
  date: string;
  coverImage?: string;
  gallery: string[];
  certificateUrl?: string;
  badgeUrl?: string;
  externalLink?: string;
  status: PublishStatus;
  order?: number;
}

export interface Message {
  id: string;
  name: string;
  email: string;
  country?: string;
  company?: string;
  service: string;
  budget?: string;
  deadline?: string;
  message: string;
  fileUrl?: string;
  status: 'unread' | 'read' | 'replied';
  createdAt: string;
}

export interface WebsiteSettings {
  logoText: string;
  heroHeading: string;
  heroDescription: string;
  ctaText: string;
  email: string;
  phone?: string;
  whatsapp?: string;
  instagram?: string;
  youtube?: string;
  linkedin?: string;
  behance?: string;
  footerText: string;
  faviconUrl?: string;
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
}

export interface NavLink {
  label: string;
  href: string;
}

export interface FilterOption {
  label: string;
  value: string;
}

export interface StatsCard {
  label: string;
  value: string | number;
  icon: string;
  change?: string;
}
