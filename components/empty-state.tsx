"use client"

import * as React from "react"
import type { Icon } from "@tabler/icons-react"
import { IconInbox } from "@tabler/icons-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export interface EmptyStateProps {
  /** Large centered Tabler icon (rendered at 64px) */
  icon?: Icon
  /** Custom SVG/illustration from designer (takes priority over icon) */
  illustration?: React.ReactNode
  /** Main heading text */
  title: string
  /** Supporting description text */
  description?: string
  /** Primary call-to-action button */
  primaryAction?: {
    label: string
    onClick: () => void
  }
  /** Secondary action as a link or button */
  secondaryAction?: {
    label: string
    onClick?: () => void
    href?: string
  }
  /** Visual variant affecting styling */
  variant?: "first-use" | "no-results" | "error"
  /** Additional className for the container */
  className?: string
}

export function EmptyState({
  icon: IconComponent = IconInbox,
  illustration,
  title,
  description,
  primaryAction,
  secondaryAction,
  variant = "first-use",
  className,
}: EmptyStateProps) {
  const variantStyles = {
    "first-use": "text-muted-foreground",
    "no-results": "text-muted-foreground",
    error: "text-destructive",
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center justify-center py-16 px-4 text-center",
        className
      )}
    >
      {/* Icon or Illustration */}
      <div className={cn("mb-6", variantStyles[variant])}>
        {illustration ? (
          illustration
        ) : IconComponent ? (
          <IconComponent className="size-16 opacity-50" strokeWidth={1.5} />
        ) : null}
      </div>

      {/* Title */}
      <h3 className="text-lg font-semibold">{title}</h3>

      {/* Description */}
      {description && (
        <p className="mt-2 max-w-md text-sm text-muted-foreground">
          {description}
        </p>
      )}

      {/* Actions */}
      {(primaryAction || secondaryAction) && (
        <div className="mt-6 flex items-center gap-3">
          {primaryAction && (
            <Button onClick={primaryAction.onClick}>{primaryAction.label}</Button>
          )}
          {secondaryAction && (
            secondaryAction.href ? (
              <Button variant="outline" asChild>
                <a href={secondaryAction.href}>{secondaryAction.label}</a>
              </Button>
            ) : (
              <Button variant="outline" onClick={secondaryAction.onClick}>
                {secondaryAction.label}
              </Button>
            )
          )}
        </div>
      )}
    </div>
  )
}
