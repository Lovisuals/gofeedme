import Link from "next/link";
import { Button } from "./ui/button";
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { LogoutButton } from "./logout-button";

export async function AuthButton() {
  const supabase = await createServerSupabaseClient();
  const { data: { user } } = await supabase.auth.getUser();

  return user ? (
    <div className="flex items-center gap-4">
      Hey, {user.email}!
      <LogoutButton />
    </div>
  ) : (
    <Link href="/auth/login">
      <Button>Sign In</Button>
    </Link>
  );
}
