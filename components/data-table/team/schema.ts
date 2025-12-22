import { z } from "zod"

export const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(["owner", "admin", "member", "viewer"]),
  status: z.enum(["active", "pending", "inactive"]),
  joinedAt: z.string().nullable(),
})

export type TeamMember = z.infer<typeof teamMemberSchema>
