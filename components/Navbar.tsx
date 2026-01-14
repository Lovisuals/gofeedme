'use client';

import Link from 'next/link';
import { Search, HeartHandshake } from 'lucide-react';
import { createBrowserClient } from '@supabase/ssr';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button'; // shadcn/ui button

export default function Navbar() {
  const [user, setUser] = useState<any>(null);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const getUser = async () => {
      const { data } = await supabase.auth.getUser();
      setUser(data.user);
    };
    getUser();
  }, [supabase]);

  return (
    <nav className="bg-white/95 backdrop-blur-sm fixed top-0 left-0 right-0 z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <HeartHandshake className="h-8 w-8 text-primary" />
          <span className="text-xl font-bold tracking-tight text-gray-text">
            GoFeedMe
          </span>
        </Link>

        {/* Search (desktop) */}
        <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search food pools, farms, staples..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
          />
        </div>

        {/* Actions */}
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

          <Button asChild variant="default" size="sm" className="bg-primary hover:bg-primary-hover text-white font-medium">
            <Link href="/create">
              Start a Pool
            </Link>
          </Button>
        </div>
      </div>
    </nav>
  );
}
