'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { trackEvent, identifyUser, resetUser, type ObservabilityUser } from './index';

interface ObservabilityContextValue {
  trackEvent: (eventName: string, properties?: Record<string, unknown>) => void;
  identifyUser: (user: ObservabilityUser) => void;
  resetUser: () => void;
  isInitialized: boolean;
}

const ObservabilityContext = createContext<ObservabilityContextValue | null>(null);

interface ObservabilityProviderProps {
  children: React.ReactNode;
}

/**
 * ObservabilityProvider
 *
 * Provides unified analytics and monitoring context to the application.
 * Currently uses console logging in development, can be extended with Sentry/PostHog.
 */
export function ObservabilityProvider({ children }: ObservabilityProviderProps) {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Initialize observability
    setInitialized(true);
    
    // TODO: Initialize Sentry/PostHog here when ready
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      // Initialize Sentry
    }
    
    if (process.env.NEXT_PUBLIC_POSTHOG_KEY) {
      // Initialize PostHog
    }
  }, []);

  const value: ObservabilityContextValue = {
    trackEvent,
    identifyUser,
    resetUser,
    isInitialized: initialized,
  };

  return (
    <ObservabilityContext.Provider value={value}>
      {children}
    </ObservabilityContext.Provider>
  );
}

/**
 * Hook to access observability context
 */
export function useObservability(): ObservabilityContextValue {
  const context = useContext(ObservabilityContext);
  if (!context) {
    throw new Error('useObservability must be used within ObservabilityProvider');
  }
  return context;
}

/**
 * Error Boundary component for catching React errors
 */
export class ErrorBoundary extends React.Component<
  { children: React.ReactNode; fallback?: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallback?: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    // TODO: Send to Sentry when integrated
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback || (
          <div className="flex items-center justify-center min-h-screen">
            <div className="text-center">
              <h1 className="text-2xl font-bold mb-4">Something went wrong</h1>
              <p className="text-muted-foreground mb-4">
                We're sorry, but something unexpected happened.
              </p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-primary-foreground rounded"
              >
                Reload Page
              </button>
            </div>
          </div>
        )
      );
    }

    return this.props.children;
  }
}

