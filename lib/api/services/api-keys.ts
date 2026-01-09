/**
 * API Keys Service
 *
 * API service functions for the API Keys resource.
 * Note: These endpoints use /api/auth/ path instead of /api/v1/
 */

import { apiClient } from "../client";
import type {
  ListPrivateKeysResponse,
  ListPublicKeysResponse,
  CreateKeyInput,
  CreateKeyResponse,
  DeleteKeyInput,
  DeleteKeyResponse,
} from "../types";

export const apiKeysService = {
  /**
   * Fetch all private keys
   * Returns paginated response with data array and pagination metadata
   */
  listPrivateKeys: (page = 1, limit = 20) =>
    apiClient.get<ListPrivateKeysResponse>(
      `/api/auth/keys/private?page=${page}&limit=${limit}`
    ),

  /**
   * Fetch all public keys
   * Returns paginated response with data array and pagination metadata
   */
  listPublicKeys: (page = 1, limit = 20) =>
    apiClient.get<ListPublicKeysResponse>(
      `/api/auth/keys/public?page=${page}&limit=${limit}`
    ),

  /**
   * Create a new API key (private or public)
   */
  create: (data: CreateKeyInput) =>
    apiClient.post<CreateKeyResponse>("/api/auth/keys", data),

  /**
   * Delete an API key
   * Note: This endpoint only accepts JWT auth (not API key auth)
   */
  delete: (data: DeleteKeyInput) =>
    apiClient.deleteWithBody<DeleteKeyResponse>("/api/auth/delete-key", data),
};
