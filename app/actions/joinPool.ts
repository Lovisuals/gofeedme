'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export async function joinPoolAction(poolId: string) {
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

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be signed in to join a pool' };
  }

  // Check if user already joined
  const { data: existing } = await supabase
    .from('pool_participants')
    .select('id')
    .eq('pool_id', poolId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (existing) {
    return { error: 'You have already joined this pool' };
  }

  // Get pool
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
  const { error: updateError } = await supabase
    .from('pools')
    .update({ slots_filled: pool.slots_filled + 1 })
    .eq('id', poolId);

  if (updateError) {
    return { error: 'Failed to join pool' };
  }

  // Record participant
  const { error: participantError } = await supabase
    .from('pool_participants')
    .insert({
      pool_id: poolId,
      user_id: user.id,
      joined_at: new Date().toISOString(),
    });

  if (participantError) {
    // Rollback on failure
    await supabase
      .from('pools')
      .update({ slots_filled: pool.slots_filled })
      .eq('id', poolId);
    return { error: 'Failed to record participation' };
  }

  revalidatePath('/');

  return { success: true, message: 'Joined successfully!' };
}
