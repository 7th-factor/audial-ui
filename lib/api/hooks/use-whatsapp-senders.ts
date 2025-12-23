"use client";

/**
 * WhatsApp Senders Hooks
 *
 * TanStack Query hooks for the WhatsApp Senders resource.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { whatsappSendersService } from "../services/whatsapp-senders";
import type {
  CreateWhatsAppSenderInput,
  UpdateWhatsAppSenderInput,
} from "../types";

const WHATSAPP_SENDERS_KEY = ["whatsapp-senders"] as const;

/**
 * Fetch all WhatsApp senders
 */
export function useWhatsAppSenders() {
  return useQuery({
    queryKey: WHATSAPP_SENDERS_KEY,
    queryFn: whatsappSendersService.list,
  });
}

/**
 * Fetch a single WhatsApp sender by ID
 */
export function useWhatsAppSender(id: string | undefined) {
  return useQuery({
    queryKey: [...WHATSAPP_SENDERS_KEY, id],
    queryFn: () => whatsappSendersService.get(id!),
    enabled: !!id,
  });
}

/**
 * Create a new WhatsApp sender
 */
export function useCreateWhatsAppSender() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateWhatsAppSenderInput) =>
      whatsappSendersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WHATSAPP_SENDERS_KEY });
    },
  });
}

/**
 * Update an existing WhatsApp sender
 */
export function useUpdateWhatsAppSender() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      data,
    }: {
      id: string;
      data: UpdateWhatsAppSenderInput;
    }) => whatsappSendersService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: WHATSAPP_SENDERS_KEY });
      queryClient.invalidateQueries({
        queryKey: [...WHATSAPP_SENDERS_KEY, id],
      });
    },
  });
}

/**
 * Delete a WhatsApp sender
 */
export function useDeleteWhatsAppSender() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => whatsappSendersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: WHATSAPP_SENDERS_KEY });
    },
  });
}
