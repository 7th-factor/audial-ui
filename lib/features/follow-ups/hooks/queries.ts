"use client";

import { useQuery } from "@tanstack/react-query";
import { followUpsService } from "@/lib/api/services/follow-ups";
import { followUpsQueryKeys } from "../query-keys";
import type { ListFollowUpsParams, ListFollowUpRulesParams } from "../types";

/**
 * Hook to fetch follow-ups list with optional filters
 */
export function useFollowUps(params?: ListFollowUpsParams) {
  return useQuery({
    queryKey: followUpsQueryKeys.list(params as Record<string, unknown>),
    queryFn: () => followUpsService.list(params),
  });
}

/**
 * Hook to fetch a single follow-up by ID
 */
export function useFollowUp(id: string | undefined) {
  return useQuery({
    queryKey: followUpsQueryKeys.detail(id!),
    queryFn: () => followUpsService.get(id!),
    enabled: !!id,
  });
}

/**
 * Hook to fetch follow-up rules with optional filters
 */
export function useFollowUpRules(params?: ListFollowUpRulesParams) {
  return useQuery({
    queryKey: followUpsQueryKeys.rules.list(params as Record<string, unknown>),
    queryFn: () => followUpsService.listRules(params),
  });
}

/**
 * Hook to fetch a single follow-up rule by ID
 */
export function useFollowUpRule(ruleId: string | undefined) {
  return useQuery({
    queryKey: followUpsQueryKeys.rules.detail(ruleId!),
    queryFn: () => followUpsService.getRule(ruleId!),
    enabled: !!ruleId,
  });
}
