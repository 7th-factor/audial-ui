"use client";

/**
 * Agents Hooks
 *
 * TanStack Query hooks for the Agents resource.
 * Uses centralized query keys from /lib/query/query-keys.ts
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { agentsService } from "../services/agents";
import { queryKeys, type AgentFilters } from "@/lib/query/query-keys";
import { useApiStatus } from "@/lib/hooks/use-api-status";
import type { Agent, CreateAgentInput, UpdateAgentInput } from "../types";

/**
 * Fetch all agents
 *
 * Only executes when API is ready (user authenticated, token exchanged).
 */
export function useAgents(filters?: AgentFilters) {
  const { isReady } = useApiStatus();

  return useQuery({
    queryKey: queryKeys.agents.list(filters),
    queryFn: async () => {
      const response = await agentsService.list();
      return response.data;
    },
    enabled: isReady,
    staleTime: 60000, // 1 minute
  });
}

/**
 * Fetch a single agent by ID
 *
 * Only executes when API is ready and ID is provided.
 */
export function useAgent(id: string | undefined) {
  const { isReady } = useApiStatus();

  return useQuery({
    queryKey: queryKeys.agents.detail(id ?? ''),
    queryFn: () => agentsService.get(id!),
    enabled: isReady && !!id,
    staleTime: 60000, // 1 minute
  });
}

/**
 * Create a new agent
 *
 * Invalidates the agents list on success.
 */
export function useCreateAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAgentInput) => agentsService.create(data),
    onSuccess: (newAgent: Agent) => {
      // Invalidate lists to refresh
      queryClient.invalidateQueries({ queryKey: queryKeys.agents.lists() });

      // Optionally set the new agent in cache
      queryClient.setQueryData(
        queryKeys.agents.detail(newAgent.id),
        newAgent
      );
    },
  });
}

/**
 * Update an existing agent
 *
 * Invalidates both the list and the specific agent on success.
 */
export function useUpdateAgent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateAgentInput }) =>
      agentsService.update(id, data),
    onSuccess: (updatedAgent: Agent, { id }) => {
      // Invalidate lists to refresh
      queryClient.invalidateQueries({ queryKey: queryKeys.agents.lists() });

      // Update the specific agent in cache
      queryClient.setQueryData(
        queryKeys.agents.detail(id),
        updatedAgent
      );
    },
  });
}

/**
 * Delete an agent (placeholder - add when service supports it)
 *
 * Invalidates the agents list on success.
 */
// export function useDeleteAgent() {
//   const queryClient = useQueryClient();
//
//   return useMutation({
//     mutationFn: (id: string) => agentsService.delete(id),
//     onSuccess: (_, id) => {
//       queryClient.invalidateQueries({ queryKey: queryKeys.agents.lists() });
//       queryClient.removeQueries({ queryKey: queryKeys.agents.detail(id) });
//     },
//   });
// }
