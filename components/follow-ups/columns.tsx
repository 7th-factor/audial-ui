"use client"

import type { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"
import { format } from "date-fns"

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

import type { FollowUpUIModel } from "./types"
import { followUpStatuses, followUpActions, getDisplayStatus } from "./types"

interface FollowUpColumnsProps {
  onView: (followUp: FollowUpUIModel) => void
  onMarkDone: (followUp: FollowUpUIModel) => void
  onReopen: (followUp: FollowUpUIModel) => void
  onDelete: (followUp: FollowUpUIModel) => void
}

export function getFollowUpColumns({
  onView,
  onMarkDone,
  onReopen,
  onDelete,
}: FollowUpColumnsProps): ColumnDef<FollowUpUIModel>[] {
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
      accessorKey: "customerName",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Customer" />
      ),
      cell: ({ row }) => (
        <span className="font-medium">
          {row.getValue("customerName") || row.original.customerId}
        </span>
      ),
    },
    {
      accessorKey: "action",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        const actionValue = row.getValue("action") as string
        const action = followUpActions.find((a) => a.value === actionValue)
        return <span>{action?.label || actionValue}</span>
      },
    },
    {
      accessorKey: "dueAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Due" />
      ),
      cell: ({ row }) => {
        const dueAt = row.getValue("dueAt") as string
        try {
          return (
            <span className="text-muted-foreground">
              {format(new Date(dueAt), "MMM d, yyyy")}
            </span>
          )
        } catch {
          return <span className="text-muted-foreground">-</span>
        }
      },
    },
    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const followUp = row.original
        // Compute display status (with overdue)
        const displayStatus = getDisplayStatus(
          followUp.status === "overdue" ? "open" : followUp.status,
          followUp.dueAt
        )
        const status = followUpStatuses.find((s) => s.value === displayStatus)

        if (!status) return null

        return (
          <Badge variant="outline" className={status.color}>
            {status.label}
          </Badge>
        )
      },
      filterFn: (row, id, value) => {
        const followUp = row.original
        const displayStatus = getDisplayStatus(
          followUp.status === "overdue" ? "open" : followUp.status,
          followUp.dueAt
        )
        return value.includes(displayStatus)
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
      accessorKey: "createdAt",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Created" />
      ),
      cell: ({ row }) => {
        const createdAt = row.getValue("createdAt") as string
        try {
          return (
            <span className="text-muted-foreground">
              {format(new Date(createdAt), "MMM d, yyyy")}
            </span>
          )
        } catch {
          return <span className="text-muted-foreground">-</span>
        }
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const followUp = row.original
        const isDone = followUp.status === "done"

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
              {isDone ? (
                <DropdownMenuItem onClick={() => onReopen(followUp)}>
                  Reopen
                </DropdownMenuItem>
              ) : (
                <DropdownMenuItem onClick={() => onMarkDone(followUp)}>
                  Mark as Done
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
