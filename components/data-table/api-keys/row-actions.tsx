"use client"

import * as React from "react"
import type { Row } from "@tanstack/react-table"
import { IconDots, IconTrash, IconToggleLeft, IconToggleRight } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import type { CombinedApiKey } from "./schema"

interface ApiKeysRowActionsProps {
  row: Row<CombinedApiKey>
  onDelete?: () => void
  onToggleStatus?: () => void
}

export function ApiKeysRowActions({
  row,
  onDelete,
  onToggleStatus,
}: ApiKeysRowActionsProps) {
  const key = row.original
  const isActive = key.active

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          data-testid="api-key-row-actions"
        >
          <IconDots className="size-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        {onToggleStatus && (
          <DropdownMenuItem onSelect={onToggleStatus}>
            {isActive ? (
              <>
                <IconToggleLeft className="mr-2 size-4" />
                Deactivate
              </>
            ) : (
              <>
                <IconToggleRight className="mr-2 size-4" />
                Activate
              </>
            )}
          </DropdownMenuItem>
        )}
        {onToggleStatus && onDelete && <DropdownMenuSeparator />}
        {onDelete && (
          <DropdownMenuItem
            className="text-destructive focus:text-destructive"
            onSelect={onDelete}
            data-testid="delete-api-key"
          >
            <IconTrash className="mr-2 size-4" />
            Delete
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
