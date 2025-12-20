'use client';

import * as React from 'react';
import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from 'recharts';
import { format, parseISO } from 'date-fns';

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { AnalyticsCard } from './analytics-card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import type { MetricType, TemporalData, AnalyticsDateRange } from '@/lib/analytics/types';
import { METRIC_CONFIGS } from '@/lib/analytics/types';

interface TemporalChartProps {
  data: TemporalData;
  dateRange: AnalyticsDateRange;
  selectedMetric: MetricType | null;
}

const chartConfig = {
  calls: {
    label: 'Total Calls',
    color: 'var(--chart-1)',
  },
  score: {
    label: 'Avg Score',
    color: 'var(--chart-2)',
  },
  duration: {
    label: 'Avg Duration',
    color: 'var(--chart-3)',
  },
  resolution: {
    label: 'Resolution Rate',
    color: 'var(--chart-4)',
  },
} satisfies ChartConfig;

function formatValue(value: number, metric: MetricType): string {
  switch (metric) {
    case 'calls':
      return value.toLocaleString();
    case 'score':
      return value.toFixed(0);
    case 'duration':
      const mins = Math.floor(value / 60);
      const secs = Math.round(value % 60);
      return `${mins}:${secs.toString().padStart(2, '0')}`;
    case 'resolution':
      return `${Math.round(value * 100)}%`;
    default:
      return value.toLocaleString();
  }
}

export function TemporalChart({ data, dateRange, selectedMetric }: TemporalChartProps) {
  // Use selected metric from cards, default to "calls" if none selected or sentiment
  const activeChart = (
    selectedMetric && selectedMetric !== 'sentiment' ? selectedMetric : 'calls'
  ) as keyof typeof chartConfig;

  // Get chart data for active metric
  const chartData = React.useMemo(() => {
    return data[activeChart].map((point) => ({
      date: point.date,
      [activeChart]: point.value,
    }));
  }, [data, activeChart]);

  const fromStr = format(dateRange.from, 'MMM d, yyyy');
  const toStr = format(dateRange.to, 'MMM d, yyyy');

  return (
    <AnalyticsCard data-testid="temporal-chart" className="py-6">
      <CardHeader>
        <CardTitle>{METRIC_CONFIGS[activeChart].label} Over Time</CardTitle>
        <CardDescription>
          {METRIC_CONFIGS[activeChart].description} from {fromStr} to {toStr}
        </CardDescription>
      </CardHeader>
      <CardContent className="pr-4 pl-0">
        <ChartContainer config={chartConfig} className="aspect-auto h-[350px] w-full">
          <AreaChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <defs>
              <linearGradient id="fillCalls" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-calls)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-calls)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillScore" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-score)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-score)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillDuration" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-duration)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-duration)" stopOpacity={0.1} />
              </linearGradient>
              <linearGradient id="fillResolution" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-resolution)" stopOpacity={0.8} />
                <stop offset="95%" stopColor="var(--color-resolution)" stopOpacity={0.1} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                try {
                  const date = parseISO(value);
                  return format(date, 'MMM d');
                } catch {
                  return value;
                }
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              width={50}
              tickFormatter={(value) => formatValue(value, activeChart)}
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  className="w-[150px]"
                  nameKey={activeChart}
                  labelFormatter={(value) => {
                    try {
                      return format(parseISO(value), 'MMM d, yyyy');
                    } catch {
                      return value;
                    }
                  }}
                  formatter={(value) => [
                    formatValue(Number(value), activeChart),
                    chartConfig[activeChart].label,
                  ]}
                />
              }
            />
            <Area
              type="monotone"
              dataKey={activeChart}
              stroke={`var(--color-${activeChart})`}
              fill={`url(#fill${activeChart.charAt(0).toUpperCase() + activeChart.slice(1)})`}
              strokeWidth={2}
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </AnalyticsCard>
  );
}
