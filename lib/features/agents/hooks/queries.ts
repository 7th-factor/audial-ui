'use client'

import { makeQuery } from '@/lib/api/query-factory'
import { agentsFetchers } from '../fetchers'
import { agentsQueryKeys } from '../query-keys'

export const { useHook: useAgents } = makeQuery(() => ({
  queryKey: agentsQueryKeys.lists(),
  queryFn: agentsFetchers.list,
}))

export const { useHook: useAgent } = makeQuery((id: string) => ({
  queryKey: agentsQueryKeys.detail(id),
  queryFn: () => agentsFetchers.get(id),
  enabled: !!id,
}))
