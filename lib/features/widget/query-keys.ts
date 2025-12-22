export const widgetConfigQueryKeys = {
  base: () => ['widgetConfig'] as const,
  byAgent: (agentId: string) => [...widgetConfigQueryKeys.base(), 'byAgent', agentId] as const,
  byId: (widgetConfigId: string) => [...widgetConfigQueryKeys.base(), 'byId', widgetConfigId] as const,
  create: () => [...widgetConfigQueryKeys.base(), 'create'] as const,
  update: (widgetConfigId: string) => [...widgetConfigQueryKeys.base(), 'update', widgetConfigId] as const,
}
