/**
 * Call Types
 *
 * Types for the Audial Voice API Calls resource.
 */

import type { Agent } from "./agent";

export type CallStatus = "pending" | "in-progress" | "completed" | "failed";

export type CallType = "websocketCall" | "outboundPhoneCall" | "inboundPhoneCall";

export interface CallMessage {
  start_time: number;
  end_time: number;
  duration: number;
  sender: "user" | "assistant";
  content: string;
}

export interface CallWorkspace {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  description: string;
}

export interface CallCustomer {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  phone_number: string | null;
  custom_attributes: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  workspace: CallWorkspace;
  conversation_summary: string | null;
  ongoing_issues: string[];
}

export interface CallAgentPhone {
  provider: string;
  number: string;
  name: string;
  fallbackDestination: string | null;
  twilioAccountSid?: string;
  id: string | null;
  createdAt: string;
  updatedAt: string;
  agent: Agent | null;
}

export interface CallAnalysis {
  summary?: string;
  keywords?: string[];
}

export interface Call {
  id: string;
  createdAt: string;
  updatedAt: string;
  status: CallStatus;
  errorMessage: string | null;
  type: CallType;
  customer: CallCustomer | null;
  durationSecs: number | null;
  conversationVariables: Record<string, unknown>;
  currentNodeId: string | null;
  analysis: CallAnalysis | null;
  startedAt: string | null;
  listenUrl: string | null;
}

export interface CallDetail extends Call {
  agentSettings?: Agent;
  messages?: CallMessage[];
  customerPhone?: string;
  agentPhone?: CallAgentPhone;
  answeredBy?: string | null;
  audioUrl?: string | null;
  toCountry?: string;
}

export interface CreateCallInput {
  customer: {
    firstName: string;
    lastName?: string;
    phoneNumber: string;
    email?: string;
  };
  agentSettings?: {
    name: string;
    languageCode?: string;
    prompt: string;
    model: {
      provider: string;
      model: string;
      temperature?: number;
    };
    voice: {
      provider: string;
      voiceId: string;
      stability?: number;
      similarityBoost?: number;
    };
    transcriber?: {
      provider: string;
      model: string;
    };
    maxDurationSeconds?: number;
    checkHumanPresence?: boolean;
    allowInterruptions?: boolean;
    kickoffConversation?: boolean;
  };
  agentId?: string;
  phoneNumber: {
    provider: string;
    number: string;
    name: string;
    twilioAccountSid?: string;
    twilioAuthToken?: string;
    vonageApiKey?: string;
    vonageApiSecret?: string;
  };
}
