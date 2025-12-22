"use client"

import * as React from "react"
import { IconCheck, IconLoader2, IconAlertCircle, IconCloud } from "@tabler/icons-react"
import { cn } from "@/lib/utils"
import type { SaveStatus } from "@/lib/hooks/use-autosave"

interface SaveStatusIndicatorProps {
  status: SaveStatus
  lastSaved?: Date | null
  className?: string
}

export function SaveStatusIndicator({ status, lastSaved, className }: SaveStatusIndicatorProps) {
  const formatLastSaved = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const seconds = Math.floor(diff / 1000)
    const minutes = Math.floor(seconds / 60)

    if (seconds < 10) return "Just now"
    if (seconds < 60) return `${seconds}s ago`
    if (minutes < 60) return `${minutes}m ago`
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 text-sm text-muted-foreground transition-opacity",
        className
      )}
    >
      {status === "saving" && (
        <>
          <IconLoader2 className="size-4 animate-spin" />
          <span>Saving...</span>
        </>
      )}
      {status === "saved" && (
        <>
          <IconCheck className="size-4 text-success" />
          <span>Saved</span>
        </>
      )}
      {status === "error" && (
        <>
          <IconAlertCircle className="size-4 text-destructive" />
          <span>Save failed</span>
        </>
      )}
      {status === "idle" && lastSaved && (
        <>
          <IconCloud className="size-4" />
          <span>Saved {formatLastSaved(lastSaved)}</span>
        </>
      )}
      {status === "idle" && !lastSaved && (
        <>
          <IconCloud className="size-4" />
          <span>All changes saved</span>
        </>
      )}
    </div>
  )
}
