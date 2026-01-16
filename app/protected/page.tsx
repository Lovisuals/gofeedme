'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js';
import { User } from '@supabase/supabase-js';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [pools, setPools] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const getData = async () => {
      try {
        const { data: { user }, error: userError } = await supabase.auth.getUser();
        if (userError) throw userError;
        if (!user) {
          window.location.href = '/auth/login';
          return;
        }
        setUser(user);

        // Stub: Fetch user's created pools
        const { data: poolsData, error: poolsError } = await supabase
          .from('pools')
          .select('*')
          .eq('creator_id', user.id)
          .order('created_at', { ascending: false });
        if (poolsError) throw poolsError;
        setPools(poolsData || []);
      } catch (err) {
        setError((err as Error).message || 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    };

    getData();
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
            {pools.length > 0 ? (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {pools.map((pool) => (
                  <Card key={pool.id}>
                    <CardContent className="p-4">
                      <h3 className="font-semibold text-lg">{pool.title}</h3>
                      <p className="text-sm text-gray-600 mt-1">{pool.location} · {pool.status}</p>
                      <p className="text-sm mt-2">
                        Slots: {pool.slots_filled || 0}/{pool.slots_total}
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-gray-600">You haven't created any pools yet.</p>
            )}
            <Link href="/create">
              <Button className="mt-6 bg-primary hover:bg-primary-hover">
                Start New Pool
              </Button>
            </Link>
          </CardContent>
        </Card>

        {/* More sections later */}
      </div>
    </div>
  );
}
