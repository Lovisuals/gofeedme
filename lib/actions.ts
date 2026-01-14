'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function getActivePools() {
  const cookieStore = cookies();

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
      },
    }
  );

  const { data, error } = await supabase
    .from('pools')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    console.error('Error fetching pools:', error);
    return [];
  }

  // Format for PoolCard props
  return data.map(pool => ({
    id: pool.id,
    title: pool.title,
    image: pool.image || 'https://via.placeholder.com/400x300?text=Pool+Image',
    total: pool.total_amount,
    raised: pool.total_amount * (pool.slots_filled / pool.slots_total), // approximate
    slotsTotal: pool.slots_total,
    slotsFilled: pool.slots_filled,
    location: pool.location,
    timeLeft: pool.deadline ? new Date(pool.deadline).toLocaleDateString() : 'Ongoing',
  }));
}
