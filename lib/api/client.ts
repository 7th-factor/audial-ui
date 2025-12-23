/**
 * API Client
 *
 * Authenticated fetch wrapper for the Audial Voice API.
 * Uses TokenManager for automatic Bearer token injection.
 *
 * Features:
 * - Automatic auth header injection
 * - JSON serialization/deserialization
 * - Typed error handling
 * - Environment-aware base URL
 */

import { tokenManager } from "@/lib/auth/token-manager";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://audial-api-staging.fly.dev";

/**
 * API Error class for handling API-specific errors
 */
export class ApiError extends Error {
  constructor(
    public status: number,
    public statusText: string,
    message?: string,
  ) {
    super(message || `API Error: ${status} ${statusText}`);
    this.name = "ApiError";
  }
}

/**
 * Request options for API calls
 */
interface RequestOptions {
  headers?: Record<string, string>;
  signal?: AbortSignal;
}

/**
 * Make an authenticated API request
 */
async function request<T>(
  method: string,
  endpoint: string,
  body?: unknown,
  options: RequestOptions = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...tokenManager.getAuthHeader(),
    ...options.headers,
  };

  const config: RequestInit = {
    method,
    headers,
    signal: options.signal,
  };

  if (body !== undefined) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    let errorMessage: string | undefined;
    try {
      const errorData = await response.json();
      errorMessage = errorData.message || errorData.error;
    } catch {
      // Response body is not JSON
    }
    throw new ApiError(response.status, response.statusText, errorMessage);
  }

  // Handle empty responses (204 No Content)
  if (response.status === 204) {
    return undefined as T;
  }

  return response.json();
}

/**
 * API Client with typed HTTP methods
 */
export const apiClient = {
  /**
   * GET request
   * @example const agents = await apiClient.get<Agent[]>('/api/v1/agents');
   */
  get: <T>(endpoint: string, options?: RequestOptions): Promise<T> =>
    request<T>("GET", endpoint, undefined, options),

  /**
   * POST request
   * @example const agent = await apiClient.post<Agent>('/api/v1/agents', newAgent);
   */
  post: <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> => request<T>("POST", endpoint, body, options),

  /**
   * PUT request
   * @example const agent = await apiClient.put<Agent>('/api/v1/agents/123', updates);
   */
  put: <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> => request<T>("PUT", endpoint, body, options),

  /**
   * PATCH request
   * @example const agent = await apiClient.patch<Agent>('/api/v1/agents/123', partialUpdate);
   */
  patch: <T>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> => request<T>("PATCH", endpoint, body, options),

  /**
   * DELETE request
   * @example await apiClient.delete('/api/v1/agents/123');
   */
  delete: <T = void>(endpoint: string, options?: RequestOptions): Promise<T> =>
    request<T>("DELETE", endpoint, undefined, options),

  /**
   * DELETE request with body
   * @example await apiClient.deleteWithBody('/api/auth/delete-key', { type: 'private', keyId: '123' });
   */
  deleteWithBody: <T = void>(
    endpoint: string,
    body?: unknown,
    options?: RequestOptions,
  ): Promise<T> => request<T>("DELETE", endpoint, body, options),
};
