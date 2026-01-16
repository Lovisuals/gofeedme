'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { z } from 'zod';

const poolSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  image_url: z.string().url('Invalid URL').optional(),
  total_amount: z.number().min(1000, 'Minimum ₦1000'),
  slots_total: z.number().min(2, 'Minimum 2 slots'),
  location: z.string().min(1, 'Location required'),
  deadline: z.string().min(1, 'Deadline required'),
  status: z.enum(['active', 'filled', 'completed', 'cancelled']),
});

export async function createPool(formData: FormData) {
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
    title: formData.get('title') as string,
    image_url: formData.get('image_url') as string,
    total_amount: Number(formData.get('total_amount')),
    slots_total: Number(formData.get('slots_total')),
    location: formData.get('location') as string,
    deadline: formData.get('deadline') as string,
    status: 'active',
  };

  const parsed = poolSchema.safeParse(rawData);

  if (!parsed.success) {
    return { error: parsed.error.errors.map(e => e.message).join(', ') };
  }

  const data = {
    ...parsed.data,
    creator_id: user.id,
  };

  const { error } = await supabase.from('pools').insert([data]);

  if (error) {
    console.error('Create pool error:', error);
    return { error: error.message };
  }

  redirect('/');
}

export async function getActivePools() {
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

  const { data, error } = await supabase
    .from('pools')
    .select('*')
    .eq('status', 'active')
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    console.error('Get active pools error:', error);
    return [];
  }

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
}
