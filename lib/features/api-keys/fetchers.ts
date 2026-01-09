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

// Paginated response type from API
interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    total_pages: number
    has_next: boolean
    has_previous: boolean
  }
}

/**
 * List private API keys
 */
export async function listPrivateApiKeys(): Promise<PrivateApiKey[]> {
  const res = await apiClient.get<PaginatedResponse<Omit<PrivateApiKey, 'type'>>>(
    `${PREFIX}/keys/private?page=1&limit=100`
  )
  return res.data.map((key) => ({
    ...key,
    type: KeyType.PRIVATE as const,
  }))
}

/**
 * List public API keys
 */
export async function listPublicApiKeys(): Promise<PublicApiKey[]> {
  const res = await apiClient.get<PaginatedResponse<Omit<PublicApiKey, 'type'>>>(
    `${PREFIX}/keys/public?page=1&limit=100`
  )
  return res.data.map((key) => ({
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
  return apiClient.post<CreateApiKeyResponse>(`${PREFIX}/keys`, data)
}

/**
 * Delete an API key
 */
export async function deleteApiKey(
  data: DeleteApiKeyRequest
): Promise<DeleteApiKeyResponse> {
  return apiClient.deleteWithBody<DeleteApiKeyResponse>(`${PREFIX}/delete-key`, data)
}
