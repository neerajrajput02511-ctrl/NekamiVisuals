'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';
import { cn } from '@/lib/utils';

// Placeholder credentials (will be replaced with Supabase Auth in Phase 4)
const ADMIN_EMAIL = 'admin@nekamivisuals.com';
const ADMIN_PASS  = 'NekamiAdmin2026!';

export function AdminLoginForm() {
  const router = useRouter();
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [error,    setError]    = useState('');
  const [loading,  setLoading]  = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    // Placeholder auth — Phase 4 replaces with Supabase
    if (email === ADMIN_EMAIL && password === ADMIN_PASS) {
      sessionStorage.setItem('nv_admin', '1');
      router.push('/admin/dashboard');
    } else {
      setError('Invalid credentials. Access denied.');
    }
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md relative z-10">
      {/* Glass card */}
      <div className="glass rounded-2xl p-10 border border-border">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-white" />
          <span className="font-semibold text-sm">NekamiVisuals</span>
          <span className="ml-auto text-2xs font-semibold tracking-widest uppercase text-text-3 border border-border rounded-full px-2 py-0.5">
            Admin
          </span>
        </div>

        <h1 className="text-2xl font-semibold tracking-tight mb-1">Welcome back.</h1>
        <p className="text-sm text-text-3 mb-8">Sign in to manage your portfolio.</p>

        {error && (
          <div className="mb-6 px-4 py-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4" noValidate>
          {/* Email */}
          <div className="relative">
            <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-3 pointer-events-none" />
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="Admin Email"
              required
              autoComplete="email"
              className="w-full pl-11 pr-4 py-3.5 rounded-xl text-sm"
            />
          </div>

          {/* Password */}
          <div className="relative">
            <Lock size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-3 pointer-events-none" />
            <input
              type={showPass ? 'text' : 'password'}
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
              required
              autoComplete="current-password"
              className="w-full pl-11 pr-12 py-3.5 rounded-xl text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPass(!showPass)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-text-3 hover:text-text-2 transition-colors"
              aria-label={showPass ? 'Hide password' : 'Show password'}
            >
              {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>

          {/* Remember + Forgot */}
          <div className="flex items-center justify-between text-xs text-text-3">
            <label className="flex items-center gap-2 select-none">
              <input type="checkbox" className="rounded accent-white w-3 h-3" />
              Remember me
            </label>
            <button type="button" className="hover:text-text-2 transition-colors">Forgot password?</button>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className={cn(
              'w-full py-3.5 rounded-xl text-sm font-semibold transition-all duration-250',
              loading
                ? 'bg-white/10 text-text-3 cursor-not-allowed'
                : 'bg-white text-bg hover:bg-white/90 active:scale-[0.98]'
            )}
          >
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>
        </form>

        <p className="text-center text-xs text-text-3 mt-8">
          This area is restricted to authorized personnel only.
        </p>
      </div>
    </div>
  );
}
