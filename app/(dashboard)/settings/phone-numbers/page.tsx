"use client"

import { useState, useMemo } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  PhoneNumberCard,
  type PhoneNumber as PhoneNumberCardType,
} from "@/components/settings/phone-number-card"
import { SearchAndFilter } from "@/components/shared/search-and-filter"
import { CardGridPagination } from "@/components/shared/card-grid-pagination"
import {
  IconPlus,
  IconCircleCheck,
  IconCircleX,
} from "@tabler/icons-react"
import { usePhoneNumbers, type PhoneNumber } from "@/lib/api"

// Status options for faceted filter
const statusOptions = [
  { value: "active", label: "Active", icon: IconCircleCheck },
  { value: "inactive", label: "Inactive", icon: IconCircleX },
]

// Provider options for faceted filter
const providerOptions = [
  { value: "twilio", label: "Twilio" },
  { value: "vonage", label: "Vonage" },
]

// Transform API phone number to card format
function transformPhoneNumber(
  phoneNumber: PhoneNumber
): PhoneNumberCardType & { status: string; provider: string } {
  // Extract country code from the phone number (simple heuristic)
  const countryCode = phoneNumber.number.startsWith("+1")
    ? "US"
    : phoneNumber.number.startsWith("+44")
      ? "GB"
      : phoneNumber.number.startsWith("+61")
        ? "AU"
        : phoneNumber.number.startsWith("+49")
          ? "DE"
          : phoneNumber.number.startsWith("+33")
            ? "FR"
            : "US"

  return {
    id: phoneNumber.id,
    number: phoneNumber.number,
    countryCode,
    label: phoneNumber.name,
    isActive: true, // API doesn't have active status, assume active
    status: "active",
    provider: phoneNumber.provider,
  }
}

export default function PhoneNumbersPage() {
  const { data: phoneNumbersData, isLoading, error } = usePhoneNumbers()

  const phoneNumbers = useMemo(
    () => phoneNumbersData?.map(transformPhoneNumber) || [],
    [phoneNumbersData]
  )

  const [filteredData, setFilteredData] = useState<
    (PhoneNumberCardType & { status: string; provider: string })[]
  >([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  // Update filtered data when phone numbers load
  useMemo(() => {
    if (phoneNumbers.length > 0 && filteredData.length === 0) {
      setFilteredData(phoneNumbers)
    }
  }, [phoneNumbers, filteredData.length])

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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Phone Numbers</h2>
            <p className="text-sm text-muted-foreground">
              Manage your phone numbers and availability.
            </p>
          </div>
          <Button disabled>
            <IconPlus className="mr-2 h-4 w-4" />
            Get a Number
          </Button>
        </div>
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Phone Numbers</h2>
            <p className="text-sm text-muted-foreground">
              Manage your phone numbers and availability.
            </p>
          </div>
          <Button disabled>
            <IconPlus className="mr-2 h-4 w-4" />
            Get a Number
          </Button>
        </div>
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <p className="text-destructive mb-2">Failed to load phone numbers</p>
          <p className="text-sm text-muted-foreground">
            {error instanceof Error ? error.message : "An error occurred"}
          </p>
        </div>
      </div>
    )
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
            column: "provider",
            title: "Provider",
            options: providerOptions,
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
            onToggle={(id, isActive) => {
              // TODO: Implement phone number toggle with API
              console.log("Toggle phone number", id, isActive)
            }}
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
