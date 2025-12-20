'use client';

import * as React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';

export interface AvatarGroupItem {
  /** Display name - first letter used for fallback */
  name: string;
  /** Optional image URL */
  imageUrl?: string;
  /** Background color for fallback (CSS color value) */
  color?: string;
}

interface AvatarGroupProps {
  /** Array of avatar items to display */
  items: AvatarGroupItem[];
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Maximum avatars to show before +N indicator */
  max?: number;
  /** Additional className for the container */
  className?: string;
}

const sizeClasses = {
  sm: 'size-7 text-[10px]',
  md: 'size-9 text-xs',
  lg: 'size-11 text-sm',
};

const overlapClasses = {
  sm: '-space-x-2',
  md: '-space-x-2.5',
  lg: '-space-x-3',
};

/**
 * AvatarGroup - Displays overlapping avatars for multiple users
 *
 * Usage:
 * ```tsx
 * <AvatarGroup
 *   items={[
 *     { name: 'John Doe', color: 'oklch(0.645 0.246 16.439)' },
 *     { name: 'Jane Smith', color: 'oklch(0.609 0.126 221.723)' },
 *   ]}
 *   size="md"
 * />
 * ```
 */
export function AvatarGroup({ items, size = 'md', max = 4, className }: AvatarGroupProps) {
  const visibleItems = items.slice(0, max);
  const remainingCount = items.length - max;

  return (
    <div className={cn('flex', overlapClasses[size], className)}>
      {visibleItems.map((item, index) => (
        <Avatar
          key={index}
          className={cn(
            sizeClasses[size],
            'ring-2 ring-background',
            // Higher z-index for items on the left (first items appear on top)
            index === 0 ? 'z-10' : index === 1 ? 'z-[5]' : ''
          )}
        >
          {item.imageUrl && <AvatarImage src={item.imageUrl} alt={item.name} />}
          <AvatarFallback
            className="font-medium text-foreground"
            style={{
              backgroundColor: item.color
                ? `color-mix(in oklch, ${item.color} 20%, transparent)`
                : undefined,
            }}
          >
            {item.name?.charAt(0)?.toUpperCase() || '?'}
          </AvatarFallback>
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <Avatar className={cn(sizeClasses[size], 'ring-2 ring-background bg-muted')}>
          <AvatarFallback className="font-medium text-muted-foreground bg-muted">
            +{remainingCount}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
}
