"use client"

import * as React from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"

export interface SelectableCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  selected: boolean
  onSelect: () => void
  mode: "multi" | "single"
  disabled?: boolean
  dataTestId?: string
}

/**
 * SelectableCard wrapper component for card-based selection grids.
 *
 * Supports both multi-select (checkbox) and single-select (border-only) modes.
 * Provides visual feedback and click-to-select behavior.
 */
export const SelectableCard = React.forwardRef<
  HTMLDivElement,
  SelectableCardProps
>(
  (
    {
      children,
      selected,
      onSelect,
      mode,
      disabled = false,
      className,
      dataTestId,
      ...props
    },
    ref
  ) => {
    const handleClick = () => {
      if (!disabled) {
        onSelect()
      }
    }

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault()
        if (!disabled) {
          onSelect()
        }
      }
    }

    return (
      <div
        ref={ref}
        className={cn(
          "relative rounded-xl border bg-background transition-all duration-200",
          "hover:shadow-md",
          selected && "ring-2 ring-primary ring-offset-2 border-primary",
          !selected && mode === "single" && "border-muted",
          disabled && "opacity-50 cursor-not-allowed",
          !disabled &&
            "cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        data-testid={dataTestId}
        role={mode === "single" ? "radio" : "checkbox"}
        aria-checked={selected}
        aria-disabled={disabled}
        tabIndex={disabled ? -1 : 0}
        {...props}
      >
        {/* Selection indicator - only show checkbox for multi-select */}
        {mode === "multi" && (
          <div className="absolute top-3 right-3 z-10">
            <Checkbox
              checked={selected}
              onCheckedChange={onSelect}
              disabled={disabled}
              data-testid={dataTestId ? `${dataTestId}-checkbox` : undefined}
              onClick={(e) => e.stopPropagation()}
              className="h-5 w-5"
              aria-label={selected ? "Deselect" : "Select"}
            />
          </div>
        )}

        {/* Card content */}
        <div className="overflow-hidden break-words">{children}</div>
      </div>
    )
  }
)

SelectableCard.displayName = "SelectableCard"
