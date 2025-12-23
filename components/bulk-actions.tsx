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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

export interface BulkAction {
  label: string
  icon?: React.ReactNode
  onClick: () => void
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost"
  requiresConfirmation?: boolean
  confirmTitle?: string
  confirmDescription?: string
}

interface BulkActionsProps {
  selectedCount: number
  actions?: BulkAction[]
  onClearSelection?: () => void
}

export function BulkActions({ selectedCount, actions, onClearSelection }: BulkActionsProps) {
  const [confirmAction, setConfirmAction] = React.useState<BulkAction | null>(null)

  if (selectedCount === 0) return null

  const handleActionClick = (action: BulkAction) => {
    if (action.requiresConfirmation) {
      setConfirmAction(action)
    } else {
      action.onClick()
    }
  }

  const handleConfirm = () => {
    confirmAction?.onClick()
    setConfirmAction(null)
  }

  return (
    <>
      <div className="flex items-center gap-2 animate-in fade-in slide-in-from-left-2 duration-200">
        <span className="text-sm text-muted-foreground">{selectedCount} selected</span>
        {actions?.map((action, index) => (
          <Button
            key={index}
            size="sm"
            variant={action.variant || "outline"}
            onClick={() => handleActionClick(action)}
            className="h-8"
          >
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

      <AlertDialog open={!!confirmAction} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction?.confirmTitle || `${confirmAction?.label} ${selectedCount} item${selectedCount > 1 ? "s" : ""}?`}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction?.confirmDescription || "This action cannot be undone."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className={confirmAction?.variant === "destructive" ? "bg-destructive text-destructive-foreground hover:bg-destructive/90" : ""}
            >
              {confirmAction?.label}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
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
        requiresConfirmation: true,
        confirmTitle: `Delete ${selectedRows.length} follow-up${selectedRows.length > 1 ? "s" : ""}?`,
        confirmDescription: "This will permanently delete the selected follow-ups. This action cannot be undone.",
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
        requiresConfirmation: true,
        confirmTitle: `Delete ${selectedRows.length} message${selectedRows.length > 1 ? "s" : ""}?`,
        confirmDescription: "This will permanently delete the selected messages. This action cannot be undone.",
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
        requiresConfirmation: true,
        confirmTitle: `Delete ${selectedRows.length} contact${selectedRows.length > 1 ? "s" : ""}?`,
        confirmDescription: "This will permanently delete the selected contacts. This action cannot be undone.",
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
        requiresConfirmation: true,
        confirmTitle: `Revoke ${selectedRows.length} API key${selectedRows.length > 1 ? "s" : ""}?`,
        confirmDescription: "Revoking these keys will immediately disable any applications using them. This action cannot be undone.",
      },
      {
        label: "Delete",
        icon: <IconTrash className="mr-1 size-4" />,
        onClick: () => onAction?.("delete", selectedRows),
        variant: "destructive" as const,
        requiresConfirmation: true,
        confirmTitle: `Delete ${selectedRows.length} API key${selectedRows.length > 1 ? "s" : ""}?`,
        confirmDescription: "This will permanently delete the selected API keys. This action cannot be undone.",
      },
    ],
    [selectedRows, onAction],
  )
}
