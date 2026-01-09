/**
 * Follow-Ups Feature Types
 *
 * Re-exports API types and defines UI-specific types
 */

// Re-export API types
export type {
  FollowUp,
  FollowUpRule,
  DueTime,
  FollowUpStatus,
  FollowUpPriority,
  FollowUpCreationMethod,
  CreateFollowUpInput,
  UpdateFollowUpInput,
  CreateFollowUpRuleInput,
  UpdateFollowUpRuleInput,
  ListFollowUpsParams,
  ListFollowUpRulesParams,
  ListFollowUpsResponse,
  ListFollowUpRulesResponse,
  FollowUpPagination,
} from "@/lib/api/types/follow-up";

/**
 * UI model for follow-ups with computed fields
 * Used for display purposes with computed overdue status
 */
export interface FollowUpUIModel {
  id: string;
  customerId: string;
  customerName?: string;
  status: "open" | "done" | "overdue"; // overdue computed client-side
  action: string;
  priority: "low" | "medium" | "high";
  note: string;
  tags: string[];
  dueAt: string;
  createdAt: string;
  updatedAt: string;
  ruleId: string | null;
  creationMethod: "manual" | "auto";
}

/**
 * Compute if a follow-up is overdue based on dueAt and current time
 */
export function isOverdue(dueAt: string, status: "open" | "done"): boolean {
  if (status === "done") return false;
  return new Date(dueAt) < new Date();
}

/**
 * Convert API follow-up to UI model with computed status
 */
export function toUIModel(
  followUp: import("@/lib/api/types/follow-up").FollowUp,
  customerName?: string
): FollowUpUIModel {
  const computedStatus = isOverdue(followUp.dueAt, followUp.status)
    ? "overdue"
    : followUp.status;

  return {
    id: followUp.id,
    customerId: followUp.customerId,
    customerName,
    status: computedStatus,
    action: followUp.action,
    priority: followUp.priority,
    note: followUp.note,
    tags: followUp.tags,
    dueAt: followUp.dueAt,
    createdAt: followUp.createdAt,
    updatedAt: followUp.updatedAt,
    ruleId: followUp.ruleId,
    creationMethod: followUp.creationMethod,
  };
}
