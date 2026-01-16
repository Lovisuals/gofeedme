import { createReadonlySupabaseClient } from '@/lib/supabase/server-readonly';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { logoutAction } from '@/app/auth/actions/auth';

export default async function Navbar() {
  const supabase = await createReadonlySupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <nav className="fixed top-0 w-full bg-white border-b z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">🤝</span>
            </div>
            <span className="text-2xl font-bold text-primary">GoFeedMe</span>
          </Link>

          <div className="flex items-center gap-4">
            <input
              type="search"
              placeholder="Search pools..."
              className="w-64 p-2 border rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-primary hidden md:block"
            />
            {user ? (
              <form action={logoutAction}>
                <Button variant="outline" size="sm" type="submit">Logout</Button>
              </form>
            ) : (
              <Link href="/auth/login">
                <Button variant="outline" size="sm">Sign In</Button>
              </Link>
            )}
            <Link href="/create">
              <Button size="sm" className="bg-primary hover:bg-primary-hover">Start a Pool</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
