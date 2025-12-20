'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';

import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { Task } from '@/components/data-table/data/schema';
import { labels, priorities } from '@/components/data-table/data/data';

interface KanbanCardProps {
  task: Task;
  isDragging?: boolean;
}

export function KanbanCard({ task, isDragging }: KanbanCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging: isSortableDragging,
  } = useSortable({ id: task.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const label = labels.find((l) => l.value === task.label);
  const priority = priorities.find((p) => p.value === task.priority);
  const PriorityIcon = priority?.icon;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        'p-3 cursor-grab active:cursor-grabbing',
        'hover:shadow-md transition-shadow',
        (isDragging || isSortableDragging) && 'opacity-50 shadow-lg'
      )}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start gap-2">
        <GripVertical className="h-4 w-4 mt-0.5 text-muted-foreground shrink-0" />
        <div className="flex-1 min-w-0 space-y-2">
          <p className="text-sm font-medium leading-tight line-clamp-2">
            {task.title}
          </p>
          <div className="flex items-center gap-2 flex-wrap">
            {label && (
              <Badge variant="outline" className="text-xs">
                {label.label}
              </Badge>
            )}
            {priority && PriorityIcon && (
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <PriorityIcon className="h-3 w-3" />
                <span>{priority.label}</span>
              </div>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{task.id}</p>
        </div>
      </div>
    </Card>
  );
}
