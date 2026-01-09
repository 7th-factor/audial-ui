"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2, Calendar } from "lucide-react"
import { format } from "date-fns"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

import { useCustomers } from "@/lib/api/hooks/use-customers"
import { useCreateFollowUp } from "@/lib/features/follow-ups"
import type { CreateFollowUpInput } from "@/lib/api/types/follow-up"
import {
  createFollowUpSchema,
  type CreateFollowUpFormInput,
  followUpActions,
  followUpPriorities,
} from "./types"

interface NewFollowUpDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onSuccess?: () => void
}

export function NewFollowUpDialog({
  open,
  onOpenChange,
  onSuccess,
}: NewFollowUpDialogProps) {
  const { data: customerList = [], isLoading: customersLoading } = useCustomers()
  const createFollowUp = useCreateFollowUp()
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [selectedHour, setSelectedHour] = useState<string>("12")
  const [selectedMinute, setSelectedMinute] = useState<string>("00")
  const [selectedPeriod, setSelectedPeriod] = useState<string>("PM")

  // Convert 12-hour time to 24-hour and create ISO string
  const getDateTimeISO = (date: Date, hour: string, minute: string, period: string) => {
    let hour24 = parseInt(hour)
    if (period === "PM" && hour24 !== 12) hour24 += 12
    if (period === "AM" && hour24 === 12) hour24 = 0
    const dateWithTime = new Date(date)
    dateWithTime.setHours(hour24, parseInt(minute), 0, 0)
    return dateWithTime.toISOString()
  }

  // Hours for 12-hour format
  const hours = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"]
  const minutes = ["00", "15", "30", "45"]

  const form = useForm<CreateFollowUpFormInput>({
    resolver: zodResolver(createFollowUpSchema),
    defaultValues: {
      action: "",
      note: "",
      customerId: "",
      priority: "high",
      tags: [],
      dueTimeMode: "relative",
      dueTimeBusiness: true,
      dueTimeHours: 0,
      dueTimeDays: 1,
      dueAt: "",
    },
  })

  const dueTimeMode = form.watch("dueTimeMode")

  const handleSubmit = async (values: CreateFollowUpFormInput) => {
    // Transform form values to API input
    const apiInput: CreateFollowUpInput = {
      customerId: values.customerId,
      action: values.action,
      priority: values.priority,
      note: values.note,
      tags: values.tags,
    }

    // Set due time based on mode
    if (values.dueTimeMode === "relative") {
      apiInput.dueTime = {
        business: values.dueTimeBusiness ?? true,
        hours: values.dueTimeHours ?? 0,
        days: values.dueTimeDays ?? 0,
      }
    } else {
      apiInput.dueAt = values.dueAt
    }

    createFollowUp.mutate(apiInput, {
      onSuccess: () => {
        form.reset()
        setSelectedDate(undefined)
        setSelectedHour("12")
        setSelectedMinute("00")
        setSelectedPeriod("PM")
        onOpenChange(false)
        onSuccess?.()
      },
    })
  }

  const getCustomerDisplayName = (customer: { firstName: string | null; lastName: string | null; phoneNumber: string | null }) => {
    const name = [customer.firstName, customer.lastName].filter(Boolean).join(" ")
    return name || customer.phoneNumber || "Unknown"
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Create new Follow Up</DialogTitle>
        </DialogHeader>

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-4"
          >
            {/* Action */}
            <FormField
              control={form.control}
              name="action"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Action</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select an action" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {followUpActions.map((action) => (
                        <SelectItem key={action.value} value={action.value}>
                          {action.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Note */}
            <FormField
              control={form.control}
              name="note"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Note <span className="text-muted-foreground">(optional)</span>
                  </FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Note" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Select Customer */}
            <FormField
              control={form.control}
              name="customerId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Customer</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder={customersLoading ? "Loading..." : "Search..."} />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {customerList.map((customer) => (
                        <SelectItem key={customer.id} value={customer.id}>
                          {getCustomerDisplayName(customer)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Priority */}
            <FormField
              control={form.control}
              name="priority"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Priority</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {followUpPriorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Due Time Mode */}
            <FormField
              control={form.control}
              name="dueTimeMode"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Time Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="relative">Relative (in X hours/days)</SelectItem>
                      <SelectItem value="absolute">Absolute (specific date/time)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Relative Due Time */}
            {dueTimeMode === "relative" && (
              <div className="space-y-4">
                <div className="flex gap-4">
                  <FormField
                    control={form.control}
                    name="dueTimeDays"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Days</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="dueTimeHours"
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormLabel>Hours</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            min={0}
                            max={23}
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value) || 0)}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="dueTimeBusiness"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Business hours only</FormLabel>
                        <FormDescription>
                          Only count hours during business hours
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            )}

            {/* Absolute Due Time */}
            {dueTimeMode === "absolute" && (
              <FormField
                control={form.control}
                name="dueAt"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Due Date & Time</FormLabel>
                    <div className="flex gap-2">
                      <Popover>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant="outline"
                              className={cn(
                                "flex-1 pl-3 text-left font-normal",
                                !selectedDate && "text-muted-foreground"
                              )}
                            >
                              {selectedDate ? (
                                format(selectedDate, "PPP")
                              ) : (
                                <span>Pick a date</span>
                              )}
                              <Calendar className="ml-auto h-4 w-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <CalendarComponent
                            mode="single"
                            selected={selectedDate}
                            onSelect={(date) => {
                              setSelectedDate(date)
                              if (date) {
                                field.onChange(getDateTimeISO(date, selectedHour, selectedMinute, selectedPeriod))
                              }
                            }}
                            disabled={(date) => {
                              const today = new Date()
                              today.setHours(0, 0, 0, 0)
                              return date < today
                            }}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      <Select
                        value={selectedHour}
                        onValueChange={(value) => {
                          setSelectedHour(value)
                          if (selectedDate) {
                            field.onChange(getDateTimeISO(selectedDate, value, selectedMinute, selectedPeriod))
                          }
                        }}
                      >
                        <SelectTrigger className="w-[70px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {hours.map((h) => (
                            <SelectItem key={h} value={h}>{h}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <span className="flex items-center text-muted-foreground">:</span>
                      <Select
                        value={selectedMinute}
                        onValueChange={(value) => {
                          setSelectedMinute(value)
                          if (selectedDate) {
                            field.onChange(getDateTimeISO(selectedDate, selectedHour, value, selectedPeriod))
                          }
                        }}
                      >
                        <SelectTrigger className="w-[70px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {minutes.map((m) => (
                            <SelectItem key={m} value={m}>{m}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <Select
                        value={selectedPeriod}
                        onValueChange={(value) => {
                          setSelectedPeriod(value)
                          if (selectedDate) {
                            field.onChange(getDateTimeISO(selectedDate, selectedHour, selectedMinute, value))
                          }
                        }}
                      >
                        <SelectTrigger className="w-[70px]">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="AM">AM</SelectItem>
                          <SelectItem value="PM">PM</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />
            )}

            <div className="flex justify-between pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={createFollowUp.isPending}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={createFollowUp.isPending}>
                {createFollowUp.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Save
              </Button>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}
