'use client'

import { makeQuery } from '@/lib/api/query-factory'
import { apiKeysQueryKeys } from '../query-keys'
import {
  getDefaultPublicApiKey,
  listPrivateApiKeys,
  listPublicApiKeys,
} from '../fetchers'

/**
 * Hook to fetch private API keys
 */
export const { useHook: usePrivateApiKeys } = makeQuery(() => ({
  queryKey: apiKeysQueryKeys.listPrivate(),
  queryFn: listPrivateApiKeys,
}))

/**
 * Hook to fetch public API keys
 */
export const { useHook: usePublicApiKeys } = makeQuery(() => ({
  queryKey: apiKeysQueryKeys.listPublic(),
  queryFn: listPublicApiKeys,
}))

/**
 * Hook to fetch the default public API key (for widget embed code)
 */
export const { useHook: useDefaultPublicApiKey } = makeQuery(() => ({
  queryKey: apiKeysQueryKeys.defaultPublic(),
  queryFn: getDefaultPublicApiKey,
}))
