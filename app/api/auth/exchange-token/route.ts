/**
 * Token Exchange API Route
 * 
 * POST /api/auth/exchange-token
 * 
 * Exchanges Firebase ID token for custom JWT access token.
 * Based on chanl-api's token exchange endpoint.
 */

import { NextRequest, NextResponse } from 'next/server';
import { verifyFirebaseToken } from '@/lib/firebase/admin';
import jwt, { type SignOptions } from 'jsonwebtoken';

interface TokenExchangeRequest {
  firebase_token: string;
}

interface TokenExchangeResponse {
  accessToken: string;
  user: {
    id: string;
    uid: string;
    email: string;
    displayName?: string;
    emailVerified: boolean;
    authProvider: string;
  };
}

/**
 * Generate JWT access token
 */
function generateAccessToken(
  userId: string,
  email: string,
  expiresInSeconds: number = 3600 // 1 hour
): string {
  const secret = process.env.JWT_SECRET ?? process.env.NEXT_PUBLIC_JWT_SECRET ?? 'dev-secret-change-in-production';

  const options: SignOptions = {
    expiresIn: expiresInSeconds,
  };

  return jwt.sign(
    {
      sub: userId,
      email,
      tokenType: 'access',
    },
    secret,
    options
  );
}

export async function POST(request: NextRequest) {
  try {
    const body: TokenExchangeRequest = await request.json();
    
    if (!body.firebase_token) {
      return NextResponse.json(
        { error: 'firebase_token is required' },
        { status: 400 }
      );
    }

    console.log('[Token Exchange] Starting token exchange');

    // Verify Firebase token
    const firebaseUser = await verifyFirebaseToken(body.firebase_token);

    if (!firebaseUser) {
      console.error('[Token Exchange] Invalid Firebase token');
      return NextResponse.json(
        { error: 'Invalid or expired Firebase token' },
        { status: 401 }
      );
    }

    console.log('[Token Exchange] Firebase verification successful', {
      uid: firebaseUser.uid,
      email: firebaseUser.email,
    });

    // Generate JWT access token
    // Use Firebase UID as user ID
    const accessToken = generateAccessToken(firebaseUser.uid, firebaseUser.email);

    // Return response matching chanl-api format
    const response: TokenExchangeResponse = {
      accessToken,
      user: {
        id: firebaseUser.uid,
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        displayName: firebaseUser.name || firebaseUser.email.split('@')[0],
        emailVerified: firebaseUser.email_verified,
        authProvider: 'firebase',
      },
    };

    console.log('[Token Exchange] Token exchange successful');

    return NextResponse.json(response);
  } catch (error) {
    console.error('[Token Exchange] Error during token exchange:', error);
    
    return NextResponse.json(
      { 
        error: 'Token exchange failed',
        message: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

