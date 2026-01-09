/**
 * Customers Service
 *
 * API service functions for the Customers resource.
 */

import { apiClient } from "../client";
import type {
  Customer,
  CreateCustomerInput,
  UpdateCustomerInput,
  DeleteResponse,
  ListCustomersResponse,
} from "../types";

export const customersService = {
  /**
   * Fetch all customers
   */
  list: () => apiClient.get<ListCustomersResponse>("/api/v1/customers"),

  /**
   * Fetch a single customer by ID
   */
  get: (id: string) => apiClient.get<Customer>(`/api/v1/customers/${id}`),

  /**
   * Create a new customer
   */
  create: (data: CreateCustomerInput) =>
    apiClient.post<Customer>("/api/v1/customers", data),

  /**
   * Update an existing customer
   */
  update: (id: string, data: UpdateCustomerInput) =>
    apiClient.put<Customer>(`/api/v1/customers/${id}`, data),

  /**
   * Delete a customer
   */
  delete: (id: string) =>
    apiClient.delete<DeleteResponse>(`/api/v1/customers/${id}`),
};
