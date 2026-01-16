'use server';

import { createReadonlySupabaseClient } from '@/lib/supabase/server-readonly';

export async function getActivePools() {
  console.log('[getActivePools] STARTED');

  try {
    const supabase = await createReadonlySupabaseClient();
    console.log('[getActivePools] Read-only client created');

    const { data, error } = await supabase
      .from('pools')
      .select('*')
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(6);

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
