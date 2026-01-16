'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function joinPoolAction(poolId: string) {
  const supabase = await createServerSupabaseClient();

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be signed in to join a pool' };
  }

  // Check pool exists and is not full
  const { data: pool, error: poolError } = await supabase
    .from('pools')
    .select('slots_total, slots_filled')
    .eq('id', poolId)
    .single();

  if (poolError || !pool) {
    return { error: 'Pool not found' };
  }

  if (pool.slots_filled >= pool.slots_total) {
    return { error: 'Pool is full' };
  }

  // Increment slots_filled
  const { error } = await supabase
    .from('pools')
    .update({ slots_filled: pool.slots_filled + 1 })
    .eq('id', poolId);

  if (error) {
    console.error('Join pool error:', error);
    return { error: 'Failed to join pool' };
  }

  return { success: true };
}
