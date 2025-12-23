"use client";

/**
 * API Keys Hooks
 *
 * TanStack Query hooks for the API Keys resource.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiKeysService } from "../services/api-keys";
import type { CreateKeyInput, DeleteKeyInput } from "../types";

const PRIVATE_KEYS_KEY = ["api-keys", "private"] as const;
const PUBLIC_KEYS_KEY = ["api-keys", "public"] as const;

/**
 * Fetch all private keys
 */
export function usePrivateKeys() {
  return useQuery({
    queryKey: PRIVATE_KEYS_KEY,
    queryFn: apiKeysService.listPrivateKeys,
  });
}

/**
 * Fetch all public keys
 */
export function usePublicKeys() {
  return useQuery({
    queryKey: PUBLIC_KEYS_KEY,
    queryFn: apiKeysService.listPublicKeys,
  });
}

/**
 * Create a new API key (private or public)
 * Returns the key string which should be shown to the user once
 */
export function useCreateApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateKeyInput) => apiKeysService.create(data),
    onSuccess: (_, variables) => {
      if (variables.type === "private") {
        queryClient.invalidateQueries({ queryKey: PRIVATE_KEYS_KEY });
      } else {
        queryClient.invalidateQueries({ queryKey: PUBLIC_KEYS_KEY });
      }
    },
  });
}

/**
 * Delete an API key
 */
export function useDeleteApiKey() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: DeleteKeyInput) => apiKeysService.delete(data),
    onSuccess: (_, variables) => {
      if (variables.type === "private") {
        queryClient.invalidateQueries({ queryKey: PRIVATE_KEYS_KEY });
      } else {
        queryClient.invalidateQueries({ queryKey: PUBLIC_KEYS_KEY });
      }
    },
  });
}
