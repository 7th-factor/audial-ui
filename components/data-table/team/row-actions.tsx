"use client"

import type { Row } from "@tanstack/react-table"
import { IconDotsVertical, IconPencil, IconTrash, IconUserCog } from "@tabler/icons-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import type { TeamMember } from "./schema"

interface TeamRowActionsProps {
  row: Row<TeamMember>
}

export function TeamRowActions({ row }: TeamRowActionsProps) {
  const member = row.original
  const isOwner = member.role === "owner"

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <IconDotsVertical className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem disabled={isOwner}>
          <IconUserCog className="mr-2 h-4 w-4" />
          Change role
        </DropdownMenuItem>
        <DropdownMenuItem>
          <IconPencil className="mr-2 h-4 w-4" />
          Edit details
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="text-destructive" disabled={isOwner}>
          <IconTrash className="mr-2 h-4 w-4" />
          Remove from team
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
