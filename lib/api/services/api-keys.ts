/**
 * API Keys Service
 *
 * API service functions for the API Keys resource.
 * Note: These endpoints use /api/auth/ path instead of /api/v1/
 */

import { apiClient } from "../client";
import type {
  PrivateKey,
  PublicKey,
  CreateKeyInput,
  CreateKeyResponse,
  DeleteKeyInput,
  DeleteKeyResponse,
} from "../types";

export const apiKeysService = {
  /**
   * Fetch all private keys
   */
  listPrivateKeys: () =>
    apiClient.get<PrivateKey[]>("/api/auth/list-private-keys"),

  /**
   * Fetch all public keys
   */
  listPublicKeys: () =>
    apiClient.get<PublicKey[]>("/api/auth/list-public-keys"),

  /**
   * Create a new API key (private or public)
   */
  create: (data: CreateKeyInput) =>
    apiClient.post<CreateKeyResponse>("/api/auth/create-key", data),

  /**
   * Delete an API key
   * Note: This endpoint only accepts JWT auth (not API key auth)
   */
  delete: (data: DeleteKeyInput) =>
    apiClient.deleteWithBody<DeleteKeyResponse>("/api/auth/delete-key", data),
};
