/**
 * Observability utilities
 * 
 * Simplified observability implementation that can be extended with Sentry/PostHog later
 */

export type ObservabilityUser = {
  id: string;
  firebaseUid?: string;
  email?: string;
  displayName?: string;
  emailVerified?: boolean;
  customProperties?: Record<string, unknown>;
};

export enum AnalyticsEvents {
  USER_SIGNED_IN = 'user_signed_in',
  USER_SIGNED_UP = 'user_signed_up',
  USER_SIGNED_OUT = 'user_signed_out',
  USER_SIGNED_IN_GOOGLE = 'user_signed_in_google',
  USER_SIGNED_IN_MICROSOFT = 'user_signed_in_microsoft',
}

export function trackEvent(eventName: string, properties?: Record<string, unknown>) {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('[Analytics]', eventName, properties);
  }
  // TODO: Integrate with PostHog or other analytics provider
}

export function identifyUser(user: ObservabilityUser) {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Identify user:', user);
  }
  // TODO: Integrate with PostHog or other analytics provider
}

export function resetUser() {
  if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
    console.log('[Analytics] Reset user');
  }
  // TODO: Integrate with PostHog or other analytics provider
}

