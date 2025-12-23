/**
 * API Module
 *
 * Main entry point for the API layer.
 * Exports the client, types, services, and hooks.
 *
 * Usage:
 * ```ts
 * // Import hooks (recommended for components)
 * import { useAgents, useCustomers, useCalls } from '@/lib/api';
 *
 * // Import types
 * import type { Agent, Customer, Call } from '@/lib/api';
 *
 * // Import services (for non-React usage)
 * import { agentsService, customersService } from '@/lib/api';
 * ```
 */

// API Client
export { apiClient, ApiError } from "./client";

// Types
export * from "./types";

// Services
export * from "./services";

// Hooks
export * from "./hooks";
