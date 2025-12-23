/**
 * Token Cache with UID-based Security
 *
 * Provides fast-path authentication by caching valid tokens with strict security:
 * - UID validation prevents cross-user token reuse
 * - Expiration checking with 60s buffer prevents stale tokens
 * - Cache age limit (5 minutes) ensures freshness
 * - Memory + localStorage for performance + persistence
 *
 * Security Model:
 * - Client-side caching for UX optimization only
 * - Backend still validates every token on every request
 * - Cache cleared on sign-out and user switch
 * - No authorization decisions made based on cached data
 */

import { tokenManager } from "./token-manager";

interface CachedToken {
  token: string;
  uid: string;
  cachedAt: number;
}

const CACHE_KEY = "audial_token_cache";
const MAX_CACHE_AGE_MS = 5 * 60 * 1000; // 5 minutes
const EXPIRATION_BUFFER_SECONDS = 60; // Don't use tokens expiring in <60s

class TokenCache {
  private cache: CachedToken | null = null;

  /**
   * Cache a token with its associated Firebase UID
   *
   * Stores in both memory (fast) and localStorage (persistent across reloads).
   */
  set(token: string, uid: string): void {
    this.cache = {
      token,
      uid,
      cachedAt: Date.now(),
    };

    // Persist to localStorage for page reload
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify(this.cache));
        console.log("[TokenCache] Token cached for UID:", uid);
      } catch (error) {
        console.warn("[TokenCache] Failed to persist to localStorage:", error);
        // Continue without localStorage persistence
      }
    }
  }

  /**
   * Get cached token for the current user
   *
   * Returns null if:
   * - No cached token exists
   * - UID doesn't match (different user)
   * - Token is expired (or expires soon)
   * - Cache is too old (>5 minutes)
   *
   * @param currentUID - Firebase UID of current authenticated user
   * @returns Cached token if valid, null otherwise
   */
  get(currentUID: string): string | null {
    // Try memory cache first (fastest)
    let cached = this.cache;

    // Fallback to localStorage on page reload
    if (!cached && typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(CACHE_KEY);
        if (stored) {
          cached = JSON.parse(stored) as CachedToken;
          // Restore to memory cache
          this.cache = cached;
        }
      } catch (error) {
        console.warn("[TokenCache] Failed to read from localStorage:", error);
        this.clear();
        return null;
      }
    }

    if (!cached) {
      console.log("[TokenCache] Cache miss: No cached token");
      return null;
    }

    // Security Check 1: Strict UID comparison
    if (cached.uid !== currentUID) {
      console.warn(
        "[TokenCache] UID mismatch - clearing cache (cached:",
        cached.uid,
        "current:",
        currentUID,
        ")"
      );
      this.clear();
      return null;
    }

    // Security Check 2: Validate token not expired (with buffer)
    if (tokenManager.isTokenExpired(cached.token, EXPIRATION_BUFFER_SECONDS)) {
      console.log("[TokenCache] Token expired or expiring soon - clearing cache");
      this.clear();
      return null;
    }

    // Security Check 3: Check cache age limit
    const ageMs = Date.now() - cached.cachedAt;
    if (ageMs > MAX_CACHE_AGE_MS) {
      console.log(
        "[TokenCache] Cache too old (",
        Math.floor(ageMs / 1000 / 60),
        "minutes) - clearing"
      );
      this.clear();
      return null;
    }

    // All checks passed - return cached token
    console.log("[TokenCache] Cache hit for UID:", currentUID);
    return cached.token;
  }

  /**
   * Clear cached token
   *
   * Call this on sign-out, user switch, or token invalidation.
   */
  clear(): void {
    this.cache = null;

    if (typeof window !== "undefined") {
      try {
        localStorage.removeItem(CACHE_KEY);
        console.log("[TokenCache] Cache cleared");
      } catch (error) {
        console.warn("[TokenCache] Failed to clear localStorage:", error);
      }
    }
  }

  /**
   * Get cache statistics for monitoring/debugging
   *
   * Returns cache state without exposing sensitive token data.
   */
  getStats(): {
    hasCachedToken: boolean;
    cacheAge: number | null;
    cachedUID: string | null;
  } {
    if (!this.cache) {
      return {
        hasCachedToken: false,
        cacheAge: null,
        cachedUID: null,
      };
    }

    return {
      hasCachedToken: true,
      cacheAge: Date.now() - this.cache.cachedAt,
      cachedUID: this.cache.uid,
    };
  }
}

// Export singleton instance
export const tokenCache = new TokenCache();


