import type { TokenData } from './token-manager';

export interface ExchangeTokenResponse {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
}

/**
 * Exchange Firebase ID token for backend access/refresh tokens
 *
 * Calls the backend /api/auth/exchange-token endpoint which:
 * - Validates the Firebase token
 * - Returns accessToken, refreshToken, and expiresIn
 */
export async function exchangeToken(idToken: string, signal?: AbortSignal): Promise<TokenData> {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://audial-api-staging.fly.dev';
  const endpoint = '/api/auth/exchange-token';

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(new DOMException('Request timeout', 'TimeoutError')), 30000);
  try {
    console.log("[exchangeToken] Exchanging Firebase token at:", `${baseURL}${endpoint}`);
    const res = await fetch(`${baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        code: idToken,
        redirectUri: typeof window !== 'undefined' ? window.location.origin : 'https://admin.audial.co'
      }),
      signal: signal ?? controller.signal,
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => 'No error details');
      console.error("[exchangeToken] API error:", res.status, errorText);
      throw new Error(`Token exchange failed: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    // Validate response has required fields
    const accessToken = json?.accessToken ?? json?.data?.accessToken;
    const refreshToken = json?.refreshToken ?? json?.data?.refreshToken;
    const expiresIn = json?.expiresIn ?? json?.data?.expiresIn ?? 3600;

    if (!accessToken || typeof accessToken !== 'string') {
      console.error("[exchangeToken] Invalid response format - missing accessToken:", json);
      throw new Error('No accessToken in response');
    }

    if (!refreshToken || typeof refreshToken !== 'string') {
      console.error("[exchangeToken] Invalid response format - missing refreshToken:", json);
      throw new Error('No refreshToken in response');
    }

    console.log("[exchangeToken] ✅ Token exchange successful");
    return { accessToken, refreshToken, expiresIn };
  } catch (error) {
    console.error("[exchangeToken] ❌ Token exchange error:", error);
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Refresh access token using refresh token
 *
 * Calls the backend /api/auth/refresh-token endpoint which:
 * - Validates the refresh token
 * - Returns new accessToken, refreshToken (rotated), and expiresIn
 */
export async function refreshAccessToken(refreshToken: string, signal?: AbortSignal): Promise<TokenData> {
  const baseURL = process.env.NEXT_PUBLIC_API_URL || 'https://audial-api-staging.fly.dev';
  const endpoint = '/api/auth/refresh-token';

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(new DOMException('Request timeout', 'TimeoutError')), 30000);
  try {
    console.log("[refreshAccessToken] Refreshing token at:", `${baseURL}${endpoint}`);
    const res = await fetch(`${baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
      signal: signal ?? controller.signal,
    });

    if (!res.ok) {
      const errorText = await res.text().catch(() => 'No error details');
      console.error("[refreshAccessToken] API error:", res.status, errorText);
      throw new Error(`Token refresh failed: ${res.status} ${res.statusText}`);
    }

    const json = await res.json();

    // Validate response has required fields
    const accessToken = json?.accessToken ?? json?.data?.accessToken;
    const newRefreshToken = json?.refreshToken ?? json?.data?.refreshToken;
    const expiresIn = json?.expiresIn ?? json?.data?.expiresIn ?? 3600;

    if (!accessToken || typeof accessToken !== 'string') {
      console.error("[refreshAccessToken] Invalid response format - missing accessToken:", json);
      throw new Error('No accessToken in response');
    }

    if (!newRefreshToken || typeof newRefreshToken !== 'string') {
      console.error("[refreshAccessToken] Invalid response format - missing refreshToken:", json);
      throw new Error('No refreshToken in response');
    }

    console.log("[refreshAccessToken] ✅ Token refresh successful");
    return { accessToken, refreshToken: newRefreshToken, expiresIn };
  } catch (error) {
    console.error("[refreshAccessToken] ❌ Token refresh error:", error);
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

