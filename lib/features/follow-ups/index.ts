/**
 * Follow-Ups Feature Module
 *
 * Exports all types, query keys, and hooks for the follow-ups feature
 */

// Types
export * from "./types";

// Query keys
export { followUpsQueryKeys } from "./query-keys";

// Query hooks
export {
  useFollowUps,
  useFollowUp,
  useFollowUpRules,
  useFollowUpRule,
} from "./hooks/queries";

// Mutation hooks
export {
  useCreateFollowUp,
  useUpdateFollowUp,
  useDeleteFollowUp,
  useCreateFollowUpRule,
  useUpdateFollowUpRule,
  useDeleteFollowUpRule,
} from "./hooks/mutations";
