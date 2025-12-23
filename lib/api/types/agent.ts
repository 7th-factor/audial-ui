/**
 * Agent Types
 *
 * Types for the Audial Voice API Agents resource.
 */

export type InterruptionSensitivity = "low" | "medium" | "high";

export interface AgentModel {
  provider: string;
  model: string;
  storeCompletions?: boolean;
  temperature?: number;
}

export interface AgentVoice {
  provider: string;
  voiceId: string;
  stability?: number;
  similarityBoost?: number;
  speed?: number | null;
}

export interface AgentTranscriber {
  provider: string;
  model: string;
}

export interface AnalysisPlanMessage {
  role: "developer" | "user" | "assistant";
  content: string;
}

export interface SummaryPlan {
  enabled: boolean;
  timeoutSeconds: number;
  messages: AnalysisPlanMessage[];
}

export interface KeywordsPlan {
  enabled: boolean;
  timeoutSeconds: number;
  messages: AnalysisPlanMessage[];
}

export interface AnalysisPlan {
  minMessagesThreshold: number;
  summaryPlan: SummaryPlan;
  keywordsPlan: KeywordsPlan;
}

export interface Agent {
  id: string;
  name: string;
  languageCode: string;
  prompt: string;
  model: AgentModel;
  voice: AgentVoice;
  transcriber: AgentTranscriber;
  imageUrl: string | null;
  observabilityPlan: unknown | null;
  analysisPlan: AnalysisPlan | null;
  maxDurationSeconds: number;
  statusCallbackUrl: string | null;
  callOnHoldAudioUrl: string | null;
  checkHumanPresence: boolean;
  checkHumanPresenceCount: number;
  allowedIdleTime: number;
  allowInterruptions: boolean;
  interruptionSensitivity: InterruptionSensitivity;
  enableCutoffResponses: boolean;
  cutoffResponses: string[];
}

export interface CreateAgentInput {
  name: string;
  languageCode?: string;
  prompt: string;
  model: AgentModel;
  voice: AgentVoice;
  transcriber?: AgentTranscriber;
  maxDurationSeconds?: number;
  sendInitialMessage?: boolean;
  firstMessage?: string;
  checkHumanPresence?: boolean;
  checkHumanPresenceCount?: number;
  allowInterruptions?: boolean;
  interruptionSensitivity?: InterruptionSensitivity;
  allowedIdleTime?: number;
  enableCutoffResponses?: boolean;
  cutoffResponses?: string[];
}

export type UpdateAgentInput = Partial<CreateAgentInput>;
