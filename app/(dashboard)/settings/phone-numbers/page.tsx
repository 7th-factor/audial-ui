"use client"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import {
  PhoneNumberCard,
  type PhoneNumber,
} from "@/components/settings/phone-number-card"
import { SearchAndFilter } from "@/components/shared/search-and-filter"
import { CardGridPagination } from "@/components/shared/card-grid-pagination"
import {
  IconPlus,
  IconCircleCheck,
  IconCircleX,
} from "@tabler/icons-react"

// Status options for faceted filter
const statusOptions = [
  { value: "active", label: "Active", icon: IconCircleCheck },
  { value: "inactive", label: "Inactive", icon: IconCircleX },
]

// Country options for faceted filter
const countryOptions = [
  { value: "US", label: "United States" },
  { value: "GB", label: "United Kingdom" },
  { value: "CA", label: "Canada" },
  { value: "AU", label: "Australia" },
  { value: "DE", label: "Germany" },
  { value: "FR", label: "France" },
]

// Mock data based on screenshot
const mockPhoneNumbers: (PhoneNumber & { status: string })[] = [
  {
    id: "1",
    number: "+1 (809) 526 2710",
    countryCode: "US",
    label: "Support",
    isActive: true,
    status: "active",
  },
  {
    id: "2",
    number: "+1 (809) 526 2711",
    countryCode: "US",
    label: "Marketing",
    isActive: true,
    status: "active",
  },
  {
    id: "3",
    number: "+1 (809) 526 2712",
    countryCode: "US",
    label: "Sales",
    isActive: false,
    status: "inactive",
  },
  {
    id: "4",
    number: "+44 20 7946 0958",
    countryCode: "GB",
    label: "UK Support",
    isActive: true,
    status: "active",
  },
  {
    id: "5",
    number: "+1 (416) 555 0123",
    countryCode: "CA",
    label: "Canada Line",
    isActive: false,
    status: "inactive",
  },
  {
    id: "6",
    number: "+1 (809) 526 2713",
    countryCode: "US",
    label: "New",
    isActive: false,
    status: "inactive",
  },
]

export default function PhoneNumbersPage() {
  const [phoneNumbers, setPhoneNumbers] = useState(mockPhoneNumbers)
  const [filteredData, setFilteredData] = useState(mockPhoneNumbers)
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const handleToggle = (id: string, isActive: boolean) => {
    setPhoneNumbers((prev) =>
      prev.map((pn) =>
        pn.id === id
          ? { ...pn, isActive, status: isActive ? "active" : "inactive" }
          : pn
      )
    )
  }

  // Paginated data
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize
    return filteredData.slice(start, start + pageSize)
  }, [filteredData, currentPage, pageSize])

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
  }

  const handlePageSizeChange = (size: number) => {
    setPageSize(size)
    setCurrentPage(1)
  }

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Phone Numbers</h2>
          <p className="text-sm text-muted-foreground">
            Manage your phone numbers and availability.
          </p>
        </div>
        <Button>
          <IconPlus className="mr-2 h-4 w-4" />
          Get a Number
        </Button>
      </div>

      {/* Search and Filters */}
      <SearchAndFilter
        data={phoneNumbers}
        searchColumn="number"
        searchPlaceholder="Search phone numbers..."
        filters={[
          {
            column: "status",
            title: "Status",
            options: statusOptions,
          },
          {
            column: "countryCode",
            title: "Country",
            options: countryOptions,
          },
        ]}
        onFilteredDataChange={setFilteredData}
      />

      {/* Phone Number Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {paginatedData.map((phoneNumber) => (
          <PhoneNumberCard
            key={phoneNumber.id}
            phoneNumber={phoneNumber}
            onToggle={handleToggle}
          />
        ))}
      </div>

      {filteredData.length === 0 && (
        <div className="text-center py-12 text-muted-foreground text-sm">
          No phone numbers found
        </div>
      )}

      {/* Pagination */}
      {filteredData.length > 0 && (
        <CardGridPagination
          totalItems={filteredData.length}
          pageSize={pageSize}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onPageSizeChange={handlePageSizeChange}
          pageSizeOptions={[6, 12, 24, 48]}
        />
      )}
    </div>
  )
}
