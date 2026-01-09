"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { followUpsService } from "@/lib/api/services/follow-ups";
import { followUpsQueryKeys } from "../query-keys";
import type {
  CreateFollowUpInput,
  UpdateFollowUpInput,
  CreateFollowUpRuleInput,
  UpdateFollowUpRuleInput,
} from "../types";

// ===== Follow-Up Mutations =====

/**
 * Hook to create a new follow-up
 */
export function useCreateFollowUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFollowUpInput) => followUpsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: followUpsQueryKeys.base });
      toast.success("Follow-up created");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create follow-up"
      );
    },
  });
}

/**
 * Hook to update an existing follow-up
 */
export function useUpdateFollowUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateFollowUpInput }) =>
      followUpsService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: followUpsQueryKeys.base });
      queryClient.invalidateQueries({
        queryKey: followUpsQueryKeys.detail(id),
      });
      toast.success("Follow-up updated");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update follow-up"
      );
    },
  });
}

/**
 * Hook to delete a follow-up
 */
export function useDeleteFollowUp() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => followUpsService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: followUpsQueryKeys.base });
      toast.success("Follow-up deleted");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete follow-up"
      );
    },
  });
}

// ===== Follow-Up Rule Mutations =====

/**
 * Hook to create a new follow-up rule
 */
export function useCreateFollowUpRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateFollowUpRuleInput) =>
      followUpsService.createRule(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: followUpsQueryKeys.rules.base,
      });
      toast.success("Rule created");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to create rule"
      );
    },
  });
}

/**
 * Hook to update an existing follow-up rule
 */
export function useUpdateFollowUpRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateFollowUpRuleInput;
    }) => followUpsService.updateRule(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({
        queryKey: followUpsQueryKeys.rules.base,
      });
      queryClient.invalidateQueries({
        queryKey: followUpsQueryKeys.rules.detail(id),
      });
      toast.success("Rule updated");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to update rule"
      );
    },
  });
}

/**
 * Hook to delete a follow-up rule
 */
export function useDeleteFollowUpRule() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => followUpsService.deleteRule(id),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: followUpsQueryKeys.rules.base,
      });
      toast.success("Rule deleted");
    },
    onError: (error) => {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete rule"
      );
    },
  });
}
