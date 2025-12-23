/**
 * Query key factory for API keys feature
 */
export const apiKeysQueryKeys = {
  base: ['api-keys'] as const,
  list: () => [...apiKeysQueryKeys.base, 'list'] as const,
  listPrivate: () => [...apiKeysQueryKeys.base, 'list-private'] as const,
  listPublic: () => [...apiKeysQueryKeys.base, 'list-public'] as const,
  defaultPublic: () => [...apiKeysQueryKeys.base, 'default-public'] as const,
  create: () => [...apiKeysQueryKeys.base, 'create'] as const,
  delete: (id: string) => [...apiKeysQueryKeys.base, 'delete', id] as const,
}
