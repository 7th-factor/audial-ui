"use client"

import { useState, useMemo } from "react"
import { Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  PhoneNumberCard,
  type PhoneNumber as PhoneNumberCardType,
} from "@/components/settings/phone-number-card"
import { SearchAndFilter } from "@/components/shared/search-and-filter"
import { CardGridPagination } from "@/components/shared/card-grid-pagination"
import {
  IconPhone,
  IconShoppingCart,
} from "@tabler/icons-react"
import {
  usePhoneNumbers,
  useAvailablePhoneNumbers,
  usePurchasePhoneNumber,
  useDeletePhoneNumber,
  type PhoneNumber,
  type AvailablePhoneNumber,
} from "@/lib/api"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

// Provider options for faceted filter
const providerOptions = [
  { value: "twilio", label: "Twilio" },
  { value: "vonage", label: "Vonage" },
  { value: "audial", label: "Audial" },
]

// Transform API phone number to card format
function transformPhoneNumber(
  phoneNumber: PhoneNumber
): PhoneNumberCardType & { provider: string } {
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
    provider: phoneNumber.provider,
  }
}

// Available number card component
function AvailableNumberCard({
  number,
  onPurchase,
  isPurchasing,
}: {
  number: AvailablePhoneNumber
  onPurchase: (number: AvailablePhoneNumber) => void
  isPurchasing: boolean
}) {
  return (
    <div className="rounded-lg border bg-card p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconPhone className="h-4 w-4 text-muted-foreground" />
          <span className="font-mono font-medium">{number.phoneNumber}</span>
        </div>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded">
          {number.countryCode}
        </span>
      </div>
      <div className="flex flex-wrap gap-2 text-xs">
        {number.capabilities.voice && (
          <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded">
            Voice
          </span>
        )}
        {number.capabilities.sms && (
          <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
            SMS
          </span>
        )}
        {number.capabilities.mms && (
          <span className="bg-purple-100 text-purple-700 px-2 py-0.5 rounded">
            MMS
          </span>
        )}
      </div>
      <div className="flex items-center justify-between pt-2 border-t">
        <div className="text-sm">
          {number.monthlyPrice !== null ? (
            <span className="font-medium">${number.monthlyPrice}/mo</span>
          ) : (
            <span className="text-muted-foreground">Price unavailable</span>
          )}
        </div>
        <Button
          size="sm"
          onClick={() => onPurchase(number)}
          disabled={isPurchasing}
        >
          {isPurchasing ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <IconShoppingCart className="mr-1 h-3 w-3" />
              Purchase
            </>
          )}
        </Button>
      </div>
    </div>
  )
}

export default function PhoneNumbersPage() {
  const { data: phoneNumbersData, isLoading, error } = usePhoneNumbers()
  const {
    data: availableNumbersData,
    isLoading: isLoadingAvailable,
  } = useAvailablePhoneNumbers()
  const purchaseMutation = usePurchasePhoneNumber()
  const deleteMutation = useDeletePhoneNumber()

  const phoneNumbers = useMemo(
    () => phoneNumbersData?.map(transformPhoneNumber) || [],
    [phoneNumbersData]
  )

  const [filteredData, setFilteredData] = useState<
    (PhoneNumberCardType & { provider: string })[]
  >([])
  const [currentPage, setCurrentPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [activeTab, setActiveTab] = useState("your-numbers")

  // Purchase dialog state
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
  const [selectedNumber, setSelectedNumber] =
    useState<AvailablePhoneNumber | null>(null)
  const [purchaseName, setPurchaseName] = useState("")

  // Delete dialog state
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [phoneNumberToDelete, setPhoneNumberToDelete] = useState<string | null>(null)

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

  const handlePurchaseClick = (number: AvailablePhoneNumber) => {
    setSelectedNumber(number)
    setPurchaseName("")
    setPurchaseDialogOpen(true)
  }

  const handlePurchaseConfirm = async () => {
    if (!selectedNumber || !purchaseName.trim()) return

    try {
      await purchaseMutation.mutateAsync({
        phoneNumber: selectedNumber.phoneNumber,
        name: purchaseName.trim(),
      })
      toast.success("Phone number purchased successfully!")
      setPurchaseDialogOpen(false)
      setSelectedNumber(null)
      setPurchaseName("")
      setActiveTab("your-numbers")
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to purchase phone number"
      )
    }
  }

  const handleDeleteClick = (id: string) => {
    setPhoneNumberToDelete(id)
    setDeleteDialogOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!phoneNumberToDelete) return

    try {
      await deleteMutation.mutateAsync(phoneNumberToDelete)
      toast.success("Phone number deleted successfully!")
      setDeleteDialogOpen(false)
      setPhoneNumberToDelete(null)
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to delete phone number"
      )
    }
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
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="your-numbers">
            <IconPhone className="mr-2 h-4 w-4" />
            Your Numbers ({phoneNumbers.length})
          </TabsTrigger>
          <TabsTrigger value="available">
            <IconShoppingCart className="mr-2 h-4 w-4" />
            Available Numbers
          </TabsTrigger>
        </TabsList>

        {/* Your Numbers Tab */}
        <TabsContent value="your-numbers" className="space-y-6 mt-6">
          {/* Search and Filters */}
          <SearchAndFilter
            data={phoneNumbers}
            searchColumn="number"
            searchPlaceholder="Search phone numbers..."
            filters={[
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
                onDelete={handleDeleteClick}
              />
            ))}
          </div>

          {filteredData.length === 0 && (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No phone numbers found.{" "}
              <button
                className="text-primary underline"
                onClick={() => setActiveTab("available")}
              >
                Get a number
              </button>
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
        </TabsContent>

        {/* Available Numbers Tab */}
        <TabsContent value="available" className="space-y-6 mt-6">
          {isLoadingAvailable ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
            </div>
          ) : !availableNumbersData || availableNumbersData.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground text-sm">
              No available numbers at this time. Please check back later.
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              {availableNumbersData.map((number) => (
                <AvailableNumberCard
                  key={number.phoneNumber}
                  number={number}
                  onPurchase={handlePurchaseClick}
                  isPurchasing={
                    purchaseMutation.isPending &&
                    selectedNumber?.phoneNumber === number.phoneNumber
                  }
                />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Purchase Dialog */}
      <Dialog open={purchaseDialogOpen} onOpenChange={setPurchaseDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Purchase Phone Number</DialogTitle>
            <DialogDescription>
              You are about to purchase{" "}
              <span className="font-mono font-medium">
                {selectedNumber?.phoneNumber}
              </span>
              {selectedNumber?.monthlyPrice !== null && (
                <> for ${selectedNumber?.monthlyPrice}/month</>
              )}
              .
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="e.g., Sales Line, Support"
                value={purchaseName}
                onChange={(e) => setPurchaseName(e.target.value)}
              />
              <p className="text-xs text-muted-foreground">
                Give this number a friendly name to identify it.
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setPurchaseDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePurchaseConfirm}
              disabled={!purchaseName.trim() || purchaseMutation.isPending}
            >
              {purchaseMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <IconShoppingCart className="mr-2 h-4 w-4" />
              )}
              Confirm Purchase
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Phone Number</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this phone number? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteDialogOpen(false)}
              disabled={deleteMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDeleteConfirm}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : null}
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
