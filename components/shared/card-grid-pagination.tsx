"use client"

import * as React from "react"
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { cn } from "@/lib/utils"

export interface CardGridPaginationProps
  extends React.HTMLAttributes<HTMLDivElement> {
  totalItems: number
  pageSize: number
  currentPage: number
  onPageChange: (page: number) => void
  onPageSizeChange: (pageSize: number) => void
  selectedCount?: number
  pageSizeOptions?: number[]
}

/**
 * Reusable pagination component for card grids.
 * Based on DataTablePagination pattern.
 */
export const CardGridPagination = React.forwardRef<
  HTMLDivElement,
  CardGridPaginationProps
>(
  (
    {
      totalItems,
      pageSize,
      currentPage,
      onPageChange,
      onPageSizeChange,
      selectedCount,
      pageSizeOptions = [10, 20, 30, 40, 50],
      className,
      ...props
    },
    ref
  ) => {
    const totalPages = Math.ceil(totalItems / pageSize)
    const startItem = (currentPage - 1) * pageSize + 1
    const endItem = Math.min(currentPage * pageSize, totalItems)

    return (
      <div
        ref={ref}
        className={cn("flex items-center justify-between px-2", className)}
        {...props}
      >
        <div className="flex-1 text-sm text-muted-foreground">
          {selectedCount !== undefined ? (
            <>
              {selectedCount} of {totalItems} item(s) selected.
            </>
          ) : (
            <>
              Showing {startItem} to {endItem} of {totalItems} item(s)
            </>
          )}
        </div>
        <div className="flex items-center space-x-6 lg:space-x-8">
          <div className="flex items-center space-x-2">
            <p className="text-sm font-medium">Items per page</p>
            <Select
              value={`${pageSize}`}
              onValueChange={(value) => {
                onPageSizeChange(Number(value))
              }}
            >
              <SelectTrigger className="h-8 w-[70px]">
                <SelectValue placeholder={pageSize} />
              </SelectTrigger>
              <SelectContent side="top">
                {pageSizeOptions.map((size) => (
                  <SelectItem key={size} value={`${size}`}>
                    {size}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex w-[100px] items-center justify-center text-sm font-medium">
            Page {currentPage} of {totalPages || 1}
          </div>
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => onPageChange(1)}
              disabled={currentPage === 1}
              data-testid="pagination-first"
            >
              <span className="sr-only">Go to first page</span>
              <IconChevronsLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(currentPage - 1)}
              disabled={currentPage === 1}
              data-testid="pagination-prev"
            >
              <span className="sr-only">Go to previous page</span>
              <IconChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="h-8 w-8 p-0"
              onClick={() => onPageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              data-testid="pagination-next"
            >
              <span className="sr-only">Go to next page</span>
              <IconChevronRight className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              className="hidden h-8 w-8 p-0 lg:flex"
              onClick={() => onPageChange(totalPages)}
              disabled={currentPage >= totalPages}
              data-testid="pagination-last"
            >
              <span className="sr-only">Go to last page</span>
              <IconChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    )
  }
)

CardGridPagination.displayName = "CardGridPagination"
