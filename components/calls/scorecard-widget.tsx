'use client';

import { Check, AlertCircle, ChevronDown, CheckCircle, XCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

// Speaker-aligned color palette for visual consistency
const SCORECARD_COLORS = {
  pass: {
    bg: 'oklch(0.609 0.126 221.723 / 15%)', // cyan-600 at 15% - light tint
    border: 'oklch(0.609 0.126 221.723 / 25%)', // cyan-600 at 25%
    solid: 'oklch(0.609 0.126 221.723)', // cyan-600 solid for dots
    text: 'oklch(0.52 0.105 221.723)', // darker cyan for text
  },
  fail: {
    bg: 'oklch(0.645 0.246 16.439 / 15%)', // rose-500 at 15% - light tint
    border: 'oklch(0.645 0.246 16.439 / 25%)', // rose-500 at 25%
    solid: 'oklch(0.645 0.246 16.439)', // rose-500 solid for dots
    text: 'oklch(0.55 0.22 16.439)', // darker rose for text
  },
};

export type ScoreMetric = {
  name: string;
  score: number;
  maxScore: number;
  status: 'pass' | 'fail';
  criteria?: Array<{
    name: string;
    passed: boolean;
    explanation?: string;
  }>;
};

type ScorecardData = {
  totalScore: number;
  maxScore: number;
  categories: ScoreMetric[];
};

type ScoreCardWidgetProps = {
  scorecard?: ScorecardData | null;
  onRunAgain?: () => void;
  className?: string;
};

/**
 * ScoreCard Widget - Displays call evaluation scores
 * Adapted for audial-admin mock data structure
 */
export function ScoreCardWidget({
  scorecard,
  onRunAgain,
  className,
}: ScoreCardWidgetProps) {
  if (!scorecard || !scorecard.categories || scorecard.categories.length === 0) {
    return (
      <div className="text-muted-foreground text-center py-4 text-sm">
        No scorecard data available
      </div>
    );
  }

  // Calculate overall status: pass (>=80%), warning (60-79%), fail (<60%)
  const overallScorePercentage = scorecard.maxScore > 0
    ? (scorecard.totalScore / scorecard.maxScore) * 100
    : 0;
  const allCategoriesPassed = scorecard.categories.every((m) => m.status === 'pass');
  const overallStatus = allCategoriesPassed
    ? 'pass'
    : overallScorePercentage >= 80
      ? 'pass'
      : overallScorePercentage >= 60
        ? 'warning'
        : 'fail';

  return (
    <div className={cn('score-card-widget', className)}>
      {/* Overall Score Summary */}
      <div className="py-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            Overall Score
          </h3>
          <div
            className="flex items-center gap-2 rounded-lg px-3 py-1"
            style={{
              backgroundColor:
                overallStatus === 'pass'
                  ? SCORECARD_COLORS.pass.bg
                  : overallStatus === 'warning'
                    ? 'oklch(0.705 0.213 47.604 / 15%)' // amber for warning
                    : SCORECARD_COLORS.fail.bg,
              color:
                overallStatus === 'pass'
                  ? SCORECARD_COLORS.pass.text
                  : overallStatus === 'warning'
                    ? 'oklch(0.6 0.18 47.604)' // amber text
                    : SCORECARD_COLORS.fail.text,
            }}
          >
            {overallStatus === 'pass' ? (
              <Check className="size-3" />
            ) : overallStatus === 'warning' ? (
              <AlertCircle className="size-3" />
            ) : (
              <AlertCircle className="size-3" />
            )}
            <span className="text-[11px] font-semibold tracking-wider">
              {overallStatus === 'pass'
                ? 'PASS'
                : overallStatus === 'warning'
                  ? 'WARNING'
                  : 'FAIL'}
            </span>
          </div>
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold tabular-nums">{scorecard.totalScore}</span>
          <span className="text-lg text-muted-foreground">/ {scorecard.maxScore}</span>
        </div>
      </div>

      {/* Metrics */}
      <div className="space-y-4">
        {scorecard.categories.map((metric, index) => (
          <ScoreMetricRow key={index} metric={metric} />
        ))}
      </div>
    </div>
  );
}

function ScoreMetricRow({ metric }: { metric: ScoreMetric }) {
  const isPass = metric.status === 'pass';
  const dotColor = isPass ? 'pass' : 'fail';

  const segmentCount = metric.criteria?.length || metric.maxScore;
  const maxPossibleSegments = 10;
  const segmentWidth = maxPossibleSegments / segmentCount;
  const [isExpanded, setIsExpanded] = useState(false);

  // Dot position: at the end of progress
  const dotPosition = metric.score === 0 ? 0 : Math.min(metric.score - 1, segmentCount - 1);

  return (
    <div className="space-y-1">
      {/* Title Row with Score and Badge */}
      <div className="flex items-center justify-between gap-4">
        <h3 className="text-sm font-medium">{metric.name}</h3>
        <div className="flex shrink-0 items-center gap-3">
          <span className="text-sm font-semibold tabular-nums">
            {metric.score}/{metric.maxScore}
          </span>
          <div
            className="flex min-w-[80px] items-center justify-center gap-2 rounded-lg px-3 py-1"
            style={{
              backgroundColor: isPass ? SCORECARD_COLORS.pass.bg : SCORECARD_COLORS.fail.bg,
              color: isPass ? SCORECARD_COLORS.pass.text : SCORECARD_COLORS.fail.text,
            }}
          >
            {isPass ? <Check className="size-3" /> : <AlertCircle className="size-3" />}
            <span className="text-[11px] font-semibold tracking-wider">
              {isPass ? 'PASS' : 'FAIL'}
            </span>
          </div>
        </div>
      </div>

      {/* Progress Bar - Full Width */}
      <div
        className="flex cursor-pointer items-center justify-between gap-6 -mx-2 rounded-lg px-2 py-1 transition-colors hover:bg-muted/30"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <div className="flex w-full items-center">
          {Array.from({ length: segmentCount }).map((_, segmentIndex) => {
            const isAtDotPosition = dotPosition === segmentIndex;
            const isLastSegment = segmentIndex === segmentCount - 1;
            const isFilled = segmentIndex < metric.score;

            return (
              <div
                key={segmentIndex}
                className="relative flex items-center"
                style={{ flex: segmentWidth }}
              >
                <div
                  className={cn(
                    'h-4 w-full border-2 transition-all',
                    !isFilled && 'border-muted-foreground/10 bg-muted/40 dark:bg-muted/20',
                    segmentIndex === 0 && 'rounded-l-sm',
                    isLastSegment && 'rounded-r-sm',
                    !isLastSegment && 'border-r-0'
                  )}
                  style={
                    isFilled
                      ? {
                          backgroundColor:
                            dotColor === 'pass'
                              ? SCORECARD_COLORS.pass.bg
                              : SCORECARD_COLORS.fail.bg,
                          borderColor:
                            dotColor === 'pass'
                              ? SCORECARD_COLORS.pass.border
                              : SCORECARD_COLORS.fail.border,
                        }
                      : undefined
                  }
                />

                {isAtDotPosition && (
                  <div
                    className="absolute left-full top-1/2 -translate-x-1/2 -translate-y-1/2 size-6 rounded-full border-2 border-background z-10"
                    style={{
                      backgroundColor:
                        dotColor === 'pass'
                          ? SCORECARD_COLORS.pass.solid
                          : SCORECARD_COLORS.fail.solid,
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>

        {/* Expand/Collapse Indicator */}
        <div className="shrink-0 ml-3">
          <ChevronDown
            className={cn('size-5 transition-transform duration-200', isExpanded && 'rotate-180')}
          />
        </div>
      </div>

      {/* Expandable Details */}
      <div
        className={cn(
          'grid transition-all duration-300 ease-in-out',
          isExpanded ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        )}
      >
        <div className="overflow-hidden">
          <div className="mt-2 overflow-hidden rounded-lg border bg-background">
            {metric.criteria && metric.criteria.length > 0 ? (
              <div>
                {metric.criteria.map((item, index) => {
                  const criterionPassed = item.passed;

                  return (
                    <div
                      key={index}
                      className="flex items-start justify-between gap-6 border-b px-6 py-4 transition-colors last:border-b-0"
                      style={{
                        backgroundColor: !criterionPassed ? SCORECARD_COLORS.fail.bg : undefined,
                      }}
                    >
                      <div className="flex gap-4 flex-1">
                        <div className="shrink-0 pt-0.5 font-mono text-xs text-muted-foreground">
                          {(index + 1).toString().padStart(2, '0')}
                        </div>
                        <div className="flex-1 space-y-1">
                          <div className="text-sm font-medium">{item.name}</div>
                          {item.explanation && (
                            <div className="text-xs leading-relaxed text-muted-foreground">
                              {item.explanation}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex min-w-[60px] shrink-0 items-center justify-end gap-2">
                        {criterionPassed ? (
                          <CheckCircle
                            className="size-4"
                            style={{ color: SCORECARD_COLORS.pass.solid }}
                          />
                        ) : (
                          <XCircle
                            className="size-4"
                            style={{ color: SCORECARD_COLORS.fail.solid }}
                          />
                        )}
                        <div
                          className="text-sm font-semibold"
                          style={{
                            color: criterionPassed
                              ? SCORECARD_COLORS.pass.text
                              : SCORECARD_COLORS.fail.text,
                          }}
                        >
                          {criterionPassed ? 'Yes' : 'No'}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="px-6 py-8 text-center text-sm text-muted-foreground">
                No detailed breakdown available for this metric.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
