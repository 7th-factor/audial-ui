/**
 * Agents Service
 *
 * API service functions for the Agents resource.
 */

import { apiClient } from "../client";
import type {
  Agent,
  CreateAgentInput,
  UpdateAgentInput,
  ListAgentsResponse,
} from "../types";

export const agentsService = {
  /**
   * Fetch all agents
   */
  list: () => apiClient.get<ListAgentsResponse>("/api/v1/agents"),

  /**
   * Fetch a single agent by ID
   */
  get: (id: string) => apiClient.get<Agent>(`/api/v1/agents/${id}`),

  /**
   * Create a new agent
   */
  create: (data: CreateAgentInput) =>
    apiClient.post<Agent>("/api/v1/agents", data),

  /**
   * Update an existing agent
   */
  update: (id: string, data: UpdateAgentInput) =>
    apiClient.put<Agent>(`/api/v1/agents/${id}`, data),
};
