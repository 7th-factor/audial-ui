import { tokenManager } from '@/lib/auth/token-manager'
import { ApiError, ApiErrorPayload } from '@/lib/api/errors'

/**
 * Represents a valid JSON value.
 */
type Json =
  | string
  | number
  | boolean
  | null
  | { [prop: string]: Json }
  | Json[]

/**
 * Makes an authenticated API request to the backend.
 *
 * Uses the tokenManager singleton for authentication.
 * Automatically handles error parsing and throws ApiError for non-OK responses.
 *
 * @template T - The expected response type (defaults to Json).
 * @param path - The API endpoint path (relative to the base URL).
 * @param init - Optional fetch initialization options.
 * @returns The parsed JSON response, or null for 204 No Content.
 * @throws {ApiError} - Throws an ApiError for non-OK responses.
 */
export async function apiFetch<T = Json>(
  path: string,
  init: RequestInit = {}
): Promise<T> {
  const token = tokenManager.getToken()

  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}${path}`, {
    ...init,
    headers: {
      'Content-Type': 'application/json',
      ...(init.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  })

  if (res.ok) {
    if (res.status === 204) {
      return null as T
    }

    try {
      const json = await res.json()
      return json as T
    } catch {
      console.error('[apiFetch] Response was successful but returned non-JSON')
      throw new Error('Request was successful but returned non-JSON')
    }
  }

  // Handle 401 - token may have expired
  if (res.status === 401) {
    console.warn('[apiFetch] Unauthorized - token may have expired')
    // Token manager handles refresh via its callback
    // For now, just throw the error - auth layer will handle redirect
  }

  let errorData: ApiErrorPayload = { message: res.statusText }
  try {
    const jsonError = await res.json()
    errorData = jsonError as ApiErrorPayload
  } catch {
    // Use default error message
  }

  throw new ApiError(res.status, errorData)
}

/**
 * Convenience methods for common HTTP methods
 */
export const api = {
  get: <T = Json>(path: string, init?: RequestInit) =>
    apiFetch<T>(path, { ...init, method: 'GET' }),

  post: <T = Json>(path: string, body?: unknown, init?: RequestInit) =>
    apiFetch<T>(path, {
      ...init,
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    }),

  put: <T = Json>(path: string, body?: unknown, init?: RequestInit) =>
    apiFetch<T>(path, {
      ...init,
      method: 'PUT',
      body: body ? JSON.stringify(body) : undefined,
    }),

  patch: <T = Json>(path: string, body?: unknown, init?: RequestInit) =>
    apiFetch<T>(path, {
      ...init,
      method: 'PATCH',
      body: body ? JSON.stringify(body) : undefined,
    }),

  delete: <T = Json>(path: string, init?: RequestInit) =>
    apiFetch<T>(path, { ...init, method: 'DELETE' }),
}
