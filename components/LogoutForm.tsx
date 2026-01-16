'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

async function handleLogout() {
  const supabase = await createServerSupabaseClient();
  await supabase.auth.signOut();
  redirect('/');
}

export default function LogoutForm() {
  return (
    <form action={handleLogout}>
      <Button variant="outline" type="submit">Logout</Button>
    </form>
  );
}
