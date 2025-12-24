/**
 * Workspace Manager
 *
 * Manages the current workspace ID for API requests.
 * Fetches available workspaces and stores the selected one.
 */

import { tokenManager } from "./token-manager";
import { workspaceStore } from "./workspace-store";
import { workspacesService } from "@/lib/api/services/workspaces";
import type { Workspace, CreateWorkspaceInput } from "@/lib/api/types/workspace";

export type { Workspace };

class WorkspaceManager {
  private workspaces: Workspace[] = [];
  private listeners: ((workspaceId: string | null) => void)[] = [];
  private fetchPromise: Promise<Workspace[]> | null = null;

  /**
   * Initialize workspace from localStorage on startup
   * (Now handled by workspaceStore)
   */
  initialize() {
    // workspaceStore handles localStorage initialization
  }

  /**
   * Fetch available workspaces from the API
   */
  async fetchWorkspaces(): Promise<Workspace[]> {
    // Dedupe concurrent requests
    if (this.fetchPromise) {
      return this.fetchPromise;
    }

    const token = tokenManager.getToken();
    if (!token) {
      console.warn("[WorkspaceManager] No auth token available");
      return [];
    }

    this.fetchPromise = (async () => {
      try {
        console.log("[WorkspaceManager] Fetching workspaces...");
        const data = await workspacesService.list();

        // Handle both array response and { data: [...] } response
        this.workspaces = Array.isArray(data) ? data : (data as unknown as { data: Workspace[] }).data || [];

        console.log("[WorkspaceManager] Fetched workspaces:", this.workspaces.length);

        // Auto-select first workspace if none selected
        if (!workspaceStore.getWorkspaceId() && this.workspaces.length > 0) {
          this.setWorkspaceId(this.workspaces[0].id);
        }

        return this.workspaces;
      } catch (error) {
        console.error("[WorkspaceManager] Failed to fetch workspaces:", error);
        return [];
      } finally {
        this.fetchPromise = null;
      }
    })();

    return this.fetchPromise;
  }

  /**
   * Set the current workspace ID
   */
  setWorkspaceId(workspaceId: string | null) {
    workspaceStore.setWorkspaceId(workspaceId);

    // Notify listeners
    this.listeners.forEach((listener) => listener(workspaceId));
  }

  /**
   * Get the current workspace ID
   */
  getWorkspaceId(): string | null {
    return workspaceStore.getWorkspaceId();
  }

  /**
   * Get workspace header for API requests
   */
  getWorkspaceHeader(): Record<string, string> {
    return workspaceStore.getWorkspaceHeader();
  }

  /**
   * Get all fetched workspaces
   */
  getWorkspaces(): Workspace[] {
    return this.workspaces;
  }

  /**
   * Check if user needs onboarding (has no workspaces)
   */
  needsOnboarding(): boolean {
    return this.workspaces.length === 0;
  }

  /**
   * Create a new workspace
   */
  async createWorkspace(data: CreateWorkspaceInput): Promise<Workspace> {
    const token = tokenManager.getToken();
    if (!token) {
      throw new Error("No auth token available");
    }

    console.log("[WorkspaceManager] Creating workspace...", data);
    const result = await workspacesService.create(data);

    // Handle both direct response and { data: {...} } response
    const newWorkspace: Workspace = (result as unknown as { data: Workspace }).data ?? result;

    console.log("[WorkspaceManager] Workspace created:", newWorkspace.id);

    // Add to local list and select it
    this.workspaces.push(newWorkspace);
    this.setWorkspaceId(newWorkspace.id);

    return newWorkspace;
  }

  /**
   * Subscribe to workspace changes
   */
  subscribe(listener: (workspaceId: string | null) => void): () => void {
    this.listeners.push(listener);
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Clear workspace (on logout)
   */
  clear() {
    workspaceStore.clear();
    this.workspaces = [];
    this.listeners.forEach((listener) => listener(null));
  }
}

// Export singleton instance
export const workspaceManager = new WorkspaceManager();
