"use client"

import { useState } from "react"
import {
  IconCalendar,
  IconClock,
  IconMapPin,
  IconChevronDown,
  IconChevronUp,
  IconClockHour4,
  IconSend,
  IconUserPlus,
  IconX,
  IconAlertCircle,
} from "@tabler/icons-react"

import { PageLayout } from "@/components/page-layout"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NamedAvatarGroup, NamedAvatar } from "@/components/named-avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Calendar } from "@/components/ui/calendar"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

interface Attendee {
  name: string
}

interface CalendarEvent {
  id: string
  date: Date
  startTime: string
  endTime: string
  title: string
  location: string
  attendees: Attendee[]
  status: "confirmed" | "pending" | "cancelled"
  requestedTime?: string
}

const events: CalendarEvent[] = [
  {
    id: "1",
    date: new Date(2025, 0, 28),
    startTime: "09:00",
    endTime: "09:30",
    title: "30min call meeting Peer <> Leslie",
    location: "Online",
    attendees: [{ name: "Peer Johnson" }, { name: "Leslie Chen" }],
    status: "confirmed",
  },
  {
    id: "2",
    date: new Date(2025, 0, 30),
    startTime: "15:20",
    endTime: "16:20",
    title: "Livn Product Demo",
    location: "Wework Paris, ...",
    attendees: [{ name: "Alex Morgan" }, { name: "Sarah Kim" }, { name: "Mike Davis" }, { name: "Emma Wilson" }],
    status: "confirmed",
  },
  {
    id: "3",
    date: new Date(2025, 0, 29),
    startTime: "11:15",
    endTime: "11:45",
    title: "30min call meeting Olivia, Liam <> Alban",
    location: "Online",
    attendees: [{ name: "Olivia Brown" }, { name: "Liam Taylor" }, { name: "Alban Dupont" }],
    status: "confirmed",
  },
  {
    id: "4",
    date: new Date(2025, 1, 2),
    startTime: "11:15",
    endTime: "11:45",
    title: "30min call meeting Yulia, Alvin <> Irina, Mae",
    location: "Online",
    attendees: [{ name: "Yulia Petrova" }, { name: "Alvin Tan" }, { name: "Irina Volkov" }, { name: "Mae Thompson" }],
    status: "pending",
    requestedTime: "15:30 - 16:00",
  },
  {
    id: "5",
    date: new Date(2025, 1, 3),
    startTime: "10:45",
    endTime: "11:45",
    title: "Livn Product Demo",
    location: "Online",
    attendees: [{ name: "John Smith" }, { name: "Jane Doe" }],
    status: "confirmed",
  },
  {
    id: "6",
    date: new Date(2025, 1, 4),
    startTime: "17:30",
    endTime: "18:00",
    title: "Product meeting review",
    location: "The Place, ...",
    attendees: [{ name: "Tom Anderson" }, { name: "Anna Garcia" }, { name: "Chris Lee" }, { name: "Lisa Martin" }],
    status: "confirmed",
  },
]

function formatDayName(date: Date): string {
  return date.toLocaleDateString("en-US", { weekday: "short" })
}

function formatDayNumber(date: Date): string {
  return date.getDate().toString().padStart(2, "0")
}

function formatMonthYear(date: Date): string {
  return date.toLocaleDateString("en-US", { month: "long" })
}

function groupEventsByMonth(events: CalendarEvent[]): Map<string, CalendarEvent[]> {
  const grouped = new Map<string, CalendarEvent[]>()
  const sorted = [...events].sort((a, b) => a.date.getTime() - b.date.getTime())

  for (const event of sorted) {
    const monthKey = formatMonthYear(event.date)
    if (!grouped.has(monthKey)) {
      grouped.set(monthKey, [])
    }
    grouped.get(monthKey)!.push(event)
  }

  return grouped
}

function EventCard({ event }: { event: CalendarEvent }) {
  const [isOpen, setIsOpen] = useState(false)
  const isToday = new Date().toDateString() === event.date.toDateString()
  const isPending = event.status === "pending"

  return (
    <div
      className={cn(
        "relative flex items-center gap-4 rounded-lg border bg-card p-4 transition-colors",
        isPending &&
          "bg-[repeating-linear-gradient(-45deg,transparent,transparent_10px,hsl(var(--muted)/0.5)_10px,hsl(var(--muted)/0.5)_20px)]",
      )}
    >
      {/* Date column */}
      <div className="flex w-14 flex-col items-center text-center">
        <span className={cn("text-sm font-medium", isToday ? "text-orange-500" : "text-muted-foreground")}>
          {formatDayName(event.date)}
        </span>
        <span className={cn("text-2xl font-semibold", isToday ? "text-orange-500" : "text-foreground")}>
          {formatDayNumber(event.date)}
        </span>
      </div>

      {/* Divider */}
      <div className="h-12 w-px bg-border" />

      {/* Time and location */}
      <div className="flex w-32 flex-col gap-1">
        <div className="flex items-center gap-1.5 text-sm">
          <IconClock className="size-4 text-muted-foreground" />
          <span>
            {event.startTime} - {event.endTime}
          </span>
          {isPending && <IconAlertCircle className="size-4 text-orange-500" />}
        </div>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <IconMapPin className="size-4" />
          <span className="truncate">{event.location}</span>
        </div>
      </div>

      {/* Title and attendees */}
      <div className="flex flex-1 flex-col gap-2">
        <span className="font-medium">{event.title}</span>
        <NamedAvatarGroup names={event.attendees.map((a) => a.name)} size="sm" max={4} />
      </div>

      {/* Requested time badge */}
      {isPending && event.requestedTime && (
        <div className="rounded-md bg-orange-100 px-2 py-1 text-xs font-medium text-orange-600">
          {event.requestedTime} requested
        </div>
      )}

      {/* Edit dropdown */}
      <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
        <DropdownMenuTrigger asChild>
          <Button variant={isOpen ? "default" : "outline"} className="gap-1">
            Edit
            {isOpen ? <IconChevronUp className="size-4" /> : <IconChevronDown className="size-4" />}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-48">
          <DropdownMenuItem>
            <IconClockHour4 className="mr-2 size-4" />
            Reschedule booking
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconSend className="mr-2 size-4" />
            Request reschedule
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconMapPin className="mr-2 size-4" />
            Edit location
          </DropdownMenuItem>
          <DropdownMenuItem>
            <IconUserPlus className="mr-2 size-4" />
            Invite people
          </DropdownMenuItem>
          <DropdownMenuItem className="text-destructive focus:text-destructive">
            <IconX className="mr-2 size-4" />
            Cancel event
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function EventList({ events, filter }: { events: CalendarEvent[]; filter: string }) {
  const filteredEvents = events.filter((event) => {
    switch (filter) {
      case "pending":
        return event.status === "pending"
      case "cancelled":
        return event.status === "cancelled"
      case "upcoming":
        return event.status === "confirmed"
      default:
        return true
    }
  })

  const groupedEvents = groupEventsByMonth(filteredEvents)

  if (filteredEvents.length === 0) {
    return (
      <div className="flex flex-1 items-center justify-center py-12">
        <p className="text-muted-foreground">No events found.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      {Array.from(groupedEvents.entries()).map(([month, monthEvents]) => (
        <div key={month} className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-foreground">{month}</h3>
          <div className="flex flex-col gap-3">
            {monthEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

const connectedCalendars = [
  {
    id: "1",
    name: "Emmanuel Okoro",
    email: "emmanuel@company.com",
    provider: "Google",
    color: "bg-blue-500",
    enabled: true,
  },
  {
    id: "2",
    name: "Sarah Chen",
    email: "sarah.chen@gmail.com",
    provider: "Google",
    color: "bg-green-500",
    enabled: true,
  },
  {
    id: "3",
    name: "Mike Johnson",
    email: "mike.j@outlook.com",
    provider: "Outlook",
    color: "bg-orange-500",
    enabled: false,
  },
  {
    id: "4",
    name: "Anna Garcia",
    email: "anna@company.com",
    provider: "Google",
    color: "bg-purple-500",
    enabled: true,
  },
]

function CalendarSidebar({
  selectedDate,
  onDateSelect,
  calendars,
  onCalendarToggle,
}: {
  selectedDate: Date | undefined
  onDateSelect: (date: Date | undefined) => void
  calendars: typeof connectedCalendars
  onCalendarToggle: (id: string) => void
}) {
  return (
    <div className="flex w-72 shrink-0 flex-col gap-6">
      {/* Mini Calendar */}
      <div className="flex items-center justify-center rounded-lg border bg-card p-3">
        <Calendar mode="single" selected={selectedDate} onSelect={onDateSelect} />
      </div>

      {/* Connected Calendars */}
      <div className="flex flex-col gap-3">
        <h3 className="text-sm font-semibold text-foreground">Connected Calendars</h3>
        <div className="flex flex-col gap-2">
          {calendars.map((calendar) => (
            <div key={calendar.id} className="flex items-center justify-between gap-3 rounded-lg border bg-card p-3">
              <div className="flex items-center gap-3">
                <NamedAvatar name={calendar.name} size="sm" />
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{calendar.name}</span>
                  <span className="text-xs text-muted-foreground">{calendar.provider}</span>
                </div>
              </div>
              <Switch checked={calendar.enabled} onCheckedChange={() => onCalendarToggle(calendar.id)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CalendarPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [calendars, setCalendars] = useState(connectedCalendars)

  const handleCalendarToggle = (id: string) => {
    setCalendars((prev) => prev.map((cal) => (cal.id === id ? { ...cal, enabled: !cal.enabled } : cal)))
  }

  return (
    <PageLayout
      title="Calendar"
      description="View and manage your schedule."
      icon={IconCalendar}
      actions={<Button>New Event</Button>}
    >
      <div className="flex gap-6 px-4 lg:px-6">
        {/* Left Sidebar */}
        <CalendarSidebar
          selectedDate={selectedDate}
          onDateSelect={setSelectedDate}
          calendars={calendars}
          onCalendarToggle={handleCalendarToggle}
        />

        {/* Main Content */}
        <div className="flex flex-1 flex-col gap-4">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
              <TabsTrigger value="pending">Pending</TabsTrigger>
              <TabsTrigger value="recurring">Recurring</TabsTrigger>
              <TabsTrigger value="past">Past</TabsTrigger>
              <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
            </TabsList>
            <TabsContent value="upcoming" className="mt-4">
              <EventList events={events} filter="upcoming" />
            </TabsContent>
            <TabsContent value="pending" className="mt-4">
              <EventList events={events} filter="pending" />
            </TabsContent>
            <TabsContent value="recurring" className="mt-4">
              <EventList events={events} filter="recurring" />
            </TabsContent>
            <TabsContent value="past" className="mt-4">
              <EventList events={events} filter="past" />
            </TabsContent>
            <TabsContent value="cancelled" className="mt-4">
              <EventList events={events} filter="cancelled" />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  )
}
