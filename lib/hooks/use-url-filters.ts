"use client"

import * as React from "react"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import type { ColumnFiltersState } from "@tanstack/react-table"

export interface UseUrlFiltersOptions {
  /** Enable URL sync (default: true) */
  enabled?: boolean
  /** Debounce delay for URL updates in ms (default: 300) */
  debounceMs?: number
  /** Prefix for filter params (default: "filter_") */
  paramPrefix?: string
}

export function useUrlFilters(options: UseUrlFiltersOptions = {}) {
  const { enabled = true, debounceMs = 300, paramPrefix = "filter_" } = options

  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  // Parse initial filters from URL
  const getInitialFilters = React.useCallback((): ColumnFiltersState => {
    if (!enabled) return []

    const filters: ColumnFiltersState = []
    searchParams.forEach((value, key) => {
      if (key.startsWith(paramPrefix)) {
        const columnId = key.slice(paramPrefix.length)
        // Handle array values (comma-separated)
        const values = value.includes(",") ? value.split(",") : value
        filters.push({ id: columnId, value: values })
      }
    })
    return filters
  }, [enabled, searchParams, paramPrefix])

  // Get search query from URL
  const getInitialSearch = React.useCallback((): string => {
    if (!enabled) return ""
    return searchParams.get("q") || ""
  }, [enabled, searchParams])

  const [filters, setFilters] = React.useState<ColumnFiltersState>(getInitialFilters)
  const [search, setSearch] = React.useState<string>(getInitialSearch)

  // Debounced URL update
  const timeoutRef = React.useRef<NodeJS.Timeout | null>(null)

  const updateUrl = React.useCallback(
    (newFilters: ColumnFiltersState, newSearch: string) => {
      if (!enabled) return

      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }

      timeoutRef.current = setTimeout(() => {
        const params = new URLSearchParams()

        // Add search query
        if (newSearch) {
          params.set("q", newSearch)
        }

        // Add filters
        newFilters.forEach((filter) => {
          const value = Array.isArray(filter.value)
            ? filter.value.join(",")
            : String(filter.value)
          if (value) {
            params.set(`${paramPrefix}${filter.id}`, value)
          }
        })

        // Preserve other params that don't start with our prefix
        searchParams.forEach((value, key) => {
          if (!key.startsWith(paramPrefix) && key !== "q") {
            params.set(key, value)
          }
        })

        const newUrl = params.toString()
          ? `${pathname}?${params.toString()}`
          : pathname

        router.replace(newUrl, { scroll: false })
      }, debounceMs)
    },
    [enabled, pathname, router, searchParams, debounceMs, paramPrefix]
  )

  // Update filters and sync to URL
  const handleFiltersChange = React.useCallback(
    (newFilters: ColumnFiltersState) => {
      setFilters(newFilters)
      updateUrl(newFilters, search)
    },
    [search, updateUrl]
  )

  // Update search and sync to URL
  const handleSearchChange = React.useCallback(
    (newSearch: string) => {
      setSearch(newSearch)
      updateUrl(filters, newSearch)
    },
    [filters, updateUrl]
  )

  // Clear all filters and search
  const clearAll = React.useCallback(() => {
    setFilters([])
    setSearch("")
    if (enabled) {
      // Preserve non-filter params
      const params = new URLSearchParams()
      searchParams.forEach((value, key) => {
        if (!key.startsWith(paramPrefix) && key !== "q") {
          params.set(key, value)
        }
      })
      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname
      router.replace(newUrl, { scroll: false })
    }
  }, [enabled, pathname, router, searchParams, paramPrefix])

  // Cleanup timeout on unmount
  React.useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return {
    filters,
    search,
    setFilters: handleFiltersChange,
    setSearch: handleSearchChange,
    clearAll,
    isFiltered: filters.length > 0 || search.length > 0,
  }
}
