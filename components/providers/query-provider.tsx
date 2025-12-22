"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState } from "react";

/**
 * React Query Provider
 *
 * Provides global query client with optimized defaults:
 * - 60s staleTime: Data remains fresh for 1 minute
 * - 5min gcTime: Unused data is garbage collected after 5 minutes
 * - No refetch on window focus: Prevents unnecessary refetches
 * - Refetch on reconnect: Ensures fresh data after network recovery
 * - 2 retries: Handles transient network failures
 */
export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60000, // 1 minute - data stays fresh longer
            gcTime: 300000, // 5 minutes - garbage collection time (previously cacheTime)
            retry: 2,
            refetchOnWindowFocus: false,
            refetchOnReconnect: true,
          },
          mutations: {
            retry: 1,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {process.env.NODE_ENV === "development" && (
        <ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-left" />
      )}
    </QueryClientProvider>
  );
}


