'use client';

import { TrendingDown, TrendingUp } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { cn } from '@/lib/utils';
import type { SummaryCardsProps } from '@/lib/analytics/types';

export function AnalyticsSummaryCards({
  cards,
  selectedMetric,
  onSelectMetric,
  visibleMetrics,
}: SummaryCardsProps) {
  const getTrendIcon = (direction: 'up' | 'down') => {
    return direction === 'up' ? TrendingUp : TrendingDown;
  };

  const getTrendClasses = (isPositive?: boolean): string => {
    if (isPositive === undefined) {
      return 'bg-muted text-muted-foreground';
    }
    return isPositive
      ? 'bg-sky-100 text-sky-700 dark:bg-sky-900/30 dark:text-sky-300'
      : 'bg-destructive/10 text-destructive';
  };

  // Filter cards based on visible metrics
  const visibleCards = cards.filter((card) => visibleMetrics.includes(card.metric));

  return (
    <div
      className={cn(
        'grid grid-cols-1 gap-4 @xl/main:grid-cols-2 @5xl/main:grid-cols-5 px-4 lg:px-6'
      )}
      data-testid="analytics-summary-cards"
    >
      {visibleCards.map((card) => {
        const TrendIcon = card.trend ? getTrendIcon(card.trend.direction) : null;
        const isSelected = selectedMetric === card.metric;

        return (
          <Card
            key={card.metric}
            className={cn(
              '@container/card cursor-pointer transition-all duration-200',
              'hover:shadow-md hover:scale-[1.02]',
              isSelected && 'ring-1 ring-primary shadow-md'
            )}
            onClick={() => onSelectMetric(card.metric)}
            data-testid={`summary-card-${card.metric}`}
            data-selected={isSelected}
          >
            <CardHeader>
              <CardDescription className="truncate">{card.description}</CardDescription>
              <div className="flex items-center gap-2">
                <CardTitle className="text-3xl font-semibold tabular-nums @[250px]/card:text-4xl">
                  {card.value}
                </CardTitle>
                {card.trend && (
                  <Badge
                    variant="outline"
                    className={cn('shrink-0', getTrendClasses(card.trend.isPositive))}
                  >
                    {TrendIcon && <TrendIcon className="h-3 w-3 mr-1" />}
                    {card.trend.value}
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardFooter className="flex-col items-start gap-1.5 text-sm">
              <div className="truncate font-medium">{card.title}</div>
              {card.subtext && (
                <div className="text-muted-foreground text-xs">{card.subtext}</div>
              )}
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
}
