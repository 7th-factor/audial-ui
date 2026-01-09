/**
 * API Key Types
 *
 * Types for the Audial Voice API Keys resource.
 */

export interface PrivateKey {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  lastUsedAt: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PublicKey {
  id: string;
  name: string;
  description: string | null;
  active: boolean;
  allowedOrigins: string[] | null;
  allowedAgentIds: string[] | null;
  allowCustomAgent: boolean;
  createdAt: string;
  updatedAt: string;
}

export type KeyType = "private" | "public";

// Pagination types for API key lists
export interface ApiKeyPagination {
  page: number;
  limit: number;
  total: number;
  total_pages: number;
  has_next: boolean;
  has_previous: boolean;
}

export interface ListPrivateKeysResponse {
  data: PrivateKey[];
  pagination: ApiKeyPagination;
}

export interface ListPublicKeysResponse {
  data: PublicKey[];
  pagination: ApiKeyPagination;
}

export interface CreatePrivateKeyInput {
  type: "private";
  name: string;
  description?: string;
}

export interface CreatePublicKeyInput {
  type: "public";
  name: string;
  description?: string;
  allowedOrigins?: string[];
  allowedAgentIds?: string[];
  allowCustomAgent?: boolean;
}

export type CreateKeyInput = CreatePrivateKeyInput | CreatePublicKeyInput;

export interface CreateKeyResponse {
  key: string;
}

export interface DeleteKeyInput {
  type: KeyType;
  keyId: string;
}

export interface DeleteKeyResponse {
  message: string;
}
