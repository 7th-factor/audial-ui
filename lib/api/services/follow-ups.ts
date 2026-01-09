/**
 * Follow-Ups Service
 *
 * API service functions for the Follow-Ups and Follow-Up Rules resources.
 */

import { apiClient } from "../client";
import type {
  FollowUp,
  FollowUpRule,
  CreateFollowUpInput,
  UpdateFollowUpInput,
  CreateFollowUpRuleInput,
  UpdateFollowUpRuleInput,
  ListFollowUpsResponse,
  ListFollowUpRulesResponse,
  ListFollowUpsParams,
  ListFollowUpRulesParams,
  DeleteFollowUpResponse,
} from "../types";

const buildQueryString = (
  params: Record<string, string | number | boolean | undefined | null>
): string => {
  const searchParams = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      searchParams.set(key, String(value));
    }
  });
  const query = searchParams.toString();
  return query ? `?${query}` : "";
};

export const followUpsService = {
  // ===== Follow-Up Rules =====

  /**
   * Fetch all follow-up rules with optional filters
   */
  listRules: (params?: ListFollowUpRulesParams) =>
    apiClient.get<ListFollowUpRulesResponse>(
      `/api/v1/follow-up/rules${buildQueryString((params || {}) as Record<string, string | number | boolean | undefined | null>)}`
    ),

  /**
   * Fetch a single follow-up rule by ID
   */
  getRule: (ruleId: string) =>
    apiClient.get<FollowUpRule>(`/api/v1/follow-up/rules/${ruleId}`),

  /**
   * Create a new follow-up rule
   */
  createRule: (data: CreateFollowUpRuleInput) =>
    apiClient.post<FollowUpRule>("/api/v1/follow-up/rules", data),

  /**
   * Update an existing follow-up rule
   */
  updateRule: (ruleId: string, data: UpdateFollowUpRuleInput) =>
    apiClient.patch<FollowUpRule>(`/api/v1/follow-up/rules/${ruleId}`, data),

  /**
   * Delete a follow-up rule
   */
  deleteRule: (ruleId: string) =>
    apiClient.delete<DeleteFollowUpResponse>(`/api/v1/follow-up/rules/${ruleId}`),

  // ===== Follow-Ups =====

  /**
   * Fetch all follow-ups with optional filters
   */
  list: (params?: ListFollowUpsParams) =>
    apiClient.get<ListFollowUpsResponse>(
      `/api/v1/follow-up${buildQueryString((params || {}) as Record<string, string | number | boolean | undefined | null>)}`
    ),

  /**
   * Fetch a single follow-up by ID
   */
  get: (id: string) => apiClient.get<FollowUp>(`/api/v1/follow-up/${id}`),

  /**
   * Create a new follow-up
   */
  create: (data: CreateFollowUpInput) =>
    apiClient.post<FollowUp>("/api/v1/follow-up", data),

  /**
   * Update an existing follow-up
   */
  update: (id: string, data: UpdateFollowUpInput) =>
    apiClient.patch<FollowUp>(`/api/v1/follow-up/${id}`, data),

  /**
   * Delete a follow-up
   */
  delete: (id: string) =>
    apiClient.delete<DeleteFollowUpResponse>(`/api/v1/follow-up/${id}`),
};
