'use client';

import { useAuth } from '@/lib/firebase/auth-context';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { workspaceManager } from '@/lib/auth/workspace-manager';

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
  const [checkingWorkspaces, setCheckingWorkspaces] = useState(false);
  const [hasWorkspaces, setHasWorkspaces] = useState<boolean | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Combined loading state: wait for auth and token exchange
  // During SSR, always show loading to prevent hydration mismatch
  // CRITICAL: If user exists but no customToken yet, we're still loading (token exchange in progress)
  const isLoading =
    !mounted ||
    authLoading ||
    checkingWorkspaces ||
    (user && !customToken); // Wait for token exchange to complete

  // Check workspaces when user is authenticated (skip if already on onboarding)
  const isOnboardingPage = pathname.startsWith('/onboarding');

  useEffect(() => {
    const checkWorkspaces = async () => {
      // Skip workspace check if already on onboarding page
      if (isOnboardingPage) {
        setHasWorkspaces(true); // Allow rendering on onboarding
        return;
      }

      if (user && customToken && hasWorkspaces === null && !checkingWorkspaces) {
        setCheckingWorkspaces(true);
        try {
          const workspaces = await workspaceManager.fetchWorkspaces();
          setHasWorkspaces(workspaces.length > 0);

          if (workspaces.length === 0) {
            console.log('[AuthGuard] No workspaces found, redirecting to onboarding');
            router.push('/onboarding');
          }
        } catch (error) {
          console.error('[AuthGuard] Failed to fetch workspaces:', error);
          // Assume user has workspaces on error to prevent blocking
          setHasWorkspaces(true);
        } finally {
          setCheckingWorkspaces(false);
        }
      }
    };

    checkWorkspaces();
  }, [user, customToken, hasWorkspaces, checkingWorkspaces, router, isOnboardingPage]);

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
  // Skip workspace check for onboarding pages
  if (isLoading || (!isOnboardingPage && hasWorkspaces === null)) {
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

  // Don't render if user has no workspaces (they'll be redirected to onboarding)
  // Skip this check for onboarding pages
  if (!isOnboardingPage && !hasWorkspaces) {
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
  const [checkingWorkspaces, setCheckingWorkspaces] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Combined loading state: wait for auth and token exchange
  // During SSR, always show loading to prevent hydration mismatch
  // CRITICAL: If user exists but no customToken yet, we're still loading (token exchange in progress)
  const isLoading =
    !mounted ||
    authLoading ||
    checkingWorkspaces ||
    (user && !customToken); // Wait for token exchange to complete

  useEffect(() => {
    const handleAuthenticatedUser = async () => {
      if (!isLoading && user && !checkingWorkspaces) {
        setCheckingWorkspaces(true);

        try {
          // Fetch workspaces to check if user needs onboarding
          console.log('[PublicRouteGuard] Fetching workspaces...');
          const workspaces = await workspaceManager.fetchWorkspaces();

          if (workspaces.length === 0) {
            // New user with no workspaces - redirect to onboarding
            console.log('[PublicRouteGuard] No workspaces found, redirecting to onboarding');
            router.push('/onboarding');
            return;
          }

          // User has workspaces - proceed with normal redirect
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
        } catch (error) {
          console.error('[PublicRouteGuard] Failed to fetch workspaces:', error);
          // On error, still redirect to dashboard (workspace manager will handle it)
          router.push(redirectTo);
        } finally {
          setCheckingWorkspaces(false);
        }
      }
    };

    handleAuthenticatedUser();
  }, [user, isLoading, router, redirectTo, checkingWorkspaces]);

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


