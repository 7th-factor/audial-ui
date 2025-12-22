'use client';

import { useMemo } from 'react';
import type { AnalyticsDateRange, AnalyticsData } from '@/lib/analytics/types';
import { generateAnalyticsData } from '@/lib/analytics/fake-data-generator';

/**
 * Hook for managing analytics data
 *
 * Currently uses generated fake data.
 * When API is available, this can be updated to fetch real data.
 *
 * Returns `isFakeData` flag to show disclaimer when using mock data.
 */
export function useAnalyticsData(dateRange: AnalyticsDateRange) {
  // Generate fake data - memoized to prevent regeneration on every render
  const data = useMemo(() => {
    return generateAnalyticsData(dateRange);
  }, [dateRange.from.getTime(), dateRange.to.getTime()]);

  return {
    data,
    isFakeData: true, // Will be false when API is integrated
    isLoading: false,
    isError: false,
    error: null,
  };
}
