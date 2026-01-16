'use server';

import { createServerSupabaseClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default async function LogoutForm() {
  async function handleLogout() {
    const supabase = await createServerSupabaseClient();
    await supabase.auth.signOut();
    redirect('/');
  }

  return (
    <form action={handleLogout}>
      <Button variant="outline" size="sm" type="submit">Logout</Button>
    </form>
  );
}
