"use client";

/**
 * Workspaces Hooks
 *
 * TanStack Query hooks for workspace management.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { workspacesService } from "../services/workspaces";
import type { CreateWorkspaceInput } from "../types/workspace";

const WORKSPACES_KEY = ["workspaces"] as const;

/**
 * Fetch all workspaces for the current user
 */
export function useWorkspaces() {
  return useQuery({
    queryKey: WORKSPACES_KEY,
    queryFn: workspacesService.list,
  });
}

/**
 * Create a new workspace
 */
export function useCreateWorkspace() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWorkspaceInput) => workspacesService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WORKSPACES_KEY });
    },
  });
}
