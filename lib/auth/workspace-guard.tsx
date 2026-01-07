'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useAuth } from '@/lib/firebase/auth-context';
import { useWorkspaces } from '@/lib/api/hooks/use-workspaces';
import { workspaceStore } from '@/lib/auth/workspace-store';
import { Skeleton } from '@/components/ui/skeleton';

interface WorkspaceGuardProps {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}

/**
 * WorkspaceGuard
 *
 * Ensures the user has at least one workspace before rendering children.
 * If no workspaces exist, redirects to onboarding.
 *
 * This guard should be used INSIDE AuthGuard, after authentication is confirmed.
 *
 * Usage:
 * ```tsx
 * <AuthGuard>
 *   <WorkspaceGuard>
 *     <DashboardContent />
 *   </WorkspaceGuard>
 * </AuthGuard>
 * ```
 */
export function WorkspaceGuard({ children, fallback }: WorkspaceGuardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const { customToken } = useAuth();

  // Only fetch workspaces when we have a valid token
  const { data: workspaces, isLoading, isError } = useWorkspaces();

  const [hasInitialized, setHasInitialized] = useState(false);

  // Skip workspace check for onboarding pages
  const isOnboardingPage = pathname.startsWith('/onboarding');

  useEffect(() => {
    // Wait for workspaces to load
    if (isLoading || !customToken) return;

    // Skip if on onboarding page
    if (isOnboardingPage) {
      setHasInitialized(true);
      return;
    }

    const workspaceList = workspaces ?? [];

    if (workspaceList.length === 0) {
      // No workspaces - redirect to onboarding
      console.log('[WorkspaceGuard] No workspaces found, redirecting to onboarding');
      router.push('/onboarding');
      return;
    }

    // Auto-select first workspace if none selected
    const currentWorkspaceId = workspaceStore.getWorkspaceId();
    if (!currentWorkspaceId && workspaceList.length > 0) {
      console.log('[WorkspaceGuard] Auto-selecting first workspace:', workspaceList[0].id);
      workspaceStore.setWorkspaceId(workspaceList[0].id);
    }

    setHasInitialized(true);
  }, [workspaces, isLoading, customToken, router, isOnboardingPage]);

  // Loading state
  if (isLoading || (!hasInitialized && !isOnboardingPage)) {
    return (
      fallback || (
        <WorkspaceLoadingSkeleton />
      )
    );
  }

  // Error state - render children anyway (workspace manager will handle errors)
  if (isError) {
    console.error('[WorkspaceGuard] Error fetching workspaces, proceeding anyway');
    return <>{children}</>;
  }

  // No workspaces and not on onboarding - will redirect
  if (!isOnboardingPage && (!workspaces || workspaces.length === 0)) {
    return null;
  }

  return <>{children}</>;
}

/**
 * Loading skeleton for workspace guard
 */
function WorkspaceLoadingSkeleton() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex items-center gap-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-8 w-24 ml-auto" />
      </div>
      <div className="grid auto-rows-min gap-4 md:grid-cols-3">
        <Skeleton className="aspect-video rounded-xl" />
        <Skeleton className="aspect-video rounded-xl" />
        <Skeleton className="aspect-video rounded-xl" />
      </div>
      <Skeleton className="min-h-[50vh] flex-1 rounded-xl" />
    </div>
  );
}

export default WorkspaceGuard;
