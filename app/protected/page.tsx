'use client';

import { createClient } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Dashboard() {
  const [user, setUser ] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pools, setPools] = useState([]);

  useEffect(() => {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );

    const getData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);

      // Stub: Fetch user's pools (customize later)
      const { data: poolsData } = await supabase.from('pools').select('*').eq('created_by', user?.id);  // Assume 'created_by' column
      setPools(poolsData || []);
      setLoading(false);
    };

    getData();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  if (!user) return <div className="p-8">Please sign in</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-6 text-gray-900">Your Dashboard</h1>
      <p className="text-lg mb-8">Welcome back, {user.email}</p>

      <Card>
        <CardHeader>
          <CardTitle>Your Pools</CardTitle>
        </CardHeader>
        <CardContent>
          {pools.length > 0 ? (
            <div className="grid gap-4">
              {pools.map((pool) => (
                <div key={pool.id} className="p-4 border rounded">
                  <h3 className="font-semibold">{pool.title}</h3>
                  <p>Status: {pool.status}</p>
                  <p>Slots Filled: {pool.slots_filled}/{pool.slots_total}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No pools yet. Start one!</p>
          )}
          <Link href="/create">
            <Button className="mt-4 bg-primary hover:bg-primary-hover">Start New Pool</Button>
          </Link>
        </CardContent>
      </Card>

      {/* Add more sections: contributions, settings, etc. */}
    </div>
  );
}
