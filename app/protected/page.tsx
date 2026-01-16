'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function ProtectedPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const checkUser = async () => {
      try {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) throw error;
        if (!user) {
          window.location.href = '/auth/login';
          return;
        }
        setUser(user);
      } catch (err) {
        setError((err as Error).message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    checkUser();
  }, []);

  if (loading) return <div className="p-8 text-center">Loading dashboard...</div>;

  if (error) return <div className="p-8 text-center text-red-600">Error: {error}</div>;

  if (!user) return null;

  return (
    <div className="min-h-screen bg-gray-50 p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Your Dashboard</h1>
        <p className="text-lg text-gray-600 mb-8">Welcome back, {user.email}</p>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Your Created Pools</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">No pools created yet. Start one!</p>
            <Link href="/create">
              <Button className="mt-6 bg-primary hover:bg-primary-hover">
                Start New Pool
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
