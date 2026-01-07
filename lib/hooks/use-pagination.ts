'use client';

/**
 * Pagination Hook
 *
 * Hook to manage pagination state with optional persistence and URL sync.
 * Pattern from chanl.
 *
 * @example
 * ```tsx
 * const pagination = usePagination({
 *   defaultPageSize: 20,
 *   storageKey: 'agents-page-size',
 *   syncToUrl: true,
 * });
 *
 * // Use with TanStack Query
 * const { data } = usePaginatedAgents(filters, pagination.toApiParams('page'));
 *
 * // Use with DataTable
 * <DataTable
 *   serverPagination={{
 *     enabled: true,
 *     page: pagination.page,
 *     pageSize: pagination.pageSize,
 *     onPaginationChange: pagination.onChange,
 *   }}
 * />
 * ```
 */

import { useState, useCallback, useEffect, useMemo } from 'react';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import {
  PaginationState,
  PAGINATION_DEFAULTS,
  UsePaginationOptions,
  UsePaginationReturn,
  ApiPaginationStyle,
} from '@/lib/types/pagination';

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/**
 * Check if a value is a valid page size option
 */
function isValidPageSize(size: number): boolean {
  return (PAGINATION_DEFAULTS.PAGE_SIZE_OPTIONS as readonly number[]).includes(size);
}

/**
 * Get page size from localStorage
 */
function getStoredPageSize(key: string): number | null {
  if (typeof window === 'undefined') return null;

  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (isValidPageSize(parsed)) {
        return parsed;
      }
    }
  } catch {
    // Ignore localStorage errors
  }
  return null;
}

/**
 * Store page size to localStorage
 */
function storePageSize(key: string, size: number): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.setItem(key, String(size));
  } catch {
    // Ignore localStorage errors
  }
}

// ============================================================================
// HOOK
// ============================================================================

/**
 * Hook to manage pagination state with optional persistence and URL sync
 */
export function usePagination(options: UsePaginationOptions = {}): UsePaginationReturn {
  const {
    defaultPageSize = PAGINATION_DEFAULTS.PAGE_SIZE,
    storageKey,
    syncToUrl = false,
    initialPage = PAGINATION_DEFAULTS.DEFAULT_PAGE,
  } = options;

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state with stored/URL values or defaults
  const [state, setState] = useState<PaginationState>(() => {
    // Priority: URL > localStorage > default
    let page = initialPage;
    let pageSize = defaultPageSize;

    // Try to get from URL if syncToUrl is enabled
    if (syncToUrl && searchParams) {
      const urlPage = searchParams.get('page');
      const urlPageSize = searchParams.get('pageSize');

      if (urlPage) {
        const parsed = parseInt(urlPage, 10);
        if (!isNaN(parsed) && parsed >= 1) {
          page = parsed;
        }
      }

      if (urlPageSize) {
        const parsed = parseInt(urlPageSize, 10);
        if (isValidPageSize(parsed)) {
          pageSize = parsed;
        }
      }
    }

    // Try to get pageSize from localStorage if not in URL
    if (storageKey && pageSize === defaultPageSize) {
      const stored = getStoredPageSize(storageKey);
      if (stored) {
        pageSize = stored;
      }
    }

    return { page, pageSize };
  });

  // Sync pageSize to localStorage when it changes
  useEffect(() => {
    if (storageKey) {
      storePageSize(storageKey, state.pageSize);
    }
  }, [storageKey, state.pageSize]);

  // Sync to URL when state changes (if syncToUrl is enabled)
  useEffect(() => {
    if (!syncToUrl || !searchParams) return;

    const currentPage = searchParams.get('page');
    const currentPageSize = searchParams.get('pageSize');

    const newPage = String(state.page);
    const newPageSize = String(state.pageSize);

    // Only update if values actually changed
    if (currentPage !== newPage || currentPageSize !== newPageSize) {
      const params = new URLSearchParams(searchParams.toString());
      params.set('page', newPage);
      params.set('pageSize', newPageSize);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    }
  }, [syncToUrl, state.page, state.pageSize, searchParams, pathname, router]);

  // Set page number
  const setPage = useCallback((page: number) => {
    setState((prev) => ({
      ...prev,
      page: Math.max(1, page),
    }));
  }, []);

  // Set page size and reset to page 1
  const setPageSize = useCallback((size: number) => {
    if (isValidPageSize(size)) {
      setState({
        page: 1, // Reset to first page when changing page size
        pageSize: size,
      });
    }
  }, []);

  // Reset to first page
  const resetPage = useCallback(() => {
    setState((prev) => ({
      ...prev,
      page: 1,
    }));
  }, []);

  // Handle combined pagination change (for DataTable)
  const onChange = useCallback((pagination: PaginationState) => {
    setState({
      page: Math.max(1, pagination.page),
      pageSize: isValidPageSize(pagination.pageSize)
        ? pagination.pageSize
        : PAGINATION_DEFAULTS.PAGE_SIZE,
    });
  }, []);

  // Convert to API params based on style
  const toApiParams = useCallback(
    (style: ApiPaginationStyle = 'page') => {
      if (style === 'offset') {
        return {
          offset: (state.page - 1) * state.pageSize,
          limit: state.pageSize,
        };
      }
      return {
        page: state.page,
        limit: state.pageSize,
      };
    },
    [state.page, state.pageSize]
  );

  return useMemo(
    () => ({
      state,
      page: state.page,
      pageSize: state.pageSize,
      setPage,
      setPageSize,
      resetPage,
      onChange,
      toApiParams,
    }),
    [state, setPage, setPageSize, resetPage, onChange, toApiParams]
  );
}

export default usePagination;
