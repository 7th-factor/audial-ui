'use client';

import { useState } from 'react';
import { IconChartBar } from '@tabler/icons-react';

import { PageLayout } from '@/components/page-layout';
import { AnalyticsHeaderActions } from '@/components/analytics/analytics-header-actions';
import { AnalyticsSummaryCards } from '@/components/analytics/analytics-summary-cards';
import { TemporalChart } from '@/components/analytics/temporal-chart';
import { useAnalyticsData } from '@/lib/hooks/use-analytics-data';
import { getDefaultDateRange } from '@/lib/analytics/fake-data-generator';
import type { MetricType, AnalyticsDateRange } from '@/lib/analytics/types';
import { ALL_METRICS } from '@/lib/analytics/types';

export default function AnalyticsPage() {
  // State management
  const [dateRange, setDateRange] = useState<AnalyticsDateRange>(getDefaultDateRange());
  const [selectedMetric, setSelectedMetric] = useState<MetricType | null>('calls');
  const [visibleMetrics, setVisibleMetrics] = useState<MetricType[]>([...ALL_METRICS]);

  // Fetch analytics data based on date range
  const { data: analyticsData } = useAnalyticsData(dateRange);

  return (
    <PageLayout
      icon={IconChartBar}
      title="Analytics"
      description="Comprehensive call analytics and performance metrics"
      data-testid="analytics-page"
      actions={
        <AnalyticsHeaderActions
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          visibleMetrics={visibleMetrics}
          onMetricsChange={setVisibleMetrics}
        />
      }
    >
      {/* Row 1: Summary Cards */}
      <AnalyticsSummaryCards
        cards={analyticsData.summaryCards}
        selectedMetric={selectedMetric}
        onSelectMetric={setSelectedMetric}
        visibleMetrics={visibleMetrics}
      />

      {/* Row 2: Temporal Chart (Full Width) */}
      <div className="px-4 lg:px-6">
        <TemporalChart
          data={analyticsData.temporal}
          dateRange={dateRange}
          selectedMetric={selectedMetric}
        />
      </div>
    </PageLayout>
  );
}
