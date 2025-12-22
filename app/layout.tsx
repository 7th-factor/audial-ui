import type { Metadata } from 'next';
import { Ubuntu, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { AuthProvider } from '@/lib/firebase/auth-context';
import { QueryProvider } from '@/components/providers/query-provider';
import { ObservabilityProvider, ErrorBoundary } from '@/lib/observability/observability-provider';
import { ThemeProvider } from '@/components/providers/theme-provider';

const ubuntu = Ubuntu({
  variable: '--font-ubuntu',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Audial Admin',
  description: 'Audial admin dashboard',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${ubuntu.variable} ${geistMono.variable} font-sans antialiased`}>
        <ErrorBoundary>
          <ObservabilityProvider>
            <ThemeProvider
              attribute="class"
              defaultTheme="system"
              enableSystem
              disableTransitionOnChange
            >
              <AuthProvider>
                <QueryProvider>
                  {children}
                  <Toaster />
                </QueryProvider>
              </AuthProvider>
            </ThemeProvider>
          </ObservabilityProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}

export const dynamic = 'force-dynamic';
