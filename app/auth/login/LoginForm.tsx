'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Eye, EyeOff } from 'lucide-react';

interface LoginFormProps {
  loginAction: (prevState: any, formData: FormData) => Promise<any>;
}

export default function LoginForm({ loginAction }: LoginFormProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction] = useFormState(loginAction, { error: null });

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-2xl text-center">Sign In to GoFeedMe</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="relative">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-9 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>

          {state?.error && (
            <p className="text-red-600 text-sm text-center">{state.error}</p>
          )}

          <Button type="submit" className="w-full bg-primary hover:bg-primary-hover">
            Sign In
          </Button>

          <div className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <Link href="/auth/sign-up" className="text-primary hover:underline">
              Sign Up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
