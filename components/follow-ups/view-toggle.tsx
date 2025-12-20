'use client';

import { Kanban, Table2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export type ViewMode = 'table' | 'kanban';

interface ViewToggleProps {
  view: ViewMode;
  onViewChange: (view: ViewMode) => void;
}

export function ViewToggle({ view, onViewChange }: ViewToggleProps) {
  return (
    <div className="flex items-center border rounded-md">
      <Button
        variant={view === 'table' ? 'secondary' : 'ghost'}
        size="sm"
        className={cn('rounded-r-none', view !== 'table' && 'text-muted-foreground')}
        onClick={() => onViewChange('table')}
      >
        <Table2 className="h-4 w-4" />
        <span className="ml-2 hidden sm:inline">Table</span>
      </Button>
      <Button
        variant={view === 'kanban' ? 'secondary' : 'ghost'}
        size="sm"
        className={cn('rounded-l-none', view !== 'kanban' && 'text-muted-foreground')}
        onClick={() => onViewChange('kanban')}
      >
        <Kanban className="h-4 w-4" />
        <span className="ml-2 hidden sm:inline">Board</span>
      </Button>
    </div>
  );
}
