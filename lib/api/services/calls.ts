/**
 * Calls Service
 *
 * API service functions for the Calls resource.
 */

import { apiClient } from "../client";
import type { Call, CallDetail, CreateCallInput } from "../types";

export const callsService = {
  /**
   * Fetch all calls
   */
  list: () => apiClient.get<Call[]>("/api/v1/call"),

  /**
   * Fetch a single call by ID (includes full details like messages)
   */
  get: (id: string) => apiClient.get<CallDetail>(`/api/v1/call/${id}`),

  /**
   * Create a new outbound call with agent settings
   */
  create: (data: CreateCallInput) =>
    apiClient.post<CallDetail>("/api/v1/call/create", data),

  /**
   * Create a new outbound call with agent ID
   */
  createByAgentId: (data: {
    customer: CreateCallInput["customer"];
    agentId: string;
    phoneNumber: CreateCallInput["phoneNumber"];
  }) => apiClient.post<CallDetail>("/api/v1/call/create", data),
};
