/**
 * Phone Number Types
 *
 * Types for the Audial Voice API Phone Numbers resource.
 */

import type { Agent } from "./agent";
import type { PaginatedResponse } from "./common";

export type PhoneNumberProvider = "twilio" | "vonage" | "audial";

export interface PhoneNumber {
  id: string;
  provider: PhoneNumberProvider;
  number: string;
  name: string;
  fallbackDestination: string | null;
  twilioAccountSid?: string;
  createdAt: string;
  updatedAt: string;
  agent: Agent | null;
}

export interface CreatePhoneNumberTwilioInput {
  provider: "twilio";
  number: string;
  name: string;
  assistantId?: string;
  twilioAccountSid: string;
  twilioAuthToken: string;
  twilioApiKey?: string;
  twilioApiSecret?: string;
}

export interface CreatePhoneNumberVonageInput {
  provider: "vonage";
  number: string;
  name: string;
  assistantId?: string;
  vonageApiKey: string;
  vonageApiSecret: string;
}

export type CreatePhoneNumberInput =
  | CreatePhoneNumberTwilioInput
  | CreatePhoneNumberVonageInput;

export interface UpdatePhoneNumberInput {
  provider?: PhoneNumberProvider;
  number?: string;
  name?: string;
  assistantId?: string;
  twilioAccountSid?: string;
  twilioAuthToken?: string;
  vonageApiKey?: string;
  vonageApiSecret?: string;
}

// Available phone numbers (for purchase)
export interface PhoneNumberCapabilities {
  voice: boolean;
  sms: boolean;
  mms: boolean;
}

export interface AvailablePhoneNumber {
  phoneNumber: string;
  countryCode: string;
  capabilities: PhoneNumberCapabilities;
  monthlyPrice: number | null;
  setupPrice: number | null;
}

// Purchase phone number input (for Audial-managed numbers)
export interface PurchasePhoneNumberInput {
  phoneNumber: string;
  assistantId?: string;
  name: string;
}

// Purchased phone number (Audial-managed)
export interface PurchasedPhoneNumber {
  provider: "audial";
  number: string;
  name: string;
  fallbackDestination: string | null;
  id: string;
}

// Paginated response types
export type ListPhoneNumbersResponse = PaginatedResponse<PhoneNumber>;
export type ListAvailablePhoneNumbersResponse = PaginatedResponse<AvailablePhoneNumber>;
export type ListPurchasedPhoneNumbersResponse = PaginatedResponse<PurchasedPhoneNumber>;
