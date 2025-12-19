import Link from "next/link"
import type { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { statuses, tags } from "./data"
import type { Contact } from "./schema"
import { DataTableColumnHeader } from "../data-table-column-header"
import { DataTableRowActions } from "../data-table-row-actions"

export const columns: ColumnDef<Contact>[] = [
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
    accessorKey: "name",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Name" />,
    cell: ({ row }) => {
      const initials = row.original.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
      return (
        <Link href={`/contacts/${row.original.id}`} className="flex items-center gap-3 hover:underline">
          <Avatar className="size-8">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium">{row.getValue("name")}</span>
            <span className="text-xs text-muted-foreground">{row.original.email}</span>
          </div>
        </Link>
      )
    },
  },
  {
    accessorKey: "company",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Company" />,
    cell: ({ row }) => {
      return (
        <div className="flex flex-col">
          <span>{row.getValue("company")}</span>
          <span className="text-xs text-muted-foreground">{row.original.role}</span>
        </div>
      )
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = statuses.find((s) => s.value === row.getValue("status"))
      if (!status) return null
      return (
        <div className="flex w-[100px] items-center">
          {status.icon && <status.icon className="mr-2 size-4 text-muted-foreground" />}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "tags",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Tags" />,
    cell: ({ row }) => {
      const rowTags = row.getValue("tags") as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {rowTags.map((tag) => {
            const tagData = tags.find((t) => t.value === tag)
            return (
              <Badge key={tag} variant="outline" className="text-xs">
                {tagData?.label || tag}
              </Badge>
            )
          })}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const rowTags = row.getValue(id) as string[]
      return value.some((v: string) => rowTags.includes(v))
    },
  },
  {
    accessorKey: "lastContact",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Contact" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("lastContact"))
      return <div className="w-[100px]">{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
