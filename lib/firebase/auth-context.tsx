"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import {
  User,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  OAuthProvider,
  signOut,
  onAuthStateChanged,
  onIdTokenChanged,
  sendPasswordResetEmail,
  sendEmailVerification,
  updateProfile,
  getIdTokenResult,
} from "firebase/auth";
import { auth } from "./config";
import { useRouter } from "next/navigation";
import { tokenManager } from "@/lib/auth/token-manager";
import { tokenCache } from "@/lib/auth/token-cache";
import { exchangeToken as doExchange } from "@/lib/auth/exchange-token";

type AuthContextType = {
  user: User | null;
  customToken: string | null;
  loading: boolean;
  isEmailVerified?: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (
    email: string,
    password: string,
    displayName?: string
  ) => Promise<{ error: Error | null }>;
  signInWithGoogle: () => Promise<{ error: Error | null }>;
  signInWithMicrosoft: () => Promise<{ error: Error | null }>;
  logout: () => Promise<void>;
  signOut: () => Promise<void>; // Alias for logout for compatibility
  resetPassword: (email: string) => Promise<{ error: Error | null }>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [customToken, setCustomToken] = useState<string | null>(null);
  // Start with loading=true only in browser, false during SSR
  const [loading, setLoading] = useState(typeof window !== "undefined");
  const [isEmailVerified, setIsEmailVerified] = useState<boolean | undefined>(undefined);
  const router = useRouter();

  // Track scheduled proactive refresh timer
  type TimeoutRef = { current: ReturnType<typeof setTimeout> | null };
  const refreshTimerRef: TimeoutRef = (() => {
    const gw =
      typeof window !== "undefined"
        ? (window as unknown as { _authRefreshTimerRef?: TimeoutRef })
        : undefined;
    if (gw) {
      if (!gw._authRefreshTimerRef) {
        gw._authRefreshTimerRef = { current: null };
      }
      return gw._authRefreshTimerRef;
    }
    return { current: null };
  })();

  // Exchange Firebase token for custom JWT (with dedupe and throttle)
  const lastExchangeKeyRef = (() => {
    const gw =
      typeof window !== "undefined"
        ? (window as unknown as {
            _lastExchangeKeyRef?: { current: string | null };
          })
        : undefined;
    if (gw) {
      if (!gw._lastExchangeKeyRef) gw._lastExchangeKeyRef = { current: null };
      return gw._lastExchangeKeyRef;
    }
    return { current: null };
  })();

  const exchangeToken = useCallback(
    async (firebaseUser: User): Promise<string | null> => {
      try {
        const idToken = await firebaseUser.getIdToken();
        const key = `${firebaseUser.uid}:${idToken.slice(-10)}`;
        if (lastExchangeKeyRef.current === key) {
          return tokenManager.getToken() ?? null;
        }
        console.log("[AuthProvider] Exchanging Firebase token for backend token...");
        const access = await doExchange(idToken);
        setCustomToken(access);
        tokenManager.setToken(access);
        lastExchangeKeyRef.current = key;
        console.log("[AuthProvider] ✅ Token exchange successful");
        return access;
      } catch (error) {
        console.error("[AuthProvider] ❌ Token exchange failed:", error);
        const errorMessage = error instanceof Error ? error.message : String(error);
        console.error("[AuthProvider] Error details:", {
          message: errorMessage,
          uid: firebaseUser.uid,
          email: firebaseUser.email,
        });
        tokenManager.clearToken();
        setCustomToken(null);
        try {
          await signOut(auth);
        } catch (signOutError) {
          console.error("[AuthProvider] Failed to sign out after token exchange error:", signOutError);
        }
        return null;
      }
    },
    [lastExchangeKeyRef]
  );

  // Firebase Best Practice: Use onAuthStateChanged for auth state persistence
  // This ensures state persists across page refreshes
  useEffect(() => {
    // Only run in browser environment
    if (typeof window === "undefined") {
      return;
    }

    console.log("[AuthProvider] Setting up Firebase auth state listener");

    // Helper to clear any scheduled proactive refresh timer
    const clearRefreshTimer = () => {
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current as unknown as number);
        refreshTimerRef.current = null;
      }
    };

    const scheduleProactiveRefresh = async (firebaseUser: User) => {
      try {
        const idTokenResult = await getIdTokenResult(firebaseUser, /*forceRefresh*/ false);
        const expMs = idTokenResult?.expirationTime
          ? new Date(idTokenResult.expirationTime).getTime()
          : Date.now() + 55 * 60 * 1000;
        const now = Date.now();
        const leadMs = 60 * 1000; // refresh 60s before expiry
        const delay = Math.max(expMs - now - leadMs, 30 * 1000); // at least 30s

        clearRefreshTimer();
        refreshTimerRef.current = setTimeout(async () => {
          try {
            // Force a Firebase token refresh; onIdTokenChanged will fire afterward
            await firebaseUser.getIdToken(true);
          } catch (e) {
            console.warn("[AuthProvider] Proactive token refresh failed", e);
          }
        }, delay) as unknown as ReturnType<typeof setTimeout>;
      } catch (e) {
        console.warn("[AuthProvider] Failed to schedule proactive refresh", e);
      }
    };

    const processAuthState = async (firebaseUser: User | null) => {
      if (firebaseUser) {
        console.log("[AuthProvider] User authenticated:", firebaseUser.uid, firebaseUser.email);
        
        // User is authenticated - try fast path with cached token
        try {
          // Fast path: Try cached token first (1-5ms vs 100-500ms for exchange)
          const cachedToken = tokenCache.get(firebaseUser.uid);

          if (cachedToken) {
            console.log(
              "[AuthProvider] ✨ Fast path: Using cached token for UID:",
              firebaseUser.uid
            );

            // Set auth state immediately with cached token
            setUser(firebaseUser);
            setCustomToken(cachedToken);
            setIsEmailVerified(firebaseUser.emailVerified);
            setLoading(false);

            // Background: Verify token still valid and refresh if needed
            // This keeps token fresh without blocking UI
            exchangeToken(firebaseUser)
              .then(async (newToken) => {
                if (newToken && newToken !== cachedToken) {
                  console.log("[AuthProvider] Background token refresh completed");
                  setCustomToken(newToken);
                  tokenCache.set(newToken, firebaseUser.uid);
                }

                // Schedule proactive refresh
                await scheduleProactiveRefresh(firebaseUser);
              })
              .catch((error) => {
                console.error("[AuthProvider] Background token refresh failed:", error);
                // Don't clear token on background refresh failure - user still has valid cached token
              });

            // Early return - skip slow path
            return;
          }

          // Slow path: Exchange token (new user, expired cache, or cache miss)
          console.log("[AuthProvider] 🐢 Slow path: Exchanging token (cache miss)");
          const customToken = await exchangeToken(firebaseUser);

          if (customToken) {
            setUser(firebaseUser);
            setCustomToken(customToken);
            setIsEmailVerified(firebaseUser.emailVerified);

            // Cache token for next page load (fast path)
            tokenCache.set(customToken, firebaseUser.uid);

            // (Re)schedule proactive refresh before expiry
            await scheduleProactiveRefresh(firebaseUser);
          } else {
            // Token exchange failed, Firebase user will be signed out by exchangeToken function
            console.warn("[AuthProvider] Token exchange failed, clearing auth state");
            setUser(null);
            setCustomToken(null);
            tokenCache.clear(); // Clear cache on auth failure
            clearRefreshTimer();
          }
        } catch (error) {
          console.error("[AuthProvider] Error during token exchange:", error);
          setUser(null);
          setCustomToken(null);
          tokenCache.clear(); // Clear cache on error
          clearRefreshTimer();
        } finally {
          // Firebase Best Practice: Always set loading to false after processing auth state
          setLoading(false);
        }
      } else {
        // User is signed out - clear all auth state synchronously
        console.log("[AuthProvider] User signed out");
        setUser(null);
        setCustomToken(null);
        tokenManager.clearToken();
        tokenCache.clear(); // Clear cached token on sign-out
        clearRefreshTimer();

        // Firebase Best Practice: Set loading to false immediately for sign-out
        setLoading(false);
      }
    };

    // Use onAuthStateChanged for reliable auth state persistence
    // This fires on initial load and whenever auth state changes
    const unsubscribeAuth = onAuthStateChanged(auth, async (firebaseUser) => {
      await processAuthState(firebaseUser);
    });

    // Also listen to token changes for proactive refresh
    const unsubscribeToken = onIdTokenChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        // Token refreshed - update our custom token if needed
        console.log("[AuthProvider] Token refreshed, updating custom token");
        const newToken = await exchangeToken(firebaseUser);
        if (newToken) {
          setCustomToken(newToken);
          tokenCache.set(newToken, firebaseUser.uid);
        }
      }
    });

    // Firebase Best Practice: Return cleanup function to prevent memory leaks
    return () => {
      console.log("[AuthProvider] Cleaning up Firebase auth listeners");
      if (refreshTimerRef.current) {
        clearTimeout(refreshTimerRef.current as unknown as number);
        refreshTimerRef.current = null;
      }
      unsubscribeAuth();
      unsubscribeToken();
    };
  }, [exchangeToken, refreshTimerRef]);

  const signIn = async (email: string, password: string) => {
    try {
      console.log("[AuthProvider] Attempting sign in for:", email);
      const { user } = await signInWithEmailAndPassword(auth, email, password);
      console.log("[AuthProvider] Firebase sign in successful:", user.uid);
      
      // Wait for token exchange to complete
      // The onAuthStateChanged listener will handle setting the user state
      const token = await exchangeToken(user);
      if (!token) {
        throw new Error("Token exchange failed after sign in");
      }
      
      console.log("[AuthProvider] Sign in complete");
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("[AuthProvider] Sign in error:", errorMessage, error);
      return {
        error: error instanceof Error ? error : new Error(errorMessage),
      };
    }
  };

  const signUp = async (email: string, password: string, displayName?: string) => {
    try {
      console.log("[AuthProvider] Attempting sign up for:", email);
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      if (!user) {
        throw new Error("Failed to create user account");
      }
      console.log("[AuthProvider] Firebase sign up successful:", user.uid);

      // Update display name if provided
      if (displayName) {
        await updateProfile(user, { displayName });
      }

      // Try to send email verification, but don't fail if it errors
      // (Firebase emulator may not support this fully)
      try {
        await sendEmailVerification(user);
      } catch (verificationError) {
        console.warn(
          "Email verification failed (this is expected in emulator mode):",
          verificationError
        );
      }

      // Exchange Firebase token for backend JWT
      const token = await exchangeToken(user);
      if (!token) {
        throw new Error("Token exchange failed after sign up");
      }

      console.log("[AuthProvider] Sign up complete");
      return { error: null };
    } catch (error: unknown) {
      const errorMessage = error instanceof Error ? error.message : String(error);
      console.error("[AuthProvider] Sign up error:", errorMessage, error);
      return {
        error: error instanceof Error ? error : new Error(errorMessage),
      };
    }
  };

  const signInWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const { user } = await signInWithPopup(auth, provider);
      if (user) {
        await exchangeToken(user);
      }
      return { error: null };
    } catch (error: unknown) {
      return {
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  };

  const signInWithMicrosoft = async () => {
    try {
      const provider = new OAuthProvider("microsoft.com");
      const { user } = await signInWithPopup(auth, provider);
      if (user) {
        await exchangeToken(user);
      }
      return { error: null };
    } catch (error: unknown) {
      return {
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  };

  const logout = async () => {
    await signOut(auth);
    setCustomToken(null);
    tokenManager.clearToken();
    router.push("/login");
  };

  const resetPassword = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return { error: null };
    } catch (error: unknown) {
      return {
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        customToken,
        loading,
        isEmailVerified,
        signIn,
        signUp,
        signInWithGoogle,
        signInWithMicrosoft,
        logout,
        signOut: logout, // Alias for logout
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};

