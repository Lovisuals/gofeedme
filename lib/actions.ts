'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function createPool(formData: FormData) {
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

  const data = {
    title: formData.get('title') as string,
    image_url: formData.get('image_url') as string,
    total_amount: Number(formData.get('total_amount')),
    slots_total: Number(formData.get('slots_total')),
    location: formData.get('location') as string,
    deadline: formData.get('deadline') as string,
    status: 'active',
  };

  const { error } = await supabase.from('pools').insert([data]);

  if (error) {
    console.error('Supabase insert error:', error);
    return { error: error.message };
  }

  redirect('/');
}

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
    console.error('Supabase fetch error:', error);
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
