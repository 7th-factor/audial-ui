'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/firebase/auth-context';
import { IconRocket } from "@tabler/icons-react";
import { PageLayout } from "@/components/page-layout";
import { Button } from "@/components/ui/button";
import { AppSidebar } from "@/components/app-sidebar";
import { SiteHeader } from "@/components/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AuthGuard } from "@/lib/auth/auth-guard";

/**
 * Root page that handles authentication-based routing:
 * - Authenticated users: See dashboard home with sidebar layout
 * - Unauthenticated users: Redirected to /login
 */
export default function HomePage() {
  const { user, loading, customToken } = useAuth();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Track client-side mount to prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    // Only run redirect logic after mount to avoid hydration mismatch
    if (!mounted) return;

    // Wait for auth state to be determined
    if (loading || (user && !customToken)) {
      return;
    }

    if (!user) {
      // User is not authenticated - redirect to login
      router.push('/login');
    }
  }, [mounted, user, loading, customToken, router]);

  // During SSR and initial render, show consistent loading state
  // This prevents hydration mismatch
  if (!mounted || loading || (user && !customToken)) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not authenticated, show nothing (redirect is happening)
  if (!user) {
    return null;
  }

  // If authenticated, render the dashboard home page with layout
  return (
    <AuthGuard>
      <SidebarProvider
        style={
          {
            "--sidebar-width": "calc(var(--spacing) * 56)",
            "--header-height": "calc(var(--spacing) * 12)",
          } as React.CSSProperties
        }
      >
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="@container/main flex-1 overflow-y-auto">
              <PageLayout
                title="Get Started"
                description="Welcome to Audial. Let's get you set up."
                icon={IconRocket}
                actions={<Button>Complete Setup</Button>}
              >
                <div className="flex flex-1 items-center justify-center px-4 lg:px-6">
                  <p className="text-muted-foreground">Get started content goes here.</p>
                </div>
              </PageLayout>
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </AuthGuard>
  );
}

export const dynamic = 'force-dynamic';
