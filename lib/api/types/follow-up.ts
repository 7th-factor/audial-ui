/**
 * Follow-Up Types
 *
 * Types for the Audial Voice Follow-Up resource.
 * Based on apiV5 specification.
 */

// Due time structure for rules and follow-ups
export interface DueTime {
  business: boolean;
  hours: number;
  days: number;
}

// Follow-Up Rule types
export interface FollowUpRule {
  id: string;
  workspaceId: string;
  active: boolean;
  priority: "low" | "medium" | "high";
  condition: string;
  action: string;
  dueTime: DueTime;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFollowUpRuleInput {
  active: boolean;
  priority: "low" | "medium" | "high";
  condition: string;
  action: string;
  dueTime: DueTime;
}

export interface UpdateFollowUpRuleInput {
  active?: boolean;
  priority?: "low" | "medium" | "high";
  condition?: string;
  action?: string;
  dueTime?: DueTime;
}

// Follow-Up types
export type FollowUpStatus = "open" | "done";
export type FollowUpPriority = "low" | "medium" | "high";
export type FollowUpCreationMethod = "manual" | "auto";

export interface FollowUp {
  id: string;
  workspaceId: string;
  customerId: string;
  interactionId: string | null;
  status: FollowUpStatus;
  action: string;
  priority: FollowUpPriority;
  trigger: string | null;
  note: string;
  tags: string[];
  dueAt: string;
  creationMethod: FollowUpCreationMethod;
  ruleId: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFollowUpInput {
  customerId: string;
  action: string;
  priority: FollowUpPriority;
  note?: string;
  tags?: string[];
  dueAt?: string;
  dueTime?: DueTime;
}

export interface UpdateFollowUpInput {
  status?: FollowUpStatus;
  action?: string;
  priority?: FollowUpPriority;
  note?: string;
  tags?: string[];
  dueAt?: string;
  dueTime?: DueTime;
}

// Pagination types
export interface FollowUpPagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

// List response types
export interface ListFollowUpRulesResponse {
  data: FollowUpRule[];
  pagination: FollowUpPagination;
}

export interface ListFollowUpsResponse {
  data: FollowUp[];
  pagination: FollowUpPagination;
}

// Delete response type
export interface DeleteFollowUpResponse {
  message: string;
}

// List params types
export interface ListFollowUpRulesParams {
  page?: number;
  limit?: number;
  active?: boolean;
}

export interface ListFollowUpsParams {
  page?: number;
  limit?: number;
  status?: FollowUpStatus;
  priority?: FollowUpPriority;
  customerId?: string;
}
