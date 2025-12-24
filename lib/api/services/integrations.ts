/**
 * Integrations Service
 *
 * API service functions for listing available models and voices.
 * Note: These endpoints use /api/integrations/ path
 */

import { apiClient } from "../client";

export interface DeepgramSTTModel {
  id: string;
  name: string;
}

export interface OpenAIModel {
  id: string;
  name: string;
}

export interface ElevenLabsVoice {
  voice_id: string;
  name: string;
  preview_url?: string;
  category?: string;
}

export const integrationsService = {
  /**
   * List available Deepgram STT models
   */
  listDeepgramModels: () =>
    apiClient.get<DeepgramSTTModel[]>("/api/integrations/deepgram/list-stt-models"),

  /**
   * List available OpenAI models
   */
  listOpenAIModels: () =>
    apiClient.get<OpenAIModel[]>("/api/integrations/openai/list-models"),

  /**
   * List available ElevenLabs voices
   */
  listElevenLabsVoices: () =>
    apiClient.get<ElevenLabsVoice[]>("/api/integrations/elevenlabs/list-voices"),
};
