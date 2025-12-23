"use client";

/**
 * Integrations Hooks
 *
 * TanStack Query hooks for fetching available models and voices.
 */

import { useQuery } from "@tanstack/react-query";
import { integrationsService } from "../services/integrations";

/**
 * Fetch available Deepgram STT models
 */
export function useDeepgramModels() {
  return useQuery({
    queryKey: ["integrations", "deepgram", "models"],
    queryFn: integrationsService.listDeepgramModels,
    staleTime: 5 * 60 * 1000, // 5 minutes - models don't change often
  });
}

/**
 * Fetch available OpenAI models
 */
export function useOpenAIModels() {
  return useQuery({
    queryKey: ["integrations", "openai", "models"],
    queryFn: integrationsService.listOpenAIModels,
    staleTime: 5 * 60 * 1000, // 5 minutes - models don't change often
  });
}

/**
 * Fetch available ElevenLabs voices
 */
export function useElevenLabsVoices() {
  return useQuery({
    queryKey: ["integrations", "elevenlabs", "voices"],
    queryFn: integrationsService.listElevenLabsVoices,
    staleTime: 5 * 60 * 1000, // 5 minutes - voices don't change often
  });
}
