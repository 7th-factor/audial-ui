/**
 * Customer Types
 *
 * Types for the Audial Voice API Customers resource.
 */

export interface Customer {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string | null;
  phoneNumber: string | null;
  customAttributes: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
  conversationSummary: string | null;
  ongoingIssues: string[];
}

export interface CreateCustomerInput {
  firstName: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  customAttributes?: Record<string, unknown>;
}

export type UpdateCustomerInput = Partial<CreateCustomerInput>;

export interface DeleteResponse {
  message: string;
}
