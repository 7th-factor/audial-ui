'use client';

import * as React from 'react';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface AnalyticsCardProps extends React.ComponentProps<typeof Card> {
  children: React.ReactNode;
}

/**
 * AnalyticsCard - Wrapper for analytics dashboard cards
 *
 * Provides consistent styling for analytics widgets
 */
export function AnalyticsCard({ className, children, ...props }: AnalyticsCardProps) {
  return (
    <Card
      className={cn('@container/card', className)}
      {...props}
    >
      {children}
    </Card>
  );
}
