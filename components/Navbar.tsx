'use client';

import Link from 'next/link';
import { Search, HeartHandshake } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

export default function Navbar() {
  const [user, setUser] = useState<any>(null);
  const [supabaseClient, setSupabaseClient] = useState<any>(null);
  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    try {
      if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) {
        throw new Error('Missing Supabase environment variables');
      }

      const client = createBrowserClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
      );
      setSupabaseClient(client);

      const fetchUser = async () => {
        const { data } = await client.auth.getUser();
        setUser(data.user);
      };
      fetchUser();
    } catch (err: any) {
      console.error('Navbar init error:', err);
      setLoadError(err.message || 'Failed to initialize auth');
    }
  }, []);

  if (loadError) {
    return (
      <nav className="bg-white fixed top-0 left-0 right-0 z-50 border-b border-red-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center text-red-600">
          GoFeedMe – Error: {loadError} (check console & env vars)
        </div>
      </nav>
    );
  }

  if (!supabaseClient) {
    return null; // Loading state
  }

  return (
    <nav className="bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <HeartHandshake className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-gray-text">
            GoFeedMe
          </span>
        </Link>

        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search food pools..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <Link href="/protected" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Dashboard
            </Link>
          ) : (
            <Link href="/auth/login" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Sign in
            </Link>
          )}

          <Button asChild className="bg-primary hover:bg-primary-hover text-white">
            <Link href="/create">Start a Pool</Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
