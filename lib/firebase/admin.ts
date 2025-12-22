/**
 * Firebase Admin SDK initialization
 * 
 * Server-side only Firebase Admin SDK for verifying Firebase tokens
 */

import * as admin from 'firebase-admin';

let firebaseAdminApp: admin.app.App | null = null;

/**
 * Initialize Firebase Admin SDK
 * Uses credentials from environment variables
 */
export function getFirebaseAdmin(): admin.app.App {
  if (firebaseAdminApp) {
    return firebaseAdminApp;
  }

  // Check if Firebase app is already initialized
  if (admin.apps.length > 0) {
    firebaseAdminApp = admin.app();
    return firebaseAdminApp;
  }

  // Try to parse credentials from FIREBASE_CREDENTIALS JSON (from Doppler)
  let projectId: string | undefined;
  let clientEmail: string | undefined;
  let privateKey: string | undefined;

  const credentialsJson = process.env.FIREBASE_CREDENTIALS;
  if (credentialsJson) {
    try {
      const credentials = JSON.parse(credentialsJson);
      projectId = credentials.project_id;
      clientEmail = credentials.client_email;
      privateKey = credentials.private_key?.replace(/\\n/g, '\n');
    } catch (error) {
      console.warn('[Firebase Admin] Failed to parse FIREBASE_CREDENTIALS JSON:', error);
    }
  }

  // Fallback to individual env vars
  projectId = projectId || process.env.FIREBASE_PROJECT_ID || process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID;
  clientEmail = clientEmail || process.env.FIREBASE_CLIENT_EMAIL;
  privateKey = privateKey || process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  
  // Check if using emulator
  const emulatorHost = process.env.FIREBASE_AUTH_EMULATOR_HOST || 
    (process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true' ? 'localhost:9210' : null);
  
  const isEmulatorMode = !!emulatorHost;

  if (isEmulatorMode) {
    // Emulator mode - minimal configuration
    if (!projectId) {
      throw new Error('FIREBASE_PROJECT_ID is required even for emulator mode');
    }

    firebaseAdminApp = admin.initializeApp({
      projectId,
    });

    // Set emulator host
    process.env.FIREBASE_AUTH_EMULATOR_HOST = emulatorHost;
    
    console.log(`[Firebase Admin] Initialized for emulator: ${emulatorHost}`);
    return firebaseAdminApp;
  }

  // Production mode - require full credentials
  if (!projectId || !clientEmail || !privateKey) {
    throw new Error(
      'Firebase Admin configuration incomplete. Required: FIREBASE_PROJECT_ID, FIREBASE_CLIENT_EMAIL, FIREBASE_PRIVATE_KEY'
    );
  }

  firebaseAdminApp = admin.initializeApp({
    credential: admin.credential.cert({
      projectId,
      clientEmail,
      privateKey,
    }),
    projectId,
  });

  console.log(`[Firebase Admin] Initialized for project: ${projectId}`);
  return firebaseAdminApp;
}

/**
 * Verify Firebase ID token and extract user information
 */
export async function verifyFirebaseToken(idToken: string): Promise<{
  uid: string;
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
} | null> {
  try {
    const app = getFirebaseAdmin();
    const auth = admin.auth(app);

    // Check if we're in emulator mode
    const isEmulatorMode = !!process.env.FIREBASE_AUTH_EMULATOR_HOST ||
      process.env.NEXT_PUBLIC_FIREBASE_USE_EMULATOR === 'true';

    if (isEmulatorMode) {
      // For emulator: decode token without verification (emulator tokens don't have 'kid' claim)
      // The emulator uses unsigned tokens, so we just decode and trust them
      try {
        // Try standard verification first (works if emulator host is properly set)
        const decodedToken = await auth.verifyIdToken(idToken, false);
        return {
          uid: decodedToken.uid,
          email: decodedToken.email || '',
          email_verified: decodedToken.email_verified || false,
          name: decodedToken.name,
          picture: decodedToken.picture,
        };
      } catch (emulatorError) {
        // If verification fails, manually decode the token for emulator
        console.log('[Firebase Admin] Standard verification failed, trying emulator decode');
        const decoded = decodeEmulatorToken(idToken);
        if (decoded) {
          return decoded;
        }
        throw emulatorError;
      }
    }

    // Production mode: standard verification
    const decodedToken = await auth.verifyIdToken(idToken);

    return {
      uid: decodedToken.uid,
      email: decodedToken.email || '',
      email_verified: decodedToken.email_verified || false,
      name: decodedToken.name,
      picture: decodedToken.picture,
    };
  } catch (error) {
    console.error('[Firebase Admin] Failed to verify token:', error);
    return null;
  }
}

/**
 * Decode emulator token without verification
 * Emulator tokens are base64 encoded JSON, not proper JWTs
 */
function decodeEmulatorToken(token: string): {
  uid: string;
  email: string;
  email_verified: boolean;
  name?: string;
  picture?: string;
} | null {
  try {
    // Firebase emulator tokens are JWTs with different signing
    const parts = token.split('.');
    if (parts.length !== 3) {
      return null;
    }

    // Decode the payload (second part)
    const payload = JSON.parse(
      Buffer.from(parts[1], 'base64url').toString('utf-8')
    );

    console.log('[Firebase Admin] Decoded emulator token payload:', {
      uid: payload.user_id || payload.sub,
      email: payload.email,
    });

    return {
      uid: payload.user_id || payload.sub || payload.uid,
      email: payload.email || '',
      email_verified: payload.email_verified || false,
      name: payload.name,
      picture: payload.picture,
    };
  } catch (error) {
    console.error('[Firebase Admin] Failed to decode emulator token:', error);
    return null;
  }
}

