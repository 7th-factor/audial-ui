export async function exchangeToken(idToken: string, signal?: AbortSignal): Promise<string> {
  // Try local API route first (for development/emulator)
  // Fallback to backend API if configured
  const useLocalApi = process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true' || 
                      process.env.NEXT_PUBLIC_USE_LOCAL_TOKEN_EXCHANGE === 'true';
  
  const baseURL = useLocalApi
    ? typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000'
    : process.env.NEXT_PUBLIC_API_URL || 'https://audial-api-staging.fly.dev';
  
  const endpoint = useLocalApi 
    ? '/api/auth/exchange-token'
    : '/api/v1/auth/exchange-token';
  
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10000);
  try {
    console.log("[exchangeToken] Exchanging Firebase token at:", `${baseURL}${endpoint}`);
    const res = await fetch(`${baseURL}${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ firebase_token: idToken }),
      signal: signal ?? controller.signal,
    });
    
    if (!res.ok) {
      const errorText = await res.text().catch(() => 'No error details');
      console.error("[exchangeToken] API error:", res.status, errorText);
      // Do not retry on 401/403
      throw new Error(`Token exchange failed: ${res.status} ${res.statusText}`);
    }
    
    const json = await res.json();
    // Support both local API format (accessToken) and backend API format (data.accessToken)
    const token = json?.accessToken ?? json?.data?.accessToken;
    if (!token || typeof token !== 'string') {
      console.error("[exchangeToken] Invalid response format:", json);
      throw new Error('No accessToken in response');
    }
    
    console.log("[exchangeToken] ✅ Token exchange successful");
    return token;
  } catch (error) {
    console.error("[exchangeToken] ❌ Token exchange error:", error);
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

