export interface ApiErrorPayload {
  message: string
  detail?: string
  code?: string
  details?: unknown
}

export class ApiError extends Error {
  status: number
  code?: string
  details?: unknown

  constructor(status: number, payload: ApiErrorPayload) {
    super(payload.message || payload.detail || 'Unknown error')
    this.name = 'ApiError'
    this.status = status
    this.code = payload.code
    this.details = payload.details
  }

  /**
   * Check if error is a specific status code
   */
  is(status: number): boolean {
    return this.status === status
  }

  /**
   * Check if error is unauthorized (401)
   */
  isUnauthorized(): boolean {
    return this.status === 401
  }

  /**
   * Check if error is forbidden (403)
   */
  isForbidden(): boolean {
    return this.status === 403
  }

  /**
   * Check if error is not found (404)
   */
  isNotFound(): boolean {
    return this.status === 404
  }
}
