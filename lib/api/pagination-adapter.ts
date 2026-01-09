/**
 * Pagination Adapter
 *
 * Converts between frontend pagination state (1-indexed page) and
 * various backend API conventions (offset-based or page-based).
 *
 * Also normalizes different response formats to a consistent PaginatedResult structure.
 * Pattern from chanl.
 */

import {
  PaginationState,
  PaginationMeta,
  PaginatedResult,
  ApiPaginationStyle,
  PAGINATION_DEFAULTS,
} from '@/lib/types/pagination';

// ============================================================================
// API PARAMETER CONVERSION
// ============================================================================

/**
 * Offset-based API parameters (for backends using offset/limit)
 */
export interface OffsetApiParams {
  offset: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Page-based API parameters (for backends using page/limit)
 */
export interface PageApiParams {
  page: number;
  limit: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

/**
 * Convert frontend pagination state to API parameters
 *
 * @param pagination - Frontend pagination state (1-indexed page)
 * @param style - Backend API style ('offset' or 'page')
 * @param sorting - Optional sorting parameters
 * @returns API-specific pagination parameters
 *
 * @example
 * ```typescript
 * // For offset-based API
 * const params = toApiParams({ page: 2, pageSize: 20 }, 'offset');
 * // Returns: { offset: 20, limit: 20 }
 *
 * // For page-based API
 * const params = toApiParams({ page: 2, pageSize: 20 }, 'page');
 * // Returns: { page: 2, limit: 20 }
 * ```
 */
export function toApiParams(
  pagination: PaginationState,
  style: ApiPaginationStyle = 'page',
  sorting?: { sortBy?: string; sortOrder?: 'asc' | 'desc' }
): OffsetApiParams | PageApiParams {
  const { page, pageSize } = pagination;

  if (style === 'offset') {
    return {
      offset: (page - 1) * pageSize,
      limit: pageSize,
      ...sorting,
    };
  }

  return {
    page,
    limit: pageSize,
    ...sorting,
  };
}

// ============================================================================
// RESPONSE NORMALIZATION
// ============================================================================

/**
 * Options for response normalization
 */
export interface NormalizeOptions {
  /** The field name containing the data array (e.g., 'agents', 'calls') */
  dataField?: string;
  /** Current pagination state (needed to calculate metadata) */
  currentPage?: number;
  /** Current page size (needed to calculate metadata) */
  currentPageSize?: number;
  /** API pagination style (to interpret offset correctly) */
  style?: ApiPaginationStyle;
}

/**
 * Normalize various API response formats to PaginatedResult
 *
 * @param response - Raw API response in any supported format
 * @param options - Normalization options
 * @returns Standardized PaginatedResult
 *
 * @example
 * ```typescript
 * // From agents API response
 * const result = fromApiResponse(response, { dataField: 'agents' });
 *
 * // Result is always:
 * // { data: Agent[], pagination: { page, pageSize, total, totalPages, hasNext, hasPrev } }
 * ```
 */
export function fromApiResponse<T>(
  response: unknown,
  options: NormalizeOptions = {}
): PaginatedResult<T> {
  const {
    dataField,
    currentPage = 1,
    currentPageSize = PAGINATION_DEFAULTS.PAGE_SIZE,
    style = 'page',
  } = options;

  let data: T[] = [];
  let total = 0;
  let page = currentPage;
  let pageSize = currentPageSize;

  // Handle direct array response
  if (Array.isArray(response)) {
    data = response;
    total = response.length;
    // For client-side pagination, we have all data
    return createPaginatedResult(data, {
      page,
      pageSize,
      total,
      isClientSide: true,
    });
  }

  // Handle object responses
  if (response && typeof response === 'object') {
    // Try to extract data array
    if ('data' in response) {
      const dataValue = (response as { data: unknown }).data;
      if (Array.isArray(dataValue)) {
        data = dataValue;
      } else if (dataValue && typeof dataValue === 'object') {
        // Nested data object (e.g., { data: { agents: [...] } })
        if (dataField && dataField in dataValue) {
          data = (dataValue as Record<string, T[]>)[dataField] ?? [];
        } else if ('items' in dataValue) {
          data = (dataValue as { items: T[] }).items;
        }
      }
    } else if (dataField && dataField in response) {
      // Direct entity field (e.g., { agents: [...] })
      data = (response as Record<string, T[]>)[dataField] ?? [];
    }

    // Extract pagination metadata
    if ('pagination' in response && (response as { pagination: unknown }).pagination) {
      const pag = (response as { pagination: Record<string, unknown> }).pagination;
      page = (pag.page as number) ?? currentPage;
      pageSize = (pag.limit as number) ?? (pag.pageSize as number) ?? currentPageSize;
      total = (pag.total as number) ?? data.length;

      // Handle offset-style responses
      if (style === 'offset' && 'offset' in pag) {
        page = Math.floor((pag.offset as number) / pageSize) + 1;
      }
    } else if ('total' in response) {
      total = (response as { total: number }).total;
    }

    // If no pagination metadata, assume we have all data
    if (total === 0) {
      total = data.length;
    }
  }

  return createPaginatedResult(data, { page, pageSize, total });
}

/**
 * Create a standardized PaginatedResult with calculated metadata
 */
function createPaginatedResult<T>(
  data: T[],
  params: {
    page: number;
    pageSize: number;
    total: number;
    isClientSide?: boolean;
  }
): PaginatedResult<T> {
  const { page, pageSize, total, isClientSide = false } = params;

  const totalPages = Math.ceil(total / pageSize) || 1;
  const safePage = Math.min(Math.max(1, page), totalPages);

  const pagination: PaginationMeta = {
    page: safePage,
    pageSize,
    total,
    totalPages,
    hasNext: safePage < totalPages,
    hasPrev: safePage > 1,
  };

  // For client-side pagination, slice the data
  if (isClientSide && data.length > pageSize) {
    const start = (safePage - 1) * pageSize;
    const end = start + pageSize;
    return {
      data: data.slice(start, end),
      pagination: {
        ...pagination,
        total: data.length,
        totalPages: Math.ceil(data.length / pageSize),
        hasNext: end < data.length,
        hasPrev: start > 0,
      },
    };
  }

  return { data, pagination };
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Calculate total pages from total items and page size
 */
export function calculateTotalPages(total: number, pageSize: number): number {
  return Math.ceil(total / pageSize) || 1;
}

/**
 * Check if there's a next page
 */
export function hasNextPage(currentPage: number, totalPages: number): boolean {
  return currentPage < totalPages;
}

/**
 * Check if there's a previous page
 */
export function hasPreviousPage(currentPage: number): boolean {
  return currentPage > 1;
}

/**
 * Get safe page number within bounds
 */
export function getSafePage(page: number, totalPages: number): number {
  return Math.min(Math.max(1, page), Math.max(1, totalPages));
}

/**
 * Convert TanStack Table pageIndex (0-indexed) to page number (1-indexed)
 */
export function pageIndexToPage(pageIndex: number): number {
  return pageIndex + 1;
}

/**
 * Convert page number (1-indexed) to TanStack Table pageIndex (0-indexed)
 */
export function pageToPageIndex(page: number): number {
  return Math.max(0, page - 1);
}

/**
 * Create empty pagination result
 */
export function emptyPaginatedResult<T>(): PaginatedResult<T> {
  return {
    data: [],
    pagination: {
      page: 1,
      pageSize: PAGINATION_DEFAULTS.PAGE_SIZE,
      total: 0,
      totalPages: 0,
      hasNext: false,
      hasPrev: false,
    },
  };
}
