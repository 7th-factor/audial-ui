'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { AuthFormWrapper } from './auth-form-wrapper';
import { useAuth } from '@/lib/firebase/auth-context';

// Dev mode test credentials (only available in development on localhost)
const DEV_TEST_CREDENTIALS = {
  email: 'dev@audial.local',
  password: 'DevPass123!',
};

// Secure check: Only enable in development AND localhost
// Returns false during SSR to prevent hydration mismatch
const isDevMode = (): boolean => {
  if (typeof window === 'undefined') return false;

  const isDevelopment = process.env.NODE_ENV === 'development';
  const isLocalhost =
    window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';

  return isDevelopment && isLocalhost;
};

// Check if Firebase emulator is enabled
// Returns false during SSR to prevent hydration mismatch
const isUsingEmulator = (): boolean => {
  if (typeof window === 'undefined') return false;
  return process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true';
};

export function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isMounted, setIsMounted] = useState(false);
  const router = useRouter();
  const { signIn, signInWithGoogle, signInWithMicrosoft, loading } = useAuth();

  // Get returnUrl from query params
  const getReturnUrl = (): string => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const returnUrl = urlParams.get('returnUrl') || urlParams.get('redirect');
      if (returnUrl) {
        return decodeURIComponent(returnUrl);
      }
    }
    return '/';
  };

  // Handle redirect after successful login
  const handleRedirect = async () => {
    // Small delay to ensure cookies are set and state is ready
    await new Promise((resolve) => setTimeout(resolve, 100));

    const returnUrl = getReturnUrl();
    // Use window.location.href instead of router.push to force full page reload
    // This ensures cookies set server-side are included in the request
    window.location.href = returnUrl;
  };

  // Track client-side mount to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-fill test credentials when Firebase emulator is active
  useEffect(() => {
    if (isUsingEmulator()) {
      setEmail(DEV_TEST_CREDENTIALS.email);
      setPassword(DEV_TEST_CREDENTIALS.password);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      console.log("[LoginForm] Submitting login form");
      const { error } = await signIn(email, password);
      if (error) {
        console.error("[LoginForm] Login error:", error.message);
        setError(error.message);
        toast.error(error.message);
      } else {
        console.log("[LoginForm] Login successful, waiting for auth state...");
        toast.success('Login successful! Redirecting...');
        // Wait a bit longer to ensure auth state is set
        await new Promise((resolve) => setTimeout(resolve, 300));
        await handleRedirect();
      }
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : 'An error occurred';
      console.error("[LoginForm] Unexpected error:", errorMessage, error);
      setError(errorMessage);
      toast.error(errorMessage);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await signInWithGoogle();
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Google login successful!');
        await handleRedirect();
      }
    } catch (_error: unknown) {
      toast.error('Failed to sign in with Google');
    }
  };

  const handleMicrosoftLogin = async () => {
    try {
      const { error } = await signInWithMicrosoft();
      if (error) {
        toast.error(error.message);
      } else {
        toast.success('Microsoft login successful!');
        await handleRedirect();
      }
    } catch (_error: unknown) {
      toast.error('Failed to sign in with Microsoft');
    }
  };

  return (
    <AuthFormWrapper>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col gap-6">
          <div className="flex flex-col items-center text-center">
            <h1 className="text-2xl font-bold">Welcome back</h1>
            <p className="text-muted-foreground text-balance">Sign in to your Audial account</p>
            {isMounted && isUsingEmulator() && (
              <div className="mt-2 flex flex-col gap-1 items-center">
                <div className="text-xs text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/20 px-2 py-1 rounded">
                  🔥 Firebase Emulator Active
                </div>
                <div className="text-xs text-orange-600 dark:text-orange-400 bg-orange-50 dark:bg-orange-950/20 px-2 py-1 rounded">
                  Dev Mode: Test credentials auto-filled
                </div>
              </div>
            )}
          </div>
          <div className="grid gap-3">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          <div className="grid gap-3">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link
                href="/forgot-password"
                className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              disabled={loading}
            />
          </div>
          {error && (
            <div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md">
              {error}
            </div>
          )}
          <Button type="submit" className="w-full" disabled={loading}>
            {loading ? 'Signing in...' : 'Sign in'}
          </Button>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={handleGoogleLogin}
              disabled={loading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                />
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                />
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={handleMicrosoftLogin}
              disabled={loading}
            >
              <svg className="mr-2 h-4 w-4" viewBox="0 0 23 23" fill="none">
                <path d="M0 0h10.5v10.5H0V0z" fill="#F25022" />
                <path d="M12.5 0H23v10.5H12.5V0z" fill="#00A4EF" />
                <path d="M0 12.5h10.5V23H0V12.5z" fill="#7FBA00" />
                <path d="M12.5 12.5H23V23H12.5V12.5z" fill="#FFB900" />
              </svg>
              Microsoft
            </Button>
          </div>
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-primary hover:underline underline-offset-4">
              Sign up
            </Link>
          </div>
        </div>
      </form>
    </AuthFormWrapper>
  );
}

