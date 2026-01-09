/**
 * WhatsApp Senders Service
 *
 * API service functions for the WhatsApp Senders resource.
 */

import { apiClient } from "../client";
import type {
  WhatsAppSender,
  CreateWhatsAppSenderInput,
  UpdateWhatsAppSenderInput,
} from "../types";

const BASE_PATH = "/api/v1/external/whatsapp/senders";

export const whatsappSendersService = {
  /**
   * Fetch all WhatsApp senders
   */
  list: () => apiClient.get<WhatsAppSender[]>(BASE_PATH),

  /**
   * Fetch a single WhatsApp sender by ID
   */
  get: (id: string) => apiClient.get<WhatsAppSender>(`${BASE_PATH}/${id}`),

  /**
   * Create a new WhatsApp sender
   */
  create: (data: CreateWhatsAppSenderInput) =>
    apiClient.post<WhatsAppSender>(BASE_PATH, data),

  /**
   * Update an existing WhatsApp sender
   */
  update: (id: string, data: UpdateWhatsAppSenderInput) =>
    apiClient.put<WhatsAppSender>(`${BASE_PATH}/${id}`, data),

  /**
   * Delete a WhatsApp sender
   */
  delete: (id: string) => apiClient.delete(`${BASE_PATH}/${id}`),
};
