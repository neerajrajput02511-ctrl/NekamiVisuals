import type { Metadata } from 'next';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';

export const metadata: Metadata = {
  title: 'Admin — NekamiVisuals',
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Navbar is hidden for /admin/* via Navbar component logic */}
      <div className="flex min-h-screen bg-bg">
        {children}
      </div>
    </>
  );
}
