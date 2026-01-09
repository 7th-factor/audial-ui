/**
 * Workspace Types
 *
 * Types for the Audial workspace management.
 */

export interface Workspace {
  id: string;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
}

export interface WorkspacePagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface ListWorkspacesResponse {
  data: Workspace[];
  pagination: WorkspacePagination;
}

export interface CreateWorkspaceInput {
  name: string;
  description?: string;
}
