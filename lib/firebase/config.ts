"use client";

import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, connectAuthEmulator, setPersistence, browserLocalPersistence, type Auth } from "firebase/auth";

/**
 * Normalize environment variable value
 * Removes newlines and trims whitespace to prevent URL encoding issues
 */
function normalizeEnvValue(value: string | undefined, defaultValue: string): string {
  if (!value) {
    return defaultValue;
  }
  // Remove all newlines and carriage returns, then trim whitespace
  // This prevents %0A (newline) from appearing in URLs
  return value.replace(/[\r\n]+/g, "").trim();
}

const firebaseConfig = {
  apiKey: normalizeEnvValue(
    process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    "demo-api-key"
  ),
  authDomain: normalizeEnvValue(
    process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    "audial-demo.firebaseapp.com"
  ),
  projectId: normalizeEnvValue(
    process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    "audial-demo"
  ),
  storageBucket: normalizeEnvValue(
    process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    "audial-demo.appspot.com"
  ),
  messagingSenderId: normalizeEnvValue(
    process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    "123456789"
  ),
  appId: normalizeEnvValue(
    process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    "1:123456789:web:abcdef123456"
  ),
};

// Module-scoped variables for lazy initialization
let _app: FirebaseApp | null = null;
let _auth: Auth | null = null;

/**
 * Get or initialize the Firebase app instance.
 * This function ensures Firebase is only initialized on the client side.
 * @throws {Error} If called on the server side
 */
export function getFirebaseApp(): FirebaseApp {
  if (typeof window === "undefined") {
    throw new Error("Firebase can only be initialized on the client side");
  }

  if (!_app) {
    _app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

    console.log("🔥 Firebase initialized:", {
      projectId: firebaseConfig.projectId,
      authDomain: firebaseConfig.authDomain,
      useEmulator: process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR,
      nodeEnv: process.env.NODE_ENV,
    });
  }

  return _app;
}

/**
 * Get or initialize the Firebase Auth instance.
 * This function ensures Firebase Auth is only initialized on the client side.
 * Automatically connects to emulator in development if configured.
 * @throws {Error} If called on the server side
 */
export function getFirebaseAuth(): Auth {
  if (typeof window === "undefined") {
    throw new Error("Firebase Auth can only be initialized on the client side");
  }

  if (!_auth) {
    _auth = getAuth(getFirebaseApp());

    // Set Firebase persistence to survive page reloads and hot reloads
    if (typeof window !== 'undefined') {
      setPersistence(_auth, browserLocalPersistence).catch((error) => {
        console.error("Failed to set Firebase persistence:", error);
      });
    }

    // Only connect to emulator in development
    if (
      process.env.NODE_ENV === "development" &&
      process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === "true"
    ) {
      try {
        connectAuthEmulator(_auth, "http://localhost:9210", {
          disableWarnings: true,
        });
        console.log("Firebase Auth emulator connected");
      } catch {
        // Emulator already connected, ignore error
        console.log("Firebase Auth emulator already connected");
      }
    }
  }

  return _auth;
}

/**
 * Legacy export for backward compatibility.
 * Uses a Proxy to lazily initialize Firebase Auth on first access.
 *
 * @deprecated Use getFirebaseAuth() instead for better TypeScript support
 */
export const auth = new Proxy({} as Auth, {
  get(target, prop) {
    const authInstance = getFirebaseAuth();
    const value = authInstance[prop as keyof Auth];
    return typeof value === "function" ? value.bind(authInstance) : value;
  },
});

