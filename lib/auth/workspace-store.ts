/**
 * Workspace Store
 *
 * Simple store for the current workspace ID.
 * Used by apiClient to add x-workspace-id header without circular dependencies.
 */

class WorkspaceStore {
  private workspaceId: string | null = null;

  constructor() {
    // Initialize from localStorage on client-side
    if (typeof window !== "undefined") {
      this.workspaceId = localStorage.getItem("workspace-id");
    }
  }

  getWorkspaceId(): string | null {
    return this.workspaceId;
  }

  setWorkspaceId(id: string | null) {
    this.workspaceId = id;
    if (typeof window !== "undefined") {
      if (id) {
        localStorage.setItem("workspace-id", id);
      } else {
        localStorage.removeItem("workspace-id");
      }
    }
  }

  getWorkspaceHeader(): Record<string, string> {
    if (!this.workspaceId) return {};
    return { "x-workspace-id": this.workspaceId };
  }

  clear() {
    this.workspaceId = null;
    if (typeof window !== "undefined") {
      localStorage.removeItem("workspace-id");
    }
  }
}

export const workspaceStore = new WorkspaceStore();
