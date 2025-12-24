import { z } from "zod"

// API PrivateKey schema - matches the API response
export const privateKeySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  active: z.boolean(),
  lastUsedAt: z.string().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type PrivateKey = z.infer<typeof privateKeySchema>

// API PublicKey schema - matches the API response
export const publicKeySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string().nullable(),
  active: z.boolean(),
  allowedOrigins: z.array(z.string()).nullable(),
  allowedAgentIds: z.array(z.string()).nullable(),
  allowCustomAgent: z.boolean(),
  createdAt: z.string(),
  updatedAt: z.string(),
})

export type PublicKey = z.infer<typeof publicKeySchema>

// Combined key type for table display
export interface CombinedApiKey {
  id: string
  name: string
  description: string | null
  type: "private" | "public"
  active: boolean
  lastUsedAt: string | null
  createdAt: string
  // Public key specific fields
  allowedOrigins?: string[] | null
  allowedAgentIds?: string[] | null
  allowCustomAgent?: boolean
}

// Legacy ApiKey type for backwards compatibility
export const apiKeySchema = z.object({
  id: z.string(),
  name: z.string(),
  key: z.string(),
  type: z.enum(["public", "private"]),
  status: z.string(),
  permissions: z.array(z.string()),
  createdAt: z.string(),
  lastUsed: z.string().nullable(),
  expiresAt: z.string().nullable(),
})

export type ApiKey = z.infer<typeof apiKeySchema>
export type ApiKeyType = "public" | "private"
