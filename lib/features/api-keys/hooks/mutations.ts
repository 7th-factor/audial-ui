'use client'

import { useQueryClient } from '@tanstack/react-query'
import { makeMutation } from '@/lib/api/query-factory'
import { apiKeysQueryKeys } from '../query-keys'
import { createApiKey, deleteApiKey } from '../fetchers'
import { CreateApiKeyRequest, DeleteApiKeyRequest } from '../types'

/**
 * Hook to create a new API key
 */
export const { useMut: useCreateApiKey } = makeMutation(() => {
  const queryClient = useQueryClient()

  return {
    mutationFn: (data: CreateApiKeyRequest) => createApiKey(data),
    onSuccess: () => {
      // Invalidate both private and public lists
      queryClient.invalidateQueries({ queryKey: apiKeysQueryKeys.listPrivate() })
      queryClient.invalidateQueries({ queryKey: apiKeysQueryKeys.listPublic() })
    },
  }
})

/**
 * Hook to delete an API key
 */
export const { useMut: useDeleteApiKey } = makeMutation(() => {
  const queryClient = useQueryClient()

  return {
    mutationFn: (data: DeleteApiKeyRequest) => deleteApiKey(data),
    onSuccess: () => {
      // Invalidate both private and public lists
      queryClient.invalidateQueries({ queryKey: apiKeysQueryKeys.listPrivate() })
      queryClient.invalidateQueries({ queryKey: apiKeysQueryKeys.listPublic() })
    },
  }
})
