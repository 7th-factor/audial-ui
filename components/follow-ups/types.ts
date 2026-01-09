import { z } from "zod"

// Follow-up status types matching the design
export const followUpStatuses = [
  { value: "open", label: "Open", color: "bg-gray-100 text-gray-700" },
  { value: "done", label: "Done", color: "bg-green-100 text-green-700" },
  { value: "closed", label: "Closed", color: "bg-blue-100 text-blue-700" },
  { value: "overdue", label: "Overdue", color: "bg-red-100 text-red-700" },
] as const

// Follow-up trigger types
export const followUpTriggers = [
  { value: "missed_call", label: "Missed Call" },
  { value: "appointment_request", label: "Appointment request" },
  { value: "call_dropped_early", label: "Call dropped early" },
  { value: "refund_request", label: "Refund request" },
  { value: "human_request", label: "Requests to speak to human" },
  { value: "budget_above", label: "Budget is above threshold" },
] as const

// Follow-up action types
export const followUpActions = [
  { value: "call_back", label: "Call Back" },
  { value: "send_sms", label: "Send Follow up SMS" },
  { value: "send_email", label: "Send Email" },
  { value: "reschedule_appointment", label: "Reschedule Appointment" },
  { value: "new_lead", label: "New Lead" },
] as const

// Priority types
export const followUpPriorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] as const

// Due time units
export const dueTimeUnits = [
  { value: "hours", label: "Hours" },
  { value: "days", label: "Days" },
  { value: "weeks", label: "Weeks" },
] as const

// Follow-up schema
export const followUpSchema = z.object({
  id: z.string(),
  contactId: z.string(),
  contactName: z.string(),
  trigger: z.string(),
  action: z.string(),
  createdAt: z.string(),
  status: z.enum(["open", "done", "closed", "overdue"]),
  priority: z.enum(["low", "medium", "high"]),
  note: z.string().optional(),
  dueTime: z.number().optional(),
  dueTimeUnit: z.enum(["hours", "days", "weeks"]).optional(),
})

export type FollowUp = z.infer<typeof followUpSchema>

// Follow-up action log for timeline
export interface FollowUpAction {
  id: string
  type: "created" | "status_changed" | "note_added"
  description: string
  timestamp: string
  user?: {
    name: string
    avatar?: string
  }
}

// Create follow-up input
export const createFollowUpSchema = z.object({
  action: z.string().min(1, "Action is required"),
  note: z.string().optional(),
  contactId: z.string().min(1, "Contact is required"),
  priority: z.enum(["low", "medium", "high"]),
  status: z.enum(["open", "done", "closed", "overdue"]),
  dueTime: z.coerce.number().min(1, "Due time is required"),
  dueTimeUnit: z.enum(["hours", "days", "weeks"]),
})

export type CreateFollowUpInput = z.infer<typeof createFollowUpSchema>

// Follow-up rule schema
export const followUpRuleSchema = z.object({
  id: z.string(),
  condition: z.string(),
  action: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  dueTime: z.number(),
  dueTimeUnit: z.enum(["hours", "days", "weeks"]),
  enabled: z.boolean(),
})

export type FollowUpRule = z.infer<typeof followUpRuleSchema>

// Create rule input
export const createFollowUpRuleSchema = z.object({
  condition: z.string().min(1, "Condition is required"),
  action: z.string().min(1, "Action is required"),
  priority: z.enum(["low", "medium", "high"]),
  dueTime: z.coerce.number().min(1, "Due time is required"),
  dueTimeUnit: z.enum(["hours", "days", "weeks"]),
})

export type CreateFollowUpRuleInput = z.infer<typeof createFollowUpRuleSchema>
