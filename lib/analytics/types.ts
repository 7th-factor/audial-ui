/**
 * Analytics Dashboard Types
 *
 * Type definitions for the analytics dashboard feature.
 */

// ============================================================================
// Date Range Types
// ============================================================================

export type DateRangePreset = 'today' | '7d' | '30d' | '90d' | 'custom';

export interface AnalyticsDateRange {
  from: Date;
  to: Date;
  preset?: DateRangePreset;
}

// ============================================================================
// Metric Types
// ============================================================================

export type MetricType = 'calls' | 'score' | 'duration' | 'resolution' | 'sentiment';

export interface MetricConfig {
  id: MetricType;
  label: string;
  description: string;
  format: 'number' | 'percentage' | 'duration' | 'score';
}

// ============================================================================
// Summary Data Types
// ============================================================================

export interface AnalyticsSummary {
  totalCalls: number;
  avgScore: number; // 0-100 scale
  avgDuration: number; // in seconds
  resolutionRate: number; // 0-1 scale
  sentimentPositive: number; // percentage
  sentimentNeutral: number; // percentage
  sentimentNegative: number; // percentage
}

export interface SummaryCardData {
  metric: MetricType;
  title: string;
  value: string;
  numericValue: number;
  trend: {
    value: string;
    direction: 'up' | 'down';
    isPositive: boolean;
  };
  description: string;
  subtext?: string;
}

// ============================================================================
// Temporal Data Types
// ============================================================================

export interface TemporalDataPoint {
  date: string;
  value: number;
  label?: string;
}

export interface SentimentTemporalDataPoint {
  date: string;
  positive: number;
  neutral: number;
  negative: number;
}

export interface TemporalData {
  calls: TemporalDataPoint[];
  score: TemporalDataPoint[];
  duration: TemporalDataPoint[];
  resolution: TemporalDataPoint[];
  sentiment: SentimentTemporalDataPoint[];
}

// ============================================================================
// Complete Analytics Data Structure
// ============================================================================

export interface AnalyticsData {
  summary: AnalyticsSummary;
  summaryCards: SummaryCardData[];
  temporal: TemporalData;
  dateRange: AnalyticsDateRange;
  lastUpdated: Date;
}

// ============================================================================
// Component Props Types
// ============================================================================

export interface SummaryCardsProps {
  cards: SummaryCardData[];
  selectedMetric: MetricType | null;
  onSelectMetric: (metric: MetricType) => void;
  visibleMetrics: MetricType[];
}

export interface TemporalChartProps {
  data: TemporalData;
  dateRange: AnalyticsDateRange;
  selectedMetric: MetricType | null;
}

export interface AnalyticsHeaderProps {
  dateRange: AnalyticsDateRange;
  onDateRangeChange: (range: AnalyticsDateRange) => void;
  visibleMetrics: MetricType[];
  onMetricsChange: (metrics: MetricType[]) => void;
}

// ============================================================================
// Constants
// ============================================================================

export const METRIC_CONFIGS: Record<MetricType, MetricConfig> = {
  calls: {
    id: 'calls',
    label: 'Total Calls',
    description: 'Number of calls in selected period',
    format: 'number',
  },
  score: {
    id: 'score',
    label: 'Avg Score',
    description: 'Average quality score',
    format: 'score',
  },
  duration: {
    id: 'duration',
    label: 'Avg Duration',
    description: 'Average call duration',
    format: 'duration',
  },
  resolution: {
    id: 'resolution',
    label: 'Resolution Rate',
    description: 'First call resolution percentage',
    format: 'percentage',
  },
  sentiment: {
    id: 'sentiment',
    label: 'Sentiment',
    description: 'Customer sentiment breakdown',
    format: 'percentage',
  },
};

export const ALL_METRICS: MetricType[] = ['calls', 'score', 'sentiment', 'resolution', 'duration'];

export const DATE_RANGE_PRESETS: {
  value: DateRangePreset;
  label: string;
  days: number;
}[] = [
  { value: 'today', label: 'Today', days: 1 },
  { value: '7d', label: 'Last 7 days', days: 7 },
  { value: '30d', label: 'Last 30 days', days: 30 },
  { value: '90d', label: 'Last 90 days', days: 90 },
];
