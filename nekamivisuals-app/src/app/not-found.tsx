import Link from 'next/link';
import { Navbar } from '@/components/layout/Navbar';

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
        {/* Big 404 */}
        <div
          className="not-found-number select-none pointer-events-none absolute"
          aria-hidden="true"
        >
          404
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center gap-6">
          <p className="section-label">Page Not Found</p>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tighter leading-tight max-w-md">
            Looks like<br />you&apos;re lost.
          </h1>
          <p className="text-text-3 text-base max-w-xs">
            The page you&apos;re looking for doesn&apos;t exist or has been moved.
          </p>
          <Link
            href="/"
            className="mt-2 inline-flex items-center gap-2 px-6 py-3 rounded-full border border-border hover:border-border-hover hover:bg-white/5 text-sm font-medium transition-all duration-250"
          >
            ← Back Home
          </Link>
        </div>
      </main>
    </>
  );
}
