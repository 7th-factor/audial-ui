/**
 * Fake Data Generator for Analytics Dashboard
 *
 * Generates realistic fake data for the analytics dashboard.
 * Uses seeded random for consistency and responds to date range changes.
 */

import { format, eachDayOfInterval, differenceInDays, subDays, startOfDay } from 'date-fns';
import type {
  AnalyticsDateRange,
  AnalyticsData,
  AnalyticsSummary,
  SummaryCardData,
  TemporalData,
  TemporalDataPoint,
  SentimentTemporalDataPoint,
} from './types';
import { METRIC_CONFIGS } from './types';

// ============================================================================
// Seeded Random Number Generator
// ============================================================================

class SeededRandom {
  private seed: number;

  constructor(seed: number) {
    this.seed = seed;
  }

  next(): number {
    this.seed = (this.seed * 9301 + 49297) % 233280;
    return this.seed / 233280;
  }

  nextInt(min: number, max: number): number {
    return Math.floor(this.next() * (max - min + 1)) + min;
  }

  nextFloat(min: number, max: number): number {
    return this.next() * (max - min) + min;
  }

  // Normal distribution using Box-Muller transform
  nextGaussian(mean: number, stdDev: number): number {
    const u1 = this.next();
    const u2 = this.next();
    const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
    return z0 * stdDev + mean;
  }
}

// ============================================================================
// Helper Functions
// ============================================================================

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

function formatPercentage(value: number): string {
  return `${Math.round(value * 100)}%`;
}

function formatScore(value: number): string {
  return `${Math.round(value)}%`;
}

function formatNumber(value: number): string {
  return value.toLocaleString();
}

function calculateTrend(
  current: number,
  previous: number
): { value: string; direction: 'up' | 'down'; percentage: number } {
  const diff = current - previous;
  const percentage = previous > 0 ? (diff / previous) * 100 : 0;
  const direction = diff >= 0 ? 'up' : 'down';
  const value = `${diff >= 0 ? '+' : ''}${Math.abs(percentage).toFixed(1)}%`;
  return { value, direction, percentage };
}

// ============================================================================
// Data Generation Functions
// ============================================================================

function generateDailyCalls(rng: SeededRandom, dayOfWeek: number): number {
  // Simulate realistic call patterns: higher on weekdays, lower on weekends
  const baseMultiplier = dayOfWeek === 0 || dayOfWeek === 6 ? 0.4 : 1.0;
  const weekdayVariance = dayOfWeek === 1 ? 1.2 : dayOfWeek === 5 ? 0.85 : 1.0;
  const baseCalls = rng.nextGaussian(150, 30);
  return Math.max(20, Math.round(baseCalls * baseMultiplier * weekdayVariance));
}

function generateTemporalData(dateRange: AnalyticsDateRange, rng: SeededRandom): TemporalData {
  const days = eachDayOfInterval({ start: dateRange.from, end: dateRange.to });

  const calls: TemporalDataPoint[] = [];
  const score: TemporalDataPoint[] = [];
  const duration: TemporalDataPoint[] = [];
  const resolution: TemporalDataPoint[] = [];
  const sentiment: SentimentTemporalDataPoint[] = [];

  days.forEach((day) => {
    const dateStr = format(day, 'yyyy-MM-dd');
    const dayOfWeek = day.getDay();

    // Calls - daily volume with weekday patterns
    const dailyCalls = generateDailyCalls(rng, dayOfWeek);
    calls.push({ date: dateStr, value: dailyCalls });

    // Score - tends to be stable with slight variations
    const dailyScore = Math.min(100, Math.max(50, rng.nextGaussian(78, 8)));
    score.push({ date: dateStr, value: Math.round(dailyScore) });

    // Duration - average call duration in seconds
    const dailyDuration = Math.max(60, rng.nextGaussian(240, 60));
    duration.push({ date: dateStr, value: Math.round(dailyDuration) });

    // Resolution rate - fairly stable
    const dailyResolution = Math.min(1, Math.max(0.5, rng.nextGaussian(0.82, 0.08)));
    resolution.push({
      date: dateStr,
      value: Math.round(dailyResolution * 100) / 100,
    });

    // Sentiment - positive usually dominates
    const positive = Math.round(rng.nextGaussian(55, 10));
    const negative = Math.round(rng.nextGaussian(15, 5));
    const neutral = 100 - positive - negative;
    sentiment.push({
      date: dateStr,
      positive: Math.max(30, Math.min(80, positive)),
      neutral: Math.max(10, Math.min(50, neutral)),
      negative: Math.max(5, Math.min(30, negative)),
    });
  });

  return { calls, score, duration, resolution, sentiment };
}

function generateSummary(temporal: TemporalData): AnalyticsSummary {
  const totalCalls = temporal.calls.reduce((sum, d) => sum + d.value, 0);
  const avgScore = temporal.score.reduce((sum, d) => sum + d.value, 0) / temporal.score.length;
  const avgDuration =
    temporal.duration.reduce((sum, d) => sum + d.value, 0) / temporal.duration.length;
  const resolutionRate =
    temporal.resolution.reduce((sum, d) => sum + d.value, 0) / temporal.resolution.length;

  // Calculate average sentiment
  const sentimentAvg = temporal.sentiment.reduce(
    (acc, d) => ({
      positive: acc.positive + d.positive,
      neutral: acc.neutral + d.neutral,
      negative: acc.negative + d.negative,
    }),
    { positive: 0, neutral: 0, negative: 0 }
  );
  const sentimentCount = temporal.sentiment.length;

  return {
    totalCalls,
    avgScore: Math.round(avgScore),
    avgDuration: Math.round(avgDuration),
    resolutionRate: Math.round(resolutionRate * 100) / 100,
    sentimentPositive: Math.round(sentimentAvg.positive / sentimentCount),
    sentimentNeutral: Math.round(sentimentAvg.neutral / sentimentCount),
    sentimentNegative: Math.round(sentimentAvg.negative / sentimentCount),
  };
}

function generateSummaryCards(
  summary: AnalyticsSummary,
  previousSummary: AnalyticsSummary,
  dayCount: number
): SummaryCardData[] {
  const cards: SummaryCardData[] = [];

  // Total Calls
  const callsTrend = calculateTrend(summary.totalCalls, previousSummary.totalCalls);
  cards.push({
    metric: 'calls',
    title: METRIC_CONFIGS.calls.label,
    value: formatNumber(summary.totalCalls),
    numericValue: summary.totalCalls,
    trend: {
      value: callsTrend.value,
      direction: callsTrend.direction,
      isPositive: callsTrend.percentage >= 0,
    },
    description: 'Total calls in period',
    subtext: `${Math.round(summary.totalCalls / dayCount)} avg/day`,
  });

  // Avg Score
  const scoreTrend = calculateTrend(summary.avgScore, previousSummary.avgScore);
  cards.push({
    metric: 'score',
    title: METRIC_CONFIGS.score.label,
    value: formatScore(summary.avgScore),
    numericValue: summary.avgScore,
    trend: {
      value: scoreTrend.value,
      direction: scoreTrend.direction,
      isPositive: scoreTrend.percentage >= 0,
    },
    description: 'Quality score',
    subtext: summary.avgScore >= 75 ? 'Above target' : 'Below target',
  });

  // Sentiment
  const sentimentTrend = calculateTrend(
    summary.sentimentPositive,
    previousSummary.sentimentPositive
  );
  cards.push({
    metric: 'sentiment',
    title: METRIC_CONFIGS.sentiment.label,
    value: `${summary.sentimentPositive}%`,
    numericValue: summary.sentimentPositive,
    trend: {
      value: sentimentTrend.value,
      direction: sentimentTrend.direction,
      isPositive: sentimentTrend.percentage >= 0,
    },
    description: 'Positive sentiment',
    subtext: `${summary.sentimentNeutral}% neutral, ${summary.sentimentNegative}% negative`,
  });

  // Resolution Rate
  const resolutionTrend = calculateTrend(
    summary.resolutionRate * 100,
    previousSummary.resolutionRate * 100
  );
  cards.push({
    metric: 'resolution',
    title: METRIC_CONFIGS.resolution.label,
    value: formatPercentage(summary.resolutionRate),
    numericValue: summary.resolutionRate * 100,
    trend: {
      value: resolutionTrend.value,
      direction: resolutionTrend.direction,
      isPositive: resolutionTrend.percentage >= 0,
    },
    description: 'First call resolution',
    subtext: summary.resolutionRate >= 0.8 ? 'Exceeds 80% target' : 'Below target',
  });

  // Avg Duration
  const durationTrend = calculateTrend(summary.avgDuration, previousSummary.avgDuration);
  cards.push({
    metric: 'duration',
    title: METRIC_CONFIGS.duration.label,
    value: formatDuration(summary.avgDuration),
    numericValue: summary.avgDuration,
    trend: {
      value: durationTrend.value,
      direction: durationTrend.direction,
      isPositive: durationTrend.percentage <= 0, // Lower duration is better
    },
    description: 'Average call length',
    subtext: `${Math.round(summary.avgDuration / 60)} min avg`,
  });

  return cards;
}

// ============================================================================
// Main Generator Function
// ============================================================================

export function generateAnalyticsData(dateRange: AnalyticsDateRange): AnalyticsData {
  // Create seed from date range for consistency
  const seed = dateRange.from.getTime() / 1000000 + dateRange.to.getTime() / 10000000;
  const rng = new SeededRandom(Math.floor(seed));

  // Generate temporal data for current period
  const temporal = generateTemporalData(dateRange, rng);

  // Generate summary from temporal data
  const summary = generateSummary(temporal);

  // Generate previous period data for trends
  const dayCount = differenceInDays(dateRange.to, dateRange.from) + 1;
  const previousRange: AnalyticsDateRange = {
    from: subDays(dateRange.from, dayCount),
    to: subDays(dateRange.to, dayCount),
  };
  const previousRng = new SeededRandom(Math.floor(seed - 1000));
  const previousTemporal = generateTemporalData(previousRange, previousRng);
  const previousSummary = generateSummary(previousTemporal);

  // Generate summary cards with trends
  const summaryCards = generateSummaryCards(summary, previousSummary, dayCount);

  return {
    summary,
    summaryCards,
    temporal,
    dateRange,
    lastUpdated: new Date(),
  };
}

// ============================================================================
// Utility Exports
// ============================================================================

export function getDefaultDateRange(): AnalyticsDateRange {
  const today = startOfDay(new Date());
  return {
    from: subDays(today, 29),
    to: today,
    preset: '30d',
  };
}

export function getDateRangeFromPreset(preset: 'today' | '7d' | '30d' | '90d'): AnalyticsDateRange {
  const today = startOfDay(new Date());
  const days = { today: 0, '7d': 6, '30d': 29, '90d': 89 }[preset];
  return {
    from: subDays(today, days),
    to: today,
    preset,
  };
}
