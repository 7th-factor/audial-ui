export const agentsQueryKeys = {
  all: ['agents'] as const,
  lists: () => [...agentsQueryKeys.all, 'list'] as const,
  details: () => [...agentsQueryKeys.all, 'detail'] as const,
  detail: (id: string) => [...agentsQueryKeys.details(), id] as const,
}
