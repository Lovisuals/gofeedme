'use server';

import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export async function createReadonlySupabaseClient() {
  const cookieStore = cookies(); // read-only, no await needed in some contexts

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        // NO set or remove — prevent writes
        set() {},
        remove() {},
      },
    }
  );
}
