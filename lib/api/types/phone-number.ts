/**
 * Phone Number Types
 *
 * Types for the Audial Voice API Phone Numbers resource.
 */

import type { Agent } from "./agent";

export type PhoneNumberProvider = "twilio" | "vonage";

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
