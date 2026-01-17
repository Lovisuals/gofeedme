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

  // Get current authenticated user
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return { error: 'You must be signed in to join a pool' };
  }

  // Check if user already joined this pool
  const { data: existing } = await supabase
    .from('pool_participants')
    .select('id')
    .eq('pool_id', poolId)
    .eq('user_id', user.id)
    .maybeSingle();

  if (existing) {
    return { error: 'You have already joined this pool' };
  }

  // Get current pool state (with lock)
  const { data: pool, error: fetchError } = await supabase
    .from('pools')
    .select('slots_total, slots_filled')
    .eq('id', poolId)
    .single();

  if (fetchError || !pool) {
    return { error: 'Pool not found' };
  }

  if (pool.slots_filled >= pool.slots_total) {
    return { error: 'This pool is already full' };
  }

  // Increment slots_filled
  const { error: updateError } = await supabase
    .from('pools')
    .update({ slots_filled: pool.slots_filled + 1 })
    .eq('id', poolId);

  if (updateError) {
    console.error('Update slots_filled failed:', updateError);
    return { error: 'Failed to join pool – please try again' };
  }

  // Record the participant (for future duplicate prevention + participant list)
  const { error: participantError } = await supabase
    .from('pool_participants')
    .insert({
      pool_id: poolId,
      user_id: user.id,
      joined_at: new Date().toISOString(),
    });

  if (participantError) {
    console.error('Participant record failed:', participantError);
    // Optional: rollback slots_filled (best effort)
    await supabase
      .from('pools')
      .update({ slots_filled: pool.slots_filled })
      .eq('id', poolId);
    return { error: 'Failed to record your participation' };
  }

  // Revalidate home page cache so updated slots show immediately
  revalidatePath('/');

  return { success: true, message: 'Joined successfully! 🎉' };
}
