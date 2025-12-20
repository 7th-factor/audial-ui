'use client';

import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';

export function TranscriptSkeleton() {
  return (
    <Card className="w-full h-full flex flex-col border shadow-sm py-0 gap-0">
      <CardHeader className="bg-muted/50 rounded-t-xl px-6 py-4 flex-shrink-0 border-b gap-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex -space-x-3">
              <Skeleton className="h-10 w-10 rounded-full" />
              <Skeleton className="h-10 w-10 rounded-full" />
            </div>
            <div className="flex flex-col gap-2">
              <Skeleton className="h-5 w-48" />
              <Skeleton className="h-4 w-32" />
            </div>
          </div>
          <Skeleton className="h-9 w-48" />
        </div>
      </CardHeader>
      <CardContent className="flex-1 relative flex flex-col min-h-0 overflow-hidden max-h-[calc(100vh-300px)] p-0">
        <div className="flex-1 overflow-y-auto pl-6 py-4 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-thumb]:bg-muted-foreground/20 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent">
          <div className="space-y-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={cn('flex gap-3', i % 2 === 0 && 'flex-row-reverse')}>
                <div className="flex-shrink-0 w-16 pt-1">
                  <Skeleton className="h-3 w-12 rounded" />
                </div>
                <div className={cn('flex-1 flex gap-3', i % 2 === 0 && 'justify-end')}>
                  {i % 2 !== 0 && <Skeleton className="h-8 w-8 rounded-full" />}
                  <div
                    className={cn('flex flex-col gap-1', i % 2 === 0 && 'items-end', 'max-w-[80%]')}
                  >
                    <Skeleton className={cn('rounded-lg h-20', i % 2 === 0 ? 'w-3/4' : 'w-2/3')} />
                  </div>
                  {i % 2 === 0 && <Skeleton className="h-8 w-8 rounded-full" />}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

