'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
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
  const supabase = await createServerSupabaseClient();

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
    creator_id: user.id,           // ← always set server-side
    status: 'active' as const,
  };

  const { error } = await supabase.from('pools').insert([poolData]);

  if (error) {
    console.error('Create pool error:', error);
    return { error: error.message };
  }

  redirect('/');
}
