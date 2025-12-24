import type { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import type { CombinedApiKey } from "./schema"
import { DataTableColumnHeader } from "../data-table-column-header"
import { ApiKeysRowActions } from "./row-actions"

interface ColumnsConfig {
  onDelete?: (key: CombinedApiKey) => void
}

export function createColumns(config?: ColumnsConfig): ColumnDef<CombinedApiKey>[] {
  return [
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
      return (
        <div className="flex flex-col">
          <span className="font-medium">{row.getValue("name")}</span>
          {row.original.description && (
            <span className="text-xs text-muted-foreground">{row.original.description}</span>
          )}
        </div>
      )
    },
  },
  {
    accessorKey: "type",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Type" />,
    cell: ({ row }) => {
      const type = row.getValue("type") as string
      return (
        <Badge variant="outline" className="capitalize">
          {type}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "active",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const active = row.getValue("active") as boolean
      return (
        <Badge variant={active ? "default" : "secondary"}>
          {active ? "Active" : "Inactive"}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      const active = row.getValue(id) as boolean
      const status = active ? "active" : "inactive"
      return value.includes(status)
    },
  },
  {
    accessorKey: "lastUsedAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Used" />,
    cell: ({ row }) => {
      const lastUsed = row.getValue("lastUsedAt") as string | null
      if (!lastUsed) return <span className="text-muted-foreground">Never</span>
      const date = new Date(lastUsed)
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Created" />,
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt"))
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <ApiKeysRowActions
        row={row}
        onDelete={config?.onDelete ? () => config.onDelete!(row.original) : undefined}
      />
    ),
  },
  ]
}

// Backwards compatible export for static usage
export const columns = createColumns()
