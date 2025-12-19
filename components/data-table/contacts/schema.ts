import { z } from "zod"

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
