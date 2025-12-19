"use client"
import Link from "next/link"
import { useParams } from "next/navigation"
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

// Extended contact data with more details
const contactsData: Record<
  string,
  {
    id: string
    name: string
    email: string
    company: string
    role: string
    status: string
    phone: string
    country: string
    countryCode: string
    timezone: string
    industry: string
    budget: string
    timeline: string
    conversations: {
      id: string
      type: "call" | "sms" | "email" | "appointment"
      title: string
      description: string
      time: string
    }[]
  }
> = {
  "CON-001": {
    id: "CON-001",
    name: "Sarah Johnson",
    email: "sarah.johnson@acme.com",
    company: "Acme Corp",
    role: "Marketing Director",
    status: "active",
    phone: "+1 (415) 555-0123",
    country: "United States",
    countryCode: "US",
    timezone: "09:24 AM",
    industry: "Technology",
    budget: "$50,000 - $100,000",
    timeline: "Q2 2024",
    conversations: [
      {
        id: "conv-1",
        type: "call",
        title: "Property enquiry with You",
        description:
          "The customer, Sarah, contacted Acme Corp to book a meeting with Emmanuel. Though Emmanuel was initially found as available, the specific time requested by Sarah was busy. The bot suggested an available 'Realtor viewing' slot.",
        time: "1h ago",
      },
      {
        id: "conv-2",
        type: "appointment",
        title: "Appointment Booked with Jane Doe",
        description: "Viewing booked on 12 July, 2025 - 09:54 AM",
        time: "2h ago",
      },
      {
        id: "conv-3",
        type: "sms",
        title: "New SMS",
        description: "Hello",
        time: "2h ago",
      },
      {
        id: "conv-4",
        type: "call",
        title: "Call Failed",
        description: "No response",
        time: "2h ago",
      },
    ],
  },
  "CON-002": {
    id: "CON-002",
    name: "Michael Chen",
    email: "m.chen@techcorp.io",
    company: "TechCorp",
    role: "CTO",
    status: "vip",
    phone: "+1 (628) 555-0456",
    country: "United States",
    countryCode: "US",
    timezone: "10:15 AM",
    industry: "Software",
    budget: "$100,000+",
    timeline: "Q1 2024",
    conversations: [
      {
        id: "conv-1",
        type: "email",
        title: "Product Demo Request",
        description: "Interested in enterprise features",
        time: "3h ago",
      },
    ],
  },
  "CON-003": {
    id: "CON-003",
    name: "Emily Davis",
    email: "emily.d@startup.co",
    company: "StartupCo",
    role: "Founder",
    status: "active",
    phone: "+1 (510) 555-0789",
    country: "United States",
    countryCode: "US",
    timezone: "11:30 AM",
    industry: "Fintech",
    budget: "$25,000 - $50,000",
    timeline: "Q3 2024",
    conversations: [],
  },
  "CON-004": {
    id: "CON-004",
    name: "John Smith",
    email: "john.smith@bigco.com",
    company: "BigCo Inc",
    role: "Sales Manager",
    status: "inactive",
    phone: "+1 (212) 555-0321",
    country: "United States",
    countryCode: "US",
    timezone: "12:45 PM",
    industry: "Manufacturing",
    budget: "",
    timeline: "",
    conversations: [
      {
        id: "conv-1",
        type: "call",
        title: "Follow-up Call",
        description: "Discussed pricing options",
        time: "1d ago",
      },
    ],
  },
  "CON-005": {
    id: "CON-005",
    name: "Lisa Wong",
    email: "lisa.wong@ventures.vc",
    company: "Ventures VC",
    role: "Partner",
    status: "active",
    phone: "+1 (650) 555-0654",
    country: "United States",
    countryCode: "US",
    timezone: "09:00 AM",
    industry: "Venture Capital",
    budget: "$500,000+",
    timeline: "Ongoing",
    conversations: [
      {
        id: "conv-1",
        type: "appointment",
        title: "Investment Meeting",
        description: "Scheduled for next week",
        time: "5h ago",
      },
    ],
  },
}

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
  const contact = contactsData[contactId]

  if (!contact) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-lg font-semibold">Contact not found</h2>
          <p className="text-muted-foreground">The contact you&apos;re looking for doesn&apos;t exist.</p>
          <Button asChild className="mt-4">
            <Link href="/contacts">Back to Contacts</Link>
          </Button>
        </div>
      </div>
    )
  }

  const initials = contact.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()

  const [firstName, lastName] = contact.name.split(" ")

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Contact Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="size-12 text-base">
            <AvatarFallback className="bg-primary/10 text-primary">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-lg font-semibold">{contact.name}</h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <IconMapPin className="size-3" />
                {contact.country}
              </span>
              <span className="flex items-center gap-1">
                <IconClock className="size-3" />
                {contact.timezone}
              </span>
              <span className="flex items-center gap-1">
                <IconMail className="size-3" />
                {contact.email}
              </span>
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
                <Input id="lastName" defaultValue={lastName || ""} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="email" className="text-xs">
                  Email
                </Label>
                <Input id="email" type="email" defaultValue={contact.email} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="phone" className="text-xs">
                  Phone number
                </Label>
                <div className="flex gap-2">
                  <Select defaultValue={contact.countryCode}>
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
                  <Input id="phone" defaultValue={contact.phone} className="h-9 flex-1" />
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
                <Input id="company" defaultValue={contact.company} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="industry" className="text-xs">
                  Industry
                </Label>
                <Input id="industry" defaultValue={contact.industry} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="budget" className="text-xs">
                  Budget
                </Label>
                <Input id="budget" defaultValue={contact.budget} className="h-9" />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="timeline" className="text-xs">
                  Moving Timeline
                </Label>
                <Input id="timeline" defaultValue={contact.timeline} className="h-9" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Conversations & Activity */}
        <div>
          <h2 className="mb-3 text-base font-semibold">Conversations & Activity</h2>
          <div className="flex flex-col gap-3">
            {contact.conversations.length === 0 ? (
              <Card>
                <CardContent className="py-6 text-center text-sm text-muted-foreground">
                  No conversations yet. Start a new conversation to begin.
                </CardContent>
              </Card>
            ) : (
              contact.conversations.map((conversation) => {
                const Icon = getConversationIcon(conversation.type)
                const isFailedCall = conversation.title.toLowerCase().includes("failed")

                return (
                  <Card key={conversation.id} className="transition-colors hover:bg-muted/50">
                    <CardContent className="p-3">
                      <div className="flex gap-3">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted">
                          {isFailedCall ? (
                            <IconPhoneOff className="size-4 text-muted-foreground" />
                          ) : (
                            <Icon className="size-4 text-muted-foreground" />
                          )}
                        </div>
                        <div className="flex-1 space-y-0.5">
                          <div className="flex items-start justify-between gap-2">
                            <h3 className="text-sm font-medium leading-tight">{conversation.title}</h3>
                            <span className="shrink-0 text-xs text-muted-foreground">{conversation.time}</span>
                          </div>
                          <p className="text-xs leading-relaxed text-muted-foreground">{conversation.description}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )
              })
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
