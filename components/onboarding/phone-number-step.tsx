"use client"

import { useState } from "react"
import { IconArrowLeft, IconArrowRight, IconSearch } from "@tabler/icons-react"

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
import { cn } from "@/lib/utils"
import {
  countryOptions,
  mockPhoneNumbers,
  type PhoneNumberFormValues,
} from "@/lib/validations/onboarding"

interface PhoneNumberStepProps {
  defaultValues?: Partial<PhoneNumberFormValues>
  onNext: (data: PhoneNumberFormValues) => void
  onSkip: () => void
  onBack: () => void
}

export function PhoneNumberStep({
  defaultValues,
  onNext,
  onSkip,
  onBack,
}: PhoneNumberStepProps) {
  const [country, setCountry] = useState<string>(defaultValues?.country ?? "us")
  const [areaCode, setAreaCode] = useState<string>("")
  const [selectedNumber, setSelectedNumber] = useState<string>(
    defaultValues?.phoneNumber ?? ""
  )

  const handleNext = () => {
    onNext({
      country,
      phoneNumber: selectedNumber,
    })
  }

  const selectedCountry = countryOptions.find((c) => c.value === country)
  const isCountryDisabled = selectedCountry?.disabled ?? false

  // Filter phone numbers by area code if provided
  const filteredNumbers = areaCode
    ? mockPhoneNumbers.filter((phone) =>
        phone.number.includes(`(${areaCode}`)
      )
    : mockPhoneNumbers

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-2xl font-semibold">Set up your business number</h2>
        <p className="text-muted-foreground">
          Assign a 14-day Free trial number to your agent. This is the number
          customers will call.
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
        ) : (
          <div className="grid grid-cols-3 gap-3">
            {filteredNumbers.length > 0 ? (
              filteredNumbers.map((phone) => (
                <button
                  key={phone.id}
                  type="button"
                  onClick={() => setSelectedNumber(phone.id)}
                  className={cn(
                    "flex flex-col items-start gap-2 rounded-lg border p-4 text-left shadow-sm transition-all hover:shadow-md",
                    selectedNumber === phone.id
                      ? "border-primary ring-2 ring-primary/20"
                      : "border-border hover:border-muted-foreground/40"
                  )}
                >
                  <div className="flex w-full items-center justify-between">
                    <span className="text-lg">{selectedCountry?.flag ?? "🇺🇸"}</span>
                    <span className="text-sm text-muted-foreground">
                      {phone.price}
                    </span>
                  </div>
                  <span className="font-medium">{phone.number}</span>
                </button>
              ))
            ) : (
              <div className="col-span-3 flex items-center justify-center rounded-lg border border-dashed p-8 text-center">
                <p className="text-muted-foreground">
                  No numbers found for area code "{areaCode}".
                  <br />
                  Try a different area code.
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
          <Button
            type="button"
            onClick={handleNext}
            disabled={isCountryDisabled && !selectedNumber}
          >
            Continue
            <IconArrowRight className="ml-2 size-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}
