'use client';

import * as React from 'react';
import { Settings2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DateRangePicker } from './date-range-picker';
import type { MetricType, AnalyticsHeaderProps } from '@/lib/analytics/types';
import { METRIC_CONFIGS, ALL_METRICS } from '@/lib/analytics/types';

export function AnalyticsHeaderActions({
  dateRange,
  onDateRangeChange,
  visibleMetrics,
  onMetricsChange,
}: AnalyticsHeaderProps) {
  const handleMetricToggle = (metric: MetricType) => {
    if (visibleMetrics.includes(metric)) {
      // Don't allow removing the last metric
      if (visibleMetrics.length > 1) {
        onMetricsChange(visibleMetrics.filter((m) => m !== metric));
      }
    } else {
      onMetricsChange([...visibleMetrics, metric]);
    }
  };

  const handleSelectAll = () => {
    onMetricsChange([...ALL_METRICS]);
  };

  return (
    <>
      <DateRangePicker dateRange={dateRange} onDateRangeChange={onDateRangeChange} />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" data-testid="metrics-dropdown">
            <Settings2 className="mr-2 h-4 w-4" />
            Customize Metrics
            <span className="ml-2 rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {visibleMetrics.length}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-56">
          <DropdownMenuLabel className="flex items-center justify-between">
            <span>Visible Metrics</span>
            <Button
              variant="ghost"
              size="sm"
              className="h-auto p-0 text-xs text-muted-foreground hover:text-foreground"
              onClick={handleSelectAll}
            >
              Select All
            </Button>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          {ALL_METRICS.map((metric) => (
            <DropdownMenuCheckboxItem
              key={metric}
              checked={visibleMetrics.includes(metric)}
              onCheckedChange={() => handleMetricToggle(metric)}
              disabled={visibleMetrics.length === 1 && visibleMetrics.includes(metric)}
              data-testid={`metric-toggle-${metric}`}
            >
              <div className="flex flex-col">
                <span>{METRIC_CONFIGS[metric].label}</span>
                <span className="text-xs text-muted-foreground">
                  {METRIC_CONFIGS[metric].description}
                </span>
              </div>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}
