'use client'

import {
  useQuery,
  useMutation,
  UseQueryOptions,
  UseMutationOptions,
  UseQueryResult,
  useQueryClient,
} from '@tanstack/react-query'
import { useEffect } from 'react'
import { toast } from 'sonner'
import { ApiError } from './errors'

/**
 * Factory for creating typed query hooks with automatic error handling
 */
export function makeQuery<
  TParams = void,
  TQueryFnData = unknown,
  TError = Error,
  TData = TQueryFnData,
  TQueryKey extends readonly unknown[] = readonly unknown[]
>(
  opts:
    | UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>
    | ((params: TParams) => UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>)
): {
  useHook: (
    params: TParams,
    options?: Partial<
      Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
    >
  ) => UseQueryResult<TData, TError>
} {
  const useHook = (
    params: TParams,
    options?: Partial<
      Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, 'queryKey' | 'queryFn'>
    >
  ) => {
    const baseOpts = typeof opts === 'function' ? opts(params) : opts
    const result = useQuery<TQueryFnData, TError, TData, TQueryKey>({
      ...baseOpts,
      ...options,
    })

    useEffect(() => {
      if (result.isError) {
        toast.error('Error', {
          description:
            result.error instanceof ApiError ? result.error.message : 'Unknown error',
        })
      }
    }, [result.error, result.isError])

    return result
  }

  return { useHook }
}

/**
 * Factory for creating typed mutation hooks with automatic error handling
 */
export function makeMutation<
  TData = unknown,
  TError = Error,
  TVariables = void,
  TContext = unknown,
  TParams = void
>(
  opts:
    | UseMutationOptions<TData, TError, TVariables, TContext>
    | ((params: TParams) => UseMutationOptions<TData, TError, TVariables, TContext>)
): {
  useMut: (
    params: TParams,
    options?: Partial<
      Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>
    >
  ) => ReturnType<typeof useMutation<TData, TError, TVariables, TContext>>
} {
  const useMut = (
    params: TParams,
    options?: Partial<
      Omit<UseMutationOptions<TData, TError, TVariables, TContext>, 'mutationFn'>
    >
  ) => {
    const baseOpts = typeof opts === 'function' ? opts(params) : opts
    const result = useMutation<TData, TError, TVariables, TContext>({
      onError: (error) => {
        toast.error('Error', {
          description: error instanceof Error ? error.message : 'Unknown error',
        })
      },
      ...baseOpts,
      ...options,
    })

    return result
  }

  return { useMut }
}
