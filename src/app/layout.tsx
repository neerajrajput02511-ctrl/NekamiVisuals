import type { Metadata, Viewport } from 'next';
import '@/app/globals.css';
import { PageLoader } from '@/components/animations/PageLoader';
import { ScrollProgress } from '@/components/animations/ScrollProgress';
import { SmoothScroll } from '@/components/animations/SmoothScroll';
import { Navbar } from '@/components/layout/Navbar';

export const metadata: Metadata = {
  metadataBase: new URL('https://nekamivisuals.com'),
  title: {
    default: 'NekamiVisuals — Creative Freelancer · Video, Voice & Design',
    template: '%s — NekamiVisuals',
  },
  description:
    'Cinematic video editing, professional voice artistry and impactful graphic design for brands, creators and businesses worldwide.',
  keywords: [
    'NekamiVisuals', 'Neeraj Singh', 'video editing', 'voice artist',
    'graphic design', 'creative freelancer', 'cinematic', 'premium',
  ],
  authors: [{ name: 'Neeraj Singh', url: 'https://nekamivisuals.com' }],
  creator: 'Neeraj Singh',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nekamivisuals.com',
    siteName: 'NekamiVisuals',
    title: 'NekamiVisuals — Creating Visual Stories That Leave an Impression',
    description: 'Cinematic video editing, professional voice artistry and impactful graphic design.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'NekamiVisuals' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NekamiVisuals — Creative Freelancer',
    description: 'Cinematic video editing, voice artistry & design.',
    images: ['/og-image.jpg'],
  },
  robots: { index: true, follow: true },
  alternates: { canonical: 'https://nekamivisuals.com' },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#050505',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <body>
        <PageLoader />
        <ScrollProgress />
        <Navbar />
        <SmoothScroll>
          {children}
        </SmoothScroll>
        {/* Lightbox mount point */}
        <div id="lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" />
      </body>
    </html>
  );
}
