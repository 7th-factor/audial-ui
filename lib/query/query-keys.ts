/**
 * Query Keys Factory
 *
 * Centralized query key management for TanStack Query.
 * Provides type-safe, consistent query key generation across all entities.
 *
 * Pattern from chanl:
 * - `all`: Base key for the entity (used for broad invalidation)
 * - `lists()`: Key for list queries
 * - `list(filters?)`: Key for filtered list queries
 * - `details()`: Key for detail queries
 * - `detail(id)`: Key for specific item queries
 *
 * Usage:
 * ```typescript
 * // In hooks
 * useQuery({
 *   queryKey: queryKeys.agents.list(),
 *   queryFn: agentsService.list,
 * });
 *
 * // For invalidation
 * queryClient.invalidateQueries({ queryKey: queryKeys.agents.all });
 * queryClient.invalidateQueries({ queryKey: queryKeys.agents.lists() });
 * ```
 */

// ============================================================================
// Filter Types
// ============================================================================

export interface AgentFilters {
  search?: string;
  status?: string;
}

export interface ContactFilters {
  search?: string;
  status?: string;
  page?: number;
  limit?: number;
}

export interface CallFilters {
  agentId?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
  page?: number;
  limit?: number;
}

export interface ChatFilters {
  agentId?: string;
  status?: string;
  page?: number;
  limit?: number;
}

// ============================================================================
// Query Keys Factory
// ============================================================================

export const queryKeys = {
  // -------------------------------------------------------------------------
  // Agents
  // -------------------------------------------------------------------------
  agents: {
    all: ['agents'] as const,
    lists: () => [...queryKeys.agents.all, 'list'] as const,
    list: (filters?: AgentFilters) =>
      [...queryKeys.agents.lists(), filters ?? {}] as const,
    details: () => [...queryKeys.agents.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.agents.details(), id] as const,
  },

  // -------------------------------------------------------------------------
  // Contacts (Customers)
  // -------------------------------------------------------------------------
  contacts: {
    all: ['contacts'] as const,
    lists: () => [...queryKeys.contacts.all, 'list'] as const,
    list: (filters?: ContactFilters) =>
      [...queryKeys.contacts.lists(), filters ?? {}] as const,
    details: () => [...queryKeys.contacts.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.contacts.details(), id] as const,
  },

  // -------------------------------------------------------------------------
  // Calls
  // -------------------------------------------------------------------------
  calls: {
    all: ['calls'] as const,
    lists: () => [...queryKeys.calls.all, 'list'] as const,
    list: (filters?: CallFilters) =>
      [...queryKeys.calls.lists(), filters ?? {}] as const,
    details: () => [...queryKeys.calls.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.calls.details(), id] as const,
    stats: () => [...queryKeys.calls.all, 'stats'] as const,
  },

  // -------------------------------------------------------------------------
  // Chats
  // -------------------------------------------------------------------------
  chats: {
    all: ['chats'] as const,
    lists: () => [...queryKeys.chats.all, 'list'] as const,
    list: (filters?: ChatFilters) =>
      [...queryKeys.chats.lists(), filters ?? {}] as const,
    details: () => [...queryKeys.chats.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.chats.details(), id] as const,
    messages: (chatId: string) =>
      [...queryKeys.chats.detail(chatId), 'messages'] as const,
  },

  // -------------------------------------------------------------------------
  // Workspaces
  // -------------------------------------------------------------------------
  workspaces: {
    all: ['workspaces'] as const,
    lists: () => [...queryKeys.workspaces.all, 'list'] as const,
    list: () => [...queryKeys.workspaces.lists()] as const,
    details: () => [...queryKeys.workspaces.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.workspaces.details(), id] as const,
  },

  // -------------------------------------------------------------------------
  // Phone Numbers
  // -------------------------------------------------------------------------
  phoneNumbers: {
    all: ['phoneNumbers'] as const,
    lists: () => [...queryKeys.phoneNumbers.all, 'list'] as const,
    list: () => [...queryKeys.phoneNumbers.lists()] as const,
    details: () => [...queryKeys.phoneNumbers.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.phoneNumbers.details(), id] as const,
    available: () => [...queryKeys.phoneNumbers.all, 'available'] as const,
  },

  // -------------------------------------------------------------------------
  // Integrations
  // -------------------------------------------------------------------------
  integrations: {
    all: ['integrations'] as const,
    lists: () => [...queryKeys.integrations.all, 'list'] as const,
    list: () => [...queryKeys.integrations.lists()] as const,
    details: () => [...queryKeys.integrations.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.integrations.details(), id] as const,
  },

  // -------------------------------------------------------------------------
  // Credentials
  // -------------------------------------------------------------------------
  credentials: {
    all: ['credentials'] as const,
    lists: () => [...queryKeys.credentials.all, 'list'] as const,
    list: () => [...queryKeys.credentials.lists()] as const,
    details: () => [...queryKeys.credentials.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.credentials.details(), id] as const,
  },

  // -------------------------------------------------------------------------
  // API Keys
  // -------------------------------------------------------------------------
  apiKeys: {
    all: ['apiKeys'] as const,
    lists: () => [...queryKeys.apiKeys.all, 'list'] as const,
    list: () => [...queryKeys.apiKeys.lists()] as const,
  },

  // -------------------------------------------------------------------------
  // User
  // -------------------------------------------------------------------------
  user: {
    all: ['user'] as const,
    current: () => [...queryKeys.user.all, 'current'] as const,
    profile: () => [...queryKeys.user.all, 'profile'] as const,
  },
} as const;

// ============================================================================
// Type Helpers
// ============================================================================

/**
 * Extract query key type for a specific entity
 *
 * Usage:
 * ```typescript
 * type AgentsKey = QueryKeyOf<typeof queryKeys.agents>;
 * ```
 */
export type QueryKeyOf<T> = T extends { all: infer K } ? K : never;
