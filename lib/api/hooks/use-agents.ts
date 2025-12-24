"use client";

/**
 * Agents Hooks
 *
 * TanStack Query hooks for the Agents resource.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { agentsService } from "../services/agents";
import type { CreateAgentInput, UpdateAgentInput } from "../types";

const AGENTS_KEY = ["agents"] as const;

/**
 * Fetch all agents
 */
export function useAgents() {
  return useQuery({
    queryKey: AGENTS_KEY,
    queryFn: agentsService.list,
  });
}

/**
 * Fetch a single agent by ID
 */
export function useAgent(id: string | undefined) {
  return useQuery({
    queryKey: [...AGENTS_KEY, id],
    queryFn: () => agentsService.get(id!),
    enabled: !!id,
  });
}

/**
 * Create a new agent
 */
export function useCreateAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAgentInput) => agentsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: AGENTS_KEY });
    },
  });
}

/**
 * Update an existing agent
 */
export function useUpdateAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAgentInput }) =>
      agentsService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: AGENTS_KEY });
      queryClient.invalidateQueries({ queryKey: [...AGENTS_KEY, id] });
    },
  });
}
