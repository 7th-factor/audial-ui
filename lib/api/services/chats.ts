/**
 * Chats Service
 *
 * API service functions for the Chats resource.
 */

import { apiClient } from "../client";
import type { Chat, CreateChatInput } from "../types";

export const chatsService = {
  /**
   * Fetch all chats
   */
  list: () => apiClient.get<Chat[]>("/api/v1/chat"),

  /**
   * Fetch a single chat by ID
   */
  get: (id: string) => apiClient.get<Chat>(`/api/v1/chat/${id}`),

  /**
   * Create a new chat (WhatsApp or REST API)
   */
  create: (data: CreateChatInput) =>
    apiClient.post<Chat>("/api/v1/chat/create", data),
};
