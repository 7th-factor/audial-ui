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

export interface CreateWorkspaceInput {
  name: string;
  description?: string;
}
