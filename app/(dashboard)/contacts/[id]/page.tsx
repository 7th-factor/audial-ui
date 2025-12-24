"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
import { Loader2 } from "lucide-react"
import {
  IconPhone,
  IconMail,
  IconMessageCircle,
  IconCalendarEvent,
  IconPhoneOff,
  IconSettings,
  IconAdjustmentsHorizontal,
  IconMapPin,
  IconClock,
  IconPlus,
} from "@tabler/icons-react"

import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardAction } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCustomer } from "@/lib/api"

function getConversationIcon(type: string) {
  switch (type) {
    case "call":
      return IconPhone
    case "sms":
      return IconMessageCircle
    case "email":
      return IconMail
    case "appointment":
      return IconCalendarEvent
    default:
      return IconPhone
  }
}

export default function ContactDetailPage() {
  const params = useParams()
  const contactId = params.id as string
  const { data: customer, isLoading, error } = useCustomer(contactId)

  if (isLoading) {
    return (
      <div className="flex h-full items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    )
  }

  if (error || !customer) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Contact not found</h2>
          <p className="text-muted-foreground">
            {error instanceof Error ? error.message : "The contact you're looking for doesn't exist."}
          </p>
          <Button asChild className="mt-4">
            <Link href="/contacts">Back to Contacts</Link>
          </Button>
        </div>
      </div>
    )
  }

  // Build contact display data from API customer
  const firstName = customer.firstName || ""
  const lastName = customer.lastName || ""
  const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Unknown"
  const initials = fullName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "?"

  // Extract custom attributes for display
  const customAttrs = customer.customAttributes || {}
  const company = (customAttrs.company as string) || ""
  const industry = (customAttrs.industry as string) || ""
  const budget = (customAttrs.budget as string) || ""
  const timeline = (customAttrs.timeline as string) || ""

  // Derive country from phone number (simple heuristic)
  const phone = customer.phoneNumber || ""
  const country = phone.startsWith("+1") ? "United States" : phone.startsWith("+44") ? "United Kingdom" : ""
  const countryCode = phone.startsWith("+1") ? "US" : phone.startsWith("+44") ? "UK" : "US"

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Contact Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="size-12 text-base">
            <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold">{fullName}</h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              {country && (
                <span className="flex items-center gap-1">
                  <IconMapPin className="size-3" />
                  {country}
                </span>
              )}
              {customer.email && (
                <span className="flex items-center gap-1">
                  <IconMail className="size-3" />
                  {customer.email}
                </span>
              )}
              {phone && (
                <span className="flex items-center gap-1">
                  <IconPhone className="size-3" />
                  {phone}
                </span>
              )}
            </div>
          </div>
        </div>
        <Button size="sm">
          <IconPlus className="mr-1.5 size-4" />
          New Conversation
        </Button>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-4 lg:grid-cols-[340px_1fr]">
        {/* Left Column - User Details & Attributes */}
        <div className="flex flex-col gap-4">
          {/* User Details Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">User Details</CardTitle>
              <CardAction>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  <IconAdjustmentsHorizontal className="mr-1.5 size-3.5" />
                  View
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="firstName" className="text-xs">
                  First Name
                </Label>
                <Input id="firstName" defaultValue={firstName} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="lastName" className="text-xs">
                  Last Name
                </Label>
                <Input id="lastName" defaultValue={lastName} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">
                  Email
                </Label>
                <Input id="email" type="email" defaultValue={customer.email || ""} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs">
                  Phone number
                </Label>
                <div className="flex gap-2">
                  <Select defaultValue={countryCode}>
                    <SelectTrigger className="h-9 w-20">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="US">🇺🇸</SelectItem>
                      <SelectItem value="UK">🇬🇧</SelectItem>
                      <SelectItem value="CA">🇨🇦</SelectItem>
                      <SelectItem value="AU">🇦🇺</SelectItem>
                    </SelectContent>
                  </Select>
                  <Input id="phone" defaultValue={phone} className="h-9 flex-1" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Attributes Card */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">Attributes</CardTitle>
              <CardAction>
                <Button variant="ghost" size="sm" className="h-7 text-xs">
                  <IconSettings className="mr-1.5 size-3.5" />
                  Settings
                </Button>
              </CardAction>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-1.5">
                <Label htmlFor="company" className="text-xs">
                  Company Name
                </Label>
                <Input id="company" defaultValue={company} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="industry" className="text-xs">
                  Industry
                </Label>
                <Input id="industry" defaultValue={industry} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="budget" className="text-xs">
                  Budget
                </Label>
                <Input id="budget" defaultValue={budget} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="timeline" className="text-xs">
                  Moving Timeline
                </Label>
                <Input id="timeline" defaultValue={timeline} className="h-9" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Summary & Activity */}
        <div>
          <h2 className="mb-3 text-base font-semibold">Summary & Activity</h2>
          <div className="flex flex-col gap-3">
            {/* Conversation Summary */}
            {customer.conversationSummary && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Conversation Summary</CardTitle>
                </CardHeader>
                <CardContent className="text-sm text-muted-foreground">
                  {customer.conversationSummary}
                </CardContent>
              </Card>
            )}

            {/* Ongoing Issues */}
            {customer.ongoingIssues && customer.ongoingIssues.length > 0 && (
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm">Ongoing Issues</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                    {customer.ongoingIssues.map((issue, idx) => (
                      <li key={idx}>{issue}</li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            )}

            {/* Empty state */}
            {!customer.conversationSummary && (!customer.ongoingIssues || customer.ongoingIssues.length === 0) && (
              <Card>
                <CardContent className="py-6 text-center text-sm text-muted-foreground">
                  No conversations yet. Start a new conversation to begin.
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
