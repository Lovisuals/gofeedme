'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default function LogoutForm() {
  async function handleLogout() {
    'use server';
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();
    redirect('/');
  }

  return (
    <form action={handleLogout}>
      <Button variant="outline" type="submit">Logout</Button>
    </form>
  );
}
