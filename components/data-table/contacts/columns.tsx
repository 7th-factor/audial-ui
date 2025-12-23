import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { DataTableColumnHeader } from "../data-table-column-header"
import { DataTableRowActions } from "../data-table-row-actions"
import type { Customer } from "@/lib/api"

// Helper to get display name from Customer
function getDisplayName(customer: Customer): string {
  if (customer.firstName || customer.lastName) {
    return [customer.firstName, customer.lastName].filter(Boolean).join(" ")
  }
  return "Unknown"
}

// Helper to get initials from Customer
function getInitials(customer: Customer): string {
  const name = getDisplayName(customer)
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export const columns: ColumnDef<Customer>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
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
    accessorKey: "firstName",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const customer = row.original
      const displayName = getDisplayName(customer)
      const initials = getInitials(customer)

      return (
        <Link href={`/contacts/${customer.id}`} className="flex items-center gap-3 hover:underline">
          <Avatar className="size-8">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{displayName}</span>
            <span className="text-xs text-muted-foreground">
              {customer.email || customer.phoneNumber || "No contact info"}
            </span>
          </div>
        </Link>
      )
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Email" />,
    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {row.original.email || <span className="text-muted-foreground">-</span>}
        </span>
      )
    },
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Phone" />,
    cell: ({ row }) => {
      return (
        <span className="text-sm">
          {row.original.phoneNumber || <span className="text-muted-foreground">-</span>}
        </span>
      )
    },
  },
  {
    accessorKey: "ongoingIssues",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Issues" />,
    cell: ({ row }) => {
      const issues = row.original.ongoingIssues
      if (!issues || issues.length === 0) {
        return <span className="text-muted-foreground">-</span>
      }
      return (
        <div className="flex flex-wrap gap-1">
          <Badge variant="outline" className="text-xs">
            {issues.length} issue{issues.length > 1 ? "s" : ""}
          </Badge>
        </div>
      )
    },
  },
  {
    accessorKey: "updatedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Updated" />,
    cell: ({ row }) => {
      const date = new Date(row.original.updatedAt)
      return <div className="w-[100px]">{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
