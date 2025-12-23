"use client";

import * as React from "react";
import type { Table, Row } from "@tanstack/react-table";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface MobileCardListProps<TData> {
  table: Table<TData>;
  /** Render function for card content - receives row data */
  renderCard: (row: Row<TData>) => React.ReactNode;
  /** Optional click handler for the card */
  onCardClick?: (row: TData) => void;
  /** Show selection checkbox */
  selectable?: boolean;
  /** Class name for the list container */
  className?: string;
}

export function MobileCardList<TData>({
  table,
  renderCard,
  onCardClick,
  selectable = true,
  className,
}: MobileCardListProps<TData>) {
  const rows = table.getRowModel().rows;

  if (!rows.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {rows.map((row) => (
        <Card
          key={row.id}
          className={cn(
            "relative transition-all",
            onCardClick && "cursor-pointer hover:shadow-md",
            row.getIsSelected() && "ring-2 ring-primary ring-offset-2"
          )}
          onClick={() => {
            if (onCardClick) {
              onCardClick(row.original);
            }
          }}
        >
          <CardContent className="p-4">
            <div className="flex gap-3">
              {selectable && (
                <div
                  className="flex-shrink-0 pt-0.5"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(checked) => row.toggleSelected(!!checked)}
                    aria-label={`Select row ${row.id}`}
                  />
                </div>
              )}
              <div className="flex-1 min-w-0">{renderCard(row)}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

// Helper component for rendering common field patterns
interface MobileCardFieldProps {
  label: string;
  value: React.ReactNode;
  className?: string;
}

export function MobileCardField({ label, value, className }: MobileCardFieldProps) {
  return (
    <div className={cn("flex items-center justify-between gap-2", className)}>
      <span className="text-sm text-muted-foreground">{label}</span>
      <span className="text-sm font-medium">{value}</span>
    </div>
  );
}

// Helper for status badges
interface MobileCardStatusProps {
  status: string;
  variant?: "default" | "secondary" | "destructive" | "outline";
  className?: string;
}

export function MobileCardStatus({
  status,
  variant = "secondary",
  className,
}: MobileCardStatusProps) {
  return (
    <Badge variant={variant} className={cn("capitalize", className)}>
      {status}
    </Badge>
  );
}
