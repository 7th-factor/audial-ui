/**
 * Query key factory for Follow-Ups feature
 */
export const followUpsQueryKeys = {
  // Follow-ups
  base: ["follow-ups"] as const,
  list: (filters?: Record<string, unknown>) =>
    [...followUpsQueryKeys.base, "list", filters] as const,
  detail: (id: string) => [...followUpsQueryKeys.base, "detail", id] as const,

  // Follow-up rules
  rules: {
    base: ["follow-up-rules"] as const,
    list: (filters?: Record<string, unknown>) =>
      [...followUpsQueryKeys.rules.base, "list", filters] as const,
    detail: (id: string) =>
      [...followUpsQueryKeys.rules.base, "detail", id] as const,
  },
};
