"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header"

import type { FollowUp } from "./types"
import { followUpStatuses } from "./types"

interface FollowUpColumnsProps {
  onView: (followUp: FollowUp) => void
  onClose: (followUp: FollowUp) => void
  onReopen: (followUp: FollowUp) => void
  onDelete: (followUp: FollowUp) => void
}

export function getFollowUpColumns({
  onView,
  onClose,
  onReopen,
  onDelete,
}: FollowUpColumnsProps): ColumnDef<FollowUp>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-[2px]"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-[2px]"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "contactName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Contact" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">{row.getValue("contactName")}</span>
      ),
    },
    {
      accessorKey: "trigger",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Trigger" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.getValue("trigger")}</span>
      ),
    },
    {
      accessorKey: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => <span>{row.getValue("action")}</span>,
    },
    {
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created" />
      ),
      cell: ({ row }) => (
        <span className="text-muted-foreground">{row.getValue("createdAt")}</span>
      ),
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const statusValue = row.getValue("status") as string
        const status = followUpStatuses.find((s) => s.value === statusValue)

        if (!status) return null

        return (
          <Badge variant="outline" className={status.color}>
            {status.label}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
    },
    {
      accessorKey: "priority",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Priority" />
      ),
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string
        return <span className="capitalize">{priority}</span>
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id))
      },
      enableHiding: true,
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const followUp = row.original
        const isClosed = followUp.status === "closed" || followUp.status === "done"

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0"
                data-testid="follow-up-actions"
              >
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => onView(followUp)}>
                View
              </DropdownMenuItem>
              {isClosed ? (
                <DropdownMenuItem onClick={() => onReopen(followUp)}>
                  Reopen
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => onClose(followUp)}>
                  Close
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => onDelete(followUp)}
                className="text-destructive"
              >
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
}
