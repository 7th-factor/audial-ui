"use client"

import * as React from "react"
import {
  IconTrash,
  IconCheck,
  IconX,
  IconArchive,
  IconMail,
  IconMailOpened,
  IconKey,
  IconKeyOff,
  IconUserCheck,
  IconUserX,
} from "@tabler/icons-react"

import { Button } from "@/components/ui/button"

export interface BulkAction {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost"
}

interface BulkActionsProps {
  selectedCount: number
  actions?: BulkAction[]
  onClearSelection?: () => void
}

export function BulkActions({ selectedCount, actions, onClearSelection }: BulkActionsProps) {
  if (selectedCount === 0) return null

  return (
    <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
      <span className="text-sm text-muted-foreground">{selectedCount} selected</span>
      {actions?.map((action, index) => (
        <Button key={index} size="sm" variant={action.variant || "outline"} onClick={action.onClick} className="h-8">
          {action.icon}
          {action.label}
        </Button>
      ))}
      {onClearSelection && (
        <Button size="sm" variant="ghost" onClick={onClearSelection} className="h-8">
          <IconX className="size-4" />
          Clear
        </Button>
      )}
    </div>
  )
}

// Preset bulk actions for tasks/follow-ups
export function useTaskBulkActions<TData>(
  selectedRows: TData[],
  onAction?: (action: string, rows: TData[]) => void,
): BulkAction[] {
  return React.useMemo(
    () => [
      {
        label: "Mark Done",
        icon: <IconCheck className="mr-1 size-4" />,
        onClick: () => onAction?.("mark-done", selectedRows),
        variant: "outline" as const,
      },
      {
        label: "Archive",
        icon: <IconArchive className="mr-1 size-4" />,
        onClick: () => onAction?.("archive", selectedRows),
        variant: "outline" as const,
      },
      {
        label: "Delete",
        icon: <IconTrash className="mr-1 size-4" />,
        onClick: () => onAction?.("delete", selectedRows),
        variant: "destructive" as const,
      },
    ],
    [selectedRows, onAction],
  )
}

// Preset bulk actions for inbox/messages
export function useInboxBulkActions<TData>(
  selectedRows: TData[],
  onAction?: (action: string, rows: TData[]) => void,
): BulkAction[] {
  return React.useMemo(
    () => [
      {
        label: "Mark Read",
        icon: <IconMailOpened className="mr-1 size-4" />,
        onClick: () => onAction?.("mark-read", selectedRows),
        variant: "outline" as const,
      },
      {
        label: "Mark Unread",
        icon: <IconMail className="mr-1 size-4" />,
        onClick: () => onAction?.("mark-unread", selectedRows),
        variant: "outline" as const,
      },
      {
        label: "Archive",
        icon: <IconArchive className="mr-1 size-4" />,
        onClick: () => onAction?.("archive", selectedRows),
        variant: "outline" as const,
      },
      {
        label: "Delete",
        icon: <IconTrash className="mr-1 size-4" />,
        onClick: () => onAction?.("delete", selectedRows),
        variant: "destructive" as const,
      },
    ],
    [selectedRows, onAction],
  )
}

// Preset bulk actions for contacts
export function useContactBulkActions<TData>(
  selectedRows: TData[],
  onAction?: (action: string, rows: TData[]) => void,
): BulkAction[] {
  return React.useMemo(
    () => [
      {
        label: "Activate",
        icon: <IconUserCheck className="mr-1 size-4" />,
        onClick: () => onAction?.("activate", selectedRows),
        variant: "outline" as const,
      },
      {
        label: "Deactivate",
        icon: <IconUserX className="mr-1 size-4" />,
        onClick: () => onAction?.("deactivate", selectedRows),
        variant: "outline" as const,
      },
      {
        label: "Delete",
        icon: <IconTrash className="mr-1 size-4" />,
        onClick: () => onAction?.("delete", selectedRows),
        variant: "destructive" as const,
      },
    ],
    [selectedRows, onAction],
  )
}

// Preset bulk actions for API keys
export function useApiKeyBulkActions<TData>(
  selectedRows: TData[],
  onAction?: (action: string, rows: TData[]) => void,
): BulkAction[] {
  return React.useMemo(
    () => [
      {
        label: "Activate",
        icon: <IconKey className="mr-1 size-4" />,
        onClick: () => onAction?.("activate", selectedRows),
        variant: "outline" as const,
      },
      {
        label: "Revoke",
        icon: <IconKeyOff className="mr-1 size-4" />,
        onClick: () => onAction?.("revoke", selectedRows),
        variant: "destructive" as const,
      },
      {
        label: "Delete",
        icon: <IconTrash className="mr-1 size-4" />,
        onClick: () => onAction?.("delete", selectedRows),
        variant: "destructive" as const,
      },
    ],
    [selectedRows, onAction],
  )
}
