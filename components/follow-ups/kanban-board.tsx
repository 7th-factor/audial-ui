'use client';

import * as React from 'react';
import {
  DndContext,
  DragOverlay,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
  type DragStartEvent,
  type DragOverEvent,
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';

import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';
import type { Task } from '@/components/data-table/data/schema';
import { statuses } from '@/components/data-table/data/data';
import { KanbanColumn } from './kanban-column';
import { KanbanCard } from './kanban-card';

interface KanbanBoardProps {
  tasks: Task[];
  onTaskMove?: (taskId: string, newStatus: string) => void;
}

export function KanbanBoard({ tasks, onTaskMove }: KanbanBoardProps) {
  const [activeTask, setActiveTask] = React.useState<Task | null>(null);
  const [localTasks, setLocalTasks] = React.useState<Task[]>(tasks);

  // Update local tasks when props change
  React.useEffect(() => {
    setLocalTasks(tasks);
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Group tasks by status
  const tasksByStatus = React.useMemo(() => {
    const grouped: Record<string, Task[]> = {};
    statuses.forEach((status) => {
      grouped[status.value] = localTasks.filter((task) => task.status === status.value);
    });
    return grouped;
  }, [localTasks]);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const task = localTasks.find((t) => t.id === active.id);
    if (task) {
      setActiveTask(task);
    }
  };

  const handleDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = active.id as string;
    const overId = over.id as string;

    // Find the task being dragged
    const activeTask = localTasks.find((t) => t.id === activeId);
    if (!activeTask) return;

    // Check if we're over a column (status)
    const isOverColumn = statuses.some((s) => s.value === overId);

    if (isOverColumn && activeTask.status !== overId) {
      // Move task to new column
      setLocalTasks((prev) =>
        prev.map((task) =>
          task.id === activeId ? { ...task, status: overId } : task
        )
      );
    } else {
      // Check if we're over another task
      const overTask = localTasks.find((t) => t.id === overId);
      if (overTask && activeTask.status !== overTask.status) {
        // Move to the column of the task we're over
        setLocalTasks((prev) =>
          prev.map((task) =>
            task.id === activeId ? { ...task, status: overTask.status } : task
          )
        );
      }
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTask(null);

    if (!over) return;

    const activeId = active.id as string;
    const task = localTasks.find((t) => t.id === activeId);

    if (task && onTaskMove) {
      onTaskMove(activeId, task.status);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCorners}
      onDragStart={handleDragStart}
      onDragOver={handleDragOver}
      onDragEnd={handleDragEnd}
    >
      <ScrollArea className="w-full">
        <div className="flex gap-4 p-4 min-w-max">
          {statuses.map((status) => (
            <KanbanColumn
              key={status.value}
              id={status.value}
              title={status.label}
              icon={status.icon}
              tasks={tasksByStatus[status.value] || []}
            />
          ))}
        </div>
        <ScrollBar orientation="horizontal" />
      </ScrollArea>

      <DragOverlay>
        {activeTask ? <KanbanCard task={activeTask} isDragging /> : null}
      </DragOverlay>
    </DndContext>
  );
}
