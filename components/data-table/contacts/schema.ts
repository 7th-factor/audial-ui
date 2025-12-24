import { z } from "zod"

// API Customer schema - matches the API response
export const customerSchema = z.object({
  id: z.string(),
  firstName: z.string().nullable(),
  lastName: z.string().nullable(),
  email: z.string().nullable(),
  phoneNumber: z.string().nullable(),
  customAttributes: z.record(z.unknown()),
  createdAt: z.string(),
  updatedAt: z.string(),
  conversationSummary: z.string().nullable(),
  ongoingIssues: z.array(z.string()),
})

export type Customer = z.infer<typeof customerSchema>

// Legacy Contact type for backwards compatibility
// Can be removed once all pages are migrated
export const contactSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  company: z.string(),
  role: z.string(),
  status: z.string(),
  tags: z.array(z.string()),
  lastContact: z.string(),
})

export type Contact = z.infer<typeof contactSchema>
