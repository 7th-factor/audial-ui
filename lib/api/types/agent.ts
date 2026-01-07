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
  routings?: Routing[];
  tools?: Tool[];
}

export interface CreateAgentInput {
  name: string;
  languageCode: string;
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
  routings?: Routing[];
  tools?: Tool[];
}

export type UpdateAgentInput = Partial<CreateAgentInput>;

// Routing Types - for call transfers
export interface AIRouting {
  type: "ai";
  triggerCondition: string;
  agentId: string;
}

export interface HumanRouting {
  type: "human";
  triggerCondition: string;
  destination: "external";
  phone: string;
}

export type Routing = AIRouting | HumanRouting;

// Type guards for routings
export const isAIRouting = (routing: Routing): routing is AIRouting =>
  routing.type === "ai";

export const isHumanRouting = (routing: Routing): routing is HumanRouting =>
  routing.type === "human";

// Tool Types - for MCP server integrations
export interface MCPTool {
  type: "mcp";
  name: string;
  description: string;
  serverUrl: string;
}

export type Tool = MCPTool;
