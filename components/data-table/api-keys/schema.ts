import { z } from "zod"

export const apiKeySchema = z.object({
  id: z.string(),
  name: z.string(),
  key: z.string(),
  status: z.string(),
  permissions: z.array(z.string()),
  createdAt: z.string(),
  lastUsed: z.string().nullable(),
  expiresAt: z.string().nullable(),
})

export type ApiKey = z.infer<typeof apiKeySchema>
