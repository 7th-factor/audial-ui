"use client"

import * as React from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
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

import type { Row } from "@tanstack/react-table"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { TableSkeleton } from "@/components/skeletons"
import { EmptyState, type EmptyStateProps } from "@/components/empty-state"
import { useIsMobile } from "@/lib/hooks/use-mobile"

import { DataTablePagination } from "./data-table-pagination"
import { DataTableToolbar, type FacetedFilterConfig } from "./data-table-toolbar"
import { MobileCardList } from "./mobile-card-list"

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
  /** Sync filters to URL (default: false) */
  syncToUrl?: boolean
  /** Render function for mobile card view */
  renderMobileCard?: (row: Row<TData>) => React.ReactNode
  /** Click handler for mobile card */
  onRowClick?: (row: TData) => void
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
  syncToUrl = false,
  renderMobileCard,
  onRowClick,
}: DataTableProps<TData, TValue>) {
  const isMobile = useIsMobile()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Parse initial filters from URL if syncToUrl is enabled
  const getInitialFilters = React.useCallback((): ColumnFiltersState => {
    if (!syncToUrl) return []
    const filters: ColumnFiltersState = []
    searchParams.forEach((value, key) => {
      if (key.startsWith("filter_")) {
        const columnId = key.slice(7) // Remove "filter_" prefix
        const values = value.includes(",") ? value.split(",") : [value]
        filters.push({ id: columnId, value: values })
      } else if (key === "q" && searchColumnId) {
        filters.push({ id: searchColumnId, value })
      }
    })
    return filters
  }, [syncToUrl, searchParams, searchColumnId])

  const [rowSelection, setRowSelection] = React.useState<RowSelectionState>({})
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(getInitialFilters)
  const [sorting, setSorting] = React.useState<SortingState>([])

  // Sync filters to URL when they change
  const syncFiltersToUrl = React.useCallback(
    (filters: ColumnFiltersState) => {
      if (!syncToUrl) return

      const params = new URLSearchParams()

      // Preserve non-filter params
      searchParams.forEach((value, key) => {
        if (!key.startsWith("filter_") && key !== "q") {
          params.set(key, value)
        }
      })

      // Add current filters
      filters.forEach((filter) => {
        if (filter.id === searchColumnId) {
          // Search column goes to "q" param
          const value = String(filter.value)
          if (value) params.set("q", value)
        } else {
          // Other filters go to "filter_" prefixed params
          const value = Array.isArray(filter.value)
            ? filter.value.join(",")
            : String(filter.value)
          if (value) params.set(`filter_${filter.id}`, value)
        }
      })

      const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
      router.replace(newUrl, { scroll: false })
    },
    [syncToUrl, pathname, router, searchParams, searchColumnId]
  )

  // Debounce URL updates
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)
  const handleColumnFiltersChange = React.useCallback(
    (updater: ColumnFiltersState | ((old: ColumnFiltersState) => ColumnFiltersState)) => {
      setColumnFilters((old) => {
        const newFilters = typeof updater === "function" ? updater(old) : updater

        if (syncToUrl) {
          if (timeoutRef.current) clearTimeout(timeoutRef.current)
          timeoutRef.current = setTimeout(() => syncFiltersToUrl(newFilters), 300)
        }

        return newFilters
      })
    },
    [syncToUrl, syncFiltersToUrl]
  )

  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current)
    }
  }, [])

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
    onColumnFiltersChange: handleColumnFiltersChange,
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
      ) : isMobile && renderMobileCard ? (
        // Mobile card view
        <>
          {table.getRowModel().rows.length > 0 ? (
            <MobileCardList
              table={table}
              renderCard={renderMobileCard}
              onCardClick={onRowClick}
              selectable={true}
            />
          ) : (
            <EmptyState
              title="No results found"
              description="Try adjusting your search or filter criteria."
              variant="no-results"
            />
          )}
          <DataTablePagination table={table} />
        </>
      ) : (
        // Desktop table view
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
