/**
 * Calls Service
 *
 * API service functions for the Calls resource.
 */

import { apiClient } from "../client";
import type {
  CallDetail,
  CreateCallInput,
  WebSocketRoom,
  CreateWebSocketRoomInput,
  ListCallsResponse,
} from "../types";

export const callsService = {
  /**
   * Fetch all calls
   */
  list: () => apiClient.get<ListCallsResponse>("/api/v1/call"),

  /**
   * Fetch a single call by ID (includes full details like messages)
   */
  get: (id: string) => apiClient.get<CallDetail>(`/api/v1/call/${id}`),

  /**
   * Create a new outbound call with agent settings
   */
  create: (data: CreateCallInput) =>
    apiClient.post<CallDetail>("/api/v1/call", data),

  /**
   * Create a new outbound call with agent ID
   */
  createByAgentId: (data: {
    customer: CreateCallInput["customer"];
    agentId: string;
    phoneNumberId?: string;
    phoneNumber?: CreateCallInput["phoneNumber"];
  }) => apiClient.post<CallDetail>("/api/v1/call", data),

  /**
   * Get WebSocket room by ID
   * Requires a public API key
   */
  getWebSocketRoom: (roomId: string, publicKey: string) =>
    apiClient.get<WebSocketRoom>(
      `/api/v1/call/websocket/room/${roomId}?public_key=${publicKey}`
    ),

  /**
   * Create a WebSocket room
   * Requires a public API key
   */
  createWebSocketRoom: (data: CreateWebSocketRoomInput, publicKey: string) =>
    apiClient.post<WebSocketRoom>(
      `/api/v1/call/websocket/create?public_key=${publicKey}`,
      data
    ),
};
