/**
 * Credentials Service
 *
 * API service functions for the Credentials resource.
 * Note: These endpoints use /api/credentials/ path instead of /api/v1/
 */

import { apiClient } from "../client";
import type {
  Credential,
  CredentialType,
  CreateCredentialInput,
  UpdateCredentialInput,
  DeleteCredentialInput,
} from "../types";

export const credentialsService = {
  /**
   * Fetch all credentials
   */
  list: () => apiClient.get<Credential[]>("/api/credentials"),

  /**
   * Fetch a single credential by type and ID
   */
  get: (type: CredentialType, id: string) =>
    apiClient.get<Credential>(`/api/credentials/${type}/${id}`),

  /**
   * Create a new credential
   */
  create: (data: CreateCredentialInput) =>
    apiClient.post<Credential>("/api/credentials", data),

  /**
   * Update an existing credential
   */
  update: (data: UpdateCredentialInput) =>
    apiClient.put<Credential>("/api/credentials", data),

  /**
   * Delete a credential
   */
  delete: (data: DeleteCredentialInput) =>
    apiClient.deleteWithBody("/api/credentials", data),
};
