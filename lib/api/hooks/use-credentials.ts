"use client";

/**
 * Credentials Hooks
 *
 * TanStack Query hooks for the Credentials resource.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { credentialsService } from "../services/credentials";
import type {
  CredentialType,
  CreateCredentialInput,
  UpdateCredentialInput,
  DeleteCredentialInput,
} from "../types";

const CREDENTIALS_KEY = ["credentials"] as const;

/**
 * Fetch all credentials
 */
export function useCredentials() {
  return useQuery({
    queryKey: CREDENTIALS_KEY,
    queryFn: credentialsService.list,
  });
}

/**
 * Fetch a single credential by type and ID
 */
export function useCredential(type: CredentialType, id: string | undefined) {
  return useQuery({
    queryKey: [...CREDENTIALS_KEY, type, id],
    queryFn: () => credentialsService.get(type, id!),
    enabled: !!id,
  });
}

/**
 * Create a new credential
 */
export function useCreateCredential() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCredentialInput) => credentialsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CREDENTIALS_KEY });
    },
  });
}

/**
 * Update an existing credential
 */
export function useUpdateCredential() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: UpdateCredentialInput) => credentialsService.update(data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: CREDENTIALS_KEY });
      queryClient.invalidateQueries({
        queryKey: [...CREDENTIALS_KEY, variables.type, variables.id],
      });
    },
  });
}

/**
 * Delete a credential
 */
export function useDeleteCredential() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteCredentialInput) => credentialsService.delete(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CREDENTIALS_KEY });
    },
  });
}
