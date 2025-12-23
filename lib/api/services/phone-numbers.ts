/**
 * Phone Numbers Service
 *
 * API service functions for the Phone Numbers resource.
 */

import { apiClient } from "../client";
import type {
  PhoneNumber,
  CreatePhoneNumberInput,
  UpdatePhoneNumberInput,
} from "../types";

export const phoneNumbersService = {
  /**
   * Fetch all phone numbers
   */
  list: () => apiClient.get<PhoneNumber[]>("/api/v1/phone-numbers"),

  /**
   * Fetch a single phone number by ID
   */
  get: (id: string) => apiClient.get<PhoneNumber>(`/api/v1/phone-numbers/${id}`),

  /**
   * Create a new phone number (Twilio or Vonage)
   */
  create: (data: CreatePhoneNumberInput) =>
    apiClient.post<PhoneNumber>("/api/v1/phone-numbers", data),

  /**
   * Update an existing phone number
   */
  update: (id: string, data: UpdatePhoneNumberInput) =>
    apiClient.put<PhoneNumber>(`/api/v1/phone-numbers/${id}`, data),

  /**
   * Delete a phone number
   */
  delete: (id: string) => apiClient.delete(`/api/v1/phone-numbers/${id}`),
};
