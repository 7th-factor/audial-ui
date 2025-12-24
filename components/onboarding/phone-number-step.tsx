"use client"

import { useState } from "react"
import { IconArrowLeft, IconArrowRight, IconSearch, IconPhone } from "@tabler/icons-react"
import { Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import {
  useAvailablePhoneNumbers,
  usePurchasePhoneNumber,
  type AvailablePhoneNumber,
} from "@/lib/api"
import { toast } from "sonner"
import {
  countryOptions,
  type PhoneNumberFormValues,
} from "@/lib/validations/onboarding"

interface PhoneNumberStepProps {
  defaultValues?: Partial<PhoneNumberFormValues>
  onNext: (data: PhoneNumberFormValues) => void
  onSkip: () => void
  onBack: () => void
}

// Format price for display
function formatPrice(price: number | null): string {
  if (price === null) return "Free"
  return `$${price.toFixed(2)}/mo`
}

export function PhoneNumberStep({
  defaultValues,
  onNext,
  onSkip,
  onBack,
}: PhoneNumberStepProps) {
  const [country, setCountry] = useState<string>(defaultValues?.country ?? "us")
  const [areaCode, setAreaCode] = useState<string>("")

  // Purchase dialog state
  const [purchaseDialogOpen, setPurchaseDialogOpen] = useState(false)
  const [selectedNumber, setSelectedNumber] = useState<AvailablePhoneNumber | null>(null)
  const [purchaseName, setPurchaseName] = useState("")

  // API hooks
  const { data: availableNumbers, isLoading, error } = useAvailablePhoneNumbers()
  const purchaseMutation = usePurchasePhoneNumber()

  const selectedCountry = countryOptions.find((c) => c.value === country)
  const isCountryDisabled = selectedCountry?.disabled ?? false

  // Filter phone numbers by country and area code
  const filteredNumbers = (availableNumbers || []).filter((phone) => {
    // Filter by country code (US = countryCode "US")
    const countryMatch = country === "us" ? phone.countryCode === "US" : true

    // Filter by area code if provided
    const areaCodeMatch = areaCode
      ? phone.phoneNumber.includes(`(${areaCode}`) || phone.phoneNumber.includes(` ${areaCode}`)
      : true

    return countryMatch && areaCodeMatch
  })

  const handleNumberClick = (number: AvailablePhoneNumber) => {
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

      // Proceed to next step with purchased number info
      onNext({
        country,
        phoneNumber: selectedNumber.phoneNumber,
      })
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to purchase phone number"
      )
    }
  }

  const handleDialogClose = (open: boolean) => {
    if (!open && !purchaseMutation.isPending) {
      setPurchaseDialogOpen(false)
      setSelectedNumber(null)
      setPurchaseName("")
    }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Set up your business number</h2>
        <p className="text-muted-foreground">
          Purchase a phone number for your agent. This is the number customers will call.
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="country">Country</Label>
            <Select value={country} onValueChange={setCountry}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Country" />
              </SelectTrigger>
              <SelectContent>
                {countryOptions.map((option) => (
                  <SelectItem
                    key={option.value}
                    value={option.value}
                    disabled={option.disabled}
                  >
                    <span className="flex items-center gap-2">
                      <span>{option.flag}</span>
                      <span>{option.label}</span>
                      {option.comingSoon && (
                        <Badge variant="secondary" className="ml-1 text-xs">
                          Coming Soon
                        </Badge>
                      )}
                    </span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="areaCode">Area Code</Label>
            <div className="relative">
              <IconSearch className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                id="areaCode"
                placeholder="e.g. 212, 415, 310"
                value={areaCode}
                onChange={(e) => setAreaCode(e.target.value.replace(/\D/g, "").slice(0, 3))}
                className="pl-9"
                disabled={isCountryDisabled}
              />
            </div>
          </div>
        </div>

        {isCountryDisabled ? (
          <div className="flex items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-muted-foreground">
              Phone numbers for {selectedCountry?.label} are coming soon.
              <br />
              Please select United States or skip for now.
            </p>
          </div>
        ) : isLoading ? (
          <div className="flex items-center justify-center rounded-lg border border-dashed p-8">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
            <span className="ml-2 text-muted-foreground">Loading available numbers...</span>
          </div>
        ) : error ? (
          <div className="flex items-center justify-center rounded-lg border border-dashed p-8 text-center">
            <p className="text-destructive">
              Failed to load available numbers.
              <br />
              <span className="text-sm text-muted-foreground">Please try again or skip for now.</span>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {filteredNumbers.length > 0 ? (
              filteredNumbers.slice(0, 9).map((phone) => (
                <button
                  key={phone.phoneNumber}
                  type="button"
                  onClick={() => handleNumberClick(phone)}
                  className={cn(
                    "flex flex-col items-start gap-2 rounded-lg border p-4 text-left shadow-sm transition-all hover:shadow-md hover:border-primary/50",
                    "border-border"
                  )}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-lg">{selectedCountry?.flag ?? "🇺🇸"}</span>
                    <span className="text-sm text-muted-foreground">
                      {formatPrice(phone.monthlyPrice)}
                    </span>
                  </div>
                  <span className="font-medium">{phone.phoneNumber}</span>
                  <div className="flex gap-1">
                    {phone.capabilities.voice && (
                      <Badge variant="secondary" className="text-xs">Voice</Badge>
                    )}
                    {phone.capabilities.sms && (
                      <Badge variant="secondary" className="text-xs">SMS</Badge>
                    )}
                  </div>
                </button>
              ))
            ) : (
              <div className="col-span-3 flex items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <p className="text-muted-foreground">
                  {areaCode ? (
                    <>
                      No numbers found for area code "{areaCode}".
                      <br />
                      Try a different area code.
                    </>
                  ) : (
                    <>
                      No phone numbers available.
                      <br />
                      Please try again later or skip for now.
                    </>
                  )}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <Button type="button" variant="outline" onClick={onBack}>
          <IconArrowLeft className="mr-2 size-4" />
          Back
        </Button>
        <div className="flex items-center gap-3">
          <Button type="button" variant="outline" onClick={onSkip}>
            Skip for Later
          </Button>
        </div>
      </div>

      {/* Purchase Confirmation Dialog */}
      <Dialog open={purchaseDialogOpen} onOpenChange={handleDialogClose}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <IconPhone className="h-5 w-5" />
              Purchase Phone Number
            </DialogTitle>
            <DialogDescription>
              You are about to purchase {selectedNumber?.phoneNumber}. Give it a
              friendly name to help you identify it later.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="purchase-name">Phone Number Name</Label>
              <Input
                id="purchase-name"
                placeholder="e.g., Main Line, Sales, Support"
                value={purchaseName}
                onChange={(e) => setPurchaseName(e.target.value)}
              />
            </div>
            {selectedNumber?.monthlyPrice && (
              <p className="text-sm text-muted-foreground">
                Monthly cost: {formatPrice(selectedNumber.monthlyPrice)}
              </p>
            )}
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => handleDialogClose(false)}
              disabled={purchaseMutation.isPending}
            >
              Cancel
            </Button>
            <Button
              onClick={handlePurchaseConfirm}
              disabled={!purchaseName.trim() || purchaseMutation.isPending}
            >
              {purchaseMutation.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Purchasing...
                </>
              ) : (
                "Confirm Purchase"
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
