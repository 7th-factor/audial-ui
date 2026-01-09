/**
 * Stores Module
 *
 * Main entry point for Zustand stores.
 *
 * Usage:
 * ```ts
 * import { useUIStore, selectAgentFilters } from '@/lib/stores';
 * import { useIntegrationStore } from '@/lib/stores';
 * ```
 */

// UI Store
export * from './ui-store';

// Integration Store
export { useIntegrationStore, useIntegrationWithState } from './integration-store';
