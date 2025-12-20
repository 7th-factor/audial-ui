"use client"

import * as React from "react"
import { useState, useMemo } from "react"
import { IconX } from "@tabler/icons-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { DataTableFacetedFilter } from "@/components/data-table/data-table-faceted-filter"
import {
  ColumnFiltersState,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table"

export interface SearchAndFilterProps<TData> {
  data: TData[]
  searchColumn: keyof TData
  searchPlaceholder?: string
  filters?: {
    column: keyof TData
    title: string
    options: {
      label: string
      value: string
      icon?: React.ComponentType<{ className?: string }>
    }[]
  }[]
  onFilteredDataChange?: (filteredData: TData[]) => void
  children?: React.ReactNode
}

/**
 * Reusable SearchAndFilter component for card grids.
 * Uses TanStack Table for filtering logic (same as DataTableToolbar).
 */
export function SearchAndFilter<TData extends object>({
  data,
  searchColumn,
  searchPlaceholder = "Search...",
  filters = [],
  onFilteredDataChange,
  children,
}: SearchAndFilterProps<TData>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState("")

  // Create a minimal table instance for filtering
  const columnHelper = createColumnHelper<TData>()
  const columns = useMemo(
    () => [
      columnHelper.accessor((row: TData) => row[searchColumn] as unknown, {
        id: String(searchColumn),
      }),
      ...filters.map((filter) =>
        columnHelper.accessor((row: TData) => row[filter.column] as unknown, {
          id: String(filter.column),
        })
      ),
    ],
    [searchColumn, filters, columnHelper]
  )

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    globalFilterFn: "includesString",
  })

  // Handle search separately
  const searchColumnRef = React.useRef(table.getColumn(String(searchColumn)))
  React.useEffect(() => {
    searchColumnRef.current = table.getColumn(String(searchColumn))
  }, [table, searchColumn])

  React.useEffect(() => {
    if (searchColumnRef.current) {
      searchColumnRef.current.setFilterValue(globalFilter || undefined)
    }
  }, [globalFilter])

  // Notify parent of filtered data changes
  const filteredRows = useMemo(
    () => table.getFilteredRowModel().rows,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, columnFilters, globalFilter]
  )

  const callbackRef = React.useRef(onFilteredDataChange)
  React.useEffect(() => {
    callbackRef.current = onFilteredDataChange
  }, [onFilteredDataChange])

  React.useEffect(() => {
    if (callbackRef.current) {
      callbackRef.current(filteredRows.map((r) => r.original))
    }
  }, [filteredRows])

  const isFiltered =
    columnFilters.length > 0 || (globalFilter && globalFilter.length > 0)

  return (
    <div className="flex items-center justify-between gap-4">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder={searchPlaceholder}
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
          data-testid="card-grid-search"
        />
        {filters.map((filter) => {
          const column = table.getColumn(String(filter.column))
          return column ? (
            <DataTableFacetedFilter
              key={String(filter.column)}
              column={column}
              title={filter.title}
              options={filter.options}
            />
          ) : null
        })}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => {
              setColumnFilters([])
              setGlobalFilter("")
            }}
            className="h-8 px-2 lg:px-3"
            data-testid="card-grid-reset-filters"
          >
            Reset
            <IconX className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      {children}
    </div>
  )
}
