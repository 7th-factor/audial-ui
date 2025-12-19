import { z } from "zod"

export const messageSchema = z.object({
  id: z.string(),
  sender: z.string(),
  email: z.string(),
  subject: z.string(),
  preview: z.string(),
  status: z.string(),
  label: z.string(),
  date: z.string(),
})

export type Message = z.infer<typeof messageSchema>
