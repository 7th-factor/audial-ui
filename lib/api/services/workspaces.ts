/**
 * Workspaces Service
 *
 * API service for workspace management.
 */

import { apiClient } from "../client";
import type { Workspace, CreateWorkspaceInput } from "../types/workspace";

export const workspacesService = {
  /**
   * List all workspaces for the current user
   */
  list: () => apiClient.get<Workspace[]>("/api/auth/list-workspaces"),

  /**
   * Create a new workspace
   */
  create: (data: CreateWorkspaceInput) =>
    apiClient.post<Workspace>("/api/auth/create-workspace", data),
};
