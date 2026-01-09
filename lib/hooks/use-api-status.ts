"use client";

/**
 * API Status Hook
 *
 * Provides API readiness check for TanStack Query hooks.
 * Ensures API calls only execute when authentication is ready.
 *
 * Usage:
 * ```typescript
 * export function useAgents() {
 *   const { isReady } = useApiStatus();
 *
 *   return useQuery({
 *     queryKey: queryKeys.agents.list(),
 *     queryFn: agentsService.list,
 *     enabled: isReady,
 *   });
 * }
 * ```
 */

import { useAuth } from "@/lib/firebase/auth-context";

export interface ApiStatus {
  /** Whether the API is ready to make authenticated requests */
  isReady: boolean;
  /** Whether auth is still loading */
  isLoading: boolean;
  /** The current auth token (if available) */
  token: string | null;
}

/**
 * Check if the API is ready to make authenticated requests
 *
 * Returns `isReady: true` when:
 * - User is authenticated
 * - Custom token has been exchanged
 *
 * This ensures TanStack Query hooks don't fire before
 * the authentication flow is complete.
 */
export function useApiStatus(): ApiStatus {
  const { user, loading, customToken } = useAuth();

  // API is ready when we have both a user and a custom token
  const isReady = !!user && !!customToken && !loading;
  const isLoading = loading || (!!user && !customToken);

  return {
    isReady,
    isLoading,
    token: customToken,
  };
}

export default useApiStatus;
