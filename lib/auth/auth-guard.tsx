'use client';

import { useAuth } from '@/lib/firebase/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

interface AuthGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

// Track redirects to prevent loops
let lastRedirectTime = 0;
let redirectCount = 0;
const REDIRECT_COOLDOWN = 2000; // 2 seconds
const MAX_REDIRECTS = 3;

export function AuthGuard({ children, fallback, redirectTo = '/login' }: AuthGuardProps) {
  const { user, loading: authLoading, customToken } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const hasRedirected = useRef(false);

  // Track if component has mounted to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Combined loading state: wait for auth and token exchange
  // During SSR, always show loading to prevent hydration mismatch
  // CRITICAL: If user exists but no customToken yet, we're still loading (token exchange in progress)
  const isLoading =
    !mounted ||
    authLoading ||
    (user && !customToken); // Wait for token exchange to complete

  useEffect(() => {
    // Firebase Best Practice: Wait for loading to complete before making decisions
    if (isLoading) return;

    const now = Date.now();

    // Reset redirect count if enough time has passed
    if (now - lastRedirectTime > 10000) {
      redirectCount = 0;
    }

    if (!user) {
      // User is not authenticated - redirect to login
      if (pathname !== redirectTo && !hasRedirected.current) {
        // Check for redirect loop
        if (redirectCount >= MAX_REDIRECTS) {
          console.error('[AuthGuard] Redirect loop detected, stopping redirects');
          return;
        }

        // Check cooldown period
        if (now - lastRedirectTime < REDIRECT_COOLDOWN) {
          console.warn('[AuthGuard] Redirect cooldown active, skipping redirect');
          return;
        }

        console.log('[AuthGuard] Redirecting unauthenticated user to login');
        hasRedirected.current = true;
        lastRedirectTime = now;
        redirectCount++;

        // Preserve the current path as returnUrl when redirecting to login
        const currentPath = encodeURIComponent(pathname);
        router.push(`${redirectTo}?returnUrl=${currentPath}`);
      }
    } else {
      // User is authenticated
      hasRedirected.current = false;
    }
  }, [user, isLoading, router, pathname, redirectTo]);

  // Firebase Best Practice: Show loading state while auth is being determined
  if (isLoading) {
    return (
      fallback || (
        <div className="flex items-center justify-center min-h-screen">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
        </div>
      )
    );
  }

  // Firebase Best Practice: Only render protected content when user is authenticated
  if (!user) {
    return null;
  }

  return <>{children}</>;
}

interface PublicRouteGuardProps {
  children: React.ReactNode;
  redirectTo?: string;
}

export function PublicRouteGuard({ children, redirectTo = '/' }: PublicRouteGuardProps) {
  const { user, loading: authLoading, customToken } = useAuth();
  const router = useRouter();

  // Track if component has mounted to prevent hydration mismatch
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Combined loading state: wait for auth and token exchange
  // During SSR, always show loading to prevent hydration mismatch
  // CRITICAL: If user exists but no customToken yet, we're still loading (token exchange in progress)
  const isLoading =
    !mounted ||
    authLoading ||
    (user && !customToken); // Wait for token exchange to complete

  useEffect(() => {
    if (!isLoading && user) {
      // Check if there's a return URL in the query params (from auth redirect)
      if (typeof window !== 'undefined') {
        const urlParams = new URLSearchParams(window.location.search);
        const returnUrl = urlParams.get('returnUrl') || urlParams.get('redirect');

        if (returnUrl) {
          // Redirect to the originally intended URL
          router.push(decodeURIComponent(returnUrl));
        } else {
          // User is authenticated - redirect to dashboard
          console.log('[PublicRouteGuard] User authenticated, redirecting to dashboard');
          router.push(redirectTo);
        }
      } else {
        router.push(redirectTo);
      }
    }
  }, [user, isLoading, router, redirectTo]);

  // Show loading while checking auth
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If user is authenticated, don't show auth forms
  if (user) {
    return null;
  }

  return <>{children}</>;
}

