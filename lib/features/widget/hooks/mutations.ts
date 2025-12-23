'use client'

import { useQueryClient } from '@tanstack/react-query'
import { makeMutation } from '@/lib/api/query-factory'
import { widgetConfigQueryKeys } from '../query-keys'
import { createWidgetConfig, updateWidgetConfig } from '../requests'
import type { WidgetConfigPayload, WidgetConfig } from '../types'

export const { useMut: useCreateWidgetConfig } = makeMutation(() => ({
  mutationKey: widgetConfigQueryKeys.create(),
  mutationFn: createWidgetConfig,
}))

export const { useMut: useUpdateWidgetConfig } = makeMutation(
  ({ widgetConfigId, agentId }: { widgetConfigId: string; agentId?: string }) => {
    const client = useQueryClient()
    return {
      mutationKey: widgetConfigQueryKeys.update(widgetConfigId),
      mutationFn: (payload: WidgetConfigPayload) => updateWidgetConfig(widgetConfigId, payload),
      onSuccess: (newData: WidgetConfig) => {
        if (agentId) {
          client.setQueryData(widgetConfigQueryKeys.byAgent(agentId), (old: WidgetConfig) => {
            return {
              ...old,
              ...newData,
            }
          })
        } else {
          console.warn('No agent id found. Widget config will not be updated in the cache.')
        }
      },
    }
  }
)
