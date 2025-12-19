import type { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { labels, statuses } from "./data"
import type { Message } from "./schema"
import { DataTableColumnHeader } from "../data-table-column-header"
import { DataTableRowActions } from "../data-table-row-actions"

export const columns: ColumnDef<Message>[] = [
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
    accessorKey: "sender",
    header: ({ column }) => <DataTableColumnHeader column={column} title="From" />,
    cell: ({ row }) => {
      const status = statuses.find((s) => s.value === row.original.status)
      return (
        <div className="flex items-center gap-2">
          {status?.icon && <status.icon className="size-4 text-muted-foreground" />}
          <div className="flex flex-col">
            <span className={`font-medium ${row.original.status === "unread" ? "font-semibold" : ""}`}>
              {row.getValue("sender")}
            </span>
            <span className="text-xs text-muted-foreground">{row.original.email}</span>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: "subject",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Subject" />,
    cell: ({ row }) => {
      const label = labels.find((l) => l.value === row.original.label)
      return (
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            {label && <Badge variant="outline">{label.label}</Badge>}
            <span className={`truncate ${row.original.status === "unread" ? "font-semibold" : ""}`}>
              {row.getValue("subject")}
            </span>
          </div>
          <span className="max-w-[400px] truncate text-xs text-muted-foreground">{row.original.preview}</span>
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
    accessorKey: "label",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Label" />,
    cell: ({ row }) => {
      const label = labels.find((l) => l.value === row.getValue("label"))
      if (!label) return null
      return (
        <div className="flex items-center">
          {label.icon && <label.icon className="mr-2 size-4 text-muted-foreground" />}
          <span>{label.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Date" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("date"))
      return <div className="w-[100px]">{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
