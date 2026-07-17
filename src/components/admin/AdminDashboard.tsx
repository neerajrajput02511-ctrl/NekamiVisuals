'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard, FolderOpen, Mic, Palette, Trophy, ImageIcon,
  MessageSquare, BarChart2, Settings, Search, LogOut, User, Globe,
  Plus, Bell, ChevronRight,
} from 'lucide-react';

const navItems = [
  { label: 'Dashboard',      href: '/admin/dashboard',     icon: LayoutDashboard },
  { label: 'Projects',       href: '/admin/projects',      icon: FolderOpen },
  { label: 'Voice Portfolio',href: '/admin/voice',         icon: Mic },
  { label: 'Graphic Design', href: '/admin/design',        icon: Palette },
  { label: 'Achievements',   href: '/admin/achievements',  icon: Trophy },
  { label: 'Media Library',  href: '/admin/media',         icon: ImageIcon },
  { label: 'Messages',       href: '/admin/messages',      icon: MessageSquare },
  { label: 'Analytics',      href: '/admin/analytics',     icon: BarChart2 },
  { label: 'Settings',       href: '/admin/settings',      icon: Settings },
  { label: 'SEO',            href: '/admin/seo',           icon: Globe },
  { label: 'Profile',        href: '/admin/profile',       icon: User },
];

const statsData = [
  { label: 'Total Projects',  value: 12, icon: FolderOpen,  change: '+2 this month' },
  { label: 'Video Projects',  value: 5,  icon: LayoutDashboard, change: '+1 this month' },
  { label: 'Voice Projects',  value: 4,  icon: Mic,          change: 'Same' },
  { label: 'Designs',         value: 3,  icon: Palette,      change: '+2 this month' },
  { label: 'Achievements',    value: 0,  icon: Trophy,       change: 'Add your first' },
  { label: 'Messages',        value: 0,  icon: MessageSquare, change: 'No messages yet' },
  { label: 'Visitors (est.)', value: '—', icon: BarChart2,   change: 'Connect analytics' },
  { label: 'Storage Used',    value: '—', icon: ImageIcon,   change: 'Connect Supabase' },
];

export function AdminDashboard() {
  const router   = useRouter();
  const pathname = usePathname();
  const [authed, setAuthed] = useState<boolean | null>(null);

  useEffect(() => {
    // Check session (Phase 4: replaced by Supabase session check)
    const ok = sessionStorage.getItem('nv_admin') === '1';
    setAuthed(ok);
    if (!ok) router.replace('/admin/login');
  }, [router]);

  const handleLogout = () => {
    sessionStorage.removeItem('nv_admin');
    router.replace('/admin/login');
  };

  if (authed === null) return null;
  if (!authed) return null;

  return (
    <div className="flex min-h-screen w-full">
      {/* Sidebar */}
      <aside className="admin-sidebar flex-shrink-0" aria-label="Admin navigation">
        {/* Logo */}
        <div className="px-5 py-5 border-b border-border/50">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-white" />
            <span className="font-semibold text-sm">NekamiVisuals</span>
          </div>
          <p className="text-2xs text-text-3 mt-1 pl-4">Admin Panel</p>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-4 px-3" aria-label="Admin navigation">
          {navItems.map(item => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm mb-0.5 transition-all duration-200',
                  isActive
                    ? 'bg-white/8 text-text font-medium'
                    : 'text-text-3 hover:text-text-2 hover:bg-white/5'
                )}
              >
                <item.icon size={15} className="flex-shrink-0" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* View site + Logout */}
        <div className="px-3 py-4 border-t border-border/50 space-y-1">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-3 hover:text-text-2 hover:bg-white/5 transition-all duration-200"
            data-cursor="open"
          >
            <Globe size={15} />
            View Public Site
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-text-3 hover:text-red-400 hover:bg-red-500/5 transition-all duration-200"
          >
            <LogOut size={15} />
            Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="admin-main flex-1 min-h-screen p-8">
        {/* Top bar */}
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
            <p className="text-sm text-text-3 mt-0.5">Welcome back, Neeraj.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text-3 hover:border-border-hover hover:text-text-2 transition-all duration-200">
              <Bell size={15} />
            </button>
            <Link
              href="/admin/projects/new"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white text-bg text-xs font-semibold hover:bg-white/90 transition-all duration-200"
            >
              <Plus size={13} /> New Project
            </Link>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          {statsData.map(stat => (
            <div
              key={stat.label}
              className="glass rounded-xl p-5 hover:border-border-hover transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-9 h-9 rounded-lg bg-white/5 border border-border flex items-center justify-center">
                  <stat.icon size={15} className="text-text-3" />
                </div>
              </div>
              <p className="text-2xl font-semibold tracking-tight mb-1">{stat.value}</p>
              <p className="text-xs text-text-3 tracking-wide">{stat.label}</p>
              <p className="text-2xs text-text-3/60 mt-1">{stat.change}</p>
            </div>
          ))}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          {[
            { label: 'Add Video Project', href: '/admin/projects/new', icon: FolderOpen },
            { label: 'Upload Voice Work',  href: '/admin/voice/new',    icon: Mic },
            { label: 'Add Design',         href: '/admin/design/new',   icon: Palette },
          ].map(action => (
            <Link
              key={action.label}
              href={action.href}
              className="flex items-center gap-4 glass rounded-xl p-5 hover:border-border-hover group transition-all duration-300"
            >
              <div className="w-10 h-10 rounded-lg bg-white/5 border border-border flex items-center justify-center group-hover:border-border-hover transition-all duration-200">
                <action.icon size={16} className="text-text-3 group-hover:text-text-2 transition-colors" />
              </div>
              <span className="text-sm font-medium group-hover:text-text transition-colors duration-200">{action.label}</span>
              <ChevronRight size={14} className="ml-auto text-text-3 group-hover:translate-x-1 transition-transform duration-200" />
            </Link>
          ))}
        </div>

        {/* Supabase Notice */}
        <div className="glass rounded-2xl p-8 text-center">
          <div className="text-2xl mb-4">🔌</div>
          <h2 className="text-xl font-semibold tracking-tight mb-3">Connect Supabase to Unlock Full Features</h2>
          <p className="text-sm text-text-2 max-w-md mx-auto leading-relaxed mb-6">
            Create a Supabase project and add your credentials to <code className="text-xs bg-white/10 px-1.5 py-0.5 rounded">.env.local</code> to enable project management, message storage, media uploads and analytics.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <a
              href="https://supabase.com"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-2.5 rounded-full bg-white text-bg text-xs font-semibold hover:bg-white/90 transition-all duration-200"
              data-cursor="open"
            >
              Create Supabase Project →
            </a>
            <button className="px-5 py-2.5 rounded-full border border-border text-xs hover:border-border-hover hover:bg-white/5 transition-all duration-200">
              View Setup Guide
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
