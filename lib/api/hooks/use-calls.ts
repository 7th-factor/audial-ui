"use client";

/**
 * Calls Hooks
 *
 * TanStack Query hooks for the Calls resource.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { callsService } from "../services/calls";
import type { CreateCallInput } from "../types";

const CALLS_KEY = ["calls"] as const;

/**
 * Fetch all calls
 */
export function useCalls() {
  return useQuery({
    queryKey: CALLS_KEY,
    queryFn: callsService.list,
  });
}

/**
 * Fetch a single call by ID (includes full details like messages)
 */
export function useCall(id: string | undefined) {
  return useQuery({
    queryKey: [...CALLS_KEY, id],
    queryFn: () => callsService.get(id!),
    enabled: !!id,
  });
}

/**
 * Create a new outbound call
 */
export function useCreateCall() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCallInput) => callsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CALLS_KEY });
    },
  });
}

/**
 * Create a new outbound call using an existing agent ID
 */
export function useCreateCallByAgentId() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      customer: CreateCallInput["customer"];
      agentId: string;
      phoneNumber: CreateCallInput["phoneNumber"];
    }) => callsService.createByAgentId(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CALLS_KEY });
    },
  });
}
