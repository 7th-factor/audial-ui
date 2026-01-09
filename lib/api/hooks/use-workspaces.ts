"use client";

/**
 * Workspaces Hooks
 *
 * TanStack Query hooks for workspace management.
 * Uses centralized query keys from /lib/query/query-keys.ts
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workspacesService } from "../services/workspaces";
import { queryKeys } from "@/lib/query/query-keys";
import { useApiStatus } from "@/lib/hooks/use-api-status";
import type { Workspace, CreateWorkspaceInput } from "../types/workspace";

/**
 * Fetch all workspaces for the current user
 *
 * Only executes when API is ready (user authenticated, token exchanged).
 */
export function useWorkspaces() {
  const { isReady } = useApiStatus();

  return useQuery({
    queryKey: queryKeys.workspaces.list(),
    queryFn: workspacesService.list,
    enabled: isReady,
    staleTime: 60000, // 1 minute
  });
}

/**
 * Create a new workspace
 *
 * Invalidates the workspaces list on success.
 */
export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkspaceInput) => workspacesService.create(data),
    onSuccess: (newWorkspace: Workspace) => {
      // Invalidate lists to refresh
      queryClient.invalidateQueries({ queryKey: queryKeys.workspaces.lists() });

      // Set the new workspace in cache
      queryClient.setQueryData(
        queryKeys.workspaces.detail(newWorkspace.id),
        newWorkspace
      );
    },
  });
}
