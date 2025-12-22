"use client"

import * as React from "react"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
  type RowSelectionState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TableSkeleton } from "@/components/skeletons"
import { EmptyState, type EmptyStateProps } from "@/components/empty-state"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar, type FacetedFilterConfig } from "./data-table-toolbar"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onSelectionChange?: (rows: TData[]) => void
  searchColumnId?: string
  searchPlaceholder?: string
  facetedFilters?: FacetedFilterConfig[]
  /** Show loading skeleton */
  isLoading?: boolean
  /** Custom empty state configuration */
  emptyState?: EmptyStateProps
}

export function DataTable<TData, TValue>({
  columns,
  data,
  onSelectionChange,
  searchColumnId,
  searchPlaceholder,
  facetedFilters,
  isLoading = false,
  emptyState,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [sorting, setSorting] = React.useState<SortingState>([])

  const onSelectionChangeRef = React.useRef(onSelectionChange)
  onSelectionChangeRef.current = onSelectionChange

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: true,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  })

  const selectedRowIds = Object.keys(rowSelection).join(",")

  React.useEffect(() => {
    if (onSelectionChangeRef.current) {
      const selectedRows = table.getFilteredSelectedRowModel().rows.map((row) => row.original)
      onSelectionChangeRef.current(selectedRows)
    }
  }, [selectedRowIds, table])

  const clearSelection = React.useCallback(() => {
    setRowSelection({})
  }, [])

  React.useEffect(() => {
    ;(table as any).clearSelection = clearSelection
  }, [table, clearSelection])

  // Show loading skeleton
  if (isLoading) {
    return (
      <TableSkeleton
        rows={5}
        columns={columns.length - 2} // Exclude checkbox and actions columns
        showCheckbox={true}
        showActions={true}
      />
    )
  }

  // Check if table is empty (no data at all, not just filtered)
  const isEmpty = data.length === 0
  const hasNoFilteredResults = !isEmpty && table.getRowModel().rows.length === 0

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        searchColumnId={searchColumnId}
        searchPlaceholder={searchPlaceholder}
        facetedFilters={facetedFilters}
      />
      {isEmpty && emptyState ? (
        <EmptyState {...emptyState} />
      ) : (
        <>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => {
                      return (
                        <TableHead key={header.id} colSpan={header.colSpan}>
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                      )
                    })}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      {hasNoFilteredResults ? (
                        <EmptyState
                          title="No results found"
                          description="Try adjusting your search or filter criteria."
                          variant="no-results"
                        />
                      ) : (
                        "No results."
                      )}
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <DataTablePagination table={table} />
        </>
      )}
    </div>
  )
}
