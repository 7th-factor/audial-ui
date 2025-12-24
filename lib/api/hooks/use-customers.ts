"use client";

/**
 * Customers Hooks
 *
 * TanStack Query hooks for the Customers resource.
 */

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { customersService } from "../services/customers";
import type { CreateCustomerInput, UpdateCustomerInput } from "../types";

const CUSTOMERS_KEY = ["customers"] as const;

/**
 * Fetch all customers
 */
export function useCustomers() {
  return useQuery({
    queryKey: CUSTOMERS_KEY,
    queryFn: customersService.list,
  });
}

/**
 * Fetch a single customer by ID
 */
export function useCustomer(id: string | undefined) {
  return useQuery({
    queryKey: [...CUSTOMERS_KEY, id],
    queryFn: () => customersService.get(id!),
    enabled: !!id,
  });
}

/**
 * Create a new customer
 */
export function useCreateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateCustomerInput) => customersService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_KEY });
    },
  });
}

/**
 * Update an existing customer
 */
export function useUpdateCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateCustomerInput }) =>
      customersService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_KEY });
      queryClient.invalidateQueries({ queryKey: [...CUSTOMERS_KEY, id] });
    },
  });
}

/**
 * Delete a customer
 */
export function useDeleteCustomer() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => customersService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: CUSTOMERS_KEY });
    },
  });
}
