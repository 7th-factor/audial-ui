/**
 * Credential Types
 *
 * Types for the Audial Voice API Credentials resource.
 */

export type CredentialType = "stt" | "llm" | "voice" | "observability";

export type CredentialProvider =
  | "openai"
  | "deepgram"
  | "elevenlabs"
  | "langfuse";

export interface Credential {
  id: string;
  type: CredentialType;
  provider: CredentialProvider;
  params: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

export interface CreateCredentialOpenAIInput {
  type: "llm";
  provider: "openai";
  params: {
    apiKey: string;
    hostName?: string | null;
  };
}

export interface CreateCredentialDeepgramInput {
  type: "stt";
  provider: "deepgram";
  params: {
    apiKey: string;
    apiUrl?: string;
  };
}

export interface CreateCredentialElevenLabsInput {
  type: "voice";
  provider: "elevenlabs";
  params: {
    apiKey: string;
  };
}

export interface CreateCredentialLangFuseInput {
  type: "observability";
  provider: "langfuse";
  params: {
    host: string;
    publicKey: string;
    privateKey: string;
  };
}

export type CreateCredentialInput =
  | CreateCredentialOpenAIInput
  | CreateCredentialDeepgramInput
  | CreateCredentialElevenLabsInput
  | CreateCredentialLangFuseInput;

export interface UpdateCredentialInput {
  id: string;
  type: CredentialType;
  provider: CredentialProvider;
  params: Record<string, unknown>;
}

export interface DeleteCredentialInput {
  id: string;
  type: CredentialType;
}
