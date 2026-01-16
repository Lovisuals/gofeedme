'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const poolSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  image_url: z.string().url('Invalid URL').optional(),
  total_amount: z.coerce.number().min(1000, 'Minimum ₦1000'),
  slots_total: z.coerce.number().min(2, 'Minimum 2 slots'),
  location: z.string().min(1, 'Location required'),
  deadline: z.coerce.date().refine(date => date > new Date(), { message: 'Deadline must be in the future' }),
});

export async function createPool(formData: FormData) {
  console.log('[createPool] STARTED');

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
    return { error: 'You must be signed in to create a pool' };
  }

  const rawData = {
    title: formData.get('title'),
    image_url: formData.get('image_url'),
    total_amount: formData.get('total_amount'),
    slots_total: formData.get('slots_total'),
    location: formData.get('location'),
    deadline: formData.get('deadline'),
  };

  const parsed = poolSchema.safeParse(rawData);

  if (!parsed.success) {
    return { error: parsed.error.issues.map(e => e.message).join(', ') };
  }

  const poolData = {
    ...parsed.data,
    creator_id: user.id,
    status: 'active' as const,
  };

  const { error } = await supabase.from('pools').insert([poolData]);

  if (error) {
    console.error('[createPool] Error:', error);
    return { error: error.message };
  }

  console.log('[createPool] SUCCESS');
  redirect('/');
}

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
