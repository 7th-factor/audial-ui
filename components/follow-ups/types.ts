import { z } from "zod"

// Re-export API types for convenience
export type {
  FollowUp as FollowUpApi,
  FollowUpRule as FollowUpRuleApi,
  DueTime,
} from "@/lib/api/types/follow-up"

// Follow-up status types matching the design
// Note: API only has "open" and "done". "overdue" is computed client-side
export const followUpStatuses = [
  { value: "open", label: "Open", color: "bg-gray-100 text-gray-700" },
  { value: "done", label: "Done", color: "bg-green-100 text-green-700" },
  { value: "overdue", label: "Overdue", color: "bg-red-100 text-red-700" },
] as const

// Follow-up action types (must match API enum)
export const followUpActions = [
  { value: "call_back", label: "Call Back" },
  { value: "send_sms", label: "Send Follow up SMS" },
  { value: "reschedule_appointment", label: "Reschedule Appointment" },
  { value: "new_lead", label: "New Lead" },
] as const

// Priority types
export const followUpPriorities = [
  { value: "low", label: "Low" },
  { value: "medium", label: "Medium" },
  { value: "high", label: "High" },
] as const

// Due time mode types (for form UI)
export type DueTimeMode = "relative" | "absolute"

// DueTime schema matching API structure
export const dueTimeSchema = z.object({
  business: z.boolean(),
  hours: z.number().min(0),
  days: z.number().min(0),
})

// Follow-up schema matching API response (for table display)
export const followUpSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  customerId: z.string(),
  interactionId: z.string().nullable(),
  status: z.enum(["open", "done"]),
  action: z.string(),
  priority: z.enum(["low", "medium", "high"]),
  trigger: z.string().nullable(),
  note: z.string(),
  tags: z.array(z.string()),
  dueAt: z.string(),
  creationMethod: z.enum(["manual", "auto"]),
  ruleId: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type FollowUp = z.infer<typeof followUpSchema>

// UI model with computed overdue status
export interface FollowUpUIModel extends Omit<FollowUp, "status"> {
  status: "open" | "done" | "overdue"
  customerName?: string
}

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

// Create follow-up input schema (for form validation)
export const createFollowUpSchema = z.object({
  action: z.string().min(1, "Action is required"),
  note: z.string().optional(),
  customerId: z.string().min(1, "Customer is required"),
  priority: z.enum(["low", "medium", "high"]),
  tags: z.array(z.string()).optional(),
  // Due time can be either relative (dueTime object) or absolute (dueAt string)
  dueTimeMode: z.enum(["relative", "absolute"]),
  // Relative due time fields
  dueTimeBusiness: z.boolean().optional(),
  dueTimeHours: z.coerce.number().min(0).optional(),
  dueTimeDays: z.coerce.number().min(0).optional(),
  // Absolute due time field
  dueAt: z.string().optional(),
}).refine((data) => {
  if (data.dueTimeMode === "relative") {
    return (data.dueTimeHours ?? 0) > 0 || (data.dueTimeDays ?? 0) > 0
  }
  return !!data.dueAt
}, {
  message: "Due time is required",
  path: ["dueTimeHours"],
})

export type CreateFollowUpFormInput = z.infer<typeof createFollowUpSchema>

// Follow-up rule schema matching API response
export const followUpRuleSchema = z.object({
  id: z.string(),
  workspaceId: z.string(),
  active: z.boolean(),
  priority: z.enum(["low", "medium", "high"]),
  condition: z.string(),
  action: z.string(),
  dueTime: dueTimeSchema,
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type FollowUpRule = z.infer<typeof followUpRuleSchema>

// Create rule input schema (for form validation)
export const createFollowUpRuleSchema = z.object({
  condition: z.string().min(1, "Condition is required"),
  action: z.string().min(1, "Action is required"),
  priority: z.enum(["low", "medium", "high"]),
  active: z.boolean().default(true),
  dueTimeBusiness: z.boolean().default(true),
  dueTimeHours: z.coerce.number().min(0).default(0),
  dueTimeDays: z.coerce.number().min(0).default(0),
}).refine((data) => data.dueTimeHours > 0 || data.dueTimeDays > 0, {
  message: "Due time is required (hours or days must be greater than 0)",
  path: ["dueTimeHours"],
})

export type CreateFollowUpRuleFormInput = z.infer<typeof createFollowUpRuleSchema>

// Helper functions

/**
 * Compute if a follow-up is overdue based on dueAt and current time
 */
export function isOverdue(dueAt: string, status: "open" | "done"): boolean {
  if (status === "done") return false
  return new Date(dueAt) < new Date()
}

/**
 * Get display status (with computed overdue)
 */
export function getDisplayStatus(
  status: "open" | "done",
  dueAt: string
): "open" | "done" | "overdue" {
  if (isOverdue(dueAt, status)) return "overdue"
  return status
}

/**
 * Format due time object for display
 */
export function formatDueTime(dueTime: { business: boolean; hours: number; days: number }): string {
  const parts: string[] = []
  if (dueTime.days > 0) {
    parts.push(`${dueTime.days} ${dueTime.days === 1 ? "day" : "days"}`)
  }
  if (dueTime.hours > 0) {
    parts.push(`${dueTime.hours} ${dueTime.hours === 1 ? "hour" : "hours"}`)
  }
  const time = parts.join(" ")
  return dueTime.business ? `${time} (business hours)` : time
}

/**
 * Format due time object for display (without business hours text)
 */
export function formatDueTimeOnly(dueTime: { hours: number; days: number }): string {
  const parts: string[] = []
  if (dueTime.days > 0) {
    parts.push(`${dueTime.days} ${dueTime.days === 1 ? "day" : "days"}`)
  }
  if (dueTime.hours > 0) {
    parts.push(`${dueTime.hours} ${dueTime.hours === 1 ? "hour" : "hours"}`)
  }
  return parts.join(" ") || "0 hours"
}
