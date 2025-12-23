/**
 * API Key types for managing public and private keys
 */

export enum KeyType {
  PUBLIC = 'public',
  PRIVATE = 'private',
}

interface BaseApiKey {
  id: string
  name: string
  description: string
  active: boolean
  updatedAt: string
  createdAt: string
}

export interface PrivateApiKey extends BaseApiKey {
  type: KeyType.PRIVATE
  workspace: string
  lastUsedAt: string | null
}

export interface PublicApiKey extends BaseApiKey {
  id: string // This is the secret key ONLY for public keys
  type: KeyType.PUBLIC
  lastUsedAt: string | null
  allowedOrigins: string[] | null
  allowCustomAgent: boolean | null
}

export type ApiKey = PublicApiKey | PrivateApiKey

export interface CreateApiKeyRequest {
  name: string
  description: string | null
  type: 'public' | 'private'
  // Public key fields
  allowedOrigins?: string[] | null
  allowedAgentIds?: string[] | null
  allowCustomAgent?: boolean | null
}

export interface CreateApiKeyResponse {
  key: string
}

export interface DeleteApiKeyRequest {
  type: KeyType
  keyId: string
}

export interface DeleteApiKeyResponse {
  message: string
}
