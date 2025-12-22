'use client';

import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import type { LucideIcon } from 'lucide-react';

import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Task } from '@/components/data-table/data/schema';
import { KanbanCard } from './kanban-card';

interface KanbanColumnProps {
  id: string;
  title: string;
  icon: LucideIcon;
  tasks: Task[];
}

export function KanbanColumn({ id, title, icon: Icon, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({ id });

  return (
    <div className="flex flex-col w-72 shrink-0">
      {/* Column Header */}
      <div className="flex items-center gap-2 p-3 bg-muted/50 rounded-t-lg border border-b-0">
        <Icon className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium text-sm">{title}</span>
        <Badge variant="secondary" className="ml-auto">
          {tasks.length}
        </Badge>
      </div>

      {/* Column Content */}
      <div
        ref={setNodeRef}
        className={cn(
          'flex-1 min-h-[200px] p-2 bg-muted/30 rounded-b-lg border',
          'transition-colors duration-200',
          isOver && 'bg-muted/50 border-primary/50'
        )}
      >
        <ScrollArea className="h-[calc(100vh-320px)]">
          <SortableContext items={tasks.map((t) => t.id)} strategy={verticalListSortingStrategy}>
            <div className="space-y-2 pr-2">
              {tasks.length === 0 ? (
                <div className="flex items-center justify-center h-20 text-sm text-muted-foreground">
                  No tasks
                </div>
              ) : (
                tasks.map((task) => <KanbanCard key={task.id} task={task} />)
              )}
            </div>
          </SortableContext>
        </ScrollArea>
      </div>
    </div>
  );
}
