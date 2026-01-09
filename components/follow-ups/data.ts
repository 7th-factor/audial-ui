import type { FollowUp, FollowUpRule, FollowUpAction } from "./types"

// Mock contacts for dropdown
export const mockContacts = [
  { id: "1", name: "Mark Daniels" },
  { id: "2", name: "Jane Doe" },
  { id: "3", name: "Kelly Vance" },
  { id: "4", name: "John Cenat" },
  { id: "5", name: "Jenny Smith" },
]

// Mock follow-ups matching the design
export const mockFollowUps: FollowUp[] = [
  {
    id: "1",
    contactId: "1",
    contactName: "Mark Daniels",
    trigger: "Missed Call",
    action: "Call Back",
    createdAt: "Jul 7, 2025 - 13:45",
    status: "open",
    priority: "medium",
  },
  {
    id: "2",
    contactId: "2",
    contactName: "Jane Doe",
    trigger: "Appointment request",
    action: "Send Follow up SMS",
    createdAt: "Jul 7, 2025 - 13:45",
    status: "closed",
    priority: "high",
  },
  {
    id: "3",
    contactId: "3",
    contactName: "Kelly Vance",
    trigger: "Missed Call",
    action: "Call Back",
    createdAt: "Jul 7, 2025 - 13:45",
    status: "closed",
    priority: "medium",
  },
  {
    id: "4",
    contactId: "4",
    contactName: "John Cenat",
    trigger: "Call dropped early",
    action: "Send Follow up SMS",
    createdAt: "Jul 7, 2025 - 13:45",
    status: "overdue",
    priority: "high",
  },
  {
    id: "5",
    contactId: "4",
    contactName: "John Cenat",
    trigger: "Call dropped early",
    action: "Send Follow up SMS",
    createdAt: "Jul 7, 2025 - 13:45",
    status: "open",
    priority: "low",
  },
  {
    id: "6",
    contactId: "4",
    contactName: "John Cenat",
    trigger: "Call dropped early",
    action: "Send Follow up SMS",
    createdAt: "Jul 7, 2025 - 13:45",
    status: "open",
    priority: "medium",
  },
  {
    id: "7",
    contactId: "4",
    contactName: "John Cenat",
    trigger: "Call dropped early",
    action: "Send Follow up SMS",
    createdAt: "Jul 7, 2025 - 13:45",
    status: "open",
    priority: "medium",
  },
]

// Mock follow-up actions for timeline view
export const mockFollowUpActions: Record<string, FollowUpAction[]> = {
  "1": [
    {
      id: "a1",
      type: "created",
      description: "AI created a ticket",
      timestamp: "Oct 14, 2025 at 8:31 pm",
    },
    {
      id: "a2",
      type: "status_changed",
      description: "Status changed to Open",
      timestamp: "Oct 14, 2025 at 8:51 pm",
    },
  ],
  "2": [
    {
      id: "a3",
      type: "created",
      description: "AI created a ticket",
      timestamp: "Oct 14, 2025 at 8:31 pm",
    },
    {
      id: "a4",
      type: "status_changed",
      description: "Status changed to Open",
      timestamp: "Oct 14, 2025 at 8:51 pm",
    },
    {
      id: "a5",
      type: "note_added",
      description: "Lorem ipsum dolor sit, amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      timestamp: "Oct 14, 2025 at 9:21 pm",
      user: {
        name: "Jenny",
      },
    },
    {
      id: "a6",
      type: "status_changed",
      description: "Status changed to Closed",
      timestamp: "Oct 14, 2025 at 9:21 pm",
    },
  ],
}

// Mock follow-up rules matching the design
export const mockFollowUpRules: FollowUpRule[] = [
  {
    id: "1",
    condition: "Requests to speak to human",
    action: "Send SMS",
    priority: "high",
    dueTime: 1,
    dueTimeUnit: "hours",
    enabled: true,
  },
  {
    id: "2",
    condition: "When caller wants a refund",
    action: "Call Back",
    priority: "high",
    dueTime: 2,
    dueTimeUnit: "hours",
    enabled: true,
  },
  {
    id: "3",
    condition: "Budget is above $10,000",
    action: "New Lead",
    priority: "medium",
    dueTime: 1,
    dueTimeUnit: "days",
    enabled: true,
  },
]
