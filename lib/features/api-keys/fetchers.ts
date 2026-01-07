import { apiClient } from '@/lib/api/client'
import {
  CreateApiKeyRequest,
  CreateApiKeyResponse,
  DeleteApiKeyRequest,
  DeleteApiKeyResponse,
  KeyType,
  PrivateApiKey,
  PublicApiKey,
} from './types'

const PREFIX = '/api/auth'

/**
 * List private API keys
 */
export async function listPrivateApiKeys(): Promise<PrivateApiKey[]> {
  const res = await apiClient.get<Omit<PrivateApiKey, 'type'>[]>(
    `${PREFIX}/list-private-keys`
  )
  return res.map((key) => ({
    ...key,
    type: KeyType.PRIVATE as const,
  }))
}

/**
 * List public API keys
 */
export async function listPublicApiKeys(): Promise<PublicApiKey[]> {
  const res = await apiClient.get<Omit<PublicApiKey, 'type'>[]>(
    `${PREFIX}/list-public-keys`
  )
  return res.map((key) => ({
    ...key,
    type: KeyType.PUBLIC as const,
  }))
}

/**
 * Get default public API key (used for widget embed code)
 */
export async function getDefaultPublicApiKey(): Promise<PublicApiKey> {
  const res = await apiClient.get<Omit<PublicApiKey, 'type'>>(
    `${PREFIX}/get-default-public-key`
  )
  return {
    ...res,
    type: KeyType.PUBLIC as const,
  }
}

/**
 * Create a new API key
 */
export async function createApiKey(
  data: CreateApiKeyRequest
): Promise<CreateApiKeyResponse> {
  return apiClient.post<CreateApiKeyResponse>(`${PREFIX}/create-key`, data)
}

/**
 * Delete an API key
 */
export async function deleteApiKey(
  data: DeleteApiKeyRequest
): Promise<DeleteApiKeyResponse> {
  return apiClient.deleteWithBody<DeleteApiKeyResponse>(`${PREFIX}/delete-key`, data)
}
