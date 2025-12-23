/**
 * WhatsApp Sender Types
 *
 * Types for the Audial Voice API WhatsApp Senders resource.
 */

import type { Agent } from "./agent";

export type WhatsAppSenderProvider = "twilio";

export interface WhatsAppSender {
  id: string;
  provider: WhatsAppSenderProvider;
  number: string;
  name: string;
  assistantId?: string;
  agent?: Agent | null;
  twilioAccountSid?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateWhatsAppSenderInput {
  provider: "twilio";
  number: string;
  name: string;
  assistantId?: string;
  twilioAccountSid: string;
  twilioAuthToken: string;
  twilioApiKey?: string;
  twilioApiSecret?: string;
}

export interface UpdateWhatsAppSenderInput {
  provider?: WhatsAppSenderProvider;
  number?: string;
  name?: string;
  assistantId?: string;
  twilioAccountSid?: string;
  twilioAuthToken?: string;
  twilioApiKey?: string;
  twilioApiSecret?: string;
}
