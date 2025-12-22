'use client';

import { useState } from 'react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { ReactNode } from 'react';

interface CollapsibleCardProps {
  title: string;
  icon?: ReactNode;
  children: ReactNode;
  defaultOpen?: boolean;
  actions?: ReactNode;
  className?: string;
  headerClassName?: string;
  contentClassName?: string;
  onOpenChange?: (open: boolean) => void;
}

/**
 * CollapsibleCard - A reusable collapsible card component
 */
export function CollapsibleCard({
  title,
  icon,
  children,
  defaultOpen = false,
  actions,
  className,
  headerClassName,
  contentClassName,
  onOpenChange,
}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    onOpenChange?.(open);
  };

  return (
    <Card className={cn('border shadow-sm overflow-hidden p-0 rounded-md', className)}>
      <Collapsible open={isOpen} onOpenChange={handleOpenChange}>
        <CardHeader className={cn('bg-background gap-0 px-4 pt-4 pb-0', headerClassName)}>
          <div className="border-b pb-3">
            <div className="flex items-center justify-between">
              <CollapsibleTrigger asChild>
                <Button
                  variant="ghost"
                  className="flex-1 justify-between p-0 h-auto hover:bg-transparent"
                >
                  <div className="flex items-center gap-2">
                    {icon}
                    <span className="text-sm font-semibold">{title}</span>
                  </div>
                  {isOpen ? (
                    <ChevronDown className="h-4 w-4 text-muted-foreground" />
                  ) : (
                    <ChevronRight className="h-4 w-4 text-muted-foreground" />
                  )}
                </Button>
              </CollapsibleTrigger>
              {actions && (
                <div className="ml-4" onClick={(e) => e.stopPropagation()}>
                  {actions}
                </div>
              )}
            </div>
          </div>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className={cn('bg-background pt-3 pb-6', contentClassName)}>
            {children}
          </CardContent>
        </CollapsibleContent>
      </Collapsible>
    </Card>
  );
}

