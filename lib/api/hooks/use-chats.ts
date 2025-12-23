"use client";

/**
 * Chats Hooks
 *
 * TanStack Query hooks for the Chats resource.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { chatsService } from "../services/chats";
import type { CreateChatInput } from "../types";

const CHATS_KEY = ["chats"] as const;

/**
 * Fetch all chats
 */
export function useChats() {
  return useQuery({
    queryKey: CHATS_KEY,
    queryFn: chatsService.list,
  });
}

/**
 * Fetch a single chat by ID
 */
export function useChat(id: string | undefined) {
  return useQuery({
    queryKey: [...CHATS_KEY, id],
    queryFn: () => chatsService.get(id!),
    enabled: !!id,
  });
}

/**
 * Create a new chat (WhatsApp or REST API)
 */
export function useCreateChat() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateChatInput) => chatsService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CHATS_KEY });
    },
  });
}
