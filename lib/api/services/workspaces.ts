/**
 * Workspaces Service
 *
 * API service for workspace management.
 */

import { apiClient } from "../client";
import type {
  Workspace,
  CreateWorkspaceInput,
  ListWorkspacesResponse,
} from "../types/workspace";

export const workspacesService = {
  /**
   * List all workspaces for the current user
   * Returns paginated response with data array and pagination metadata
   */
  list: () => apiClient.get<ListWorkspacesResponse>("/api/auth/list-workspaces"),

  /**
   * Create a new workspace
   */
  create: (data: CreateWorkspaceInput) =>
    apiClient.post<Workspace>("/api/auth/create-workspace", data),
};
