import { createServerSupabaseClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import LogoutForm from './LogoutForm';

export default async function Navbar() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="fixed top-0 w-full bg-white border-b z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <h1 className="text-2xl font-bold text-primary">GoFeedMe</h1>
        </Link>

        <div className="flex items-center gap-4">
          <input type="search" placeholder="Search pools..." className="p-2 border rounded hidden md:block" />
          {user ? (
            <LogoutForm />
          ) : (
            <Link href="/auth/login">
              <Button variant="outline">Sign In</Button>
            </Link>
          )}
          <Link href="/create">
            <Button className="bg-primary hover:bg-primary-hover">Start a Pool</Button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
