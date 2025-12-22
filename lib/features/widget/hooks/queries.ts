'use client'

import { makeQuery } from '@/lib/api/query-factory'
import { widgetConfigQueryKeys } from '../query-keys'
import { getWidgetConfig, getWidgetConfigByAgent } from '../requests'

export const { useHook: useGetWidgetConfig } = makeQuery((widgetConfigId: string) => ({
  queryKey: widgetConfigQueryKeys.byId(widgetConfigId),
  queryFn: () => getWidgetConfig(widgetConfigId),
  enabled: !!widgetConfigId,
}))

export const { useHook: useGetWidgetConfigByAgent } = makeQuery((agentId: string) => ({
  queryKey: widgetConfigQueryKeys.byAgent(agentId),
  queryFn: () => getWidgetConfigByAgent(agentId),
  enabled: !!agentId,
}))
