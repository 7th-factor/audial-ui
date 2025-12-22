/**
 * Enhanced Token Manager with Smart Refresh
 *
 * Centralized token management with automatic refresh scheduling.
 *
 * Features:
 * - JWT parsing and expiration detection
 * - Automatic token refresh (10 minutes before expiry)
 * - Cookie-based persistence
 * - Event subscription system
 * - SSR-safe implementation
 *
 * Smart Refresh Strategy:
 * 1. Parse JWT to extract expiration time
 * 2. Schedule refresh 10 minutes before expiry
 * 3. Automatically call refresh endpoint
 * 4. Update token and reschedule
 * 5. Clear on auth failure
 */

interface JWTPayload {
  sub: string; // userId
  workspaceId?: string;
  email?: string;
  iat: number; // issued at (seconds)
  exp: number; // expiration (seconds)
}

type RefreshCallback = () => Promise<string | null>;

class TokenManager {
  private jwtToken: string | null = null;
  private listeners: ((token: string | null) => void)[] = [];
  private refreshTimeout: NodeJS.Timeout | null = null;
  private refreshCallback: RefreshCallback | null = null;
  private isRefreshing = false;

  /**
   * Initialize token from cookie on startup
   */
  initialize() {
    if (typeof window !== "undefined") {
      const token = this.getTokenFromCookie();
      if (token) {
        this.jwtToken = token;
        this.scheduleRefresh(token);
      }
    }
  }

  /**
   * Set JWT token and notify all listeners
   *
   * Also schedules automatic refresh if token is valid.
   */
  setToken(token: string | null) {
    this.jwtToken = token;

    // Update cookie
    if (typeof window !== "undefined") {
      if (token) {
        document.cookie = `auth-token=${token}; path=/; max-age=604800; SameSite=Lax`;
      } else {
        document.cookie =
          "auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;";
      }
    }

    // Schedule refresh for new token
    if (token) {
      this.scheduleRefresh(token);
    } else {
      this.cancelRefresh();
    }

    // Notify all listeners
    this.listeners.forEach((listener) => listener(token));
  }

  /**
   * Get current JWT token
   */
  getToken(): string | null {
    // Validate token before returning
    if (this.jwtToken && this.isTokenExpired(this.jwtToken)) {
      console.warn("[TokenManager] Token expired, clearing...");
      this.clearToken();
      return null;
    }
    return this.jwtToken;
  }

  /**
   * Get authorization header for API requests
   */
  getAuthHeader(): Record<string, string> {
    return this.jwtToken ? { Authorization: `Bearer ${this.jwtToken}` } : {};
  }

  /**
   * Subscribe to token changes
   */
  subscribe(listener: (token: string | null) => void): () => void {
    this.listeners.push(listener);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  /**
   * Clear token and notify listeners
   */
  clearToken() {
    this.setToken(null);
  }

  /**
   * Register refresh callback
   *
   * This callback will be called automatically when token needs refresh.
   * It should call the refresh endpoint and return the new access token.
   *
   * @example
   * ```ts
   * tokenManager.setRefreshCallback(async () => {
   *   const response = await fetch('/auth/refresh', {
   *     method: 'POST',
   *     credentials: 'include', // Include refresh token cookie
   *   });
   *   const data = await response.json();
   *   return data.accessToken;
   * });
   * ```
   */
  setRefreshCallback(callback: RefreshCallback) {
    this.refreshCallback = callback;
  }

  /**
   * Parse JWT token (INTERNAL USE ONLY - for expiration checking)
   *
   * SECURITY WARNING: This method decodes JWT payload without signature verification.
   * This is ONLY safe for checking token expiration and scheduling refresh.
   *
   * DO NOT use this to extract user/workspace data for authorization decisions!
   * Instead, use useAuth() or useWorkspaceData() hooks which get verified data from backend APIs.
   *
   * Why this is acceptable here:
   * - Only used internally for token lifecycle management (expiration, refresh)
   * - Backend validates signatures before accepting tokens
   * - No authorization decisions made based on decoded data
   *
   * Returns null if token is invalid or malformed.
   */
  private parseToken(token: string): JWTPayload | null {
    try {
      const parts = token.split(".");
      if (parts.length !== 3) {
        return null;
      }

      const payload = parts[1];
      const decoded = JSON.parse(atob(payload));

      return decoded as JWTPayload;
    } catch (error) {
      console.error("Failed to parse JWT:", error);
      return null;
    }
  }

  /**
   * Check if token is expired
   *
   * Returns true if token is expired or will expire soon (within 1 minute).
   */
  isTokenExpired(token: string, bufferSeconds = 60): boolean {
    const payload = this.parseToken(token);
    if (!payload || !payload.exp) {
      return true;
    }

    const now = Math.floor(Date.now() / 1000);
    return payload.exp - now <= bufferSeconds;
  }

  /**
   * Get time until token expiration (in milliseconds)
   *
   * Returns 0 if token is already expired or invalid.
   */
  getTimeUntilExpiry(token: string): number {
    const payload = this.parseToken(token);
    if (!payload || !payload.exp) {
      return 0;
    }

    const now = Math.floor(Date.now() / 1000);
    const secondsUntilExpiry = payload.exp - now;

    return Math.max(0, secondsUntilExpiry * 1000);
  }

  /**
   * Schedule automatic token refresh
   *
   * Schedules refresh 10 minutes before token expiration.
   * If token expires in less than 10 minutes, schedules immediate refresh.
   */
  private scheduleRefresh(token: string) {
    // Cancel any existing refresh
    this.cancelRefresh();

    const timeUntilExpiry = this.getTimeUntilExpiry(token);

    if (timeUntilExpiry === 0) {
      // Token already expired
      console.warn("Token is already expired");
      return;
    }

    // Schedule refresh 10 minutes (600,000ms) before expiry
    const refreshBuffer = 10 * 60 * 1000; // 10 minutes
    const timeUntilRefresh = Math.max(0, timeUntilExpiry - refreshBuffer);

    console.log(
      `[TokenManager] Token refresh scheduled in ${Math.floor(timeUntilRefresh / 1000 / 60)} minutes`,
    );

    this.refreshTimeout = setTimeout(() => {
      this.performRefresh();
    }, timeUntilRefresh);
  }

  /**
   * Cancel scheduled refresh
   */
  private cancelRefresh() {
    if (this.refreshTimeout) {
      clearTimeout(this.refreshTimeout);
      this.refreshTimeout = null;
    }
  }

  /**
   * Perform token refresh
   *
   * Calls the registered refresh callback to get a new token.
   * If successful, updates the token and reschedules refresh.
   * If failed, clears the token (user will be logged out).
   */
  private async performRefresh() {
    if (this.isRefreshing) {
      console.log("[TokenManager] Refresh already in progress");
      return;
    }

    if (!this.refreshCallback) {
      console.warn("[TokenManager] No refresh callback registered");
      return;
    }

    try {
      this.isRefreshing = true;
      console.log("[TokenManager] Refreshing token...");

      const newToken = await this.refreshCallback();

      if (newToken) {
        this.setToken(newToken);
        console.log("[TokenManager] Token refreshed successfully");
      } else {
        console.warn("[TokenManager] Refresh failed - no token returned");
        this.clearToken();
      }
    } catch (error) {
      console.error("[TokenManager] Refresh error:", error);
      this.clearToken();
    } finally {
      this.isRefreshing = false;
    }
  }

  /**
   * Get token from cookie (fallback for SSR)
   */
  private getTokenFromCookie(): string | null {
    if (typeof window === "undefined") return null;

    const cookies = document.cookie.split(";");
    for (const cookie of cookies) {
      const [key, value] = cookie.trim().split("=");
      if (key === "auth-token") {
        return value || null;
      }
    }
    return null;
  }

  /**
   * Get token expiration date
   *
   * Returns null if token is invalid or has no expiration.
   */
  getTokenExpiration(token?: string): Date | null {
    const tokenToCheck = token || this.jwtToken;
    if (!tokenToCheck) return null;

    const payload = this.parseToken(tokenToCheck);
    if (!payload || !payload.exp) return null;

    return new Date(payload.exp * 1000);
  }

  /**
   * Get user ID from token
   *
   * @deprecated DO NOT USE - Security vulnerability!
   * Use useAuth() hook instead: `const { user } = useAuth()`
   * This decodes JWT client-side which violates zero-trust security.
   */
  getUserId(token?: string): string | null {
    console.warn(
      "[DEPRECATED] getUserId() should not be used - use useAuth() hook instead",
    );
    const tokenToCheck = token || this.jwtToken;
    if (!tokenToCheck) return null;

    const payload = this.parseToken(tokenToCheck);
    return payload?.sub || null;
  }

  /**
   * Get workspace ID from token
   *
   * @deprecated DO NOT USE - Security vulnerability!
   * Use useWorkspaceData() hook instead: `const { workspaceId } = useWorkspaceData()`
   * This decodes JWT client-side which violates zero-trust security.
   */
  getWorkspaceId(token?: string): string | null {
    console.warn(
      "[DEPRECATED] getWorkspaceId() should not be used - use useWorkspaceData() hook instead",
    );
    const tokenToCheck = token || this.jwtToken;
    if (!tokenToCheck) return null;

    const payload = this.parseToken(tokenToCheck);
    return payload?.workspaceId || null;
  }

  /**
   * Check if current token is valid and not expired
   */
  isTokenValid(): boolean {
    if (!this.jwtToken) return false;
    return !this.isTokenExpired(this.jwtToken);
  }

  /**
   * Get token health status for debugging
   */
  getTokenHealth(): {
    valid: boolean;
    expiresIn: number | null;
    hasToken: boolean;
  } {
    const hasToken = !!this.jwtToken;
    const valid = this.isTokenValid();
    const expiresIn = this.jwtToken
      ? this.getTimeUntilExpiry(this.jwtToken)
      : null;

    return { valid, expiresIn, hasToken };
  }
}

// Export singleton instance
export const tokenManager = new TokenManager();

// Initialize on import (client-side only)
if (typeof window !== "undefined") {
  tokenManager.initialize();
}


