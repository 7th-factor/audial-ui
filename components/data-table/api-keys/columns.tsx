import type { ColumnDef } from "@tanstack/react-table"

import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"

import { statuses, permissions as permissionsList } from "./data"
import type { ApiKey } from "./schema"
import { DataTableColumnHeader } from "../data-table-column-header"
import { DataTableRowActions } from "../data-table-row-actions"

export const columns: ColumnDef<ApiKey>[] = [
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
      return <span className="font-medium">{row.getValue("name")}</span>
    },
  },
  {
    accessorKey: "key",
    header: ({ column }) => <DataTableColumnHeader column={column} title="API Key" />,
    cell: ({ row }) => {
      const key = row.getValue("key") as string
      const masked = key.substring(0, 7) + "..." + key.substring(key.length - 4)
      return <code className="rounded bg-muted px-2 py-1 font-mono text-sm">{masked}</code>
    },
    enableSorting: false,
  },
  {
    accessorKey: "status",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Status" />,
    cell: ({ row }) => {
      const status = statuses.find((s) => s.value === row.getValue("status"))
      if (!status) return null

      const variant = status.value === "active" ? "default" : status.value === "revoked" ? "destructive" : "secondary"

      return (
        <Badge variant={variant} className="gap-1">
          {status.icon && <status.icon className="size-3" />}
          {status.label}
        </Badge>
      )
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id))
    },
  },
  {
    accessorKey: "permissions",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Permissions" />,
    cell: ({ row }) => {
      const rowPermissions = row.getValue("permissions") as string[]
      return (
        <div className="flex flex-wrap gap-1">
          {rowPermissions.map((perm) => {
            const permData = permissionsList.find((p) => p.value === perm)
            return (
              <Badge key={perm} variant="outline" className="text-xs">
                {permData?.label || perm}
              </Badge>
            )
          })}
        </div>
      )
    },
    filterFn: (row, id, value) => {
      const rowPerms = row.getValue(id) as string[]
      return value.some((v: string) => rowPerms.includes(v))
    },
  },
  {
    accessorKey: "lastUsed",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Last Used" />,
    cell: ({ row }) => {
      const lastUsed = row.getValue("lastUsed") as string | null
      if (!lastUsed) return <span className="text-muted-foreground">Never</span>
      const date = new Date(lastUsed)
      return <div>{date.toLocaleDateString()}</div>
    },
  },
  {
    accessorKey: "expiresAt",
    header: ({ column }) => <DataTableColumnHeader column={column} title="Expires" />,
    cell: ({ row }) => {
      const expiresAt = row.getValue("expiresAt") as string | null
      if (!expiresAt) return <span className="text-muted-foreground">Never</span>
      const date = new Date(expiresAt)
      const isExpired = date < new Date()
      return <div className={isExpired ? "text-destructive" : ""}>{date.toLocaleDateString()}</div>
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
