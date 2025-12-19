// Next.js config runs in Node.js context, not client-side
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Use default .next directory for Vercel compatibility
  // Custom distDir was causing routes-manifest.json not found errors

  // Turbopack configuration
  turbopack: {
    root: process.cwd(), // Use current working directory as root (audial-admin)
  },

  // Optimize package imports to reduce bundle size
  experimental: {
    optimizePackageImports: ['@radix-ui/react-icons', 'lucide-react'],
  },

  // Suppress known warnings from OpenTelemetry (used by Sentry)
  // The "Critical dependency: the request of a dependency is an expression" warning
  // is a known, harmless issue with dynamic require() in OpenTelemetry instrumentation
  webpack: (config, { isServer }) => {
    if (isServer) {
      config.ignoreWarnings = [{ module: /@opentelemetry\/instrumentation/ }];
    }
    return config;
  },
};

export default nextConfig;
