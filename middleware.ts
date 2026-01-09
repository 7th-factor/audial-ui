import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * Next.js Middleware for Auth Validation
 *
 * Validates authentication at the request level for faster redirects.
 * This runs before page rendering, preventing flash of protected content.
 *
 * Note: Complex checks (workspace validation, onboarding) remain in
 * AuthGuard/WorkspaceGuard since they require API calls.
 */

// Routes that don't require authentication
const publicRoutes = ['/login', '/signup', '/forgot-password'];

// Auth routes - authenticated users should be redirected away
const authRoutes = ['/login', '/signup', '/forgot-password'];

// Routes that should be excluded from middleware entirely
const excludedPrefixes = [
  '/api',
  '/_next/static',
  '/_next/image',
  '/favicon.ico',
  '/assets',
  '/images',
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip excluded paths
  if (excludedPrefixes.some((prefix) => pathname.startsWith(prefix))) {
    return NextResponse.next();
  }

  // Check for auth token in cookies
  const token = request.cookies.get('auth-token')?.value;
  const hasValidToken = !!token && token.length > 0;

  // Authenticated users trying to access auth pages (login/signup)
  // Redirect them to the home page
  if (authRoutes.some((route) => pathname.startsWith(route)) && hasValidToken) {
    // Check for returnUrl to redirect back after auth
    const returnUrl = request.nextUrl.searchParams.get('returnUrl');
    if (returnUrl) {
      return NextResponse.redirect(new URL(decodeURIComponent(returnUrl), request.url));
    }
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Unauthenticated users trying to access protected routes
  // Redirect to login with returnUrl
  const isPublicRoute = publicRoutes.some((route) => pathname.startsWith(route));
  const isOnboarding = pathname.startsWith('/onboarding');

  if (!isPublicRoute && !isOnboarding && !hasValidToken) {
    const loginUrl = new URL('/login', request.url);
    // Preserve the intended destination
    if (pathname !== '/') {
      loginUrl.searchParams.set('returnUrl', pathname);
    }
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder assets
     */
    '/((?!api|_next/static|_next/image|favicon.ico|assets|images).*)',
  ],
};
