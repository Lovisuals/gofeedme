'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import type { PostgrestResponse } from '@supabase/supabase-js';

export async function getActivePools() {
  console.log('[getActivePools] STARTED');

  try {
    const cookieStore = await cookies();

    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          get(name) {
            return cookieStore.get(name)?.value;
          },
          set(name, value, options) {
            cookieStore.set({ name, value, ...options });
          },
          remove(name, options) {
            cookieStore.delete({ name, ...options });
          },
        },
      }
    );

    console.log('[getActivePools] Supabase client created');

    // The actual promise we await
    const queryPromise = supabase
      .from('pools')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(6);

    // Timeout promise (never resolves successfully)
    const timeoutPromise = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error('Supabase query timeout')), 10000)
    );

    // Race the real query promise
    const result = await Promise.race([queryPromise, timeoutPromise]) as PostgrestResponse<any>;

    const { data, error } = result;

    if (error) {
      console.error('[getActivePools] Supabase error:', error);
      return [];
    }

    console.log('[getActivePools] Pools fetched:', data.length);

    return data.map(pool => ({
      id: pool.id,
      title: pool.title,
      image_url: pool.image_url || 'https://via.placeholder.com/400x300?text=Pool',
      total: pool.total_amount,
      raised: pool.total_amount * (pool.slots_filled / pool.slots_total) || 0,
      slotsTotal: pool.slots_total,
      slotsFilled: pool.slots_filled,
      location: pool.location,
      timeLeft: pool.deadline ? new Date(pool.deadline).toLocaleDateString() : 'Ongoing',
    }));
  } catch (err) {
    console.error('[getActivePools] Crash:', err);
    return [];
  }
}
