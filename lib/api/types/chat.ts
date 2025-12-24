/**
 * Chat Types
 *
 * Types for the Audial Voice API Chats resource.
 */

import type { Customer } from "./customer";

export type ChatChannel = "whatsapp" | "rest-api";

export type ChatStatus = "pending" | "in-progress" | "completed" | "failed";

export interface ChatMessage {
  role: "user" | "assistant";
  message: string;
  timestamp: string;
}

export interface Chat {
  id: string;
  channel: ChatChannel;
  status: ChatStatus;
  customer: Customer | null;
  agentId: string;
  messages: ChatMessage[];
  sessionId?: string;
  createdAt: string;
  updatedAt: string;
}

// Customer input for creating chats
export interface ChatCustomerInput {
  firstName?: string;
  lastName?: string;
  email?: string;
  phoneNumber?: string;
  customAttributes?: Record<string, unknown>;
}

// WhatsApp sender input (ephemeral)
export interface WhatsAppSenderInput {
  provider: "twilio";
  number: string;
  name: string;
  twilioAccountSid: string;
  twilioAuthToken: string;
  twilioApiKey?: string;
  twilioApiSecret?: string;
}

// WhatsApp chat configuration
export interface WhatsAppChatConfig {
  templateId: string;
  senderId?: string;
  sender?: WhatsAppSenderInput;
}

// REST API chat configuration
export interface RestApiChatConfig {
  input: string | ChatMessage[];
  previousChatId?: string;
  sessionId?: string;
}

// Create WhatsApp Chat Input
export interface CreateWhatsAppChatInput {
  channel: "whatsapp";
  customer: ChatCustomerInput;
  agentId: string;
  whatsappChatConfig: WhatsAppChatConfig;
}

// Create REST API Chat Input
export interface CreateRestApiChatInput {
  channel: "rest-api";
  customer: ChatCustomerInput;
  agentId: string;
  restChatConfig: RestApiChatConfig;
}

// Union type for creating any chat
export type CreateChatInput = CreateWhatsAppChatInput | CreateRestApiChatInput;
