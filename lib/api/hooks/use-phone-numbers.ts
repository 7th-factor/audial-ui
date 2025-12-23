"use client";

/**
 * Phone Numbers Hooks
 *
 * TanStack Query hooks for the Phone Numbers resource.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { phoneNumbersService } from "../services/phone-numbers";
import type { CreatePhoneNumberInput, UpdatePhoneNumberInput } from "../types";

const PHONE_NUMBERS_KEY = ["phone-numbers"] as const;

/**
 * Fetch all phone numbers
 */
export function usePhoneNumbers() {
  return useQuery({
    queryKey: PHONE_NUMBERS_KEY,
    queryFn: phoneNumbersService.list,
  });
}

/**
 * Fetch a single phone number by ID
 */
export function usePhoneNumber(id: string | undefined) {
  return useQuery({
    queryKey: [...PHONE_NUMBERS_KEY, id],
    queryFn: () => phoneNumbersService.get(id!),
    enabled: !!id,
  });
}

/**
 * Create a new phone number
 */
export function useCreatePhoneNumber() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePhoneNumberInput) =>
      phoneNumbersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PHONE_NUMBERS_KEY });
    },
  });
}

/**
 * Update an existing phone number
 */
export function useUpdatePhoneNumber() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdatePhoneNumberInput }) =>
      phoneNumbersService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: PHONE_NUMBERS_KEY });
      queryClient.invalidateQueries({ queryKey: [...PHONE_NUMBERS_KEY, id] });
    },
  });
}

/**
 * Delete a phone number
 */
export function useDeletePhoneNumber() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => phoneNumbersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: PHONE_NUMBERS_KEY });
    },
  });
}
